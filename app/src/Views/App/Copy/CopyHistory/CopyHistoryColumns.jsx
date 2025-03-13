import { getColumnValue } from "../../../../Config/GeneralFunctions";
import IconButton from "../../../../Components/Buttons/IconButton";
import { TbReport } from "react-icons/tb";
import { StringsContext } from "../../../../Context/strings.context";
import { useContext } from "react";

export const CopyHistoryColumns = (openHistoryModal) => {
  const { strings } = useContext(StringsContext);
  const ViewStrings = strings.Copies.columns;

  const columns = [
    {
      Header: ViewStrings.season,
      Cell: (row) =>
        getColumnValue(row, (item) => <p className="mb-0">{item.season} </p>),
      width: 125,
    },
    {
      Header: ViewStrings.nia,
      Cell: (row) =>
        getColumnValue(row, (item) => (
          <p className="mb-0">{item.student_nia} </p>
        )),
      width: 125,
    },
    {
      Header: ViewStrings.name,
      Cell: (row) =>
        getColumnValue(row, (item) => (
          <p className="mb-0">{item.student_name} </p>
        )),
      width: 150,
    },
    {
      Header: ViewStrings.email,
      Cell: (row) =>
        getColumnValue(row, (item) => (
          <p className="mb-0">{item.student_email} </p>
        )),
      width: 150,
    },
    {
      Header: ViewStrings.action,
      Cell: (row) =>
        getColumnValue(row, (item) => (
          <div className="d-flex align-items-center">
            <IconButton
              Icon={TbReport}
              onClick={() => openHistoryModal(item)}
            />
          </div>
        )),
      width: 100,
    },
  ];
  return columns;
};
