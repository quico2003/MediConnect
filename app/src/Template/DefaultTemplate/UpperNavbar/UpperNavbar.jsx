import LanguageSelector from "../../../Components/LanguageSelector/LanguageSelector";
import ToggleSideBarButton from "../../../Components/ToggleSideBarButton/ToggleSideBarButton";
import { Configuration } from "../../../Config/app.config";
import ProfileDropdown from "./Components/ProfileDropdown";

const { height } = Configuration.theme.general.navbar;

const UpperNavbar = () => {
  return (
    <div className="bg-transparent">
      {/* Content */}
      <div
        style={{ height }}
        className="p-5 d-flex justify-content-between align-items-center w-100"
      >
        {/* Right side */}
        <div className="d-flex align-items-center">
          <ToggleSideBarButton />
        </div>

        {/* Left side */}
        <div className="d-flex align-items-center">
          <LanguageSelector showFlag={true} />

          {/* Profile */}
          <ProfileDropdown />
        </div>
      </div>
    </div>
  );
};

export default UpperNavbar;
