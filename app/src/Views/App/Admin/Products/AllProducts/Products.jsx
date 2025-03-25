import { useContext, useEffect, useState } from "react";
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
import { Endpoints, getEndpoint } from "../../../../../Constants/endpoints.contants";
import useNotification from "../../../../../Hooks/useNotification";
import { Configuration } from "../../../../../Config/app.config";
import useModalManager from "../../../../../Hooks/useModalManager";

const Products = () => {

    //Translations
    const { strings } = useContext(StringsContext);
    const ViewStrings = strings.Products;

    //Use fetch database
    const request = useRequest();
    const { search } = useLocation();
    const [data, setData] = useState([]);
    
    const [filterSelected] = useState();
    const [totalPages, setTotalPages] = useState(1);
    const searchParams = useQuery();

    const { startFetching, finishFetching, fetching, loaded } = useLoaded();

    const { showNotification: errorNotification } = useNotification();

    //Modal of view Product
    const {
        closeModal: closeViewProductModal,
        openModal: openViewProductModal,
        show: showViewProductModal,
        data: ViewProductData,
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
            getEndpoint(Endpoints.Products.getAll),
            {
                page,
                offset,
                search,
                filter: JSON.stringify(filter ? [filter] : []),
            })
            .then((res) => {
                console.log(res);
                setData(res.products);
                setTotalPages(res.totalPages);
            })
            .catch(errorNotification)
            .finally(()=> finishFetching());
        
    }




    return (
        <GeneralLayout title={ViewStrings.title} rightSection={<Button size="sm" as={Link} to={Paths[Views.new_product].path}>

            + Add Product

        </Button>} >

            <PanelLayout loaded={loaded}>
                <ReactTable
                    totalPages={totalPages}
                    fetching={fetching}
                    onEventChange={fetchData}
                    data={data}
                    emptyData={{
                        text: ViewStrings.notFoundComponent.title,
                        description: ViewStrings.notFoundComponent.description
                    }}
                    columns={ProductsColumns()}
                />

            </PanelLayout>

        </GeneralLayout>

    )

}
export default Products;