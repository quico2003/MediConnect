import { useContext, useEffect, useState } from "react";
import ModalLayout from "../../../Layouts/ModalLayout/ModalLayout";
import { StringsContext } from "../../../Context/strings.context";
import { Container } from "react-bootstrap";

const ViewAppointmentModal = ({ onClose, data, show }) => {

    const { strings } = useContext(StringsContext);
    const ViewStrings = strings.User.Schedule.event;

    const hideModal = () => onClose();

    return (
        <ModalLayout
            closeButton={true}
            show={show}
            onHide={hideModal}
            size="md"
            header={true}
            title={ViewStrings.title}
        >

            <Container className="d-flex flex-column gap-4">
                    <div className="d-flex gap-2"><span className="fw-bold">{ViewStrings.client}</span><span>{data?.client}</span></div>
                    <div className="d-flex gap-2"><span className="fw-bold">{ViewStrings.client_phone}</span><span>{data?.doctor}</span></div>
                    <div className="d-flex gap-2"><span className="fw-bold">{ViewStrings.client_phone}</span><span>{data?.created_at}</span></div>
                    <div className="d-flex gap-2"><span className="fw-bold">{ViewStrings.client_phone}</span><span>{data?.date}</span></div>
                    <div className="d-flex gap-2"><span className="fw-bold">{ViewStrings.client_email}</span><span>{data?.reason}</span></div>
                    <div className="d-flex gap-2"><span className="fw-bold">{ViewStrings.client_email}</span><span>{data?.final_description}</span></div>
            </Container>
        </ModalLayout>
    )
}
export default ViewAppointmentModal;