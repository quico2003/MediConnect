import React from 'react';
import { Calendar, momentLocalizer, Views } from 'react-big-calendar';

import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import GeneralLayout from '../../../../Layouts/GeneralLayout/GeneralLayout';
import PanelLayout from '../../../../Layouts/PanelLayout/PanelLayout';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { Paths } from '../../../../Constants/paths.constants';

const Schedule = () => {

    const localizer = momentLocalizer(moment);



    const events = [
        {
            title: 'Reunión importante',
            start: new Date("2025-04-14 10:20:36"),
            end: new Date("2025-04-14 11:20:36"),
        },
        {
            title: 'Llamada con el cliente',
            start: new Date(2025, 3, 16, 14, 0),
            end: new Date(2025, 3, 16, 15, 0),
        },
    ];


    return (

        <GeneralLayout title="{ViewStrings.title}">
            <PanelLayout style={{ height: '500px', margin: '20px' }}>
                <Calendar
                    localizer={localizer}
                    events={events}
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