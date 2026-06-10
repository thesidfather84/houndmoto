import { vehicleDtcKnowledge } from "../data/vehicleDtcKnowledge";

/**
 * Look up vehicle-specific DTC guidance.
 *
 * Matching rules:
 *   1. code     – exact match (case-insensitive)
 *   2. make     – entry.make must loosely match the provided make
 *   3. model    – entry.model must loosely match the provided model
 *   4. year     – if provided, must be in entry.years array
 *   5. engine   – if provided, entry must have at least one engineIncludes value
 *                 that appears in the provided engine string
 *
 * "Loose match" means either string contains the other (after lower-casing and trim).
 * This handles "Silverado" matching "Silverado 1500" and vice versa.
 *
 * @param {{ year?: string|number, make?: string, model?: string, engine?: string, code: string }}
 * @returns {object|null} Matched entry or null
 */
export function getVehicleSpecificDtc({ year, make, model, engine, code } = {}) {
  if (!code) return null;

  const normCode   = code.toUpperCase().trim();
  const normMake   = (make   || "").toLowerCase().trim();
  const normModel  = (model  || "").toLowerCase().trim();
  const normEngine = (engine || "").toLowerCase().trim();
  const yr         = parseInt(year, 10) || 0;

  // Score each entry: higher = better match
  let best = null;
  let bestScore = -1;

  for (const entry of vehicleDtcKnowledge) {
    if (entry.code.toUpperCase() !== normCode) continue;

    // Make must match if provided
    if (normMake) {
      const eMake = entry.make.toLowerCase();
      if (!eMake.includes(normMake) && !normMake.includes(eMake)) continue;
    }

    // Model must match if provided
    if (normModel) {
      const eModel = entry.model.toLowerCase();
      if (!eModel.includes(normModel) && !normModel.includes(eModel)) continue;
    }

    // Year must be in range if provided
    if (yr && !entry.years.includes(yr)) continue;

    // Engine must match at least one engineIncludes value, if provided
    let engineScore = 0;
    if (normEngine && entry.engineIncludes?.length) {
      const matched = entry.engineIncludes.some(
        (tag) => normEngine.includes(tag.toLowerCase()) || tag.toLowerCase().includes(normEngine)
      );
      if (!matched) continue;
      engineScore = 1; // bonus for engine specificity
    }

    // Score: year match + engine match + model specificity
    const yearScore  = yr && entry.years.includes(yr) ? 2 : 0;
    const modelScore = normModel ? 1 : 0;
    const score = yearScore + engineScore + modelScore;

    if (score > bestScore) {
      bestScore = score;
      best = entry;
    }
  }

  return best;
}

/**
 * Parse vehicle query params from a URLSearchParams object.
 * Returns { year, make, model, engine } with empty strings for missing params.
 */
export function parseVehicleParams(searchParams) {
  return {
    year:   searchParams.get("year")   || "",
    make:   searchParams.get("make")   || "",
    model:  searchParams.get("model")  || "",
    engine: searchParams.get("engine") || "",
  };
}

/**
 * Build a URL to the DTC page with optional vehicle context.
 * e.g. /dtc/p0420?year=2011&make=Chevrolet&model=Silverado&engine=5.3L%20V8
 */
export function buildDtcUrl(code, vehicle = {}) {
  const base = `/dtc/${code.toLowerCase()}`;
  const params = new URLSearchParams();
  if (vehicle.year)   params.set("year",   vehicle.year);
  if (vehicle.make)   params.set("make",   vehicle.make);
  if (vehicle.model)  params.set("model",  vehicle.model);
  if (vehicle.engine) params.set("engine", vehicle.engine);
  const qs = params.toString();
  return qs ? `${base}?${qs}` : base;
}
