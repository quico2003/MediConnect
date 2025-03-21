import { useContext, useState } from "react";
import { Button, Card, Form, Image, InputGroup } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { Endpoints, getEndpoint } from "../../../Constants/endpoints.contants";
import { Paths } from "../../../Constants/paths.constants";
import { Views } from "../../../Constants/views.constants";
import useRequest from "../../../Hooks/useRequest";
import { EmailRegex, PasswordRegex } from "../../../Utils/Regex";

import { StorageKeys } from "../../../Constants/storekeys.constants";

import logo from "../../../Assets/images/Logo/logo-maximised-en.png";
import { UserContext } from "../../../Context/user.context";
import useNotification from "../../../Hooks/useNotification";

const Login = () => {
  const request = useRequest();

  const { replace } = useHistory();
  const { showNotification: errorNotification } = useNotification();

  const { setUser } = useContext(UserContext);

  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    email: false,
    password: false,
  });

  const handleEmail = (e) => {
    const { value } = e.target;
    setData({ ...data, email: value });
    setErrors({ ...errors, email: !EmailRegex.test(value) });
  };

  const handlePassword = (e) => {
    const { value } = e.target;
    setData({ ...data, password: value });
    setErrors({ ...errors, password: !PasswordRegex.test(value) });
  };

  const handleLogin = (e) => {
    e && e.preventDefault();
    if (checkForm()) {
      1
      request(
        "post",
        getEndpoint(Endpoints.Auth.login),
        { ...data },
        false,
        false
      )
        .then((res) => {
          const { token, email, fullName } = res.data;
          setUser({
            email,
            fullName,
          });
          localStorage.setItem(StorageKeys.EMAIL, email);
          localStorage.setItem(StorageKeys.TOKEN, token);
          replace(Paths[Views.home].path);
        })
        .catch((err) => errorNotification("Error: ", err.message));
    }
  };

  const checkForm = () => {
    if (!data.email || !data.password)
      return errorNotification("Email and Password are mandatory");

    if (errors.email) return errorNotification("Not valid email");
    if (errors.password) return errorNotification("Not valid password");

    return true;
  };

  return (
    <Card style={{ maxWidth: "25rem", width: "90vw" }}>
      <Form onSubmit={handleLogin}>
        <Card.Header className="p-4 bg-white d-flex justify-content-center">
          <Image variant="top" src={logo} style={{ maxHeight: 256 }} fluid />
        </Card.Header>
        <Card.Body className="p-0">
          <div className="p-2 p-md-4">
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                isInvalid={data.email && errors.email}
                value={data.email}
                onChange={handleEmail}
                type="email"
                placeholder="Enter email"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <InputGroup className="mb-3">
                <Form.Control
                  isInvalid={data.password && errors.password}
                  value={data.password}
                  onChange={handlePassword}
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                />
                <InputGroup.Text className="p-0">
                  <Button
                    variant="white"
                    className="bg-transparent border-0 rounded-0 d-flex justify-content-center align-items-center"
                    onClick={(e) =>
                      setShowPassword((showPassword) => !showPassword)
                    }
                  >
                    {showPassword ? (
                      <i className="material-icons">&#xe8f5;</i>
                    ) : (
                      <i className="material-icons">&#xe8f4;</i>
                    )}
                  </Button>
                </InputGroup.Text>
              </InputGroup>
            </Form.Group>

            <div className="d-flex w-100 justify-content-between">
              <Button
                variant="link"
                as={Link}
                to={Paths[Views.forgotPassword].path}
                type="button"
              >
                Forgot Password
              </Button>
              <Button
                disabled={errors.email || errors.password}
                type="submit"
                variant="primary"
              >
                Login
              </Button>
            </div>
          </div>
        </Card.Body>
      </Form>
    </Card>
  );
};

export default Login;
