---
name: obscura-scraper
description: Web scraping and automation using the Obscura headless browser. Use when Codex needs to scrape web pages, extract data from websites, automate browser interactions, batch scrape multiple URLs, or perform headless browser automation with stealth/anti-detection features. Ideal for tasks requiring JavaScript rendering, form submission, CDP (Chrome DevTools Protocol) automation, or high-volume scraping where lightweight footprint matters.
---

# Obscura Scraper

Lightweight, Rust-based headless browser for AI agents and web scraping. A drop-in replacement for headless Chrome with 30MB memory footprint vs 200MB+ for Chrome.

## Quick Start

### Single Page Fetch

```bash
# Get page title
obscura fetch https://example.com --eval "document.title"

# Extract all links
obscura fetch https://example.com --dump links

# Render JS and get HTML
obscura fetch https://news.ycombinator.com --dump html

# Wait for dynamic content
obscura fetch https://example.com --wait-until networkidle0
```

### Start CDP Server (for Puppeteer/Playwright)

```bash
# Basic server
obscura serve --port 9222

# With stealth mode (anti-detection + tracker blocking)
obscura serve --port 9222 --stealth

# With proxy
obscura serve --port 9222 --proxy http://proxy.example.com:8080
```

### Batch Scraping

```bash
obscura scrape url1 url2 url3 \
  --concurrency 25 \
  --eval "document.querySelector('h1').textContent" \
  --format json
```

## Common Tasks

### Extract Structured Data

Use `--eval` to run JavaScript and extract specific data:

```bash
obscura fetch https://news.ycombinator.com --eval "
  Array.from(document.querySelectorAll('.titleline > a'))
    .map(a => ({ title: a.textContent, url: a.href }))
"
```

### Handle Dynamic Content

```bash
# Wait for network idle (no pending requests for 500ms)
obscura fetch https://spa-app.com --wait-until networkidle0 --dump html

# Wait for specific element
obscura fetch https://example.com --selector "#content-loaded" --dump html
```

### Form Submission & Login

Start CDP server and use Puppeteer/Playwright for complex interactions:

```javascript
// Puppeteer example
const browser = await puppeteer.connect({
  browserWSEndpoint: 'ws://127.0.0.1:9222/devtools/browser',
});
const page = await browser.newPage();
await page.goto('https://quotes.toscrape.com/login');
await page.evaluate(() => {
  document.querySelector('#username').value = 'admin';
  document.querySelector('#password').value = 'admin';
  document.querySelector('form').submit();
});
```

### Stealth Mode (Anti-Detection)

Enable with `--stealth` flag or `--features stealth` when building:

- Per-session fingerprint randomization (GPU, screen, canvas, audio, battery)
- Realistic navigator.userAgentData
- Hidden `navigator.webdriver` property
- Native function masking
- 3,520+ tracker domains blocked

## CLI Reference

### `obscura serve`

Start CDP WebSocket server.

| Flag | Default | Description |
|------|---------|-------------|
| `--port` | 9222 | WebSocket port |
| `--proxy` | — | HTTP/SOCKS5 proxy URL |
| `--stealth` | off | Enable anti-detection + tracker blocking |
| `--workers` | 1 | Number of parallel worker processes |
| `--obey-robots` | off | Respect robots.txt |

### `obscura fetch`

Fetch and render a single page.

| Flag | Default | Description |
|------|---------|-------------|
| `--dump` | html | Output: html, text, or links |
| `--eval` | — | JavaScript expression to evaluate |
| `--wait-until` | load | Wait: load, domcontentloaded, networkidle0 |
| `--selector` | — | Wait for CSS selector |
| `--stealth` | off | Anti-detection mode |
| `--quiet` | off | Suppress banner |

### `obscura scrape`

Scrape multiple URLs in parallel.

| Flag | Default | Description |
|------|---------|-------------|
| `--concurrency` | 10 | Parallel workers |
| `--eval` | — | JS expression per page |
| `--format` | json | Output: json or text |

## Resources

### scripts/

- `fetch_and_extract.py` - Python wrapper for single-page extraction with error handling
- `batch_scrape.py` - Batch scraping with CSV input/output
- `puppeteer_template.js` - Starter template for Puppeteer CDP automation

### references/

- `obscura_cdp.md` - CDP API methods and compatibility details
- `stealth_guide.md` - Anti-detection techniques and fingerprinting details
- `troubleshooting.md` - Common issues and solutions

## Installation

### Download Binary

```bash
# Linux x86_64
curl -LO https://github.com/h4ckf0r0day/obscura/releases/latest/download/obscura-x86_64-linux.tar.gz
tar xzf obscura-x86_64-linux.tar.gz
sudo mv obscura /usr/local/bin/

# macOS Apple Silicon
curl -LO https://github.com/h4ckf0r0day/obscura/releases/latest/download/obscura-aarch64-macos.tar.gz
tar xzf obscura-aarch64-macos.tar.gz
sudo mv obscura /usr/local/bin/
```

### Build from Source

```bash
git clone https://github.com/h4ckf0r0day/obscura.git
cd obscura
cargo build --release

# With stealth mode
cargo build --release --features stealth
```

## Obscura vs Alternatives

| | Obscura | Headless Chrome | Playwright | Brave API |
|---|---|---|---|---|
| Memory | 30 MB | 200+ MB | 200+ MB | N/A (API) |
| Startup | Instant | ~2s | ~2s | ~0s |
| Anti-detect | Built-in | None | Partial | N/A |
| JS Engine | V8 | V8 | V8 | None |
| CDP Support | Full | Full | Full | N/A |
| Best for | High-volume scraping | Full Chrome compat | E2E testing | Search queries |

## Python Integration

See `scripts/fetch_and_extract.py` for a Python wrapper that handles:
- Starting/stopping Obscura server
- JSON extraction with error handling
- Automatic retries
- Resource cleanup

```python
from obscura_scraper import fetch_page

result = fetch_page("https://example.com", 
                    extract="document.title",
                    stealth=True)
print(result['data'])
```
