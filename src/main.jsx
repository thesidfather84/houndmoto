import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { AdminDashboard } from "./AdminDashboard.jsx";

const isAdmin = new URLSearchParams(window.location.search).get("admin") === "houndmoto";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {isAdmin ? <AdminDashboard /> : <App />}
  </StrictMode>
);
