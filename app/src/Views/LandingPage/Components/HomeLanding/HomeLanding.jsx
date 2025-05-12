import { useContext } from "react";
import { StringsContext } from "../../../../Context/strings.context";

const HomeLanding = ({ text }) => {
    const { strings } = useContext(StringsContext);
    const ViewStrings = strings.LandingPage.home;
    return (
        <div id="home" className="container1 p-1 d-flex flex-column align-items-center justify-content-center text-center my-5">
            <div className="container-glass " style={{marginTop: '80px'}}>
                <div style={{ maxWidth: '800px'}} className="mb-3">
                    <h2>{ViewStrings.title}</h2>
                    <h>{ViewStrings.subtitle}</h>
                </div>
                <div>
                    <p style={{ maxWidth: '800px' }}>{text}</p>
                </div>
            </div>
        </div>
    );
};

export default HomeLanding;