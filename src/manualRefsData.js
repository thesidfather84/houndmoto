// Manual reference metadata index — LEMON Manuals / Operation CHARM archive
//
// This file stores vehicle-to-manual associations (metadata only).
// No manual content is stored here. All URLs are search-style links
// that direct users to the archive's search interface.
//
// Attribution required on every link shown to users:
//   "Manual reference from LEMON Manuals / Operation CHARM archive."

// ─── Source definitions ───────────────────────────────────────────────────────

export const manualSources = {
  CHARM: {
    id: "CHARM",
    name: "Operation CHARM",
    description: "Free vehicle service manual archive",
    searchUrl: (q) => `https://charm.li/?s=${encodeURIComponent(q)}`,
    baseUrl: "https://charm.li/",
    attribution: "Operation CHARM archive",
  },
  LEMON: {
    id: "LEMON",
    name: "LEMON Manuals",
    description: "Vehicle repair manuals and how-to guides",
    searchUrl: (q) => `https://lemon-manuals.la/?s=${encodeURIComponent(q)}`,
    baseUrl: "https://lemon-manuals.la/",
    attribution: "LEMON Manuals archive",
  },
};

// ─── Manual reference records (metadata index, no full content) ───────────────
//
// Fields:
//   id          - unique slug
//   make        - vehicle make (matches vehicleSpecs format)
//   model       - vehicle model (matches vehicleSpecs format)
//   yearStart   - first model year this record covers
//   yearEnd     - last model year this record covers
//   variant     - generation/platform name, or null if covers all trims
//   engine      - specific engine, or null for all engines
//   transmission- transmission type, or null for all
//   drivetrain  - drivetrain type, or null for all
//   category    - manual type: "Workshop Manual", "Wiring Diagram", etc.
//   source      - key into manualSources
//   localPath   - path to local archive copy; null until manually downloaded
//   notes       - human-readable notes for the admin import log

export const manualRefs = [

  // ── Ford F-150 ──────────────────────────────────────────────────────────────
  {
    id: "ford-f150-1997-2003-workshop",
    make: "Ford", model: "F-150",
    yearStart: 1997, yearEnd: 2003,
    variant: "10th generation", engine: null, transmission: null, drivetrain: null,
    category: "Workshop Manual", source: "CHARM", localPath: null,
    notes: "Covers 1997–2003 F-150. Includes 4.2L V6, 4.6L V8, 5.4L V8.",
  },
  {
    id: "ford-f150-2004-2008-workshop",
    make: "Ford", model: "F-150",
    yearStart: 2004, yearEnd: 2008,
    variant: "11th generation", engine: null, transmission: null, drivetrain: null,
    category: "Workshop Manual", source: "CHARM", localPath: null,
    notes: "Covers 2004–2008 F-150. Includes 4.6L and 5.4L 3-valve Triton engines.",
  },
  {
    id: "ford-f150-2009-2014-workshop",
    make: "Ford", model: "F-150",
    yearStart: 2009, yearEnd: 2014,
    variant: "12th generation", engine: null, transmission: null, drivetrain: null,
    category: "Workshop Manual", source: "CHARM", localPath: null,
    notes: "Covers 2009–2014 F-150. Includes first EcoBoost V6 (2011+) and 5.0L V8.",
  },
  {
    id: "ford-f150-2015-2020-workshop",
    make: "Ford", model: "F-150",
    yearStart: 2015, yearEnd: 2020,
    variant: "13th generation, aluminum body", engine: null, transmission: null, drivetrain: null,
    category: "Workshop Manual", source: "CHARM", localPath: null,
    notes: "Covers 2015–2020 F-150. Aluminum body introduction. Includes 2.7L/3.5L EcoBoost, 5.0L V8.",
  },
  {
    id: "ford-f150-2021-2024-workshop",
    make: "Ford", model: "F-150",
    yearStart: 2021, yearEnd: 2024,
    variant: "14th generation", engine: null, transmission: null, drivetrain: null,
    category: "Workshop Manual", source: "CHARM", localPath: null,
    notes: "Covers 2021–2024 F-150. Includes PowerBoost Hybrid, 10-speed transmission.",
  },

  // ── Ford Explorer ───────────────────────────────────────────────────────────
  {
    id: "ford-explorer-2002-2010-workshop",
    make: "Ford", model: "Explorer",
    yearStart: 2002, yearEnd: 2010,
    variant: "3rd/4th generation", engine: null, transmission: null, drivetrain: null,
    category: "Workshop Manual", source: "CHARM", localPath: null,
    notes: "Covers 2002–2010 Explorer. Includes 4.0L V6 and 4.6L V8.",
  },
  {
    id: "ford-explorer-2011-2019-workshop",
    make: "Ford", model: "Explorer",
    yearStart: 2011, yearEnd: 2019,
    variant: "5th generation, unibody", engine: null, transmission: null, drivetrain: null,
    category: "Workshop Manual", source: "CHARM", localPath: null,
    notes: "Covers 2011–2019 Explorer. Unibody platform. Includes 2.0L EcoBoost, 3.5L V6.",
  },

  // ── Ford Mustang ────────────────────────────────────────────────────────────
  {
    id: "ford-mustang-1994-2004-workshop",
    make: "Ford", model: "Mustang",
    yearStart: 1994, yearEnd: 2004,
    variant: "SN95 platform", engine: null, transmission: null, drivetrain: null,
    category: "Workshop Manual", source: "CHARM", localPath: null,
    notes: "Covers 1994–2004 Mustang. SN95 and New Edge. GT, V6, SVT Cobra variants.",
  },
  {
    id: "ford-mustang-2005-2014-workshop",
    make: "Ford", model: "Mustang",
    yearStart: 2005, yearEnd: 2014,
    variant: "S197 platform", engine: null, transmission: null, drivetrain: null,
    category: "Workshop Manual", source: "CHARM", localPath: null,
    notes: "Covers 2005–2014 Mustang. S197 platform. GT, V6, Shelby GT500.",
  },
  {
    id: "ford-mustang-2015-2023-workshop",
    make: "Ford", model: "Mustang",
    yearStart: 2015, yearEnd: 2023,
    variant: "S550 platform", engine: null, transmission: null, drivetrain: null,
    category: "Workshop Manual", source: "CHARM", localPath: null,
    notes: "Covers 2015–2023 Mustang. S550 platform. EcoBoost, GT, GT350, GT500.",
  },

  // ── Chevrolet Silverado 1500 ────────────────────────────────────────────────
  {
    id: "chevy-silverado1500-1999-2006-workshop",
    make: "Chevrolet", model: "Silverado 1500",
    yearStart: 1999, yearEnd: 2006,
    variant: "GMT800 platform", engine: null, transmission: null, drivetrain: null,
    category: "Workshop Manual", source: "CHARM", localPath: null,
    notes: "Covers 1999–2006 Silverado 1500. GMT800 platform. Shares platform with GMC Sierra.",
  },
  {
    id: "chevy-silverado1500-2007-2013-workshop",
    make: "Chevrolet", model: "Silverado 1500",
    yearStart: 2007, yearEnd: 2013,
    variant: "GMT900 platform", engine: null, transmission: null, drivetrain: null,
    category: "Workshop Manual", source: "CHARM", localPath: null,
    notes: "Covers 2007–2013 Silverado 1500. GMT900. Shares platform with GMC Sierra, Tahoe, Yukon.",
  },
  {
    id: "chevy-silverado1500-2014-2018-workshop",
    make: "Chevrolet", model: "Silverado 1500",
    yearStart: 2014, yearEnd: 2018,
    variant: "K2XX platform", engine: null, transmission: null, drivetrain: null,
    category: "Workshop Manual", source: "CHARM", localPath: null,
    notes: "Covers 2014–2018 Silverado 1500. K2XX platform. Shares with GMC Sierra, Tahoe, Suburban.",
  },
  {
    id: "chevy-silverado1500-2019-2024-workshop",
    make: "Chevrolet", model: "Silverado 1500",
    yearStart: 2019, yearEnd: 2024,
    variant: "T1XX platform", engine: null, transmission: null, drivetrain: null,
    category: "Workshop Manual", source: "CHARM", localPath: null,
    notes: "Covers 2019–2024 Silverado 1500. T1XX platform. Includes 10-speed transmission.",
  },

  // ── Chevrolet Tahoe ─────────────────────────────────────────────────────────
  {
    id: "chevy-tahoe-2000-2006-workshop",
    make: "Chevrolet", model: "Tahoe",
    yearStart: 2000, yearEnd: 2006,
    variant: "GMT800 platform", engine: null, transmission: null, drivetrain: null,
    category: "Workshop Manual", source: "CHARM", localPath: null,
    notes: "Covers 2000–2006 Tahoe. GMT800 platform shared with Suburban, Yukon, Silverado.",
  },
  {
    id: "chevy-tahoe-2007-2014-workshop",
    make: "Chevrolet", model: "Tahoe",
    yearStart: 2007, yearEnd: 2014,
    variant: "GMT900 platform", engine: null, transmission: null, drivetrain: null,
    category: "Workshop Manual", source: "CHARM", localPath: null,
    notes: "Covers 2007–2014 Tahoe. GMT900 platform. AFM (Active Fuel Management) introduced.",
  },
  {
    id: "chevy-tahoe-2015-2024-workshop",
    make: "Chevrolet", model: "Tahoe",
    yearStart: 2015, yearEnd: 2024,
    variant: "K2XX/T1XX platform", engine: null, transmission: null, drivetrain: null,
    category: "Workshop Manual", source: "CHARM", localPath: null,
    notes: "Covers 2015–2024 Tahoe. K2XX (2015–2020) and T1XX (2021+) platforms.",
  },

  // ── Chevrolet Malibu ────────────────────────────────────────────────────────
  {
    id: "chevy-malibu-2004-2012-workshop",
    make: "Chevrolet", model: "Malibu",
    yearStart: 2004, yearEnd: 2012,
    variant: "6th/7th generation", engine: null, transmission: null, drivetrain: null,
    category: "Workshop Manual", source: "CHARM", localPath: null,
    notes: "Covers 2004–2012 Malibu (including Maxx variant 2004–2007).",
  },
  {
    id: "chevy-malibu-2013-2023-workshop",
    make: "Chevrolet", model: "Malibu",
    yearStart: 2013, yearEnd: 2023,
    variant: "8th/9th generation", engine: null, transmission: null, drivetrain: null,
    category: "Workshop Manual", source: "CHARM", localPath: null,
    notes: "Covers 2013–2023 Malibu. Epsilon II platform. 1.5L/2.0L turbo engines.",
  },

  // ── Chevrolet Impala ────────────────────────────────────────────────────────
  {
    id: "chevy-impala-2000-2005-workshop",
    make: "Chevrolet", model: "Impala",
    yearStart: 2000, yearEnd: 2005,
    variant: "8th generation", engine: null, transmission: null, drivetrain: null,
    category: "Workshop Manual", source: "CHARM", localPath: null,
    notes: "Covers 2000–2005 Impala. W-Body platform. 3.4L and 3.8L V6.",
  },
  {
    id: "chevy-impala-2006-2013-workshop",
    make: "Chevrolet", model: "Impala",
    yearStart: 2006, yearEnd: 2013,
    variant: "9th generation", engine: null, transmission: null, drivetrain: null,
    category: "Workshop Manual", source: "CHARM", localPath: null,
    notes: "Covers 2006–2013 Impala. W-Body refresh. 3.5L, 3.9L, 5.3L V8 (SS).",
  },
  {
    id: "chevy-impala-2014-2020-workshop",
    make: "Chevrolet", model: "Impala",
    yearStart: 2014, yearEnd: 2020,
    variant: "10th generation", engine: null, transmission: null, drivetrain: null,
    category: "Workshop Manual", source: "CHARM", localPath: null,
    notes: "Covers 2014–2020 Impala. Epsilon II platform. 2.5L I4 and 3.6L V6.",
  },

  // ── Toyota Camry ────────────────────────────────────────────────────────────
  {
    id: "toyota-camry-2002-2006-workshop",
    make: "Toyota", model: "Camry",
    yearStart: 2002, yearEnd: 2006,
    variant: "XV30 generation", engine: null, transmission: null, drivetrain: null,
    category: "Workshop Manual", source: "CHARM", localPath: null,
    notes: "Covers 2002–2006 Camry. XV30 platform. 2.4L I4 and 3.3L V6.",
  },
  {
    id: "toyota-camry-2007-2011-workshop",
    make: "Toyota", model: "Camry",
    yearStart: 2007, yearEnd: 2011,
    variant: "XV40 generation", engine: null, transmission: null, drivetrain: null,
    category: "Workshop Manual", source: "CHARM", localPath: null,
    notes: "Covers 2007–2011 Camry. XV40 platform. 2.4L/2.5L I4 and 3.5L V6.",
  },
  {
    id: "toyota-camry-2012-2017-workshop",
    make: "Toyota", model: "Camry",
    yearStart: 2012, yearEnd: 2017,
    variant: "XV50 generation", engine: null, transmission: null, drivetrain: null,
    category: "Workshop Manual", source: "CHARM", localPath: null,
    notes: "Covers 2012–2017 Camry. XV50 platform. 2.5L I4 and 3.5L V6.",
  },
  {
    id: "toyota-camry-2018-2024-workshop",
    make: "Toyota", model: "Camry",
    yearStart: 2018, yearEnd: 2024,
    variant: "XV70 generation, TNGA platform", engine: null, transmission: null, drivetrain: null,
    category: "Workshop Manual", source: "CHARM", localPath: null,
    notes: "Covers 2018–2024 Camry. TNGA-K platform. 2.5L I4, 3.5L V6, and Hybrid.",
  },

  // ── Toyota Corolla ──────────────────────────────────────────────────────────
  {
    id: "toyota-corolla-2003-2008-workshop",
    make: "Toyota", model: "Corolla",
    yearStart: 2003, yearEnd: 2008,
    variant: "E130 generation", engine: null, transmission: null, drivetrain: null,
    category: "Workshop Manual", source: "CHARM", localPath: null,
    notes: "Covers 2003–2008 Corolla. E130 platform. 1.8L I4.",
  },
  {
    id: "toyota-corolla-2009-2019-workshop",
    make: "Toyota", model: "Corolla",
    yearStart: 2009, yearEnd: 2019,
    variant: "E140/E170 generation", engine: null, transmission: null, drivetrain: null,
    category: "Workshop Manual", source: "CHARM", localPath: null,
    notes: "Covers 2009–2019 Corolla. 1.8L I4. Includes E140 (2009–2013) and E170 (2014–2019).",
  },
  {
    id: "toyota-corolla-2020-2024-workshop",
    make: "Toyota", model: "Corolla",
    yearStart: 2020, yearEnd: 2024,
    variant: "E210 generation, TNGA platform", engine: null, transmission: null, drivetrain: null,
    category: "Workshop Manual", source: "CHARM", localPath: null,
    notes: "Covers 2020–2024 Corolla. TNGA-C platform. 2.0L and Hybrid variants.",
  },

  // ── Honda Accord ────────────────────────────────────────────────────────────
  {
    id: "honda-accord-2003-2007-workshop",
    make: "Honda", model: "Accord",
    yearStart: 2003, yearEnd: 2007,
    variant: "7th generation", engine: null, transmission: null, drivetrain: null,
    category: "Workshop Manual", source: "CHARM", localPath: null,
    notes: "Covers 2003–2007 Accord. 2.4L I4 and 3.0L V6. Sedan and Coupe.",
  },
  {
    id: "honda-accord-2008-2012-workshop",
    make: "Honda", model: "Accord",
    yearStart: 2008, yearEnd: 2012,
    variant: "8th generation", engine: null, transmission: null, drivetrain: null,
    category: "Workshop Manual", source: "CHARM", localPath: null,
    notes: "Covers 2008–2012 Accord. 2.4L I4 and 3.5L V6.",
  },
  {
    id: "honda-accord-2013-2017-workshop",
    make: "Honda", model: "Accord",
    yearStart: 2013, yearEnd: 2017,
    variant: "9th generation", engine: null, transmission: null, drivetrain: null,
    category: "Workshop Manual", source: "CHARM", localPath: null,
    notes: "Covers 2013–2017 Accord. 2.4L I4 and 3.5L V6. CVT and 6-speed manual available.",
  },
  {
    id: "honda-accord-2018-2024-workshop",
    make: "Honda", model: "Accord",
    yearStart: 2018, yearEnd: 2024,
    variant: "10th generation", engine: null, transmission: null, drivetrain: null,
    category: "Workshop Manual", source: "CHARM", localPath: null,
    notes: "Covers 2018–2024 Accord. 1.5L and 2.0L turbocharged I4. Hybrid variant.",
  },

  // ── Honda Civic ─────────────────────────────────────────────────────────────
  {
    id: "honda-civic-2001-2005-workshop",
    make: "Honda", model: "Civic",
    yearStart: 2001, yearEnd: 2005,
    variant: "7th generation", engine: null, transmission: null, drivetrain: null,
    category: "Workshop Manual", source: "CHARM", localPath: null,
    notes: "Covers 2001–2005 Civic. 1.7L I4. Sedan, Coupe, Hatchback variants.",
  },
  {
    id: "honda-civic-2006-2011-workshop",
    make: "Honda", model: "Civic",
    yearStart: 2006, yearEnd: 2011,
    variant: "8th generation", engine: null, transmission: null, drivetrain: null,
    category: "Workshop Manual", source: "CHARM", localPath: null,
    notes: "Covers 2006–2011 Civic. 1.8L I4. Includes Si (2.0L) and Hybrid variants.",
  },
  {
    id: "honda-civic-2012-2015-workshop",
    make: "Honda", model: "Civic",
    yearStart: 2012, yearEnd: 2015,
    variant: "9th generation", engine: null, transmission: null, drivetrain: null,
    category: "Workshop Manual", source: "CHARM", localPath: null,
    notes: "Covers 2012–2015 Civic. 1.8L I4. Includes Si (2.4L) variant.",
  },
  {
    id: "honda-civic-2016-2021-workshop",
    make: "Honda", model: "Civic",
    yearStart: 2016, yearEnd: 2021,
    variant: "10th generation", engine: null, transmission: null, drivetrain: null,
    category: "Workshop Manual", source: "CHARM", localPath: null,
    notes: "Covers 2016–2021 Civic. 1.5L Turbo and 2.0L I4. Si and Type R variants.",
  },
  {
    id: "honda-civic-2022-2024-workshop",
    make: "Honda", model: "Civic",
    yearStart: 2022, yearEnd: 2024,
    variant: "11th generation", engine: null, transmission: null, drivetrain: null,
    category: "Workshop Manual", source: "CHARM", localPath: null,
    notes: "Covers 2022–2024 Civic. 1.5L Turbo (sedan/hatch) and 2.0L N/A.",
  },

  // ── Nissan Altima ───────────────────────────────────────────────────────────
  {
    id: "nissan-altima-2002-2006-workshop",
    make: "Nissan", model: "Altima",
    yearStart: 2002, yearEnd: 2006,
    variant: "L31 generation", engine: null, transmission: null, drivetrain: null,
    category: "Workshop Manual", source: "CHARM", localPath: null,
    notes: "Covers 2002–2006 Altima. 2.5L I4 and 3.5L V6.",
  },
  {
    id: "nissan-altima-2007-2012-workshop",
    make: "Nissan", model: "Altima",
    yearStart: 2007, yearEnd: 2012,
    variant: "L32 generation", engine: null, transmission: null, drivetrain: null,
    category: "Workshop Manual", source: "CHARM", localPath: null,
    notes: "Covers 2007–2012 Altima. 2.5L I4 and 3.5L V6. CVT standard on I4.",
  },
  {
    id: "nissan-altima-2013-2018-workshop",
    make: "Nissan", model: "Altima",
    yearStart: 2013, yearEnd: 2018,
    variant: "L33 generation", engine: null, transmission: null, drivetrain: null,
    category: "Workshop Manual", source: "CHARM", localPath: null,
    notes: "Covers 2013–2018 Altima. 2.5L I4 and 3.5L V6.",
  },
  {
    id: "nissan-altima-2019-2024-workshop",
    make: "Nissan", model: "Altima",
    yearStart: 2019, yearEnd: 2024,
    variant: "L34 generation", engine: null, transmission: null, drivetrain: null,
    category: "Workshop Manual", source: "CHARM", localPath: null,
    notes: "Covers 2019–2024 Altima. 2.5L I4 standard. VC-Turbo 2.0L Turbo available.",
  },

  // ── Nissan Sentra ───────────────────────────────────────────────────────────
  {
    id: "nissan-sentra-2000-2006-workshop",
    make: "Nissan", model: "Sentra",
    yearStart: 2000, yearEnd: 2006,
    variant: "B15 generation", engine: null, transmission: null, drivetrain: null,
    category: "Workshop Manual", source: "CHARM", localPath: null,
    notes: "Covers 2000–2006 Sentra. 1.8L I4 standard. SE-R with 2.5L.",
  },
  {
    id: "nissan-sentra-2007-2012-workshop",
    make: "Nissan", model: "Sentra",
    yearStart: 2007, yearEnd: 2012,
    variant: "B16 generation", engine: null, transmission: null, drivetrain: null,
    category: "Workshop Manual", source: "CHARM", localPath: null,
    notes: "Covers 2007–2012 Sentra. 2.0L I4.",
  },
  {
    id: "nissan-sentra-2013-2019-workshop",
    make: "Nissan", model: "Sentra",
    yearStart: 2013, yearEnd: 2019,
    variant: "B17 generation", engine: null, transmission: null, drivetrain: null,
    category: "Workshop Manual", source: "CHARM", localPath: null,
    notes: "Covers 2013–2019 Sentra. 1.8L I4. CVT transmission.",
  },
  {
    id: "nissan-sentra-2020-2024-workshop",
    make: "Nissan", model: "Sentra",
    yearStart: 2020, yearEnd: 2024,
    variant: "B18 generation", engine: null, transmission: null, drivetrain: null,
    category: "Workshop Manual", source: "CHARM", localPath: null,
    notes: "Covers 2020–2024 Sentra. 2.0L I4 with CVT.",
  },

  // ── Dodge / Ram 1500 ────────────────────────────────────────────────────────
  {
    id: "ram-1500-2002-2008-workshop",
    make: "Dodge", model: "Ram 1500",
    yearStart: 2002, yearEnd: 2008,
    variant: "DR/DH generation", engine: null, transmission: null, drivetrain: null,
    category: "Workshop Manual", source: "CHARM", localPath: null,
    notes: "Covers 2002–2008 Dodge Ram 1500. Includes 4.7L V8, 5.7L Hemi.",
  },
  {
    id: "ram-1500-2009-2018-workshop",
    make: "Ram", model: "1500",
    yearStart: 2009, yearEnd: 2018,
    variant: "DS/DJ generation (Ram brand split from Dodge in 2011)", engine: null, transmission: null, drivetrain: null,
    category: "Workshop Manual", source: "CHARM", localPath: null,
    notes: "Covers 2009–2018 Ram 1500. 3.6L V6, 5.7L Hemi, 3.0L EcoDiesel. Ram became standalone brand in 2011.",
  },
  {
    id: "ram-1500-2019-2024-workshop",
    make: "Ram", model: "1500",
    yearStart: 2019, yearEnd: 2024,
    variant: "DT generation, lightweight", engine: null, transmission: null, drivetrain: null,
    category: "Workshop Manual", source: "CHARM", localPath: null,
    notes: "Covers 2019–2024 Ram 1500. Coil spring rear suspension. 8-speed ZF auto standard.",
  },

  // ── Jeep Wrangler ───────────────────────────────────────────────────────────
  {
    id: "jeep-wrangler-1997-2006-workshop",
    make: "Jeep", model: "Wrangler",
    yearStart: 1997, yearEnd: 2006,
    variant: "TJ generation", engine: null, transmission: null, drivetrain: "4WD",
    category: "Workshop Manual", source: "CHARM", localPath: null,
    notes: "Covers 1997–2006 Wrangler TJ. 2.5L I4 and 4.0L I6. Dana 30/44 axles.",
  },
  {
    id: "jeep-wrangler-2007-2018-workshop",
    make: "Jeep", model: "Wrangler",
    yearStart: 2007, yearEnd: 2018,
    variant: "JK generation", engine: null, transmission: null, drivetrain: "4WD",
    category: "Workshop Manual", source: "CHARM", localPath: null,
    notes: "Covers 2007–2018 Wrangler JK. 3.6L Pentastar V6. Includes 2-door and Unlimited (4-door).",
  },
  {
    id: "jeep-wrangler-2018-2024-workshop",
    make: "Jeep", model: "Wrangler",
    yearStart: 2018, yearEnd: 2024,
    variant: "JL generation", engine: null, transmission: null, drivetrain: "4WD",
    category: "Workshop Manual", source: "CHARM", localPath: null,
    notes: "Covers 2018–2024 Wrangler JL. 2.0L Turbo and 3.6L V6. 4xe Hybrid variant.",
  },

  // ── Jeep Grand Cherokee ─────────────────────────────────────────────────────
  {
    id: "jeep-grand-cherokee-1999-2004-workshop",
    make: "Jeep", model: "Grand Cherokee",
    yearStart: 1999, yearEnd: 2004,
    variant: "WJ generation", engine: null, transmission: null, drivetrain: null,
    category: "Workshop Manual", source: "CHARM", localPath: null,
    notes: "Covers 1999–2004 Grand Cherokee WJ. 4.0L I6 and 4.7L V8.",
  },
  {
    id: "jeep-grand-cherokee-2005-2010-workshop",
    make: "Jeep", model: "Grand Cherokee",
    yearStart: 2005, yearEnd: 2010,
    variant: "WK generation", engine: null, transmission: null, drivetrain: null,
    category: "Workshop Manual", source: "CHARM", localPath: null,
    notes: "Covers 2005–2010 Grand Cherokee WK. 3.7L V6, 4.7L and 5.7L Hemi V8.",
  },
  {
    id: "jeep-grand-cherokee-2011-2021-workshop",
    make: "Jeep", model: "Grand Cherokee",
    yearStart: 2011, yearEnd: 2021,
    variant: "WK2 generation", engine: null, transmission: null, drivetrain: null,
    category: "Workshop Manual", source: "CHARM", localPath: null,
    notes: "Covers 2011–2021 Grand Cherokee WK2. 3.6L V6, 5.7L and 6.4L Hemi V8.",
  },

  // ── GMC Sierra 1500 ─────────────────────────────────────────────────────────
  {
    id: "gmc-sierra1500-1999-2006-workshop",
    make: "GMC", model: "Sierra 1500",
    yearStart: 1999, yearEnd: 2006,
    variant: "GMT800 platform", engine: null, transmission: null, drivetrain: null,
    category: "Workshop Manual", source: "CHARM", localPath: null,
    notes: "Covers 1999–2006 GMC Sierra 1500. Mechanically identical to Chevy Silverado same year.",
  },
  {
    id: "gmc-sierra1500-2007-2013-workshop",
    make: "GMC", model: "Sierra 1500",
    yearStart: 2007, yearEnd: 2013,
    variant: "GMT900 platform", engine: null, transmission: null, drivetrain: null,
    category: "Workshop Manual", source: "CHARM", localPath: null,
    notes: "Covers 2007–2013 GMC Sierra 1500. GMT900 platform shared with Silverado, Yukon, Tahoe.",
  },
  {
    id: "gmc-sierra1500-2014-2024-workshop",
    make: "GMC", model: "Sierra 1500",
    yearStart: 2014, yearEnd: 2024,
    variant: "K2XX/T1XX platform", engine: null, transmission: null, drivetrain: null,
    category: "Workshop Manual", source: "CHARM", localPath: null,
    notes: "Covers 2014–2024 GMC Sierra 1500. K2XX and T1XX platforms shared with Silverado.",
  },

  // ── Hyundai Elantra ─────────────────────────────────────────────────────────
  {
    id: "hyundai-elantra-2001-2006-workshop",
    make: "Hyundai", model: "Elantra",
    yearStart: 2001, yearEnd: 2006,
    variant: "XD generation", engine: null, transmission: null, drivetrain: null,
    category: "Workshop Manual", source: "CHARM", localPath: null,
    notes: "Covers 2001–2006 Elantra. 2.0L I4.",
  },
  {
    id: "hyundai-elantra-2007-2010-workshop",
    make: "Hyundai", model: "Elantra",
    yearStart: 2007, yearEnd: 2010,
    variant: "HD generation", engine: null, transmission: null, drivetrain: null,
    category: "Workshop Manual", source: "CHARM", localPath: null,
    notes: "Covers 2007–2010 Elantra. 2.0L I4.",
  },
  {
    id: "hyundai-elantra-2011-2015-workshop",
    make: "Hyundai", model: "Elantra",
    yearStart: 2011, yearEnd: 2015,
    variant: "MD/UD generation", engine: null, transmission: null, drivetrain: null,
    category: "Workshop Manual", source: "CHARM", localPath: null,
    notes: "Covers 2011–2015 Elantra. 1.8L I4.",
  },
  {
    id: "hyundai-elantra-2016-2020-workshop",
    make: "Hyundai", model: "Elantra",
    yearStart: 2016, yearEnd: 2020,
    variant: "AD generation", engine: null, transmission: null, drivetrain: null,
    category: "Workshop Manual", source: "CHARM", localPath: null,
    notes: "Covers 2016–2020 Elantra. 2.0L I4 and 1.4L Turbo.",
  },
  {
    id: "hyundai-elantra-2021-2024-workshop",
    make: "Hyundai", model: "Elantra",
    yearStart: 2021, yearEnd: 2024,
    variant: "CN7 generation", engine: null, transmission: null, drivetrain: null,
    category: "Workshop Manual", source: "CHARM", localPath: null,
    notes: "Covers 2021–2024 Elantra. 2.0L I4 standard. Hybrid and N variants available.",
  },

  // ── Kia Soul ────────────────────────────────────────────────────────────────
  {
    id: "kia-soul-2010-2013-workshop",
    make: "Kia", model: "Soul",
    yearStart: 2010, yearEnd: 2013,
    variant: "AM generation, 1st gen", engine: null, transmission: null, drivetrain: null,
    category: "Workshop Manual", source: "CHARM", localPath: null,
    notes: "Covers 2010–2013 Kia Soul. 1.6L and 2.0L I4 engines.",
  },
  {
    id: "kia-soul-2014-2019-workshop",
    make: "Kia", model: "Soul",
    yearStart: 2014, yearEnd: 2019,
    variant: "PS generation, 2nd gen", engine: null, transmission: null, drivetrain: null,
    category: "Workshop Manual", source: "CHARM", localPath: null,
    notes: "Covers 2014–2019 Kia Soul. 1.6L Turbo and 2.0L I4. Includes EV variant.",
  },
  {
    id: "kia-soul-2020-2024-workshop",
    make: "Kia", model: "Soul",
    yearStart: 2020, yearEnd: 2024,
    variant: "SK3 generation, 3rd gen", engine: null, transmission: null, drivetrain: null,
    category: "Workshop Manual", source: "CHARM", localPath: null,
    notes: "Covers 2020–2024 Kia Soul. 2.0L I4 and Turbo 1.6L. EV on separate platform.",
  },
];

// ─── Matching helpers ─────────────────────────────────────────────────────────

function normalizeStr(s) {
  return String(s || "")
    .toLowerCase()
    .replace(/[\s\-]/g, "")
    .trim();
}

// Produces a stable key used only for quick lookup — NOT for display.
export function normalizeVehicleKey(year, make, model) {
  return `${parseInt(year, 10) || 0}|${normalizeStr(make)}|${normalizeStr(model)}`;
}

// Returns all manualRefs records that match a given vehicle object.
// vehicle must have: { year, make, model }. engine/variant are optional filters.
export function findManualRefsForVehicle(vehicle) {
  if (!vehicle?.make || !vehicle?.model) return [];
  const makeLow = normalizeStr(vehicle.make);
  const modelLow = normalizeStr(vehicle.model);
  const year = parseInt(vehicle.year, 10) || 0;

  return manualRefs.filter((ref) => {
    // Make must match exactly (after normalization)
    if (normalizeStr(ref.make) !== makeLow) return false;

    // Model: ref model must appear in vehicle model OR vehicle model appears in ref model
    const refModelLow = normalizeStr(ref.model);
    if (!modelLow.includes(refModelLow) && !refModelLow.includes(modelLow)) return false;

    // Year range: if vehicle has a year, it must fall within the ref's range
    if (year && (year < ref.yearStart || year > ref.yearEnd)) return false;

    return true;
  });
}

// Builds search links for a vehicle against all manual sources.
// Returns an array of { source, name, url, attribution } objects.
export function buildManualSearchLinks(vehicle) {
  if (!vehicle?.make || !vehicle?.model) return [];

  const parts = [vehicle.year, vehicle.make, vehicle.model, "service manual"].filter(Boolean);
  const q = parts.join(" ");

  return Object.values(manualSources).map((src) => ({
    source: src.id,
    name: src.name,
    url: src.searchUrl(q),
    attribution: src.attribution,
  }));
}

export const MANUAL_ATTRIBUTION = "Manual reference from LEMON Manuals / Operation CHARM archive.";
