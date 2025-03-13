import { ConfigTypes } from "../types/ConfigTypes";

export const toggleSidebarAction = () => ({
  type: ConfigTypes.TOGGLE_SIDEBAR,
});

export const setMobileViewAction = (payload) => ({
  type: ConfigTypes.SET_MOBILE_VIEW,
  payload,
});

export const setCurrentNavItemMenuSelectedAction = (payload) => ({
  type: ConfigTypes.SET_CURRENT_NAV_ITEM_MENU_SELECTED,
  payload,
});
