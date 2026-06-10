import { sql } from "@vercel/postgres";

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Cache-Control", "public, s-maxage=60, stale-while-revalidate=300");

  try {
    const result = await sql`
      SELECT COUNT(*) AS count FROM analytics_events WHERE event = 'page_view'
    `;
    const count = parseInt(result.rows[0]?.count || "0", 10);
    return res.status(200).json({ count });
  } catch (err) {
    console.error("[visitor-count]", err.message);
    return res.status(200).json({ count: null });
  }
}
