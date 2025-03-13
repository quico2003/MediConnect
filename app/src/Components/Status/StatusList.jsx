import classNames from "classnames";
import { Accordion, Card } from "react-bootstrap";
import { BsPlus } from "react-icons/bs";
import useModalManager from "../../Hooks/useModalManager";
import NewCardModal from "../../Modals/NewCardModal/NewCardModal";
import IconButton from "../Buttons/IconButton";
import CardItem from "../Cards/CardItem";
import StatusDropdown from "./StatusDropdown";
import StatusTitle from "./StatusTitle";

const StatusList = ({ refresh, guid, name, cards, color, isLast }) => {
  const StatusListClassNames = classNames("border-0 rounded-lg h-100", {
    "me-2": !isLast,
  });

  const { closeModal, openModal, show } = useModalManager();

  const toggleShowNewCard = () => setShowNewCard((showNewCard) => !showNewCard);

  const handleOnClose = () => {
    closeModal();
    refresh();
  };

  return (
    <>
      {/* Modal */}
      <NewCardModal status_guid={guid} show={show} onClose={handleOnClose} />

      {/* Content */}
      <Accordion defaultActiveKey={guid}>
        <Card
          className={StatusListClassNames}
          style={{ width: 300, minWidth: 300 }}
        >
          <Card.Header
            style={{ zIndex: 10 }}
            className="pt-2 position-sticky bg-white top-0 border-0 d-flex align-items-center justify-content-between px-2 py-1"
          >
            <StatusTitle name={name} color={color} eventKey={guid} />
            <div className="d-flex align-items-center">
              <IconButton
                buttonProps={{ className: "me-1" }}
                onClick={openModal}
                Icon={BsPlus}
              />
              <StatusDropdown />
            </div>
          </Card.Header>
          <Accordion.Collapse eventKey={guid}>
            <Card.Body className="px-2 py-1 pb-3">
              {cards.map((card, idx) => (
                <CardItem {...card} key={card.guid} />
              ))}
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>
    </>
  );
};
export default StatusList;
