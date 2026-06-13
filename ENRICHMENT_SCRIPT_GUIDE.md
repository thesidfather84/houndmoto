# HoundMoto Enrichment Script Guide

**Script:** `scripts/enrich-houndmoto-existing-db.js`

This script enriches the TOP 20 vehicles in your existing `src/data/vehicles/vehicles.json` database without replacing or restructuring it.

---

## How It Works

### Phase 1: Dry-Run (Preview)
```bash
node scripts/enrich-houndmoto-existing-db.js --dry-run
```

**Output shows:**
- Which TOP 20 vehicles were found
- How many new fields will be added per vehicle
- What the script will change (without writing)
- How to apply changes when ready

### Phase 2: Write (Apply Changes)
```bash
node scripts/enrich-houndmoto-existing-db.js --write
```

**Actions:**
1. Updates each TOP 20 vehicle in vehicles.json
2. Adds new spec fields to all generations
3. Adds common failures to first generation
4. Adds DTC codes to first generation
5. Rebuilds vehicle-index.json
6. Preserves all existing data (enriched, skeleton, legacy)

### Phase 3: Verify
```bash
npm run build
npm run dev
```

Test URLs:
- `/vehicle/2018-ford-f-150` (updated with new specs)
- `/vehicle/2015-honda-civic` (updated with new failures)
- `/vehicle/2018-toyota-camry` (updated with new DTC codes)

---

## Adding Enrichment Data

The script uses a template for enrichment data. Currently it has examples for 3 vehicles:

**Location:** `scripts/enrich-houndmoto-existing-db.js` (lines ~100-130)

```javascript
const enrichmentData = {
  'Ford|F-150': {
    additionalSpecs: {
      fuelTank: { capacity: '23-36 gallons', note: 'Varies by generation' },
      refrigerant: { type: 'R-134a or R-1234yf', capacity: '1.5-2.5 lbs' },
    },
    additionalFailures: [
      { name: 'Door latch failures', severity: 'moderate', cost: '$200-400' },
      { name: 'Spark plug blowout (2.7L EcoBoost)', severity: 'critical', cost: '$300-800' },
    ],
    additionalDTC: ['P0016 Cam/Crank Correlation', 'P0401 EGR Flow'],
  },
  // ... more vehicles
};
```

### To Add Enrichment for More Vehicles

**Step 1: Identify the vehicle key**
```javascript
// Key format: 'Make|Model' (pipe-separated)
'Honda|Accord'      // ✓ Correct
'toyota-camry'      // ✗ Wrong format
```

**Step 2: Add enrichment object**
```javascript
'Honda|Accord': {
  additionalSpecs: {
    // Add new spec fields (not in current vehicles.json)
    fuelTank: { capacity: '15.8-17 gallons', note: 'Varies by generation' },
    refrigerant: { type: 'R-134a', capacity: '1.6 lbs' },
    powerSteering: { fluid: 'Honda PS Fluid', capacity: '1.2 quarts' },
  },
  additionalFailures: [
    { name: 'Door lock actuator failure', severity: 'low', cost: '$150-300' },
    { name: 'VTEC solenoid issues', severity: 'moderate', cost: '$200-500' },
    { name: 'Drive belt cracking', severity: 'moderate', cost: '$300-600' },
  ],
  additionalDTC: [
    'P0011 Cam Timing Over Advanced',
    'P0014 Cam Timing Over Retarded',
    'P0507 Idle Air Control System',
  ],
},
```

### Data Source Recommendations

**Specs:**
- Owner's manuals (most accurate)
- NADA Guides API (if available)
- Edmunds.com (vehicle profiles)
- Repair shop databases

**Common Failures:**
- NHTSA complaint database
- YourMechanic.com repair statistics
- Mechanic forums (Reddit, E38Forum, etc.)
- Lemon law databases

**DTC Codes:**
- NHTSA DTC database
- Vehicle manufacturer documentation
- Automotive service bulletins
- OBD2 scanner manufacturer specs

---

## Safety Features

### ✅ What's Protected
1. **Existing data:** All enriched, skeleton, legacy records stay intact
2. **Dry-run mode:** Preview changes before writing
3. **Index rebuild:** Automatically regenerates index after updates
4. **No deletions:** Script only adds fields, never removes

### ⚠️ Limitations
1. **Manual data only:** No external API calls (you provide the data)
2. **TOP 20 only:** Script hardcoded for top 20 vehicles (can be customized)
3. **First generation:** Failures/DTC only added to first generation (can be modified)
4. **No validation:** Script assumes enrichment data is accurate (verify before running)

---

## Example Workflow

### Scenario: Enrich Ford F-150, Honda Civic, Toyota Camry

**Step 1: Preview**
```bash
$ node scripts/enrich-houndmoto-existing-db.js --dry-run

🔍 DRY RUN MODE
...
Vehicles to enrich: 3 / 20
New data being added:
  Spec fields: 6
  Common failures: 6
  DTC codes: 6
```

**Step 2: Review**
- Check output for accuracy
- Verify vehicle names match (case-sensitive)
- Confirm number of changes is reasonable

**Step 3: Apply**
```bash
$ node scripts/enrich-houndmoto-existing-db.js --write

✍️  WRITE MODE
...
✅ ENRICHMENT COMPLETE
Updated 3 vehicles in existing database.
```

**Step 4: Verify**
```bash
$ npm run build
# Should complete in <1s with no errors

$ npm run dev
# Start dev server

# Open browser:
http://localhost:5173/vehicle/2018-ford-f-150
# Should show new fuel tank, refrigerant specs
```

---

## Adding More Vehicles

To enrich more than 3 vehicles:

1. **Add enrichment data** to `enrichmentData` object in the script
2. **Add vehicle to TOP_20_VEHICLES** array (if not already there)
3. **Run dry-run** to preview: `node scripts/enrich-houndmoto-existing-db.js --dry-run`
4. **Review output** for accuracy
5. **Apply changes:** `node scripts/enrich-houndmoto-existing-db.js --write`
6. **Build and test:** `npm run build && npm run dev`

---

## Troubleshooting

### Issue: "Vehicle not found"
```
✗ Mazda 3 — NOT FOUND
```

**Cause:** Vehicle name doesn't match exactly (case-sensitive)

**Fix:** Check vehicles.json for exact spelling:
```bash
grep -i "mazda" src/data/vehicles/vehicles.json | grep model
```

Then update script with correct name.

### Issue: "No enrichment data available"
```
⚠️  Chevrolet Silverado — No enrichment data available yet
```

**Cause:** Vehicle not in `enrichmentData` object

**Fix:** Add enrichment entry:
```javascript
'Chevrolet|Silverado': {
  additionalSpecs: { ... },
  additionalFailures: [ ... ],
  additionalDTC: [ ... ],
},
```

### Issue: Build fails after enrichment
```
npm run build
> ERROR: src/data/vehicles/vehicles.json has syntax error
```

**Cause:** JSON format error in vehicles.json

**Fix:**
1. Restore from backup if available
2. Run: `node scripts/enrich-houndmoto-existing-db.js --dry-run` (revert to dry-run)
3. Check JSON syntax in enrichment data

---

## Customizing the Script

### Enrich Different Vehicles
Edit TOP_20_VEHICLES array:
```javascript
const TOP_20_VEHICLES = [
  { make: 'Your', model: 'Vehicle', priority: 1, category: 'type' },
  // ... more vehicles
];
```

### Add to Different Generations
Current: Only adds failures/DTC to first generation

To add to all generations:
```javascript
// Current (first gen only):
if (enrichment.additionalFailures && vehicle.generations?.length > 0) {
  const firstGen = vehicle.generations[0];
  // ...
}

// Modified (all generations):
if (enrichment.additionalFailures && vehicle.generations) {
  vehicle.generations.forEach((gen) => {
    if (!gen.commonFailures) gen.commonFailures = [];
    enrichment.additionalFailures.forEach((failure) => {
      if (!gen.commonFailures.some(f => f.name === failure.name)) {
        gen.commonFailures.push(failure);
      }
    });
  });
}
```

### Add New Field Types
Currently adds: specs, failures, DTC

To add maintenance notes:
```javascript
'Ford|F-150': {
  additionalSpecs: { ... },
  additionalFailures: [ ... ],
  additionalDTC: [ ... ],
  additionalMaintenance: {
    // New field
    transmissionFluidChange: 'Every 100k miles (Mercon ULV)',
    sparkPlugInterval: '100k miles or as needed',
  },
},
```

Then in script, add processing:
```javascript
if (enrichment.additionalMaintenance && vehicle.generations?.length > 0) {
  const firstGen = vehicle.generations[0];
  if (!firstGen.maintenanceNotes) {
    firstGen.maintenanceNotes = '';
  }
  // Append maintenance data...
}
```

---

## Next Steps

1. **Populate enrichment data** for TOP 20 vehicles
2. **Run dry-run** to preview: `node scripts/enrich-houndmoto-existing-db.js --dry-run`
3. **Review and validate** the changes
4. **Apply when ready:** `node scripts/enrich-houndmoto-existing-db.js --write`
5. **Run build and test:** `npm run build && npm run dev`
6. **Verify on website** that specs/failures/DTC display correctly
7. **Repeat** for additional vehicles as data becomes available

---

## Script Behavior

| Action | Dry-Run | Write |
|--------|---------|-------|
| Read vehicles.json | ✅ | ✅ |
| Preview changes | ✅ | ✅ |
| Modify vehicles | ❌ | ✅ |
| Write vehicles.json | ❌ | ✅ |
| Rebuild index | ❌ | ✅ |
| Delete existing data | ❌ | ❌ |
| Change schema | ❌ | ❌ |

---

**Status:** Ready to use. Add enrichment data, run --dry-run first, then --write when approved.
