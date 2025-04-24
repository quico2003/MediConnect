import GeneralLayout from "../../../../../Layouts/GeneralLayout/GeneralLayout";
import PanelLayout from "../../../../../Layouts/PanelLayout/PanelLayout";
import SectionLayout from "../../../../../Layouts/SectionLayout/SectionLayout";
import FormControlPassword from "../../../../../Components/Form/FormControl/FormControlPassword";
import { useContext, useEffect, useState } from "react";
import FormControl from "../../../../../Components/Form/FormControl/FormControl";
import { Button, Spinner } from "react-bootstrap";
import useRequest from "../../../../../Hooks/useRequest";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import useNotification from "../../../../../Hooks/useNotification";
import { validateData, validateDataCreateUser } from "../../../../../Config/GeneralFunctions";
import { EmailRegex, PasswordRegex } from "../../../../../Utils/Regex";
import { EndpointsAdmin, getEndpoint } from "../../../../../Constants/endpoints.contants";
import { Paths } from "../../../../../Constants/paths.constants";
import { Views } from "../../../../../Constants/views.constants";
import { StringsContext } from "../../../../../Context/strings.context";

const NewUser = () => {

    const { strings } = useContext(StringsContext);
    const ViewStrings = strings.user.add;

    const request = useRequest();
    const { push } = useHistory();

    const [submiting, setSubmiting] = useState(false);

    const { showNotification: successNotification } = useNotification("success");
    const { showNotification: errorNotification } = useNotification();

    const [data, setData] = useState({ password: "Test1234!" });

    const handleSubmit = () => {
        if (checkForm()) {
            setSubmiting(true);
            request("post", getEndpoint(EndpointsAdmin.Users.create), { ...data })
                .then(() => {
                    push(Paths[Views.users].path);
                    successNotification(ViewStrings.userCreated);
                })
                .catch((err) => errorNotification(err.message))
                .finally(() => setSubmiting(false));
        }
    }

    const handleInput = (e) => {
        const { id, value } = e.target;
        setData({ ...data, [id]: value });
    }

    const checkForm = () => {
        const { firstName, lastName, specialty, email, password } = data;
        return validateData([firstName, lastName, specialty, email, password]) &&
            PasswordRegex.test(password) && EmailRegex.test(email);
    }

    return (
        <GeneralLayout showBackButton title={ViewStrings.title}>
            <PanelLayout>
                <SectionLayout>
                    <FormControl
                        required
                        controlId="firstName"
                        showMaxLength={true}
                        vertical={false}
                        title={ViewStrings.firstName}
                        value={data.firstName}
                        onChange={handleInput}
                        placeholder={ViewStrings.placeholderFirstName}
                    />
                    <FormControl
                        required
                        controlId="lastName"
                        showMaxLength={true}
                        vertical={false}
                        title={ViewStrings.lastName}
                        value={data.lastName}
                        onChange={handleInput}
                        placeholder={ViewStrings.placeholderLastName}
                    />
                    <FormControl
                        required
                        controlId="specialty"
                        showMaxLength={true}
                        vertical={false}
                        title={ViewStrings.specialty}
                        value={data.specialty}
                        onChange={handleInput}
                        placeholder={ViewStrings.placeholderSpecialty}
                    />
                    <FormControl
                        required
                        controlId="email"
                        showMaxLength={true}
                        vertical={false}
                        title={ViewStrings.email}
                        value={data.email}
                        onChange={handleInput}
                        placeholder={ViewStrings.placeholderEmail}
                        isInvalid={data.email && !EmailRegex.test(data.email)}
                    />
                    <FormControlPassword
                        required
                        show={true}
                        controlId="password"
                        vertical={true}
                        title={ViewStrings.password}
                        value={data.password}
                        onChange={handleInput}
                        type={"password"}
                        placeholder={ViewStrings.placeholderPassword}
                        isInvalid={data.password && !PasswordRegex.test(data.password)}
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
export default NewUser;