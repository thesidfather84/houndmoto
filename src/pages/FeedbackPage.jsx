import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { FeedbackForm } from "../components/FeedbackForm";
import { Testimonials } from "../components/Testimonials";
import { track } from "../analytics";
import { setPageSEO, resetPageSEO } from "../utils/seo";

export default function FeedbackPage() {
  useEffect(() => {
    setPageSEO({
      title: "Feedback — HoundMoto",
      description: "Share your feedback and see what other users think about HoundMoto. Help us improve with your star rating and comments.",
      path: "/feedback",
    });
    track("page_view", { page: "feedback" });
    return () => resetPageSEO();
  }, []);

  return (
    <div className="feedbackPage">
      <Navbar />

      <div className="feedbackPageContainer">
        <nav className="dtcBreadcrumb">
          <Link to="/" className="dtcBreadLink">HoundMoto</Link>
          <span className="dtcBreadSep">›</span>
          <span>Feedback</span>
        </nav>

        <div className="feedbackPageHero">
          <h1 className="feedbackPageTitle">Share Your Feedback</h1>
          <p className="feedbackPageSubtitle">
            Help us understand what's working and what we can improve. Your feedback makes HoundMoto better.
          </p>
        </div>

        <div className="feedbackPageContent">
          {/* Feedback form */}
          <section className="feedbackSection">
            <FeedbackForm page="feedback-page" />
          </section>

          {/* Public testimonials */}
          <section className="feedbackSection feedbackTestimonialsSection">
            <Testimonials />
          </section>
        </div>

        <div className="feedbackPageFootnote">
          <p>
            <strong>About your feedback:</strong> When you submit feedback, you grant HoundMoto permission
            to use it for website improvement, quality control, and testimonials. Please do not submit
            personal, medical, legal, or sensitive information. See our <Link to="/terms" className="legalLink">Terms</Link> and
            {" "}<Link to="/privacy" className="legalLink">Privacy Policy</Link> for more information.
          </p>
        </div>
      </div>

      <FeedbackFooter />
    </div>
  );
}

function FeedbackFooter() {
  return (
    <footer className="dtcFooter">
      <nav className="dtcFooterLinks">
        <Link to="/terms" className="dtcFooterLink">Terms</Link>
        <Link to="/privacy" className="dtcFooterLink">Privacy</Link>
        <Link to="/disclaimer" className="dtcFooterLink">Disclaimer</Link>
        <Link to="/contact" className="dtcFooterLink">Contact</Link>
        <Link to="/feedback" className="dtcFooterLink">Feedback</Link>
        <Link to="/right-to-repair" className="dtcFooterLink">Right to Repair</Link>
      </nav>
      <div className="dtcFooterCopy">© {new Date().getFullYear()} HoundMoto. All Rights Reserved.</div>
    </footer>
  );
}
