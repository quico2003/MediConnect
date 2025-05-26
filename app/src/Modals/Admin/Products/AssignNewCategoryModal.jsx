import { Button, FormLabel, Modal } from "react-bootstrap";
import useRequest from "../../../Hooks/useRequest"
import ModalLayout from "../../../Layouts/ModalLayout/ModalLayout";
import { useContext, useEffect, useState } from "react";
import { EndpointsAdmin, getEndpoint } from "../../../Constants/endpoints.contants";
import useNotification from "../../../Hooks/useNotification";
import RequiredField from "../../../Components/Form/RequiredField/RequiredField";
import Select from "react-select";
import { StringsContext } from "../../../Context/strings.context";

const AssignNewCategoryModal = ({ show, onClose, data }) => {

    const { strings } = useContext(StringsContext);
    const ViewStrings = strings.dashboard.assign;

    const { showNotification: successNotification } = useNotification("success");
    const { showNotification: errorNotification } = useNotification();

    const request = useRequest();

    const [categories, setCategories] = useState({});
    const [selectedOption, setSelectedOption] = useState(null);

    useEffect(() => {
        if (show) {
            fetchData();
            setSelectedOption(null);
        } 
    }, [show]);

    const fetchData = async () => {
        return await request("get", getEndpoint(EndpointsAdmin.Categories.getList))
            .then((res) => {
                setCategories(res.categories);
            })
            .catch((err) => errorNotification(err.message))
    }

    const handleSubmit = () => {
        return request("post", getEndpoint(EndpointsAdmin.Products.assignCategory), {
            productGuid: data,
            categoryGuid: selectedOption.value
        })
            .then(() => {
                successNotification(ViewStrings.successMessage);
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
                <Modal.Title>{ViewStrings.title}</Modal.Title>
            }
            footer={
                <div>
                    <Button onClick={hideModal} variant="ligth">{ViewStrings.cancel}</Button>
                    <Button onClick={handleSubmit} disabled={!selectedOption} variant="dark">{ViewStrings.assign}</Button>
                </div>
            }
        >
            <div>
                <FormLabel className="mb-2">{ViewStrings.category}<RequiredField /></FormLabel>
                <Select
                    options={categories}
                    closeMenuOnSelect={true}
                    className="pb-2"
                    id="category"
                    onChange={handleSelect}
                    value={selectedOption}
                    isClearable
                    isSearchable
                />
            </div>

        </ModalLayout>
    )


}
export default AssignNewCategoryModal