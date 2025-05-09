
import { useContext, useState } from "react";
import FormControl from "../../../../../Components/Form/FormControl/FormControl";
import useRequest from "../../../../../Hooks/useRequest";
import GeneralLayout from "../../../../../Layouts/GeneralLayout/GeneralLayout";
import PanelLayout from "../../../../../Layouts/PanelLayout/PanelLayout";
import SectionLayout from "../../../../../Layouts/SectionLayout/SectionLayout";
import { Button, Spinner } from "react-bootstrap";
import { validateData } from "../../../../../Config/GeneralFunctions";
import { EndpointsAdmin, getEndpoint } from "../../../../../Constants/endpoints.contants";
import useNotification from "../../../../../Hooks/useNotification";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { Paths } from "../../../../../Constants/paths.constants";
import { Views } from "../../../../../Constants/views.constants";
import { StringsContext } from "../../../../../Context/strings.context";

const NewCategory = () => {

    const { strings } = useContext(StringsContext);
    const ViewStrings = strings.Categories.add;

    const request = useRequest();
    const { push } = useHistory();

    const [submiting, setSubmiting] = useState(false);

    const { showNotification: successNotification } = useNotification("success");
    const { showNotification: errorNotification } = useNotification();

    const [data, setData] = useState({});

    const handleSubmit = () => {
        if (checkForm()) {
            setSubmiting(true);
            request("post", getEndpoint(EndpointsAdmin.Categories.create), { ...data })
            .then(() => {
                push(Paths[Views.categories].path);
                successNotification(ViewStrings.messageSuccess);
            })
            .catch(() => errorNotification(ViewStrings.messageError))
            .finally(() => setSubmiting(false))
        }
    }
    
    const handleInput = (e) => {
        const { id, value } = e.target;
        setData({ ...data, [id]: value });
    }
    
    const checkForm = () => {
        const { name, description } = data;
        return validateData([name, description]);
    }

    return (
        <GeneralLayout showBackButton title={ViewStrings.newCategory}>
            <PanelLayout>
                <SectionLayout>
                    <FormControl
                        required
                        controlId="name"
                        maxLength={50}
                        showMaxLength={true}
                        vertical={false}
                        value={data.name}
                        title={ViewStrings.name}
                        onChange={handleInput}
                        placeholder={ViewStrings.placeholderName}
                    />
                    <FormControl
                        style={{minHeight: "100px"}}
                        required
                        as="textarea"
                        controlId="description"
                        maxLength={500}
                        showMaxLength={true}
                        vertical={false}
                        value={data.description}
                        title={ViewStrings.description}
                        onChange={handleInput}
                        placeholder={ViewStrings.placeholderDescription}
                    />

                </SectionLayout>
                <div className="d-flex justify-content-end align-items-center">
                    <Button disabled={!checkForm() || submiting} onClick={handleSubmit}>
                        {submiting ? <Spinner size="sm" /> : ViewStrings.buttonCreate}
                    </Button>
                </div>
            </PanelLayout>

        </GeneralLayout>

    );
}
export default NewCategory;