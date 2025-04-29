import { useContext, useEffect, useState } from "react";
import { StringsContext } from "../../../../../Context/strings.context";
import useRequest from "../../../../../Hooks/useRequest";
import { Calendar, momentLocalizer } from "react-big-calendar";
import useLoaded from "../../../../../Hooks/useLoaded";
import useNotification from "../../../../../Hooks/useNotification";
import moment from "moment";
import { EndpointsUser, getEndpoint } from "../../../../../Constants/endpoints.contants";
import GeneralLayout from "../../../../../Layouts/GeneralLayout/GeneralLayout";
import IconButton from "../../../../../Components/Buttons/IconButton";
import { IoReload } from "react-icons/io5";
import PanelLayout from "../../../../../Layouts/PanelLayout/PanelLayout";


const WorkDay = () => {

    const request = useRequest();

    const [data, setData] = useState();

    const localizer = momentLocalizer(moment);

    const { startFetching, finishFetching } = useLoaded();

    const { showNotification: errorNotification } = useNotification();

    useEffect(() => {
        fetchData();
    }, [])

    const fetchData = async () => {
        const date = moment().format('DD-MM-YYYY');
        startFetching();
        request("get", getEndpoint(EndpointsUser.Dashboard.getAllByDay), { date: date })
            .then((res) => {
                setData(eventsFormatter(res.data));
            })
            .catch((err) => errorNotification(err.message))
            .finally(() => finishFetching())
    }

    const eventsFormatter = (appointments) => {
        return appointments.map(appointment => {
            const startMoment = moment(appointment.start, "DD-MM-YYYY HH:mm");
            return {
                id: appointment.id,
                title: appointment.title,
                start: startMoment.toDate(),
                end: startMoment.clone().add(1, 'hour').toDate(),
            };
        });
    };

    return (

        <PanelLayout style={{ height: '500px', margin: '20px' }}>
            <Calendar
                localizer={localizer}
                events={data}
                startAccessor="start"
                endAccessor="end"
                defaultView="day"
                views={['day']}
                culture="es"
            />
        </PanelLayout>

    )
}
export default WorkDay;