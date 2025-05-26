import { useContext, useEffect, useState } from "react";
import { StringsContext } from "../../../../../Context/strings.context";
import useRequest from "../../../../../Hooks/useRequest";
import { Link, useLocation } from "react-router-dom/cjs/react-router-dom.min";
import useQuery from "../../../../../Hooks/useQuery";
import useNotification from "../../../../../Hooks/useNotification";
import useLoaded from "../../../../../Hooks/useLoaded";
import useModalManager from "../../../../../Hooks/useModalManager";
import DeleteClientModal from "../../../../../Modals/User/Clients/DeleteClientModal";
import GeneralLayout from "../../../../../Layouts/GeneralLayout/GeneralLayout";
import { Button } from "react-bootstrap";
import PanelLayout from "../../../../../Layouts/PanelLayout/PanelLayout";
import ReactTable from "../../../../../Components/Table/Table";
import { ClientsColumns } from "./ClientsColumns";
import { Configuration } from "../../../../../Config/app.config";
import { EndpointsUser, getEndpoint } from "../../../../../Constants/endpoints.contants";
import { Paths } from "../../../../../Constants/paths.constants";
import { Views } from "../../../../../Constants/views.constants";

const Clients = () => {

    const { strings } = useContext(StringsContext);
    const ViewStrings = strings.User.allClients;
    const GeneralViewStrings = strings.General.App;

    const request = useRequest();

    const { search } = useLocation();
    const [filterSelected] = useState();
    const [totalPages, setTotalPages] = useState(1);
    const searchParams = useQuery();
    const { startFetching, finishFetching, fetching, loaded } = useLoaded();

    const [data, setData] = useState([]);

    const { showNotification: errorNotification } = useNotification();

    const {
        closeModal: closeDeleteClientModal,
        openModal: openDeleteClientModal,
        show: showDeleteClientModal,
        data: DeleteClientData,
    } = useModalManager();

    // const {
    //     closeModal: closeViewClientModal,
    //     openModal: openViewClientModal,
    //     show: showViewClientModal,
    //     data: ViewClientData,
    // } = useModalManager();

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
            getEndpoint(EndpointsUser.Clients.getAll),
            {
                page,
                offset,
                search,
                filter: JSON.stringify(filter ? [filter] : []),
            }
        )
            .then((res) => {
                setData(res.clients);
                setTotalPages(res.totalPages);
            })
            .catch((err) => errorNotification(err.message))
            .finally(() => finishFetching());
    };

    const handleCloseDeleteClientModal = (refresh) => {
        if (refresh) fetchData();
        closeDeleteClientModal();
    };

    // const handleCloseViewClientModal = () => {
    //     closeViewClientModal();
    // };

    return (
        <>
            <DeleteClientModal
                onClose={handleCloseDeleteClientModal}
                show={showDeleteClientModal}
                data={DeleteClientData}
            />
            <GeneralLayout 
            title={ViewStrings.title}
            rightSection={
                data.length > 0 && (
                <Button size="sm" as={Link} to={Paths[Views.new_client].path}>
                    {ViewStrings.buttonAdd}
                </Button>
            )}
            >
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
                            buttonText: ViewStrings.buttonAdd,
                            text: ViewStrings.emptyData.text,
                            subDescription: ViewStrings.emptyData.description,
                            to: Paths[Views.new_client].path
                        }}
                        columns={ClientsColumns(
                            openDeleteClientModal
                        )}
                    />
                </PanelLayout>
            </GeneralLayout>
        </>
    )
}
export default Clients;