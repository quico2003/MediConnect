import { useContext, useEffect, useState } from "react";
import { StringsContext } from "../../../Context/strings.context";
import useRequest from "../../../Hooks/useRequest";
import useNotification from "../../../Hooks/useNotification";
import ModalLayout from "../../../Layouts/ModalLayout/ModalLayout";
import { Button, Col, Modal, Row } from "react-bootstrap";
import { EndpointsUser, getEndpoint } from "../../../Constants/endpoints.contants";

const ViewClientModal = ({ show, onClose, data }) => {

    const { strings } = useContext(StringsContext);
    const ViewStrings = strings.User.view;

    const [client, setClient] = useState({});

    const request = useRequest();

    const { showNotification: errorNotification } = useNotification();

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
            size="lg"
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

                    <div className="d-flex flex-column gap-2">


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

                        <div className="d-flex flex-column gap-2 mb-2 text-break">
                            <span className="fw-bold">{ViewStrings.anotations}</span><div dangerouslySetInnerHTML={{ __html: client?.anotations }}></div>
                        </div>
                        <hr />
                        <div className="d-flex flex-column align-items-start gap-2">
                            <span className="fw-bold">{ViewStrings.doctorInfo}</span>
                            <div className="d-flex gap-4">
                                <div className="d-flex gap-2 mb-2">
                                    <span className="fw-bold">{ViewStrings.firstName}</span><span>{client?.creator_first_name}</span>
                                </div>
                                <div className="d-flex gap-2 mb-2">
                                    <span className="fw-bold">{ViewStrings.lastName}</span><span>{client?.creator_last_name}</span>
                                </div>
                            </div>
                        </div>

                    </div>
                </Modal.Body>
            </div>
        </ModalLayout>
    )
}
export default ViewClientModal;