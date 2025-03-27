import { useCallback, useContext, useEffect, useState } from "react";
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
import { useDropzone } from "react-dropzone";
import FormControlPrice from "../../../../../Components/Form/FormControl/FormControlPrice";
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min";


const EditProduct = () => {

    const { strings } = useContext(StringsContext);
    const ViewStrings = strings.Products.add;

    const request = useRequest();
    const { push } = useHistory();

    const { product_guid } = useParams();

    const { showNotification: successNotification } = useNotification("success");
    const { showNotification: errorNotification } = useNotification();

    const [categories, setCategories] = useState({});
    const [data, setData] = useState({});
    const [selectedOption, setSelectedOption] = useState(null);
    const [existingImages, setExistingImages] = useState([]);
    const [existingImagesGuid, setExistingImagesGuid] = useState([]);
    const [newImages, setNewImages] = useState([]);
    const [deleteImages, setDeleteImages] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const resProduct = await request("get", getEndpoint(Endpoints.Products.getForUpdate), { guid: product_guid });
            const resCategories = await request("get", getEndpoint(Endpoints.Categories.getList));
            setCategories(resCategories.categories);
            setData(resProduct.data);
            console.log(resProduct);
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
        }
    };

    const handleSubmit = () => {

        console.log(data);
        console.log(existingImages);
        console.log(existingImagesGuid);
        console.log(deleteImages)
        console.log(newImages);

        if (checkForm()) {
            request("file", getEndpoint(Endpoints.Products.update), {
                accessor: "image",
                newImages: newImages,
                existImages: existingImages,
                ...data,
            })
                .then((res) => {
                    push(Paths[Views.products].path);
                    successNotification("Product updated", true);

                })
                .catch(() => {
                    errorNotification("Error update product", true);
                })
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

    const onDrop = useCallback((acceptedFiles) => {
        setNewImages((prevImages) => [...prevImages, ...acceptedFiles]);
    }, []);

    const { getRootProps, getInputProps } = useDropzone({
        accept: "image/*",
        multiple: true,
        onDrop
    });

    const files = [...existingImages, ...newImages].map((file, index) => (
        <div key={index} className="d-flex w-100 justify-content-around align-items-center">
            {typeof file === 'string' ? (
                <img src={file} className="p-2" style={{ width: '200px', height: 'auto', objectFit: 'cover' }} />
            ) : (
                <img src={URL.createObjectURL(file)} className="p-2" style={{ width: '200px', height: 'auto', objectFit: 'cover' }} />
            )}
            <Button onClick={() => deleteImage(index, typeof file !== 'string')} variant="danger">
                Borrar
            </Button>
        </div>
    ));

    const deleteImage = (index, isNewImage = false) => {
        if (isNewImage) {
            // Eliminar imagen de newImages
            setNewImages((prevImages) => prevImages.filter((_, i) => i !== index));
        } else {
            // Si es una imagen existente
            setExistingImages((prevImages) => {
                const updatedExistingImages = prevImages.filter((_, i) => i !== index);

                // Obtener el GUID correspondiente al índice eliminado de existingImagesGuid
                const deletedImageGuid = existingImagesGuid[index];

                // Agregar el GUID a deletedImages
                setDeleteImages((prevDeletedImages) => [...prevDeletedImages, deletedImageGuid]);

                return updatedExistingImages;
            });
        }
    };


    const checkForm = () => {
        const { name, category, price, brand, description } = data;
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
                        value={data.name}
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
                    <FormControlPrice
                        required
                        controlId="price"
                        vertical={true}
                        className="pb-2"
                        title={ViewStrings.price}
                        placeholder={ViewStrings.placeholderPrice}
                        onChange={handleInput}
                        value={data.price}
                    />
                    <FormControl
                        required
                        controlId="brand"
                        vertical={false}
                        className="pb-2"
                        title={ViewStrings.brand}
                        placeholder={ViewStrings.placeholderBrand}
                        onChange={handleInput}
                        value={data.brand}
                    />
                    <FormControl
                        required
                        controlId="description"
                        vertical={false}
                        className="pb-2"
                        title={ViewStrings.description}
                        placeholder={ViewStrings.placeholderDescription}
                        onChange={handleInput}
                        value={data.description}
                    />

                    <div {...getRootProps({ className: "dropzone d-flex align-items-center justify-content-center border border-3 rounded-4 p-5" })}>
                        <input {...getInputProps()} />
                        <span>Drag 'n' drop some files here</span>
                    </div>
                    <aside className=" p-4 gap-4">
                        {files}
                    </aside>
                </SectionLayout>

                <div className="d-flex justify-content-end align-items-center">
                    <Button disabled={!checkForm()} onClick={handleSubmit}>
                        Create
                    </Button>
                </div>
            </PanelLayout>
        </GeneralLayout>
    );
};

export default EditProduct;
