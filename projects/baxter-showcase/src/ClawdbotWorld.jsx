import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Move, ShieldAlert, Activity, Pause, CheckCircle, Lightbulb, ExternalLink, Bot } from "lucide-react";

// Map status strings to icons/colors
const STATUS_MAP = {
  active: { icon: Activity, color: "text-green-400", bg: "bg-green-400/10", border: "border-green-400/30", label: "Active" },
  paused: { icon: Pause, color: "text-yellow-400", bg: "bg-yellow-400/10", border: "border-yellow-400/30", label: "Paused" },
  complete: { icon: CheckCircle, color: "text-blue-400", bg: "bg-blue-400/10", border: "border-blue-400/30", label: "Complete" },
  idea: { icon: Lightbulb, color: "text-purple-400", bg: "bg-purple-400/10", border: "border-purple-400/30", label: "Exploring" },
};

function ProjectCard({ win }) {
  const status = STATUS_MAP[win.status] || STATUS_MAP.idea;
  const StatusIcon = status.icon;
  const tags = win.tags || [];
  const progress = win.progress ?? null;

  return (
    <div className="flex flex-col h-full">
      {/* Status badge */}
      <div className="flex items-center justify-between mb-3">
        <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-mono font-semibold ${status.bg} ${status.color} ${status.border} border`}>
          <StatusIcon size={10} />
          {status.label}
        </span>
        {progress !== null && (
          <span className="text-[10px] font-mono text-[#6c7086]">{progress}%</span>
        )}
      </div>

      {/* Progress bar */}
      {progress !== null && (
        <div className="w-full h-1 bg-[#313244] rounded-full mb-3 overflow-hidden">
          <div
            className="h-full bg-blue-400 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}

      {/* Content */}
      <p className="text-sm text-[#cdd6f4] leading-relaxed flex-grow">{win.content}</p>

      {/* Tags */}
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mt-3">
          {tags.map((tag) => (
            <span key={tag} className="px-1.5 py-0.5 bg-[#313244]/60 rounded text-[9px] font-mono text-[#a6adc8]">
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Links */}
      {win.links && win.links.length > 0 && (
        <div className="flex flex-col gap-1 mt-3 pt-3 border-t border-[#313244]/50">
          {win.links.map((link) => (
            <a
              key={link.url}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-[10px] font-mono text-blue-400 hover:text-blue-300 transition-colors"
            >
              <ExternalLink size={9} />
              {link.label}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}

function AvatarWindow({ win, canvasRef }) {
  useEffect(() => {
    if (win.imageUrl && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.onload = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      };
      img.src = `${win.imageUrl}?t=${Date.now()}`;
    }
  }, [win.imageUrl, canvasRef]);

  return (
    <div className="flex flex-col items-center justify-center h-full gap-3">
      {win.imageUrl ? (
        <canvas
          ref={canvasRef}
          width={256}
          height={256}
          className="w-32 h-32 bg-black/40 border border-[#45475a] rounded-full"
        />
      ) : (
        <div className="w-32 h-32 bg-[#313244]/50 border border-[#45475a] rounded-full flex items-center justify-center">
          <Bot size={48} className="text-[#6c7086]" />
        </div>
      )}
      <p className="text-xs font-mono text-[#a6adc8] text-center">{win.content || "Avatar placeholder — v2 coming soon"}</p>
    </div>
  );
}

export default function ClawdbotWorld() {
  const [worldState, setWorldState] = useState(null);
  const [error, setError] = useState(false);
  const [lastUpdate, setLastUpdate] = useState(null);
  const canvasRefs = useRef({});

  // Sync with state file every 4 seconds
  useEffect(() => {
    async function syncWorldState() {
      try {
        const response = await fetch(`./latest-world.json?t=${Date.now()}`);
        if (!response.ok) throw new Error("File not found");
        const data = await response.json();

        setWorldState((prev) => {
          if (!prev || data.timestamp > prev.timestamp) {
            setLastUpdate(new Date().toLocaleTimeString());
            return data;
          }
          return prev;
        });
        setError(false);
      } catch (err) {
        console.error("Error reading state:", err);
        setError(true);
      }
    }

    syncWorldState();
    const interval = setInterval(syncWorldState, 4000);
    return () => clearInterval(interval);
  }, []);

  // Loading screen
  if (!worldState) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-[#1f2328] text-[#cdd6f4]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="font-mono text-sm">Initializing Workspace...</p>
          {error && (
            <p className="text-red-400 text-xs mt-2 flex items-center justify-center gap-1">
              <ShieldAlert size={14}/> Check latest-world.json configuration.
            </p>
          )}
        </div>
      </div>
    );
  }

  // Sort windows: avatar first, then by y position
  const sortedWindows = [...(worldState.windows || [])].sort((a, b) => {
    if (a.id === "avatar") return -1;
    if (b.id === "avatar") return 1;
    return a.y - b.y;
  });

  return (
    <div
      className="relative w-screen h-screen overflow-hidden font-sans select-none"
      style={{ backgroundColor: worldState.background?.color || "#1f2328" }}
    >
      {/* Background grid */}
      {worldState.background?.gridPattern === "dots" && (
        <div
          className="absolute inset-0 opacity-15 pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(#cdd6f4 1px, transparent 1px)",
            backgroundSize: "24px 24px"
          }}
        />
      )}

      {/* Render windows */}
      <AnimatePresence>
        {sortedWindows.map((win) => (
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
            {/* Window title bar */}
            <div className="flex items-center justify-between px-3 py-2 bg-[#181825] border-b border-[#313244] cursor-move text-[#a6adc8]">
              <span className="text-xs font-mono font-semibold flex items-center gap-1.5">
                <Move size={12} className="text-blue-400" /> {win.title}
              </span>
              <div className="flex gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#f38ba8] opacity-60" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#a6e3a1] opacity-60" />
              </div>
            </div>

            {/* Window body */}
            <div className="flex-grow p-4 overflow-y-auto text-[#cdd6f4]">
              {win.id === "avatar" ? (
                <AvatarWindow
                  win={win}
                  canvasRef={(el) => { if (el) canvasRefs.current[win.id] = el; }}
                />
              ) : win.type === "project" || win.status ? (
                <ProjectCard win={win} />
              ) : (
                <div className="font-mono text-sm whitespace-pre-wrap">{win.content || "Empty Component Frame."}</div>
              )}
            </div>
          </motion.div>
        ))}
      </AnimatePresence>

      {/* System HUD */}
      <div className="absolute bottom-4 left-4 bg-[#11111b]/80 border border-[#313244] px-3 py-1.5 rounded font-mono text-[10px] text-[#a6adc8] flex items-center gap-3">
        <span className="flex items-center gap-1">
          <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"/>
          Pipeline Active
        </span>
        <span>|</span>
        <span>Seq: {worldState.timestamp}</span>
        {lastUpdate && (
          <>
            <span>|</span>
            <span>Updated: {lastUpdate}</span>
          </>
        )}
      </div>

      {/* Project count */}
      <div className="absolute bottom-4 right-4 bg-[#11111b]/80 border border-[#313244] px-3 py-1.5 rounded font-mono text-[10px] text-[#a6adc8]">
        {sortedWindows.filter(w => w.type === "project" || w.status).length} Projects
      </div>
    </div>
  );
}
