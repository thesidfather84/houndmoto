import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getDtcInfo } from "../data/dtcData";
import { track } from "../analytics";
import { DtcLookup } from "../components/DtcLookup";

const SEVERITY_LABEL = { high: "High", moderate: "Moderate", low: "Low" };
const SEVERITY_COLOR = { high: "#ef4444", moderate: "#f59e0b", low: "#22c55e" };

function setMeta(title, description) {
  document.title = title;
  let desc = document.querySelector('meta[name="description"]');
  if (desc) desc.setAttribute("content", description);
  let ogTitle = document.querySelector('meta[property="og:title"]');
  if (ogTitle) ogTitle.setAttribute("content", title);
  let ogDesc = document.querySelector('meta[property="og:description"]');
  if (ogDesc) ogDesc.setAttribute("content", description);
}

export default function DtcPage() {
  const { code } = useParams();
  const dtc = getDtcInfo(code);

  useEffect(() => {
    if (dtc) {
      setMeta(
        `${dtc.code} Code Meaning, Causes, Symptoms, and Fixes | HoundMoto`,
        `Learn what code ${dtc.code} means, common causes, symptoms, diagnostic steps, and possible fixes. Free automotive repair information from HoundMoto.`
      );
      track("dtc_viewed", { code: dtc.code });
    } else {
      document.title = `DTC Code ${code?.toUpperCase()} | HoundMoto`;
    }
    return () => {
      document.title = "HoundMoto — Auto Specs Search";
    };
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
