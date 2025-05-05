import { useContext, useState } from "react";
import { StringsContext } from "../../../../../Context/strings.context";
import useRequest from "../../../../../Hooks/useRequest";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import useNotification from "../../../../../Hooks/useNotification";
import { validateData } from "../../../../../Config/GeneralFunctions";
import GeneralLayout from "../../../../../Layouts/GeneralLayout/GeneralLayout";
import PanelLayout from "../../../../../Layouts/PanelLayout/PanelLayout";
import SectionLayout from "../../../../../Layouts/SectionLayout/SectionLayout";
import FormControl from "../../../../../Components/Form/FormControl/FormControl";
import { Button, FormLabel, Spinner } from "react-bootstrap";
import { EndpointsUser, getEndpoint } from "../../../../../Constants/endpoints.contants";
import { Views } from "../../../../../Constants/views.constants";
import { Paths } from "../../../../../Constants/paths.constants";
import { EmailRegex, PhoneRegexSimple } from "../../../../../Utils/Regex";
import ReactQuill from "react-quill";
import RequiredField from "../../../../../Components/Form/RequiredField/RequiredField";

const NewClient = () => {

    const { strings } = useContext(StringsContext);
    const ViewStrings = strings.User.add;

    const request = useRequest();
    const { push } = useHistory();

    const [submiting, setSubmiting] = useState(false);

    const { showNotification: successNotification } = useNotification("success");
    const { showNotification: errorNotification } = useNotification();

    const [data, setData] = useState({});

    const handleSubmit = () => {
        if (checkForm()) {
            setSubmiting(true);
            request("post", getEndpoint(EndpointsUser.Clients.create), { ...data })
                .then(() => {
                    push(Paths[Views.clients].path);
                    successNotification(ViewStrings.messageSuccess);
                })
                .catch((err) => errorNotification(err.message))
                .finally(() => setSubmiting(false))
        }
    }

    const handleInput = (e) => {
        const { id, value } = e.target;
        setData({ ...data, [id]: value });
    }

    const handleInputDescription = (e) => {
        setData({ ...data, "anotations": e })
    }

    const checkForm = () => {
        const { firstName, lastName, email, phone, anotations } = data;
        return validateData([firstName, lastName, email, phone, anotations])
            && PhoneRegexSimple.test(phone)
            && EmailRegex.test(email);
    }

    return (
        <GeneralLayout showBackButton title={ViewStrings.title}>
            <PanelLayout>
                <SectionLayout>
                    <FormControl
                        required
                        controlId="firstName"
                        showMaxLength
                        vertical={false}
                        title={ViewStrings.firstName}
                        value={data.firstName}
                        onChange={handleInput}
                        placeholder={ViewStrings.pFirstName}
                    />
                    <FormControl
                        required
                        controlId="lastName"
                        showMaxLength
                        vertical={false}
                        title={ViewStrings.lastName}
                        value={data.lastName}
                        onChange={handleInput}
                        placeholder={ViewStrings.pLastName}
                    />
                    <FormControl
                        required
                        controlId="email"
                        showMaxLength
                        vertical={false}
                        title={ViewStrings.email}
                        value={data.email}
                        onChange={handleInput}
                        placeholder={ViewStrings.pEmail}
                    />
                    <FormControl
                        required
                        controlId="phone"
                        showMaxLength
                        vertical={false}
                        title={ViewStrings.phone}
                        value={data.phone}
                        onChange={handleInput}
                        placeholder={ViewStrings.pPhone}
                    />
                    <FormLabel className="mb-0">{ViewStrings.anotations}<RequiredField /></FormLabel>
                    <ReactQuill
                        id="anotations"
                        theme="snow"
                        onChange={handleInputDescription}
                        value={data.anotations}
                    />
                </SectionLayout>
                <div className="d-flex justify-content-end align-items-center">
                    <Button disabled={!checkForm() || submiting} onClick={handleSubmit}>
                        {submiting ? <Spinner size="sm" /> : ViewStrings.buttonCreate}
                    </Button>
                </div>
            </PanelLayout>
        </GeneralLayout>
    )

}
export default NewClient;