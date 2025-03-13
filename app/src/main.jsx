import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./Assets/styles/styles.scss";
import { Configuration } from "./Config/app.config";
import store from "./Redux/store";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter basename={Configuration.BASE_PATH}>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
);
