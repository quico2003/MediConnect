import { useContext, useEffect, useState } from "react";
import logo from "../../../Assets/images/Logo/logo-maximised-user.png"
import LanguageSelector from "../../../Components/LanguageSelector/LanguageSelector";
import { StringsContext } from "../../../Context/strings.context";

const NavBar = () => {

    const { strings } = useContext(StringsContext);
    const ViewStrings = strings.LandingPage.natbar;

    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(prev => !prev);
    }

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 992) {
                setIsOpen(false);
            }
        };

        window.addEventListener("resize", handleResize);

        // Cleanup
        return () => window.removeEventListener("resize", handleResize);
    }, []);



    return (
        <nav style={{ height: "80px", zIndex: 999 }} className="navbar navbar-expand-lg navbar-light bg-white border-bottom shadow py-0 px-5 w-100 position-fixed">

            <span className="navbar-brand">
                <img src={logo} alt="logo" width="200px" />
            </span>

            {/*boton amburgesa*/}
            <button
                className="navbar-toggler"
                type="button"
                onClick={toggleMenu}
                aria-controls="navbarSupportedContent"
                aria-expanded={isOpen}
                aria-label="Toggle navigation"
            >
                <span className="navbar-toggler-icon"></span>
            </button>

            {/*collapse*/}
            <div
                className={`collapse navbar-collapse ${isOpen ? "show mobile-menu" : ""}`}
                id="navbarSupportedContent"
            >
                <ul className={`d-flex ${isOpen ? "flex-column mt-2 align-items-center" : "flex-row justify-content-around "} navbar-nav ms-auto gap-2 gap-lg-4 align-items-lg-center`}>
                    <li className="nav-item">
                        <a href="#home" className="btn1 nav-link text-reset">{ViewStrings.home}</a>
                    </li>
                    <li className="nav-item">
                        <a href="#feature" className="btn1 nav-link text-reset">{ViewStrings.feature}</a>
                    </li>
                    <li className="nav-item">
                        <a href="#reviews" className="btn1 nav-link text-reset">{ViewStrings.reviews}</a>
                    </li>
                    <li className="nav-item">
                        <a href="#products" className="btn1 nav-link text-reset">{ViewStrings.products}</a>
                    </li>
                    <li className="nav-item">
                        <a href="#information" className="btn1 nav-link text-reset">{ViewStrings.information}</a>
                    </li>
                    <li className="nav-item">
                        <a href="/my-user/login" className="btn btn-outline-primary rounded-pill">{ViewStrings.logIn}</a>
                    </li>
                    <li className="nav-item">
                        <LanguageSelector showFlag={true} />
                    </li>
                </ul>
            </div>


        </nav>
    )
}
export default NavBar;