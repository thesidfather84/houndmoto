# HoundMoto Fixed Version

This is a cleaned Vite + React version of HoundMoto.

## What was fixed

- Removed direct browser calls to Anthropic. Do not call paid AI APIs from frontend code because it fails without server headers and can expose keys.
- Added safe retailer search-link generation.
- Added VIN decoding through the public NHTSA VIN API.
- Added common DTC trouble-code lookup examples.
- Added fitment warnings and clearer disclaimers.
- Replaced invalid CSS and old static preview behavior.

## Run locally

```bash
npm install
npm run dev
```

## Build for deployment

```bash
npm run build
```

Deploy the generated `dist` folder to Vercel, Netlify, Cloudflare Pages, or your hosting provider.

## Important

This is not a crawler yet. It is now a working public-safe frontend tool. The next real upgrade is a backend with a parts database, cross-reference table, crawler/jobs queue, and retailer API or affiliate integrations.
