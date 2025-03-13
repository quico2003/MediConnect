import Barcode from "react-barcode";
import { StringsContext } from "../../../../Context/strings.context";
import { useContext } from "react";

const BarcodeComponent = ({ code, notitle = false, size = 2 }) => {
  const { strings } = useContext(StringsContext);
  const ViewStrings = strings.Unassign.Modal;
  return (
    <div>
      {notitle ? "" : <h5 className="m-1">{ViewStrings.code}</h5>}
      <div className="d-flex justify-content-center">
        <Barcode width={size} fontSize="18" value={code} />
      </div>
    </div>
  );
};

export default BarcodeComponent;
