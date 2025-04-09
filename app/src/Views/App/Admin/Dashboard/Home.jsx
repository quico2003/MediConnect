import { useContext, useState } from "react";
import ProductsWithoutCategory from "./getAll/ProductsWithoutCategory";
import CategoriesChart from "./categoriesChart/CategoriesChart";
import { Col, Row } from "react-bootstrap";
import GeneralLayout from "../../../../Layouts/GeneralLayout/GeneralLayout";
import { StringsContext } from "../../../../Context/strings.context";
import TypeRenderCount from "./typeRenderCount/TypeRenderCount";

const HomeAdmin = () => {

    const { strings } = useContext(StringsContext);
    const ViewStrings = strings.dashboard;

    const [needUpdate, setNeedUpdate] = useState(false);

    return (
        <GeneralLayout title={ViewStrings.title}>
            <Row>
                <Col>
                    <TypeRenderCount type="products" title="Products" />
                </Col>
                <Col>
                    <TypeRenderCount type="categories" title="Categories" />
                </Col>
                <Col>
                    <TypeRenderCount type="users" title="Medical Team" />
                </Col>
            
            </Row>
            <Row>
                <Col xs={12} xxl={6}>
                    <h5 className="text-secondary px-2">{ViewStrings.withoutCategories.title}</h5>
                    <ProductsWithoutCategory setNeedUpdate={setNeedUpdate} />
                </Col >
                <Col xs={12} xxl={6}>
                    <h5 className="text-secondary px-2">{ViewStrings.productByCategoties.title}</h5>
                    <CategoriesChart needUpdate={needUpdate} setNeedUpdate={setNeedUpdate} />
                </Col >
            </Row>

        </GeneralLayout>
    )


}

export default HomeAdmin;