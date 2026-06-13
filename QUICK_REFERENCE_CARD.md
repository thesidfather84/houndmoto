# HoundMoto Quick Reference Card
## Print This & Put It On Your Desk

---

## TODAY'S SCORE
```
Usefulness        ████░░░░░░  5/10
Diagnostics       ██████░░░░  6/10
SEO Ready         ███████░░░  7/10
Data Coverage     ████░░░░░░  4/10 ⚠️ CRITICAL GAP
Mobile            ███████░░░  7/10
Launch Ready      ████░░░░░░  5/10 ⚠️ NOT READY
```
**Status:** 40% MVP, 94% of vehicles missing specs

---

## TOP 5 PRIORITIES (DO THESE FIRST)

| # | Feature | Type | Time | ROI |
|---|---------|------|------|-----|
| 1️⃣ | Expand vehicle specs (50) | Data | 2–3 wks | 9.7 ⭐⭐⭐ |
| 2️⃣ | Common failures (50) | Data | 1–2 wks | 12.0 ⭐⭐⭐ |
| 3️⃣ | "Problems by Make" pages | UX | 1–2 days | 12.0 ⭐⭐⭐ |
| 4️⃣ | Oil/fluid specs (35 makes) | Data | 3–4 wks | 6.75 ⭐⭐ |
| 5️⃣ | "Problems by Year" pages | UX | 3–5 days | 9.2 ⭐⭐⭐ |

---

## 90-DAY PLAN

### MONTH 1 (Weeks 1–4)
- [ ] Pick 25 vehicles
- [ ] Find owner's manuals
- [ ] Extract specs → enter data
- [ ] Add common failures
- [ ] Launch "Problems" pages
- **Output:** 25 vehicles, 100+ SEO pages

### MONTH 2 (Weeks 5–8)
- [ ] Specs for 25 more vehicles (50 total)
- [ ] Add maintenance schedules
- [ ] Add T-codes (transmission)
- [ ] Set up affiliate revenue
- **Output:** 50 vehicles, affiliate tracking

### MONTH 3 (Weeks 9–12)
- [ ] Service history feature
- [ ] Search analytics dashboard
- [ ] Coverage analyzer tool
- [ ] Polish & launch
- **Output:** 100 vehicles, analytics, revenue tracking

**GOAL:** 100 vehicles, 5k+ monthly visitors, $200–500/month revenue, **LAUNCH READY**

---

## PROBLEM TYPE BREAKDOWN

```
Data Problems (66)      ███████████░░░░░░░░  Easy!    12–16 weeks
Code Problems (24)      ███████░░░░░░░░░░░░  Medium!  6–8 weeks
UX Problems (22)        ██████░░░░░░░░░░░░░  Quick!   2–4 weeks
Infrastructure (19)     █████░░░░░░░░░░░░░░  Hard!    4–6 weeks
```

**Strategy:** Do Data first (high ROI, low effort)

---

## WHAT TO FOCUS ON

✅ **DO THIS:**
- [ ] Vehicle specs expansion
- [ ] Common failures database
- [ ] DTC code expansion (T, C, B codes)
- [ ] Maintenance schedules
- [ ] Service history feature
- [ ] Affiliate revenue tracking
- [ ] "Problems by Make/Year" pages

❌ **DON'T DO THIS (YET):**
- Native mobile app
- Detailed repair procedures (100+ hrs)
- Wiring diagrams
- User accounts with passwords
- Premium tier (too early)

⚠️ **DO LATER (Post-Launch):**
- PWA offline mode
- Blog articles
- Advanced AI features
- Mechanic directory
- Advanced analytics

---

## DATA ENTRY PROCESS (Per Vehicle)

**Time per vehicle:** 1–2 hours

1. Find owner's manual
   - ManualsLib.com
   - OEM website (Ford.com, etc.)
   - Archive.org
   
2. Extract specs
   - Oil type + capacity
   - Transmission fluid
   - Tire size
   - Battery group
   - Wiper sizes
   - Bulb types

3. Enter into `vehicleCoverageData.js`
   - Use existing entry as template
   - Include generation (yearStart, yearEnd)
   - Note: "Verify in owner's manual"

4. Deploy & test
   - Local: `npm run dev`
   - Check vehicle page renders
   - Deploy to Vercel

5. Track progress
   - Spreadsheet: ✅ mark complete
   - PR on GitHub
   - Weekly report

---

## SUCCESS METRICS (TRACK WEEKLY)

| Metric | Week 1 | Week 4 | Week 8 | Week 12 |
|--------|--------|--------|--------|---------|
| Vehicles | 1 | 25 | 50 | 100 |
| Pages | 0 | 100+ | 100+ | 500+ |
| Visitors | ~0 | ~100 | ~500 | ~2000 |
| Affiliate $ | $0 | $0 | $50–200 | $200–500 |

---

## TIME BREAKDOWN (Per Week)

```
Data Entry      ██████████░░  60%  (24 hrs)
Code/Deploy     ███░░░░░░░░░  15%  (6 hrs)
Planning        ██░░░░░░░░░░  10%  (4 hrs)
Meetings/Admin  ██░░░░░░░░░░  15%  (6 hrs)
                ─────────────────
Total:          40 hours/week
```

---

## WEEKLY TEMPLATE

**Every Friday, 30 minutes:**

```markdown
# Week [N] Report

## Completed
- [ ] Task 1: [details]
- [ ] Task 2: [details]

## In Progress
- [ ] Next task

## Metrics
- Vehicles complete: X/100
- New SEO pages: Y
- Organic visitors: Z/month (est.)
- Revenue: $W

## Blockers
[Any challenges?]

## Next Week
[What's next?]
```

---

## AFFILIATE PROGRAM SIGN-UPS

- [ ] RockAuto → Get affiliate ID
- [ ] NAPA → Register for program
- [ ] AutoZone → Link account
- [ ] Amazon Associates → Create account
- [ ] O'Reilly Auto → Apply for program

**Expected Commission:**
- RockAuto: 5–6% per sale
- NAPA: 4–5% per click
- Amazon: 6–12% depending on category
- **Average:** $1–5 per 100 visitors

---

## GO/NO-GO CHECKPOINTS

### End of Month 1
- [ ] 25 vehicles specs entered?
- [ ] Common failures documented?
- [ ] "Problems" pages live?
- **GO → Continue**
- **NO-GO → Adjust scope, speed up**

### End of Month 2
- [ ] 50 vehicles specs done?
- [ ] Maintenance schedules entered?
- [ ] Affiliate revenue tracking?
- **GO → Push to Month 3**
- **NO-GO → Reduce scope, focus specs**

### End of Month 3
- [ ] 100 vehicles with specs?
- [ ] Service history working?
- [ ] 5k+ monthly visitors?
- **GO → LAUNCH BETA**
- **NO-GO → Extend 1 month**

---

## WHEN TO RAISE MONEY

**Don't raise yet if:**
- Traffic < 5k/month organic
- Affiliate revenue < $100/month
- Less than 50 vehicles with specs

**Do raise when:**
- 10k+ monthly visitors
- $300+ monthly revenue
- 100+ vehicles with specs
- Proven retention (service history)
- Strong organic growth (trending up)

**Use money for:**
1. Hire data entry contractor ($5k)
2. Expand to 300+ vehicles (12 weeks)
3. Grow revenue to $3k+/month
4. Then hire developer for scaling

---

## TOOLS YOU NEED

**Free:**
- ManualsLib.com (owner's manuals)
- GitHub (code)
- Vercel (hosting)
- Google Analytics (traffic)
- Google Sheets (data tracking)

**Paid (Optional):**
- Sentry ($20/mo) - error logging
- Mailchimp ($20/mo) - email newsletters
- Stripe ($0 + 2.9%) - payments (later)

**Total Cost First 90 Days:** ~$0–50

---

## BURNOUT PREVENTION

This is a marathon, not a sprint.

✅ **Do:**
- Work in 2–3 hour blocks
- Take weekends off
- Track weekly progress (celebration!)
- Measure early wins (organic traffic, affiliate revenue)

❌ **Don't:**
- Work 80+ hours/week
- Obsess over code optimization
- Build features nobody asked for
- Compare to competitors

**Remember:** 90 days to 100 vehicles. Focus on boring data work. Let the product sell itself through SEO.

---

## RED FLAGS (When to Pivot)

🚩 **If after 4 weeks:**
- You hate data entry → Hire contractor or pivot
- No organic traffic growth → Check analytics, adjust keywords
- Affiliate commission is 0 → Traffic too low, push harder
- Code bugs blocking work → Fix fast or simplify

🚩 **If after 8 weeks:**
- Still < 50 vehicles → You're too slow, streamline process
- Still < 2k organic visitors → SEO strategy wrong, analyze
- Affiliate < $50/month → Continue, traffic lag is normal

✅ **If everything looks good:**
- Keep pushing exactly as planned
- Don't add new features (distracting)
- Don't pivot (you have proof)

---

## COMMUNICATION SCRIPT

When people ask "What are you building?"

> "HoundMoto is a search engine for vehicle specs. You search your car, we tell you the exact oil type, fluid specs, tire size, battery size, and common problems. Free, no signup. 
>
> Right now we've got specs for 50 vehicles and DTC lookup. We're expanding to 100+ vehicles in the next 90 days.
>
> Revenue is affiliate commissions (RockAuto, AutoZone, etc.). We're growing 500+ new visitors/month from organic search."

---

## YOUR MANTRA FOR 90 DAYS

```
DATA > CODE
COMPLETION > PERFECTION
BORING > FLASHY
EXECUTION > PLANNING
```

The boring data work will make you 10x more valuable than any code.

---

## YOU'VE GOT THIS 💪

- [x] You have a clear plan
- [x] You know the priorities
- [x] You know the ROI
- [x] You know the timeline
- [x] You know what to measure

Now: **Stop reading. Start building.**

**Week 1:** Pick 25 vehicles, find PDFs, enter 5 vehicles' specs.

**That's literally it.**

Good luck. 🚀

---

## PIN THIS SOMEWHERE VISIBLE

```
GOAL: 100 vehicles in 90 days
START: June 13, 2026
END: September 13, 2026

Week 1–4:  25 vehicles + 100 SEO pages
Week 5–8:  50 vehicles + affiliate revenue
Week 9–12: 100 vehicles + service history + analytics

✅ Data first, code later
✅ Boring work, big ROI
✅ Measure everything
✅ You can do this solo
```

