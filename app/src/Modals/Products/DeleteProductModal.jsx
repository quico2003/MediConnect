import { Button, Modal } from "react-bootstrap";
import ModalLayout from "../../Layouts/ModalLayout/ModalLayout";
import useRequest from "../../Hooks/useRequest";
import { Endpoints, getEndpoint } from "../../Constants/endpoints.contants";
import useNotification from "../../Hooks/useNotification";

const DeleteProductModal = ({ show, onClose, data }) => {

    const request = useRequest();

    const { showNotification: errorNotification } = useNotification();
    const { showNotification: successNotification } = useNotification("success");


    const handleSubmit = () => {

        request("post", getEndpoint(Endpoints.Products.delete), { guid: data })
            .then((res) => {
                successNotification("Product deleted.")
                onClose(true);

            })
            .catch((err) => console.log(err))

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
                <Modal.Title>Delete Product</Modal.Title>
            }
            footer={
                <div>
                    <Button onClick={handleSubmit} variant="danger">Borrar</Button>
                    <Button onClick={hideModal} variant="ligth">Cancelar</Button>
                </div>
            }
        >

        </ModalLayout>
    )

}
export default DeleteProductModal;