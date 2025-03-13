import { useContext, useState } from "react";
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

const NewCourse = () => {
  const { strings: Strings } = useContext(StringsContext);
  const GeneralStrings = Strings.General.App;
  const ViewStrings = Strings.Courses.NewCourse;

  const request = useRequest();
  const { push } = useHistory();

  const { showNotification: successNotification } = useNotification("success");
  const { showNotification: errorNotification } = useNotification();

  const [data, setData] = useState({});

  const handleInput = (e) => {
    const { id, value } = e.target;
    setData({ ...data, [id]: value });
  };

  const handleSubmit = () => {
    if (checkForm()) {
      request("post", getEndpoint(Endpoints.Courses.createCourse.create), {
        ...data,
      })
        .then(() => {
          successNotification(ViewStrings.messages.courseCreated);
          push(Paths[Views.courses].path);
        })
        .catch((err) => errorNotification(err.message));
    } else errorNotification(ViewStrings.messages.inputError);
  };

  const checkForm = () => {
    const { name, abbr, season } = data;
    return validateData([abbr, name, season]);
  };

  return (
    <GeneralLayout showBackButton title={ViewStrings.title}>
      <PanelLayout>
        <SectionLayout title={ViewStrings.subtitle}>
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
            controlId="season"
            maxLength={50}
            showMaxLength={true}
            vertical={false}
            value={data.season}
            title={ViewStrings.inputs.seasonInput.title}
            placeholder={ViewStrings.inputs.seasonInput.placeholder}
            onChange={handleInput}
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

export default NewCourse;
