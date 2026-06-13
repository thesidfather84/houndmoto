#!/usr/bin/env node

/**
 * HoundMoto Phase 1 Data Migration
 * Consolidates scattered data files into vehicles.json
 *
 * Sources:
 * - vehicleDirectory.js (recognition data)
 * - vehicleCoverageData.js (specs, failures, maintenance)
 * - vehicleDtcKnowledge.js (vehicle-specific DTC)
 * - manualRefsData.js (external manuals)
 *
 * Output:
 * - src/data/vehicles/vehicles.json (complete vehicle data)
 * - src/data/vehicles/vehicle-index.json (fast lookups)
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, "..");

// Import data files (ESM)
const vehicleDirectory = (await import("../src/vehicleDirectory.js")).vehicleDirectory;
const vehicleCoverage = (await import("../src/vehicleCoverageData.js")).vehicleCoverage;
const vehicleDtcKnowledge = (await import("../src/data/vehicleDtcKnowledge.js")).vehicleDtcKnowledge;
const manualRefs = (await import("../src/manualRefsData.js")).manualRefs;

console.log("🔄 Generating vehicles.json from scattered data files...\n");

// Step 1: Build vehicle map
const vehicleMap = new Map();

// Add all from vehicleDirectory
vehicleDirectory.forEach((v) => {
  const key = `${v.make}|${v.model}`;
  if (!vehicleMap.has(key)) {
    vehicleMap.set(key, {
      make: v.make,
      model: v.model,
      type: v.type,
      aliases: v.aliases || [],
      generations: [],
      dtcMappings: {},
      manuals: [],
    });
  }
});

// Step 2: Add coverage data (specs, failures, maintenance)
vehicleCoverage.forEach((vc) => {
  const key = `${vc.make}|${vc.model}`;
  const vehicle = vehicleMap.get(key);

  if (vehicle) {
    vehicle.generations.push({
      id: `${vc.make.toLowerCase()}-${vc.model.toLowerCase()}-${vc.generation || `${vc.yearStart}-${vc.yearEnd}`}`,
      name: vc.generation || null,
      yearStart: vc.yearStart,
      yearEnd: vc.yearEnd,
      engine: vc.engine,
      specs: {
        oil: {
          type: vc.oilType || null,
          capacity: vc.oilCapacity || null,
        },
        transmission: {
          fluid: vc.transmissionFluid || null,
          capacity: vc.transmissionCapacity || null,
        },
        coolant: {
          capacity: vc.coolantCapacity || null,
        },
        tire: {
          size: vc.tireSize || null,
        },
        battery: {
          group: vc.batteryGroup || null,
        },
        wipers: vc.wipers || null,
        bulbs: vc.bulbs || null,
      },
      commonFailures: parseCommonFailures(vc.commonFailures),
      dtcNotes: vc.dtcNotes || null,
      maintenanceNotes: vc.maintenanceNotes || null,
      notes: vc.notes || null,
      confidenceLevel: vc.confidenceLevel || "estimated",
    });
  }
});

// Step 3: Add vehicle-specific DTC mappings
vehicleDtcKnowledge.forEach((dtc) => {
  const key = `${dtc.make}|${dtc.model}`;
  const vehicle = vehicleMap.get(key);

  if (vehicle) {
    if (!vehicle.dtcMappings[dtc.code]) {
      vehicle.dtcMappings[dtc.code] = [];
    }
    vehicle.dtcMappings[dtc.code].push({
      title: dtc.title,
      likelyCauses: dtc.likelyCauses,
      checkFirst: dtc.checkFirst,
      avoid: dtc.avoid,
      severity: dtc.severity,
      canDrive: dtc.canDrive,
      years: dtc.years,
    });
  }
});

// Step 4: Add manual references
manualRefs.forEach((ref) => {
  const key = `${ref.make}|${ref.model}`;
  const vehicle = vehicleMap.get(key);

  if (vehicle) {
    vehicle.manuals.push({
      id: ref.id,
      type: ref.category,
      yearStart: ref.yearStart,
      yearEnd: ref.yearEnd,
      source: ref.source,
      url: ref.source_url || null,
      attribution: ref.notes || null,
    });
  }
});

// Step 5: Convert map to sorted array
const vehicles = Array.from(vehicleMap.values())
  .sort((a, b) => a.make.localeCompare(b.make) || a.model.localeCompare(b.model));

// Step 6: Create lookup index
const index = {
  by_slug: {},
  by_make_model: {},
  makes: [],
  models_by_make: {},
};

vehicles.forEach((v) => {
  const slug = slugify(`${v.make}-${v.model}`);
  index.by_slug[slug] = `${v.make}|${v.model}`;

  if (!index.by_make_model[v.make]) {
    index.by_make_model[v.make] = {};
    index.models_by_make[v.make] = [];
  }
  index.by_make_model[v.make][v.model] = `${v.make}|${v.model}`;
  if (!index.models_by_make[v.make].includes(v.model)) {
    index.models_by_make[v.make].push(v.model);
  }

  if (!index.makes.includes(v.make)) {
    index.makes.push(v.make);
  }
});

index.makes.sort();
Object.keys(index.models_by_make).forEach((make) => {
  index.models_by_make[make].sort();
});

// Step 7: Write output files
const vehiclesPath = path.join(projectRoot, "src/data/vehicles/vehicles.json");
const indexPath = path.join(projectRoot, "src/data/vehicles/vehicle-index.json");

fs.writeFileSync(vehiclesPath, JSON.stringify({ vehicles }, null, 2));
fs.writeFileSync(indexPath, JSON.stringify(index, null, 2));

// Step 8: Generate coverage report
console.log("\n📊 COVERAGE REPORT\n");

const totalVehicles = vehicles.length;
const vehiclesWithSpecs = vehicles.filter((v) => {
  return v.generations.some((g) => g.specs.oil.type || g.specs.tire.size);
}).length;
const vehiclesWithFailures = vehicles.filter((v) => {
  return v.generations.some((g) => g.commonFailures && g.commonFailures.length > 0);
}).length;
const vehiclesWithDtc = vehicles.filter((v) => {
  return Object.keys(v.dtcMappings).length > 0;
}).length;
const vehiclesWithManuals = vehicles.filter((v) => v.manuals.length > 0).length;

const totalGenerations = vehicles.reduce((sum, v) => sum + v.generations.length, 0);
const totalFailures = vehicles.reduce((sum, v) => {
  return sum + v.generations.reduce((gsum, g) => gsum + (g.commonFailures?.length || 0), 0);
}, 0);

console.log(`Total vehicles:               ${totalVehicles}`);
console.log(`  ├─ With specs:             ${vehiclesWithSpecs} (${pct(vehiclesWithSpecs, totalVehicles)}%)`);
console.log(`  ├─ With common failures:   ${vehiclesWithFailures} (${pct(vehiclesWithFailures, totalVehicles)}%)`);
console.log(`  ├─ With DTC mappings:      ${vehiclesWithDtc} (${pct(vehiclesWithDtc, totalVehicles)}%)`);
console.log(`  └─ With manual refs:       ${vehiclesWithManuals} (${pct(vehiclesWithManuals, totalVehicles)}%)`);

console.log(`\nTotal generations:           ${totalGenerations}`);
console.log(`Total common failures:       ${totalFailures}`);

console.log(`\n✅ Output files created:`);
console.log(`  ├─ ${vehiclesPath}`);
console.log(`  └─ ${indexPath}`);

console.log(`\n💾 File sizes:`);
console.log(`  ├─ vehicles.json: ${(fs.statSync(vehiclesPath).size / 1024).toFixed(1)} KB`);
console.log(`  └─ vehicle-index.json: ${(fs.statSync(indexPath).size / 1024).toFixed(1)} KB`);

console.log("\n✨ Generation complete!");

// Helper functions
function slugify(str) {
  return str
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
}

function parseCommonFailures(str) {
  if (!str) return [];
  return str.split(",").map((failure) => ({
    name: failure.trim(),
    description: null,
    severity: "unknown",
    cost: null,
  }));
}

function pct(num, total) {
  return ((num / total) * 100).toFixed(0);
}
