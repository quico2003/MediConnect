import { Col, Row } from "react-bootstrap";
import Marquee from "react-fast-marquee";
import { MdArrowBack } from "react-icons/md";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import Breadcrumbs from "../../Components/Breadcrumbs/Breadcrumbs";
import IconButton from "../../Components/Buttons/IconButton";
import Loader from "../../Components/Loader/Loader";

const GeneralLayout = ({
  title,
  subtitle,
  loaded,
  showBackButton,
  rightSection,
  children,
  breadcrumbs,
}) => {
  const { isMobileView } = useSelector((state) => state.Config);
  const { goBack } = useHistory();

  return (
    <div className="p-1 pt-3 p-lg-2 p-xl-3">
      <div className="mb-2">
        {breadcrumbs && <Breadcrumbs paths={breadcrumbs} />}
        <Row className="mx-0">
          <Col
            sm={12}
            md={rightSection ? 6 : 12}
            className="overflow-hidden px-0 mb-3 mb-lg-0"
          >
            {title && (
              <div className="d-flex align-items-center">
                {showBackButton && !isMobileView && (
                  <div className="me-2">
                    <IconButton onClick={goBack} Icon={MdArrowBack} size={24} />
                  </div>
                )}
                <div className="w-100 d-flex justify-content-center flex-column align-items-center align-items-md-start">
                  {title.length > 50 ? (
                    <Marquee
                      delay={3}
                      speed={25}
                      className="overflow-hidden bg-danger"
                    >
                      <h1 className="mb-0 text-nowrap me-0 me-lg-5">{title}</h1>
                    </Marquee>
                  ) : (
                    <h1 className="mb-0 text-nowrap me-0 me-lg-5">{title}</h1>
                  )}
                  {subtitle && (
                    <small className="mb-0 text-uppercase text-muted">
                      {subtitle}
                    </small>
                  )}
                </div>
              </div>
            )}
          </Col>
          {(loaded === false || rightSection) && (
            <Col sm={12} md={6} className="px-0">
              <div className="d-flex justify-content-center justify-content-md-end align-items-center w-100 h-100">
                {rightSection}
              </div>
            </Col>
          )}
        </Row>
      </div>
      <div className="p-0 p-md-2">
        {loaded === false ? <Loader /> : children}
      </div>
    </div>
  );
};

export default GeneralLayout;
