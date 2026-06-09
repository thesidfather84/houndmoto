const STORAGE_KEY = 'hm_events';
const SESSION_KEY = 'hm_sid';
const MAX_EVENTS = 1000;

function getSessionId() {
  let id = sessionStorage.getItem(SESSION_KEY);
  if (!id) {
    id = Math.random().toString(36).slice(2) + Date.now().toString(36);
    sessionStorage.setItem(SESSION_KEY, id);
  }
  return id;
}

const PII_BLOCKLIST = ['name', 'email', 'phone', 'address', 'ssn', 'dob', 'zip', 'ip'];

function sanitize(data) {
  const safe = {};
  for (const [k, v] of Object.entries(data)) {
    if (!PII_BLOCKLIST.some((p) => k.toLowerCase().includes(p))) {
      safe[k] = typeof v === 'string' ? v.slice(0, 200) : v;
    }
  }
  return safe;
}

export function track(event, data = {}) {
  try {
    const events = getEvents();
    events.push({
      event,
      ts: Date.now(),
      date: new Date().toISOString().slice(0, 10),
      sid: getSessionId(),
      ...sanitize(data),
    });
    if (events.length > MAX_EVENTS) events.splice(0, events.length - MAX_EVENTS);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(events));
  } catch (_) {
    // Analytics must never break the app
  }
}

export function getEvents() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  } catch (_) {
    return [];
  }
}

export function clearEvents() {
  try { localStorage.removeItem(STORAGE_KEY); } catch (_) {}
}
