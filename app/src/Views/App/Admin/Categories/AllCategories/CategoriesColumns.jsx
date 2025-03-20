
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import IconButton from "../../../../../Components/Buttons/IconButton";
import { getColumnValue } from "../../../../../Config/GeneralFunctions";
import { Paths, replacePaths } from "../../../../../Constants/paths.constants";
import { Views } from "../../../../../Constants/views.constants";
import { MdDelete, MdEdit } from "react-icons/md";
import { ButtonGroup } from "react-bootstrap";
import { IoMdEye } from "react-icons/io";

export const CategoriesColumns = (openDeleteCategoryModal, openViewCategoryModal) => {
  // const { strings } = useContext(StringsContext);
  // const ViewStrings = strings.Courses.Columns;
  const columns = [
    {
      Header: "Name",
      Cell: (row) =>
        getColumnValue(row, (item) => <p className="mb-0">{item.name}</p>),
      width: "100%",
    },
    {
      Header: "Actions",
      Cell: (row) =>
        getColumnValue(row, (item) => (
          <div className="d-flex">
            <ButtonGroup>
              <IconButton
                Icon={IoMdEye}
                onClick={() => openViewCategoryModal(item.guid)}
              />
              <IconButton
                Icon={MdEdit}
                as={Link}
                to={replacePaths(Paths[Views.edit_category].path, [
                  { category_guid: item.guid },
                ])}
              />
              <IconButton
                variant="danger"
                Icon={MdDelete}
                onClick={() => openDeleteCategoryModal(item)}
              />
            </ButtonGroup>
          </div>
        )),
    },


  ];
  return columns;
};
