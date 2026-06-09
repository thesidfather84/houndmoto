import { useState } from "react";
import { getEvents, clearEvents } from "./analytics";

function countBy(events, key) {
  const map = {};
  for (const e of events) {
    const val = String(e[key] || "unknown");
    map[val] = (map[val] || 0) + 1;
  }
  return Object.entries(map).sort((a, b) => b[1] - a[1]);
}

function groupByDate(events) {
  const map = {};
  for (const e of events) {
    map[e.date] = (map[e.date] || 0) + 1;
  }
  return Object.entries(map).sort((a, b) => b[0].localeCompare(a[0])).slice(0, 14);
}

export function AdminDashboard() {
  const [events, setEvents] = useState(() => getEvents());
  const [confirmClear, setConfirmClear] = useState(false);

  function refresh() { setEvents(getEvents()); }

  function handleClear() {
    if (confirmClear) {
      clearEvents();
      setEvents([]);
      setConfirmClear(false);
    } else {
      setConfirmClear(true);
    }
  }

  const searches = events.filter((e) => e.event === "search_submitted");
  const failedSearches = searches.filter((e) => e.resultCount === 0);
  const vehicleEvents = events.filter((e) => e.event === "vehicle_selected");
  const symptomEvents = events.filter((e) => e.event === "symptom_selected");
  const brokenLinks = events.filter((e) => e.event === "broken_link_reported");
  const premiumClicks = events.filter((e) => e.event === "premium_email_clicked");
  const errors = events.filter((e) => e.event === "error_occurred");
  const sessions = new Set(events.map((e) => e.sid)).size;

  const dailySearches = groupByDate(searches);
  const topVehicles = countBy(vehicleEvents, "vehicle").slice(0, 10);
  const topSymptoms = countBy(symptomEvents, "category").slice(0, 10);
  const topFailed = countBy(failedSearches, "query").slice(0, 15);

  const storageSizeKB = Math.round(JSON.stringify(events).length / 1024);

  return (
    <div className="adminDash">
      <div className="adminHeader">
        <div>
          <div className="adminBrand">HoundMoto Admin</div>
          <div className="adminHeaderSub">Anonymous usage analytics — no PII stored</div>
        </div>
        <div className="adminActions">
          <button className="adminBtn" onClick={refresh}>↻ Refresh</button>
          {confirmClear && (
            <button className="adminBtn adminBtnCancel" onClick={() => setConfirmClear(false)}>
              Cancel
            </button>
          )}
          <button
            className={`adminBtn ${confirmClear ? "adminBtnDanger" : "adminBtnMuted"}`}
            onClick={handleClear}
          >
            {confirmClear ? "Confirm — Delete All Events" : "Clear Events"}
          </button>
        </div>
      </div>

      <div className="adminStatRow">
        <Stat label="Total Events" value={events.length} />
        <Stat label="Unique Sessions" value={sessions} />
        <Stat label="Total Searches" value={searches.length} />
        <Stat label="Failed Searches" value={failedSearches.length} accent="warn" />
        <Stat label="Premium Clicks" value={premiumClicks.length} accent="good" />
        <Stat label="Broken Links" value={brokenLinks.length} accent={brokenLinks.length > 0 ? "warn" : ""} />
      </div>

      <div className="adminGrid">
        <AdminSection title="Daily Searches (last 14 days)">
          {dailySearches.length === 0
            ? <AdminEmpty />
            : <AdminTable heads={["Date", "Searches"]} rows={dailySearches} />}
        </AdminSection>

        <AdminSection title="Popular Vehicles">
          {topVehicles.length === 0
            ? <AdminEmpty />
            : <AdminTable heads={["Vehicle", "Hits"]} rows={topVehicles} />}
        </AdminSection>

        <AdminSection title="Failed Searches (no results returned)">
          {topFailed.length === 0
            ? <AdminEmpty text="No failed searches yet" />
            : <AdminTable heads={["Query", "Count"]} rows={topFailed} />}
        </AdminSection>

        <AdminSection title="Symptom Wizard — Popular Categories">
          {topSymptoms.length === 0
            ? <AdminEmpty />
            : <AdminTable heads={["Category", "Count"]} rows={topSymptoms} />}
        </AdminSection>

        <AdminSection title="Broken Links Reported">
          {brokenLinks.length === 0
            ? <AdminEmpty text="None reported" />
            : <AdminEventList events={brokenLinks} fields={["vendor", "date"]} />}
        </AdminSection>

        <AdminSection title="Premium (BidWrenx) Clicks">
          {premiumClicks.length === 0
            ? <AdminEmpty />
            : <AdminEventList events={premiumClicks} fields={["context", "date"]} />}
        </AdminSection>

        <AdminSection title="Error Log (last 20)">
          {errors.length === 0
            ? <AdminEmpty text="No errors logged" />
            : <AdminEventList
                events={[...errors].slice(-20).reverse()}
                fields={["type", "error", "date"]}
              />}
        </AdminSection>

        <AdminSection title="Recent Events (last 30)">
          <AdminEventList
            events={[...events].slice(-30).reverse()}
            fields={["event", "query", "vehicle", "context", "category", "date"]}
          />
        </AdminSection>
      </div>

      <p className="adminFootnote">
        Events are stored in this browser&apos;s localStorage only — no server, no external tracking.
        Storage used: {storageSizeKB}KB of ~5MB limit.
        Access this dashboard at <code>?admin=houndmoto</code>.
      </p>
    </div>
  );
}

function Stat({ label, value, accent }) {
  return (
    <div className={`adminStat${accent ? ` adminStat--${accent}` : ""}`}>
      <div className="adminStatVal">{value}</div>
      <div className="adminStatLbl">{label}</div>
    </div>
  );
}

function AdminSection({ title, children }) {
  return (
    <div className="adminSection">
      <h3 className="adminSectionTitle">{title}</h3>
      {children}
    </div>
  );
}

function AdminTable({ heads, rows }) {
  return (
    <div className="adminTableWrap">
      <table className="adminTable">
        <thead>
          <tr>{heads.map((h) => <th key={h} className="adminTh">{h}</th>)}</tr>
        </thead>
        <tbody>
          {rows.map(([k, v], i) => (
            <tr key={i} className="adminTr">
              <td className="adminTd">{k}</td>
              <td className="adminTd adminTdNum">{v}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function AdminEventList({ events, fields }) {
  return (
    <div className="adminEventList">
      {events.map((e, i) => (
        <div key={i} className="adminEventRow">
          {fields.map((f) =>
            e[f] !== undefined && e[f] !== null && String(e[f]) !== "" ? (
              <span key={f} className="adminEventField">
                <span className="adminEventKey">{f}:</span>{" "}
                <span className="adminEventVal">{String(e[f]).slice(0, 80)}</span>
              </span>
            ) : null
          )}
        </div>
      ))}
    </div>
  );
}

function AdminEmpty({ text = "No data yet" }) {
  return <p className="adminEmpty">{text}</p>;
}
