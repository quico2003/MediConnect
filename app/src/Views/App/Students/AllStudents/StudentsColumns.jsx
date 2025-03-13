import { MdDelete, MdEdit, MdRemoveRedEye } from "react-icons/md";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import IconButton from "../../../../Components/Buttons/IconButton";
import { getColumnValue } from "../../../../Config/GeneralFunctions";
import { Paths, replacePaths } from "../../../../Constants/paths.constants";
import { Views } from "../../../../Constants/views.constants";
import { StringsContext } from "../../../../Context/strings.context";
import { useContext } from "react";

export const StudentsColumns = (openDeleteModal) => {
  const { strings } = useContext(StringsContext);
  const ViewStrings = strings.Students.AllStudents;
  const columns = [
    {
      Header: ViewStrings.columns.nia,
      Cell: (row) =>
        getColumnValue(row, (item) => <p className="mb-0">{item.nia}</p>),
      width: 100,
    },
    {
      Header: ViewStrings.columns.fullName,
      Cell: (row) =>
        getColumnValue(row, (item) => <p className="mb-0">{item.fullname}</p>),
      width: 200,
    },
    {
      Header: ViewStrings.columns.email,
      Cell: (row) =>
        getColumnValue(row, (item) => <p className="mb-0">{item.email}</p>),
      width: 150,
    },
    {
      Header: ViewStrings.columns.actions,
      width: 100,
      Cell: (row) =>
        getColumnValue(row, (item) => (
          <div className="d-flex align-items-center ">
            <IconButton
              Icon={MdRemoveRedEye}
              as={Link}
              to={replacePaths(Paths[Views.edit_student].path, [
                { student_guid: item.guid },
              ])}
            />
            <IconButton
              Icon={MdDelete}
              onClick={() => openDeleteModal(item.guid)}
            />
          </div>
        )),
    },
  ];
  return columns;
};
