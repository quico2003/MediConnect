import { useContext, useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom/cjs/react-router-dom.min";
import ReactTable from "../../../../Components/Table/Table";
import { Configuration } from "../../../../Config/app.config";
import {
  Endpoints,
  getEndpoint,
} from "../../../../Constants/endpoints.contants";
import { Paths } from "../../../../Constants/paths.constants";
import { Views } from "../../../../Constants/views.constants";
import { StringsContext } from "../../../../Context/strings.context";
import useLoaded from "../../../../Hooks/useLoaded";
import useNotification from "../../../../Hooks/useNotification";
import useQuery from "../../../../Hooks/useQuery";
import useRequest from "../../../../Hooks/useRequest";
import GeneralLayout from "../../../../Layouts/GeneralLayout/GeneralLayout";
import PanelLayout from "../../../../Layouts/PanelLayout/PanelLayout";
import useModalManager from "../../../../Hooks/useModalManager";
import { SubjectsColumns } from "./SubjectsColumns";
import DeleteSubjectModal from "../../../../Modals/Subjects/DeleteSubjectsModal/DeleteSubjectModal";
import CourseFilterSelector from "../../../../Components/Filter/CourseFilterSelector";

const Subjects = () => {
  const { strings } = useContext(StringsContext);
  const ViewStrings = strings.Subjects.AllSubjects;

  const request = useRequest();
  const searchParams = useQuery();

  const {
    closeModal: closeDeleteModal,
    openModal: openDeleteModal,
    show: showDeleteModal,
    data: deleteSubjectData,
  } = useModalManager();

  const { search } = useLocation();

  const { showNotification: errorNotification } = useNotification();

  const { startFetching, finishFetching, fetching, loaded } = useLoaded();

  const [data, setData] = useState([]);
  const [filterSelected, setFilterSelected] = useState();
  const [totalPages, setTotalPages] = useState(1);

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
      getEndpoint(Endpoints.Subjects.allSubjects.getAll),
      {
        page,
        offset,
        search,
        filter: JSON.stringify(filter ? [filter] : []),
      }
    )
      .then((res) => {
        setData(res.subjects);
        setTotalPages(res.totalPages);
      })
      .catch(errorNotification)
      .finally(() => finishFetching());
  };

  const handleCloseDeleteSubject = (refresh) => {
    if (refresh) fetchData();
    closeDeleteModal();
  };

  const handleFilter = (e) => {
    setFilterSelected(e);
  };

  return (
    <>
      {/* Modals */}
      <DeleteSubjectModal
        show={showDeleteModal}
        onClose={handleCloseDeleteSubject}
        data={deleteSubjectData}
      />

      {/* Content */}
      <GeneralLayout
        title={ViewStrings.title}
        rightSection={
          data.length > 0 && (
            <Button size="sm" as={Link} to={Paths[Views.new_subject].path}>
              {ViewStrings.addSubject}
            </Button>
          )
        }
      >
        <PanelLayout loaded={loaded}>
          <ReactTable
            useFilter
            extraFilters={
              <div className="d-flex flex-column ">
                <CourseFilterSelector onChange={handleFilter} />
                <Button
                  className="align-self-end m-1"
                  size="sm"
                  onClick={() => fetchData()}
                >
                  {ViewStrings.filterButton}
                </Button>
              </div>
            }
            emptyData={{
              text: ViewStrings.emptyData.text,
              buttonText: ViewStrings.emptyData.buttonText,
              to: Paths[Views.new_subject].path,
              description: ViewStrings.emptyData.description,
              subDescription: ViewStrings.emptyData.subDescription,
            }}
            totalPages={totalPages}
            fetching={fetching}
            onEventChange={fetchData}
            data={data}
            columns={SubjectsColumns(openDeleteModal)}
          />
        </PanelLayout>
      </GeneralLayout>
    </>
  );
};

export default Subjects;
