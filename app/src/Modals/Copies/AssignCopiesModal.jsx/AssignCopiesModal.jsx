import { Button, Form, Modal } from "react-bootstrap";
import { Endpoints, getEndpoint } from "../../../Constants/endpoints.contants";
import useNotification from "../../../Hooks/useNotification";
import useRequest from "../../../Hooks/useRequest";
import ModalLayout from "../../../Layouts/ModalLayout/ModalLayout";
import { StringsContext } from "../../../Context/strings.context";
import { useContext, useEffect, useState } from "react";
import IconButton from "../../../Components/Buttons/IconButton";
import { BsFillWebcamFill } from "react-icons/bs";
import { MdBarcodeReader } from "react-icons/md";
import ShowScanBarcodeModal from "../../BarcodeCopies/ShowScanBarcodeModal/ShowScanBarcodeModal";
import useModalManager from "../../../Hooks/useModalManager";
import FormControl from "../../../Components/Form/FormControl/FormControl";

const AssignCopiesModal = ({ show, onClose, data }) => {
  const { strings } = useContext(StringsContext);
  const ViewStrings = strings.Assign;
  const request = useRequest();

  const [isScanningEnabled, setIsScanningEnabled] = useState(false);
  const [scanning, setScanning] = useState(false);

  const { showNotification: errorNotification } = useNotification();
  const { showNotification: successNotification } = useNotification("success");

  const [uniqid, setUniqid] = useState("");

  useEffect(() => {
    if (show) {
      setUniqid("");
      setScanning(false);
    }
  }, [show]);

  const {
    closeModal: closeScanModal,
    openModal: openScanModal,
    show: showScanModal,
  } = useModalManager();

  const handleSubmit = (uniqid) => {
    request("post", getEndpoint(Endpoints.assign.check.checkAssign), {
      uniqid: uniqid,
      subject: data.value,
    })
      .then((res) => {
        successNotification(ViewStrings.NewAssign.messages.Assigndone);
        onClose({ uniqid, value: data.value });
      })
      .catch((err) => {
        switch (err.code) {
          case 409:
            errorNotification(ViewStrings.NewAssign.messages.copyAsigned);
            break;
          case 0:
            errorNotification(ViewStrings.NewAssign.messages.copyNotAvailable);
            break;
          case 304:
            errorNotification(
              ViewStrings.NewAssign.messages.subjectAlreadyAsigned
            );
            break;
          case 404:
            errorNotification(ViewStrings.NewAssign.messages.notExist);
            break;
          default:
            errorNotification(err.message);
            break;
        }
        onClose(true);
      });
  };

  const hideModal = () => {
    onClose(true);
  };

  const handleText = (e) => {
    const { value } = e.target;
    setUniqid(value);
  };

  const handleCheck = () => {
    if (scanning) {
      document.getElementById("uniqid").blur();
    } else {
      document.getElementById("uniqid").focus();
    }
    setScanning((prevValue) => !prevValue);
  };

  const handleOpenScanModal = ({ isScanningEnabled }) => {
    openScanModal({ setIsScanningEnabled, isScanningEnabled });
  };

  const handleCloseScanModal = (uniqid) => {
    closeScanModal();
    setIsScanningEnabled(false);
    if (uniqid) {
      setUniqid(uniqid);
      handleSubmit(uniqid);
    }
  };

  const fontSize = {
    fontSize: "16px",
  };

  return (
    <>
      <ShowScanBarcodeModal
        show={showScanModal}
        onClose={handleCloseScanModal}
        isScanningEnabled={isScanningEnabled}
        setIsScanningEnabled={setIsScanningEnabled}
      />

      <ModalLayout
        show={show}
        onHide={hideModal}
        size="lg"
        header={true}
        customHeader={
          <div className="d-flex align-items-center justify-content-between w-100">
            <Modal.Title className="ms-2">
              {ViewStrings.AssignModal.title} {data.label}
            </Modal.Title>
            <div className="d-flex align-items-center justify-content-between">
              <IconButton
                title={
                  scanning
                    ? ViewStrings.AssignModal.scanning
                    : ViewStrings.AssignModal.scan
                }
                Icon={MdBarcodeReader}
                onClick={handleCheck}
              ></IconButton>
              <IconButton
                Icon={BsFillWebcamFill}
                title={
                  isScanningEnabled
                    ? ViewStrings.AssignModal.scanning
                    : ViewStrings.AssignModal.scan
                }
                onClick={handleOpenScanModal}
              />
            </div>
          </div>
        }
        footer={
          <div className="d-flex justify-content-end gap-2">
            <Button variant="light" size="lm" onClick={hideModal}>
              {ViewStrings.AssignModal.cancel}
            </Button>
            <Button
              variant="danger"
              size="lm"
              disabled={!uniqid}
              onClick={() => handleSubmit(uniqid)}
            >
              {ViewStrings.AssignModal.confirm}
            </Button>
          </div>
        }
      >
        <Form
          className="mb-3"
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit(uniqid);
          }}
        >
          <FormControl
            required
            controlId="uniqid"
            maxLength={13}
            showMaxLength={true}
            vertical={false}
            value={uniqid}
            title={ViewStrings.AssignModal.label}
            placeholder={ViewStrings.AssignModal.placeholder}
            onChange={handleText}
            autoFocus={false}
          />
        </Form>
      </ModalLayout>
    </>
  );
};

export default AssignCopiesModal;
