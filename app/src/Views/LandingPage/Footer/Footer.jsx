import { Container, Row, Col } from "react-bootstrap";
import { FaFacebookF, FaTwitter, FaLinkedin, FaEnvelope } from "react-icons/fa";

const Footer = () => {
    return (
        <>
            <footer className="bg-light border-top mt-5 pt-4 pb-3">
                <Container>
                    <Row >
                        <Col md={4} className="mb-4">
                            <h5 className="text-primary fw-bold">MediConnect</h5>
                            <p className="text-muted">
                                Conectando pacientes, médicos y clínicas en un solo lugar. Simplifica la atención médica digital.
                            </p>
                        </Col>

                        <Col >
                            <h6 className="fw-semibold">Enlaces rápidos</h6>
                            <ul className="list-unstyled">
                                <li><a href="/about" className="text-muted text-decoration-none">Sobre nosotros</a></li>
                                <li><a href="/services" className="text-muted text-decoration-none">Servicios</a></li>
                                <li><a href="/contact" className="text-muted text-decoration-none">Contacto</a></li>
                                <li><a href="/privacy" className="text-muted text-decoration-none">Política de privacidad</a></li>
                            </ul>
                        </Col>

                        <Col >
                            <h6 className="fw-semibold">Contáctanos</h6>
                            <p className="text-muted mb-1"><FaEnvelope className="me-2" /> contacto@mediconnect.com</p>
                            <div className="d-flex gap-3 mt-2">
                                <a href="https://facebook.com" className="text-primary"><FaFacebookF /></a>
                                <a href="https://twitter.com" className="text-info"><FaTwitter /></a>
                                <a href="https://linkedin.com" className="text-primary"><FaLinkedin /></a>
                            </div>
                        </Col>
                    </Row>

                    <hr />
                    <Row>
                        <Col>
                            <small className="text-muted">&copy; {new Date().getFullYear()} MediConnect. Todos los derechos reservados.</small>
                        </Col>
                    </Row>
                </Container>
            </footer>
        </>
    )
}
export default Footer;