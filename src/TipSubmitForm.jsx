import { useState } from "react";
import { TIP_CATEGORIES } from "./tipsData";

const BLANK = {
  vehicle: "",
  category: "",
  title: "",
  content: "",
  submitter: "",
};

export function TipSubmitForm({ onSubmit, onClose }) {
  const [form, setForm] = useState(BLANK);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  function set(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  }

  function validate() {
    const e = {};
    if (!form.category) e.category = "Select a category.";
    if (!form.title.trim()) e.title = "Enter a short title.";
    if (form.content.trim().length < 20)
      e.content = "Tip must be at least 20 characters.";
    return e;
  }

  function handleSubmit(ev) {
    ev.preventDefault();
    const e = validate();
    if (Object.keys(e).length) {
      setErrors(e);
      return;
    }
    onSubmit({
      vehicle: form.vehicle.trim() || "All vehicles",
      category: form.category,
      title: form.title.trim(),
      content: form.content.trim(),
      submitter: form.submitter.trim() || "Anonymous",
    });
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="tipModal">
        <div className="tipModalBox">
          <div className="tipSubmitSuccess">
            <div className="tipSuccessIcon">✓</div>
            <h3>Tip submitted</h3>
            <p>
              Your tip has been added to the community board. It is visible to
              other users and is marked as unverified.
            </p>
            <p className="note">
              HoundMoto does not verify community tips. Always confirm advice
              with a trusted mechanic or your vehicle manual before performing
              repairs.
            </p>
            <button className="tipCloseBtn" onClick={onClose}>
              Close
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="tipModal" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="tipModalBox">
        <div className="tipModalHeader">
          <h3>Submit a Mechanic Tip</h3>
          <button className="tipModalClose" onClick={onClose} aria-label="Close">
            ✕
          </button>
        </div>

        <p className="tipModalNote">
          Share a real-world trick that helped you. Tips are unverified and
          community-contributed. Be specific — vague tips are not helpful.
        </p>

        <form onSubmit={handleSubmit} className="tipForm">
          <label>
            Vehicle (optional)
            <input
              type="text"
              placeholder="e.g. 2014 Chevrolet Silverado, All Fords, Honda CVT"
              value={form.vehicle}
              onChange={(e) => set("vehicle", e.target.value)}
              maxLength={80}
            />
          </label>

          <label>
            Category <span className="tipRequired">*</span>
            <select
              value={form.category}
              onChange={(e) => set("category", e.target.value)}
            >
              <option value="">Select category...</option>
              {TIP_CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
            {errors.category && <span className="tipError">{errors.category}</span>}
          </label>

          <label>
            Tip title <span className="tipRequired">*</span>
            <input
              type="text"
              placeholder="e.g. Battery terminal corrosion fix"
              value={form.title}
              onChange={(e) => set("title", e.target.value)}
              maxLength={100}
            />
            {errors.title && <span className="tipError">{errors.title}</span>}
          </label>

          <label>
            Tip details <span className="tipRequired">*</span>
            <textarea
              placeholder="Describe the tip clearly. Include what problem it solves, the steps, and any warnings."
              value={form.content}
              onChange={(e) => set("content", e.target.value)}
              rows={5}
              maxLength={1000}
            />
            <span className="tipCharCount">{form.content.length} / 1000</span>
            {errors.content && <span className="tipError">{errors.content}</span>}
          </label>

          <label>
            Your name (optional)
            <input
              type="text"
              placeholder="Shown as Anonymous if left blank"
              value={form.submitter}
              onChange={(e) => set("submitter", e.target.value)}
              maxLength={50}
            />
          </label>

          <p className="tipDisclaimer">
            By submitting you confirm this is your original knowledge and agree
            that HoundMoto may display it publicly. HoundMoto does not verify
            community tips. Users act on any tip at their own risk.
          </p>

          <div className="tipFormActions">
            <button type="button" className="tipCancelBtn" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="tipSubmitBtn">
              Submit Tip
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
