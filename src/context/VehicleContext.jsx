import { createContext, useContext, useState, useCallback } from "react";

const STORAGE_KEY = "houndmoto_active_vehicle";

function loadFromStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

const VehicleCtx = createContext(null);

export function VehicleProvider({ children }) {
  const [vehicle, setState] = useState(loadFromStorage);

  const setActiveVehicle = useCallback((v) => {
    const entry = {
      vin:       v.vin       || "",
      year:      v.year      || "",
      make:      v.make      || "",
      model:     v.model     || "",
      trim:      v.trim      || "",
      engine:    v.engine    || "",
      source:    v.source    || "manual",
      decodedAt: v.decodedAt || new Date().toISOString(),
    };
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(entry)); } catch {}
    setState(entry);
  }, []);

  const clearActiveVehicle = useCallback(() => {
    try { localStorage.removeItem(STORAGE_KEY); } catch {}
    setState(null);
  }, []);

  return (
    <VehicleCtx.Provider value={{ vehicle, setActiveVehicle, clearActiveVehicle }}>
      {children}
    </VehicleCtx.Provider>
  );
}

export function useVehicle() {
  const ctx = useContext(VehicleCtx);
  if (!ctx) throw new Error("useVehicle must be used within VehicleProvider");
  return ctx;
}
