const TIPS_KEY = "houndmoto_mechanic_tips";

export const sampleTips = [
  {
    id: 1,
    vehicle: "All vehicles",
    category: "Electrical",
    title: "Battery terminal corrosion quick clean",
    content:
      "Mix baking soda and water, pour over corroded terminals, let it fizz, rinse with water and dry. Coat terminals with dielectric grease to prevent future corrosion. Takes 5 minutes and can save a no-start diagnosis.",
    submitter: "Shop Tech",
    date: "2025-11-12",
  },
  {
    id: 2,
    vehicle: "All vehicles",
    category: "Oil & Fluids",
    title: "Check oil level at operating temperature",
    content:
      "Let the engine cool 5-10 minutes after shutting off before checking oil. A hot check right after shutdown gives a false low reading because oil is still draining back into the pan. Check on a level surface.",
    submitter: "DIY Mechanic",
    date: "2025-10-05",
  },
  {
    id: 3,
    vehicle: "Ford F-250 / F-350",
    category: "Brakes",
    title: "Rear drum inspection tip on Super Duty",
    content:
      "On older Super Duty trucks, the rear drum can stick to the hub flange after years of rust buildup. Before assuming a seized wheel cylinder, try tapping the drum face with a rubber mallet while it is loose on the studs. Saves pulling the whole backing plate unnecessarily.",
    submitter: "Fleet Mechanic",
    date: "2025-09-18",
  },
  {
    id: 4,
    vehicle: "All vehicles",
    category: "Engine",
    title: "Vacuum leak test with propane",
    content:
      "If you suspect a vacuum leak causing a lean code, run engine at idle, carefully move an unlit propane wand near intake manifold seams, throttle body edges, and hoses. If RPM changes when propane reaches a spot, you found the leak. Only do this away from any ignition sources.",
    submitter: "Mobile Tech",
    date: "2025-08-30",
  },
  {
    id: 5,
    vehicle: "Honda Civic / Accord",
    category: "Transmission",
    title: "Honda CVT shudder often fluid-related",
    content:
      "Honda CVT shudder or hesitation below 40 mph is frequently caused by degraded CVT fluid rather than a mechanical failure. Many owners fix the shudder with a fluid drain and refill using genuine Honda CVT fluid. Always verify it is a CVT-equipped model first.",
    submitter: "Honda Tech",
    date: "2025-07-22",
  },
];

export function loadTips() {
  try {
    const stored = localStorage.getItem(TIPS_KEY);
    if (!stored) return sampleTips;
    const parsed = JSON.parse(stored);
    return Array.isArray(parsed) ? parsed : sampleTips;
  } catch {
    return sampleTips;
  }
}

export function saveTip(newTip) {
  const current = loadTips();
  const tip = {
    ...newTip,
    id: Date.now(),
    date: new Date().toISOString().slice(0, 10),
  };
  const updated = [tip, ...current];
  try {
    localStorage.setItem(TIPS_KEY, JSON.stringify(updated));
  } catch {
    // storage full — silently skip
  }
  return updated;
}

export function searchTips(tips, query) {
  if (!query) return [];
  const q = query.toLowerCase();
  return tips.filter((tip) => {
    const searchable =
      `${tip.vehicle} ${tip.category} ${tip.title} ${tip.content}`.toLowerCase();
    return searchable.includes(q);
  });
}

export const TIP_CATEGORIES = [
  "Oil & Fluids",
  "Engine",
  "Transmission",
  "Brakes",
  "Electrical",
  "AC & Heating",
  "Tires & Wheels",
  "Starting & Charging",
  "Exhaust",
  "General",
];
