import { useEffect, useState } from "react";

const STORAGE_KEY = "houndmoto_feedback";

export function Testimonials({ limit = null }) {
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    try {
      const all = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
      // Filter: only show 4-5 stars and approved
      const publicReviews = all.filter(
        (f) => f.rating >= 4 && f.approved !== false
      );
      // Sort by newest first
      publicReviews.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      // Apply limit if specified
      const displayed = limit ? publicReviews.slice(0, limit) : publicReviews;
      setTestimonials(displayed);
    } catch (err) {
      console.error("Failed to load testimonials:", err);
    }
  }, [limit]);

  if (testimonials.length === 0) {
    return null;
  }

  function formatDate(isoString) {
    const date = new Date(isoString);
    const now = new Date();
    const diffMs = now - date;
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Yesterday";
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
    return date.toLocaleDateString();
  }

  return (
    <section className="testimonials">
      <div className="testimonialsHeader">
        <h2 className="testimonialsTitle">What Users Are Saying</h2>
        <p className="testimonialsNote">
          Reviews shown publicly may be filtered for safety, privacy, spam, and quality.
        </p>
      </div>

      <div className="testimonialsList">
        {testimonials.map((review) => (
          <article key={review.id} className="testimonialCard">
            <div className="testimonialRating">
              {[...Array(5)].map((_, i) => (
                <span
                  key={i}
                  className={`testimonialStar${
                    i < review.rating ? " filled" : ""
                  }`}
                >
                  ★
                </span>
              ))}
              <span className="testimonialRatingText">{review.rating}/5</span>
            </div>

            {review.comment && (
              <p className="testimonialComment">{review.comment}</p>
            )}

            <div className="testimonialFooter">
              <span className="testimonialName">
                {review.name || "HoundMoto user"}
              </span>
              <span className="testimonialDate">
                {formatDate(review.createdAt)}
              </span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
