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

const Products = () => {

    //Translations
    const { strings } = useContext(StringsContext);
    const ViewStrings = strings.Products;

    //Use fetch database
    const request = useRequest();

    const { search } = useLocation();
    const [filterSelected, setFilterSelected] = useState();
    const [totalPages, setTotalPages] = useState(1);
    const searchParams = useQuery();

    const [data, setData] = useState([]);

    const { startFetchingm, finishFeching, fetching, loaded } = useLoaded();

    useEffect(() => {
        fetchData();
    }, [search]);

    const fetchData = () => {
        console.log("Buscando productos...")
    }




    return (
        <GeneralLayout title={ViewStrings.title} rightSection={<Button size="sm" as={Link} to={Paths[Views.new_product].path}>

            + Add Product

        </Button>} >

            <PanelLayout loaded={ loaded }>
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