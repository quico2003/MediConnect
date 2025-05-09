import { useContext, useEffect, useMemo, useRef, useState } from "react";
import GeneralLayout from "../../../../../Layouts/GeneralLayout/GeneralLayout";
import { StringsContext } from "../../../../../Context/strings.context";
import { Paths } from "../../../../../Constants/paths.constants";
import PanelLayout from "../../../../../Layouts/PanelLayout/PanelLayout";
import useRequest from "../../../../../Hooks/useRequest";
import useLoaded from "../../../../../Hooks/useLoaded";
import ReactTable from "../../../../../Components/Table/Table";
import { Button } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom/cjs/react-router-dom.min";
import useQuery from "../../../../../Hooks/useQuery";
import { ProductsColumns } from "./ProductsColumns";
import { Views } from "../../../../../Constants/views.constants";
import { EndpointsAdmin, getEndpoint } from "../../../../../Constants/endpoints.contants";
import useNotification from "../../../../../Hooks/useNotification";
import { Configuration } from "../../../../../Config/app.config";
import useModalManager from "../../../../../Hooks/useModalManager";
import ViewProductModal from "../../../../../Modals/Admin/Products/ViewProductModal";
import DeleteProductModal from "../../../../../Modals/Admin/Products/DeleteProductModal";
import IconButton from "../../../../../Components/Buttons/IconButton";
import { MdBarcodeReader } from "react-icons/md";
import ViewBarcodeProductModal from "../../../../../Modals/Admin/Products/ViewBarcodeProductModal";
const Products = () => {

    //Translations
    const { strings } = useContext(StringsContext);
    const ViewStrings = strings.Products;
    const GeneralViewStrings = strings.General.App;

    const [filterSelected] = useState();
    const inputRef = useRef(null);
    //Use fetch database
    const request = useRequest();
    const { search } = useLocation();
    const [data, setData] = useState([]);
    const [autoFocus, setAutoFocus] = useState(false);

    const [totalPages, setTotalPages] = useState(1);
    const searchParams = useQuery();

    const { startFetching, finishFetching, fetching, loaded } = useLoaded();

    const { showNotification: errorNotification } = useNotification();

    //Modal of view Product
    const {
        closeModal: closeViewProductModal,
        openModal: openViewProductModal,
        show: showViewProductModal,
        data: viewProductData,
    } = useModalManager();

    //Modal of view barcode Product
    const {
        closeModal: closeViewBarcodeProductModal,
        openModal: openViewBarcodeProductModal,
        show: showViewBarcodeProductModal,
        data: viewBarcodeProductData,
    } = useModalManager();

    //Modal of delete Product
    const {
        closeModal: closeDeleteProductModal,
        openModal: openDeleteProductModal,
        show: showDeleteProductModal,
        data: DeleteProductData,
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
            getEndpoint(EndpointsAdmin.Products.getAll),
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

    const handleCloseViewProductModal = () => {
        closeViewProductModal();
    }

    const handleCloseViewBarcodeProductModal = () => {
        closeViewBarcodeProductModal();
    }

    const handleAutofocus = () => {
        setAutoFocus(true);
        // Aquí es donde ponemos el foco al input
        if (inputRef.current) {
            inputRef.current.focus();
        }
    };

    return (

        <>
            <ViewProductModal
                onClose={handleCloseViewProductModal}
                show={showViewProductModal}
                data={viewProductData}
            />
            <ViewBarcodeProductModal
                onClose={handleCloseViewBarcodeProductModal}
                show={showViewBarcodeProductModal}
                data={viewBarcodeProductData}
            />
            <DeleteProductModal
                onClose={handleCloseDeleteProductModal}
                show={showDeleteProductModal}
                data={DeleteProductData}
            />

            <GeneralLayout
                title={ViewStrings.title}
                rightSection={
                    data.length > 0 && (
                        <div className="d-flex gap-2">
                            <IconButton
                                Icon={MdBarcodeReader}
                                onClick={handleAutofocus}
                            />
                            <Button size="sm" as={Link} to={Paths[Views.new_product].path}>
                                {ViewStrings.buttonAdd}
                            </Button>
                        </div>
                    )}
            >
                <PanelLayout loaded={loaded}>
                    <ReactTable
                        searcherProps={{
                            autoFocus: autoFocus,
                            placeholder: GeneralViewStrings.write,
                            ref: inputRef,
                        }}
                        totalPages={totalPages}
                        fetching={fetching}
                        onEventChange={fetchData}
                        data={data}
                        emptyData={{
                            buttonText: ViewStrings.buttonAdd,
                            text: ViewStrings.notFoundComponent.title,
                            subDescription: ViewStrings.notFoundComponent.description,
                            to: Paths[Views.new_product].path
                        }}
                        columns={ProductsColumns(
                            openViewProductModal,
                            openViewBarcodeProductModal,
                            openDeleteProductModal
                        )}
                    />
                </PanelLayout>
            </GeneralLayout>
        </>
    )
}
export default Products;