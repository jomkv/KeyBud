import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { SkeletonTheme } from "react-loading-skeleton";

import App from "./App";
import { store } from "./state/store";
import SocketContextProvider from "./context/SocketContext";
import "./global.css";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";
import "react-loading-skeleton/dist/skeleton.css";
import "./App.scss";
import { UserProvider } from "./context/UserContext";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <UserProvider>
        <SocketContextProvider>
          <SkeletonTheme baseColor="#3e3e3e" highlightColor="#696969">
            <App />
          </SkeletonTheme>
        </SocketContextProvider>
      </UserProvider>
    </Provider>
  </React.StrictMode>
);
