import { useContext, useState } from "react";
import Button from 'react-bootstrap/Button';
import FormControl from "../../../../Components/Form/FormControl/FormControl";
import { Card } from "react-bootstrap";
import { Endpoints, getEndpoint } from "../../../../Constants/endpoints.contants";
import useRequest from "../../../../Hooks/useRequest";
import { Paths } from "../../../../Constants/paths.constants";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { Views } from "../../../../Constants/views.constants";
import { AdminContext } from "../../../../Context/admin.context";
import { StorageKeys } from "../../../../Constants/storekeys.constants";
import { UserContext } from "../../../../Context/user.context";

const LoginAdmin = () => {
    const request = useRequest();

    const { replace } = useHistory();

    const { setUser } = useContext(UserContext);

    //variable data that contains an object with email and password that are nothing at the beginning
    const [data, setData] = useState({
        email: "",
        password: "",
    });

    //This function is saved in a variable the e.taget which is the value of the form
    const handleInput = (e) => {

        console.log(e.target);
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
            const { name, email, expiredate, token} = res.data;
            setUser({
                name,
                email,
                expiredate,
            });
            localStorage.setItem(StorageKeys.EMAIL, email);
            localStorage.setItem(StorageKeys.TOKEN, token);
            localStorage.setItem(StorageKeys.NAME, name);
            console.log('Login correcto.');
            replace(Paths[Views.homeAdmin].path);
        })
        .catch((err) => console.log(err));
    };


    //Render to DOM
    return (

        <Card>
            <Card.Header>

                <Card.Title>Login Admin</Card.Title>

            </Card.Header>

            <Card.Body>

                <FormControl
                    title="Email address: "
                    required
                    controlId="email"
                    value={data.email}
                    onChange={handleInput}
                />

                <FormControl title="Password: "
                    required
                    controlId="password"
                    value={data.password}
                    onChange={handleInput}
                />

                <Button onClick={handleSubmit}>
                    Submit
                </Button>

            </Card.Body>

        </Card>

    );
}
export default LoginAdmin;