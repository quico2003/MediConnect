import { Button, Modal } from "react-bootstrap";
import ModalLayout from "../../../Layouts/ModalLayout/ModalLayout";
import FormControl from "../../../Components/Form/FormControl/FormControl";
import { useContext, useEffect, useState } from "react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import BarcodeLayoutToIndivudualPrint from "../../../Components/BarcodeLayoutToPrint/BarcodeLayoutToIndividualPrint";
import { validateData } from "../../../Config/GeneralFunctions";
import { StringsContext } from "../../../Context/strings.context";

const PrintCustomIndividualModal = ({ show, onClose, uniqid }) => {
  const { strings } = useContext(StringsContext);
  const ViewStrings = strings.PrintModal;
  const [data, setData] = useState({ copies: 1, rows: 10, cols: 3, offset: 0 });

  const handleInput = (e) => {
    const { id, value } = e.target;
    setData({ ...data, [id]: +value });
  };

  const hideModal = () => {
    onClose();
  };

  const checkForm = () => {
    const { copies, rows, cols, offset } = data;
    return (
      validateData([copies, rows, cols, offset]) &&
      copies > 0 &&
      rows > 0 &&
      cols > 0
    );
  };

  return (
    <ModalLayout
      show={show}
      onHide={hideModal}
      size="lm"
      header
      customHeader={
        <div className="d-flex align-items-center justify-content-between w-100">
          <Modal.Title className="ms-2">{ViewStrings.title}</Modal.Title>
        </div>
      }
      footer={
        <div className="d-flex justify-content-end gap-2">
          <Button variant="light" size="lm" onClick={hideModal}>
            {ViewStrings.Close}
          </Button>

          <Button
            disabled={!checkForm()}
            variant="light"
            size="lm"
            onClick={hideModal}
          >
            <PDFDownloadLink
              document={
                <BarcodeLayoutToIndivudualPrint
                  cols={data.cols}
                  rows={data.rows}
                  offset={data.offset}
                  copies={data.copies}
                  uniqid={uniqid}
                />
              }
              fileName={`Barcodes${data.copies}-${data.cols}-${data.rows}-${data.offset}.pdf`}
            >
              {({ loading }) =>
                loading ? ViewStrings.Loading : ViewStrings.Download
              }
            </PDFDownloadLink>
          </Button>
        </div>
      }
    >
      <div className="mb-1">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <span>{ViewStrings.Text}</span>
          <Button
            size="sm"
            onClick={() => setData({ copies: 1, rows: 10, cols: 3, offset: 0 })}
          >
            {ViewStrings.DefaultConf}
          </Button>
        </div>
        <FormControl
          controlId="copies"
          required
          title={ViewStrings.titleCopies}
          vertical={false}
          showMaxLength={false}
          type="number"
          step={1}
          value={data.copies}
          placeholder={ViewStrings.PlaceholderCopies}
          onChange={handleInput}
          min={1}
        ></FormControl>
        <FormControl
          controlId="cols"
          required
          title={ViewStrings.titleColumns}
          vertical={false}
          showMaxLength={false}
          type="number"
          step={1}
          value={data.cols}
          placeholder={ViewStrings.PlaceholderColumns}
          onChange={handleInput}
          min={1}
        ></FormControl>
        <FormControl
          controlId="rows"
          required
          title={ViewStrings.titleRows}
          vertical={false}
          showMaxLength={false}
          type="number"
          step={1}
          value={data.rows}
          placeholder={ViewStrings.PlaceholderRows}
          onChange={handleInput}
          min={1}
        ></FormControl>
        <FormControl
          controlId="offset"
          required
          title="Offset"
          vertical={false}
          showMaxLength={false}
          type="number"
          step={1}
          value={data.offset}
          placeholder={ViewStrings.PlaceholderOffset}
          max={data.cols * data.rows - 1}
          onChange={handleInput}
          min={0}
        ></FormControl>
      </div>
    </ModalLayout>
  );
};

export default PrintCustomIndividualModal;
