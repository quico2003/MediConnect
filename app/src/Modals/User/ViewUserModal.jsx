import { useEffect, useState } from "react";
import ModalLayout from "../../Layouts/ModalLayout/ModalLayout";
import useRequest from "../../Hooks/useRequest";
import { Button, Modal } from "react-bootstrap";
import { Endpoints, getEndpoint } from "../../Constants/endpoints.contants";
import useNotification from "../../Hooks/useNotification";

const ViewUserModal = ({ show, onClose, data }) => {

    const [dataUser, setDataUser] = useState([]);

    const request = useRequest();

    const { showNotification: errorNotification } = useNotification();

    useEffect(() => {

        if (show) {
            fetchDataUser();
        }
    }, [show])

    const fetchDataUser = async () => {
        request("get", getEndpoint(Endpoints.Users.get), { guid: data })
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
            size="lm"
            header={true}
            customHeader={
                <div className="d-flex align-items-center justify-content-between w-100">
                    <Modal.Title className="ms-2">User Info</Modal.Title>
                </div>
            }
            footer={
                <div className="d-flex justify-content-end gap-2">
                    <Button onClick={hideModal} variant="danger" size="lm">
                        Exit
                    </Button>
                </div>
            }
        >

            <div className="mb-1">
                <Modal.Body>
                    <div className="category-info">
                        <div className="d-flex flex-column gap-2 mb-2">
                            <span className="fw-bold">Email:</span><span>{dataUser?.email}</span>
                        </div>
                        <div className="d-flex flex-column gap-2 mb-2">
                            <span className="fw-bold">First Name:</span><span>{dataUser?.firstName}</span>
                        </div>
                        <div className="d-flex flex-column gap-2 mb-2">
                            <span className="fw-bold">Second Name:</span><span>{dataUser?.secondName}</span>
                        </div>
                        <div className="d-flex flex-column gap-2 mb-2">
                            <span className="fw-bold">Specialty:</span><span>{dataUser?.specialty}</span>
                        </div>
                        <div className="d-flex flex-column gap-2 mb-2">
                            <span className="fw-bold">Creator:</span><span>{dataUser?.creator}</span>
                        </div>
                        <div className="d-flex flex-column gap-2 mb-2">
                            <span className="fw-bold">Created at:</span><span>{dataUser?.created_at}</span>
                        </div>
                        <div className="d-flex flex-column gap-2 mb-2">
                            <span className="fw-bold">Updated at:</span><span>{dataUser?.updated_at}</span>
                        </div>
                        <div className="d-flex flex-column gap-2 mb-2">
                            <span>Avatar</span>
                            <img src={dataUser?.avatar} className="border border-5 border-dark rounded-circle"></img>
                        </div>

                    </div>

                </Modal.Body>

            </div>

        </ModalLayout>
    )
}
export default ViewUserModal;