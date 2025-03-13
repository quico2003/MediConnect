import { Button } from "react-bootstrap";
import Marquee from "react-fast-marquee";
import { useHistory } from "react-router-dom";
import { Link, useLocation } from "react-router-dom/cjs/react-router-dom.min";
import { HomePath } from "../../Constants/paths.constants";

const Breadcrumbs = ({ paths = [], showIcon = true }) => {
  const { pathname } = useLocation();
  const { push } = useHistory();

  const getIcon = (codePoint) => {
    let icon = `&#x${codePoint};`;
    return `<i class="material-icons" style="font-size: 1.3rem">${icon}</i>`;
  };

  return (
    <div className="d-none d-lg-flex w-100 mb-3">
      <Button
        as={Link}
        title="Home"
        to={HomePath.path}
        variant="link"
        className="d-flex align-items-center text-decoration-none p-0"
      >
        {HomePath.icon && showIcon && (
          <div
            className="d-flex"
            dangerouslySetInnerHTML={{
              __html: getIcon(HomePath.icon),
            }}
          />
        )}
        <span className="ms-1 mb-0">{HomePath.title}</span>
        {pathname !== HomePath.path && <span className="mx-2">/</span>}
      </Button>
      {paths.map((path, idx) => {
        const isLast = idx === paths.length - 1;
        return (
          <Button
            as={!isLast && Link}
            to={!isLast ? path.path : ""}
            variant="link"
            key={idx}
            className="d-flex align-items-center text-decoration-none p-0"
          >
            {path.icon && showIcon && (
              <div
                className="d-flex"
                dangerouslySetInnerHTML={{ __html: getIcon(path.icon) }}
              />
            )}
            {path.title?.length > 30 ? (
              <div title={path.title}>
                <Marquee
                  className="ms-1 mb-0"
                  style={{ width: "auto", maxWidth: 150 }}
                  delay={3}
                  speed={25}
                >
                  {path.title}
                </Marquee>
              </div>
            ) : (
              <span title={path.title} className="ms-1 mb-0">
                {path.title}
              </span>
            )}
            {!isLast && path.title && <span className="mx-2">/</span>}
          </Button>
        );
      })}
    </div>
  );
};

export default Breadcrumbs;
