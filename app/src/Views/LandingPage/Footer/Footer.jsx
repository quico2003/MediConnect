import { useContext } from "react";
import { Container } from "react-bootstrap";
import { StringsContext } from "../../../Context/strings.context";

const Footer = () => {

    const { strings } = useContext(StringsContext);
    const ViewStrings = strings.LandingPage.natbar;

    return (
        <footer className="footerClass d-flex justify-content-center align-items-center">
            <Container className="d-flex flex-column">

                <ul className="d-flex flex-row justify-content-center navbar-nav gap-3 mt-4">
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

                </ul>

                <hr />
                <div className="d-flex flex-row justify-content-center mb-4">© 2025 MediConnect

                </div>
            </Container>


        </footer>
    )
}
export default Footer;