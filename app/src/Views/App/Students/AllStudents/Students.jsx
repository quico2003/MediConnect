import { useContext, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
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
import { StudentsColumns } from "../../Students/AllStudents/StudentsColumns";
import DeleteStudentModal from "../../../../Modals/Students/DeleteStudentsModal/DeleteStudentModal";

const Students = () => {
  const { strings } = useContext(StringsContext);
  const ViewStrings = strings.Students.AllStudents;

  const request = useRequest();
  const searchParams = useQuery();

  const {
    closeModal: closeDeleteModal,
    openModal: openDeleteModal,
    show: showDeleteModal,
    data: deleteStudentData,
  } = useModalManager();

  const { search } = useLocation();

  const { showNotification: errorNotification } = useNotification();

  const { startFetching, finishFetching, fetching, loaded } = useLoaded();

  const [data, setData] = useState([]);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchData();
  }, [search]);

  const fetchData = async (
    page = 1,
    offset = Configuration.tables.defaultPageSize,
    search = searchParams.get("search")
  ) => {
    startFetching();
    return await request(
      "get",
      getEndpoint(Endpoints.Students.allStudents.getAll),
      {
        page,
        offset,
        search,
      }
    )
      .then((res) => {
        setData(res.students);
        setTotalPages(res.totalPages);
      })
      .catch(errorNotification)
      .finally(() => finishFetching());
  };

  const handleCloseDeleteBook = (refresh) => {
    if (refresh) fetchData();
    closeDeleteModal();
  };

  return (
    <>
      {/* Modals */}
      <DeleteStudentModal
        show={showDeleteModal}
        onClose={handleCloseDeleteBook}
        data={deleteStudentData}
      />

      {/* Content */}
      <GeneralLayout
        title={ViewStrings.title}
        rightSection={
          data.length > 0 && (
            <Button size="sm" as={Link} to={Paths[Views.new_student].path}>
              {ViewStrings.addStudent}
            </Button>
          )
        }
      >
        <PanelLayout loaded={loaded}>
          <ReactTable
            emptyData={{
              text: ViewStrings.notFoundComponent.text,
              buttonText: ViewStrings.notFoundComponent.buttonText,
              to: Paths[Views.new_student].path,
              description: ViewStrings.notFoundComponent.description,
              subDescription: ViewStrings.notFoundComponent.subDescription,
            }}
            totalPages={totalPages}
            fetching={fetching}
            onEventChange={fetchData}
            data={data}
            columns={StudentsColumns(openDeleteModal)}
          />
        </PanelLayout>
      </GeneralLayout>
    </>
  );
};

export default Students;
