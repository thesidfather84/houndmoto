# Phase 1 Testing Checklist

## Pre-Testing Setup

- [ ] You are on branch: `phase-1-hybrid-data-migration`
  ```bash
  git branch
  # Should show: * phase-1-hybrid-data-migration
  ```

- [ ] Build passes without errors
  ```bash
  npm run build
  # Should complete with ✓ in ~400ms
  ```

- [ ] Dev server runs
  ```bash
  npm run dev
  # Should start on http://localhost:5173
  ```

---

## Test 1: Vehicle WITH Specs (New Data)

**URL:** http://localhost:5173/vehicle/2002-nissan-altima

**Expected Results:**
- [ ] Page loads without errors
- [ ] Title shows "2002 Nissan Altima"
- [ ] Fluid Capacities section shows:
  - [ ] Engine Oil: "5W-30"
  - [ ] Oil Type: "5W-30"
  - [ ] Transmission Fluid: "Nissan Matic-S"
  - [ ] Trans. Capacity: "About 7.6 quarts full fill"
- [ ] Battery shows: "Group 35 commonly used"
- [ ] Wipers show: "22 inch driver / 19 inch passenger"
- [ ] Data quality badge shows: "✅ Phase 1 Data"
- [ ] Common Problems section shows failures (if present)
- [ ] No console errors

**Troubleshooting:**
- If specs don't show: Check `vehicleDataLoader.js` import
- If page crashes: Check browser console for errors
- If badge wrong color: Check CSS in `styles.css`

---

## Test 2: Vehicle WITHOUT Specs (Graceful Fallback)

**URL:** http://localhost:5173/vehicle/2015-ford-focus

**Expected Results:**
- [ ] Page loads without errors
- [ ] Title shows "2015 Ford Focus"
- [ ] Fluid Capacities section shows:
  - [ ] Engine Oil: "Data not available"
  - [ ] Transmission: "Data not available"
  - [ ] All fields show "Data not available" or similar
- [ ] Common Problems section shows:
  - [ ] "Common failure data for the 2015 Ford Focus is being added."
  - [ ] Link to search
- [ ] DTC section shows generic codes as fallback
- [ ] No errors or crashes
- [ ] Page still looks good

**Troubleshooting:**
- If page crashes: Check error handling in `vehicleDataLoader.js`
- If no fallback text: Check conditional rendering in `VehiclePage.jsx`

---

## Test 3: Data Quality Badge

**Multiple URLs:**
- http://localhost:5173/vehicle/2002-nissan-altima (Should show "Phase 1 Data")
- http://localhost:5173/vehicle/2015-ford-focus (Should show "Data not available")

**Expected Results:**
- [ ] "Phase 1 Data" badge appears for vehicles with new data
- [ ] Badge is green background with checkmark
- [ ] Confidence level badge shows ("estimated" or "verified")
- [ ] Warning appears if specs incomplete
- [ ] Styling matches mockup in `styles.css`

---

## Test 4: Hybrid Fallback Logic

**Test that fallback works:**
1. [ ] Check VehiclePage.jsx imports from `vehicleDataLoader.js`
2. [ ] Verify both new JSON and old JS files still exist:
   ```bash
   ls -la src/data/vehicles/vehicles.json
   ls -la src/vehicleDirectory.js
   ls -la src/vehicleCoverageData.js
   ```
   All should exist.

3. [ ] Fallback happens for vehicles with no JSON data
   - Vehicle with data (JSON): displays specs
   - Vehicle without data: shows "Data not available" (not errors)

---

## Test 5: No Breaking Changes

**Verify old functionality still works:**

- [ ] Homepage search still works
  - [ ] Type "Honda Civic" → suggestions appear
  - [ ] Click result → navigates to vehicle page

- [ ] DTC page still works
  - [ ] Visit http://localhost:5173/dtc/p0300
  - [ ] Shows DTC info
  - [ ] No errors

- [ ] OBD2 page still accessible
  - [ ] Visit http://localhost:5173/obd2
  - [ ] Page loads

- [ ] VIN recall page works
  - [ ] Visit http://localhost:5173/vin-recall-check
  - [ ] Can enter VIN
  - [ ] Recalls load

---

## Test 6: Build Verification

```bash
npm run build
```

**Expected Results:**
- [ ] Build completes successfully
- [ ] Output shows: "✓ built in XXXms"
- [ ] dist/ folder created with assets
- [ ] No error messages
- [ ] No critical warnings (chunk size warning is OK)

---

## Test 7: Console Check

**Open browser DevTools (F12):**

- [ ] No red errors in Console tab
- [ ] No warnings about missing imports
- [ ] Warnings about chunk size are OK (not an error)
- [ ] Network tab shows:
  - [ ] vehicles.json loads successfully
  - [ ] vehicle-index.json loads
  - [ ] CSS loads
  - [ ] JS bundles load

---

## Test 8: Mobile Responsiveness

**Test on mobile view (DevTools F12 → device toolbar):**

- [ ] iPhone 12 view:
  - [ ] Page loads
  - [ ] Specs display properly
  - [ ] No overflow/clipping
  - [ ] Tap/click works

- [ ] Android view:
  - [ ] Same checks as iPhone

---

## Test 9: Coverage Report Stats

**Check coverage statistics:**

```javascript
// In browser console:
import { getCoverageStats } from './src/utils/vehicleDataLoader.js'
const stats = getCoverageStats()
console.log(stats)
```

**Expected Output:**
```javascript
{
  total: 830,
  withSpecs: 17,
  withFailures: 17,
  withDTC: 6,
  coverage: { specs: 2, failures: 2, dtc: 1 }
}
```

- [ ] Matches expected numbers
- [ ] No errors in calculation
- [ ] Data quality tracked correctly

---

## Test 10: Data Loader Functions

**Test individual functions in console:**

```javascript
// Test 1: Load by slug
const vehicle = getVehicleBySlug('nissan-altima')
console.log(vehicle)
// Should return vehicle object with generations array

// Test 2: Load by make/model/year
const result = getVehicleByMakeModelYear('Nissan', 'Altima', 2005)
console.log(result)
// Should return { vehicle, generation }

// Test 3: Get specs
const specs = getVehicleSpecs(vehicle, vehicle.generations[0])
console.log(specs)
// Should return { oil, transmission, tire, battery, ... }
```

- [ ] All functions work
- [ ] Return correct data types
- [ ] No errors or undefined values

---

## Test 11: Edge Cases

**Test unusual scenarios:**

1. [ ] Non-existent vehicle
   - URL: http://localhost:5173/vehicle/9999-fake-brand
   - Should show "Vehicle Not Found" message

2. [ ] Invalid slug format
   - URL: http://localhost:5173/vehicle/invalid-format
   - Should show "Could not parse a vehicle" message

3. [ ] Empty search
   - Click search without typing
   - Should not crash

---

## Test 12: Performance Check

**Check speed metrics:**

- [ ] Page loads in < 2 seconds
- [ ] Vehicle.json loads in < 500ms
- [ ] Vehicle page interactive within 1 second
- [ ] No jank or lag when scrolling
- [ ] No memory leaks (DevTools → Memory → Take snapshot)

---

## Rollback Procedure (If Needed)

**If any test fails critically:**

```bash
# Go back to main branch
git checkout main

# Pull latest main
git pull origin main

# Verify rollback
npm run dev
# Should work as before
```

---

## Test Results Summary

After completing all tests above, fill in:

**Date Tested:** ____________  
**Tester:** ___________________

| Test | Result | Notes |
|------|--------|-------|
| Test 1: Vehicle with specs | ✅/❌ | |
| Test 2: Vehicle without specs | ✅/❌ | |
| Test 3: Data quality badge | ✅/❌ | |
| Test 4: Hybrid fallback | ✅/❌ | |
| Test 5: No breaking changes | ✅/❌ | |
| Test 6: Build verification | ✅/❌ | |
| Test 7: Console check | ✅/❌ | |
| Test 8: Mobile responsive | ✅/❌ | |
| Test 9: Coverage stats | ✅/❌ | |
| Test 10: Data loader functions | ✅/❌ | |
| Test 11: Edge cases | ✅/❌ | |
| Test 12: Performance | ✅/❌ | |

**Overall Status:** ✅ PASS / ❌ FAIL

---

## Next Steps After Testing

**If all tests pass (✅):**
1. [ ] Commit changes to phase-1-hybrid-data-migration branch
2. [ ] Create PR from phase-1-hybrid-data-migration → main
3. [ ] Code review
4. [ ] Merge to main
5. [ ] Deploy to production
6. [ ] Start Phase 2: Expand vehicle coverage

**If any test fails (❌):**
1. [ ] Document which test failed
2. [ ] Check error in browser console
3. [ ] Review code in failing component
4. [ ] Fix issue
5. [ ] Re-test
6. [ ] Repeat until all pass

---

## Quick Links

- **Phase 1 Details:** PHASE_1_COMPLETE.md
- **VehiclePage changes:** src/pages/VehiclePage.jsx
- **Data loader:** src/utils/vehicleDataLoader.js
- **Generated data:** src/data/vehicles/vehicles.json
- **CSS styles:** styles.css (end of file)
- **Coverage report:** src/components/CoverageReport.jsx

---

**Ready to test Phase 1? Start with "Test 1" above!**
