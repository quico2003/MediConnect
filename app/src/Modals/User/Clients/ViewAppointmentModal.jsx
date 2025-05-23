import { useContext } from "react";
import ModalLayout from "../../../Layouts/ModalLayout/ModalLayout";
import { StringsContext } from "../../../Context/strings.context";
import { Container } from "react-bootstrap";

const ViewAppointmentModal = ({ onClose, data, show }) => {

    const { strings } = useContext(StringsContext);
    const ViewStrings = strings.User.historial.view;

    const hideModal = () => onClose();

    return (
        <ModalLayout
            closeButton={true}
            show={show}
            onHide={hideModal}
            size="lg"
            header={true}
            title={ViewStrings.title}
        >
            <Container className="d-flex flex-column gap-4">
                    <div className="d-flex gap-2"><span className="fw-bold">{ViewStrings.client}</span><span>{data?.client}</span></div>
                    <div className="d-flex gap-2"><span className="fw-bold">{ViewStrings.doctor}</span><span>{data?.doctor}</span></div>
                    <div className="d-flex gap-2"><span className="fw-bold">{ViewStrings.date_create}</span><span>{data?.created_at}</span></div>
                    <div className="d-flex gap-2"><span className="fw-bold">{ViewStrings.date}</span><span>{data?.date}</span></div>
                    <div className="d-flex gap-2"><span className="fw-bold">{ViewStrings.reason}</span><span className="text-break">{data?.reason}</span></div>
                <div className="d-flex gap-2"><span className="fw-bold">{ViewStrings.conclusion}</span><span className="text-break"><div dangerouslySetInnerHTML={{ __html: data?.final_description }}></div></span></div>
            </Container>
        </ModalLayout>
    )
}
export default ViewAppointmentModal;