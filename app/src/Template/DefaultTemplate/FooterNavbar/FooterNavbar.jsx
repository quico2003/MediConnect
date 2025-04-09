import moment from "moment";
import { Configuration } from "../../../Config/app.config";

const { height } = Configuration.theme.general.footer;
const { APP_VERSION } = Configuration;

const FooterNavbar = () => {
  return (
    <div
      className="bg-transparent px-md-4 d-flex justify-content-center justify-content-md-between align-items-center"
      style={{ height }}
    >
      <p className="mb-0 text-center text-muted">v{APP_VERSION}</p>
      <p className="mb-0 text-center text-muted">
        Copyright© {moment().format("YYYY")} {Configuration.APP_NAME}
      </p>
    </div>
  );
};

export default FooterNavbar;