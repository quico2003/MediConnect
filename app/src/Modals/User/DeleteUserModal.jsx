
import { Button, Modal } from "react-bootstrap";
import useNotification from "../../Hooks/useNotification";
import useRequest from "../../Hooks/useRequest";
import ModalLayout from "../../Layouts/ModalLayout/ModalLayout";
import { Endpoints, getEndpoint } from "../../Constants/endpoints.contants";
import { useContext } from "react";
import { StringsContext } from "../../Context/strings.context";

const DeleteUserModal = ({ show, onClose, data }) => {

    const { strings } = useContext(StringsContext);
    const ViewStrings = strings.user.delete;

    const request = useRequest();

    const { showNotification: errorNotification } = useNotification();
    const { showNotification: successNotification } = useNotification("success");

    const handleSubmit = () => {
        request("post", getEndpoint(Endpoints.Users.delete), { guid: data })
            .then(() => {
                successNotification(ViewStrings.messageDeleted);
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

    return (
        <ModalLayout
            show={show}
            onHide={hideModal}
            size="lm"
            header={true}
            customHeader={
                <div className="d-flex align-items-center justify-content-between w-100">
                    <Modal.Title className="ms-2">{ViewStrings.title}</Modal.Title>
                </div>
            }
            footer={
                <div className="d-flex justify-content-end gap-2">
                    <Button onClick={hideModal} size="lm">
                        {ViewStrings.buttonCancel}
                    </Button>
                    <Button onClick={handleSubmit} variant="danger" size="lm">
                        {ViewStrings.buttonDelete}
                    </Button>
                </div>
            }
        >
            <div>
                {ViewStrings.body}
            </div>
        </ModalLayout>
    )

}
export default DeleteUserModal;