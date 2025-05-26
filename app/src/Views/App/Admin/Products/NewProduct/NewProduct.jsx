import { useCallback, useContext, useEffect, useState } from "react";
import GeneralLayout from "../../../../../Layouts/GeneralLayout/GeneralLayout";
import { StringsContext } from "../../../../../Context/strings.context";
import PanelLayout from "../../../../../Layouts/PanelLayout/PanelLayout";
import SectionLayout from "../../../../../Layouts/SectionLayout/SectionLayout";
import FormControl from "../../../../../Components/Form/FormControl/FormControl";
import Select from "react-select";
import { Button, FormLabel } from "react-bootstrap";
import useRequest from "../../../../../Hooks/useRequest";
import { EndpointsAdmin, getEndpoint } from "../../../../../Constants/endpoints.contants";
import useNotification from "../../../../../Hooks/useNotification";
import RequiredField from "../../../../../Components/Form/RequiredField/RequiredField";
import { validateData } from "../../../../../Config/GeneralFunctions";
import { useDropzone } from "react-dropzone";
import FormControlPrice from "../../../../../Components/Form/FormControl/FormControlPrice";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { Paths } from "../../../../../Constants/paths.constants";
import { Views } from "../../../../../Constants/views.constants";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const NewProduct = () => {

    const { strings } = useContext(StringsContext);
    const ViewStrings = strings.Products.add;

    const request = useRequest();
    const { push } = useHistory();

    const { showNotification: successNotification } = useNotification("success");
    const { showNotification: errorNotification } = useNotification();

    const [categories, setCategories] = useState({});
    const [dataInput, setDataInput] = useState({});
    const [selectedOption, setSelectedOption] = useState(null);

    const [loaded, setLoaded] = useState(false);
    const [submiting, setSubmiting] = useState(false);

    //Array save images
    const [images, setImages] = useState([]);

    useEffect(() => {
        fetchData();
    }, [])

    //Get of the categories
    const fetchData = async () => {
        request("get", getEndpoint(EndpointsAdmin.Categories.getList))
            .then((res) => {
                setCategories(res.categories);
            })
            .catch((err) => errorNotification(err.message))
            .finally(() => setLoaded(true))
    }

    //Save normal Input in dataInput
    const handleInput = (e) => {
        const { id, value } = e.target;
        setDataInput({ ...dataInput, [id]: value });
    }

    const handleInputDescription = (e) => {

        setDataInput({ ...dataInput, "description": e });
    }

    //Save Select in dataInput
    const handleSelect = (obj) => {
        setSelectedOption(obj);
        setDataInput({ ...dataInput, "category": obj.value });
    }

    //Send information at api
    const handleSubmit = () => {
        if (checkForm()) {
            request("file", getEndpoint(EndpointsAdmin.Products.create), {
                accessor: "image",
                image: images,
                ...dataInput
            })
                .then(() => {
                    push(Paths[Views.products].path);
                    successNotification(ViewStrings.successMessage, true);
                })
                .catch((err) => errorNotification(err.message, true))
                .finally(() => setSubmiting(false))
        }
    }

    //DropZone
    const onDrop = useCallback((acceptedFiles) => {
        const nonEmptyFiles = acceptedFiles.filter(file => file.size > 0); // Filter out empty files
        const validFiles = nonEmptyFiles.filter((file) => file.type.startsWith("image/"));

        if (validFiles.length > 0) {
            setImages((prevImages) => [...prevImages, ...validFiles]);
        } else {
            errorNotification("Only valid image files (PNG/JPG/JPEG) are allowed.");
        }
    }, []);



    const { getRootProps, getInputProps } = useDropzone({
        // accept: 'image/png, image/jpeg',
        multiple: true,
        onDrop
    });


    //Delete image on array
    const deleteImage = useCallback((index) => {
        setImages((prevImages) => prevImages.filter((_, i) => i !== index));
    }, []);


    //Checked form
    const checkForm = () => {
        const { name, category, price, brand, description } = dataInput;
        return validateData([name, category, price, brand, description]) && images.length > 0;
    }

    const files = images.map((file, index) => (
        <div key={index} className="d-flex w-100 justify-content-around align-items-center">
            <img src={URL.createObjectURL(file)} className="p-2" alt={`Imagen ${index + 1}`} style={{ width: '200px', height: 'auto', objectFit: 'cover' }} />
            <Button onClick={() => deleteImage(index)} variant="danger">
                {ViewStrings.delete}
            </Button>
        </div>
    ));


    return (
        <GeneralLayout showBackButton title={ViewStrings.newProduct}>
            <PanelLayout loaded={loaded}>
                <SectionLayout>
                    <FormControl
                        required
                        controlId="name"
                        maxLength={50}
                        showMaxLength={true}
                        vertical={true}
                        value={dataInput.name}
                        title={ViewStrings.name}
                        onChange={handleInput}
                        placeholder={ViewStrings.placeholderName}
                    />
                    <FormLabel className="mb-0">{ViewStrings.category}<RequiredField /></FormLabel>
                    <Select
                        options={categories}
                        closeMenuOnSelect={true}
                        className="pb-2"
                        menuPortalTarget={document.body}
                        id="category"
                        onChange={handleSelect}
                        value={selectedOption}
                        isSearchable
                        isClearable
                    />
                    <FormControlPrice
                        required
                        controlId="price"
                        vertical={true}
                        title={ViewStrings.price}
                        placeholder={ViewStrings.placeholderPrice}
                        onChange={handleInput}
                        value={dataInput.price}
                    />
                    <FormControl
                        required
                        controlId="brand"
                        vertical={true}
                        title={ViewStrings.brand}
                        placeholder={ViewStrings.placeholderBrand}
                        onChange={handleInput}
                        value={dataInput.brand}
                    />
                    <FormLabel className="mb-0">{ViewStrings.description}<RequiredField /></FormLabel>
                    <ReactQuill
                        id="description"
                        theme="snow"
                        onChange={handleInputDescription}
                        value={dataInput.description}
                    />
                    <FormLabel className="my-2">{ViewStrings.images}<RequiredField /></FormLabel>
                    <div {...getRootProps({ className: "dropzone d-flex align-items-center justify-content-center border border-3 rounded-4 p-5" })}>
                        <input {...getInputProps()} />
                        <span>{ViewStrings.placeholderImages}</span>
                    </div>
                    <aside className=" p-2 gap-4">
                        {files}
                    </aside>


                </SectionLayout>
                <div className="d-flex justify-content-end align-items-center">
                    <Button disabled={!checkForm() || submiting} onClick={handleSubmit}>
                        {submiting ? <Spinner size="sm" /> : ViewStrings.create}
                    </Button>
                </div>
            </PanelLayout>

        </GeneralLayout>
    )

}
export default NewProduct;