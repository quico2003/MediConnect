import { IoMdEye } from "react-icons/io";
import { getColumnValue } from "../../../../../Config/GeneralFunctions";
import { MdDelete, MdEdit } from "react-icons/md";
import IconButton from "../../../../../Components/Buttons/IconButton";
import { ButtonGroup } from "react-bootstrap";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

export const UsersColumns = (openViewUserModal, openDeleteUserModal) => {

    const columns = [
        {
            Header: "name",
            Cell: (row) =>
                getColumnValue(row, (item) => <p className="mb-0">{item.firstName}</p>)
        },
        {
            Header: "surname",
            Cell: (row) =>
                getColumnValue(row, (item) => <p className="mb-0">{item.secondName}</p>)
        },
        {
            Header: "email",
            Cell: (row) =>
                getColumnValue(row, (item) => <p className="mb-0">{item.email}</p>)
        },
        {
            Header: "Specialty",
            Cell: (row) =>
                getColumnValue(row, (item) => <p className="mb-0">{item.specialty}</p>)
        },
        {
            Header: "actions",
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