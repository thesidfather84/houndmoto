/**
 * NHTSA Data Merge Script
 *
 * Safe merge of NHTSA database with HoundMoto enriched data:
 * - HoundMoto enriched data always wins (not overwritten)
 * - NHTSA adds missing make/models as skeleton records
 * - All records get slugs and data_status fields
 * - HoundMoto-only vehicles preserved as legacy_only
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Paths
const nhtsa_file = path.join(__dirname, '..', 'vehicle_database.json');
const current_file = path.join(__dirname, '..', 'src', 'data', 'vehicles', 'vehicles.json');
const output_file = path.join(__dirname, '..', 'src', 'data', 'vehicles', 'vehicles.json');
const index_file = path.join(__dirname, '..', 'src', 'data', 'vehicles', 'vehicle-index.json');

console.log('Starting NHTSA merge...\n');

// Load data
console.log('Loading NHTSA database...');
const nhtsa_raw = JSON.parse(fs.readFileSync(nhtsa_file, 'utf-8'));

console.log('Loading HoundMoto enriched data...');
const current_data = JSON.parse(fs.readFileSync(current_file, 'utf-8'));
const current_vehicles = current_data.vehicles || [];

// Helper: Normalize make/model for comparison
function normalizeKey(make, model) {
  return `${make.toLowerCase().trim()}|${model.toLowerCase().trim()}`;
}

// Helper: Generate slug from make/model
function generateSlug(make, model) {
  return `${make.toLowerCase().trim()}-${model.toLowerCase().trim().replace(/\s+/g, '-')}`;
}

// Build map of current vehicles by normalized key
const currentByKey = {};
const currentMakeModels = new Set();
current_vehicles.forEach(v => {
  const key = normalizeKey(v.make, v.model);
  currentByKey[key] = v;
  currentMakeModels.add(key);
});

console.log(`Found ${current_vehicles.length} HoundMoto vehicles\n`);

// Group NHTSA data by make/model
const nhtsa_by_make_model = {};
const nhtsa_years = {};

nhtsa_raw.forEach(record => {
  const make = record.make.trim();
  const model = record.model.trim();
  const year = parseInt(record.year);

  const key = normalizeKey(make, model);

  if (!nhtsa_by_make_model[key]) {
    nhtsa_by_make_model[key] = { make, model, years: new Set() };
  }
  nhtsa_by_make_model[key].years.add(year);
});

console.log(`Found ${Object.keys(nhtsa_by_make_model).length} unique make/models in NHTSA\n`);

// Categorize vehicles
const overlapping = [];
const houndmoto_only = [];
const nhtsa_only = [];

Object.values(nhtsa_by_make_model).forEach(nhtsa_vehicle => {
  const key = normalizeKey(nhtsa_vehicle.make, nhtsa_vehicle.model);
  if (currentMakeModels.has(key)) {
    overlapping.push(key);
  } else {
    nhtsa_only.push({ ...nhtsa_vehicle, key });
  }
});

currentMakeModels.forEach(key => {
  const found = Object.values(nhtsa_by_make_model).some(v => normalizeKey(v.make, v.model) === key);
  if (!found) {
    houndmoto_only.push(key);
  }
});

console.log(`Categorization:`);
console.log(`  Overlapping (both): ${overlapping.length}`);
console.log(`  HoundMoto-only: ${houndmoto_only.length}`);
console.log(`  NHTSA-only: ${nhtsa_only.length}`);
console.log(`  TOTAL: ${overlapping.length + houndmoto_only.length + nhtsa_only.length}\n`);

// Build merged vehicle list
const merged_vehicles = [];
let enriched_count = 0;
let skeleton_count = 0;
let legacy_count = 0;

// 1. Keep all HoundMoto vehicles (both overlapping and HoundMoto-only)
// Deduplicate by normalized key (same make/model = same vehicle)
console.log('Processing HoundMoto vehicles...');
const seenKeys = new Set();
let duplicates_removed = 0;

current_vehicles.forEach(v => {
  const key = normalizeKey(v.make, v.model);

  // Skip if we've already added this normalized make/model
  if (seenKeys.has(key)) {
    duplicates_removed++;
    return;
  }
  seenKeys.add(key);

  // Ensure slug exists
  if (!v.slug) {
    v.slug = generateSlug(v.make, v.model);
  }

  // Mark data status
  if (overlapping.includes(key)) {
    v.data_status = 'enriched';
    enriched_count++;
  } else {
    v.data_status = 'legacy_only';
    legacy_count++;
  }

  merged_vehicles.push(v);
});

if (duplicates_removed > 0) {
  console.log(`  Removed ${duplicates_removed} duplicate entries (same make/model)`);
}

console.log(`  ${enriched_count} enriched (overlapping with NHTSA)`);
console.log(`  ${legacy_count} legacy_only (HoundMoto exclusive)\n`);

// 2. Add NHTSA-only vehicles as skeleton records
console.log('Adding NHTSA vehicles...');
nhtsa_only.forEach(nhtsa_vehicle => {
  const slug = generateSlug(nhtsa_vehicle.make, nhtsa_vehicle.model);
  const years = Array.from(nhtsa_vehicle.years).sort((a, b) => a - b);

  // Create skeleton vehicle record
  const skeleton_vehicle = {
    make: nhtsa_vehicle.make,
    model: nhtsa_vehicle.model,
    slug: slug,
    type: 'unknown', // NHTSA doesn't provide this
    data_status: 'skeleton_only',
    aliases: [],
    generations: [
      {
        id: `${slug}-${years[0]}-${years[years.length - 1]}`,
        name: `${nhtsa_vehicle.make} ${nhtsa_vehicle.model}`,
        yearStart: years[0],
        yearEnd: years[years.length - 1],
        engine: null,
        specs: {},
        commonFailures: [],
        dtcNotes: null,
        maintenanceNotes: null,
        confidence: 'estimated'
      }
    ],
    dtcMappings: {},
    manuals: []
  };

  merged_vehicles.push(skeleton_vehicle);
  skeleton_count++;
});

console.log(`  ${skeleton_count} skeleton_only (NHTSA only, no specs yet)\n`);

// Sort by make, then model
merged_vehicles.sort((a, b) => {
  const makeCompare = a.make.localeCompare(b.make);
  if (makeCompare !== 0) return makeCompare;
  return a.model.localeCompare(b.model);
});

// Create vehicle index
console.log('Building vehicle index...');
const index = {
  by_slug: {},
  by_make_model: {},
  makes: new Set(),
  models_by_make: {}
};

merged_vehicles.forEach((vehicle, idx) => {
  const slug = vehicle.slug || generateSlug(vehicle.make, vehicle.model);
  const make_lower = vehicle.make.toLowerCase();
  const model_lower = vehicle.model.toLowerCase();

  // by_slug: slug -> index
  index.by_slug[slug] = idx;

  // by_make_model: make/model -> index
  index.by_make_model[`${make_lower}/${model_lower}`] = idx;

  // makes: set of all makes
  index.makes.add(vehicle.make);

  // models_by_make: make -> array of models
  if (!index.models_by_make[make_lower]) {
    index.models_by_make[make_lower] = [];
  }
  index.models_by_make[make_lower].push(vehicle.model);
});

// Convert sets to arrays for JSON
const index_output = {
  by_slug: index.by_slug,
  by_make_model: index.by_make_model,
  makes: Array.from(index.makes).sort(),
  models_by_make: {}
};

// Sort models within each make
for (const make in index.models_by_make) {
  index_output.models_by_make[make] = index.models_by_make[make].sort();
}

// Write merged vehicles.json
console.log(`\nWriting merged vehicles.json (${merged_vehicles.length} vehicles)...`);
const output_data = {
  version: '2.0',
  generated: new Date().toISOString(),
  source: 'HoundMoto enriched data + NHTSA database merge',
  vehicles: merged_vehicles
};

fs.writeFileSync(output_file, JSON.stringify(output_data, null, 2), 'utf-8');
console.log(`  ✓ ${output_file}`);

// Write vehicle-index.json
console.log(`Writing vehicle-index.json...`);
fs.writeFileSync(index_file, JSON.stringify(index_output, null, 2), 'utf-8');
console.log(`  ✓ ${index_file}`);

// Summary
console.log('\n' + '='.repeat(60));
console.log('MERGE COMPLETE');
console.log('='.repeat(60));
console.log(`\nFinal Vehicle Count: ${merged_vehicles.length}`);
console.log(`  enriched (HoundMoto specs intact): ${enriched_count}`);
console.log(`  legacy_only (HoundMoto exclusive): ${legacy_count}`);
console.log(`  skeleton_only (NHTSA only): ${skeleton_count}`);

console.log(`\nData Quality:`);
console.log(`  With specs: ${current_vehicles.filter(v => v.generations && v.generations.length > 0 && v.generations[0].specs && Object.keys(v.generations[0].specs).length > 0).length}`);
console.log(`  With common failures: ${current_vehicles.filter(v => v.generations && v.generations.some(g => g.commonFailures && g.commonFailures.length > 0)).length}`);
console.log(`  With DTC mappings: ${current_vehicles.filter(v => v.dtcMappings && Object.keys(v.dtcMappings).length > 0).length}`);

console.log(`\nFiles Updated:`);
console.log(`  ✓ src/data/vehicles/vehicles.json (${(JSON.stringify(output_data).length / 1024).toFixed(1)} KB)`);
console.log(`  ✓ src/data/vehicles/vehicle-index.json`);

console.log(`\nNext Steps:`);
console.log(`  1. Run: npm run build`);
console.log(`  2. Test URLs:`);
console.log(`     - http://localhost:5173/vehicle/2002-nissan-altima (enriched)`);
console.log(`     - http://localhost:5173/vehicle/2015-ford-focus (skeleton)`);
console.log(`  3. Verify VehiclePage loads correctly`);
console.log(`  4. Check coverage stats\n`);
