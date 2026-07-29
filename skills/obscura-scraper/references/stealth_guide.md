# Obscura Stealth Guide

Obscura includes built-in anti-detection capabilities to prevent websites from identifying automated browser usage.

## What Stealth Mode Does

When enabled (`--stealth` flag or `--features stealth` build), Obscura implements multiple layers of anti-detection:

### 1. Fingerprint Randomization

Each session gets randomized hardware/fingerprint values:

| Property | Randomization |
|----------|---------------|
| `GPU` | Random vendor/renderer strings |
| `Screen` | Random resolution, color depth, pixel ratio |
| `Canvas` | Per-session canvas noise |
| `Audio` | Random audio context fingerprint |
| `Battery` | Random battery level/charging status |

### 2. Navigator Properties

Realistic `navigator` object that matches genuine Chrome:

```javascript
// navigator.webdriver is undefined (not false)
navigator.webdriver === undefined  // true

// Realistic userAgentData
navigator.userAgentData = {
  brands: [{ brand: "Chromium", version: "145" }],
  platform: "macOS",
  mobile: false
};
```

### 3. Event Trust

Dispatched events appear user-generated:

```javascript
// Synthetic events have isTrusted = true
const event = new MouseEvent('click');
event.isTrusted === true;  // true in Obscura stealth
```

### 4. Native Function Masking

Internal functions appear native:

```javascript
Function.prototype.toString.call(document.querySelector);
// => "function querySelector() { [native code] }"
```

### 5. Hidden Internal Properties

Automation properties are not enumerable:

```javascript
Object.keys(window);
// Does NOT include '__obscura', 'cdc_adoQpoasnfa76pfcZLmcfl_' etc.
```

### 6. Tracker Blocking

3,520+ domains blocked by default in stealth mode:

- Analytics (Google Analytics, Mixpanel, etc.)
- Ads (Google Ads, Facebook Pixel, etc.)
- Telemetry (segment.io, amplitude, etc.)
- Fingerprinting (fingerprintjs, etc.)

## Enabling Stealth Mode

### CLI Usage

```bash
# Single fetch with stealth
obscura fetch https://example.com --stealth

# Server with stealth
obscura serve --port 9222 --stealth

# Batch scrape with stealth
obscura scrape urls.txt --stealth
```

### Build with Stealth

```bash
cargo build --release --features stealth
```

This creates a binary with stealth always enabled (no flag needed).

## Detecting Detection

Test if a site detects automation:

```javascript
// Check for webdriver flag
console.log(navigator.webdriver);  // Should be undefined

// Check for automation properties
console.log(window.callPhantom);   // Should be undefined
console.log(window._phantom);      // Should be undefined
console.log(window.__nightmare);   // Should be undefined
```

## Advanced: Custom Fingerprints

For consistent fingerprints across sessions (e.g., maintaining login state):

```python
from obscura_automation import ObscuraAutomation

# Use same user data directory
browser = ObscuraAutomation(
    stealth=True,
    user_data_dir="/path/to/profile"
)
```

## Limitations

Stealth mode significantly reduces detection but is not foolproof:

1. **Behavioral patterns** - Rapid, predictable actions can still flag automation
2. **CAPTCHA** - Some CAPTCHA providers may still detect automation
3. **IP reputation** - Shared/datacenter IPs may be flagged regardless of browser

Best practices:
- Add random delays between actions
- Vary request patterns
- Use residential proxies for high-value targets
- Respect rate limits
