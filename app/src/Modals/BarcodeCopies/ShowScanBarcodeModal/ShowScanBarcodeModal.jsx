import { useContext, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import BarcodeScannerComponent from "react-webcam-barcode-scanner";
import { StringsContext } from "../../../Context/strings.context";

const ShowScanBarcodeModal = ({
  show,
  onClose,
  isScanningEnabled,
  setIsScanningEnabled,
}) => {
  const { strings: Strings } = useContext(StringsContext);
  const ViewStrings = Strings.BarcodeScanModal;

  useEffect(() => {
    if (show) {
      setIsScanningEnabled(true);
    }
  }, [show]);

  const handleBarcodeScan = (err, result) => {
    if (result?.text) {
      setIsScanningEnabled(false);
      onClose(result.text);
    }
  };

  return (
    <Modal
      show={show}
      onHide={() => {
        onClose(false);
      }}
    >
      <Modal.Body className="align-items-center">
        <div>
          <h5 className="secondary text-center ">{ViewStrings.title}</h5>
        </div>
        <div className="d-flex justify-content-center mt-3  ">
          {isScanningEnabled && (
            <BarcodeScannerComponent
              width={500}
              height={250}
              onUpdate={handleBarcodeScan}
            />
          )}
        </div>
      </Modal.Body>
      <Modal.Footer className="justify-content-center">
        <Button variant="secondary" onClick={() => onClose(false)}>
          {ViewStrings.close}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ShowScanBarcodeModal;
