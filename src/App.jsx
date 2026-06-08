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
  chevy: "chevrolet", chev: "chevrolet", chev: "chevrolet",
  gm: "gmc", vw: "volkswagen", merc: "mercury",
};

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
function matchVehicle(vehicle, rawQuery) {
  const norm = normalizeQuery(rawQuery);
  const tokens = norm.split(" ").filter(Boolean);
  const cleanQ = cleanText(norm);

  const identityParts = [vehicle.year, vehicle.make, vehicle.model, vehicle.engine]
    .concat(vehicle.aliases || []);
  const identityLow  = identityParts.join(" ").toLowerCase();
  const identityClean = cleanText(identityParts.join(" "));

  // --- Exact: full normalised query appears in identity ---
  if (identityLow.includes(norm) || identityClean.includes(cleanQ)) return "exact";

  // --- Exact: every token found in identity (handles "chevy silverado 2014") ---
  if (tokens.length > 0 && tokens.every((t) => identityClean.includes(cleanText(t)))) return "exact";

  // --- Related: query contains a year that doesn't match, but make+model does ---
  const queryYear = (rawQuery.match(YEAR_RE) || [])[0];
  if (queryYear && vehicle.year !== queryYear) {
    const noYear = tokens.filter((t) => !YEAR_RE.test(t));
    const makeModelClean = cleanText([vehicle.make, vehicle.model].join(" "));
    if (
      noYear.length > 0 &&
      noYear.every((t) => makeModelClean.includes(cleanText(t)))
    ) return "related";
  }

  // --- Exact: model-only search with no year in query ---
  if (!queryYear) {
    const makeModelClean = cleanText([vehicle.make, vehicle.model].join(" "));
    if (makeModelClean.includes(cleanQ)) return "exact";
    if (tokens.every((t) => makeModelClean.includes(cleanText(t)))) return "exact";
  }

  return null;
}

function looksLikeVehicleQuery(query) {
  return YEAR_RE.test(query) ||
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
    const raw = vehicleSpecs
      .map((v) => ({ ...v, _confidence: matchVehicle(v, trimmedQuery) }))
      .filter((v) => v._confidence !== null);
    const vehicles = [
      ...raw.filter((v) => v._confidence === "exact"),
      ...raw.filter((v) => v._confidence === "related"),
    ];
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
