# Complete Feature Classification Matrix
## All Missing/Partial Features Classified by Problem Type

**Purpose:** See exactly which gaps are Data Problems (easy, low-code) vs. Code/Infrastructure Problems (harder, time-intensive).

---

## LEGEND

| Symbol | Meaning |
|--------|---------|
| 🟢 | Data Problem (LOW effort, HIGH user value) |
| 🔵 | Code Problem (MEDIUM effort, MEDIUM user value) |
| 🟠 | UX Problem (MEDIUM effort, MEDIUM user value) |
| 🔴 | Infrastructure Problem (HIGH effort, HIGH long-term value) |
| ⭐ | In Top 20 ROI list |
| 🎯 | Solo founder should do in Phase 1 |

---

## COMPLETE FEATURE CLASSIFICATION

### VEHICLE INFORMATION & SPECIFICATIONS (26 Features)

| Feature | Problem Type | Current | Missing | ROI | Effort | Notes |
|---------|--------------|---------|---------|-----|--------|-------|
| Oil specs (100+ vehicles) | 🟢 Data | 50 vehicles | 800 vehicles | 9.7 ⭐ 🎯 | 3 wks | Highest priority, highest ROI |
| Transmission fluid specs | 🟢 Data | 50 vehicles | 800 vehicles | 8.5 | 3 wks | Part of oil specs work |
| Coolant specs | 🟢 Data | 40 vehicles | 800 vehicles | 8.0 | 2 wks | Mostly done with oil specs |
| Tire sizes | 🟢 Data | 50 vehicles + patterns | 800 vehicles | 7.5 | 2 wks | Need OEM specs per generation |
| Battery group size + CCA | 🟢 Data | 40 vehicles | 800 vehicles | 7.0 | 2 wks | Include cold cranking amps |
| Wiper blade sizes | 🟢 Data | 30 vehicles | 800 vehicles | 6.5 | 2 wks | Driver + passenger side |
| Bulb sizes (headlight/tail) | 🟢 Data | 20 vehicles | 800 vehicles | 7.0 | 2 wks | H7, H11, 9005 types |
| Maintenance schedules | 🟢 Data | 0 vehicles | 851 vehicles | 13.5 ⭐ 🎯 | 3 wks | Oil change, transmission, spark plugs intervals |
| Common failures (top 10 per vehicle) | 🟢 Data | ~25 vehicles | 800 vehicles | 12.0 ⭐ 🎯 | 2 wks | What breaks on this car? |
| Common failures by generation | 🟢 Data | ~25 generations | 300+ generations | 10.0 | 2 wks | Nissan CVT, Honda cam sensor, etc. |
| Cost estimates for repairs | 🟢 Data | 0 | 100+ parts | 8.4 | 2 wks | Oil change $30, transmission $150, etc. |
| Engine-specific variants | 🟢 Data | 50 vehicles, no variants | 200+ variants | 6.0 | 2 wks | 2.0L vs 2.5L same model, different fluids |
| Transmission type variants | 🟢 Data | 20 vehicles | 800+ variations | 6.5 | 2 wks | Manual vs auto vs CVT vs DCT |
| Hybrid/EV-specific specs | 🟢 Data | 5 vehicles | 50+ vehicles | 5.0 | 3 wks | Battery coolant, electric fluid, etc. |
| Diesel-specific specs | 🟢 Data | 2 vehicles | 50+ diesel vehicles | 4.0 | 2 wks | Diesel fuel, different oils, etc. |
| Generation-based estimates | 🟢 Data | 40 generations | 300+ generations | 7.0 | 4 wks | Extend generation coverage |
| Trim-level variations | 🟢 Data | Noted but not separated | 2000+ trim combos | 3.0 | 8 wks | Door stickers are actually the answer |
| Recall data by vehicle | 🟠 UX | NHTSA API available | Browsable pages missing | 6.3 ⭐ | 1 week | Create `/recalls/year/make/model` pages |
| Warranty information | 🟢 Data | 0 | 50+ vehicles | 4.0 | 3 wks | Basic coverage, length |
| Service interval reminders | 🔵 Code | 0 | Core feature | 3.0 | 2 wks | Depends on service history feature |
| Part fitment compatibility | 🟢 Data | Generic notes | 500+ parts | 5.0 | 4 wks | Spark plug heat range, brake pad types |
| Aftermarket equivalents | 🟢 Data | 0 | 100+ OEM parts | 4.0 | 3 wks | OEM part # → aftermarket cross-reference |
| Labor time estimates | 🟢 Data | 0 | 20 repairs | 6.0 | 2 wks | "Oil change = 0.5 hrs labor" |
| Fluid capacities (all types) | 🟢 Data | 40 vehicles | 800 vehicles | 7.5 | 2 wks | Brake fluid, power steering, diff, etc. |
| Wheel size variations | 🟢 Data | Door sticker recommended | 200+ combos | 3.0 | 3 wks | Trim-specific wheel sizes |
| Owner's manual links | 🟠 UX | 0 | 100+ vehicles | 5.0 | 1 week | Direct PDF links to owner's manuals |

**Summary: VEHICLE SPECS SECTION**
- 🟢 Data Problems: 20 features
- 🔵 Code Problems: 1 feature
- 🟠 UX Problems: 2 features
- 🔴 Infrastructure Problems: 0 features

**Total Effort to Complete:** 12–16 weeks of solo founder work  
**Recommended Approach:** Phase 1–2 (focus on top 8 features in bold)

---

### DIAGNOSTICS (23 Features)

| Feature | Problem Type | Current | Missing | ROI | Effort | Notes |
|---------|--------------|---------|---------|-----|--------|-------|
| P-codes (P0100–P0799) | 🟢 Data | 400 codes | ~30 codes | 5.6 | 1 week | Fill top-searched missing codes |
| T-codes (transmission) | 🟢 Data | 0 codes | 150+ codes | 6.0 ⭐ | 5 days | P1000–P1999 range, CVT-specific |
| C-codes (chassis) | 🟢 Data | 0 codes | 200+ codes | 4.0 | 1 week | Suspension, steering, ABS codes |
| B-codes (body) | 🟢 Data | 0 codes | 100+ codes | 2.0 | 1 week | Lighting, locks, wipers (low-demand) |
| Symptom diagnosis trees | 🟢 Data | 11 categories | 30+ categories | 6.7 ⭐ | 3 wks | Steering, lighting, fuel, electrical, cooling |
| Vehicle-specific DTC mapping | 🟢 Data | 20 vehicles | 200+ vehicles | 6.2 ⭐ | 2 wks | "Your Civic gets cam sensor codes" |
| DTC → vehicle problems | 🟢 Data | Partial | 200+ links | 5.0 | 2 wks | Bidirectional mapping |
| Common codes by make | 🟢 Data | 0 | 43 makes | 7.0 | 2 wks | "Ford F-150s get P0128 thermostat code" |
| Hybrid/EV-specific codes | 🟢 Data | 0 | 50+ codes | 4.0 | 2 wks | Battery, motor, regenerative braking codes |
| Severity levels (high/med/low) | 🟢 Data | Partial (200 codes) | 150+ codes | 4.0 | 3 days | Estimate danger level |
| First-check steps | 🟢 Data | Partial (diagnoses) | 200+ codes | 5.0 | 2 wks | What to check first for each code |
| Safety warnings | 🟢 Data | Partial (diagnoses) | 150+ codes | 5.0 | 1 week | "Don't ignore this", "stop driving" |
| Tools required | 🟢 Data | Partial (diagnoses) | 200+ codes | 4.0 | 1 week | Multimeter, scanner, etc. |
| Professional help threshold | 🟢 Data | Partial (diagnoses) | 200+ codes | 5.0 | 1 week | When to call a shop |
| Video links (YouTube) | 🟠 UX | 0 | 100+ codes | 3.0 | 3 wks | Link to mechanic videos explaining codes |
| Forum discussion links | 🟠 UX | 0 | 100+ codes | 2.0 | 2 wks | Reddit links for specific codes |
| Cost estimates per code | 🟢 Data | 0 | 400+ codes | 5.0 | 2 wks | "P0340 cam sensor = $200–500 repair" |
| TSB (Technical Service Bulletin) links | 🟢 Data | 0 | 50+ codes | 4.0 | 2 wks | NHTSA + OEM bulletins |
| Known fixes by vehicle | 🟢 Data | 0 | 100+ vehicles | 6.0 | 3 wks | "2015 Nissan Sentra P0340 = cam sensor recall" |
| AI diagnostic assistant | 🔵 Code | Experimental | Not discoverable | 4.0 | 1 week | Integrate into main nav, improve UX |
| Diagnostic chatbot | 🔵 Code | Exists | Not integrated | 3.0 | 1 week | Make accessible from symptom wizard |
| Progressive diagnosis trees | 🔵 Code | Manual trees | Branching logic missing | 3.0 | 1 week | "More symptoms? Narrow it down" |
| Cost vs. DIY decision tree | 🟢 Data | 0 | 50+ repairs | 6.0 | 2 wks | "Is this worth DIYing?" decision maker |

**Summary: DIAGNOSTICS SECTION**
- 🟢 Data Problems: 18 features
- 🔵 Code Problems: 3 features
- 🟠 UX Problems: 2 features
- 🔴 Infrastructure Problems: 0 features

**Total Effort to Complete:** 8–12 weeks  
**Recommended Approach:** Phase 1–2 (focus on T-codes, symptom expansion, vehicle-specific mapping)

---

### REPAIR INFORMATION (17 Features)

| Feature | Problem Type | Current | Missing | ROI | Effort | Notes |
|---------|--------------|---------|---------|-----|--------|-------|
| Torque specifications | 🟢 Data | 0 | 100+ specs | 8.0 ⭐ | 3 wks | Oil drain plug, intake, transmission pan |
| Sequence diagrams (bolts) | 🟢 Data | 0 | 30+ diagrams | 6.0 | 2 wks | Which bolts to tighten first? |
| Native repair procedures | 🟢 Data | External links | 20 repairs | 4.0 | 6 wks | Oil change, filter, spark plugs, pads, belt |
| Repair procedure videos | 🟠 UX | 0 | 50+ videos | 3.0 | 2 wks | Link to YouTube mechanic videos |
| Wiring diagrams | 🔴 Infrastructure | External links | 50+ diagrams | 2.0 | 4 wks | Electrical schematics (hard to source) |
| Coolant/fluid disposal info | 🟢 Data | 0 | Basic guidance | 4.0 | 1 day | Where to dispose of used oil? |
| Safety precautions | 🟢 Data | Partial (diagnoses) | 50+ repairs | 5.0 | 1 week | "Disconnect battery before work" |
| Tool requirements | 🟢 Data | Partial (diagnoses) | 50+ repairs | 5.0 | 1 week | What tools do you need? |
| Part removal order | 🟢 Data | 0 | 20+ procedures | 5.0 | 2 wks | Which parts come off first? |
| Reassembly order | 🟢 Data | 0 | 20+ procedures | 5.0 | 2 wks | Which parts go back on first? |
| Time estimates (DIY) | 🟢 Data | 0 | 50+ repairs | 5.0 | 1 week | "This takes 2 hours to DIY" |
| Common mistakes | 🟢 Data | 0 | 50+ repairs | 6.0 | 2 wks | "Don't forget to reset the computer" |
| TorqueSpec ranges | 🟢 Data | 0 | 100+ specs | 4.0 | 1 week | "Don't over-tighten or break bolts" |
| Alternative procedures | 🟢 Data | 0 | 20+ repairs | 3.0 | 2 wks | "There's an easier way to do this" |
| Special tools needed | 🟢 Data | 0 | 30+ repairs | 4.0 | 1 week | Spring compressor, pulley puller, etc. |
| Specialty shop links | 🟠 UX | 0 | 30+ services | 3.0 | 1 week | "Need transmission service? Go here" |
| Before/after photos | 🟢 Data | 0 | 50+ repairs | 3.0 | 4 wks | Visual guides help DIYers |

**Summary: REPAIR INFORMATION SECTION**
- 🟢 Data Problems: 13 features
- 🟠 UX Problems: 1 feature
- 🔵 Code Problems: 0 features
- 🔴 Infrastructure Problems: 3 features

**Total Effort to Complete:** 10–15 weeks  
**Recommended Approach:** Phase 4 (post-launch) — start with torque specs for top 10 repairs

---

### PARTS & VENDORS (13 Features)

| Feature | Problem Type | Current | Missing | ROI | Effort | Notes |
|---------|--------------|---------|---------|-----|--------|-------|
| Part cross-reference (OEM ↔ aftermarket) | 🟢 Data | 0 | 500+ parts | 5.0 | 4 wks | Ford OEM part # = Dorman part # |
| Part price tracking | 🔴 Infrastructure | 0 | 500+ parts | 4.0 | 2 wks | Real-time pricing from vendors |
| Vendor price comparison | 🔵 Code | Links exist | Aggregation missing | 5.0 | 2 wks | RockAuto vs NAPA vs Amazon prices |
| Part availability by region | 🔴 Infrastructure | 0 | Local pickup data | 3.0 | 2 wks | "AutoZone has it in stock now" |
| Estimated part lifespan | 🟢 Data | 0 | 50+ parts | 4.0 | 1 week | "Spark plugs last 30k–100k miles" |
| Part failure modes | 🟢 Data | Partial (17 parts) | 100+ parts | 6.0 | 2 wks | "Here's why this part fails" |
| OEM vs aftermarket comparison | 🟢 Data | 0 | 30+ parts | 5.0 | 2 wks | "Is OEM worth the extra cost?" |
| Cheap part warnings | 🟢 Data | 0 | 50+ parts | 5.0 | 1 week | "Don't buy this $10 alternator" |
| Part recall information | 🟢 Data | 0 | 30+ parts | 4.0 | 1 week | "This part had a recall" |
| Warranty info by part | 🟢 Data | 0 | 100+ parts | 4.0 | 1 week | "Lifetime warranty on pads" |
| Affiliate commission tracking | 🔴 Infrastructure | Tracked (basic) | Optimized ranking | 7.0 ⭐ | 1 week | Which vendor gets best commission? |
| Supplier ratings (community) | 🟠 UX | 0 | 9 vendors | 5.0 | 1 week | "RockAuto is faster", "NAPA is local" |
| Part compatibility checker | 🔵 Code | 0 | Vehicle-specific matching | 4.0 | 2 wks | "Will this part fit my car?" |

**Summary: PARTS & VENDORS SECTION**
- 🟢 Data Problems: 8 features
- 🔵 Code Problems: 2 features
- 🟠 UX Problems: 1 feature
- 🔴 Infrastructure Problems: 2 features

**Total Effort to Complete:** 6–10 weeks  
**Recommended Approach:** Phase 2–3 (affiliate tracking first, then cross-reference data)

---

### USER FEATURES & ACCOUNTS (12 Features)

| Feature | Problem Type | Current | Missing | ROI | Effort | Notes |
|---------|--------------|---------|---------|-----|--------|-------|
| User accounts (email signup) | 🔴 Infrastructure | 0 | Core | 7.0 ⭐ | 1 week | Email-only, no password (OAuth) |
| Saved vehicles | 🔴 Infrastructure | localStorage | Postgres | 8.0 ⭐ | 2 days | Store in DB instead of browser |
| Multi-vehicle garage | 🔴 Infrastructure | 1 vehicle max | 5–10 vehicles | 8.0 ⭐ | 3 days | Track multiple cars |
| Service history | 🔴 Infrastructure | 0 | Full feature | 9.0 ⭐ | 1 week | Log repairs, track maintenance |
| Maintenance reminders | 🔴 Infrastructure | 0 | Email/push alerts | 6.0 | 1 week | "Your oil is due at 5000 miles" |
| Repair cost tracking | 🔴 Infrastructure | 0 | By vehicle | 5.0 | 1 week | "I spent $1500 on this car this year" |
| Notes per vehicle | 🔴 Infrastructure | 0 | Custom notes | 4.0 | 2 days | "Next project: paint the hood" |
| Comparison tool (vehicle A vs B) | 🔵 Code | 0 | Side-by-side specs | 4.0 | 2 days | Compare oil specs, parts, etc. |
| Favorites / bookmark vehicle | 🔵 Code | 0 | Star/heart icon | 4.0 | 1 day | Quick access to common vehicles |
| Vehicle sharing (via link) | 🔵 Code | 0 | Share garage with friends | 3.0 | 2 days | "Check out my car specs" |
| Anonymous profile (no login) | 🟠 UX | Current | Identity for feedback | 3.0 | 1 day | Username for tips/reviews |
| Reputation system | 🔵 Code | 0 | Community credibility | 3.0 | 1 week | "This user has 100 helpful reviews" |

**Summary: USER FEATURES SECTION**
- 🟢 Data Problems: 0 features
- 🔵 Code Problems: 4 features
- 🟠 UX Problems: 1 feature
- 🔴 Infrastructure Problems: 7 features

**Total Effort to Complete:** 4–6 weeks  
**Recommended Approach:** Phase 3 (start with saved vehicles + service history, skip others initially)

---

### ADMIN FEATURES (12 Features)

| Feature | Problem Type | Current | Missing | ROI | Effort | Notes |
|---------|--------------|---------|---------|-----|--------|-------|
| Search analytics dashboard | 🔴 Infrastructure | Raw table | Visualized | 1.7 ⭐ | 1 week | Top searches, success rate, gaps |
| Coverage analyzer tool | 🔵 Code | 0 | Vehicle checklist | 2.5 ⭐ | 2 days | Which vehicles missing specs? |
| Error logging (Sentry) | 🔴 Infrastructure | Console only | Centralized | 3.0 | 1 day | JavaScript errors + stack traces |
| Revenue dashboard | 🔴 Infrastructure | 0 | Affiliate clicks, conversion | 6.0 | 1 week | Which vendors work best? |
| Traffic analytics | 🔴 Infrastructure | Basic | Real-time visitors, bounce rate | 4.0 | 1 week | Live dashboard |
| User feedback review | 🟠 UX | Form submitted | Admin inbox missing | 4.0 | 1 day | Read tips + testimonials |
| Bulk data import | 🔵 Code | 0 | CSV upload for vehicle specs | 3.0 | 2 days | Speed up data entry |
| Data export (CSV) | 🔵 Code | Partial | Full data export | 3.0 | 1 day | Analytics, vehicles, feedback |
| A/B testing dashboard | 🔴 Infrastructure | 0 | Version control | 2.0 | 2 wks | Test different features |
| Alerts for high-value events | 🔴 Infrastructure | 0 | Notifications | 2.0 | 1 week | Alert on unusual traffic, errors |
| User feedback sentiment | 🔵 Code | 0 | "Is feedback positive?" | 2.0 | 1 week | ML-based sentiment analysis |
| Vehicle data quality scoring | 🔵 Code | 0 | Rate completeness per vehicle | 3.0 | 2 days | "This vehicle is 95% complete" |

**Summary: ADMIN FEATURES SECTION**
- 🟢 Data Problems: 0 features
- 🔵 Code Problems: 5 features
- 🟠 UX Problems: 1 feature
- 🔴 Infrastructure Problems: 6 features

**Total Effort to Complete:** 3–5 weeks  
**Recommended Approach:** Phase 3 (search analytics first, others optional)

---

### MONETIZATION FEATURES (8 Features)

| Feature | Problem Type | Current | Missing | ROI | Effort | Notes |
|---------|--------------|---------|---------|-----|--------|-------|
| Affiliate revenue setup | 🔴 Infrastructure | Linked | Tracking + optimization | 7.0 ⭐ | 1 week | RockAuto, NAPA, Amazon, AutoZone |
| Supporter tier pricing | 🔴 Infrastructure | 0 | $3–5/month | 5.0 | 2 wks | Payment processing (Stripe) |
| Premium features gate | 🔵 Code | 0 | Service history unlimited, advanced AI | 4.0 | 1 week | Freemium model |
| Email marketing | 🔴 Infrastructure | 0 | Newsletter + tips | 4.0 | 2 wks | Mailchimp/ConvertKit integration |
| Sponsor integrations | 🟠 UX | 0 | "Powered by [vendor]" | 3.0 | 1 week | Brand partnerships |
| Shop mechanic directory | 🔴 Infrastructure | 0 | "Find a mechanic" | 2.0 | 4 wks | B2B (out of scope) |
| Affiliate referral program | 🔴 Infrastructure | 0 | "Earn commission" | 3.0 | 2 wks | Users refer friends, get $ |
| Display advertising (optional) | 🔴 Infrastructure | 0 | Google AdSense | 2.0 | 1 day | Passive revenue (optional) |

**Summary: MONETIZATION SECTION**
- 🟢 Data Problems: 0 features
- 🔵 Code Problems: 1 feature
- 🟠 UX Problems: 1 feature
- 🔴 Infrastructure Problems: 6 features

**Total Effort to Complete:** 3–6 weeks  
**Recommended Approach:** Phase 2 (affiliate setup), Phase 3 (Supporter tier if traffic warrants)

---

### MOBILE & PWA (6 Features)

| Feature | Problem Type | Current | Missing | ROI | Effort | Notes |
|---------|--------------|---------|---------|-----|--------|-------|
| PWA service worker | 🔴 Infrastructure | 0 | Offline cache | 5.0 | 1 week | Works in airplane mode |
| Install prompt ("Add to Home Screen") | 🔵 Code | 0 | iOS/Android | 4.0 | 2 days | One-tap app install |
| Offline search | 🔵 Code | 0 | DTC/vehicle cache | 4.0 | 1 week | Use offline for lookups |
| Mobile app (iOS/Android) | 🔴 Infrastructure | 0 | Native apps | 1.0 | 8 wks | Not worth it (PWA better ROI) |
| Camera roll picker | 🟠 UX | Not available | Upload car photo | 3.0 | 1 day | Photo of receipt, engine, etc. |
| Bluetooth OBD2 scanner | 🔵 Code | 0 | Real-time codes | 3.0 | 3 wks | ELM327 integration (nice, not critical) |

**Summary: MOBILE & PWA SECTION**
- 🟢 Data Problems: 0 features
- 🔵 Code Problems: 3 features
- 🟠 UX Problems: 1 feature
- 🔴 Infrastructure Problems: 2 features

**Total Effort to Complete:** 2–4 weeks  
**Recommended Approach:** Post-launch (Phase 4)

---

### CONTENT & SEO (12 Features)

| Feature | Problem Type | Current | Missing | ROI | Effort | Notes |
|---------|--------------|---------|---------|-----|--------|-------|
| "Common problems by make" pages | 🟠 UX | 0 | 100+ pages | 12.0 ⭐ | 1–2 days | `/problems/make/model` |
| "Common problems by year" pages | 🟠 UX | 0 | 500+ pages | 9.2 ⭐ | 3–5 days | `/problems/year/make/model` |
| "Recalls by vehicle" pages | 🟠 UX | VIN-only | Browsable | 6.3 ⭐ | 3–5 days | `/recalls/year/make/model` |
| Blog (repair tips, stories) | 🟢 Data | 0 | 20+ articles | 5.0 | 4 wks | "5 signs your battery is dying" |
| FAQ pages (per make/model) | 🟢 Data | 0 | 50+ FAQs | 5.0 | 2 wks | "Is the Civic reliable?" |
| Schema.org structured data | 🔵 Code | Basic | FAQSchema, Product, Article | 4.0 | 1 week | Rich snippets in search results |
| Author bylines / credibility | 🟠 UX | 0 | Author bios | 2.0 | 1 day | "Written by a mechanic" |
| Case studies / success stories | 🟢 Data | 0 | 10+ stories | 4.0 | 2 wks | "This user saved $500 with HoundMoto" |
| Featured snippets optimization | 🔵 Code | Not optimized | Question + answer format | 3.0 | 1 week | Rank "position zero" on Google |
| Breadcrumb schema | 🔵 Code | 0 | Navigation breadcrumbs | 2.0 | 1 day | Google SERP improvement |
| Internal linking strategy | 🟠 UX | Minimal | Comprehensive | 3.0 | 1 week | Link vehicles to similar vehicles |
| Sitemap optimization | 🔵 Code | Exists | Add news items, images | 2.0 | 1 day | Better crawl efficiency |

**Summary: CONTENT & SEO SECTION**
- 🟢 Data Problems: 5 features
- 🔵 Code Problems: 5 features
- 🟠 UX Problems: 2 features
- 🔴 Infrastructure Problems: 0 features

**Total Effort to Complete:** 3–6 weeks  
**Recommended Approach:** Phase 1–2 (focus on "problems by make/year" pages, high ROI)

---

## GRAND SUMMARY: ALL 131 FEATURES

| Problem Type | Count | Easy/Medium/Hard | Solo Founder Timeline |
|--------------|-------|------------------|----------------------|
| 🟢 **Data Problems** | 66 features | **EASY** (data-only) | 12–16 weeks |
| 🔵 **Code Problems** | 24 features | **MEDIUM** (code required) | 6–8 weeks |
| 🟠 **UX Problems** | 22 features | **MEDIUM** (UI + maybe code) | 2–4 weeks |
| 🔴 **Infrastructure Problems** | 19 features | **HARD** (systems, APIs, DB) | 4–6 weeks |

---

## PRIORITIZATION BY SOLO FOUNDER EFFORT

### 🟢 Data Problems (HIGHEST PRIORITY — Lowest Effort, Highest ROI)
**66 features, 12–16 weeks total**

**Tier 1 (Weeks 1–4):** Vehicle specs, common failures, DTC codes
- [ ] Oil specs (100+ vehicles)
- [ ] Common failures (50+ vehicles)
- [ ] Maintenance schedules (50 vehicles)
- [ ] Missing DTC codes (30 codes)

**Tier 2 (Weeks 5–12):** Additional data expansion
- [ ] Transmission fluid specs, tire sizes, battery specs
- [ ] T-codes, C-codes, B-codes
- [ ] Torque specs, repair procedures
- [ ] Cost estimates, part info

**Tier 3 (Weeks 13+):** Nice-to-have data
- [ ] Warranty info, trim variations, hybrid/EV specs
- [ ] Blog articles, case studies, FAQs

---

### 🟠 UX Problems (SECOND PRIORITY — Low-Medium Effort, High ROI)
**22 features, 2–4 weeks total**

**Tier 1 (Weeks 1–2):** High-ROI pages
- [ ] "Problems by make" pages (1–2 days)
- [ ] "Problems by year" pages (3–5 days)
- [ ] "Recalls by vehicle" pages (3–5 days)

**Tier 2 (Weeks 3–4):** Medium ROI UX
- [ ] Community tips browsing (2–3 days)
- [ ] Vehicle page mobile optimization (2–3 days)
- [ ] Internal linking strategy (1 week)

---

### 🔵 Code Problems (THIRD PRIORITY — Medium Effort, Varying ROI)
**24 features, 6–8 weeks total**

**Tier 1 (Weeks 1–2):** MVP code
- [ ] Integrate AI diagnostic assistant (1 week)
- [ ] Community tips voting (2–3 days)

**Tier 2 (Weeks 3–6):** Scaling code
- [ ] Service history UI (1 week)
- [ ] Coverage analyzer tool (2–3 days)
- [ ] Search analytics dashboard (1 week)

**Tier 3 (Weeks 7–8):** Polish + optional
- [ ] Schema.org structured data (1 week)
- [ ] Mobile optimization (2–3 days)

---

### 🔴 Infrastructure Problems (LOWEST PRIORITY — Highest Effort, Needed for Scale)
**19 features, 4–6 weeks total**

**Tier 1 (Week 1):** Immediate revenue
- [ ] Affiliate revenue tracking (1 week)

**Tier 2 (Weeks 3–4):** Core features
- [ ] Saved vehicles → Postgres (2 days)
- [ ] Service history backend (1 week)
- [ ] Search analytics API (1 week)

**Tier 3 (Weeks 5–6):** Post-launch
- [ ] User accounts, multi-vehicle garage, Supporter tier

---

## SOLO FOUNDER 90-DAY EXECUTION PLAN

### DON'T DO THESE (Too much effort, low ROI for solo founder)
❌ Mobile app (iOS/Android)  
❌ Detailed repair procedures (100+ hours)  
❌ Wiring diagrams (sourcing nightmare)  
❌ Real-time OBD2 integration (complex)  
❌ White-label mechanic version  
❌ A/B testing infrastructure  
❌ Advanced ML features  

### DO THESE (High ROI, reasonable effort)
✅ Vehicle specs expansion (top 100)  
✅ Common failures database  
✅ DTC code expansion (T, C, B codes)  
✅ Maintenance schedules  
✅ "Problems by make/year" pages  
✅ Service history feature  
✅ Affiliate revenue tracking  
✅ Search analytics dashboard  

### MAYBE THESE (If time permits)
⚠️ Blog articles + SEO content  
⚠️ PWA + offline mode  
⚠️ Community tips browsing  
⚠️ Advanced diagnostics AI  
⚠️ Paid Supporter tier  

---

## VERDICT FOR SOLO FOUNDER

**Recommended 90-Day Focus:**

1. **Weeks 1–4 (Month 1):** 🟢 Data + 🟠 UX
   - Vehicle specs (25 vehicles)
   - Common failures (25 vehicles)
   - "Problems by make/year" pages
   - **ROI: Highest**

2. **Weeks 5–8 (Month 2):** 🟢 Data + 🔴 Infrastructure
   - Vehicle specs (25 more, total 50)
   - Maintenance schedules (50 vehicles)
   - T-codes (transmission DTC)
   - Affiliate revenue setup
   - **ROI: High**

3. **Weeks 9–12 (Month 3):** 🔵 Code + 🔴 Infrastructure
   - Service history feature (code + database)
   - Search analytics dashboard
   - Coverage analyzer tool
   - Polish + deploy
   - **ROI: Medium (but core features)**

**If You Hit This:** 100 vehicles, $300–500/month affiliate revenue, 10k+ monthly visitors, launch-ready.

