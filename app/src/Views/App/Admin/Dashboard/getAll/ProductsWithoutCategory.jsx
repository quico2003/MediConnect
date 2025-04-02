import { useContext, useEffect, useState } from "react";
import GeneralLayout from "../../../../../Layouts/GeneralLayout/GeneralLayout";
import { StringsContext } from "../../../../../Context/strings.context";
import PanelLayout from "../../../../../Layouts/PanelLayout/PanelLayout";
import useRequest from "../../../../../Hooks/useRequest";
import useLoaded from "../../../../../Hooks/useLoaded";
import ReactTable from "../../../../../Components/Table/Table";
import { Link, useLocation } from "react-router-dom/cjs/react-router-dom.min";
import useQuery from "../../../../../Hooks/useQuery";
import { Endpoints, getEndpoint } from "../../../../../Constants/endpoints.contants";
import useNotification from "../../../../../Hooks/useNotification";
import { Configuration } from "../../../../../Config/app.config";
import { ProductsWithoutCategoryColumns } from "./ProductsWithoutCategoryColumns";
import useModalManager from "../../../../../Hooks/useModalManager";
import DeleteProductModal from "../../../../../Modals/Products/DeleteProductModal";
import AssignNewCategoryModal from "../../../../../Modals/Products/assignNewCategoryModal";

const ProductsWithoutCategory = () => {

    const { strings } = useContext(StringsContext);
    const ViewStrings = strings.Products;

    const request = useRequest();
    const { search } = useLocation();
    const [data, setData] = useState([]);

    const [filterSelected] = useState();
    const [totalPages, setTotalPages] = useState(1);
    const searchParams = useQuery();

    const { startFetching, finishFetching, fetching, loaded } = useLoaded();

    const { showNotification: errorNotification } = useNotification();

    const {
        closeModal: closeDeleteProductModal,
        openModal: openDeleteProductModal,
        show: showDeleteProductModal,
        data: deleteProductData,
    } = useModalManager();

    const {
        closeModal: coseAssignCategoryModal,
        openModal: openAssignCategoryModal,
        show: showAssignCategoryModal,
        data: assignCategoryModal,
    } = useModalManager();

    useEffect(() => {
        fetchData();
    }, [search]);

    const fetchData = async (
        page = 1,
        offset = Configuration.tables.defaultPageSize,
        search = searchParams.get("search"),
        filter = filterSelected
    ) => {

        startFetching();
        return await request(
            "get",
            getEndpoint(Endpoints.Products.getAllWithoutCategory),
            {
                page,
                offset,
                search,
                filter: JSON.stringify(filter ? [filter] : []),
            })
            .then((res) => {
                setData(res.products);
                setTotalPages(res.totalPages);
            })
            .catch(errorNotification)
            .finally(() => finishFetching());
    }

    const handleCloseDeleteProductModal = (refresh) => {
        if (refresh) fetchData();
        closeDeleteProductModal();
    }

    const handleCloseAssignCategoryModal = (refresh) => {
        if (refresh) fetchData();
        coseAssignCategoryModal();
    }

    return (
        <>
            <DeleteProductModal
                onClose={handleCloseDeleteProductModal}
                show={showDeleteProductModal}
                data={deleteProductData}
            />

            <AssignNewCategoryModal
                onClose={handleCloseAssignCategoryModal}
                show={showAssignCategoryModal}
                data={assignCategoryModal}
            />

            <GeneralLayout title="Products Without Category">
                <PanelLayout loaded={loaded}>
                    <ReactTable
                        totalPages={totalPages}
                        fetching={fetching}
                        onEventChange={fetchData}
                        data={data}
                        emptyData={{
                            text: "No found producst without category",
                            description: "Is Goodd!!"
                        }}
                        columns={ProductsWithoutCategoryColumns(
                            openDeleteProductModal,
                            openAssignCategoryModal
                        )}
                    />
                </PanelLayout>
            </GeneralLayout>
        </>
    )
}
export default ProductsWithoutCategory;