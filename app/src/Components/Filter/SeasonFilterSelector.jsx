import { EndpointsAdmin, getEndpoint } from "../../Constants/endpoints.contants";
import { useContext, useEffect, useState } from "react";
import useRequest from "../../Hooks/useRequest";
import useNotification from "../../Hooks/useNotification";
import FormSelect from "../Form/FormSelect/FormSelect";
import { StringsContext } from "../../Context/strings.context";

const SeasonFilterSelector = ({ onChange }) => {
  const { strings } = useContext(StringsContext);
  const ViewStrings = strings.Courses;

  const request = useRequest();
  const { showNotification: errorNotification } = useNotification();

  const [seasons, setSeasons] = useState([]);
  const [seasonSelected, setSeasonSelected] = useState();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    request("get", getEndpoint(EndpointsAdmin.Courses.allCourses.getAllSeasons))
      .then((res) => setSeasons(res.seasons))
      .catch(errorNotification);
  };

  const handleCourseSelected = (e) => {
    const { id, value } = e.target;
    setSeasonSelected(value);
    onChange({ id, value });
  };
  const handleCleanValue = () => {
    setSeasonSelected("");
    onChange("");
  };

  return (
    <FormSelect
      controlId="season"
      onClean={handleCleanValue}
      value={seasonSelected}
      options={seasons}
      title={ViewStrings.filterSeason}
      onChange={handleCourseSelected}
    />
  );
};

export default SeasonFilterSelector;
