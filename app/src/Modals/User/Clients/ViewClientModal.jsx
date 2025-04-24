import { useContext, useEffect, useState } from "react";
import { StringsContext } from "../../../Context/strings.context";
import useRequest from "../../../Hooks/useRequest";
import useNotification from "../../../Hooks/useNotification";
import ModalLayout from "../../../Layouts/ModalLayout/ModalLayout";
import { Button, Modal } from "react-bootstrap";
import { EndpointsUser, getEndpoint } from "../../../Constants/endpoints.contants";

const ViewClientModal = ({ show, onClose, data }) => {

    const { strings } = useContext(StringsContext);
    const ViewStrings = strings.User.view;

    const [client, setClient] = useState({});

    const request = useRequest();

    const { showNotification: errorNotification } = useNotification();
    const { showNotification: successNotification } = useNotification("success");

    useEffect(() => {
        if (show) fetchData();
    }, [show])

    const fetchData = () => {
        request("get", getEndpoint(EndpointsUser.Clients.get), { guid: data })
            .then((res) => {
                setClient(res.data);
            })
            .catch(() => errorNotification(ViewStrings.errorMesage))
    }

    const hideModal = () => {
        onClose(true);
    }

    return (
        <ModalLayout
            show={show}
            onHide={hideModal}
            size="md"
            header={true}
            customHeader={
                <div>
                    <Modal.Title className="ms-2">{ViewStrings.title}</Modal.Title>
                </div>
            }
            footer={
                <div>
                    <Button onClick={hideModal} size="md">
                        {ViewStrings.close}
                    </Button>
                </div>
            }
        >
            <div className="mb-1">
                <Modal.Body>
                    <div className="d-flex flex-column align-items-center gap-3">
                        <div className="d-flex align-items-center flex-column gap-2 mb-2">
                            <span className="fw-bold">{ViewStrings.firstName}</span><span>{client?.first_name}</span>
                        </div>
                        <div className="d-flex align-items-center flex-column gap-2 mb-2">
                            <span className="fw-bold">{ViewStrings.lastName}</span><span>{client?.last_name}</span>
                        </div>
                        <div className="d-flex align-items-center flex-column gap-2 mb-2">
                            <span className="fw-bold">{ViewStrings.email}</span><span>{client?.email}</span>
                        </div>
                        <div className="d-flex align-items-center flex-column gap-2 mb-2">
                            <span className="fw-bold">{ViewStrings.phone}</span><span>{client?.phone}</span>
                        </div>
                        <span>Doctor:</span>
                        <di className="d-flex justify-content-center gap-5 border w-100">
                            <div className="d-flex align-items-center flex-column gap-2 mb-2">
                                <span className="fw-bold">{ViewStrings.firstName}</span><span>{client?.creator_first_name}</span>
                            </div>
                            <div className="d-flex align-items-center flex-column gap-2 mb-2">
                                <span className="fw-bold">{ViewStrings.lastName}</span><span>{client?.creator_last_name}</span>
                            </div>
                        </di>
                    </div>
                </Modal.Body>
            </div>
        </ModalLayout>
    )
}
export default ViewClientModal;