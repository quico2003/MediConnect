import { ConfigTypes } from "../types/ConfigTypes";

const initialState = {
  sidebar: "maximised",
  isMobileView: false,
  currentNavItemSelected: "-1",
};

const ConfigReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ConfigTypes.TOGGLE_SIDEBAR:
      return {
        ...state,
        sidebar: state.sidebar === "maximised" ? "minimised" : "maximised",
      };
    case ConfigTypes.SET_MOBILE_VIEW:
      return {
        ...state,
        isMobileView: payload,
      };
    case ConfigTypes.SET_CURRENT_NAV_ITEM_MENU_SELECTED:
      return {
        ...state,
        currentNavItemSelected: payload,
      };
    default:
      return state;
  }
};

export default ConfigReducer;
