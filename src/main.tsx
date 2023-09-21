import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";

// si importa tutto il CSS
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
