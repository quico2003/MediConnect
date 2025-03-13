import classNames from "classnames";
import Loader from "../../Components/Loader/Loader";

const SectionLayout = ({
  title,
  subtitle,
  Icon,
  className = "",
  titleSize = "h5",
  children,
  rightSection,
  loaded = true,
}) => {
  const titleClassNames = classNames("mb-0 text-primary ms-2", titleSize);
  const mainClassNames = classNames(
    {
      "mb-3": !className.includes("mb-"),
    },
    className
  );

  return (
    <div className={mainClassNames}>
      <div className="d-flex justify-content-between align-items-center w-100 pb-1">
        <div className="w-100 d-flex align-items-center">
          {Icon && <Icon size={20} />}
          <p className={titleClassNames}>{title}</p>
          {subtitle && <p className="text-muted ms-2 mb-0">{subtitle}</p>}
        </div>
        {rightSection && (
          <div className="d-flex justify-content-end align-items-center w-100">
            <div>{rightSection}</div>
          </div>
        )}
      </div>
      <div className="border p-2 rounded-3">
        {loaded ? children : <Loader />}
      </div>
    </div>
  );
};

export default SectionLayout;
