import { sql } from "@vercel/postgres";
import { verifyToken } from "./stats.js";

function toCsv(headers, rows) {
  const escape = (v) => `"${String(v ?? "").replace(/"/g, '""')}"`;
  return [headers.join(","), ...rows.map((r) => headers.map((h) => escape(r[h])).join(","))].join("\n");
}

export default async function handler(req, res) {
  if (req.method !== "GET") return res.status(405).end();

  const token = req.headers["authorization"]?.replace("Bearer ", "");
  if (!verifyToken(token)) return res.status(401).json({ error: "Unauthorized" });

  const type = req.query?.type || "events";

  try {
    let csv = "";
    let filename = "";

    if (type === "advertiser") {
      const { rows } = await sql`
        SELECT
          TO_CHAR(DATE_TRUNC('month', created_at), 'YYYY-MM') AS month,
          COUNT(DISTINCT session_id)                           AS unique_visitors,
          COUNT(*) FILTER (WHERE event = 'page_view')         AS page_views,
          COUNT(*) FILTER (WHERE event = 'search_submitted')  AS searches,
          COUNT(*) FILTER (WHERE event = 'premium_email_clicked') AS premium_clicks,
          COUNT(*) FILTER (WHERE event = 'manual_reference_clicked') AS manual_clicks
        FROM analytics_events
        GROUP BY DATE_TRUNC('month', created_at)
        ORDER BY DATE_TRUNC('month', created_at) DESC
        LIMIT 24
      `;
      csv = toCsv(["month", "unique_visitors", "page_views", "searches", "premium_clicks", "manual_clicks"], rows);
      filename = `houndmoto-advertiser-${new Date().toISOString().slice(0, 10)}.csv`;
    } else {
      const { rows } = await sql`
        SELECT session_id, event, data::text AS data, device_type, browser,
               country, region, city, created_at
        FROM analytics_events
        ORDER BY created_at DESC
        LIMIT 10000
      `;
      csv = toCsv(["session_id", "event", "data", "device_type", "browser", "country", "region", "city", "created_at"], rows);
      filename = `houndmoto-events-${new Date().toISOString().slice(0, 10)}.csv`;
    }

    res.setHeader("Content-Type", "text/csv");
    res.setHeader("Content-Disposition", `attachment; filename="${filename}"`);
    return res.status(200).send(csv);
  } catch (err) {
    console.error("[export]", err.message);
    return res.status(500).json({ error: err.message });
  }
}
