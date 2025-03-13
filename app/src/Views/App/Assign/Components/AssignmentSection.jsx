import { useContext, useMemo, useState } from "react";
import FormSelect from "../../../../Components/Form/FormSelect/FormSelect";
import SectionLayout from "../../../../Layouts/SectionLayout/SectionLayout";
import { StringsContext } from "../../../../Context/strings.context";
import useRequest from "../../../../Hooks/useRequest";
import {
  Endpoints,
  getEndpoint,
} from "../../../../Constants/endpoints.contants";
import useNotification from "../../../../Hooks/useNotification";
import { Button, Col, ListGroup, Row } from "react-bootstrap";
import AssignCopiesModal from "../../../../Modals/Copies/AssignCopiesModal.jsx/AssignCopiesModal";
import useModalManager from "../../../../Hooks/useModalManager";

const AssignmentSection = ({
  data,
  setData,
  courses,
  assignedSubjects,
  setAssignedSubjects,
}) => {
  const request = useRequest();

  const { showNotification: errorNotification } = useNotification();

  const { strings: Strings } = useContext(StringsContext);
  const ViewStrings = Strings.Assign.NewAssign;

  const [originalSubjects, setOriginalSubjects] = useState([]);
  const [pendingSubject, setPendingSubjects] = useState([]);

  const {
    closeModal: closeAssignModal,
    openModal: openAssignModal,
    show: showAssignModal,
    data: assignCopyData,
  } = useModalManager();

  const handleChangeCourse = (e) => {
    const { id, value } = e.target;
    request("get", getEndpoint(Endpoints.Subjects.allSubjects.getAllByCourseThatHaveBooks), {
      course: value,
    })
      .then((res) => {
        setOriginalSubjects(res.subjects);
        setPendingSubjects(res.subjects);
        setData({
          ...data,
          course: value,
          subjects: res.subjects.map((subject) => subject.value),
        });
      })
      .catch(errorNotification);
  };

  const handleCleanCourse = () => setData({ ...data, course: null });

  const handleCloseAssignModal = (data) => {
    if (data.value) {
      const { uniqid, value } = data;

      // Remove pending subject
      const pendingSubjectsCopy = [...pendingSubject];
      const index = pendingSubjectsCopy
        .map((item) => item.value)
        .indexOf(value);
      let removedItem = pendingSubjectsCopy.splice(index, 1)[0];
      setPendingSubjects(pendingSubjectsCopy);

      //Add item to assigned items
      removedItem.copy_uniqid = uniqid;
      setAssignedSubjects([...assignedSubjects, removedItem]);
    }
    closeAssignModal();
  };

  const removeAssignedItem = (item) => {
    const { value } = item;

    //Removed assigned subject
    const assignedSubjectsCopy = [...assignedSubjects];
    const index = assignedSubjectsCopy.map((item) => item.value).indexOf(value);
    assignedSubjectsCopy.splice(index, 1);
    setAssignedSubjects(assignedSubjectsCopy);

    //Add subject to original list
    const pendingSubjectsCopy = [...pendingSubject];
    const sIndex = originalSubjects.map((item) => item.value).indexOf(value);

    delete item.copy_uniqid;
    pendingSubjectsCopy.splice(sIndex, 0, item);
    setPendingSubjects([...pendingSubjectsCopy]);
  };

  const SubjectItem = ({ value, label, onClick }) => {
    return (
      <ListGroup.Item
        as={Button}
        className="text-start"
        onClick={onClick}
        key={value}
      >
        {label}
      </ListGroup.Item>
    );
  };

  return (
    <>
      <AssignCopiesModal
        show={showAssignModal}
        onClose={handleCloseAssignModal}
        data={assignCopyData || {}}
      />

      <SectionLayout title={ViewStrings.tileSection.titleAssignament}>
        <FormSelect
          options={courses}
          controlId="course"
          value={data.course}
          vertical={false}
          title={ViewStrings.inputs.courseInput.title}
          placeholder={ViewStrings.inputs.courseInput.placeholder}
          onChange={handleChangeCourse}
          onClean={handleCleanCourse}
          required
        />
      </SectionLayout>
      {data.course && (
        <SectionLayout>
          <Row>
            <Col sm={12} md={6} className="pb-3">
              <h6>{ViewStrings.tileSection.pendingAssign}</h6>
              <ListGroup>
                {pendingSubject.length > 0 ? (
                  pendingSubject.map((subject, idx) => (
                    <SubjectItem
                      {...subject}
                      onClick={() => openAssignModal(subject)}
                    />
                  ))
                ) : (
                  <div className="border rounded p-4 d-flex justify-content-center align-items-center">
                    <p className="mb-0 text-center">
                      {ViewStrings.tileSection.allsubjectsAssigned}
                    </p>
                  </div>
                )}
              </ListGroup>
            </Col>
            <Col sm={12} md={6} className="pb-3">
              <h6>{ViewStrings.tileSection.assigned}</h6>
              <ListGroup>
                {assignedSubjects.length ? (
                  assignedSubjects.map((subject, idx) => (
                    <SubjectItem
                      {...subject}
                      onClick={() => removeAssignedItem(subject)}
                    />
                  ))
                ) : (
                  <div className="border rounded p-4 d-flex justify-content-center align-items-center">
                    <p className="mb-0 text-center">
                      {ViewStrings.tileSection.allpendingAssign}
                    </p>
                  </div>
                )}
              </ListGroup>
            </Col>
          </Row>
        </SectionLayout>
      )}
    </>
  );
};
export default AssignmentSection;
