import crypto from "crypto";
import { sql } from "@vercel/postgres";

export function verifyToken(token) {
  const secret = process.env.ADMIN_SECRET;
  if (!secret || !token) return false;
  try {
    const [payload, sig] = String(token).split(".");
    if (!payload || !sig) return false;
    const expected = crypto.createHmac("sha256", secret).update(payload).digest("base64url");
    // timingSafeEqual throws if buffers differ in length — guard first
    if (sig.length !== expected.length) return false;
    if (!crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(expected))) return false;
    const { exp } = JSON.parse(Buffer.from(payload, "base64url").toString());
    return Date.now() < exp;
  } catch (_) {
    return false;
  }
}

export default async function handler(req, res) {
  if (req.method !== "GET") return res.status(405).json({ error: "Method not allowed" });

  const token = req.headers["authorization"]?.replace("Bearer ", "");
  if (!verifyToken(token)) return res.status(401).json({ error: "Unauthorized" });

  if (!process.env.POSTGRES_URL) {
    return res.status(503).json({
      error: "Database not connected",
      detail: "POSTGRES_URL is not set. In your Vercel dashboard: Storage → Create Database → Postgres → link to this project. Then run db/schema.sql in the Vercel Postgres query console. Also confirm ADMIN_PIN and ADMIN_SECRET are set under Project Settings → Environment Variables.",
    });
  }

  try {
    const [overview, daily, vehicles, symptoms, manuals, referrers, devices, errors, failedSearches, brokenLinks] =
      await Promise.all([
        sql`
          SELECT
            COUNT(DISTINCT session_id) FILTER (WHERE created_at >= NOW() - INTERVAL '1 day')  AS today_visitors,
            COUNT(DISTINCT session_id) FILTER (WHERE created_at >= NOW() - INTERVAL '7 days') AS week_visitors,
            COUNT(DISTINCT session_id) FILTER (WHERE created_at >= NOW() - INTERVAL '30 days') AS month_visitors,
            COUNT(DISTINCT session_id)                                                         AS total_visitors,
            COUNT(*) FILTER (WHERE event = 'search_submitted')                                AS total_searches,
            COUNT(*) FILTER (WHERE event = 'premium_email_clicked')                           AS premium_clicks,
            COUNT(*) FILTER (WHERE event = 'error_occurred')                                  AS total_errors,
            COUNT(*) FILTER (WHERE event = 'manual_reference_clicked')                        AS manual_clicks,
            COUNT(*) FILTER (WHERE event = 'broken_link_reported')                            AS broken_links,
            COUNT(*) FILTER (WHERE event = 'page_view')                                       AS page_views
          FROM analytics_events
        `,
        sql`
          SELECT
            DATE(created_at) AS day,
            COUNT(DISTINCT session_id)                              AS visitors,
            COUNT(*) FILTER (WHERE event = 'page_view')            AS page_views,
            COUNT(*) FILTER (WHERE event = 'search_submitted')     AS searches
          FROM analytics_events
          WHERE created_at >= NOW() - INTERVAL '30 days'
          GROUP BY DATE(created_at)
          ORDER BY day DESC
          LIMIT 30
        `,
        sql`
          SELECT
            data->>'make'  AS make,
            data->>'model' AS model,
            data->>'year'  AS year,
            COUNT(*)       AS count
          FROM analytics_events
          WHERE event = 'vehicle_selected' AND data->>'make' IS NOT NULL
          GROUP BY data->>'make', data->>'model', data->>'year'
          ORDER BY count DESC
          LIMIT 20
        `,
        sql`
          SELECT data->>'category' AS category, COUNT(*) AS count
          FROM analytics_events
          WHERE event = 'symptom_selected' AND data->>'category' IS NOT NULL
          GROUP BY data->>'category'
          ORDER BY count DESC
          LIMIT 10
        `,
        sql`
          SELECT data->>'source' AS source, COUNT(*) AS count
          FROM analytics_events
          WHERE event = 'manual_reference_clicked'
          GROUP BY data->>'source'
          ORDER BY count DESC
          LIMIT 10
        `,
        sql`
          SELECT referrer, COUNT(DISTINCT session_id) AS sessions
          FROM analytics_events
          WHERE referrer IS NOT NULL AND referrer != ''
          GROUP BY referrer
          ORDER BY sessions DESC
          LIMIT 20
        `,
        sql`
          SELECT device_type, browser, COUNT(DISTINCT session_id) AS sessions
          FROM analytics_events
          GROUP BY device_type, browser
          ORDER BY sessions DESC
          LIMIT 20
        `,
        sql`
          SELECT data, city, country, created_at
          FROM analytics_events
          WHERE event = 'error_occurred'
          ORDER BY created_at DESC
          LIMIT 50
        `,
        sql`
          SELECT data->>'query' AS query, COUNT(*) AS count
          FROM analytics_events
          WHERE event = 'search_submitted'
            AND data->>'resultCount' = '0'
          GROUP BY data->>'query'
          ORDER BY count DESC
          LIMIT 20
        `,
        sql`
          SELECT data, created_at
          FROM analytics_events
          WHERE event = 'broken_link_reported'
          ORDER BY created_at DESC
          LIMIT 20
        `,
      ]);

    // Monthly monetization summary (12 months)
    const { rows: monthly } = await sql`
      SELECT
        TO_CHAR(DATE_TRUNC('month', created_at), 'YYYY-MM')           AS month,
        COUNT(DISTINCT session_id)                                      AS unique_visitors,
        COUNT(*) FILTER (WHERE event = 'page_view')                    AS page_views,
        COUNT(*) FILTER (WHERE event = 'search_submitted')             AS searches,
        COUNT(*) FILTER (WHERE event = 'premium_email_clicked')        AS premium_clicks,
        COUNT(*) FILTER (WHERE event = 'manual_reference_clicked')     AS manual_clicks
      FROM analytics_events
      WHERE created_at >= NOW() - INTERVAL '12 months'
      GROUP BY DATE_TRUNC('month', created_at)
      ORDER BY DATE_TRUNC('month', created_at) DESC
    `;

    return res.status(200).json({
      overview: overview.rows[0],
      daily: daily.rows,
      vehicles: vehicles.rows,
      symptoms: symptoms.rows,
      manuals: manuals.rows,
      referrers: referrers.rows,
      devices: devices.rows,
      errors: errors.rows,
      failedSearches: failedSearches.rows,
      brokenLinks: brokenLinks.rows,
      monthly,
    });
  } catch (err) {
    console.error("[stats]", err.message);
    return res.status(500).json({ error: "Database error", detail: err.message });
  }
}
