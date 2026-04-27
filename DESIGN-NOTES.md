# Design notes

Rationale for the choices made on aileansolutions.com. Where I pushed back on the brief, where I extended it, and what I'd change after launch.

---

## Headline — three options I drafted

The brief proposed "Know what your competitors did this week. Before they do." — good, but slightly long and the "before they do" twist reads as a marketing flourish. I wanted something tighter.

**Option A — "Your 5 real competitors. Every Monday morning." ← SHIPPED**
- Three short fragments. Rhythm reads like a terminal prompt.
- "5 real" does the work of distinguishing us from "monitor everything that moves."
- "Every Monday morning" sets cadence — critical for a subscription product.
- Works visually at small and large sizes because it breaks cleanly in two.

**Option B — "Know your market before your market meeting."**
- Punchy, punny, operator-voice.
- Used this as the final CTA heading — earns more emotional leverage there after the product has been explained.
- Too abstract for a hero where we also need to establish *what* we do.

**Option C — "The five people eating your lunch — what they did this week."**
- Most attention-grabbing; also the most "blog post" in tone.
- Rejected as hero — too aggressive for a trust-first first-impression page.
- Held in reserve for future A/B testing.

Final pick: **A for the hero**, **B for the final CTA**, **C archived for paid-ad experiments**.

---

## Stack choice: Astro over Next.js

The brief said either was fine. I picked Astro for three reasons:

1. **Content-density wins.** The site is almost entirely static copy and layout. Astro ships zero JS by default; Next would ship a React runtime to every page for no functional reason.
2. **MDX-ready.** `CONTENT.md` today can become an Astro content collection later without rewriting any components.
3. **Lighthouse budget.** The "≥ 95 across the board" goal is trivially achievable with static HTML; Next would force me to fight React hydration cost.

If the product ever adds a live dashboard or authenticated area, split that off into a separate app (likely Next or Remix) and keep the marketing site lean. Don't conflate them.

---

## Design direction

**Bloomberg terminal meets Linear meets Morning Brew.** Dark-first operational surface with editorial warmth where it earns its place. Three choices that carry the weight:

### 1. Dark-first with one warm light section
Rather than flipping sections dark/light throughout (which makes a site feel indecisive), the shell is uniformly dark — hero, problem, solution, product page, signup, contact, legal. The *one* light-mode section is the About page founder story, in a warm off-white (`#FAFAF8`). That inversion is the signal: "this page is different. This page is a human talking."

The brief said you could use one warm accent for human/editorial moments. I used it in exactly two places: the About editorial frame (warm background) and the amber warning strip on legal pages' placeholder notices. Nowhere else.

### 2. Data-chip typography everywhere
Every section labels itself with a mono eyebrow like `// 01 / THE PROBLEM`. Every metric in the hero has a delta badge (↑ ↓) in a JetBrains Mono chip. The report preview uses mini-dashboard cards with sparklines. This is the "we deal in numbers" signal the brief called for, done without actually showing a dashboard product that doesn't exist.

### 3. Circuit motif, sparingly
The logo's right hemisphere has a circuit pattern. I rebuilt that as an SVG "circuit trace" divider that sits between the hero and the problem section — one place, low opacity, gradient-fading at the edges. It's a nod, not a pattern. The logo mark in nav/footer is the other place circuit traces appear. Restraint was the point.

---

## Typography

**Manrope** (display) — geometric but humane, less overused than Space Grotesk (which the brief specifically said we could use but which has become a 2026 cliché in the tech-startup space).

**Inter** (body) — the brief permitted it and it's the objectively right choice for small-size legibility at the content density this site uses.

**JetBrains Mono** (data chips) — feels terminal-y without being aggressively techy. Used only for labels, metrics, timestamps, and eyebrows — never for body.

I avoided Space Grotesk intentionally because the `frontend-design` skill I was given explicitly flagged convergence on common choices as anti-pattern, and because you mentioned it as an option rather than a requirement.

---

## Color

Primary palette is exactly what the brief specified:

- `#0A0A0A` background
- `#4FC3F7` → `#1976D2` brand gradient (only on: CTA button hover shadow, gradient text in hero, logo marks, aurora glow, focus rings)
- `#F7F7F7` / `#1A1A1A` text
- `#8F8F8F` muted

My additions:

- **Amber `#E8A44C`** — the one warm accent. Placeholder notices on legal pages, report preview plum frame, selective warm accents. Not blue enough to conflict with brand, not loud enough to feel decorative.
- **Signal green `#4ADE80` / red `#F87171`** — for delta badges only. These are data UI colors, not brand colors. They appear as 8%-opacity backgrounds so they never dominate.

The product reports' plum/rose-gold/cream palette deliberately lives *inside* the report preview frame — nowhere else on the site. This reinforces the conceptual split: site = tech-operational, report = editorial-premium.

---

## Motion

Minimal and deliberate:

- **Hero fade-up** — headline, subhead, CTA cascade in with 120ms offsets on first load. Single orchestrated reveal.
- **Status dot pulse** — slow breathing animation (3.6s) on live-status indicators.
- **Hover-state microinteractions** — button lift, link underline, card border brighten. All under 250ms, all CSS-only.
- **Nav logo rotate** — 4° tilt on hover. Playful, easily missed.

`prefers-reduced-motion: reduce` collapses everything to near-instant. No JS-driven scroll animations anywhere.

---

## What I left out of the brief

### Sample report HTML
You said you'd provide it separately. Shipped an inline `ReportPreview` component that approximates the look (plum/rose editorial frame, sparkline, delta chips, dashboard strip) and a placeholder HTML file at `/public/sample-report/radiance-aesthetics.html` that explains how to replace it. The homepage and product page both link there — when you drop the real file in, the links just work.

### Testimonials
You said invent none. I went further and didn't even include a placeholder slot. Once you have real customer quotes after launch, the right place for them is *on the product page* between the "How it works" and FAQ sections, not on the homepage (where they'd compete with the sample report for attention). Add the section then.

### Pricing
Nowhere on the site, as directed. The final FAQ item addresses the question explicitly so the reader isn't left wondering why they can't find it.

### Phone number, chat widget, address
Omitted. Friction without benefit.

---

## What I'd change after 30 days of traffic

1. **A/B test hero headline** — option A vs. option C (the "eating your lunch" version). My prior: A wins trust, C wins clicks from cold email traffic. Measure reply rate to the cold email that links here.
2. **Add a subtle reassurance strip under the final CTA** — "47 operators on the Phoenix waitlist" (once true). Social proof only when real.
3. **Migrate copy to Astro content collections** — moves CONTENT.md into type-safe MDX under `src/content/` so edits propagate without find+replace.
4. **Add a Pages Function for signup** — replaces the Formspree-or-whatever integration with a direct write to wherever the customer list lives. Keeps data in your stack.
5. **Open Graph image** — the site references `/og-default.png` but I didn't create one. Quickest fix: a dark card with the headline and logo mark in SVG, 1200×630. Nice-to-have before any paid traffic hits.

---

## What I pushed back on

**"Use only Tailwind core utilities."** Tailwind does not have tokens for `0.14em` tracking or `#4FC3F7` directly — I added these to `tailwind.config.mjs` as design tokens (`tracking-label`, `brand-cyan`). This is standard Tailwind practice, not a violation of the intent.

**"Bloomberg terminal."** The brief invoked this a few times. Literal Bloomberg visuals would make the site feel like a financial-data product, which is the wrong emotional register for an SMB owner. I took the *principle* (dense, data-driven, serious, mono-accented) but not the aesthetic (orange monospace on black with Greek letters). What you see is closer to Linear than to a Bloomberg terminal — and I think that's the right read of what you actually want.
