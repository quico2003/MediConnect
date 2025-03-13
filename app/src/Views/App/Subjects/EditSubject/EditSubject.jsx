import { useContext, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import {
  useHistory,
  useParams,
} from "react-router-dom/cjs/react-router-dom.min";
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

const EditSubject = () => {
  const { strings: Strings } = useContext(StringsContext);
  const ViewStrings = Strings.Subjects.EditSubject;
  const GeneralStrings = Strings.General.App;

  const request = useRequest();
  const { push } = useHistory();

  const { subject_guid } = useParams();

  const { showNotification: successNotification } = useNotification("success");
  const { showNotification: errorNotification } = useNotification();

  const [data, setData] = useState({});

  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    request("get", getEndpoint(Endpoints.Subjects.allSubjects.edit), {
      guid: subject_guid,
    })
      .then((res) => {
        setData(res.data);
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
      request("post", getEndpoint(Endpoints.Subjects.editSubject.update), {
        ...data,
      })
        .then(() => {
          successNotification(ViewStrings.messages.subjectUpdated);
          push(Paths[Views.subjects].path);
        })
        .catch((err) => errorNotification(err.message));
    } else errorNotification(ViewStrings.messages.checkInputs);
  };

  const checkForm = () => {
    const { name, abbr } = data;
    return validateData([name, abbr]);
  };

  return (
    <>
      <GeneralLayout showBackButton title={ViewStrings.title}>
        <PanelLayout loaded={loaded}>
          <SectionLayout title={ViewStrings.subtitle}>
            <FormControl
              controlId="name"
              maxLength={255}
              required
              showMaxLength={true}
              vertical={false}
              value={data.name}
              title={ViewStrings.inputs.nameInput.title}
              placeholder={ViewStrings.inputs.nameInput.placeholder}
              onChange={handleInput}
            />
            <FormControl
              controlId="abbr"
              maxLength={50}
              required
              showMaxLength={true}
              vertical={false}
              value={data.abbr}
              title={ViewStrings.inputs.abbrInput.title}
              placeholder={ViewStrings.inputs.abbrInput.placeholder}
              onChange={handleInput}
            />
          </SectionLayout>
          <div className="d-flex justify-content-end w-100 align-items-center">
            <Button disabled={!checkForm()} onClick={handleSubmit}>
              {GeneralStrings.Update}
            </Button>
          </div>
        </PanelLayout>
      </GeneralLayout>
    </>
  );
};

export default EditSubject;
