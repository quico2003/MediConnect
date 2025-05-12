import React, { useContext, useRef } from "react";
import { Container, Card, Button, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { StringsContext } from "../../../../Context/strings.context";


const Reviews = () => {

    const { strings } = useContext(StringsContext);
    
    const ViewStrings = strings.LandingPage.testimonials;
    const scrollRef = useRef(null);

    const scroll = (direction) => {
        const container = scrollRef.current;
        const scrollAmount = 100;

        if (direction === "left") {
            container.scrollBy({ left: -scrollAmount, behavior: "smooth" });
        } else {
            container.scrollBy({ left: scrollAmount, behavior: "smooth" });
        }
    };

    return (
        <Container id="reviews" className=" py-3 my-4 scroll-section" style={{ background: "linear-gradient(180deg,rgba(192, 215, 252, 1) 0%, rgba(255, 255, 255, 1) 41%);" }}>
            <h3 className="py-3 text-center">{ViewStrings.title}</h3>
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
                    {ViewStrings.testimonialsArray.map((t, index) => (
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
