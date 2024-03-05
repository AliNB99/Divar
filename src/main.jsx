import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./styles/index.css";

import ShowContextProvider from "./context/ShowContextProvider.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
    <ShowContextProvider>
      <App />
    </ShowContextProvider>
  // </React.StrictMode>
);
