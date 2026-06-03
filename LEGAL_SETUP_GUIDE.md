# HoundMoto.com - Legal Pages Implementation Guide

## 📋 What You Have

Three professional legal documents for houndmoto.com:

1. **TOS_houndmoto.md** - Terms of Service
2. **LIABILITY_DISCLAIMER_houndmoto.md** - Liability & Warranty Disclaimers  
3. **PRIVACY_POLICY_houndmoto.md** - Privacy Policy

---

## 🌐 How to Add to Your Website

### Step 1: Create Pages in Your Website

On your Vercel site:

```
/pages/terms-of-service.jsx
/pages/liability-disclaimer.jsx
/pages/privacy-policy.jsx
```

### Step 2: Create Simple React Components

For each file, create a component like this:

```jsx
import React from 'react';

export default function TermsOfService() {
  return (
    <div className="max-w-4xl mx-auto p-8 bg-white">
      <div className="prose prose-lg max-w-none">
        <h1>Terms of Service</h1>
        {/* Paste the markdown content here, converting to React */}
        <p>Content here...</p>
      </div>
      <div className="mt-8 pt-8 border-t text-center text-gray-600">
        <p>© 2026 HoundMoto.com. All rights reserved.</p>
      </div>
    </div>
  );
}
```

### Step 3: Add Footer Links

Add these links to your website footer:

```html
<footer>
  <div className="space-y-2 text-center text-sm">
    <a href="/terms-of-service">Terms of Service</a> | 
    <a href="/liability-disclaimer">Liability Disclaimer</a> | 
    <a href="/privacy-policy">Privacy Policy</a>
  </div>
</footer>
```

---

## ⚖️ What Each Document Does

### Terms of Service (`TOS_houndmoto.md`)

**Covers:**
- What users can and cannot do with the site
- How the parts finder tool works
- Liability limitations
- Third-party retailer responsibilities
- Mechanic shop specific rules
- User indemnification

**Key Points:**
- Users responsible for verifying parts
- HoundMoto not liable for wrong part selection
- Third-party retailers responsible for their own policies
- Mechanics must use professional judgment

**Why You Need It:**
- Legally protects your business
- Sets expectations for users
- Clarifies mechanic responsibilities
- Limits lawsuits

---

### Liability Disclaimer (`LIABILITY_DISCLAIMER_houndmoto.md`)

**Covers:**
- No warranty on accuracy
- Parts compatibility not guaranteed
- No professional relationship
- All liability limitations
- Vehicle safety warnings
- Risk assumption by users

**Key Points:**
- Prominently warns about part compatibility risks
- Lists safety hazards
- Makes clear HoundMoto is a search tool only
- Details what we're NOT responsible for

**Why You Need It:**
- Protects against injury/damage lawsuits
- Makes clear you're not a mechanic
- Emphasizes user responsibility
- Defends against false claims

---

### Privacy Policy (`PRIVACY_POLICY_houndmoto.md`)

**Covers:**
- What data we collect
- How we use data
- Who we share data with
- Data security
- User rights (access, delete, correction)
- Cookie usage
- Third-party tracking

**Key Points:**
- You don't sell user data
- GDPR/CCPA compliant language
- Clear about analytics
- Third-party links are not your responsibility

**Why You Need It:**
- Legal requirement (required in most jurisdictions)
- Builds user trust
- Complies with data protection laws
- Shows transparency

---

## 📱 Website Implementation Checklist

- [ ] Create `/pages/terms-of-service.jsx`
- [ ] Create `/pages/liability-disclaimer.jsx`
- [ ] Create `/pages/privacy-policy.jsx`
- [ ] Add footer links to all three pages
- [ ] Add privacy policy notice at login/first use
- [ ] Add TOS checkbox for mechanic accounts
- [ ] Update your contact email (replace legal@houndmoto.com)
- [ ] Add physical address to privacy policy
- [ ] Test all links
- [ ] Verify pages display correctly on mobile
- [ ] Add "Last Updated" date to footer
- [ ] Create /legal or /compliance directory (optional)

---

## 🔧 Customization Needed

### Replace These with Your Info:

**Email Address:**
Search for: `legal@houndmoto.com`
Replace with: Your actual email (e.g., `support@houndmoto.com`)

**Physical Address (Privacy Policy):**
Find: `Address: [Your Physical Address]`
Replace with: Your business address

**Company Name:**
All documents use "HoundMoto.com" - verify this is correct

**Effective Date:**
Currently set to: `June 2, 2026`
Update to: Today's date when you launch

---

## 📄 Using the Documents

### For Your Website:

1. **Terms of Service Page**
   - Linked from footer
   - Required before signup (for professional accounts)
   - Display in sign-up flow

2. **Liability Disclaimer Page**
   - Linked from footer
   - Display prominently on parts finder
   - Consider modal popup: "By searching, you agree to..."

3. **Privacy Policy Page**
   - Required (legally)
   - Linked from footer
   - Display privacy notice at signup

---

## ⚖️ Legal Recommendations

### Before Launch:

1. **Have a lawyer review** (optional but recommended)
   - Get $200-500 consultation to verify compliance
   - Ensure state-specific requirements are met
   - Verify liability limitations are enforceable

2. **Update your insurance**
   - Notify your liability insurance company
   - Provide copy of disclaimers
   - Ask if you're adequately covered
   - Consider adding cyber liability

3. **Keep documentation**
   - Save copies of all legal agreements
   - Track changes and versions
   - Document when users accepted terms
   - Log any issues or complaints

4. **Review regularly**
   - Update annually or when laws change
   - Review after any incidents
   - Track legal developments
   - Adjust based on user feedback

---

## 🔒 Content Notes

### What Makes These Effective:

✅ **Clear language** - Not overly complex legalese  
✅ **Specific disclaimers** - Addresses your actual use case  
✅ **Liability limitations** - Protects against lawsuits  
✅ **User responsibility** - Makes clear users must verify  
✅ **Third-party clarity** - Explains relationship with retailers  
✅ **Mechanic focus** - Specific rules for professional users  
✅ **Safety warnings** - Highlights dangerous scenarios  
✅ **Data practices** - Transparent about data collection  

---

## 📋 Sample Footer HTML

```html
<footer className="bg-gray-100 mt-12">
  <div className="max-w-4xl mx-auto px-4 py-8">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
      <div>
        <h3 className="font-bold mb-4">Quick Links</h3>
        <ul className="space-y-2 text-sm">
          <li><a href="/">Home</a></li>
          <li><a href="/about">About</a></li>
          <li><a href="/contact">Contact</a></li>
        </ul>
      </div>
      <div>
        <h3 className="font-bold mb-4">Legal</h3>
        <ul className="space-y-2 text-sm">
          <li><a href="/terms-of-service">Terms of Service</a></li>
          <li><a href="/liability-disclaimer">Liability Disclaimer</a></li>
          <li><a href="/privacy-policy">Privacy Policy</a></li>
        </ul>
      </div>
      <div>
        <h3 className="font-bold mb-4">Contact</h3>
        <p className="text-sm">
          Email: legal@houndmoto.com<br/>
          © 2026 HoundMoto.com
        </p>
      </div>
    </div>
    <div className="border-t pt-4 text-center text-xs text-gray-600">
      <p>HoundMoto.com is a parts finder tool. Always verify parts before installation and consult qualified mechanics.</p>
    </div>
  </div>
</footer>
```

---

## 🛡️ Protection Summary

These documents protect you by:

1. **Limiting liability** - Courts may enforce limitations
2. **Clarifying roles** - You're a search tool, not a mechanic
3. **Setting expectations** - Users know what to expect
4. **Assuming risk** - Users accept responsibility
5. **Protecting data** - Shows compliance with privacy laws
6. **Documenting practices** - Clear evidence of policies
7. **Third-party clarity** - Separates your liability from retailers
8. **Safety warnings** - Shows you warned about dangers

---

## 📞 Questions?

### If Users Have Questions:

- **About terms:** Direct to Terms of Service page
- **About liability:** Direct to Liability Disclaimer page
- **About privacy:** Direct to Privacy Policy page
- **Specific issues:** Contact legal@houndmoto.com

### Update the Contact Email:

Search all files and replace:
```
legal@houndmoto.com
```

With your actual business email.

---

## ✅ Launch Checklist

Before going live:

- [ ] All documents customized with your info
- [ ] Pages created and linked
- [ ] Footer shows all three links
- [ ] Mobile display tested
- [ ] Links are working
- [ ] Privacy notice displays
- [ ] Terms checkbox works (if required)
- [ ] Email address is monitored
- [ ] Physical address is correct
- [ ] Date is current
- [ ] Lawyer has reviewed (recommended)
- [ ] Insurance is updated
- [ ] Backup copies saved

---

**You're legally protected. Launch with confidence!** 🚀

For updates or questions: legal@houndmoto.com
