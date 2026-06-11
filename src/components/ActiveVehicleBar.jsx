import { useNavigate } from "react-router-dom";
import { useVehicle } from "../context/VehicleContext";

export function ActiveVehicleBar({ secondary = false }) {
  const navigate = useNavigate();
  const { vehicle, clearActiveVehicle } = useVehicle();
  if (!vehicle || (!vehicle.year && !vehicle.make && !vehicle.model)) return null;

  const label = [vehicle.year, vehicle.make, vehicle.model].filter(Boolean).join(" ");
  const vqs = new URLSearchParams([
    ...(vehicle.year ? [["year", vehicle.year]] : []),
    ...(vehicle.make ? [["make", vehicle.make]] : []),
    ...(vehicle.model ? [["model", vehicle.model]] : []),
    ...(vehicle.engine ? [["engine", vehicle.engine]] : []),
  ]).toString();

  function handleDiagnose() {
    navigate(`/diagnostic-assistant${vqs ? `?${vqs}` : ""}`);
  }

  function handleRecalls() {
    if (vehicle.vin) {
      navigate(`/vin-recall-check?vin=${encodeURIComponent(vehicle.vin)}`);
    } else {
      navigate("/vin-recall-check");
    }
  }

  function handleDtc() {
    navigate(`/dtc${vqs ? `?${vqs}` : ""}`);
  }

  function handleChange() {
    navigate("/");
  }

  return (
    <div className={`activeVehicleBar${secondary ? " secondary" : ""}`}>
      <span className="activeVehicleLabel">Using Vehicle:</span>
      <span className="activeVehicleName">{label}</span>
      <div className="activeVehicleQuickActions">
        <button type="button" className="activeVehicleQuickBtn" onClick={handleDiagnose}>
          Diagnose
        </button>
        <button type="button" className="activeVehicleQuickBtn" onClick={handleRecalls}>
          Recalls
        </button>
        <button type="button" className="activeVehicleQuickBtn" onClick={handleDtc}>
          DTC Lookup
        </button>
      </div>
      <div className="activeVehicleActions">
        <button type="button" className="activeVehicleChange" onClick={handleChange}>
          Change
        </button>
        <button type="button" className="activeVehicleClear" onClick={clearActiveVehicle}>
          Clear
        </button>
      </div>
    </div>
  );
}
