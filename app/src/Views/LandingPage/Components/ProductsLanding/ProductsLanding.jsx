import { useContext, useEffect, useState } from "react";
import useRequest from "../../../../Hooks/useRequest";
import { EndpointsLandingPage, getEndpoint } from "../../../../Constants/endpoints.contants";
import useNotification from "../../../../Hooks/useNotification";
import CardProduct from "./CardProduct";
import { Button, Col, Container, Row } from "react-bootstrap";
import { StringsContext } from "../../../../Context/strings.context";

const ProductsLanding = () => {

    const { strings } = useContext(StringsContext);
    const ViewStrings = strings.LandingPage.products;

    const { showNotification: errorNotification } = useNotification();

    const request = useRequest();

    const [data, setData] = useState([]);

    const [showMoreItems, setShowNumberItems] = useState(false);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        await request("get", getEndpoint(EndpointsLandingPage.LandingPage.getAll))
            .then((res) => setData(res.productsTop))
            .catch((err) => errorNotification(err.message))
    }

    const handleViewMore = () => {
        setShowNumberItems(!showMoreItems);
    }


    return (
        <div id="products" className="scroll-section py-5 my-5 ">
            <div className="text-center mb-4">
                <h2>{ViewStrings.title}</h2>
            </div>
            <Container>
                <div className="d-flex justify-content-end mb-4">

                    <Button onClick={handleViewMore} >
                        {showMoreItems ? ViewStrings.less : ViewStrings.more}
                    </Button>
                </div>
                {data.length > 0 ? (
                    <>
                        <Row className="g-4">
                            {data.slice(0, showMoreItems ? 20 : 6).map((product, index) => (
                                <Col key={index} xs={12} sm={6} md={4}>
                                    <div className="my-tooltip">
                                        <CardProduct product={product} />
                                    </div>
                                </Col>
                            ))}
                        </Row>
                    </>
                ) : (
                    <p className="text-center">{ViewStrings.dontProducts}</p>
                )}
            </Container>
        </div >
    )

}
export default ProductsLanding;