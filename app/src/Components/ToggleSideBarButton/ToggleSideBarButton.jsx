import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import useSideBar from "../../Hooks/useSideBar";
import { toggleSidebarAction } from "../../Redux/actions/ConfigActions";

const ToggleSideBarButton = () => {
  const { isMobileView } = useSelector((state) => state.Config);
  const { toggleMenuOpen, toggleSideBar } = useSideBar();

  const dispatch = useDispatch();

  const handleToggle = () => {
    dispatch(toggleSidebarAction());
    toggleSideBar();
  };

  return (
    <Button
      variant="link"
      className="d-flex text-secondary mb-0 ms-3"
      size="sm"
      onClick={isMobileView ? toggleMenuOpen : handleToggle}
    >
      <i className="material-icons">&#xe5d2;</i>
    </Button>
  );
};

export default ToggleSideBarButton;
