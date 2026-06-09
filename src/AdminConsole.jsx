import { useState, useEffect, useCallback } from "react";

const TOKEN_KEY = "hm_admin_token";

// ── helpers ────────────────────────────────────────────────────────────────

function stored() {
  try { return localStorage.getItem(TOKEN_KEY); } catch (_) { return null; }
}
function saveToken(t) {
  try { localStorage.setItem(TOKEN_KEY, t); } catch (_) {}
}
function clearToken() {
  try { localStorage.removeItem(TOKEN_KEY); } catch (_) {}
}

function authHeader() {
  return { Authorization: `Bearer ${stored()}` };
}

function fmt(n) {
  if (n == null) return "—";
  return Number(n).toLocaleString();
}

// ── sub-components ─────────────────────────────────────────────────────────

function Card({ label, value, sub }) {
  return (
    <div style={styles.card}>
      <div style={styles.cardValue}>{fmt(value)}</div>
      <div style={styles.cardLabel}>{label}</div>
      {sub && <div style={styles.cardSub}>{sub}</div>}
    </div>
  );
}

function Section({ title, children }) {
  return (
    <div style={styles.section}>
      <h2 style={styles.sectionTitle}>{title}</h2>
      {children}
    </div>
  );
}

function SimpleTable({ headers, rows, keys }) {
  if (!rows?.length) return <p style={styles.empty}>No data yet.</p>;
  return (
    <div style={styles.tableWrap}>
      <table style={styles.table}>
        <thead>
          <tr>{headers.map((h) => <th key={h} style={styles.th}>{h}</th>)}</tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} style={i % 2 === 0 ? styles.trEven : styles.trOdd}>
              {keys.map((k) => <td key={k} style={styles.td}>{r[k] ?? "—"}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function ExportBtn({ type, label }) {
  function dl() {
    const url = `/api/admin/export?type=${type}`;
    const a = document.createElement("a");
    a.href = url;
    a.download = "";
    // Include auth token in request via fetch then blob
    fetch(url, { headers: authHeader() })
      .then((r) => r.blob())
      .then((blob) => {
        const objUrl = URL.createObjectURL(blob);
        a.href = objUrl;
        a.click();
        URL.revokeObjectURL(objUrl);
      })
      .catch(() => alert("Export failed — database may not be connected."));
  }
  return (
    <button onClick={dl} style={styles.exportBtn}>{label}</button>
  );
}

// ── PIN login screen ───────────────────────────────────────────────────────

function LoginScreen({ onLogin }) {
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pin }),
      });
      const json = await res.json();
      if (!res.ok) {
        setError(json.error || "Login failed");
      } else {
        saveToken(json.token);
        onLogin(json.token);
      }
    } catch (err) {
      setError("Network error — check that the API is deployed.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={styles.loginWrap}>
      <div style={styles.loginBox}>
        <div style={styles.loginBrand}>HoundMoto</div>
        <div style={styles.loginTitle}>Admin Console</div>
        <form onSubmit={submit}>
          <input
            type="password"
            inputMode="numeric"
            maxLength={10}
            placeholder="Enter PIN"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            style={styles.pinInput}
            autoFocus
          />
          {error && <p style={styles.loginError}>{error}</p>}
          <button type="submit" disabled={loading || !pin} style={styles.loginBtn}>
            {loading ? "Checking…" : "Login →"}
          </button>
        </form>
        <p style={styles.loginNote}>Owner-only access. Anonymous analytics only — no PII stored.</p>
      </div>
    </div>
  );
}

// ── main console ────────────────────────────────────────────────────────────

export function AdminConsole() {
  const [token, setToken] = useState(() => stored());
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const load = useCallback(async (t = token) => {
    if (!t) return;
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/stats", { headers: { Authorization: `Bearer ${t}` } });
      if (res.status === 401) { clearToken(); setToken(null); return; }
      if (!res.ok) { setError(`Server error ${res.status}`); return; }
      setStats(await res.json());
    } catch (err) {
      setError("Could not load stats — check API deployment.");
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => { if (token) load(); }, []);

  function logout() {
    clearToken();
    setToken(null);
    setStats(null);
  }

  if (!token) return <LoginScreen onLogin={(t) => { setToken(t); load(t); }} />;

  const ov = stats?.overview || {};

  return (
    <div style={styles.wrap}>
      {/* Header */}
      <div style={styles.header}>
        <div>
          <span style={styles.headerBrand}>HoundMoto</span>
          <span style={styles.headerTitle}> Admin Console</span>
        </div>
        <div style={styles.headerActions}>
          <button onClick={() => load()} style={styles.refreshBtn} disabled={loading}>
            {loading ? "Loading…" : "Refresh"}
          </button>
          <button onClick={logout} style={styles.logoutBtn}>Logout</button>
        </div>
      </div>

      {error && <div style={styles.errorBanner}>{error}</div>}

      {!stats && !loading && !error && (
        <div style={styles.emptyState}>
          <p>No data yet — analytics will appear here after your first site visitors.</p>
          <p style={{ fontSize: "13px", color: "#94a3b8", marginTop: "8px" }}>
            If this is blank after deploying, make sure ADMIN_PIN, ADMIN_SECRET, and POSTGRES_URL
            environment variables are set in Vercel.
          </p>
        </div>
      )}

      {stats && (
        <>
          {/* ── 1. Overview ── */}
          <Section title="Overview">
            <div style={styles.cardGrid}>
              <Card label="Today Visitors"   value={ov.today_visitors} />
              <Card label="7-Day Visitors"   value={ov.week_visitors} />
              <Card label="30-Day Visitors"  value={ov.month_visitors} />
              <Card label="All-Time Visitors" value={ov.total_visitors} />
              <Card label="Total Searches"   value={ov.total_searches} />
              <Card label="Page Views"       value={ov.page_views} />
              <Card label="BidWrenx Clicks"  value={ov.premium_clicks} />
              <Card label="Manual Clicks"    value={ov.manual_clicks} />
              <Card label="Errors"           value={ov.total_errors} />
              <Card label="Broken Links"     value={ov.broken_links} />
            </div>
          </Section>

          {/* ── 2. Traffic by day ── */}
          <Section title="Traffic — Last 30 Days">
            <SimpleTable
              headers={["Date", "Visitors", "Page Views", "Searches"]}
              rows={stats.daily}
              keys={["day", "visitors", "page_views", "searches"]}
            />
          </Section>

          {/* ── 3. Top vehicles ── */}
          <Section title="Top Vehicles Searched">
            <SimpleTable
              headers={["Year", "Make", "Model", "Searches"]}
              rows={stats.vehicles}
              keys={["year", "make", "model", "count"]}
            />
          </Section>

          {/* ── 4. Top symptoms ── */}
          <Section title="Top Symptom Categories">
            <SimpleTable
              headers={["Category", "Count"]}
              rows={stats.symptoms}
              keys={["category", "count"]}
            />
          </Section>

          {/* ── 5. Manual sources ── */}
          <Section title="Top Manual Reference Sources">
            <SimpleTable
              headers={["Source", "Clicks"]}
              rows={stats.manuals}
              keys={["source", "count"]}
            />
          </Section>

          {/* ── 6. Referrers ── */}
          <Section title="Top Referrers">
            <SimpleTable
              headers={["Referrer", "Sessions"]}
              rows={stats.referrers}
              keys={["referrer", "sessions"]}
            />
          </Section>

          {/* ── 7. Devices / browsers ── */}
          <Section title="Device & Browser Breakdown">
            <SimpleTable
              headers={["Device", "Browser", "Sessions"]}
              rows={stats.devices}
              keys={["device_type", "browser", "sessions"]}
            />
          </Section>

          {/* ── 8. Monetization ── */}
          <Section title="Monetization Report (Monthly)">
            <p style={styles.sectionNote}>
              Use this for advertiser proof-of-value or revenue tracking.
              Ad impression estimate = page views × 1 (placeholder until ad network provides data).
            </p>
            <SimpleTable
              headers={["Month", "Unique Visitors", "Page Views", "Searches", "BidWrenx Clicks", "Manual Clicks"]}
              rows={stats.monthly}
              keys={["month", "unique_visitors", "page_views", "searches", "premium_clicks", "manual_clicks"]}
            />
          </Section>

          {/* ── 9. Error / debug ── */}
          <Section title="Error Console">
            <h3 style={styles.subTitle}>Failed Searches</h3>
            <SimpleTable
              headers={["Query", "Count"]}
              rows={stats.failedSearches}
              keys={["query", "count"]}
            />
            <h3 style={styles.subTitle}>Broken Links Reported</h3>
            {!stats.brokenLinks?.length
              ? <p style={styles.empty}>None reported.</p>
              : stats.brokenLinks.map((e, i) => (
                  <pre key={i} style={styles.logLine}>
                    {e.created_at?.slice(0, 19)} — {JSON.stringify(e.data)}
                  </pre>
                ))
            }
            <h3 style={styles.subTitle}>Recent Errors</h3>
            {!stats.errors?.length
              ? <p style={styles.empty}>No errors logged.</p>
              : stats.errors.slice(0, 20).map((e, i) => (
                  <pre key={i} style={styles.logLine}>
                    {e.created_at?.slice(0, 19)} [{e.country || "?"}] — {JSON.stringify(e.data)}
                  </pre>
                ))
            }
          </Section>

          {/* ── 10. Exports ── */}
          <Section title="Export Data">
            <div style={styles.exportRow}>
              <ExportBtn type="events" label="Export Events CSV" />
              <ExportBtn type="advertiser" label="Export Advertiser Summary CSV" />
            </div>
          </Section>
        </>
      )}

      <div style={styles.footer}>
        HoundMoto Analytics — data is anonymous and session-based. No PII collected.
      </div>
    </div>
  );
}

// ── styles (inline — no CSS changes to public site) ────────────────────────

const C = {
  bg: "#0f172a",
  surface: "#1e293b",
  border: "#334155",
  text: "#f1f5f9",
  muted: "#94a3b8",
  accent: "#f97316",
  green: "#22c55e",
  red: "#ef4444",
};

const styles = {
  wrap: { minHeight: "100vh", background: C.bg, color: C.text, fontFamily: "system-ui, sans-serif", padding: "0 0 60px" },
  header: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 24px", background: C.surface, borderBottom: `1px solid ${C.border}`, position: "sticky", top: 0, zIndex: 10 },
  headerBrand: { color: C.accent, fontWeight: 800, fontSize: "18px" },
  headerTitle: { color: C.text, fontWeight: 600, fontSize: "16px" },
  headerActions: { display: "flex", gap: "8px" },
  refreshBtn: { background: C.border, color: C.text, border: "none", borderRadius: "6px", padding: "6px 14px", cursor: "pointer", fontSize: "13px" },
  logoutBtn: { background: "transparent", color: C.muted, border: `1px solid ${C.border}`, borderRadius: "6px", padding: "6px 14px", cursor: "pointer", fontSize: "13px" },
  errorBanner: { background: "#450a0a", color: C.red, padding: "12px 24px", fontSize: "14px" },
  emptyState: { padding: "60px 24px", textAlign: "center", color: C.muted },
  section: { padding: "24px", borderBottom: `1px solid ${C.border}` },
  sectionTitle: { color: C.text, fontSize: "16px", fontWeight: 700, margin: "0 0 16px" },
  sectionNote: { color: C.muted, fontSize: "13px", margin: "0 0 12px" },
  subTitle: { color: C.muted, fontSize: "13px", fontWeight: 600, margin: "16px 0 8px", textTransform: "uppercase", letterSpacing: "0.05em" },
  cardGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))", gap: "12px" },
  card: { background: C.surface, border: `1px solid ${C.border}`, borderRadius: "8px", padding: "16px" },
  cardValue: { fontSize: "28px", fontWeight: 800, color: C.accent, lineHeight: 1 },
  cardLabel: { fontSize: "12px", color: C.muted, marginTop: "6px" },
  cardSub: { fontSize: "11px", color: C.muted, marginTop: "2px" },
  tableWrap: { overflowX: "auto" },
  table: { width: "100%", borderCollapse: "collapse", fontSize: "13px" },
  th: { textAlign: "left", padding: "8px 12px", background: C.surface, color: C.muted, fontWeight: 600, fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.05em", borderBottom: `1px solid ${C.border}` },
  td: { padding: "8px 12px", borderBottom: `1px solid ${C.border}`, color: C.text, maxWidth: "400px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" },
  trEven: { background: "transparent" },
  trOdd: { background: "rgba(255,255,255,0.02)" },
  empty: { color: C.muted, fontSize: "13px", padding: "8px 0" },
  logLine: { background: C.surface, border: `1px solid ${C.border}`, borderRadius: "4px", padding: "6px 10px", fontSize: "11px", color: C.muted, margin: "4px 0", overflowX: "auto", whiteSpace: "pre-wrap", wordBreak: "break-all" },
  exportRow: { display: "flex", gap: "12px", flexWrap: "wrap" },
  exportBtn: { background: C.accent, color: "#fff", border: "none", borderRadius: "6px", padding: "10px 20px", cursor: "pointer", fontWeight: 600, fontSize: "14px" },
  footer: { textAlign: "center", padding: "40px 24px 0", color: C.muted, fontSize: "12px" },
  // Login
  loginWrap: { minHeight: "100vh", background: C.bg, display: "flex", alignItems: "center", justifyContent: "center", padding: "24px" },
  loginBox: { background: C.surface, border: `1px solid ${C.border}`, borderRadius: "12px", padding: "40px 32px", width: "100%", maxWidth: "360px", textAlign: "center" },
  loginBrand: { color: C.accent, fontSize: "28px", fontWeight: 900, letterSpacing: "-0.5px" },
  loginTitle: { color: C.muted, fontSize: "14px", marginTop: "4px", marginBottom: "28px" },
  pinInput: { width: "100%", background: C.bg, border: `1px solid ${C.border}`, borderRadius: "8px", padding: "12px 16px", fontSize: "20px", color: C.text, letterSpacing: "4px", textAlign: "center", boxSizing: "border-box", outline: "none" },
  loginError: { color: C.red, fontSize: "13px", margin: "10px 0 0" },
  loginBtn: { marginTop: "16px", width: "100%", background: C.accent, color: "#fff", border: "none", borderRadius: "8px", padding: "12px", fontSize: "16px", fontWeight: 700, cursor: "pointer" },
  loginNote: { color: C.muted, fontSize: "12px", marginTop: "20px" },
};
