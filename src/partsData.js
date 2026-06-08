// HoundMoto parts, vendor, and repair-resource data + helpers
// (merged from the original main.jsx so no live feature is lost)

export const vendors = [
  { name: "RockAuto",            note: "Huge selection, multiple brands, great pricing",   url: (q) => `https://www.rockauto.com/en/partsearch/?partnum=${encodeURIComponent(q)}` },
  { name: "AutoZone",            note: "Local store pickup, same-day availability",         url: (q) => `https://www.autozone.com/searchresult?searchText=${encodeURIComponent(q)}` },
  { name: "O'Reilly Auto Parts", note: "Local stores, often has free loaner tools",         url: (q) => `https://www.oreillyauto.com/search?q=${encodeURIComponent(q)}` },
  { name: "Advance Auto Parts",  note: "Frequent online coupons, local pickup",             url: (q) => `https://shop.advanceautoparts.com/find/searchResults.html?searchTerm=${encodeURIComponent(q)}` },
  { name: "NAPA Auto Parts",     note: "Professional-grade, good for hard-to-find parts",    url: (q) => `https://www.napaonline.com/en/search?q=${encodeURIComponent(q)}` },
  { name: "Amazon",              note: "Compare sellers carefully and confirm fitment",      url: (q) => `https://www.amazon.com/s?k=${encodeURIComponent(q + " auto part")}` },
  { name: "Walmart",             note: "Good for batteries, fluids, filters, and basics",    url: (q) => `https://www.walmart.com/search?q=${encodeURIComponent(q + " auto")}` },
  { name: "PartsGeek",           note: "Aftermarket options, useful for price comparison",   url: (q) => `https://www.partsgeek.com/ss/?i=1&ssq=${encodeURIComponent(q)}` },
  { name: "eBay Motors",         note: "Good for OEM, used, and discontinued parts",         url: (q) => `https://www.ebay.com/sch/i.html?_nkw=${encodeURIComponent(q + " auto part")}` },
];

export const repairResources = [
  { name: "Charm.li",      note: "DIY repair guides and service documentation", url: (q) => `https://charm.li/?s=${encodeURIComponent(q)}` },
  { name: "Lemon Manuals", note: "Vehicle repair manuals and how-to guides",    url: (q) => `https://lemon-manuals.com/?s=${encodeURIComponent(q)}` },
];

export const partLibrary = [
  { keys: ["starter"],                       name: "Starter Motor",          does: "Cranks the engine when you turn the key. If you hear a single click or nothing at all, the starter may be failing.",                       aka: "Starting motor, cranking motor",                              warn: "Fitment varies by engine size and transmission type. Include engine size and automatic vs. manual in your search." },
  { keys: ["alternator"],                    name: "Alternator",             does: "Keeps the battery charged while the engine runs. Signs of failure: battery warning light on, dim headlights, dead battery.",                aka: "Charging unit, generator (older term)",                        warn: "Alternators vary by amperage. High-accessory trucks may need a higher-amp unit. Match the output rating." },
  { keys: ["battery"],                       name: "Automotive Battery",     does: "Powers the starter and electrical system when the engine is off. Batteries last 3-5 years. Slow cranking or dimming lights mean it is time to test yours.", aka: "Car battery, lead-acid battery, AGM battery",            warn: "Group size and cold cranking amps (CCA) must match your vehicle. Check the label on your old battery or the owner's manual." },
  { keys: ["brake pad", "brake pads", "rotor", "brake"], name: "Brake Pads & Rotors", does: "Brake pads press against the rotor to stop the car. Squealing or grinding sounds mean they need replacing. Do not delay brake work.",  aka: "Disc brake pads, friction pads, brake shoes (on drum brakes)", warn: "Sizes vary by front/rear axle and vehicle trim. Some vehicles use drum brakes in the rear - confirm before ordering." },
  { keys: ["serpentine belt", "drive belt"], name: "Serpentine Belt",        does: "Drives the alternator, AC compressor, and power steering pump from the engine. A cracked or squealing belt should be replaced soon.",  aka: "Drive belt, accessory belt, V-belt",                           warn: "Belt length and rib count must match exactly. The routing diagram is usually on a sticker under the hood." },
  { keys: ["spark plug", "spark plugs"],     name: "Spark Plugs",            does: "Ignite the air-fuel mixture inside the engine. Worn plugs cause rough idle, misfires, poor fuel economy, and hard starting.",         aka: "Ignition plugs, iridium plugs, platinum plugs",                warn: "Heat range and thread size must match your engine. Never substitute based on appearance alone." },
  { keys: ["oxygen sensor", "o2 sensor"],    name: "Oxygen (O2) Sensor",     does: "Measures exhaust oxygen so the computer can adjust the fuel mix. A bad sensor causes poor fuel economy, failed emissions tests, and trouble codes.", aka: "O2 sensor, lambda sensor, exhaust sensor",            warn: "Position matters - upstream or downstream, and which bank. Upstream and downstream sensors are not interchangeable." },
  { keys: ["fuse", "relay", "fuse box"],     name: "Fuse or Relay",          does: "Fuses protect circuits from overloads. Relays switch high-current loads. A blown fuse causes exactly one component to stop working.",   aka: "ATO fuse, blade fuse, mini fuse, maxi fuse, relay switch",     warn: "Always match the fuse amperage exactly. A higher-amp fuse can cause a fire. Check the fuse diagram on the box cover or in the owner's manual." },
  { keys: ["coolant", "antifreeze"],         name: "Engine Coolant",         does: "Prevents overheating in summer and freezing in winter. Also protects the cooling system from corrosion.",                            aka: "Antifreeze, radiator fluid",                                   warn: "Coolant types are NOT interchangeable. Mixing types can cause damage. Use only the type specified in your owner's manual." },
  { keys: ["transmission fluid"],            name: "Transmission Fluid",     does: "Lubricates and cools the transmission. Low or burnt fluid causes slipping, hard shifts, and eventually transmission failure.",        aka: "ATF, CVT fluid, gear oil (manual), Mercon, Dexron",            warn: "Transmission fluid specs are very specific. Using the wrong type can damage seals. Verify the exact spec before adding or changing." },
  { keys: ["oil capacity", "oil change", "motor oil", "engine oil"], name: "Engine Oil", does: "Lubricates all moving parts inside the engine. Change it at the interval in your owner's manual to prevent wear.",              aka: "Motor oil, engine lubricant, synthetic oil, conventional oil", warn: "Use the exact viscosity grade in your owner's manual - for example, 5W-30 or 0W-20. Wrong viscosity reduces protection." },
  { keys: ["wheel bearing", "hub bearing"],  name: "Wheel Bearing",          does: "Lets the wheel spin smoothly on the axle. A worn bearing makes a humming or grinding noise that changes when you steer.",           aka: "Hub bearing, wheel hub assembly",                              warn: "Left vs. right and front vs. rear are different parts. 2WD and 4WD versions also differ. Confirm all details before ordering." },
  { keys: ["catalytic converter", "cat converter"], name: "Catalytic Converter", does: "Cleans harmful exhaust gases before they leave the tailpipe. Failure often triggers P0420 and reduces power.",                   aka: "Cat, three-way catalyst",                                      warn: "California (CARB) and Federal emissions vehicles require different converters. Check your state's requirements." },
  { keys: ["thermostat"],                    name: "Thermostat",             does: "Controls coolant flow to keep the engine at the right temperature. Stuck open = runs cold. Stuck closed = overheats.",              aka: "Engine thermostat, coolant thermostat",                        warn: "Match the temperature rating to your vehicle's specification. Wrong temp rating affects fuel economy and performance." },
  { keys: ["timing belt", "timing chain"],   name: "Timing Belt / Chain",    does: "Keeps the camshaft and crankshaft in sync. A broken timing belt can destroy the engine. Replace at the manufacturer's scheduled interval - do not wait.", aka: "Cam belt, timing chain",                          warn: "Check your owner's manual for the replacement interval. This is critical - do not defer it." },
  { keys: ["water pump"],                     name: "Water Pump",             does: "Circulates coolant through the engine and radiator. Failure causes overheating. Often replaced at the same time as the timing belt.", aka: "Coolant pump",                                                 warn: "If doing a timing belt job, replacing the water pump at the same time is strongly recommended - it is in the same area." },
  { keys: ["strut", "shock absorber", "shock"], name: "Strut / Shock Absorber", does: "Controls suspension movement. Worn shocks cause excessive bouncing, swaying around corners, and longer stopping distances.",       aka: "Shock absorber, damper, strut assembly",                       warn: "Always replace in pairs - both fronts together or both rears together - for balanced handling. Front and rear are different parts." },
  { keys: ["cv axle", "cv joint"],           name: "CV Axle / CV Joint",     does: "Transfers power from the transmission to the wheels while the suspension moves. Clicking sounds when turning are a sign of CV joint failure.", aka: "Half shaft, drive axle, constant velocity joint",     warn: "Front/rear and left/right versions are different. Always specify the exact position." },
];

// Vehicle lookup tree data
export const vehicleMakes = [
  "Acura", "BMW", "Buick", "Cadillac", "Chevrolet", "Chrysler", "Dodge", "Ford",
  "GMC", "Honda", "Hyundai", "Infiniti", "Jeep", "Kia", "Lexus", "Lincoln",
  "Mazda", "Mercedes-Benz", "Mitsubishi", "Nissan", "RAM", "Subaru", "Toyota",
  "Volkswagen", "Volvo",
];

export const vehicleModels = {
  Acura: ["ILX", "MDX", "RDX", "RLX", "TL", "TSX"],
  BMW: ["1 Series", "3 Series", "5 Series", "7 Series", "X1", "X3", "X5"],
  Buick: ["Enclave", "Encore", "LaCrosse", "Regal", "Verano"],
  Cadillac: ["ATS", "CTS", "Escalade", "SRX", "XT5", "XTS"],
  Chevrolet: ["Camaro", "Colorado", "Corvette", "Cruze", "Equinox", "Impala", "Malibu", "Silverado 1500", "Silverado 2500HD", "Suburban", "Tahoe", "Traverse"],
  Chrysler: ["200", "300", "Pacifica", "PT Cruiser", "Town & Country"],
  Dodge: ["Challenger", "Charger", "Dakota", "Durango", "Grand Caravan", "Journey", "Ram 1500"],
  Ford: ["Edge", "Escape", "Expedition", "Explorer", "F-150", "F-250 Super Duty", "Focus", "Fusion", "Mustang", "Ranger", "Transit"],
  GMC: ["Acadia", "Canyon", "Envoy", "Sierra 1500", "Sierra 2500HD", "Terrain", "Yukon"],
  Honda: ["Accord", "CR-V", "Civic", "Fit", "HR-V", "Odyssey", "Pilot", "Ridgeline"],
  Hyundai: ["Accent", "Elantra", "Ioniq", "Santa Fe", "Sonata", "Tucson", "Veloster"],
  Infiniti: ["FX35", "G35", "G37", "Q50", "Q60", "QX60"],
  Jeep: ["Cherokee", "Compass", "Gladiator", "Grand Cherokee", "Liberty", "Renegade", "Wrangler"],
  Kia: ["Forte", "Optima", "Soul", "Sorento", "Sportage", "Stinger", "Telluride"],
  Lexus: ["ES", "GX", "IS", "LS", "LX", "NX", "RX"],
  Lincoln: ["Continental", "MKC", "MKX", "MKZ", "Navigator", "Town Car"],
  Mazda: ["CX-5", "CX-9", "Mazda2", "Mazda3", "Mazda6", "MX-5 Miata"],
  "Mercedes-Benz": ["C-Class", "E-Class", "GLC", "GLE", "GLK", "ML-Class", "S-Class"],
  Mitsubishi: ["Eclipse", "Endeavor", "Galant", "Lancer", "Montero", "Outlander"],
  Nissan: ["370Z", "Altima", "Frontier", "Maxima", "Murano", "Pathfinder", "Rogue", "Sentra", "Titan"],
  RAM: ["1500", "2500", "3500", "ProMaster"],
  Subaru: ["BRZ", "Crosstrek", "Forester", "Impreza", "Legacy", "Outback", "WRX"],
  Toyota: ["4Runner", "Avalon", "Camry", "Corolla", "Highlander", "Prius", "RAV4", "Sienna", "Tacoma", "Tundra"],
  Volkswagen: ["Atlas", "Beetle", "Golf", "Jetta", "Passat", "Tiguan"],
  Volvo: ["S60", "S80", "V60", "XC40", "XC60", "XC90"],
};

export const vehicleEngines = [
  "2.0L", "2.2L", "2.4L", "2.5L", "2.7L", "3.0L", "3.3L", "3.5L", "3.6L", "3.8L",
  "4.0L", "4.6L", "4.7L", "5.0L", "5.3L", "5.4L", "5.7L", "6.0L", "6.2L",
  "6.7L Diesel", "7.3L", "Electric / Hybrid",
];

export const partCategories = {
  "Engine & Drivetrain":   ["Starter", "Alternator", "Serpentine belt", "Spark plugs", "Timing belt", "Water pump", "Oil & filter", "Air filter", "Fuel filter", "Throttle body"],
  "Battery & Electrical":  ["Battery", "Fuses & relays", "Headlight bulb", "Tail light bulb", "Turn signal bulb", "Oxygen sensor", "MAF sensor"],
  "Brakes":                ["Brake pads", "Rotors", "Brake calipers", "Brake lines", "ABS sensor", "Brake fluid", "Wheel cylinders"],
  "Cooling & Fluids":      ["Thermostat", "Radiator", "Water pump", "Coolant flush", "Transmission fluid", "Power steering fluid"],
  "Suspension & Steering": ["Struts", "Shocks", "Control arms", "Ball joints", "Tie rod ends", "Power steering pump", "Wheel bearings", "CV axle"],
  "Exhaust & Emissions":   ["Catalytic converter", "Oxygen sensors", "EGR valve", "PCV valve", "Muffler"],
  "Tires & Wheels":        ["Tires", "Wheel hub", "TPMS sensor", "Lug nuts"],
  "Interior & HVAC":       ["Cabin air filter", "AC compressor", "Heater core", "Blower motor", "Wiper blades"],
};

export function getYear(q) {
  const m = q.match(/\b(19[8-9]\d|20[0-4]\d)\b/);
  return m ? m[0] : "";
}

export function getDtcCode(q) {
  const m = q.toLowerCase().match(/\b[pbcu][0-9a-f]{4}\b/);
  return m ? m[0] : "";
}

export function getTireSize(q) {
  const m = q.match(/\b(?:P|LT|ST|T)?(\d{3})\/(\d{2})R(\d{2}(?:\.\d)?)\b/i);
  return m ? m[0].toUpperCase() : "";
}

export function detectPartNumber(q) {
  if (!q || q.length < 4 || q.length > 25) return null;
  if (getYear(q) || getDtcCode(q)) return null;
  if (q.split(" ").length > 2) return null;
  if (!/[a-zA-Z]/.test(q) || !/[0-9]/.test(q)) return null;
  if (/^[A-Z]{1,4}\d{1,2}[A-Z]{1,4}(?:-[A-Z]?\d{0,3})?$/i.test(q)) return { likelyType: "Spark Plug or Ignition Component" };
  if (q.replace(/-/g, "").length >= 6 && /^[A-Z0-9][-A-Z0-9]{4,}$/i.test(q)) return { likelyType: "OEM or Aftermarket Part Number" };
  return null;
}

export function lemonManualsUrl(make, year) {
  const base = "https://lemon-manuals.com/";
  if (make && year) return `${base}?s=${encodeURIComponent(make + " " + year)}`;
  if (make) return `${base}?s=${encodeURIComponent(make)}`;
  return base;
}

const VIN_RE = /^[A-HJ-NPR-Z0-9]{17}$/i;
export function isVin(q) {
  return VIN_RE.test((q || "").trim());
}

// Build a "best match" part card. DTC codes are handled separately by the
// main trouble-code list, so this only covers part numbers and part keywords.
export function buildPartMatch(query) {
  const cleanQuery = (query || "").trim();
  const lower = cleanQuery.toLowerCase();
  const year = getYear(cleanQuery);
  const pn = detectPartNumber(cleanQuery);

  if (pn) {
    return {
      kind: "partNumber",
      name: `Part Number: ${cleanQuery}`,
      vehicleFit: "Verify this part fits your specific vehicle before ordering",
      whatItDoes: `Identified as a possible ${pn.likelyType}. Use the cross-reference links to find OEM and aftermarket equivalents.`,
      aka: "Part numbers vary by manufacturer. Cross-reference tools below can help.",
      warn: "The same part number may not fit all vehicles. Confirm year, make, model, and engine compatibility.",
    };
  }
  for (const e of partLibrary) {
    if (e.keys.some((k) => lower.includes(k))) {
      return {
        kind: "part",
        name: e.name,
        vehicleFit: year ? `Year ${year} found in your search` : "Verify fitment for your year, make, and model",
        whatItDoes: e.does,
        aka: e.aka,
        warn: e.warn,
      };
    }
  }
  return null;
}
