import { useContext, useEffect, useState } from "react";
import ModalLayout from "../../../Layouts/ModalLayout/ModalLayout";
import { StringsContext } from "../../../Context/strings.context";
import { Button, Container } from "react-bootstrap";
import moment from "moment";
import useRequest from "../../../Hooks/useRequest";
import { EndpointsUser, getEndpoint } from "../../../Constants/endpoints.contants";
import useNotification from "../../../Hooks/useNotification";

const MenuAppointmentsModal = ({ show, onClose, data, openDelete, openEdit, openComplete }) => {

    const { strings } = useContext(StringsContext);
    const ViewStrings = strings.User.Schedule.event;

    const request = useRequest();

    const { showNotification: errorNotification } = useNotification();

    const [dataFetch, setDataFetch] = useState({});

    useEffect(() => {
        if (show) fetchData();
    }, [show])

    const fetchData = async () => {
        request("get", getEndpoint(EndpointsUser.Appointments.getInfoAppointmentClient), { id: data.id })
            .then((res) => {
                setDataFetch(res.data);
            }).catch((err) => errorNotification(err.message))
    }

    const hideModal = () => onClose();

    const eventDelete = () => {
        openDelete(data);
        onClose();
    }

    const eventEdit = () => {
        openEdit(data);
        onClose();
    }

    const eventComplete = () => {
        openComplete(data);
        onClose();
    }

    return (
        <ModalLayout
            closeButton={true}
            show={show}
            onHide={hideModal}
            size="md"
            header={true}
            title={ViewStrings.title}
            footer={
                <div className="w-100">
                    <div className="d-flex justify-content-end">
                        <Button className="m-2" variant="danger" onClick={eventDelete}>{ViewStrings.button1}</Button>
                        <Button className="m-2" onClick={eventEdit}>{ViewStrings.button2}</Button>
                        <Button className="m-2" onClick={eventComplete}>{ViewStrings.button3}</Button>
                    </div>
                </div>
            }
        >
            <Container className="d-flex flex-column gap-4">
                <div className="d-flex justify-content-start gap-5">
                    <div className="d-flex gap-2"><span className="fw-bold">{ViewStrings.client}</span><span>{dataFetch?.client}</span></div>
                    <div className="d-flex gap-2"><span className="fw-bold">{ViewStrings.client_phone}</span><span>{dataFetch?.client_phone}</span></div>
                </div>
                <div className="d-flex flex-column gap-3">
                    <div className="d-flex gap-2"><span className="fw-bold">{ViewStrings.client_email}</span><span>{dataFetch?.client_email}</span></div>
                    <div className="d-flex gap-2"><span className="fw-bold">{ViewStrings.reason}</span><span className="text-break">{dataFetch?.reason}</span></div>
                    <div className="d-flex gap-2"><span className="fw-bold">{ViewStrings.start}</span><span>{moment(data?.start).format('DD-MM-YYYY HH:mm')}</span></div>
                    <div className="d-flex gap-2"><span className="fw-bold">{ViewStrings.end}</span><span>{moment(data?.end).format('DD-MM-YYYY HH:mm')}</span></div>
                </div>
            </Container>
        </ModalLayout>
    )
}
export default MenuAppointmentsModal;