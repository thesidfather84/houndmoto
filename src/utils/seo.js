const BASE = "https://www.houndmoto.com";

const HOME = {
  title: "HoundMoto — Auto Specs Search",
  description:
    "HoundMoto: one search bar for vehicle oil specs, transmission fluid, tire size, battery group, wiper blades, and OBD trouble codes. Free. No signup.",
  path: "/",
};

export function setPageSEO({ title, description, path }) {
  const canonical = `${BASE}${path}`;
  document.title = title;
  _set('meta[name="description"]',        "content", description);
  _set('meta[property="og:title"]',       "content", title);
  _set('meta[property="og:description"]', "content", description);
  _set('meta[property="og:url"]',         "content", canonical);
  const link = document.querySelector('link[rel="canonical"]');
  if (link) link.setAttribute("href", canonical);
}

export function resetPageSEO() {
  setPageSEO(HOME);
}

function _set(selector, attr, value) {
  const el = document.querySelector(selector);
  if (el) el.setAttribute(attr, value);
}

export const SITE_BASE = BASE;
