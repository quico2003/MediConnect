import { useContext } from "react"
import { StringsContext } from "../../../../../Context/strings.context"
import { getColumnValue } from "../../../../../Config/GeneralFunctions";
import { IoMdEye } from "react-icons/io";
import { MdDelete, MdEdit } from "react-icons/md";
import IconButton from "../../../../../Components/Buttons/IconButton";
import { ButtonGroup } from "react-bootstrap";



export const ClientsColumns = (openViewClientModal, openDeleteClientModal) => { 

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
                                Icon={IoMdEye}
                                onClick={() => openViewClientModal(item.guid)}
                            />
                            <IconButton
                                Icon={MdEdit}
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
