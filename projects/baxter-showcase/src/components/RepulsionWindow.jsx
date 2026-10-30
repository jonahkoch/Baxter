import React, { useState, useRef, useCallback, useEffect } from "react";
import { motion, useDragControls, animate } from "framer-motion";
import { Move } from "lucide-react";
import { useLayout } from "../context/LayoutContext";

const SNAP_THRESHOLD = 15;
const REPULSION_PADDING = 4;

function rectsOverlap(a, b) {
  return (
    a.x < b.x + b.width + REPULSION_PADDING &&
    a.x + a.width + REPULSION_PADDING > b.x &&
    a.y < b.y + b.height + REPULSION_PADDING &&
    a.y + a.height + REPULSION_PADDING > b.y
  );
}

function getSnapOffset(dragged, other, threshold = SNAP_THRESHOLD) {
  const snaps = [];

  const leftToRight = other.x + other.width - dragged.x;
  const rightToLeft = other.x - (dragged.x + dragged.width);
  const alignLeft = Math.abs(dragged.x - other.x);
  const alignRight = Math.abs((dragged.x + dragged.width) - (other.x + other.width));

  if (Math.abs(leftToRight) < threshold) snaps.push({ x: leftToRight, y: 0, axis: 'x', type: 'edge' });
  if (Math.abs(rightToLeft) < threshold) snaps.push({ x: rightToLeft, y: 0, axis: 'x', type: 'edge' });
  if (alignLeft < threshold) snaps.push({ x: other.x - dragged.x, y: 0, axis: 'x', type: 'align' });
  if (alignRight < threshold) snaps.push({ x: (other.x + other.width) - (dragged.x + dragged.width), y: 0, axis: 'x', type: 'align' });

  const topToBottom = other.y + other.height - dragged.y;
  const bottomToTop = other.y - (dragged.y + dragged.height);
  const alignTop = Math.abs(dragged.y - other.y);
  const alignBottom = Math.abs((dragged.y + dragged.height) - (other.y + other.height));

  if (Math.abs(topToBottom) < threshold) snaps.push({ x: 0, y: topToBottom, axis: 'y', type: 'edge' });
  if (Math.abs(bottomToTop) < threshold) snaps.push({ x: 0, y: bottomToTop, axis: 'y', type: 'edge' });
  if (alignTop < threshold) snaps.push({ x: 0, y: other.y - dragged.y, axis: 'y', type: 'align' });
  if (alignBottom < threshold) snaps.push({ x: 0, y: (other.y + other.height) - (dragged.y + dragged.height), axis: 'y', type: 'align' });

  if (snaps.length === 0) return null;
  return snaps.sort((a, b) => Math.abs(a.x) + Math.abs(a.y) - Math.abs(b.x) - Math.abs(b.y))[0];
}

function getOverlapVector(a, b) {
  const overlapX = Math.min(a.x + a.width - b.x, b.x + b.width - a.x);
  const overlapY = Math.min(a.y + a.height - b.y, b.y + b.height - a.y);

  if (overlapX < overlapY) {
    return { x: a.x < b.x ? -(overlapX + REPULSION_PADDING) : overlapX + REPULSION_PADDING, y: 0 };
  }
  return { x: 0, y: a.y < b.y ? -(overlapY + REPULSION_PADDING) : overlapY + REPULSION_PADDING };
}

export default function RepulsionWindow({ win, children, onPositionChange, allPositions }) {
  const { mode, setSnapGuides } = useLayout();
  const [size, setSize] = useState({ width: win.width, height: win.height });
  const [position, setPosition] = useState({ x: win.x, y: win.y });
  const [isDragging, setIsDragging] = useState(false);
  const resizeRef = useRef({ active: false, startX: 0, startY: 0, startW: 0, startH: 0 });
  const dragControls = useDragControls();
  const windowRef = useRef(null);
  const currentSnap = useRef(null);

  const { register, unregister, updatePosition } = useLayout();

  useEffect(() => {
    register(win.id, { x: position.x, y: position.y, width: size.width, height: size.height });
    return () => unregister(win.id);
  }, []);

  useEffect(() => {
    updatePosition(win.id, { x: position.x, y: position.y, width: size.width, height: size.height });
  }, [position, size]);

  const getOtherRects = useCallback(() => {
    return Object.entries(allPositions || {})
      .filter(([id]) => id !== win.id)
      .map(([id, pos]) => ({ id, ...pos }));
  }, [allPositions, win.id]);

  const resolveSnap = useCallback((proposedX, proposedY) => {
    if (mode === 'freeform') return null;

    const draggedRect = { x: proposedX, y: proposedY, width: size.width, height: size.height };
    const others = getOtherRects();

    let bestSnap = null;
    others.forEach(other => {
      const snap = getSnapOffset(draggedRect, other);
      if (snap) {
        const dist = Math.abs(snap.x) + Math.abs(snap.y);
        if (!bestSnap || dist < bestSnap.dist) {
          bestSnap = { ...snap, dist, targetId: other.id, targetRect: other };
        }
      }
    });

    return bestSnap;
  }, [mode, size, getOtherRects]);

  const resolveRepulsion = useCallback((finalX, finalY) => {
    if (mode !== 'repulsion') return [];

    const draggedRect = { x: finalX, y: finalY, width: size.width, height: size.height };
    const others = getOtherRects();
    const pushed = [];

    others.forEach(other => {
      if (rectsOverlap(draggedRect, other)) {
        const push = getOverlapVector(other, draggedRect);
        pushed.push({
          id: other.id,
          x: other.x + push.x,
          y: other.y + push.y,
        });
      }
    });

    return pushed;
  }, [mode, size, getOtherRects]);

  const handleDrag = useCallback((_, info) => {
    if (mode === 'freeform') return;

    const proposedX = position.x + info.offset.x;
    const proposedY = position.y + info.offset.y;

    const snap = resolveSnap(proposedX, proposedY);
    currentSnap.current = snap;

    if (snap) {
      setSnapGuides([{
        axis: snap.axis,
        value: snap.axis === 'x'
          ? (snap.type === 'edge'
              ? (snap.x > 0 ? snap.targetRect.x + snap.targetRect.width : snap.targetRect.x)
              : snap.targetRect.x)
          : (snap.type === 'edge'
              ? (snap.y > 0 ? snap.targetRect.y + snap.targetRect.height : snap.targetRect.y)
              : snap.targetRect.y),
        type: snap.type,
      }]);
    } else {
      setSnapGuides([]);
    }
  }, [mode, position, resolveSnap, setSnapGuides]);

  const handleDragEnd = useCallback((_, info) => {
    setIsDragging(false);
    setSnapGuides([]);

    let finalX = position.x + info.offset.x;
    let finalY = position.y + info.offset.y;

    // Apply snap on release
    const snap = currentSnap.current;
    if (snap && (mode === 'snap' || mode === 'repulsion')) {
      finalX += snap.x;
      finalY += snap.y;
    }

    // Clamp to viewport bounds
    const maxX = window.innerWidth - size.width;
    const maxY = window.innerHeight - size.height;
    finalX = Math.max(0, Math.min(finalX, maxX));
    finalY = Math.max(0, Math.min(finalY, maxY));

    // Apply repulsion
    const pushed = resolveRepulsion(finalX, finalY);
    pushed.forEach(p => {
      onPositionChange?.(p.id, p.x, p.y);
    });

    setPosition({ x: finalX, y: finalY });
    onPositionChange?.(win.id, finalX, finalY);
    currentSnap.current = null;
  }, [position, mode, size, resolveRepulsion, onPositionChange, setSnapGuides, win.id]);

  const handleDragStart = useCallback(() => {
    setIsDragging(true);
  }, []);

  // Resize handlers
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

  // Keep position state in sync when externally changed
  useEffect(() => {
    const ext = allPositions?.[win.id];
    if (ext && (ext.x !== position.x || ext.y !== position.y) && !isDragging) {
      setPosition({ x: ext.x, y: ext.y });
    }
  }, [allPositions, win.id, isDragging]);

  return (
    <motion.div
      drag
      dragControls={dragControls}
      dragListener={false}
      dragMomentum={false}
      onDragStart={handleDragStart}
      onDrag={handleDrag}
      onDragEnd={handleDragEnd}
      initial={{ x: win.x, y: win.y, opacity: 0, scale: 0.95 }}
      animate={{ x: position.x, y: position.y, opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      style={{ width: size.width, height: size.height, position: 'absolute' }}
      className="flex flex-col bg-[#11111b]/95 border border-[#313244] rounded-lg shadow-2xl overflow-hidden backdrop-blur-sm group"
      data-window-id={win.id}
      ref={windowRef}
    >
      <div
        onPointerDown={(e) => dragControls.start(e)}
        className="flex items-center justify-between px-3 py-2 bg-[#181825] border-b border-[#313244] cursor-move text-[#a6adc8] select-none"
      >
        <span className="text-xs font-mono font-semibold flex items-center gap-1.5">
          <Move size={12} className="text-blue-400" /> {win.title}
        </span>
        <div className="flex gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#f38ba8] opacity-60" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#a6e3a1] opacity-60" />
        </div>
      </div>
      <div className="flex-grow p-4 overflow-y-auto text-[#cdd6f4]">
        {children}
      </div>
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
