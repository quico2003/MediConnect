import { useContext, useEffect } from "react";
import { Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { Configuration } from "../../Config/app.config";
import { Endpoints, getEndpoint } from "../../Constants/endpoints.contants";
import { StorageKeys } from "../../Constants/storekeys.constants";
import { UserContext } from "../../Context/user.context";
import useRequest from "../../Hooks/useRequest";
import useSideBar from "../../Hooks/useSideBar";
import FooterNavbar from "./FooterNavbar/FooterNavbar";
import SideBar from "./SideBar/SideBar";
import UpperNavbar from "./UpperNavbar/UpperNavbar";

const FOOTER_HEIGHT = Configuration.theme.general.footer.height;
const NAVBAR_HEIGHT = Configuration.theme.general.navbar.height;

const DefaultTemplate = ({ children, ...props }) => {
  const request = useRequest();
  const { menuOpen } = useSideBar();

  const { setUser } = useContext(UserContext);

  const { isMobileView } = useSelector((state) => state.Config);

  const { sidebar } = useSelector((state) => state.Config);
  const expanded = sidebar === "maximised";

  const { backgroundColor } = Configuration.theme.general.app;

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = () => {
    request("get", getEndpoint(Endpoints.Auth.checkUser)).then((res) => {
      const { token, email, fullName } = res.data;
      setUser({
        email,
        fullName,
      });
      localStorage.setItem(StorageKeys.EMAIL, email);
      localStorage.setItem(StorageKeys.TOKEN, token);
    });
  };

  const calculateSideBarWidth = () => {
    if (isMobileView) return menuOpen ? 0 : "-100vw";
    return 0;
  };

  const calculateContentWidth = () => {
    const { maximisedWidth, minimisedWidth } =
      Configuration.theme.general.sidebar;
    return isMobileView ? "100vw" : expanded ? maximisedWidth : minimisedWidth;
  };

  return (
    <div className="d-flex position-relative">
      <div
        className={backgroundColor}
        style={{
          transition: ".3s",
          zIndex: 99,
          position: isMobileView ? "absolute" : "sticky",
          width: calculateContentWidth(),
          left: calculateSideBarWidth(),
        }}
      >
        <SideBar />
      </div>
      <div
        className={`w-100 ${backgroundColor}`}
        style={{
          left: calculateContentWidth(),
          overflowY: "auto",
        }}
      >
        <UpperNavbar />
        <div
          className=""
          style={{ height: `calc(100vh - ${FOOTER_HEIGHT}px)` }}
        >
          <div
            className="p-md-3 p-1"
            style={{
              minHeight: `calc(100vh - ${NAVBAR_HEIGHT + FOOTER_HEIGHT}px)`,
            }}
          >
            {children}
          </div>
          <FooterNavbar />
        </div>
      </div>

      <Button
        variant="link"
        as={Link}
        to="/Y2hldHV1MTY="
        style={{ position: "fixed", top: -48, left: -16 }}
      >
        Easter Egg!
      </Button>
    </div>
  );
};

export default DefaultTemplate;
