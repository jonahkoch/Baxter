# Obscura CDP API Reference

Obscura implements the Chrome DevTools Protocol (CDP) for Puppeteer/Playwright compatibility. This document details the supported domains and methods.

## Supported Domains

### Target

Browser context and tab management.

| Method | Description |
|--------|-------------|
| `Target.createTarget` | Create a new tab/page |
| `Target.closeTarget` | Close a tab |
| `Target.attachToTarget` | Attach to an existing tab |
| `Target.createBrowserContext` | Create isolated browser context |
| `Target.disposeBrowserContext` | Close browser context |

### Page

Page navigation and lifecycle.

| Method | Description |
|--------|-------------|
| `Page.navigate` | Navigate to URL |
| `Page.getFrameTree` | Get frame hierarchy |
| `Page.addScriptToEvaluateOnNewDocument` | Inject script on load |
| `Page.lifecycleEvents` | Listen for load events |

### Runtime

JavaScript execution.

| Method | Description |
|--------|-------------|
| `Runtime.evaluate` | Execute JS in page context |
| `Runtime.callFunctionOn` | Call function on remote object |
| `Runtime.getProperties` | Get object properties |
| `Runtime.addBinding` | Expose function to page |

### DOM

DOM querying and manipulation.

| Method | Description |
|--------|-------------|
| `DOM.getDocument` | Get document root |
| `DOM.querySelector` | Query single element |
| `DOM.querySelectorAll` | Query multiple elements |
| `DOM.getOuterHTML` | Get element HTML |
| `DOM.resolveNode` | Resolve node to object |

### Network

Request/response interception.

| Method | Description |
|--------|-------------|
| `Network.enable` | Enable network events |
| `Network.setCookies` | Set cookies |
| `Network.getCookies` | Get cookies |
| `Network.setExtraHTTPHeaders` | Add custom headers |
| `Network.setUserAgentOverride` | Override User-Agent |

### Fetch

Request interception and modification.

| Method | Description |
|--------|-------------|
| `Fetch.enable` | Enable request interception |
| `Fetch.continueRequest` | Continue intercepted request |
| `Fetch.fulfillRequest` | Fulfill with custom response |
| `Fetch.failRequest` | Fail a request |

### Storage

Cookie and storage management.

| Method | Description |
|--------|-------------|
| `Storage.getCookies` | Get all cookies |
| `Storage.setCookies` | Set cookies |
| `Storage.deleteCookies` | Delete cookies |

### Input

Mouse and keyboard events.

| Method | Description |
|--------|-------------|
| `Input.dispatchMouseEvent` | Mouse click/move |
| `Input.dispatchKeyEvent` | Keyboard input |

### LP (Lightweight Protocol)

Obscura-specific extensions.

| Method | Description |
|--------|-------------|
| `LP.getMarkdown` | Convert page to Markdown |

## WebSocket Endpoint

Connect to CDP via WebSocket:

```
ws://127.0.0.1:9222/devtools/browser
```

Or get page-specific endpoint:

```bash
curl http://127.0.0.1:9222/json/list
```

## Example: Raw CDP Usage

```python
import websocket
import json

ws = websocket.create_connection("ws://127.0.0.1:9222/devtools/browser")

# Create new target (tab)
ws.send(json.dumps({
    "id": 1,
    "method": "Target.createTarget",
    "params": {"url": "about:blank"}
}))
response = json.loads(ws.recv())
target_id = response["result"]["targetId"]

# Attach to target
ws.send(json.dumps({
    "id": 2,
    "method": "Target.attachToTarget",
    "params": {"targetId": target_id, "flatten": True}
}))

# Navigate
session_id = json.loads(ws.recv())["result"]["sessionId"]
ws.send(json.dumps({
    "id": 3,
    "method": "Page.navigate",
    "params": {"url": "https://example.com"},
    "sessionId": session_id
}))
```

## Differences from Chrome

Obscura's CDP implementation is optimized for automation:

1. **Faster startup** - No browser UI initialization
2. **Lower memory** - Minimal V8 context per page
3. **Stealth by default** - Anti-detection built-in when enabled
4. **Limited DevTools UI** - No visual inspector, protocol only

## Puppeteer Compatibility

Most Puppeteer features work out of the box:

```javascript
const browser = await puppeteer.connect({
  browserWSEndpoint: 'ws://127.0.0.1:9222/devtools/browser',
});

const page = await browser.newPage();
await page.goto('https://example.com');
```

## Playwright Compatibility

Playwright's CDP mode is supported:

```javascript
const browser = await chromium.connectOverCDP({
  endpointURL: 'ws://127.0.0.1:9222',
});
```
