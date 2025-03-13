import { Button, Card, useAccordionButton } from "react-bootstrap";

const StatusTitle = ({ eventKey, color, name }) => {
  const decoratedOnClick = useAccordionButton(eventKey);
  return (
    <Button
      className="w-100 d-flex align-items-center justify-content-start"
      onClick={eventKey && decoratedOnClick}
      style={{ all: "unset" }}
    >
      <div
        className="px-2 py-1 d-flex align-items-center"
        style={{ borderRadius: 50, background: `${color}50` }}
      >
        <div
          className="rounded-circle me-2"
          style={{ width: 15, height: 15, background: color }}
        />
        <Card.Title as="p" className="mb-0 fw-bold">
          {name}
        </Card.Title>
      </div>
    </Button>
  );
};
export default StatusTitle;
