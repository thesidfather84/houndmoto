import { useState, useEffect, useRef } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { ActiveVehicleBar } from "../components/ActiveVehicleBar";
import { useVehicle } from "../context/VehicleContext";
import { track } from "../analytics";
import { setPageSEO, resetPageSEO } from "../utils/seo";

const VIN_RE = /^[A-HJ-NPR-Z0-9]{17}$/;
const DEV = import.meta.env.DEV;

function toTitleCase(str) {
  return (str || "").toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase());
}

// Returns array on success, null on 400 (model name mismatch), throws on network/5xx
async function fetchRecallsFor(make, model, year) {
  const url = `https://api.nhtsa.gov/recalls/recallsByVehicle?make=${encodeURIComponent(make)}&model=${encodeURIComponent(model)}&modelYear=${encodeURIComponent(year)}`;
  if (DEV) console.log("[HoundMoto] recall fetch →", url);
  const res = await fetch(url);
  if (DEV) console.log("[HoundMoto] recall status", res.status);
  if (res.status === 400) {
    if (DEV) console.log("[HoundMoto] recall 400 — no match for this make/model name");
    return null;
  }
  if (!res.ok) throw new Error(`Recall API returned HTTP ${res.status}`);
  const data = await res.json();
  if (DEV) console.log("[HoundMoto] recall results count:", data.results?.length ?? 0);
  return data.results || [];
}

export default function VinRecallPage() {
  const [searchParams] = useSearchParams();
  const { vehicle, setActiveVehicle } = useVehicle();

  // URL param takes precedence over context VIN
  const urlVin = (searchParams.get("vin") || "").toUpperCase().replace(/[IOQ\s]/g, "").slice(0, 17);
  const contextVin = vehicle?.vin || "";
  const initialVin = urlVin || contextVin;

  const [vin,        setVin]        = useState(initialVin);
  const [error,      setError]      = useState("");
  const [loading,    setLoading]    = useState(false);
  const [recallVehicle, setRecallVehicle] = useState(null);
  const [recalls,    setRecalls]    = useState(null);
  const [fetchError, setFetchError] = useState("");
  const didAutoCheck = useRef(false);

  useEffect(() => {
    setPageSEO({
      title: "VIN Recall Check — Free NHTSA Safety Recall Lookup | HoundMoto",
      description: "Enter your 17-character VIN to check open NHTSA safety recalls for free. Recall summaries, components affected, and dealer remedies — no login required.",
      path: "/vin-recall-check",
    });
    return () => resetPageSEO();
  }, []);

  // Auto-trigger when a valid VIN is available on mount
  useEffect(() => {
    if (initialVin && VIN_RE.test(initialVin) && !didAutoCheck.current) {
      didAutoCheck.current = true;
      doCheck(initialVin);
    }
  }, []); // eslint-disable-line

  function handleVinChange(e) {
    const val = e.target.value.toUpperCase().replace(/[IOQ\s]/g, "").slice(0, 17);
    setVin(val);
    setError("");
  }

  async function doCheck(vinStr) {
    const clean = (vinStr || "").trim();
    if (!VIN_RE.test(clean)) {
      setError(
        clean.length !== 17
          ? `VIN must be exactly 17 characters (you entered ${clean.length}).`
          : "Invalid VIN — check for typos. Letters I, O, and Q are not used in VINs."
      );
      return;
    }
    setError("");
    setFetchError("");
    setLoading(true);
    setRecallVehicle(null);
    setRecalls(null);

    try {
      const decodeRes = await fetch(
        `https://vpic.nhtsa.dot.gov/api/vehicles/DecodeVinValues/${clean}?format=json`
      );
      if (!decodeRes.ok) throw new Error("VIN decode failed");
      const decodeData = await decodeRes.json();
      const r = decodeData.Results?.[0];
      const year  = (r?.ModelYear || "").trim();
      const make  = (r?.Make || "").trim();
      const model = (r?.Model || "").trim();

      if (!year || !make || !model || year === "0") {
        setFetchError("Could not identify this vehicle. Verify the VIN is correct and try again.");
        setLoading(false);
        return;
      }

      if (DEV) console.log("[HoundMoto] VIN decoded:", { year, make, model });

      const decoded = { year, make, model };
      setRecallVehicle(decoded);
      track("vin_recall_check", { year, make, model });

      // Save to shared vehicle context
      setActiveVehicle({
        vin: clean,
        year,
        make,
        model,
        trim:      r?.Trim      || "",
        engine:    r?.DisplacementL ? `${parseFloat(r.DisplacementL).toFixed(1)}L` : "",
        source:    "vin_decode",
        decodedAt: new Date().toISOString(),
      });

      // Try recall lookup with original NHTSA values first
      let recalls = await fetchRecallsFor(make, model, year);

      // If 400 (no match), retry with normalized names
      if (recalls === null) {
        if (DEV) console.log("[HoundMoto] first recall call returned 400, retrying with normalized names");
        const makeTitleCase = toTitleCase(make);
        const modelTitleCase = toTitleCase(model);
        recalls = await fetchRecallsFor(makeTitleCase, modelTitleCase, year);
      }

      // If still null (second 400), treat as "no recalls found" instead of error
      if (recalls === null) {
        if (DEV) console.log("[HoundMoto] second recall call also returned 400, treating as no recalls");
        setRecalls([]);
      } else {
        setRecalls(recalls);
      }
    } catch (err) {
      if (DEV) console.error("[HoundMoto] VIN recall check failed:", err.message);
      setFetchError(
        "Recall data could not be reached right now. Try again later or check NHTSA directly at nhtsa.gov."
      );
    } finally {
      setLoading(false);
    }
  }

  function handleCheck() {
    doCheck(vin);
  }

  const charsLeft = 17 - vin.length;

  return (
    <div className="recallPage">
      <Navbar />
      <ActiveVehicleBar />

      <div className="recallContainer">
        <nav className="dtcBreadcrumb">
          <Link to="/" className="dtcBreadLink">HoundMoto</Link>
          <span className="dtcBreadSep">›</span>
          <span>VIN Recall Check</span>
        </nav>

        <h1 className="recallPageTitle">VIN Safety Recall Check</h1>
        <p className="recallPageSub">
          Enter your 17-character VIN to see open NHTSA safety recalls — free, no login required.
        </p>

        {/* Input card */}
        <div className="recallInputCard">
          <div className="recallInputRow">
            <input
              className="recallVinInput"
              placeholder="Enter 17-character VIN"
              maxLength={17}
              value={vin}
              spellCheck={false}
              autoCapitalize="characters"
              onChange={handleVinChange}
              onKeyDown={(e) => e.key === "Enter" && !loading && handleCheck()}
            />
            <button
              className="recallCheckBtn"
              onClick={handleCheck}
              disabled={loading || vin.length !== 17}
            >
              {loading ? "Checking…" : "Check Recalls"}
            </button>
          </div>

          {vin.length > 0 && vin.length < 17 && (
            <div className="recallVinMeta">
              {charsLeft} character{charsLeft !== 1 ? "s" : ""} remaining
            </div>
          )}
          {vin.length === 17 && !error && (
            <div className="recallVinMeta recallVinReady">VIN length valid — ready to check</div>
          )}
          {error && <div className="recallInputError">{error}</div>}

          <p className="recallVinHint">
            Find your VIN on the driver-side dashboard (visible through the windshield),
            door jamb sticker, your title, or insurance card.
            Letters I, O, and Q are never used in VINs.
          </p>
        </div>

        {fetchError && <div className="recallFetchError">{fetchError}</div>}

        {loading && (
          <div className="recallLoading">
            <span className="recallLoadingDots" />
            Decoding VIN and checking NHTSA recall database…
          </div>
        )}

        {/* Decoded vehicle */}
        {recallVehicle && !loading && (
          <div className="recallVehicleBadge">
            <div className="recallVehicleLabel">Vehicle identified</div>
            <div className="recallVehicleName">
              {recallVehicle.year} {recallVehicle.make} {recallVehicle.model}
            </div>
          </div>
        )}

        {/* Results */}
        {recalls !== null && !loading && (
          <div className="recallResults">
            {recalls.length === 0 ? (
              <div className="recallNone">
                <div className="recallNoneIcon">✓</div>
                <div className="recallNoneTitle">No open recalls found</div>
                <p className="recallNoneText">
                  No open safety recalls were found in public NHTSA data for this vehicle.
                  Recall applicability can vary by individual VIN even within the same
                  make, model, and year — confirm your specific VIN at{" "}
                  <a
                    href="https://www.nhtsa.gov/vehicle-safety/recalls"
                    target="_blank"
                    rel="noreferrer"
                    className="recallExtLink"
                  >
                    NHTSA.gov
                  </a>
                  .
                </p>
              </div>
            ) : (
              <>
                <div className="recallCount">
                  {recalls.length} safety recall{recalls.length !== 1 ? "s" : ""} found for{" "}
                  <strong>{recallVehicle?.year} {recallVehicle?.make} {recallVehicle?.model}</strong>
                </div>
                {recalls.map((r, i) => (
                  <RecallCard key={r.NHTSACampaignNumber || i} recall={r} />
                ))}
              </>
            )}

            <div className="recallDisclaimer">
              <strong>Disclaimer:</strong> This tool uses public NHTSA recall data searched by
              make, model, and year — not by individual VIN. Recall applicability can vary by
              specific VIN even within the same make, model, and year. Always confirm recall
              status and completion with NHTSA.gov or your manufacturer or dealer before making
              any repair decisions.
            </div>
          </div>
        )}

        {/* Pre-search info */}
        {recalls === null && !loading && !fetchError && (
          <div className="recallAbout">
            <h2 className="recallAboutTitle">About NHTSA Safety Recalls</h2>
            <p className="recallAboutText">
              Safety recalls are issued when a vehicle has a defect or fails to meet federal safety
              standards. Manufacturers are required to fix recall issues at no charge to you.
            </p>
            <ul className="recallAboutList">
              <li>Recall repairs are always <strong>free</strong> — dealers must fix them at no cost to you.</li>
              <li>An open recall means the repair has not been performed on your vehicle yet.</li>
              <li>Recalls can affect airbags, brakes, fuel systems, steering, software, and more.</li>
              <li>Your VIN is on your dashboard (driver side, visible through windshield), door jamb sticker, title, or insurance card.</li>
              <li>Data is provided by NHTSA — the National Highway Traffic Safety Administration.</li>
            </ul>
          </div>
        )}
      </div>

      <RecallFooter />
    </div>
  );
}

function RecallCard({ recall: r }) {
  return (
    <article className="recallCard">
      <div className="recallCardHeader">
        <span className="recallCampaign">NHTSA #{r.NHTSACampaignNumber}</span>
        {r.Component && <span className="recallComponent">{r.Component}</span>}
      </div>

      {r.Summary && (
        <div className="recallCardSection">
          <div className="recallCardLabel">Summary</div>
          <p className="recallCardText">{r.Summary}</p>
        </div>
      )}

      {r.Consequence && (
        <div className="recallCardSection recallConsequenceSection">
          <div className="recallCardLabel recallConsequenceLabel">Risk / Consequence</div>
          <p className="recallCardText">{r.Consequence}</p>
        </div>
      )}

      {r.Remedy && (
        <div className="recallCardSection">
          <div className="recallCardLabel">Remedy</div>
          <p className="recallCardText">{r.Remedy}</p>
        </div>
      )}

      {r.Notes && (
        <div className="recallCardSection">
          <div className="recallCardLabel">Notes</div>
          <p className="recallCardText recallCardNotes">{r.Notes}</p>
        </div>
      )}

      <div className="recallDealerNote">
        Contact a dealer to confirm recall status and completion for your specific VIN.
      </div>
    </article>
  );
}

function RecallFooter() {
  return (
    <footer className="dtcFooter">
      <nav className="dtcFooterLinks">
        <Link to="/terms" className="dtcFooterLink">Terms</Link>
        <Link to="/privacy" className="dtcFooterLink">Privacy</Link>
        <Link to="/disclaimer" className="dtcFooterLink">Disclaimer</Link>
        <Link to="/contact" className="dtcFooterLink">Contact</Link>
        <Link to="/right-to-repair" className="dtcFooterLink">Right to Repair</Link>
      </nav>
      <div className="dtcFooterCopy">© {new Date().getFullYear()} HoundMoto. All Rights Reserved.</div>
    </footer>
  );
}
