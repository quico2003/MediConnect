import { UserInfoTypes } from "../types/UserInfoTypes";

const initialState = {
  userName: "",
  userEmail: "",
  userAvatar: "",
};

const UserInfoReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case UserInfoTypes.TOGGLE_NAME_USER:
      return {
        ...state,
        userName: `${payload.firstName} ${payload.lastName}`,
      };
    case UserInfoTypes.TOGGLE_EMAIL_USER:
      return {
        ...state,
        userEmail: payload,
      };
    case UserInfoTypes.TOGGLE_AVATAR_USER:
      return {
        ...state,
        userAvatar: payload,
      };
    case UserInfoTypes.TOGGLE_CLEAR_ALL_USER:
      return {
        userName: initialState.userName,
        userEmail: initialState.userEmail,
        userAvatar: initialState.userAvatar
      };
    default:
      return state;
  }
};

export default UserInfoReducer;
