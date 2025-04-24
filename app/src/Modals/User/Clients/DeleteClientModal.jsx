import { useContext } from "react";
import { StringsContext } from "../../../Context/strings.context";
import useRequest from "../../../Hooks/useRequest";
import useNotification from "../../../Hooks/useNotification";
import ModalLayout from "../../../Layouts/ModalLayout/ModalLayout";
import { Button, Modal } from "react-bootstrap";
import { EndpointsUser, getEndpoint } from "../../../Constants/endpoints.contants";

const DeleteClientModal = ({ show, onClose, data }) => {

    const { strings } = useContext(StringsContext);
    const ViewStrings = strings.User.delete;

    const request = useRequest();

    const { showNotification: errorNotification } = useNotification();
    const { showNotification: successNotification } = useNotification("success");

    const handleSubmit = () => {
        request("post", getEndpoint(EndpointsUser.Clients.delete), { guid: data })
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
            size="md"
            header={true}
            customHeader={
                <div>
                    <Modal.Title className="ms-2">{ViewStrings.title}</Modal.Title>
                </div>
            }
            footer={
                <div className="d-flex justify-content-end gap-2">
                    <Button onClick={hideModal} size="md">
                        {ViewStrings.buttonCancel}
                    </Button>
                    <Button onClick={handleSubmit} variant="danger" size="md">
                        {ViewStrings.buttonDelete}
                    </Button>
                </div>
            }>
            <div>
                {ViewStrings.body}
            </div>
        </ModalLayout>
    )
}
export default DeleteClientModal;