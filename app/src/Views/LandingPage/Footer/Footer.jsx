import { Container, Row, Col } from "react-bootstrap";
import { FaFacebookF, FaTwitter, FaLinkedin, FaEnvelope } from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="bg-light">
            <Container className="d-flex flex-column">

                <ul className="d-flex flex-row justify-content-center navbar-nav gap-4 mt-4">
                    <li className="nav-item">
                        <a href="#home" className="btn1 nav-link text-reset">Home</a>
                    </li>
                    <li className="nav-item">
                        <a href="#feature" className="btn1 nav-link text-reset">Feature</a>
                    </li>
                    <li className="nav-item">
                        <a href="#products" className="btn1 nav-link text-reset">Products</a>
                    </li>

                </ul>

                <hr />
                <div className="d-flex flex-row justify-content-center mb-4">© 2025 Company, Inc

                </div>
            </Container>


        </footer>
    )
}
export default Footer;