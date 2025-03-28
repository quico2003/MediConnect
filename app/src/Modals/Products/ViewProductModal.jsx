import { Button, Modal } from "react-bootstrap";
import ModalLayout from "../../Layouts/ModalLayout/ModalLayout";
import { useContext, useEffect, useState } from "react";
import useRequest from "../../Hooks/useRequest";
import useNotification from "../../Hooks/useNotification";
import { Endpoints, getEndpoint } from "../../Constants/endpoints.contants";
import Slider from "react-slick";
import { StringsContext } from "../../Context/strings.context";

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
        request("get", getEndpoint(Endpoints.Products.get), { guid: data })
            .then((res) => {
                setDataProduct(res.data);
            })
            .catch((err) => errorNotification("No se ha encontrado el producto"));
    }

    const exitClick = () => {
        onClose(true);
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
            customHeader={
                <Modal.Title className="ms-2">{ViewStrings.title}</Modal.Title>
            }
            footer={
                <div>
                    <Button onClick={exitClick} variant="danger">
                        {ViewStrings.exit}
                    </Button>
                </div>
            }
        >

            <Modal.Body>

                <div className="ms-2">
                    <div className="d-flex flex-column gap-2 mb-2 ">
                        <span className="fw-bold">{ViewStrings.name}:</span><span>{dataProduct?.name}</span>
                    </div>
                    <div className="d-flex flex-column gap-2 mb-2 ">
                        <span className="fw-bold">{ViewStrings.price}:</span><span>{dataProduct?.price}</span>
                    </div>
                    <div className="d-flex flex-column gap-2 mb-2 ">
                        <span className="fw-bold">{ViewStrings.brand}:</span><span>{dataProduct?.brand}</span>
                    </div>
                    <div className="d-flex flex-column gap-2 mb-2 ">
                        <span className="fw-bold">{ViewStrings.description}:</span><span>{dataProduct?.description}</span>
                    </div>
                    <div className="d-flex flex-column gap-2 mb-2 ">
                        <span className="fw-bold">{ViewStrings.createdAt}:</span><span>{dataProduct?.created_at}</span>
                    </div>
                    <div className="d-flex flex-column gap-2 mb-2 ">
                        <span className="fw-bold">{ViewStrings.updatedAt}:</span><span>{dataProduct?.updated_at}</span>
                    </div>
                    <div className="d-flex flex-column gap-2 mb-2 ">
                        <span className="fw-bold">{ViewStrings.category}:</span><span>{dataProduct?.categoryName}</span>
                    </div>
                    <div className="d-flex flex-column gap-2 mb-2 ">
                        <span className="fw-bold">{ViewStrings.creator}:</span><span>{dataProduct?.creator}</span>
                    </div>
                    <span className="fw-bold">{ViewStrings.images}:</span>
                    <div className="d-flex overflow-auto ">
                        {renderImages()}
                    </div>
                </div>

            </Modal.Body>

        </ModalLayout>
    )


}
export default ViewProductModal;