import { Button, Col, Modal, Row } from "react-bootstrap";
import ModalLayout from "../../../Layouts/ModalLayout/ModalLayout";
import { useContext, useEffect, useState } from "react";
import useRequest from "../../../Hooks/useRequest";
import useNotification from "../../../Hooks/useNotification";
import { EndpointsAdmin, getEndpoint } from "../../../Constants/endpoints.contants";
import { StringsContext } from "../../../Context/strings.context";
import { dataFormater } from "../../../Config/GeneralFunctions";

const ViewProductModal = ({ show, onClose, data }) => {

    const { strings } = useContext(StringsContext);
    const ViewStrings = strings.Products.view;

    const [dataProduct, setDataProduct] = useState();

    const request = useRequest();

    const { showNotification: errorNotification } = useNotification();


    useEffect(() => {
        if (show)
            fetchDataProduct();
    }, [show]);

    const fetchDataProduct = async () => {
        request("get", getEndpoint(EndpointsAdmin.Products.get), { guid: data })
            .then((res) => {
                setDataProduct(res.data);
            })
            .catch((err) => errorNotification("No se ha encontrado el producto"));
    }

    const hideModal = () => {
        onClose(true);
    }

    const renderImages = () => {

        return dataProduct?.imagesURL.map((image, index) => (
            <div className="p-2 bg-light me-3 rounded">
                <img height={200} src={image} alt={`product-image-${index}`} className="ms-2" />
            </div>
        ));

    };

    return (

        <ModalLayout
            show={show}
            onHide={hideModal}
            header={true}
            size="lg"
            customHeader={
                <Modal.Title className="ms-2">{ViewStrings.title}</Modal.Title>
            }
            footer={
                <div>
                    <Button onClick={hideModal} variant="danger">
                        {ViewStrings.close}
                    </Button>
                </div>
            }
        >
            <Modal.Body>
                <div className="d-flex flex-column gap-4">
                    <div className="d-flex gap-2">
                        <span className="fw-bold">{ViewStrings.name}:</span><span>{dataProduct?.name}</span>
                    </div>
                    <div className="d-flex gap-2">
                        <span className="fw-bold">{ViewStrings.price}:</span><span>{dataProduct?.price}€</span>
                    </div>
                    <div className="d-flex gap-2">
                        <span className="fw-bold">{ViewStrings.brand}:</span><span>{dataProduct?.brand}</span>
                    </div>
                    <div className="d-flex gap-2">
                        <span className="fw-bold">{ViewStrings.category}:</span><span>{dataProduct?.categoryName}</span>
                    </div>
                    <div className="d-flex gap-2">
                        <span className="fw-bold">{ViewStrings.createdAt}:</span><span>{dataFormater(dataProduct?.created_at)}</span>
                    </div>
                    <div className="d-flex gap-2">
                        <span className="fw-bold">{ViewStrings.updatedAt}:</span><span>{dataFormater(dataProduct?.updated_at)}</span>
                    </div>
                    <div className="d-flex flex-column gap-2 text-break">
                        <span className="fw-bold">{ViewStrings.description}:</span><div dangerouslySetInnerHTML={{ __html: dataProduct?.description }}></div>
                    </div>
                    <div className="d-flex flex-column">
                        <span className="fw-bold">{ViewStrings.images}:</span>
                        <div className="d-flex overflow-auto m-3">
                            {renderImages()}
                        </div>

                    </div>
                </div>
            </Modal.Body>
        </ModalLayout>
    )


}
export default ViewProductModal;