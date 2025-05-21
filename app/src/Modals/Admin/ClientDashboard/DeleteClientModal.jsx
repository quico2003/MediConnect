import { useContext } from "react";
import { StringsContext } from "../../../Context/strings.context";
import useRequest from "../../../Hooks/useRequest";
import useNotification from "../../../Hooks/useNotification";
import { EndpointsAdmin, EndpointsUser, getEndpoint } from "../../../Constants/endpoints.contants";
import ModalLayout from "../../../Layouts/ModalLayout/ModalLayout";
import { Button, Modal } from "react-bootstrap";

const DeleteClientModal = ({ show, onClose, data }) => {

    const { strings } = useContext(StringsContext);
    const ViewString = strings.dashboard.withoutUsers.deleteModal;

    const request = useRequest();

    const { showNotification: errorNotification } = useNotification();
    const { showNotification: successNotification } = useNotification("success");

    const handleSubmit = () => {
        request("post", getEndpoint(EndpointsAdmin.Dashboard.deleteClient), { guid: data })
            .then(() => {
                successNotification(ViewString.messageDeleted);
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
        header={true}
        customHeader={
            <Modal.Title>{ViewString.title}</Modal.Title>
        }
            footer={
                <div>
                    <Button onClick={hideModal} variant="ligth">{ViewString.buttonCancel}</Button>
                    <Button onClick={handleSubmit} variant="danger">{ViewString.buttonDelete}</Button>
                </div>
            }
        >
            <div>
                {ViewString.body}
            </div>
        </ModalLayout>
    )
}
export default DeleteClientModal;