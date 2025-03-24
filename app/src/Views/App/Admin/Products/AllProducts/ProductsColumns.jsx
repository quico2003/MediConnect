import { useContext } from "react"
import { StringsContext } from "../../../../../Context/strings.context"

export const ProductsColumns = () => {

    const { strings } = useContext(StringsContext);
    const ViewStrings = strings.Products.Columns;

    const columns = [
        {
            Header: ViewStrings.name,
            Cell: (row) =>
                getColumnValue(row, (item) => <p className="mb-0">{item.name}</p>),
            width: "100%",
        },
        {
            Header: ViewStrings.brand,
            Cell: (row) =>
                getColumnValue(row, (item) => <p className="mb-0">{item.brand}</p>),
            width: "100%",
        },
        {
            Header: ViewStrings.price,
            Cell: (row) =>
                getColumnValue(row, (item) => <p className="mb-0">{item.price}</p>),
            width: "100%",
        },
        {
            Header: ViewStrings.actions,
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