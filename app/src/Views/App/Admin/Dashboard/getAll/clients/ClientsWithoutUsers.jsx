import { useContext, useEffect, useState } from "react";
import { StringsContext } from "../../../../../../Context/strings.context";
import useRequest from "../../../../../../Hooks/useRequest";
import useQuery from "../../../../../../Hooks/useQuery";
import useLoaded from "../../../../../../Hooks/useLoaded";
import useNotification from "../../../../../../Hooks/useNotification";
import { EndpointsAdmin, getEndpoint } from "../../../../../../Constants/endpoints.contants";
import PanelLayout from "../../../../../../Layouts/PanelLayout/PanelLayout";
import ReactTable from "../../../../../../Components/Table/Table";
import { ClientsWithoutUsersColumns } from "./ClientsWithoutUsersColumns";
import { Configuration } from "../../../../../../Config/app.config";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import useModalManager from "../../../../../../Hooks/useModalManager";
import AssignNewUserModal from "../../../../../../Modals/Admin/ClientDashboard/AssignNewUserModal";
import DeleteClientModal from "../../../../../../Modals/Admin/ClientDashboard/DeleteClientModal";

const ClientsWithoutUsers = ({ setNeedUpdate }) => {

    const { strings } = useContext(StringsContext);
    const ViewStrings = strings.dashboard.withoutUsers;
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
        closeModal: closeDeleteClientModal,
        openModal: openDeleteClientModal,
        show: showDeleteClientModal,
        data: deleteClientModal
    } = useModalManager();

    const {
        closeModal: closeAssignClientModal,
        openModal: openAssignClientModal,
        show: showAssignClientModal,
        data: assignClientModal
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
            getEndpoint(EndpointsAdmin.Dashboard.getAllWithoutUser),
            {
                page,
                offset,
                search,
                filter: JSON.stringify(filter ? [filter] : []),
            })
            .then((res) => {
                setData(res.clients);
                setTotalPages(res.totalPages);
            })
            .catch((err) => errorNotification(err.message))
            .finally(() => finishFetching());
    }

    const handleColseDeleteClientModal = (refresh) => {
        if (refresh) fetchData();
        closeDeleteClientModal();
    }

    const handleCloseAssignClientModal = (refresh) => {
        if (refresh) fetchData();
        setNeedUpdate(refresh);
        closeAssignClientModal();
    }

    return (
        <>
            <DeleteClientModal
                onClose={handleColseDeleteClientModal}
                show={showDeleteClientModal}
                data={deleteClientModal}
            />
            <AssignNewUserModal
                onClose={handleCloseAssignClientModal}
                show={showAssignClientModal}
                data={assignClientModal}
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
                    columns={ClientsWithoutUsersColumns(
                        openDeleteClientModal,
                        openAssignClientModal
                    )}
                />
            </PanelLayout>
        </>
    )
}
export default ClientsWithoutUsers;