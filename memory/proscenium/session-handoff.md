# Session Handoff — Proscenium

## What It Is

**Proscenium** is a Wayland compositor whose scene graph is a React/TSX program. You write a "world" component that declares windows, shaders, text, images, web pages, and input bindings — the compositor (written in C on wlroots 0.20) animates, renders, and routes input to them.

**Repo:** https://github.com/SeungheonOh/proscenium

---

## Architecture at a Glance

```
┌─────────────────────────────────────┐
│  Director (Node + your TSX world)   │  ← React, hot-reload, DevTools
│  ──► builds scene graph via JSON ──┼────►┐
└─────────────────────────────────────┘     │
                                            │  UNIX socket
┌─────────────────────────────────────┐     │
│  Compositor (C + wlroots 0.20)      │◄────┘
│  ──► renders with GLES2, GPU dmabuf │
│  ──► routes libinput → world        │
│  ──► runs Xwayland, PipeWire       │
└─────────────────────────────────────┘
```

**Key rule:** The compositor owns all Wayland objects and the render loop. The director only describes *what* should exist. The compositor decides *how* to draw it and keeps motion smooth regardless of what the director is doing.

---

## Core Concepts

| Term | Meaning |
|------|---------|
| **World** | Your root TSX component. Reloaded on file changes (unless `--once`). |
| **Stage** | The compositor's scene tree. Mirrors the world but lives in C. |
| **Node** | Anything on stage: window, text, image, shader, web page, camera. |
| **Director** | The Node process (`sdk/bin/proscenium.mjs`) that runs your world. |
| **Shader** | GLSL effect applied to any node or the whole screen. The *only* decoration system. |

---

## Quick Start

```bash
# 1. Fetch deps (headers only, no system install)
scripts/fetch-deps

# 2. Build compositor
meson setup build/meson
ninja -C build/meson

# 3. Build SDK
(cd sdk && npm ci && npm run build)

# 4. Install example pages (for canvas/Excalidraw example)
(cd examples && npm ci)

# 5. Run
build/meson/proscenium --script examples/hypr.tsx     # nested session
build/meson/proscenium --headless --script examples/deck.tsx  # headless
scripts/run-session examples/meta.tsx                  # as real desktop
```

---

## Minimal World Example

```tsx
import { Background, Window, useWindows } from "proscenium";

export default function World() {
  const windows = useWindows();
  return (
    <>
      <Background fill="#1f2328" grid={{ kind: "dots" }} pan />
      {windows.map((w, i) => (
        <Window key={w.id} window={w.id}
                x={80 + i*40} y={80 + i*40}
                movable resizable />
      ))}
    </>
  );
}
```

---

## Key Design Decisions

1. **Shaders = only decoration** — No CSS-like styling. Shadows, borders, rounded corners, blur, screen-wide effects are all GLSL shaders declared in your world.
2. **Director is replaceable** — Crash it, upgrade it, restart it. Windows stay visible in a fallback layout.
3. **Headless by design** — `--headless` creates virtual pointers/keyboards. `proscenium-drive` replays scripted input. `PROSCENIUM_CHECK=1` does pixel-perfect frame verification.
4. **Web via CEF** — Chromium Embedded Framework helper for `<Web>` nodes. Sandboxed renderers. Requires `scripts/install-web-sandbox` on Ubuntu.

---

## Build Flags & Options

| Flag | Effect |
|------|--------|
| `--dev` | React dev build + DevTools |
| `--once` | No hot reload |
| `--headless` | Virtual seat, no real display |
| `--size WxH` | Headless output size |
| `--run-for N` | Auto-exit after N seconds |
| `--no-xwayland` | Disable Xwayland support |
| `--no-screen-sharing` | Disable PipeWire/screen share |
| `--damage-debug` | Visualize damage regions |

---

## File Map

```
docs/
  GUIDE.md      ← start here for SDK/world authoring
  PROTOCOL.md   ← director↔compositor JSON protocol
  SHADERS.md    ← GLSL shader API
  MOTION.md     ← animation curves (proposed)
  DESIGN.md     ← C code style, threads, perf rules

sdk/
  src/          ← TypeScript SDK source
  bin/          ← proscenium.mjs (director runner)

src/            ← C compositor source
  main.c        ← entry point
  stage.c       ← scene tree
  render.c      ← GLES2 renderer
  shader.c      ← GLSL shader system
  web.c/webnode.c ← CEF web helper integration
  input.c       ← libinput → world events

examples/       ← 8 example worlds
web/            ← C++ CEF helper source
scripts/        ← fetch-deps, fetch-cef, run-session
```

---

## Dashboard Status

- **Baxter Showcase card:** Added 2026-10-29
- **Status:** exploring
- **Progress:** 15%

---

*Created: 2026-10-29. For authoritative details, read the full docs in `docs/`.*
