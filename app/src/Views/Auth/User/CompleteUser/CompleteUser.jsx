import { Button, Card, Image } from "react-bootstrap";
import FormControlPassword from "../../../../Components/Form/FormControl/FormControlPassword";
import logo from "../../../../Assets/images/Logo/logo-maximised-user.png";
import { useContext, useState } from "react";
import { StringsContext } from "../../../../Context/strings.context";
import useRequest from "../../../../Hooks/useRequest";
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min";
import useNotification from "../../../../Hooks/useNotification";
import { validateData } from "../../../../Config/GeneralFunctions";
import { PasswordRegex } from "../../../../Utils/Regex";
import { EndpointsUser, getEndpoint } from "../../../../Constants/endpoints.contants";
import { Paths } from "../../../../Constants/paths.constants";
import { Views } from "../../../../Constants/views.constants";


const CompleteUser = () => {

    const { strings } = useContext(StringsContext);
    const ViewStrings = strings.General.Login;

    const request = useRequest();
    const { replace } = useHistory();

    const [data, setData] = useState({});
    const { user_guid } = useParams();

    const { showNotification: successNotification } = useNotification("success");
    const { showNotification: errorNotification } = useNotification();

    const handleInput = (e) => {
        const { id, value } = e.target;
        setData({ ...data, [id]: value });
    }

    const handleSubmit = () => {
        if (checkForm()) {
            request("post", getEndpoint(EndpointsUser.Auth.completeUser), { ...data, guid: user_guid })
                .then(() => {
                    successNotification("Password updated.");
                    replace(Paths[Views.homeUser].path);
                })
                .catch((err) => errorNotification(err.message));
        }
    }

    const checkForm = () => {
        const { password, passwordCopy } = data;
        return validateData([password, passwordCopy])
            && PasswordRegex.test(password)
            && PasswordRegex.test(passwordCopy)
            && JSON.stringify(password) === JSON.stringify(passwordCopy);
    }

    return (

        <Card style={{ maxWidth: "30rem", width: "90vw" }}>
            <Card.Header className="d-flex justify-content-center">
                <Image src={logo} fluid />
            </Card.Header>
            <Card.Body>
                <p>
                    Canvia la contraseña para una mayor seguridad
                </p>
                <FormControlPassword
                    title={ViewStrings.password}
                    required
                    controlId="password"
                    value={data.password}
                    onChange={handleInput}
                    vertical={true}
                    type={"password"}
                    isInvalid={data.password && data.password.length < 6}

                />
                <FormControlPassword
                    title={ViewStrings.password}
                    required
                    controlId="passwordCopy"
                    value={data.passwordCopy}
                    onChange={handleInput}
                    vertical={true}
                    type={"password"}
                    isInvalid={data.passwordCopy && data.passwordCopy.length < 6}
                />

                <div className="d-flex justify-content-end">
                    <Button disabled={!checkForm()} onClick={handleSubmit}>
                        {ViewStrings.buttonLogin}
                    </Button>
                </div>
            </Card.Body>
        </Card>
    )
}
export default CompleteUser;