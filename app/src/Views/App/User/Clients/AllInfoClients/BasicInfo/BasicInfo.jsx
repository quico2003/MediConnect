import { useContext, useEffect, useState } from "react";
import { StringsContext } from "../../../../../../Context/strings.context";
import useRequest from "../../../../../../Hooks/useRequest";
import { EndpointsUser, getEndpoint } from "../../../../../../Constants/endpoints.contants";
import useNotification from "../../../../../../Hooks/useNotification";

const BasicInfo = ({ data, active }) => {

    const { strings } = useContext(StringsContext);
    const ViewStrings = strings.User.view;

    const { showNotification: errorNotification } = useNotification();

    const request = useRequest();

    const [client, setClient] = useState({});

    useEffect(() => {
        if (active === "basicInfo") {
            fetchData();
        }
    }, [active]);

    const fetchData = async () => {
        return await request("get", getEndpoint(EndpointsUser.Clients.get), { guid: data })
            .then((res) => {
                setClient(res.data);
            })
            .catch((err) => errorNotification(err.message))
    }

    return (
        <div className="d-flex flex-column bg-white rounded-bottom-4">
            <div className="m-4 d-flex flex-column gap-3">
                <div className="d-flex align-items-center gap-2 mb-2">
                    <span className="fw-bold">{ViewStrings.firstName}</span><span>{client?.first_name}</span>
                </div>
                <div className="d-flex align-items-center  gap-2 mb-2">
                    <span className="fw-bold">{ViewStrings.lastName}</span><span>{client?.last_name}</span>
                </div>
                <div className="d-flex align-items-center  gap-2 mb-2">
                    <span className="fw-bold">{ViewStrings.email}</span><span>{client?.email}</span>
                </div>
                <div className="d-flex gap-2 mb-2">
                    <span className="fw-bold">{ViewStrings.phone}</span><span>{client?.phone}</span>
                </div>
                <hr />
                <div className="d-flex flex-column gap-4 mb-2 text-break">
                    <h4 className="fw-bold">{ViewStrings.anotations}</h4><div dangerouslySetInnerHTML={{ __html: client?.anotations }}></div>
                </div>
            </div>
        </div>
    )
}
export default BasicInfo;