import { useState, useEffect, useRef } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { diagnose } from "../services/diagnosticService";
import { track } from "../analytics";
import { setPageSEO, resetPageSEO } from "../utils/seo";
import { getVehicleContext } from "../utils/vehicleContext";

const QUICK_SYMPTOMS = [
  "Rough idle when cold",
  "Check engine light on",
  "Engine won't start",
  "Overheating",
  "Transmission slipping",
  "Engine knocking sound",
  "Brakes grinding",
  "Stalling at idle",
];

export default function DiagnosticAssistantPage() {
  const [searchParams] = useSearchParams();
  const [year,    setYear]    = useState(() => searchParams.get("year")   || getVehicleContext()?.year   || "");
  const [make,    setMake]    = useState(() => searchParams.get("make")   || getVehicleContext()?.make   || "");
  const [model,   setModel]   = useState(() => searchParams.get("model")  || getVehicleContext()?.model  || "");
  const [engine,  setEngine]  = useState(() => searchParams.get("engine") || getVehicleContext()?.engine || "");
  const [problem, setProblem] = useState("");
  const [loading, setLoading] = useState(false);
  const [result,  setResult]  = useState(null);
  const [error,   setError]   = useState("");
  const problemRef = useRef(null);
  const resultRef  = useRef(null);

  useEffect(() => {
    setPageSEO({
      title: "AI Diagnostic Assistant — Vehicle Troubleshooting | HoundMoto",
      description: "Describe your vehicle symptoms and get ranked likely causes, first checks, and repair guidance. Free — no login required.",
      path: "/diagnostic-assistant",
    });
    track("page_view", { page: "diagnostic-assistant" });
    return () => resetPageSEO();
  }, []);

  // Detect if input is a DTC code vs a symptom description
  function detectType(text) {
    if (/^[PBCU]\d{4}$/i.test(text.trim())) return "dtc";
    return "symptom";
  }

  async function handleSubmit(e) {
    e?.preventDefault();
    const trimmed = problem.trim();
    if (!trimmed) {
      setError("Describe your symptoms or enter a DTC code like P0300.");
      problemRef.current?.focus();
      return;
    }
    setError("");
    setLoading(true);
    setResult(null);

    const type = detectType(trimmed);
    const vehicle = (year || make || model || engine)
      ? { year: year.trim(), make: make.trim(), model: model.trim(), engine: engine.trim() }
      : null;

    const context =
      type === "dtc"
        ? { dtcCode: trimmed.toUpperCase(), vehicle }
        : { symptoms: trimmed, vehicle };

    try {
      const res = await diagnose(type, context);
      setResult(res);
      track("diagnostic_request", { type, fallback: res.fallback, source: res.source });
      setTimeout(() => resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 100);
    } finally {
      setLoading(false);
    }
  }

  function handleQuickSymptom(sym) {
    setProblem(sym);
    setResult(null);
    setError("");
    setTimeout(() => problemRef.current?.focus(), 50);
  }

  return (
    <div className="diagPage">
      <Navbar />

      <div className="diagContainer">
        <nav className="dtcBreadcrumb">
          <Link to="/" className="dtcBreadLink">HoundMoto</Link>
          <span className="dtcBreadSep">›</span>
          <span>Diagnostic Assistant</span>
        </nav>

        <h1 className="diagTitle">Diagnostic Assistant</h1>
        <p className="diagSub">
          Describe your symptoms or enter a DTC code. Get ranked causes and diagnostic steps —
          free, no login required.
        </p>

        <form className="diagForm" onSubmit={handleSubmit}>
          {/* Optional vehicle context */}
          <fieldset className="diagVehicleRow">
            {(year || make || model) ? (
              <legend className="diagFieldLabel">
                Using vehicle: {[year, make, model].filter(Boolean).join(" ")}
                <button
                  type="button"
                  className="diagVehicleClearBtn"
                  onClick={() => { setYear(""); setMake(""); setModel(""); setEngine(""); }}
                >
                  Edit
                </button>
              </legend>
            ) : (
              <legend className="diagFieldLabel">Vehicle (optional — improves accuracy)</legend>
            )}
            <div className="diagVehicleInputs">
              <input
                className="diagInput diagInputSmall"
                placeholder="Year"
                maxLength={4}
                value={year}
                onChange={(e) => setYear(e.target.value)}
              />
              <input
                className="diagInput diagInputSmall"
                placeholder="Make"
                maxLength={30}
                value={make}
                onChange={(e) => setMake(e.target.value)}
              />
              <input
                className="diagInput diagInputMed"
                placeholder="Model"
                maxLength={40}
                value={model}
                onChange={(e) => setModel(e.target.value)}
              />
              <input
                className="diagInput diagInputMed"
                placeholder="Engine (e.g. 5.3L V8)"
                maxLength={30}
                value={engine}
                onChange={(e) => setEngine(e.target.value)}
              />
            </div>
          </fieldset>

          {/* Quick symptom chips */}
          <div className="diagQuickLabel">Quick select or type below:</div>
          <div className="diagQuickChips">
            {QUICK_SYMPTOMS.map((s) => (
              <button
                type="button"
                key={s}
                className={`diagChip${problem === s ? " diagChipActive" : ""}`}
                onClick={() => handleQuickSymptom(s)}
              >
                {s}
              </button>
            ))}
          </div>

          {/* Main problem input */}
          <label className="diagFieldLabel" htmlFor="diagProblem">
            Describe the problem or enter a DTC code
          </label>
          <textarea
            id="diagProblem"
            ref={problemRef}
            className="diagTextarea"
            placeholder="e.g. Rough idle when cold, check engine light, P0420, engine knocking, brakes grinding..."
            rows={4}
            maxLength={600}
            value={problem}
            onChange={(e) => { setProblem(e.target.value); setError(""); }}
          />
          {error && <div className="diagError">{error}</div>}

          <button className="diagSubmitBtn" type="submit" disabled={loading}>
            {loading ? "Diagnosing…" : "Diagnose"}
          </button>
        </form>

        {/* Loading */}
        {loading && (
          <div className="diagLoading">
            <span className="diagLoadingSpinner" />
            Analyzing symptoms…
          </div>
        )}

        {/* Result */}
        {result && !loading && (
          <div className="diagResult" ref={resultRef}>
            <SourceBadge source={result.source} fallback={result.fallback} />

            {result.urgency && result.urgency !== "unknown" && (
              <UrgencyBadge urgency={result.urgency} />
            )}

            {result.safetyNote && (
              <div className="diagSafetyNote">
                <span className="diagSafetyIcon">⚠️</span>
                {result.safetyNote}
              </div>
            )}

            {result.system && result.system !== "Unknown" && result.system !== "General" && (
              <div className="diagSystem">
                <span className="diagSystemLabel">System: </span>{result.system}
              </div>
            )}

            <div className="diagResponseText">
              <FormattedText text={result.text} />
            </div>

            {/* Always show supplemental links regardless of AI status */}
            <div className="diagToolLinks">
              <Link to={result.dtcLink || "/dtc"} className="diagToolLink diagToolLinkDtc">
                DTC Code Lookup →
              </Link>
              <Link to={result.recallLink || "/vin-recall-check"} className="diagToolLink diagToolLinkRecall">
                Check Safety Recalls →
              </Link>
            </div>

            <div className="diagDisclaimer">
              This is general automotive guidance, not a definitive diagnosis. Always verify before
              purchasing parts. For safety-critical systems — brakes, steering, airbags — consult
              a qualified mechanic.
            </div>

            <button
              className="diagNewBtn"
              onClick={() => { setResult(null); setProblem(""); setError(""); window.scrollTo({ top: 0, behavior: "smooth" }); }}
            >
              ← New Question
            </button>
          </div>
        )}
      </div>

      <DiagFooter />
    </div>
  );
}

// ── Sub-components ────────────────────────────────────────────────────────────

function SourceBadge({ source, fallback }) {
  if (fallback) {
    return (
      <div className="diagSourceBadge diagSourceRules">
        Rules-based guidance (AI not configured)
      </div>
    );
  }
  return (
    <div className="diagSourceBadge diagSourceAI">
      AI-assisted diagnosis
    </div>
  );
}

function UrgencyBadge({ urgency }) {
  const config = {
    high:     { label: "High Urgency",    cls: "diagUrgencyHigh"     },
    moderate: { label: "Moderate Urgency", cls: "diagUrgencyModerate" },
    low:      { label: "Low Urgency",     cls: "diagUrgencyLow"      },
  };
  const c = config[urgency];
  if (!c) return null;
  return <div className={`diagUrgency ${c.cls}`}>{c.label}</div>;
}

// Converts **bold** and bullet points in plain text to styled elements
function FormattedText({ text }) {
  if (!text) return null;
  const lines = text.split("\n");
  return (
    <div className="diagFormattedText">
      {lines.map((line, i) => {
        if (!line.trim()) return <br key={i} />;
        // Bullet points
        if (line.trimStart().startsWith("•")) {
          return (
            <div key={i} className="diagBullet">
              {renderInline(line.replace(/^[\s•]+/, ""))}
            </div>
          );
        }
        // Headings (lines ending in :)
        if (line.trimStart().startsWith("**") && line.includes(":**")) {
          return <div key={i} className="diagHeading">{renderInline(line)}</div>;
        }
        return <p key={i} className="diagPara">{renderInline(line)}</p>;
      })}
    </div>
  );
}

// Renders **bold** markers inline
function renderInline(text) {
  const parts = text.split(/\*\*(.+?)\*\*/g);
  return parts.map((part, i) =>
    i % 2 === 1 ? <strong key={i}>{part}</strong> : part
  );
}

function DiagFooter() {
  return (
    <footer className="dtcFooter">
      <nav className="dtcFooterLinks">
        <Link to="/terms"           className="dtcFooterLink">Terms</Link>
        <Link to="/privacy"         className="dtcFooterLink">Privacy</Link>
        <Link to="/disclaimer"      className="dtcFooterLink">Disclaimer</Link>
        <Link to="/contact"         className="dtcFooterLink">Contact</Link>
        <Link to="/right-to-repair" className="dtcFooterLink">Right to Repair</Link>
      </nav>
      <div className="dtcFooterCopy">© {new Date().getFullYear()} HoundMoto. All Rights Reserved.</div>
    </footer>
  );
}
