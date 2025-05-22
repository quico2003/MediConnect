import { useContext, useEffect, useState } from "react";
import { StringsContext } from "../../../../../../Context/strings.context";
import useRequest from "../../../../../../Hooks/useRequest";
import { EndpointsUser, getEndpoint } from "../../../../../../Constants/endpoints.contants";
import useNotification from "../../../../../../Hooks/useNotification";
import useLoaded from "../../../../../../Hooks/useLoaded";
import { Configuration } from "../../../../../../Config/app.config";
import PanelLayout from "../../../../../../Layouts/PanelLayout/PanelLayout";
import { AppointmentHistorialColumns } from "./AppointmentHistorialColumns";
import ReactTable from "../../../../../../Components/Table/Table";
import useModalManager from "../../../../../../Hooks/useModalManager";
import ViewAppointmentModal from "../../../../../../Modals/User/Clients/ViewAppointmentModal";

const AppointmentHistorial = ({ data, active }) => {

    const { strings } = useContext(StringsContext);
    const ViewStrings = strings.User.historial.appointmentsHistorial;

    const request = useRequest();

    const [filterSelected] = useState();
    const [totalPages, setTotalPages] = useState(1);
    const { startFetching, finishFetching, fetching, loaded } = useLoaded();

    const [appointments, setAppointments] = useState([]);

    const { showNotification: errorNotification } = useNotification();

    const {
        closeModal: closeViewAppointmentModal,
        openModal: openViewAppointmentModal,
        show: showViewAppointmentModal,
        data: viewAppointmentData
    } = useModalManager();

    useEffect(() => {
        if (active === "recipeHistorial") {
            fetchData();
        }
    }, [active])

    const fetchData = async (
        page = 1,
        offset = Configuration.tables.defaultPageSize,
        filter = filterSelected
    ) => {
        startFetching();
        return await request(
            "get",
            getEndpoint(EndpointsUser.Appointments.getAllByClient),
            {
                guid: data,
                page,
                offset,
                filter: JSON.stringify(filter ? [filter] : []),
            })
            .then((res) => {
                setAppointments(res.appointments);
                setTotalPages(res.totalPages);
            })
            .catch((err) => errorNotification(err.message))
            .finally(() => finishFetching());
    }

    const handleCloseViewAppointmentModal = () => {
        closeViewAppointmentModal();
    }

    return (
        <>
            <ViewAppointmentModal
                onClose={handleCloseViewAppointmentModal}
                show={showViewAppointmentModal}
                data={viewAppointmentData}
            />

            <div className="d-flex flex-column bg-white rounded-bottom-4">
                <div className="m-4 d-flex flex-column gap-3">
                    <PanelLayout loaded={loaded}>
                        <ReactTable
                            showSearcher={false}
                            totalPages={totalPages}
                            fetching={fetching}
                            onEventChange={fetchData}
                            data={appointments}
                            emptyData={{
                                text: ViewStrings.emptyData,
                            }}
                            columns={AppointmentHistorialColumns(
                                openViewAppointmentModal
                            )}
                        />
                    </PanelLayout>
                </div>
            </div>
        </>
    )
}
export default AppointmentHistorial;