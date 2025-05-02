import { useEffect, useState } from "react";
import useRequest from "../../../../Hooks/useRequest";
import { EndpointsLandingPage, getEndpoint } from "../../../../Constants/endpoints.contants";
import useNotification from "../../../../Hooks/useNotification";
import CardProduct from "./CardProduct";
import { Col, Container, Row } from "react-bootstrap";

const ProductsLanding = () => {

    const { showNotification: errorNotification } = useNotification();

    const request = useRequest();

    const [data, setData] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        await request("get", getEndpoint(EndpointsLandingPage.LandingPage.getAll))
            .then((res) => setData(res.productsTop))
            .catch((err) => errorNotification(err.message))
    }

    return (
        <div id="products" className="py-5 my-5 sectionProducts">
            <div className="text-center mb-4">
                <h2>Un poco sobre nuestros productos en stock</h2>
            </div>
            <Container>
                {data.length > 0 ? (
                    <>
                        <Row className="g-4">
                            {data.slice(0, 6).map((product, index) => (
                                <Col key={index} xs={12} sm={6} md={4}>
                                    <div className="my-tooltip">
                                        <CardProduct product={product} />
                                    </div>
                                </Col>
                            ))}
                        </Row>
                    </>
                ) : (
                    <p className="text-center">No hay productos disponibles en este momento.</p>
                )}
            </Container>
        </div>
    )

}
export default ProductsLanding;