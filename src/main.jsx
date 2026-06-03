import React, { useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

const retailers = [
  { name: 'AutoZone', note: 'Local pickup, fitment check on retailer site', url: q => `https://www.autozone.com/searchresult?searchText=${encodeURIComponent(q)}` },
  { name: "O'Reilly Auto Parts", note: 'Good for local-store availability', url: q => `https://www.oreillyauto.com/search?q=${encodeURIComponent(q)}` },
  { name: 'RockAuto', note: 'Often good pricing, use vehicle selector if search is broad', url: q => `https://www.rockauto.com/en/partsearch/?partnum=${encodeURIComponent(q)}` },
  { name: 'PartsGeek', note: 'Aftermarket part comparison', url: q => `https://www.partsgeek.com/ss/?i=1&ssq=${encodeURIComponent(q)}` },
  { name: 'Amazon', note: 'Check seller reputation and fitment carefully', url: q => `https://www.amazon.com/s?k=${encodeURIComponent(q + ' auto part')}` },
  { name: 'eBay Motors', note: 'Good for used, discontinued, and OEM parts', url: q => `https://www.ebay.com/sch/i.html?_nkw=${encodeURIComponent(q + ' auto part')}` },
  { name: 'Walmart Auto', note: 'Useful for fluids, batteries, wipers, filters', url: q => `https://www.walmart.com/search?q=${encodeURIComponent(q + ' auto')}` }
];

const fluidExamples = {
  '2006 nissan altima': [
    ['Engine oil', '5W-30, capacity varies by engine, verify manual'],
    ['Coolant', 'Nissan-compatible coolant, do not mix types'],
    ['Transmission', 'ATF or CVT fluid depends on transmission type'],
    ['Brake fluid', 'DOT 3 commonly used, verify cap/manual']
  ],
  '2020 honda civic': [
    ['Engine oil', '0W-20 commonly used, verify engine/manual'],
    ['Coolant', 'Honda Type 2 compatible coolant'],
    ['Transmission', 'CVT or manual fluid depends on model'],
    ['Brake fluid', 'DOT 3 commonly used, verify cap/manual']
  ],
  '2020 toyota camry': [
    ['Engine oil', '0W-16 or 0W-20 can vary by engine'],
    ['Coolant', 'Toyota Super Long Life compatible coolant'],
    ['Transmission', 'Toyota WS type commonly used, verify model'],
    ['Brake fluid', 'DOT 3 commonly used, verify cap/manual']
  ]
};

const dtc = {
  p0300: { title: 'Random/multiple cylinder misfire', checks: ['Check spark plugs and coils', 'Check vacuum leaks', 'Check fuel pressure', 'Check compression if misfire stays'] },
  p0420: { title: 'Catalyst system efficiency below threshold', checks: ['Check exhaust leaks first', 'Check upstream/downstream oxygen sensor data', 'Confirm converter failure before replacing'] },
  p0171: { title: 'System too lean, Bank 1', checks: ['Check intake/vacuum leaks', 'Check MAF sensor contamination', 'Check fuel pressure', 'Check PCV hoses'] },
  p0128: { title: 'Coolant temperature below thermostat regulating temperature', checks: ['Thermostat may be stuck open', 'Check coolant level', 'Check coolant temp sensor data'] },
  p0442: { title: 'Small EVAP leak detected', checks: ['Check gas cap seal', 'Inspect purge/vent valves', 'Smoke test EVAP system'] }
};

function normalize(value) {
  return value.trim().replace(/\s+/g, ' ');
}

function getYear(query) {
  const match = query.match(/\b(19[8-9]\d|20[0-3]\d)\b/);
  return match ? match[0] : '';
}

function getDtc(query) {
  const match = query.toLowerCase().match(/\b[pbcup][0-9a-f]{4}\b/);
  return match ? match[0] : '';
}

function App() {
  const [query, setQuery] = useState('');
  const [searched, setSearched] = useState(false);
  const [vin, setVin] = useState('');
  const [vinResult, setVinResult] = useState(null);
  const [vinError, setVinError] = useState('');

  const cleanQuery = normalize(query);
  const lower = cleanQuery.toLowerCase();
  const code = getDtc(cleanQuery);
  const year = getYear(cleanQuery);

  const fluidMatch = useMemo(() => {
    return Object.entries(fluidExamples).find(([key]) => lower.includes(key));
  }, [lower]);

  const partHints = useMemo(() => {
    const hints = [];
    if (/starter/.test(lower)) hints.push('Starter searches work best with year, make, model, engine size, and transmission.');
    if (/alternator/.test(lower)) hints.push('Alternators may vary by amperage and options. Compare plug style and mounting points.');
    if (/brake|rotor|pad/.test(lower)) hints.push('Brake parts can vary by trim, rotor diameter, and rear drum/disc setup.');
    if (/sensor|oxygen|o2/.test(lower)) hints.push('Sensor position matters, upstream/downstream and bank 1/bank 2.');
    if (/spark|plug/.test(lower)) hints.push('Spark plugs must match heat range and engine. Do not trust only the picture.');
    if (!hints.length && searched) hints.push('Use year, make, model, engine size, and part name for the best results.');
    return hints;
  }, [lower, searched]);

  async function decodeVin() {
    const cleanVin = vin.trim().toUpperCase();
    setVinResult(null);
    setVinError('');
    if (!/^[A-HJ-NPR-Z0-9]{17}$/.test(cleanVin)) {
      setVinError('Enter a valid 17-character VIN. VINs do not use I, O, or Q.');
      return;
    }
    try {
      const res = await fetch(`https://vpic.nhtsa.dot.gov/api/vehicles/DecodeVinValues/${cleanVin}?format=json`);
      const data = await res.json();
      const item = data?.Results?.[0];
      if (!item) throw new Error('No VIN data returned');
      setVinResult(item);
      const autoQuery = [item.ModelYear, item.Make, item.Model].filter(Boolean).join(' ');
      if (autoQuery) setQuery(autoQuery);
    } catch (e) {
      setVinError('VIN lookup failed. You can still search manually.');
    }
  }

  function runSearch() {
    if (!cleanQuery) return;
    setSearched(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function reset() {
    setQuery('');
    setSearched(false);
    setVin('');
    setVinResult(null);
    setVinError('');
  }

  return (
    <main>
      <header className="hero">
        <div className="brandRow">
          <div className="logo">🐕‍🦺</div>
          <div>
            <h1>HoundMoto</h1>
            <p>Free parts, fluid, VIN, and trouble-code helper.</p>
          </div>
        </div>
        <div className="warning"><strong>Important:</strong> HoundMoto does not sell parts and does not guarantee fitment. Always confirm fitment, engine, trim, and fluid specs with the retailer, owner’s manual, service data, or a qualified mechanic.</div>
        <div className="searchPanel">
          <input value={query} onChange={e => setQuery(e.target.value)} onKeyDown={e => e.key === 'Enter' && runSearch()} placeholder="Example: 2006 Nissan Altima starter, P0300, Honda Civic oil" />
          <button onClick={runSearch}>Search</button>
          <button className="light" onClick={reset}>Reset</button>
        </div>
      </header>

      <section className="card">
        <h2>VIN Decoder</h2>
        <p className="muted">Optional. This uses the public NHTSA VIN decoder to fill in year, make, and model.</p>
        <div className="inlineForm">
          <input value={vin} onChange={e => setVin(e.target.value)} placeholder="Enter 17-character VIN" maxLength={17} />
          <button onClick={decodeVin}>Decode VIN</button>
        </div>
        {vinError && <p className="error">{vinError}</p>}
        {vinResult && <div className="resultBox"><strong>{vinResult.ModelYear} {vinResult.Make} {vinResult.Model}</strong><span>{vinResult.Trim || 'Trim not returned'} {vinResult.EngineCylinders ? `, ${vinResult.EngineCylinders} cylinders` : ''}</span></div>}
      </section>

      {!searched && <section className="card"><h2>What this fixed version does</h2><div className="checklist"><p>✅ No exposed AI/API key in browser code</p><p>✅ Builds real retailer search links from your search</p><p>✅ Adds VIN decoding through NHTSA public data</p><p>✅ Adds common trouble-code explanations</p><p>✅ Keeps legal disclaimers clear</p></div></section>}

      {searched && <>
        <section className="card highlight">
          <h2>Search Results for “{cleanQuery}”</h2>
          <p className="muted">Click a retailer. The final price, shipping, inventory, and fitment must be verified on that retailer’s website.</p>
          {year && <p className="pill">Detected year: {year}</p>}
        </section>

        {code && dtc[code] && <section className="card">
          <h2>Trouble Code: {code.toUpperCase()}</h2>
          <h3>{dtc[code].title}</h3>
          <ul>{dtc[code].checks.map(item => <li key={item}>{item}</li>)}</ul>
        </section>}

        <section className="card">
          <h2>Retailer Search Links</h2>
          <div className="retailerGrid">{retailers.map(r => <a className="retailer" key={r.name} href={r.url(cleanQuery)} target="_blank" rel="noreferrer"><strong>{r.name}</strong><span>{r.note}</span></a>)}</div>
        </section>

        <section className="card">
          <h2>Fitment Notes</h2>
          <ul>{partHints.map(item => <li key={item}>{item}</li>)}</ul>
        </section>

        <section className="card">
          <h2>Fluid Specs</h2>
          {fluidMatch ? <div>{fluidMatch[1].map(([name, spec]) => <div className="fluid" key={name}><strong>{name}</strong><span>{spec}</span></div>)}</div> : <p className="muted">No exact fluid example is loaded for this vehicle yet. Search links above can still help. Verify fluids before adding anything.</p>}
        </section>
      </>}

      <footer>HoundMoto is an information tool only. No payments, no inventory, no repair guarantees.</footer>
    </main>
  );
}

createRoot(document.getElementById('root')).render(<App />);
