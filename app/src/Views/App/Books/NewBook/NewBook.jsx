import { useContext, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import FormControl from "../../../../Components/Form/FormControl/FormControl";
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
import { IsbnRegex } from "../../../../Utils/Regex";
import FormSelect from "../../../../Components/Form/FormSelect/FormSelect";

const NewBook = () => {
  const { strings: Strings } = useContext(StringsContext);
  const GeneralStrings = Strings.General.App;
  const ViewStrings = Strings.Books.NewBook;

  const request = useRequest();
  const { push } = useHistory();

  const { showNotification: successNotification } = useNotification("success");
  const { showNotification: errorNotification } = useNotification();

  const [data, setData] = useState({});

  const [subjects, setSubjects] = useState([]);
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

  const fetchDataSubjects = async (course_guid) => {
    request("get", getEndpoint(Endpoints.Subjects.allSubjects.getAllByCourse), {
      course: course_guid,
    })
      .then((res) => setSubjects(res.subjects))
      .catch((err) => errorNotification(err.message));
  };

  const handleInput = (e) => {
    const { id, value } = e.target;
    setData({ ...data, [id]: value });
  };

  const handleCleanSubject = () => {
    setData({
      ...data,
      subject: null,
    });
  };
  const handleCleanCourse = () => {
    setData({
      ...data,
      course: null,
      subject: null,
    });
  };

  const handleSubmit = () => {
    if (checkForm()) {
      request("post", getEndpoint(Endpoints.Books.createBook.create), {
        ...data,
      })
        .then(() => {
          successNotification(ViewStrings.messages.bookCreated);
          push(Paths[Views.books].path);
        })
        .catch((err) => {
          switch (err.code) {
            case 409:
              errorNotification(ViewStrings.messages.isbnError);
              break;
            default:
              errorNotification(err.message);
              break;
          }
        });
    } else {
      errorNotification(ViewStrings.messages.inputError);
    }
  };

  const handleInputCourse = (e) => {
    const { id, value } = e.target;
    setData({ ...data, [id]: value });
    fetchDataSubjects(value);
  };

  const checkForm = () => {
    const { name, isbn, stock, subject, course } = data;
    return (
      validateData([name, isbn, stock, subject, course]) &&
      IsbnRegex.test(isbn) &&
      stock > 0
    );
  };

  return (
    <GeneralLayout showBackButton={true} title={ViewStrings.title}>
      <PanelLayout loaded={loaded}>
        <SectionLayout title={ViewStrings.subTitle}>
          <FormControl
            controlId="name"
            maxLength={50}
            showMaxLength
            vertical={false}
            value={data.name}
            title={ViewStrings.inputs.nameInput.title}
            placeholder={ViewStrings.inputs.nameInput.placeholder}
            onChange={handleInput}
            required
          />
          <FormControl
            controlId="isbn"
            maxLength={13}
            showMaxLength
            vertical={false}
            value={data.isbn}
            title={ViewStrings.inputs.isbnInput.title}
            placeholder={ViewStrings.inputs.isbnInput.placeholder}
            onChange={handleInput}
            required
          />
          <FormSelect
            options={courses}
            controlId="course"
            value={data.course}
            vertical={false}
            title={ViewStrings.inputs.course.title}
            placeholder={ViewStrings.inputs.course.placeholder}
            onChange={handleInputCourse}
            onClean={handleCleanCourse}
            disabled={false}
            required
          />

          <FormSelect
            options={subjects}
            controlId="subject"
            value={data.subject}
            vertical={false}
            title={ViewStrings.inputs.subject.title}
            placeholder={ViewStrings.inputs.subject.placeholder}
            onChange={handleInput}
            onClean={handleCleanSubject}
            disabled={!data.course}
            required
          />

          <FormControl
            controlId="stock"
            maxLength={200}
            showMaxLength={false}
            vertical={false}
            value={data.stock}
            title={ViewStrings.inputs.stockInput.title}
            placeholder={ViewStrings.inputs.stockInput.placeholder}
            onChange={handleInput}
            type="number"
            step={1}
            required
            min={1}
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

export default NewBook;
