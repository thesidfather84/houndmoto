import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { track } from "../analytics";

function setMeta(title, description) {
  document.title = title;
  let desc = document.querySelector('meta[name="description"]');
  if (desc) desc.setAttribute("content", description);
}

export default function PartsPage() {
  const { partNum } = useParams();

  useEffect(() => {
    setMeta(
      "Parts Hunter — Cross-Reference OEM and Aftermarket Parts | HoundMoto",
      "HoundMoto Parts Hunter will help compare OEM and aftermarket part numbers, cross-reference compatible parts, and find trusted sources. Coming soon."
    );
    track("page_view", { page: "parts" });
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
        {partNum && (
          <div className="csPartNote">
            Searching for part: <strong>{partNum}</strong>
          </div>
        )}

        <div className="csIcon">🔩</div>
        <h1 className="csTitle">Parts Hunter</h1>
        <p className="csSubtitle">Coming Soon</p>

        <p className="csDesc">
          HoundMoto Parts Hunter will help you compare OEM and aftermarket part numbers,
          cross-reference compatible parts, and find trusted sources — all in one place.
        </p>

        <div className="csFeatureList">
          <div className="csFeature">
            <div className="csFeatureIcon">🔍</div>
            <div>
              <strong>Part Number Search</strong>
              <p>Search by OEM or aftermarket part number</p>
            </div>
          </div>
          <div className="csFeature">
            <div className="csFeatureIcon">🔄</div>
            <div>
              <strong>Cross-Reference</strong>
              <p>Find compatible aftermarket alternatives for OEM parts</p>
            </div>
          </div>
          <div className="csFeature">
            <div className="csFeatureIcon">🛒</div>
            <div>
              <strong>Trusted Sources</strong>
              <p>Compare parts from AutoZone, RockAuto, O'Reilly, and more</p>
            </div>
          </div>
          <div className="csFeature">
            <div className="csFeatureIcon">🚗</div>
            <div>
              <strong>Vehicle-Specific</strong>
              <p>Spark plugs, filters, sensors, belts, batteries, wipers, and bulbs</p>
            </div>
          </div>
        </div>

        <Link to="/" className="csActionBtn">Search HoundMoto Now →</Link>
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
