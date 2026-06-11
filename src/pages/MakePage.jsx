import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { ActiveVehicleBar } from "../components/ActiveVehicleBar";
import { track } from "../analytics";
import { setPageSEO, resetPageSEO } from "../utils/seo";
import { getMakeCoverage, slugify } from "../utils/getVehicleCoverage";

export default function MakePage() {
  const { make: makeSlug } = useParams();
  const mc = getMakeCoverage(makeSlug);

  useEffect(() => {
    const title = mc
      ? `${mc.make} — Common Problems, DTC Codes & Maintenance | HoundMoto`
      : `${makeSlug} Vehicles | HoundMoto`;
    const desc = mc
      ? `${mc.make} common failures, engine DTC patterns, and maintenance guidance. ${mc.overview.slice(0, 100)}...`
      : `Vehicle coverage for ${makeSlug} on HoundMoto.`;
    setPageSEO({ title, description: desc, path: `/vehicles/${makeSlug}` });
    track("page_view", { page: "make", make: makeSlug });
    return () => resetPageSEO();
  }, [makeSlug, mc]);

  if (!mc) {
    return (
      <div className="makePage">
        <Navbar />
        <div className="makeContainer">
          <h1 className="makeTitle">{makeSlug}</h1>
          <p className="makeSub">No coverage data found for this make yet.</p>
          <Link to="/" className="makeBackLink">← Back to Search</Link>
        </div>
        <MakeFooter />
      </div>
    );
  }

  return (
    <div className="makePage">
      <Navbar />
      <ActiveVehicleBar secondary />

      <div className="makeContainer">
        <nav className="dtcBreadcrumb">
          <Link to="/" className="dtcBreadLink">HoundMoto</Link>
          <span className="dtcBreadSep">›</span>
          <Link to="/vehicles" className="dtcBreadLink">Vehicles</Link>
          <span className="dtcBreadSep">›</span>
          <span>{mc.make}</span>
        </nav>

        {/* Hero */}
        <div className="makeHero">
          <h1 className="makeTitle">{mc.make}</h1>
          <p className="makeSub">{mc.overview}</p>
        </div>

        {/* Action cards */}
        <div className="makeActionRow">
          <Link to={`/diagnostic-assistant?make=${encodeURIComponent(mc.make)}`} className="makeAction">
            <span className="makeActionIcon">🔧</span>
            <span>Diagnose a Problem</span>
          </Link>
          <Link to={`/dtc?make=${encodeURIComponent(mc.make)}`} className="makeAction">
            <span className="makeActionIcon">💡</span>
            <span>Look Up DTC Code</span>
          </Link>
          <Link to="/vin-recall-check" className="makeAction">
            <span className="makeActionIcon">🛡️</span>
            <span>Check Safety Recalls</span>
          </Link>
          {mc.charmEligible && (
            <a href="https://charm.li/" target="_blank" rel="noreferrer" className="makeAction">
              <span className="makeActionIcon">📖</span>
              <span>CHARM Manuals</span>
            </a>
          )}
        </div>

        <div className="makeTwoCol">
          {/* Left: technical data */}
          <div className="makeTechCol">

            {mc.commonEngines?.length > 0 && (
              <div className="makeSection">
                <h2 className="makeSectionTitle">Common Engines</h2>
                <ul className="makeList">
                  {mc.commonEngines.map((e, i) => <li key={i}>{e}</li>)}
                </ul>
              </div>
            )}

            {mc.dtcPatterns?.length > 0 && (
              <div className="makeSection">
                <h2 className="makeSectionTitle">Common DTC Patterns</h2>
                <ul className="makeList">
                  {mc.dtcPatterns.map((d, i) => <li key={i}>{d}</li>)}
                </ul>
              </div>
            )}

            {mc.commonFailures?.length > 0 && (
              <div className="makeSection">
                <h2 className="makeSectionTitle">Known Failure Areas</h2>
                <ul className="makeList">
                  {mc.commonFailures.map((f, i) => <li key={i}>{f}</li>)}
                </ul>
              </div>
            )}

            {mc.maintenance?.length > 0 && (
              <div className="makeSection">
                <h2 className="makeSectionTitle">Maintenance Reminders</h2>
                <ul className="makeList">
                  {mc.maintenance.map((m, i) => <li key={i}>{m}</li>)}
                </ul>
              </div>
            )}

            {mc.checkFirst?.length > 0 && (
              <div className="makeSection">
                <h2 className="makeSectionTitle">What to Check First</h2>
                <ul className="makeList">
                  {mc.checkFirst.map((c, i) => <li key={i}>{c}</li>)}
                </ul>
              </div>
            )}

            {mc.charmEligible && (
              <div className="makeSection makeManualSection">
                <h2 className="makeSectionTitle">Manual Resources</h2>
                <p className="makeManualNote">
                  For 1982–2013 {mc.make} vehicles, factory service manuals may be available
                  through the{" "}
                  <a href="https://charm.li/" target="_blank" rel="noreferrer" className="makeExtLink">
                    Operation CHARM archive
                  </a>
                  . For newer vehicles, service manuals are available via AllData, Mitchell1, or your dealer.
                </p>
              </div>
            )}

          </div>

          {/* Right: popular models */}
          <div className="makeModelsCol">
            <h2 className="makeSectionTitle">Popular Models</h2>
            <div className="makeModelGrid">
              {(mc.models || []).map((model) => (
                <Link
                  key={model}
                  to={`/vehicles/${mc.slug}/${slugify(model)}`}
                  className="makeModelCard"
                >
                  <div className="makeModelName">{model}</div>
                  <div className="makeModelArrow">→</div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="makeSafetyNote">
          <strong>Note:</strong> This page provides general guidance for {mc.make} vehicles.
          Specific data varies by model year, trim, and engine. Always verify against your
          vehicle's service manual or a qualified technician before performing repairs.
        </div>
      </div>

      <MakeFooter />
    </div>
  );
}

function MakeFooter() {
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
