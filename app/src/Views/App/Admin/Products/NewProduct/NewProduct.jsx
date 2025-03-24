import { createRef, useCallback, useContext, useEffect, useState } from "react";
import GeneralLayout from "../../../../../Layouts/GeneralLayout/GeneralLayout";
import { StringsContext } from "../../../../../Context/strings.context";
import PanelLayout from "../../../../../Layouts/PanelLayout/PanelLayout";
import SectionLayout from "../../../../../Layouts/SectionLayout/SectionLayout";
import FormControl from "../../../../../Components/Form/FormControl/FormControl";
import Select from "react-select";
import { Button, FormLabel } from "react-bootstrap";
import useRequest from "../../../../../Hooks/useRequest";
import { Endpoints, getEndpoint } from "../../../../../Constants/endpoints.contants";
import useNotification from "../../../../../Hooks/useNotification";
import RequiredField from "../../../../../Components/Form/RequiredField/RequiredField";
import { validateData } from "../../../../../Config/GeneralFunctions";
import Dropzone, { useDropzone } from "react-dropzone";

const NewProduct = () => {

    const { strings } = useContext(StringsContext);
    const ViewStrings = strings.Products.add;

    const request = useRequest();

    const { showNotification: successNotification } = useNotification("success");
    const { showNotification: errorNotification } = useNotification();

    const [categories, setCategories] = useState({});
    const [dataInput, setDataInput] = useState({});
    const [selectedOption, setSelectedOption] = useState(null);

    useEffect(() => {
        fetchData();
    }, [])

    //Get of the categories
    const fetchData = async () => {
        return await request("get", getEndpoint(Endpoints.Categories.getList))
            .then((res) => {
                setCategories(res.categories);
            })
            .catch((err) => console.log("error.", err))
    }

    //Save normal Input in dataInput
    const handleInput = (e) => {
        const { id, value } = e.target;
        setDataInput({ ...dataInput, [id]: value });
    }

    //Save Select in dataInput
    const handleSelect = (obj) => {
        setSelectedOption(obj);
        setDataInput({ ...dataInput, "category": obj.value });
    }

    

    //Send information at api
    const handleSubmit = () => {
        if (checkForm()) {
            request("post", getEndpoint(Endpoints.Products.create), { ...dataInput })
                .then((res) => {
                    successNotification("Product created", true);
                })
                .catch(() => {
                    errorNotification("Error create product", true);
                })
        }


    }

    //DropZOne
    

    //Checked form
    const checkForm = () => {
        const { name, category, price, brand, description } = dataInput;
        return validateData([name, category, price, brand, description]);
    }


    return (
        <GeneralLayout showBackButton title={ViewStrings.newProduct}>
            <PanelLayout>
                <SectionLayout>

                    <FormControl
                        required
                        controlId="name"
                        maxLength={50}
                        showMaxLength={true}
                        vertical={false}
                        value={dataInput.name}
                        title={ViewStrings.name}
                        onChange={handleInput}
                        placeholder={ViewStrings.placeholderName}
                    />

                    <FormLabel className="mb-0">Categorías de productos<RequiredField /></FormLabel>
                    <Select
                        options={categories}
                        closeMenuOnSelect={true}
                        className="pb-2"
                        menuPortalTarget={document.body}
                        id="category"
                        onChange={handleSelect}
                        value={selectedOption}
                    />

                    <FormControl
                        required
                        controlId="price"
                        type="number"
                        step="0.50"
                        vertical={true}
                        className="pb-2"
                        title={ViewStrings.price}
                        placeholder={ViewStrings.placeholderPrice}
                        onChange={handleInput}
                        value={dataInput.price}
                    />

                    <FormControl
                        required
                        controlId="brand"
                        vertical={false}
                        className="pb-2"
                        title={ViewStrings.brand}
                        placeholder={ViewStrings.placeholderBrand}
                        onChange={handleInput}
                        value={dataInput.brand}
                    />

                    <FormControl
                        required
                        controlId="description"
                        vertical={false}
                        className="pb-2"
                        title={ViewStrings.description}
                        placeholder={ViewStrings.placeholderDescription}
                        onChange={handleInput}
                        value={dataInput.description}
                    />

                    


                </SectionLayout>
                <div className="d-flex justify-content-end align-items-center">
                    <Button disabled={!checkForm()} onClick={handleSubmit}>
                        Create
                    </Button>
                </div>
            </PanelLayout>

        </GeneralLayout>
    )

}
export default NewProduct;