import { useState } from "react";
import { CATEGORIES, TREES } from "./diagnosisWizardData";
import { track } from "./analytics";

export function SymptomDiagnosisWizard({ onClose }) {
  const [step, setStep] = useState("category");
  const [vehicle, setVehicle] = useState({ year: "", make: "", model: "" });
  const [category, setCategory] = useState(null);
  const [nodeId, setNodeId] = useState(null);
  const [history, setHistory] = useState([]);
  const [result, setResult] = useState(null);

  const tree = category ? TREES[category.id] : null;
  const node = tree && nodeId && tree.nodes[nodeId] ? tree.nodes[nodeId] : null;

  function selectCategory(cat) {
    track("symptom_selected", { category: cat.label });
    setCategory(cat);
    setStep("vehicle");
  }

  function startDiagnosis() {
    setNodeId(tree.start);
    setHistory([]);
    setResult(null);
    setStep("question");
  }

  function answer(opt) {
    const next = opt.next;
    setHistory((h) => [...h, nodeId]);
    if (tree.results[next]) {
      const res = tree.results[next];
      track("symptom_selected", { action: "result", category: category?.label, result: res.title });
      setResult(res);
      setStep("result");
    } else {
      setNodeId(next);
    }
  }

  function goBack() {
    if (step === "result") {
      const prev = history[history.length - 1];
      setHistory((h) => h.slice(0, -1));
      setNodeId(prev);
      setResult(null);
      setStep("question");
    } else if (step === "question" && history.length === 0) {
      setStep("vehicle");
    } else if (step === "question") {
      const prev = history[history.length - 1];
      setHistory((h) => h.slice(0, -1));
      setNodeId(prev);
    } else if (step === "vehicle") {
      setStep("category");
      setCategory(null);
    }
  }

  function restart() {
    setStep("category");
    setCategory(null);
    setNodeId(null);
    setHistory([]);
    setResult(null);
    setVehicle({ year: "", make: "", model: "" });
  }

  const vehicleLabel = [vehicle.year, vehicle.make, vehicle.model].filter(Boolean).join(" ");

  return (
    <main className="app">
      <div className="wzPage">

        <div className="wzTopBar">
          <button className="wzNavBtn" onClick={step === "category" ? onClose : goBack}>
            ← Back
          </button>
          <span className="brand" style={{ fontSize: "18px" }}>HoundMoto</span>
          <button className="wzNavBtn" onClick={onClose}>✕ Close</button>
        </div>

        {/* ── Category selection ── */}
        {step === "category" && (
          <div className="wzBody">
            <h2 className="wzTitle">What is your vehicle doing?</h2>
            <p className="wzSub">Choose the symptom that best matches.</p>
            <div className="wzCatGrid">
              {CATEGORIES.map((cat) => (
                <button key={cat.id} className="wzCatBtn" onClick={() => selectCategory(cat)}>
                  <span className="wzCatIcon">{cat.icon}</span>
                  <span className="wzCatLabel">{cat.label}</span>
                </button>
              ))}
            </div>
            <p className="wzDisclaimer">
              Educational guidance only — not certified repair advice. Always consult a qualified mechanic before
              working on safety-critical systems.
            </p>
          </div>
        )}

        {/* ── Vehicle info ── */}
        {step === "vehicle" && (
          <div className="wzBody">
            <div className="wzCatBadge">{category?.icon} {category?.label}</div>
            <h2 className="wzTitle">Your vehicle (optional)</h2>
            <p className="wzSub">Skip if unknown — the wizard works without it.</p>
            <div className="wzVehicleRow">
              <div className="wzField">
                <label>Year</label>
                <input type="text" placeholder="2015" maxLength={4}
                  value={vehicle.year} onChange={(e) => setVehicle((v) => ({ ...v, year: e.target.value }))} />
              </div>
              <div className="wzField">
                <label>Make</label>
                <input type="text" placeholder="Ford" maxLength={30}
                  value={vehicle.make} onChange={(e) => setVehicle((v) => ({ ...v, make: e.target.value }))} />
              </div>
              <div className="wzField">
                <label>Model</label>
                <input type="text" placeholder="F-150" maxLength={40}
                  value={vehicle.model} onChange={(e) => setVehicle((v) => ({ ...v, model: e.target.value }))} />
              </div>
            </div>
            <button className="wzStartBtn" onClick={startDiagnosis}>
              Start Diagnosis →
            </button>
          </div>
        )}

        {/* ── Question ── */}
        {step === "question" && node && (
          <div className="wzBody">
            {vehicleLabel && <div className="wzVehicleBadge">{vehicleLabel}</div>}
            <div className="wzProgress">{category?.icon} {category?.label} — Step {history.length + 1}</div>
            <h2 className="wzQuestion">{node.question}</h2>
            <div className="wzOptions">
              {node.options.map((opt, i) => (
                <button key={i} className="wzOptionBtn" onClick={() => answer(opt)}>
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ── Result ── */}
        {step === "result" && result && (
          <div className="wzBody">
            {vehicleLabel && <div className="wzVehicleBadge">{vehicleLabel}</div>}
            <div className="wzProgress">{category?.icon} {category?.label}</div>

            <div className="wzResult">
              <div className="wzResultTitle">{result.title}</div>
              {result.probability && !result.probability.includes("required") && (
                <div className="wzProbability">Likelihood: {result.probability}</div>
              )}
              <p className="wzResultWhy">{result.why}</p>

              {result.firstChecks?.length > 0 && (
                <div className="wzSection">
                  <div className="wzSectionTitle">✓ First Checks</div>
                  <ul className="wzList">
                    {result.firstChecks.map((c, i) => <li key={i}>{c}</li>)}
                  </ul>
                </div>
              )}

              {result.tools?.length > 0 && (
                <div className="wzSection">
                  <div className="wzSectionTitle">🔧 Tools Needed</div>
                  <ul className="wzList">
                    {result.tools.map((t, i) => <li key={i}>{t}</li>)}
                  </ul>
                </div>
              )}

              {result.safety?.length > 0 && (
                <div className="wzSection wzSafetyBox">
                  <div className="wzSectionTitle">⚠️ Safety</div>
                  <ul className="wzList">
                    {result.safety.map((s, i) => <li key={i}>{s}</li>)}
                  </ul>
                </div>
              )}

              {result.dtcCodes?.length > 0 && (
                <div className="wzSection">
                  <div className="wzSectionTitle">Related DTC Codes</div>
                  <div className="wzDtcRow">
                    {result.dtcCodes.map((code) => (
                      <span key={code} className="wzDtcBadge">{code}</span>
                    ))}
                  </div>
                </div>
              )}

              {result.professionalHelp && (
                <div className="wzSection wzProBox">
                  <div className="wzSectionTitle">🔑 When to Seek a Mechanic</div>
                  <p style={{ margin: 0, color: "#cbd5e1", fontSize: "14px", lineHeight: "1.55" }}>
                    {result.professionalHelp}
                  </p>
                </div>
              )}

              <p className="wzDisclaimer">
                This is educational guidance only and not certified repair advice. HoundMoto is not responsible
                for actions taken based on this wizard. Always verify with a qualified mechanic before performing
                repairs on brakes, suspension, fuel, electrical, or any safety-critical system.
              </p>

              <div className="wzResultActions">
                <button className="wzRestartBtn" onClick={restart}>Start Over</button>
                <button className="wzNavBtn" onClick={goBack}>← Back</button>
              </div>
            </div>
          </div>
        )}

      </div>
    </main>
  );
}
