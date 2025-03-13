import { useContext, useState } from "react";
import FormControl from "../../../../Components/Form/FormControl/FormControl";
import SectionLayout from "../../../../Layouts/SectionLayout/SectionLayout";
import { StringsContext } from "../../../../Context/strings.context";
import { Button, Form } from "react-bootstrap";
import { validateData } from "../../../../Config/GeneralFunctions";
import useRequest from "../../../../Hooks/useRequest";

import {
  Endpoints,
  getEndpoint,
} from "../../../../Constants/endpoints.contants";
import useNotification from "../../../../Hooks/useNotification";
import IconButton from "../../../../Components/Buttons/IconButton";
import { MdBarcodeReader } from "react-icons/md";
import { BsFillWebcamFill } from "react-icons/bs";
import useModalManager from "../../../../Hooks/useModalManager";
import ShowScanBarcodeModal from "../../../../Modals/BarcodeCopies/ShowScanBarcodeModal/ShowScanBarcodeModal";

const FormToCheckStudent = ({ setData, data, setStep }) => {
  const { strings: Strings } = useContext(StringsContext);
  const GeneralStrings = Strings.General.App;
  const ViewStrings = Strings.Assign.NewAssign;

  const request = useRequest();

  const [isScanningEnabled, setIsScanningEnabled] = useState(false);

  const [scanning, setScanning] = useState(false);

  const { showNotification: errorNotification } = useNotification();

  const {
    closeModal: closeScanModal,
    openModal: openScanModal,
    show: showScanModal,
  } = useModalManager();

  const handleSubmit = (e) => {
    e && e.preventDefault();
    if (checkForm()) {
      request("post", getEndpoint(Endpoints.unassign.search.student), {
        nia: data.nia,
      })
        .then((res) => {
          setData(res.data);
          setStep(2);
        })
        .catch((err) => {
          switch (err.code) {
            case 409:
              errorNotification(ViewStrings.messages.NiaNotExist);
              break;
            default:
              errorNotification(err.message);
              break;
          }
        });
    } else {
      errorNotification(ViewStrings.messages.checkInputs);
    }
  };

  const handleInput = (e) => {
    const { id, value } = e.target;
    setData({ ...data, [id]: value });
  };

  const checkForm = () => {
    const { nia } = data;
    return validateData([nia]);
  };

  const handleCheck = () => {
    if (scanning) {
      document.getElementById("nia").blur();
    } else {
      document.getElementById("nia").focus();
    }
    setScanning((prevValue) => !prevValue);
  };

  const handleOpenScanModal = ({ isScanningEnabled }) => {
    openScanModal({ setIsScanningEnabled, isScanningEnabled });
  };

  const handleCloseScanModal = (nia) => {
    closeScanModal();
    setIsScanningEnabled(false);
    if (nia) {
      setData({ ...data, nia });
      handleSubmit();
    }
  };

  return (
    <div>
      <ShowScanBarcodeModal
        show={showScanModal}
        onClose={handleCloseScanModal}
        isScanningEnabled={isScanningEnabled}
        setIsScanningEnabled={setIsScanningEnabled}
      />

      <Form onSubmit={handleSubmit}>
        <SectionLayout
          title={ViewStrings.tileSection.titleIdentification}
          rightSection={
            <div className="d-flex gap-3">
              <IconButton
                title={scanning ? ViewStrings.scanning : ViewStrings.scanReader}
                Icon={MdBarcodeReader}
                onClick={handleCheck}
              ></IconButton>
              <IconButton
                Icon={BsFillWebcamFill}
                title={
                  isScanningEnabled
                    ? ViewStrings.scanning
                    : ViewStrings.scanWebcam
                }
                onClick={handleOpenScanModal}
              />
            </div>
          }
        >
          <FormControl
            required
            controlId="nia"
            maxLength={8}
            showMaxLength={true}
            vertical={false}
            value={data.nia}
            title={ViewStrings.inputs.niaInput.title}
            placeholder={ViewStrings.inputs.niaInput.placeholder}
            onChange={handleInput}
            autoFocus={false}
          />
        </SectionLayout>
        <div className="d-flex justify-content-end w-100 align-items-center">
          <Button disabled={!checkForm()} type="submit">
            {GeneralStrings.Next}
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default FormToCheckStudent;
