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
import { Configuration } from "../../../../../Config/app.config";
import { Endpoints, getEndpoint } from "../../../../../Constants/endpoints.contants";
import { UsersColumns } from "./UsersColumns";
import useModalManager from "../../../../../Hooks/useModalManager";
import ViewUserModal from "../../../../../Modals/User/ViewUserModal";
import ViewProductModal from "../../../../../Modals/Products/ViewProductModal";
import DeleteUserModal from "../../../../../Modals/User/DeleteUserModal";

const Users = () => {

    const { strings } = useContext(StringsContext);
    const ViewStrings = strings.Products;

    const request = useRequest();
    const { search } = useLocation();
    const [data, setData] = useState();

    const [filterSelected] = useState();
    const [totalPages, setTotalPages] = useState(1);
    const searchParams = useQuery();

    const { startFetching, finishFetching, fetching, loaded } = useLoaded();

    const { showNotification: errorNotification } = useNotification();

    //Modal of view User
    const {
        closeModal: closeViewUserModal,
        openModal: openViewUserModal,
        show: showViewUserModal,
        data: viewUserData,
    } = useModalManager();

    //Modal of delete User
    const {
        closeModal: closeDeleteUserModal,
        openModal: openDeleteUserModal,
        show: showDeleteUserModal,
        data: DeleteUserData,
    } = useModalManager();

    useEffect(() => {
        fetchData();
    }, [search])

    const fetchData = async (
        page = 1,
        offset = Configuration.tables.defaultPageSize,
        search = searchParams.get("search"),
        filter = filterSelected
    ) => {
        startFetching();
        return await request(
            "get",
            getEndpoint(Endpoints.Users.getAll),
            {
                page,
                offset,
                search,
                filter: JSON.stringify(filter ? [filter] : []),
            }
        )
            .then((res) => {
                setData(res.users);
                setTotalPages(res.totalPages);
            })
            .catch(errorNotification)
            .finally(() => finishFetching());
    }
    
    const handleCloseDeleteUserModal = (refresh) => {
        if (refresh) fetchData();
        closeDeleteUserModal();
    };
 
    const handleCloseViewUserModal = () => {
        closeViewUserModal();
    };


    return (

        <>

            <ViewUserModal
                onClose={handleCloseViewUserModal}
                show={showViewUserModal}
                data={viewUserData}
            />

            <DeleteUserModal
                onClose={handleCloseDeleteUserModal}
                show={showDeleteUserModal}
                data={DeleteUserData}
            />


            <GeneralLayout title="Doctors" rightSection={
                <Button size="sm" as={Link} to={Paths[Views.new_user].path}>
                    +Add User
                </Button>
            }>

                <PanelLayout loaded={loaded}>
                    <ReactTable
                        totalPages={totalPages}
                        fetching={fetching}
                        onEventChange={fetchData}
                        data={data}
                        emptyData={{
                            text: "Don't found users",
                            description: ""
                        }}
                        columns={UsersColumns(
                            openViewUserModal,
                            openDeleteUserModal
                        )}
                    />

                </PanelLayout>

            </GeneralLayout>
        </>
    )
}
export default Users;