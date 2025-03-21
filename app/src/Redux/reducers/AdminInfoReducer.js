import { AdminInfoTypes } from "../types/AdminInfoTypes";

const initialState = {
  name: "",
  email: "",
  avatar: "",
};

const AdminInfoReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case AdminInfoTypes.TOGGLE_NAME:
      return {
        ...state,
        name: payload,
      };
    case AdminInfoTypes.TOGGLE_EMAIL:
      return {
        ...state,
        email: payload,
      };
    case AdminInfoTypes.TOGGLE_AVATAR:
      return {
        ...state,
        avatar: payload,
      };
    case AdminInfoTypes.TOGGLE_CLEAR_ALL:
      return {
        name: initialState.name,
        email: initialState.email,
        avatar: initialState.avatar
      };
    default:
      return state;
  }
};

export default AdminInfoReducer;
