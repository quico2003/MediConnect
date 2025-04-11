import { useContext, useState } from "react";
import useNotification from "../../../../Hooks/useNotification";
import PanelLayout from "../../../../Layouts/PanelLayout/PanelLayout";
import GeneralLayout from "../../../../Layouts/GeneralLayout/GeneralLayout";
import { StringsContext } from "../../../../Context/strings.context";
import { EndpointsAdmin, EndpointsUser, getEndpoint } from "../../../../Constants/endpoints.contants";
import FormControl from "../../../../Components/Form/FormControl/FormControl";
import { validateData } from "../../../../Config/GeneralFunctions";
import { Button } from "react-bootstrap";
import { EmailRegex, PasswordRegex } from "../../../../Utils/Regex";
import SectionLayout from "../../../../Layouts/SectionLayout/SectionLayout";
import { Paths } from "../../../../Constants/paths.constants";
import { Views } from "../../../../Constants/views.constants";
import useRequest from "../../../../Hooks/useRequest";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import FormControlPassword from "../../../../Components/Form/FormControl/FormControlPassword";


const AccountUser = () => {

    const { strings } = useContext(StringsContext);
    const ViewStrings = strings.User.Account;

    const request = useRequest();

    const { replace } = useHistory();

    const { showNotification: successNotification } = useNotification("success");
    const { showNotification: errorNotification } = useNotification();

    const [dataEmail, setDataEmail] = useState([]);
    const [dataPassword, setDataPassword] = useState([]);

    const handleSubmitEmail = () => {
        if (checkFormEmail()) {
            request("post", getEndpoint(EndpointsUser.Auth.updateUserEmail), { ...dataEmail })
                .then(() => {
                    successNotification(ViewStrings.messages.updateEmail);
                    replace(Paths[Views.login].path);
                    localStorage.clear();
                })
                .catch((err) => errorNotification(err.message));
        }
    };

    const handleSubmitPassword = () => {
        if (checkFormPassword()) {
            request("post", getEndpoint(EndpointsUser.Auth.updateUserPassword), { ...dataPassword })
                .then(() => {
                    successNotification(ViewStrings.messages.updatePassword);
                    replace(Paths[Views.login].path);
                    localStorage.clear();
                })
                .catch((err) => errorNotification(err.message));
        }
    };

    const handleInputEmail = (e) => {
        const { id, value } = e.target;
        setDataEmail({ ...dataEmail, [id]: value });
    };

    const handleInputPassword = (e) => {
        const { id, value } = e.target;
        setDataPassword({ ...dataPassword, [id]: value });
    };

    const checkFormEmail = () => {
        const { currentEmail, newEmail, newEmailCopy } = dataEmail;
        return (
            validateData([currentEmail, newEmail, newEmailCopy]) &&
            EmailRegex.test(currentEmail) &&
            EmailRegex.test(newEmail) &&
            EmailRegex.test(newEmailCopy) &&
            currentEmail !== newEmail &&
            newEmail === newEmailCopy);
    };

    const checkFormPassword = () => {
        const { currentPassword, newPassword, newPasswordCopy } = dataPassword;
        return (
            validateData([currentPassword, newPassword, newPasswordCopy]) &&
            PasswordRegex.test(currentPassword) &&
            PasswordRegex.test(newPassword) &&
            PasswordRegex.test(newPasswordCopy) &&
            currentPassword !== newPassword &&
            newPassword === newPasswordCopy);
    };

    return (
        <GeneralLayout title={ViewStrings.title}>
            <PanelLayout>
                <SectionLayout title={ViewStrings.sections.email}>
                    <FormControl
                        controlId="currentEmail"
                        showMaxLength={false}
                        vertical={false}
                        title={ViewStrings.inputs.currentEmailInput.title}
                        placeholder={ViewStrings.inputs.currentEmailInput.placeholder}
                        onChange={handleInputEmail}
                        value={dataEmail.currentEmail}
                    />
                    <FormControl
                        controlId="newEmail"
                        vertical={false}
                        showMaxLength={false}
                        title={ViewStrings.inputs.newEmail.title}
                        placeholder={ViewStrings.inputs.newEmail.placeholder}
                        onChange={handleInputEmail}
                        value={dataEmail.newEmail}
                    />
                    <FormControl
                        controlId="newEmailCopy"
                        vertical={false}
                        showMaxLength={false}
                        title={ViewStrings.inputs.newEmailCopy.title}
                        placeholder={ViewStrings.inputs.newEmailCopy.placeholder}
                        onChange={handleInputEmail}
                        value={dataEmail.newEmailCopy}
                    />
                    <div className="d-flex justify-content-end w-100 align-items-center">
                        <Button disabled={!checkFormEmail()} onClick={handleSubmitEmail}>
                            {ViewStrings.inputs.changeEmailButton.title}
                        </Button>
                    </div>
                </SectionLayout>
                <SectionLayout title={ViewStrings.sections.password}>
                    <FormControl
                        controlId="currentPassword"
                        showMaxLength={false}
                        vertical={false}
                        title={ViewStrings.inputs.currentPasswordInput.title}
                        placeholder={ViewStrings.inputs.currentPasswordInput.placeholder}
                        onChange={handleInputPassword}
                        value={dataPassword.currentPassword}
                    />
                    <FormControlPassword
                        controlId="newPassword"
                        vertical={false}
                        showMaxLength={false}
                        title={ViewStrings.inputs.newPassword.title}
                        placeholder={ViewStrings.inputs.newPassword.placeholder}
                        onChange={handleInputPassword}
                        value={dataPassword.newPassword}
                    />
                    <FormControlPassword
                        controlId="newPasswordCopy"
                        vertical={false}
                        showMaxLength={false}
                        title={ViewStrings.inputs.newPasswordCopy.title}
                        placeholder={ViewStrings.inputs.newPasswordCopy.placeholder}
                        onChange={handleInputPassword}
                        value={dataPassword.newPasswordCopy}
                    />
                    <div className="d-flex justify-content-end w-100 align-items-center">
                        <Button
                            disabled={!checkFormPassword()}
                            onClick={handleSubmitPassword}
                        >
                            {ViewStrings.inputs.changePasswordButton.title}
                        </Button>
                    </div>
                </SectionLayout>
            </PanelLayout>
        </GeneralLayout>
    );
};
export default AccountUser;