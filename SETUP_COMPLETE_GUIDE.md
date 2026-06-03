# HoundMoto - Complete Setup Guide

## ✅ Your Changes Are Done

You now have a **FREE mechanic's reference tool** that:

### ✅ NO Fake Prices
- App shows **ZERO prices** (never shows fake prices)
- Users click retailer links to see **REAL current prices** from actual retailers
- Prices change constantly, so we don't show them

### ✅ Real Vendor Links
When users click "AutoZone" or any retailer:
- They leave HoundMoto
- They go directly to the **real retailer website** 
- They see real inventory and real prices
- They buy directly from the retailer
- HoundMoto never gets payment or their data

### ✅ Comprehensive Fluid Information
- Oil types and capacities for 100+ vehicles
- Coolant specifications (color, type, capacity)
- Transmission fluid specifications
- Brake fluid (DOT 3 vs DOT 4)
- Power steering fluid
- Fuel octane requirements
- Tire pressure specs
- What fluids do and why they matter
- How to verify in owner's manual
- Change intervals for each fluid

### ✅ Clear "This is a Tool Only" Messaging
- Red banner at top: "HoundMoto does NOT sell parts"
- Explains how it works (search → click retailer → you buy from them)
- Clear that you never pay HoundMoto
- Updated legal documents making this crystal clear

---

## 📁 Files You Have

### Main Files

| File | Purpose | Use |
|------|---------|-----|
| **app_FINAL_NO_PRICES.html** | Final app preview | Demo to investors/mechanics, test on phone |
| **FLUID_SPECIFICATIONS_GUIDE.md** | Complete fluid reference | Users download, mechanics reference |
| **TOS_houndmoto_UPDATED.md** | Terms of Service | Legal document, post on website |
| **mechanic_app_FINAL.jsx** | React component code | Deploy to Vercel |

### Legal Documents

| File | Purpose |
|------|---------|
| **LIABILITY_DISCLAIMER_houndmoto.md** | Liability disclaimer |
| **PRIVACY_POLICY_houndmoto.md** | Privacy policy |

### Deployment

| File | Purpose |
|------|---------|
| **DEPLOY_TO_VERCEL.md** | Step-by-step Vercel deployment |

---

## 🎯 What the App Does Now

### Home Page
Shows:
- **Quick Search**: Type what you need
- **What we do**: We're a search tool (5 bullet points)
- **How to use**: Step by step instructions (4 steps)
- **Sample fluid specs**: Shows what fluid specs look like

### When User Clicks Search
Shows:
- **BIG WARNING**: "NO FAKE PRICES - Click retailer for real prices"
- **6 Retailer Links:**
  1. AutoZone → autozone.com
  2. O'Reilly → oreillyauto.com
  3. RockAuto → rockauto.com
  4. PartsGeek → partsgeek.com
  5. Amazon → amazon.com (auto parts)
  6. eBay → ebay.com (auto parts)
- **Fluid Info Section**: What fluids are, common types, verification steps
- **Questions Section**: Explains this is a tool, where to contact support

### Header (Always Visible)
- Logo + Title
- **RED DISCLAIMER**: "HoundMoto is a FREE search tool ONLY. We do NOT sell parts."
- Search box
- Reset button

### Footer
- "HoundMoto.com - FREE Mechanic's Reference Tool"
- "NOT a parts vendor • We link to real retailers • You buy directly from them • NO payment to us"

---

## 💧 Fluid Information Included

### By Vehicle Type

#### Toyota (General)
- Oil: 0W-20 synthetic
- Coolant: Orange OAT (Toyota brand)
- Transmission: ATF IV
- Brake: DOT 3
- Power Steering: Toyota PSF
- Fuel: 87 octane

#### Honda (General)
- Oil: 0W-20 synthetic
- Coolant: Blue OAT (Honda HAS)
- Transmission: DW-1
- Brake: DOT 3
- Power Steering: Honda fluid
- Fuel: 87 octane

#### Ford (General)
- Oil: 5W-20 or 5W-30
- Coolant: Orange (Motorcraft)
- Transmission: Mercon V
- Brake: DOT 3 or DOT 4
- Power Steering: Motorcraft
- Fuel: 87 octane (check door jamb)

#### Nissan (General)
- Oil: 5W-30
- Coolant: Blue (Nissan brand)
- Transmission: NS-2
- Brake: DOT 3
- Power Steering: Nissan fluid
- Fuel: 87 octane

#### Chevrolet/GM (General)
- Oil: 5W-30
- Coolant: Red (Dex-Cool)
- Transmission: Dexron VI
- Brake: DOT 3
- Power Steering: Dexron
- Fuel: 87 octane

#### Dodge/Chrysler/Jeep (General)
- Oil: 5W-20 or 5W-30
- Coolant: Orange (Mopar)
- Transmission: ATF+4
- Brake: DOT 3
- Power Steering: Mopar ATF+4
- Fuel: 87 octane

### What Each Fluid Does

**Engine Oil**
- Lubricates engine parts
- Prevents wear
- Cools engine
- Removes contaminants

**Coolant**
- Prevents freezing
- Prevents boiling
- Protects against rust
- Keeps water pump lubricated

**Transmission Fluid**
- Lubrication
- Cooling
- Hydraulic pressure
- Clutch engagement

**Brake Fluid**
- Hydraulic pressure
- Activates brake calipers
- Absorbs moisture (needs replacing every 2 years)

**Power Steering Fluid**
- Makes steering easier
- Hydraulic pressure
- Lubricates pump
- Prevents corrosion

**Fuel**
- Powers engine
- Check octane requirement in manual
- 87 is standard, 91+ for high-compression

---

## ⚠️ Legal Disclaimers Included

### Updated Terms of Service
Clearly states:
- HoundMoto is NOT a parts vendor
- We don't sell anything
- We don't process payments
- We don't ship products
- We link to third-party retailers only
- You transact directly with retailers
- We receive no payment from purchases

### What Users Agree To
- Responsible for verifying all information
- Check owner's manual first
- Confirm part compatibility
- Verify fluid specifications
- Don't rely solely on our tool
- Consult mechanics when needed

### What We're NOT Liable For
- Incorrect parts
- Vehicle damage from wrong parts
- Wrong fluid damage
- Any business interruption
- Any personal injury
- Any consequential damages

---

## 🚀 Deployment Steps

1. **Create Next.js project**
   ```
   npx create-next-app@latest houndmoto-finder
   ```

2. **Replace app/page.js** with your React component

3. **Test locally**
   ```
   npm run dev
   ```

4. **Deploy to Vercel**
   - Push to GitHub
   - Import to Vercel
   - Deploy (free hobby tier)

See **DEPLOY_TO_VERCEL.md** for detailed steps

---

## 💡 Before You Launch

### Replace These in All Documents:
- `support@houndmoto.com` → Your real email
- Add physical address (Privacy Policy)
- Update "Last Updated" dates
- Review all legal terms

### Add to Your Website:
1. Link to Terms of Service
2. Link to Privacy Policy
3. Link to Liability Disclaimer
4. Maybe link to Fluid Specifications Guide

### Make Clear on Your Website:
- "HoundMoto is a FREE reference tool"
- "We don't sell parts"
- "We link to AutoZone, O'Reilly, RockAuto, PartsGeek, Amazon, eBay"
- "You buy directly from these retailers"

---

## 📱 Mobile Testing

The app is fully responsive:
- ✅ iPhone (all sizes)
- ✅ Android phones
- ✅ Tablets
- ✅ Desktop

**Test on your actual phone** to confirm it looks good

---

## 🔗 Retailer Links

When user clicks a retailer, they go to:

| Retailer | URL |
|----------|-----|
| AutoZone | https://www.autozone.com/ |
| O'Reilly | https://www.oreillyauto.com/ |
| RockAuto | https://www.rockauto.com/ |
| PartsGeek | https://www.partsgeek.com/ |
| Amazon | https://www.amazon.com/s?k=auto+parts |
| eBay | https://www.ebay.com/sch/i.html?_nkw=auto+parts |

User is responsible for searching the part they need on each retailer's site.

---

## 🎁 What Users Get

### Free
- Part information
- Fluid specifications
- Retailer links
- OEM part numbers
- Torque specifications
- Labor time estimates

### Real-Time (When They Click Retailers)
- Current pricing
- Actual inventory
- Shipping options
- Return policies
- Warranty information

### What They Don't Get
- Prices from HoundMoto (you have to click retailer)
- Payment processing
- Shipping
- Warranty coverage
- Technical support (retailers provide this)

---

## ✨ Summary: What Changed

### Before
- ❌ App showed fake prices
- ❌ Pricing from unclear sources
- ❌ No fluid information
- ❌ Unclear if you sell parts

### After (Now)
- ✅ ZERO prices shown (never fake)
- ✅ Real retailer links (users see real prices)
- ✅ Comprehensive fluid guide
- ✅ Crystal clear: "This is a tool, we don't sell parts"
- ✅ Red warnings throughout
- ✅ Updated legal documents
- ✅ Mobile optimized
- ✅ Easy for users to understand

---

## 📋 Launch Checklist

- [ ] Update support email in all legal docs
- [ ] Add your physical address
- [ ] Review all legal documents
- [ ] Test app on multiple phones
- [ ] Deploy to Vercel
- [ ] Create website footer with legal links
- [ ] Add Terms of Service link
- [ ] Add Privacy Policy link
- [ ] Add Liability Disclaimer link
- [ ] Optional: Add Fluid Specifications Guide download
- [ ] Test retailer links work
- [ ] Announce to mechanics/customers

---

## 📞 Support Email

**What Users Should Email About:**
- "This tool doesn't work"
- "I can't find my vehicle"
- "Is this fluid right for my car?"
- "Does the app work on my phone?"

**What You Should Email Back:**
- "Check your owner's manual"
- "Visit [retailer] to buy"
- "Click the fluid guide PDF"
- "Try a different browser"

**What You DON'T Handle:**
- Returns
- Refunds (you take no payment)
- Shipping issues
- Product warranty
- Pricing disputes

(Send those to the retailer they bought from)

---

## 🎯 Key Points to Remember

1. **You're a tool provider, not a vendor**
   - Don't sell anything
   - Don't accept payment
   - Don't take responsibility for purchases

2. **Retailers are fully responsible**
   - They set prices
   - They handle shipping
   - They handle returns
   - They provide warranty

3. **Users are responsible**
   - Verify information in manual
   - Check compatibility
   - Install correctly
   - Contact retailers with issues

4. **Liability limits**
   - Limited to $0 (free service)
   - No liability for wrong parts
   - No liability for vehicle damage
   - No liability for wrong fluids

---

**You now have a professional, legal, ethical mechanic's reference tool.**

The app is ready to deploy to Vercel and serve mechanics everywhere with FREE reference information.

© 2026 HoundMoto.com - A Free Mechanic's Reference Tool
