import { Button, Modal } from "react-bootstrap";
import ModalLayout from "../../../Layouts/ModalLayout/ModalLayout";
import useRequest from "../../../Hooks/useRequest";
import useNotification from "../../../Hooks/useNotification";
import { useContext, useEffect, useState } from "react";
import { EndpointsAdmin, getEndpoint } from "../../../Constants/endpoints.contants";
import { StringsContext } from "../../../Context/strings.context";
import { dataFormater } from "../../../Config/GeneralFunctions";

const ViewCategoryModal = ({ show, onClose, data }) => {

    const { strings } = useContext(StringsContext);
    const ViewStrings = strings.Categories.view;

    const [dataCategory, setDataCategory] = useState({});

    const request = useRequest();

    const { showNotification: errorNotification } = useNotification();

    useEffect(() => {
        if (show) fetchDataCategory();
    }, [show]);

    const fetchDataCategory = async () => {
        request("get", getEndpoint(EndpointsAdmin.Categories.get), { guid: data })
            .then((res) => {
                setDataCategory(res.data);
            })
            .catch((err) => errorNotification(ViewStrings.errorNotification));
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
                    <Button onClick={hideModal} variant="danger" size="md">
                        {ViewStrings.close}
                    </Button>
                </div>
            }>

            <div className="mb-1">
                <Modal.Body>
                    <div className="category-info">
                        <div className="d-flex flex-column gap-2 mb-2 text-break">
                            <span className="fw-bold">{ViewStrings.name}:</span><span>{dataCategory?.name}</span>
                        </div>
                        <div className="d-flex flex-column gap-2 mb-2 text-break">
                            <span className="fw-bold">{ViewStrings.description}:</span><span>{dataCategory?.description}</span>
                        </div>
                        <div className="d-flex flex-column gap-2 mb-2">
                            <span className="fw-bold">{ViewStrings.created_at}:</span><span>{dataFormater(dataCategory?.created_at)}</span>
                        </div>
                        <div className="d-flex flex-column gap-2 mb-2">
                            <span className="fw-bold">{ViewStrings.updated_at}:</span><span>{dataFormater(dataCategory?.updated_at)}</span>
                        </div>
                    </div>
                </Modal.Body>
            </div>
        </ModalLayout>
    );

}
export default ViewCategoryModal;