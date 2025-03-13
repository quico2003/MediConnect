import { useContext, useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { Endpoints, getEndpoint } from "../../../Constants/endpoints.contants";
import useNotification from "../../../Hooks/useNotification";
import useRequest from "../../../Hooks/useRequest";
import ModalLayout from "../../../Layouts/ModalLayout/ModalLayout";
import BarcodeComponent from "./Components/BarcodeComponent";
import StateByFacesComponent from "./Components/StateByFacesComponent";
import Observationscomponent from "./Components/ObservationsComponent";
import { validateData } from "../../../Config/GeneralFunctions";
import { StringsContext } from "../../../Context/strings.context";

const UnassignCopyModal = ({ show, onClose, data }) => {
  const request = useRequest();

  const { strings } = useContext(StringsContext);
  const ViewStrings = strings.Unassign.Modal;

  const { showNotification: errorNotification } = useNotification();
  const { showNotification: successNotification } = useNotification("success");

  const [localData, setLocalData] = useState({});

  useEffect(() => {
    if (show) setLocalData(data);
  }, [data, show]);

  const handleSubmit = () => {
    if (checkData()) {
      request("post", getEndpoint(Endpoints.unassign.unassign.copies), {
        guid: data.guid,
        ...localData,
      })
        .then((res) => {
          successNotification(ViewStrings.messageDeleted);
          onClose(true);
        })
        .catch((err) => errorNotification(err.message));
    }
  };

  const hideModal = () => {
    onClose();
  };

  const checkData = () => {
    const { uniqid, state } = localData;
    return validateData([uniqid, state]);
  };

  return (
    <ModalLayout
      show={show}
      onHide={hideModal}
      size="lm"
      header={true}
      customHeader={
        <div className="d-flex align-items-center justify-content-between w-100">
          <Modal.Title className="ms-2">{localData.book_name}</Modal.Title>
        </div>
      }
      footer={
        <div className="d-flex justify-content-end gap-2">
          <Button variant="light" size="lm" onClick={hideModal}>
            {ViewStrings.buttonCancel}
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={!checkData()}
            variant="danger"
            size="lm"
          >
            {ViewStrings.buttonConfirm}
          </Button>
        </div>
      }
    >
      <div className="mb-1">
        <BarcodeComponent code={localData.uniqid} />
        <StateByFacesComponent data={localData} setData={setLocalData} />
        <Observationscomponent data={localData} setData={setLocalData} />
      </div>
    </ModalLayout>
  );
};

export default UnassignCopyModal;
