import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { ActiveVehicleBar } from "../components/ActiveVehicleBar";
import { DtcLookup } from "../components/DtcLookup";
import { track } from "../analytics";
import { setPageSEO, resetPageSEO } from "../utils/seo";

const PHASE2_FEATURES = [
  "Connect to a Bluetooth LE or WiFi OBD2 adapter",
  "Read stored (confirmed) trouble codes",
  "Read pending (not-yet-confirmed) codes",
  "Clear codes — with safety warning before clearing",
  "Live data: RPM, coolant temp, fuel trims, O2 sensor readings",
  "Live data: vehicle speed, intake air temp, MAF sensor",
  "Save scan session history to your device",
  "Send scan results into HoundMoto Diagnostic Assistant",
];

const PHASE3_FEATURES = [
  'Scan result auto-opens /dtc/p0300 for instant code lookup',
  'Auto-fills Diagnostic Assistant with your vehicle + code',
  'Query: /diagnostic-assistant?code=P0300 pre-populated',
];

const SCANNER_TYPES = [
  {
    title: "Bluetooth LE OBD2 Adapter",
    badge: "Android & iOS Apps",
    badgeColor: "#4ade80",
    desc: "Works with Android and iPhone via a companion mobile app. Use apps like Car Scanner, OBD Fusion, or Torque Pro. iPhone users need BLE-compatible adapters (not classic Bluetooth).",
    examples: ["Veepeak BLE OBD2", "FIXD Sensor", "BlueDriver"],
    note: "Best for in-app scanning. Does not connect to Safari or Chrome directly.",
  },
  {
    title: "WiFi OBD2 Adapter",
    badge: "iPhone Compatible",
    badgeColor: "#60a5fa",
    desc: "Creates a WiFi hotspot your phone connects to. Works well with iPhone apps since WiFi OBD2 bypasses iOS Bluetooth limitations.",
    examples: ["Veepeak WiFi OBD2", "OBDLink MX+ (WiFi mode)", "LELink WiFi"],
    note: "Best for iPhone. Connect phone to the adapter's WiFi network, then use a compatible app.",
  },
];

export default function Obd2ScanPage() {
  useEffect(() => {
    setPageSEO({
      title: "OBD2 Scanner — Read Trouble Codes & Live Data | HoundMoto",
      description: "Coming soon: connect an OBD2 Bluetooth or WiFi adapter to read stored codes, live engine data, and fuel trims. For now, enter your trouble code for free DTC lookup.",
      path: "/obd2-scan",
    });
    track("page_view", { page: "obd2-scan" });
    return () => resetPageSEO();
  }, []);

  return (
    <div className="obd2Page">
      <Navbar />
      <ActiveVehicleBar />

      <div className="obd2Container">

        {/* Hero */}
        <div className="obd2Hero">
          <div className="obd2Badge">Coming Soon</div>
          <h1 className="obd2Title">OBD2 Live Scanner</h1>
          <p className="obd2Subtitle">
            Connect an OBD2 Bluetooth or WiFi adapter to read stored codes, pending faults,
            and live engine data directly from your vehicle.
          </p>
          <p className="obd2Subtitle">
            Web Bluetooth support is limited and iPhone Safari does not reliably support standard
            Bluetooth OBD2 scanning. Full support will come via a dedicated mobile app.
          </p>
        </div>

        {/* DTC lookup — available now */}
        <section className="obd2Section">
          <h2 className="obd2SectionTitle">For now — enter your trouble code manually</h2>
          <p className="obd2SectionDesc">
            Already have your code from a handheld scanner? Look it up free:
          </p>
          <DtcLookup autoFocus={false} />
          <div className="obd2LinkRow">
            <Link to="/diagnostic-assistant" className="obd2Link">
              → Describe symptoms to Diagnostic Assistant
            </Link>
            <Link to="/vin-recall-check" className="obd2Link">
              → Check safety recalls by VIN
            </Link>
          </div>
        </section>

        {/* Recommended scanner types */}
        <section className="obd2Section">
          <h2 className="obd2SectionTitle">Recommended OBD2 Adapter Types</h2>
          <div className="obd2ScannerGrid">
            {SCANNER_TYPES.map((s) => (
              <div key={s.title} className="obd2ScannerCard">
                <div className="obd2ScannerTop">
                  <div className="obd2ScannerTitle">{s.title}</div>
                  <div
                    className="obd2ScannerBadge"
                    style={{ color: s.badgeColor, borderColor: s.badgeColor }}
                  >
                    {s.badge}
                  </div>
                </div>
                <p className="obd2ScannerDesc">{s.desc}</p>
                <div className="obd2ScannerExamples">
                  <span className="obd2ScannerExLabel">Examples: </span>
                  {s.examples.join(", ")}
                </div>
                <p className="obd2ScannerNote">{s.note}</p>
              </div>
            ))}
          </div>
          <div className="obd2Disclaimer">
            HoundMoto does not control third-party dongle accuracy or compatibility.
            Adapter performance varies by vehicle and device.
          </div>
        </section>

        {/* Phase 2 roadmap */}
        <section className="obd2Section">
          <h2 className="obd2SectionTitle">Phase 2 — Mobile App</h2>
          <div className="obd2PhaseCard">
            <div className="obd2PhaseNum">Phase 2</div>
            <div className="obd2PhaseName">HoundMoto Mobile App — OBD2 Integration</div>
            <ul className="obd2PhaseFeatures">
              {PHASE2_FEATURES.map((f, i) => (
                <li key={i}>{f}</li>
              ))}
            </ul>
          </div>
        </section>

        {/* Phase 3 roadmap */}
        <section className="obd2Section">
          <h2 className="obd2SectionTitle">Phase 3 — Scan-to-Diagnosis Workflow</h2>
          <div className="obd2PhaseCard">
            <div className="obd2PhaseNum">Phase 3</div>
            <div className="obd2PhaseName">Scan → DTC Lookup → Diagnostic Assistant</div>
            <ul className="obd2PhaseFeatures">
              {PHASE3_FEATURES.map((f, i) => (
                <li key={i}>{f}</li>
              ))}
            </ul>
          </div>
        </section>

      </div>

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
    </div>
  );
}
