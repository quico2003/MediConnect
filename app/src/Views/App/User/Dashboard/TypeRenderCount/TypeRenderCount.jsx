import { useEffect, useState } from "react";
import useRequest from "../../../../../Hooks/useRequest";
import { Colors } from "../../../../../Utils/Colors";
import { EndpointsAdmin, EndpointsUser, getEndpoint } from "../../../../../Constants/endpoints.contants";
import useNotification from "../../../../../Hooks/useNotification";

const TypeRenderCount = ({ type, title }) => {

    const request = useRequest();

    const [data, setData] = useState();

    const { showNotification: errorNotification } = useNotification();

    const switchColors = () => {
        switch (type) {
            case "clients":
                return Colors.yellow
            case "appointments":
                return Colors.orange
            default:
                return Colors.darkBlue
        }
    }

    useEffect(() => {
        fetchData();
    }, [])


    const fetchData = async () => {
        await request("get", getEndpoint(EndpointsUser.Dashboard.typeCount), { type })
            .then((res) => {
                setData(res.count);
            })
            .catch((err) => errorNotification(err.message))
    }


    return (
        <div className="card my-4">
            <div className="card-body d-flex flex-column align-items-center shadow rounded" style={{
                borderTop: `5px solid ${switchColors()}`
            }}>
                <h4 className="card-title">{title}</h4>
                <div className="display-6">
                    {data}
                </div>
            </div>
        </div>
    )
}
export default TypeRenderCount;