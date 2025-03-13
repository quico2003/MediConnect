import { useEffect, useState } from "react";
import { Button, Card, Form, InputGroup } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { Paths } from "../../../Constants/paths.constants";
import { Views } from "../../../Constants/views.constants";
import { PasswordRegex } from "../../../Utils/Regex";

import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import logo from "../../../Assets/images/Logo/logo-maximised-en.png";
import { Endpoints, getEndpoint } from "../../../Constants/endpoints.contants";
import useNotification from "../../../Hooks/useNotification";
import useRequest from "../../../Hooks/useRequest";
import useLoaded from "../../../Hooks/useLoaded";

const ResetPassword = () => {
  const request = useRequest();
  const { push } = useHistory();

  const { replace } = useHistory();
  const { recoverycode } = useParams();

  const { showNotification: errorNotification } = useNotification();
  const { showNotification: successNotification } = useNotification("success");

  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [data, setData] = useState({
    password: "",
    password2: "",
    recoverycode,
  });
  const [errors, setErrors] = useState({
    password: false,
    samePassword: false,
  });

  const { startFetching, finishFetching } = useLoaded();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    startFetching();
    return await request("get", getEndpoint(Endpoints.Auth.resetPassword), {
      recoverycode: recoverycode,
    })
      .then((res) => {
      })
      .catch(() => {
        errorNotification("Error resetting password"),
          push(Paths[Views.login].path);
      })
      .finally(() => finishFetching());
  };

  const handlePassword = (e) => {
    const { value } = e.target;
    setErrors({ ...errors, password: !PasswordRegex.test(value) });
    setData({ ...data, password: value });
  };

  const handlePassword2 = (e) => {
    const { value } = e.target;
    setData({ ...data, password2: value });
  };

  const handleResetPassword = (e) => {
    e && e.preventDefault();
    if (checkForm()) {
      request("post", getEndpoint(Endpoints.Auth.resetPasswordFinal), {
        ...data,
      })
        .then((res) => {
          successNotification("Password updated successfully!");
          replace(Paths[Views.login].path);
        })
        .catch((err) => errorNotification(err.message));
    }
  };

  const checkForm = () => {
    if (!data.password || !data.password2)
      return errorNotification("All fields are mandatory");

    if (data.password !== data.password2)
      return errorNotification("Passwords are not matching");

    return true;
  };

  return (
    <Card style={{ maxWidth: "25rem", width: "90vw" }}>
      <Form onSubmit={handleResetPassword}>
        <Card.Header className="p-4">
          <Card.Img variant="top" src={logo} />
        </Card.Header>
        <Card.Body className="p-0">
          <div className="p-2 p-md-4">
            <Form.Group className="mb-3" controlId="password1">
              <Form.Label>New Password</Form.Label>
              <InputGroup className="mb-3">
                <Form.Control
                  isInvalid={errors.password}
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

            <Form.Group className="mb-3" controlId="password2">
              <Form.Label>Re-type Password</Form.Label>
              <InputGroup className="mb-3">
                <Form.Control
                  isInvalid={
                    data.password !== data.password2 &&
                    data.password2.length > 0
                  }
                  value={data.password2}
                  onChange={handlePassword2}
                  type={showPassword2 ? "text" : "password"}
                  placeholder="Re-type password"
                />
                <InputGroup.Text className="p-0">
                  <Button
                    variant="white"
                    className="bg-transparent border-0 rounded-0 d-flex justify-content-center align-items-center"
                    onClick={(e) =>
                      setShowPassword2((showPassword2) => !showPassword2)
                    }
                  >
                    {showPassword2 ? (
                      <i className="material-icons">&#xe8f5;</i>
                    ) : (
                      <i className="material-icons">&#xe8f4;</i>
                    )}
                  </Button>
                </InputGroup.Text>
              </InputGroup>
            </Form.Group>

            <div className="d-flex w-100 justify-content-center">
              <Button
                disabled={errors.password || data.password !== data.password2}
                type="submit"
                variant="primary"
              >
                Submit
              </Button>
            </div>
          </div>
        </Card.Body>
      </Form>
    </Card>
  );
};

export default ResetPassword;
