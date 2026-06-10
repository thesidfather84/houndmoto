import { useEffect } from "react";
import { useParams, Link, useSearchParams } from "react-router-dom";
import { getDtcInfo } from "../data/dtcData";
import { track } from "../analytics";
import { DtcLookup } from "../components/DtcLookup";
import { getVehicleSpecificDtc, parseVehicleParams } from "../utils/getVehicleSpecificDtc";
import { VehicleDtcSearch } from "../components/VehicleDtcSearch";
import { setPageSEO, resetPageSEO } from "../utils/seo";

const SEVERITY_LABEL = { high: "High", moderate: "Moderate", low: "Low" };
const SEVERITY_COLOR = { high: "#ef4444", moderate: "#f59e0b", low: "#22c55e" };

const SEVERITY_BADGE = {
  High:     { color: "#ef4444", bg: "#1c0a0a" },
  Moderate: { color: "#f59e0b", bg: "#1c1a10" },
  Low:      { color: "#22c55e", bg: "#0f1c0f" },
};

export default function DtcPage() {
  const { code } = useParams();
  const [searchParams] = useSearchParams();
  const dtc = getDtcInfo(code);

  // Read optional vehicle context from query params (?year=2011&make=Chevrolet…)
  const vehicle = parseVehicleParams(searchParams);
  const hasVehicle = vehicle.year || vehicle.make || vehicle.model;

  const vehicleMatch = hasVehicle
    ? getVehicleSpecificDtc({ ...vehicle, code })
    : null;

  useEffect(() => {
    if (dtc) {
      setPageSEO({
        title: `${dtc.code} Code Meaning, Causes, Symptoms, and Fixes | HoundMoto`,
        description: `Learn what code ${dtc.code} means, common causes, symptoms, diagnostic steps, and possible fixes. Free automotive repair information from HoundMoto.`,
        path: `/dtc/${code.toLowerCase()}`,
      });
      track("dtc_viewed", { code: dtc.code });
    } else {
      document.title = `DTC Code ${code?.toUpperCase()} | HoundMoto`;
    }
    return () => resetPageSEO();
  }, [code, dtc]);

  if (!dtc) {
    return (
      <div className="dtcPage">
        <Navbar />
        <div className="dtcContainer">
          <DtcLookup autoFocus />
          <div className="dtcNotFound">
            <h1>Code {code?.toUpperCase()} Not Recognized</h1>
            <p>That does not appear to be a valid OBD-II code format. Valid codes start with P, B, C, or U followed by 4 digits (e.g., P0300).</p>
            <Link to="/dtc" className="dtcBackLink">← DTC Lookup</Link>
          </div>
        </div>
        <DtcFooter />
      </div>
    );
  }

  const severityColor = SEVERITY_COLOR[dtc.severity] || "#f59e0b";

  return (
    <div className="dtcPage">
      <Navbar />

      {/* Structured data for Google */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "TechArticle",
        "headline": `${dtc.code}: ${dtc.title}`,
        "description": `What does ${dtc.code} mean? ${dtc.meaning.slice(0, 160)}`,
        "publisher": { "@type": "Organization", "name": "HoundMoto" },
        "mainEntityOfPage": { "@type": "WebPage", "@id": `https://www.houndmoto.com/dtc/${dtc.code.toLowerCase()}` },
      }) }} />

      <div className="dtcContainer">
        <nav className="dtcBreadcrumb">
          <Link to="/" className="dtcBreadLink">HoundMoto</Link>
          <span className="dtcBreadSep">›</span>
          <Link to="/dtc" className="dtcBreadLink">DTC Codes</Link>
          <span className="dtcBreadSep">›</span>
          <span>{dtc.code}</span>
        </nav>

        <DtcLookup className="dtcPageLookup" />

        {/* Vehicle-specific diagnosis card */}
        {hasVehicle && vehicleMatch && (
          <VehicleSpecificCard match={vehicleMatch} vehicle={vehicle} />
        )}
        {hasVehicle && !vehicleMatch && (
          <div className="vdsNoMatch">
            <div className="vdsNoMatchIcon">ℹ️</div>
            <div>
              <div className="vdsNoMatchTitle">Vehicle-specific guidance not available yet</div>
              <p className="vdsNoMatchText">
                Showing general DTC information for {dtc?.code}. Vehicle-specific guidance for{" "}
                {[vehicle.year, vehicle.make, vehicle.model].filter(Boolean).join(" ")} is not in
                the database yet. General causes and diagnostic steps are shown below.
              </p>
            </div>
          </div>
        )}
        {!hasVehicle && (
          <details className="vdsPrompt">
            <summary className="vdsPromptSummary">
              Have your vehicle info? Get vehicle-specific diagnosis →
            </summary>
            <div className="vdsPromptBody">
              <VehicleDtcSearch compact />
            </div>
          </details>
        )}

        <div className="dtcHeader">
          <div className="dtcCodeBadge">{dtc.code}</div>
          {dtc.isGeneric && <div className="dtcGenericNote">General code information — specific details vary by make and model</div>}
          <h1 className="dtcTitle">{dtc.title}</h1>

          <div className="dtcBadgeRow">
            <div className="dtcBadge" style={{ borderColor: severityColor, color: severityColor }}>
              Severity: {SEVERITY_LABEL[dtc.severity] || dtc.severity}
            </div>
            <div className="dtcBadge dtcDriveBadge">
              {dtc.canDrive}
            </div>
          </div>
        </div>

        <section className="dtcSection">
          <h2 className="dtcSectionTitle">What Does {dtc.code} Mean?</h2>
          <p className="dtcText">{dtc.meaning}</p>
        </section>

        {dtc.symptoms?.length > 0 && (
          <section className="dtcSection">
            <h2 className="dtcSectionTitle">Common Symptoms</h2>
            <ul className="dtcList">
              {dtc.symptoms.map((s, i) => <li key={i}>{s}</li>)}
            </ul>
          </section>
        )}

        {dtc.causes?.length > 0 && (
          <section className="dtcSection">
            <h2 className="dtcSectionTitle">Common Causes</h2>
            <ul className="dtcList">
              {dtc.causes.map((c, i) => <li key={i}>{c}</li>)}
            </ul>
          </section>
        )}

        {dtc.diagnostics?.length > 0 && (
          <section className="dtcSection">
            <h2 className="dtcSectionTitle">Diagnostic Steps</h2>
            <ol className="dtcList dtcListOrdered">
              {dtc.diagnostics.map((d, i) => <li key={i}>{d}</li>)}
            </ol>
          </section>
        )}

        {dtc.fixes?.length > 0 && (
          <section className="dtcSection">
            <h2 className="dtcSectionTitle">Common Fixes</h2>
            <ul className="dtcList">
              {dtc.fixes.map((f, i) => <li key={i}>{f}</li>)}
            </ul>
          </section>
        )}

        <div className="dtcMetaRow">
          <div className="dtcMetaCard">
            <div className="dtcMetaLabel">Repair Difficulty</div>
            <div className="dtcMetaValue">{dtc.difficulty}</div>
          </div>
        </div>

        {dtc.related?.length > 0 && (
          <section className="dtcSection">
            <h2 className="dtcSectionTitle">Related Codes</h2>
            <div className="dtcRelatedList">
              {dtc.related.map((r) => (
                <Link key={r} to={`/dtc/${r.toLowerCase()}`} className="dtcRelatedTag">{r}</Link>
              ))}
            </div>
          </section>
        )}

        <div className="dtcSafety">
          <div className="dtcSafetyTitle">Safety Note</div>
          <p>{dtc.safety}</p>
        </div>

        <div className="dtcDisclaimer">
          <strong>Disclaimer:</strong> HoundMoto provides general automotive information for educational purposes only.
          OBD-II codes have multiple possible causes. A code alone does not confirm a diagnosis.
          Always verify repairs against your vehicle's service manual. For safety-critical systems,
          consult a qualified automotive technician.
        </div>

        <div className="dtcActions">
          <Link to="/" className="dtcActionBtn dtcActionPrimary">← Search HoundMoto</Link>
          <a
            href={`https://www.google.com/search?q=${dtc.code}+${encodeURIComponent(dtc.title)}`}
            target="_blank"
            rel="noreferrer"
            className="dtcActionBtn dtcActionSecondary"
          >
            Search This Code →
          </a>
        </div>
      </div>

      <DtcFooter />
    </div>
  );
}

// ── Vehicle-specific card ─────────────────────────────────────────────────────

function VehicleSpecificCard({ match: m, vehicle }) {
  const vehicleStr = [vehicle.year, vehicle.make, vehicle.model, vehicle.engine]
    .filter(Boolean).join(" ");
  const sev = SEVERITY_BADGE[m.severity] || SEVERITY_BADGE.Moderate;

  return (
    <div className="vdsCard">
      <div className="vdsCardTop">
        <div className="vdsCardBadge">Common causes for your vehicle</div>
        <div className="vdsCardVehicle">{vehicleStr}</div>
        <div className="vdsCardTitle">{m.title}</div>
        <div className="vdsCardMeta">
          <span className="vdsCardSeverity" style={{ color: sev.color, background: sev.bg }}>
            {m.severity} severity
          </span>
          <span className="vdsCardDrive">{m.canDrive}</span>
        </div>
      </div>

      {m.likelyCauses?.length > 0 && (
        <div className="vdsCardSection">
          <div className="vdsCardSectionTitle">Likely causes — ranked</div>
          <ol className="vdsCardList vdsCardListOrdered">
            {m.likelyCauses.map((c, i) => <li key={i}>{c}</li>)}
          </ol>
        </div>
      )}

      {m.checkFirst?.length > 0 && (
        <div className="vdsCardSection">
          <div className="vdsCardSectionTitle">What to check first</div>
          <ol className="vdsCardList vdsCardListOrdered">
            {m.checkFirst.map((c, i) => <li key={i}>{c}</li>)}
          </ol>
        </div>
      )}

      {m.avoid?.length > 0 && (
        <div className="vdsCardSection vdsCardAvoidSection">
          <div className="vdsCardSectionTitle vdsCardAvoidTitle">What NOT to replace first</div>
          <ul className="vdsCardList">
            {m.avoid.map((a, i) => <li key={i}>{a}</li>)}
          </ul>
        </div>
      )}

      <div className="vdsCardFooter">
        General DTC information for {m.code} continues below.
      </div>
    </div>
  );
}

function Navbar() {
  return (
    <header className="dtcNavbar">
      <Link to="/" className="dtcNavBrand">HoundMoto</Link>
      <nav className="dtcNavLinks">
        <Link to="/" className="dtcNavLink">Search</Link>
        <Link to="/dtc" className="dtcNavLink dtcNavLinkActive">DTC Lookup</Link>
        <Link to="/right-to-repair" className="dtcNavLink">Right to Repair</Link>
      </nav>
    </header>
  );
}

function DtcFooter() {
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
