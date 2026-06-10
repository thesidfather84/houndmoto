import { sql } from "@vercel/postgres";

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Cache-Control", "public, s-maxage=60, stale-while-revalidate=300");

  try {
    const result = await sql`
      SELECT COUNT(*) AS count FROM analytics_events WHERE event = 'page_view'
    `;
    const raw = result.rows[0]?.count;
    const count = raw == null ? 0 : Number(raw);
    return res.status(200).json({ count: isNaN(count) ? 0 : count });
  } catch (err) {
    console.error("[visitor-count]", err.message);
    return res.status(200).json({ count: 0 });
  }
}
