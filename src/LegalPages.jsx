// HoundMoto Legal Pages — Terms, Privacy, Disclaimer, Contact
// No personal address, ownership details, or identifying info exposed.

import { Link } from "react-router-dom";

const YEAR = new Date().getFullYear();

function LegalPage({ title, onClose, children }) {
  return (
    <main className="app">
      <div className="legalPage">
        <div className="legalTopBar">
          <span className="brand" style={{ fontSize: "18px" }}>HoundMoto</span>
          <button className="wzNavBtn" onClick={onClose}>← Back to Search</button>
        </div>
        <div className="legalBody">
          <h1 className="legalTitle">{title}</h1>
          {children}
          <nav style={{ marginTop: "24px", display: "flex", flexWrap: "wrap", gap: "16px" }}>
            <Link to="/terms" className="legalLink">Terms</Link>
            <Link to="/privacy" className="legalLink">Privacy</Link>
            <Link to="/disclaimer" className="legalLink">Disclaimer</Link>
            <Link to="/contact" className="legalLink">Contact</Link>
          </nav>
          <p className="legalFootnote">© {YEAR} HoundMoto. All Rights Reserved.</p>
        </div>
      </div>
    </main>
  );
}

// ── Terms & Conditions ────────────────────────────────────────────────────────
export function TermsPage({ onClose }) {
  return (
    <LegalPage title="Terms & Conditions" onClose={onClose}>
      <p className="legalDate">Last updated: June 2025</p>

      <h2>1. Acceptance of Terms</h2>
      <p>
        By accessing or using HoundMoto ("the Site"), you agree to be bound by these Terms &amp; Conditions.
        If you do not agree, please discontinue use of the Site immediately.
      </p>

      <h2>2. Nature of Information</h2>
      <p>
        HoundMoto is an informational and educational automotive reference resource. All content — including
        vehicle specifications, fluid capacities, diagnostic trouble codes, maintenance notes, and symptom
        guidance — is provided for general educational purposes only.
      </p>
      <p>
        Information on this Site may be incomplete, contain errors, or be outdated. Vehicle specifications
        vary by trim level, production date, region, and optional equipment. Always verify any specification
        against the official owner's manual, door sticker, or a qualified automotive professional before
        performing any service or repair.
      </p>

      <h2>3. No Professional Advice</h2>
      <p>
        Nothing on HoundMoto constitutes professional mechanical, engineering, safety, legal, or financial
        advice. The Site does not provide certified repair procedures, manufacturer-endorsed specifications,
        or safety-critical guidance. Do not substitute the information on this Site for advice from a licensed
        automotive technician or engineer.
      </p>

      <h2>4. User Responsibility and Assumption of Risk</h2>
      <p>
        You are solely responsible for any actions you take based on information found on HoundMoto. Vehicle
        repair and maintenance involves risk of injury, property damage, and death. By using this Site, you
        acknowledge and assume all risks associated with vehicle service and repair activities.
      </p>
      <p>
        Always follow proper safety procedures, use appropriate personal protective equipment, and consult a
        qualified professional for safety-critical systems including but not limited to brakes, steering,
        suspension, fuel systems, airbags, and electrical systems.
      </p>

      <h2>5. Limitation of Liability</h2>
      <p>
        HoundMoto, its operators, contributors, and affiliates shall not be liable for any direct, indirect,
        incidental, consequential, or punitive damages arising from use of this Site, including but not
        limited to vehicle damage, personal injury, property damage, lost income, or repair costs. This
        limitation applies regardless of the legal theory under which liability is claimed.
      </p>

      <h2>6. Third-Party Links</h2>
      <p>
        The Site may link to third-party retailers, service providers, and information sources. HoundMoto
        does not endorse or control third-party content and is not responsible for the accuracy, availability,
        or practices of any third-party site.
      </p>

      <h2>7. Intellectual Property</h2>
      <p>
        All original content, organization, data structures, and design elements on HoundMoto are the
        property of HoundMoto. Automotive specifications and OBD-II codes are industry standards and not
        proprietary to HoundMoto.
      </p>

      <h2>8. Modifications</h2>
      <p>
        These Terms may be updated at any time without prior notice. Continued use of the Site after any
        update constitutes acceptance of the revised Terms.
      </p>

      <h2>9. Governing Law</h2>
      <p>
        These Terms are governed by applicable law. Any disputes shall be resolved in a court of competent
        jurisdiction.
      </p>
    </LegalPage>
  );
}

// ── Privacy Policy ────────────────────────────────────────────────────────────
export function PrivacyPage({ onClose }) {
  return (
    <LegalPage title="Privacy Policy" onClose={onClose}>
      <p className="legalDate">Last updated: June 2025</p>

      <h2>Our Commitment to Privacy</h2>
      <p>
        HoundMoto is committed to protecting your privacy. We collect minimal information, and we do not
        sell, trade, or share personal information with third parties for marketing purposes.
      </p>

      <h2>What We Collect</h2>
      <ul>
        <li>
          <strong>Search terms and interactions:</strong> When you use the search feature, we may log
          anonymized search queries to understand what information is most useful and to improve the Site.
          Searches are not linked to identifiable individuals.
        </li>
        <li>
          <strong>Visitor statistics:</strong> We count site visits to understand overall usage. This
          counter stores only a total count — no IP addresses, no device identifiers, and no personal data.
        </li>
        <li>
          <strong>Analytics events:</strong> We log anonymized event data such as which features are used,
          to improve the Site experience. This data does not include names, email addresses, or other
          personal identifiers.
        </li>
        <li>
          <strong>Contact form submissions:</strong> If you use the contact form, your message and email
          address are used only to respond to your inquiry. This information is not shared with third parties.
        </li>
      </ul>

      <h2>What We Do Not Collect</h2>
      <ul>
        <li>We do not collect your name, physical address, phone number, or date of birth.</li>
        <li>We do not store IP addresses in association with search activity.</li>
        <li>We do not use third-party advertising trackers.</li>
        <li>We do not sell personal data to any third party.</li>
        <li>We do not require account creation or login to use the Site.</li>
      </ul>

      <h2>Cookies</h2>
      <p>
        HoundMoto uses cookies only when technically necessary for site functionality (such as maintaining
        a session identifier for anonymous analytics). We do not use advertising cookies or tracking pixels.
      </p>

      <h2>Data Retention</h2>
      <p>
        Anonymized usage data may be retained for up to 24 months for analytics purposes. Contact form
        inquiries are retained only as long as necessary to resolve your request.
      </p>

      <h2>Third-Party Services</h2>
      <p>
        HoundMoto is hosted on Vercel. Basic infrastructure data (such as server access logs) may be
        processed by Vercel in accordance with their privacy policy. We do not control Vercel's
        data practices.
      </p>
      <p>
        Links to third-party retailers (AutoZone, RockAuto, Amazon, etc.) are provided for convenience.
        Those sites have their own privacy policies, which we do not control.
      </p>

      <h2>Your Rights</h2>
      <p>
        Because we do not collect personal information linked to identifiable individuals, most privacy
        rights requests do not apply. If you submitted a contact form and wish to have that information
        deleted, please contact us and we will honor the request.
      </p>

      <h2>Changes to This Policy</h2>
      <p>
        This policy may be updated at any time. Continued use of the Site after an update constitutes
        acceptance of the revised policy.
      </p>

      <h2>Contact</h2>
      <p>
        For privacy questions, please use the <Link to="/contact" className="legalLink">Contact page</Link>.
      </p>
    </LegalPage>
  );
}

// ── Disclaimer ────────────────────────────────────────────────────────────────
export function DisclaimerPage({ onClose }) {
  return (
    <LegalPage title="Disclaimer" onClose={onClose}>
      <p className="legalDate">Last updated: June 2025</p>

      <div className="legalNotice">
        <div className="legalNoticeTitle">IMPORTANT NOTICE</div>
        <p>
          HoundMoto provides informational and educational automotive content only.
          HoundMoto does not provide professional mechanical, engineering, legal, financial,
          safety, or manufacturer-certified advice of any kind.
        </p>
      </div>

      <h2>Informational Purpose Only</h2>
      <p>
        All content on HoundMoto — including vehicle specifications, oil capacities, fluid types,
        tire sizes, battery groups, wiper measurements, OBD-II diagnostic codes, symptom guides,
        and maintenance notes — is provided for general informational and educational purposes only.
      </p>
      <p>
        This information is not a substitute for the official owner's manual for your specific vehicle,
        manufacturer service documentation, or the advice of a licensed automotive technician.
      </p>

      <h2>User Responsibility to Verify</h2>
      <p>You are responsible for independently verifying all of the following before performing any service or repair:</p>
      <ul>
        <li>Repair procedures and steps</li>
        <li>Torque specifications</li>
        <li>Fluid capacities and fluid types</li>
        <li>Wiring diagrams and electrical values</li>
        <li>Safety procedures</li>
        <li>Tool requirements</li>
        <li>Any specification affecting vehicle safety</li>
      </ul>
      <p>
        Always follow manufacturer recommendations, applicable safety standards, and proper safety practices.
        Use appropriate personal protective equipment. Consult a qualified professional for all safety-critical
        automotive systems.
      </p>

      <h2>Accuracy Limitations</h2>
      <p>
        HoundMoto makes reasonable efforts to provide accurate and useful information. However:
      </p>
      <ul>
        <li>Vehicle specifications vary by model year, trim level, engine, and production date.</li>
        <li>Specifications may have changed since the time data was compiled.</li>
        <li>Generation-based estimates are approximations and may not match your specific vehicle.</li>
        <li>OBD-II codes have multiple possible causes — a code alone does not confirm a diagnosis.</li>
      </ul>
      <p>
        HoundMoto does not fabricate specifications. When exact data is unavailable, the Site will clearly
        state that information is incomplete rather than guess or invent values.
      </p>

      <h2>No Warranty</h2>
      <p>
        HoundMoto is provided "as is" without warranty of any kind, express or implied, including but not
        limited to warranties of accuracy, merchantability, or fitness for a particular purpose.
      </p>

      <h2>Limitation of Liability</h2>
      <p>
        HoundMoto and its operators shall not be liable for any loss, damage, injury, or expense of any
        kind arising from reliance on information found on this Site. This includes, without limitation,
        vehicle damage, personal injury, property damage, or financial loss.
      </p>
    </LegalPage>
  );
}

// ── Contact Page ──────────────────────────────────────────────────────────────
export function ContactPage({ onClose }) {
  return (
    <LegalPage title="Contact" onClose={onClose}>
      <h2>Support Contact</h2>
      <p>
        Have a question, found incorrect information, or want to suggest a vehicle or feature?
        We'd like to hear from you.
      </p>
      <p>
        Email us at: <a href="mailto:support@houndmoto.com" className="legalLink">support@houndmoto.com</a>
      </p>

      <div className="legalContactNote">
        <strong>What to include in your message:</strong>
        <ul>
          <li>Your vehicle year, make, and model (if your question is vehicle-specific)</li>
          <li>A clear description of what you found or what you need</li>
          <li>A screenshot if you're reporting a display or search issue</li>
        </ul>
      </div>

      <h2>Response Time</h2>
      <p>
        We typically respond within 2–4 business days. HoundMoto is an independent project and support
        capacity is limited.
      </p>

      <h2>Data Correction Requests</h2>
      <p>
        If you believe a vehicle specification on HoundMoto is incorrect, please contact us with the
        specific information, your source (owner's manual page, OEM documentation, etc.), and we will
        review and correct it as quickly as possible.
      </p>

      <h2>Mechanic Tip Submissions</h2>
      <p>
        You can submit mechanic tips directly from the main search page using the
        "+ Submit a Tip" button. Submitted tips are reviewed and displayed for the community.
      </p>
    </LegalPage>
  );
}
