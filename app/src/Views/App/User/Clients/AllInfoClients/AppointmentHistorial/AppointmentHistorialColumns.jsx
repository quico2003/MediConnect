import { useContext } from "react";
import { StringsContext } from "../../../../../../Context/strings.context";
import { getColumnValue } from "../../../../../../Config/GeneralFunctions";
import { ButtonGroup } from "react-bootstrap";
import IconButton from "../../../../../../Components/Buttons/IconButton";
import { IoMdEye } from "react-icons/io";
import { BsFillPrinterFill } from "react-icons/bs";
import useRequest from "../../../../../../Hooks/useRequest";
import { EndpointsUser, getEndpoint } from "../../../../../../Constants/endpoints.contants";
import useNotification from "../../../../../../Hooks/useNotification";

export const AppointmentHistorialColumns = (openViewAppointmentModal) => {

    const { strings } = useContext(StringsContext);
    const ViewStrings = strings.User.historial.appointmentsHistorial.columns;

    const { showNotification: successNotification } = useNotification("success");
    const { showNotification: errorNotification } = useNotification();

    const request = useRequest();

    const generatePDF = (item) => {
        console.log(item);
        request("download", getEndpoint(EndpointsUser.Clients.createPDF), {
            id: item.id
        })
            .then(() => { successNotification(ViewStrings.success) })
            .catch((err) => errorNotification(err.message))
    }

    const renderStatAppointment = (item) => {
        if (item.deleted_at === null && item.final_description === null) {
            return <p className="text-warning">{ViewStrings.pending}</p>;
        } else if (item.deleted_at !== null && item.final_description === null) {
            return <p className="text-danger">{ViewStrings.cancel}</p>;
        } else if (item.deleted_at !== null && item.final_description !== null) {
            return (
                <>
                    <div className="d-flex gap-4">
                        <p className="text-success">{ViewStrings.complete}</p>
                        <ButtonGroup>
                            <IconButton
                                Icon={IoMdEye}
                                onClick={() => openViewAppointmentModal(item)}
                            />
                            <IconButton
                                Icon={BsFillPrinterFill}
                                onClick={() => generatePDF(item)}
                            />
                        </ButtonGroup>
                    </div>
                </>
            );
        } else {
            return <p>{ViewStrings.error}</p>;
        }
    }

    const columns = [
        {
            Header: ViewStrings.doctor,
            Cell: (row) =>
                getColumnValue(row, (item) => <p className="mb-0">{item.doctor}</p>),
        },
        {
            Header: ViewStrings.client,
            Cell: (row) =>
                getColumnValue(row, (item) => <p className="mb-0">{item.client}</p>),
        },
        {
            Header: ViewStrings.date,
            Cell: (row) =>
                getColumnValue(row, (item) => <p className="mb-0">{item.date}</p>),
        },
        {
            Header: ViewStrings.actions,
            Cell: (row) =>
                getColumnValue(row, (item) => (
                    <div className="d-flex">
                        {renderStatAppointment(item)}
                    </div>
                )),
        }
    ]
    return columns;
}