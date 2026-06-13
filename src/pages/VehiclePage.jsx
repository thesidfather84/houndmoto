import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { track } from "../analytics";
import { setPageSEO, resetPageSEO } from "../utils/seo";
import {
  getVehicleBySlug,
  getVehicleSpecs,
  getCommonFailures,
  getVehicleDTC,
  getDataQuality,
} from "../utils/vehicleDataLoader";

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
  const [vehicleData, setVehicleData] = useState(null);
  const [generation, setGeneration] = useState(null);
  const [specs, setSpecs] = useState(null);
  const [failures, setFailures] = useState([]);
  const [dtcCodes, setDtcCodes] = useState([]);
  const [dataQuality, setDataQuality] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    if (vehicle && slug) {
      try {
        // Try to load from new vehicles.json
        // Construct make-model slug (without year) for lookup
        const makeModelSlug = `${vehicle.make.toLowerCase()}-${vehicle.model.toLowerCase().replace(/\s+/g, "-")}`;
        const loadedVehicle = getVehicleBySlug(makeModelSlug);

        if (loadedVehicle) {
          // Keep the full URL slug for display
          setVehicleData({ ...loadedVehicle, urlSlug: slug });

          // Find generation for this year
          if (loadedVehicle.generations && loadedVehicle.generations.length > 0) {
            const gen = loadedVehicle.generations.find(
              (g) => g.yearStart <= vehicle.year && g.yearEnd >= vehicle.year
            );

            if (gen) {
              setGeneration(gen);
              setSpecs(getVehicleSpecs(loadedVehicle, gen));
              setFailures(getCommonFailures(loadedVehicle, gen));
              setDtcCodes(getVehicleDTC(loadedVehicle, vehicle.year));
              setDataQuality(getDataQuality(loadedVehicle, gen));
            }
          }
        }
      } catch (err) {
        console.error("[VehiclePage] Error loading vehicle data:", err);
      }
    }
    setLoading(false);
  }, [slug, vehicle]);

  useEffect(() => {
    if (vehicle) {
      setPageSEO({
        title: `${vehicle.year} ${vehicle.make} ${vehicle.model} — Specs, Problems, Fluids | HoundMoto`,
        description: `${vehicle.year} ${vehicle.make} ${vehicle.model} common problems, fluid capacities, maintenance schedule, and DTC codes. Free vehicle information from HoundMoto.`,
        path: `/vehicle/${slug}`,
      });
      track("vehicle_page_viewed", { slug });
    }
    return () => resetPageSEO();
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

      {/* Data Quality & Coverage Indicator */}
      {dataQuality && (
        <div className="vpDataQuality">
          <span className={`vpQualityBadge quality-${dataQuality.source}`}>
            {dataQuality.source === 'json' ? '✅ Enriched Data' : '⚠️ Limited Data'}
          </span>
          {vehicleData?.data_status && (
            <span className={`vpCoverageBadge coverage-${vehicleData.data_status}`}>
              {vehicleData.data_status === 'enriched' ? '📊 Complete Coverage' : '🚧 Expanding Coverage'}
            </span>
          )}
          <span className="vpConfidenceBadge">{dataQuality.confidence}</span>
          {!dataQuality.hasSpecs && (
            <span className="vpWarning">📝 Specs incomplete — verify in owner's manual</span>
          )}
        </div>
      )}

      <div className="vpSectionGrid">
        <VpCard title="Fluid Capacities" icon="🛢️">
          {specs ? (
            <>
              <VpDataRow label="Engine Oil" value={specs.oil?.capacity || "N/A"} />
              <VpDataRow label="Oil Type" value={specs.oil?.type || "Verify manual"} />
              <VpDataRow label="Coolant" value={specs.coolant?.capacity || "N/A"} />
              <VpDataRow label="Transmission Fluid" value={specs.transmission?.fluid || "N/A"} />
              <VpDataRow label="Trans. Capacity" value={specs.transmission?.capacity || "N/A"} />
            </>
          ) : (
            <>
              <VpDataRow label="Engine Oil" value="Data not available" />
              <VpDataRow label="Coolant" value="Data not available" />
              <VpDataRow label="Transmission Fluid" value="Data not available" />
            </>
          )}
          <p className="vpNote">
            Always verify against your owner's manual or door sticker.
            Specs vary by engine, trim, and production date.
          </p>
        </VpCard>

        <VpCard title="Maintenance" icon="🔧">
          {specs ? (
            <>
              {generation?.maintenanceNotes && (
                <p className="vpMaintenanceNotes">{generation.maintenanceNotes}</p>
              )}
            </>
          ) : (
            <p className="vpDataNotAvailable">Maintenance data not available yet.</p>
          )}
        </VpCard>

        <VpCard title="Battery & Electrical" icon="🔋">
          {specs ? (
            <>
              <VpDataRow label="Battery Group" value={specs.battery?.group || "N/A"} />
            </>
          ) : (
            <VpDataRow label="Battery Group" value="Data not available" />
          )}
        </VpCard>

        <VpCard title="Wipers & Bulbs" icon="💡">
          {specs ? (
            <>
              <VpDataRow label="Wiper Sizes" value={specs.wipers || "N/A"} />
              <VpDataRow label="Bulbs" value={specs.bulbs || "Verify by trim"} />
            </>
          ) : (
            <>
              <VpDataRow label="Wiper Sizes" value="Data not available" />
              <VpDataRow label="Bulbs" value="Data not available" />
            </>
          )}
        </VpCard>

        <VpCard title="Tires" icon="🔄">
          {specs ? (
            <>
              <VpDataRow label="OEM Tire Size" value={specs.tire?.size || "Verify door sticker"} />
            </>
          ) : (
            <VpDataRow label="OEM Tire Size" value="Data not available" />
          )}
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
        {failures && failures.length > 0 ? (
          <div className="vpFailuresList">
            {failures.map((failure, idx) => (
              <div key={idx} className="vpFailureItem">
                <h4>{failure.name}</h4>
                {failure.description && <p>{failure.description}</p>}
                {failure.severity && (
                  <span className={`vpSeverityBadge severity-${failure.severity}`}>
                    {failure.severity}
                  </span>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="vpComingSoon">
            <p>Common failure data for the {vehicle.year} {vehicle.make} {vehicle.model} is being added.</p>
            <p>Search HoundMoto for specific symptoms or DTC codes related to this vehicle.</p>
            <Link to="/" className="vpSearchLink">Search for Problems →</Link>
          </div>
        )}
      </section>

      <section className="vpSection">
        <h2>Frequently Seen DTC Codes</h2>
        {dtcCodes && dtcCodes.length > 0 ? (
          <div className="vpDtcQuickLinks">
            {dtcCodes.slice(0, 5).map((dtc, idx) => (
              <Link key={idx} to={`/dtc/${dtc.code?.toLowerCase()}`} className="vpDtcTag">
                {dtc.code} {dtc.description && `— ${dtc.description}`}
              </Link>
            ))}
          </div>
        ) : (
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
        )}
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
