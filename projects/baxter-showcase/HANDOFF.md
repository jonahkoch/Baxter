# Baxter Showcase — Handoff

**Last updated:** 2026-10-23
**Live URL:** https://jonahkoch.github.io/Baxter/

---

## What This Is

A Proscenium-inspired, state-driven project dashboard. I (Baxter) update the layout and content by rewriting a JSON state file — the frontend polls it and animates changes in real time.

---

## Architecture

| Layer | Tech |
|-------|------|
| Frontend | React 18 + Vite + Tailwind CSS + Framer Motion |
| State | `public/latest-world.json` — polled every 4 seconds |
| Deploy | GitHub Pages via `gh-pages` branch (force-push) |
| Build | `npm run build` → `dist/` → force-push to `gh-pages` |

---

## File Structure

```
baxter-showcase/
├── public/
│   └── latest-world.json          ← STATE FILE — edit this to update content
├── src/
│   ├── ClawdbotWorld.jsx          ← Main component (windows, resize, drag, skills)
│   ├── main.jsx                   ← Entry point
│   └── index.css                  ← Tailwind imports
├── scripts/
│   └── update-state.js            ← CLI helper for state updates
├── index.html
├── vite.config.js                 ← base: '/Baxter/' for GitHub Pages
├── tailwind.config.js
├── postcss.config.js
└── package.json
```

---

## How to Update Content

### Option 1: Edit `latest-world.json` directly

Edit `public/latest-world.json`, then rebuild and deploy.

### Option 2: Use the helper script

```bash
cd projects/baxter-showcase

# Update a field
node scripts/update-state.js --window project-midnight-city --field progress --value 80

# Change status
node scripts/update-state.js --set-status project-polymarket paused

# Add a new window
node scripts/update-state.js --add-window '{"id":"new-idea","title":"💡 New Idea",...}'

# Remove a window
node scripts/update-state.js --remove-window old-project
```

### Option 3: Full rebuild + deploy

```bash
cd projects/baxter-showcase
npm run build
# Then force-push dist/ to gh-pages branch (see deploy script below)
```

---

## Window Types

### `type: "project"` or any window with `status`
Project cards showing:
- Status badge (active/paused/complete/idea)
- Progress bar (0-100)
- Description text
- Tags
- Links

### `type: "skills"`
Accordion-style domain drill-down:
- `domains[]` — each with `icon`, `name`, `items[]`
- Each item: `name`, `level` (1-5), `description`
- Click domain header to expand/collapse

### `id: "avatar"`
Avatar placeholder window. Set `imageUrl` to a PNG path to show an image.

### Default (no type, no status)
Simple text content window.

---

## Window Schema

```json
{
  "id": "unique-id",
  "title": "Window Title",
  "x": 100,
  "y": 100,
  "width": 300,
  "height": 200,
  "content": "Body text here",
  "type": "project",           // optional
  "status": "active",          // active | paused | complete | idea
  "progress": 75,              // 0-100
  "tags": ["tag1", "tag2"],
  "links": [{"label": "Repo", "url": "https://..."}],
  "imageUrl": "images/face.png" // for avatar
}
```

---

## Deploy Script

Quick one-liner for clean gh-pages deployment:

```bash
cd /tmp && rm -rf clean-gh-pages && mkdir clean-gh-pages && cd clean-gh-pages && \
git init && git remote add origin git@github.com:jonahkoch/Baxter.git && \
cp -r /root/.openclaw/workspace/projects/baxter-showcase/dist/* . && \
touch .nojekyll && git add -A && \
git commit -m "deploy: <description>" && \
git push --force origin master:gh-pages
```

---

## Current State

**Windows:**
- 🤖 Avatar (placeholder)
- 📋 About
- 🛠️ Skills (5 domains, 18 skills total)
- 🌃 Midnight City (active, 75%)
- 📸 Kochfoto AI Agents (active, 40%)
- 🔗 Social Credibility (active, 55%)
- 🗳️ PactVote (active, 70%)
- 🎨 OJonah / Tone Deaf (active, 85%)
- 📚 Cardano DeFi Skills (active, 30%)
- 📈 Polymarket Analysis (paused, 90%)

**Interactions:**
- ✅ Drag windows
- ✅ Resize windows (hover bottom-right corner)
- ✅ Click skills domain to expand/collapse
- ✅ Links open in new tab

---

## v2 Roadmap

- [ ] **Custom domain** — Vercel deployment, remove `base: '/Baxter/'`
- [ ] **Animated avatar** — WebGL/CSS animations, v2
- [ ] **Text-to-speech** — Browser TTS for project updates
- [ ] **Visual timelines** — Project dependency graphs, Gantt-style
- [ ] **Theme switching** — Dark/light mode toggle
- [ ] **Mobile responsive** — Collapsible layout for small screens
- [ ] **Persist layout** — Save drag/resize positions to localStorage
- [ ] **Live chat integration** — Feed messages into the dashboard

---

## Notes

- `.nojekyll` is required in `gh-pages` branch — prevents GitHub's Jekyll from breaking the build
- The `base: '/Baxter/'` in `vite.config.js` must match the repo name for GitHub Pages
- When moving to Vercel, remove the `base` config
- Resize/drag positions are local state only — not persisted on refresh
