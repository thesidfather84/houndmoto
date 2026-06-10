import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import App from "./App.jsx";
import { AdminConsole } from "./AdminConsole.jsx";
import { AdminDashboard } from "./AdminDashboard.jsx";
import DtcPage from "./pages/DtcPage.jsx";
import DtcLandingPage from "./pages/DtcLandingPage.jsx";
import RightToRepairPage from "./pages/RightToRepairPage.jsx";
import VehiclePage from "./pages/VehiclePage.jsx";
import PartsPage from "./pages/PartsPage.jsx";
import DiagnosticAssistantPage from "./pages/DiagnosticAssistantPage.jsx";
import { TermsPage, PrivacyPage, DisclaimerPage, ContactPage } from "./LegalPages.jsx";

function LegalRoute({ Page }) {
  const navigate = useNavigate();
  return <Page onClose={() => navigate("/")} />;
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/dtc" element={<DtcLandingPage />} />
        <Route path="/dtc/:code" element={<DtcPage />} />
        <Route path="/right-to-repair" element={<RightToRepairPage />} />
        <Route path="/vehicle/:slug" element={<VehiclePage />} />
        <Route path="/parts/search" element={<PartsPage />} />
        <Route path="/parts/cross-reference/:partNum" element={<PartsPage />} />
        <Route path="/diagnostic-assistant" element={<DiagnosticAssistantPage />} />
        <Route path="/terms" element={<LegalRoute Page={TermsPage} />} />
        <Route path="/privacy" element={<LegalRoute Page={PrivacyPage} />} />
        <Route path="/disclaimer" element={<LegalRoute Page={DisclaimerPage} />} />
        <Route path="/contact" element={<LegalRoute Page={ContactPage} />} />
        <Route path="/admin" element={<AdminConsole />} />
        <Route path="/legacy-admin" element={<AdminDashboard />} />
        <Route path="*" element={<App />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
