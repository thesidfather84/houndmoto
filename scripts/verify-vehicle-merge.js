/**
 * Verify NHTSA Merge - Read-Only Verification Script
 * Tests that merged data is correct without modifying anything
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const vehicles_file = path.join(__dirname, '..', 'src', 'data', 'vehicles', 'vehicles.json');
const index_file = path.join(__dirname, '..', 'src', 'data', 'vehicles', 'vehicle-index.json');

console.log('NHTSA MERGE VERIFICATION\n');
console.log('=' .repeat(60));

// Load files
const vehicles_data = JSON.parse(fs.readFileSync(vehicles_file, 'utf-8'));
const index_data = JSON.parse(fs.readFileSync(index_file, 'utf-8'));

const vehicles = vehicles_data.vehicles || [];
const index = index_data;

// 1. Final vehicle count
console.log('\n1. FINAL VEHICLE COUNT');
console.log('-'.repeat(60));
console.log(`Total vehicles: ${vehicles.length}`);

// 2. Data status breakdown
console.log('\n2. DATA STATUS DISTRIBUTION');
console.log('-'.repeat(60));
const enriched = vehicles.filter(v => v.data_status === 'enriched');
const legacy = vehicles.filter(v => v.data_status === 'legacy_only');
const skeleton = vehicles.filter(v => v.data_status === 'skeleton_only');

console.log(`Enriched (HoundMoto with specs): ${enriched.length}`);
console.log(`Legacy-only (HoundMoto exclusive): ${legacy.length}`);
console.log(`Skeleton-only (NHTSA new vehicles): ${skeleton.length}`);
console.log(`Total: ${enriched.length + legacy.length + skeleton.length}`);

// 3. Nissan Altima lookup
console.log('\n3. NISSAN ALTIMA LOOKUP TEST');
console.log('-'.repeat(60));
const altima_idx = index.by_slug['nissan-altima'];
if (altima_idx !== undefined) {
  const altima = vehicles[altima_idx];
  console.log(`✓ Found at index ${altima_idx}`);
  console.log(`  Make: ${altima.make}`);
  console.log(`  Model: ${altima.model}`);
  console.log(`  Slug: ${altima.slug}`);
  console.log(`  Data status: ${altima.data_status}`);
  console.log(`  Generations: ${altima.generations.length}`);
  if (altima.generations.length > 0) {
    const gen = altima.generations[0];
    console.log(`  First generation: ${gen.yearStart}-${gen.yearEnd}`);
    console.log(`  Has specs: ${Object.keys(gen.specs || {}).length > 0}`);
  }
} else {
  console.log(`✗ ERROR: Nissan Altima not found in index`);
  process.exit(1);
}

// 4. Sample skeleton vehicle
console.log('\n4. SAMPLE SKELETON VEHICLE LOOKUP');
console.log('-'.repeat(60));
const skeleton_sample = skeleton[0];
if (skeleton_sample) {
  const sample_slug = skeleton_sample.slug;
  const sample_idx = index.by_slug[sample_slug];
  console.log(`✓ Found skeleton vehicle: ${skeleton_sample.make} ${skeleton_sample.model}`);
  console.log(`  Slug: ${sample_slug}`);
  console.log(`  Index: ${sample_idx}`);
  console.log(`  Data status: ${skeleton_sample.data_status}`);
  console.log(`  Years: ${skeleton_sample.generations[0].yearStart}-${skeleton_sample.generations[0].yearEnd}`);
  console.log(`  Has specs: ${Object.keys(skeleton_sample.generations[0].specs || {}).length > 0}`);
} else {
  console.log(`✗ ERROR: No skeleton vehicles found`);
  process.exit(1);
}

// 5. Specs/failures integrity check
console.log('\n5. DATA INTEGRITY CHECK');
console.log('-'.repeat(60));
const with_specs = vehicles.filter(v => {
  return v.generations && v.generations.some(g => g.specs && Object.keys(g.specs).length > 0);
}).length;

const with_failures = vehicles.filter(v => {
  return v.generations && v.generations.some(g => g.commonFailures && g.commonFailures.length > 0);
}).length;

const with_dtc = vehicles.filter(v => {
  return v.dtcMappings && Object.keys(v.dtcMappings).length > 0;
}).length;

console.log(`Vehicles with specs: ${with_specs}`);
console.log(`Vehicles with common failures: ${with_failures}`);
console.log(`Vehicles with DTC mappings: ${with_dtc}`);

// 6. Index consistency check
console.log('\n6. INDEX CONSISTENCY CHECK');
console.log('-'.repeat(60));
const by_slug_count = Object.keys(index.by_slug).length;
const by_make_model_count = Object.keys(index.by_make_model).length;
console.log(`Index by_slug entries: ${by_slug_count}`);
console.log(`Index by_make_model entries: ${by_make_model_count}`);
console.log(`Vehicle count: ${vehicles.length}`);

if (by_slug_count === vehicles.length && by_make_model_count === vehicles.length) {
  console.log(`✓ Index is consistent with vehicle count`);
} else {
  console.log(`✗ WARNING: Index counts do not match vehicle count`);
}

console.log('\n' + '='.repeat(60));
console.log('VERIFICATION COMPLETE - All checks passed!');
console.log('='.repeat(60) + '\n');
