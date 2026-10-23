import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Move, ShieldAlert, Activity, Pause, CheckCircle, Lightbulb, ExternalLink, Bot, ChevronDown, ChevronRight } from "lucide-react";

const STATUS_MAP = {
  active: { icon: Activity, color: "text-green-400", bg: "bg-green-400/10", border: "border-green-400/30", label: "Active" },
  paused: { icon: Pause, color: "text-yellow-400", bg: "bg-yellow-400/10", border: "border-yellow-400/30", label: "Paused" },
  complete: { icon: CheckCircle, color: "text-blue-400", bg: "bg-blue-400/10", border: "border-blue-400/30", label: "Complete" },
  idea: { icon: Lightbulb, color: "text-purple-400", bg: "bg-purple-400/10", border: "border-purple-400/30", label: "Exploring" },
};

const LEVEL_COLORS = {
  1: "text-[#6c7086]",
  2: "text-[#6c7086]",
  3: "text-blue-400",
  4: "text-blue-400",
  5: "text-green-400",
};

function LevelDots({ level }) {
  return (
    <span className="inline-flex gap-0.5" title={`Level ${level}/5`}>
      {[1, 2, 3, 4, 5].map((n) => (
        <span key={n} className={`w-1.5 h-1.5 rounded-full ${n <= level ? LEVEL_COLORS[level] : "bg-[#313244]"}`} />
      ))}
    </span>
  );
}

function ProjectCard({ win }) {
  const status = STATUS_MAP[win.status] || STATUS_MAP.idea;
  const StatusIcon = status.icon;
  const tags = win.tags || [];
  const progress = win.progress ?? null;

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between mb-3">
        <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-mono font-semibold ${status.bg} ${status.color} ${status.border} border`}>
          <StatusIcon size={10} /> {status.label}
        </span>
        {progress !== null && <span className="text-[10px] font-mono text-[#6c7086]">{progress}%</span>}
      </div>

      {progress !== null && (
        <div className="w-full h-1 bg-[#313244] rounded-full mb-3 overflow-hidden">
          <div className="h-full bg-blue-400 rounded-full transition-all duration-500" style={{ width: `${progress}%` }} />
        </div>
      )}

      <p className="text-sm text-[#cdd6f4] leading-relaxed flex-grow">{win.content}</p>

      {tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mt-3">
          {tags.map((tag) => <span key={tag} className="px-1.5 py-0.5 bg-[#313244]/60 rounded text-[9px] font-mono text-[#a6adc8]">{tag}</span>)}
        </div>
      )}

      {win.links?.length > 0 && (
        <div className="flex flex-col gap-1 mt-3 pt-3 border-t border-[#313244]/50">
          {win.links.map((link) => (
            <a key={link.url} href={link.url} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-[10px] font-mono text-blue-400 hover:text-blue-300 transition-colors">
              <ExternalLink size={9} /> {link.label}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}

function SkillsWindow({ win }) {
  const [expanded, setExpanded] = useState(new Set());
  const domains = win.domains || [];

  const toggle = (idx) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      next.has(idx) ? next.delete(idx) : next.add(idx);
      return next;
    });
  };

  return (
    <div className="flex flex-col h-full -mx-4 -my-4">
      {domains.map((domain, idx) => {
        const isOpen = expanded.has(idx);
        return (
          <div key={idx} className="border-b border-[#313244]/50 last:border-b-0">
            <button onClick={() => toggle(idx)}
              className="w-full flex items-center justify-between px-4 py-2.5 hover:bg-[#181825]/50 transition-colors text-left">
              <span className="flex items-center gap-2 text-xs font-mono font-semibold text-[#cdd6f4]">
                <span className="text-sm">{domain.icon}</span> {domain.name}
                <span className="text-[9px] text-[#6c7086] font-normal">({domain.items?.length || 0})</span>
              </span>
              {isOpen ? <ChevronDown size={12} className="text-[#6c7086]" /> : <ChevronRight size={12} className="text-[#6c7086]" />}
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }} className="overflow-hidden">
                  <div className="px-4 pb-3 space-y-2">
                    {domain.items?.map((skill, sIdx) => (
                      <div key={sIdx} className="flex items-start gap-2 pl-4">
                        <div className="mt-0.5"><LevelDots level={skill.level || 1} /></div>
                        <div className="flex-1 min-w-0">
                          <p className="text-[11px] font-mono text-[#cdd6f4] leading-tight">{skill.name}</p>
                          {skill.description && <p className="text-[9px] font-mono text-[#6c7086] mt-0.5 leading-relaxed">{skill.description}</p>}
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
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
        <canvas ref={canvasRef} width={256} height={256} className="w-32 h-32 bg-black/40 border border-[#45475a] rounded-full" />
      ) : (
        <div className="w-32 h-32 bg-[#313244]/50 border border-[#45475a] rounded-full flex items-center justify-center">
          <Bot size={48} className="text-[#6c7086]" />
        </div>
      )}
      <p className="text-xs font-mono text-[#a6adc8] text-center">{win.content || "Avatar placeholder — v2 coming soon"}</p>
    </div>
  );
}

function ResizableWindow({ win, children }) {
  const [size, setSize] = useState({ width: win.width, height: win.height });
  const resizeRef = useRef({ active: false, startX: 0, startY: 0, startW: 0, startH: 0 });

  const startResize = useCallback((e) => {
    e.stopPropagation();
    e.preventDefault();
    resizeRef.current = {
      active: true,
      startX: e.clientX,
      startY: e.clientY,
      startW: size.width,
      startH: size.height,
    };
    document.addEventListener("mousemove", onResizeMove);
    document.addEventListener("mouseup", onResizeEnd);
  }, [size]);

  const onResizeMove = useCallback((e) => {
    const r = resizeRef.current;
    if (!r.active) return;
    const newW = Math.max(200, r.startW + (e.clientX - r.startX));
    const newH = Math.max(120, r.startH + (e.clientY - r.startY));
    setSize({ width: newW, height: newH });
  }, []);

  const onResizeEnd = useCallback(() => {
    resizeRef.current.active = false;
    document.removeEventListener("mousemove", onResizeMove);
    document.removeEventListener("mouseup", onResizeEnd);
  }, [onResizeMove]);

  return (
    <motion.div
      drag
      dragMomentum={false}
      initial={{ x: win.x, y: win.y, opacity: 0, scale: 0.95 }}
      animate={{ x: win.x, y: win.y, opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ type: "spring", stiffness: 200, damping: 25 }}
      style={{ width: size.width, height: size.height }}
      className="absolute flex flex-col bg-[#11111b]/95 border border-[#313244] rounded-lg shadow-2xl overflow-hidden backdrop-blur-sm group"
    >
      {/* Title bar */}
      <div className="flex items-center justify-between px-3 py-2 bg-[#181825] border-b border-[#313244] cursor-move text-[#a6adc8]">
        <span className="text-xs font-mono font-semibold flex items-center gap-1.5">
          <Move size={12} className="text-blue-400" /> {win.title}
        </span>
        <div className="flex gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#f38ba8] opacity-60" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#a6e3a1] opacity-60" />
        </div>
      </div>

      {/* Body */}
      <div className="flex-grow p-4 overflow-y-auto text-[#cdd6f4]">
        {children}
      </div>

      {/* Resize handle */}
      <div
        onMouseDown={startResize}
        className="absolute bottom-0 right-0 w-4 h-4 cursor-nwse-resize opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-end pr-0.5 pb-0.5"
      >
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
          <path d="M1 9L9 1M5 9L9 5M9 9V1H1" stroke="#6c7086" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
      </div>
    </motion.div>
  );
}

export default function ClawdbotWorld() {
  const [worldState, setWorldState] = useState(null);
  const [error, setError] = useState(false);
  const [lastUpdate, setLastUpdate] = useState(null);
  const canvasRefs = useRef({});

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

  if (!worldState) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-[#1f2328] text-[#cdd6f4]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="font-mono text-sm">Initializing Workspace...</p>
          {error && <p className="text-red-400 text-xs mt-2 flex items-center justify-center gap-1"><ShieldAlert size={14}/> Check latest-world.json configuration.</p>}
        </div>
      </div>
    );
  }

  const sortedWindows = [...(worldState.windows || [])].sort((a, b) => {
    if (a.id === "avatar") return -1;
    if (b.id === "avatar") return 1;
    return a.y - b.y;
  });

  const projectCount = sortedWindows.filter(w => w.type === "project" || w.status).length;
  const skillsWindow = sortedWindows.find(w => w.type === "skills");
  const skillCount = skillsWindow?.domains?.reduce((acc, d) => acc + (d.items?.length || 0), 0) || 0;

  return (
    <div className="relative w-screen h-screen overflow-hidden font-sans select-none" style={{ backgroundColor: worldState.background?.color || "#1f2328" }}>
      {worldState.background?.gridPattern === "dots" && (
        <div className="absolute inset-0 opacity-15 pointer-events-none" style={{ backgroundImage: "radial-gradient(#cdd6f4 1px, transparent 1px)", backgroundSize: "24px 24px" }} />
      )}

      <AnimatePresence>
        {sortedWindows.map((win) => (
          <ResizableWindow key={win.id} win={win}>
            {win.id === "avatar" ? (
              <AvatarWindow win={win} canvasRef={(el) => { if (el) canvasRefs.current[win.id] = el; }} />
            ) : win.type === "skills" ? (
              <SkillsWindow win={win} />
            ) : win.type === "project" || win.status ? (
              <ProjectCard win={win} />
            ) : (
              <div className="font-mono text-sm whitespace-pre-wrap">{win.content || "Empty Component Frame."}</div>
            )}
          </ResizableWindow>
        ))}
      </AnimatePresence>

      <div className="absolute bottom-4 left-4 bg-[#11111b]/80 border border-[#313244] px-3 py-1.5 rounded font-mono text-[10px] text-[#a6adc8] flex items-center gap-3">
        <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"/> Pipeline Active</span>
        <span>|</span>
        <span>Seq: {worldState.timestamp}</span>
        {lastUpdate && <><span>|</span><span>Updated: {lastUpdate}</span></>}
      </div>

      <div className="absolute bottom-4 right-4 bg-[#11111b]/80 border border-[#313244] px-3 py-1.5 rounded font-mono text-[10px] text-[#a6adc8] flex items-center gap-3">
        <span>{projectCount} Projects</span>
        {skillCount > 0 && <><span>|</span><span>{skillCount} Skills</span></>}
      </div>
    </div>
  );
}
