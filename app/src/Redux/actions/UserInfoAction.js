import { UserInfoTypes } from "../types/UserInfoTypes";

export const toggleUserName = (payload) => ({
  type: UserInfoTypes.TOGGLE_NAME_USER,
  payload
});

export const toggleUserEmail = (payload) => ({
    type: UserInfoTypes.TOGGLE_EMAIL_USER,
  payload,
});

export const toggleUserAvatar = (payload) => ({
    type: UserInfoTypes.TOGGLE_AVATAR_USER,
  payload,
});
export const toogleClearAllUser = () => ({
    type: UserInfoTypes.TOGGLE_CLEAR_ALL_USER
});
