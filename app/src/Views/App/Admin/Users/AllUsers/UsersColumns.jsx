import { IoMdEye } from "react-icons/io";
import { getColumnValue } from "../../../../../Config/GeneralFunctions";
import { MdDelete, MdEdit } from "react-icons/md";
import IconButton from "../../../../../Components/Buttons/IconButton";
import { ButtonGroup } from "react-bootstrap";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { Paths, replacePaths } from "../../../../../Constants/paths.constants";
import { Views } from "../../../../../Constants/views.constants";
import { useContext } from "react";
import { StringsContext } from "../../../../../Context/strings.context";

export const UsersColumns = (openViewUserModal, openDeleteUserModal) => {

    const { strings } = useContext(StringsContext);
    const ViewStrings = strings.user.columns;

    const columns = [
        {
            Header: ViewStrings.firstName,
            Cell: (row) =>
                getColumnValue(row, (item) => <p className="mb-0">{item.firstName}</p>)
        },
        {
            Header: ViewStrings.lastName,
            Cell: (row) =>
                getColumnValue(row, (item) => <p className="mb-0">{item.secondName}</p>)
        },
        {
            Header: ViewStrings.email,
            Cell: (row) =>
                getColumnValue(row, (item) => <p className="mb-0">{item.email}</p>)
        },
        {
            Header: ViewStrings.specialty,
            Cell: (row) =>
                getColumnValue(row, (item) => <p className="mb-0">{item.specialty}</p>)
        },
        {
            Header: ViewStrings.actions,
            Cell: (row) =>
                getColumnValue(row, (item) => (
                    <div className="d-flex">
                        <ButtonGroup>
                            <IconButton
                                Icon={IoMdEye}
                                onClick={() => openViewUserModal(item.guid)}
                            />
                            <IconButton
                                Icon={MdEdit}
                                as={Link}
                                to={replacePaths(Paths[Views.edit_user].path, [
                                    { user_guid: item.guid },
                                ])}
                            />
                            <IconButton
                                variant="danger"
                                Icon={MdDelete}
                                onClick={() => openDeleteUserModal(item.guid)}
                            />
                        </ButtonGroup>
                    </div>
                )),
        },
    ];
    return columns;
};