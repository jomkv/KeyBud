import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./global.css";
import { ThemeProvider } from "@emotion/react";
import theme from "./theme";
import "bootstrap/dist/css/bootstrap.css";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
