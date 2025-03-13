import { useContext, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { validateData } from "../../../../Config/GeneralFunctions";
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
import SectionLayout from "../../../../Layouts/SectionLayout/SectionLayout";
import FormControl from "../../../../Components/Form/FormControl/FormControl";
import FormSelect from "../../../../Components/Form/FormSelect/FormSelect";

const NewSubject = () => {
  const { strings: Strings } = useContext(StringsContext);
  const GeneralStrings = Strings.General.App;
  const ViewStrings = Strings.Subjects.NewSubject;

  const request = useRequest();
  const { push } = useHistory();

  const { showNotification: successNotification } = useNotification("success");
  const { showNotification: errorNotification } = useNotification();

  const [data, setData] = useState({});

  const [courses, setCourses] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    request("get", getEndpoint(Endpoints.Courses.allCourses.getAllNames))
      .then((res) => {
        setCourses(res.courses);
        setLoaded(true);
      })
      .catch((err) => errorNotification(err.message));
  };

  const handleInput = (e) => {
    const { id, value } = e.target;
    setData({ ...data, [id]: value });
  };

  const handleSubmit = () => {
    if (checkForm()) {
      request("post", getEndpoint(Endpoints.Subjects.createSubject.create), {
        ...data,
      })
        .then(() => {
          successNotification(ViewStrings.messages.subjectCreated);
          push(Paths[Views.subjects].path);
        })
        .catch((err) => errorNotification(err.message));
    } else errorNotification("Check all input fields");
  };

  const handleCleanCourse = () => {
    setData({
      ...data,
      course: null,
    });
  };

  const checkForm = () => {
    const { name, abbr, course } = data;
    return validateData([abbr, name, course]);
  };

  return (
    <GeneralLayout showBackButton title={ViewStrings.title}>
      <PanelLayout>
        <SectionLayout title="Subject Info">
          <FormControl
            required
            controlId="name"
            maxLength={250}
            showMaxLength={true}
            vertical={false}
            value={data.name}
            title={ViewStrings.inputs.nameInput.title}
            placeholder={ViewStrings.inputs.nameInput.placeholder}
            onChange={handleInput}
          />
          <FormControl
            required
            controlId="abbr"
            maxLength={50}
            showMaxLength={true}
            vertical={false}
            value={data.abbr}
            title={ViewStrings.inputs.abbrInput.title}
            placeholder={ViewStrings.inputs.abbrInput.placeholder}
            onChange={handleInput}
          />
          <FormSelect
            options={courses}
            controlId="course"
            vertical={false}
            title={ViewStrings.inputs.course.title}
            placeholder={ViewStrings.inputs.course.placeholder}
            value={data.course}
            onChange={handleInput}
            onClean={handleCleanCourse}
            required
          />
        </SectionLayout>

        <div className="d-flex justify-content-end w-100 align-items-center">
          <Button disabled={!checkForm()} onClick={handleSubmit}>
            {GeneralStrings.Create}
          </Button>
        </div>
      </PanelLayout>
    </GeneralLayout>
  );
};

export default NewSubject;
