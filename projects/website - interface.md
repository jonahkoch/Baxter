
##### Proscenium inspired
[https://github.com/SeungheonOh/proscenium](https://github.com/SeungheonOh/proscenium)
**Proscenium** is an experimental Wayland compositor whose entire desktop scene is driven by a React/TSX program.
Instead of traditional config files or hardcoded window management, you write a “world” in TSX that declaratively describes windows, layouts, backgrounds, shaders, cameras, animations, input bindings, web embeds, and more. The C core (built on wlroots 0.20) handles the actual Wayland protocol, rendering, input routing, and smooth animation, while a Node-based “director” runs the React code and hot-reloads it. Changes stay fluid even while the AI or developer is editing.

The viral demos (including the one in the original post) show people prompting Claude Code (or similar) in natural language—“tilt the windows like pinned sheets,” “make rooms on an infinite canvas,” “crush windows into pixels on close,” etc.—and the AI generates or rewrites the TSX on the fly. This is why people are calling it a big productivity leap: AI can reshape your whole desktop environment almost as easily as editing a React component.

The Architecture

1. **`latest-world.json`**: This is the configuration file your [Clawdbot](https://www.clawdbotlabs.com/) on the VPS updates. It controls the placement and state of all components.
2. **The React Frontend**: Reads the JSON file, uses **Tailwind CSS** for easy layout styling, and leverages **Framer Motion** to deliver smooth, fluid physics animations when components are updated or dragged.


Step 1: The Clawdbot State Format (`latest-world.json`)

Have your Clawdbot rewrite this file inside the repo every time it wants to communicate or adjust the interface layout:
```
{
  "timestamp": 1715674820,
  "background": {
    "color": "#1a1b26",
    "gridPattern": "dots"
  },
  "windows": [
    {
      "id": "chat-log",
      "title": "💬 Clawdbot Chat",
      "x": 60,
      "y": 80,
      "width": 400,
      "height": 450,
      "content": "Hello! I am managing my own layout. Ask me to rearrange my screen layout anytime!"
    },
    {
      "id": "avatar-canvas",
      "title": "🎨 Visual Canvas",
      "x": 500,
      "y": 80,
      "width": 550,
      "height": 550,
      "imageUrl": "images/avatar_face.png"
    }
  ]
}

```
Step 2: The Proscenium-Style React Web Page
Save the following component into your React codebase (e.g., `ClawdbotWorld.jsx`). If you are using a standard React build tool or a simple script deployment via GitHub Pages, make sure you have `framer-motion` and `lucide-react` installed.

```
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Move, Maximize2, ShieldAlert } from "lucide-react";

export default function ClawdbotWorld() {
  const [worldState, setWorldState] = useState(null);
  const [error, setError] = useState(false);
  const canvasRef = useRef(null);

  // Sync with GitHub-hosted state file every 4 seconds
  useEffect(() => {
    async function syncWorldState() {
      try {
        // Cache-busting parameter (?t=...) forces browser to ignore old cached files
        const response = await fetch(`./latest-world.json?t=${Date.now()}`);
        if (!response.ok) throw new Error("File not found");
        
        const data = await response.json();
        
        // Update state if it's the initial load or a completely fresh timestamp
        setWorldState((prev) => {
          if (!prev || data.timestamp > prev.timestamp) {
            return data;
          }
          return prev;
        });
        setError(false);
      } catch (err) {
        console.error("Error reading Clawdbot state:", err);
        setError(true);
      }
    }

    syncWorldState();
    const interval = setInterval(syncWorldState, 4000);
    return () => clearInterval(interval);
  }, []);

  // Handle rendering an image onto the canvas if provided in the layout window
  useEffect(() => {
    const windowWithImage = worldState?.windows?.find(w => w.imageUrl);
    if (windowWithImage && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      const img = new Image();
      img.onload = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      };
      img.src = `${windowWithImage.imageUrl}?t=${Date.now()}`;
    }
  }, [worldState]);

  // Loading Screen placeholder matching Proscenium themes
  if (!worldState) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-[#1f2328] text-[#cdd6f4]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="font-mono text-sm">Awaiting Proscenium Core Handshake...</p>
          {error && <p className="text-red-400 text-xs mt-2 flex items-center justify-center gap-1"><ShieldAlert size={14}/> Check latest-world.json configuration.</p>}
        </div>
      </div>
    );
  }

  return (
    <div 
      className="relative w-screen h-screen overflow-hidden font-sans select-none"
      style={{ backgroundColor: worldState.background?.color || "#1f2328" }}
    >
      {/* Background Visual Layer */}
      {worldState.background?.gridPattern === "dots" && (
        <div 
          className="absolute inset-0 opacity-15 pointer-events-none" 
          style={{ 
            backgroundImage: "radial-gradient(#cdd6f4 1px, transparent 1px)", 
            backgroundSize: "24px 24px" 
          }} 
        />
      )}

      {/* Render layout windows declared by Clawdbot */}
      <AnimatePresence>
        {worldState.windows.map((win) => (
          <motion.div
            key={win.id}
            drag
            dragMomentum={false}
            initial={{ x: win.x, y: win.y, opacity: 0, scale: 0.95 }}
            animate={{ x: win.x, y: win.y, opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 200, damping: 25 }}
            style={{ width: win.width, height: win.height }}
            className="absolute flex flex-col bg-[#11111b]/95 border border-[#313244] rounded-lg shadow-2xl overflow-hidden backdrop-blur-sm"
          >
            {/* Window Drag Title Bar */}
            <div className="flex items-center justify-between px-3 py-2 bg-[#181825] border-b border-[#313244] cursor-move text-[#a6adc8]">
              <span className="text-xs font-mono font-semibold flex items-center gap-1.5">
                <Move size={12} className="text-blue-400" /> {win.title}
              </span>
              <div className="flex gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#f38ba8] opacity-60" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#a6e3a1] opacity-60" />
              </div>
            </div>

            {/* Window Body Workspace */}
            <div className="flex-grow p-4 overflow-y-auto text-[#cdd6f4]">
              {win.id === "chat-log" ? (
                <div className="flex flex-col h-full justify-between">
                  <div className="font-mono text-sm space-y-2">
                    <div className="p-2.5 bg-[#313244]/50 rounded text-sm border-l-2 border-blue-400">
                      {win.content}
                    </div>
                  </div>
                  {/* Basic Text Input area inside window frame */}
                  <div className="mt-4 flex gap-2">
                    <input 
                      type="text" 
                      placeholder="Interact with director..." 
                      className="w-full bg-[#313244] text-xs font-mono p-2 rounded outline-none border border-transparent focus:border-blue-500 text-white"
                      disabled
                    />
                    <button className="bg-blue-500 text-white text-xs px-3 rounded font-mono font-bold opacity-50 cursor-not-allowed">CMD</button>
                  </div>
                </div>
              ) : win.imageUrl ? (
                <div className="w-full h-full flex flex-col items-center justify-center">
                  <canvas 
                    ref={canvasRef} 
                    width={512} 
                    height={512} 
                    className="w-full h-[90%] bg-black/40 border border-[#45475a] rounded"
                  />
                </div>
              ) : (
                <p className="font-mono text-xs">{win.content || "Empty Component Frame."}</p>
              )}
            </div>
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Floating System HUD Info Bar */}
      <div className="absolute bottom-4 left-4 bg-[#11111b]/80 border border-[#313244] px-3 py-1.5 rounded font-mono text-[10px] text-[#a6adc8] flex items-center gap-3">
        <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"/> Pipeline Active</span>
        <span>|</span>
        <span>Sequence: {worldState.timestamp}</span>
      </div>
    </div>
  );
}

```

🚀 How This Works When Your Clawdbot Runs

When you ask your Clawdbot a question via your usual channel (e.g., Terminal, SSH, Discord hook), your Python/Node backend logic processes the response, generates any graphic assets, and rewrites the schema coordinates:

- **Moving Window Commands**: If you tell Clawdbot: _"Move the canvas window over to the left side"_, it can change the `"x"` position of the `avatar-canvas` window from `500` to `40` inside `latest-world.json` and push to Git.
- **Instant Animation**: The web application fetches the file shift, and **Framer Motion** kicks in, smoothly gliding the canvas frame to its new coordinate spot automatically.

If you'd like, let me know:

- What **programming language** (Python, Node.js, Shell scripts) does your Clawdbot VPS backend use to communicate? I can provide a function that formats the file and handles the automated Git pushing mechanics!