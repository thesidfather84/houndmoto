/**
 * HoundMoto Vehicle Data Loader
 *
 * Hybrid approach:
 * 1. Try to load from vehicles.json (Phase 1 data)
 * 2. Fallback to old JS files (backwards compatibility)
 * 3. Merge results for complete coverage
 */

import vehicleIndex from '../../src/data/vehicles/vehicle-index.json';
import vehiclesData from '../../src/data/vehicles/vehicles.json';
import { vehicleDirectory } from '../vehicleDirectory';
import { vehicleCoverage } from '../vehicleCoverageData';
import { vehicleDtcKnowledge } from '../data/vehicleDtcKnowledge';
import { manualRefs } from '../manualRefsData';

/**
 * Get vehicle by slug (e.g., "ford-f-150")
 * Uses new JSON first, falls back to old JS files
 */
export function getVehicleBySlug(slug) {
  try {
    // Try to find in vehicle index
    const vehicleKey = vehicleIndex.by_slug[slug];
    if (!vehicleKey) {
      console.warn(`[VehicleDataLoader] Slug not found in index: ${slug}`);
      return null;
    }

    const [make, model] = vehicleKey.split('|');

    // Find in new JSON data
    const jsonVehicle = vehiclesData.vehicles.find(
      (v) => v.make === make && v.model === model
    );

    if (!jsonVehicle) {
      console.warn(`[VehicleDataLoader] Vehicle not in JSON: ${make} ${model}`);
      return null;
    }

    return {
      source: 'json',
      ...jsonVehicle,
      slug,
    };
  } catch (err) {
    console.error(`[VehicleDataLoader] Error loading vehicle by slug:`, err);
    return null;
  }
}

/**
 * Get vehicle by make/model/year
 * Uses new JSON first, falls back to old JS files
 */
export function getVehicleByMakeModelYear(make, model, year) {
  try {
    // Try JSON first
    const jsonVehicle = vehiclesData.vehicles.find(
      (v) => v.make === make && v.model === model
    );

    if (jsonVehicle) {
      // Find generation that covers this year
      const generation = jsonVehicle.generations.find(
        (g) => g.yearStart <= year && g.yearEnd >= year
      );

      if (generation) {
        return {
          source: 'json',
          vehicle: jsonVehicle,
          generation,
        };
      }
    }

    // Fallback to old JS files
    const coverage = vehicleCoverage.find(
      (v) =>
        v.make === make &&
        v.model === model &&
        v.yearStart <= year &&
        v.yearEnd >= year
    );

    if (coverage) {
      return {
        source: 'legacy',
        coverage,
      };
    }

    return null;
  } catch (err) {
    console.error(
      `[VehicleDataLoader] Error loading vehicle by make/model/year:`,
      err
    );
    return null;
  }
}

/**
 * Get specs for a vehicle generation
 * Normalizes between JSON and legacy formats
 */
export function getVehicleSpecs(vehicle, generation) {
  if (vehicle.source === 'json' && generation) {
    // New format - already structured
    return {
      oil: generation.specs.oil,
      transmission: generation.specs.transmission,
      coolant: generation.specs.coolant,
      tire: generation.specs.tire,
      battery: generation.specs.battery,
      wipers: generation.specs.wipers,
      bulbs: generation.specs.bulbs,
      source: 'json',
    };
  }

  // Legacy format
  if (vehicle.source === 'legacy' && vehicle.coverage) {
    const { coverage } = vehicle;
    return {
      oil: {
        type: coverage.oilType,
        capacity: coverage.oilCapacity,
      },
      transmission: {
        fluid: coverage.transmissionFluid,
        capacity: coverage.transmissionCapacity,
      },
      coolant: {
        capacity: coverage.coolantCapacity,
      },
      tire: {
        size: coverage.tireSize,
      },
      battery: {
        group: coverage.batteryGroup,
      },
      wipers: coverage.wipers,
      bulbs: coverage.bulbs,
      source: 'legacy',
    };
  }

  return null;
}

/**
 * Get common failures for a vehicle
 */
export function getCommonFailures(vehicle, generation) {
  if (vehicle.source === 'json' && generation) {
    return generation.commonFailures || [];
  }

  if (vehicle.source === 'legacy' && vehicle.coverage) {
    const { coverage } = vehicle;
    if (!coverage.commonFailures) return [];

    // Parse comma-separated string into array
    return coverage.commonFailures.split(',').map((f) => ({
      name: f.trim(),
      source: 'legacy',
    }));
  }

  return [];
}

/**
 * Get DTC mappings for a vehicle
 */
export function getVehicleDTC(vehicle, year) {
  const results = [];

  // Try new JSON format
  if (vehicle.source === 'json' && vehicle.dtcMappings) {
    Object.entries(vehicle.dtcMappings).forEach(([code, mappings]) => {
      if (Array.isArray(mappings)) {
        mappings.forEach((m) => {
          if (!m.years || m.years.includes(year)) {
            results.push({
              code,
              ...m,
              source: 'json',
            });
          }
        });
      }
    });
  }

  // Try legacy format
  if (vehicle.source === 'legacy' && vehicle.coverage) {
    const { coverage } = vehicle;
    if (coverage.dtcNotes) {
      // Parse "P0340 cam sensor, P0420 catalyst" format
      coverage.dtcNotes.split(',').forEach((note) => {
        const match = note.trim().match(/^(P\d{4})\s*(.*)/);
        if (match) {
          results.push({
            code: match[1],
            description: match[2],
            source: 'legacy',
          });
        }
      });
    }
  }

  // Enrich with generic DTC data if available
  return results;
}

/**
 * Get all makes with data
 */
export function getAllMakes() {
  return vehicleIndex.makes;
}

/**
 * Get all models for a make
 */
export function getModelsForMake(make) {
  return vehicleIndex.models_by_make[make] || [];
}

/**
 * Check data source and coverage
 */
export function getDataQuality(vehicle, generation) {
  if (vehicle.source === 'json' && generation) {
    return {
      source: 'json',
      hasSpecs:
        generation.specs.oil.type ||
        generation.specs.tire.size ||
        generation.specs.battery.group,
      hasFailures: generation.commonFailures?.length > 0,
      hasDTC: Object.keys(vehicle.dtcMappings || {}).length > 0,
      confidence: generation.confidenceLevel || 'estimated',
    };
  }

  if (vehicle.source === 'legacy' && vehicle.coverage) {
    return {
      source: 'legacy',
      hasSpecs:
        vehicle.coverage.oilType ||
        vehicle.coverage.tireSize ||
        vehicle.coverage.batteryGroup,
      hasFailures: !!vehicle.coverage.commonFailures,
      hasDTC: !!vehicle.coverage.dtcNotes,
      confidence: vehicle.coverage.confidenceLevel || 'estimated',
    };
  }

  return {
    source: 'unknown',
    hasSpecs: false,
    hasFailures: false,
    hasDTC: false,
    confidence: 'unknown',
  };
}

/**
 * Generate coverage statistics
 */
export function getCoverageStats() {
  try {
    const total = vehiclesData.vehicles.length;
    const withSpecs = vehiclesData.vehicles.filter(
      (v) =>
        v.generations.some(
          (g) => g.specs.oil.type || g.specs.tire.size || g.specs.battery.group
        )
    ).length;
    const withFailures = vehiclesData.vehicles.filter(
      (v) => v.generations.some((g) => g.commonFailures?.length > 0)
    ).length;
    const withDTC = vehiclesData.vehicles.filter(
      (v) => Object.keys(v.dtcMappings || {}).length > 0
    ).length;

    return {
      total,
      withSpecs,
      withFailures,
      withDTC,
      coverage: {
        specs: Math.round((withSpecs / total) * 100),
        failures: Math.round((withFailures / total) * 100),
        dtc: Math.round((withDTC / total) * 100),
      },
    };
  } catch (err) {
    console.error('[VehicleDataLoader] Error calculating coverage stats:', err);
    return {
      total: 0,
      withSpecs: 0,
      withFailures: 0,
      withDTC: 0,
      coverage: { specs: 0, failures: 0, dtc: 0 },
    };
  }
}
