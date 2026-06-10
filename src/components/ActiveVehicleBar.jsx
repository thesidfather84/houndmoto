import { Link } from "react-router-dom";
import { useVehicle } from "../context/VehicleContext";

export function ActiveVehicleBar() {
  const { vehicle, clearActiveVehicle } = useVehicle();
  if (!vehicle || (!vehicle.year && !vehicle.make && !vehicle.model)) return null;

  const label = [vehicle.year, vehicle.make, vehicle.model].filter(Boolean).join(" ");

  return (
    <div className="activeVehicleBar">
      <span className="activeVehicleLabel">Using vehicle:</span>
      <span className="activeVehicleName">{label}</span>
      <div className="activeVehicleActions">
        <Link to="/" className="activeVehicleChange">Change Vehicle</Link>
        <button type="button" className="activeVehicleClear" onClick={clearActiveVehicle}>
          Clear
        </button>
      </div>
    </div>
  );
}
