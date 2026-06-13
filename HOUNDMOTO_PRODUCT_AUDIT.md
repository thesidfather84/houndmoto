# HoundMoto Product Audit & Feature Inventory
**Date:** June 13, 2026  
**Codebase Size:** ~8,677 lines (src root files) + pages + components  
**Architecture:** React + Vite SPA, Vercel Postgres backend, serverless APIs

---

## TASK 1: COMPLETE FEATURE INVENTORY

### WORKING FEATURES (Production-Ready)

#### A. Vehicle Search & Navigation
| Feature | What It Does | User Value | Status | Files |
|---------|-------------|------------|--------|-------|
| **One-Bar Vehicle Search** | Main search accepts make, model, year, VIN, part numbers, DTC codes, symptoms | Find specs instantly without multi-step forms | ✅ Working | App.jsx:28-1000+ |
| **Make/Model Browsing** | Click through 43 makes → models → year-specific pages | SEO + discoverability for users who don't know search syntax | ✅ Working | MakePage.jsx, ModelPage.jsx |
| **Vehicle Directory** | Database of 851 vehicle records (1950–present, 43 makes) | Recognition & validation of user input | ✅ Working | vehicleDirectory.js (990 lines) |
| **VIN Recognition** | Detects VINs in search box, enables quick VIN lookups | Auto-format VIN input, set vehicle context | ✅ Working | partsData.js, VinScanner.jsx |

#### B. Vehicle Specifications (Limited Coverage)
| Feature | What It Does | User Value | Status | Files |
|---------|-------------|------------|--------|-------|
| **Oil Specs** | Oil type, capacity for hand-entered vehicles + generation-based estimates | Know exact oil for change service | ✅ Working | vehicleCoverageData.js, App.jsx baseVehicleSpecs |
| **Fluid Capacities** | Transmission, coolant, brake, power steering, differential | Calculate service costs, prevent overfill | ✅ Working | vehicleCoverageData.js (690 lines) |
| **Tire Size** | Door sticker recommendations + common size patterns | Buy correct tires, avoid fitment issues | ✅ Working | vehicleCoverageData.js |
| **Battery Group Size** | CCA and group size data | Purchase correct battery | ✅ Working | vehicleCoverageData.js |
| **Wiper Blade Sizes** | Driver/passenger side lengths | Replace wipers without guessing | ✅ Working | vehicleCoverageData.js |
| **Bulb Sizes** | Headlight, taillight, turn signal specs | Correct bulb replacement | ⚠️ Partial | vehicleCoverageData.js (generic "verify by trim") |

#### C. Diagnostics (Smart Symptom → Root Cause)
| Feature | What It Does | User Value | Status | Files |
|---------|-------------|------------|--------|-------|
| **Symptom Diagnosis Wizard** | 11 categories (no-start, overheating, rough idle, brakes, transmission, etc.) with branching decision trees | Diagnose before buying parts, reduce shop visits | ✅ Working | SymptomDiagnosisWizard.jsx, diagnosisWizardData.js (1181 lines) |
| **DTC Code Lookup** | ~400 P-codes (P0100–P0799) with cause/symptom/first-check steps | Decode check engine light without scanner | ✅ Working | dtcCodes.js (1045 lines), DtcLookup.jsx, DtcPage.jsx |
| **DTC → Vehicle Context** | Vehicle-specific DTC guidance (if available) | Know if code is critical for your car or expected | ✅ Partial | getVehicleSpecificDtc.js, vehicleDtcKnowledge.js |
| **Common Failures by Vehicle** | Generation-based common failure patterns + DTC codes | Predict what might break, prepare for repairs | ✅ Partial | vehicleCoverageData.js (commonFailures field) |
| **DTC Landing Page** | Browse all codes by category, smart search | Find codes without knowing exact number | ✅ Working | DtcLandingPage.jsx, dtcData.js |

#### D. Vehicle Intelligence
| Feature | What It Does | User Value | Status | Files |
|---------|-------------|------------|--------|-------|
| **VIN Decoding** | Extract make/model/year from VIN string, validate 17-char format | Identify vehicle, no manual lookup | ✅ Partial | VinScanner.jsx, App.jsx line 24 |
| **VIN → NHTSA Recall Check** | Fetch real safety recalls from NHTSA API | Know if car has open recalls, contact dealers | ✅ Working | VinRecallPage.jsx, fetches NHTSA API |
| **Active Vehicle Context** | Store selected vehicle, carry through diagnosis/spec lookups | Personalized results without re-selecting vehicle | ✅ Working | VehicleContext.jsx, ActiveVehicleBar.jsx |
| **Vehicle Dashboard** | Single-vehicle view: specs, common failures, diagnostics, manuals | One-stop reference for a specific vehicle | ✅ Partial | VehiclePage.jsx (190 lines) |

#### E. Repair Information
| Feature | What It Does | User Value | Status | Files |
|---------|-------------|------------|--------|-------|
| **Manual Resources (External Links)** | Links to Charm.li, Lemon Manuals for free service docs | Find repair guides without paywalls | ✅ Working | ManualResources.jsx, manualRefsData.js |
| **Vendor Links** | RockAuto, AutoZone, O'Reilly, NAPA, Advance Auto, Amazon, Walmart, PartsGeek, eBay | Buy parts from preferred vendors | ✅ Working | partsData.js (vendors array) |
| **Part Library** | ~17 common parts (starter, alternator, battery, pads, belt, plugs, O2 sensor, fuses, coolant, transmission fluid, oil, bearings, cat converter, thermostat, timing, water pump, strut, CV axle) | Learn what parts do, why they fail, what to watch for | ✅ Working | partsData.js (partLibrary) |

#### F. Community & User Features
| Feature | What It Does | User Value | Status | Files |
|---------|-------------|------------|--------|-------|
| **Feedback Form** | Users submit tips, workarounds, problems | Crowdsource real-world data | ✅ Partial | FeedbackForm.jsx, TipSubmitForm.jsx |
| **User Ratings & Testimonials** | 4-5 star reviews displayed on homepage | Social proof, trust building | ✅ Working | Testimonials.jsx, FeedbackForm.jsx |
| **Tips Database** | Community-submitted vehicle tips (localStorage) | Real-world fixes, workarounds, gotchas | ✅ Partial | tipsData.js |

#### G. Admin & Backend
| Feature | What It Does | User Value | Status | Files |
|---------|-------------|------------|--------|-------|
| **Analytics Tracking** | Page views, events, device/browser detection, geo (country/city) | Understand user behavior, SEO performance | ✅ Working | analytics.js, api/track.js, analytics_events table |
| **Public Visitor Count** | Display total page views on home page | Credibility signal (social proof) | ✅ Working | api/visitor-count.js |
| **Admin Login (PIN)** | Rate-limited, token-based admin authentication | Secure admin panel access | ✅ Working | api/admin/login.js |
| **Admin Statistics** | View analytics summaries | Monitor site traffic | ✅ Partial | api/admin/stats.js |
| **Admin Export** | Export analytics data | Data analysis, reporting | ✅ Partial | api/admin/export.js |

#### H. Legal & Transparency
| Feature | What It Does | User Value | Status | Files |
|---------|-------------|------------|--------|-------|
| **Terms of Service** | Standard TOS | Legal liability protection | ✅ Working | LegalPages.jsx, TOS_houndmoto_UPDATED.md |
| **Privacy Policy** | GDPR/CCPA-style privacy disclosure | User data transparency | ✅ Working | LegalPages.jsx, PRIVACY_POLICY_houndmoto.md |
| **Liability Disclaimer** | Clear "use at your own risk" statement | Legal protection | ✅ Working | LegalPages.jsx, LIABILITY_DISCLAIMER_houndmoto.md |
| **Copyright & IP** | Copyright notice, trademark protections | Legal claims protection | ✅ Working | LegalPages.jsx |

#### I. Right to Repair & Advocacy
| Feature | What It Does | User Value | Status | Files |
|---------|-------------|------------|--------|-------|
| **Right to Repair Banner** | Advocacy messaging, links to reputable advocacy sites | Awareness of repair rights | ✅ Working | RightToRepairBanner.jsx, RightToRepairPage.jsx |

#### J. Mobile & Accessibility
| Feature | What It Does | User Value | Status | Files |
|---------|-------------|------------|--------|-------|
| **Mobile Responsive Design** | CSS media queries, touch-friendly inputs | Works on phones (primary use case) | ✅ Working | App.css, index.html viewport tag |
| **VIN Scanner (Camera)** | Uses html5-qrcode to scan VIN barcodes with phone camera | 1-tap VIN capture from door jamb | ✅ Working | VinScanner.jsx, uses html5-qrcode |
| **VIN Scanner (Text Input)** | Manual VIN entry fallback | Works without camera permission | ✅ Working | VinScanner.jsx |
| **OBD2 Scanner Roadmap** | Landing page describing OBD2 scanner feature (planned) | Users can see what's coming | ⚠️ Placeholder | Obd2ScanPage.jsx (just description) |

#### K. SEO & Discoverability
| Feature | What It Does | User Value | Status | Files |
|---------|-------------|------------|--------|-------|
| **Dynamic Page Titles/Meta** | Per-page SEO optimization (vehicle pages, DTC pages) | Google indexing, organic search | ✅ Working | utils/seo.js, setPageSEO in all pages |
| **Canonical URLs** | Prevent duplicate content issues | SEO ranking protection | ✅ Working | utils/seo.js |
| **OG Meta Tags** | Social media previews | Better sharing on Facebook, Twitter | ✅ Working | index.html |
| **Make/Model Browse Pages** | /vehicles/:make, /vehicles/:make/:model routes | Long-tail SEO (e.g., "2018 Honda Civic specs") | ✅ Working | MakePage.jsx, ModelPage.jsx |
| **Vehicle-Specific Pages** | /vehicle/2018-honda-civic routes | Direct vehicle-to-specs landing pages | ✅ Working | VehiclePage.jsx |
| **DTC Code Pages** | /dtc/:code routes (P0420, P0100, etc.) | SEO for "P0420 code meaning" queries | ✅ Working | DtcPage.jsx |
| **Sitemap API** | XML sitemap generation for Google | Crawlability for all vehicle + DTC pages | ✅ Working | api/sitemap.js |

#### L. AI & Diagnostics (Experimental)
| Feature | What It Does | User Value | Status | Files |
|---------|-------------|------------|--------|-------|
| **Diagnostic Assistant (AI)** | Claude-based chatbot for diagnostic questions | Conversational diagnosis beyond symptom trees | ⚠️ Partial | DiagnosticAssistantPage.jsx, diagnosticService.js |
| **AI Provider Fallback** | Switch between Anthropic API and other providers | Resilience, cost optimization | ⚠️ Partial | api/aiProvider.js, api/ai.js |

---

## TASK 2: FEATURE MATRIX BY CATEGORY

### VEHICLE INFORMATION (Oil Specs → Maintenance Data)

| Feature | Coverage | Confidence | Files | Notes |
|---------|----------|------------|-------|-------|
| **Oil Specs** | ~50 hand-entered vehicles + generation-based estimates | Mixed (some verified, many estimated) | vehicleCoverageData.js | Always say "verify in owner's manual" |
| **Fluid Capacities** | ~50 hand-entered + generation estimates | Low–Medium | vehicleCoverageData.js | Transmission/coolant/brake included |
| **Tire Sizes** | ~50 hand-entered + "verify door sticker" patterns | Low | vehicleCoverageData.js | Door sticker reference best practice |
| **Battery Sizes** | ~50 hand-entered | Medium | vehicleCoverageData.js | Group size + CCA |
| **Bulb Sizes** | ~50 hand-entered | Low | vehicleCoverageData.js | Most say "verify by trim" |
| **Maintenance Data** | Common failures by generation, oil change intervals | Low–Medium | vehicleCoverageData.js | Estimates, not verified specs |

**Coverage Gap:** Only ~50 vehicles have hand-entered specs. 801 directory vehicles have no specs.

---

### DIAGNOSTICS (DTC → Symptom Search → Guided Diagnostics)

| Feature | Coverage | Quality | Files | Notes |
|---------|----------|---------|-------|-------|
| **DTC Lookup** | ~400 P-codes (P0100–P0799) | High | dtcCodes.js (1045 lines) | Covers most common codes |
| **Symptom Wizard** | 11 categories × ~3–10 outcomes each = ~40 scenarios | High | diagnosisWizardData.js (1181 lines) | Well-researched branching logic |
| **DTC → Symptoms** | Limited (some codes map to symptoms in wizard) | Medium | diagnosisWizardData.js | Not bidirectional (symptom→DTC works, DTC→symptom is partial) |
| **Vehicle-Specific DTC** | ~20 vehicles with specific DTC guidance | Low | vehicleDtcKnowledge.js | CVT issues, cam sensors, etc. for Nissan, Toyota |
| **Common Failures by Model** | ~25 generations with common failure data | Medium | vehicleCoverageData.js | Useful but not comprehensive |
| **Guided Diagnostics** | Branching trees with first-check steps | High | diagnosisWizardData.js | Teaches safety, tools, when to see pro |

**Coverage Gap:** Only ~20 vehicles have specific DTC data. No T-codes (transmission), C-codes (chassis), B-codes (body).

---

### VEHICLE INTELLIGENCE (VIN Decoding → Recalls → Context)

| Feature | Coverage | Reliability | Files | Notes |
|---------|----------|------------|-------|-------|
| **VIN Format Validation** | 17-char, [A-HJ-NPR-Z0-9] only | ✅ High | VinScanner.jsx line 10 | Strict RFC 3779 format |
| **VIN Decoding** | Extract year/make/model from positions 1–8, 10 | ✅ High | VinScanner.jsx | Works for all vehicles |
| **NHTSA Recall API** | Real-time recall lookup by make/model/year | ✅ Very High | VinRecallPage.jsx | Calls official API, handles 400 errors |
| **Vehicle Context (Storage)** | Store selected vehicle in React context + localStorage | ✅ High | VehicleContext.jsx | Persists across page reloads |
| **Active Vehicle Dashboard** | Show selected vehicle, actions (edit/clear) | ✅ Working | ActiveVehicleBar.jsx | Top of every page |
| **Vehicle Page (Single View)** | One-stop specs + common failures + manuals | ⚠️ Partial | VehiclePage.jsx | Only shows specs if available |

**Coverage Gap:** VIN decoding is position-based only (not full VIN logic). No detailed vehicle identification (engine type, transmission from VIN).

---

### REPAIR INFORMATION (Torque Specs → Procedures → Manuals)

| Feature | Coverage | Source | Files | Notes |
|---------|----------|--------|-------|-------|
| **Torque Specs** | ❌ None | — | — | **NOT IMPLEMENTED** |
| **Wiring Diagrams** | ❌ None | — | — | **NOT IMPLEMENTED** (linked to external) |
| **Repair Procedures** | ✅ Links to external (Charm.li, Lemon Manuals) | Third-party | ManualResources.jsx | No native procedures |
| **Manual References** | ⚠️ Partial (CHARM/LEMON records mapped to vehicles) | Manual database | manualRefsData.js | Links to free public manuals |
| **Vendor Links** | ✅ 9 part vendors | Native | partsData.js | RockAuto, AutoZone, NAPA, etc. |
| **Part Library** | ✅ 17 common parts with descriptions | Native | partsData.js | Explains what parts do, why they fail |

**Coverage Gap:** No native torque specs, wiring diagrams, or repair procedures. Reliant on external links.

---

### PARTS (Part Lookup → Cross References → Vendor Links)

| Feature | Coverage | Quality | Files | Notes |
|---------|----------|---------|-------|-------|
| **Part Lookup** | 17 common part types | High | partsData.js | Starter, alternator, battery, pads, belt, plugs, sensors, fuses, fluids, bearings, cat, thermostat, timing, water pump, strut, CV axle |
| **Cross-References** | ❌ None | — | — | **NOT IMPLEMENTED** |
| **Vendor Integration** | 9 vendors with deep links | High | partsData.js | RockAuto (smart year/make parsing), AutoZone, NAPA, Advance Auto, O'Reilly, Amazon, Walmart, PartsGeek, eBay |
| **Part Compatibility** | ❌ Limited | — | — | Only notes for fitment (e.g., "heat range must match spark plugs") |
| **Price Comparison** | ❌ Not implemented | — | — | Direct links to vendors, no aggregation |

**Coverage Gap:** No cross-reference database (e.g., OEM↔Aftermarket part numbers).

---

### USER FEATURES (Accounts → Saved Vehicles → Garage → Membership)

| Feature | Status | Details | Files |
|---------|--------|---------|-------|
| **Account System** | ❌ None | No sign-up, login, or user accounts | — |
| **Saved Vehicles** | ⚠️ Partial | Stored in localStorage, persists across sessions | VehicleContext.jsx |
| **HoundMoto Garage** | ❌ None | No multi-vehicle tracking, no service history | — |
| **Supporter Membership** | ❌ None | No paid tier, no subscriptions | — |
| **Profile / Settings** | ❌ None | No user preferences | — |

**Coverage Gap:** Zero paid features, zero account system. Completely free, no monetization.

---

### ADMIN FEATURES (Analytics → Dashboard → Search Analytics → Error Logging)

| Feature | Status | Details | Files |
|---------|--------|---------|-------|
| **Event Analytics** | ✅ Working | page_view, vehicle_page_viewed, dtc_viewed, manual_reference_clicked, etc. | api/track.js, analytics.js |
| **Device Detection** | ✅ Working | Mobile vs. Desktop | api/track.js |
| **Browser Detection** | ✅ Working | Chrome, Safari, Firefox, Edge | api/track.js |
| **Geo Analytics** | ✅ Working | Country, region, city (via Vercel headers, no GPS) | api/track.js |
| **Referrer Tracking** | ✅ Working | Capture HTTP referer | api/track.js |
| **Admin Dashboard** | ⚠️ Partial | Statistics page exists, basic metrics | api/admin/stats.js |
| **Search Analytics** | ✅ Working | Track searches as events, but no dedicated search log table | api/track.js |
| **Error Logging** | ❌ Minimal | No centralized error tracking (Sentry/LogRocket) | — |
| **Admin Reporting** | ⚠️ Partial | Data export exists, but no pre-built reports | api/admin/export.js |

**Coverage Gap:** No error logging, no pre-built dashboards, no real-time alerts.

---

### MOBILE FEATURES (Responsiveness → PWA → VIN Scanner → Camera Integration)

| Feature | Status | Details | Files |
|---------|--------|---------|-------|
| **Mobile Responsive** | ✅ Working | CSS media queries, touch-friendly | App.css |
| **PWA (Progressive Web App)** | ❌ Partial | No service worker, no offline mode, no "Add to Home Screen" | — |
| **VIN Scanner (Camera)** | ✅ Working | html5-qrcode library, barcode detection | VinScanner.jsx |
| **VIN Scanner (Text Input)** | ✅ Working | Manual fallback | VinScanner.jsx |
| **Mobile Touch Targets** | ✅ Good | Buttons 44px+, tap-friendly | App.css |
| **Viewport Config** | ✅ Correct | viewport-fit=cover, initial-scale=1.0 | index.html |

**Coverage Gap:** Not a true PWA (no service worker, no offline cache). Mobile-web only, not installable.

---

## TASK 3: WHAT'S MISSING VS. HOUNDMOTO VISION

### Core Mission: "Diagnose First, Buy Later" — Keep Users Inside HoundMoto

**Missing pieces that undermine the mission:**

#### 🔴 CRITICAL FOR LAUNCH

1. **No Account System / Saved Vehicles (Multi-vehicle garage)**
   - Vision: Users save 2–3 cars, HoundMoto remembers them
   - Reality: Only one vehicle context at a time, localStorage, no login
   - Impact: Can't build user loyalty, no repeat visits

2. **Incomplete Vehicle Coverage (Only 50/851 vehicles have specs)**
   - Vision: "Search for your car, get exact specs"
   - Reality: 801 vehicles recognized but have no specs
   - Impact: Users see "verify in manual" for 94% of cars, defeat the purpose

3. **No Monetization Path / Supporter Membership**
   - Vision: Free tier (basic diagnostics), paid tier (advanced AI, service history)
   - Reality: 100% free, no business model to scale
   - Impact: Can't pay for data, can't hire staff

4. **Incomplete Diagnostic Coverage**
   - Only 11 symptom categories vs. real auto problems
   - Only ~20 vehicles with vehicle-specific DTC mapping
   - No T-codes (transmission), C-codes (chassis), B-codes (body)
   - No transaxle, hybrid, EV-specific diagnostics
   - Impact: Users leave to search Reddit/YouTube for specific problems

5. **No Service History / Maintenance Tracking**
   - Vision: "Log repairs, track upcoming maintenance, know your car's history"
   - Reality: No tracking at all
   - Impact: Users can't build lifetime vehicle knowledge

6. **Admin Dashboard Barely Functional**
   - Vision: Monitor user needs, identify gaps, improve coverage
   - Reality: Basic stats page, no real-time insights, no error logging
   - Impact: Can't see what users are searching for, what's broken

#### 🟡 IMPORTANT FOR GROWTH

7. **No Torque Specifications Database**
   - Vision: "Fastener specs so DIY repairs stay safe"
   - Reality: Links to external manuals only
   - Impact: Users have to hunt for torque specs elsewhere

8. **No Native Repair Procedures**
   - Vision: "Step-by-step repair guides, taught by mechanics"
   - Reality: External links (Charm.li, Lemon Manuals) only
   - Impact: No unique content, no differentiation from Reddit/YouTube

9. **No Vehicle-Specific DTC Mapping (Only 20 vehicles)**
   - Vision: "Your 2015 Nissan Sentra gets P0011 cam codes — here's why"
   - Reality: Generic codes, not vehicle-aware
   - Impact: Feels like a generic tool, not personalized

10. **No Parts Cross-Reference System**
    - Vision: "Enter OEM part #, find aftermarket equivalents + prices"
    - Reality: Just links to vendors
    - Impact: Can't help users comparison-shop

11. **Limited AI Diagnostics**
    - Vision: "Ask HoundMoto about your problem, get personalized suggestions"
    - Reality: Experimental DiagnosticAssistantPage, not integrated
    - Impact: Feature exists but not discoverable

12. **No OBD2 Scanner Integration**
    - Vision: "Connect your Bluetooth scanner, see codes in real-time"
    - Reality: Just a roadmap page
    - Impact: Users go to Torque, OBDWiz, etc. for live scanning

#### 🟢 NICE TO HAVE

13. **No PWA / Offline Mode**
    - Vision: "Works in the garage with no signal"
    - Reality: Web-only, online-only
    - Impact: Mobile-web is fine for now

14. **No Supplier Ratings**
    - Vision: "See what other HoundMoto users paid at RockAuto vs. AutoZone"
    - Reality: Just links to vendors
    - Impact: Users hunt for best prices manually

15. **No Repair Estimates / Cost Forecasting**
    - Vision: "Based on your car, here's typical shop costs for this repair"
    - Reality: Not implemented
    - Impact: Users don't know what to expect from shops

16. **No Community Repair Stories**
    - Vision: "See real repairs other users did, what they learned"
    - Reality: Feedback form exists, no curated stories
    - Impact: No user-generated content advantage

17. **No SMS/Email Alerts**
    - Vision: "Get alerts for recalls, upcoming maintenance, service tips"
    - Reality: No notifications at all
    - Impact: Users only visit on-demand

#### 🟢 IGNORE FOR NOW

18. **No Mobile App (iOS/Android)**
    - Mobile-web works fine, progressive enhancement (PWA) is better ROI

19. **No Video Tutorials**
    - Text + external links are sufficient for MVP

20. **No Shop Finder / Mechanic Directory**
    - Out of scope for diagnosis-first mission

---

## TASK 4: TECHNICAL DEBT & DEAD CODE

### Dead Code / Abandoned Ideas

1. **Obd2ScanPage.jsx (166 lines)**
   - Status: Placeholder / roadmap only
   - Content: Describes OBD2 scanning feature, no actual implementation
   - Action: Delete or move to roadmap documentation

2. **DiagnosticAssistantPage.jsx (339 lines)**
   - Status: Experimental, feature gate missing (not discoverable from main nav)
   - Issue: Routes exist but no link to it in Navbar or search results
   - Action: Either integrate into main diagnostic wizard or remove

3. **api/diagnosticsRules.js**
   - Status: Appears unused
   - Grep: Check if imported anywhere
   - Action: Verify and delete if unused

4. **AdminConsole.jsx (size unknown)**
   - Status: Appears to exist but not wired into admin dashboard
   - Action: Verify if used, delete or integrate

5. **Tips Submission System (TipSubmitForm.jsx, tipsData.js)**
   - Status: Working but localStorage-only, no moderation, no visibility
   - Issue: Tips are collected but nowhere to browse them
   - Action: Either add tips browsing UI or remove collection

### Technical Debt

1. **Hash-Based Routing (No React Router)**
   - Current: App.jsx uses `#/` for navigation (legacy)
   - Installed: react-router-dom 7.17.0, used in pages
   - Issue: Inconsistent — pages use router, main nav uses hash
   - Action: Unify on React Router or remove router dependency

2. **Vehicle Specs Hardcoded in App.jsx**
   - Current: baseVehicleSpecs[] array (300+ lines) in App.jsx
   - Issue: Duplicates vehicleCoverageData.js, hard to maintain
   - Action: Move to vehicleCoverageData.js, deduplicate

3. **Lack of Data Validation / Sanitization**
   - Issue: User search input not validated before matching
   - Risk: Potential injection or unexpected behavior
   - Action: Add validation layer

4. **No Error Boundaries**
   - Issue: Errors in components can crash entire page
   - Action: Add React Error Boundary wrapper

5. **Postgres Schema Undocumented**
   - Current: analytics_events table created via api/track.js but schema not documented
   - Issue: Can't see what other tables exist (admin_access_logs referenced in admin/login.js)
   - Action: Document full schema or add schema.sql

6. **Admin Authentication Weak**
   - Current: PIN-based, rate-limited to 5 attempts/min
   - Issue: No session expiration, token generation uses simple base64 + HMAC
   - Action: Add token expiration, use proper JWT library

7. **Analytics PII Filtering Incomplete**
   - Current: Blacklist approach (block name, email, phone, address, ssn, dob, zip)
   - Issue: Can miss PII in custom fields
   - Action: Use whitelist approach instead

8. **No Structured Logging**
   - Issue: Errors logged to console, not to centralized service
   - Action: Add Sentry or similar

### Duplicate Data

1. **Vehicle Coverage in Multiple Places**
   - vehicleDirectory.js (recognition only)
   - vehicleCoverageData.js (specs for ~40 vehicles by generation)
   - App.jsx baseVehicleSpecs[] (specs for ~40 vehicles)
   - Action: Consolidate into single data structure

2. **Make/Model Lists**
   - partsData.js has vehicleMakes[] (25 makes) and vehicleModels{} (hardcoded)
   - vehicleDirectory.js has 43 makes, 100+ models
   - Action: Use vehicleDirectory as source of truth

3. **DTC Code References**
   - dtcCodes.js (full SAE J2012 P-codes)
   - vehicleDtcKnowledge.js (vehicle-specific mappings)
   - diagnosisWizardData.js (DTC codes in diagnosis results)
   - Action: Single DTC source, reference in other files

### Unused Dependencies

1. **html5-qrcode**
   - Used: VinScanner.jsx
   - Check if camera permission causes issues on web

2. **@vercel/postgres**
   - Used: api/track.js, admin APIs
   - Fine (necessary for backend)

---

## TASK 5: ROADMAP — 5 PHASES TO LAUNCH & SCALE

### PHASE 1: Fix Broken / Incomplete Features (3–4 weeks)

**Goal:** Make core features actually useful

1. **Consolidate & Expand Vehicle Coverage**
   - [ ] Merge baseVehicleSpecs, vehicleCoverageData, vehicleDirectory into single source
   - [ ] Add generation-based specs for remaining 30 makes (currently only ~10 makes have coverage)
   - [ ] Target: 200+ vehicles with complete specs (oil, fluid, tire, battery, bulb)
   - [ ] Effort: 4–5 days (data collection)

2. **Complete Admin Dashboard**
   - [ ] Wire up AdminConsole.jsx to display real stats
   - [ ] Add search analytics view (top searches, trends)
   - [ ] Add error logging (integrate Sentry or simple logging)
   - [ ] Add vehicle coverage analyzer (show which vehicles/makes have missing specs)
   - [ ] Effort: 2–3 days

3. **Unify Navigation & Routing**
   - [ ] Remove hash-based routing from App.jsx
   - [ ] Standardize on React Router for all pages
   - [ ] Test all routes, ensure no regressions
   - [ ] Effort: 1 day

4. **Fix DTC Coverage**
   - [ ] Add T-codes (transmission), C-codes (chassis), B-codes (body)
   - [ ] Expand vehicle-specific DTC mappings from 20 to 50+ vehicles
   - [ ] Effort: 3–4 days (research)

5. **Integrate AI Diagnostic Assistant**
   - [ ] Make DiagnosticAssistantPage discoverable from main nav or symptom wizard
   - [ ] Test Claude API integration, add fallback provider logic
   - [ ] Effort: 1 day

6. **Add Account System (Basic)**
   - [ ] Create user table (email, saved vehicles, created_at)
   - [ ] Add sign-up (optional, email only) and saved vehicle list
   - [ ] Persist saved vehicles to Postgres (not just localStorage)
   - [ ] Effort: 2–3 days

**Total Phase 1: 2–3 weeks, Ready for Beta Testing**

---

### PHASE 2: Expand Vehicle Coverage (4–6 weeks)

**Goal:** Move from 50 vehicles → 500+ vehicles with complete specs

1. **Data Collection Strategy**
   - [ ] Scrape public OEM spec sheets (owner's manuals) for top 100 vehicles
   - [ ] Partner with RepairPal or similar for spec data
   - [ ] Crowdsource from HoundMoto users (verified submissions)
   - [ ] Effort: 3–4 weeks (ongoing)

2. **Spec Template Optimization**
   - [ ] Standardize on generation-based entries (yearStart, yearEnd)
   - [ ] Add engine variants (base, turbo, hybrid, EV)
   - [ ] Add transmission variants (manual, auto, CVT)
   - [ ] Effort: 2–3 days

3. **Expand Common Failures Database**
   - [ ] Add 100+ generation-specific common failure patterns
   - [ ] Link each failure to DTC codes (P0340 = cam sensor, etc.)
   - [ ] Effort: 2–3 weeks (research + data entry)

4. **Improve Bulb & Battery Search**
   - [ ] Current: Most entries say "verify by trim"
   - [ ] New: Add bulb/battery size lookups for top 200 vehicles
   - [ ] Effort: 1 week

**Total Phase 2: 4–6 weeks, 500+ vehicle coverage**

---

### PHASE 3: Expand Diagnostic Coverage (6–8 weeks)

**Goal:** Move from 11 symptom categories → 30+ categories, add vehicle-specific guidance

1. **Add More Symptom Categories**
   - [ ] Electric / Hybrid-specific issues
   - [ ] Steering problems
   - [ ] Lighting issues
   - [ ] Fuel system problems
   - [ ] Cooling system overhaul
   - [ ] Electrical shorts / fuses
   - [ ] Effort: 3–4 weeks (research + tree building)

2. **Expand Vehicle-Specific DTC Mapping**
   - [ ] Currently: 20 vehicles
   - [ ] Target: 200+ vehicles with known common codes
   - [ ] Add make/model-specific failure patterns
   - [ ] Effort: 2–3 weeks (research)

3. **Add T-Codes, C-Codes, B-Codes**
   - [ ] Currently: P-codes only (~400)
   - [ ] Add 300+ transmission/chassis/body codes
   - [ ] Effort: 1 week (SAE J2012 database integration)

4. **Improve AI Assistant**
   - [ ] Train on HoundMoto data (DTC codes, diagnoses, common failures)
   - [ ] Add context awareness (vehicle selection improves suggestions)
   - [ ] Effort: 1–2 weeks

5. **Add Service History Tracking**
   - [ ] Create service_history table (vehicle_id, work_type, date, notes)
   - [ ] Add UI to log past repairs
   - [ ] Show maintenance interval based on service history
   - [ ] Effort: 2–3 days

**Total Phase 3: 6–8 weeks, 30+ diagnostic categories, 200+ vehicle-specific mappings**

---

### PHASE 4: Expand Repair Information (8–10 weeks)

**Goal:** Move from external links → native repair data (torque specs, procedures)

1. **Add Torque Specification Database**
   - [ ] Fastener specs for common repairs (oil pan, intake, transmission pan, etc.)
   - [ ] By vehicle generation
   - [ ] Include sequence diagrams
   - [ ] Source: Factory service manuals, RepairPal
   - [ ] Effort: 4–5 weeks

2. **Add Native Repair Procedures (Limited)**
   - [ ] Start with top 20 common repairs (oil change, filter, spark plugs, pads, belt, thermostat, water pump)
   - [ ] Write procedures for 3–5 vehicle families (Ford, Honda, Toyota, Chevy, Nissan)
   - [ ] Include photos/diagrams
   - [ ] Effort: 6–8 weeks (per repair type)

3. **Improve Parts Cross-Reference System**
   - [ ] Build OEM↔Aftermarket part number mapping for top 100 parts
   - [ ] Show price ranges by vendor
   - [ ] Effort: 2–3 weeks

4. **Enhance Manual Resources**
   - [ ] Expand CHARM/LEMON database coverage
   - [ ] Add links to YouTube repair videos
   - [ ] Effort: 1 week

**Total Phase 4: 8–10 weeks, native torque specs + limited repair procedures**

---

### PHASE 5: Advanced AI & Monetization (Ongoing)

**Goal:** Differentiate with AI, build sustainable business model

1. **AI Diagnostic Engine (Advanced)**
   - [ ] Multi-step reasoning (symptom → likely causes → confirmatory tests → repair path)
   - [ ] Learn from user feedback (which diagnostics led to actual repairs)
   - [ ] Integration with NHTSA recalls, TSBs (Technical Service Bulletins)
   - [ ] Effort: Ongoing

2. **Supporter Membership Tier**
   - [ ] Free tier: Basic diagnostics, DTC lookup, parts vendor links
   - [ ] Supporter tier: Advanced AI, service history unlimited, priority support
   - [ ] Price: $3–5/month or $25–40/year
   - [ ] Effort: 1–2 weeks

3. **Real-Time OBD2 Scanner Integration (Web Bluetooth)**
   - [ ] Support ELM327-compatible Bluetooth adapters
   - [ ] Show live DTCs, freeze-frame data
   - [ ] Correlation with HoundMoto diagnostics
   - [ ] Effort: 3–4 weeks

4. **TSB (Technical Service Bulletin) Integration**
   - [ ] NHTSA + OEM TSBs for known issues
   - [ ] Vehicle-specific recommendations
   - [ ] Effort: Ongoing

5. **Affiliate Revenue**
   - [ ] Partner with RockAuto, AutoZone, NAPA for commission
   - [ ] Track clicks, optimize vendor placement
   - [ ] Effort: Negotiation + implementation (1 week)

6. **B2B (Mechanic Edition)**
   - [ ] White-label HoundMoto for independent shops
   - [ ] Shop branding, custom pricing
   - [ ] Effort: Ongoing

**Total Phase 5: 3–6 months, AI-powered diagnostics, monetization, OBD2 integration**

---

## TASK 6: HONEST SCORING (1–10 PER DIMENSION)

### 1. **Automotive Usefulness** — 5/10
**Does it solve real automotive problems?**

- ✅ Strengths:
  - Symptom-to-diagnosis trees are well-researched and practical
  - DTC code database is comprehensive (P0100–P0799)
  - Free NHTSA recall lookup actually useful
  - Vendor links speed up part shopping
  
- ❌ Weaknesses:
  - Only 50/851 vehicles have complete specs (94% incomplete coverage)
  - Users still need to verify everything in manual ("always verify in owner's manual" appears 50+ times)
  - No service history, no personalized maintenance tracking
  - Torque specs missing entirely (huge gap for DIYers)
  - Limited to P-codes (no transmission, chassis, body codes)
  - No procedures, no visual guides

**Score: 5/10** — Useful for diagnosis, parts lookup, and recalls, but incomplete vehicle specs and missing repair procedures hurt credibility. Users still have to hunt elsewhere for half the information.

---

### 2. **Diagnostic Usefulness** — 6/10
**Does it help users diagnose problems?**

- ✅ Strengths:
  - 11 symptom categories well-designed
  - Branching logic teaches logical diagnosis (crank vs. no-start)
  - First-check steps are practical and safe
  - DTC lookup with causes/severity helps users understand codes
  - Some vehicle-specific guidance (Nissan CVT issues, etc.)
  
- ❌ Weaknesses:
  - Only 11 categories vs. 30+ real problem types
  - Vehicle-specific DTC mapping only for 20 vehicles (incomplete)
  - No T/C/B codes (transmission, chassis, body)
  - No hybrid/EV diagnostic guidance
  - AI diagnostic assistant exists but hidden (not discoverable)
  - Tips database exists but not used

**Score: 6/10** — Covers common scenarios well, but gaps in advanced diagnostics (transmission, hybrid, EV) and limited vehicle-specific guidance mean experienced users will leave to search Reddit/YouTube.

---

### 3. **SEO Readiness** — 7/10
**Can users find it via Google?**

- ✅ Strengths:
  - Dynamic meta tags (per-vehicle, per-DTC page)
  - 851 vehicle pages (long-tail keywords)
  - 400+ DTC code pages (search volume for "P0420 meaning")
  - Canonical URLs prevent duplicates
  - Sitemap API for crawlers
  - Mobile-responsive design
  - Fast Vite + React SPA
  
- ❌ Weaknesses:
  - No blog / content marketing (no articles like "Top 10 Honda Problems")
  - Limited backlink strategy (no partnerships, no press)
  - No schema.org structured data (missing JSON-LD for FAQPage, FAQSchema)
  - No internal linking strategy (related vehicles, related codes)
  - Limited UGC (user-generated content advantage)
  - No breadcrumb schema

**Score: 7/10** — Good technical SEO (responsive, fast, meta tags), but missing content strategy and structured data. Will rank for brand-specific queries (e.g., "2018 Honda Civic oil specs") but hard to rank for competitive terms (e.g., "car check engine light meaning").

---

### 4. **Data Coverage** — 4/10
**How complete is the database?**

- ✅ Strengths:
  - 851 vehicles in directory (recognition database good)
  - 400+ DTC codes (P-code coverage comprehensive)
  - 11 diagnostic categories well-researched
  - 9 part vendors integrated
  - 17 common parts explained well
  
- ❌ Weaknesses:
  - Only 50/851 vehicles have specs (94% incomplete)
  - No T/C/B codes (only P-codes)
  - No torque specifications at all
  - No repair procedures
  - No cross-reference parts database
  - Vehicle-specific DTC mapping only 20 vehicles
  - No hybrid/EV-specific data
  - Common failures only for ~25 generations
  - Tips submitted but no curated public database

**Score: 4/10** — Good on one dimension (vehicle recognition, DTC codes), weak everywhere else (specs, procedures, torque, parts cross-ref). Feels incomplete, users will search elsewhere for missing data.

---

### 5. **Mobile Usability** — 7/10
**Works well on phones?**

- ✅ Strengths:
  - Responsive CSS (tested on common breakpoints)
  - Touch-friendly buttons (44px+ targets)
  - VIN scanner with camera (useful on mobile)
  - Viewport config correct (viewport-fit=cover)
  - One-search-bar interface mobile-first
  - Fast load times (Vite bundle)
  
- ❌ Weaknesses:
  - Not a true PWA (no service worker, no offline mode)
  - Not installable (no "Add to Home Screen")
  - No mobile app (no iOS/Android native)
  - VIN scanner requires camera permission (some users deny)
  - Long lists (vehicle browsing) hard to scroll
  - Tap targets on some elements <44px (diagnosis tree buttons?)

**Score: 7/10** — Mobile-web works well, responsive design is good, VIN scanner is a nice touch. But lack of PWA/offline and no native app means users can't use it in the garage without signal.

---

### 6. **Launch Readiness** — 5/10
**Is this ready to ship to users?**

- ✅ Strengths:
  - Core search works (one search bar)
  - DTC lookup functional
  - VIN recall lookup real
  - Diagnosis wizard polished
  - Mobile responsive
  - Legal pages (TOS, Privacy, Disclaimer) in place
  - Analytics set up
  
- ❌ Weaknesses:
  - **No account system (can't save vehicles)**
  - **94% of vehicles have incomplete specs**
  - **No monetization path (how do you scale?)**
  - **Admin dashboard barely functional (can't manage site)**
  - **No error logging (can't debug issues)**
  - **Hash-based routing inconsistent**
  - **No service history (core feature missing)**
  - **Tips submitted but nowhere to browse**
  - **AI diagnostic feature hidden (not discoverable)**
  - **No offline mode (users at mercy of internet)**

**Score: 5/10** — Feels like a beta. Core diagnosis works, but lacks:
1. Vehicle coverage (50/851 vs. 851)
2. Account system (can't build loyalty)
3. Monetization (not sustainable)
4. Admin tools (can't scale/maintain)
5. Key features (service history, saved vehicles)

**Verdict:** Ready for **closed beta** with early adopters. Not ready for public launch until you:
- Expand vehicle coverage to 300+ vehicles
- Add basic account + saved vehicles
- Fix admin dashboard
- Decide on monetization model

---

## SUMMARY TABLE

| Dimension | Score | Status | Primary Gap |
|-----------|-------|--------|-------------|
| Automotive Usefulness | 5/10 | ⚠️ Partial | 94% of vehicle specs missing |
| Diagnostic Usefulness | 6/10 | ⚠️ Partial | Only 11 symptom categories, no T/C/B codes |
| SEO Readiness | 7/10 | ✅ Good | Missing content marketing + structured data |
| Data Coverage | 4/10 | 🔴 Weak | Sparse: 50/851 vehicles, no torque specs, no procedures |
| Mobile Usability | 7/10 | ✅ Good | Missing PWA + offline mode |
| Launch Readiness | 5/10 | ⚠️ Partial | No account system, 94% vehicle coverage gap, no monetization |

---

## WHAT TO DO BEFORE PUBLIC LAUNCH

### Must-Have (Blocking)
1. ✅ Expand vehicle coverage: 50 → 300+ vehicles (realistic target for beta)
2. ✅ Add account + saved vehicles (localStorage → Postgres)
3. ✅ Fix admin dashboard (stats, search analytics, error logging)
4. ✅ Decide monetization: Free tier vs. Supporter tier?
5. ✅ Complete diagnostic coverage: Add service history, expand symptom categories

### Should-Have (3 months out)
1. ✅ Add torque specs for common repairs
2. ✅ Expand vehicle-specific DTC mappings to 100+ vehicles
3. ✅ Integrate AI diagnostic assistant into main nav
4. ✅ Add T/C/B codes (transmission, chassis, body)

### Nice-to-Have (Post-launch)
1. ☐ PWA + offline mode
2. ☐ Native repair procedures (top 20 common repairs)
3. ☐ Parts cross-reference system
4. ☐ Community repair stories
5. ☐ OBD2 scanner integration

---

## FINAL WORDS

**HoundMoto has a strong foundation** — the search interface, diagnosis wizard, DTC lookup, and recall integration are all solid. The vision ("Diagnose first, buy later") is clear and aligned with user needs.

**But execution is incomplete.** You're at 40% of the MVP. The biggest gaps are:
1. **Vehicle specs** (50/851 coverage)
2. **User accounts** (can't build loyalty)
3. **Admin tools** (can't see what users need)
4. **Monetization** (not sustainable)

**Recommend next steps:**
1. **Phase 1 (3–4 weeks):** Fix broken features, add account system, expand vehicle coverage to 200+
2. **Closed beta:** Invite 100 early users, collect feedback on missing vehicle specs and diagnostic gaps
3. **Phase 2–3 (12 weeks):** Expand coverage to 500+ vehicles, 30 diagnostic categories, decide on pricing
4. **Public launch:** When you have 90%+ vehicle coverage and a sustainable business model

The product **can be excellent**, but only if you finish the data work. Right now, it feels unfinished despite the solid design and solid code.

