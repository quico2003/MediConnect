import React, { useRef } from "react";
import { Container, Card, Button, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const testimonials = [
    {
        text: "Nunca pensé que volvería a escuchar con tanta claridad. Los audífonos son discretos y cómodos. El equipo fue muy paciente y resolvió todas mis dudas.",
        name: "María González",
        image: "https://codingyaar.com/wp-content/uploads/square-headshot-1.png",
        role: "Paciente de 68 años",
    },
    {
        text: "El trato fue excelente desde la primera consulta. Me explicaron todo con detalle y se aseguraron de que eligiera el audífono adecuado para mi estilo de vida.",
        name: "Carlos Pérez",
        image: "https://codingyaar.com/wp-content/uploads/square-headshot-2.png",
        role: "Paciente reciente",
    },
    {
        text: "La atención personalizada marcó la diferencia. Los profesionales fueron muy atentos y el resultado ha superado mis expectativas.",
        name: "Laura Ramírez",
        image: "https://codingyaar.com/wp-content/uploads/square-headshot-3.png",
        role: "Paciente y usuaria de audífono",
    },
    {
        text: "Estoy muy agradecida por el seguimiento que me han dado. No solo vendieron un audífono, me acompañaron en todo el proceso de adaptación.",
        name: "Elena Martín",
        image: "https://codingyaar.com/wp-content/uploads/square-headshot-4.png",
        role: "Paciente desde 2023",
    },
    {
        text: "Gran profesionalismo. Mis nuevos audífonos son prácticamente invisibles y han mejorado mi calidad de vida enormemente.",
        name: "Jorge López",
        image: "https://codingyaar.com/wp-content/uploads/square-headshot-5.png",
        role: "Paciente activo",
    },
    {
        text: "Mi madre fue atendida con mucho respeto y cariño. Ahora puede participar en conversaciones sin problemas. ¡Gracias por devolverle esa alegría!",
        name: "Ana Torres",
        image: "https://codingyaar.com/wp-content/uploads/square-headshot-6.png",
        role: "Hija de paciente",
    },
];


const Reviews = () => {
    const scrollRef = useRef(null);

    const scroll = (direction) => {
        const container = scrollRef.current;
        const scrollAmount = 320;

        if (direction === "left") {
            container.scrollBy({ left: -scrollAmount, behavior: "smooth" });
        } else {
            container.scrollBy({ left: scrollAmount, behavior: "smooth" });
        }
    };

    return (
        <Container className=" py-3 my-4" style={{ background: "linear-gradient(180deg,rgba(192, 215, 252, 1) 0%, rgba(255, 255, 255, 1) 41%);" }}>
            <h3 className="py-3 text-center">Que dice la gente sobre nosotros?</h3>
            <div className="position-relative">
                <Button
                    variant="light"
                    onClick={() => scroll("left")}
                    className="position-absolute top-50 start-0 translate-middle-y z-1"
                >
                    ‹
                </Button>

                <div
                    className="d-flex overflow-hidden gap-5 px-5"
                    ref={scrollRef}
                    style={{ scrollBehavior: "smooth" }}
                >
                    {testimonials.map((t, index) => (
                        <Card key={index} style={{ minWidth: "350px" }}>
                            <Card.Body>
                                <Card.Text>"{t.text}"</Card.Text>
                                <div className="d-flex align-items-center pt-2">
                                    <img
                                        src={t.image}
                                        alt={t.name}
                                        width="50"
                                        height="50"
                                        className="rounded-circle me-3"
                                    />
                                    <div>
                                        <h5 className="fw-bold">{t.name}</h5>
                                        <span className="text-secondary">{t.role}</span>
                                    </div>
                                </div>
                            </Card.Body>
                        </Card>
                    ))}
                </div>

                <Button
                    variant="light"
                    onClick={() => scroll("right")}
                    className="position-absolute top-50 end-0 translate-middle-y z-1"
                >
                    ›
                </Button>
            </div>
        </Container>
    );
};

export default Reviews;
