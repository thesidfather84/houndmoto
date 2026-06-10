import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { track } from "../analytics";

function setMeta(title, description) {
  document.title = title;
  let desc = document.querySelector('meta[name="description"]');
  if (desc) desc.setAttribute("content", description);
}

function parseSlug(slug) {
  if (!slug) return null;
  const parts = slug.split("-");
  const yearIdx = parts.findIndex((p) => /^\d{4}$/.test(p));
  if (yearIdx === -1) return null;
  const year = parts[yearIdx];
  const rest = parts.slice(yearIdx + 1);
  if (rest.length < 2) return null;
  const make = rest[0].charAt(0).toUpperCase() + rest[0].slice(1);
  const model = rest.slice(1).map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
  return { year, make, model };
}

export default function VehiclePage() {
  const { slug } = useParams();
  const vehicle = parseSlug(slug);

  useEffect(() => {
    if (vehicle) {
      const title = `${vehicle.year} ${vehicle.make} ${vehicle.model} — Specs, Problems, Fluids | HoundMoto`;
      const desc = `${vehicle.year} ${vehicle.make} ${vehicle.model} common problems, fluid capacities, maintenance schedule, and DTC codes. Free vehicle information from HoundMoto.`;
      setMeta(title, desc);
      track("vehicle_page_viewed", { slug });
    }
    return () => { document.title = "HoundMoto — Auto Specs Search"; };
  }, [slug, vehicle]);

  if (!vehicle) {
    return (
      <PageShell>
        <div className="vpNotFound">
          <h1>Vehicle Not Found</h1>
          <p>Could not parse a vehicle from "{slug}". Expected format: /vehicle/2005-ford-f150</p>
          <Link to="/" className="vpBackLink">← Back to Search</Link>
        </div>
      </PageShell>
    );
  }

  return (
    <PageShell>
      <nav className="vpBreadcrumb">
        <Link to="/" className="vpBreadLink">HoundMoto</Link>
        <span> › </span>
        <span>Vehicles</span>
        <span> › </span>
        <span>{vehicle.year} {vehicle.make} {vehicle.model}</span>
      </nav>

      <div className="vpHeader">
        <h1 className="vpTitle">{vehicle.year} {vehicle.make} {vehicle.model}</h1>
        <p className="vpSubtitle">Vehicle information, common problems, and diagnostic reference</p>
      </div>

      <div className="vpSectionGrid">
        <VpCard title="Fluid Capacities" icon="🛢️">
          <VpDataRow label="Engine Oil" value="Data coming soon" />
          <VpDataRow label="Coolant" value="Data coming soon" />
          <VpDataRow label="Transmission Fluid" value="Data coming soon" />
          <VpDataRow label="Brake Fluid" value="Data coming soon" />
          <VpDataRow label="Power Steering" value="Data coming soon" />
          <p className="vpNote">
            Always verify against your owner's manual or door sticker.
            Specs vary by engine, trim, and production date.
          </p>
        </VpCard>

        <VpCard title="Maintenance" icon="🔧">
          <VpDataRow label="Oil Change Interval" value="Data coming soon" />
          <VpDataRow label="Spark Plugs" value="Data coming soon" />
          <VpDataRow label="Air Filter" value="Data coming soon" />
          <VpDataRow label="Cabin Filter" value="Data coming soon" />
          <VpDataRow label="Timing Belt/Chain" value="Data coming soon" />
        </VpCard>

        <VpCard title="Battery & Electrical" icon="🔋">
          <VpDataRow label="Battery Group" value="Data coming soon" />
          <VpDataRow label="CCA Rating" value="Data coming soon" />
          <VpDataRow label="Alternator Output" value="Data coming soon" />
        </VpCard>

        <VpCard title="Wipers & Bulbs" icon="💡">
          <VpDataRow label="Driver Wiper" value="Data coming soon" />
          <VpDataRow label="Passenger Wiper" value="Data coming soon" />
          <VpDataRow label="Rear Wiper" value="Data coming soon" />
          <VpDataRow label="Headlight Bulb" value="Data coming soon" />
        </VpCard>

        <VpCard title="Tires" icon="🔄">
          <VpDataRow label="OEM Tire Size" value="Data coming soon" />
          <VpDataRow label="Tire Pressure (F/R)" value="Data coming soon" />
          <VpDataRow label="Lug Nut Torque" value="Data coming soon" />
        </VpCard>

        <VpCard title="Common Recalls" icon="⚠️">
          <p className="vpComingSoon">
            Recall data coming soon. Check the <a
              href={`https://www.nhtsa.gov/vehicle/${vehicle.year}/${vehicle.make.toUpperCase()}/${vehicle.model.toUpperCase()}/2WD`}
              target="_blank"
              rel="noreferrer"
              className="vpExtLink"
            >NHTSA recall database</a> for current recall information.
          </p>
        </VpCard>
      </div>

      <section className="vpSection">
        <h2>Common Problems</h2>
        <div className="vpComingSoon">
          <p>Common failure data for the {vehicle.year} {vehicle.make} {vehicle.model} is being added.</p>
          <p>Search HoundMoto for specific symptoms or DTC codes related to this vehicle.</p>
          <Link to="/" className="vpSearchLink">Search for Problems →</Link>
        </div>
      </section>

      <section className="vpSection">
        <h2>Frequently Seen DTC Codes</h2>
        <div className="vpDtcHints">
          <p className="vpComingSoonText">Vehicle-specific common codes coming soon.</p>
          <div className="vpDtcQuickLinks">
            <Link to="/dtc/p0300" className="vpDtcTag">P0300 Misfire</Link>
            <Link to="/dtc/p0171" className="vpDtcTag">P0171 System Lean</Link>
            <Link to="/dtc/p0420" className="vpDtcTag">P0420 Catalyst</Link>
            <Link to="/dtc/p0128" className="vpDtcTag">P0128 Thermostat</Link>
            <Link to="/dtc/p0442" className="vpDtcTag">P0442 EVAP Leak</Link>
          </div>
        </div>
      </section>

      <div className="vpDisclaimer">
        HoundMoto does not fabricate vehicle specifications. Where exact data is not available,
        "Data coming soon" is shown. Always verify specs against your owner's manual.
      </div>

      <div className="vpActions">
        <Link to="/" className="vpActionBtn">← Search HoundMoto</Link>
      </div>
    </PageShell>
  );
}

function PageShell({ children }) {
  return (
    <div className="vpPage">
      <header className="vpNavbar">
        <Link to="/" className="vpNavBrand">HoundMoto</Link>
        <nav className="vpNavLinks">
          <Link to="/" className="vpNavLink">Search</Link>
          <Link to="/dtc/p0300" className="vpNavLink">DTC Codes</Link>
          <Link to="/right-to-repair" className="vpNavLink">Right to Repair</Link>
        </nav>
      </header>
      <div className="vpContainer">{children}</div>
      <footer className="vpFooter">
        <nav className="vpFooterLinks">
          <Link to="/terms" className="vpFooterLink">Terms</Link>
          <Link to="/privacy" className="vpFooterLink">Privacy</Link>
          <Link to="/disclaimer" className="vpFooterLink">Disclaimer</Link>
          <Link to="/contact" className="vpFooterLink">Contact</Link>
        </nav>
        <div className="vpFooterCopy">© {new Date().getFullYear()} HoundMoto. All Rights Reserved.</div>
      </footer>
    </div>
  );
}

function VpCard({ title, icon, children }) {
  return (
    <div className="vpCard">
      <div className="vpCardTitle"><span>{icon}</span> {title}</div>
      {children}
    </div>
  );
}

function VpDataRow({ label, value }) {
  return (
    <div className="vpDataRow">
      <span className="vpDataLabel">{label}</span>
      <span className="vpDataValue">{value}</span>
    </div>
  );
}
