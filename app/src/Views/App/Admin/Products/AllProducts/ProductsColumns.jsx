import { useContext } from "react"
import { StringsContext } from "../../../../../Context/strings.context"
import { getColumnValue } from "../../../../../Config/GeneralFunctions";
import { ButtonGroup } from "react-bootstrap";
import IconButton from "../../../../../Components/Buttons/IconButton";
import { IoMdEye } from "react-icons/io";
import { MdDelete, MdEdit } from "react-icons/md";
import { Paths, replacePaths } from "../../../../../Constants/paths.constants";
import { Views } from "../../../../../Constants/views.constants";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { IoBarcode } from "react-icons/io5";


export const ProductsColumns = (openViewProductModal, openViewBarcodeProductModal, openDeleteProductModal) => {

    const { strings } = useContext(StringsContext);
    const ViewStrings = strings.Products.Columns;

    const columns = [
        {
            Header: ViewStrings.name,
            Cell: (row) =>
                getColumnValue(row, (item) => <p className="mb-0 text-truncate" style={{maxWidth: "200px"}}>{item.name}</p>),
            
        },
        {
            Header: ViewStrings.brand,
            Cell: (row) =>
                getColumnValue(row, (item) => <p className="mb-0 text-truncate" style={{ maxWidth: "200px" }}>{item.brand}</p>),
            
        },
        {
            Header: ViewStrings.categoryName,
            Cell: (row) =>
                getColumnValue(row, (item) => <p className="mb-0 text-truncate" style={{ maxWidth: "200px" }}>{item.categoryName}</p>),
            
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
                                Icon={IoMdEye}
                                onClick={() => openViewProductModal(item.guid)}
                            />
                            <IconButton
                                Icon={IoBarcode}
                                onClick={() => openViewBarcodeProductModal(item.uniqid)}
                            />
                            <IconButton
                                Icon={MdEdit}
                                as={Link}
                                to={replacePaths(Paths[Views.edit_product].path, [
                                    { product_guid: item.guid },
                                ])}
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