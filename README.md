# AI Automation Tools — Directory

A static, single-page AI tools directory built for GitHub Pages. No build step, no
framework, no dependencies — just open `index.html`.

## Files

| File | What it's for |
|------|---------------|
| `data.js` | **The only file you edit.** Your tools, stats, links, and pricing live here. |
| `index.html` | Page structure (don't usually need to touch). |
| `style.css` | Design. Colours are CSS variables at the top if you want to rebrand. |
| `app.js` | Renders the directory from `data.js`. Don't edit. |

## Before you publish — fill these 3 placeholders in `data.js`

1. `intakeFormUrl` → your Google Form link (from the Apps Script intake project).
2. `newsletterUrl` → your Beehiiv subscribe page.
3. Replace the sample `TOOLS` with real ones, and adjust `PRICING` to your rates.

> Each tool's `tier` controls placement: `"featured"` (highlighted, top), `"listed"`
> (paid card in the grid), `"free"` (free editorial pick). Categories are auto-detected
> from the tools — the filter chips build themselves.

## Preview locally

Just double-click `index.html`, or run a tiny server (better, avoids browser file limits):

```powershell
# from this folder
python -m http.server 8000
# then open http://localhost:8000
```

## Publish on GitHub Pages

1. Create a new GitHub repo (e.g. `ai-tools-directory`) and push these files to the
   `main` branch root.
2. Repo → **Settings → Pages**.
3. Under **Build and deployment**, set **Source = Deploy from a branch**, branch =
   `main`, folder = `/ (root)`. Save.
4. Wait ~1 minute. Your site is live at
   `https://<your-username>.github.io/ai-tools-directory/`.

### Custom domain (optional, recommended for SEO)
In Settings → Pages → Custom domain, add e.g. `tools.yourdomain.com`, then add a
`CNAME` DNS record at your registrar pointing to `<your-username>.github.io`.

## SEO notes
- The `<title>` and meta description are in `index.html` — edit them to your keywords.
- A custom domain + the monthly Medium articles linking here is what builds ranking
  over time. Keep the directory fresh (the "updated monthly" promise matters).
