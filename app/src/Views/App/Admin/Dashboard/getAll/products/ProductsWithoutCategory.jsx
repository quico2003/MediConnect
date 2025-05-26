import { useContext, useEffect, useState } from "react";
import { StringsContext } from "../../../../../../Context/strings.context";
import useRequest from "../../../../../../Hooks/useRequest";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import useQuery from "../../../../../../Hooks/useQuery";
import useLoaded from "../../../../../../Hooks/useLoaded";
import useNotification from "../../../../../../Hooks/useNotification";
import useModalManager from "../../../../../../Hooks/useModalManager";
import { EndpointsAdmin, getEndpoint } from "../../../../../../Constants/endpoints.contants";
import DeleteProductModal from "../../../../../../Modals/Admin/Products/DeleteProductModal";
import AssignNewCategoryModal from "../../../../../../Modals/Admin/Products/AssignNewCategoryModal";
import PanelLayout from "../../../../../../Layouts/PanelLayout/PanelLayout";
import ReactTable from "../../../../../../Components/Table/Table";
import { ProductsWithoutCategoryColumns } from "./ProductsWithoutCategoryColumns";
import { Configuration } from "../../../../../../Config/app.config";


const ProductsWithoutCategory = ({ setNeedUpdate }) => {

    const { strings } = useContext(StringsContext);
    const ViewStrings = strings.dashboard.withoutCategories;
    const GeneralViewStrings = strings.General.App;

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
            getEndpoint(EndpointsAdmin.Products.getAllWithoutCategory),
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
            .catch((err) => errorNotification(err.message))
            .finally(() => finishFetching());
    }

    const handleCloseDeleteProductModal = (refresh) => {
        if (refresh) fetchData();
        closeDeleteProductModal();
    }

    const handleCloseAssignCategoryModal = (refresh) => {
        if (refresh) fetchData();
        setNeedUpdate(refresh)
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
            <PanelLayout loaded={loaded}>
                <ReactTable
                    searcherProps={{
                        placeholder: GeneralViewStrings.write
                    }}
                    totalPages={totalPages}
                    fetching={fetching}
                    onEventChange={fetchData}

                    data={data}
                    emptyData={{
                        text: ViewStrings.isEmpty
                    }}
                    columns={ProductsWithoutCategoryColumns(
                        openDeleteProductModal,
                        openAssignCategoryModal
                    )}
                />
            </PanelLayout>
        </>
    )
}
export default ProductsWithoutCategory;