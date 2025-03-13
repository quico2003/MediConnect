import { Card } from "react-bootstrap";
import { MdEdit } from "react-icons/md";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import IconButton from "../../../../../Components/Buttons/IconButton";
import { Paths, replacePaths } from "../../../../../Constants/paths.constants";
import { Views } from "../../../../../Constants/views.constants";

const UserCard = ({ name, lastname, phone, guid }) => {
  return (
    <Card>
      <Card.Header className="bg-secondary bg-gradient">
        <Card.Title className="text-light mb-3">{`${name} ${lastname}`}</Card.Title>
      </Card.Header>
      <Card.Body>
        <Card.Text>{phone}</Card.Text>
      </Card.Body>
      <Card.Footer className="bg-white d-flex justify-content-end">
        <IconButton
          Icon={MdEdit}
          as={Link}
          to={replacePaths(Paths[Views.edit_user].path, [{ user_guid: guid }])}
        />
      </Card.Footer>
    </Card>
  );
};

export default UserCard;
