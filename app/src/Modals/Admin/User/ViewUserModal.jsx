import { useContext, useEffect, useState } from "react";
import ModalLayout from "../../../Layouts/ModalLayout/ModalLayout";
import useRequest from "../../../Hooks/useRequest";
import { Button, Modal } from "react-bootstrap";
import { EndpointsAdmin, getEndpoint } from "../../../Constants/endpoints.contants";
import useNotification from "../../../Hooks/useNotification";
import { StringsContext } from "../../../Context/strings.context";

const ViewUserModal = ({ show, onClose, data }) => {

    const { strings } = useContext(StringsContext);
    const ViewStrings = strings.user.view;

    const [dataUser, setDataUser] = useState([]);

    const request = useRequest();

    const { showNotification: errorNotification } = useNotification();

    useEffect(() => {
        if (show) {
            fetchDataUser();
        }
    }, [show])

    const fetchDataUser = async () => {
        request("get", getEndpoint(EndpointsAdmin.Users.get), { guid: data })
            .then((res) => {
                setDataUser(res.data);
            })
            .catch((err) => errorNotification("Error en la respuesta del view."));
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
                <div className="d-flex align-items-center justify-content-between w-100">
                    <Modal.Title className="ms-2">{ViewStrings.title}</Modal.Title>
                </div>
            }
            footer={
                <div className="d-flex justify-content-end gap-2">
                    <Button onClick={hideModal} size="md">
                        {ViewStrings.close}
                    </Button>
                </div>
            }
        >
            <div className="mb-1">
                <Modal.Body>
                    <div className="d-flex flex-column align-items-center gap-4">
                        <div className="d-flex align-items-center gap-2 mb-2">
                            <img src={dataUser?.avatar} className="border border-2 border-dark rounded-circle" width={150} height={150} />
                        </div>
                        <div className="d-flex flex-column gap-3">
                            <div className="d-flex align-items-center gap-2">
                                <span className="fw-bold">{ViewStrings.email}</span><span>{dataUser?.email}</span>
                            </div>
                            <div className="d-flex align-items-center gap-2">
                                <span className="fw-bold">{ViewStrings.firstName}</span><span>{dataUser?.firstName}</span>
                            </div>
                            <div className="d-flex align-items-center gap-2">
                                <span className="fw-bold">{ViewStrings.lastName}</span><span>{dataUser?.lastName}</span>
                            </div>
                            <div className="d-flex align-items-center gap-2">
                                <span className="fw-bold">{ViewStrings.specialty}</span><span>{dataUser?.specialty}</span>
                            </div>
                            <div className="d-flex align-items-center gap-2">
                                <span className="fw-bold">{ViewStrings.creator}</span><span>{dataUser?.creator}</span>
                            </div>
                            <div className="d-flex align-items-center gap-2">
                                <span className="fw-bold">{ViewStrings.created_at}</span><span>{dataUser?.created_at}</span>
                            </div>
                            <div className="d-flex align-items-center gap-2">
                                <span className="fw-bold">{ViewStrings.updated_at}</span><span>{dataUser?.updated_at}</span>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
            </div>
        </ModalLayout>
    )
}
export default ViewUserModal;