import classNames from "classnames";
import { Card } from "react-bootstrap";
import Loader from "../../Components/Loader/Loader";
const PanelLayout = ({
  children,
  loaded = true,
  centered,
  style,
  Tabs,
  container,
  className = "p-2 p-xl-3",
  cardClassName = "p-0",
  onClick = () => {},
}) => {
  const mainClassNames = classNames(
    "rounded-4 overflow-hidden border-0 position-relative mb-3 bg-white shadow",
    { "rounded-top-0": Tabs },
    { container },
    cardClassName
  );

  const contentClassname = classNames(
    {
      container: centered,
    },
    className
  );

  const renderContent = () => (
    <Card.Body className={contentClassname} style={style}>
      {children}
    </Card.Body>
  );

  const renderMainContent = () => (
    <Card onClick={!Tabs && onClick} className={mainClassNames}>
      {loaded ? renderContent() : <Loader />}
    </Card>
  );

  const renderTabs = () => (
    <div className="w-100 h-100">
      <div className="overflow-auto hide-scrollbar">
        <Tabs />
      </div>
      {renderMainContent()}
    </div>
  );

  if (Tabs) return renderTabs();
  else return renderMainContent();
};

export default PanelLayout;
