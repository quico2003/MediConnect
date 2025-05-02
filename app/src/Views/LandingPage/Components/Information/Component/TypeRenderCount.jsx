import { useEffect, useState } from "react";
import useNotification from "../../../../../Hooks/useNotification";
import useRequest from "../../../../../Hooks/useRequest";
import { EndpointsLandingPage, getEndpoint } from "../../../../../Constants/endpoints.contants";
import clientIcon from "../../../../../Assets/images/LandingPageImages/clientIcon.svg"
import shopIcon from "../../../../../Assets/images/LandingPageImages/shopIcon.svg"
import doctorIcon from "../../../../../Assets/images/LandingPageImages/doctorIcon.svg"

const TypeRenderCount = ({ title, type, description }) => {

    const request = useRequest();

    const [data, setData] = useState();

    const { showNotification: errorNotification } = useNotification();

    useEffect(() => {
        fetchData();
    }, [])

    const fetchData = async () => {
        await request("get", getEndpoint(EndpointsLandingPage.LandingPage.typeCount), { type })
            .then((res) => {
                setData(res.count);
            })
            .catch((err) => errorNotification(err.message));
    }

    const renderIcon = () => {
        switch (type) {
            case "users":
                return <img src={doctorIcon} alt="" srcset="" />
                break;
            case "clients":
                return <img src={clientIcon} alt="" srcset="" />
                break;
            case "products":
                return <img src={shopIcon} alt="" srcset="" />
                break;
            default:
                break;
        }
    }

    return (
        <div className="text-center d-flex flex-column gap-2">
            <div>{renderIcon()}</div>
            <div>
                <h4>{title}</h4>
            </div>
            <div>
                {description}
            </div>
            <div>
                <h5>{data}</h5>
            </div>
            

        </div>
    )

}
export default TypeRenderCount;