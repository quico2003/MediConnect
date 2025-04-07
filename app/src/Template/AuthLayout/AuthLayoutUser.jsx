import { Container } from "react-bootstrap";
import { useSelector } from "react-redux";

const AuthLayoutUser = ({ children }) => {
  const { isMobileView } = useSelector((state) => state.Config);

  return (
    <div className="w-100 overflow-hidden custom_layout" style={{ height: "100vh" }}>
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
            
          </div>
        </div>

        <div className="w-auto h-100 d-flex align-items-center">{children}</div>
      </Container>
    </div>
  );
};

export default AuthLayoutUser;
