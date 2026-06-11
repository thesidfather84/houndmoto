import { useState } from "react";
import { track } from "../analytics";

const STORAGE_KEY = "houndmoto_feedback";

export function FeedbackForm({ page = null, compact = false }) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  function saveFeedback() {
    const feedback = {
      id: `${Date.now()}-${Math.random()}`,
      rating,
      comment: comment.trim(),
      name: name.trim() || null,
      email: email.trim() || null,
      page: page || null,
      createdAt: new Date().toISOString(),
      publicEligible: rating >= 4,
      approved: rating >= 4,
    };

    try {
      const existing = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
      existing.push(feedback);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));
    } catch (err) {
      console.error("Failed to save feedback:", err);
    }

    track("feedback_submitted", { rating, page, hasComment: !!comment });
    return feedback;
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (rating === 0) return;

    setSubmitting(true);
    setTimeout(() => {
      saveFeedback();
      setSubmitting(false);
      setSubmitted(true);

      // Reset form after 3 seconds
      setTimeout(() => {
        setRating(0);
        setComment("");
        setName("");
        setEmail("");
        setSubmitted(false);
      }, 3000);
    }, 300);
  }

  const successMessage = rating >= 4
    ? "Thanks for the review! 🎉"
    : "Thanks for the feedback. We'll use this to improve HoundMoto.";

  if (submitted) {
    return (
      <div className={`feedbackForm${compact ? " compact" : ""}`}>
        <div className="feedbackSuccess">
          <div className="feedbackSuccessIcon">✓</div>
          <p className="feedbackSuccessMsg">{successMessage}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`feedbackForm${compact ? " compact" : ""}`}>
      <div className="feedbackHeader">
        <h3 className="feedbackTitle">How helpful was HoundMoto?</h3>
        {!compact && <p className="feedbackSubtitle">Your feedback helps us improve.</p>}
      </div>

      <form onSubmit={handleSubmit} className="feedbackFormFields">
        {/* Star rating */}
        <div className="feedbackRatingRow">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              className={`feedbackStar${rating >= star ? " active" : ""}`}
              onClick={() => setRating(star)}
              title={`${star} star${star !== 1 ? "s" : ""}`}
              aria-label={`${star} star${star !== 1 ? "s" : ""}`}
            >
              ★
            </button>
          ))}
        </div>

        {/* Comment */}
        {rating > 0 && (
          <textarea
            className="feedbackComment"
            placeholder="What did you like or think we could improve? (optional)"
            value={comment}
            onChange={(e) => setComment(e.target.value.slice(0, 500))}
            maxLength={500}
            rows={compact ? 2 : 3}
          />
        )}

        {/* Name and email (optional) */}
        {rating > 0 && !compact && (
          <div className="feedbackNameEmail">
            <input
              type="text"
              className="feedbackInput"
              placeholder="Name (optional)"
              value={name}
              onChange={(e) => setName(e.target.value.slice(0, 50))}
              maxLength={50}
            />
            <input
              type="email"
              className="feedbackInput"
              placeholder="Email (optional, not shown publicly)"
              value={email}
              onChange={(e) => setEmail(e.target.value.slice(0, 100))}
              maxLength={100}
            />
          </div>
        )}

        {/* Submit button */}
        {rating > 0 && (
          <button
            type="submit"
            className="feedbackSubmitBtn"
            disabled={submitting}
          >
            {submitting ? "Submitting…" : "Submit Feedback"}
          </button>
        )}
      </form>

      <p className="feedbackPrivacyNote">
        Do not submit personal, private, medical, legal, or unsafe repair information in reviews.
        Feedback may be used to improve HoundMoto.
      </p>
    </div>
  );
}
