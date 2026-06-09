import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { AdminConsole } from "./AdminConsole.jsx";
import { AdminDashboard } from "./AdminDashboard.jsx";

const pathname = window.location.pathname;
const params = new URLSearchParams(window.location.search);

// /admin → PIN-protected server-side console
// ?admin=houndmoto → legacy browser-only localStorage dashboard
const isServerAdmin = pathname === "/admin";
const isLocalAdmin = params.get("admin") === "houndmoto";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {isServerAdmin ? <AdminConsole /> : isLocalAdmin ? <AdminDashboard /> : <App />}
  </StrictMode>
);
