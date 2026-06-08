import { useMemo, useState, useEffect } from "react";
import "./App.css";
import { TipSubmitForm } from "./TipSubmitForm";
import { loadTips, saveTip, searchTips } from "./tipsData";
import { toVehicleSpecs } from "./fluidDatabase";
import { troubleCodes } from "./dtcCodes";
import { SymptomDiagnosisWizard } from "./SymptomDiagnosisWizard";

const baseVehicleSpecs = [
  // --- Original hand-entered specs ---
  {
    year: "2000", make: "Ford", model: "F-250 Super Duty", engine: "5.4L V8",
    oilType: "5W-20 or 5W-30, verify oil cap/manual", oilCapacity: "About 6 quarts with filter",
    transmissionFluid: "Mercon V, verify transmission", transmissionCapacity: "Varies by transmission and service type",
    tireSize: "Check door sticker, common sizes vary by trim", batteryGroup: "Group 65 commonly used",
    wipers: "20 inch driver / 20 inch passenger", bulbs: "Verify by trim before buying",
    notes: "Starter data. Always verify before repair."
  },
  {
    year: "2000", make: "Mercury", model: "Grand Marquis", engine: "4.6L V8",
    oilType: "5W-20 or 5W-30, verify oil cap/manual", oilCapacity: "About 5 quarts with filter",
    transmissionFluid: "Mercon V", transmissionCapacity: "Varies by service type",
    tireSize: "Common size P225/60R16, verify door sticker", batteryGroup: "Group 65 commonly used",
    wipers: "22 inch driver / 22 inch passenger", bulbs: "Verify by trim before buying",
    notes: "Starter data. Always verify before repair."
  },
  {
    year: "2018", make: "Ford", model: "F-150", engine: "5.0L V8",
    oilType: "5W-20 or 5W-30 depending on spec, verify manual", oilCapacity: "About 8.8 quarts with filter",
    transmissionFluid: "Mercon ULV for 10-speed, verify transmission", transmissionCapacity: "Service amount varies",
    tireSize: "Varies by trim, verify door sticker", batteryGroup: "Group H7 / 94R commonly used on many trims",
    wipers: "22 inch driver / 22 inch passenger", bulbs: "Varies by halogen/LED trim",
    notes: "Starter data. Always verify before repair."
  },
  {
    year: "2014", make: "Chevrolet", model: "Silverado 1500", engine: "5.3L V8",
    oilType: "0W-20, verify manual", oilCapacity: "About 8 quarts with filter",
    transmissionFluid: "Dexron VI, verify transmission", transmissionCapacity: "Service amount varies",
    tireSize: "Varies by trim, verify door sticker", batteryGroup: "Group H7 / 94R commonly used on many trims",
    wipers: "22 inch driver / 22 inch passenger", bulbs: "Verify by trim before buying",
    notes: "Starter data. Always verify before repair."
  },
  {
    year: "2018", make: "Toyota", model: "Camry", engine: "2.5L I4",
    oilType: "0W-16", oilCapacity: "4.8 quarts with filter",
    transmissionFluid: "Toyota WS", transmissionCapacity: "Service amount varies",
    tireSize: "205/65R16", batteryGroup: "H5",
    wipers: "26 inch driver / 18 inch passenger", bulbs: "Verify by trim",
    notes: "Starter data. Always verify before repair."
  },
  {
    year: "2015", make: "Honda", model: "Civic", engine: "1.8L I4",
    oilType: "0W-20", oilCapacity: "3.9 quarts with filter",
    transmissionFluid: "Honda CVT Fluid or ATF depending on transmission", transmissionCapacity: "Service amount varies",
    tireSize: "195/65R15", batteryGroup: "51R",
    wipers: "26 inch driver / 22 inch passenger", bulbs: "Verify by trim",
    notes: "Starter data. Always verify before repair."
  },
  {
    year: "2014", make: "Chevrolet", model: "Cruze", engine: "1.4L Turbo",
    oilType: "5W-30", oilCapacity: "4.25 quarts with filter",
    transmissionFluid: "Dexron VI", transmissionCapacity: "Service amount varies",
    tireSize: "215/60R16", batteryGroup: "47/H5",
    wipers: "24 inch driver / 18 inch passenger", bulbs: "Verify by trim",
    notes: "Starter data. Always verify before repair."
  },
  // --- 1990s popular vehicles ---
  {
    year: "1995", make: "Ford", model: "Mustang GT", engine: "5.0L V8",
    oilType: "5W-30", oilCapacity: "5 quarts with filter",
    transmissionFluid: "Mercon V (auto) or Manual Gear Lube (5-speed)", transmissionCapacity: "Varies",
    tireSize: "225/55R16", batteryGroup: "Group 58 commonly used",
    wipers: "20 inch driver / 20 inch passenger", bulbs: "Verify by trim",
    notes: "Starter data. Always verify before repair."
  },
  {
    year: "1996", make: "Honda", model: "Accord", engine: "2.2L I4",
    oilType: "5W-30", oilCapacity: "4.5 quarts with filter",
    transmissionFluid: "Honda ATF-Z1 (auto) or MTF (manual)", transmissionCapacity: "Varies",
    tireSize: "195/65R15", batteryGroup: "Group 51R",
    wipers: "24 inch driver / 19 inch passenger", bulbs: "Verify by trim",
    notes: "Starter data. Always verify before repair."
  },
  {
    year: "1997", make: "Toyota", model: "Camry", engine: "2.2L I4",
    oilType: "5W-30", oilCapacity: "4.5 quarts with filter",
    transmissionFluid: "Toyota Type T-II / Dexron II", transmissionCapacity: "Varies",
    tireSize: "195/70R14", batteryGroup: "Group 35 commonly used",
    wipers: "22 inch driver / 20 inch passenger", bulbs: "Verify by trim",
    notes: "Starter data. Always verify before repair."
  },
  {
    year: "1999", make: "Ford", model: "F-150", engine: "4.6L V8",
    oilType: "5W-20", oilCapacity: "6 quarts with filter",
    transmissionFluid: "Mercon V", transmissionCapacity: "Varies by service type",
    tireSize: "Verify door sticker", batteryGroup: "Group 65 commonly used",
    wipers: "20 inch driver / 18 inch passenger", bulbs: "Verify by trim",
    notes: "Starter data. Always verify before repair."
  },
  {
    year: "1999", make: "Chevrolet", model: "Silverado 1500", engine: "5.3L V8",
    oilType: "5W-30", oilCapacity: "6 quarts with filter",
    transmissionFluid: "Dexron III", transmissionCapacity: "Varies by service type",
    tireSize: "Varies by trim, verify door sticker", batteryGroup: "Group 78 or H7 commonly used",
    wipers: "22 inch driver / 22 inch passenger", bulbs: "Verify by trim",
    notes: "Starter data. Always verify before repair."
  },
  {
    year: "1997", make: "Jeep", model: "Cherokee", engine: "4.0L I6",
    oilType: "5W-30", oilCapacity: "6 quarts with filter",
    transmissionFluid: "ATF+3 or ATF+4 (auto) or Manual Gear Lube", transmissionCapacity: "Varies",
    tireSize: "225/75R15", batteryGroup: "Group 34 commonly used",
    wipers: "20 inch driver / 18 inch passenger", bulbs: "Verify by trim",
    notes: "Starter data. Always verify before repair."
  },
  // --- 2000s popular vehicles ---
  {
    year: "2003", make: "Ford", model: "F-150", engine: "5.4L V8",
    oilType: "5W-20", oilCapacity: "7 quarts with filter",
    transmissionFluid: "Mercon V", transmissionCapacity: "Varies by service type",
    tireSize: "Varies by trim, verify door sticker", batteryGroup: "Group 65 commonly used",
    wipers: "21 inch driver / 21 inch passenger", bulbs: "Verify by trim",
    notes: "Starter data. Always verify before repair."
  },
  {
    year: "2004", make: "Dodge", model: "Ram 1500", engine: "5.7L V8 Hemi",
    oilType: "5W-20", oilCapacity: "7 quarts with filter",
    transmissionFluid: "ATF+4", transmissionCapacity: "Varies by service type",
    tireSize: "Varies by trim, verify door sticker", batteryGroup: "Group 34 or H7 commonly used",
    wipers: "22 inch driver / 20 inch passenger", bulbs: "Verify by trim",
    notes: "Starter data. Always verify before repair."
  },
  {
    year: "2005", make: "Toyota", model: "Tacoma", engine: "4.0L V6",
    oilType: "5W-30", oilCapacity: "5.5 quarts with filter",
    transmissionFluid: "Toyota ATF T-IV", transmissionCapacity: "Varies",
    tireSize: "Varies by trim, verify door sticker", batteryGroup: "Group 35 commonly used",
    wipers: "20 inch driver / 18 inch passenger", bulbs: "Verify by trim",
    notes: "Starter data. Always verify before repair."
  },
  {
    year: "2005", make: "Honda", model: "Accord", engine: "2.4L I4",
    oilType: "5W-20", oilCapacity: "4.4 quarts with filter",
    transmissionFluid: "Honda ATF-Z1", transmissionCapacity: "Varies",
    tireSize: "205/65R16", batteryGroup: "Group 51 or 51R",
    wipers: "28 inch driver / 26 inch passenger", bulbs: "Verify by trim",
    notes: "Starter data. Always verify before repair."
  },
  {
    year: "2003", make: "Toyota", model: "Corolla", engine: "1.8L I4",
    oilType: "5W-30", oilCapacity: "3.9 quarts with filter",
    transmissionFluid: "Toyota Type T-II or Dexron II (auto)", transmissionCapacity: "Varies",
    tireSize: "185/65R15", batteryGroup: "Group 35",
    wipers: "24 inch driver / 18 inch passenger", bulbs: "Verify by trim",
    notes: "Starter data. Always verify before repair."
  },
  {
    year: "2007", make: "Chevrolet", model: "Tahoe", engine: "5.3L V8",
    oilType: "5W-30", oilCapacity: "6 quarts with filter",
    transmissionFluid: "Dexron VI", transmissionCapacity: "Varies by service type",
    tireSize: "265/65R18", batteryGroup: "Group 78 commonly used",
    wipers: "22 inch driver / 22 inch passenger", bulbs: "Verify by trim",
    notes: "Starter data. Always verify before repair."
  },
  {
    year: "2002", make: "Ford", model: "Explorer", engine: "4.0L V6",
    oilType: "5W-20", oilCapacity: "5 quarts with filter",
    transmissionFluid: "Mercon V", transmissionCapacity: "Varies",
    tireSize: "235/70R16", batteryGroup: "Group 65 commonly used",
    wipers: "21 inch driver / 20 inch passenger", bulbs: "Verify by trim",
    notes: "Starter data. Always verify before repair."
  },
  {
    year: "2007", make: "Toyota", model: "Tundra", engine: "5.7L V8",
    oilType: "5W-30", oilCapacity: "8.7 quarts with filter",
    transmissionFluid: "Toyota WS", transmissionCapacity: "Varies",
    tireSize: "Varies by trim, verify door sticker", batteryGroup: "Group 27F commonly used",
    wipers: "26 inch driver / 20 inch passenger", bulbs: "Verify by trim",
    notes: "Starter data. Always verify before repair."
  },
  {
    year: "2008", make: "Toyota", model: "Camry", engine: "2.4L I4",
    oilType: "5W-20", oilCapacity: "4.5 quarts with filter",
    transmissionFluid: "Toyota WS", transmissionCapacity: "Varies",
    tireSize: "205/65R16", batteryGroup: "Group 35",
    wipers: "26 inch driver / 18 inch passenger", bulbs: "Verify by trim",
    notes: "Starter data. Always verify before repair."
  },
  {
    year: "2006", make: "Honda", model: "Civic", engine: "1.8L I4",
    oilType: "5W-20", oilCapacity: "3.9 quarts with filter",
    transmissionFluid: "Honda ATF-Z1", transmissionCapacity: "Varies",
    tireSize: "195/65R15", batteryGroup: "Group 51R",
    wipers: "24 inch driver / 18 inch passenger", bulbs: "Verify by trim",
    notes: "Starter data. Always verify before repair."
  },
  {
    year: "2008", make: "Ford", model: "Mustang GT", engine: "4.6L V8",
    oilType: "5W-20", oilCapacity: "6 quarts with filter",
    transmissionFluid: "Mercon V (auto) or Manual Gear Lube (5-speed)", transmissionCapacity: "Varies",
    tireSize: "235/55R18", batteryGroup: "Group 59 commonly used",
    wipers: "21 inch driver / 20 inch passenger", bulbs: "Verify by trim",
    notes: "Starter data. Always verify before repair."
  },
  {
    year: "2003", make: "Chevrolet", model: "Suburban", engine: "5.3L V8",
    oilType: "5W-30", oilCapacity: "6 quarts with filter",
    transmissionFluid: "Dexron III", transmissionCapacity: "Varies by service type",
    tireSize: "265/70R17", batteryGroup: "Group 78 commonly used",
    wipers: "22 inch driver / 22 inch passenger", bulbs: "Verify by trim",
    notes: "Starter data. Always verify before repair."
  },
  // --- 2010s popular vehicles ---
  {
    year: "2011", make: "Ford", model: "Mustang GT", engine: "5.0L V8",
    oilType: "5W-50", oilCapacity: "8.8 quarts with filter",
    transmissionFluid: "Mercon LV (auto) or Manual Gear Lube (6-speed)", transmissionCapacity: "Varies",
    tireSize: "235/55R18 (front) / 255/45R19 (rear)", batteryGroup: "Group H6/48 commonly used",
    wipers: "22 inch driver / 18 inch passenger", bulbs: "Verify by trim",
    notes: "Starter data. Always verify before repair."
  },
  {
    year: "2012", make: "Chevrolet", model: "Silverado 1500", engine: "5.3L V8",
    oilType: "5W-30", oilCapacity: "6 quarts with filter",
    transmissionFluid: "Dexron VI", transmissionCapacity: "Varies by service type",
    tireSize: "Varies by trim, verify door sticker", batteryGroup: "Group H7 / 94R commonly used",
    wipers: "22 inch driver / 22 inch passenger", bulbs: "Verify by trim",
    notes: "Starter data. Always verify before repair."
  },
  {
    year: "2012", make: "Honda", model: "CR-V", engine: "2.4L I4",
    oilType: "0W-20", oilCapacity: "3.7 quarts with filter",
    transmissionFluid: "Honda ATF DW-1", transmissionCapacity: "Varies",
    tireSize: "225/65R17", batteryGroup: "Group 51R",
    wipers: "26 inch driver / 14 inch passenger", bulbs: "Verify by trim",
    notes: "Starter data. Always verify before repair."
  },
  {
    year: "2015", make: "Toyota", model: "Camry", engine: "2.5L I4",
    oilType: "0W-20", oilCapacity: "4.8 quarts with filter",
    transmissionFluid: "Toyota WS", transmissionCapacity: "Varies",
    tireSize: "205/65R16", batteryGroup: "Group H5",
    wipers: "26 inch driver / 18 inch passenger", bulbs: "Verify by trim",
    notes: "Starter data. Always verify before repair."
  },
  {
    year: "2016", make: "Toyota", model: "Tacoma", engine: "3.5L V6",
    oilType: "0W-20", oilCapacity: "6.2 quarts with filter",
    transmissionFluid: "Toyota WS", transmissionCapacity: "Varies",
    tireSize: "Varies by trim, verify door sticker", batteryGroup: "Group 35 commonly used",
    wipers: "26 inch driver / 16 inch passenger", bulbs: "Verify by trim",
    notes: "Starter data. Always verify before repair."
  },
  {
    year: "2016", make: "Honda", model: "Accord", engine: "2.4L I4",
    oilType: "0W-20", oilCapacity: "4.4 quarts with filter",
    transmissionFluid: "Honda ATF DW-1", transmissionCapacity: "Varies",
    tireSize: "225/50R17", batteryGroup: "Group 51R",
    wipers: "26 inch driver / 23 inch passenger", bulbs: "Verify by trim",
    notes: "Starter data. Always verify before repair."
  },
  {
    year: "2017", make: "Toyota", model: "RAV4", engine: "2.5L I4",
    oilType: "0W-20", oilCapacity: "4.8 quarts with filter",
    transmissionFluid: "Toyota WS", transmissionCapacity: "Varies",
    tireSize: "225/65R17", batteryGroup: "Group 35 commonly used",
    wipers: "28 inch driver / 16 inch passenger", bulbs: "Verify by trim",
    notes: "Starter data. Always verify before repair."
  },
  {
    year: "2019", make: "Ram", model: "1500", engine: "5.7L V8 Hemi",
    oilType: "0W-20", oilCapacity: "7 quarts with filter",
    transmissionFluid: "ATF+4", transmissionCapacity: "Varies by service type",
    tireSize: "Varies by trim, verify door sticker", batteryGroup: "Group 48 or H6 commonly used",
    wipers: "22 inch driver / 22 inch passenger", bulbs: "Verify by trim",
    notes: "Starter data. Always verify before repair."
  },
  {
    year: "2019", make: "Ford", model: "Explorer", engine: "3.5L V6",
    oilType: "5W-20", oilCapacity: "6 quarts with filter",
    transmissionFluid: "Mercon LV", transmissionCapacity: "Varies",
    tireSize: "255/55R20", batteryGroup: "Group H7 commonly used",
    wipers: "26 inch driver / 20 inch passenger", bulbs: "Verify by trim",
    notes: "Starter data. Always verify before repair."
  },
  {
    year: "2013", make: "Toyota", model: "Corolla", engine: "1.8L I4",
    oilType: "0W-20", oilCapacity: "4.4 quarts with filter",
    transmissionFluid: "Toyota WS", transmissionCapacity: "Varies",
    tireSize: "195/65R15", batteryGroup: "Group 35",
    wipers: "26 inch driver / 16 inch passenger", bulbs: "Verify by trim",
    notes: "Starter data. Always verify before repair."
  },
  {
    year: "2014", make: "Jeep", model: "Wrangler", engine: "3.6L V6",
    oilType: "5W-20", oilCapacity: "6 quarts with filter",
    transmissionFluid: "ATF+4", transmissionCapacity: "Varies",
    tireSize: "255/75R17", batteryGroup: "Group 34 commonly used",
    wipers: "18 inch driver / 18 inch passenger", bulbs: "Verify by trim",
    notes: "Starter data. Always verify before repair."
  },
  {
    year: "2012", make: "Ford", model: "Focus", engine: "2.0L I4",
    oilType: "5W-20", oilCapacity: "4.5 quarts with filter",
    transmissionFluid: "Motorcraft DCT or ATF", transmissionCapacity: "Varies",
    tireSize: "215/55R16", batteryGroup: "Group H5 commonly used",
    wipers: "26 inch driver / 16 inch passenger", bulbs: "Verify by trim",
    notes: "Starter data. Always verify before repair."
  },
  {
    year: "2010", make: "Toyota", model: "4Runner", engine: "4.0L V6",
    oilType: "5W-30", oilCapacity: "5.5 quarts with filter",
    transmissionFluid: "Toyota WS", transmissionCapacity: "Varies",
    tireSize: "265/65R17", batteryGroup: "Group 27F commonly used",
    wipers: "24 inch driver / 18 inch passenger", bulbs: "Verify by trim",
    notes: "Starter data. Always verify before repair."
  },
  // --- 2020s popular vehicles ---
  {
    year: "2021", make: "Ford", model: "F-150", engine: "3.5L EcoBoost V6",
    oilType: "5W-30", oilCapacity: "5.7 quarts with filter",
    transmissionFluid: "Mercon ULV", transmissionCapacity: "Varies by service type",
    tireSize: "Varies by trim, verify door sticker", batteryGroup: "Group H7 / 94R commonly used",
    wipers: "22 inch driver / 22 inch passenger", bulbs: "Verify by trim",
    notes: "Starter data. Always verify before repair."
  },
  {
    year: "2022", make: "Chevrolet", model: "Silverado 1500", engine: "5.3L V8",
    oilType: "0W-20", oilCapacity: "6 quarts with filter",
    transmissionFluid: "Dexron HP", transmissionCapacity: "Varies by service type",
    tireSize: "Varies by trim, verify door sticker", batteryGroup: "Group H7 commonly used",
    wipers: "22 inch driver / 22 inch passenger", bulbs: "Verify by trim",
    notes: "Starter data. Always verify before repair."
  },
  {
    year: "2023", make: "Toyota", model: "Camry", engine: "2.5L I4",
    oilType: "0W-16", oilCapacity: "4.8 quarts with filter",
    transmissionFluid: "Toyota WS", transmissionCapacity: "Varies",
    tireSize: "205/65R16", batteryGroup: "Group H5",
    wipers: "26 inch driver / 18 inch passenger", bulbs: "Verify by trim",
    notes: "Starter data. Always verify before repair."
  },
  {
    year: "2023", make: "Honda", model: "Accord", engine: "1.5L Turbo I4",
    oilType: "0W-20", oilCapacity: "3.7 quarts with filter",
    transmissionFluid: "Honda CVT Fluid", transmissionCapacity: "Varies",
    tireSize: "235/45R18", batteryGroup: "Group 51R",
    wipers: "26 inch driver / 18 inch passenger", bulbs: "Verify by trim",
    notes: "Starter data. Always verify before repair."
  },
  {
    year: "2024", make: "Ram", model: "1500", engine: "3.6L V6",
    oilType: "0W-20", oilCapacity: "5 quarts with filter",
    transmissionFluid: "ATF+4", transmissionCapacity: "Varies by service type",
    tireSize: "Varies by trim, verify door sticker", batteryGroup: "Group H7 commonly used",
    wipers: "22 inch driver / 22 inch passenger", bulbs: "Verify by trim",
    notes: "Starter data. Always verify before repair."
  },
  {
    year: "2024", make: "Toyota", model: "Tacoma", engine: "2.4L Turbo I4",
    oilType: "0W-20", oilCapacity: "6 quarts with filter",
    transmissionFluid: "Toyota WS", transmissionCapacity: "Varies",
    tireSize: "Varies by trim, verify door sticker", batteryGroup: "Group 35 commonly used",
    wipers: "26 inch driver / 16 inch passenger", bulbs: "Verify by trim",
    notes: "Starter data. Always verify before repair."
  },
  {
    year: "2023", make: "Ford", model: "F-150", engine: "5.0L V8",
    oilType: "5W-30", oilCapacity: "8.8 quarts with filter",
    transmissionFluid: "Mercon ULV", transmissionCapacity: "Varies by service type",
    tireSize: "Varies by trim, verify door sticker", batteryGroup: "Group H7 / 94R commonly used",
    wipers: "22 inch driver / 22 inch passenger", bulbs: "Verify by trim",
    notes: "Starter data. Always verify before repair."
  },
  {
    year: "2024", make: "Chevrolet", model: "Silverado 1500", engine: "6.2L V8",
    oilType: "0W-20", oilCapacity: "8 quarts with filter",
    transmissionFluid: "Dexron HP", transmissionCapacity: "Varies by service type",
    tireSize: "Varies by trim, verify door sticker", batteryGroup: "Group H7 commonly used",
    wipers: "22 inch driver / 22 inch passenger", bulbs: "Verify by trim",
    notes: "Starter data. Always verify before repair."
  },
];

const _existingKeys = new Set(
  baseVehicleSpecs.map((v) => `${v.year}-${v.make}-${v.model}-${v.engine}`)
);
const vehicleSpecs = [
  ...baseVehicleSpecs,
  ...toVehicleSpecs().filter(
    (s) => !_existingKeys.has(`${s.year}-${s.make}-${s.model}-${s.engine}`)
  ),
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
    vehicle.year, vehicle.make, vehicle.model, vehicle.engine,
    vehicle.oilType, vehicle.oilCapacity, vehicle.transmissionFluid,
    vehicle.tireSize, vehicle.batteryGroup, vehicle.wipers, vehicle.bulbs,
  ].join(" ");
  return (
    searchable.toLowerCase().includes(q) ||
    cleanText(searchable).includes(cleanQuery)
  );
}

function looksLikeVehicleQuery(query) {
  return /\b(19|20)\d{2}\b/.test(query) ||
    /\b(ford|chevy|chevrolet|toyota|honda|dodge|ram|jeep|nissan|bmw|hyundai|subaru|kia|volkswagen|vw|mazda|mitsubishi|gmc|buick|cadillac|lincoln|mercury|pontiac|oldsmobile|saturn|chrysler|acura|lexus|infiniti|volvo|audi|mercedes|benz|porsche|tesla)\b/i.test(query);
}

function App() {
  const [query, setQuery] = useState("");
  const [tips, setTips] = useState([]);
  const [showSubmitForm, setShowSubmitForm] = useState(false);
  const [showWizard, setShowWizard] = useState(false);
  const [isTracking, setIsTracking] = useState(false);

  useEffect(() => {
    setTips(loadTips());
  }, []);

  useEffect(() => {
    if (!query.trim()) { setIsTracking(false); return; }
    setIsTracking(true);
    const t = setTimeout(() => setIsTracking(false), 600);
    return () => clearTimeout(t);
  }, [query]);

  const trimmedQuery = query.trim();

  const results = useMemo(() => {
    if (!trimmedQuery) return { vehicles: [], codes: [], tips: [] };
    const vehicles = vehicleSpecs.filter((v) => searchVehicle(v, trimmedQuery));
    const codes = troubleCodes.filter((item) => {
      const searchable = `${item.code} ${item.title} ${item.causes}`;
      return (
        searchable.toLowerCase().includes(trimmedQuery.toLowerCase()) ||
        cleanText(searchable).includes(cleanText(trimmedQuery))
      );
    });
    const matchedTips = searchTips(tips, trimmedQuery);
    return { vehicles, codes, tips: matchedTips };
  }, [trimmedQuery, tips]);

  const hasResults =
    results.vehicles.length > 0 || results.codes.length > 0 || results.tips.length > 0;

  function handleTipSubmit(tipData) {
    const updated = saveTip(tipData);
    setTips(updated);
  }

  function playHoundSound() {
    console.log("🐕 Hound sound placeholder");
  }

  function handleHoundIt() {
    playHoundSound();
    if (!query.trim()) return;
    setIsTracking(true);
    setTimeout(() => setIsTracking(false), 600);
  }

  if (showWizard) {
    return <SymptomDiagnosisWizard onClose={() => setShowWizard(false)} />;
  }

  return (
    <main className="app">
      <section className="hero">
        <div className="brand">HoundMoto</div>
        <h1>One search bar for auto specs, fluids, tires, parts, and trouble codes.</h1>
        <p>
          Search a vehicle, oil capacity, tire size, battery, wiper, bulb, part number,
          symptom, or check engine code.
        </p>

        <div className="searchWrap">
          <input
            className="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search: 2018 Ford F-150 oil, P0300, tire size, battery group..."
            autoFocus
          />
          <button className={`houndBtn${isTracking ? " tracking" : ""}`} onClick={handleHoundIt}>
            🐕 HOUND IT
          </button>
        </div>

        <div className="quickLinks">
          <button onClick={() => setQuery("2018 Ford F-150")}>F-150</button>
          <button onClick={() => setQuery("2000 Grand Marquis")}>Grand Marquis</button>
          <button onClick={() => setQuery("2018 Toyota Camry")}>Camry</button>
          <button onClick={() => setQuery("2015 Honda Civic")}>Civic</button>
          <button onClick={() => setQuery("2014 Silverado")}>Silverado</button>
          <button onClick={() => setQuery("2014 Cruze")}>Cruze</button>
          <button onClick={() => setQuery("P0300")}>P0300</button>
          <button onClick={() => setQuery("P0420")}>P0420</button>
          <button className="submitTipBtn" onClick={() => setShowSubmitForm(true)}>
            + Submit a Tip
          </button>
        </div>
      </section>

      {/* Symptom Diagnosis Wizard entry card */}
      <section className="wizardEntry">
        <div className="wizardEntryText">
          <div className="wizardEntryTitle">Symptom Diagnosis Wizard</div>
          <p className="wizardEntrySub">
            Describe what your vehicle is doing. Get ranked likely causes, first checks,
            tools needed, and when to call a mechanic.
          </p>
        </div>
        <button className="wizardEntryBtn" onClick={() => setShowWizard(true)}>
          Start Diagnosis
        </button>
      </section>

      {!trimmedQuery && (
        <>
          <section className="cards">
            <div className="card">Oil type and capacity</div>
            <div className="card">Transmission fluid</div>
            <div className="card">Tire size</div>
            <div className="card">Battery group</div>
            <div className="card">Wiper blades</div>
            <div className="card">Trouble codes</div>
          </section>

          <section className="tipsSection">
            <div className="tipsSectionHeader">
              <div>
                <h2 className="tipsSectionTitle">Mechanic Tips &amp; Tricks</h2>
                <p className="tipsSectionSub">
                  Community-submitted shop knowledge. Unverified — always confirm before acting.
                </p>
              </div>
              <button className="tipsSectionSubmitBtn" onClick={() => setShowSubmitForm(true)}>
                + Submit a Tip
              </button>
            </div>
            <div className="tipsList">
              {tips.map((tip) => (
                <TipCard key={tip.id} tip={tip} />
              ))}
            </div>
          </section>
        </>
      )}

      {isTracking && trimmedQuery && (
        <div className="trackingBanner">🐾 Tracking the problem...</div>
      )}

      {!isTracking && trimmedQuery && hasResults && (
        <div className="trailResultLabel">🐾 HoundMoto found a trail</div>
      )}

      {!isTracking && trimmedQuery && !hasResults && (
        <section className="panel">
          <h2>{looksLikeVehicleQuery(trimmedQuery) ? "Vehicle Not in Database" : "No Results Found"}</h2>
          <p>
            {looksLikeVehicleQuery(trimmedQuery)
              ? "That vehicle is not in the HoundMoto database yet. Specs vary widely by trim and engine — always verify against your owner's manual or door sticker."
              : "HoundMoto does not have that result yet. Try a vehicle year/make/model, trouble code (P0300), or a spec like oil capacity or tire size."}
          </p>
          <p className="note">HoundMoto does not guess specs. Data is added as vehicles are verified.</p>
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
          <h2>{vehicle.year} {vehicle.make} {vehicle.model}</h2>
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
          <h2>{item.code}: {item.title}</h2>
          <div className="grid">
            <Info title="Common Causes" value={item.causes} />
            <Info title="Severity" value={item.severity} />
            {item.steps && <Info title="Next Steps" value={item.steps} />}
          </div>
          <p className="note">
            Trouble code info is a starting point only. Diagnose before replacing parts.
          </p>
        </section>
      ))}

      {results.tips.length > 0 && (
        <section className="panel">
          <h2 className="tipsSectionTitle">Mechanic Tips</h2>
          <p className="tipsSectionSub">
            Community-submitted. Unverified — always confirm before acting.
          </p>
          <div className="tipsList tipSearchResults">
            {results.tips.map((tip) => (
              <TipCard key={tip.id} tip={tip} />
            ))}
          </div>
        </section>
      )}

      {showSubmitForm && (
        <TipSubmitForm
          onSubmit={handleTipSubmit}
          onClose={() => setShowSubmitForm(false)}
        />
      )}
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

function TipCard({ tip }) {
  return (
    <div className="tipCard">
      <div className="tipCardTop">
        <span className="tipCategory">{tip.category}</span>
        <span className="tipUnverified">Unverified</span>
      </div>
      <div className="tipVehicle">{tip.vehicle}</div>
      <h4 className="tipTitle">{tip.title}</h4>
      <p className="tipContent">{tip.content}</p>
      <div className="tipMeta">
        Submitted by {tip.submitter} &middot; {tip.date}
      </div>
    </div>
  );
}

export default App;
