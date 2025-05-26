import { useContext, useState } from "react";
import CategoriesChart from "./categoriesChart/CategoriesChart";
import { Col, Row } from "react-bootstrap";
import GeneralLayout from "../../../../Layouts/GeneralLayout/GeneralLayout";
import { StringsContext } from "../../../../Context/strings.context";
import TypeRenderCount from "./typeRenderCount/TypeRenderCount";
import UsersChart from "./usersChart/UsersChart";
import ClientsWithoutUsers from "./getAll/clients/ClientsWithoutUsers";
import ProductsWithoutCategory from "./getAll/products/ProductsWithoutCategory";

const HomeAdmin = () => {

    const { strings } = useContext(StringsContext);
    const ViewStrings = strings.dashboard;

    const [needUpdate, setNeedUpdate] = useState(false);

    return (
        <GeneralLayout title={ViewStrings.title}>
            <Row>
                <Col>
                    <TypeRenderCount type="products" title={ViewStrings.products} />
                </Col>
                <Col>
                    <TypeRenderCount type="categories" title={ViewStrings.categories} />
                </Col>
            </Row>
            <Row>
                <Col>
                    <TypeRenderCount type="users" title={ViewStrings.medicalTeam} />
                </Col>
                <Col>
                    <TypeRenderCount type="clients" title={ViewStrings.clients} />
                </Col>
            </Row>
            <Row>
                <Col xs={12} xxl={6}>
                    <h5 className="text-secondary px-2">{ViewStrings.withoutCategories.title}</h5>
                    <ProductsWithoutCategory setNeedUpdate={setNeedUpdate} />
                </Col >
                <Col xs={12} xxl={6}>
                    <h5 className="text-secondary px-2">{ViewStrings.withoutUsers.title}</h5>
                    <ClientsWithoutUsers setNeedUpdate={setNeedUpdate} />
                </Col >
            </Row>
            <Row>
                <Col xs={12} xxl={6}>
                    <h5 className="text-secondary px-2">{ViewStrings.productByCategoties.title}</h5>
                    <CategoriesChart needUpdate={needUpdate} setNeedUpdate={setNeedUpdate} />
                </Col >
                <Col xs={12} xxl={6}>
                    <h5 className="text-secondary px-2">{ViewStrings.clientsByUsers.title}</h5>
                    <UsersChart needUpdate={needUpdate} setNeedUpdate={setNeedUpdate} />
                </Col >
            </Row>
        </GeneralLayout>
    )
}

export default HomeAdmin;