import classNames from "classnames";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { StorageKeys } from "../../Constants/storekeys.constants";

const Notification = ({
  title,
  description,
  read_at,
  created_at,
  action,
  extra_data,
}) => {
  const read = !!read_at;

  const { push } = useHistory();

  const [testMode, setTestMode] = useState(false);

  const handleClick = () => {
    switch (action) {
      case "redirect":
        redirectAction();
        break;
    }
  };

  const redirectAction = () => push(extra_data.path);

  const notClassName = classNames(
    "w-100 d-flex justify-content-between align-items-between p-2 border bg-gradient flex-column"
  );
  return (
    <Button
      onClick={handleClick}
      className={notClassName}
      style={{ borderRadius: 10 }}
      variant={read ? "outline-light" : "light"}
    >
      <div className="d-flex justify-content-start align-items-start flex-column mb-2">
        <div className="d-flex justify-content-start align-items-center w-100">
          <p className="text-start mb-0" style={{ fontWeight: 600 }}>
            {title}
          </p>
          {!read && <span className="text-danger fw-bold ms-1">●</span>}
        </div>
        <p className="mb-0 text-start">{description}</p>
      </div>
      <div className="d-flex justify-content-end w-100">
        <small className="text-muted">{created_at}</small>
      </div>
    </Button>
  );
};

export default Notification;
