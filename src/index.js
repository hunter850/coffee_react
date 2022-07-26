import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
// -------- Redux ------------
import store from "./app/store";
import { Provider } from "react-redux";
// ---------------------------

ReactDOM.createRoot(document.getElementById("root")).render(
    <Provider store={store}>
        <App />
    </Provider>
);
reportWebVitals();
