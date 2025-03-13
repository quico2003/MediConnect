import { getColumnValue } from "../../../../Config/GeneralFunctions";
import StateDropdown from "../../../../Components/StateDropdown/StateDropdown";
import IconButton from "../../../../Components/Buttons/IconButton";
import { IoIosBarcode } from "react-icons/io";
import { BiSolidPrinter } from "react-icons/bi";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { Paths, replacePaths } from "../../../../Constants/paths.constants";
import { Views } from "../../../../Constants/views.constants";
import { MdRemoveRedEye } from "react-icons/md";
import { useContext } from "react";
import { StringsContext } from "../../../../Context/strings.context";

export const CopiesColumns = (
  updateState,
  openBarcodeModal,
  openPrintCustomIndividualModal
) => {
  const { strings } = useContext(StringsContext);
  const ViewStrings = strings.Copies.AllCopies;

  const columns = [
    {
      Header: ViewStrings.columns.code,
      Cell: (row) =>
        getColumnValue(row, (item) => <p className="mb-0">{item.uniqid}</p>),
      width: 150,
    },
    {
      Header: ViewStrings.columns.state,
      Cell: (row) =>
        getColumnValue(row, (item) => (
          <div>
            <StateDropdown
              onClick={(selectedOption) =>
                updateState(item.guid, selectedOption)
              }
              statusSelected={item.state}
            />
          </div>
        )),
      width: 150,
    },
    {
      Header: ViewStrings.columns.actions,
      Cell: (row) =>
        getColumnValue(row, (item) => (
          <div className="d-flex align-items-center gap-3">
            <div>
              <IconButton
                Icon={MdRemoveRedEye}
                as={Link}
                to={replacePaths(Paths[Views.copy_info].path, [
                  { copy_uniqid: item.uniqid },
                ])}
              />
            </div>
            <div className="d-flex align-items-center">
              <IconButton
                Icon={IoIosBarcode}
                onClick={() => openBarcodeModal(item.uniqid)}
              />
              <IconButton
                Icon={BiSolidPrinter}
                onClick={() => openPrintCustomIndividualModal(item.uniqid)}
              />
            </div>
          </div>
        )),
      width: 100,
    },
  ];
  return columns;
};
