import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import MaterialTheme from "./MaterialTheme";
import { Provider } from "react-redux";
import { store } from "./app/store";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <Provider store={store}>
    <MaterialTheme>
      <RouterProvider router={router} />
    </MaterialTheme>
  </Provider>
);
