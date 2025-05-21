import { useContext, useState } from "react";
import { Tab, Tabs } from "react-bootstrap";
import GeneralLayout from "../../../../../Layouts/GeneralLayout/GeneralLayout";
import BasicInfo from "./BasicInfo/BasicInfo";
import RecipeHistorial from "./RecipeHistorial/RecipeHistorial";
import RecommendedProducts from "./RecommendedProducts/RecommendedProducts";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { StringsContext } from "../../../../../Context/strings.context";

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
                className="mb-3"
            >
                <Tab eventKey="basicInfo" title={ViewStrings.event1}>
                    <BasicInfo data={client_guid}/>
                </Tab>
                <Tab eventKey="recipeHistorial" title={ViewStrings.event2}>
                    <RecipeHistorial data={client_guid}/>
                </Tab>
                <Tab eventKey="recommendedProducts" title={ViewStrings.event3}>
                    <RecommendedProducts data={client_guid}/>
                </Tab>
            </Tabs>
        </GeneralLayout>
    );
}
export default AllInfoClients;