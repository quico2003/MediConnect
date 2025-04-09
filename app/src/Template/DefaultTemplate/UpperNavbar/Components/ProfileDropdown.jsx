import { Button, Dropdown } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import {
  EndpointsAdmin,
  getEndpoint,
} from "../../../../Constants/endpoints.contants";
import { Paths } from "../../../../Constants/paths.constants";
import { Views } from "../../../../Constants/views.constants";
import useRequest from "../../../../Hooks/useRequest";
import { useContext, useEffect, useState } from "react";
import useNotification from "../../../../Hooks/useNotification";
import useLoaded from "../../../../Hooks/useLoaded";
import { StringsContext } from "../../../../Context/strings.context";
import { StorageKeys } from "../../../../Constants/storekeys.constants";
import { useDispatch } from "react-redux";
import { toogleClearAllAdmin } from "../../../../Redux/actions/AdminInfoActions";
import { toogleClearAllUser } from "../../../../Redux/actions/UserInfoAction";

const ProfileDropdown = ({ role }) => {
  const { strings } = useContext(StringsContext);
  const ViewStrings = strings.ProfileDropdown;

  const request = useRequest();
  const dispatch = useDispatch();
  const { isMobileView } = useSelector((state) => state.Config);

  const { push, replace } = useHistory();
  const { showNotification: errorNotification } = useNotification();

  const profileAdmin = useSelector((state) => state.AdminInfo)
  const profileUser = useSelector((state) => state.UserInfo)

  const handleSignOut = () => {
    request("post", getEndpoint(EndpointsAdmin.Auth.logout))
      .then((res) => {
        localStorage.clear();
        if (role) {
          dispatch(toogleClearAllUser());
          replace(Paths[Views.login].path);
        } else {
          dispatch(toogleClearAllAdmin());
          replace(Paths[Views.loginAdmin].path);
        }
      })
      .catch((err) => errorNotification(err.message));
  };

  const handleOpenProfile = () => {
    if (!role) push(Paths[Views.profileView].path);

  }
  const handleOpenAccount = () => {
    if (!role) push(Paths[Views.accountView].path);
  }

  return (
    <>
      {/* Content */}
      {isMobileView ? (
        <Dropdown>
          <Dropdown.Toggle as={Button} variant="link">

            <img
              className="rounded-circle"
              src={
                profileAdmin.avatar ||
                `https://www.gravatar.com/avatar/${profileAdmin.name}?d=identicon`
              }
              alt={ViewStrings.Profile}
              width={25}
              height={25}
            />

          </Dropdown.Toggle>

          <Dropdown.Menu className="px-2">
            <Dropdown.Item
              className="rounded-3"
              as={Button}
              onClick={handleOpenProfile}
            >
              {ViewStrings.Profile}
            </Dropdown.Item>
            <Dropdown.Item
              className="rounded-3"
              as={Button}
              onClick={handleOpenAccount}
            >
              {ViewStrings.Account}
            </Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item
              as={Button}
              variant="danger"
              className="text-danger rounded-3"
              onClick={handleSignOut}
            >
              {ViewStrings.Logout}
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      ) : (
        <Dropdown>
          <Dropdown.Toggle as={Button} variant="link">

            <img
              className="rounded-circle"
              src={
                profileAdmin.avatar ||
                `https://www.gravatar.com/avatar/${role ? profileAdmin.userName : profileAdmin.name}?d=identicon`
              }
              alt={ViewStrings.Profile}
              width={25}
              height={25}
              style={{}}
            />
            <span className="ms-2">
              {role ?
                profileUser.userName : profileAdmin.name
              }
            </span>

          </Dropdown.Toggle>

          <Dropdown.Menu className="px-2">
            <Dropdown.Item
              className="rounded-3"
              as={Button}
              onClick={handleOpenProfile}
            >
              {ViewStrings.Profile}
            </Dropdown.Item>
            <Dropdown.Item
              className="rounded-3"
              as={Button}
              onClick={handleOpenAccount}
            >
              {ViewStrings.Account}
            </Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item
              as={Button}
              variant="danger"
              className="text-danger rounded-3"
              onClick={handleSignOut}
            >
              {ViewStrings.Logout}
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      )}
    </>
  );
};

export default ProfileDropdown;
