import classNames from "classnames";
import { useContext, useState } from "react";
import { Accordion, Button, Card, useAccordionButton } from "react-bootstrap";
import { BsChevronCompactDown, BsSearch } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Configuration } from "../../../Config/app.config";
import { NavItemsAdmin, NavItemsUser } from "../../../Constants/navitems.constants";
import useSideBar from "../../../Hooks/useSideBar";
import { setCurrentNavItemMenuSelectedAction } from "../../../Redux/actions/ConfigActions";
import SideBarBrand from "./SideBarBrand";
import SideBarItem from "./SideBarItem";
import { StringsContext } from "../../../Context/strings.context";

const SideBar = ({ role }) => {
  const { strings } = useContext(StringsContext);
  const ViewStrings = strings.navBar;

  const { isMobileView, currentNavItemSelected } = useSelector(
    (state) => state.Config
  );
  const dispatch = useDispatch();

  const { expanded } = useSideBar();
  const { rounded: roundedSideBar } = Configuration.theme.general.sidebar;
  const { backgroundColor } = Configuration.theme.general.sidebar;

  const sideBarClassName = classNames(
    "overflow-hidden d-flex flex-column justify-content-between shadow",
    backgroundColor,
    {
      "m-2 border rounded-lg": roundedSideBar,
    }
  );

  const getIcon = (icon) => {
    let iconCode = `&#x${icon};`;
    return `<i class="material-icons">${iconCode}</i>`;
  };

  const renderItem = (item, idx, dropdown = false) => (
    <SideBarItem key={idx} item={item} dropdown={dropdown} />
  );

  const renderPrivacyPolicy = () => {

    if (role) return "/my-user/privacy-policy";
    else return "/my-admin/privacy-policy";
  }

  const renderDropdowns = (item, idx) => {
    function CustomToggle({ children, eventKey }) {
      const decoratedOnClick = useAccordionButton(eventKey, () => {
        let newCurrentEventKey = eventKey;
        if (currentNavItemSelected === eventKey) newCurrentEventKey = "-1";
        dispatch(setCurrentNavItemMenuSelectedAction(newCurrentEventKey));
      });

      const headerButtonClassNames = classNames(
        "w-100 pb-2 pt-3 px-2 text-start text-secondary shadow-none align-items-center d-flex sidebar-nav-item",
        {
          "justify-content-between": isMobileView || expanded,
          "justify-content-center": !expanded,
          "sidebar-nav-item-selected rounded-0 rounded-top":
            currentNavItemSelected === eventKey,
          rounded: currentNavItemSelected !== eventKey,
        }
      );

      return (
        <Button
          variant="link"
          className={headerButtonClassNames}
          onClick={decoratedOnClick}
        >
          {children}
        </Button>
      );
    }

    const chevronClassName = classNames({
      rotate180: currentNavItemSelected === `${idx}`,
    });

    return (
      <Card className="border-0" key={idx}>
        <Card.Header className="p-0 border-0 bg-transparent">
          <CustomToggle eventKey={`${idx}`}>
            <div
              className={`d-flex ${expanded || isMobileView
                ? "justify-content-start"
                : "justify-content-center"
                } align-items-center w-100`}
            >
              {Configuration.theme.general.sidebar.showIcons && (
                <div dangerouslySetInnerHTML={{ __html: getIcon(item.icon) }} />
              )}
              {expanded && <span className="ms-3 mb-1">{item.title}</span>}
            </div>
            {expanded && (
              <BsChevronCompactDown size={20} className={chevronClassName} />
            )}
          </CustomToggle>
        </Card.Header>
        <Accordion.Collapse eventKey={`${idx}`}>
          <Card.Body className="px-1 border">
            {item.children.map((subitem, subIdx) =>
              renderItem(subitem, subIdx, true)
            )}
          </Card.Body>
        </Accordion.Collapse>
      </Card>
    );
  };

  return (
    <>
      {/* Content */}
      <div
        style={{
          height: roundedSideBar ? "calc(100vh - 1rem)" : "100vh",
          position: "sticky",
          top: 0,
        }}
        className={sideBarClassName}
      >
        <div>
          {/* Brand */}
          <div className="h-auto">
            <SideBarBrand role={role}/>
          </div>

          {/* Items */}
          <div className="d-flex flex-column overflow-hidden">
            <div
              className="overflow-auto w-100 p-2"
              style={{
                height: `calc(100vh - ${85 + 50}px`,
              }}
            >
              {role ? (
                NavItemsUser().map((section, idx) => {
                  const sectionClassName = classNames("w-100", {
                    "mb-3": expanded || isMobileView,
                  });

                  return (
                    <div key={section.id || idx} className={sectionClassName}>
                      {Configuration.theme.general.sidebar.groupSideBarItems &&
                        (expanded || isMobileView) && (
                          <small
                            className="mb-2 px-2 d-flex w-100 mb-1 p-1 border-bottom border-top"
                            style={{ color: "#999" }}
                          >
                            {section.title}
                          </small>
                        )}
                      <div className="px-2">
                        <Accordion activeKey={currentNavItemSelected} key={idx}>
                          {section.items.map((item, itemIdx) =>
                            item.children
                              ? renderDropdowns(item, itemIdx)
                              : renderItem(item, itemIdx)
                          )}
                        </Accordion>
                      </div>
                    </div>
                  );
                })
              ) : (
                NavItemsAdmin().map((section, idx) => {
                  const sectionClassName = classNames("w-100", {
                    "mb-3": expanded || isMobileView,
                  });

                  return (
                    <div key={section.id || idx} className={sectionClassName}>
                      {Configuration.theme.general.sidebar.groupSideBarItems &&
                        (expanded || isMobileView) && (
                          <small
                            className="mb-2 px-2 d-flex w-100 mb-1 p-1 border-bottom border-top"
                            style={{ color: "#999" }}
                          >
                            {section.title}
                          </small>
                        )}
                      <div className="px-2">
                        <Accordion activeKey={currentNavItemSelected} key={idx}>
                          {section.items.map((item, itemIdx) =>
                            item.children
                              ? renderDropdowns(item, itemIdx)
                              : renderItem(item, itemIdx)
                          )}
                        </Accordion>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>

        {/* Policy privacy */}
        {expanded && (
          <div
            className="d-flex justify-content-center align-items-center w-100 flex-column"
            style={{
              height: 50,
            }}
          >
            <Button variant="link" as={Link} to={renderPrivacyPolicy}>
              {ViewStrings.SideBarPrivacyPolicy}
            </Button>
          </div>
        )}
      </div>
    </>
  );
};

export default SideBar;
