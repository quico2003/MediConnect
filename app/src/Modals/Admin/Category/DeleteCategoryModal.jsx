import { Button, Modal } from "react-bootstrap";
import useNotification from "../../../Hooks/useNotification";
import useRequest from "../../../Hooks/useRequest";
import { useContext } from "react";
import ModalLayout from "../../../Layouts/ModalLayout/ModalLayout";
import { EndpointsAdmin, getEndpoint } from "../../../Constants/endpoints.contants";
import { StringsContext } from "../../../Context/strings.context";


const DeleteCategoryModal = ({ show, onClose, data }) => {

    const { strings } = useContext(StringsContext);
    const ViewStrings = strings.Categories.delete;

    const request = useRequest();

    const { showNotification: errorNotification } = useNotification();
    const { showNotification: successNotification } = useNotification("success");

    const handleSubmit = () => {
        request("post", getEndpoint(EndpointsAdmin.Categories.delete), { guid: data.guid })
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
                <div className="d-flex align-items-center justify-content-between w-100">
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
                <p>{ViewStrings.body}'{data?.name}'{ViewStrings.body1}</p>
            </div>
        </ModalLayout>
    );
}
export default DeleteCategoryModal;