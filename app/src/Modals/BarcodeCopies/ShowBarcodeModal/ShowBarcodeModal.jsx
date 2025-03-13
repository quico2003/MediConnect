import { Button } from "react-bootstrap";
import ModalLayout from "../../../Layouts/ModalLayout/ModalLayout";
import BarcodeComponent from "../../Unassign/UnassignCopyModal.jsx/Components/BarcodeComponent";
import { useContext } from "react";
import { StringsContext } from "../../../Context/strings.context";

const ShowBarcodeModal = ({ show, onClose, data }) => {
  const { strings } = useContext(StringsContext);
  const ViewStrings = strings.Unassign.Modal;
  const hideModal = () => {
    onClose();
  };

  return (
    <ModalLayout
      show={show}
      onHide={hideModal}
      size="lm"
      footer={
        <div className="d-flex justify-content-end gap-2">
          <Button variant="danger" size="lm" onClick={hideModal}>
            {ViewStrings.buttonClose}
          </Button>
        </div>
      }
    >
      <div className="mb-1">
        <BarcodeComponent code={data} />
      </div>
    </ModalLayout>
  );
};

export default ShowBarcodeModal;
