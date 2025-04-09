import { AdminInfoTypes } from "../types/AdminInfoTypes";

export const toggleAdminName = (payload) => ({
  type: AdminInfoTypes.TOGGLE_NAME,
  payload
});

export const toggleAdminEmail = (payload) => ({
  type: AdminInfoTypes.TOGGLE_EMAIL,
  payload,
});

export const toggleAdminAvatar = (payload) => ({
  type: AdminInfoTypes.TOGGLE_AVATAR,
  payload,
});
export const toogleClearAllAdmin = () => ({
  type: AdminInfoTypes.TOGGLE_CLEAR_ALL
});
