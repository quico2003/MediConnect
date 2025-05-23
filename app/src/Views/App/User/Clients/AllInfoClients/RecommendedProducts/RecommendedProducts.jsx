import { useContext, useEffect, useState } from "react";
import { StringsContext } from "../../../../../../Context/strings.context";
import useRequest from "../../../../../../Hooks/useRequest";
import { EndpointsUser, getEndpoint } from "../../../../../../Constants/endpoints.contants";
import useNotification from "../../../../../../Hooks/useNotification";
import { Col, Container, Row } from "react-bootstrap";
import CardProduct from "../../../../../LandingPage/Components/ProductsLanding/CardProduct";

const RecommendedProducts = ({ data, active }) => {

    const { strings } = useContext(StringsContext);
    const ViewStrings = strings.LandingPage.products;

    const request = useRequest();

    const [dataFetch, setDataFetch] = useState([]);

    const { showNotification: errorNotification } = useNotification();

    useEffect(() => {
        if (active === "recommendedProducts") {
            fetchData();
        }
    }, [active])

    const fetchData = async () => {
        return await request("get", getEndpoint(EndpointsUser.Clients.getProductsRecomendate), { guid: data })
            .then((res) => setDataFetch(res.products))
            .catch((err) => errorNotification(err.message));
    }

    return (
        <div id="products" className="bg-white p-4 scroll-section">
            
                {dataFetch.length > 0 ? (
                    <>
                        <Row className="g-4">
                            {dataFetch.slice(0,  20).map((product, index) => (
                                <Col key={index} xs={12} sm={6} md={4} lg={4}>
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
    
        </div >
    )
}
export default RecommendedProducts;