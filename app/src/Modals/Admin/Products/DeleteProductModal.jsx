import { Button, Modal } from "react-bootstrap";
import ModalLayout from "../../../Layouts/ModalLayout/ModalLayout";
import useRequest from "../../../Hooks/useRequest";
import { EndpointsAdmin, getEndpoint } from "../../../Constants/endpoints.contants";
import useNotification from "../../../Hooks/useNotification";
import { StringsContext } from "../../../Context/strings.context";
import { useContext } from "react";

const DeleteProductModal = ({ show, onClose, data }) => {

    const { strings } = useContext(StringsContext);
    const ViewStrings = strings.Products.delete;

    const request = useRequest();

    const { showNotification: errorNotification } = useNotification();
    const { showNotification: successNotification } = useNotification("success");

    const handleSubmit = () => {

        request("post", getEndpoint(EndpointsAdmin.Products.delete), { guid: data })
            .then(() => {
                successNotification(ViewStrings.succesAction)
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
                <Modal.Title>{ViewStrings.title}</Modal.Title>
            }
            footer={
                <div>
                    <Button onClick={hideModal} variant="ligth">{ViewStrings.cancel}</Button>
                    <Button onClick={handleSubmit} variant="danger">{ViewStrings.delete}</Button>
                </div>
            }
        >
            <div>
                {ViewStrings.descriptionAction}
            </div>

        </ModalLayout>
    )

}
export default DeleteProductModal;