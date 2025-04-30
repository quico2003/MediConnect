
import { useContext } from "react";
import { StringsContext } from "../../Context/strings.context";
import HomeLanding from "./Components/HomeLanding/HomeLanding";
import Footer from "./Footer/Footer";
import NavBar from "./Navbar/NavBar";
import FeaturesLanding from "./Components/FeaturesLanding/FeaturesLanding";
import ProductsLanding from "./Components/ProductsLanding/ProductsLanding";

const LandingPage = () => {

    const { strings } = useContext(StringsContext);
    const ViewStrings = strings.LandingPage.home;

    return (
        <div id="landingBody" style={{ height: "100svh", overflowY: "auto" }}>

            <NavBar />
            <HomeLanding title={ViewStrings.title} text={ViewStrings.text}/>
            <FeaturesLanding />
            <ProductsLanding />
            <Footer />
        </div>
    )

}
export default LandingPage;