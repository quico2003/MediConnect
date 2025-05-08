import GeneralLayout from "../../../../../Layouts/GeneralLayout/GeneralLayout";
import PanelLayout from "../../../../../Layouts/PanelLayout/PanelLayout";
import ReactTable from "../../../../../Components/Table/Table";
import useRequest from "../../../../../Hooks/useRequest";
import { useContext, useEffect, useState } from "react";
import { Configuration } from "../../../../../Config/app.config";
import useLoaded from "../../../../../Hooks/useLoaded";
import { EndpointsAdmin, getEndpoint } from "../../../../../Constants/endpoints.contants";
import useNotification from "../../../../../Hooks/useNotification";
import { CategoriesColumns } from "./CategoriesColumns";
import { Link, useLocation } from "react-router-dom/cjs/react-router-dom.min";
import useQuery from "../../../../../Hooks/useQuery";
import { Button } from "react-bootstrap";
import { Paths } from "../../../../../Constants/paths.constants";
import { Views } from "../../../../../Constants/views.constants";
import DeleteCategoryModal from "../../../../../Modals/Admin/Category/DeleteCategoryModal";
import useModalManager from "../../../../../Hooks/useModalManager";
import ViewCategoryModal from "../../../../../Modals/Admin/Category/viewCategoryModal";
import { StringsContext } from "../../../../../Context/strings.context";

const Categories = () => {

    const { strings } = useContext(StringsContext);
    const ViewStrings = strings.Categories;
    const GeneralViewStrings = strings.General.App;

    //Siempre usar para hacer llamadas
    const request = useRequest();

    //Coje ruta en la que estas
    const { search } = useLocation();
    const [data, setData] = useState([]);
    const [filterSelected] = useState();
    const [totalPages, setTotalPages] = useState(1);
    const { startFetching, finishFetching, fetching, loaded } = useLoaded();

    //Para los errores saber su funcionameino no codigo interno
    const { showNotification: errorNotification } = useNotification();

    //Recojer todo lo que hay detras del ? de la ruta
    const searchParams = useQuery();

    //Modal para borrar categories
    const {
        closeModal: closeDeleteCategoryModal,
        openModal: openDeleteCategoryModal,
        show: showDeleteCategoryModal,
        data: deleteCategoryData,
    } = useModalManager();

    //Modal para visualizar una category
    const {
        closeModal: closeViewCategoryModal,
        openModal: openViewCategoryModal,
        show: showViewCategoryModal,
        data: viewCategoryData,
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
            getEndpoint(EndpointsAdmin.Categories.getAll),
            {
                page,
                offset,
                search,
                filter: JSON.stringify(filter ? [filter] : []),
            }
        )
            .then((res) => {
                setData(res.categories);
                setTotalPages(res.totalPages);
            })
            .catch((err) => errorNotification(err.message))
            .finally(() => finishFetching());
    };

    const handleCloseDeleteCategoryModal = (refresh) => {
        if (refresh) fetchData();
        closeDeleteCategoryModal();
    };

    const handleCloseViewCategoryModal = () => {
        closeViewCategoryModal();
    };

    return (
        <>
            <DeleteCategoryModal
                onClose={handleCloseDeleteCategoryModal}
                show={showDeleteCategoryModal}
                data={deleteCategoryData}
            />

            <ViewCategoryModal
                onClose={handleCloseViewCategoryModal}
                show={showViewCategoryModal}
                data={viewCategoryData}
            />

            <GeneralLayout
                title={ViewStrings.title}
                rightSection={
                    data.length > 0 && (
                        <Button size="sm" as={Link} to={Paths[Views.new_category].path}>
                            {ViewStrings.buttonAdd}
                        </Button>)}
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
                            text: ViewStrings.notFoundComponent.title,
                            subDescription: ViewStrings.notFoundComponent.description,
                            to: Paths[Views.new_category].path
                        }
                        }
                        columns={CategoriesColumns(
                            openDeleteCategoryModal,
                            openViewCategoryModal
                        )}
                    />
                </PanelLayout>
            </GeneralLayout >
        </>
    )

}
export default Categories;