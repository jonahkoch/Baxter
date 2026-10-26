import React from "react";
import { useLayout } from "../context/LayoutContext";
import { Magnet, GripHorizontal, Move } from "lucide-react";

const MODES = [
  { id: "freeform", label: "Free", icon: Move, desc: "Drag freely, overlap allowed" },
  { id: "snap", label: "Snap", icon: Magnet, desc: "Magnetic edge alignment" },
  { id: "repulsion", label: "Push", icon: GripHorizontal, desc: "Windows repel, no overlap" },
];

export default function ModeToggle() {
  const { mode, setMode } = useLayout();

  return (
    <div className="absolute top-4 right-4 bg-[#11111b]/90 border border-[#313244] rounded-lg px-2 py-1.5 flex items-center gap-1 z-50 backdrop-blur-sm">
      {MODES.map((m) => {
        const Icon = m.icon;
        const active = mode === m.id;
        return (
          <button
            key={m.id}
            onClick={() => setMode(m.id)}
            title={m.desc}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-[10px] font-mono font-medium transition-all ${
              active
                ? "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                : "text-[#6c7086] hover:text-[#cdd6f4] hover:bg-[#313244]/50"
            }`}
          >
            <Icon size={12} />
            {m.label}
          </button>
        );
      })}
    </div>
  );
}
