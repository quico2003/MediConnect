import { useContext } from "react";
import { StringsContext } from "../../../Context/strings.context";
import ModalLayout from "../../../Layouts/ModalLayout/ModalLayout";
import useRequest from "../../../Hooks/useRequest";
import useNotification from "../../../Hooks/useNotification";
import { Button } from "react-bootstrap";
import { EndpointsUser, getEndpoint } from "../../../Constants/endpoints.contants";

const DeleteAppointmentsModal = ({ show, onClose, data, openMenuModal }) => {

    const { strings } = useContext(StringsContext);
    const ViewStrings = strings.User.Schedule.delete;

    const request = useRequest();

    const { showNotification: errorNotification } = useNotification();
    const { showNotification: successNotification } = useNotification("success");

    const handleSubmit = () => {
        request("post", getEndpoint(EndpointsUser.Appointments.delete), { id: data.id })
            .then(() => {
                successNotification(ViewStrings.messageDeleted);
                onClose(true);
            })
            .catch((err) => errorNotification(err.message))
    }

    const hideModal = () => {
        onClose(true);
        openMenuModal();
    };

    return (
        <ModalLayout
            show={show}
            onHide={hideModal}
            size="md"
            header={true}
            title={ViewStrings.title}
            footer={
                <div className="d-flex justify-content-end gap-2">
                    <Button variant="light" size="md" onClick={hideModal}>
                        {ViewStrings.buttonCancel}
                    </Button>
                    <Button onClick={handleSubmit} variant="danger" size="md">
                        {ViewStrings.buttonDelete}
                    </Button>
                </div>
            }
        >
            <div className="mb-1">
                <p>{ViewStrings.body}{data?.title}{ViewStrings.body1}</p>
            </div>
        </ModalLayout>
    )
}
export default DeleteAppointmentsModal;