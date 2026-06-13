/**
 * Test vehicle lookups after fix
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

const vehicles = vehicles_data.vehicles;
const index = index_data;

function getVehicleBySlug(slug) {
  const vehicleIdx = index.by_slug[slug];
  if (vehicleIdx === undefined) {
    return null;
  }
  return vehicles[vehicleIdx];
}

function getVehicleSpecs(vehicle, generation) {
  if (generation && generation.specs) {
    return {
      oil: generation.specs.oil,
      transmission: generation.specs.transmission,
      coolant: generation.specs.coolant,
      tire: generation.specs.tire,
      battery: generation.specs.battery,
    };
  }
  return null;
}

console.log('TESTING VEHICLE LOOKUPS AFTER FIX\n');
console.log('='.repeat(60));

// Test 1: Nissan Altima 2002
console.log('\n1. Nissan Altima (2002)');
const altima = getVehicleBySlug('nissan-altima');
if (altima) {
  console.log(`   ✓ Found: ${altima.make} ${altima.model}`);
  console.log(`   Data status: ${altima.data_status}`);
  console.log(`   Generations: ${altima.generations.length}`);

  const gen2002 = altima.generations.find(g => g.yearStart <= 2002 && g.yearEnd >= 2002);
  if (gen2002) {
    console.log(`   ✓ 2002 Generation: ${gen2002.yearStart}-${gen2002.yearEnd} (${gen2002.name})`);
    const specs = getVehicleSpecs(altima, gen2002);
    if (specs && specs.oil && specs.oil.type) {
      console.log(`   ✓ OIL SPECS LOADED: ${specs.oil.type}, ${specs.oil.capacity}`);
    } else {
      console.log(`   ✗ NO OIL SPECS`);
    }
  } else {
    console.log(`   ✗ No generation for 2002`);
  }
} else {
  console.log(`   ✗ Vehicle not found`);
}

// Test 2: Nissan Altima 2007
console.log('\n2. Nissan Altima (2007)');
if (altima) {
  const gen2007 = altima.generations.find(g => g.yearStart <= 2007 && g.yearEnd >= 2007);
  if (gen2007) {
    console.log(`   ✓ 2007 Generation: ${gen2007.yearStart}-${gen2007.yearEnd} (${gen2007.name})`);
    const specs = getVehicleSpecs(altima, gen2007);
    if (specs && specs.transmission && specs.transmission.fluid) {
      console.log(`   ✓ TRANSMISSION SPECS LOADED: ${specs.transmission.fluid}`);
    } else {
      console.log(`   ✗ NO TRANSMISSION SPECS`);
    }
  }
}

// Test 3: Nissan Sentra 2013
console.log('\n3. Nissan Sentra (2013)');
const sentra = getVehicleBySlug('nissan-sentra');
if (sentra) {
  console.log(`   ✓ Found: ${sentra.make} ${sentra.model}`);
  console.log(`   Data status: ${sentra.data_status}`);

  const gen2013 = sentra.generations.find(g => g.yearStart <= 2013 && g.yearEnd >= 2013);
  if (gen2013) {
    console.log(`   ✓ 2013 Generation: ${gen2013.yearStart}-${gen2013.yearEnd} (${gen2013.name})`);
    const specs = getVehicleSpecs(sentra, gen2013);
    if (specs && specs.battery && specs.battery.group) {
      console.log(`   ✓ BATTERY SPECS LOADED: ${specs.battery.group}`);
    } else {
      console.log(`   ✗ NO BATTERY SPECS`);
    }
  }
} else {
  console.log(`   ✗ Vehicle not found`);
}

// Test 4: Acura ADX (skeleton)
console.log('\n4. Acura ADX (2025) - Skeleton Only');
const adx = getVehicleBySlug('acura-adx');
if (adx) {
  console.log(`   ✓ Found: ${adx.make} ${adx.model}`);
  console.log(`   Data status: ${adx.data_status}`);
  console.log(`   Generations: ${adx.generations.length}`);

  const specs = getVehicleSpecs(adx, adx.generations[0]);
  if (!specs || !specs.oil || !specs.oil.type) {
    console.log(`   ✓ Correctly has NO specs (skeleton vehicle)`);
  } else {
    console.log(`   ✗ Should NOT have specs`);
  }
} else {
  console.log(`   ✗ Vehicle not found`);
}

console.log('\n' + '='.repeat(60));
console.log('TEST COMPLETE\n');
