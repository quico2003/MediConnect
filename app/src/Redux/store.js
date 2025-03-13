import { combineReducers, createStore } from "redux";
import ConfigReducer from "./reducers/ConfigReducer";

const AllReducers = combineReducers({
  Config: ConfigReducer,
});

const store = createStore(
  AllReducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
