import { EndpointsAdmin, getEndpoint } from "../../Constants/endpoints.contants";
import { useEffect, useState } from "react";
import useRequest from "../../Hooks/useRequest";
import useNotification from "../../Hooks/useNotification";
import FormSelect from "../Form/FormSelect/FormSelect";

const SubjectFilterSelector = ({ onChange }) => {
  const request = useRequest();
  const { showNotification: errorNotification } = useNotification();

  const [subjects, setSubject] = useState([]);
  const [subjectSelected, setSubjectSelected] = useState();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    request("get", getEndpoint(EndpointsAdmin.Subjects.allSubjects.getAllAbbr))
      .then((res) => setSubject(res.subjects))
      .catch(errorNotification);
  };

  const handleCourseSelected = (e) => {
    const { id, value } = e.target;
    setSubjectSelected(value);
    onChange({ id, value });
  };
  const handleCleanValue = () => {
    setSubjectSelected("");
    onChange("");
  };

  return (
    <FormSelect
      controlId="subject_id"
      onClean={handleCleanValue}
      value={subjectSelected}
      options={subjects}
      title="Subject:"
      onChange={handleCourseSelected}
    />
  );
};

export default SubjectFilterSelector;
