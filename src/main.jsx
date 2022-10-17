import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import "antd/dist/antd.css";
import HashConnectAPIProvider from "./hooks/useHashconnect";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HashConnectAPIProvider debug={true}>
      <App />
    </HashConnectAPIProvider>
  </React.StrictMode>
);
