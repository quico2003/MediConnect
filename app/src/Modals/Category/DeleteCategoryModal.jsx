import { Button, Modal } from "react-bootstrap";
import useNotification from "../../Hooks/useNotification";
import useRequest from "../../Hooks/useRequest";
import { useEffect } from "react";
import ModalLayout from "../../Layouts/ModalLayout/ModalLayout";
import { Endpoints, getEndpoint } from "../../Constants/endpoints.contants";


const DeleteCategoryModal = ({ show, onClose, data }) => {

    const request = useRequest();

    const { showNotification: errorNotification } = useNotification();
    const { showNotification: successNotification } = useNotification("success");


    const handleSubmit = () => {
        console.log(data);
        
        request("post", getEndpoint(Endpoints.Categories.delete), { guid: data.guid})
        .then((res) => {
            successNotification("Deleted.")
            onClose(true); 
        })
        .catch((err) => {
            errorNotification(err.message);
            onClose(true); 
        })
    };

    const hideModal = () => {
        onClose(true);
    };

    return (
        <ModalLayout
            show={show}
            onHide={hideModal}
            size="lm"
            header={true}
            customHeader={
                <div className="d-flex align-items-center justify-content-between w-100">
                    <Modal.Title className="ms-2">Delete Categoria</Modal.Title>
                </div>
            }
            footer={
                <div className="d-flex justify-content-end gap-2">
                    <Button variant="light" size="lm" onClick={hideModal}>
                        Cancel
                    </Button>
                    <Button onClick={handleSubmit} variant="danger" size="lm">
                        Confirm
                    </Button>
                </div>
            }>
            <div className="mb-1">
                <p>Are you sure you want to delete the '{data?.name}' category?</p>
            </div>
        </ModalLayout>
    );
}
export default DeleteCategoryModal;