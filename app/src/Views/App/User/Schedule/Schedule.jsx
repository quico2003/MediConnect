import React, { useContext, useEffect, useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';

import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import GeneralLayout from '../../../../Layouts/GeneralLayout/GeneralLayout';
import PanelLayout from '../../../../Layouts/PanelLayout/PanelLayout';
import { StringsContext } from '../../../../Context/strings.context';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { Paths } from '../../../../Constants/paths.constants';
import { Views } from '../../../../Constants/views.constants';
import useRequest from '../../../../Hooks/useRequest';
import useLoaded from '../../../../Hooks/useLoaded';
import useNotification from '../../../../Hooks/useNotification';
import { EndpointsUser, getEndpoint } from '../../../../Constants/endpoints.contants';


const Schedule = () => {

    const { strings } = useContext(StringsContext);
    const viewStrings = strings.User.Schedule;

    const request = useRequest();

    const [data, setData] = useState();

    const localizer = momentLocalizer(moment);

    const { startFetching, finishFetching, fetching, loaded } = useLoaded();

    const { showNotification: errorNotification } = useNotification();

    useEffect(() => {
        fetchData();
    }, [])

    const fetchData = async () => {
        startFetching();
        return await request("get", getEndpoint(EndpointsUser.Appointments.getAll))
            .then((res) => {
                setData(eventsFormatter(res.appointments));
            })
            .catch((err) => errorNotification(err.message))
            .finally(() => finishFetching());
    }

    const eventsFormatter = (appointments) => {
        return appointments.map(appointment => {
            const startMoment = moment(appointment.start, "DD-MM-YYYY HH:mm");

            return {
                title: appointment.title,
                start: startMoment.toDate(),
                end: startMoment.clone().add(1, 'hour').toDate(),
            };
        });
    };


    return (

        <GeneralLayout title={viewStrings.title} rightSection={
            <Button size='sm' as={Link} to={Paths[Views.new_appointment].path}>
                {viewStrings.buttonAdd}
            </Button>
        }>
            <PanelLayout style={{ height: '500px', margin: '20px' }}>
                <Calendar
                    localizer={localizer}
                    events={data}
                    startAccessor="start"
                    endAccessor="end"
                    defaultView="week"
                    views={['month', 'week', 'day']}
                    culture="es"
                />
            </PanelLayout>
        </GeneralLayout>

    )
};

export default Schedule;