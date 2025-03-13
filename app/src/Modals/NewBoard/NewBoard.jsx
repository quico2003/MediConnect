import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import FormControl from "../../Components/Form/FormControl/FormControl";
import { Endpoints, getEndpoint } from "../../Constants/endpoints.contants";
import useNotification from "../../Hooks/useNotification";
import useRequest from "../../Hooks/useRequest";
import ModalLayout from "../../Layouts/ModalLayout/ModalLayout";

const NewBoardModal = ({ show, onClose }) => {
  const request = useRequest();

  const { showNotification: errorNotification } = useNotification();
  const { showNotification: successNotification } = useNotification("success");

  const [data, setData] = useState({});

  const handleSubmit = () => {
    request("post", getEndpoint(Endpoints.Board.create), { ...data })
      .then((res) => {
        successNotification("Board created successfully!");
        onClose();
      })
      .catch((err) => errorNotification(err.message));
  };

  const handleText = (e) => {
    const { id, value } = e.target;
    setData({ ...data, [id]: value });
  };

  const hideModal = () => {
    onClose();
    setData({});
  };

  const checkForm = () => {
    const { name, prefix } = data;
    return !!name && !!prefix;
  };

  return (
    <ModalLayout
      show={show}
      onHide={hideModal}
      size="lg"
      header={true}
      customHeader={
        <div className="d-flex align-items-center justify-content-between w-100">
          <Modal.Title className="ms-2">New Board</Modal.Title>
        </div>
      }
    >
      <div className="mb-2 w-100 d-flex flex-column align-items-center">
        <FormControl
          id="name"
          title="Name:"
          value={data.name}
          onChange={handleText}
          autoFocus={true}
          placeholder="Type a title..."
        />
        <FormControl
          id="description"
          title="Description:"
          value={data.description}
          onChange={handleText}
          autoFocus={true}
          as="textarea"
          style={{ minHeight: 100, maxHeight: 300 }}
          placeholder="Type a title..."
        />
        <FormControl
          id="prefix"
          title="Prefix:"
          value={data.prefix}
          onChange={handleText}
          autoFocus={true}
          placeholder="Type a title..."
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

export default NewBoardModal;
