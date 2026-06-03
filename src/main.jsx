import React, { useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';
import heroImg from './houndmoto-hero-clean.png';

const suggestions = [
  'P0300', 'PKJ16CR-L11', '2006 Nissan Altima starter', '2011 F-150 5.0 oil capacity',
  '2008 Silverado brake pads', 'Honda Civic battery', 'Toyota Camry serpentine belt', '2000 Grand Marquis fuse box',
];

const searchModes = [
  'All', 'Part Number', 'Trouble Code', 'Fluid Spec',
  'Repair Manual', 'Tire Size', 'Battery', 'Bulb', 'Fuse/Relay',
];

const vendors = [
  { name: 'RockAuto',            note: 'Huge selection, multiple brands, great pricing',            url: q => `https://www.rockauto.com/en/partsearch/?partnum=${encodeURIComponent(q)}` },
  { name: 'AutoZone',            note: 'Local store pickup, same-day availability',                  url: q => `https://www.autozone.com/searchresult?searchText=${encodeURIComponent(q)}` },
  { name: "O'Reilly Auto Parts", note: 'Local stores, often has free loaner tools',                 url: q => `https://www.oreillyauto.com/search?q=${encodeURIComponent(q)}` },
  { name: 'Advance Auto Parts',  note: 'Frequent online coupons, local pickup',                     url: q => `https://shop.advanceautoparts.com/find/searchResults.html?searchTerm=${encodeURIComponent(q)}` },
  { name: 'NAPA Auto Parts',     note: 'Professional-grade, good for hard-to-find parts',           url: q => `https://www.napaonline.com/en/search?q=${encodeURIComponent(q)}` },
  { name: 'Amazon',              note: 'Compare sellers carefully and confirm fitment',             url: q => `https://www.amazon.com/s?k=${encodeURIComponent(q + ' auto part')}` },
  { name: 'Walmart',             note: 'Good for batteries, fluids, filters, and basics',           url: q => `https://www.walmart.com/search?q=${encodeURIComponent(q + ' auto')}` },
  { name: 'PartsGeek',           note: 'Aftermarket options, useful for price comparison',          url: q => `https://www.partsgeek.com/ss/?i=1&ssq=${encodeURIComponent(q)}` },
  { name: 'eBay Motors',         note: 'Good for OEM, used, and discontinued parts',               url: q => `https://www.ebay.com/sch/i.html?_nkw=${encodeURIComponent(q + ' auto part')}` },
];

const repairResources = [
  { name: 'Charm.li',      note: 'DIY repair guides and service documentation', url: q => `https://charm.li/?s=${encodeURIComponent(q)}` },
  { name: 'Lemon Manuals', note: 'Vehicle repair manuals and how-to guides',    url: q => `https://lemon-manuals.com/?s=${encodeURIComponent(q)}` },
];

const fluidExamples = {
  '2006 nissan altima': [
    ['Engine oil', '5W-30, capacity varies by engine, verify manual'],
    ['Coolant', 'Nissan-compatible coolant, do not mix types'],
    ['Transmission', 'ATF or CVT fluid depends on transmission type'],
    ['Brake fluid', 'DOT 3 commonly used, verify cap/manual'],
  ],
  '2020 honda civic': [
    ['Engine oil', '0W-20 commonly used, verify engine/manual'],
    ['Coolant', 'Honda Type 2 compatible coolant'],
    ['Transmission', 'CVT or manual fluid depends on model'],
    ['Brake fluid', 'DOT 3 commonly used, verify cap/manual'],
  ],
  '2020 toyota camry': [
    ['Engine oil', '0W-16 or 0W-20 can vary by engine'],
    ['Coolant', 'Toyota Super Long Life compatible coolant'],
    ['Transmission', 'Toyota WS type commonly used, verify model'],
    ['Brake fluid', 'DOT 3 commonly used, verify cap/manual'],
  ],
};

const dtc = {
  p0300: { title: 'Random/multiple cylinder misfire',                          desc: 'The engine misfired — one or more cylinders did not fire correctly. This can feel like rough idling, shaking, or sudden loss of power.',                                                        checks: ['Check spark plugs and ignition coils', 'Check for vacuum leaks', 'Check fuel pressure and injectors', 'Check compression if misfire persists'],            parts: ['Spark plugs', 'Ignition coils', 'Fuel injectors'] },
  p0420: { title: 'Catalyst system efficiency below threshold',                desc: 'The catalytic converter is not cleaning exhaust gases as well as it should. Could be the converter itself, exhaust leaks, or oxygen sensors.',                                               checks: ['Check for exhaust leaks first', 'Compare upstream and downstream O2 sensor data', 'Confirm converter failure before replacing it'],                          parts: ['Catalytic converter', 'Upstream O2 sensor', 'Downstream O2 sensor'] },
  p0171: { title: 'System too lean — Bank 1',                                  desc: 'The engine is getting too much air or not enough fuel on one side. Common causes are air leaks or a dirty sensor.',                                                                           checks: ['Inspect intake and vacuum hoses for leaks', 'Clean or replace the MAF sensor', 'Check fuel pressure', 'Inspect PCV hoses'],                               parts: ['MAF sensor', 'Vacuum hoses', 'Fuel pressure regulator', 'Fuel injectors'] },
  p0128: { title: 'Coolant temperature below thermostat regulating temperature', desc: 'The engine is not reaching normal operating temperature. A stuck-open thermostat is the most common cause.',                                                                             checks: ['Replace thermostat — most likely cause', 'Check coolant level', 'Review coolant temp sensor live data'],                                                    parts: ['Thermostat', 'Coolant temperature sensor'] },
  p0442: { title: 'Small EVAP leak detected',                                  desc: 'A small leak was found in the system that traps fuel vapors. A loose or cracked gas cap is the most common cause.',                                                                           checks: ['Tighten or replace the gas cap first', 'Inspect purge valve and vent valve', 'Smoke test the EVAP system to find leaks'],                                parts: ['Gas cap', 'Purge valve', 'EVAP canister vent valve'] },
};

const partLibrary = [
  { keys: ['starter'],                       name: 'Starter Motor',          does: 'Cranks the engine when you turn the key. If you hear a single click or nothing at all, the starter may be failing.',                                                                         aka: 'Starting motor, cranking motor',                              warn: 'Fitment varies by engine size and transmission type. Include engine size and automatic vs. manual in your search.' },
  { keys: ['alternator'],                    name: 'Alternator',             does: 'Keeps the battery charged while the engine runs. Signs of failure: battery warning light on, dim headlights, dead battery.',                                                                  aka: 'Charging unit, generator (older term)',                        warn: 'Alternators vary by amperage. High-accessory trucks may need a higher-amp unit. Match the output rating.' },
  { keys: ['battery'],                       name: 'Automotive Battery',     does: 'Powers the starter and electrical system when the engine is off. Batteries last 3–5 years. Slow cranking or dimming lights mean it is time to test yours.',                                   aka: 'Car battery, lead-acid battery, AGM battery',                  warn: 'Group size and cold cranking amps (CCA) must match your vehicle. Check the label on your old battery or the owner\'s manual.' },
  { keys: ['brake pad', 'brake pads', 'rotor', 'brake'], name: 'Brake Pads & Rotors', does: 'Brake pads press against the rotor to stop the car. Squealing or grinding sounds mean they need replacing. Do not delay brake work.',                                              aka: 'Disc brake pads, friction pads, brake shoes (on drum brakes)',  warn: 'Sizes vary by front/rear axle and vehicle trim. Some vehicles use drum brakes in the rear — confirm before ordering.' },
  { keys: ['serpentine belt', 'drive belt'], name: 'Serpentine Belt',        does: 'Drives the alternator, AC compressor, and power steering pump from the engine. A cracked or squealing belt should be replaced soon.',                                                         aka: 'Drive belt, accessory belt, V-belt',                           warn: 'Belt length and rib count must match exactly. The routing diagram is usually on a sticker under the hood.' },
  { keys: ['spark plug', 'spark plugs'],     name: 'Spark Plugs',           does: 'Ignite the air-fuel mixture inside the engine. Worn plugs cause rough idle, misfires, poor fuel economy, and hard starting.',                                                                  aka: 'Ignition plugs, iridium plugs, platinum plugs',                warn: 'Heat range and thread size must match your engine. Never substitute based on appearance alone.' },
  { keys: ['oxygen sensor', 'o2 sensor'],    name: 'Oxygen (O2) Sensor',    does: 'Measures exhaust oxygen so the computer can adjust the fuel mix. A bad sensor causes poor fuel economy, failed emissions tests, and trouble codes.',                                           aka: 'O2 sensor, lambda sensor, exhaust sensor',                      warn: 'Position matters — upstream or downstream, and which bank. Upstream and downstream sensors are not interchangeable.' },
  { keys: ['fuse', 'relay', 'fuse box'],     name: 'Fuse or Relay',         does: 'Fuses protect circuits from overloads. Relays switch high-current loads. A blown fuse causes exactly one component to stop working.',                                                          aka: 'ATO fuse, blade fuse, mini fuse, maxi fuse, relay switch',      warn: 'Always match the fuse amperage exactly. A higher-amp fuse can cause a fire. Check the fuse diagram on the box cover or in the owner\'s manual.' },
  { keys: ['coolant', 'antifreeze'],         name: 'Engine Coolant',         does: 'Prevents overheating in summer and freezing in winter. Also protects the cooling system from corrosion.',                                                                                     aka: 'Antifreeze, radiator fluid',                                    warn: 'Coolant types are NOT interchangeable. Mixing types can cause damage. Use only the type specified in your owner\'s manual.' },
  { keys: ['transmission fluid'],            name: 'Transmission Fluid',    does: 'Lubricates and cools the transmission. Low or burnt fluid causes slipping, hard shifts, and eventually transmission failure.',                                                                  aka: 'ATF, CVT fluid, gear oil (manual), Mercon, Dexron',            warn: 'Transmission fluid specs are very specific. Using the wrong type can damage seals. Verify the exact spec before adding or changing.' },
  { keys: ['oil capacity', 'oil change', 'motor oil', 'engine oil'], name: 'Engine Oil', does: 'Lubricates all moving parts inside the engine. Change it at the interval in your owner\'s manual to prevent wear.',                                                              aka: 'Motor oil, engine lubricant, synthetic oil, conventional oil',  warn: 'Use the exact viscosity grade in your owner\'s manual — for example, 5W-30 or 0W-20. Wrong viscosity reduces protection.' },
  { keys: ['wheel bearing', 'hub bearing'],  name: 'Wheel Bearing',         does: 'Lets the wheel spin smoothly on the axle. A worn bearing makes a humming or grinding noise that changes when you steer.',                                                                       aka: 'Hub bearing, wheel hub assembly',                               warn: 'Left vs. right and front vs. rear are different parts. 2WD and 4WD versions also differ. Confirm all details before ordering.' },
  { keys: ['catalytic converter', 'cat converter'], name: 'Catalytic Converter', does: 'Cleans harmful exhaust gases before they leave the tailpipe. Failure often triggers P0420 and reduces power.',                                                                          aka: 'Cat, three-way catalyst',                                       warn: 'California (CARB) and Federal emissions vehicles require different converters. Check your state\'s requirements.' },
  { keys: ['thermostat'],                    name: 'Thermostat',             does: 'Controls coolant flow to keep the engine at the right temperature. Stuck open = runs cold. Stuck closed = overheats.',                                                                         aka: 'Engine thermostat, coolant thermostat',                         warn: 'Match the temperature rating to your vehicle\'s specification. Wrong temp rating affects fuel economy and performance.' },
  { keys: ['timing belt', 'timing chain'],   name: 'Timing Belt / Chain',   does: 'Keeps the camshaft and crankshaft in sync. A broken timing belt can destroy the engine. Replace at the manufacturer\'s scheduled interval — do not wait.',                                    aka: 'Cam belt, timing chain',                                        warn: 'Check your owner\'s manual for the replacement interval. This is critical — do not defer it.' },
  { keys: ['water pump'],                    name: 'Water Pump',            does: 'Circulates coolant through the engine and radiator. Failure causes overheating. Often replaced at the same time as the timing belt.',                                                            aka: 'Coolant pump',                                                  warn: 'If doing a timing belt job, replacing the water pump at the same time is strongly recommended — it is in the same area.' },
  { keys: ['strut', 'shock absorber', 'shock'], name: 'Strut / Shock Absorber', does: 'Controls suspension movement. Worn shocks cause excessive bouncing, swaying around corners, and longer stopping distances.',                                                           aka: 'Shock absorber, damper, strut assembly',                        warn: 'Always replace in pairs — both fronts together or both rears together — for balanced handling. Front and rear are different parts.' },
  { keys: ['cv axle', 'cv joint'],           name: 'CV Axle / CV Joint',    does: 'Transfers power from the transmission to the wheels while the suspension moves. Clicking sounds when turning are a sign of CV joint failure.',                                                 aka: 'Half shaft, drive axle, constant velocity joint',               warn: 'Front/rear and left/right versions are different. Always specify the exact position.' },
];

const vehicleMakes = [
  'Acura', 'BMW', 'Buick', 'Cadillac', 'Chevrolet', 'Chrysler', 'Dodge', 'Ford',
  'GMC', 'Honda', 'Hyundai', 'Infiniti', 'Jeep', 'Kia', 'Lexus', 'Lincoln',
  'Mazda', 'Mercedes-Benz', 'Mitsubishi', 'Nissan', 'RAM', 'Subaru', 'Toyota',
  'Volkswagen', 'Volvo',
];

const vehicleModels = {
  Acura: ['ILX','MDX','RDX','RLX','TL','TSX'],
  BMW: ['1 Series','3 Series','5 Series','7 Series','X1','X3','X5'],
  Buick: ['Enclave','Encore','LaCrosse','Regal','Verano'],
  Cadillac: ['ATS','CTS','Escalade','SRX','XT5','XTS'],
  Chevrolet: ['Camaro','Colorado','Corvette','Cruze','Equinox','Impala','Malibu','Silverado 1500','Silverado 2500HD','Suburban','Tahoe','Traverse'],
  Chrysler: ['200','300','Pacifica','PT Cruiser','Town & Country'],
  Dodge: ['Challenger','Charger','Dakota','Durango','Grand Caravan','Journey','Ram 1500'],
  Ford: ['Edge','Escape','Expedition','Explorer','F-150','F-250 Super Duty','Focus','Fusion','Mustang','Ranger','Transit'],
  GMC: ['Acadia','Canyon','Envoy','Sierra 1500','Sierra 2500HD','Terrain','Yukon'],
  Honda: ['Accord','CR-V','Civic','Fit','HR-V','Odyssey','Pilot','Ridgeline'],
  Hyundai: ['Accent','Elantra','Ioniq','Santa Fe','Sonata','Tucson','Veloster'],
  Infiniti: ['FX35','G35','G37','Q50','Q60','QX60'],
  Jeep: ['Cherokee','Compass','Gladiator','Grand Cherokee','Liberty','Renegade','Wrangler'],
  Kia: ['Forte','Optima','Soul','Sorento','Sportage','Stinger','Telluride'],
  Lexus: ['ES','GX','IS','LS','LX','NX','RX'],
  Lincoln: ['Continental','MKC','MKX','MKZ','Navigator','Town Car'],
  Mazda: ['CX-5','CX-9','Mazda2','Mazda3','Mazda6','MX-5 Miata'],
  'Mercedes-Benz': ['C-Class','E-Class','GLC','GLE','GLK','ML-Class','S-Class'],
  Mitsubishi: ['Eclipse','Endeavor','Galant','Lancer','Montero','Outlander'],
  Nissan: ['370Z','Altima','Frontier','Maxima','Murano','Pathfinder','Rogue','Sentra','Titan'],
  RAM: ['1500','2500','3500','ProMaster'],
  Subaru: ['BRZ','Crosstrek','Forester','Impreza','Legacy','Outback','WRX'],
  Toyota: ['4Runner','Avalon','Camry','Corolla','Highlander','Prius','RAV4','Sienna','Tacoma','Tundra'],
  Volkswagen: ['Atlas','Beetle','Golf','Jetta','Passat','Tiguan'],
  Volvo: ['S60','S80','V60','XC40','XC60','XC90'],
};

const vehicleEngines = [
  '2.0L','2.2L','2.4L','2.5L','2.7L','3.0L','3.3L','3.5L','3.6L','3.8L',
  '4.0L','4.6L','4.7L','5.0L','5.3L','5.4L','5.7L','6.0L','6.2L',
  '6.7L Diesel','7.3L','Electric / Hybrid',
];

const partCategories = {
  'Engine & Drivetrain':  ['Starter','Alternator','Serpentine belt','Spark plugs','Timing belt','Water pump','Oil & filter','Air filter','Fuel filter','Throttle body'],
  'Battery & Electrical': ['Battery','Fuses & relays','Headlight bulb','Tail light bulb','Turn signal bulb','Oxygen sensor','MAF sensor'],
  'Brakes':               ['Brake pads','Rotors','Brake calipers','Brake lines','ABS sensor','Brake fluid','Wheel cylinders'],
  'Cooling & Fluids':     ['Thermostat','Radiator','Water pump','Coolant flush','Transmission fluid','Power steering fluid'],
  'Suspension & Steering':['Struts','Shocks','Control arms','Ball joints','Tie rod ends','Power steering pump','Wheel bearings','CV axle'],
  'Exhaust & Emissions':  ['Catalytic converter','Oxygen sensors','EGR valve','PCV valve','Muffler'],
  'Tires & Wheels':       ['Tires','Wheel hub','TPMS sensor','Lug nuts'],
  'Interior & HVAC':      ['Cabin air filter','AC compressor','Heater core','Blower motor','Wiper blades'],
};

// FUTURE: Cross-reference database — maps part numbers to equivalents across brands
// const crossReferenceDb = {}; // { [partNumber]: [{ brand, partNumber, notes }] }

// FUTURE: Fluid specification database — full OEM vehicle coverage
// const fluidSpecDb = {}; // { [vehicleKey]: { oil, coolant, transmission, brakeFluid, powerSteering } }

// FUTURE: Tire fitment database — OEM and compatible sizes per vehicle
// const tireDb = {}; // { [vehicleKey]: { oemSize, optional: string[], loadRating, rimDiameter } }

// FUTURE: Battery lookup database — group size, CCA, and reserve capacity per vehicle
// const batteryDb = {}; // { [vehicleKey]: { groupSize, minCca, reserveCapacity } }

function normalize(v) { return v.trim().replace(/\s+/g, ' '); }
function getYear(q) { const m = q.match(/\b(19[8-9]\d|20[0-3]\d)\b/); return m ? m[0] : ''; }
function getDtc(q) { const m = q.toLowerCase().match(/\b[pbcup][0-9a-f]{4}\b/); return m ? m[0] : ''; }
function getTireSize(q) { const m = q.match(/\b(?:P|LT|ST|T)?(\d{3})\/(\d{2})R(\d{2}(?:\.\d)?)\b/i); return m ? m[0].toUpperCase() : ''; }

function detectPartNumber(q) {
  if (!q || q.length < 4 || q.length > 25) return null;
  if (getYear(q) || getDtc(q)) return null;
  if (q.split(' ').length > 2) return null;
  if (!/[a-zA-Z]/.test(q) || !/[0-9]/.test(q)) return null;
  if (/^[A-Z]{1,4}\d{1,2}[A-Z]{1,4}(?:-[A-Z]?\d{0,3})?$/i.test(q)) return { likelyType: 'Spark Plug or Ignition Component' };
  if (q.replace(/-/g, '').length >= 6 && /^[A-Z0-9][-A-Z0-9]{4,}$/i.test(q)) return { likelyType: 'OEM or Aftermarket Part Number' };
  return null;
}

function buildPartMatch(cleanQuery) {
  const lower = cleanQuery.toLowerCase();
  const code  = getDtc(cleanQuery);
  const year  = getYear(cleanQuery);
  const pn    = detectPartNumber(cleanQuery);

  if (code && dtc[code]) {
    const d = dtc[code];
    return { kind: 'dtc', name: `Code ${code.toUpperCase()} — ${d.title}`, vehicleFit: year ? `Year ${year} found in your search` : 'Applies to any vehicle showing this code', whatItDoes: d.desc, aka: null, warn: 'Fix the cause, not just the code. Clear and verify after repair.', parts: d.parts };
  }
  if (pn) {
    return { kind: 'partNumber', name: `Part Number: ${cleanQuery}`, vehicleFit: 'Verify this part fits your specific vehicle before ordering', whatItDoes: `Identified as a possible ${pn.likelyType}. Use cross-reference links to find OEM and aftermarket equivalents.`, aka: 'Part numbers vary by manufacturer. Cross-reference tools below can help.', warn: 'The same part number may not fit all vehicles. Confirm year, make, model, and engine compatibility.', parts: [] };
  }
  for (const e of partLibrary) {
    if (e.keys.some(k => lower.includes(k))) {
      return { kind: 'part', name: e.name, vehicleFit: year ? `Year ${year} found in your search` : 'Verify fitment for your year, make, and model', whatItDoes: e.does, aka: e.aka, warn: e.warn, parts: [] };
    }
  }
  return { kind: 'generic', name: cleanQuery, vehicleFit: year ? `Year ${year} found in your search` : 'Add year, make, and model for more specific results', whatItDoes: 'Use the price links and cross-reference tools below to find this part.', aka: null, warn: 'Always verify part fitment for your specific year, make, model, and engine.', parts: [] };
}

function App() {
  const [query, setQuery] = useState('');
  const [searched, setSearched] = useState(false);
  const [vinResult, setVinResult] = useState(null);
  const [vinDecoding, setVinDecoding] = useState(false);
  const [mode, setMode] = useState('All');
  const [showVehicleLookup, setShowVehicleLookup] = useState(false);
  const [vYear, setVYear] = useState('');
  const [vMake, setVMake] = useState('');
  const [vModel, setVModel] = useState('');
  const [vEngine, setVEngine] = useState('');
  const [vCategory, setVCategory] = useState('');
  const [vPart, setVPart] = useState('');

  const cleanQuery = normalize(query);
  const lower      = cleanQuery.toLowerCase();
  const code       = getDtc(cleanQuery);
  const tireSize   = getTireSize(cleanQuery);

  const partMatch  = useMemo(() => buildPartMatch(cleanQuery), [cleanQuery]);
  const fluidMatch = useMemo(() => Object.entries(fluidExamples).find(([k]) => lower.includes(k)), [lower]);
  const years      = useMemo(() => { const a = []; for (let y = 2025; y >= 1985; y--) a.push(String(y)); return a; }, []);

  async function runSearch() {
    const q = cleanQuery;
    if (!q) return;
    setVinResult(null);
    if (/^[A-HJ-NPR-Z0-9]{17}$/i.test(q)) {
      setVinDecoding(true);
      try {
        const res  = await fetch(`https://vpic.nhtsa.dot.gov/api/vehicles/DecodeVinValues/${q.toUpperCase()}?format=json`);
        const data = await res.json();
        const item = data?.Results?.[0];
        if (item?.ModelYear) {
          setVinResult(item);
          const decoded = [item.ModelYear, item.Make, item.Model].filter(Boolean).join(' ');
          if (decoded) setQuery(decoded);
        }
      } catch { /* silent — search still runs with raw query */ }
      setVinDecoding(false);
    }
    setSearched(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function reset() {
    setQuery(''); setSearched(false); setVinResult(null); setVinDecoding(false);
    setVYear(''); setVMake(''); setVModel(''); setVEngine(''); setVCategory(''); setVPart('');
    setShowVehicleLookup(false);
  }

  function applySuggestion(s) { setQuery(s); setSearched(true); window.scrollTo({ top: 0, behavior: 'smooth' }); }

  function applyVehicleLookup() {
    if (!vYear || !vMake || !vModel) return;
    setQuery([vYear, vMake, vModel, vEngine, vPart].filter(Boolean).join(' '));
    setSearched(true); setShowVehicleLookup(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  const showTrouble = (mode === 'All' || mode === 'Trouble Code') && code && dtc[code];
  const showFluid   = mode === 'All' || mode === 'Fluid Spec';

  return (
    <main>
      <img src={heroImg} alt="HoundMoto" className="heroImg" />

      <header className="hero">
        <div className="brandRow">
          <div className="logo">🐕‍🦺</div>
          <div><h1>HoundMoto</h1><p>Parts, fluids, trouble codes, and vendor links.</p></div>
        </div>
        <div className="warning"><strong>Important:</strong> HoundMoto does not sell parts and does not guarantee fitment. Always confirm fitment with the retailer, owner's manual, or a qualified mechanic.</div>
        <div className="modePicker">
          {searchModes.map(m => <button key={m} className={`modeBtn${mode === m ? ' active' : ''}`} onClick={() => setMode(m)}>{m}</button>)}
        </div>
        <div className="searchPanel">
          <input value={query} onChange={e => setQuery(e.target.value)} onKeyDown={e => e.key === 'Enter' && runSearch()} placeholder="Part, code, VIN, or year make model…" />
          <button onClick={runSearch} disabled={vinDecoding}>{vinDecoding ? 'Decoding…' : 'Search'}</button>
          <button className="light" onClick={reset}>Reset</button>
        </div>
        <div className="chips">
          {suggestions.map(s => <button key={s} className="chip" onClick={() => applySuggestion(s)}>{s}</button>)}
        </div>
        <button className="vehicleToggle" onClick={() => setShowVehicleLookup(v => !v)}>
          {showVehicleLookup ? '▲ Close Vehicle Lookup' : '▼ Look Up by Vehicle  (Year → Make → Model → Part)'}
        </button>
      </header>

      {showVehicleLookup && (
        <section className="card">
          <h2>Look Up a Part for Your Vehicle</h2>
          <p className="muted">Choose your vehicle step by step. Each choice unlocks the next one.</p>
          <div className="vehicleTree">
            <select value={vYear}     onChange={e => { setVYear(e.target.value); setVMake(''); setVModel(''); setVEngine(''); setVCategory(''); setVPart(''); }}>
              <option value="">1. Year</option>
              {years.map(y => <option key={y}>{y}</option>)}
            </select>
            <select value={vMake}     onChange={e => { setVMake(e.target.value); setVModel(''); setVEngine(''); setVCategory(''); setVPart(''); }} disabled={!vYear}>
              <option value="">2. Make</option>
              {vehicleMakes.map(m => <option key={m}>{m}</option>)}
            </select>
            <select value={vModel}    onChange={e => { setVModel(e.target.value); setVEngine(''); setVCategory(''); setVPart(''); }} disabled={!vMake}>
              <option value="">3. Model</option>
              {(vehicleModels[vMake] || []).map(m => <option key={m}>{m}</option>)}
            </select>
            <select value={vEngine}   onChange={e => setVEngine(e.target.value)} disabled={!vModel}>
              <option value="">4. Engine (optional)</option>
              {vehicleEngines.map(e => <option key={e}>{e}</option>)}
            </select>
            <select value={vCategory} onChange={e => { setVCategory(e.target.value); setVPart(''); }} disabled={!vModel}>
              <option value="">5. Part Category</option>
              {Object.keys(partCategories).map(c => <option key={c}>{c}</option>)}
            </select>
            <select value={vPart}     onChange={e => setVPart(e.target.value)} disabled={!vCategory}>
              <option value="">6. Part Needed</option>
              {(partCategories[vCategory] || []).map(p => <option key={p}>{p}</option>)}
            </select>
          </div>
          {vYear && vMake && vModel && (
            <div className="vehiclePreview">
              <p className="muted">Will search: <strong>{[vYear, vMake, vModel, vEngine, vPart].filter(Boolean).join(' ')}</strong></p>
              <button onClick={applyVehicleLookup}>Search This Vehicle</button>
            </div>
          )}
        </section>
      )}


      {!searched && (
        <section className="card">
          <p className="introText">Search parts, trouble codes, fluid specs, repair resources, and vendor price links in one place.</p>
        </section>
      )}

      {searched && (
        <>
          {/* VIN DECODED RESULT */}
          {vinResult && (
            <section className="card vinResultCard">
              <h2>VIN Decoded</h2>
              <div className="resultBox">
                <strong>{vinResult.ModelYear} {vinResult.Make} {vinResult.Model}</strong>
                <span>{vinResult.Trim || ''}{vinResult.EngineCylinders ? `, ${vinResult.EngineCylinders} cylinders` : ''}</span>
              </div>
              <p className="muted">Results below are for this vehicle.</p>
            </section>
          )}

          {/* 1. BEST MATCH */}
          <section className="card bestMatch">
            <div className="bestMatchHeader">
              <span className="bestMatchBadge">Best Match</span>
              <h2 className="bestMatchTitle">{partMatch.name}</h2>
            </div>
            <div className="bestMatchGrid">
              <div className="bestMatchItem">
                <span className="bestMatchLabel">Vehicle Fit</span>
                <span className="bestMatchValue">{partMatch.vehicleFit}</span>
              </div>
              <div className="bestMatchItem">
                <span className="bestMatchLabel">What It Does</span>
                <span className="bestMatchValue">{partMatch.whatItDoes}</span>
              </div>
              {partMatch.aka && (
                <div className="bestMatchItem">
                  <span className="bestMatchLabel">Also Known As</span>
                  <span className="bestMatchValue">{partMatch.aka}</span>
                </div>
              )}
              <div className="bestMatchItem fitmentWarnInline">
                <span className="bestMatchLabel">⚠ Fitment Warning</span>
                <span className="bestMatchValue">{partMatch.warn}</span>
              </div>
              {partMatch.parts && partMatch.parts.length > 0 && (
                <div className="bestMatchItem">
                  <span className="bestMatchLabel">Parts to Check</span>
                  <span className="bestMatchValue">{partMatch.parts.join(' · ')}</span>
                </div>
              )}
            </div>
            <div className="bestMatchActions">
              <a className="actionBtn" href="#prices">Check Prices</a>
              <a className="actionBtn secondary" href="#crossref">Cross Reference</a>
              <a className="actionBtn secondary" href="#repair">Repair Info</a>
            </div>
          </section>

          {/* 2. TROUBLE CODE DETAILS */}
          {showTrouble && (
            <section className="card">
              <h2>Diagnostic Steps for {code.toUpperCase()}</h2>
              <p className="muted">Work through these in order before buying any parts.</p>
              <ul>{dtc[code].checks.map(item => <li key={item}>{item}</li>)}</ul>
            </section>
          )}

          {/* 3. VENDOR PRICE PREVIEW */}
          <section className="card" id="prices">
            <h2>Check Prices at 9 Vendors</h2>
            <p className="muted">HoundMoto does not know the current prices. Click any button to check live pricing at that store.</p>
            <div className="vendorList">
              {vendors.map(v => (
                <div className="vendorRow" key={v.name}>
                  <div className="vendorInfo">
                    <span className="vendorName">{v.name}</span>
                    <span className="vendorNote">{v.note}</span>
                  </div>
                  <a className="priceBtn" href={v.url(cleanQuery)} target="_blank" rel="noreferrer">Check Live Price →</a>
                </div>
              ))}
            </div>
          </section>

          {/* 4. CROSS REFERENCE HELP */}
          <section className="card" id="crossref">
            <h2>Cross Reference Help</h2>
            <p className="muted">Find the same part under a different brand name or OEM number.</p>
            <div className="crossRefList">
              <a className="crossRefLink" href={`https://www.google.com/search?q=${encodeURIComponent(cleanQuery + ' OEM part number equivalent')}`} target="_blank" rel="noreferrer">
                <span className="crossRefLabel">OEM Equivalent Search</span>
                <span className="crossRefNote">Find the original manufacturer part number for this part</span>
              </a>
              <a className="crossRefLink" href={`https://www.google.com/search?q=${encodeURIComponent(cleanQuery + ' aftermarket cross reference')}`} target="_blank" rel="noreferrer">
                <span className="crossRefLabel">Aftermarket Equivalent Search</span>
                <span className="crossRefNote">Find aftermarket brands that make the same part</span>
              </a>
              <a className="crossRefLink" href={`https://www.google.com/search?q=${encodeURIComponent(cleanQuery + ' cross reference')}`} target="_blank" rel="noreferrer">
                <span className="crossRefLabel">Google Cross Reference</span>
                <span className="crossRefNote">General cross-reference search for this part or number</span>
              </a>
              <a className="crossRefLink" href={`https://www.amazon.com/s?k=${encodeURIComponent(cleanQuery + ' auto part')}`} target="_blank" rel="noreferrer">
                <span className="crossRefLabel">Amazon Part Search</span>
                <span className="crossRefNote">Browse Amazon listings — verify fitment before buying</span>
              </a>
              <a className="crossRefLink" href={`https://www.rockauto.com/en/partsearch/?partnum=${encodeURIComponent(cleanQuery)}`} target="_blank" rel="noreferrer">
                <span className="crossRefLabel">RockAuto Part Number Search</span>
                <span className="crossRefNote">RockAuto lists parts by vehicle — use their vehicle selector for best results</span>
              </a>
            </div>
          </section>

          {/* 5. REPAIR INFO */}
          <section className="card" id="repair">
            <h2>Repair Guides &amp; Manuals</h2>
            <p className="muted">External sites for guides and manuals. HoundMoto does not host or copy their content.</p>
            <div className="retailerGrid">
              {repairResources.map(r => (
                <a className="retailer" key={r.name} href={r.url(cleanQuery)} target="_blank" rel="noreferrer">
                  <strong>{r.name}</strong><span>{r.note}</span>
                </a>
              ))}
            </div>
          </section>

          {/* 6. FLUID SPECS */}
          {showFluid && (
            <section className="card">
              <h2>Fluid Specs</h2>
              {fluidMatch
                ? <div>{fluidMatch[1].map(([n, s]) => <div className="fluid" key={n}><strong>{n}</strong><span>{s}</span></div>)}</div>
                : <p className="muted">No exact fluid data loaded for this vehicle yet. Use vendor links above and verify against your owner's manual before adding anything.</p>
              }
            </section>
          )}

          {/* 7. MODE PLACEHOLDERS */}
          {mode === 'Tire Size' && (
            <section className="card">
              <h2>Tire Size</h2>
              {tireSize
                ? <><p><strong>Detected:</strong> {tireSize}</p><p className="muted">Tire fitment database coming soon. Use vendor links above to shop by size.</p></>
                : <p className="muted">Enter a size like 225/65R17 for size-specific results. Tire database coming soon.</p>
              }
            </section>
          )}
          {mode === 'Battery' && <section className="card"><h2>Battery Lookup</h2><p className="muted">Battery group-size database coming soon. Include year, make, and model in your search for best results above.</p></section>}
          {mode === 'Bulb'    && <section className="card"><h2>Bulb Reference</h2><p className="muted">Bulb cross-reference database coming soon. Include bulb position (headlight, brake light, turn signal) in your search.</p></section>}
          {mode === 'Fuse/Relay' && <section className="card"><h2>Fuse &amp; Relay Reference</h2><p className="muted">Fuse box diagram database coming soon. Include year, make, model, and fuse location in your search.</p></section>}
        </>
      )}

      <footer>HoundMoto is an information tool only. No payments, no inventory, no repair guarantees.</footer>
    </main>
  );
}

createRoot(document.getElementById('root')).render(<App />);
