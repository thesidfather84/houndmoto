import { Link } from "react-router-dom";

export function RightToRepairBanner() {
  return (
    <div className="rtrBanner">
      <div className="rtrBannerContent">
        <div className="rtrBannerText">
          <div className="rtrBannerHeading">Support the Right to Repair</div>
          <p className="rtrBannerBody">
            Vehicle owners deserve access to repair information, diagnostic data, maintenance
            guidance, and the freedom to choose where their vehicle is repaired. HoundMoto
            supports repair knowledge, informed ownership, and consumer choice.
          </p>
        </div>
        <Link to="/right-to-repair" className="rtrBannerBtn">Learn More</Link>
      </div>
    </div>
  );
}
