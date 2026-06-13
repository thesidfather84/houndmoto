# HoundMoto Database Implementation Guide
## Step-by-Step Code Examples

---

## STEP 1: CREATE SQL SCHEMA (Postgres)

### Create the database file

**`db/schema.sql`**
```sql
-- ============================================================================
-- HoundMoto Unified Vehicle Database Schema
-- ============================================================================

-- 1. VEHICLES (Core table)
CREATE TABLE IF NOT EXISTS vehicles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  make VARCHAR(50) NOT NULL,
  model VARCHAR(100) NOT NULL,
  type VARCHAR(20) NOT NULL, -- car, truck, suv, van, hybrid, ev
  slug VARCHAR(200) UNIQUE,
  aliases TEXT[] DEFAULT '{}',
  coverage_level VARCHAR(20) DEFAULT 'none', -- none, partial, basic, complete
  data_sources TEXT[] DEFAULT '{}',
  confidence_level VARCHAR(20) DEFAULT 'estimated', -- verified, estimated, preliminary
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  last_verified TIMESTAMP,
  
  CONSTRAINT unique_make_model UNIQUE(make, model)
);
CREATE INDEX idx_vehicles_make_model ON vehicles(make, model);
CREATE INDEX idx_vehicles_slug ON vehicles(slug);

-- 2. VEHICLE_GENERATIONS
CREATE TABLE IF NOT EXISTS vehicle_generations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  vehicle_id UUID NOT NULL REFERENCES vehicles(id) ON DELETE CASCADE,
  generation_name VARCHAR(100),
  year_start INT NOT NULL,
  year_end INT NOT NULL,
  base_engine VARCHAR(100),
  engine_variants TEXT[] DEFAULT '{}',
  transmission_types TEXT[] DEFAULT '{}',
  drivetrain_options TEXT[] DEFAULT '{}',
  notes TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  
  CONSTRAINT valid_years CHECK (year_start <= year_end)
);
CREATE INDEX idx_generations_vehicle_years ON vehicle_generations(vehicle_id, year_start, year_end);

-- 3. VEHICLE_SPECS
CREATE TABLE IF NOT EXISTS vehicle_specs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  vehicle_generation_id UUID NOT NULL REFERENCES vehicle_generations(id) ON DELETE CASCADE,
  
  -- Oil
  oil_type VARCHAR(50),
  oil_capacity_quarts DECIMAL(5,2),
  oil_capacity_liters DECIMAL(5,2),
  oil_change_interval_miles INT,
  
  -- Transmission
  transmission_fluid VARCHAR(100),
  transmission_capacity_quarts DECIMAL(5,2),
  transmission_capacity_liters DECIMAL(5,2),
  transmission_fluid_change_interval_miles INT,
  
  -- Coolant
  coolant_type VARCHAR(100),
  coolant_capacity_quarts DECIMAL(5,2),
  coolant_capacity_liters DECIMAL(5,2),
  
  -- Tire
  tire_size_front VARCHAR(20),
  tire_size_rear VARCHAR(20),
  tire_pressure_psi_front INT,
  tire_pressure_psi_rear INT,
  
  -- Battery
  battery_group_size VARCHAR(20),
  battery_cca INT,
  battery_ah INT,
  
  -- Wipers
  wiper_driver_inches DECIMAL(3,1),
  wiper_passenger_inches DECIMAL(3,1),
  wiper_rear_inches DECIMAL(3,1),
  
  -- Bulbs
  headlight_bulb_type VARCHAR(50),
  headlight_bulb_wattage INT,
  fog_light_bulb_type VARCHAR(50),
  tail_light_bulb_type VARCHAR(50),
  
  -- Brake fluid
  brake_fluid_type VARCHAR(50),
  brake_fluid_capacity_oz INT,
  
  -- Spark plugs
  spark_plug_type VARCHAR(100),
  spark_plug_gap VARCHAR(20),
  
  specs_verified BOOLEAN DEFAULT FALSE,
  data_source VARCHAR(200),
  notes TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
CREATE INDEX idx_specs_generation ON vehicle_specs(vehicle_generation_id);

-- 4. VEHICLE_COMMON_FAILURES
CREATE TABLE IF NOT EXISTS vehicle_common_failures (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  vehicle_generation_id UUID NOT NULL REFERENCES vehicle_generations(id) ON DELETE CASCADE,
  failure_name VARCHAR(200),
  failure_description TEXT,
  mileage_start_range INT,
  mileage_end_range INT,
  severity VARCHAR(20), -- critical, high, moderate, low
  cost_estimate_parts_low INT,
  cost_estimate_parts_high INT,
  cost_estimate_labor_hours DECIMAL(4,2),
  symptoms TEXT[] DEFAULT '{}',
  related_dtc_codes VARCHAR(10)[] DEFAULT '{}',
  solution TEXT,
  is_diy BOOLEAN DEFAULT TRUE,
  part_required VARCHAR(200),
  data_source VARCHAR(200),
  frequency VARCHAR(20), -- common, occasional, rare
  verified BOOLEAN DEFAULT FALSE,
  notes TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
CREATE INDEX idx_failures_generation ON vehicle_common_failures(vehicle_generation_id);
CREATE INDEX idx_failures_mileage ON vehicle_common_failures(mileage_start_range, mileage_end_range);

-- 5. VEHICLE_DTC_MAPPINGS
CREATE TABLE IF NOT EXISTS vehicle_dtc_mappings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  vehicle_generation_id UUID NOT NULL REFERENCES vehicle_generations(id) ON DELETE CASCADE,
  dtc_code VARCHAR(10) NOT NULL,
  generic_title VARCHAR(200),
  likely_causes TEXT[] DEFAULT '{}',
  first_checks TEXT[] DEFAULT '{}',
  severity VARCHAR(20),
  can_drive TEXT,
  related_failures UUID[] DEFAULT '{}',
  typical_part_required VARCHAR(200),
  typical_cost_parts INT,
  typical_cost_labor_hours DECIMAL(4,2),
  frequency VARCHAR(20), -- very_common, common, occasional
  verified BOOLEAN DEFAULT FALSE,
  data_source VARCHAR(200),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
CREATE INDEX idx_dtc_mapping_code ON vehicle_dtc_mappings(dtc_code);
CREATE INDEX idx_dtc_mapping_vehicle ON vehicle_dtc_mappings(vehicle_generation_id);

-- 6. VEHICLE_MAINTENANCE
CREATE TABLE IF NOT EXISTS vehicle_maintenance (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  vehicle_generation_id UUID NOT NULL REFERENCES vehicle_generations(id) ON DELETE CASCADE,
  task_name VARCHAR(200),
  task_description TEXT,
  interval_type VARCHAR(20), -- mileage, time, condition
  interval_mileage INT,
  interval_months INT,
  cost_parts_estimated INT,
  cost_labor_hours DECIMAL(4,2),
  cost_total_estimated INT,
  fluids_needed TEXT[] DEFAULT '{}',
  parts_needed TEXT[] DEFAULT '{}',
  diy_difficulty VARCHAR(20), -- easy, moderate, hard
  is_recommended_diy BOOLEAN DEFAULT TRUE,
  estimated_time_hours DECIMAL(4,2),
  data_source VARCHAR(200),
  verified BOOLEAN DEFAULT FALSE,
  notes TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
CREATE INDEX idx_maintenance_generation ON vehicle_maintenance(vehicle_generation_id);
CREATE INDEX idx_maintenance_interval ON vehicle_maintenance(interval_mileage);

-- 7. VEHICLE_TORQUE_SPECS
CREATE TABLE IF NOT EXISTS vehicle_torque_specs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  vehicle_generation_id UUID NOT NULL REFERENCES vehicle_generations(id) ON DELETE CASCADE,
  component_name VARCHAR(200),
  component_location VARCHAR(200),
  bolt_size VARCHAR(50),
  torque_ft_lbs DECIMAL(6,2),
  torque_nm DECIMAL(6,2),
  torque_in_lbs INT,
  sequence_order INT,
  sequence_notes TEXT,
  fastener_type VARCHAR(50), -- bolt, screw, stud
  fastener_material VARCHAR(50),
  verified BOOLEAN DEFAULT FALSE,
  data_source VARCHAR(200),
  notes TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
CREATE INDEX idx_torque_generation ON vehicle_torque_specs(vehicle_generation_id);

-- 8. VEHICLE_REPAIR_PROCEDURES
CREATE TABLE IF NOT EXISTS vehicle_repair_procedures (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  vehicle_generation_id UUID NOT NULL REFERENCES vehicle_generations(id) ON DELETE CASCADE,
  procedure_name VARCHAR(200),
  procedure_slug VARCHAR(200) UNIQUE,
  category VARCHAR(50), -- maintenance, repair, diagnostic
  diy_difficulty VARCHAR(20),
  estimated_time_minutes INT,
  cost_parts_estimated INT,
  cost_tools_estimated INT,
  tools_required TEXT[] DEFAULT '{}',
  parts_required TEXT[] DEFAULT '{}',
  fluids_required TEXT[] DEFAULT '{}',
  safety_precautions TEXT[] DEFAULT '{}',
  steps JSONB DEFAULT '[]', -- Array of {order, title, description, image_url, caution}
  checks_before TEXT[] DEFAULT '{}',
  checks_after TEXT[] DEFAULT '{}',
  torque_specs_required UUID[] DEFAULT '{}',
  youtube_video_url VARCHAR(500),
  related_manual_url VARCHAR(500),
  verified BOOLEAN DEFAULT FALSE,
  data_source VARCHAR(200),
  notes TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
CREATE INDEX idx_procedures_generation ON vehicle_repair_procedures(vehicle_generation_id);

-- 9. VEHICLE_PARTS
CREATE TABLE IF NOT EXISTS vehicle_parts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  vehicle_generation_id UUID NOT NULL REFERENCES vehicle_generations(id) ON DELETE CASCADE,
  part_name VARCHAR(200),
  part_type VARCHAR(50),
  oem_part_number VARCHAR(100),
  aftermarket_equivalents TEXT[] DEFAULT '{}',
  position VARCHAR(100),
  quantity INT DEFAULT 1,
  cost_oem_estimated INT,
  cost_aftermarket_estimated INT,
  cost_labor_hours DECIMAL(4,2),
  lifespan_miles INT,
  lifespan_months INT,
  failure_symptoms TEXT[] DEFAULT '{}',
  failure_warnings TEXT[] DEFAULT '{}',
  is_diy BOOLEAN DEFAULT TRUE,
  diy_difficulty VARCHAR(20),
  estimated_time_minutes INT,
  verified BOOLEAN DEFAULT FALSE,
  data_source VARCHAR(200),
  notes TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
CREATE INDEX idx_parts_generation ON vehicle_parts(vehicle_generation_id);

-- 10. VEHICLE_MANUALS
CREATE TABLE IF NOT EXISTS vehicle_manuals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  vehicle_generation_id UUID NOT NULL REFERENCES vehicle_generations(id) ON DELETE CASCADE,
  manual_name VARCHAR(200),
  manual_type VARCHAR(50), -- workshop, owner, wiring_diagram, parts_catalog
  year_start INT,
  year_end INT,
  engine_variant VARCHAR(100),
  transmission_type VARCHAR(50),
  source VARCHAR(50), -- charm.li, lemon_manuals, oem_website, archive.org
  source_url VARCHAR(500),
  local_path VARCHAR(500),
  attribution TEXT,
  license VARCHAR(100),
  is_available BOOLEAN DEFAULT TRUE,
  last_verified TIMESTAMP,
  notes TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
CREATE INDEX idx_manuals_generation ON vehicle_manuals(vehicle_generation_id);
```

### Run the schema

```bash
# In your Vercel project or local dev environment
psql $DATABASE_URL < db/schema.sql
```

---

## STEP 2: MIGRATION SCRIPT (Postgres)

**`db/migrate_from_js.sql`**
```sql
-- Migrate from vehicleDirectory.js → vehicles + vehicle_generations
-- This is a template; adjust field names to match your actual JS objects

INSERT INTO vehicles (make, model, type, slug, aliases, coverage_level)
SELECT DISTINCT 
  make,
  model,
  type,
  LOWER(CONCAT(make, '-', REPLACE(model, ' ', '-'))),
  aliases,
  'partial' -- Default: we're just migrating recognition
FROM (
  -- Parse your vehicleDirectory.js array here
  -- This assumes you've exported it as a table
  VALUES
    ('Ford', 'F-150', 'truck', ARRAY['f150', 'f 150']),
    ('Honda', 'Civic', 'car', ARRAY['civic']),
    ('Toyota', 'Camry', 'car', ARRAY['camry'])
) AS vd(make, model, type, aliases);

-- Migrate vehicleCoverageData.js → vehicle_generations + vehicle_specs
WITH vehicle_gens AS (
  INSERT INTO vehicle_generations (vehicle_id, generation_name, year_start, year_end, base_engine)
  SELECT 
    v.id,
    vc.generation,
    vc.yearStart,
    vc.yearEnd,
    vc.engine
  FROM vehicles v
  CROSS JOIN (
    -- Parse vehicleCoverageData.js and select relevant fields
    SELECT DISTINCT make, model, generation, yearStart, yearEnd, engine
    FROM your_coverage_data
  ) vc
  WHERE v.make = vc.make AND v.model = vc.model
  RETURNING id, vehicle_id
)
INSERT INTO vehicle_specs (
  vehicle_generation_id, oil_type, oil_capacity_quarts, 
  transmission_fluid, transmission_capacity_quarts, ...
)
SELECT
  gen.id,
  vc.oilType,
  vc.oilCapacity, -- Parse "6 quarts" → 6
  vc.transmissionFluid,
  vc.transmissionCapacity,
  ...
FROM vehicle_gens gen
JOIN your_coverage_data vc ON ...;
```

---

## STEP 3: DATA LAYER (Node.js API)

**`api/vehicles/index.js`** - API endpoints
```javascript
import { sql } from "@vercel/postgres";

// GET /api/vehicles/by-slug/ford-f-150
export async function getVehicleBySlug(slug) {
  const result = await sql`
    SELECT v.*, 
      json_agg(json_build_object(
        'id', vg.id,
        'generation_name', vg.generation_name,
        'year_start', vg.year_start,
        'year_end', vg.year_end,
        'specs', (
          SELECT json_build_object(
            'oil_type', vs.oil_type,
            'oil_capacity_quarts', vs.oil_capacity_quarts,
            'transmission_fluid', vs.transmission_fluid,
            ...
          ) FROM vehicle_specs vs WHERE vs.vehicle_generation_id = vg.id
        ),
        'failures', (
          SELECT json_agg(json_build_object(
            'id', f.id,
            'failure_name', f.failure_name,
            'severity', f.severity,
            'related_dtc_codes', f.related_dtc_codes,
            ...
          )) FROM vehicle_common_failures f WHERE f.vehicle_generation_id = vg.id
        ),
        'dtc_mappings', (
          SELECT json_agg(json_build_object(
            'code', d.dtc_code,
            'title', d.generic_title,
            'likely_causes', d.likely_causes,
            'first_checks', d.first_checks,
            ...
          )) FROM vehicle_dtc_mappings d WHERE d.vehicle_generation_id = vg.id
        ),
        'maintenance', (
          SELECT json_agg(json_build_object(
            'task_name', m.task_name,
            'interval_mileage', m.interval_mileage,
            'cost_estimate', m.cost_total_estimated,
            ...
          )) FROM vehicle_maintenance m WHERE m.vehicle_generation_id = vg.id
        )
      ) ORDER BY vg.year_start DESC)
    FROM vehicles v
    LEFT JOIN vehicle_generations vg ON v.id = vg.vehicle_id
    WHERE v.slug = $1
    GROUP BY v.id
  `;
  
  return result.rows[0] || null;
}

// GET /api/vehicles/search?make=Ford&model=F-150&year=2015
export async function searchVehicles({ make, model, year }) {
  const result = await sql`
    SELECT DISTINCT v.id, v.make, v.model, v.slug
    FROM vehicles v
    LEFT JOIN vehicle_generations vg ON v.id = vg.vehicle_id
    WHERE LOWER(v.make) LIKE LOWER($1)
      AND LOWER(v.model) LIKE LOWER($2)
      AND ($3::INT IS NULL OR (vg.year_start <= $3 AND vg.year_end >= $3))
    LIMIT 10
  `;
  
  return result.rows;
}

// GET /api/vehicles/:id/dtc-mappings
export async function getVehicleDtcMappings(vehicleId, year) {
  const result = await sql`
    SELECT d.*
    FROM vehicle_dtc_mappings d
    JOIN vehicle_generations vg ON d.vehicle_generation_id = vg.id
    WHERE vg.vehicle_id = $1
      AND vg.year_start <= $2
      AND vg.year_end >= $2
    ORDER BY d.frequency DESC
  `;
  
  return result.rows;
}

// GET /api/vehicles/:id/maintenance
export async function getMaintenanceSchedule(vehicleId, year) {
  const result = await sql`
    SELECT m.*
    FROM vehicle_maintenance m
    JOIN vehicle_generations vg ON m.vehicle_generation_id = vg.id
    WHERE vg.vehicle_id = $1
      AND vg.year_start <= $2
      AND vg.year_end >= $2
    ORDER BY m.interval_mileage ASC
  `;
  
  return result.rows;
}

// GET /api/admin/coverage-analyzer
export async function getCoverageStats() {
  const result = await sql`
    SELECT 
      v.make, v.model, v.slug,
      COUNT(DISTINCT vg.id) as generations,
      COUNT(DISTINCT vs.id) as spec_records,
      COUNT(DISTINCT vcf.id) as failure_records,
      COUNT(DISTINCT vdm.id) as dtc_mappings,
      COUNT(DISTINCT vm.id) as manual_records,
      v.coverage_level,
      v.confidence_level
    FROM vehicles v
    LEFT JOIN vehicle_generations vg ON v.id = vg.vehicle_id
    LEFT JOIN vehicle_specs vs ON vg.id = vs.vehicle_generation_id
    LEFT JOIN vehicle_common_failures vcf ON vg.id = vcf.vehicle_generation_id
    LEFT JOIN vehicle_dtc_mappings vdm ON vg.id = vdm.vehicle_generation_id
    LEFT JOIN vehicle_manuals vm ON vg.id = vm.vehicle_generation_id
    GROUP BY v.id
    ORDER BY failure_records DESC
  `;
  
  return result.rows;
}
```

---

## STEP 4: EXPORT TO JSON (For Frontend Performance)

**`api/vehicles/export-to-json.js`** - Sync Postgres → JSON files
```javascript
import fs from "fs";
import { sql } from "@vercel/postgres";

export async function syncVehiclesToJSON() {
  // Fetch all vehicles with nested data
  const result = await sql`
    SELECT 
      v.id, v.make, v.model, v.slug, v.type, v.aliases, v.coverage_level,
      json_agg(
        json_build_object(
          'id', vg.id,
          'name', vg.generation_name,
          'years', json_build_object('start', vg.year_start, 'end', vg.year_end),
          'engines', COALESCE(vg.engine_variants, '{}'),
          'specs', (
            SELECT json_build_object(
              'oil', json_build_object(
                'type', vs.oil_type,
                'capacity_qt', vs.oil_capacity_quarts,
                'capacity_l', vs.oil_capacity_liters
              ),
              'transmission', json_build_object(
                'fluid', vs.transmission_fluid,
                'capacity_qt', vs.transmission_capacity_quarts,
                'capacity_l', vs.transmission_capacity_liters
              ),
              'tire', json_build_object(
                'front', vs.tire_size_front,
                'rear', vs.tire_size_rear
              ),
              'battery', json_build_object(
                'group', vs.battery_group_size,
                'cca', vs.battery_cca
              ),
              'wipers', json_build_object(
                'driver', vs.wiper_driver_inches,
                'passenger', vs.wiper_passenger_inches
              )
            ) FROM vehicle_specs vs 
            WHERE vs.vehicle_generation_id = vg.id LIMIT 1
          ),
          'failures', (
            SELECT json_agg(json_build_object(
              'id', f.id,
              'name', f.failure_name,
              'severity', f.severity,
              'mileage_range', json_build_object(
                'start', f.mileage_start_range,
                'end', f.mileage_end_range
              ),
              'dtc_codes', f.related_dtc_codes,
              'solution', f.solution
            )) FROM vehicle_common_failures f 
            WHERE f.vehicle_generation_id = vg.id
          ),
          'dtc_mappings', (
            SELECT json_agg(json_build_object(
              'code', d.dtc_code,
              'title', d.generic_title,
              'likely_causes', d.likely_causes,
              'first_checks', d.first_checks,
              'severity', d.severity
            )) FROM vehicle_dtc_mappings d 
            WHERE d.vehicle_generation_id = vg.id
          ),
          'maintenance', (
            SELECT json_agg(json_build_object(
              'task', m.task_name,
              'interval_miles', m.interval_mileage,
              'interval_months', m.interval_months,
              'cost_total', m.cost_total_estimated,
              'diy', m.is_recommended_diy
            )) FROM vehicle_maintenance m 
            WHERE m.vehicle_generation_id = vg.id
          )
        ) ORDER BY vg.year_start DESC
      ) as generations
    FROM vehicles v
    LEFT JOIN vehicle_generations vg ON v.id = vg.vehicle_id
    GROUP BY v.id
  `;
  
  const vehicles = result.rows;
  
  // Write to public/data/vehicles.json
  fs.writeFileSync(
    "public/data/vehicles.json",
    JSON.stringify({ vehicles }, null, 2)
  );
  
  // Create index for fast lookups
  const index = {
    by_slug: {},
    by_make_model: {},
    makes: [],
    models_by_make: {}
  };
  
  vehicles.forEach(v => {
    index.by_slug[v.slug] = v.id;
    
    if (!index.by_make_model[v.make]) {
      index.by_make_model[v.make] = {};
      index.models_by_make[v.make] = [];
    }
    index.by_make_model[v.make][v.model] = v.id;
    if (!index.models_by_make[v.make].includes(v.model)) {
      index.models_by_make[v.make].push(v.model);
    }
    
    if (!index.makes.includes(v.make)) {
      index.makes.push(v.make);
    }
  });
  
  fs.writeFileSync(
    "public/data/vehicle-index.json",
    JSON.stringify(index, null, 2)
  );
  
  console.log(`✅ Synced ${vehicles.length} vehicles to JSON`);
}

// Run on deploy
syncVehiclesToJSON();
```

---

## STEP 5: UPDATE FRONTEND COMPONENTS

**`src/context/VehicleContext.jsx`** - Updated
```javascript
import { createContext, useContext, useState, useEffect } from "react";
import vehicleIndex from "../../public/data/vehicle-index.json";
import vehiclesData from "../../public/data/vehicles.json";

const VehicleContext = createContext();

export function useVehicle() {
  return useContext(VehicleContext);
}

export function VehicleProvider({ children }) {
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [vehicleData, setVehicleData] = useState(null);
  
  // Fast lookup: slug → vehicle ID → full vehicle data
  const selectVehicleBySlug = (slug) => {
    const vehicleId = vehicleIndex.by_slug[slug];
    if (!vehicleId) return null;
    
    const vehicle = vehiclesData.vehicles.find(v => v.id === vehicleId);
    setSelectedVehicle(vehicle);
    setVehicleData(vehicle);
    return vehicle;
  };
  
  const selectVehicleByMakeModelYear = (make, model, year) => {
    // Find the generation that covers this year
    const vehicle = vehiclesData.vehicles.find(
      v => v.make === make && v.model === model
    );
    
    if (!vehicle) return null;
    
    const generation = vehicle.generations.find(
      g => g.years.start <= year && g.years.end >= year
    );
    
    if (!generation) return null;
    
    setSelectedVehicle({
      ...vehicle,
      selectedGeneration: generation
    });
    setVehicleData({
      ...vehicle,
      selectedGeneration: generation
    });
    
    return { vehicle, generation };
  };
  
  return (
    <VehicleContext.Provider value={{
      selectedVehicle,
      vehicleData,
      selectVehicleBySlug,
      selectVehicleByMakeModelYear
    }}>
      {children}
    </VehicleContext.Provider>
  );
}
```

**`src/pages/VehiclePage.jsx`** - Simplified
```javascript
import { useParams } from "react-router-dom";
import { useVehicle } from "../context/VehicleContext";

export default function VehiclePage() {
  const { slug } = useParams();
  const { selectVehicleBySlug, vehicleData } = useVehicle();
  
  useEffect(() => {
    const vehicle = selectVehicleBySlug(slug);
    if (!vehicle) {
      // Vehicle not found
    }
  }, [slug]);
  
  if (!vehicleData) return <div>Loading...</div>;
  
  const { generations } = vehicleData;
  const latestGen = generations[0];
  const { specs, failures, dtc_mappings, maintenance } = latestGen;
  
  return (
    <div className="vehicle-page">
      <h1>{vehicleData.make} {vehicleData.model}</h1>
      
      {/* Specs */}
      <section className="specs-section">
        <h2>Specifications</h2>
        <div className="spec-group">
          <h3>Oil</h3>
          <p>Type: {specs.oil.type}</p>
          <p>Capacity: {specs.oil.capacity_qt} quarts</p>
        </div>
        {/* ... more specs */}
      </section>
      
      {/* Common Failures */}
      <section className="failures-section">
        <h2>Common Failures</h2>
        {failures?.map(f => (
          <div key={f.id} className="failure-card">
            <h3>{f.name}</h3>
            <p className={`severity-${f.severity}`}>{f.severity}</p>
            <p>{f.solution}</p>
          </div>
        ))}
      </section>
      
      {/* DTC Mappings */}
      <section className="dtc-section">
        <h2>Common DTC Codes</h2>
        {dtc_mappings?.map(d => (
          <div key={d.code} className="dtc-card">
            <h3>{d.code}: {d.title}</h3>
            <p><strong>Likely causes:</strong> {d.likely_causes.join(", ")}</p>
          </div>
        ))}
      </section>
      
      {/* Maintenance Schedule */}
      <section className="maintenance-section">
        <h2>Maintenance Schedule</h2>
        <table>
          <thead>
            <tr>
              <th>Task</th>
              <th>Interval</th>
              <th>Estimated Cost</th>
              <th>DIY?</th>
            </tr>
          </thead>
          <tbody>
            {maintenance?.map(m => (
              <tr key={m.task}>
                <td>{m.task}</td>
                <td>{m.interval_miles} miles / {m.interval_months} months</td>
                <td>${m.cost_total}</td>
                <td>{m.diy ? "Yes" : "Shop only"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}
```

---

## STEP 6: DATA ENTRY WORKFLOW

**`scripts/add-vehicle.js`** - Command-line tool
```javascript
// Usage: node scripts/add-vehicle.js --make Honda --model Civic --years 2016-2021
// Interactive wizard for entering complete vehicle data

import { sql } from "@vercel/postgres";
import readline from "readline";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

async function addVehicle() {
  // 1. Create vehicle if doesn't exist
  const make = process.argv[process.argv.indexOf("--make") + 1];
  const model = process.argv[process.argv.indexOf("--model") + 1];
  const years = process.argv[process.argv.indexOf("--years") + 1].split("-");
  
  const vehicle = await sql`
    INSERT INTO vehicles (make, model, slug, type, coverage_level)
    VALUES ($1, $2, $3, $4, 'partial')
    ON CONFLICT (make, model) DO UPDATE SET updated_at = NOW()
    RETURNING id
  `;
  
  const vehicleId = vehicle.rows[0].id;
  console.log(`✅ Vehicle: ${make} ${model} (ID: ${vehicleId})`);
  
  // 2. Create generation
  const generation = await sql`
    INSERT INTO vehicle_generations 
      (vehicle_id, generation_name, year_start, year_end, base_engine)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING id
  `;
  
  const generationId = generation.rows[0].id;
  console.log(`✅ Generation: ${years[0]}-${years[1]} (ID: ${generationId})`);
  
  // 3-8. Prompt for specs, failures, DTC, maintenance, torque, procedures
  // (Interactive prompts omitted for brevity)
  
  console.log("✅ Vehicle added successfully!");
  rl.close();
}

addVehicle();
```

---

## IMPLEMENTATION CHECKLIST

### Week 1: Setup
- [ ] Create SQL schema (db/schema.sql)
- [ ] Run migrations on Vercel Postgres
- [ ] Test schema with test data

### Week 2: Migration
- [ ] Export vehicleDirectory.js → SQL
- [ ] Export vehicleCoverageData.js → SQL
- [ ] Export vehicleDtcKnowledge.js → SQL
- [ ] Verify data integrity
- [ ] Test lookups work correctly

### Week 3: Frontend
- [ ] Create API endpoints (api/vehicles/*.js)
- [ ] Create JSON sync script
- [ ] Update VehicleContext
- [ ] Update VehiclePage component
- [ ] Test all vehicle pages

### Week 4: Polish
- [ ] Build admin coverage analyzer
- [ ] Add data quality scoring
- [ ] Performance testing (< 1s load)
- [ ] Deploy

---

## QUERIES FOR COMMON TASKS

```sql
-- Find all vehicles with incomplete specs
SELECT v.make, v.model, v.coverage_level
FROM vehicles v
WHERE v.coverage_level IN ('none', 'partial');

-- Find all failures by severity
SELECT f.failure_name, COUNT(*) as count
FROM vehicle_common_failures f
GROUP BY f.severity
ORDER BY f.severity DESC;

-- Most common DTC codes by vehicle
SELECT d.dtc_code, COUNT(*) as count
FROM vehicle_dtc_mappings d
GROUP BY d.dtc_code
ORDER BY count DESC
LIMIT 20;

-- Average cost to fix failures
SELECT 
  f.failure_name,
  AVG(f.cost_estimate_parts_low) as avg_parts,
  AVG(f.cost_estimate_labor_hours * 150) as avg_labor -- Assume $150/hr
FROM vehicle_common_failures f
WHERE f.cost_estimate_parts_low > 0
GROUP BY f.failure_name
ORDER BY avg_parts DESC;

-- Maintenance timeline for a specific vehicle
SELECT 
  m.task_name,
  m.interval_mileage,
  m.interval_months,
  m.cost_total_estimated
FROM vehicle_maintenance m
JOIN vehicle_generations vg ON m.vehicle_generation_id = vg.id
WHERE vg.vehicle_id = 'uuid-here'
ORDER BY m.interval_mileage ASC;
```

---

## SUMMARY

This unified schema enables:
- ✅ Complete vehicle profiles (1 record = all data)
- ✅ Fast queries (indexed by generation/make/model)
- ✅ Scalable to 1000+ vehicles
- ✅ Easy data entry (structured, not strings)
- ✅ Admin analytics (coverage tracking)
- ✅ Future expansion (torque, procedures, images, reviews)

**Before adding hundreds of vehicles, implement this schema. It's 2–3 weeks now vs. major rework later.**

