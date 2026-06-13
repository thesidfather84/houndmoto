# HoundMoto 90-Day Implementation Checklist
## For Solo Founder: Highest-ROI Improvements Only

**Start Date:** June 13, 2026  
**Target Launch:** September 13, 2026  
**Available Time:** 40 hours/week  
**Total Hours:** ~520 hours

---

## PHASE 1: MONTH 1 (Weeks 1–4)
### Goal: Data Foundation + Quick SEO Wins
**Estimated Time: 80–100 hours**

### Week 1–2: Vehicle Specs Expansion (Top 25 Vehicles)
**Goal:** Get 25 vehicles from 50 → 75 total  
**Time Budget:** 3–4 hours/vehicle × 25 = 75–100 hours

**Pick These 25 First (By Search Volume):**
- [ ] Ford F-150 (1975–2025, multiple generations)
- [ ] Honda Civic (1995–2025, multiple generations)
- [ ] Toyota Camry (1990–2025, multiple generations)
- [ ] Chevrolet Silverado 1500 (1999–2025)
- [ ] Toyota Corolla (1995–2025)
- [ ] Honda Accord (1995–2025)
- [ ] Ford Escape (2000–2025)
- [ ] Nissan Altima (2000–2025)
- [ ] Chevrolet Equinox (2005–2025)
- [ ] Dodge Ram 1500 (2002–2025)
- [ ] Jeep Cherokee (1985–2000, 2014–2025)
- [ ] Jeep Wrangler (1987–2025)
- [ ] Ford Ranger (1983–2025)
- [ ] Honda CR-V (1997–2025)
- [ ] Toyota RAV4 (1996–2025)
- [ ] Chevrolet Cruze (2010–2019)
- [ ] Nissan Sentra (2000–2025)
- [ ] Ford Focus (1998–2018)
- [ ] Toyota Tacoma (1995–2025)
- [ ] Toyota Highlander (2001–2025)
- [ ] Honda Pilot (2003–2025)
- [ ] Chevrolet Tahoe (1995–2025)
- [ ] Ford Explorer (1990–2025)
- [ ] Nissan Rogue (2007–2025)
- [ ] Hyundai Elantra (2007–2025)

**Process per Vehicle:**
1. [ ] Find owner's manual (ManualsLib.com, OEM website)
2. [ ] Extract: oil type, oil capacity, transmission fluid, coolant, tire size, battery group, wiper sizes, bulb sizes
3. [ ] Add notes: "Verify in owner's manual for trim variations"
4. [ ] Enter into vehicleCoverageData.js
5. [ ] Test on site
6. [ ] Track: "✅ 2018 Ford F-150 5.0L V8 specs complete"

**Completion Checklist:**
- [ ] Create data entry template (spreadsheet)
- [ ] Find all 25 owner's manuals (online or archive)
- [ ] Enter all 25 into vehicleCoverageData.js
- [ ] Test each vehicle page loads with specs
- [ ] Deploy to Vercel
- [ ] Checkpoint: 25 vehicles done, 25 more to go

---

### Week 2–3: Common Failures Database (25 Vehicles)
**Goal:** Add `commonFailures` field to 25 vehicles  
**Time Budget:** 1–2 hours/vehicle × 25 = 25–50 hours

**Process per Vehicle:**
1. [ ] Search YouTube: "[year] [make] [model] common problems"
2. [ ] Search Reddit: r/Justrolledintotheshop + vehicle-specific subreddit
3. [ ] Extract top 5–10 issues (e.g., "cam sensor failure", "CVT shuddering")
4. [ ] Map to DTC codes if available
5. [ ] Note estimated cost range (parts + labor)
6. [ ] Add to vehicleCoverageData.js `commonFailures` field

**Example Entry:**
```javascript
{
  make: "Honda",
  model: "Civic",
  yearStart: 2006,
  yearEnd: 2011,
  generation: "FD",
  commonFailures: [
    "K-series engine carbon buildup (P0101, P0011 codes)",
    "R18 transmission fluid leaks",
    "Electric power steering issues",
    "Door lock actuator failure",
    "Rear wheel bearing noise (humming at highway speeds)"
  ],
  dtcCodes: ["P0101", "P0011", "P0101"],
}
```

**Completion Checklist:**
- [ ] Document top 5 most common failures per vehicle
- [ ] Link each to 1–2 DTC codes
- [ ] Add "estimated cost" for each failure
- [ ] Deploy to Vercel
- [ ] Checkpoint: 25 vehicles with common failures documented

---

### Week 3–4: Landing Pages for "Problems by Make"
**Goal:** Create SEO pages for top 50 makes  
**Time Budget:** 1–2 days total (just code + deployment)

**Code Changes:**
1. [ ] Create new page: `ProblemsPage.jsx`
   ```jsx
   export default function ProblemsPage({ make, model }) {
     const vehicle = vehicleDirectory.find(v => v.make === make && v.model === model);
     const failures = vehicleCoverageData
       .filter(v => v.make === make && v.model === model)
       .flatMap(v => v.commonFailures || []);
     
     return (
       <div className="problemsPage">
         <h1>{make} {model} Common Problems</h1>
         {failures.map((f, i) => <div key={i}>{f}</div>)}
       </div>
     );
   }
   ```

2. [ ] Add routes to App.jsx or router config
   - `/problems/:make/:model`

3. [ ] Add internal links from `/vehicles/:make` pages

**Completion Checklist:**
- [ ] ProblemsPage component created
- [ ] Routes tested locally
- [ ] Deploy to Vercel
- [ ] Verify pages render (e.g., /problems/honda/civic)
- [ ] Add links from vehicle pages

**SEO Checkpoint:**
- New indexable pages: 100+ (/problems/make/model combinations)
- Expected Google indexing: 2–4 weeks
- Projected traffic: 100–300 organic visits/month (month 2)

---

### MONTH 1 WRAP-UP
- [ ] 25 vehicles with complete specs
- [ ] 25 vehicles with common failures + DTC mappings
- [ ] 100+ "/problems/" pages live
- [ ] Deploy verified, no regressions
- [ ] Analytics tracking "problems page views"

**Expected Outcome:**
- ✅ 50 vehicles now have specs (was 25)
- ✅ 100+ SEO landing pages
- ✅ Users can search "Honda Civic problems" and find you
- ⏳ Traffic growth: 0 → 500–1000 organic visits/month (lagging indicator, will see in month 2)

---

## PHASE 2: MONTH 2 (Weeks 5–8)
### Goal: Scale to 100 Vehicles + Maintenance + Revenue
**Estimated Time: 100–120 hours**

### Week 5–6: Expand Vehicle Specs (25 → 50 More Vehicles)
**Time Budget:** 2–3 hours/vehicle × 25 = 50–75 hours

**Pick Next 25 Vehicles:**
- [ ] Ford Super Duty (F-250, F-350)
- [ ] Chevrolet Colorado, GMC Canyon
- [ ] Nissan Frontier, Titan
- [ ] Toyota Tundra, 4Runner
- [ ] Honda Odyssey, Ridgeline
- [ ] Chrysler Pacifica, 200, 300
- [ ] Dodge Durango, Journey
- [ ] Jeep Grand Cherokee, Compass, Renegade
- [ ] BMW 3 Series, 5 Series, X3, X5
- [ ] Mercedes C-Class, E-Class, GLC
- [ ] Audi A4, A6
- [ ] Volkswagen Golf, Jetta, Passat
- [ ] Subaru Crosstrek, Impreza, Outback
- [ ] Mazda CX-5, CX-9, Mazda3
- [ ] Kia Sportage, Optima
- [ ] Hyundai Santa Fe, Sonata
- [ ] Volvo S60, XC60
- [ ] Lexus RX, ES
- [ ] Infiniti Q50, QX60
- [ ] Acura MDX, RDX

**Process:** Same as Phase 1

**Completion Checklist:**
- [ ] 25 more vehicles added
- [ ] Specs verified against owner's manuals
- [ ] Deployed, tested

---

### Week 6–7: Maintenance Schedules (Top 50 Vehicles)
**Time Budget:** 1 hour/vehicle × 50 = 50 hours

**What to Add (Per Vehicle):**
```javascript
maintenanceSchedule: [
  { interval: "Every 5000–7500 miles", task: "Oil change", cost: 30 },
  { interval: "30,000 miles", task: "Transmission fluid inspection", cost: 0 },
  { interval: "60,000 miles", task: "Transmission fluid change", cost: 150 },
  { interval: "120,000 miles", task: "Timing belt (if applicable)", cost: 500 },
]
```

**Process:**
1. [ ] Find owner's manual maintenance section
2. [ ] Extract intervals: 5k, 10k, 15k, 30k, 60k, 100k, 120k, 150k miles
3. [ ] List task + estimated cost (research average shop rates)
4. [ ] Add to vehicleCoverageData.js

**SEO Benefit:**
- New pages: `/vehicle/:slug/maintenance`
- Keywords: "Honda Civic maintenance schedule", "Ford F-150 oil change interval", etc.

**Completion Checklist:**
- [ ] Maintenance schedules added to all 50 vehicles
- [ ] Cost estimates researched (AutoRepair.com, YourMechanic, Angie's List)
- [ ] Deployed

---

### Week 7–8: T-Codes (Transmission DTC Codes)
**Time Budget:** 3–5 days (research) + 2 days (entry)

**What to Add:**
- 100–150 transmission codes (P1000–P1999 range)
- Focus: CVT codes (Nissan, Honda, Toyota), 10-speed auto (Ford), DCT (Audi, VW)

**Data Sources:**
1. [ ] SAE J2012 standard (look up public resources)
2. [ ] YouTube: "transmission code P17F0 Nissan" (mechanics explaining)
3. [ ] OEM bulletins: Nissan CVT, Ford 10-speed, etc.

**Example Entry:**
```javascript
{
  code: "P17F0",
  title: "CVT Transmission Range Sensor A Circuit",
  causes: "CVT fluid level low, range sensor failure, wiring issue",
  severity: "High",
  steps: "Check CVT fluid level first. If low, top off and clear code. If code returns, suspect range sensor.",
  vehicle: "Nissan Sentra, Nissan Rogue (common on 2007–2012 generation)"
}
```

**Completion Checklist:**
- [ ] 100+ T-codes researched
- [ ] Added to dtcCodes.js
- [ ] Vehicle mappings linked
- [ ] Deployed

---

### Week 8: Affiliate Setup + Revenue Tracking
**Time Budget:** 1 week (signup + link updates + tracking)

**Affiliate Programs:**
1. [ ] RockAuto
   - Sign up: rockauto.com/affiliate
   - Get affiliate ID
   - Format: `rockauto.com?aff=[ID]`

2. [ ] AutoZone
   - Sign up: autozone.refersion.com

3. [ ] NAPA Auto Parts
   - Sign up: napaonline.com/partner

4. [ ] Amazon Associates
   - Sign up (if not already)
   - EPC (earnings per click) typically 6–12%

5. [ ] O'Reilly Auto Parts
   - Sign up: oreillyaffiliates.refersion.com

**Implementation:**
1. [ ] Create mapping: `vendorLinks.js`
   ```javascript
   export const vendorAffiliates = {
     rockauto: { id: "xyz", tag: "houndmoto-20" },
     autozone: { id: "abc" },
     // ...
   };
   ```

2. [ ] Update all vendor links to include affiliate tags
3. [ ] Track clicks via analytics event: "vendor_clicked"
4. [ ] Measure conversion: affiliate dashboard vs. HoundMoto analytics

**Completion Checklist:**
- [ ] Affiliate accounts created (all 5 vendors)
- [ ] Affiliate IDs retrieved
- [ ] Links updated in partsData.js
- [ ] Analytics event tracking "vendor_clicked"
- [ ] Test: click links, verify affiliate tracking

**Expected Revenue:**
- Month 1: $0 (traffic too low)
- Month 2: $50–200/month (if 1000+ visitors)
- Month 3: $200–500/month (if 5000+ visitors)

---

### MONTH 2 WRAP-UP
- [ ] 100 vehicles with complete specs
- [ ] 50 vehicles with maintenance schedules
- [ ] 100+ T-codes added
- [ ] Affiliate revenue tracking live
- [ ] Deploy verified

**Expected Outcome:**
- ✅ 100 vehicles = 80% coverage for top US makes
- ✅ 5000–10,000 organic visits/month (growing)
- ✅ $100–500/month affiliate revenue
- ✅ 50+ saved vehicles (from analytics events)

---

## PHASE 3: MONTH 3 (Weeks 9–12)
### Goal: Retention Features + Analytics + Scaling
**Estimated Time: 80–100 hours**

### Week 9: Service History Feature (Core Retention)
**Time Budget:** 1 week (code + database)

**Database Schema:**
```sql
CREATE TABLE service_history (
  id SERIAL PRIMARY KEY,
  vehicle_id UUID REFERENCES vehicles(id),
  work_type VARCHAR(100),
  date DATE,
  cost DECIMAL(10, 2),
  notes TEXT,
  mileage INT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

**Frontend Components:**
1. [ ] ServiceHistoryForm.jsx
   - Date picker, work_type dropdown, cost input, notes textarea
   - Submit creates row in service_history table

2. [ ] ServiceHistoryList.jsx
   - Show timeline: newest first
   - Edit/delete options (admin only)
   - Show "next maintenance due" based on history

3. [ ] Add to VehiclePage.jsx
   - Tab: "Service History"
   - Show list + add button

**API Endpoints:**
1. [ ] POST /api/service-history (create)
2. [ ] GET /api/service-history?vehicle_id=xyz (list)
3. [ ] PATCH /api/service-history/:id (update)
4. [ ] DELETE /api/service-history/:id (delete)

**Completion Checklist:**
- [ ] Database migration created
- [ ] API endpoints tested (Postman)
- [ ] UI components created
- [ ] Form validation added
- [ ] Deploy to Vercel

**Retention Metric:**
- Track "service_history_logged" events
- Target: 10%+ of users who view a vehicle log at least one service
- Expected impact: +5–10% 30-day retention

---

### Week 10–11: Search Analytics Dashboard
**Time Budget:** 1 week (API + admin page)

**What to Track:**
1. [ ] Search queries (make, model, year, DTC code, symptom)
2. [ ] Search success rate (did user find answer?)
3. [ ] Top 20 searches (by frequency)
4. [ ] Missing coverage (searches with no results)

**Database Query:**
```sql
SELECT event, JSON_EXTRACT(data, '$.query') as search_query, COUNT(*) as count
FROM analytics_events
WHERE event = 'search'
GROUP BY search_query
ORDER BY count DESC
LIMIT 50;
```

**Admin Page:**
1. [ ] Create `/admin/search-analytics` page
   - Show top 50 searches
   - Sort by frequency
   - Highlight: "no results found"

2. [ ] Add coverage analyzer
   - Color-code vehicles: ✅ complete, ⚠️ partial, ❌ missing
   - Sort by search frequency

**Completion Checklist:**
- [ ] Analytics tracking for searches implemented
- [ ] Admin page created
- [ ] Coverage analyzer working
- [ ] Deploy

**Use This For:**
- Identify which vehicles to prioritize next
- Spot gaps ("everyone searches 'Ford Focus transmission problems' but we have no data")
- Measure impact of data work (search success rate should ↑)

---

### Week 11–12: Community Tips Browsing + Wrap-Up
**Time Budget:** 2–3 days

**Tips Browsing Page:**
1. [ ] Create `/tips` page
2. [ ] Show approved tips (filter: `approved = true`)
3. [ ] Add upvote/downvote (localStorage or simple count)
4. [ ] Add search: `/tips?vehicle=Civic`

**Approval System (Admin):**
1. [ ] Create `/admin/tips` page
   - Show all submitted tips
   - Approve/reject buttons
   - Edit tips before publishing

**Completion Checklist:**
- [ ] Tips browsing page created
- [ ] Approval system working
- [ ] Deploy
- [ ] Email users who submitted tips (thank you)

---

### MONTH 3 WRAP-UP
- [ ] Service history feature live
- [ ] Search analytics dashboard live
- [ ] 100+ vehicles with specs + schedules
- [ ] T-codes added
- [ ] Affiliate revenue tracking
- [ ] Community tips browsing

**Final Metrics (Target):**
- 10k–20k unique visitors/month
- 5k–10k organic visits/month
- 300–500 service history logs
- $500–1500/month affiliate revenue
- 30-day retention: 20–25% (up from ~5%)

---

## SUCCESS CRITERIA FOR LAUNCH

**Before Public Launch, You Need:**

✅ **Data Coverage:**
- [ ] 100+ vehicles with complete specs (oil, fluid, tire, battery, bulb, maintenance)
- [ ] Common failures for 80+ vehicles
- [ ] 500+ DTC codes (P + T codes)

✅ **User Features:**
- [ ] Service history logging
- [ ] Saved vehicles (localStorage is fine for now)
- [ ] Active vehicle context (shown on every page)

✅ **Content / SEO:**
- [ ] 500+ indexable pages (vehicle pages + /problems/ + /recalls/)
- [ ] Common Failures search results
- [ ] Maintenance schedules visible
- [ ] Meta tags + canonical URLs

✅ **Analytics / Revenue:**
- [ ] Event tracking working (page views, searches, vendor clicks)
- [ ] Affiliate revenue tracking (at least $100/month)
- [ ] Admin search analytics dashboard
- [ ] Coverage analyzer tool

✅ **Stability:**
- [ ] No errors in Sentry (if integrated) or console logs
- [ ] Page load time <3s (90th percentile)
- [ ] Mobile-responsive on iOS + Android

**If You Hit These by September 13, 2026 → You're Launch-Ready for beta.**

---

## WEEKLY PROGRESS TRACKING

**Every Friday:** Update this table

| Week | Focus | Vehicles Completed | Pages Live | Affiliate Revenue | Notes |
|------|-------|-------------------|------------|-------------------|-------|
| 1–2 | Specs (top 25) | 25 | 0 | $0 | On track? |
| 3–4 | Common Failures | 25 | 100+ | $0 | Problems pages live |
| 5–6 | Specs (25 more) | 50 | 100+ | $0 | T-codes pending |
| 7–8 | Maintenance + T-codes | 50 | 100+ | $50 | Affiliate live |
| 9 | Service History | 50 | 100+ | $100 | Feature complete |
| 10–11 | Analytics + Tips | 50 | 100+ | $200 | Admin tools working |
| 12 | Polish + deploy | 50+ | 500+ | $300 | **LAUNCH READY** |

---

## RESOURCES YOU NEED

### Data Sources (Bookmarked)
- [ ] ManualsLib.com (free owner's manuals)
- [ ] OEM websites (Ford.com, Honda.com, Toyota.com, etc.)
- [ ] Reddit: r/cars, r/Justrolledintotheshop, vehicle-specific subreddits
- [ ] YouTube: "[vehicle] common problems"
- [ ] RepairPal.com (cost estimates)
- [ ] NHTSA TSB database (technical bulletins)

### Tools You Need
- [ ] Spreadsheet (Google Sheets or Excel) for data entry template
- [ ] GitHub desktop (for version control)
- [ ] Postman (for API testing)
- [ ] Chrome DevTools (for performance, mobile testing)
- [ ] Vercel CLI (for deployments)

### Accounts to Create
- [ ] RockAuto Affiliate
- [ ] AutoZone Affiliate
- [ ] NAPA Affiliate
- [ ] Amazon Associates
- [ ] O'Reilly Affiliate

---

## STAY FOCUSED: AVOID THESE DISTRACTIONS

❌ **Do NOT build:** Native mobile app, AI chatbot, user accounts with passwords  
❌ **Do NOT write:** 100+ repair procedures, detailed wiring diagrams  
❌ **Do NOT optimize:** Admin dashboard styling, perfect error messages (MVP only)  
❌ **Do NOT add:** New features (stick to this plan)  

✅ **DO focus on:** Data data data. The more complete your vehicle specs, the better you rank.

---

## GO/NO-GO DECISION POINTS

**End of Month 1:**
- [ ] 25 vehicles specs done?
- [ ] Common failures entered?
- [ ] "Problems" pages live?
- **GO/NO-GO:** If yes to all 3 → continue. If no → adjust scope, skip community tips, focus on specs.

**End of Month 2:**
- [ ] 50 vehicles with specs?
- [ ] Maintenance schedules entered?
- [ ] Affiliate revenue tracking?
- **GO/NO-GO:** If yes → push to Month 3. If no → reduce scope (skip analytics), focus on specs + affiliate.

**End of Month 3:**
- [ ] 100 vehicles with specs?
- [ ] Service history working?
- [ ] 10k+ visitors/month?
- **GO/NO-GO:** If yes → **LAUNCH BETA.** If no → extend 1 month, finish data work.

---

## YOU'VE GOT THIS 💪

You have a **clear roadmap**, **high-ROI improvements**, and **data-driven priorities**. 

Stick to this plan, and in 90 days you'll have:
- 100+ vehicles with complete specs
- 500+ SEO landing pages
- $300–500/month affiliate revenue
- Repeat-visit users (service history)
- Real traction for fundraising or scaling

**Start with Week 1: Pick 25 vehicles, find owner's manuals, enter specs. That's it.**

Good luck! 🚀

