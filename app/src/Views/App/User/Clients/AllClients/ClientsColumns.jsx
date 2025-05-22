import { useContext } from "react"
import { StringsContext } from "../../../../../Context/strings.context"
import { getColumnValue } from "../../../../../Config/GeneralFunctions";
import { MdDelete, MdEdit } from "react-icons/md";
import IconButton from "../../../../../Components/Buttons/IconButton";
import { ButtonGroup } from "react-bootstrap";
import { Paths, replacePaths } from "../../../../../Constants/paths.constants";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { Views } from "../../../../../Constants/views.constants";
import { IoFileTraySharp } from "react-icons/io5";

export const ClientsColumns = (openDeleteClientModal) => {

    const { strings } = useContext(StringsContext);
    const ViewStrings = strings.User.allClients.columns;

    const columns = [
        {
            Header: ViewStrings.firstName,
            Cell: (row) =>
                getColumnValue(row, (item) => <p className="mb-0">{item.first_name}</p>)
        },
        {
            Header: ViewStrings.lastName,
            Cell: (row) =>
                getColumnValue(row, (item) => <p className="mb-0">{item.last_name}</p>)
        },
        {
            Header: ViewStrings.email,
            Cell: (row) =>
                getColumnValue(row, (item) => <p className="mb-0">{item.email}</p>)
        },
        {
            Header: ViewStrings.phone,
            Cell: (row) =>
                getColumnValue(row, (item) => <p className="mb-0">{item.phone}</p>)
        },
        {
            Header: ViewStrings.actions,
            Cell: (row) =>
                getColumnValue(row, (item) => (
                    <div className="d-flex">
                        <ButtonGroup>
                            <IconButton
                                Icon={IoFileTraySharp}
                                as={Link}
                                to={replacePaths(Paths[Views.allInformation_client].path, [
                                    { client_guid: item.guid }
                                ])}
                            />
                            <IconButton
                                Icon={MdEdit}
                                as={Link}
                                to={replacePaths(Paths[Views.edit_client].path, [
                                    { client_guid: item.guid }
                                ])}
                            />
                            <IconButton
                                variant="danger"
                                Icon={MdDelete}
                                onClick={() => openDeleteClientModal(item.guid)}
                            />
                        </ButtonGroup>
                    </div>
                )),
        },
    ]
    return columns;
}
