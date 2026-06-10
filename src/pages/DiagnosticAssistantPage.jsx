import { useEffect } from "react";
import { Link } from "react-router-dom";
import { track } from "../analytics";

function setMeta(title, description) {
  document.title = title;
  let desc = document.querySelector('meta[name="description"]');
  if (desc) desc.setAttribute("content", description);
}

export default function DiagnosticAssistantPage() {
  useEffect(() => {
    setMeta(
      "AI Diagnostic Assistant — Smart Vehicle Troubleshooting | HoundMoto",
      "HoundMoto's Diagnostic Assistant will help you diagnose vehicle problems by asking follow-up questions like an experienced mechanic. Coming soon."
    );
    track("page_view", { page: "diagnostic-assistant" });
    return () => { document.title = "HoundMoto — Auto Specs Search"; };
  }, []);

  return (
    <div className="comingSoonPage">
      <header className="csNavbar">
        <Link to="/" className="csNavBrand">HoundMoto</Link>
        <nav className="csNavLinks">
          <Link to="/" className="csNavLink">Search</Link>
          <Link to="/dtc/p0300" className="csNavLink">DTC Codes</Link>
          <Link to="/right-to-repair" className="csNavLink">Right to Repair</Link>
        </nav>
      </header>

      <div className="csContainer">
        <div className="csIcon">🔬</div>
        <h1 className="csTitle">AI Diagnostic Assistant</h1>
        <p className="csSubtitle">Coming Soon</p>

        <p className="csDesc">
          HoundMoto's Diagnostic Assistant will ask follow-up questions like an experienced mechanic —
          helping you narrow down vehicle problems, rank likely causes, and decide on next steps.
        </p>

        <div className="csFeatureList">
          <div className="csFeature">
            <div className="csFeatureIcon">🗣️</div>
            <div>
              <strong>Guided Diagnosis</strong>
              <p>Enter your vehicle, symptoms, warning lights, or DTC codes</p>
            </div>
          </div>
          <div className="csFeature">
            <div className="csFeatureIcon">🧠</div>
            <div>
              <strong>Smart Follow-Up Questions</strong>
              <p>Asks the right questions to narrow down the cause — like a real mechanic would</p>
            </div>
          </div>
          <div className="csFeature">
            <div className="csFeatureIcon">📊</div>
            <div>
              <strong>Probability Ranking</strong>
              <p>Ranks likely causes from most to least probable based on your answers</p>
            </div>
          </div>
          <div className="csFeature">
            <div className="csFeatureIcon">🛠️</div>
            <div>
              <strong>Next Steps</strong>
              <p>Suggests specific diagnostic tests before recommending any part replacement</p>
            </div>
          </div>
          <div className="csFeature">
            <div className="csFeatureIcon">📸</div>
            <div>
              <strong>Photo Support</strong>
              <p>Upload photos of warning lights, fluid leaks, or damage for better guidance</p>
            </div>
          </div>
        </div>

        <div className="csFreeNote">
          No paywall. No login required.
        </div>

        <p className="csDesc" style={{ marginTop: "16px" }}>
          While the full assistant is being built, use HoundMoto's existing{" "}
          <Link to="/" className="csInlineLink">symptom diagnosis wizard</Link>{" "}
          on the search page for guided troubleshooting today.
        </p>

        <Link to="/" className="csActionBtn">Try Symptom Diagnosis Now →</Link>
      </div>

      <footer className="csFooter">
        <nav className="csFooterLinks">
          <Link to="/terms" className="csFooterLink">Terms</Link>
          <Link to="/privacy" className="csFooterLink">Privacy</Link>
          <Link to="/disclaimer" className="csFooterLink">Disclaimer</Link>
          <Link to="/contact" className="csFooterLink">Contact</Link>
        </nav>
        <div className="csFooterCopy">© {new Date().getFullYear()} HoundMoto. All Rights Reserved.</div>
      </footer>
    </div>
  );
}
