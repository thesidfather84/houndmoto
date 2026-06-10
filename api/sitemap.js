// Dynamic sitemap generator
// Covers homepage, legal pages, DTC pages, and key feature pages

const BASE = "https://www.houndmoto.com";

const TOP_CODES = [
  "p0011","p0012","p0013","p0014","p0016","p0017",
  "p0101","p0102","p0103","p0117","p0118","p0121","p0128",
  "p0131","p0133","p0141",
  "p0171","p0172","p0174","p0175",
  "p0300","p0301","p0302","p0303","p0304","p0305","p0306",
  "p0335","p0340","p0341","p0351",
  "p0401","p0420","p0421","p0430",
  "p0440","p0442","p0455","p0456","p0457",
  "p0507","p0700","p0730","p0740",
];

const STATIC_PAGES = [
  { path: "/", priority: "1.0", changefreq: "weekly" },
  { path: "/right-to-repair", priority: "0.8", changefreq: "monthly" },
  { path: "/parts/search", priority: "0.7", changefreq: "monthly" },
  { path: "/diagnostic-assistant", priority: "0.7", changefreq: "monthly" },
  { path: "/terms", priority: "0.3", changefreq: "yearly" },
  { path: "/privacy", priority: "0.3", changefreq: "yearly" },
  { path: "/disclaimer", priority: "0.3", changefreq: "yearly" },
  { path: "/contact", priority: "0.4", changefreq: "yearly" },
];

function urlEntry(path, priority, changefreq, lastmod) {
  return `  <url>
    <loc>${BASE}${path}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
}

export default function handler(req, res) {
  const today = new Date().toISOString().slice(0, 10);

  const staticEntries = STATIC_PAGES.map((p) =>
    urlEntry(p.path, p.priority, p.changefreq, today)
  );

  const dtcEntries = TOP_CODES.map((code) =>
    urlEntry(`/dtc/${code}`, "0.9", "monthly", today)
  );

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticEntries.join("\n")}
${dtcEntries.join("\n")}
</urlset>`;

  res.setHeader("Content-Type", "application/xml");
  res.setHeader("Cache-Control", "public, s-maxage=86400");
  res.status(200).send(xml);
}
