# Cardano Governance Context Feed

A lightweight, auto-updating governance dashboard for Cardano DReps. Pulls on-chain data daily and provides a space for curated social context.

## What's Here

| Component | Purpose |
|-----------|---------|
| `_data/proposals.json` | Auto-fetched from Koios API |
| `_data/epoch-state.json` | Tracks proposal status across epochs |
| `_proposals/` | One page per proposal (active + historical) |
| `_epoch_summaries/` | Auto-generated summaries after each epoch |
| `_layouts/` | Page templates |
| `assets/` | CSS, minimal styling |
| `.github/workflows/` | Auto-update via GitHub Actions |
| `scripts/fetch-proposals.py` | Fetches Koios data, generates pages |
| `scripts/epoch-check.py` | Detects epoch transitions, tracks enacted/expired proposals |

## How It Works

### 1. Auto-Updates (Every 6 Hours)
A GitHub Action runs every 6 hours, fetches active proposals from Koios, and regenerates the site. No manual intervention needed.

### 2. Epoch Transition Monitoring
After each epoch boundary, the system automatically:
- Detects which proposals were **enacted**, **expired**, or **dropped**
- Updates proposal pages with final status
- Generates an **epoch summary** in `_epoch_summaries/` showing:
  - Treasury impact of enacted withdrawals
  - List of expired proposals
  - Running NCL consumption tracker

This gives you a clean history of what happened each epoch without manual bookkeeping.

### 3. Manual Curation (As Needed)
When there's social context — X posts, withdrawals, drama, dependencies — you edit the proposal's page in `_proposals/` and add a `context:` section to the front matter. The site renders it prominently.

### 4. Access Anywhere
GitHub Pages serves the site. Bookmark it on your phone, laptop, anywhere.

## Adding Social Context

When you find a relevant X post, news item, or ecosystem signal:

1. Edit `_proposals/<proposal-id>.md`
2. Add to the `context:` front matter:

```yaml
context:
  - date: "2026-07-27"
    source: "X / @sundialprotocol"
    type: "withdrawal"
    summary: "Sundial and Charms announce withdrawal of Alchemy proposal"
    link: "https://x.com/sundialprotocol/status/..."
    impact: "Applicants abandoned proposal; on-chain vote moot"
```

3. Commit and push — the site updates in ~1 minute

## Local Development

```bash
cd projects/cardano/governance-feed
bundle install
bundle exec jekyll serve
```

## Deploy

Push to `main` branch. GitHub Pages auto-builds from `gh-pages` branch (set in repo settings).
