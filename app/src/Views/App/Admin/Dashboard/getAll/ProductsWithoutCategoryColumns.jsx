import { useContext } from "react"
import { StringsContext } from "../../../../../Context/strings.context"
import { getColumnValue } from "../../../../../Config/GeneralFunctions";
import { ButtonGroup } from "react-bootstrap";
import IconButton from "../../../../../Components/Buttons/IconButton";
import { IoIosAdd } from "react-icons/io";
import { MdDelete } from "react-icons/md";


export const ProductsWithoutCategoryColumns = (openDeleteProductModal, openAssignCategoryModal) => {

    const { strings } = useContext(StringsContext);
    const ViewStrings = strings.Products.Columns;

    const columns = [
        {
            Header: ViewStrings.name,
            Cell: (row) =>
                getColumnValue(row, (item) => <p className="mb-0">{item.name}</p>),
        },
        {
            Header: ViewStrings.brand,
            Cell: (row) =>
                getColumnValue(row, (item) => <p className="mb-0">{item.brand}</p>),
        },
        {
            Header: ViewStrings.price,
            Cell: (row) =>
                getColumnValue(row, (item) => <p className="mb-0">{item.price}€</p>),
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
                                onClick={() => openAssignCategoryModal(item.guid)}
                            />
                            <IconButton
                                variant="danger"
                                Icon={MdDelete}
                                onClick={() => openDeleteProductModal(item.guid)}
                            />
                        </ButtonGroup>
                    </div>
                )),
        },

    ];
    return columns;
};