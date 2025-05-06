import { Col, Row } from "react-bootstrap";
import TypeRenderCount from "./Component/TypeRenderCount";
import { useContext } from "react";
import { StringsContext } from "../../../../Context/strings.context";

const Information = () => {

    const { strings } = useContext(StringsContext);
    const ViewStrings = strings.LandingPage.information;

    return (
        <div id="information" className="scroll-section d-flex gap-5 flex-column align-items-center justify-content-center my-5">
            <div>
                <h3>{ViewStrings.title}</h3>
            </div>
            <div className="d-flex justify-content-around w-75">
                <Row>
                    <Col>
                        <TypeRenderCount title={ViewStrings.t1.title} type="clients" description={ViewStrings.t1.description} />
                    </Col>
                    <Col>
                        <TypeRenderCount title={ViewStrings.t2.title} type="products" description={ViewStrings.t2.description} />
                    </Col>
                    <Col>
                        <TypeRenderCount title={ViewStrings.t3.title} type="users" description={ViewStrings.t3.description} />
                    </Col>
                </Row>
            </div>
        </div>
    )

}
export default Information;