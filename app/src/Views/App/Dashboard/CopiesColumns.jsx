import { MdDelete } from "react-icons/md";
import IconButton from "../../../Components/Buttons/IconButton";
import { getColumnValue } from "../../../Config/GeneralFunctions";
import { useContext } from "react";
import { StringsContext } from "../../../Context/strings.context";
import StarsComponent from "../Copy/CopyInfo/Components/Stars";

export const CopiesColumnsDashboard = (openDeleteModal) => {
  const { strings } = useContext(StringsContext);
  const ViewStrings = strings.Dashboard.tableOfCopies;

  const columns = [
    {
      Header: ViewStrings.code,
      Cell: (row) =>
        getColumnValue(row, (item) => <p className="mb-0">{item.uniqid}</p>),
      width: 100,
    },
    {
      Header: ViewStrings.state,
      Cell: (row) =>
        getColumnValue(row, (item) => <StarsComponent state={item.state} />),
      width: 100,
    },
    {
      Header: ViewStrings.book,
      Cell: (row) =>
        getColumnValue(row, (item) => <p className="mb-0">{item.bookName}</p>),
      width: 100,
    },
    {
      Header: ViewStrings.course,
      Cell: (row) =>
        getColumnValue(row, (item) => (
          <p className="mb-0">{item.courseName}</p>
        )),
      width: 100,
    },
    {
      Header: ViewStrings.subject,
      Cell: (row) =>
        getColumnValue(row, (item) => (
          <p className="mb-0">{item.subjectName}</p>
        )),
      width: 100,
    },
    {
      Header: ViewStrings.action,
      width: 10,
      Cell: (row) =>
        getColumnValue(row, (item) => (
          <IconButton
            Icon={MdDelete}
            onClick={() => openDeleteModal(item.guid)}
          />
        )),
    },
  ];
  return columns;
};
