import { useContext } from "react";
import { StringsContext } from "../../../../Context/strings.context";

const HomeLanding = ({ text }) => {
    const { strings } = useContext(StringsContext);
    const ViewStrings = strings.LandingPage.home;
    return (
        <div id="home" className="container1 p-5 d-flex flex-column align-items-center justify-content-center text-center ">
            <div className="container-glass ">
                <div style={{ maxWidth: '800px' }} className="mb-3">
                    <h1>{ViewStrings.title}</h1>
                    <h3>{ViewStrings.subtitle}</h3>
                </div>
                <div>
                    <p style={{ maxWidth: '800px' }}>{text}</p>
                </div>
            </div>

        </div>
    );
};

export default HomeLanding;