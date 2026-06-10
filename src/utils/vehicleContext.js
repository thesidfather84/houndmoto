const KEY = "hm_vehicle_ctx";

export function saveVehicleContext({ vin, year, make, model, trim, engine }) {
  try {
    localStorage.setItem(KEY, JSON.stringify({ vin, year, make, model, trim: trim || "", engine: engine || "" }));
  } catch {}
}

export function getVehicleContext() {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function clearVehicleContext() {
  try { localStorage.removeItem(KEY); } catch {}
}
