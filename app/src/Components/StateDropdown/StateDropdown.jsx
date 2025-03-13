import { useEffect, useMemo, useState } from "react";
import { Button, Card, Dropdown } from "react-bootstrap";
import DropdownItem from "react-bootstrap/esm/DropdownItem";
import DropdownMenu from "react-bootstrap/esm/DropdownMenu";
import DropdownToggle from "react-bootstrap/esm/DropdownToggle";
import { CopyStatus } from "../../Utils/CopyStatus";

const StateDropdown = ({ onClick, statusSelected }) => {
  const [selectedStatus, setSelectedStatus] = useState({});

  useEffect(() => {
    const currentStatusSelected = getStatusFromValue(statusSelected);
    setSelectedStatus(currentStatusSelected);
  }, []);

  const getStatusFromValue = (value) => {
    return CopyStatus.find((status) => status.value === value);
  };

  const handleType = (e) => {
    setSelectedStatus(getStatusFromValue(e));
    onClick && onClick(e);
  };

  const renderStatus = (item) => {
    return (
      <div className="px-3 py-1 d-flex justify-content-center">
        <Card.Title as="p" className="mb-0 fw-bold">
          {item.label}
        </Card.Title>
      </div>
    );
  };

  return (
    <Dropdown align="end">
      <DropdownToggle
        style={{ background: `${selectedStatus.color}50` }}
        variant="light"
        className="btn-icon p-0 hide-chevron rounded-4"
      >
        {useMemo(() => renderStatus(selectedStatus), [selectedStatus.value])}
      </DropdownToggle>
      <DropdownMenu className="px-2">
        {CopyStatus?.map((status, idx) => (
          <DropdownItem
            key={idx}
            variant="light"
            as={Button}
            onClick={() => handleType(status.value)}
            // style={{ background: `${status.color}50` }}
            className="btn-icon p-0 mb-1 rounded-4"
          >
            {useMemo(() => renderStatus(status), [])}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
};

export default StateDropdown;
