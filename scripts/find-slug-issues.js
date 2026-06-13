/**
 * Find slug index issues - read-only diagnostic script
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const vehicles_file = path.join(__dirname, '..', 'src', 'data', 'vehicles', 'vehicles.json');
const index_file = path.join(__dirname, '..', 'src', 'data', 'vehicles', 'vehicle-index.json');

const vehicles_data = JSON.parse(fs.readFileSync(vehicles_file, 'utf-8'));
const index_data = JSON.parse(fs.readFileSync(index_file, 'utf-8'));

const vehicles = vehicles_data.vehicles || [];
const index = index_data;

console.log('SLUG INDEX DIAGNOSTIC\n');
console.log('='.repeat(60));

// 1. Find vehicles missing from index
console.log('\n1. VEHICLES MISSING FROM INDEX');
console.log('-'.repeat(60));

const indexed_slugs = new Set(Object.keys(index.by_slug));
const missing = [];

vehicles.forEach((v, idx) => {
  if (!indexed_slugs.has(v.slug)) {
    missing.push({ idx, make: v.make, model: v.model, slug: v.slug });
  }
});

if (missing.length === 0) {
  console.log('None - all vehicles indexed');
} else {
  console.log(`Found ${missing.length} vehicles missing from index:`);
  missing.forEach(item => {
    console.log(`  [${item.idx}] ${item.make} ${item.model} (slug: ${item.slug})`);
  });
}

// 2. Find duplicate slugs
console.log('\n2. DUPLICATE SLUGS');
console.log('-'.repeat(60));

const slug_map = {};
vehicles.forEach((v, idx) => {
  if (!slug_map[v.slug]) {
    slug_map[v.slug] = [];
  }
  slug_map[v.slug].push(idx);
});

const duplicates = Object.entries(slug_map).filter(([slug, indices]) => indices.length > 1);

if (duplicates.length === 0) {
  console.log('None - all slugs unique');
} else {
  console.log(`Found ${duplicates.length} duplicate slugs:`);
  duplicates.forEach(([slug, indices]) => {
    console.log(`  ${slug}: ${indices.length} vehicles`);
    indices.forEach(idx => {
      console.log(`    [${idx}] ${vehicles[idx].make} ${vehicles[idx].model}`);
    });
  });
}

// 3. Count comparison
console.log('\n3. INDEX COUNT COMPARISON');
console.log('-'.repeat(60));

const by_slug_count = Object.keys(index.by_slug).length;
const by_make_model_count = Object.keys(index.by_make_model).length;
const vehicle_count = vehicles.length;

console.log(`Total vehicles in array: ${vehicle_count}`);
console.log(`Index by_slug entries: ${by_slug_count}`);
console.log(`Index by_make_model entries: ${by_make_model_count}`);

if (by_slug_count === vehicle_count && by_make_model_count === vehicle_count) {
  console.log('\n✓ Index is consistent');
} else {
  console.log('\n✗ Index mismatch detected');
  console.log(`  Difference (vehicles - by_slug): ${vehicle_count - by_slug_count}`);
  console.log(`  Difference (vehicles - by_make_model): ${vehicle_count - by_make_model_count}`);
}

console.log('\n' + '='.repeat(60));
