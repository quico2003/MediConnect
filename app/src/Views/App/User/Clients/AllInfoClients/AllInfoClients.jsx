import { useContext, useState } from "react";
import { StringsContext } from "../../../../../Context/strings.context";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import GeneralLayout from "../../../../../Layouts/GeneralLayout/GeneralLayout";
import { Tab, Tabs } from "react-bootstrap";
import BasicInfo from "./BasicInfo/BasicInfo";
import AppointmentHistorial from "./AppointmentHistorial/AppointmentHistorial";
import RecommendedProducts from "./RecommendedProducts/RecommendedProducts";

const AllInfoClients = () => {

    const { strings } = useContext(StringsContext);
    const ViewStrings = strings.User.historial;

    const [key, setKey] = useState('basicInfo');

    const { client_guid } = useParams();

    return (

        <GeneralLayout showBackButton title={ViewStrings.title} >
            <Tabs
                id="controlled-tab-example"
                activeKey={key}
                onSelect={(k) => setKey(k)}
            >
                <Tab eventKey="basicInfo" title={ViewStrings.event1}>
                    <BasicInfo data={client_guid} active={key} />
                </Tab>
                <Tab eventKey="recipeHistorial" title={ViewStrings.event2}>
                    <AppointmentHistorial data={client_guid} active={key} />
                </Tab>
                <Tab eventKey="recommendedProducts" title={ViewStrings.event3}>
                    <RecommendedProducts data={client_guid} active={key} />
                </Tab>
            </Tabs>
        </GeneralLayout>
    );
}
export default AllInfoClients;