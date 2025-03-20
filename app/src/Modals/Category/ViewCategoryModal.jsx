import { Button, Form, FormGroup, Modal } from "react-bootstrap";
import ModalLayout from "../../Layouts/ModalLayout/ModalLayout";
import useRequest from "../../Hooks/useRequest";
import useNotification from "../../Hooks/useNotification";
import { useEffect, useState } from "react";
import { Endpoints, getEndpoint } from "../../Constants/endpoints.contants";


const ViewCategoryModal = ({ show, onClose, data }) => {
    
    const [dataCategory, setDataCategory] = useState([]);
    
    const request = useRequest();

    const { showNotification: errorNotification } = useNotification();
    const { showNotification: successNotification } = useNotification("success");

    useEffect(() => {
        if (show) {          
            fetchDataCategory();
        }
    }, [show]);
    
    const fetchDataCategory = async () => {
        request("get", getEndpoint(Endpoints.Categories.get), {guid: data})
        .then((res) => {
            setDataCategory(res.data);
        })
        .catch((err) => errorNotification("Error en la respuesta del view."));
    }

    const exitClick = () => {
        onClose(true);
    };

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
                    <Modal.Title className="ms-2">Category Info</Modal.Title>
                    
                </div>
            }
            footer={
                <div className="d-flex justify-content-end gap-2">
                    <Button onClick={exitClick} variant="danger" size="lm">
                        Exit
                    </Button>
                </div>
            }>

            <div className="mb-1">
                <Modal.Body>
                    <div className="category-info">
                        <div className="d-flex flex-column gap-2 mb-2">
                            <span className="fw-bold">Name:</span><span>{dataCategory?.name}</span>
                        </div>
                        <div className="d-flex flex-column gap-2 mb-2">
                            <span className="fw-bold">Desscription:</span><span>{dataCategory?.description}</span>
                        </div>
                        <div className="d-flex flex-column gap-2 mb-2">
                            <span className="fw-bold">Created:</span><span>{dataCategory?.created_at}</span>
                        </div>
                        <div className="d-flex flex-column gap-2 mb-2">
                            <span className="fw-bold">Updated:</span><span>{dataCategory?.updated_at}</span>
                        </div>
                    </div>
                </Modal.Body>
            </div>
        </ModalLayout>
    );

}
export default ViewCategoryModal;