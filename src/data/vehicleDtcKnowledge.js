/**
 * HoundMoto Vehicle-Specific DTC Knowledge Base
 *
 * Each entry targets a specific make/model/engine/code combination with
 * real-world diagnostic guidance that goes beyond the generic DTC meaning.
 *
 * Fields:
 *   make           – manufacturer name (matched loosely, case-insensitive)
 *   model          – model name (matched loosely, case-insensitive)
 *   years          – array of model years this entry applies to
 *   engineIncludes – any of these substrings must appear in the engine string
 *   code           – OBD-II DTC code (uppercase)
 *   title          – short title for this vehicle-specific issue
 *   likelyCauses   – ranked most-to-least probable causes for this vehicle
 *   checkFirst     – specific diagnostic steps in order
 *   avoid          – common mis-diagnoses or premature replacements to avoid
 *   severity       – "High" | "Moderate" | "Low"
 *   canDrive       – plain-language answer
 */

// ── Helpers ───────────────────────────────────────────────────────────────────

function yr(start, end) {
  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
}

// Duplicates an entry for both Chevrolet Silverado and GMC Sierra — same platform/engine
function gmTruck(engineTag, years, code, data) {
  const base = { years, engineIncludes: engineTag, code, ...data };
  return [
    { make: "Chevrolet", model: "Silverado", ...base },
    { make: "Chevrolet", model: "Silverado 1500", ...base },
    { make: "GMC", model: "Sierra", ...base },
    { make: "GMC", model: "Sierra 1500", ...base },
  ];
}

// ── Chevrolet Silverado / GMC Sierra 5.3L Gen IV (2007–2013) ─────────────────

const silveradoSierra53 = [

  ...gmTruck(["5.3L V8", "5.3L"], yr(2007, 2013), "P0300", {
    title: "Random/Multiple Cylinder Misfire — Gen IV 5.3L AFM Engine",
    likelyCauses: [
      "Collapsed Active Fuel Management (AFM) lifter on a deactivated cylinder — cylinders 1, 4, 6, or 7 on Gen IV 5.3L",
      "Worn or fouled AC Delco spark plugs — OEM spec is 41-932 or 41-985, replace at 100k intervals",
      "Failed coil-on-plug ignition coil (cylinder-specific misfires point directly to the coil)",
      "Fuel injector stuck closed or weak (less common but worth checking at high mileage)",
      "Vacuum leak from intake manifold gasket or throttle body gasket",
    ],
    checkFirst: [
      "Scan for cylinder-specific misfire codes (P0301–P0308) — AFM lifter failures typically show on cylinders 1, 4, 6, or 7",
      "Check oil level first — low oil can cause AFM lifters to collapse",
      "Swap the ignition coil from the misfiring cylinder to a known-good cylinder and re-scan — if misfire follows the coil, replace the coil",
      "Inspect spark plugs from the misfiring cylinder — look for oil fouling or excessive gap",
      "Check for AFM lifter noise: with engine running, listen for a ticking/knocking on the driver side of the engine",
      "If AFM lifters are suspected, an AFM disabler device or tune can prevent future failures",
    ],
    avoid: [
      "Do not replace all 8 spark plugs without checking coils first — coil failure is more common than plug failure on this engine",
      "Do not ignore a cylinder-specific misfire code on cylinders 1, 4, 6, or 7 — AFM lifter failure will destroy the cam lobe if not addressed",
      "Do not clear codes without documenting which cylinders are misfiring — the pattern reveals the cause",
    ],
    severity: "High",
    canDrive: "Short distances only if misfire is mild. Stop driving if misfire is severe — continued misfiring can damage the catalytic converter within miles.",
  }),

  ...gmTruck(["5.3L V8", "5.3L"], yr(2007, 2013), "P0420", {
    title: "Catalyst System Efficiency Below Threshold — Bank 1",
    likelyCauses: [
      "Exhaust manifold gasket leak ahead of the upstream O2 sensor — extremely common on 5.3L trucks and throws off sensor readings",
      "Aging catalytic converter — OEM cats on these trucks often degrade after 120–150k miles",
      "Lazy or failing downstream O2 sensor (Bank 1 Sensor 2) giving false efficiency readings",
      "Rich fuel condition from bad MAF sensor or injector issues slowly poisoning the catalyst",
      "Misfire history from AFM lifter failure that damaged the converter with unburned fuel",
    ],
    checkFirst: [
      "Inspect the exhaust manifold and gasket for cracks or leaks — feel or listen for exhaust puffing near the head on the driver side (Bank 1)",
      "Check Bank 1 fuel trims (short-term and long-term) with a scan tool — values over +10% suggest a lean condition degrading the cat",
      "Compare upstream vs. downstream O2 sensor waveforms — downstream should be relatively flat; if it mimics upstream, the cat is dead",
      "Scan for any misfire history codes (P0301–P0308) — misfires send raw fuel into the cat",
      "Verify no pending AFM/misfire codes are present before replacing the converter",
    ],
    avoid: [
      "Do not replace the catalytic converter without first checking for exhaust leaks and fuel trim issues — an exhaust leak alone causes P0420 and costs nothing to fix",
      "Do not replace the downstream O2 sensor hoping it solves P0420 — it rarely does on this engine",
      "Do not use non-CARB-compliant aftermarket cats on California-registered vehicles",
    ],
    severity: "Moderate",
    canDrive: "Yes short-term — P0420 alone does not affect driveability. Address within 1–2 oil changes to avoid worsening converter damage.",
  }),

  ...gmTruck(["5.3L V8", "5.3L"], yr(2007, 2013), "P0442", {
    title: "EVAP System Small Leak Detected",
    likelyCauses: [
      "Loose, cracked, or missing gas cap — most common cause by far on these trucks",
      "Cracked EVAP vapor hose between the fuel tank and charcoal canister (hose runs along the frame and degrades with age)",
      "Faulty canister vent solenoid leaking when it should be closed",
      "Pinhole leak in fuel tank or filler neck hose",
      "Fuel tank pressure sensor port seal",
    ],
    checkFirst: [
      "Remove and reseat the gas cap firmly — if the cap clicks 3+ times, it was loose; clear code and drive 2 cycles before condemning anything else",
      "Inspect the gas cap O-ring for cracks, deformation, or dirt",
      "Inspect all EVAP hoses under the vehicle near the fuel tank (shine a light — look for cracks at hose clamps)",
      "Perform a smoke test on the EVAP system to pinpoint the leak location",
    ],
    avoid: [
      "Do not replace the purge solenoid or charcoal canister without performing a smoke test first — the leak is almost always the cap or a hose",
      "Do not over-tighten a new gas cap — finger-tight plus 1/4 turn is correct",
    ],
    severity: "Low",
    canDrive: "Yes — this is an emissions code only. Repair within 2 weeks to avoid failing emissions inspection.",
  }),

  ...gmTruck(["5.3L V8", "5.3L"], yr(2007, 2013), "P0455", {
    title: "EVAP System Large Leak Detected (Includes No Purge)",
    likelyCauses: [
      "Gas cap missing, not installed, or failed wide open — most common cause",
      "EVAP purge solenoid stuck open — allows large-volume air ingestion",
      "Cracked or disconnected large-bore EVAP hose at the intake manifold or near the canister",
      "Damaged fuel filler neck or missing filler neck check valve",
      "Fuel tank rollover valve failed open",
    ],
    checkFirst: [
      "Verify the gas cap is present and fully seated — remove, inspect the seal, reseat firmly",
      "Locate the EVAP purge solenoid (top of engine, usually near the intake) and inspect the hose connections",
      "Listen for a large hissing sound near the gas cap or fill tube area",
      "Run a smoke test — P0455 (large leak) will show a visible smoke plume quickly",
    ],
    avoid: [
      "Do not replace the purge valve or canister before inspecting the cap and hoses — the large leak is almost always obvious once you look",
    ],
    severity: "Low",
    canDrive: "Yes — emissions code only. Replace gas cap first; repair within 1 week.",
  }),

  ...gmTruck(["5.3L V8", "5.3L"], yr(2007, 2013), "P0171", {
    title: "System Too Lean — Bank 1",
    likelyCauses: [
      "Dirty or contaminated MAF sensor — single most common cause; these trucks respond well to MAF cleaning",
      "Vacuum leak at the intake manifold gasket, PCV hose, throttle body gasket, or brake booster line",
      "Failed PCV valve stuck open allowing excessive crankcase vapors",
      "Fuel pressure low from a weakening fuel pump (especially above 150k miles)",
      "Clogged or weak fuel injector on Bank 1",
    ],
    checkFirst: [
      "Clean the MAF sensor with CRC MAF Cleaner or equivalent — do not use brake cleaner or carb cleaner on the MAF wire",
      "Check Bank 1 long-term fuel trims (LTFT) with a live scan — anything above +10% confirms the ECM is adding fuel to compensate",
      "Inspect all vacuum hoses for cracks, especially the large PCV hose from valve cover to intake",
      "If P0171 and P0174 are both set simultaneously, the MAF sensor is the most likely single cause (affects both banks)",
      "Check fuel pressure at idle and under snap throttle",
    ],
    avoid: [
      "Do not replace O2 sensors hoping to fix a lean code — O2 sensors report the condition, they rarely cause it",
      "Do not replace injectors before checking MAF, vacuum leaks, and fuel pressure first",
    ],
    severity: "Moderate",
    canDrive: "Yes short-term — prolonged lean condition can damage the catalytic converter and cause misfires. Fix within a week.",
  }),

  ...gmTruck(["5.3L V8", "5.3L"], yr(2007, 2013), "P0174", {
    title: "System Too Lean — Bank 2",
    likelyCauses: [
      "Dirty MAF sensor — affects both banks; if P0171 and P0174 are set together, this is almost always the cause",
      "Vacuum leak on the passenger side of the intake (Bank 2) — check the intake manifold gasket on the right side",
      "PCV system failure introducing unmetered air",
      "Weak fuel pressure at high demand (pump weakening)",
      "Clogged Bank 2 injector(s)",
    ],
    checkFirst: [
      "If P0171 and P0174 are both stored, clean the MAF sensor first — this combination is the MAF sensor's signature on the 5.3L",
      "Spray carburetor cleaner carefully around the passenger side intake manifold gasket while the engine idles — a change in idle speed reveals a vacuum leak",
      "Check Bank 2 long-term fuel trims with a live scan",
      "Inspect the PCV valve and hose on the passenger valve cover",
    ],
    avoid: [
      "Do not diagnose Bank 1 and Bank 2 lean codes independently when both are set — a single cause (MAF, PCV) affects both banks simultaneously",
    ],
    severity: "Moderate",
    canDrive: "Yes short-term. Address within a week to protect the catalytic converters.",
  }),
];

// ── Ford F-150 5.4L Triton 3-Valve (2004–2010) ───────────────────────────────

const fordF150_54 = [

  {
    make: "Ford", model: "F-150",
    years: yr(2004, 2010),
    engineIncludes: ["5.4L V8", "5.4L"],
    code: "P0300",
    title: "Random/Multiple Cylinder Misfire — 5.4L Triton 3-Valve",
    likelyCauses: [
      "Blown spark plug — the 5.4L 3-valve aluminum heads have a known thread failure issue where plugs can blow out at high mileage, especially if not changed at factory intervals",
      "Failed coil-on-plug (COP) ignition coil — each cylinder has its own coil; one or more can fail",
      "2-piece spark plug separation — the 5.4L 3-valve uses a 2-piece plug design (2004–2008); removal can break the plug, leaving the lower electrode tip in the head",
      "Variable Camshaft Timing (VCT) solenoid malfunction causing timing-related misfires at idle or low RPM",
      "Phaser rattle on cold start (VCT phaser wear) causing brief misfires",
    ],
    checkFirst: [
      "Scan for cylinder-specific misfire codes (P0301–P0308) — the affected cylinder number points directly to the coil or plug",
      "Before removing the 5.4L spark plugs: warm the engine fully, apply penetrating oil to the plug threads, and let it soak overnight — never remove cold",
      "Swap the ignition coil from the misfiring cylinder to a known-good cylinder — if the misfire moves, you found a bad coil",
      "Inspect for any signs of a physically blown plug: loud exhaust sound, oily residue around a plug well, or a plug thread that turns freely",
      "Check for VCT-related codes (P0022, P0024) alongside misfire codes",
    ],
    avoid: [
      "Do not dry-remove 5.4L 3-valve spark plugs when cold — broken plugs in aluminum heads require expensive thread repair (HeliCoil or specialty tools)",
      "Do not reuse old spark plugs after removal on high-mileage 5.4L engines — the 2-piece design makes reinstallation risky",
      "Do not ignore a misfire on this engine — continued misfiring can damage the catalytic converter within hours",
    ],
    severity: "High",
    canDrive: "No — the 5.4L spark plug blowout is a severe mechanical failure. A misfiring 5.4L should be inspected immediately to determine if a plug has loosened.",
  },

  {
    make: "Ford", model: "F-150",
    years: yr(2004, 2010),
    engineIncludes: ["5.4L V8", "5.4L"],
    code: "P0171",
    title: "System Too Lean — Bank 1",
    likelyCauses: [
      "Dirty or failing MAF sensor — most common single cause on the 5.4L",
      "Cracked or disconnected intake air hose between the MAF and throttle body",
      "Leaking intake manifold gasket on Bank 1 (driver side)",
      "Clogged fuel injectors — fuel injection supply manifold O-rings on the 5.4L can harden and leak, causing lean conditions",
      "Weak fuel pump losing pressure under load",
    ],
    checkFirst: [
      "Clean the MAF sensor using MAF-safe cleaner — watch for the LTFT to drop toward 0% after cleaning",
      "Inspect the intake boot between the airbox and throttle body for cracks (bend the rubber while inspecting)",
      "Check fuel injector rail O-rings at the manifold — these are rubber and crack with age on the 5.4L; you may smell fuel or see residue",
      "Check Bank 1 short and long-term fuel trims with a live scanner",
    ],
    avoid: [
      "Do not replace the O2 sensor — it is reporting a lean condition caused by something upstream, not causing it",
      "Do not replace fuel injectors without inspecting the O-rings and rail seals first",
    ],
    severity: "Moderate",
    canDrive: "Yes short-term. Fix within a week — prolonged lean operation can harm the converter.",
  },

  {
    make: "Ford", model: "F-150",
    years: yr(2004, 2010),
    engineIncludes: ["5.4L V8", "5.4L"],
    code: "P0174",
    title: "System Too Lean — Bank 2",
    likelyCauses: [
      "Dirty MAF sensor (affects both banks — if P0171 and P0174 are both set, MAF is the prime suspect)",
      "Leaking intake manifold gasket on Bank 2 (passenger side)",
      "Cracked intake air duct or loose hose clamp",
      "Fuel rail O-ring leak on the passenger side injector rail",
    ],
    checkFirst: [
      "If P0171 and P0174 are both set together, clean the MAF sensor first — this combination is the MAF's signature",
      "Check Bank 2 long-term fuel trims (should be near 0%)",
      "Inspect passenger side intake manifold gasket for leaks",
    ],
    avoid: [
      "Do not diagnose Bank 1 and Bank 2 lean codes as separate problems when both are stored simultaneously",
    ],
    severity: "Moderate",
    canDrive: "Yes short-term. Fix within a week.",
  },

  {
    make: "Ford", model: "F-150",
    years: yr(2004, 2010),
    engineIncludes: ["5.4L V8", "5.4L"],
    code: "P0420",
    title: "Catalyst System Efficiency Below Threshold — Bank 1",
    likelyCauses: [
      "Cracked or leaking exhaust manifold — extremely common on the 5.4L; the manifold bolts snap and the gasket fails, causing exhaust leaks that fool the downstream O2 sensor",
      "Aging catalytic converter — high-mileage 5.4L cats degrade, especially if the engine has had lean conditions or misfires",
      "Downstream O2 sensor (Bank 1 Sensor 2) becoming lazy or reading incorrectly",
      "Rich condition from a leaking fuel injector rail O-ring contaminating the converter",
    ],
    checkFirst: [
      "Inspect the driver-side exhaust manifold for cracks and the gasket for leaks — feel for exhaust puffing near the head with your hand (engine warm)",
      "Check for snapped exhaust manifold studs — very common on the 5.4L due to the aluminum head and steel stud thermal cycling",
      "Check fuel trims — a rich condition will show negative fuel trims and can damage the converter",
      "Compare upstream vs. downstream O2 sensor activity with a live scan",
    ],
    avoid: [
      "Do not replace the catalytic converter before inspecting the exhaust manifold — a manifold leak on the 5.4L is a well-known P0420 trigger",
      "Do not replace the downstream O2 sensor as a first step",
    ],
    severity: "Moderate",
    canDrive: "Yes short-term. If an exhaust manifold crack is present, address promptly — exhaust leaks near wiring or plastic components are a fire risk.",
  },

  {
    make: "Ford", model: "F-150",
    years: yr(2004, 2010),
    engineIncludes: ["5.4L V8", "5.4L"],
    code: "P0455",
    title: "EVAP System Large Leak Detected",
    likelyCauses: [
      "Missing or failed gas cap — most common cause",
      "EVAP purge solenoid stuck open allowing large-volume flow",
      "Cracked large-diameter EVAP hose at the intake manifold connection",
      "Damaged fuel filler neck or filler tube gasket",
    ],
    checkFirst: [
      "Verify the gas cap is present, undamaged, and seated firmly",
      "Inspect the large EVAP hose running from the charcoal canister to the intake manifold — look for cracks where it bends",
      "Perform a smoke test if cap and hoses check out",
    ],
    avoid: [
      "Do not replace the charcoal canister or purge valve without a smoke test confirming they are the source",
    ],
    severity: "Low",
    canDrive: "Yes — emissions code. Fix within a week.",
  },
];

// ── Toyota Camry 2.4L (2AZ-FE, 2002–2011) ────────────────────────────────────

const toyotaCamry24 = [

  {
    make: "Toyota", model: "Camry",
    years: yr(2002, 2011),
    engineIncludes: ["2.4L", "2AZ"],
    code: "P0420",
    title: "Catalyst System Efficiency Below Threshold — 2AZ-FE Engine",
    likelyCauses: [
      "Upstream (pre-cat) O2 sensor or air-fuel ratio sensor failing — a common and often overlooked cause before condemning the cat on this engine",
      "Oil consumption poisoning the catalytic converter — the 2AZ-FE engine (especially 2007–2011) is known for oil consumption; burning oil kills converters",
      "Aging OEM catalytic converter — high-mileage 2AZ-FE cats do fail, especially if oil burning has been present",
      "Exhaust leak upstream of the sensor affecting O2 readings",
      "Failed downstream O2 sensor",
    ],
    checkFirst: [
      "Check oil level and note consumption rate — if losing more than 1 quart per 1,000 miles, the oil is poisoning the cat; address oil consumption first",
      "Inspect the PCV valve — a stuck-open PCV on the 2AZ-FE causes oil to be drawn directly into the intake, causing oil burning",
      "Replace the upstream air-fuel ratio sensor (A/F sensor) before the catalytic converter — this is frequently the actual fix",
      "Compare upstream A/F sensor activity vs. downstream O2 sensor with a live scan",
      "If a new cat is needed: use a Genuine Toyota OEM catalytic converter — aftermarket units consistently fail P0420 on this engine quickly",
    ],
    avoid: [
      "Do not install an aftermarket catalytic converter on the 2AZ-FE — they routinely fail to pass P0420 within months due to sensor sensitivity",
      "Do not replace the catalytic converter without addressing oil consumption first — a new cat will fail quickly if oil burning continues",
      "Do not replace the downstream O2 sensor as a first step on this vehicle",
    ],
    severity: "Moderate",
    canDrive: "Yes short-term. Address oil consumption urgently if present — engine damage can result from extended high oil consumption.",
  },

  {
    make: "Toyota", model: "Camry",
    years: yr(2002, 2011),
    engineIncludes: ["2.4L", "2AZ"],
    code: "P0171",
    title: "System Too Lean — Bank 1",
    likelyCauses: [
      "Failed or stuck-open PCV valve — the PCV valve on the 2AZ-FE is notorious for failing; a stuck-open PCV pulls oil mist and air directly into the intake, causing lean conditions and oil consumption",
      "Dirty or contaminated MAF sensor",
      "Cracked intake air duct or loose hose clamp between MAF and throttle body",
      "Failed air-fuel ratio sensor (A/F sensor) giving incorrect feedback",
      "Fuel delivery issue — weak injectors or low fuel pressure",
    ],
    checkFirst: [
      "Inspect the PCV valve — replace it as standard maintenance on any 2AZ-FE with a lean code; it is inexpensive and commonly the root cause",
      "Clean the MAF sensor with MAF-safe cleaner",
      "Inspect the intake hose for cracks, especially near the clamps",
      "Check long-term fuel trims with a scan — values above +10% confirm the ECM is adding fuel",
    ],
    avoid: [
      "Do not replace O2 or A/F sensors before checking the PCV valve and MAF sensor",
      "Do not ignore this code — a lean condition from a bad PCV also causes excessive oil consumption on this engine",
    ],
    severity: "Moderate",
    canDrive: "Yes short-term. The PCV valve failure also causes oil burning — address promptly.",
  },

  {
    make: "Toyota", model: "Camry",
    years: yr(2002, 2011),
    engineIncludes: ["2.4L", "2AZ"],
    code: "P0300",
    title: "Random/Multiple Cylinder Misfire — 2AZ-FE Engine",
    likelyCauses: [
      "Worn iridium spark plugs — Toyota specifies OEM NGK or Denso iridium plugs; aftermarket plugs cause misfires on this engine",
      "Failed ignition coil — the 2AZ-FE uses individual coil-on-plug units; one failed coil causes a single-cylinder misfire that registers as P0300",
      "Oil-fouled spark plugs from PCV valve failure or piston ring wear — oil in the cylinder burns on the plugs",
      "Carbon buildup on intake valves — direct injection versions; 2AZ-FE is port-injected but high-mileage examples develop deposits",
      "Vacuum leak at intake manifold gasket",
    ],
    checkFirst: [
      "Scan for cylinder-specific misfire codes — P0301–P0304 point to the exact coil/plug",
      "Check spark plug condition — look for oil fouling or wide electrode gap",
      "Use OEM NGK/Denso iridium plugs only — do not use copper or cheap platinum plugs",
      "Swap coil from misfiring cylinder to known-good and rescan — if misfire follows coil, replace it",
      "Check for oil on spark plugs (PCV valve failure symptom)",
    ],
    avoid: [
      "Do not install non-OEM spark plugs on the 2AZ-FE — they cause misfires even when brand new",
      "Do not ignore oil on spark plugs — it indicates a PCV or ring sealing issue that will damage the engine",
    ],
    severity: "High",
    canDrive: "Short distances only. Persistent misfires damage catalytic converters and indicate underlying mechanical issues on this engine.",
  },
];

// ── Honda Accord 2.4L (K24Z3, 2008–2012) ─────────────────────────────────────

const hondaAccord24 = [

  {
    make: "Honda", model: "Accord",
    years: yr(2008, 2012),
    engineIncludes: ["2.4L", "K24"],
    code: "P0420",
    title: "Catalyst System Efficiency Below Threshold — K24 Engine",
    likelyCauses: [
      "Aging OEM catalytic converter — the 8th gen Accord (2008–2012) is now 12–15 years old; original cats do wear out",
      "Primary (upstream) A/F ratio sensor (Sensor 1) giving degraded readings — replaces O2 sensor on the Honda K24",
      "Secondary oxygen sensor (Sensor 2) lazy or failed",
      "Exhaust leak upstream of the primary sensor — affecting A/F ratio sensor readings",
      "Engine oil or coolant entering combustion from worn rings or a failing head gasket (rare)",
    ],
    checkFirst: [
      "Inspect for exhaust leaks at the manifold and flex pipe connection — a small crack here directly triggers P0420",
      "Check the primary A/F ratio sensor voltage response on a live scan — it should cycle rapidly; a slow-responding sensor mimics a dead cat",
      "If replacing the catalytic converter: use a Genuine Honda or OEM-quality unit — aftermarket cats on the K24 frequently fail P0420 recurrence within months",
      "Verify no active misfire codes or rich conditions are present before replacing the converter",
    ],
    avoid: [
      "Do not install a cheap aftermarket catalytic converter — the K24 A/F sensor system is sensitive and aftermarket cats routinely fail P0420 recurrence",
      "Do not replace both sensors and the cat without systematically testing each",
    ],
    severity: "Moderate",
    canDrive: "Yes short-term. Address within a few weeks.",
  },

  {
    make: "Honda", model: "Accord",
    years: yr(2008, 2012),
    engineIncludes: ["2.4L", "K24"],
    code: "P0171",
    title: "System Too Lean — Bank 1",
    likelyCauses: [
      "IAB (Intake Air Bypass) actuator failure — the 2.4L K24 has a dual-stage intake manifold with an actuator that can fail or get stuck, causing lean conditions at certain RPM ranges",
      "Dirty MAF sensor",
      "Clogged VTEC solenoid screen — oil sludge blocks the screen on the K24, restricting oil to VTEC mechanism and causing rough running with lean codes",
      "Failed PCV valve",
      "Cracked intake hose or loose hose clamp",
    ],
    checkFirst: [
      "Inspect and clean the VTEC solenoid screen (remove the solenoid and clean the mesh filter with brake cleaner) — this is a common Honda-specific fix",
      "Check the IAB actuator operation — it should open and close the secondary intake runners; a stuck actuator causes lean codes at specific RPM ranges",
      "Clean the MAF sensor",
      "Inspect PCV valve and hose condition",
      "Check fuel trims: if LTFT Bank 1 is above +10%, the lean condition is confirmed",
    ],
    avoid: [
      "Do not replace the A/F ratio sensor as a first step — it reports the lean condition but is not causing it on this engine",
      "Do not ignore a clogged VTEC solenoid screen — it also causes low oil pressure to the VTEC mechanism, which can cause severe engine damage over time",
    ],
    severity: "Moderate",
    canDrive: "Yes short-term. Inspect the VTEC solenoid screen within a week — neglecting it can cause engine damage.",
  },

  {
    make: "Honda", model: "Accord",
    years: yr(2008, 2012),
    engineIncludes: ["2.4L", "K24"],
    code: "P0300",
    title: "Random/Multiple Cylinder Misfire — K24 Engine",
    likelyCauses: [
      "Failed ignition coil — individual coil-on-plug units on the K24; one failure causes a misfire on that cylinder",
      "Worn spark plugs — use OEM NGK iridium plugs; aftermarket plugs cause issues on K-series engines",
      "VTC (Variable Timing Control) actuator rattling/failing — common on K24 at startup, causes brief misfires; the actuator is driven by oil pressure and can rattle before oil pressure builds",
      "VTEC solenoid screen clogged (same issue as P0171 — causes rough running and apparent misfires)",
      "Engine oil low causing VTC actuator to rattle — check oil level immediately",
    ],
    checkFirst: [
      "Check engine oil level first — low oil causes VTC actuator rattle and apparent misfires on startup",
      "Scan for cylinder-specific misfire codes to identify the affected cylinder",
      "Swap coils between cylinders and rescan — if misfire follows the coil, replace it",
      "Listen for a rattle on cold startup that clears after a few seconds — this is VTC actuator wear, not a misfire per se",
      "Inspect spark plugs — use OEM NGK/Denso iridium only",
    ],
    avoid: [
      "Do not install aftermarket spark plugs on the K24 — they are a known misfire cause even when brand new",
      "Do not ignore startup rattle — the VTC actuator rattle indicates the actuator or timing chain tensioner needs attention",
    ],
    severity: "High",
    canDrive: "Short distances only. A misfiring K24 should be diagnosed quickly to prevent catalytic converter damage.",
  },
];

// ── Jeep Wrangler 3.6L Pentastar (JK 2012–2017, JL 2018+) ───────────────────

const jeepWrangler36 = [

  {
    make: "Jeep", model: "Wrangler",
    years: [...yr(2012, 2020)],
    engineIncludes: ["3.6L V6", "3.6L", "Pentastar"],
    code: "P0300",
    title: "Random/Multiple Cylinder Misfire — 3.6L Pentastar",
    likelyCauses: [
      "Rocker arm (cam follower) failure — the 2012–2017 3.6L Pentastar has a well-documented rocker arm failure on the exhaust side, most commonly on cylinder #1; this issue was the subject of a NHTSA investigation and some service campaigns",
      "Failed spark plug or ignition coil — use OEM Champion RC12ECC or equivalent",
      "Cylinder #3 is statistically the most common cylinder-specific misfire on early Pentastar engines",
      "Engine oil breakdown causing hydraulic valve lifter sticking — use 5W-20 full synthetic per spec and change at 5,000-mile intervals",
      "VVT (variable valve timing) solenoid contaminated with dirty oil",
    ],
    checkFirst: [
      "Check engine oil level and condition immediately — the Pentastar rocker arm failure is often worsened by neglected oil changes",
      "Scan for cylinder-specific misfire codes (P0301–P0306)",
      "Listen for a ticking sound from the valve train on initial startup — persistent ticking on the 3.6L can indicate rocker arm wear",
      "Swap coils between cylinders and rescan if the misfire is cylinder-specific",
      "Check if the vehicle is within the mileage range of any rocker arm service campaigns (check NHTSA.gov by VIN)",
    ],
    avoid: [
      "Do not ignore a ticking valve train sound combined with a misfire code on the Pentastar — rocker arm failure causes dropped valve seats if not addressed",
      "Do not use extended oil change intervals on the 3.6L — dirty oil is a primary driver of rocker arm and lifter wear on this engine",
    ],
    severity: "High",
    canDrive: "No — if a misfire is present with valve train noise, stop driving. Rocker arm failure can cause catastrophic engine damage quickly.",
  },

  {
    make: "Jeep", model: "Wrangler",
    years: [...yr(2012, 2023)],
    engineIncludes: ["3.6L V6", "3.6L", "Pentastar"],
    code: "P0456",
    title: "EVAP System Very Small Leak Detected",
    likelyCauses: [
      "Loose, cracked, or worn gas cap — by far the most common cause; inspect the seal first",
      "Natural Vacuum Leak Detection (NVLD) module failure — the Jeep NVLD module sits under the vehicle near the fuel tank and can fail, causing false very small leak codes",
      "Charcoal canister vent solenoid not sealing fully",
      "Cracked or kinked fuel vapor line from the tank to the canister",
      "Fuel filler neck seal or O-ring slightly dried out",
    ],
    checkFirst: [
      "Inspect the gas cap first — check the rubber seal for cracks, deformation, or debris; replace the cap (under $20 at any parts store)",
      "Clear the code and drive 2 complete drive cycles before condemning other components",
      "Inspect the NVLD module location under the vehicle — it is exposed to rocks and water on the Wrangler, making physical damage common",
      "Perform a smoke test if gas cap replacement does not resolve the code",
    ],
    avoid: [
      "Do not replace the charcoal canister or NVLD module before replacing the gas cap — a $15 gas cap fixes the majority of P0456 codes on Wranglers",
    ],
    severity: "Low",
    canDrive: "Yes — emissions code only. Replace the gas cap first.",
  },

  {
    make: "Jeep", model: "Wrangler",
    years: [...yr(2012, 2023)],
    engineIncludes: ["3.6L V6", "3.6L", "Pentastar"],
    code: "P0128",
    title: "Coolant Temperature Below Thermostat Regulating Temperature",
    likelyCauses: [
      "Thermostat stuck open or opening too early — this is the most common cause by a significant margin; the OEM Mopar thermostat on the 3.6L Pentastar has a known failure pattern of opening early or sticking partially open",
      "Coolant temperature sensor (CTS) reading lower than actual temperature — sensor failure is less common but possible",
      "Wrangler used in extreme cold weather — very short drives in sub-freezing temperatures can trigger P0128 without a fault",
      "Incorrect non-OEM thermostat installed previously",
    ],
    checkFirst: [
      "Verify the heater produces warm air after 5–7 minutes of driving — if not, the thermostat is stuck open",
      "Use a scan tool to read the actual coolant temperature after 10 minutes of driving — should reach 195–210°F; if it stabilizes at 170°F or lower, the thermostat is confirmed stuck open",
      "Check that the temperature gauge on the dash rises normally — if it barely moves off cold, the thermostat is open",
      "Replace with a Mopar OEM thermostat only — aftermarket thermostats on the 3.6L frequently trigger P0128 recurrence",
    ],
    avoid: [
      "Do not replace the coolant temperature sensor before confirming the thermostat is working — the sensor is almost never the cause on Wranglers",
      "Do not install a non-Mopar OEM thermostat — this code will return with aftermarket thermostats on the Pentastar",
    ],
    severity: "Low",
    canDrive: "Yes — a stuck-open thermostat affects heater performance and fuel economy but is not an immediate hazard. Repair within 2 weeks.",
  },
];

// ── Export combined knowledge base ────────────────────────────────────────────

export const vehicleDtcKnowledge = [
  ...silveradoSierra53,
  ...fordF150_54,
  ...toyotaCamry24,
  ...hondaAccord24,
  ...jeepWrangler36,
];
