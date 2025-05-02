import { Col, Row } from "react-bootstrap";
import TypeRenderCount from "./Component/TypeRenderCount";

const Information = () => {

    return (
        <div className="d-flex gap-5 flex-column align-items-center justify-content-center my-5">
            <div>
                <h3>En activo...</h3>
            </div>
            <div className="d-flex justify-content-around w-75">
                <Row>
                    <Col>
                        <TypeRenderCount title="Clients" type="clients" description="dflkajñsdkfjñladsfsdfasdfasd" />
                    </Col>
                    <Col>
                        <TypeRenderCount title="Products" type="products" description="dflkajñsdkfjñladsfsdfasdfasd" />
                    </Col>
                    <Col>
                        <TypeRenderCount title="Medical Specialists" type="users" description="dflkajñsdkfjñladsfsdfasdfasd" />
                    </Col>
                </Row>
            </div>
        </div>
    )

}
export default Information;