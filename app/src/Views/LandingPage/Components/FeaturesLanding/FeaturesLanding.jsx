import ImgFeatureLanding from "./ImgFeatureLanding";
import TextFeatureLanding from "./TextFeatureLanding";
import feature1 from "../../../../Assets/images/LandingPageImages/feature1.jpg"
import feature2 from "../../../../Assets/images/LandingPageImages/feature2.jpg"
import feature3 from "../../../../Assets/images/LandingPageImages/feature3.jpg"
import feature4 from "../../../../Assets/images/LandingPageImages/feature4.jpg"
import { Col, Row } from "react-bootstrap";
import { StringsContext } from "../../../../Context/strings.context";
import { useContext } from "react";

const FeaturesLanding = () => {

    const { strings } = useContext(StringsContext);
    const ViewStrings = strings.LandingPage.feature;

    return (
        <div id="feature" className="d-flex flex-column container gap-5 mt-5 py-3 scroll-section">
            <div className="d-flex flex-column align-items-center justify-content-center">
                <div className="mb-5">
                    <h2>{ViewStrings.title}</h2>
                </div>
                <div>
                    <p>{ViewStrings.subtitle}</p>
                </div>
            </div>
            <Row className="flex-column-reverse flex-lg-row">
                <Col md={12} lg={6}>
                    <ImgFeatureLanding ruteImg={feature1} />
                </Col>

                <Col md={12} lg={6}>
                    <TextFeatureLanding title={ViewStrings.feature1.title} description={ViewStrings.feature1.description} />
                </Col>
            </Row>
            <Row>
                <Col md={12} lg={6}>
                    <TextFeatureLanding title={ViewStrings.feature2.title} description={ViewStrings.feature2.description} />
                </Col>
                <Col md={12} lg={6}>
                    <ImgFeatureLanding ruteImg={feature2} />
                </Col>

            </Row>
            <Row className="flex-column-reverse flex-lg-row">
                <Col md={12} lg={6}>
                    <ImgFeatureLanding ruteImg={feature3} />
                </Col>

                <Col md={12} lg={6}>
                    <TextFeatureLanding title={ViewStrings.feature3.title} description={ViewStrings.feature3.description} />
                </Col>
            </Row>
            <Row>
                <Col md={12} lg={6}>
                    <TextFeatureLanding title={ViewStrings.feature2.title} description={ViewStrings.feature2.description} />
                </Col>
                <Col md={12} lg={6}>
                    <ImgFeatureLanding ruteImg={feature4} />
                </Col>

            </Row>
        </div>
    )

}

export default FeaturesLanding;