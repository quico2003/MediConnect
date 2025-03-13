import { Button } from "react-bootstrap";
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";

const Tabs = ({ tabs }) => {
  return (
    <div className="d-flex align-items-center">
      {tabs.map((item) => (
        <Button
          variant="link"
          className="tab-button"
          activeClassName="active-tab-button"
          key={item.id}
          as={NavLink}
          replace={true}
          to={item.path}
        >
          {item.title}
        </Button>
      ))}
    </div>
  );
};

export default Tabs;
