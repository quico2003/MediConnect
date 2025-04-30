import { useEffect, useState } from "react";
import useRequest from "../../../../Hooks/useRequest";
import { EndpointsLandingPage, getEndpoint } from "../../../../Constants/endpoints.contants";
import useNotification from "../../../../Hooks/useNotification";
import CardProduct from "./CardProduct";
import { Carousel } from "react-bootstrap";

const ProductsLanding = () => {

    const { showNotification: errorNotification } = useNotification();

    const request = useRequest();

    const [data, setData] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        await request("get", getEndpoint(EndpointsLandingPage.Products.getAll))
            .then((res) => setData(res.products))
            .catch((err) => errorNotification(err.message))
    }

    return (
        <div id="products" className="d-flex flex-column align-items-center justify-column-center m-5 gap-5">
            <div>
                <h2>Un poco sobre nuestros productos en stock</h2>
            </div>
            <div>
                <Carousel slide={false}>
                    {data.length > 0 ? (
                        data.map((product) => (
                            <Carousel.Item interval={3000}>
                                <CardProduct product={product} />
                            </Carousel.Item>
                        ))
                    ) : (
                        <p>No hay productos disponibles en este momento.</p>
                    )}
                </Carousel>
            </div>

        </div>
    )

}
export default ProductsLanding;