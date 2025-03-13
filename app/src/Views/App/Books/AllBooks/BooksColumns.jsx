import { MdDelete, MdEdit, MdRemoveRedEye } from "react-icons/md";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import IconButton from "../../../../Components/Buttons/IconButton";
import { getColumnValue } from "../../../../Config/GeneralFunctions";
import { Paths, replacePaths } from "../../../../Constants/paths.constants";
import { Views } from "../../../../Constants/views.constants";
import FormSwitch from "../../../../Components/Form/FormSwitch/FormSwitch";
import { useContext } from "react";
import { StringsContext } from "../../../../Context/strings.context";

export const BooksColumns = (openDeleteModal) => {
  const { strings } = useContext(StringsContext);
  const ViewStrings = strings.Books.AllBooks;

  const columns = [
    {
      Header: ViewStrings.columns.name,
      Cell: (row) =>
        getColumnValue(row, (item) => <p className="mb-0">{item.name}</p>),
      width: 100,
    },
    {
      Header: ViewStrings.columns.isbn,
      Cell: (row) =>
        getColumnValue(row, (item) => <p className="mb-0">{item.isbn}</p>),
      width: 100,
    },
    {
      Header: ViewStrings.columns.subject,
      Cell: (row) =>
        getColumnValue(row, (item) => (
          <p className="mb-0">{item.subjectName}</p>
        )),
      width: 100,
    },
    {
      Header: ViewStrings.columns.stock,
      Cell: (row) =>
        getColumnValue(row, (item) => <p className="mb-0">{item.stock}</p>),
      width: 100,
    },
    {
      Header: ViewStrings.columns.actions,
      width: 10,
      Cell: (row) =>
        getColumnValue(row, (item) => (
          <div className="d-flex gap-3">
            <div className="d-flex align-items-center">
              <IconButton
                Icon={MdRemoveRedEye}
                as={Link}
                to={replacePaths(Paths[Views.copies].path, [
                  { book_guid: item.guid },
                ])}
              />
            </div>
            <div className="d-flex align-items-center">
              <IconButton
                Icon={MdEdit}
                as={Link}
                to={replacePaths(Paths[Views.edit_book].path, [
                  { book_guid: item.guid },
                ])}
              />
              <IconButton
                Icon={MdDelete}
                onClick={() => openDeleteModal(item.guid)}
              />
            </div>
          </div>
        )),
    },
  ];
  return columns;
};
