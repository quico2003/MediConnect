import { useContext, useEffect, useState } from "react";
import { StringsContext } from "../../../Context/strings.context";
import ModalLayout from "../../../Layouts/ModalLayout/ModalLayout";
import useRequest from "../../../Hooks/useRequest";
import useNotification from "../../../Hooks/useNotification";
import { Button, FormLabel } from "react-bootstrap";
import FormControl from "../../../Components/Form/FormControl/FormControl";
import { EndpointsUser, getEndpoint } from "../../../Constants/endpoints.contants";
import RequiredField from "../../../Components/Form/RequiredField/RequiredField";
import DatePicker from "react-date-picker";
import moment from "moment";
import { dataFormater, validateData } from "../../../Config/GeneralFunctions";
import Select from "react-select";

const EditAppointmentsModal = ({ show, onClose, data, openMenuModal }) => {

    const { strings } = useContext(StringsContext);
    const ViewStrings = strings.User.Schedule.edit;

    const request = useRequest();

    const { showNotification: errorNotification } = useNotification();
    const { showNotification: successNotification } = useNotification("success");
    const { showNotification: warnNotification } = useNotification("warning");

    const [dateInitial, setDateInitial] = useState({});

    const [appointment, setAppointment] = useState({});
    const [initialAppointment, setInitialAppointment] = useState({});

    const [fecha, setFecha] = useState();
    const [selectedHours, setSelectedHours] = useState();
    const [chosenHours, setChosenHours] = useState([]);
    const [horas, setHoras] = useState([
        { value: "09", label: "9:00 to 10:00" },
        { value: "10", label: "10:00 to 11:00" },
        { value: "11", label: "11:00 to 12:00" },
        { value: "12", label: "12:00 to 13:00" },
        { value: "16", label: "16:00 to 17:00" },
        { value: "17", label: "17:00 to 18:00" },
        { value: "18", label: "18:00 to 19:00" },
        { value: "19", label: "19:00 to 20:00" }
    ]);

    useEffect(() => {
        if (show) fetchData();
    }, [show])

    const fetchData = async () => {
        request("get", getEndpoint(EndpointsUser.Appointments.get), { id: data.id })
            .then((res) => {
                setAppointment(res.data);
                setInitialAppointment(res.data);
                const fechaFormateada = moment(res.data.date, "DD-MM-YYYY").toDate();
                setFecha(fechaFormateada);
                setSelectedHours(res.data.hour);
                getAvaliableHours(fechaFormateada);
                const objectHour = horas.filter(hora => res.data.hour.includes(hora.value));
                setSelectedHours(objectHour);
                setDateInitial(res.data.date + " " + res.data.hour + ":00");
            })
            .catch((err) => warnNotification(err.message))
    }

    const handleSubmit = () => {
        let appointmentToSend = { ...appointment };

        if (appointment.date.length < 16) {
            appointmentToSend.date = dateInitial;
        }

        if (checkForm()) {
            request("post", getEndpoint(EndpointsUser.Appointments.update), appointmentToSend)
                .then(() => {
                    successNotification(ViewStrings.successMessage);
                    onClose(true);
                })
                .catch((err) => errorNotification(err.message));
        }
    }

    const handleInput = (e) => {
        const { id, value } = e.target;
        setAppointment({ ...appointment, [id]: value });
    }

    const handleSelectedDate = (obj) => {
        const date = moment(obj);
        const dateFormat = dataFormater(date, "DD-MM-YYYY");

        if (dateFormat !== "Invalid date") {
            setFecha(date);
            setSelectedHours(null);
            setAppointment({ ...appointment, "date": dateFormat, "hour": "" });
            getAvaliableHours(dateFormat);

        } else {
            errorNotification("You cannot enter an incorrect date.")
        }
    }

    const handleSelectHours = (obj) => {
        setSelectedHours(obj);
        const date = moment(fecha).add(obj.value, "hours");
        const dateFormat = dataFormater(date, "DD-MM-YYYY HH:mm");
        setAppointment({ ...appointment, "date": dateFormat, "hour": date });
    }

    const getAvaliableHours = (dateFormat) => {
        request("get", getEndpoint(EndpointsUser.Appointments.getChosenHours), { dateFormat })
            .then((res) => {
                const availableHours = horas.filter(hora => !res.data.includes(hora.value));
                setChosenHours(availableHours);
            })
            .catch((err) => errorNotification(err.message))
    }

    const hideModal = () => {
        onClose(true);
        openMenuModal();
    };

    const checkForm = () => {
        const { reason, date, hour } = appointment;
        return validateData([reason, date, hour]) && (
            appointment.reason !== initialAppointment.reason ||
            appointment.date !== initialAppointment.date
        );
    }

    return (
        <ModalLayout
            show={show}
            onHide={hideModal}
            size="lg"
            header={true}
            title={ViewStrings.title}
            footer={
                <div className="d-flex justify-content-end gap-2">
                    <Button variant="light" size="md" onClick={hideModal}>
                        {ViewStrings.bCancel}
                    </Button>
                    <Button disabled={!checkForm()} onClick={handleSubmit} variant="danger" size="md">
                        {ViewStrings.bUpdate}
                    </Button>
                </div>
            }
        >
            <FormControl
                required
                as="textarea"
                maxLength={250}
                controlId="reason"
                vertical={false}
                className="pb-2"
                title={ViewStrings.reason}
                placeholder={ViewStrings.pReason}
                onChange={handleInput}
                value={appointment.reason}
            />

            <div className="d-flex gap-2 align-items-center" style={{ position: 'relative' }}>
                <strong>{ViewStrings.date}<RequiredField /></strong>
                <div className="datepicker-wrapper">
                    <DatePicker
                        onChange={handleSelectedDate}
                        value={fecha}
                        required
                        minDate={moment().startOf('day').toDate()}
                        clearIcon={null}
                    />
                </div>
            </div>

            <FormLabel className="mb-0">{ViewStrings.hours}<RequiredField /></FormLabel>
            <Select
                options={chosenHours}
                closeMenuOnSelect
                id="client"
                onChange={handleSelectHours}
                value={selectedHours}
                isSearchable
                isClearable
            />
        </ModalLayout>
    )
}
export default EditAppointmentsModal;