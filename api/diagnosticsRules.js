/**
 * Rules-based automotive diagnostics.
 *
 * Used as the fallback when no AI provider is configured or when an AI call fails.
 * The site remains fully functional without AI.
 *
 * Exports:
 *   rulesBasedDiagnosis(type, context) → { likelyCauses, firstChecks, urgency, safetyNote, system }
 *   dtcRangeInfo(code) → { system, urgency } | null
 */

// ── Symptom rules ─────────────────────────────────────────────────────────────

const SYMPTOM_RULES = [
  {
    keywords: ["rough idle", "idle rough", "idling rough", "unstable idle", "shaky idle"],
    system: "Fuel/Air Delivery",
    urgency: "moderate",
    likelyCauses: [
      "Dirty or failing mass airflow (MAF) sensor",
      "Vacuum leak — intake manifold gasket, PCV hose, or brake booster line",
      "Clogged or leaking fuel injectors",
      "Worn or fouled spark plugs",
      "Carbon buildup on throttle body",
      "Failing idle air control (IAC) valve",
    ],
    firstChecks: [
      "Scan for DTC codes — P0171/P0174 (lean) and P030x (misfire) are common",
      "Inspect MAF sensor wiring; clean with MAF-safe spray",
      "Check for vacuum leaks by spraying carb cleaner around the intake while idling",
      "Inspect spark plug condition and gap",
    ],
  },
  {
    keywords: ["no start", "won't start", "wont start", "cranks but won't", "cranks no start", "not starting", "refuses to start"],
    system: "Starting System",
    urgency: "high",
    safetyNote: "Do not attempt to push-start automatic transmissions.",
    likelyCauses: [
      "Dead or weak battery (most common cause)",
      "Failed fuel pump — listen for 2-second prime hum when key turns to ON",
      "Bad crankshaft position sensor (prevents spark and injector pulse)",
      "Faulty starter motor or starter relay",
      "No spark — failed ignition coil or distributor",
      "Security/immobilizer lockout — check for flashing security light",
    ],
    firstChecks: [
      "Test battery voltage: 12.4V+ resting, 13.5–14.5V with engine running",
      "Turn key to ON (not START) — listen for fuel pump hum from rear of vehicle",
      "Check for spark: remove plug wire, install spare plug, crank and look for spark",
      "Scan for DTC codes — crankshaft sensor codes (P0335–P0338) will prevent start",
    ],
  },
  {
    keywords: ["overheating", "over heating", "running hot", "temperature gauge", "temp gauge", "coolant boiling", "steam from hood"],
    system: "Cooling System",
    urgency: "high",
    safetyNote: "Stop driving immediately if the temperature gauge enters the red zone. Continued driving risks warped heads, blown gaskets, or seized engine.",
    likelyCauses: [
      "Low coolant level or active coolant leak",
      "Stuck-closed thermostat",
      "Failed water pump or broken impeller",
      "Clogged or physically damaged radiator",
      "Blown head gasket — check for white exhaust smoke or milky oil",
      "Failed electric cooling fan or seized mechanical fan clutch",
    ],
    firstChecks: [
      "Check coolant level in overflow reservoir — cold engine only, never open cap when hot",
      "Inspect under vehicle for visible coolant puddles (sweet smell, green/orange color)",
      "Verify cooling fans operate when engine reaches operating temperature",
      "Check oil cap underside for milky residue (indicates coolant in oil)",
    ],
  },
  {
    keywords: ["brakes", "brake pedal", "stopping", "brake noise", "squealing", "grinding", "brake fade"],
    system: "Braking System",
    urgency: "high",
    safetyNote: "Do not drive if the brake pedal goes to the floor or brakes feel completely ineffective. Have vehicle towed.",
    likelyCauses: [
      "Worn brake pads — squealing is the wear indicator, grinding means metal-on-metal",
      "Warped or worn brake rotors",
      "Leaking brake caliper, wheel cylinder, or brake line",
      "Low or contaminated brake fluid",
      "Seized/sticking brake caliper",
      "ABS module or wheel speed sensor fault (ABS light on)",
    ],
    firstChecks: [
      "Check brake pad thickness through wheel spokes — minimum 3mm",
      "Inspect brake fluid level and color in master cylinder reservoir",
      "Look for brake fluid residue on inside of wheel/tire",
      "Scan for ABS/brake system DTC codes (C1xxx range)",
    ],
  },
  {
    keywords: ["transmission", "slipping", "won't shift", "shifts hard", "hard shift", "delayed shift", "no reverse", "stuck in gear"],
    system: "Transmission",
    urgency: "moderate",
    likelyCauses: [
      "Low or burnt transmission fluid (most common)",
      "Faulty shift solenoid or transmission control solenoid",
      "Clogged transmission filter",
      "Worn clutch packs or bands (automatic)",
      "Torque converter issue",
      "Transmission control module (TCM) fault",
    ],
    firstChecks: [
      "Check transmission fluid level and condition — should be pink/red, not brown or burnt smelling",
      "Scan for P07xx DTC codes (transmission range solenoid codes are common)",
      "Note when the problem occurs: cold start, after warm-up, under load, or always",
      "Check for fluid leaks under transmission — red fluid indicates ATF",
    ],
  },
  {
    keywords: ["knocking", "engine knock", "rod knock", "pinging", "ticking", "lifter tick", "valve tap", "clatter", "engine noise"],
    system: "Engine Mechanical",
    urgency: "high",
    safetyNote: "If a deep knocking sound develops suddenly or the oil pressure warning light is on, stop the engine immediately to prevent catastrophic damage.",
    likelyCauses: [
      "Low engine oil level or oil pressure — check immediately",
      "Worn rod bearings — deep rhythmic knock that gets worse with RPM",
      "Lifter tick — tapping on cold start that clears after warm-up (common, may not be critical)",
      "Carbon detonation (pinging) — using incorrect octane fuel or timing issue",
      "Worn timing chain or failing tensioner",
      "Piston slap — cold-start knock that fades with warmup",
    ],
    firstChecks: [
      "Check engine oil level immediately on dipstick",
      "Note if noise is present when cold, hot, or always — this narrows the cause significantly",
      "Check oil pressure warning light",
      "Remove oil cap with engine running and listen for valve train noise",
    ],
  },
  {
    keywords: ["stalling", "stalls", "dies", "cuts out", "engine dies", "shuts off", "randomly dies"],
    system: "Fuel/Air/Ignition",
    urgency: "high",
    likelyCauses: [
      "Failing crankshaft position sensor (intermittent, no-warning stall)",
      "Dirty or failing MAF sensor",
      "Fuel pump failing — stalls under load or at operating temperature",
      "Carbon buildup on throttle body",
      "Failing camshaft position sensor",
      "EGR valve stuck open at idle",
    ],
    firstChecks: [
      "Scan for stored and pending DTC codes — crankshaft/camshaft codes are critical",
      "Record when stalling occurs: idle, acceleration, deceleration, hot, cold",
      "Inspect MAF sensor wiring and connector for damage or corrosion",
      "Check fuel pressure if possible — compare to spec during stall condition",
    ],
  },
  {
    keywords: ["check engine", "check engine light", "cel", "malfunction indicator", "mil light", "service engine"],
    system: "On-Board Diagnostics (OBD-II)",
    urgency: "moderate",
    likelyCauses: [
      "Oxygen sensor fault — P0136–P0141, P0141–P0167 range",
      "Catalytic converter efficiency below threshold — P0420, P0430",
      "EVAP system leak — P0440–P0457 range (may be loose gas cap)",
      "Misfire — P0300–P0312 range",
      "MAF sensor or MAP sensor fault",
      "Variable valve timing fault — P0010–P0025 range",
    ],
    firstChecks: [
      "Connect OBD-II scanner and read stored DTC codes",
      "Use HoundMoto DTC Lookup to understand each code",
      "Check if gas cap is loose — tighten and see if light clears after 1–3 drive cycles",
      "Note if light is solid (non-emergency) or flashing (misfire — reduce speed, avoid towing)",
    ],
  },
  {
    keywords: ["ac", "a/c", "air conditioning", "air conditioner", "no cold air", "not cooling", "blows hot"],
    system: "HVAC / Air Conditioning",
    urgency: "low",
    likelyCauses: [
      "Low refrigerant due to a leak in the system",
      "Failed AC compressor clutch or compressor",
      "Extremely clogged cabin air filter",
      "Faulty blend door actuator",
      "Condenser damage or obstruction (bugs, road debris)",
    ],
    firstChecks: [
      "Check if AC compressor clutch engages when AC is switched on (visible pulley change)",
      "Inspect cabin air filter — extremely clogged filters reduce airflow dramatically",
      "Look for oily residue around AC lines and fittings (refrigerant oil indicates a leak)",
    ],
  },
  {
    keywords: ["battery", "dead battery", "won't charge", "alternator", "electrical", "lights dimming"],
    system: "Electrical / Charging System",
    urgency: "moderate",
    likelyCauses: [
      "Failing battery (most common on vehicles 3–5+ years old)",
      "Bad alternator — not charging battery while driving",
      "Parasitic draw — something draining the battery when key is off",
      "Loose or corroded battery terminals",
      "Failed voltage regulator",
    ],
    firstChecks: [
      "Test battery voltage: 12.4V+ resting; 13.5–14.5V with engine running (alternator output)",
      "Inspect battery terminals for corrosion — clean with baking soda solution if corroded",
      "Note if battery keeps dying overnight (parasitic draw) or dies while driving (alternator)",
      "Load-test battery at an auto parts store — most do this free",
    ],
  },
  {
    keywords: ["oil leak", "leaking oil", "burning oil", "oil consumption", "oil smoke", "blue smoke"],
    system: "Engine Lubrication / Seals",
    urgency: "moderate",
    safetyNote: "Blue smoke from exhaust combined with rapid oil loss can cause severe engine damage if oil runs low.",
    likelyCauses: [
      "Worn valve stem seals — blue smoke on cold start or deceleration",
      "Leaking valve cover gasket (external leak, common on high-mileage engines)",
      "Worn piston rings — blue smoke under acceleration and oil consumption",
      "Rear main seal leak",
      "Oil pan gasket leak",
    ],
    firstChecks: [
      "Check oil level on dipstick — do not run low",
      "Identify smoke color: blue = oil burning, white = coolant burning, black = rich fuel",
      "Inspect valve cover gaskets and oil pan for visible wet spots",
      "Note when smoke appears: startup (valve seals), acceleration (rings), always (rings/worn engine)",
    ],
  },
];

// ── DTC code range reference ───────────────────────────────────────────────────

const DTC_RANGES = [
  { min: 10,   max: 99,   system: "Fuel/Air Metering",                  urgency: "moderate" },
  { min: 100,  max: 199,  system: "Air/Fuel Metering (MAF, O2, MAP)",    urgency: "moderate" },
  { min: 200,  max: 299,  system: "Fuel System / Injectors",             urgency: "moderate" },
  { min: 300,  max: 399,  system: "Ignition System / Misfires",          urgency: "high"     },
  { min: 400,  max: 499,  system: "Auxiliary Emission Controls (EGR)",   urgency: "low"      },
  { min: 500,  max: 599,  system: "Vehicle Speed / Idle Control",        urgency: "moderate" },
  { min: 600,  max: 699,  system: "Computer Output Circuit / PCM",       urgency: "high"     },
  { min: 700,  max: 799,  system: "Transmission",                        urgency: "moderate" },
  { min: 800,  max: 899,  system: "Transmission / Gear Ratio",           urgency: "moderate" },
  { min: 1000, max: 1999, system: "Manufacturer Specific",               urgency: "varies"   },
  { min: 2000, max: 2999, system: "Manufacturer Specific (Chassis)",     urgency: "varies"   },
  { min: 3000, max: 3999, system: "Powertrain (Network/Misc.)",          urgency: "moderate" },
];

// ── Public functions ──────────────────────────────────────────────────────────

/**
 * Returns range-based DTC info without needing a full DTC database lookup.
 * @param {string} code e.g. "P0300"
 */
export function dtcRangeInfo(code) {
  if (!code) return null;
  const upper = code.toUpperCase().trim();
  if (!/^[PBCU]\d{4}$/.test(upper)) return null;
  const num = parseInt(upper.slice(1), 10);
  const range = DTC_RANGES.find((r) => num >= r.min && num <= r.max);
  if (!range) return null;
  return { system: range.system, urgency: range.urgency };
}

/**
 * Rules-based diagnosis fallback.
 *
 * @param {"symptom"|"dtc"|"vehicle"} type
 * @param {object} context
 *   - symptom: { symptoms: string, vehicle?: object }
 *   - dtc:     { dtcCode: string, vehicle?: object }
 *   - vehicle: { vehicle: object, question: string }
 * @returns {object} { text, likelyCauses, firstChecks, urgency, safetyNote, system, source }
 */
export function rulesBasedDiagnosis(type, context = {}) {
  if (type === "dtc") {
    return _dtcFallback(context);
  }
  if (type === "symptom") {
    return _symptomFallback(context);
  }
  return _genericFallback(context);
}

// ── Internal helpers ──────────────────────────────────────────────────────────

function _symptomFallback({ symptoms = "", vehicle } = {}) {
  const lower = symptoms.toLowerCase();
  const matched = SYMPTOM_RULES.find((rule) =>
    rule.keywords.some((kw) => lower.includes(kw))
  );

  const vehicleStr = vehicle
    ? `${vehicle.year || ""} ${vehicle.make || ""} ${vehicle.model || ""}`.trim()
    : "";

  if (matched) {
    const lines = [
      vehicleStr ? `For your ${vehicleStr}:` : "Based on those symptoms:",
      "",
      `**Likely system affected:** ${matched.system}`,
      "",
      `**Most probable causes:**`,
      ...matched.likelyCauses.map((c) => `• ${c}`),
      "",
      `**Recommended first checks:**`,
      ...matched.firstChecks.map((c) => `• ${c}`),
      "",
      matched.safetyNote ? `⚠️ **Safety:** ${matched.safetyNote}` : null,
      "",
      "Use HoundMoto's DTC Lookup if a check engine light is on, and check NHTSA recalls for your vehicle.",
    ].filter((l) => l !== null);

    return {
      text: lines.join("\n"),
      likelyCauses: matched.likelyCauses,
      firstChecks: matched.firstChecks,
      urgency: matched.urgency,
      safetyNote: matched.safetyNote || null,
      system: matched.system,
      source: "rules",
    };
  }

  // No keyword match — generic advice
  return {
    text: [
      vehicleStr ? `For your ${vehicleStr}:` : "General diagnostic guidance:",
      "",
      "The first step for any vehicle problem is to scan for OBD-II trouble codes with an inexpensive scanner ($20–$40 at auto parts stores).",
      "",
      "**General first checks:**",
      "• Check engine oil level (dipstick)",
      "• Check for any warning lights on the dashboard",
      "• Scan for DTC codes and use HoundMoto's free DTC Lookup",
      "• Note exact conditions: when does it happen? Cold/hot? Under load? Every time?",
      "",
      "Providing more detail about the symptoms will help narrow down the cause.",
    ].join("\n"),
    likelyCauses: [],
    firstChecks: [],
    urgency: "unknown",
    safetyNote: null,
    system: "Unknown",
    source: "rules",
  };
}

function _dtcFallback({ dtcCode, vehicle } = {}) {
  const code = (dtcCode || "").toUpperCase().trim();
  const rangeInfo = dtcRangeInfo(code);
  const vehicleStr = vehicle
    ? `${vehicle.year || ""} ${vehicle.make || ""} ${vehicle.model || ""}`.trim()
    : "";

  const prefix = code[0];
  const prefixName =
    prefix === "P" ? "Powertrain" :
    prefix === "B" ? "Body" :
    prefix === "C" ? "Chassis" :
    prefix === "U" ? "Network" : "Unknown";

  const lines = [
    vehicleStr ? `DTC ${code} on your ${vehicleStr}:` : `DTC code ${code}:`,
    "",
    `**Code type:** ${prefixName} system`,
    rangeInfo ? `**Affected system:** ${rangeInfo.system}` : null,
    rangeInfo ? `**Typical urgency:** ${rangeInfo.urgency}` : null,
    "",
    "**What to do:**",
    "• View the full description and common causes on the HoundMoto DTC page for this code",
    "• Do not clear codes before diagnosing — clearing loses freeze-frame data",
    "• Note if the code is pending, confirmed, or permanent in your scanner",
    "• Check for Technical Service Bulletins (TSBs) related to this code for your vehicle",
    "",
    "Use the DTC Lookup link below for detailed information on this specific code.",
  ].filter((l) => l !== null);

  return {
    text: lines.join("\n"),
    likelyCauses: [],
    firstChecks: [
      "View the full DTC page for this code",
      "Do not clear the code before diagnosing",
      "Check for TSBs related to this code",
    ],
    urgency: rangeInfo?.urgency || "unknown",
    safetyNote: null,
    system: rangeInfo?.system || prefixName,
    source: "rules",
  };
}

function _genericFallback({ vehicle, question } = {}) {
  const vehicleStr = vehicle
    ? `${vehicle.year || ""} ${vehicle.make || ""} ${vehicle.model || ""}`.trim()
    : "";

  return {
    text: [
      vehicleStr ? `General guidance for your ${vehicleStr}:` : "General automotive guidance:",
      "",
      "**Where to start:**",
      "• Scan for OBD-II DTC codes — free at most auto parts stores",
      "• Use HoundMoto's DTC Lookup for any check engine codes",
      "• Use HoundMoto's VIN Recall Check to verify no open safety recalls",
      "• Describe symptoms in detail: when they occur, sounds, smells, warning lights",
      "",
      "For best results, describe the specific symptom you are experiencing.",
    ].join("\n"),
    likelyCauses: [],
    firstChecks: [],
    urgency: "unknown",
    safetyNote: null,
    system: "General",
    source: "rules",
  };
}
