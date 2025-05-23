import { Button, FormLabel } from "react-bootstrap";
import ModalLayout from "../../../Layouts/ModalLayout/ModalLayout";
import { StringsContext } from "../../../Context/strings.context";
import { useContext, useEffect, useState } from "react";
import useRequest from "../../../Hooks/useRequest";
import useNotification from "../../../Hooks/useNotification";
import { EndpointsUser, getEndpoint } from "../../../Constants/endpoints.contants";
import ReactQuill from "react-quill";
import RequiredField from "../../../Components/Form/RequiredField/RequiredField";
import Select from "react-select";


const CompleteAppointmentsModal = ({ show, onClose, data, openMenuModal }) => {

    const { strings } = useContext(StringsContext);
    const ViewStrings = strings.User.Schedule.complete;

    const request = useRequest();

    const { showNotification: errorNotification } = useNotification();
    const { showNotification: successNotification } = useNotification("success");

    const [recipe, setRecipe] = useState({});
    const [products, setProducts] = useState({});
    const [selectedProducts, setSelectedProducts] = useState(null);

    useEffect(() => {
        if (show) fetchData();
    }, [show])

    const fetchData = () => {
        request("get", getEndpoint(EndpointsUser.Recipes.getProductsWithRecipe))
            .then((res) => setProducts(res.data))
            .catch((err) => errorNotification(err.message))
    }

    const handleSubmit = () => {
        request("download", getEndpoint(EndpointsUser.Recipes.create), {
            ...recipe,
            id: data.id
        })
            .then(() => {
                successNotification(ViewStrings.successMessage)
                onClose(true);

            })
            .catch((err) => errorNotification(err.message))
    }

    const handleInputDescription = (e) => {
        setRecipe({ ...recipe, "description": e })
    }

    const handleSelect = (obj) => {
        const selectedGuids = obj.map(product => product.value);
        setSelectedProducts(obj);
        setRecipe(prev => ({
            ...prev,
            products: selectedGuids
        }));
    }

    const hideModal = (bool = false) => {
        onClose(bool);
        openMenuModal();
    };

    return (
        <ModalLayout
            show={show}
            onHide={hideModal}
            size="lg"
            header={true}
            title="Recipe"
            footer={
                <div className="d-flex justify-content-end gap-2">
                    <Button variant="light" size="md" onClick={hideModal}>
                        {ViewStrings.bCancel}
                    </Button>
                    <Button onClick={handleSubmit} size="md">
                        {ViewStrings.bComplete}
                    </Button>
                </div>
            }
        >

            <FormLabel className="mb-0">{ViewStrings.description}<RequiredField /></FormLabel>
            <ReactQuill
                id="description"
                theme="snow"
                onChange={handleInputDescription}
                value={recipe.description}
            />
            <FormLabel className="mb-0">{ViewStrings.products}<RequiredField /></FormLabel>
            <Select
                options={products}
                closeMenuOnSelect={true}
                className="pb-2"
                id="category"
                onChange={handleSelect}
                value={selectedProducts}
                isSearchable
                isClearable
                isMulti
            />


        </ModalLayout>
    )

}
export default CompleteAppointmentsModal;