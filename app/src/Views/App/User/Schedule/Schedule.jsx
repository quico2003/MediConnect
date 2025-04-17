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
import useModalManager from '../../../../Hooks/useModalManager';
import MenuAppointmentsModal from '../../../../Modals/User/Schedule/MenuAppointmentsModal';
import DeleteAppointmentsModal from '../../../../Modals/User/Appointment/DeleteAppointmentsModal';
import EditAppointmentsModal from '../../../../Modals/User/Appointment/EditAppointmentsModal';


const Schedule = () => {

    const { strings } = useContext(StringsContext);
    const viewStrings = strings.User.Schedule;

    const request = useRequest();

    const [data, setData] = useState();

    const localizer = momentLocalizer(moment);

    const { startFetching, finishFetching } = useLoaded();

    const { showNotification: errorNotification } = useNotification();

    const {
        closeModal: closeMenuAppointmentsModal,
        openModal: openMenuAppointmentsModal,
        show: showMenuAppointmentsModal,
        data: menuAppointmentsData,
    } = useModalManager();

    const {
        closeModal: closeDeleteAppointmentModal,
        openModal: openDeleteAppointmentModal,
        show: showDeleteAppointmentModal,
        data: deleteAppointmentsData,
    } = useModalManager();

    const {
        closeModal: closeEditAppointmentModal,
        openModal: openEditAppointmentModal,
        show: showEditAppointmentModal,
        data: editAppointmentsData,
    } = useModalManager();

    const {
        closeModal: closeCompleteAppointmentModal,
        openModal: openCompleteAppointmentModal,
        show: showCompleteAppointmentModal,
        data: completeAppointmentsData,
    } = useModalManager();

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
                id: appointment.id,
                title: appointment.title,
                start: startMoment.toDate(),
                end: startMoment.clone().add(1, 'hour').toDate(),
            };
        });
    };

    const handleCloseMenuAppointmentsModal = () => {
        closeMenuAppointmentsModal();
    }

    const handleSelectEvent = (e) => {
        openMenuAppointmentsModal(e);
    }

    const handleCloseDeleteAppointmentsModal = (refresh) => {
        if (refresh) {
            closeDeleteAppointmentModal();
            fetchData();
        }
    }

    const handleOpenDelete = (data) => {
        openDeleteAppointmentModal(data);
    }

    const handleColseEditAppointmentsModal = (refresh) => {
        if (refresh) {
            closeEditAppointmentModal();
            fetchData();
        }
    }

    const handleOpenEdit = (data) => {
        openEditAppointmentModal(data);
    }

    return (

        <>
            <MenuAppointmentsModal
                onClose={handleCloseMenuAppointmentsModal}
                show={showMenuAppointmentsModal}
                data={menuAppointmentsData}
                openDelete={handleOpenDelete}
                openEdit={handleOpenEdit}

            />
            <DeleteAppointmentsModal
                onClose={handleCloseDeleteAppointmentsModal}
                show={showDeleteAppointmentModal}
                data={deleteAppointmentsData}
            />
            <EditAppointmentsModal
                onClose={handleColseEditAppointmentsModal}
                show={showEditAppointmentModal}
                data={editAppointmentsData}
            />
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
                        selectable
                        onSelectEvent={handleSelectEvent}
                    />
                </PanelLayout>
            </GeneralLayout>

        </>
    )
};

export default Schedule;