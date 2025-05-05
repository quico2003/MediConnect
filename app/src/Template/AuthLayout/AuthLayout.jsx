import { Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import AnimationBalls from "../../Components/AnimationBalls/AnimationBalls";
import { Colors } from "../../Utils/Colors";
import { useEffect } from "react";
import { EndpointsAdmin, getEndpoint } from "../../Constants/endpoints.contants";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { Paths } from "../../Constants/paths.constants";
import { Views } from "../../Constants/views.constants";
import useRequest from "../../Hooks/useRequest";

const AuthLayout = ({ children }) => {
  const { isMobileView } = useSelector((state) => state.Config);

  const request = useRequest();
  
  const { push } = useHistory();

  useEffect(() => {
    checkAdmin();
  }, []);

  const checkAdmin = () => {
    request("get", getEndpoint(EndpointsAdmin.Auth.checkAdmin)).then(() => push(Paths[Views.homeAdmin].path)).catch(() => push(Paths[Views.loginAdmin].path));
  };

  return (
    <div className="w-100 overflow-hidden" style={{ height: "100vh" }}>
      <Container className="d-flex justify-content-center align-items-start w-100 h-100 p-0 p-md-3">
        {/* Animation */}
        <div className="position-relative d-flex justify-content-center align-items-center h-100">
          <div
            className="position-absolute"
            style={{
              bottom: isMobileView ? -450 : -550,
              left: -100,
              right: 100,
              margin: "auto",
            }}
          >
            <AnimationBalls
              color={`${Colors.purple}75`}
              style={{ left: "-200rem" }}
              size={200}
            />
            <AnimationBalls
              color={`${Colors.green}75`}
              style={{ left: "-150rem", top: "-50rem" }}
              size={200}
            />
            <AnimationBalls
              color={`${Colors.purple}75`}
              style={{ left: "-40rem" }}
              size={300}
            />
            <AnimationBalls
              color={`${Colors.green}75`}
              style={{ left: "-20rem" }}
              size={250}
            />
            <AnimationBalls
              color={`${Colors.purple}75`}
              style={{ left: "20rem" }}
              size={150}
            />
            <AnimationBalls
              color={`${Colors.green}75`}
              style={{ left: "40rem" }}
              size={100}
            />
          </div>
        </div>

        <div className="w-auto h-100 d-flex align-items-center">{children}</div>
      </Container>
    </div>
  );
};

export default AuthLayout;
