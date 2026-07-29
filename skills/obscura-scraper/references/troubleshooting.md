# Obscura Troubleshooting

Common issues and solutions when using Obscura.

## Installation Issues

### "obscura: command not found"

**Cause:** Binary not in PATH

**Solutions:**
```bash
# Option 1: Move to /usr/local/bin
sudo mv obscura /usr/local/bin/

# Option 2: Add to PATH
export PATH="$PATH:/path/to/obscura"

# Option 3: Use full path
./obscura fetch https://example.com
```

### Build fails with V8 compilation error

**Cause:** Missing build dependencies

**Solutions:**
```bash
# Ubuntu/Debian
sudo apt-get install build-essential python3 libssl-dev pkg-config

# macOS
xcode-select --install

# Then rebuild
cargo clean
cargo build --release --features stealth
```

### "error while loading shared libraries"

**Cause:** Missing system libraries

**Solutions:**
```bash
# Ubuntu/Debian
sudo apt-get install libssl3

# Or install from release binary instead of building
```

## Runtime Issues

### Timeout errors

**Cause:** Page takes too long to load

**Solutions:**
```bash
# Increase wait time
obscura fetch https://slow-site.com --wait-until networkidle0

# Or use specific selector
obscura fetch https://slow-site.com --selector "#content"
```

### JavaScript execution fails

**Cause:** Syntax error or page not fully loaded

**Solutions:**
```bash
# Wait for page load first
obscura fetch https://example.com --wait-until networkidle0 --eval "document.title"

# Check if element exists in eval
obscura fetch https://example.com --eval "
  const el = document.querySelector('#maybe-missing');
  el ? el.textContent : null
"
```

### CDP connection refused

**Cause:** Server not running or wrong port

**Solutions:**
```bash
# Check if server is running
curl http://127.0.0.1:9222/json/version

# Start server explicitly
obscura serve --port 9222 &

# Check port availability
lsof -i :9222
```

## Scraping Issues

### Getting blocked/403 errors

**Cause:** Site detects automation or rate limits

**Solutions:**
```bash
# Enable stealth mode
obscura fetch https://example.com --stealth

# Use proxy
obscura serve --port 9222 --proxy http://proxy.example.com:8080

# Add delays in Python wrapper
import time
time.sleep(random.uniform(1, 3))
```

### Dynamic content not loading

**Cause:** JavaScript-heavy sites need wait conditions

**Solutions:**
```bash
# Wait for network idle
obscura fetch https://spa-app.com --wait-until networkidle0

# Wait for specific element
obscura fetch https://spa-app.com --selector ".loaded-content"

# Multiple attempts
for i in {1..3}; do
  result=$(obscura fetch https://spa-app.com --eval "document.querySelector('.dynamic')?.textContent")
  [ -n "$result" ] && break
  sleep 1
done
```

### Memory issues with batch scraping

**Cause:** Too many concurrent connections

**Solutions:**
```bash
# Reduce concurrency
obscura scrape urls.txt --concurrency 5

# Or use Python wrapper with resource limits
python batch_scrape.py urls.txt --concurrency 5
```

## CDP/Puppeteer Issues

### Puppeteer can't connect

**Cause:** Wrong endpoint URL or server not ready

**Solutions:**
```javascript
// Correct endpoint format
const browser = await puppeteer.connect({
  browserWSEndpoint: 'ws://127.0.0.1:9222/devtools/browser',
});

// Wait for server to be ready
await new Promise(r => setTimeout(r, 1000));
```

### Playwright CDP errors

**Cause:** Playwright version compatibility

**Solutions:**
```javascript
// Use connectOverCDP
const browser = await chromium.connectOverCDP({
  endpointURL: 'ws://127.0.0.1:9222',
});

// Not connect (that uses Playwright's own browser)
```

## Debug Mode

Enable verbose logging:

```bash
# Environment variable
RUST_LOG=debug obscura fetch https://example.com

# Or check server logs
obscura serve --port 9222 2>&1 | tee obscura.log
```

## Getting Help

1. Check GitHub issues: https://github.com/h4ckf0r0day/obscura/issues
2. Enable debug logging and share relevant output
3. Include: Obscura version, OS, command that fails
4. Test with minimal example to isolate issue

## Performance Tips

### Speed up batch operations

```bash
# Use higher concurrency for fast sites
obscura scrape fast-sites.txt --concurrency 50

# Use lower concurrency for slow/heavy sites
obscura scrape slow-sites.txt --concurrency 5
```

### Reduce memory usage

```bash
# Process in chunks
split -l 1000 large-list.txt chunk-
for f in chunk-*; do
  obscura scrape "$f" --concurrency 10
done
```

### Handle errors gracefully

```python
# In Python wrapper
results = []
for url in urls:
    try:
        result = scrape_url(url)
        results.append(result)
    except Exception as e:
        results.append({"url": url, "error": str(e)})
        continue  # Don't let one failure stop the batch
```
