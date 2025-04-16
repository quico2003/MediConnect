import { useContext } from "react";
import { StringsContext } from "../../../Context/strings.context";
import ModalLayout from "../../../Layouts/ModalLayout/ModalLayout";
import { Button, Modal } from "react-bootstrap";
import Barcode from "react-barcode";

const ViewBarcodeProductModal = ({ show, onClose, data }) => {

    const { strings } = useContext(StringsContext);
    const ViewStrings = strings.Products.barCode;

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
                    <Modal.Title className="ms-2">
                        {ViewStrings.title}
                    </Modal.Title>
                </div>
            }
            footer={
                <div className="d-flex justify-content-end gap-2">
                    <Button onClick={hideModal} variant="danger" size="md">
                        {ViewStrings.close}
                    </Button>
                </div>
            }>
            <div>
                <div className="d-flex justify-content-center">
                    <Barcode value={data} displayValue={false} />
                </div>

            </div>

        </ModalLayout>
    )

}
export default ViewBarcodeProductModal;