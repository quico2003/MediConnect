import { MdDelete, MdEdit } from "react-icons/md";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import IconButton from "../../../../Components/Buttons/IconButton";
import { getColumnValue } from "../../../../Config/GeneralFunctions";
import { Paths, replacePaths } from "../../../../Constants/paths.constants";
import { Views } from "../../../../Constants/views.constants";
import { useContext } from "react";
import { StringsContext } from "../../../../Context/strings.context";

export const SubjectsColumns = (openDeleteModal) => {
  const { strings } = useContext(StringsContext);
  const ViewStrings = strings.Subjects.AllSubjects.columns;

  const columns = [
    {
      Header: ViewStrings.course,
      Cell: (row) =>
        getColumnValue(row, (item) => (
          <p className="mb-0">{item.course.abbr}</p>
        )),
      width: 50,
    },
    {
      Header: ViewStrings.name,
      Cell: (row) =>
        getColumnValue(row, (item) => <p className="mb-0">{item.name}</p>),
      width: 100,
    },
    {
      Header: ViewStrings.abbr,
      Cell: (row) =>
        getColumnValue(row, (item) => <p className="mb-0">{item.abbr}</p>),
      width: 100,
    },
    {
      Header: ViewStrings.actions,
      width: 10,
      Cell: (row) =>
        getColumnValue(row, (item) => (
          <div className="d-flex align-items-center">
            <IconButton
              Icon={MdEdit}
              as={Link}
              to={replacePaths(Paths[Views.edit_subject].path, [
                { subject_guid: item.guid },
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
