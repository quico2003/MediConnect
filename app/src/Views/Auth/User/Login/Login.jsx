import { Button, Card, Image } from "react-bootstrap";
import FormControl from "../../../../Components/Form/FormControl/FormControl";
import FormControlPassword from "../../../../Components/Form/FormControl/FormControlPassword";
import logo from "../../../../Assets/images/Logo/logo-maximised-user.png";
import { useContext, useState } from "react";
import { StringsContext } from "../../../../Context/strings.context";
import { useDispatch } from "react-redux";
import useRequest from "../../../../Hooks/useRequest";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import useNotification from "../../../../Hooks/useNotification";
import { validateLogin } from "../../../../Config/GeneralFunctions";
import { EmailRegex } from "../../../../Utils/Regex";
import { EndpointUser, getEndpoint } from "../../../../Constants/endpoints.contants";
import { StorageKeys } from "../../../../Constants/storekeys.constants";
import { Paths } from "../../../../Constants/paths.constants";
import { Views } from "../../../../Constants/views.constants";
import { toggleUserAvatar, toggleUserEmail, toggleUserName } from "../../../../Redux/actions/UserInfoAction";

const LoginUser = () => {

    const { strings } = useContext(StringsContext);
    const ViewStrings = strings.General.Login;

    const dispatch = useDispatch();

    const request = useRequest();
    const { replace } = useHistory();

    const [data, setData] = useState({});

    const { showNotification: successNotification } = useNotification("success");
    const { showNotification: errorNotification } = useNotification();

    const handleInput = (e) => {
        const { id, value } = e.target;
        setData({ ...data, [id]: value });
    }

    const handleSubmit = (e) => {
        e && e.preventDefault();

        if (checkForm) {
            request(
                "post",
                getEndpoint(EndpointUser.Auth.loginUser),
                { ...data },
                false,
                false
            ).then((res) => {
                const { email, token, avatar, firstName, lastName } = res.data;
                dispatch(toggleUserName({ firstName, lastName }));
                dispatch(toggleUserEmail(email));
                dispatch(toggleUserAvatar(avatar));
                localStorage.setItem(StorageKeys.TOKEN, token);
                successNotification(ViewStrings.successNotification);
                replace(Paths[Views.home].path)
            }).catch(() => errorNotification(ViewStrings.errorNotification))
        }
    }

    const checkForm = () => {
        const { email, password } = data;
        return validateLogin(email, password);
    }

    return (

        <Card style={{ maxWidth: "30rem", width: "90vw" }}>
            <Card.Header className="d-flex justify-content-center">
                <Image src={logo} fluid />
            </Card.Header>
            <Card.Body>
                <FormControl
                    title={ViewStrings.emailAddres}
                    required
                    controlId="email"
                    value={data.email}
                    onChange={handleInput}
                    vertical={false}
                    isInvalid={data.email && !EmailRegex.test(data.email)}
                />
                <FormControlPassword
                    title={ViewStrings.password}
                    required
                    controlId="password"
                    value={data.password}
                    onChange={handleInput}
                    vertical={false}
                    type={"password"}
                    isInvalid={data.password && data.password.length < 6}
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
export default LoginUser;