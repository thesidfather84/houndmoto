import { useEffect } from "react";
import { Link } from "react-router-dom";
import { DtcLookup } from "../components/DtcLookup";
import { VehicleDtcSearch } from "../components/VehicleDtcSearch";
import { track } from "../analytics";
import { setPageSEO, resetPageSEO } from "../utils/seo";

const POPULAR_CODES = [
  { code: "P0300", label: "Random Misfire" },
  { code: "P0420", label: "Catalyst Efficiency" },
  { code: "P0171", label: "System Lean Bank 1" },
  { code: "P0128", label: "Coolant Temp Low" },
  { code: "P0442", label: "EVAP Leak (Small)" },
  { code: "P0455", label: "EVAP Leak (Large)" },
  { code: "P0401", label: "EGR Flow Low" },
  { code: "P0011", label: "Cam Timing Bank 1" },
  { code: "P0016", label: "Cam/Crank Correlation" },
  { code: "P0301", label: "Cylinder 1 Misfire" },
  { code: "P0302", label: "Cylinder 2 Misfire" },
  { code: "P0340", label: "Cam Position Sensor" },
  { code: "P0335", label: "Crank Position Sensor" },
  { code: "P0700", label: "Transmission Fault" },
  { code: "P0172", label: "System Rich Bank 1" },
  { code: "P0174", label: "System Lean Bank 2" },
  { code: "P0457", label: "Gas Cap Loose" },
  { code: "P0507", label: "Idle RPM High" },
];

const CODE_SYSTEMS = [
  { prefix: "P", label: "P Codes — Powertrain", desc: "Engine, fuel, emissions, transmission", color: "#facc15" },
  { prefix: "B", label: "B Codes — Body", desc: "HVAC, air bags, power accessories", color: "#60a5fa" },
  { prefix: "C", label: "C Codes — Chassis", desc: "ABS, stability control, steering", color: "#4ade80" },
  { prefix: "U", label: "U Codes — Network", desc: "CAN bus, module communication", color: "#f472b6" },
];

export default function DtcLandingPage() {
  useEffect(() => {
    setPageSEO({
      title: "OBD-II DTC Code Lookup — Free Check Engine Code Information | HoundMoto",
      description: "Look up any OBD-II diagnostic trouble code free. Enter P, B, C, or U codes to get meaning, causes, symptoms, and fixes. No login required.",
      path: "/dtc",
    });
    track("page_view", { page: "dtc-landing" });
    return () => resetPageSEO();
  }, []);

  return (
    <div className="dtcPage">
      <header className="dtcNavbar">
        <Link to="/" className="dtcNavBrand">HoundMoto</Link>
        <nav className="dtcNavLinks">
          <Link to="/" className="dtcNavLink">Search</Link>
          <Link to="/dtc" className="dtcNavLink">DTC Lookup</Link>
          <Link to="/right-to-repair" className="dtcNavLink">Right to Repair</Link>
        </nav>
      </header>

      <div className="dtcContainer">
        <div className="dtcLandingHero">
          <h1 className="dtcLandingTitle">DTC Code Lookup</h1>
          <p className="dtcLandingSubtitle">
            Free OBD-II diagnostic trouble code information. Enter any code to get the meaning,
            causes, symptoms, and diagnostic steps.
          </p>
          <DtcLookup autoFocus />
        </div>

        {/* Vehicle-specific diagnosis form */}
        <div className="dtcLandingSection">
          <VehicleDtcSearch />
        </div>

        <div className="dtcSystemGrid">
          {CODE_SYSTEMS.map((s) => (
            <div key={s.prefix} className="dtcSystemCard">
              <div className="dtcSystemBadge" style={{ color: s.color, borderColor: s.color }}>
                {s.prefix}
              </div>
              <div className="dtcSystemLabel">{s.label}</div>
              <div className="dtcSystemDesc">{s.desc}</div>
            </div>
          ))}
        </div>

        <section className="dtcLandingSection">
          <h2 className="dtcLandingSectionTitle">Popular Codes</h2>
          <div className="dtcPopularGrid">
            {POPULAR_CODES.map(({ code, label }) => (
              <Link
                key={code}
                to={`/dtc/${code.toLowerCase()}`}
                className="dtcPopularCard"
              >
                <span className="dtcPopularCode">{code}</span>
                <span className="dtcPopularLabel">{label}</span>
              </Link>
            ))}
          </div>
        </section>

        <section className="dtcLandingSection">
          <h2 className="dtcLandingSectionTitle">About OBD-II Codes</h2>
          <div className="dtcAboutCard">
            <p>
              OBD-II (On-Board Diagnostics II) is the standardized system all vehicles sold in
              the United States since 1996 use to monitor and report engine and emissions system
              health. When the check engine light comes on, a diagnostic trouble code (DTC) is
              stored in the vehicle's computer.
            </p>
            <p>
              Codes have the format <strong>[Letter][4 digits]</strong> — for example P0300.
              The letter indicates the system: P for powertrain, B for body, C for chassis,
              U for network communication.
            </p>
            <p>
              HoundMoto provides DTC code information <strong>free with no login or paywall</strong>.
              Use the search box above to look up any code.
            </p>
            <p className="dtcAboutNote">
              A code alone does not confirm a diagnosis — it points to a system that needs
              investigation. Always verify before replacing parts.
            </p>
          </div>
        </section>
      </div>

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
    </div>
  );
}
