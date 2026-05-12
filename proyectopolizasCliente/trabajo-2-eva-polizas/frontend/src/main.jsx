import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ValidationContext } from "./ValidationContext.jsx";

const regexRules = {
  regexIdPoliza: /^ID\d{5}$/,
  regexMatricula: /^\d{4}[BCDFGHJKLMNPRSTVWXYZ]{3}$/,
};

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ValidationContext.Provider value={regexRules}>
      <App />
    </ValidationContext.Provider>
  </StrictMode>,
);
