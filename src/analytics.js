const STORAGE_KEY = "hm_events";
const SESSION_KEY = "hm_sid";
const MAX_LOCAL = 200; // keep fewer now that server stores events

const PII_BLOCKLIST = ["name", "email", "phone", "address", "ssn", "dob", "zip", "ip"];

function getSessionId() {
  let id = sessionStorage.getItem(SESSION_KEY);
  if (!id) {
    id = Math.random().toString(36).slice(2) + Date.now().toString(36);
    sessionStorage.setItem(SESSION_KEY, id);
  }
  return id;
}

function sanitize(data) {
  const safe = {};
  for (const [k, v] of Object.entries(data)) {
    if (!PII_BLOCKLIST.some((p) => k.toLowerCase().includes(p))) {
      safe[k] = typeof v === "string" ? v.slice(0, 200) : v;
    }
  }
  return safe;
}

function storeLocal(payload) {
  try {
    const events = getEvents();
    events.push(payload);
    if (events.length > MAX_LOCAL) events.splice(0, events.length - MAX_LOCAL);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(events));
  } catch (_) {}
}

function sendToServer(event, data, sessionId) {
  try {
    fetch("/api/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ event, data, sessionId }),
      keepalive: true,
    }).catch(() => {});
  } catch (_) {}
}

export function track(event, data = {}) {
  try {
    const sid = getSessionId();
    const safe = sanitize(data);
    storeLocal({ event, ts: Date.now(), date: new Date().toISOString().slice(0, 10), sid, ...safe });
    sendToServer(event, safe, sid);
  } catch (_) {}
}

export function getEvents() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  } catch (_) {
    return [];
  }
}

export function clearEvents() {
  try { localStorage.removeItem(STORAGE_KEY); } catch (_) {}
}
