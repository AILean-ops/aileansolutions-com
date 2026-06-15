# aileansolutions.com

Parent-company site for **AI Lean Solutions LLC**. The public architecture is intentionally narrow:

- `https://aipromotionguy.com/` for practical AI education and first wins.
- `https://usefulopsai.com/` for small-business workflow repair.

The site keeps the existing AI Lean Solutions visual system, but no longer presents market intelligence, Expert Technician, waitlist, contact, or internal initiative pages as public offers.

## Quick Start

```bash
npm install
npm run dev
npm run build
```

Requires Node.js 20 or newer.

## Public Routes

- `/` - parent-company doorway to the two active sites.
- `/legal/privacy` - parent-company privacy policy.
- `/legal/terms` - parent-company terms of use.
- `/report-feedback` - hidden operational utility retained for already-scheduled market-intelligence report ticklers.

Old public URLs are handled by `public/_redirects`.

## Deployment

Cloudflare Pages builds from `main`.

- Build command: `npm run build`
- Build output directory: `dist`
- Node version: `20`

© 2026 AI Lean Solutions LLC. All rights reserved.
