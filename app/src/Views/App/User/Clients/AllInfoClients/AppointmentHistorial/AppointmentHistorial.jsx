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
import Select from "react-select";
import { FormLabel } from "react-bootstrap";
import RequiredField from "../../../../../../Components/Form/RequiredField/RequiredField";

const AppointmentHistorial = ({ data, active }) => {

    const { strings } = useContext(StringsContext);
    const ViewStrings = strings.User.historial.appointmentsHistorial;

    const request = useRequest();

    const [totalPages, setTotalPages] = useState(1);
    const { startFetching, finishFetching, fetching, loaded } = useLoaded();

    const [appointments, setAppointments] = useState([]);
    const [stats, setStats] = useState([]);
    const [selectedStat, setSelectedStat] = useState({value: "all", label: "All"});

    const { showNotification: errorNotification } = useNotification();

    const {
        closeModal: closeViewAppointmentModal,
        openModal: openViewAppointmentModal,
        show: showViewAppointmentModal,
        data: viewAppointmentData
    } = useModalManager();

    useEffect(() => {
        if (active === "recipeHistorial") {
            fetchData(1, Configuration.tables.defaultPageSize, selectedStat.value);
        }
    }, [active])

    const fetchData = async (
        page = 1,
        offset = Configuration.tables.defaultPageSize,
        filter = selectedStat.value
    ) => {
        startFetching();
        return await request(
            "get",
            getEndpoint(EndpointsUser.Appointments.getAllByClient),
            {
                guid: data,
                page,
                offset,
                filter: filter,
            })
            .then((res) => {
                setAppointments(res.appointments);
                setTotalPages(res.totalPages);
                setStats(res.stats);
            })
            .catch((err) => errorNotification(err.message))
            .finally(() => finishFetching());
    }

    const handleSelectStat = (e) => {
        setSelectedStat(e);
        fetchData(1, Configuration.tables.defaultPageSize, e?.value || "all");
    };

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

            <div className="bg-white ">
                <PanelLayout loaded={loaded}>
                    <div className="d-flex justify-content-end mb-3 gap-4 align-items-center">
                        <FormLabel className="mb-0">Filters:</FormLabel>
                        <Select
                            options={stats}
                            closeMenuOnSelect={true}
                            className="pb-2 w-25"
                            menuPortalTarget={document.body}
                            id="stat"
                            onChange={handleSelectStat}
                            value={selectedStat}
                            isSearchable
                            isClearable
                        />

                    </div>
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

        </>
    )
}
export default AppointmentHistorial;