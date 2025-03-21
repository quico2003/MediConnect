import { combineReducers, createStore } from "redux";
import ConfigReducer from "./reducers/ConfigReducer";
import AdminInfoReducer from "./reducers/AdminInfoReducer";

const AllReducers = combineReducers({
  Config: ConfigReducer,
  AdminInfo: AdminInfoReducer,
});

const store = createStore(
  AllReducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
