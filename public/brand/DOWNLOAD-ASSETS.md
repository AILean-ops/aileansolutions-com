# Brand assets — one-time fetch

The site references two brand assets that need to live in this folder:

- `logo.png` — AI Lean Solutions logo (brain icon + wordmark)
- `brian-paris.jpg` — Brian's headshot from Paris (used on /about)

Both are currently hosted on your GoDaddy site. To pull them down in one step:

```bash
cd public/brand

# Logo (PNG, transparent background)
curl -L -o logo.png \
  "https://img1.wsimg.com/isteam/ip/72c6cec9-0738-478e-82b5-dbe64aef08ff/blob-9e9f0db.png"

# Founder photo (Paris)
curl -L -o brian-paris.jpg \
  "https://img1.wsimg.com/isteam/ip/72c6cec9-0738-478e-82b5-dbe64aef08ff/Brian%20Bricker%20in%20Paris-cd59e10.png"
```

If you want higher-res versions later, replace these files — the paths are referenced
consistently across the site and everything will pick up the new images automatically.

## Fallbacks

The site is designed to render without these files — you'll see SVG logo marks and a
placeholder block on /about. Get the real assets in place before launch.
