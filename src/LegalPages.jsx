// HoundMoto Legal Pages — Terms, Privacy, Disclaimer, Contact
// Comprehensive legal protections for intellectual property, trademark, external resources, and user responsibility
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
      <p className="legalDate">Last updated: June 2026</p>

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
        advice. HoundMoto is not a certified mechanic, repair shop, manufacturer, engineer, legal adviser,
        or safety authority. The Site does not provide certified repair procedures, manufacturer-endorsed
        specifications, or safety-critical guidance. Do not substitute the information on this Site for advice
        from a licensed automotive technician or engineer.
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

      <h2>5. Intellectual Property, Copyright, and Trademark Notice</h2>
      <p>
        <strong>HoundMoto Ownership:</strong> HoundMoto owns its name, branding, software, layouts, workflows,
        databases, content, code, and original materials. All rights reserved. Users may not copy, scrape,
        reproduce, mirror, resell, license, republish, or exploit HoundMoto content or databases without
        written permission.
      </p>
      <p>
        <strong>Third-Party Trademarks:</strong> Third-party vehicle brands, manufacturer names, logos, part
        names, and trademarks (including but not limited to Ford, GM, Chevrolet, Toyota, Honda, Nissan,
        Hyundai, Kia, BMW, Mercedes-Benz, Volkswagen, Audi, and others) belong to their respective owners.
        Use of these names and marks on HoundMoto is for identification, compatibility, educational,
        diagnostic, and informational purposes only. No sponsorship, endorsement, affiliation, or approval
        is implied or claimed.
      </p>

      <h2>6. External Resources Disclaimer</h2>
      <p>
        HoundMoto may link to third-party websites including but not limited to NHTSA, Operation CHARM,
        LEMON Manuals, parts vendors, repair resources, manufacturer resources, and other external sites.
        HoundMoto does not own or control third-party content. External links are provided for convenience
        and information only.
      </p>
      <p>
        <strong>User Responsibility for Third-Party Content:</strong> You are responsible for reviewing
        third-party terms of service, copyright rules, accuracy, safety information, and any policies
        associated with external websites. HoundMoto does not host or provide manual content from CHARM,
        LEMON Manuals, manufacturers, or other external publishers. Do not copy, extract, or reproduce
        third-party manual content into HoundMoto or any other system.
      </p>

      <h2>7. Recall Information Disclaimer</h2>
      <p>
        Recall data may come from public sources such as NHTSA (National Highway Traffic Safety Administration).
        Recall results may be incomplete, delayed, unavailable, or not matched to your exact vehicle. Users
        must confirm open recall status directly with NHTSA, the manufacturer, or a dealer before taking any
        action. If no recall appears in search results, that does not guarantee no safety issue exists.
      </p>

      <h2>8. Parts and Fitment Disclaimer</h2>
      <p>
        Parts listings, cross-references, prices, availability, and fitment information on HoundMoto may be
        incomplete, inaccurate, or outdated. Users must verify fitment by VIN, engine, trim, production date,
        and manufacturer specifications before purchasing or installing any parts. HoundMoto is not responsible
        for wrong parts, failed repairs, vendor errors, or incompatibility issues.
      </p>

      <h2>9. User Submitted Content License</h2>
      <p>
        If you submit tips, notes, photos, comments, repair information, diagnostic suggestions, or any other
        content to HoundMoto, you grant HoundMoto a worldwide, royalty-free, non-exclusive license to use,
        display, reproduce, modify, distribute, and publish that content in connection with HoundMoto services
        and marketing.
      </p>
      <p>
        By submitting content, you represent and warrant that you own or have the right to grant this license
        for all submitted content, and that the content does not infringe on any third-party intellectual
        property rights. HoundMoto may remove, edit, or decline to publish user content at any time without notice.
      </p>

      <h2>10. User Feedback and Reviews</h2>
      <p>
        When you submit feedback, ratings, reviews, or comments to HoundMoto (via the feedback form, contact
        form, or other channels), you grant HoundMoto permission to:
      </p>
      <ul>
        <li>Store, review, and moderate your feedback</li>
        <li>Edit for clarity, privacy, safety, or spam removal</li>
        <li>Display your feedback publicly on the Site, testimonials pages, or in marketing materials</li>
        <li>Use your feedback for website improvement and quality control</li>
      </ul>
      <p>
        HoundMoto may choose not to display reviews, including low-star ratings, spam, unsafe content,
        personal information, or inappropriate content. Do not submit personal, private, medical, legal,
        unsafe repair information, or other sensitive data in reviews. Feedback submitted to HoundMoto may
        be stored, reviewed, and used for the purposes stated above.
      </p>

      <h2>11. Limitation of Liability</h2>
      <p>
        HoundMoto, its operators, contributors, and affiliates shall not be liable for any direct, indirect,
        incidental, consequential, or punitive damages arising from use of this Site, including but not
        limited to vehicle damage, personal injury, property damage, lost income, repair costs, or reliance
        on information. This limitation applies regardless of the legal theory under which liability is claimed
        (contract, tort, negligence, strict liability, or otherwise).
      </p>

      <h2>12. No Warranty</h2>
      <p>
        HoundMoto is provided "as is" and "as available" without warranty of any kind, express or implied,
        including but not limited to warranties of accuracy, completeness, uptime, repair success, part
        fitment, recall completeness, or diagnostic correctness.
      </p>

      <h2>13. No Manufacturer Affiliation</h2>
      <p>
        HoundMoto is an independent project. HoundMoto is not affiliated with, endorsed by, sponsored by,
        or approved by any vehicle manufacturer, parts manufacturer, dealer network, manual publisher, or
        external website unless clearly stated on this Site.
      </p>

      <h2>14. DMCA / Copyright Complaint Procedure</h2>
      <p>
        If you believe that content on HoundMoto infringes on copyright or intellectual property rights,
        you may contact HoundMoto through the <Link to="/contact" className="legalLink">Contact page</Link> with
        the following information:
      </p>
      <ul>
        <li>Your name and contact information</li>
        <li>Description of the copyrighted work you believe is infringed</li>
        <li>URL or specific location of the allegedly infringing content</li>
        <li>A statement of your good-faith belief that the use is unauthorized</li>
        <li>A statement, under penalty of perjury, that the information is accurate</li>
        <li>Your signature or electronic signature</li>
      </ul>
      <p>
        HoundMoto will review the complaint and may remove or disable access to alleged infringing content.
      </p>

      <h2>15. Modifications to Terms</h2>
      <p>
        These Terms may be updated at any time without prior notice. Continued use of the Site after any
        update constitutes acceptance of the revised Terms.
      </p>

      <h2>16. Governing Law</h2>
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
      <p className="legalDate">Last updated: June 2026</p>

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
        inquiries are retained only as long as necessary to resolve your request. Feedback and reviews
        submitted through the feedback form are retained indefinitely for quality control, website improvement,
        and testimonial purposes, unless you request deletion through the contact form.
      </p>

      <h2>Feedback and Reviews</h2>
      <p>
        When you submit feedback or reviews to HoundMoto, we collect the rating, comment, name (optional),
        email (optional), and page visited. This information is stored in local storage on your device or
        on HoundMoto's servers (future). HoundMoto uses this data to improve the Site, display public
        testimonials (ratings 4–5 stars only), and for quality control purposes. Low-rating feedback
        (1–3 stars) is stored but not displayed publicly.
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
      <p className="legalDate">Last updated: June 2026</p>

      <div className="legalNotice">
        <div className="legalNoticeTitle">⚠ IMPORTANT NOTICE</div>
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

      <h2>Automotive Safety Disclaimer</h2>
      <p>
        <strong>Vehicle repairs can be dangerous.</strong> HoundMoto is informational and educational only.
        HoundMoto is not a certified mechanic, repair shop, manufacturer, engineer, legal adviser, or safety authority.
      </p>
      <p>
        You are responsible for:
      </p>
      <ul>
        <li>Verifying all repair procedures against manufacturer service information</li>
        <li>Verifying torque specifications, fluid types, and fluid capacities</li>
        <li>Understanding safety requirements for your specific vehicle</li>
        <li>Using proper tools, safety equipment, and lifting equipment</li>
        <li>Following all applicable safety standards and best practices</li>
      </ul>
      <p>
        <strong>When in doubt, consult a qualified mechanic or manufacturer service information.</strong>
        Never skip safety procedures for parts affecting brakes, steering, suspension, fuel systems,
        airbags, or electrical systems.
      </p>

      <h2>User Responsibility to Verify</h2>
      <p>You are responsible for independently verifying all of the following before performing any service or repair:</p>
      <ul>
        <li>Repair procedures and steps</li>
        <li>Torque specifications</li>
        <li>Fluid capacities and fluid types</li>
        <li>Wiring diagrams and electrical values</li>
        <li>Safety procedures and warnings</li>
        <li>Tool requirements and alternatives</li>
        <li>Any specification affecting vehicle safety</li>
        <li>Parts fitment and compatibility for your specific VIN</li>
      </ul>
      <p>
        Always follow manufacturer recommendations, applicable safety standards, and proper safety practices.
        Use appropriate personal protective equipment. Consult a qualified professional for all safety-critical
        automotive systems.
      </p>

      <h2>Recall Information Disclaimer</h2>
      <p>
        Recall data may come from public sources such as NHTSA. Recall results may be incomplete, delayed,
        unavailable, or not matched to your exact vehicle. Users must confirm open recall status directly
        with NHTSA, the manufacturer, or a dealer. If no recall appears in search results, that does not
        guarantee no safety issue exists.
      </p>

      <h2>Parts and Fitment Disclaimer</h2>
      <p>
        Parts listings, cross-references, prices, availability, and fitment information may be incomplete
        or inaccurate. Always verify fitment by VIN, engine, trim, production date, and manufacturer
        specifications before purchasing or installing parts. HoundMoto is not responsible for wrong parts,
        failed repairs, vendor issues, or incompatibility problems.
      </p>

      <h2>Accuracy Limitations</h2>
      <p>
        HoundMoto makes reasonable efforts to provide accurate and useful information. However:
      </p>
      <ul>
        <li>Vehicle specifications vary by model year, trim level, engine, production date, and region.</li>
        <li>Specifications may have changed since data was compiled.</li>
        <li>Generation-based estimates are approximations and may not match your specific vehicle.</li>
        <li>OBD-II codes have multiple possible causes — a code alone does not confirm a diagnosis.</li>
        <li>Recall data is searched by make, model, and year — recall applicability can vary by individual VIN.</li>
      </ul>
      <p>
        HoundMoto does not fabricate specifications. When exact data is unavailable, the Site will clearly
        state that information is incomplete rather than guess or invent values.
      </p>

      <h2>External Resources Disclaimer</h2>
      <p>
        HoundMoto may link to third-party websites including NHTSA, Operation CHARM, LEMON Manuals, parts
        vendors, repair resources, and manufacturer resources. HoundMoto does not own or control third-party
        content. You are responsible for reviewing third-party terms, copyright rules, and safety information.
        HoundMoto does not host or provide manual content from external publishers.
      </p>

      <h2>No Warranty</h2>
      <p>
        HoundMoto is provided "as is" and "as available" without warranty of any kind, express or implied,
        including but not limited to warranties of accuracy, completeness, uptime, repair success, part
        fitment, recall completeness, or diagnostic correctness.
      </p>

      <h2>Limitation of Liability</h2>
      <p>
        HoundMoto and its operators shall not be liable for any loss, damage, injury, or expense of any
        kind arising from reliance on information found on this Site. This includes, without limitation,
        vehicle damage, personal injury, property damage, lost income, failed repairs, wrong parts,
        downtime, or reliance on information. This limitation applies regardless of the legal theory
        under which liability is claimed.
      </p>

      <h2>No Manufacturer Affiliation</h2>
      <p>
        HoundMoto is independent. HoundMoto is not affiliated with, endorsed by, sponsored by, or approved
        by any vehicle manufacturer, parts manufacturer, dealer network, manual publisher, or external
        website unless clearly stated on this Site.
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

      <h2>Copyright, Trademark, and Legal Concerns</h2>
      <p>
        If you have copyright, trademark, intellectual property, or other legal concerns regarding content
        on HoundMoto, please contact us using the email address above with:
      </p>
      <ul>
        <li>Your name and contact information</li>
        <li>Clear description of the concern</li>
        <li>Specific URL or location on HoundMoto</li>
        <li>Documentation of your claim (if applicable)</li>
      </ul>
      <p>
        For DMCA takedown notices, please refer to the <Link to="/terms" className="legalLink">Terms &amp; Conditions</Link> page,
        section 13, for the formal complaint procedure.
      </p>

      <h2>Feedback and Suggestions</h2>
      <p>
        We welcome feedback on features, missing vehicle data, search improvements, or any other aspect of HoundMoto.
        Your input helps us make HoundMoto more useful for the community.
      </p>
    </LegalPage>
  );
}
