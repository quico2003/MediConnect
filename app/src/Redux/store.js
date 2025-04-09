import { combineReducers, createStore } from "redux";
import ConfigReducer from "./reducers/ConfigReducer";
import AdminInfoReducer from "./reducers/AdminInfoReducer";
import UserInfoReducer from "./reducers/UserInfoReducer";

const AllReducers = combineReducers({
  Config: ConfigReducer,
  AdminInfo: AdminInfoReducer,
  UserInfo: UserInfoReducer,
});

const store = createStore(
  AllReducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
