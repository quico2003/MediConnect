import { useState } from "react";
import { Form } from "react-bootstrap";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import FormControl from "../../Components/Form/FormControl/FormControl";
import { Paths } from "../../Constants/paths.constants";
import { Views } from "../../Constants/views.constants";
import ModalLayout from "../../Layouts/ModalLayout/ModalLayout";

const SearcherModal = ({ show, onClose }) => {
  const { push } = useHistory();

  const [search, setSearch] = useState("");

  const handleSubmit = (e) => {
    e && e.preventDefault();
    push(`${Paths[Views.search].path}?search=${search}`);
    onClose();
  };

  return (
    <ModalLayout
      show={show}
      onHide={onClose}
      size="md"
      bodyClass="p-0 rounded-lg overflow-hidden"
    >
      <Form onSubmit={handleSubmit}>
        <FormControl
          autoFocus={true}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search..."
          formGroupProps={{ className: "mb-0 w-100" }}
          className="p-3 text-muted"
          style={{ fontSize: "1.2rem" }}
        />
      </Form>
    </ModalLayout>
  );
};

export default SearcherModal;
