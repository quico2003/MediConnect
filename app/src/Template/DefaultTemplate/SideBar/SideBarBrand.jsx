import { useSelector } from "react-redux";
import ToggleSideBarButton from "../../../Components/ToggleSideBarButton/ToggleSideBarButton";
import { Configuration } from "../../../Config/app.config";

import logoMaximisedAdmin from "../../../Assets/images/Logo/logo-maximised-admin.png";
import logoMaximisedUser from "../../../Assets/images/Logo/logo-maximised-user.png";
import logoMinimised from "../../../Assets/images/Logo/logo-minimised.png";

const SideBarBrand = ({ role }) => {
  const { isMobileView } = useSelector((state) => state.Config);

  const { sidebar } = useSelector((state) => state.Config);
  const expanded = sidebar === "maximised";

  const selectedLanguage = localStorage.getItem("ADMIN_LANGUAGE_SELECTED");

  // Determinar qué imagen utilizar según el idioma seleccionado
  let logoMaximised = role ? logoMaximisedUser : logoMaximisedAdmin;

  return (
    <div
      className="d-flex flex-column justify-content-center align-items-center p-3"
      style={{ height: 100 }}
    >
      <div
        // style={{ height: 100 }}
        className={`d-flex align-items-center w-100 ${isMobileView ? "justify-content-center" : "justify-content-center"
          }`}
      >
        {Configuration.theme.general.sidebar.showLogo ? (
          <img
            className="img-fluid"
            title={`${Configuration.APP_NAME} logo`}
            alt="MediConnect main logo"
            src={isMobileView || expanded ? logoMaximised : logoMinimised}
            style={{
              width: isMobileView || expanded ? "240px" : "35px",
              height: "auto",
              maxWidth:
                isMobileView || expanded
                  ? Configuration.theme.general.sidebar.maximisedWidth
                  : "120px",
              maxHeight: 250,
              transition: ".3s",
            }}
          />
        ) : (
          Configuration.theme.general.sidebar.showTitle &&
          (expanded || isMobileView ? (
            <h1 className="my-5">{Configuration.APP_NAME}</h1>
          ) : (
            <h1 className="my-0">{Configuration.APP_NAME.slice(0, 1)}</h1>
          ))
        )}

        {isMobileView && <ToggleSideBarButton />}

      </div>
    </div>
  );
};

export default SideBarBrand;
