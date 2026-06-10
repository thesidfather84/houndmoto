import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { buildDtcUrl } from "../utils/getVehicleSpecificDtc";

const DTC_RE = /^[PBCU]\d{4}$/i;

const EXAMPLE_LOOKUPS = [
  { label: "2011 Silverado 5.3L P0420", year: "2011", make: "Chevrolet", model: "Silverado", engine: "5.3L V8", code: "P0420" },
  { label: "2010 F-150 5.4L P0171",     year: "2010", make: "Ford",      model: "F-150",     engine: "5.4L V8", code: "P0171" },
  { label: "2015 Wrangler 3.6L P0456",  year: "2015", make: "Jeep",      model: "Wrangler",  engine: "3.6L V6", code: "P0456" },
  { label: "2012 Camry 2.4L P0420",     year: "2012", make: "Toyota",    model: "Camry",     engine: "2.4L",    code: "P0420" },
];

export function VehicleDtcSearch({ compact = false }) {
  const navigate = useNavigate();
  const [year,   setYear]   = useState("");
  const [make,   setMake]   = useState("");
  const [model,  setModel]  = useState("");
  const [engine, setEngine] = useState("");
  const [code,   setCode]   = useState("");
  const [error,  setError]  = useState("");

  function handleSubmit(e) {
    e?.preventDefault();
    const cleanCode = code.trim().toUpperCase();
    if (!DTC_RE.test(cleanCode)) {
      setError("Enter a valid DTC code like P0420 or P0300.");
      return;
    }
    setError("");
    navigate(buildDtcUrl(cleanCode, { year: year.trim(), make: make.trim(), model: model.trim(), engine: engine.trim() }));
  }

  function applyExample(ex) {
    setYear(ex.year);
    setMake(ex.make);
    setModel(ex.model);
    setEngine(ex.engine);
    setCode(ex.code);
    setError("");
  }

  return (
    <div className={`vdsBox${compact ? " vdsBoxCompact" : ""}`}>
      {!compact && (
        <div className="vdsHeader">
          <div className="vdsBadge">Vehicle-Specific</div>
          <h2 className="vdsTitle">Get Diagnosis for Your Vehicle</h2>
          <p className="vdsSubtitle">
            Enter your vehicle and DTC code for causes and checks specific to your make, model, and engine —
            not just the generic code meaning.
          </p>
        </div>
      )}

      <form className="vdsForm" onSubmit={handleSubmit}>
        <div className="vdsInputGrid">
          <div className="vdsField">
            <label className="vdsLabel" htmlFor="vds-year">Year</label>
            <input
              id="vds-year"
              className="vdsInput"
              placeholder="e.g. 2011"
              maxLength={4}
              value={year}
              onChange={(e) => setYear(e.target.value.replace(/\D/g, ""))}
            />
          </div>
          <div className="vdsField">
            <label className="vdsLabel" htmlFor="vds-make">Make</label>
            <input
              id="vds-make"
              className="vdsInput"
              placeholder="e.g. Chevrolet"
              maxLength={30}
              value={make}
              onChange={(e) => setMake(e.target.value)}
            />
          </div>
          <div className="vdsField">
            <label className="vdsLabel" htmlFor="vds-model">Model</label>
            <input
              id="vds-model"
              className="vdsInput"
              placeholder="e.g. Silverado"
              maxLength={40}
              value={model}
              onChange={(e) => setModel(e.target.value)}
            />
          </div>
          <div className="vdsField">
            <label className="vdsLabel" htmlFor="vds-engine">Engine <span className="vdsLabelOptional">(optional)</span></label>
            <input
              id="vds-engine"
              className="vdsInput"
              placeholder="e.g. 5.3L V8"
              maxLength={30}
              value={engine}
              onChange={(e) => setEngine(e.target.value)}
            />
          </div>
          <div className="vdsField vdsFieldCode">
            <label className="vdsLabel" htmlFor="vds-code">DTC Code</label>
            <input
              id="vds-code"
              className="vdsInput vdsInputCode"
              placeholder="e.g. P0420"
              maxLength={6}
              value={code}
              spellCheck={false}
              autoCapitalize="characters"
              onChange={(e) => { setCode(e.target.value.toUpperCase()); setError(""); }}
              onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
            />
          </div>
        </div>

        {error && <div className="vdsError">{error}</div>}

        <button className="vdsBtn" type="submit">
          Get Vehicle-Specific Diagnosis →
        </button>
      </form>

      {!compact && (
        <div className="vdsExamples">
          <div className="vdsExamplesLabel">Try an example:</div>
          <div className="vdsExampleChips">
            {EXAMPLE_LOOKUPS.map((ex) => (
              <button
                type="button"
                key={ex.label}
                className="vdsExampleChip"
                onClick={() => applyExample(ex)}
              >
                {ex.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
