
import { useContext, useState } from "react";
import { StringsContext } from "../../Context/strings.context";
import HomeLanding from "./Components/HomeLanding/HomeLanding";
import Footer from "./Footer/Footer";
import NavBar from "./Navbar/NavBar";
import FeaturesLanding from "./Components/FeaturesLanding/FeaturesLanding";
import ProductsLanding from "./Components/ProductsLanding/ProductsLanding";
import Information from "./Components/Information/Information";
import Reviews from "./Components/Reviews/Reviews";

const LandingPage = () => {

    const { strings } = useContext(StringsContext);
    const ViewStrings = strings.LandingPage.home;


    return (
        <div className="scroll-section" style={{ height: "100svh", overflowY: "auto", textAlign: "center"}}>
            <NavBar />
            <HomeLanding text={ViewStrings.text} />
            <div className="container">

                <FeaturesLanding />
                <hr />
                <Reviews />

            </div>
            <ProductsLanding />
            <div className="container">
                <Information />

            </div>
            <Footer />

        </div>
    )

}
export default LandingPage;