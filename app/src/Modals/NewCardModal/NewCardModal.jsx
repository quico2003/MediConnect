import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import Editor from "../../Components/Editor/Editor";
import FormControl from "../../Components/Form/FormControl/FormControl";
import TaskTypeDropdown from "../../Components/TaskTypeDropdown/TaskTypeDropdown";
import { Endpoints, getEndpoint } from "../../Constants/endpoints.contants";
import useNotification from "../../Hooks/useNotification";
import useRequest from "../../Hooks/useRequest";
import ModalLayout from "../../Layouts/ModalLayout/ModalLayout";
import { TaskType } from "../../Utils/TaskType";

const NewCardModal = ({ show, onClose, status_guid }) => {
  const request = useRequest();

  const { showNotification: errorNotification } = useNotification();

  const [data, setData] = useState({
    title: "",
    type: TaskType[0].value,
  });

  const handleSubmit = (e) => {
    e && e.preventDefault();
    if (checkForm()) {
      request("post", getEndpoint(Endpoints.Card.create), {
        ...data,
        status_guid,
      })
        .catch((err) => errorNotification(err.message))
        .finally(() => hideModal());
    } else errorNotification("Check required fields");
  };

  const handleText = (e) => {
    const { id, value } = e.target;
    setData({ ...data, [id]: value });
  };

  const handleTaskType = (e) => setData({ ...data, type: e.value });

  const hideModal = () => {
    onClose();
    setData({});
  };

  const checkForm = () => {
    const { title } = data;
    return !!title;
  };

  return (
    <ModalLayout
      show={show}
      onHide={hideModal}
      size="lg"
      header={true}
      customHeader={
        <div className="d-flex align-items-center justify-content-between w-100">
          <Modal.Title className="ms-2">New Card</Modal.Title>
          <TaskTypeDropdown onClick={handleTaskType} />
        </div>
      }
    >
      <div className="w-100 mb-2 d-flex flex-column align-items-center">
        <FormControl
          id="title"
          title="Title:"
          value={data.title}
          onChange={handleText}
          autoFocus={true}
          placeholder="Type a title..."
        />
        <Editor
          id="description"
          title="Description:"
          onChange={handleText}
          value={data.description}
        />
      </div>
      <div className="d-flex justify-content-end gap-2">
        <Button variant="light" size="sm" onClick={hideModal}>
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          disabled={!checkForm()}
          variant="light"
          size="sm"
        >
          Save
        </Button>
      </div>
    </ModalLayout>
  );
};

export default NewCardModal;
