import { useContext } from "react";
import { StringsContext } from "../../../../../../Context/strings.context";
import { getColumnValue } from "../../../../../../Config/GeneralFunctions";
import { ButtonGroup } from "react-bootstrap";
import IconButton from "../../../../../../Components/Buttons/IconButton";
import { IoIosAdd } from "react-icons/io";
import { MdDelete } from "react-icons/md";

export const ClientsWithoutUsersColumns = (openDeleteProductModal, openAssignUserModal) => {
    const { strings } = useContext(StringsContext);
    const ViewStrings = strings.User.allClients.columns;

    const columns = [
        {
            Header: ViewStrings.firstName,
            Cell: (row) =>
                getColumnValue(row, (item) => <p className="mb-0 text-truncate" style={{ maxWidth: "200px" }}>{item.first_name}</p>),
        },
        {
            Header: ViewStrings.email,
            Cell: (row) =>
                getColumnValue(row, (item) => <p className="mb-0 text-truncate" style={{ maxWidth: "200px" }}>{item.email}</p>),
        },
        {
            Header: ViewStrings.phone,
            Cell: (row) =>
                getColumnValue(row, (item) => <p className="mb-0">{item.phone}</p>),
        },
        {
            Header: ViewStrings.actions,
            Cell: (row) =>
                getColumnValue(row, (item) => (
                    <div className="d-flex">
                        <ButtonGroup>
                            <IconButton
                                variant="success"
                                Icon={IoIosAdd}
                                onClick={() => openAssignUserModal(item.guid)}
                            />
                            <IconButton
                                variant="danger"
                                Icon={MdDelete}
                                onClick={() => openDeleteProductModal(item.guid)} />
                        </ButtonGroup>
                    </div>
                )),
        },
    ];
    return columns;
}