import { Col, Row } from "react-bootstrap";
import startIcon from "../../../../Assets/images/LandingPageImages/startIcon.svg";

const Reviews = () => {


    return (


        <div className=" d-flex flex-column justify-content-center align-items-center">

            <Row>
                <Col>
                    <div className="d-flex justify-content-center m-2">
                        <h3>🗣️ Lo que dicen nuestros pacientes</h3>
                    </div>
                </Col>
            </Row>
            <Row>
                <Col>
                    <div className="d-flex justify-content-center m-2">
                        <p>Experiencias reales de personas que confiaron en Mediconect para mejorar su salud auditiva.</p>
                    </div>
                </Col>
            </Row>
            <Row >
                <Col xs={12} md={4}>
                    <div className="d-flex flex-column align-items-center gap-2" style={{ maxWidth: "350px", width: "80%" }}>
                        <div className="d-flex">
                            <img src={startIcon} width="15px" />
                            <img src={startIcon} width="15px" />
                            <img src={startIcon} width="15px" />
                            <img src={startIcon} width="15px" />
                            <img src={startIcon} width="15px" />
                        </div>
                        <div>
                            <p>
                                “Excelente atención y diagnóstico. Me impresionó la tecnología
                                que usan y la paciencia con la que explican todo. 100% recomendados.”
                            </p>
                        </div>
                        <div>
                            <p><strong>— Laura Paredes</strong></p>
                        </div>
                    </div>
                </Col>
                <Col xs={12}  md={4}>
                    <div className="d-flex flex-column align-items-center gap-2" style={{ maxWidth: "350px", width: "80%" }}>
                        <div className="d-flex">
                            <img src={startIcon} width="15px" />
                            <img src={startIcon} width="15px" />
                            <img src={startIcon} width="15px" />
                            <img src={startIcon} width="15px" />
                            <img src={startIcon} width="15px" />
                        </div>
                        <div>
                            <p>
                                "Desde que llegué a Mediconect me sentí escuchado (literalmente y emocionalmente).
                                El equipo es muy profesional y amable. Me ayudaron a elegir el audífono perfecto para mí."
                            </p>
                        </div>
                        <div>
                            <p><strong>— Carlos Jiménez</strong></p>
                        </div>
                    </div>
                </Col>
                <Col xs={12}  md={4}>
                    <div className="d-flex flex-column align-items-center gap-2" style={{ maxWidth: "350px", width: "80%" }}>
                        <div className="d-flex">
                            <img src={startIcon} width="15px" />
                            <img src={startIcon} width="15px" />
                            <img src={startIcon} width="15px" />
                            <img src={startIcon} width="15px" />
                            <img src={startIcon} width="15px" />
                        </div>
                        <div>
                            <p>
                                “Mi mamá necesitaba ayuda auditiva y en Mediconect nos trataron
                                como familia. Ahora ella escucha mejor y está mucho más feliz.”
                            </p>
                        </div>
                        <div>
                            <p><strong>— Andrés Ríos</strong></p>
                        </div>
                    </div>
                </Col>
            </Row>
        </div>
    )
}
export default Reviews;