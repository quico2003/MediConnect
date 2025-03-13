import { Button, Modal } from "react-bootstrap";
import { Endpoints, getEndpoint } from "../../../Constants/endpoints.contants";
import useNotification from "../../../Hooks/useNotification";
import useRequest from "../../../Hooks/useRequest";
import ModalLayout from "../../../Layouts/ModalLayout/ModalLayout";
import { StringsContext } from "../../../Context/strings.context";
import { useContext } from "react";

const DeleteCourseModal = ({ show, onClose, data }) => {
  const { strings } = useContext(StringsContext);
  const ViewStrings = strings.Courses.deleteCourses;
  const request = useRequest();

  const { showNotification: errorNotification } = useNotification();
  const { showNotification: successNotification } = useNotification("success");
  const handleSubmit = () => {
    request("post", getEndpoint(Endpoints.Courses.deleteCourse.delete), {
      guid: data,
    })
      .then((res) => {
        successNotification(ViewStrings.message);
        onClose(true);
      })
      .catch((err) => {
        errorNotification(err.message);
        onClose(true);
      });
  };

  const hideModal = () => {
    onClose();
  };

  const fontSize = {
    fontSize: "16px",
  };

  return (
    <ModalLayout
      show={show}
      onHide={hideModal}
      size="lm"
      header={true}
      customHeader={
        <div className="d-flex align-items-center justify-content-between w-100">
          <Modal.Title className="ms-2">{ViewStrings.title}</Modal.Title>
        </div>
      }
      footer={
        <div className="d-flex justify-content-end gap-2">
          <Button variant="light" size="lm" onClick={hideModal}>
            {ViewStrings.cancel}
          </Button>
          <Button onClick={handleSubmit} variant="danger" size="lm">
            {ViewStrings.confirm}
          </Button>
        </div>
      }
    >
      <div className="mb-1">
        <p style={fontSize}>{ViewStrings.text}</p>
      </div>
    </ModalLayout>
  );
};

export default DeleteCourseModal;
