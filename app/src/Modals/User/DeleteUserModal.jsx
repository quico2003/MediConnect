
import { Button, Modal } from "react-bootstrap";
import useNotification from "../../Hooks/useNotification";
import useRequest from "../../Hooks/useRequest";
import ModalLayout from "../../Layouts/ModalLayout/ModalLayout";
import { Endpoints, getEndpoint } from "../../Constants/endpoints.contants";

const DeleteUserModal = ({ show, onClose, data }) => {


    const request = useRequest();

    const { showNotification: errorNotification } = useNotification();
    const { showNotification: successNotification } = useNotification("success");

    const handleSubmit = () => {
        request("post", getEndpoint(Endpoints.Users.delete), {guid: data})
        .then((res) => {
            successNotification("Deleted.");
            onClose(true);
        })
        .catch((err) => {
            errorNotification(err.message);
            onClose(true);
        })
    }


    const hideModal = () => {
        onClose(true);
    }  


    return(
        <ModalLayout
        show={show}
        onHide={hideModal}
        size="lm"
        header={true}
        customHeader={
            <div className="d-flex align-items-center justify-content-between w-100">
                <Modal.Title className="ms-2">Delete User</Modal.Title>
            </div>
        }
        footer={
            <div className="d-flex justify-content-end gap-2">
                <Button onClick={hideModal} size="lm">
                    Exit
                </Button> 
                <Button onClick={handleSubmit} variant="danger" size="lm">
                    Delete
                </Button> 
            </div>
        }
        >

            <div>
                estas seguro?
            </div>

            

        </ModalLayout>
    )

}
export default DeleteUserModal;