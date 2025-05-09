import { useCallback, useContext, useEffect, useState } from "react";
import GeneralLayout from "../../../../../Layouts/GeneralLayout/GeneralLayout";
import { StringsContext } from "../../../../../Context/strings.context";
import PanelLayout from "../../../../../Layouts/PanelLayout/PanelLayout";
import SectionLayout from "../../../../../Layouts/SectionLayout/SectionLayout";
import FormControl from "../../../../../Components/Form/FormControl/FormControl";
import Select from "react-select";
import { Button, FormLabel, Spinner } from "react-bootstrap";
import useRequest from "../../../../../Hooks/useRequest";
import { EndpointsAdmin, getEndpoint } from "../../../../../Constants/endpoints.contants";
import useNotification from "../../../../../Hooks/useNotification";
import RequiredField from "../../../../../Components/Form/RequiredField/RequiredField";
import { validateData } from "../../../../../Config/GeneralFunctions";
import { useDropzone } from "react-dropzone";
import FormControlPrice from "../../../../../Components/Form/FormControl/FormControlPrice";
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min";
import { Paths } from "../../../../../Constants/paths.constants";
import { Views } from "../../../../../Constants/views.constants";
import ReactQuill from "react-quill";


const EditProduct = () => {

    const { strings } = useContext(StringsContext);
    const ViewStrings = strings.Products.update;

    const request = useRequest();
    const { push } = useHistory();

    const { product_guid } = useParams();

    const { showNotification: successNotification } = useNotification("success");
    const { showNotification: errorNotification } = useNotification();

    const [submiting, setSubmiting] = useState(false);
    const [loaded, setLoaded] = useState(false);

    const [categories, setCategories] = useState({});
    const [data, setData] = useState({});
    const [initialData, setInitialData] = useState({});
    const [selectedOption, setSelectedOption] = useState(null);
    const [existingImages, setExistingImages] = useState([]);
    const [existingImagesGuid, setExistingImagesGuid] = useState([]);
    const [newImages, setNewImages] = useState([]);
    const [deleteImages, setDeleteImages] = useState([]);

    useEffect(() => {
        fetchData();
    }, [product_guid]);

    const fetchData = async () => {
        try {
            const resProduct = await request("get", getEndpoint(EndpointsAdmin.Products.getForUpdate), { guid: product_guid });
            const resCategories = await request("get", getEndpoint(EndpointsAdmin.Categories.getList));
            setCategories(resCategories.categories);
            setData(resProduct.data);
            setInitialData(resProduct.data);
            if (resProduct.data && resProduct.data.category) {
                const selectedCategory = resCategories.categories.find((cat) => cat.value === resProduct.data.category);
                setSelectedOption(selectedCategory);
                setData((prevData) => ({ ...prevData, category: selectedCategory.value }));
            }
            if (resProduct.data.imagesExist) {
                setExistingImagesGuid(resProduct.data.imagesExist)
                setExistingImages(resProduct.data.imagesURL)
            }
        } catch (err) {
            errorNotification("Error fetching product", true);
        } finally {
            setLoaded(true);
        }
    };

    const handleSubmit = () => {
        if (checkForm()) {
            setSubmiting(true);
            request("file", getEndpoint(EndpointsAdmin.Products.update), {
                accessor: "image",
                image: newImages,
                deleteImages: JSON.stringify(deleteImages),
                ...data
            })
                .then(() => {
                    push(Paths[Views.products].path);
                    successNotification("Product updated", true);
                })
                .catch((err) => errorNotification(err.message))
                .finally(() => setSubmiting(false))
        }
    }

    const handleInput = (e) => {
        const { id, value } = e.target;
        setData({ ...data, [id]: value });
    }

    const handleSelect = (obj) => {
        setSelectedOption(obj);
        setData({ ...data, "category": obj.value });
    }

    const handleInputDescription = (e) => {

        setData({ ...data, "description": e });
    }

    const onDrop = useCallback((acceptedFiles) => {
        const pngFiles = acceptedFiles.filter((file) => file.type === "image/png" || file.type === "image/jpg" || file.type === "image/jpeg");

        if (pngFiles.length > 0) {
            setNewImages((prevImages) => [...prevImages, ...pngFiles]);
        } else {
            errorNotification("Only PNG/JPG/JPEG files are allowed.");
        }

    }, []);

    const { getRootProps, getInputProps } = useDropzone({
        accept: "image/png",
        multiple: true,
        onDrop
    });

    const files = [...existingImages, ...newImages].map((file, index) => (

        < div key={index} className="d-flex w-100 justify-content-around align-items-center" >
            {
                typeof file === 'string' ? (
                    <img src={file} className="p-2" style={{ width: '200px', height: 'auto', objectFit: 'cover' }} />
                ) : (
                    <img src={URL.createObjectURL(file)} className="p-2" style={{ width: '200px', height: 'auto', objectFit: 'cover' }} />
                )
            }
            < Button onClick={() => deleteImage(index, typeof file !== 'string', file)} variant="danger" >
                {ViewStrings.delete}
            </Button >
        </div >
    ));


    const deleteImage = (index, isNewImage = false, file) => {
        if (isNewImage) {
            const fileIndex = newImages.indexOf(file);
            if (fileIndex !== -1) setNewImages((prevImages) => prevImages.filter((_, i) => i !== fileIndex));
        } else {
            setExistingImages((prevImages) => {
                const updatedExistingImages = prevImages.filter((_, i) => i !== index);

                const deletedImageGuid = existingImagesGuid[index];

                setDeleteImages((prevDeletedImages) => [...prevDeletedImages, deletedImageGuid]);

                return updatedExistingImages;
            });
        }
    };


    const checkForm = () => {

        const changeImages = newImages.length !== 0 || deleteImages.length !== 0 && deleteImages.length == 0;

        const { name, category, price, brand, description } = data;
        return validateData([name, category, price, brand, description])
            && [...existingImages, ...newImages].length > 0
            && JSON.stringify(data) !== JSON.stringify(initialData)
            || changeImages;
    }

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
                        value={data.name}
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
                        value={data.price}
                    />
                    <FormControl
                        required
                        controlId="brand"
                        vertical={true}
                        title={ViewStrings.brand}
                        placeholder={ViewStrings.placeholderBrand}
                        onChange={handleInput}
                        value={data.brand}
                    />
                    <FormLabel className="mb-0">{ViewStrings.description}<RequiredField /></FormLabel>
                    <ReactQuill
                        id="description"
                        theme="snow"
                        onChange={handleInputDescription}
                        value={data.description}
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
                        {submiting ? <Spinner size="sm" /> : ViewStrings.update}
                    </Button>
                </div>
            </PanelLayout>
        </GeneralLayout>
    );
};
export default EditProduct;
