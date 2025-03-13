import { Dropdown } from "react-bootstrap";
import DropdownItem from "react-bootstrap/esm/DropdownItem";
import DropdownMenu from "react-bootstrap/esm/DropdownMenu";
import DropdownToggle from "react-bootstrap/esm/DropdownToggle";
import { MdMoreHoriz } from "react-icons/md";
import IconButton from "../Buttons/IconButton";

const StatusDropdown = () => {
  const ToggleButton = (e) => <IconButton Icon={MdMoreHoriz} {...e} />;

  return (
    <Dropdown align="end">
      <DropdownToggle variant="light" className="btn-icon p-0 hide-chevron">
        <IconButton Icon={MdMoreHoriz} />
      </DropdownToggle>

      <DropdownMenu className="mt-2">
        <DropdownItem href="#/action-1">Action 1</DropdownItem>
        <DropdownItem href="#/action-2">Another action</DropdownItem>
        <DropdownItem href="#/action-3">Something else</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default StatusDropdown;
