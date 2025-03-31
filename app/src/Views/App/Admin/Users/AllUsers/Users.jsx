import { Button } from "react-bootstrap";
import ReactTable from "../../../../../Components/Table/Table";
import GeneralLayout from "../../../../../Layouts/GeneralLayout/GeneralLayout";
import PanelLayout from "../../../../../Layouts/PanelLayout/PanelLayout";
import { Views } from "../../../../../Constants/views.constants";
import { Paths } from "../../../../../Constants/paths.constants";
import { Link, useLocation } from "react-router-dom/cjs/react-router-dom.min";
import useRequest from "../../../../../Hooks/useRequest";
import { useContext, useEffect, useState } from "react";
import useNotification from "../../../../../Hooks/useNotification";
import useLoaded from "../../../../../Hooks/useLoaded";
import { StringsContext } from "../../../../../Context/strings.context";
import useQuery from "../../../../../Hooks/useQuery";

const Users = () => {
    
    const { strings } = useContext(StringsContext);
    const ViewStrings = strings.Products;

    const request = useRequest();
    const { search } = useLocation();
    const [ data, setData ] = useState();

    const [filterSelected] = useState();
    const [totalPages, setTotalPages] = useState(1);
    const searchParams = useQuery();

    const { startFetching, finishFetching, fetching, loaded } = useLoaded();

    const { showNotification: errorNotification } = useNotification();

    useEffect(() => {
        fetchData();
    }, [search])

    const fetchData = async () => {
        startFetching();
    }

    return (
        <GeneralLayout title="Doctors" rightSection={
            <Button size="sm" as={Link} to={Paths[Views.new_user].path}>
                +Add Doctor
            </Button>
        }>

            <PanelLayout loaded={loaded}>
                <ReactTable 
                totalPages={totalPages}
                fetching={fetching}
                onEventChange={fetchData}
                data={data}
                emptyData={{
                    text: "",
                    description:""
                }}
                />

            </PanelLayout>

        </GeneralLayout>
    )
}
export default Users;