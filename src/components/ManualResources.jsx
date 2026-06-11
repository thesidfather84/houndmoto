import { findManualRefsForVehicle, buildManualSearchLinks, MANUAL_ATTRIBUTION } from "../manualRefsData";
import { track } from "../analytics";

export function ManualResources({ vehicle, compact = false }) {
  if (!vehicle?.make || !vehicle?.model) return null;

  const refs = findManualRefsForVehicle(vehicle);
  const searchLinks = buildManualSearchLinks(vehicle);
  if (refs.length === 0 && searchLinks.length === 0) return null;

  return (
    <div className={`manualResourcesCard${compact ? " compact" : ""}`}>
      <div className="manualResourcesHeader">
        <h3 className="manualResourcesTitle">External Repair Manual Resources</h3>
        <p className="manualResourcesSubtitle">Free and open-access service manuals and technical documentation</p>
      </div>

      {/* Matched records from CHARM or LEMON */}
      {refs.length > 0 && (
        <div className="manualRefsMatched">
          <div className="manualMatchedLabel">Matching manuals found:</div>
          <ul className="manualRefsList">
            {refs.map((ref) => (
              <li key={ref.id} className="manualRefRow">
                <span className="manualRefCategory">{ref.category}</span>
                <span className="manualRefYears">{ref.yearStart}–{ref.yearEnd}</span>
                {ref.variant && <span className="manualRefVariant">{ref.variant}</span>}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Search links */}
      <div className="manualSearchLinks">
        <div className="manualSearchLabel">Search for service manuals:</div>
        <div className="manualLinksList">
          {searchLinks.map((link) => (
            <a
              key={link.source}
              className="manualSearchLink"
              href={link.url}
              target="_blank"
              rel="noreferrer"
              onClick={() => track("manual_reference_clicked", { source: link.source, make: vehicle.make, model: vehicle.model, year: vehicle.year })}
            >
              {link.name} →
            </a>
          ))}
        </div>
      </div>

      {/* Disclaimers */}
      <div className="manualResourcesNote">
        <p className="manualDisclaimer">
          <strong>External Resources:</strong> These links open outside HoundMoto and direct you to free, public manual archives.
          HoundMoto does not host or provide repair manual content.
        </p>
        <p className="manualVerifyNote">
          <strong>Verify First:</strong> Always verify repair procedures against your vehicle's manufacturer service information before performing any work.
        </p>
        <p className="manualAttribution">{MANUAL_ATTRIBUTION}</p>
      </div>
    </div>
  );
}
