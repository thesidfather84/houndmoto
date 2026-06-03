import { useMemo, useState } from "react";
import "./App.css";

const vehicleSpecs = [
  {
    year: "2000",
    make: "Ford",
    model: "F-250 Super Duty",
    engine: "5.4L V8",
    oilType: "5W-20 or 5W-30, verify oil cap/manual",
    oilCapacity: "About 6 quarts with filter",
    transmissionFluid: "Mercon V, verify transmission",
    transmissionCapacity: "Varies by transmission and service type",
    tireSize: "Check door sticker, common sizes vary by trim",
    batteryGroup: "Group 65 commonly used",
    wipers: "20 inch driver / 20 inch passenger",
    bulbs: "Verify by trim before buying",
    notes: "Starter data. Always verify before repair."
  },
  {
    year: "2000",
    make: "Mercury",
    model: "Grand Marquis",
    engine: "4.6L V8",
    oilType: "5W-20 or 5W-30, verify oil cap/manual",
    oilCapacity: "About 5 quarts with filter",
    transmissionFluid: "Mercon V",
    transmissionCapacity: "Varies by service type",
    tireSize: "Common size P225/60R16, verify door sticker",
    batteryGroup: "Group 65 commonly used",
    wipers: "22 inch driver / 22 inch passenger",
    bulbs: "Verify by trim before buying",
    notes: "Starter data. Always verify before repair."
  },
  {
    year: "2018",
    make: "Ford",
    model: "F-150",
    engine: "5.0L V8",
    oilType: "5W-20 or 5W-30 depending on spec, verify manual",
    oilCapacity: "About 8.8 quarts with filter",
    transmissionFluid: "Mercon ULV for 10-speed, verify transmission",
    transmissionCapacity: "Service amount varies",
    tireSize: "Varies by trim, verify door sticker",
    batteryGroup: "Group H7 / 94R commonly used on many trims",
    wipers: "22 inch driver / 22 inch passenger",
    bulbs: "Varies by halogen/LED trim",
    notes: "Starter data. Always verify before repair."
  },
  {
    year: "2014",
    make: "Chevrolet",
    model: "Silverado 1500",
    engine: "5.3L V8",
    oilType: "0W-20, verify manual",
    oilCapacity: "About 8 quarts with filter",
    transmissionFluid: "Dexron VI, verify transmission",
    transmissionCapacity: "Service amount varies",
    tireSize: "Varies by trim, verify door sticker",
    batteryGroup: "Group H7 / 94R commonly used on many trims",
    wipers: "22 inch driver / 22 inch passenger",
    bulbs: "Verify by trim before buying",
    notes: "Starter data. Always verify before repair."
  }
];

const troubleCodes = [
  {
    code: "P0300",
    title: "Random / Multiple Cylinder Misfire",
    causes: "Spark plugs, ignition coils, vacuum leak, fuel issue, compression issue",
    severity: "Medium to high"
  },
  {
    code: "P0171",
    title: "System Too Lean Bank 1",
    causes: "Vacuum leak, dirty MAF sensor, weak fuel pump, exhaust leak",
    severity: "Medium"
  },
  {
    code: "P0420",
    title: "Catalyst System Efficiency Below Threshold",
    causes: "Catalytic converter, oxygen sensor, exhaust leak, engine running poorly",
    severity: "Medium"
  },
  {
    code: "P0455",
    title: "EVAP System Large Leak",
    causes: "Loose gas cap, cracked EVAP hose, purge valve, vent valve",
    severity: "Low to medium"
  }
];

function cleanText(value) {
  return String(value || "")
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "");
}

function searchVehicle(vehicle, query) {
  const q = query.toLowerCase();
  const cleanQuery = cleanText(query);

  const searchable = [
    vehicle.year,
    vehicle.make,
    vehicle.model,
    vehicle.engine,
    vehicle.oilType,
    vehicle.oilCapacity,
    vehicle.transmissionFluid,
    vehicle.tireSize,
    vehicle.batteryGroup,
    vehicle.wipers,
    vehicle.bulbs
  ].join(" ");

  return (
    searchable.toLowerCase().includes(q) ||
    cleanText(searchable).includes(cleanQuery)
  );
}

function App() {
  const [query, setQuery] = useState("");

  const trimmedQuery = query.trim();

  const results = useMemo(() => {
    if (!trimmedQuery) {
      return { vehicles: [], codes: [] };
    }

    const vehicles = vehicleSpecs.filter((vehicle) =>
      searchVehicle(vehicle, trimmedQuery)
    );

    const codes = troubleCodes.filter((item) => {
      const searchable = `${item.code} ${item.title} ${item.causes}`;
      return (
        searchable.toLowerCase().includes(trimmedQuery.toLowerCase()) ||
        cleanText(searchable).includes(cleanText(trimmedQuery))
      );
    });

    return { vehicles, codes };
  }, [trimmedQuery]);

  const hasResults = results.vehicles.length > 0 || results.codes.length > 0;

  return (
    <main className="app">
      <section className="hero">
        <div className="brand">HoundMoto</div>
        <h1>One search bar for auto specs, fluids, tires, parts, and trouble codes.</h1>
        <p>
          Search a vehicle, oil capacity, tire size, battery, wiper, bulb, part number,
          symptom, or check engine code.
        </p>

        <input
          className="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search example: 2018 Ford F-150 5.0 oil capacity, P0300, tire size"
          autoFocus
        />

        <div className="quickLinks">
          <button onClick={() => setQuery("2018 Ford F-150")}>2018 F-150</button>
          <button onClick={() => setQuery("2000 Grand Marquis")}>Grand Marquis</button>
          <button onClick={() => setQuery("P0300")}>P0300</button>
          <button onClick={() => setQuery("oil capacity")}>Oil Capacity</button>
          <button onClick={() => setQuery("tire size")}>Tire Size</button>
        </div>
      </section>

      {!trimmedQuery && (
        <section className="cards">
          <div className="card">Oil type and capacity</div>
          <div className="card">Transmission fluid</div>
          <div className="card">Tire size</div>
          <div className="card">Battery group</div>
          <div className="card">Wiper blades</div>
          <div className="card">Trouble codes</div>
        </section>
      )}

      {trimmedQuery && !hasResults && (
        <section className="panel">
          <h2>No exact data yet</h2>
          <p>
            HoundMoto does not have that result yet. Try a different vehicle,
            trouble code, fluid, tire size, battery, wiper, bulb, or part search.
          </p>
          <p className="note">
            We do not guess specs. Missing data will show here once added to the HoundMoto database.
          </p>
          <a className="button" href="https://www.bidwrenx.com">
            Need repair help? Post this job on BidWrenx
          </a>
        </section>
      )}

      {results.vehicles.map((vehicle) => (
        <section
          className="panel"
          key={`${vehicle.year}-${vehicle.make}-${vehicle.model}-${vehicle.engine}`}
        >
          <h2>
            {vehicle.year} {vehicle.make} {vehicle.model}
          </h2>
          <p className="sub">{vehicle.engine}</p>

          <div className="grid">
            <Info title="Oil Type" value={vehicle.oilType} />
            <Info title="Oil Capacity" value={vehicle.oilCapacity} />
            <Info title="Transmission Fluid" value={vehicle.transmissionFluid} />
            <Info title="Transmission Capacity" value={vehicle.transmissionCapacity} />
            <Info title="Tire Size" value={vehicle.tireSize} />
            <Info title="Battery Group" value={vehicle.batteryGroup} />
            <Info title="Wipers" value={vehicle.wipers} />
            <Info title="Bulbs" value={vehicle.bulbs} />
          </div>

          <p className="note">{vehicle.notes}</p>

          <a className="button" href="https://www.bidwrenx.com">
            Need repair help? Post this job on BidWrenx
          </a>
        </section>
      ))}

      {results.codes.map((item) => (
        <section className="panel" key={item.code}>
          <h2>
            {item.code}: {item.title}
          </h2>

          <div className="grid">
            <Info title="Common Causes" value={item.causes} />
            <Info title="Severity" value={item.severity} />
          </div>

          <p className="note">
            Trouble code info is a starting point only. Diagnose before replacing parts.
          </p>
        </section>
      ))}
    </main>
  );
}

function Info({ title, value }) {
  return (
    <div className="info">
      <strong>{title}</strong>
      <span>{value || "Data not available yet"}</span>
    </div>
  );
}

export default App;
