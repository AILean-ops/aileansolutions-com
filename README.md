# aileansolutions.com

Marketing site for **AI Lean Solutions LLC** — competitive intelligence and operational insight for local service businesses. Built with **Astro 4** + **Tailwind CSS**, deployed to **Cloudflare Pages**.

---

## Quick start

```bash
# 1. Install
npm install

# 2. Get brand assets (logo and founder photo)
#    See public/brand/DOWNLOAD-ASSETS.md for one-line curl commands
cd public/brand && bash -c "$(cat DOWNLOAD-ASSETS.md | grep -A1 'curl')" && cd ../..

# 3. Run dev server (http://localhost:4321)
npm run dev

# 4. Build for production
npm run build

# 5. Preview the production build locally
npm run preview
```

Requires Node.js **≥ 20**.

---

## What's here

```
.
├── astro.config.mjs          # Astro config (sitemap, Tailwind, CF Pages output)
├── tailwind.config.mjs       # Brand tokens: colors, fonts, animations
├── package.json
├── tsconfig.json
├── public/
│   ├── brand/                # Logo + photo (see DOWNLOAD-ASSETS.md)
│   ├── sample-report/        # Drop sample report HTML here
│   ├── favicon.svg
│   └── robots.txt
├── src/
│   ├── styles/global.css     # Tailwind layers, fonts, utilities, motifs
│   ├── layouts/Base.astro    # Shared layout: SEO, JSON-LD, nav, footer
│   ├── components/           # Nav, Footer, Section, DeltaBadge, Sparkline, ...
│   └── pages/
│       ├── index.astro       # Home
│       ├── product.astro     # How it works + FAQ
│       ├── about.astro       # Brian's story
│       ├── signup.astro      # Waitlist form
│       ├── contact.astro     # Mailto page
│       └── legal/
│           ├── privacy.astro
│           └── terms.astro
├── CONTENT.md                # Every word on the site, in one markdown file
├── DESIGN-NOTES.md           # Design decisions and rationale
└── README.md
```

---

## Editing content

**For non-code edits: use `CONTENT.md`.** Every piece of copy on the site is mirrored there. Find the section you want to edit, make the change, and then find+replace the same string in the corresponding `.astro` page. (A future migration to Astro content collections would eliminate this second step — see DESIGN-NOTES.md for rationale.)

**For new pages:** create a new `.astro` file in `src/pages/`. Its URL matches the filename. Copy the frontmatter from an existing page and import `Base` as the layout.

**For new market tiles on the homepage:** edit the "Who this is for" section in `src/pages/index.astro` and add a `<MarketTile />` component with the right status/metro/vertical.

---

## Brand assets

The site references two image files that are not committed to the repo:

- `/public/brand/logo.png` — full AI Lean Solutions wordmark + brain logo
- `/public/brand/brian-paris.jpg` — founder photo on the About page

See `public/brand/DOWNLOAD-ASSETS.md` for one-line curl commands that pull both from the current GoDaddy site. Swap them for higher-resolution versions later by replacing the files — paths are referenced consistently.

The navigation, footer, and favicon use an inline SVG mark (`/public/brand/logo-mark.svg`) that ships with the repo, so the site renders cleanly even if the PNGs haven't been downloaded yet.

---

## Forms (signup + contact)

Both `/signup` and `/contact` post directly to **[Web3Forms](https://web3forms.com)**, a no-backend form-to-email service. Submissions land in Brian's `aileansolutions.com` Gmail inbox.

- **Access key (public, safe to ship in HTML):** `638f05ca-f33a-4c10-bba2-cc0c4e757cb1`
- **Tier:** free (250 submissions/mo combined across both forms).
- **Security model:** Web3Forms enforces an allowed-domain referrer check, not key secrecy. Set the allowed domains to `aileansolutions.com` and `www.aileansolutions.com` in the dashboard before launch. Disable any `localhost` allowance.
- **No backend code needed.** No Cloudflare Pages Function, no env vars, no API key in deploy secrets.
- **Spam control:** Web3Forms honeypot field (`botcheck` checkbox, `display:none`) included on both forms.
- **UX:** inline JS handles loading state, success message, and a graceful mailto fallback if the request fails.

---

## Deploying to Cloudflare Pages

1. Push this repo to GitHub/GitLab.
2. In Cloudflare dashboard → Pages → Create project → Connect to your repo.
3. Build settings:
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
   - **Node version:** `20` (env var: `NODE_VERSION=20`)
4. Add your custom domain (`aileansolutions.com`) under Pages → Custom domains.

No environment variables are required for the site or the forms. Web3Forms is wired client-side only.

---

## Analytics

The site ships with **no analytics enabled**. If you want Plausible (privacy-respecting, cookieless), uncomment the single `<script>` tag inside `src/layouts/Base.astro` and sign up at [plausible.io](https://plausible.io).

Do **not** add Google Analytics — it would require a cookie banner and make the site feel corporate. The product voice works against that.

---

## Performance

Designed for Lighthouse ≥ 95 on both mobile and desktop. Choices that matter:

- Static output — no runtime JS framework hydration.
- Self-hosted-style font loading via Google Fonts with preconnect + `font-display: swap`.
- All images lazy-loaded except the About hero photo (eager, above the fold).
- No tracking scripts, no chat widgets, no third-party embeds.
- Tailwind is purged to only the classes actually used.

If you measure below 95 somewhere, check: (a) whether you replaced any `<img>` with a large unoptimized file, (b) whether you added a tracking script without `defer`.

---

## Accessibility

- WCAG AA color contrast on all text.
- Skip-to-content link, semantic HTML, labeled form inputs, alt text on every image.
- Visible focus rings on all interactive elements.
- `prefers-reduced-motion` respected — animations collapse to near-zero duration.
- FAQ disclosure uses native `<details>/<summary>` — keyboard-accessible with zero JS.

---

## What's deliberately missing

- **Pricing page.** Pricing stays in the personal cold email. The site creates trust and captures interest; the email closes.
- **Testimonials.** None invented. Replace the empty slot on the homepage once real quotes exist post-launch.
- **Phone number, chat widget, office address.** Friction without benefit for this product.
- **Cookie banner.** No cookies ship by default, so no banner is needed.

---

## License

© 2026 AI Lean Solutions LLC. All rights reserved.
