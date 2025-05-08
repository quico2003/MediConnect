import { Col, Row } from "react-bootstrap";
import GeneralLayout from "../../../../Layouts/GeneralLayout/GeneralLayout";
import WorkDay from "./WorkDay/WorkDay";
import TypeRenderCount from "./TypeRenderCount/TypeRenderCount";
import ChartAppointment from "./ChartAppointment/chartAppointment";
import { useContext, useState } from "react";
import { StringsContext } from "../../../../Context/strings.context";
import ChartProducts from "./ChartProducts/ChartProducts";

const HomeUser = () => {

    const { strings } = useContext(StringsContext);
    const ViewStrings = strings.User.dashboard;

    const [needUpdate, setNeedUpdate] = useState(false);

    return (
        <GeneralLayout title={ViewStrings.title}>
            <Row>
                <Col>
                    <TypeRenderCount title={ViewStrings.clients} type="clients" />
                </Col>
                <Col>
                    <TypeRenderCount title={ViewStrings.appointments} type="appointments" />
                </Col>
            </Row>
            <Row>
                <h5 className="text-secondary px-2">{ViewStrings.workDay}</h5>
                <WorkDay />
            </Row>
            <Row>
                <Col>
                    <h5 className="text-secondary px-2">{ViewStrings.status}</h5>
                    <ChartAppointment needUpdate={needUpdate} setNeedUpdate={setNeedUpdate}/>
                </Col>
            </Row>
            <Row>
                <Col>
                    <h5 className="text-secondary px-2">{ViewStrings.top}</h5>
                    <ChartProducts needUpdate={needUpdate} setNeedUpdate={setNeedUpdate}/>
                </Col>
            </Row>
        </GeneralLayout>
    )
}
export default HomeUser;