import { Col, Row } from "react-bootstrap";
import GeneralLayout from "../../../../Layouts/GeneralLayout/GeneralLayout";
import WorkDay from "./WorkDay/WorkDay";
import TypeRenderCount from "./TypeRenderCount/TypeRenderCount";

const HomeUser = () => {


    return (
        <GeneralLayout>
            <Row>
                <Col>
                    <TypeRenderCount title="Clients" type="clients"/>
                </Col>
                <Col>
                    <TypeRenderCount title="Num. Appointments" type="appointments"/>
                </Col>
            </Row>
            <WorkDay />
        </GeneralLayout>
    )
}
export default HomeUser;