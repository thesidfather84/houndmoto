# HoundMoto Database Redesign
## Unified Vehicle Data Structure

**Purpose:** Design a scalable, normalized schema BEFORE adding hundreds of vehicles  
**Current Problem:** Data scattered across 7+ files, duplicated, difficult to query  
**Solution:** Unified vehicle record with normalized sub-tables  

---

## PROBLEM WITH CURRENT STRUCTURE

### Current State (Fragmented)
```
vehicleDirectory.js         → recognition only (make, model, years)
vehicleCoverageData.js      → specs + failures + DTC notes (as strings)
fluidDatabase.js            → duplicate oil/transmission specs
vehicleDtcKnowledge.js      → vehicle-specific DTC mappings
manualRefsData.js           → external manual links
partsData.js                → generic parts library (not vehicle-specific)
diagnosisWizardData.js      → symptom trees (not vehicle-specific)
tipsData.js                 → user tips (not vehicle-specific)
```

### Issues
1. ❌ **No single vehicle ID** — Lookups by make/model/year string matching
2. ❌ **Duplicated data** — Oil specs in both vehicleCoverageData AND fluidDatabase
3. ❌ **No structured failures** — Stored as comma-separated string, not array
4. ❌ **No torque specs** — Nowhere to store them
5. ❌ **No repair procedures** — No schema to support them
6. ❌ **No parts references** — Can't link parts to vehicles
7. ❌ **No maintenance schedules** — Notes only, no structured data
8. ❌ **Scaling problem** — Adding hundreds of vehicles will require massive refactoring

---

## IDEAL UNIFIED STRUCTURE

### Architecture Overview

```
PostgreSQL (Backend)
├── vehicles (core table)
├── vehicle_generations (linked)
├── vehicle_specs (linked)
├── vehicle_fluids (linked)
├── vehicle_common_failures (linked)
├── vehicle_dtc_mappings (linked)
├── vehicle_maintenance (linked)
├── vehicle_torque_specs (linked)
├── vehicle_repair_procedures (linked)
├── vehicle_parts (linked)
├── vehicle_manuals (linked)

JavaScript/Vercel (Frontend)
├── vehicles.json (synced from Postgres)
├── vehicle_index.json (fast lookups)
└── Related data (DTC codes, parts library - standalone)
```

---

## SQL SCHEMA (Postgres)

### 1. VEHICLES TABLE (Core)
```sql
CREATE TABLE vehicles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Basic identification
  make VARCHAR(50) NOT NULL,
  model VARCHAR(100) NOT NULL,
  type VARCHAR(20) NOT NULL, -- car, truck, suv, van, hybrid, ev
  
  -- Search optimization
  slug VARCHAR(200) UNIQUE, -- "ford-f-150", used for URLs
  aliases TEXT[] DEFAULT '{}', -- ["f150", "f 150", "f-150"]
  
  -- Coverage tracking
  coverage_level VARCHAR(20) DEFAULT 'none', 
  -- none, partial, basic, complete
  -- none: no data
  -- partial: some specs missing
  -- basic: core specs (oil, tire, battery)
  -- complete: all specs + failures + maintenance + procedures
  
  data_sources TEXT[] DEFAULT '{}', 
  -- ["owner_manual_2023", "repairpal_2024", "user_feedback"]
  
  confidence_level VARCHAR(20) DEFAULT 'estimated', 
  -- verified, estimated, preliminary
  
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  last_verified TIMESTAMP
);

CREATE INDEX idx_vehicles_make_model ON vehicles(make, model);
CREATE INDEX idx_vehicles_slug ON vehicles(slug);
```

### 2. VEHICLE_GENERATIONS TABLE
```sql
CREATE TABLE vehicle_generations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  vehicle_id UUID NOT NULL REFERENCES vehicles(id) ON DELETE CASCADE,
  
  -- Generation definition
  generation_name VARCHAR(100), -- "B15", "Gen IV", "5th generation"
  year_start INT NOT NULL,
  year_end INT NOT NULL,
  
  -- Base engine (can have variants)
  base_engine VARCHAR(100), -- "1.8L I4", "5.3L V8"
  
  -- Engine variants (one generation can have multiple engines)
  engine_variants TEXT[] DEFAULT '{}', 
  -- ["1.6L I4", "2.0L I4", "3.6L V6"]
  
  -- Transmission types
  transmission_types TEXT[] DEFAULT '{}', 
  -- ["5-speed manual", "6-speed auto", "CVT"]
  
  -- Drivetrain options
  drivetrain_options TEXT[] DEFAULT '{}', 
  -- ["FWD", "AWD", "4WD"]
  
  notes TEXT, -- "Common issue: CVT shudder at 60k miles"
  
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_generations_vehicle_years 
  ON vehicle_generations(vehicle_id, year_start, year_end);
```

### 3. VEHICLE_SPECS TABLE
```sql
CREATE TABLE vehicle_specs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  vehicle_generation_id UUID NOT NULL REFERENCES vehicle_generations(id) ON DELETE CASCADE,
  
  -- Oils
  oil_type VARCHAR(50), -- "5W-30", "0W-20"
  oil_capacity_quarts DECIMAL(5,2),
  oil_capacity_liters DECIMAL(5,2),
  oil_change_interval_miles INT, -- 5000, 7500, 10000
  
  -- Coolant
  coolant_type VARCHAR(100), -- "Nissan Matic-D", "Dex-Cool"
  coolant_capacity_quarts DECIMAL(5,2),
  coolant_capacity_liters DECIMAL(5,2),
  
  -- Transmission
  transmission_fluid VARCHAR(100), -- "Mercon ULV", "Dexron VI"
  transmission_capacity_quarts DECIMAL(5,2),
  transmission_capacity_liters DECIMAL(5,2),
  transmission_fluid_change_interval_miles INT,
  
  -- Tire
  tire_size_front VARCHAR(20), -- "225/65R17"
  tire_size_rear VARCHAR(20), -- null if same
  tire_pressure_psi_front INT,
  tire_pressure_psi_rear INT,
  
  -- Battery
  battery_group_size VARCHAR(20), -- "H6", "51R"
  battery_cca INT, -- Cold Cranking Amps
  battery_ah INT, -- Amp-hours
  
  -- Wipers
  wiper_driver_inches DECIMAL(3,1), -- 26
  wiper_passenger_inches DECIMAL(3,1), -- 18
  wiper_rear_inches DECIMAL(3,1), -- null if no rear
  
  -- Lights / Bulbs
  headlight_bulb_type VARCHAR(50), -- "H7", "HID", "LED"
  headlight_bulb_wattage INT,
  fog_light_bulb_type VARCHAR(50),
  tail_light_bulb_type VARCHAR(50),
  
  -- Brake fluid
  brake_fluid_type VARCHAR(50), -- "DOT 3", "DOT 4"
  brake_fluid_capacity_oz INT,
  
  -- Power steering
  power_steering_fluid VARCHAR(100),
  power_steering_capacity_oz INT,
  
  -- Differential (if applicable)
  differential_fluid VARCHAR(100), -- "Mobil Delvac"
  differential_capacity_oz INT,
  
  -- Spark plugs
  spark_plug_type VARCHAR(100), -- "Iridium", "Platinum"
  spark_plug_gap VARCHAR(20), -- "0.032-0.036"
  
  -- Filters
  air_filter_part_number VARCHAR(100),
  cabin_filter_part_number VARCHAR(100),
  
  -- Confidence
  specs_verified BOOLEAN DEFAULT FALSE,
  data_source VARCHAR(200), -- "owner_manual_2023", "haynes"
  notes TEXT, -- "Verify trim level for exact capacity"
  
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_specs_generation ON vehicle_specs(vehicle_generation_id);
```

### 4. VEHICLE_COMMON_FAILURES TABLE
```sql
CREATE TABLE vehicle_common_failures (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  vehicle_generation_id UUID NOT NULL REFERENCES vehicle_generations(id) ON DELETE CASCADE,
  
  failure_name VARCHAR(200), -- "CVT transmission shudder"
  failure_description TEXT, -- What happens and why
  
  -- When it happens
  mileage_start_range INT, -- 40000
  mileage_end_range INT, -- 100000
  
  -- Impact
  severity VARCHAR(20), -- "critical", "high", "moderate", "low"
  cost_estimate_parts_low INT,
  cost_estimate_parts_high INT,
  cost_estimate_labor_hours DECIMAL(4,2),
  
  -- Diagnosis
  symptoms TEXT[], -- ["hesitation during acceleration", "shuddering feel"]
  related_dtc_codes VARCHAR(10)[] DEFAULT '{}', -- ["P0300", "P0420"]
  
  -- Solution
  solution TEXT, -- Repair procedure summary
  is_diy BOOLEAN DEFAULT TRUE, -- Can a DIYer fix this?
  part_required VARCHAR(200), -- "CVT Transmission Fluid NS-3"
  
  -- Data quality
  data_source VARCHAR(200), -- "reddit_justrolledintotheshop", "repairpal"
  frequency VARCHAR(20), -- "common", "occasional", "rare"
  verified BOOLEAN DEFAULT FALSE,
  
  notes TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_failures_generation ON vehicle_common_failures(vehicle_generation_id);
CREATE INDEX idx_failures_mileage ON vehicle_common_failures(mileage_start_range, mileage_end_range);
```

### 5. VEHICLE_DTC_MAPPINGS TABLE
```sql
CREATE TABLE vehicle_dtc_mappings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  vehicle_generation_id UUID NOT NULL REFERENCES vehicle_generations(id) ON DELETE CASCADE,
  
  -- DTC
  dtc_code VARCHAR(10) NOT NULL, -- "P0340"
  generic_title VARCHAR(200), -- From SAE J2012
  
  -- Vehicle-specific guidance
  likely_causes TEXT[], -- ranked by probability
  first_checks TEXT[], -- ordered diagnostic steps
  severity VARCHAR(20), -- "high", "moderate", "low"
  can_drive TEXT, -- "yes, but monitor", "short distances only", "stop immediately"
  
  -- Parts / solutions
  related_failures UUID[], -- Links to vehicle_common_failures
  typical_part_required VARCHAR(200), -- "Cam position sensor"
  typical_cost_parts INT,
  typical_cost_labor_hours DECIMAL(4,2),
  
  -- Data quality
  frequency VARCHAR(20), -- "very_common", "common", "occasional"
  verified BOOLEAN DEFAULT FALSE,
  data_source VARCHAR(200), -- "owner_forum", "mechanic_feedback"
  
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_dtc_mapping_code ON vehicle_dtc_mappings(dtc_code);
CREATE INDEX idx_dtc_mapping_vehicle ON vehicle_dtc_mappings(vehicle_generation_id);
```

### 6. VEHICLE_MAINTENANCE TABLE
```sql
CREATE TABLE vehicle_maintenance (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  vehicle_generation_id UUID NOT NULL REFERENCES vehicle_generations(id) ON DELETE CASCADE,
  
  -- Maintenance task
  task_name VARCHAR(200), -- "Oil change", "Transmission fluid change"
  task_description TEXT,
  
  -- When to do it
  interval_type VARCHAR(20), -- "mileage", "time", "condition"
  interval_mileage INT, -- 5000
  interval_months INT, -- 6
  
  -- Cost estimate
  cost_parts_estimated INT,
  cost_labor_hours DECIMAL(4,2),
  cost_total_estimated INT,
  
  -- Parts / fluids needed
  fluids_needed TEXT[], -- ["5W-30 oil", "filter"]
  parts_needed TEXT[], -- ["air filter", "cabin filter"]
  
  -- Procedure
  diy_difficulty VARCHAR(20), -- "easy", "moderate", "hard"
  is_recommended_diy BOOLEAN DEFAULT TRUE,
  estimated_time_hours DECIMAL(4,2),
  
  -- Data quality
  data_source VARCHAR(200), -- "owner_manual_2023"
  verified BOOLEAN DEFAULT FALSE,
  
  notes TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_maintenance_generation ON vehicle_maintenance(vehicle_generation_id);
CREATE INDEX idx_maintenance_interval ON vehicle_maintenance(interval_mileage);
```

### 7. VEHICLE_TORQUE_SPECS TABLE
```sql
CREATE TABLE vehicle_torque_specs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  vehicle_generation_id UUID NOT NULL REFERENCES vehicle_generations(id) ON DELETE CASCADE,
  
  -- Component
  component_name VARCHAR(200), -- "Oil drain plug"
  component_location VARCHAR(200), -- "Pan bottom"
  bolt_size VARCHAR(50), -- "M14", "5/8 inch"
  
  -- Torque spec
  torque_ft_lbs DECIMAL(6,2),
  torque_nm DECIMAL(6,2),
  torque_in_lbs INT, -- For small fasteners
  
  -- Sequence
  sequence_order INT, -- 1, 2, 3... for multi-bolt components
  sequence_notes TEXT, -- "Tighten in star pattern"
  
  -- Type of fastener
  fastener_type VARCHAR(50), -- "bolt", "screw", "stud"
  fastener_material VARCHAR(50), -- "steel", "stainless"
  
  -- Data quality
  verified BOOLEAN DEFAULT FALSE,
  data_source VARCHAR(200), -- "factory_manual_2023", "haynes"
  
  notes TEXT, -- "Do not over-tighten or bolt will strip"
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_torque_generation ON vehicle_torque_specs(vehicle_generation_id);
CREATE INDEX idx_torque_component ON vehicle_torque_specs(component_name);
```

### 8. VEHICLE_REPAIR_PROCEDURES TABLE
```sql
CREATE TABLE vehicle_repair_procedures (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  vehicle_generation_id UUID NOT NULL REFERENCES vehicle_generations(id) ON DELETE CASCADE,
  
  -- Procedure
  procedure_name VARCHAR(200), -- "Oil change"
  procedure_slug VARCHAR(200) UNIQUE, -- "ford-f150-oil-change-5.0l"
  
  category VARCHAR(50), -- "maintenance", "repair", "diagnostic"
  
  -- Metadata
  diy_difficulty VARCHAR(20), -- "easy", "moderate", "hard"
  estimated_time_minutes INT,
  cost_parts_estimated INT,
  cost_tools_estimated INT, -- Special tools?
  
  -- Requirements
  tools_required TEXT[], -- ["socket set", "torque wrench", "drain pan"]
  parts_required TEXT[],
  fluids_required TEXT[],
  
  safety_precautions TEXT[], -- ["Disconnect battery", "Wear safety glasses"]
  
  -- Step-by-step instructions
  steps JSON DEFAULT '[]', -- Array of step objects
  -- Each step: {order: 1, title: "...", description: "...", image_url: "...", caution: "..."}
  
  -- Before/after checks
  checks_before TEXT[], -- "Check fluid level"
  checks_after TEXT[], -- "Check fluid level"
  
  -- Torque specs (cross-reference)
  torque_specs_required UUID[], -- Links to vehicle_torque_specs
  
  -- Video / external resources
  youtube_video_url VARCHAR(500),
  related_manual_url VARCHAR(500),
  
  -- Data quality
  verified BOOLEAN DEFAULT FALSE,
  data_source VARCHAR(200), -- "owner_manual", "youtube_mechanic_name"
  
  notes TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_procedures_generation ON vehicle_repair_procedures(vehicle_generation_id);
CREATE INDEX idx_procedures_category ON vehicle_repair_procedures(category);
```

### 9. VEHICLE_PARTS TABLE
```sql
CREATE TABLE vehicle_parts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  vehicle_generation_id UUID NOT NULL REFERENCES vehicle_generations(id) ON DELETE CASCADE,
  
  -- Part identification
  part_name VARCHAR(200), -- "Spark plug"
  part_type VARCHAR(50), -- "ignition", "cooling", "suspension"
  
  -- Specifications
  oem_part_number VARCHAR(100),
  aftermarket_equivalents TEXT[], -- ["AC Delco", "Motorcraft", "Bosch"]
  
  -- Fitment
  position VARCHAR(100), -- "cylinder 1", "left front", "all cylinders"
  quantity INT DEFAULT 1, -- How many needed?
  
  -- Cost
  cost_oem_estimated INT,
  cost_aftermarket_estimated INT,
  cost_labor_hours DECIMAL(4,2),
  
  -- Lifespan
  lifespan_miles INT, -- 100000
  lifespan_months INT, -- 60
  
  -- Failure modes
  failure_symptoms TEXT[], -- ["engine hesitation", "rough idle"]
  failure_warnings TEXT[], -- ["Don't ignore this"]
  
  -- Replacement info
  is_diy BOOLEAN DEFAULT TRUE,
  diy_difficulty VARCHAR(20), -- "easy", "moderate", "hard"
  estimated_time_minutes INT,
  
  -- Data quality
  verified BOOLEAN DEFAULT FALSE,
  data_source VARCHAR(200),
  
  notes TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_parts_generation ON vehicle_parts(vehicle_generation_id);
CREATE INDEX idx_parts_type ON vehicle_parts(part_type);
```

### 10. VEHICLE_MANUALS TABLE
```sql
CREATE TABLE vehicle_manuals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  vehicle_generation_id UUID NOT NULL REFERENCES vehicle_generations(id) ON DELETE CASCADE,
  
  -- Manual metadata
  manual_name VARCHAR(200), -- "Factory Service Manual 2015"
  manual_type VARCHAR(50), -- "workshop", "owner", "wiring_diagram", "parts_catalog"
  
  -- Coverage
  year_start INT,
  year_end INT,
  engine_variant VARCHAR(100),
  transmission_type VARCHAR(50),
  
  -- Source
  source VARCHAR(50), -- "charm.li", "lemon_manuals", "oem_website", "archive.org"
  source_url VARCHAR(500),
  local_path VARCHAR(500), -- If we have a local copy
  
  -- Attribution
  attribution TEXT,
  license VARCHAR(100), -- "public_domain", "creative_commons", "fair_use"
  
  -- Availability
  is_available BOOLEAN DEFAULT TRUE,
  last_verified TIMESTAMP,
  
  notes TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_manuals_generation ON vehicle_manuals(vehicle_generation_id);
```

---

## FRONTEND STRUCTURE (JavaScript/JSON)

### Synced from Postgres → JSON Files for Performance

#### `vehicles.json` (Complete vehicle data)
```json
{
  "vehicles": [
    {
      "id": "uuid-1",
      "make": "Ford",
      "model": "F-150",
      "slug": "ford-f-150",
      "type": "truck",
      "aliases": ["f150", "f 150"],
      "coverage_level": "complete",
      "generations": [
        {
          "id": "gen-uuid-1",
          "name": "13th generation",
          "years": { "start": 2009, "end": 2014 },
          "engines": [
            {
              "name": "5.0L V8",
              "specs": {
                "oil": { "type": "5W-20", "capacity_qt": 8.5 },
                "transmission": { "type": "Mercon ULV", "capacity_qt": 14.0 },
                "tire": { "front": "225/65R17", "rear": "225/65R17" },
                "battery": { "group": "H7", "cca": 800 },
                "wipers": { "driver": 26, "passenger": 18 }
              },
              "commonFailures": [
                {
                  "name": "Transmission shudder",
                  "severity": "high",
                  "mileage_range": { "start": 40000, "end": 120000 },
                  "dtc_codes": ["P0730"],
                  "cost_estimate": { "parts": 150, "labor": 2 }
                }
              ],
              "dtcMappings": [
                {
                  "code": "P0300",
                  "title": "Random/Multiple Cylinder Misfire",
                  "likely_causes": ["Spark plug wear", "Coil failure"],
                  "first_checks": ["Check oil level", "Inspect plugs"],
                  "severity": "high",
                  "cost_estimate": { "parts": 100, "labor": 1 }
                }
              ],
              "maintenance": [
                {
                  "task": "Oil change",
                  "interval_miles": 5000,
                  "cost_estimate": { "parts": 30, "labor": 0.5 },
                  "diy": true
                }
              ],
              "torque_specs": [
                {
                  "component": "Oil drain plug",
                  "torque": { "ft_lbs": 25, "nm": 33 }
                }
              ],
              "repair_procedures": [
                {
                  "name": "Oil change",
                  "slug": "ford-f150-oil-change-5.0l",
                  "difficulty": "easy",
                  "time_minutes": 20,
                  "steps": [...]
                }
              ]
            }
          ]
        }
      ]
    }
  ]
}
```

#### `vehicle_index.json` (Fast lookups)
```json
{
  "by_slug": {
    "ford-f-150": "uuid-1",
    "honda-civic": "uuid-2"
  },
  "by_make_model": {
    "Ford": {
      "F-150": ["uuid-1"],
      "F-250": ["uuid-2"]
    }
  },
  "makes": ["Ford", "Honda", "Toyota", ...],
  "models_by_make": {
    "Ford": ["F-150", "Escape", "Focus", ...],
    "Honda": ["Civic", "Accord", "CR-V", ...]
  }
}
```

---

## MIGRATION PATH (From Current to New Schema)

### Phase 1: Create New Tables (Week 1)
```sql
-- Create all new tables (above schema)
-- Don't delete old tables yet
```

### Phase 2: Migrate Data (Week 2)
```sql
-- Transform vehicleDirectory.js → vehicles + vehicle_generations
INSERT INTO vehicles (make, model, type, slug, aliases)
SELECT DISTINCT make, model, type, slug, aliases
FROM old_vehicle_directory;

-- Transform vehicleCoverageData.js → vehicle_generations + vehicle_specs
INSERT INTO vehicle_generations (vehicle_id, year_start, year_end, base_engine)
SELECT v.id, vc.year_start, vc.year_end, vc.engine
FROM old_vehicle_coverage vc
JOIN vehicles v ON v.make = vc.make AND v.model = vc.model;

-- Similar transformations for specs, failures, etc.
```

### Phase 3: Update Frontend (Week 3)
- [ ] Update components to use new data structure
- [ ] Add queries to fetch by vehicle_id instead of string matching
- [ ] Test all pages

### Phase 4: Deprecate Old Files (Week 4)
- [ ] Keep old tables for reference
- [ ] Delete old JS files
- [ ] Finalize migration

---

## ADVANTAGES OF NEW SCHEMA

### 1. **Single Source of Truth**
- One vehicle record with all related data
- No duplicated specs

### 2. **Scalability**
- 100 vehicles: No problem
- 1000 vehicles: Fast queries (indexed)
- 10,000 vehicles: Still performant (normalized)

### 3. **Data Integrity**
- Foreign keys ensure consistency
- No orphaned records
- Easy to validate data quality

### 4. **Query Examples**

```sql
-- Find all common failures for a vehicle
SELECT * FROM vehicle_common_failures
WHERE vehicle_generation_id = $1
ORDER BY severity DESC, frequency DESC;

-- Find repair procedures with torque specs
SELECT rp.*, array_agg(ts.component_name)
FROM vehicle_repair_procedures rp
LEFT JOIN vehicle_torque_specs ts ON ts.id = ANY(rp.torque_specs_required)
WHERE rp.vehicle_generation_id = $1;

-- Find parts that fail before 100k miles
SELECT * FROM vehicle_parts
WHERE vehicle_generation_id = $1
  AND lifespan_miles < 100000
ORDER BY lifespan_miles ASC;

-- Dashboard: Coverage analyzer
SELECT 
  v.make, v.model, COUNT(DISTINCT vg.id) as generations,
  COUNT(DISTINCT vs.id) as spec_records,
  COUNT(DISTINCT vcf.id) as failure_records,
  COUNT(DISTINCT vm.id) as manual_records
FROM vehicles v
LEFT JOIN vehicle_generations vg ON v.id = vg.vehicle_id
LEFT JOIN vehicle_specs vs ON vg.id = vs.vehicle_generation_id
LEFT JOIN vehicle_common_failures vcf ON vg.id = vcf.vehicle_generation_id
LEFT JOIN vehicle_manuals vm ON vg.id = vm.vehicle_generation_id
GROUP BY v.id
ORDER BY generations DESC;
```

### 5. **Admin Analytics**
- Track coverage_level per vehicle
- Identify high-confidence vs. estimated data
- See what's verified vs. preliminary
- Generate reports on data quality

---

## DATA ENTRY WORKFLOW

### For One Vehicle Generation (e.g., 2015 Honda Civic)

```python
# 1. Create vehicle (if not exists)
INSERT INTO vehicles 
  (make, model, type, slug, coverage_level, confidence_level)
VALUES 
  ('Honda', 'Civic', 'car', 'honda-civic', 'basic', 'preliminary');

# 2. Create generation
INSERT INTO vehicle_generations
  (vehicle_id, generation_name, year_start, year_end, base_engine, engine_variants)
VALUES
  (vehicle_id, '10th generation', 2016, 2021, '1.5L I4', 
   '["1.5L I4", "1.5L Turbo I4"]');

# 3. Add specs (one per engine variant)
INSERT INTO vehicle_specs
  (vehicle_generation_id, oil_type, oil_capacity_quarts, ...)
VALUES
  (generation_id, '0W-20', 3.7, ...);

# 4. Add common failures
INSERT INTO vehicle_common_failures
  (vehicle_generation_id, failure_name, severity, mileage_start_range, ...)
VALUES
  (generation_id, 'Transmission judder', 'high', 40000, ...);

# 5. Add DTC mappings
INSERT INTO vehicle_dtc_mappings
  (vehicle_generation_id, dtc_code, likely_causes, first_checks, ...)
VALUES
  (generation_id, 'P0011', '["Cam timing issue"]', '["Check oil level"]', ...);

# 6. Add maintenance
INSERT INTO vehicle_maintenance
  (vehicle_generation_id, task_name, interval_mileage, ...)
VALUES
  (generation_id, 'Oil change', 5000, ...);

# 7. Add torque specs
INSERT INTO vehicle_torque_specs
  (vehicle_generation_id, component_name, torque_ft_lbs, ...)
VALUES
  (generation_id, 'Oil drain plug', 25, ...);

# 8. Update coverage_level
UPDATE vehicles SET coverage_level = 'complete' WHERE id = vehicle_id;
```

---

## FRONTEND COMPONENT UPDATES

### Example: VehiclePage Component

**Before (Current - Scattered)**
```jsx
function VehiclePage({ slug }) {
  const specs = vehicleCoverageData.find(v => v.model === parsed.model);
  const dtcMappings = vehicleDtcKnowledge.filter(d => d.model === parsed.model);
  const manuals = manualRefs.filter(m => m.model === parsed.model);
  // Data is scattered, loose matching, hard to coordinate
}
```

**After (New Schema)**
```jsx
function VehiclePage({ slug }) {
  const vehicle = vehicleIndex.by_slug[slug]; // Fast lookup
  const generation = vehicle.generations[0]; // One generation
  const engine = generation.engines[0]; // One engine variant
  
  // All data is consolidated
  const specs = engine.specs;
  const failures = engine.commonFailures;
  const dtcs = engine.dtcMappings;
  const maintenance = engine.maintenance;
  const procedures = engine.repair_procedures;
  
  // Consistent, fast, easy to understand
}
```

---

## IMPLEMENTATION CHECKLIST

### Create Schema
- [ ] Create vehicles table
- [ ] Create vehicle_generations table
- [ ] Create vehicle_specs table
- [ ] Create vehicle_common_failures table
- [ ] Create vehicle_dtc_mappings table
- [ ] Create vehicle_maintenance table
- [ ] Create vehicle_torque_specs table
- [ ] Create vehicle_repair_procedures table
- [ ] Create vehicle_parts table
- [ ] Create vehicle_manuals table
- [ ] Create all indexes

### Migrate Data
- [ ] Migrate vehicleDirectory.js → vehicles + vehicle_generations
- [ ] Migrate vehicleCoverageData.js → vehicle_specs + vehicle_common_failures + vehicle_maintenance
- [ ] Migrate vehicleDtcKnowledge.js → vehicle_dtc_mappings
- [ ] Migrate manualRefsData.js → vehicle_manuals
- [ ] Validate data integrity

### Update Frontend
- [ ] Create sync script: Postgres → JSON files
- [ ] Update vehicle lookups (use vehicle_id instead of string matching)
- [ ] Update VehiclePage component
- [ ] Update search logic
- [ ] Update DTC pages
- [ ] Update vehicle browsing pages
- [ ] Test all routes

### Verification
- [ ] All 50 current vehicles migrate cleanly
- [ ] No data loss
- [ ] Performance tests pass (< 1s load times)
- [ ] Admin dashboard works

---

## FUTURE-PROOFING

### Easy to Add
✅ Photos/images (image_urls array in specs)  
✅ User reviews (separate reviews table, linked to vehicle_generation_id)  
✅ Compatibility data (parts compatibility linked to vehicle_generation_id)  
✅ Service reminders (linked to user_vehicles + vehicle_maintenance)  
✅ Cost estimates (already in schema)  
✅ Video links (youtube_url in repair procedures)  
✅ External API data (data_source field tracks origin)  

### Hard to Add Later (Do Now)
❌ Structured vs. unstructured data (already normalized)  
❌ Vehicle relationships (already modeled)  
❌ Historical changes (add updated_at tracking)  
❌ Confidence scoring (already in coverage_level + verified flags)  

---

## ESTIMATED EFFORT

| Task | Effort | Time |
|------|--------|------|
| Create SQL schema | Medium | 2–3 days |
| Migrate vehicleDirectory | Low | 1 day |
| Migrate vehicleCoverageData | Medium | 2–3 days |
| Migrate vehicleDtcKnowledge | Medium | 1–2 days |
| Migrate other files | Low | 1 day |
| Update frontend | Medium | 3–4 days |
| Testing & QA | Medium | 2–3 days |
| **Total** | | **12–17 days** |

---

## SUMMARY

**New schema provides:**
- ✅ Single source of truth (no duplicates)
- ✅ Scalable to 1000+ vehicles
- ✅ Room for torque, procedures, parts, images
- ✅ Fast indexed queries
- ✅ Data quality tracking
- ✅ Admin analytics
- ✅ Easy to extend

**Before adding hundreds of vehicles, do this redesign.** It's 2–3 weeks of work now vs. massive rework later.

