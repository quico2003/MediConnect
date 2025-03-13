import { useContext, useEffect, useState } from "react";
import {
  useLocation,
  useParams,
} from "react-router-dom/cjs/react-router-dom.min";
import {
  Endpoints,
  getEndpoint,
} from "../../../../Constants/endpoints.contants";
import { Paths } from "../../../../Constants/paths.constants";
import { Views } from "../../../../Constants/views.constants";
import { StringsContext } from "../../../../Context/strings.context";
import useNotification from "../../../../Hooks/useNotification";
import useRequest from "../../../../Hooks/useRequest";
import GeneralLayout from "../../../../Layouts/GeneralLayout/GeneralLayout";
import PanelLayout from "../../../../Layouts/PanelLayout/PanelLayout";
import { StudentTabs } from "../Tabs/StudentTabs";
import ReactTable from "../../../../Components/Table/Table";
import useLoaded from "../../../../Hooks/useLoaded";
import { HistoryColumns } from "./HistoryColumns";
import { Configuration } from "../../../../Config/app.config";
import useQuery from "../../../../Hooks/useQuery";

const StudentHistory = () => {
  const { strings: Strings } = useContext(StringsContext);
  const ViewStrings = Strings.Students.studentHistory;

  const request = useRequest();

  const { student_guid } = useParams();

  const { search } = useLocation();
  const searchParams = useQuery();
  const { startFetching, finishFetching, fetching, loaded } = useLoaded();

  const { showNotification: errorNotification } = useNotification();

  const [data, setData] = useState({});
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
      getEndpoint(Endpoints.Students.allStudents.getHistory),
      {
        guid: student_guid,
        page,
        offset,
        search,
      }
    )
      .then((res) => {
        setData(res.student);
        setTotalPages(res.totalPages);
      })
      .catch(errorNotification)
      .finally(() => finishFetching());
  };

  return (
    <GeneralLayout showBackButton title={ViewStrings.title}>
      <PanelLayout loaded={loaded} Tabs={StudentTabs}>
        <ReactTable
          extraFilters={
            <p className="m-2 bg-info-subtle fw-bolder text-dark shadow w-75 text-center rounded-2 p-1">
              {ViewStrings.subtitle}
            </p>
          }
          emptyData={{
            text: ViewStrings.emptyData.text,
            buttonText: ViewStrings.emptyData.buttonText,
            to: Paths[Views.students].path,
            description: ViewStrings.emptyData.description,
            subDescription: ViewStrings.emptyData.subDescription,
          }}
          totalPages={totalPages}
          fetching={fetching}
          onEventChange={fetchData}
          data={data}
          columns={HistoryColumns()}
        />
      </PanelLayout>
    </GeneralLayout>
  );
};

export default StudentHistory;
