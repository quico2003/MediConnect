import { Button, Modal } from "react-bootstrap";
import ModalLayout from "../../Layouts/ModalLayout/ModalLayout";
import { useEffect, useState } from "react";
import useRequest from "../../Hooks/useRequest";
import useNotification from "../../Hooks/useNotification";
import { Endpoints, getEndpoint } from "../../Constants/endpoints.contants";
import Slider from "react-slick";

const ViewProductModal = ({ show, onClose, data }) => {

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

    const settingsSlicke = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1

    };

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
                <Modal.Title className="ms-2">Product Info</Modal.Title>
            }
            footer={
                <div>
                    <Button onClick={exitClick} variant="danger">
                        Exit
                    </Button>
                </div>
            }
        >

            <Modal.Body>

                <div className="ms-2">
                    <div className="d-flex flex-column gap-2 mb-2 ">
                        <span className="fw-bold">Name:</span><span>{dataProduct?.name}</span>
                    </div>
                    <div className="d-flex flex-column gap-2 mb-2 ">
                        <span className="fw-bold">Price:</span><span>{dataProduct?.price}</span>
                    </div>
                    <div className="d-flex flex-column gap-2 mb-2 ">
                        <span className="fw-bold">Brand:</span><span>{dataProduct?.brand}</span>
                    </div>
                    <div className="d-flex flex-column gap-2 mb-2 ">
                        <span className="fw-bold">Description:</span><span>{dataProduct?.description}</span>
                    </div>
                    <div className="d-flex flex-column gap-2 mb-2 ">
                        <span className="fw-bold">Created_at:</span><span>{dataProduct?.created_at}</span>
                    </div>
                    <div className="d-flex flex-column gap-2 mb-2 ">
                        <span className="fw-bold">Update_at:</span><span>{dataProduct?.updated_at}</span>
                    </div>
                    <div className="d-flex flex-column gap-2 mb-2 ">
                        <span className="fw-bold">Category:</span><span>{dataProduct?.categoryName}</span>
                    </div>
                    <div className="d-flex flex-column gap-2 mb-2 ">
                        <span className="fw-bold">Creator:</span><span>{dataProduct?.creator}</span>
                    </div>

                    <div className="d-flex overflow-auto ">
                        {renderImages()}
                    </div>
                </div>





            </Modal.Body>

        </ModalLayout>
    )


}
export default ViewProductModal;