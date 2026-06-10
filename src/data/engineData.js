// HoundMoto Engine Database
// Key: "Make|Model"  Value: array of engine descriptors
// label  – display text shown in dropdown and confirmation
// disp   – displacement string used in search queries
// vinCode – VIN 8th digit ("" when not applicable or unknown)
// fuelType – Gas | Diesel | Flex Fuel | Hybrid | Electric
// years  – [start, end] inclusive (null end = still produced)

const E = (label, disp, vinCode, fuelType, years) => ({ label, disp, vinCode, fuelType, years });

export const enginesByVehicle = {
  // ── FORD ─────────────────────────────────────────────────────────────────
  "Ford|F-150": [
    E("3.3L V6 Ti-VCT",               "3.3L V6",          "",  "Gas",      [2018, null]),
    E("2.7L V6 EcoBoost",             "2.7L V6 EcoBoost", "",  "Gas",      [2015, null]),
    E("3.5L V6 EcoBoost",             "3.5L V6 EcoBoost", "",  "Gas",      [2011, null]),
    E("3.5L V6 PowerBoost Hybrid",    "3.5L V6 Hybrid",   "",  "Hybrid",   [2021, null]),
    E("5.0L V8 Coyote VIN F",         "5.0L V8",          "F", "Gas",      [2011, null]),
    E("4.6L V8 VIN W (2-valve)",      "4.6L V8",          "W", "Gas",      [1997, 2010]),
    E("4.6L V8 VIN 6 (3-valve)",      "4.6L V8",          "6", "Gas",      [2004, 2010]),
    E("5.4L V8 Triton VIN L",         "5.4L V8",          "L", "Gas",      [1997, 2014]),
    E("5.4L V8 VIN A (SuperCrew)",    "5.4L V8",          "A", "Gas",      [2010, 2014]),
    E("6.2L V8 VIN 8",                "6.2L V8",          "8", "Gas",      [2010, 2014]),
    E("3.0L V6 Power Stroke Diesel",  "3.0L V6 Diesel",   "",  "Diesel",   [2018, null]),
  ],
  "Ford|F-250 Super Duty": [
    E("6.2L V8 VIN 8",                "6.2L V8",          "8", "Gas",      [2011, null]),
    E("7.3L V8 Gas VIN 3",            "7.3L V8",          "3", "Gas",      [2020, null]),
    E("5.4L V8 Triton VIN L",         "5.4L V8",          "L", "Gas",      [1999, 2010]),
    E("6.8L V10 VIN S",               "6.8L V10",         "S", "Gas",      [1999, 2019]),
    E("6.0L V8 Power Stroke Diesel",  "6.0L V8 Diesel",   "P", "Diesel",   [2003, 2007]),
    E("6.4L V8 Power Stroke Diesel",  "6.4L V8 Diesel",   "",  "Diesel",   [2008, 2010]),
    E("6.7L I6 Power Stroke Diesel",  "6.7L Diesel",      "T", "Diesel",   [2011, null]),
  ],
  "Ford|Mustang": [
    E("2.3L EcoBoost 4-Cylinder",     "2.3L 4-Cyl EcoBoost", "", "Gas",   [2015, null]),
    E("3.7L V6 VIN 7",                "3.7L V6",          "7", "Gas",      [2011, 2017]),
    E("3.8L V6 VIN 4",                "3.8L V6",          "4", "Gas",      [1994, 2004]),
    E("4.0L V6 VIN N",                "4.0L V6",          "N", "Gas",      [2005, 2010]),
    E("4.6L GT V8 VIN X (3-valve)",   "4.6L V8",          "X", "Gas",      [2005, 2010]),
    E("5.0L Coyote V8 VIN F (GT)",    "5.0L V8",          "F", "Gas",      [2011, null]),
    E("5.2L V8 Voodoo VIN R (GT350)", "5.2L V8",          "R", "Gas",      [2016, 2020]),
    E("5.4L V8 Supercharged (GT500)", "5.4L V8",          "L", "Gas",      [2007, 2012]),
    E("5.8L V8 Supercharged (GT500)", "5.8L V8",          "",  "Gas",      [2013, 2014]),
    E("5.0L V8 Supercharged (GT500)", "5.0L V8",          "F", "Gas",      [2020, null]),
  ],
  "Ford|Explorer": [
    E("2.3L EcoBoost 4-Cyl",         "2.3L 4-Cyl EcoBoost", "", "Gas",    [2016, null]),
    E("3.0L V6 EcoBoost Hybrid",     "3.0L V6 Hybrid",   "",  "Hybrid",   [2020, null]),
    E("3.5L V6 VIN T",               "3.5L V6",          "T", "Gas",      [2011, 2019]),
    E("3.5L V6 EcoBoost",            "3.5L V6 EcoBoost", "",  "Gas",      [2013, 2019]),
    E("4.0L V6 SOHC VIN E",          "4.0L V6",          "E", "Gas",      [2002, 2010]),
    E("4.6L V8 VIN W",               "4.6L V8",          "W", "Gas",      [2002, 2010]),
  ],
  "Ford|Expedition": [
    E("3.5L V6 EcoBoost",            "3.5L V6 EcoBoost", "",  "Gas",      [2018, null]),
    E("5.4L V8 VIN L",               "5.4L V8",          "L", "Gas",      [2003, 2017]),
    E("4.6L V8 VIN W",               "4.6L V8",          "W", "Gas",      [1997, 2002]),
  ],
  "Ford|Fusion": [
    E("1.5L EcoBoost 4-Cyl",         "1.5L 4-Cyl EcoBoost", "", "Gas",   [2014, 2020]),
    E("2.0L EcoBoost 4-Cyl",         "2.0L 4-Cyl EcoBoost", "", "Gas",   [2013, 2020]),
    E("2.5L Duratec 4-Cyl VIN 5",    "2.5L 4-Cyl",       "5", "Gas",      [2010, 2020]),
    E("2.5L 4-Cyl Hybrid",           "2.5L Hybrid",      "",  "Hybrid",   [2010, 2020]),
    E("3.0L Duratec V6 VIN 1",       "3.0L V6",          "1", "Gas",      [2006, 2012]),
  ],
  "Ford|Edge": [
    E("2.0L EcoBoost 4-Cyl",         "2.0L 4-Cyl EcoBoost", "", "Gas",   [2015, null]),
    E("2.7L V6 EcoBoost",            "2.7L V6 EcoBoost", "",  "Gas",      [2019, null]),
    E("3.5L Ti-VCT V6",              "3.5L V6",          "",  "Gas",      [2011, 2018]),
    E("2.0L EcoBoost VIN 9",         "2.0L 4-Cyl",       "9", "Gas",      [2011, 2014]),
  ],
  "Ford|Focus": [
    E("2.0L Duratec 4-Cyl VIN 5",    "2.0L 4-Cyl",       "5", "Gas",      [2012, 2018]),
    E("1.0L EcoBoost 3-Cyl",         "1.0L 3-Cyl",       "",  "Gas",      [2015, 2018]),
    E("2.0L Focus RS",               "2.0L 4-Cyl EcoBoost", "", "Gas",    [2016, 2018]),
  ],
  "Ford|Ranger": [
    E("2.3L EcoBoost 4-Cyl",         "2.3L 4-Cyl EcoBoost", "", "Gas",    [2019, null]),
    E("2.3L DOHC VIN D",             "2.3L 4-Cyl",       "D", "Gas",      [1995, 2011]),
    E("3.0L V6 VIN U",               "3.0L V6",          "U", "Gas",      [1991, 2009]),
    E("4.0L V6 SOHC VIN E",          "4.0L V6",          "E", "Gas",      [1997, 2011]),
  ],
  "Ford|Transit": [
    E("3.5L V6 EcoBoost",            "3.5L V6 EcoBoost", "",  "Gas",      [2020, null]),
    E("3.5L Ti-VCT V6",              "3.5L V6",          "",  "Gas",      [2015, 2019]),
    E("2.0L EcoBlue Diesel",         "2.0L Diesel",      "",  "Diesel",   [2020, null]),
    E("3.2L I5 Power Stroke Diesel", "3.2L Diesel",      "",  "Diesel",   [2015, 2019]),
  ],

  // ── CHEVROLET ─────────────────────────────────────────────────────────────
  "Chevrolet|Silverado 1500": [
    E("4.3L V6 VIN W",               "4.3L V6",          "W", "Gas",      [1999, null]),
    E("5.3L V8 VIN T",               "5.3L V8",          "T", "Gas",      [1999, 2013]),
    E("5.3L V8 VIN Z Flex Fuel",     "5.3L V8",          "Z", "Flex Fuel",[2001, 2018]),
    E("5.3L V8 VIN 3 EcoTec3",       "5.3L V8",          "3", "Gas",      [2014, null]),
    E("5.3L V8 VIN 0 EcoTec3 Flex",  "5.3L V8",          "0", "Flex Fuel",[2014, null]),
    E("6.2L V8 VIN 6 EcoTec3",       "6.2L V8",          "6", "Gas",      [2014, null]),
    E("6.0L V8 VIN U",               "6.0L V8",          "U", "Gas",      [2007, 2019]),
    E("4.8L V8 VIN V",               "4.8L V8",          "V", "Gas",      [1999, 2013]),
    E("3.0L I6 Duramax Diesel",      "3.0L Diesel",      "4", "Diesel",   [2020, null]),
  ],
  "Chevrolet|Silverado 2500HD": [
    E("6.0L V8 VIN U",               "6.0L V8",          "U", "Gas",      [2001, 2019]),
    E("6.6L V8 Duramax LB7 Diesel",  "6.6L Diesel",      "1", "Diesel",   [2001, 2004]),
    E("6.6L V8 Duramax LLY Diesel",  "6.6L Diesel",      "2", "Diesel",   [2004, 2005]),
    E("6.6L V8 Duramax LBZ Diesel",  "6.6L Diesel",      "D", "Diesel",   [2006, 2007]),
    E("6.6L V8 Duramax LMM Diesel",  "6.6L Diesel",      "6", "Diesel",   [2007, 2010]),
    E("6.6L V8 Duramax LML Diesel",  "6.6L Diesel",      "8", "Diesel",   [2011, 2016]),
    E("6.6L V8 Duramax L5P Diesel",  "6.6L Diesel",      "L", "Diesel",   [2017, null]),
    E("6.6L V8 Duramax L8T Gas",     "6.6L V8",          "J", "Gas",      [2020, null]),
  ],
  "Chevrolet|Suburban": [
    E("5.3L V8 VIN T",               "5.3L V8",          "T", "Gas",      [2000, 2013]),
    E("5.3L V8 VIN Z Flex Fuel",     "5.3L V8",          "Z", "Flex Fuel",[2001, 2013]),
    E("5.3L V8 VIN 3 EcoTec3",       "5.3L V8",          "3", "Gas",      [2014, null]),
    E("6.0L V8 VIN U",               "6.0L V8",          "U", "Gas",      [2000, 2013]),
    E("6.2L V8 VIN 6 EcoTec3",       "6.2L V8",          "6", "Gas",      [2015, null]),
    E("3.0L I6 Duramax Diesel",      "3.0L Diesel",      "4", "Diesel",   [2021, null]),
  ],
  "Chevrolet|Tahoe": [
    E("5.3L V8 VIN T",               "5.3L V8",          "T", "Gas",      [2000, 2013]),
    E("5.3L V8 VIN Z Flex Fuel",     "5.3L V8",          "Z", "Flex Fuel",[2001, 2013]),
    E("5.3L V8 VIN 3 EcoTec3",       "5.3L V8",          "3", "Gas",      [2014, null]),
    E("6.0L V8 VIN U",               "6.0L V8",          "U", "Gas",      [2000, 2013]),
    E("6.2L V8 VIN 6 EcoTec3",       "6.2L V8",          "6", "Gas",      [2015, null]),
    E("3.0L I6 Duramax Diesel",      "3.0L Diesel",      "4", "Diesel",   [2021, null]),
  ],
  "Chevrolet|Camaro": [
    E("2.0L Turbo 4-Cyl",            "2.0L 4-Cyl Turbo", "",  "Gas",      [2016, null]),
    E("3.6L V6 VIN 3",               "3.6L V6",          "3", "Gas",      [2010, null]),
    E("6.2L V8 LS3 VIN W",           "6.2L V8",          "W", "Gas",      [2010, 2015]),
    E("6.2L V8 LT1 VIN G",           "6.2L V8",          "G", "Gas",      [2016, null]),
    E("6.2L V8 Supercharged ZL1",    "6.2L V8",          "E", "Gas",      [2012, null]),
  ],
  "Chevrolet|Colorado": [
    E("2.5L 4-Cyl VIN 6",            "2.5L 4-Cyl",       "6", "Gas",      [2015, null]),
    E("3.6L V6 VIN 3",               "3.6L V6",          "3", "Gas",      [2015, null]),
    E("2.8L Duramax Diesel",         "2.8L Diesel",      "H", "Diesel",   [2016, null]),
  ],
  "Chevrolet|Equinox": [
    E("1.5L Turbo 4-Cyl",            "1.5L 4-Cyl Turbo", "",  "Gas",      [2018, null]),
    E("2.0L Turbo 4-Cyl",            "2.0L 4-Cyl Turbo", "",  "Gas",      [2018, null]),
    E("1.6L Diesel",                 "1.6L Diesel",      "",  "Diesel",   [2018, 2020]),
    E("2.4L DOHC 4-Cyl VIN B",       "2.4L 4-Cyl",       "B", "Gas",      [2010, 2017]),
    E("3.0L V6 VIN 5",               "3.0L V6",          "5", "Gas",      [2010, 2012]),
    E("3.6L V6 VIN 3",               "3.6L V6",          "3", "Gas",      [2012, 2017]),
  ],
  "Chevrolet|Malibu": [
    E("1.5L Turbo 4-Cyl",            "1.5L 4-Cyl Turbo", "",  "Gas",      [2016, null]),
    E("2.0L Turbo 4-Cyl",            "2.0L 4-Cyl Turbo", "",  "Gas",      [2016, null]),
    E("2.4L DOHC 4-Cyl VIN B",       "2.4L 4-Cyl",       "B", "Gas",      [2013, 2016]),
    E("3.5L V6 VIN N",               "3.5L V6",          "N", "Gas",      [2006, 2010]),
    E("3.6L V6 VIN 3",               "3.6L V6",          "3", "Gas",      [2010, 2012]),
  ],
  "Chevrolet|Cruze": [
    E("1.4L Turbo 4-Cyl VIN B",      "1.4L 4-Cyl Turbo", "B", "Gas",     [2011, 2019]),
    E("1.8L 4-Cyl VIN 2",            "1.8L 4-Cyl",       "2", "Gas",      [2011, 2016]),
    E("2.0L Diesel 4-Cyl",           "2.0L Diesel",      "",  "Diesel",   [2014, 2016]),
  ],

  // ── GMC ───────────────────────────────────────────────────────────────────
  "GMC|Sierra 1500": [
    E("4.3L V6 VIN W",               "4.3L V6",          "W", "Gas",      [1999, null]),
    E("5.3L V8 VIN T",               "5.3L V8",          "T", "Gas",      [1999, 2013]),
    E("5.3L V8 VIN Z Flex Fuel",     "5.3L V8",          "Z", "Flex Fuel",[2001, 2018]),
    E("5.3L V8 VIN 3 EcoTec3",       "5.3L V8",          "3", "Gas",      [2014, null]),
    E("5.3L V8 VIN 0 EcoTec3 Flex",  "5.3L V8",          "0", "Flex Fuel",[2014, null]),
    E("6.2L V8 VIN 6 EcoTec3",       "6.2L V8",          "6", "Gas",      [2014, null]),
    E("6.0L V8 VIN U",               "6.0L V8",          "U", "Gas",      [2007, 2019]),
    E("4.8L V8 VIN V",               "4.8L V8",          "V", "Gas",      [1999, 2013]),
    E("3.0L I6 Duramax Diesel",      "3.0L Diesel",      "4", "Diesel",   [2020, null]),
  ],
  "GMC|Sierra 2500HD": [
    E("6.0L V8 VIN U",               "6.0L V8",          "U", "Gas",      [2001, 2019]),
    E("6.6L V8 Duramax LB7 Diesel",  "6.6L Diesel",      "1", "Diesel",   [2001, 2004]),
    E("6.6L V8 Duramax LBZ Diesel",  "6.6L Diesel",      "D", "Diesel",   [2006, 2007]),
    E("6.6L V8 Duramax LMM Diesel",  "6.6L Diesel",      "6", "Diesel",   [2007, 2010]),
    E("6.6L V8 Duramax LML Diesel",  "6.6L Diesel",      "8", "Diesel",   [2011, 2016]),
    E("6.6L V8 Duramax L5P Diesel",  "6.6L Diesel",      "L", "Diesel",   [2017, null]),
    E("6.6L V8 Duramax L8T Gas",     "6.6L V8",          "J", "Gas",      [2020, null]),
  ],
  "GMC|Yukon": [
    E("5.3L V8 VIN T",               "5.3L V8",          "T", "Gas",      [2000, 2013]),
    E("5.3L V8 VIN 3 EcoTec3",       "5.3L V8",          "3", "Gas",      [2015, null]),
    E("6.2L V8 VIN 6 EcoTec3",       "6.2L V8",          "6", "Gas",      [2015, null]),
    E("6.0L V8 VIN U",               "6.0L V8",          "U", "Gas",      [2000, 2013]),
    E("3.0L I6 Duramax Diesel",      "3.0L Diesel",      "4", "Diesel",   [2021, null]),
  ],
  "GMC|Canyon": [
    E("2.5L 4-Cyl VIN 6",            "2.5L 4-Cyl",       "6", "Gas",      [2015, null]),
    E("3.6L V6 VIN 3",               "3.6L V6",          "3", "Gas",      [2015, null]),
    E("2.8L Duramax Diesel",         "2.8L Diesel",      "H", "Diesel",   [2016, null]),
  ],

  // ── DODGE / RAM ───────────────────────────────────────────────────────────
  "RAM|1500": [
    E("3.6L Pentastar V6 VIN G",     "3.6L V6",          "G", "Gas",      [2011, null]),
    E("5.7L Hemi V8 VIN D",          "5.7L V8 Hemi",     "D", "Gas",      [2002, null]),
    E("3.0L V6 EcoDiesel VIN D",     "3.0L V6 Diesel",   "D", "Diesel",   [2014, null]),
    E("6.4L Hemi V8 VIN A (TRX)",    "6.4L V8 Hemi",     "A", "Gas",      [2021, null]),
    E("5.7L Hemi V8 eTorque Hybrid", "5.7L V8 Hybrid",   "",  "Hybrid",   [2019, null]),
  ],
  "RAM|2500": [
    E("6.4L Hemi V8 VIN A",          "6.4L V8 Hemi",     "A", "Gas",      [2014, null]),
    E("5.7L Hemi V8 VIN D",          "5.7L V8 Hemi",     "D", "Gas",      [2002, 2013]),
    E("6.7L I6 Cummins Diesel",      "6.7L Diesel",      "L", "Diesel",   [2007, null]),
    E("5.9L I6 Cummins Diesel",      "5.9L Diesel",      "C", "Diesel",   [1989, 2007]),
  ],
  "RAM|3500": [
    E("6.4L Hemi V8 VIN A",          "6.4L V8 Hemi",     "A", "Gas",      [2014, null]),
    E("6.7L I6 Cummins Diesel",      "6.7L Diesel",      "L", "Diesel",   [2007, null]),
    E("5.9L I6 Cummins Diesel",      "5.9L Diesel",      "C", "Diesel",   [1989, 2007]),
  ],
  "Dodge|Charger": [
    E("3.6L Pentastar V6 VIN G",     "3.6L V6",          "G", "Gas",      [2011, null]),
    E("5.7L Hemi V8 VIN D",          "5.7L V8 Hemi",     "D", "Gas",      [2006, null]),
    E("6.4L Hemi V8 SRT VIN A",      "6.4L V8 Hemi",     "A", "Gas",      [2012, null]),
    E("6.2L Supercharged Hellcat",   "6.2L V8",          "R", "Gas",      [2015, null]),
  ],
  "Dodge|Challenger": [
    E("3.6L Pentastar V6 VIN G",     "3.6L V6",          "G", "Gas",      [2011, null]),
    E("5.7L Hemi V8 VIN D",          "5.7L V8 Hemi",     "D", "Gas",      [2009, null]),
    E("6.4L Hemi V8 SRT VIN A",      "6.4L V8 Hemi",     "A", "Gas",      [2011, null]),
    E("6.2L Supercharged Hellcat",   "6.2L V8",          "R", "Gas",      [2015, null]),
    E("6.2L Supercharged Demon",     "6.2L V8",          "R", "Gas",      [2018, 2018]),
  ],
  "Dodge|Durango": [
    E("3.6L Pentastar V6",           "3.6L V6",          "G", "Gas",      [2011, null]),
    E("5.7L Hemi V8 VIN D",          "5.7L V8 Hemi",     "D", "Gas",      [2004, null]),
    E("6.4L Hemi V8 SRT",            "6.4L V8 Hemi",     "A", "Gas",      [2018, null]),
    E("6.2L Supercharged Hellcat",   "6.2L V8",          "R", "Gas",      [2021, 2021]),
  ],
  "Dodge|Grand Caravan": [
    E("3.6L Pentastar V6 VIN G",     "3.6L V6",          "G", "Gas",      [2011, 2021]),
    E("3.8L V6 VIN L",               "3.8L V6",          "L", "Gas",      [2001, 2010]),
  ],

  // ── JEEP ──────────────────────────────────────────────────────────────────
  "Jeep|Grand Cherokee": [
    E("3.6L Pentastar V6 VIN G",     "3.6L V6",          "G", "Gas",      [2011, null]),
    E("5.7L Hemi V8 VIN D",          "5.7L V8 Hemi",     "D", "Gas",      [2005, null]),
    E("6.4L Hemi V8 SRT",            "6.4L V8 Hemi",     "A", "Gas",      [2012, null]),
    E("6.2L Supercharged Trackhawk", "6.2L V8",          "R", "Gas",      [2018, 2021]),
    E("3.0L EcoDiesel V6",           "3.0L V6 Diesel",   "D", "Diesel",   [2014, null]),
    E("4.0L I6 VIN S",               "4.0L I6",          "S", "Gas",      [1993, 2004]),
  ],
  "Jeep|Wrangler": [
    E("3.6L Pentastar V6 VIN G",     "3.6L V6",          "G", "Gas",      [2012, null]),
    E("2.0L Turbo 4-Cyl",            "2.0L 4-Cyl Turbo", "",  "Gas",      [2018, null]),
    E("6.4L Hemi V8 Rubicon 392",    "6.4L V8 Hemi",     "A", "Gas",      [2021, null]),
    E("3.0L EcoDiesel V6",           "3.0L V6 Diesel",   "D", "Diesel",   [2020, null]),
    E("4.0L I6 VIN S",               "4.0L I6",          "S", "Gas",      [1987, 2006]),
  ],
  "Jeep|Cherokee": [
    E("2.4L Tigershark 4-Cyl",       "2.4L 4-Cyl",       "B", "Gas",      [2014, null]),
    E("3.2L Pentastar V6",           "3.2L V6",          "",  "Gas",      [2014, null]),
    E("2.0L Turbo 4-Cyl",            "2.0L 4-Cyl Turbo", "",  "Gas",      [2019, null]),
    E("4.0L I6 VIN S",               "4.0L I6",          "S", "Gas",      [1991, 2001]),
  ],

  // ── TOYOTA ────────────────────────────────────────────────────────────────
  "Toyota|Camry": [
    E("2.5L 4-Cyl DOHC (2AR-FE)",    "2.5L 4-Cyl",       "",  "Gas",      [2012, null]),
    E("3.5L V6 DOHC (2GR-FE)",       "3.5L V6",          "",  "Gas",      [2007, null]),
    E("2.5L 4-Cyl Hybrid (A25A)",    "2.5L Hybrid",      "",  "Hybrid",   [2018, null]),
    E("2.4L 4-Cyl (2AZ-FE)",         "2.4L 4-Cyl",       "",  "Gas",      [2002, 2011]),
  ],
  "Toyota|Corolla": [
    E("2.0L 4-Cyl (M20A-FKS)",       "2.0L 4-Cyl",       "",  "Gas",      [2019, null]),
    E("1.8L 4-Cyl (2ZR-FE)",         "1.8L 4-Cyl",       "",  "Gas",      [2009, 2019]),
    E("1.8L Hybrid",                 "1.8L Hybrid",      "",  "Hybrid",   [2020, null]),
  ],
  "Toyota|Tacoma": [
    E("2.7L 4-Cyl (2TR-FE)",         "2.7L 4-Cyl",       "",  "Gas",      [2005, null]),
    E("3.5L V6 (2GR-FKS)",           "3.5L V6",          "",  "Gas",      [2016, null]),
    E("4.0L V6 (1GR-FE)",            "4.0L V6",          "",  "Gas",      [2005, 2015]),
  ],
  "Toyota|Tundra": [
    E("3.5L Twin-Turbo V6 (V35A)",   "3.5L V6 Turbo",    "",  "Gas",      [2022, null]),
    E("3.5L V6 Hybrid (V35A)",       "3.5L V6 Hybrid",   "",  "Hybrid",   [2022, null]),
    E("5.7L V8 (3UR-FE)",            "5.7L V8",          "",  "Gas",      [2007, 2021]),
    E("4.6L V8 (1UR-FE)",            "4.6L V8",          "",  "Gas",      [2010, 2021]),
    E("4.7L V8 (2UZ-FE)",            "4.7L V8",          "",  "Gas",      [2000, 2009]),
  ],
  "Toyota|4Runner": [
    E("4.0L V6 (1GR-FE)",            "4.0L V6",          "",  "Gas",      [2003, null]),
    E("2.7L 4-Cyl (2TR-FE)",         "2.7L 4-Cyl",       "",  "Gas",      [2010, null]),
    E("3.4L V6 (5VZ-FE)",            "3.4L V6",          "",  "Gas",      [1996, 2002]),
  ],
  "Toyota|RAV4": [
    E("2.5L 4-Cyl (A25A-FKS)",       "2.5L 4-Cyl",       "",  "Gas",      [2019, null]),
    E("2.5L Hybrid (A25A-FXS)",      "2.5L Hybrid",      "",  "Hybrid",   [2019, null]),
    E("2.5L 4-Cyl PHEV",             "2.5L Plug-In Hybrid", "", "Hybrid", [2021, null]),
    E("2.5L 4-Cyl (2AR-FE)",         "2.5L 4-Cyl",       "",  "Gas",      [2013, 2018]),
    E("2.0L 4-Cyl (3ZR-FE)",         "2.0L 4-Cyl",       "",  "Gas",      [2006, 2012]),
  ],
  "Toyota|Highlander": [
    E("2.4L Turbo 4-Cyl (T24A)",     "2.4L 4-Cyl Turbo", "",  "Gas",      [2020, null]),
    E("2.5L Hybrid (A25A)",          "2.5L Hybrid",      "",  "Hybrid",   [2020, null]),
    E("3.5L V6 (2GR-FKS)",           "3.5L V6",          "",  "Gas",      [2014, 2019]),
    E("3.5L V6 Hybrid",              "3.5L V6 Hybrid",   "",  "Hybrid",   [2006, null]),
    E("3.3L V6 (3MZ-FE)",            "3.3L V6",          "",  "Gas",      [2001, 2007]),
  ],
  "Toyota|Prius": [
    E("1.8L 4-Cyl Hybrid (2ZR-FXE)", "1.8L Hybrid",      "",  "Hybrid",   [2010, 2022]),
    E("2.0L 4-Cyl Hybrid",           "2.0L Hybrid",      "",  "Hybrid",   [2023, null]),
    E("1.5L 4-Cyl Hybrid (1NZ-FXE)", "1.5L Hybrid",      "",  "Hybrid",   [2001, 2009]),
  ],
  "Toyota|Sienna": [
    E("2.5L 4-Cyl AWD Hybrid",       "2.5L Hybrid",      "",  "Hybrid",   [2021, null]),
    E("3.5L V6 (2GR-FKS)",           "3.5L V6",          "",  "Gas",      [2011, 2020]),
    E("3.3L V6 (3MZ-FE)",            "3.3L V6",          "",  "Gas",      [2004, 2010]),
  ],

  // ── HONDA ─────────────────────────────────────────────────────────────────
  "Honda|Accord": [
    E("1.5L Turbo 4-Cyl (L15B7)",    "1.5L 4-Cyl Turbo", "",  "Gas",      [2018, null]),
    E("2.0L Turbo 4-Cyl (K20C4)",    "2.0L 4-Cyl Turbo", "",  "Gas",      [2018, null]),
    E("2.0L 4-Cyl Hybrid (LFD)",     "2.0L Hybrid",      "",  "Hybrid",   [2018, null]),
    E("2.4L i-VTEC 4-Cyl (K24W1)",   "2.4L 4-Cyl",       "",  "Gas",      [2013, 2017]),
    E("3.5L SOHC V6 (J35Y1)",        "3.5L V6",          "",  "Gas",      [2013, 2017]),
    E("2.4L i-VTEC 4-Cyl (K24Z3)",   "2.4L 4-Cyl",       "",  "Gas",      [2008, 2012]),
  ],
  "Honda|Civic": [
    E("2.0L Turbo 4-Cyl Si",         "2.0L 4-Cyl Turbo", "",  "Gas",      [2017, null]),
    E("1.5L Turbo 4-Cyl (L15B7)",    "1.5L 4-Cyl Turbo", "",  "Gas",      [2016, null]),
    E("2.0L DOHC 4-Cyl (R20V1)",     "2.0L 4-Cyl",       "",  "Gas",      [2016, null]),
    E("1.8L SOHC 4-Cyl (R18Z1)",     "1.8L 4-Cyl",       "",  "Gas",      [2012, 2015]),
    E("1.5L i-VTEC 4-Cyl (L15A7)",   "1.5L 4-Cyl",       "",  "Gas",      [2012, 2015]),
  ],
  "Honda|CR-V": [
    E("1.5L Turbo 4-Cyl (L15BE)",    "1.5L 4-Cyl Turbo", "",  "Gas",      [2017, null]),
    E("2.0L 4-Cyl Hybrid",           "2.0L Hybrid",      "",  "Hybrid",   [2020, null]),
    E("2.4L i-VTEC 4-Cyl (K24Z7)",   "2.4L 4-Cyl",       "",  "Gas",      [2012, 2016]),
    E("2.0L 4-Cyl DOHC (R20A1)",     "2.0L 4-Cyl",       "",  "Gas",      [2007, 2011]),
  ],
  "Honda|Pilot": [
    E("3.5L DOHC V6 (J35YP)",        "3.5L V6",          "",  "Gas",      [2016, null]),
    E("3.5L SOHC V6 (J35Z4)",        "3.5L V6",          "",  "Gas",      [2009, 2015]),
  ],
  "Honda|Odyssey": [
    E("3.5L DOHC V6 (J35YA)",        "3.5L V6",          "",  "Gas",      [2018, null]),
    E("3.5L SOHC V6 (J35Z6)",        "3.5L V6",          "",  "Gas",      [2011, 2017]),
    E("3.5L SOHC V6 (J35A6)",        "3.5L V6",          "",  "Gas",      [2005, 2010]),
  ],

  // ── NISSAN ────────────────────────────────────────────────────────────────
  "Nissan|Altima": [
    E("2.5L 4-Cyl DOHC (QR25DE)",    "2.5L 4-Cyl",       "",  "Gas",      [2002, null]),
    E("3.5L V6 DOHC (VQ35DE)",       "3.5L V6",          "",  "Gas",      [2002, 2018]),
    E("2.0L VC-Turbo 4-Cyl",         "2.0L 4-Cyl Turbo", "",  "Gas",      [2019, null]),
  ],
  "Nissan|Frontier": [
    E("3.8L V6 (VQ38DD)",            "3.8L V6",          "",  "Gas",      [2022, null]),
    E("4.0L V6 DOHC (VQ40DE)",       "4.0L V6",          "",  "Gas",      [2005, 2021]),
    E("2.5L 4-Cyl (QR25DE)",         "2.5L 4-Cyl",       "",  "Gas",      [2005, 2019]),
  ],
  "Nissan|Titan": [
    E("5.6L V8 DOHC (VK56VD)",       "5.6L V8",          "",  "Gas",      [2016, null]),
    E("5.6L V8 DOHC (VK56DE)",       "5.6L V8",          "",  "Gas",      [2004, 2015]),
    E("5.0L V8 Cummins Diesel",      "5.0L V8 Diesel",   "",  "Diesel",   [2016, 2019]),
  ],
  "Nissan|Pathfinder": [
    E("3.5L V6 DOHC (VR30DDTT)",     "3.5L V6",          "",  "Gas",      [2022, null]),
    E("3.5L V6 DOHC (VQ35DD)",       "3.5L V6",          "",  "Gas",      [2013, 2021]),
    E("4.0L V6 DOHC (VQ40DE)",       "4.0L V6",          "",  "Gas",      [2005, 2012]),
  ],

  // ── SUBARU ────────────────────────────────────────────────────────────────
  "Subaru|Outback": [
    E("2.5L Boxer 4-Cyl (FA25)",      "2.5L 4-Cyl",       "",  "Gas",      [2020, null]),
    E("2.5L Boxer 4-Cyl (FB25B)",     "2.5L 4-Cyl",       "",  "Gas",      [2010, 2019]),
    E("3.6L Boxer 6-Cyl (EZ36D)",     "3.6L 6-Cyl",       "",  "Gas",      [2010, 2019]),
    E("2.5L Turbo Boxer (EJ255)",     "2.5L 4-Cyl Turbo", "",  "Gas",      [2005, 2009]),
  ],
  "Subaru|Forester": [
    E("2.5L Boxer 4-Cyl (FA25)",      "2.5L 4-Cyl",       "",  "Gas",      [2019, null]),
    E("2.5L Boxer 4-Cyl (FB25B)",     "2.5L 4-Cyl",       "",  "Gas",      [2011, 2018]),
    E("2.0L Hybrid Boxer",            "2.0L Hybrid",      "",  "Hybrid",   [2019, null]),
  ],
  "Subaru|WRX": [
    E("2.5L Turbo Boxer (EJ255/EJ257)","2.5L 4-Cyl Turbo","",  "Gas",      [2006, 2021]),
    E("2.0L Turbo Boxer FA20DIT",      "2.0L 4-Cyl Turbo","",  "Gas",      [2015, 2021]),
    E("2.4L Turbo Boxer (FA24F)",      "2.4L 4-Cyl Turbo","",  "Gas",      [2022, null]),
  ],
  "Subaru|Impreza": [
    E("2.0L Boxer 4-Cyl (FB20B)",     "2.0L 4-Cyl",       "",  "Gas",      [2012, null]),
    E("2.5L Boxer 4-Cyl (EJ253)",     "2.5L 4-Cyl",       "",  "Gas",      [2008, 2011]),
  ],

  // ── HYUNDAI / KIA ─────────────────────────────────────────────────────────
  "Hyundai|Elantra": [
    E("2.0L MPI 4-Cyl (NU)",          "2.0L 4-Cyl",       "",  "Gas",      [2011, null]),
    E("1.4L Turbo 4-Cyl",             "1.4L 4-Cyl Turbo", "",  "Gas",      [2017, null]),
    E("1.6L Turbo 4-Cyl (U3)",        "1.6L 4-Cyl Turbo", "",  "Gas",      [2017, null]),
  ],
  "Hyundai|Sonata": [
    E("2.5L MPI 4-Cyl",               "2.5L 4-Cyl",       "",  "Gas",      [2020, null]),
    E("1.6L Turbo 4-Cyl",             "1.6L 4-Cyl Turbo", "",  "Gas",      [2015, null]),
    E("2.5L Turbo 4-Cyl (N-Line)",    "2.5L 4-Cyl Turbo", "",  "Gas",      [2020, null]),
    E("2.4L GDI 4-Cyl",               "2.4L 4-Cyl",       "",  "Gas",      [2011, 2019]),
  ],
  "Kia|Sorento": [
    E("2.5L MPI 4-Cyl",               "2.5L 4-Cyl",       "",  "Gas",      [2021, null]),
    E("2.5L Turbo 4-Cyl",             "2.5L 4-Cyl Turbo", "",  "Gas",      [2021, null]),
    E("2.5L 4-Cyl PHEV",              "2.5L Plug-In Hybrid","", "Hybrid",  [2021, null]),
    E("3.3L V6 Lambda",               "3.3L V6",          "",  "Gas",      [2016, 2020]),
    E("2.4L GDI 4-Cyl",               "2.4L 4-Cyl",       "",  "Gas",      [2011, 2015]),
  ],

  // ── BMW ───────────────────────────────────────────────────────────────────
  "BMW|3 Series": [
    E("2.0L TwinPower Turbo I4 (B48)", "2.0L 4-Cyl Turbo","",  "Gas",      [2016, null]),
    E("3.0L TwinPower Turbo I6 (B58)", "3.0L 6-Cyl Turbo","",  "Gas",      [2016, null]),
    E("2.0L TwinPower I4 (N20/N26)",   "2.0L 4-Cyl Turbo","",  "Gas",      [2012, 2015]),
    E("3.0L TwinPower I6 (N55)",       "3.0L 6-Cyl Turbo","",  "Gas",      [2012, 2015]),
    E("3.0L I6 (N52)",                 "3.0L 6-Cyl",      "",  "Gas",      [2006, 2011]),
    E("2.0L Diesel (B47)",             "2.0L Diesel",     "",  "Diesel",   [2016, null]),
  ],
  "BMW|5 Series": [
    E("2.0L TwinPower Turbo I4 (B48)", "2.0L 4-Cyl Turbo","",  "Gas",      [2017, null]),
    E("3.0L TwinPower Turbo I6 (B58)", "3.0L 6-Cyl Turbo","",  "Gas",      [2017, null]),
    E("4.4L TwinPower Turbo V8 (S63)", "4.4L V8 Turbo",   "",  "Gas",      [2012, null]),
    E("3.0L I6 Turbo (N54/N55)",       "3.0L 6-Cyl Turbo","",  "Gas",      [2010, 2016]),
    E("3.0L I6 (N52)",                 "3.0L 6-Cyl",      "",  "Gas",      [2006, 2010]),
    E("3.0L Diesel (B57)",             "3.0L 6-Cyl Diesel","",  "Diesel",  [2017, null]),
  ],

  // ── MERCEDES-BENZ ─────────────────────────────────────────────────────────
  "Mercedes-Benz|C-Class": [
    E("2.0L Turbo 4-Cyl (M274)",      "2.0L 4-Cyl Turbo","",   "Gas",     [2015, null]),
    E("3.0L Turbo V6 (M276)",         "3.0L V6 Turbo",   "",   "Gas",     [2015, null]),
    E("4.0L Biturbo V8 AMG (M177)",   "4.0L V8 Turbo",   "",   "Gas",     [2016, null]),
    E("2.0L Turbo 4-Cyl (M274)",      "2.0L 4-Cyl Turbo","",   "Hybrid",  [2016, null]),
  ],
  "Mercedes-Benz|E-Class": [
    E("2.0L Turbo 4-Cyl (M274/M282)","2.0L 4-Cyl Turbo", "",   "Gas",     [2017, null]),
    E("3.0L Turbo I6 (M256)",         "3.0L 6-Cyl Turbo","",   "Hybrid",  [2020, null]),
    E("4.0L Biturbo V8 AMG (M177)",   "4.0L V8 Turbo",   "",   "Gas",     [2017, null]),
    E("3.5L V6 (M276)",               "3.5L V6 Turbo",   "",   "Gas",     [2010, 2016]),
  ],
};

// ── VIN helpers ──────────────────────────────────────────────────────────────
const VIN_YEAR_MAP = {
  A:1980,B:1981,C:1982,D:1983,E:1984,F:1985,G:1986,H:1987,J:1988,K:1989,
  L:1990,M:1991,N:1992,P:1993,R:1994,S:1995,T:1996,V:1997,W:1998,X:1999,
  Y:2000,"1":2001,"2":2002,"3":2003,"4":2004,"5":2005,"6":2006,"7":2007,
  "8":2008,"9":2009,
};
// Letters repeat: A=2010, B=2011, … (cycle of 30 starting 1980)
// Easiest way: compute from character index in a known sequence
const YEAR_CHARS = "ABCDEFGHJKLMNPRSTVWXY123456789";
export function vinYearFromChar(c) {
  const up = c?.toUpperCase();
  if (!up) return null;
  // First cycle 1980–2009
  if (VIN_YEAR_MAP[up] != null) return VIN_YEAR_MAP[up];
  // Second cycle 2010–2039
  const idx = YEAR_CHARS.indexOf(up);
  if (idx !== -1) return 2010 + idx;
  return null;
}

export function parseVinHints(vin) {
  const v = vin?.trim().toUpperCase();
  if (!v || v.length !== 17) return null;
  const engineCode = v[7];       // position 8 (0-indexed: 7)
  const yearCode   = v[9];       // position 10 (0-indexed: 9)
  const year = vinYearFromChar(yearCode);
  return { engineCode, yearCode, year };
}

// ── Lookup helpers ───────────────────────────────────────────────────────────
export function getEnginesForVehicle(make, model, year) {
  const key = `${make}|${model}`;
  const all = enginesByVehicle[key];
  if (!all) return null; // no data for this vehicle
  const yr = parseInt(year, 10);
  if (!yr) return all; // no year filter
  return all.filter((e) => yr >= e.years[0] && (e.years[1] === null || yr <= e.years[1]));
}

// Given a VIN 8th-digit engine code, return matching engines from a list
export function matchEnginesByVinCode(engines, vinCode) {
  if (!vinCode || !engines) return [];
  return engines.filter((e) => e.vinCode && e.vinCode.toUpperCase() === vinCode.toUpperCase());
}

// Fallback labels for vehicles not in database — clean up raw displacement string
export function cleanEngineLabel(raw) {
  if (!raw) return raw;
  // Fix floating-point artifacts like "5.299999" -> "5.3L"
  return raw.replace(/(\d+\.\d{1,2})\d*/g, (_, n) => {
    const rounded = parseFloat(parseFloat(n).toFixed(1));
    return rounded.toString();
  });
}
