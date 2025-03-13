import classNames from "classnames";
import { Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { NavLink, useLocation } from "react-router-dom";
import { Configuration } from "../../../Config/app.config";
import useSideBar from "../../../Hooks/useSideBar";
import { useContext } from "react";
import { StringsContext } from "../../../Context/strings.context";

const SideBarItem = ({ item }) => {
  const { strings } = useContext(StringsContext);
  const ViewStrings = strings.navBar;

  const { pathname } = useLocation();
  const { isMobileView } = useSelector((state) => state.Config);
  const { expanded, setMenuOpen } = useSideBar();

  const isExact = item.path.includes(pathname);

  const itemClassName = classNames("p-0 sidebar-nav-item rounded", {
    "sidebar-nav-item-selected shadow-sm": isExact,
    "mb-3": !Configuration.theme.general.sidebar.groupSideBarItems,
    "mb-1": Configuration.theme.general.sidebar.groupSideBarItems,
  });

  const buttonClassName = classNames(
    "w-100 py-2 px-2 text-start text-secondary shadow-none align-items-center d-flex",
    {
      "justify-content-start": isMobileView || expanded,
      "justify-content-center": !isMobileView && !expanded,
    }
  );

  const getIcon = () => {
    let icon = `&#x${item.icon};`;
    return `<i class="material-icons">${icon}</i>`;
  };
  return (
    <div className={itemClassName}>
      <Button
        title={ViewStrings[item.title]}
        className={buttonClassName}
        variant="link"
        onClick={() => setMenuOpen(false)}
        as={NavLink}
        to={item.path.replace(/\/:(.*)\?$/, "")}
      >
        {Configuration.theme.general.sidebar.showIcons && (
          <div
            className="d-flex"
            dangerouslySetInnerHTML={{ __html: getIcon() }}
          />
        )}
        <span className={isMobileView || expanded ? "ms-3" : ""}>
          {(isMobileView || expanded) && ViewStrings[item.title]}
        </span>
      </Button>
    </div>
  );
};

export default SideBarItem;
