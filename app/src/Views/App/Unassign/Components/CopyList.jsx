import { useContext, useEffect, useRef, useState } from "react";
import { FormControl, ListGroup, ListGroupItem } from "react-bootstrap";
import {
  Endpoints,
  getEndpoint,
} from "../../../../Constants/endpoints.contants";

import { StringsContext } from "../../../../Context/strings.context";
import useLoaded from "../../../../Hooks/useLoaded";
import useNotification from "../../../../Hooks/useNotification";
import useRequest from "../../../../Hooks/useRequest";
import useModalManager from "../../../../Hooks/useModalManager";
import SectionLayout from "../../../../Layouts/SectionLayout/SectionLayout";
import CopyItem from "./CopyItem";
import UnassignCopyModal from "../../../../Modals/Unassign/UnassignCopyModal.jsx/UnassignCopyModal";
import NotFoundComponent from "../../../../Components/NotFoundComponent";
import IconButton from "../../../../Components/Buttons/IconButton";
import { MdBarcodeReader } from "react-icons/md";
import { BsFillWebcamFill } from "react-icons/bs";
import ShowScanBarcodeModal from "../../../../Modals/BarcodeCopies/ShowScanBarcodeModal/ShowScanBarcodeModal";

const CopyList = ({ data, setData, setStep }) => {
  const { strings } = useContext(StringsContext);
  const ViewStrings = strings.Unassign.step2;

  const request = useRequest();

  const scanRef = useRef();

  const {
    closeModal: closeUnassignModal,
    openModal: openUnassignModal,
    show: showUnassignModal,
    data: UnassignDataModal,
  } = useModalManager();

  const {
    closeModal: closeScanModal,
    openModal: openScanModal,
    show: showScanModal,
  } = useModalManager();

  const { showNotification: errorNotification } = useNotification();

  const { startFetching, finishFetching, fetching, loaded } = useLoaded();

  const [isScanFocus, setIsScanFocus] = useState(false);
  const [isScanningEnabled, setIsScanningEnabled] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    startFetching();
    return await request("get", getEndpoint(Endpoints.unassign.search.copies), {
      nia: data.nia,
    })
      .then((res) => {
        setData({ ...data, copies: res.data });
      })
      .catch(errorNotification)
      .finally(() => finishFetching());
  };

  const handleCloseUnassignCopy = (refresh) => {
    if (refresh) fetchData();
    closeUnassignModal();
  };
  const handleCloseScanModal = (uniqid) => {
    closeScanModal();
    if (uniqid) {
      handleOpenModal(getCopy(uniqid));
    }
  };

  const handleFocusScan = (e) => {
    e.preventDefault();
    setIsScanFocus(true);
    scanRef.current.focus();
  };

  const handleCopyCode = (e) => {
    e && e.preventDefault();
    const {
      target: { value },
      keyCode,
    } = e;
    if (keyCode === 13) {
      const item = getCopy(value);
      handleOpenModal(item);
    }
  };

  const clearScanFocus = () => {
    scanRef.current.value = "";
    scanRef.current.blur();
    setIsScanFocus(false);
  };

  const handleOpenModal = ({ uniqid, guid, book_name }) => {
    setIsScanningEnabled(false);
    openUnassignModal({ uniqid, guid, book_name });
  };

  const handleOpenScanModal = ({ isScanningEnabled }) => {
    openScanModal({ setIsScanningEnabled, isScanningEnabled });
  };

  const getCopy = (value) => {
    const item = data.copies?.find((copy) => copy.uniqid === value);
    if (item) return item;
    else return errorNotification(ViewStrings.messages.bookError);
  };

  return (
    <>
      {/* Modals */}
      <UnassignCopyModal
        show={showUnassignModal}
        onClose={handleCloseUnassignCopy}
        data={UnassignDataModal}
      />

      <ShowScanBarcodeModal
        show={showScanModal}
        onClose={handleCloseScanModal}
        isScanningEnabled={isScanningEnabled}
        setIsScanningEnabled={setIsScanningEnabled}
      />

      <div className="position-absolute" style={{ zIndex: -10 }}>
        <FormControl
          onBlur={clearScanFocus}
          name="scan_code"
          ref={scanRef}
          onKeyUp={handleCopyCode}
        />
      </div>

      <SectionLayout
        rightSection={
          <div className="d-flex gap-3">
            <IconButton
              Icon={MdBarcodeReader}
              title={
                isScanFocus ? ViewStrings.scanning : ViewStrings.scanReader
              }
              onClick={handleFocusScan}
            />
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
        title={ViewStrings.title}
        loaded={loaded}
      >
        {data.copies?.length > 0 ? (
          <ListGroup>
            {data.copies?.map((item, idx) => (
              <ListGroupItem key={idx}>
                <CopyItem
                  item={item}
                  openUnassignModal={() => handleOpenModal(item)}
                />
              </ListGroupItem>
            ))}
          </ListGroup>
        ) : (
          <NotFoundComponent
            buttonText={ViewStrings.notFoundComponent.buttonText}
            description={ViewStrings.notFoundComponent.description}
            text={ViewStrings.notFoundComponent.text}
            onClick={() => {
              setStep(1), setData("");
            }}
            subDescription={ViewStrings.notFoundComponent.subDescription}
            size={1.5}
          />
        )}
      </SectionLayout>
    </>
  );
};

export default CopyList;
