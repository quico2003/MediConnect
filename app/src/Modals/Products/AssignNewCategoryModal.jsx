import { Button, FormLabel, Modal } from "react-bootstrap";
import useRequest from "../../Hooks/useRequest"
import ModalLayout from "../../Layouts/ModalLayout/ModalLayout";
import { useEffect, useState } from "react";
import { EndpointsAdmin, getEndpoint } from "../../Constants/endpoints.contants";
import useNotification from "../../Hooks/useNotification";
import RequiredField from "../../Components/Form/RequiredField/RequiredField";
import Select from "react-select";

const AssignNewCategoryModal = ({ show, onClose, data }) => {

    const { showNotification: successNotification } = useNotification("success");
    const { showNotification: errorNotification } = useNotification();

    const request = useRequest();

    const [categories, setCategories] = useState({});
    const [selectedOption, setSelectedOption] = useState(null);

    useEffect(() => {
        if (show)
            fetchData();
    }, [show]);

    const fetchData = async () => {
        return await request("get", getEndpoint(EndpointsAdmin.Categories.getList))
            .then((res) => {
                setCategories(res.categories);
            })
            .catch((err) => errorNotification(err.message))
    }

    const handleSubmit = () => {
        return request("post", getEndpoint(EndpointsAdmin.Products.assignCategory), {
            productGuid: data,
            categoryGuid: selectedOption.value
        })
            .then(() => {
                successNotification("Categoria asignada a producto.");
                onClose(true);
            })
            .catch(() => errorNotification("Error al asignar categoria a producto."))
    }

    const handleSelect = (obj) => {
        setSelectedOption(obj);
    }

    const hideModal = () => {
        onClose(true);
    }

    return (
        <ModalLayout
            show={show}
            onHide={hideModal}
            header={true}
            customHeader={
                <Modal.Title>Assign a new Category for product</Modal.Title>
            }
            footer={
                <div>
                    <Button onClick={hideModal} variant="ligth">Cancel</Button>
                    <Button onClick={handleSubmit} variant="success">Assign</Button>
                </div>
            }
        >
            <div>
                <FormLabel className="mb-0">asdfsadf<RequiredField /></FormLabel>
                <Select
                    options={categories}
                    closeMenuOnSelect={true}
                    className="pb-2"
                    id="category"
                    onChange={handleSelect}
                    value={selectedOption}

                />
            </div>

        </ModalLayout>
    )


}
export default AssignNewCategoryModal