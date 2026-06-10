import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { track } from "../analytics";
import { setPageSEO, resetPageSEO } from "../utils/seo";
import {
  getMakeCoverage,
  getModelGenerations,
  getModelDisplayName,
  slugify,
  charmSearchUrl,
} from "../utils/getVehicleCoverage";

export default function ModelPage() {
  const { make: makeSlug, model: modelSlug } = useParams();
  const mc         = getMakeCoverage(makeSlug);
  const generations = getModelGenerations(makeSlug, modelSlug);
  const modelName  = mc ? getModelDisplayName(mc, modelSlug) : modelSlug;
  const hasData    = generations.length > 0;

  const yearRange = hasData
    ? `${generations[generations.length - 1].yearStart}–${generations[0].yearEnd}`
    : null;

  useEffect(() => {
    const make  = mc?.make || makeSlug;
    const title = `${make} ${modelName}${yearRange ? ` (${yearRange})` : ""} — Specs, Problems & DTCs | HoundMoto`;
    const desc  = hasData
      ? `${make} ${modelName} common failures, oil specs, fluid capacities, DTC codes, and maintenance notes. Free from HoundMoto.`
      : `${make} ${modelName} vehicle guidance, common issues, and next steps. Free from HoundMoto.`;
    setPageSEO({ title, description: desc, path: `/vehicles/${makeSlug}/${modelSlug}` });
    track("page_view", { page: "model", make: makeSlug, model: modelSlug });
    return () => resetPageSEO();
  }, [makeSlug, modelSlug, mc, hasData, yearRange]);

  if (!mc) {
    return (
      <div className="makePage">
        <Navbar />
        <div className="makeContainer">
          <h1 className="makeTitle">{modelName}</h1>
          <p className="makeSub">No coverage data found for this make.</p>
          <Link to="/" className="makeBackLink">← Back to Search</Link>
        </div>
        <ModelFooter />
      </div>
    );
  }

  return (
    <div className="makePage">
      <Navbar />

      <div className="makeContainer">
        <nav className="dtcBreadcrumb">
          <Link to="/"                            className="dtcBreadLink">HoundMoto</Link>
          <span className="dtcBreadSep">›</span>
          <Link to="/vehicles"                    className="dtcBreadLink">Vehicles</Link>
          <span className="dtcBreadSep">›</span>
          <Link to={`/vehicles/${makeSlug}`}      className="dtcBreadLink">{mc.make}</Link>
          <span className="dtcBreadSep">›</span>
          <span>{modelName}</span>
        </nav>

        {/* Hero */}
        <div className="makeHero">
          <h1 className="makeTitle">{mc.make} {modelName}</h1>
          {yearRange && <p className="makeYearBadge">{yearRange}</p>}
          {!hasData && (
            <div className="modelFallbackNote">
              Detailed model-specific data for the {mc.make} {modelName} is still being expanded.
              Showing make-level guidance for {mc.make} below — this covers common issues that apply
              across most {mc.make} models.
            </div>
          )}
        </div>

        {/* Action cards */}
        <div className="makeActionRow">
          <Link
            to={`/diagnostic-assistant?make=${encodeURIComponent(mc.make)}&model=${encodeURIComponent(modelName)}`}
            className="makeAction"
          >
            <span className="makeActionIcon">🔧</span>
            <span>Diagnose a Problem</span>
          </Link>
          <Link
            to={`/dtc?make=${encodeURIComponent(mc.make)}&model=${encodeURIComponent(modelName)}`}
            className="makeAction"
          >
            <span className="makeActionIcon">💡</span>
            <span>Look Up DTC Code</span>
          </Link>
          <Link to="/vin-recall-check" className="makeAction">
            <span className="makeActionIcon">🛡️</span>
            <span>Check Safety Recalls</span>
          </Link>
          <Link
            to={`/dtc?make=${encodeURIComponent(mc.make)}&model=${encodeURIComponent(modelName)}`}
            className="makeAction"
          >
            <span className="makeActionIcon">🔍</span>
            <span>Vehicle DTC Lookup</span>
          </Link>
        </div>

        {/* Generation-specific data (if available) */}
        {hasData && generations.map((gen) => (
          <div key={`${gen.yearStart}-${gen.yearEnd}-${gen.engine}`} className="makeSection makeGenCard">
            <div className="makeGenHeader">
              <div className="makeGenBadge">{gen.yearStart}–{gen.yearEnd}</div>
              {gen.generation && <div className="makeGenCode">{gen.generation}</div>}
              {gen.engine && <div className="makeGenEngine">{gen.engine}</div>}
              {gen.confidenceLevel === "estimated" && (
                <div className="makeGenEstBadge">Estimated — verify before service</div>
              )}
            </div>

            <div className="makeGenGrid">
              {gen.oilType       && <GenItem label="Oil Type"              value={gen.oilType} />}
              {gen.oilCapacity   && <GenItem label="Oil Capacity"          value={gen.oilCapacity} />}
              {gen.coolantCapacity && <GenItem label="Coolant Capacity"    value={gen.coolantCapacity} />}
              {gen.transmissionFluid && <GenItem label="Trans Fluid"       value={gen.transmissionFluid} />}
              {gen.transmissionCapacity && <GenItem label="Trans Capacity" value={gen.transmissionCapacity} />}
              {gen.tireSize      && <GenItem label="Tire Size"             value={gen.tireSize} />}
              {gen.batteryGroup  && <GenItem label="Battery Group"         value={gen.batteryGroup} />}
              {gen.wipers        && <GenItem label="Wipers"                value={gen.wipers} />}
              {gen.bulbs         && <GenItem label="Bulbs"                 value={gen.bulbs} />}
            </div>

            {gen.commonFailures && (
              <div className="makeGenExtra">
                <div className="makeGenExtraLabel">Common Failures</div>
                <p className="makeGenExtraText">{gen.commonFailures}</p>
              </div>
            )}
            {gen.dtcNotes && (
              <div className="makeGenExtra">
                <div className="makeGenExtraLabel">Common DTCs</div>
                <p className="makeGenExtraText">{gen.dtcNotes}</p>
              </div>
            )}
            {gen.maintenanceNotes && (
              <div className="makeGenExtra">
                <div className="makeGenExtraLabel">Maintenance Notes</div>
                <p className="makeGenExtraText">{gen.maintenanceNotes}</p>
              </div>
            )}

            {/* Manual resources for this generation */}
            {gen.yearStart <= 2013 && mc.charmEligible && (
              <div className="makeGenExtra">
                <div className="makeGenExtraLabel">Manual Resource</div>
                <p className="makeGenExtraText">
                  Factory service manuals for this vehicle may be available via{" "}
                  <a
                    href={charmSearchUrl(mc.make, modelName, gen.yearStart)}
                    target="_blank"
                    rel="noreferrer"
                    className="makeExtLink"
                  >
                    Operation CHARM
                  </a>
                  . Link opens an external search — HoundMoto does not host manual content.
                </p>
              </div>
            )}
            {gen.yearStart > 2013 && (
              <div className="makeGenExtra">
                <div className="makeGenExtraLabel">Manual Resource</div>
                <p className="makeGenExtraText">
                  For newer vehicles, service manuals are available via AllData, Mitchell1,
                  Autodata, or your dealer's technical portal.
                </p>
              </div>
            )}

            {gen.notes && (
              <p className="makeGenNote">{gen.notes}</p>
            )}
          </div>
        ))}

        {/* Make-level fallback */}
        <div className="makeTwoCol">
          <div className="makeTechCol">
            <h2 className="makeSectionTitle">
              {hasData ? `${mc.make} General Guidance` : `${mc.make} — Known Issues & Guidance`}
            </h2>

            {mc.commonFailures?.length > 0 && (
              <div className="makeSection">
                <h3 className="makeSubSectionTitle">Known Failure Areas</h3>
                <ul className="makeList">
                  {mc.commonFailures.map((f, i) => <li key={i}>{f}</li>)}
                </ul>
              </div>
            )}

            {mc.dtcPatterns?.length > 0 && (
              <div className="makeSection">
                <h3 className="makeSubSectionTitle">Common DTC Patterns</h3>
                <ul className="makeList">
                  {mc.dtcPatterns.map((d, i) => <li key={i}>{d}</li>)}
                </ul>
              </div>
            )}

            {mc.maintenance?.length > 0 && (
              <div className="makeSection">
                <h3 className="makeSubSectionTitle">Maintenance Reminders</h3>
                <ul className="makeList">
                  {mc.maintenance.map((m, i) => <li key={i}>{m}</li>)}
                </ul>
              </div>
            )}

            {mc.checkFirst?.length > 0 && (
              <div className="makeSection">
                <h3 className="makeSubSectionTitle">What to Check First</h3>
                <ul className="makeList">
                  {mc.checkFirst.map((c, i) => <li key={i}>{c}</li>)}
                </ul>
              </div>
            )}
          </div>

          {/* Other models for this make */}
          <div className="makeModelsCol">
            <h2 className="makeSectionTitle">Other {mc.make} Models</h2>
            <div className="makeModelGrid">
              {(mc.models || [])
                .filter((m) => slugify(m) !== modelSlug)
                .slice(0, 12)
                .map((model) => (
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
            <Link to={`/vehicles/${mc.slug}`} className="makeViewAllLink">
              ← All {mc.make} models
            </Link>
          </div>
        </div>

        <div className="makeSafetyNote">
          <strong>Note:</strong> Data on this page is general guidance for {mc.make} {modelName} vehicles.
          Specs vary by year, trim, and engine. Always verify against your vehicle's service manual
          or a qualified technician before performing any repairs.
        </div>
      </div>

      <ModelFooter />
    </div>
  );
}

function GenItem({ label, value }) {
  return (
    <div className="makeGenItem">
      <div className="makeGenItemLabel">{label}</div>
      <div className="makeGenItemValue">{value}</div>
    </div>
  );
}

function ModelFooter() {
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
