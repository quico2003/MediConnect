import { useContext, useEffect, useState } from "react";
import { StringsContext } from "../../../../../Context/strings.context";
import useRequest from "../../../../../Hooks/useRequest";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import useNotification from "../../../../../Hooks/useNotification";
import { dataFormater, validateData } from "../../../../../Config/GeneralFunctions";
import GeneralLayout from "../../../../../Layouts/GeneralLayout/GeneralLayout";
import PanelLayout from "../../../../../Layouts/PanelLayout/PanelLayout";
import SectionLayout from "../../../../../Layouts/SectionLayout/SectionLayout";
import { Button, FormLabel } from "react-bootstrap";
import { EndpointsUser, getEndpoint } from "../../../../../Constants/endpoints.contants";
import Select from "react-select";
import RequiredField from "../../../../../Components/Form/RequiredField/RequiredField";
import FormControl from "../../../../../Components/Form/FormControl/FormControl";
import DatePicker from "react-date-picker";
import { Paths } from "../../../../../Constants/paths.constants";
import { Views } from "../../../../../Constants/views.constants";
import moment from "moment";

const NewAppointment = () => {

    const { strings } = useContext(StringsContext);
    const ViewStrings = strings.User.Schedule.add;

    const request = useRequest();
    const { push } = useHistory();

    const { showNotification: successNotification } = useNotification("success");
    const { showNotification: errorNotification } = useNotification();

    const [data, setData] = useState({});
    const [clients, setClients] = useState({});
    const [selectedOption, setSelectedOption] = useState({});

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
        fetchData();
    }, [])

    const fetchData = async () => {
        return await request("get", getEndpoint(EndpointsUser.Clients.getAllWithoutPagination))
            .then((res) => {
                setClients(res.clients);
            })
            .catch((err) => errorNotification(err.message))
    }

    const handleSubmit = () => {
        if (checkForm()) {
            request("post", getEndpoint(EndpointsUser.Appointments.create), { ...data })
                .then(() => {
                    successNotification(ViewStrings.successMessage);
                    push(Paths[Views.schedule].path);
                })
                .catch((err) => errorNotification(err.message))
        }
    }
    const handleInput = (e) => {
        const { id, value } = e.target;
        setData({ ...data, [id]: value });
    }

    const handleSelect = (obj) => {
        setSelectedOption(obj);
        setData({ ...data, "created_for": obj.value });
    }

    const handleSelectedDate = (obj) => {
        const date = moment(obj);
        const dateFormat = dataFormater(date, "DD-MM-YYYY");

        if (dateFormat !== "Invalid date") {
            setFecha(date);
            setSelectedHours(null);
            setData({ ...data, "date": dateFormat });
            getAvaliableHours(dateFormat);
        } else {
            errorNotification("You cannot enter an incorrect date.")
        }
    }

    const handleSelectHours = (obj) => {
        setSelectedHours(obj);
        const date = moment(fecha).add(obj.value, "hours");
        const dateFormat = dataFormater(date, "DD-MM-YYYY HH:mm");
        setData({ ...data, "date": dateFormat, "hour": dateFormat });
    }

    const getAvaliableHours = (dateFormat) => {
        request("get", getEndpoint(EndpointsUser.Appointments.getChosenHours), { dateFormat })
            .then((res) => {
                const availableHours = horas.filter(hora => !res.data.includes(hora.value));
                setChosenHours(availableHours);
            })
            .catch((err) => errorNotification(err.message))
    }

    const checkForm = () => {
        const { created_for, reason, date, hour } = data;
        return validateData([created_for, reason, date, hour]);
    }

    return (
        <GeneralLayout showBackButton title={ViewStrings.title} className="">
            <PanelLayout>

                <SectionLayout>
                    <FormLabel className="mb-0">{ViewStrings.client}<RequiredField /></FormLabel>
                    <Select
                        options={clients}
                        closeMenuOnSelect
                        menuPortalTarget={document.body}
                        className="pb-2 basic-single"
                        id="client"
                        onChange={handleSelect}
                        value={selectedOption}
                        isSearchable
                        isClearable
                    />

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
                        value={data.reason}
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
                        menuPortalTarget={document.body}
                        className="pb-2 basic-single"
                        id="hour"
                        onChange={handleSelectHours}
                        value={selectedHours}
                        isSearchable
                        isClearable
                    />


                </SectionLayout>
                <div className="d-flex justify-content-end align-items-center">
                    <Button disabled={!checkForm()} onClick={handleSubmit}>
                        {ViewStrings.button}
                    </Button>
                </div>
            </PanelLayout>
        </GeneralLayout>
    )

}
export default NewAppointment;