import { sql } from "@vercel/postgres";

const PII_KEYS = ["name", "email", "phone", "address", "ssn", "dob", "zip"];

function sanitize(data) {
  const safe = {};
  for (const [k, v] of Object.entries(data || {})) {
    if (!PII_KEYS.some((p) => k.toLowerCase().includes(p))) {
      safe[k] = typeof v === "string" ? v.slice(0, 200) : v;
    }
  }
  return safe;
}

function detectDevice(ua = "") {
  return /mobile|android|iphone|ipad/i.test(ua) ? "mobile" : "desktop";
}

function detectBrowser(ua = "") {
  if (/edg\//i.test(ua)) return "Edge";
  if (/chrome/i.test(ua)) return "Chrome";
  if (/safari/i.test(ua)) return "Safari";
  if (/firefox/i.test(ua)) return "Firefox";
  return "Other";
}

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  try {
    const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body;
    const { event, data, sessionId } = body || {};

    if (!event || typeof event !== "string") {
      return res.status(400).json({ error: "Invalid event" });
    }

    const safeEvent = event.slice(0, 50);
    const safeSessionId = String(sessionId || "").slice(0, 50);
    const safeData = sanitize(data);

    const ua = req.headers["user-agent"] || "";
    const deviceType = detectDevice(ua);
    const browser = detectBrowser(ua);
    const referrer = (req.headers["referer"] || null)?.slice(0, 500) || null;

    // Vercel injects geo headers — city/country/region only, no GPS
    const country = req.headers["x-vercel-ip-country"] || null;
    const region = req.headers["x-vercel-ip-country-region"] || null;
    const city = req.headers["x-vercel-ip-city"]
      ? decodeURIComponent(req.headers["x-vercel-ip-city"])
      : null;

    await sql`
      INSERT INTO analytics_events
        (session_id, event, data, device_type, browser, referrer, country, region, city)
      VALUES
        (${safeSessionId}, ${safeEvent}, ${JSON.stringify(safeData)},
         ${deviceType}, ${browser}, ${referrer}, ${country}, ${region}, ${city})
    `;

    return res.status(200).json({ ok: true });
  } catch (err) {
    // Analytics must never crash the public site — swallow and return ok
    console.error("[track]", err.message);
    return res.status(200).json({ ok: true, warn: "db_unavailable" });
  }
}
