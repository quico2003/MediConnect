 import { useContext, useEffect, useState } from "react";
import { StringsContext } from "../../../Context/strings.context";
import useNotification from "../../../Hooks/useNotification";
import useRequest from "../../../Hooks/useRequest";
import ModalLayout from "../../../Layouts/ModalLayout/ModalLayout";
import { Button, FormLabel, Modal } from "react-bootstrap";
import RequiredField from "../../../Components/Form/RequiredField/RequiredField";
import Select from "react-select";
import { EndpointsAdmin, getEndpoint } from "../../../Constants/endpoints.contants";

const AssignNewUserModal = ({ show, onClose, data }) => {

    const { strings } = useContext(StringsContext);
    const ViewString = strings.dashboard.withoutUsers.assignModal;

    const { showNotification: successNotification } = useNotification("success");
    const { showNotification: errorNotification } = useNotification();

    const request = useRequest();

    const [users, setUsers] = useState({});
    const [selectedOption, setSelectedOption] = useState(null);

    useEffect(() => {
        if (show){
            fetchData();
            setSelectedOption(null);
        } 
    }, [show])

    const fetchData = async () => {
        return await request("get", getEndpoint(EndpointsAdmin.Dashboard.getUsers))
            .then((res) => {
                setUsers(res.users);
            })
            .catch((err) => {
                errorNotification(err.message);
            })
    }

    const handleSubmit = () => {
        return request("post", getEndpoint(EndpointsAdmin.Dashboard.assignNewUser),
            {
                clientGuid: data,
                userGuid: selectedOption.value
            })
            .then(() => {
                successNotification(ViewString.successMessage);
                onClose(true);
            })
            .catch((err) => errorNotification(err.message))
    }

    const handleSelect = (obj) => {
        setSelectedOption(obj);
    }

    const hideModal = () => {
        onClose(true);
    }

    return (
        <ModalLayout
            show={show}
            onHide={hideModal}
            header={true}
            customHeader={
                <Modal.Title>{ViewString.title}</Modal.Title>
            }
            footer={
                <div>
                    <Button onClick={hideModal} variant="ligth">{ViewString.cancel}</Button>
                    <Button onClick={handleSubmit} disabled={!selectedOption} variant="dark">{ViewString.assign}</Button>
                </div>
            }
        >
            <FormLabel className="mb-2"><RequiredField />{ViewString.users}</FormLabel>
            <Select
                options={users}
                closeMenuOnSelect={true}
                className="pb-2"
                id="users"
                onChange={handleSelect}
                value={selectedOption}
                isClearable
                isSearchable
            />
        </ModalLayout>
    )
}
export default AssignNewUserModal;