import { makeCoverage } from "../data/makeCoverage";
import { vehicleCoverage } from "../vehicleCoverageData";

// Convert display name → URL slug  ("F-150" → "f-150", "Grand Cherokee" → "grand-cherokee")
export function slugify(str) {
  return (str || "").toLowerCase().trim().replace(/\s+/g, "-");
}

// Convert URL slug → approximate display name ("grand-cherokee" → "Grand Cherokee")
export function unslugify(slug) {
  return (slug || "")
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

// Find make coverage by slug or display name (case-insensitive)
export function getMakeCoverage(makeSlugOrName) {
  if (!makeSlugOrName) return null;
  const norm = makeSlugOrName.toLowerCase().trim();
  return (
    makeCoverage.find(
      (m) => m.slug === norm || m.make.toLowerCase() === norm
    ) || null
  );
}

// Find generation records for a make/model from vehicleCoverageData
// Returns array sorted by yearStart descending (most recent first)
export function getModelGenerations(makeSlugOrName, modelSlugOrName) {
  if (!makeSlugOrName || !modelSlugOrName) return [];
  const normMake  = makeSlugOrName.toLowerCase().trim();
  const normModel = modelSlugOrName.toLowerCase().trim();

  return vehicleCoverage
    .filter((r) => {
      const mSlug = slugify(r.make);
      const moSlug = slugify(r.model);
      return (
        (mSlug === normMake || r.make.toLowerCase() === normMake) &&
        (moSlug === normModel || r.model.toLowerCase() === normModel ||
          normModel.replace(/-/g, " ") === r.model.toLowerCase())
      );
    })
    .sort((a, b) => b.yearStart - a.yearStart);
}

// Build canonical display name for a model slug within a make
// Uses the make's models list as the source of truth for display names
export function getModelDisplayName(makeCov, modelSlug) {
  if (!makeCov || !modelSlug) return unslugify(modelSlug);
  const norm = modelSlug.toLowerCase();
  const match = (makeCov.models || []).find(
    (m) => slugify(m) === norm || m.toLowerCase() === norm.replace(/-/g, " ")
  );
  return match || unslugify(modelSlug);
}

// Get all make slugs (for route generation / sitemap)
export function getAllMakeSlugs() {
  return makeCoverage.map((m) => m.slug);
}

// Get popular model slugs for a given make (for sitemap)
export function getPopularModelSlugs(makeSlug) {
  const mc = getMakeCoverage(makeSlug);
  if (!mc) return [];
  return (mc.models || []).map(slugify);
}

// Build CHARM search URL for a vehicle (for 1982–2013 vehicles)
export function charmSearchUrl(make, model, year) {
  const q = [year, make, model].filter(Boolean).join(" ");
  return `https://charm.li/?s=${encodeURIComponent(q)}`;
}

// Determine manual resource note based on year
export function getManualNote(year) {
  const y = parseInt(year, 10);
  if (!y) return null;
  if (y >= 1982 && y <= 2013) {
    return {
      text: "Factory service manuals for this vehicle may be available via the Operation CHARM archive.",
      url: null,
      useCharm: true,
    };
  }
  return {
    text: "Factory service manuals for newer vehicles are typically available from the dealer, AllData, Mitchell1, or manufacturer subscription portals.",
    url: null,
    useCharm: false,
  };
}
