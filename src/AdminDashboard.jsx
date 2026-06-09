import { useState } from "react";
import { getEvents, clearEvents } from "./analytics";
import { manualRefs, manualSources } from "./manualRefsData";

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

      <div className="adminManualSection">
        <h2 className="adminManualHeading">Manual Reference Index</h2>
        <p className="adminManualSub">
          Seeded records from LEMON Manuals / Operation CHARM archive. No content is stored — these are metadata references only.
          Add more records to <code>src/manualRefsData.js</code>.
        </p>
        <ManualImportStats events={events} />
        <ManualRefsTable />
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

function ManualImportStats({ events }) {
  const clicks = events.filter((e) => e.event === "manual_reference_clicked");
  const bySource = {};
  for (const e of clicks) {
    const s = e.source || "unknown";
    bySource[s] = (bySource[s] || 0) + 1;
  }
  const makes = {};
  for (const ref of manualRefs) {
    makes[ref.make] = (makes[ref.make] || 0) + 1;
  }
  const makeRows = Object.entries(makes).sort((a, b) => b[1] - a[1]);

  return (
    <div className="adminManualStats">
      <div className="adminManualStatCards">
        <div className="adminManualCard">
          <div className="adminManualCardVal">{manualRefs.length}</div>
          <div className="adminManualCardLbl">Seeded Records</div>
        </div>
        <div className="adminManualCard">
          <div className="adminManualCardVal">{Object.keys(makes).length}</div>
          <div className="adminManualCardLbl">Makes Covered</div>
        </div>
        <div className="adminManualCard">
          <div className="adminManualCardVal">{Object.keys(manualSources).length}</div>
          <div className="adminManualCardLbl">Sources Indexed</div>
        </div>
        <div className="adminManualCard adminManualCardGood">
          <div className="adminManualCardVal">{clicks.length}</div>
          <div className="adminManualCardLbl">Manual Link Clicks</div>
        </div>
        {Object.entries(bySource).map(([src, count]) => (
          <div key={src} className="adminManualCard">
            <div className="adminManualCardVal">{count}</div>
            <div className="adminManualCardLbl">{src} clicks</div>
          </div>
        ))}
      </div>
      <div className="adminManualMakeRow">
        {makeRows.map(([make, count]) => (
          <span key={make} className="adminManualMakeBadge">
            {make} <strong>{count}</strong>
          </span>
        ))}
      </div>
    </div>
  );
}

function ManualRefsTable() {
  const [expanded, setExpanded] = useState(false);
  const visible = expanded ? manualRefs : manualRefs.slice(0, 10);
  return (
    <div className="adminManualTable">
      <div className="adminTableWrap">
        <table className="adminTable">
          <thead>
            <tr>
              <th className="adminTh">Make</th>
              <th className="adminTh">Model</th>
              <th className="adminTh">Years</th>
              <th className="adminTh">Variant / Generation</th>
              <th className="adminTh">Category</th>
              <th className="adminTh">Source</th>
            </tr>
          </thead>
          <tbody>
            {visible.map((ref) => (
              <tr key={ref.id} className="adminTr">
                <td className="adminTd">{ref.make}</td>
                <td className="adminTd">{ref.model}</td>
                <td className="adminTd adminTdNum" style={{ color: "#94a3b8" }}>{ref.yearStart}–{ref.yearEnd}</td>
                <td className="adminTd" style={{ color: "#64748b", fontSize: "12px" }}>{ref.variant || "—"}</td>
                <td className="adminTd" style={{ color: "#60a5fa", fontSize: "12px" }}>{ref.category}</td>
                <td className="adminTd" style={{ color: "#4ade80", fontSize: "12px" }}>{ref.source}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {manualRefs.length > 10 && (
        <button className="adminBtn" style={{ marginTop: "10px" }} onClick={() => setExpanded((v) => !v)}>
          {expanded ? `▲ Show less` : `▼ Show all ${manualRefs.length} records`}
        </button>
      )}
    </div>
  );
}
