import { useContext, useEffect } from "react";
import { useSelector } from "react-redux";
import { Configuration } from "../../Config/app.config";
import { EndpointsAdmin, EndpointsUser, getEndpoint } from "../../Constants/endpoints.contants";
import { StorageKeys } from "../../Constants/storekeys.constants";
import { UserContext } from "../../Context/user.context";
import useRequest from "../../Hooks/useRequest";
import useSideBar from "../../Hooks/useSideBar";
import FooterNavbar from "./FooterNavbar/FooterNavbar";
import SideBar from "./SideBar/SideBar";
import UpperNavbar from "./UpperNavbar/UpperNavbar";
import { toggleAdminAvatar, toggleAdminEmail, toggleAdminName } from "../../Redux/actions/AdminInfoActions";
import { useDispatch } from "react-redux";
import { toggleUserAvatar, toggleUserEmail, toggleUserName } from "../../Redux/actions/UserInfoAction";

const FOOTER_HEIGHT = Configuration.theme.general.footer.height;
const NAVBAR_HEIGHT = Configuration.theme.general.navbar.height;

const DefaultTemplate = ({ children, role }) => {
  const request = useRequest();
  const dispatch = useDispatch();
  const { menuOpen } = useSideBar();

  const { setUser } = useContext(UserContext);

  const { isMobileView } = useSelector((state) => state.Config);

  const { sidebar } = useSelector((state) => state.Config);
  const expanded = sidebar === "maximised";

  const { backgroundColor } = Configuration.theme.general.app;

  useEffect(() => {
    if (role) checkUser();
    else checkAdmin();
  }, [role]);

  const checkAdmin = () => {
    request("get", getEndpoint(EndpointsAdmin.Auth.checkAdmin)).then((res) => {
      const { token, email, avatar, name } = res.data;
      dispatch(toggleAdminName(name));
      dispatch(toggleAdminEmail(email));
      dispatch(toggleAdminAvatar(avatar));
      localStorage.setItem(StorageKeys.EMAIL, email);
      localStorage.setItem(StorageKeys.TOKEN, token);
    });
  };
  const checkUser = () => {
    request("get", getEndpoint(EndpointsUser.Auth.checkUser)).then((res) => {
      const { token, email, avatar, firstName, lastName } = res.data;
      dispatch(toggleUserName({ firstName, lastName }));
      dispatch(toggleUserEmail(email));
      dispatch(toggleUserAvatar(avatar));
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
        <SideBar role={role} />
      </div>
      <div
        className={`w-100 ${backgroundColor}`}
        style={{
          left: calculateContentWidth(),
          overflowY: "auto",
        }}
      >
        <UpperNavbar role={role} />
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


    </div>
  );
};

export default DefaultTemplate;
