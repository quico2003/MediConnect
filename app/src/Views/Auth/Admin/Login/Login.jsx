import { useContext, useState } from "react";
import Button from 'react-bootstrap/Button';
import FormControl from "../../../../Components/Form/FormControl/FormControl";
import { Card, Form, Image, InputGroup } from "react-bootstrap";
import { Endpoints, getEndpoint } from "../../../../Constants/endpoints.contants";
import useRequest from "../../../../Hooks/useRequest";
import { Paths } from "../../../../Constants/paths.constants";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { Views } from "../../../../Constants/views.constants";
import { StorageKeys } from "../../../../Constants/storekeys.constants";
import { UserContext } from "../../../../Context/user.context";
import logo from "../../../../Assets/images/Logo/logo-maximised-en.png"
import FormControlPassword from "../../../../Components/Form/FormControl/FormControlPassword";
import { EmailRegex } from "../../../../Utils/Regex";
import { validateLoginAdmin } from "../../../../Config/GeneralFunctions";
import { StringsContext } from "../../../../Context/strings.context";
import useNotification from "../../../../Hooks/useNotification";
import { toggleAdminAvatar, toggleAdminEmail, toggleAdminName } from "../../../../Redux/actions/AdminInfoActions";
import { useDispatch } from "react-redux";

const LoginAdmin = () => {

    const { strings } = useContext(StringsContext);
    const ViewStrings = strings.General.Login;

    const dispatch = useDispatch();

    const request = useRequest();
    const { replace } = useHistory();

    const { setUser } = useContext(UserContext);

    const { showNotification: successNotification } = useNotification("success");
    const { showNotification: errorNotification } = useNotification();

    //variable data that contains an object with email and password that are nothing at the beginning
    const [data, setData] = useState({
        email: "",
        password: "",
    });

    //This function is saved in a variable the e.taget which is the value of the form
    const handleInput = (e) => {
        const { id, value } = e.target;
        setData({ ...data, [id]: value });

    }

    //This function fetch the API to find the Administrator
    const handleSubmit = (e) => {
        e && e.preventDefault();

        request(
            "post",
            getEndpoint(Endpoints.Auth.loginAdmin),
            { ...data },
            false,
            false
        ).then((res) => {
            const { name, email, token, avatar } = res.data;
            dispatch(toggleAdminName(name));
            dispatch(toggleAdminEmail(email));
            dispatch(toggleAdminAvatar(avatar));
            localStorage.setItem(StorageKeys.TOKEN, token);
            replace(Paths[Views.homeAdmin].path);
            successNotification(ViewStrings.successNotification)
        })
            .catch((err) => errorNotification(ViewStrings.errorNotification));
    };

    const checkForm = () => {
        const { email, password } = data;
        return validateLoginAdmin(email, password);
    }

    //Render to DOM
    return (

        <Card style={{ maxWidth: "30rem", width: "90vw" }}>
            <Card.Header className="d-flex justify-content-center">
                <Image src={logo} fluid />
            </Card.Header>
            <Card.Body className="">
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
                        Submit
                    </Button>
                </div>

            </Card.Body>
        </Card>
    );
}
export default LoginAdmin;