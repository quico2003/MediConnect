import { useContext } from "react";
import { Card } from "react-bootstrap";
import { MdEdit } from "react-icons/md";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import IconButton from "../../../../../Components/Buttons/IconButton";
import { Paths, replacePaths } from "../../../../../Constants/paths.constants";
import { Views } from "../../../../../Constants/views.constants";
import { StringsContext } from "../../../../../Context/strings.context";

const PlayerCard = ({ name, lastname, phone, guid, padelcrownrank }) => {
  const { strings: Strings } = useContext(StringsContext);
  const ItemStrings = Strings.General.App;

  return (
    <Card>
      <Card.Header className="bg-secondary bg-gradient">
        <Card.Title className="text-light mb-3">{`${name} ${lastname}`}</Card.Title>
      </Card.Header>
      <Card.Body>
        <Card.Text>{phone}</Card.Text>
      </Card.Body>
      <Card.Footer className="bg-white d-flex justify-content-between">
        <p className="mb-0 px-2 d-flex align-items-center bg-light shadow-sm rounded-2">
          <b>{ItemStrings.Rank}</b>: {padelcrownrank}
        </p>
        <IconButton
          Icon={MdEdit}
          as={Link}
          to={replacePaths(Paths[Views.edit_player].path, [
            { player_guid: guid },
          ])}
        />
      </Card.Footer>
    </Card>
  );
};

export default PlayerCard;
