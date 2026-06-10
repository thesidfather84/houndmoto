import { useEffect } from "react";
import { Link } from "react-router-dom";
import { track } from "../analytics";
import { setPageSEO, resetPageSEO } from "../utils/seo";

export default function RightToRepairPage() {
  useEffect(() => {
    setPageSEO({
      title: "Right to Repair — Vehicle Owners Deserve Access to Repair Information | HoundMoto",
      description: "HoundMoto supports the right of vehicle owners and independent mechanics to access repair information, diagnostic data, and maintenance guidance. Learn why repair freedom matters.",
      path: "/right-to-repair",
    });
    track("page_view", { page: "right-to-repair" });
    return () => resetPageSEO();
  }, []);

  return (
    <div className="rtrPage">
      <header className="rtrNavbar">
        <Link to="/" className="rtrNavBrand">HoundMoto</Link>
        <nav className="rtrNavLinks">
          <Link to="/" className="rtrNavLink">Search</Link>
          <Link to="/dtc/p0300" className="rtrNavLink">DTC Codes</Link>
          <Link to="/right-to-repair" className="rtrNavLink rtrNavLinkActive">Right to Repair</Link>
        </nav>
      </header>

      <div className="rtrContainer">
        <div className="rtrHero">
          <div className="rtrHeroTag">Consumer Information</div>
          <h1 className="rtrTitle">Right to Repair</h1>
          <p className="rtrSubtitle">
            Vehicle owners deserve access to repair information, diagnostic data,
            maintenance guidance, and the freedom to choose where their vehicle is repaired.
          </p>
        </div>

        <section className="rtrSection">
          <h2>What Is the Right to Repair?</h2>
          <p>
            The Right to Repair refers to the principle that consumers and independent repair
            professionals should have access to the information, tools, and parts needed to
            repair the products they own — including vehicles.
          </p>
          <p>
            For automotive repair, this means vehicle owners should have access to:
          </p>
          <ul>
            <li>Diagnostic trouble code (DTC) definitions and repair information</li>
            <li>Maintenance schedules and fluid specifications</li>
            <li>Wiring diagrams and repair procedures</li>
            <li>The freedom to have their vehicle repaired at any qualified shop</li>
            <li>The ability to perform their own maintenance and repairs</li>
          </ul>
        </section>

        <section className="rtrSection">
          <h2>Why Vehicle Repair Information Matters</h2>
          <p>
            Modern vehicles are increasingly complex — they contain dozens of electronic control
            modules, sensors, and networked systems. When a warning light comes on, understanding
            what it means is the first step to making an informed repair decision.
          </p>
          <p>
            Without access to repair information, vehicle owners face:
          </p>
          <ul>
            <li>Higher repair costs from limited competition</li>
            <li>Dependence on dealer-only diagnostic tools and software</li>
            <li>Difficulty finding qualified independent mechanics for certain repairs</li>
            <li>Inability to make informed decisions about their own vehicle</li>
          </ul>
        </section>

        <section className="rtrSection">
          <h2>Independent Mechanics and Repair Shops</h2>
          <p>
            Independent mechanics and small repair shops are an essential part of the automotive
            ecosystem. They serve communities across the country, often at more affordable rates
            than dealerships.
          </p>
          <p>
            For independent shops to compete effectively, they need access to the same diagnostic
            information, software updates, and repair data that dealers use. Restricting this
            information disadvantages consumers and limits repair choices.
          </p>
        </section>

        <section className="rtrSection">
          <h2>DIY Owners and Informed Ownership</h2>
          <p>
            Many vehicle owners perform their own oil changes, brake jobs, and routine maintenance.
            This is a legal, legitimate, and often economical approach to vehicle ownership.
          </p>
          <p>
            Access to repair information helps DIY owners:
          </p>
          <ul>
            <li>Understand what a warning light actually means before paying for a diagnosis</li>
            <li>Perform routine maintenance safely and correctly</li>
            <li>Evaluate repair quotes and understand what work is actually needed</li>
            <li>Make informed decisions about whether a repair is DIY-appropriate or requires a professional</li>
          </ul>
        </section>

        <section className="rtrSection">
          <h2>Modern Vehicles Depend on Software and Data</h2>
          <p>
            Today's vehicles rely heavily on software, firmware, and digital communication. Features
            like engine management, transmission control, anti-lock brakes, and electronic stability
            control all depend on software running in control modules.
          </p>
          <p>
            As vehicles become more software-dependent, access to diagnostic and calibration data
            becomes more critical. Many routine repairs — from replacing a throttle body to programming
            a new key — now require software access that was previously unnecessary.
          </p>
          <p>
            This trend makes open access to vehicle diagnostic information increasingly important
            for consumers and independent repair professionals.
          </p>
        </section>

        <section className="rtrSection">
          <h2>How HoundMoto Supports Repair Education</h2>
          <p>
            HoundMoto is an independent, free resource that provides vehicle owners with access to:
          </p>
          <ul>
            <li>OBD-II diagnostic trouble code definitions and repair information — free, no paywall</li>
            <li>Vehicle fluid specifications and maintenance data</li>
            <li>Symptom-based diagnostic guidance</li>
            <li>Links to repair manual resources</li>
          </ul>
          <p>
            HoundMoto's position is simple: <strong>diagnostic codes and basic repair information
            should be accessible to everyone</strong>. An informed vehicle owner makes better
            decisions — whether that means doing the repair themselves, finding a qualified
            independent shop, or understanding a dealership quote.
          </p>
          <p>
            We believe that access to automotive knowledge is a consumer right, not a premium feature.
          </p>
        </section>

        <section className="rtrSection rtrCallout">
          <h2>HoundMoto's Commitment</h2>
          <p>
            DTC codes on HoundMoto are and will remain <strong>completely free</strong>.
            No login. No payment. No paywall. Every code page is indexable by search engines
            so that anyone searching for automotive help can find it.
          </p>
          <p>
            We are an informational resource, not a subscription service. Our goal is to help
            vehicle owners understand their vehicles better.
          </p>
          <Link to="/" className="rtrSearchBtn">Search HoundMoto Free →</Link>
        </section>

        <div className="rtrDisclaimer">
          HoundMoto provides general automotive information for educational purposes only.
          For safety-critical repairs, consult a qualified automotive technician.
        </div>
      </div>

      <footer className="rtrFooter">
        <nav className="rtrFooterLinks">
          <Link to="/terms" className="rtrFooterLink">Terms</Link>
          <Link to="/privacy" className="rtrFooterLink">Privacy</Link>
          <Link to="/disclaimer" className="rtrFooterLink">Disclaimer</Link>
          <Link to="/contact" className="rtrFooterLink">Contact</Link>
        </nav>
        <div className="rtrFooterCopy">© {new Date().getFullYear()} HoundMoto. All Rights Reserved.</div>
      </footer>
    </div>
  );
}
