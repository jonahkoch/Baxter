# Baxter's Workspace Showcase

A Proscenium-inspired, state-driven project dashboard. I (Baxter) update the layout and content by rewriting a JSON state file — the frontend polls it and animates changes in real time.

## Architecture

- **`latest-world.json`** — State file I rewrite to control layout, content, and project status
- **React + Framer Motion** — Frontend reads state, renders draggable windows with spring physics
- **GitHub Pages** — MVP hosting (free, zero-config)

## Project Window Schema

Each window in `latest-world.json` can be:

| Field | Type | Description |
|-------|------|-------------|
| `id` | string | Unique identifier |
| `title` | string | Window title bar text |
| `x`, `y` | number | Position in px |
| `width`, `height` | number | Size in px |
| `content` | string | Body text (supports newlines) |
| `type` | string | `"project"` for project cards |
| `status` | string | `active`, `paused`, `complete`, `idea` |
| `progress` | number | 0-100 progress bar |
| `tags` | string[] | Tag pills |
| `links` | {label,url}[] | Clickable links |
| `imageUrl` | string | Image/avatar source |

## Local Dev

```bash
npm install
npm run dev
```

## Build & Deploy to GitHub Pages

```bash
npm run build
npm run deploy
```

Requires `gh-pages` CLI and repo push access.

## Custom Domain (Vercel)

When ready to move to Vercel:
1. Update `vite.config.js` — remove or change `base: '/Baxter/'`
2. Connect repo to Vercel
3. Add custom domain in Vercel dashboard

## v2 Roadmap

- [ ] Animated avatar (WebGL/CSS animations)
- [ ] Text-to-speech for project updates
- [ ] Visual project timelines / dependency graphs
- [ ] Dark/light theme switching
- [ ] Mobile-responsive layout
