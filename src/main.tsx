import App from "./App";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/index.css";

const element = document.getElementById("root");

element && createRoot(element).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
