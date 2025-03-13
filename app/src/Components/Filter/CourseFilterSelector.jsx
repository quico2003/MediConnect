import { Endpoints, getEndpoint } from "../../Constants/endpoints.contants";
import { useContext, useEffect, useState } from "react";
import useRequest from "../../Hooks/useRequest";
import useNotification from "../../Hooks/useNotification";
import FormSelect from "../Form/FormSelect/FormSelect";
import { StringsContext } from "../../Context/strings.context";

const CourseFilterSelector = ({ onChange }) => {
  const { strings } = useContext(StringsContext);
  const ViewStrings = strings.Courses;

  const request = useRequest();
  const { showNotification: errorNotification } = useNotification();

  const [courses, setCourses] = useState([]);
  const [courseSelected, setCourseSelected] = useState();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    request("get", getEndpoint(Endpoints.Courses.allCourses.getAllAbbr))
      .then((res) => setCourses(res.courses))
      .catch(errorNotification);
  };

  const handleCourseSelected = (e) => {
    const { id, value } = e.target;
    setCourseSelected(value);
    onChange({ id, value });
  };
  const handleCleanValue = () => {
    setCourseSelected("");
    onChange("");
  };

  return (
    <FormSelect
      controlId="course_id"
      onClean={handleCleanValue}
      defaultValue="default"
      value={courseSelected}
      options={courses}
      title={ViewStrings.filterCourse}
      onChange={handleCourseSelected}
    />
  );
};

export default CourseFilterSelector;
