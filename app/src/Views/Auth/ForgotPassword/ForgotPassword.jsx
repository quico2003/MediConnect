import { useState } from "react";
import { Button, Card, Form, Image, Spinner } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { Paths } from "../../../Constants/paths.constants";
import { StorageKeys } from "../../../Constants/storekeys.constants";
import { Views } from "../../../Constants/views.constants";
import { EmailRegex } from "../../../Utils/Regex";

import logoMaximised from "../../../Assets/images/Logo/logo-maximised-en.png";
import { Endpoints, getEndpoint } from "../../../Constants/endpoints.contants";
import useNotification from "../../../Hooks/useNotification";
import useRequest from "../../../Hooks/useRequest";

const ForgotPassword = () => {
  const request = useRequest();

  const { replace } = useHistory();

  const { showNotification: errorNotification } = useNotification();
  const { showNotification: successNotification } = useNotification("success");

  const [data, setData] = useState({ email: "" });
  const [errors, setErrors] = useState({ email: false });
  const [loading, setLoading] = useState(false);

  const handleEmail = (e) => {
    const { value } = e.target;
    setErrors({ ...errors, email: !EmailRegex.test(value) });
    setData({ ...data, email: value });
  };

  const handleLogin = (e) => {
    e && e.preventDefault();
    if (checkForm()) {
      setLoading(true);
      request("post", getEndpoint(Endpoints.Auth.forgotPassword), { ...data })
        .then(() => {
          localStorage.setItem(StorageKeys.TOKEN, "token");
          successNotification("Email enviado correctamente");
          replace(Paths[Views.login].path);
        })
        .catch((err) => errorNotification(err.message))
        .finally(() => setLoading(false));
    }
  };

  const checkForm = () => {
    if (!data.email) return errorNotification("Email is mandatory");
    if (errors.email) return errorNotification("Not valid email");
    return true;
  };

  return (
    <Card style={{ maxWidth: "25rem", width: "90vw" }}>
      <Form onSubmit={handleLogin}>
        <Card.Header className="p-4 bg-transparent d-flex justify-content-center">
          <Image
            variant="top"
            src={logoMaximised}
            style={{ maxHeight: 256 }}
            fluid
          />
        </Card.Header>
        <Card.Body className="p-0">
          <div className="p-2 p-md-4">
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                isInvalid={errors.email}
                value={data.email}
                onChange={handleEmail}
                type="email"
                placeholder="Enter email"
              />
            </Form.Group>

            <div className="d-flex w-100 justify-content-between">
              <Button
                variant="link"
                as={Link}
                to={Paths[Views.login].path}
                type="button"
              >
                Sign in
              </Button>
              <Button disabled={errors.email} type="submit" variant="primary">
                {loading ? (
                  <Spinner animation="border" size="sm" />
                ) : (
                  "Continue"
                )}
              </Button>
            </div>
          </div>
        </Card.Body>
      </Form>
    </Card>
  );
};

export default ForgotPassword;
