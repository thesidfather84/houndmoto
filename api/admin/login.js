import crypto from "crypto";
import { sql } from "@vercel/postgres";

// In-memory rate limiter — resets on cold start, sufficient for low-traffic admin
const attempts = new Map();
const MAX_ATTEMPTS = 5;
const WINDOW_MS = 60_000;

function checkRateLimit(ipHash) {
  const now = Date.now();
  const rec = attempts.get(ipHash) || { count: 0, resetAt: now + WINDOW_MS };
  if (now > rec.resetAt) { rec.count = 0; rec.resetAt = now + WINDOW_MS; }
  rec.count++;
  attempts.set(ipHash, rec);
  return rec.count > MAX_ATTEMPTS;
}

function hashIp(req) {
  const raw = req.headers["x-forwarded-for"]?.split(",")[0]?.trim() || "unknown";
  return crypto.createHash("sha256").update(raw).digest("hex").slice(0, 16);
}

function makeToken(secret) {
  const now = Date.now();
  const payload = Buffer.from(JSON.stringify({ iat: now, exp: now + 86_400_000 })).toString("base64url");
  const sig = crypto.createHmac("sha256", secret).update(payload).digest("base64url");
  return `${payload}.${sig}`;
}

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const adminPin = process.env.ADMIN_PIN;
  const adminSecret = process.env.ADMIN_SECRET;
  if (!adminPin || !adminSecret) {
    return res.status(503).json({ error: "Admin not configured. Set ADMIN_PIN and ADMIN_SECRET env vars." });
  }

  const ipHash = hashIp(req);

  if (checkRateLimit(ipHash)) {
    try { await sql`INSERT INTO admin_access_logs (ip_hash, success) VALUES (${ipHash}, false)`; } catch (_) {}
    return res.status(429).json({ error: "Too many attempts. Wait 1 minute." });
  }

  const { pin } = typeof req.body === "string" ? JSON.parse(req.body) : (req.body || {});

  if (String(pin) !== String(adminPin)) {
    try { await sql`INSERT INTO admin_access_logs (ip_hash, success) VALUES (${ipHash}, false)`; } catch (_) {}
    return res.status(401).json({ error: "Incorrect PIN" });
  }

  try { await sql`INSERT INTO admin_access_logs (ip_hash, success) VALUES (${ipHash}, true)`; } catch (_) {}

  return res.status(200).json({ token: makeToken(adminSecret) });
}
