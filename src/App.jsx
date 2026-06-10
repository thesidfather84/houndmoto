import { useMemo, useState, useEffect } from "react";
import "./App.css";
import { track } from "./analytics";
import { findManualRefsForVehicle, buildManualSearchLinks, MANUAL_ATTRIBUTION } from "./manualRefsData";
import { TipSubmitForm } from "./TipSubmitForm";
import { loadTips, saveTip, searchTips } from "./tipsData";
import { toVehicleSpecs } from "./fluidDatabase";
import { troubleCodes } from "./dtcCodes";
import { vehicleCoverage } from "./vehicleCoverageData";
import { matchDirectory } from "./vehicleDirectory";
import { SymptomDiagnosisWizard } from "./SymptomDiagnosisWizard";
import { TermsPage, PrivacyPage, DisclaimerPage, ContactPage } from "./LegalPages";
import { lazy, Suspense } from "react";
const VinScanner = lazy(() => import("./VinScanner").then((m) => ({ default: m.VinScanner })));
import {
  vendors, repairResources,
  vehicleMakes, vehicleModels, vehicleEngines, partCategories,
  buildPartMatch, lemonManualsUrl, isVin, getYear,
} from "./partsData";

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
    coolantCapacity: "About 12 quarts",
    transmissionFluid: "Mercon V", transmissionCapacity: "Varies by service type",
    tireSize: "Common size P225/60R16, verify door sticker", batteryGroup: "Group 65 commonly used",
    wipers: "22 inch driver / 22 inch passenger", bulbs: "Verify by trim before buying",
    notes: "Starter data. Always verify before repair."
  },
  {
    year: "2018", make: "Ford", model: "F-150", engine: "5.0L V8",
    oilType: "5W-20 or 5W-30 depending on spec, verify manual", oilCapacity: "About 8.8 quarts with filter",
    coolantCapacity: "About 23.5 quarts (5.0L V8)",
    transmissionFluid: "Mercon ULV for 10-speed, verify transmission", transmissionCapacity: "Service amount varies",
    tireSize: "Varies by trim, verify door sticker", batteryGroup: "Group H7 / 94R commonly used on many trims",
    wipers: "22 inch driver / 22 inch passenger", bulbs: "Varies by halogen/LED trim",
    notes: "Starter data. Always verify before repair."
  },
  {
    year: "2014", make: "Chevrolet", model: "Silverado 1500", engine: "5.3L V8",
    oilType: "0W-20, verify manual", oilCapacity: "About 8 quarts with filter",
    coolantCapacity: "About 14 quarts (Dex-Cool)",
    transmissionFluid: "Dexron VI, verify transmission", transmissionCapacity: "Service amount varies",
    tireSize: "Varies by trim, verify door sticker", batteryGroup: "Group H7 / 94R commonly used on many trims",
    wipers: "22 inch driver / 22 inch passenger", bulbs: "Verify by trim before buying",
    notes: "Starter data. Always verify before repair."
  },
  {
    year: "2018", make: "Toyota", model: "Camry", engine: "2.5L I4",
    oilType: "0W-16", oilCapacity: "4.8 quarts with filter",
    coolantCapacity: "About 6.6 quarts",
    transmissionFluid: "Toyota WS", transmissionCapacity: "Service amount varies",
    tireSize: "205/65R16", batteryGroup: "H5",
    wipers: "26 inch driver / 18 inch passenger", bulbs: "Verify by trim",
    notes: "Starter data. Always verify before repair."
  },
  {
    year: "2015", make: "Honda", model: "Civic", engine: "1.8L I4",
    oilType: "0W-20", oilCapacity: "3.9 quarts with filter",
    coolantCapacity: "About 5.6 quarts",
    transmissionFluid: "Honda CVT Fluid or ATF depending on transmission", transmissionCapacity: "Service amount varies",
    tireSize: "195/65R15", batteryGroup: "51R",
    wipers: "26 inch driver / 22 inch passenger", bulbs: "Verify by trim",
    notes: "Starter data. Always verify before repair."
  },
  {
    year: "2014", make: "Chevrolet", model: "Cruze", engine: "1.4L Turbo",
    oilType: "5W-30", oilCapacity: "4.25 quarts with filter",
    coolantCapacity: "About 6.5 quarts (Dex-Cool)",
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
    coolantCapacity: "About 15 quarts (Dex-Cool)",
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

  // ─── Chevrolet Suburban ───────────────────────────────────────────────────────
  {
    year: "2000", make: "Chevrolet", model: "Suburban 1500", engine: "5.3L V8",
    aliases: ["suburban", "chevy suburban"],
    oilType: "5W-30", oilCapacity: "6 quarts with filter",
    transmissionFluid: "Dexron III (early) / Dexron VI (preferred)", transmissionCapacity: "Varies by service type",
    tireSize: "265/70R16", batteryGroup: "Group 78 commonly used",
    wipers: "22 inch driver / 22 inch passenger", bulbs: "Verify by trim",
    commonFailures: "Intake manifold gasket (5.3L), front wheel bearings, door lock actuators, HVAC blend door actuator",
    dtcNotes: "P0300 misfires (coil issues common), P0449/P0455 EVAP, P0128 thermostat",
    maintenanceNotes: "Flush transmission fluid every 50k mi. 4WD front diff and transfer case fluid every 30k mi.",
    notes: "Starter data. Always verify before repair."
  },
  {
    year: "2007", make: "Chevrolet", model: "Suburban 1500", engine: "5.3L V8",
    aliases: ["suburban", "chevy suburban"],
    oilType: "5W-30", oilCapacity: "6 quarts with filter",
    transmissionFluid: "Dexron VI", transmissionCapacity: "Varies by service type",
    tireSize: "265/70R17", batteryGroup: "Group 78 commonly used",
    wipers: "22 inch driver / 22 inch passenger", bulbs: "Verify by trim",
    commonFailures: "AFM (Active Fuel Management) lifter failures on 5.3L, water pump, front CV axles",
    dtcNotes: "P0300 (lifter/AFM misfire), P0449 EVAP vent valve, P0128 thermostat",
    maintenanceNotes: "Many owners disable AFM with a tune or AFM Disabler to prevent lifter failure. Transmission flush every 50k.",
    notes: "Starter data. Always verify before repair."
  },
  {
    year: "2015", make: "Chevrolet", model: "Suburban", engine: "5.3L V8",
    aliases: ["suburban", "chevy suburban"],
    oilType: "0W-20", oilCapacity: "8 quarts with filter",
    transmissionFluid: "Dexron VI", transmissionCapacity: "Varies by service type",
    tireSize: "265/65R18", batteryGroup: "Group H7 / 94R commonly used",
    wipers: "22 inch driver / 22 inch passenger", bulbs: "Verify by trim",
    commonFailures: "AFM lifter failures (5.3L), sunroof drains clogging, trailer brake wiring issues",
    dtcNotes: "P0300 (AFM lifters), P0449 EVAP, P0016 cam/crank correlation (timing chain)",
    maintenanceNotes: "0W-20 required. AFM lifter failures are common — consider disabling AFM proactively.",
    notes: "Starter data. Always verify before repair."
  },

  // ─── Chevrolet Tahoe ─────────────────────────────────────────────────────────
  {
    year: "2002", make: "Chevrolet", model: "Tahoe", engine: "5.3L V8",
    aliases: ["tahoe", "chevy tahoe"],
    oilType: "5W-30", oilCapacity: "6 quarts with filter",
    transmissionFluid: "Dexron III (or Dexron VI preferred)", transmissionCapacity: "Varies by service type",
    tireSize: "265/70R16", batteryGroup: "Group 78 commonly used",
    wipers: "22 inch driver / 22 inch passenger", bulbs: "Verify by trim",
    commonFailures: "Intake manifold gaskets, power window regulators, 4WD actuator, AC compressor",
    dtcNotes: "P0300 misfires (coil issues), P0449 EVAP, P0128 thermostat",
    maintenanceNotes: "Transmission fluid flush every 50k. 4WD front differential fluid every 30k.",
    notes: "Starter data. Always verify before repair."
  },
  {
    year: "2014", make: "Chevrolet", model: "Tahoe", engine: "5.3L V8",
    aliases: ["tahoe", "chevy tahoe"],
    oilType: "0W-20", oilCapacity: "8 quarts with filter",
    transmissionFluid: "Dexron VI", transmissionCapacity: "Varies by service type",
    tireSize: "255/65R18", batteryGroup: "Group H7 / 94R commonly used",
    wipers: "22 inch driver / 22 inch passenger", bulbs: "Verify by trim",
    commonFailures: "AFM lifter failure (5.3L), climate control screens, power liftgate",
    dtcNotes: "P0300 (AFM lifters), P0449 EVAP, P0016 cam-crank correlation",
    maintenanceNotes: "AFM (Active Fuel Management) lifter failure is common on this generation. Consider disabling AFM.",
    notes: "Starter data. Always verify before repair."
  },
  {
    year: "2020", make: "Chevrolet", model: "Tahoe", engine: "5.3L V8",
    aliases: ["tahoe", "chevy tahoe"],
    oilType: "0W-20", oilCapacity: "8 quarts with filter",
    transmissionFluid: "Dexron HP", transmissionCapacity: "Varies by service type",
    tireSize: "275/60R20", batteryGroup: "Group H7 commonly used",
    wipers: "22 inch driver / 22 inch passenger", bulbs: "Verify by trim",
    commonFailures: "DFM (Dynamic Fuel Management) issues, 10-speed transmission harsh shifts, air suspension (if equipped)",
    dtcNotes: "P0300 (DFM), P0700 transmission codes, P016X cam/crank correlation",
    maintenanceNotes: "Uses Dexron HP in 10-speed transmission — critical to use correct fluid. DFM is an evolution of AFM.",
    notes: "Starter data. Always verify before repair."
  },

  // ─── GMC Sierra 1500 ─────────────────────────────────────────────────────────
  {
    year: "2005", make: "GMC", model: "Sierra 1500", engine: "5.3L V8",
    aliases: ["gmc sierra", "sierra", "sierra 1500"],
    oilType: "5W-30", oilCapacity: "6 quarts with filter",
    transmissionFluid: "Dexron III or Dexron VI", transmissionCapacity: "Varies by service type",
    tireSize: "Varies by trim, verify door sticker", batteryGroup: "Group 78 commonly used",
    wipers: "22 inch driver / 22 inch passenger", bulbs: "Verify by trim",
    commonFailures: "Intake manifold gasket, front wheel bearings, door lock actuators, throttle position sensor",
    dtcNotes: "P0300 misfires (coil issues), P0449 EVAP, P0128 thermostat, P0463 fuel level sensor",
    maintenanceNotes: "Mechanically identical to Chevrolet Silverado same year. Same service intervals apply.",
    notes: "Starter data. Always verify before repair."
  },
  {
    year: "2014", make: "GMC", model: "Sierra 1500", engine: "5.3L V8",
    aliases: ["gmc sierra", "sierra", "sierra 1500"],
    oilType: "0W-20", oilCapacity: "8 quarts with filter",
    transmissionFluid: "Dexron VI", transmissionCapacity: "Varies by service type",
    tireSize: "Varies by trim, verify door sticker", batteryGroup: "Group H7 / 94R commonly used",
    wipers: "22 inch driver / 22 inch passenger", bulbs: "Verify by trim",
    commonFailures: "AFM lifter failure (5.3L), transmission shift quality, power window regulators",
    dtcNotes: "P0300 (AFM lifters), P0449 EVAP, P0016 cam/crank correlation",
    maintenanceNotes: "Mechanically identical to Chevrolet Silverado 1500 same year. AFM disable worth considering.",
    notes: "Starter data. Always verify before repair."
  },
  {
    year: "2019", make: "GMC", model: "Sierra 1500", engine: "5.3L V8",
    aliases: ["gmc sierra", "sierra", "sierra 1500"],
    oilType: "0W-20", oilCapacity: "8 quarts with filter",
    transmissionFluid: "Dexron HP", transmissionCapacity: "Varies by service type",
    tireSize: "Varies by trim, verify door sticker", batteryGroup: "Group H7 commonly used",
    wipers: "22 inch driver / 22 inch passenger", bulbs: "Verify by trim",
    commonFailures: "10-speed transmission harsh shifts (TSB available), DFM lifter issues",
    dtcNotes: "P0300 (DFM), P0700 transmission, P016X cam/crank correlation",
    maintenanceNotes: "Dexron HP required in 10-speed — using wrong fluid causes shift issues. Transmission relearn procedure after fluid change.",
    notes: "Starter data. Always verify before repair."
  },

  // ─── GMC Yukon ───────────────────────────────────────────────────────────────
  {
    year: "2007", make: "GMC", model: "Yukon", engine: "5.3L V8",
    aliases: ["gmc yukon", "yukon"],
    oilType: "5W-30", oilCapacity: "6 quarts with filter",
    transmissionFluid: "Dexron VI", transmissionCapacity: "Varies by service type",
    tireSize: "265/65R18", batteryGroup: "Group 78 commonly used",
    wipers: "22 inch driver / 22 inch passenger", bulbs: "Verify by trim",
    commonFailures: "AFM lifter failures (5.3L), water pump, front CV axles, door lock actuators",
    dtcNotes: "P0300 (AFM), P0449 EVAP vent valve, P0128 thermostat",
    maintenanceNotes: "Mechanically identical to Chevrolet Tahoe same year. AFM disable recommended proactively.",
    notes: "Starter data. Always verify before repair."
  },
  {
    year: "2015", make: "GMC", model: "Yukon", engine: "5.3L V8",
    aliases: ["gmc yukon", "yukon"],
    oilType: "0W-20", oilCapacity: "8 quarts with filter",
    transmissionFluid: "Dexron VI", transmissionCapacity: "Varies by service type",
    tireSize: "265/65R18", batteryGroup: "Group H7 / 94R commonly used",
    wipers: "22 inch driver / 22 inch passenger", bulbs: "Verify by trim",
    commonFailures: "AFM lifter failures, sunroof drain blockage, power liftgate",
    dtcNotes: "P0300 (AFM), P0016 cam/crank correlation, P0449 EVAP",
    maintenanceNotes: "Mechanically identical to Chevrolet Tahoe 2015. AFM disable strongly recommended.",
    notes: "Starter data. Always verify before repair."
  },

  // ─── GMC Yukon XL ────────────────────────────────────────────────────────────
  {
    year: "2007", make: "GMC", model: "Yukon XL", engine: "5.3L V8",
    aliases: ["yukon xl", "gmc yukon xl", "suburban equivalent"],
    oilType: "5W-30", oilCapacity: "6 quarts with filter",
    transmissionFluid: "Dexron VI", transmissionCapacity: "Varies by service type",
    tireSize: "265/70R17", batteryGroup: "Group 78 commonly used",
    wipers: "22 inch driver / 22 inch passenger", bulbs: "Verify by trim",
    commonFailures: "AFM lifter failures (5.3L), water pump, door lock actuators",
    dtcNotes: "P0300 (AFM lifters), P0449 EVAP, P0128 thermostat",
    maintenanceNotes: "Essentially the same vehicle as the Chevrolet Suburban. Same service procedures apply.",
    notes: "Starter data. Always verify before repair."
  },

  // ─── Ford Expedition ─────────────────────────────────────────────────────────
  {
    year: "2004", make: "Ford", model: "Expedition", engine: "5.4L V8",
    aliases: ["expedition", "ford expedition", "ford suv"],
    oilType: "5W-20", oilCapacity: "7 quarts with filter",
    transmissionFluid: "Mercon V", transmissionCapacity: "Varies by service type",
    tireSize: "265/70R17", batteryGroup: "Group 65 commonly used",
    wipers: "22 inch driver / 22 inch passenger", bulbs: "Verify by trim",
    commonFailures: "Spark plug blowout (5.4L 3-valve), cam phaser noise, timing chain stretch, rear liftgate struts",
    dtcNotes: "P0340/P0345 cam sensors (phaser), P0300 misfires, P0022 cam timing",
    maintenanceNotes: "The 5.4L 3-valve is known for spark plugs breaking off on removal — use penetrant and heat before attempting plug changes.",
    notes: "Starter data. Always verify before repair."
  },
  {
    year: "2015", make: "Ford", model: "Expedition", engine: "3.5L EcoBoost V6",
    aliases: ["expedition", "ford expedition"],
    oilType: "5W-30", oilCapacity: "6 quarts with filter",
    transmissionFluid: "Mercon LV", transmissionCapacity: "Varies by service type",
    tireSize: "275/55R20", batteryGroup: "Group H7 / 94R commonly used",
    wipers: "22 inch driver / 22 inch passenger", bulbs: "Verify by trim",
    commonFailures: "Turbocharger hose connections, carbon buildup on direct injection valves, rear AC issues",
    dtcNotes: "P0087 fuel rail pressure (fuel pump), P0171/P0174 lean (turbo boost leak)",
    maintenanceNotes: "EcoBoost benefits from walnut blasting (carbon buildup on intake valves) every 60-80k mi.",
    notes: "Starter data. Always verify before repair."
  },
  {
    year: "2021", make: "Ford", model: "Expedition", engine: "3.5L EcoBoost V6",
    aliases: ["expedition", "ford expedition"],
    oilType: "5W-30", oilCapacity: "6 quarts with filter",
    transmissionFluid: "Mercon ULV", transmissionCapacity: "Varies by service type",
    tireSize: "275/55R20", batteryGroup: "Group H7 / 94R commonly used",
    wipers: "22 inch driver / 22 inch passenger", bulbs: "Verify by trim",
    commonFailures: "10-speed transmission harsh/delayed shifts (TSB), panoramic roof noise, electrical gremlins",
    dtcNotes: "P0087 fuel pressure, P0171/P0174 lean condition, P0700 transmission codes",
    maintenanceNotes: "Mercon ULV required — critical to use correct transmission fluid. Relearn procedure recommended after fluid change.",
    notes: "Starter data. Always verify before repair."
  },

  // ─── Nissan Frontier ─────────────────────────────────────────────────────────
  {
    year: "2005", make: "Nissan", model: "Frontier", engine: "4.0L V6",
    aliases: ["nissan frontier", "frontier", "nissan pickup"],
    oilType: "5W-30", oilCapacity: "5.6 quarts with filter",
    transmissionFluid: "Nissan Matic-S or Dexron III (auto)", transmissionCapacity: "Varies by service type",
    tireSize: "265/75R16 (typical 4x4)", batteryGroup: "Group 35 commonly used",
    wipers: "20 inch driver / 18 inch passenger", bulbs: "Verify by trim",
    commonFailures: "Timing chain stretch (2005-2010 4.0L known issue), radiator failure causing coolant/trans fluid mixing",
    dtcNotes: "P0011/P0021 cam timing (stretched chain), P0300 misfires, P0340 cam sensor",
    maintenanceNotes: "The 2005-2010 4.0L has a known timing chain and radiator issue. Check for milky transmission fluid — indicates radiator coolant tube failure.",
    notes: "Starter data. Always verify before repair."
  },
  {
    year: "2016", make: "Nissan", model: "Frontier", engine: "4.0L V6",
    aliases: ["nissan frontier", "frontier", "nissan pickup"],
    oilType: "5W-30", oilCapacity: "5.6 quarts with filter",
    transmissionFluid: "Nissan Matic-S or equivalent", transmissionCapacity: "Varies by service type",
    tireSize: "265/75R16 (typical 4x4)", batteryGroup: "Group 35 commonly used",
    wipers: "20 inch driver / 18 inch passenger", bulbs: "Verify by trim",
    commonFailures: "Timing chain (less severe than earlier generation), heat shield rattle, AC compressor",
    dtcNotes: "P0011/P0021 cam timing, P0340 cam sensor, P0300 misfires",
    maintenanceNotes: "Spark plugs at 105k per schedule — Iridium plugs recommended. Keep trans fluid fresh to prevent shift issues.",
    notes: "Starter data. Always verify before repair."
  },
  {
    year: "2022", make: "Nissan", model: "Frontier", engine: "3.8L V6",
    aliases: ["nissan frontier", "frontier", "nissan pickup"],
    oilType: "0W-20", oilCapacity: "5.4 quarts with filter",
    transmissionFluid: "Nissan Matic-S8 or equivalent", transmissionCapacity: "Varies by service type",
    tireSize: "265/70R16 (typical 4x4)", batteryGroup: "Group 35 commonly used",
    wipers: "22 inch driver / 18 inch passenger", bulbs: "Verify by trim",
    commonFailures: "Still early in production life — check for current TSBs",
    dtcNotes: "Check current Nissan TSBs for this generation",
    maintenanceNotes: "New engine and 9-speed transmission for this generation. Use Nissan-specified fluids to avoid shift quality issues.",
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

// Normalize make abbreviations before searching
const MAKE_NORM = {
  chevy: "chevrolet", chev: "chevrolet",
  gm: "gmc", vw: "volkswagen", merc: "mercury",
};

// Words that indicate WHAT the user wants (spec type) — not WHICH vehicle.
// Filtering these lets "f150 oil", "camry transmission fluid", "silverado coolant" all resolve correctly.
const SPEC_WORDS = new Set([
  "oil", "coolant", "antifreeze", "fluid", "capacity", "type",
  "size", "tire", "wiper", "filter", "change", "flush", "transmission",
]);

function normalizeQuery(raw) {
  return raw
    .toLowerCase()
    .replace(/\s*-\s*/g, " ")   // f-150 → f 150
    .replace(/\s+/g, " ")
    .trim()
    .split(" ")
    .map((t) => MAKE_NORM[t] || t)
    .join(" ");
}

const YEAR_RE = /\b(19|20)\d{2}\b/;

// Returns "exact", "related", or null (no match).
// Only matches on identity fields (year/make/model/engine/aliases) — never on fluid brand names.
// SPEC_WORDS (oil, coolant, fluid, etc.) are stripped before token matching so that
// "2015 suburban coolant" and "f150 oil capacity" resolve to the correct vehicle.
function matchVehicle(vehicle, rawQuery) {
  const norm = normalizeQuery(rawQuery);
  const tokens = norm.split(" ").filter(Boolean);
  const cleanQ = cleanText(norm);
  // Identity-only tokens: strip spec-type words so they don't block vehicle matching
  const idTokens = tokens.filter((t) => !SPEC_WORDS.has(t));

  const identityParts = [vehicle.year, vehicle.make, vehicle.model, vehicle.engine]
    .concat(vehicle.aliases || []);
  const identityLow  = identityParts.join(" ").toLowerCase();
  const identityClean = cleanText(identityParts.join(" "));

  // --- Exact: full normalised query appears in identity (whole-string fast path) ---
  if (identityLow.includes(norm) || identityClean.includes(cleanQ)) return "exact";

  // --- Exact: every identity token found in identity ---
  if (idTokens.length > 0 && idTokens.every((t) => identityClean.includes(cleanText(t)))) return "exact";

  // --- Related: query has a year that differs, but make+model matches ---
  const queryYear = (rawQuery.match(YEAR_RE) || [])[0];
  if (queryYear && vehicle.year !== queryYear) {
    const noYear = idTokens.filter((t) => !YEAR_RE.test(t));
    const makeModelClean = cleanText([vehicle.make, vehicle.model].join(" "));
    if (noYear.length > 0 && noYear.every((t) => makeModelClean.includes(cleanText(t)))) return "related";
  }

  // --- Exact: model-only search with no year in query ---
  if (!queryYear) {
    const makeModelClean = cleanText([vehicle.make, vehicle.model].join(" "));
    const idCleanQ = cleanText(idTokens.join(" "));
    if (idCleanQ.length > 0 && makeModelClean.includes(idCleanQ)) return "exact";
    if (idTokens.length > 0 && idTokens.every((t) => makeModelClean.includes(cleanText(t)))) return "exact";
  }

  return null;
}

// Finds generation-based coverage records when no exact vehicleSpecs year exists.
// Strips spec words and year before comparing make/model/aliases, then checks year range.
function matchCoverage(rawQuery) {
  const norm = normalizeQuery(rawQuery);
  const allTokens = norm.split(" ").filter(Boolean);
  const queryYear = (rawQuery.match(YEAR_RE) || [])[0];
  const queryYearNum = queryYear ? parseInt(queryYear, 10) : null;

  // Identity tokens only — no spec words, no years
  const idTokens = allTokens.filter((t) => !SPEC_WORDS.has(t) && !YEAR_RE.test(t));
  if (idTokens.length === 0) return [];

  return vehicleCoverage
    .filter((cov) => {
      const identityClean = cleanText(
        [cov.make, cov.model, ...(cov.aliases || [])].join(" ")
      );
      if (!idTokens.every((t) => identityClean.includes(cleanText(t)))) return false;
      if (queryYearNum !== null) {
        return queryYearNum >= cov.yearStart && queryYearNum <= cov.yearEnd;
      }
      return true;
    })
    .map((cov) => ({ ...cov, _confidence: "coverage", _queryYear: queryYear || null }));
}

function looksLikeVehicleQuery(query) {
  return YEAR_RE.test(query) ||
    /\b(ford|chevy|chevrolet|toyota|honda|dodge|ram|jeep|nissan|bmw|hyundai|subaru|kia|volkswagen|vw|mazda|mitsubishi|gmc|buick|cadillac|lincoln|mercury|pontiac|oldsmobile|saturn|chrysler|acura|lexus|infiniti|volvo|audi|mercedes|benz|porsche|tesla)\b/i.test(query);
}

const LEGAL_PAGES = new Set(["terms", "privacy", "disclaimer", "contact"]);
function hashPage() {
  const h = window.location.hash.replace("#", "").toLowerCase();
  return LEGAL_PAGES.has(h) ? h : null;
}

function App() {
  const [page, setPage] = useState(hashPage);
  const [query, setQuery] = useState("");
  const [tips, setTips] = useState([]);
  const [showSubmitForm, setShowSubmitForm] = useState(false);
  const [showWizard, setShowWizard] = useState(false);
  const [isTracking, setIsTracking] = useState(false);

  useEffect(() => {
    function onHashChange() { setPage(hashPage()); }
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  function navigateTo(p) {
    window.location.hash = p || "";
    setPage(p || null);
  }

  // VIN decoder state
  const [vinResult, setVinResult] = useState(null);
  const [vinDecoding, setVinDecoding] = useState(false);
  const [vinError, setVinError] = useState("");
  const [showScanner, setShowScanner] = useState(false);

  // Vehicle lookup tree state
  const [showVehicleLookup, setShowVehicleLookup] = useState(false);
  const [vYear, setVYear] = useState("");
  const [vMake, setVMake] = useState("");
  const [vModel, setVModel] = useState("");
  const [vEngine, setVEngine] = useState("");
  const [vCategory, setVCategory] = useState("");
  const [vPart, setVPart] = useState("");

  useEffect(() => {
    setTips(loadTips());
  }, []);

  useEffect(() => { track("page_view", {}); }, []);

  useEffect(() => {
    if (!query.trim()) { setIsTracking(false); return; }
    setIsTracking(true);
    const t = setTimeout(() => setIsTracking(false), 600);
    return () => clearTimeout(t);
  }, [query]);

  const trimmedQuery = query.trim();

  const results = useMemo(() => {
    if (!trimmedQuery) return { vehicles: [], codes: [], tips: [], coverage: [] };
    const raw = vehicleSpecs
      .map((v) => ({ ...v, _confidence: matchVehicle(v, trimmedQuery) }))
      .filter((v) => v._confidence !== null);
    const vehicles = [
      ...raw.filter((v) => v._confidence === "exact"),
      ...raw.filter((v) => v._confidence === "related"),
    ];
    // Coverage fallback: only used when no vehicleSpecs records match at all
    const coverage = vehicles.length === 0 ? matchCoverage(trimmedQuery) : [];
    const codes = troubleCodes.filter((item) => {
      const searchable = `${item.code} ${item.title} ${item.causes}`;
      return (
        searchable.toLowerCase().includes(trimmedQuery.toLowerCase()) ||
        cleanText(searchable).includes(cleanText(trimmedQuery))
      );
    });
    const matchedTips = searchTips(tips, trimmedQuery);
    return { vehicles, codes, tips: matchedTips, coverage };
  }, [trimmedQuery, tips]);

  const partMatch = useMemo(() => buildPartMatch(trimmedQuery), [trimmedQuery]);

  const lemonUrl = useMemo(() => {
    if (vinResult?.Make && vinResult?.ModelYear) {
      return lemonManualsUrl(vinResult.Make, vinResult.ModelYear);
    }
    const detectedMake = vehicleMakes.find((m) => trimmedQuery.toLowerCase().includes(m.toLowerCase()));
    return lemonManualsUrl(detectedMake, getYear(trimmedQuery));
  }, [vinResult, trimmedQuery]);

  const hasResults =
    results.vehicles.length > 0 || results.codes.length > 0 ||
    results.tips.length > 0 || results.coverage.length > 0;

  function handleTipSubmit(tipData) {
    const updated = saveTip(tipData);
    setTips(updated);
  }

  function playHoundSound() {
    console.log("🐕 Hound sound placeholder");
  }

  // Main search action: decodes a VIN if one was entered, otherwise just
  // runs the live search (which already updates as the query changes).
  async function runSearch() {
    playHoundSound();
    const q = query.trim();
    if (!q) return;

    const total = results.vehicles.length + results.codes.length + results.tips.length + results.coverage.length;
    track("search_submitted", { query: q, resultCount: total, isVin: isVin(q) });
    results.vehicles.slice(0, 5).forEach((v) => {
      track("vehicle_selected", { vehicle: `${v.year} ${v.make} ${v.model}` });
    });

    setIsTracking(true);
    setVinError("");

    if (isVin(q)) {
      const vin = q.toUpperCase();
      const url = `https://vpic.nhtsa.dot.gov/api/vehicles/DecodeVinValues/${vin}?format=json`;
      console.log("[HoundMoto] VIN detected, decoding:", vin);
      console.log("[HoundMoto] fetch ->", url);
      setVinDecoding(true);
      setVinResult(null);
      try {
        const res = await fetch(url);
        console.log("[HoundMoto] VIN decode HTTP status:", res.status);
        if (!res.ok) throw new Error(`VIN service returned HTTP ${res.status}`);
        const data = await res.json();
        const item = data?.Results?.[0];
        console.log("[HoundMoto] VIN decode result:", item);
        if (item?.ModelYear) {
          setVinResult(item);
          const decoded = [item.ModelYear, item.Make, item.Model].filter(Boolean).join(" ");
          if (decoded) setQuery(decoded);
        } else {
          track("error_occurred", { type: "vin_decode_failed" });
          setVinError("That VIN could not be decoded. Check the characters and try again.");
        }
      } catch (err) {
        // Network/socket failures land here instead of crashing the app.
        track("error_occurred", { type: "vin_network", error: err.message });
        console.error("[HoundMoto] VIN decode failed:", err);
        setVinError("VIN lookup is temporarily unavailable (network error). You can still search by year, make, and model.");
      } finally {
        setVinDecoding(false);
      }
    }

    setTimeout(() => setIsTracking(false), 600);
  }

  function handleHoundIt() {
    runSearch();
  }

  function handleScanDetected(vin) {
    setQuery(vin);
    setShowScanner(false);
    // Small delay lets React re-render the query before we decode
    setTimeout(() => runSearch(), 100);
  }

  function applyVehicleLookup() {
    if (!vYear || !vMake || !vModel) return;
    setQuery([vYear, vMake, vModel, vEngine, vPart].filter(Boolean).join(" "));
    setShowVehicleLookup(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  const lookupYears = useMemo(() => {
    const a = [];
    for (let y = 2026; y >= 1980; y--) a.push(String(y));
    return a;
  }, []);

  if (page === "terms")      return <TermsPage      onClose={() => navigateTo("")} />;
  if (page === "privacy")    return <PrivacyPage    onClose={() => navigateTo("")} />;
  if (page === "disclaimer") return <DisclaimerPage onClose={() => navigateTo("")} />;
  if (page === "contact")    return <ContactPage    onClose={() => navigateTo("")} />;

  if (showWizard) {
    return <SymptomDiagnosisWizard onClose={() => setShowWizard(false)} />;
  }

  if (showScanner) {
    return (
      <Suspense fallback={<div className="vinScanOverlay"><div className="vinScanModal"><p className="vinScanStatus">Loading scanner…</p></div></div>}>
        <VinScanner onDetected={handleScanDetected} onClose={() => setShowScanner(false)} />
      </Suspense>
    );
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
            onKeyDown={(e) => e.key === "Enter" && runSearch()}
            placeholder="Search: VIN, 2018 Ford F-150 oil, P0300, tire size, part number..."
            autoFocus
          />
          <button
            className={`houndBtn${isTracking ? " tracking" : ""}`}
            onClick={handleHoundIt}
            disabled={vinDecoding}
          >
            {vinDecoding ? "Decoding VIN…" : "🐕 HOUND IT"}
          </button>
          <button
            className="scanVinBtn"
            onClick={() => setShowScanner(true)}
            title="Scan VIN barcode from door jamb sticker"
          >
            📷 Scan VIN
          </button>
        </div>

        {isVin(query) && !vinDecoding && !vinResult && (
          <p className="vinHint">🔍 VIN detected — press HOUND IT to decode this vehicle</p>
        )}
        {vinError && <p className="vinError">{vinError}</p>}

        <div className="quickLinks">
          <button onClick={() => setQuery("2018 Ford F-150")}>F-150</button>
          <button onClick={() => setQuery("2000 Grand Marquis")}>Grand Marquis</button>
          <button onClick={() => setQuery("2018 Toyota Camry")}>Camry</button>
          <button onClick={() => setQuery("2015 Honda Civic")}>Civic</button>
          <button onClick={() => setQuery("2014 Silverado")}>Silverado</button>
          <button onClick={() => setQuery("Suburban")}>Suburban</button>
          <button onClick={() => setQuery("P0300")}>P0300</button>
          <button onClick={() => setQuery("P0420")}>P0420</button>
          <button className="submitTipBtn" onClick={() => setShowSubmitForm(true)}>
            + Submit a Tip
          </button>
        </div>

        <button className="vehicleToggle" onClick={() => setShowVehicleLookup((v) => !v)}>
          {showVehicleLookup
            ? "▲ Close Vehicle Lookup"
            : "▼ Look Up by Vehicle  (Year → Make → Model → Part)"}
        </button>
      </section>

      {showVehicleLookup && (
        <section className="panel">
          <h2 className="tipsSectionTitle">Look Up a Part for Your Vehicle</h2>
          <p className="tipsSectionSub">Choose your vehicle step by step. Each choice unlocks the next.</p>
          <div className="vehicleTree">
            <select value={vYear} onChange={(e) => { setVYear(e.target.value); setVMake(""); setVModel(""); setVEngine(""); setVCategory(""); setVPart(""); }}>
              <option value="">1. Year</option>
              {lookupYears.map((y) => <option key={y}>{y}</option>)}
            </select>
            <select value={vMake} onChange={(e) => { setVMake(e.target.value); setVModel(""); setVEngine(""); setVCategory(""); setVPart(""); }} disabled={!vYear}>
              <option value="">2. Make</option>
              {vehicleMakes.map((m) => <option key={m}>{m}</option>)}
            </select>
            <select value={vModel} onChange={(e) => { setVModel(e.target.value); setVEngine(""); setVCategory(""); setVPart(""); }} disabled={!vMake}>
              <option value="">3. Model</option>
              {(vehicleModels[vMake] || []).map((m) => <option key={m}>{m}</option>)}
            </select>
            <select value={vEngine} onChange={(e) => setVEngine(e.target.value)} disabled={!vModel}>
              <option value="">4. Engine (optional)</option>
              {vehicleEngines.map((e) => <option key={e}>{e}</option>)}
            </select>
            <select value={vCategory} onChange={(e) => { setVCategory(e.target.value); setVPart(""); }} disabled={!vModel}>
              <option value="">5. Part Category</option>
              {Object.keys(partCategories).map((c) => <option key={c}>{c}</option>)}
            </select>
            <select value={vPart} onChange={(e) => setVPart(e.target.value)} disabled={!vCategory}>
              <option value="">6. Part Needed</option>
              {(partCategories[vCategory] || []).map((p) => <option key={p}>{p}</option>)}
            </select>
          </div>
          {vYear && vMake && vModel && (
            <div className="vehiclePreview">
              <p className="note">Will search: <strong>{[vYear, vMake, vModel, vEngine, vPart].filter(Boolean).join(" ")}</strong></p>
              <button className="wizardEntryBtn" onClick={applyVehicleLookup}>Search This Vehicle</button>
            </div>
          )}
        </section>
      )}

      {/* Symptom Diagnosis Wizard entry card */}
      <section className="wizardEntry">
        <div className="wizardEntryText">
          <div className="wizardEntryTitle">Symptom Diagnosis Wizard</div>
          <p className="wizardEntrySub">
            Describe what your vehicle is doing. Get ranked likely causes, first checks,
            tools needed, and when to call a mechanic.
          </p>
        </div>
        <button className="wizardEntryBtn" onClick={() => { setShowWizard(true); track("symptom_selected", { action: "wizard_opened" }); }}>
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

      {!isTracking && trimmedQuery && (hasResults || partMatch) && (
        <div className="trailResultLabel">🐾 HoundMoto found a trail</div>
      )}

      {vinResult && (
        <section className="panel vinResultCard">
          <h2>VIN Decoded</h2>
          <div className="resultBox">
            <strong>{vinResult.ModelYear} {vinResult.Make} {vinResult.Model}</strong>
            <span>
              {vinResult.Trim || ""}
              {vinResult.EngineCylinders ? `${vinResult.Trim ? ", " : ""}${vinResult.EngineCylinders} cylinders` : ""}
              {vinResult.DisplacementL ? `, ${vinResult.DisplacementL}L` : ""}
            </span>
          </div>
          <p className="note">Results below are for this vehicle.</p>
        </section>
      )}

      {!isTracking && trimmedQuery && partMatch && (
        <section className="panel bestMatch">
          <div className="bestMatchHeader">
            <span className="bestMatchBadge">Best Match</span>
            <h2>{partMatch.name}</h2>
          </div>
          <div className="grid">
            <Info title="Vehicle Fit" value={partMatch.vehicleFit} />
            <Info title="What It Does" value={partMatch.whatItDoes} />
            {partMatch.aka && <Info title="Also Known As" value={partMatch.aka} />}
            <Info title="⚠ Fitment Warning" value={partMatch.warn} />
          </div>
        </section>
      )}

      {!isTracking && trimmedQuery && !hasResults && !partMatch && (
        <NoResultsPanel query={trimmedQuery} />
      )}

      {results.vehicles.map((vehicle) => (
        <section
          className="panel"
          key={`${vehicle.year}-${vehicle.make}-${vehicle.model}-${vehicle.engine}`}
        >
          {vehicle._confidence === "related" && (
            <div className="confidenceBadge related">
              Related match — we have {vehicle.year} data but not your exact year. Verify specs before service.
            </div>
          )}
          <h2>{vehicle.year} {vehicle.make} {vehicle.model}</h2>
          <p className="sub">{vehicle.engine}</p>

          <div className="grid">
            <Info title="Oil Type" value={vehicle.oilType} />
            <Info title="Oil Capacity" value={vehicle.oilCapacity} />
            <Info title="Coolant Capacity" value={vehicle.coolantCapacity} />
            <Info title="Transmission Fluid" value={vehicle.transmissionFluid} />
            <Info title="Transmission Capacity" value={vehicle.transmissionCapacity} />
            <Info title="Tire Size" value={vehicle.tireSize} />
            <Info title="Battery Group" value={vehicle.batteryGroup} />
            <Info title="Wipers" value={vehicle.wipers} />
            <Info title="Bulbs" value={vehicle.bulbs} />
          </div>

          {vehicle.commonFailures && (
            <div className="extraInfo">
              <strong>Common Failures</strong>
              <span>{vehicle.commonFailures}</span>
            </div>
          )}
          {vehicle.maintenanceNotes && (
            <div className="extraInfo">
              <strong>Maintenance Notes</strong>
              <span>{vehicle.maintenanceNotes}</span>
            </div>
          )}
          {vehicle.dtcNotes && (
            <div className="extraInfo">
              <strong>Common DTCs</strong>
              <span>{vehicle.dtcNotes}</span>
            </div>
          )}

          <p className="note">{vehicle.notes}</p>
          <ManualRefsBlock vehicle={vehicle} />
          <BidWrenxBtn context="vehicle_result" />
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

      {results.coverage.map((cov, i) => (
        <section className="panel" key={`cov-${cov.make}-${cov.model}-${cov.yearStart}-${i}`}>
          <div className="confidenceBadge related">
            Generation estimate ({cov.yearStart}–{cov.yearEnd}{cov.generation ? `, ${cov.generation}` : ""})
            — specs vary by trim and engine. Verify against your owner's manual before service.
          </div>
          <h2>
            {cov._queryYear || `${cov.yearStart}–${cov.yearEnd}`} {cov.make} {cov.model}
          </h2>
          <p className="sub">{cov.engine}</p>
          <div className="grid">
            <Info title="Oil Type" value={cov.oilType} />
            <Info title="Oil Capacity" value={cov.oilCapacity} />
            <Info title="Coolant Capacity" value={cov.coolantCapacity} />
            <Info title="Transmission Fluid" value={cov.transmissionFluid} />
            <Info title="Transmission Capacity" value={cov.transmissionCapacity} />
            <Info title="Tire Size" value={cov.tireSize} />
            <Info title="Battery Group" value={cov.batteryGroup} />
            <Info title="Wipers" value={cov.wipers} />
            <Info title="Bulbs" value={cov.bulbs} />
          </div>
          {cov.commonFailures && (
            <div className="extraInfo">
              <strong>Common Failures</strong>
              <span>{cov.commonFailures}</span>
            </div>
          )}
          {cov.maintenanceNotes && (
            <div className="extraInfo">
              <strong>Maintenance Notes</strong>
              <span>{cov.maintenanceNotes}</span>
            </div>
          )}
          {cov.dtcNotes && (
            <div className="extraInfo">
              <strong>Common DTCs</strong>
              <span>{cov.dtcNotes}</span>
            </div>
          )}
          <p className="note">{cov.notes}</p>
          <BidWrenxBtn context="coverage_result" />
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

      {/* Where-to-buy and repair resources — shown for any active search */}
      {!isTracking && trimmedQuery && (
        <>
          <section className="panel" id="prices">
            <h2 className="tipsSectionTitle">Check Prices at {vendors.length} Vendors</h2>
            <p className="tipsSectionSub">Click any vendor to check live pricing for this search.</p>
            <div className="vendorList">
              {vendors.map((v) => (
                <div className="vendorRow" key={v.name}>
                  <div className="vendorInfo">
                    <span className="vendorName">{v.name}</span>
                    <span className="vendorNote">{v.note}</span>
                    <button
                      className="brokenLinkBtn"
                      onClick={() => track("broken_link_reported", { vendor: v.name })}
                      title="Report this vendor link as broken"
                    >
                      report broken link
                    </button>
                  </div>
                  <a
                    className="priceBtn"
                    href={v.url(trimmedQuery)}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => track("result_clicked", { type: "vendor", label: v.name })}
                  >
                    Check Price →
                  </a>
                </div>
              ))}
            </div>
          </section>

          <section className="panel" id="crossref">
            <h2 className="tipsSectionTitle">Cross Reference</h2>
            <p className="tipsSectionSub">Find this part under a different brand or OEM number.</p>
            <div className="crossRefList">
              <a className="crossRefLink" href={`https://www.google.com/search?q=${encodeURIComponent(trimmedQuery + " OEM part number equivalent")}`} target="_blank" rel="noreferrer">
                <span className="crossRefLabel">OEM Equivalent Search</span>
                <span className="crossRefNote">Find the original manufacturer part number</span>
              </a>
              <a className="crossRefLink" href={`https://www.google.com/search?q=${encodeURIComponent(trimmedQuery + " aftermarket cross reference")}`} target="_blank" rel="noreferrer">
                <span className="crossRefLabel">Aftermarket Equivalent</span>
                <span className="crossRefNote">Find aftermarket brands that make this part</span>
              </a>
              <a className="crossRefLink" href={`https://www.rockauto.com/en/partsearch/?partnum=${encodeURIComponent(trimmedQuery)}`} target="_blank" rel="noreferrer">
                <span className="crossRefLabel">RockAuto Part Search</span>
                <span className="crossRefNote">Use their vehicle selector for best results</span>
              </a>
            </div>
          </section>

          <section className="panel" id="repair">
            <h2 className="tipsSectionTitle">Repair Guides &amp; Manuals</h2>
            <p className="tipsSectionSub">Service manuals and DIY guides for your vehicle.</p>
            <a className="lemonFeatured" href={lemonUrl} target="_blank" rel="noreferrer"
               onClick={() => track("result_clicked", { type: "repair_manual", label: "lemon_manuals" })}>
              <div className="lemonFeaturedTop">
                <strong>Repair Manual Search</strong>
                <span className="lemonBadge">Free guides</span>
              </div>
              <span className="lemonFeaturedNote">View service manuals and repair guides for this vehicle →</span>
            </a>
            <a className="lemonFeatured" href={repairResources[0].url(trimmedQuery)} target="_blank" rel="noreferrer" style={{ marginTop: "10px" }}
               onClick={() => track("result_clicked", { type: "repair_guide", label: repairResources[0].note })}>
              <div className="lemonFeaturedTop">
                <strong>DIY Repair Guides</strong>
                <span className="lemonBadge">{repairResources[0].note}</span>
              </div>
              <span className="lemonFeaturedNote">Browse step-by-step repair documentation →</span>
            </a>
          </section>
        </>
      )}

      {showSubmitForm && (
        <TipSubmitForm
          onSubmit={handleTipSubmit}
          onClose={() => setShowSubmitForm(false)}
        />
      )}

      <SiteFooter />
    </main>
  );
}

function ManualRefsBlock({ vehicle }) {
  const refs = findManualRefsForVehicle(vehicle);
  const searchLinks = buildManualSearchLinks(vehicle);
  if (refs.length === 0 && searchLinks.length === 0) return null;

  return (
    <div className="manualRefsBlock">
      <div className="manualRefsTitle">Service Manuals</div>
      {refs.length > 0 && (
        <div className="manualRefsList">
          {refs.map((ref) => (
            <div key={ref.id} className="manualRefRow">
              <span className="manualRefCategory">{ref.category}</span>
              <span className="manualRefYears">{ref.yearStart}–{ref.yearEnd}</span>
              {ref.variant && <span className="manualRefVariant">{ref.variant}</span>}
            </div>
          ))}
        </div>
      )}
      <div className="manualRefLinks">
        {searchLinks.map((link) => (
          <a
            key={link.source}
            className="manualRefLink"
            href={link.url}
            target="_blank"
            rel="noreferrer"
            onClick={() => track("manual_reference_clicked", { source: link.source, make: vehicle.make, model: vehicle.model, year: vehicle.year })}
          >
            Search {link.name} →
          </a>
        ))}
      </div>
      <p className="manualRefAttribution">{MANUAL_ATTRIBUTION}</p>
    </div>
  );
}

function NoResultsPanel({ query }) {
  if (!looksLikeVehicleQuery(query)) {
    return (
      <section className="panel">
        <h2>No Exact Specs Yet</h2>
        <p>HoundMoto does not have exact specs for that yet. Try a vehicle year/make/model, a trouble code (P0300), a part name, or use the price and manual links below.</p>
        <BidWrenxBtn context="no_results" />
      </section>
    );
  }

  const directoryMatches = matchDirectory(query);

  if (directoryMatches.length > 0) {
    const best = directoryMatches[0];
    const yearLabel = best.yearStart === best.yearEnd
      ? String(best.yearStart)
      : `${best.yearStart}–${best.yearEnd}`;
    const typeLabel = best.type === "ev" ? "Electric Vehicle"
      : best.type === "hybrid" ? "Hybrid"
      : best.type === "truck" ? "Truck"
      : best.type === "suv" ? "SUV"
      : best.type === "van" ? "Van"
      : "Vehicle";
    return (
      <section className="panel">
        <div className="confidenceBadge related">Vehicle Recognized</div>
        <h2>{best.make} {best.model}</h2>
        <p className="sub">{typeLabel} · {yearLabel}</p>
        <p>Vehicle recognized. Detailed diagnostic information is still being added.</p>
        <p>You can still search for parts, check prices at vendors, or use the repair manual links below.</p>
        <p className="note">Specs vary by trim, engine, and model year. Always verify against your owner's manual or door sticker.</p>
        <BidWrenxBtn context="no_results" />
      </section>
    );
  }

  return (
    <section className="panel">
      <h2>Vehicle Not in Database Yet</h2>
      <p>That vehicle is not in the HoundMoto specs database yet. Specs vary widely by trim and engine — always verify against your owner's manual or door sticker. You can still use the part price and repair-manual links below.</p>
      <p className="note">HoundMoto does not guess specs. Data is added as vehicles are verified.</p>
      <BidWrenxBtn context="no_results" />
    </section>
  );
}

function SiteFooter() {
  const [count, setCount] = useState(null);

  useEffect(() => {
    fetch("/api/visitor-count")
      .then((r) => r.ok ? r.json() : null)
      .then((d) => { if (d?.count != null) setCount(d.count); })
      .catch(() => {});
  }, []);

  return (
    <footer className="siteFooter">
      <nav className="footerLinks">
        <a href="#terms"       className="footerLink">Terms &amp; Conditions</a>
        <a href="#privacy"     className="footerLink">Privacy Policy</a>
        <a href="#disclaimer"  className="footerLink">Disclaimer</a>
        <a href="#contact"     className="footerLink">Contact</a>
      </nav>
      {count != null && (
        <div className="footerVisitor">
          Total Visits: <strong>{count.toLocaleString()}</strong>
        </div>
      )}
      <div className="footerCopy">© HoundMoto. All Rights Reserved.</div>
    </footer>
  );
}

function BidWrenxBtn({ context }) {
  return (
    <a
      className="button"
      href="https://www.bidwrenx.com"
      onClick={() => track("premium_email_clicked", { context })}
    >
      Need repair help? Post this job on BidWrenx
    </a>
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
