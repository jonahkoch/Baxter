import { useState, useCallback, useRef } from 'react';

/**
 * Layout Engine — modular window constraint solver
 * Modes:
 *   'freeform' — current behavior, windows can overlap
 *   'snap'     — edges magnetically align when near
 *   'repulsion'— windows push each other, no overlap + magnetic edges
 */

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

function getOverlapVector(a, b) {
  const overlapX = Math.min(a.x + a.width - b.x, b.x + b.width - a.x);
  const overlapY = Math.min(a.y + a.height - b.y, b.y + b.height - a.y);

  if (overlapX < overlapY) {
    return { x: a.x < b.x ? -overlapX : overlapX, y: 0 };
  }
  return { x: 0, y: a.y < b.y ? -overlapY : overlapY };
}

function getSnapOffset(dragged, other, threshold = SNAP_THRESHOLD) {
  const snaps = [];

  // Horizontal snaps
  const leftToRight = other.x + other.width - dragged.x;
  const rightToLeft = other.x - (dragged.x + dragged.width);
  const alignLeft = Math.abs(dragged.x - other.x);
  const alignRight = Math.abs((dragged.x + dragged.width) - (other.x + other.width));

  if (Math.abs(leftToRight) < threshold) snaps.push({ x: leftToRight, y: 0, type: 'h-left-right' });
  if (Math.abs(rightToLeft) < threshold) snaps.push({ x: rightToLeft, y: 0, type: 'h-right-left' });
  if (alignLeft < threshold) snaps.push({ x: other.x - dragged.x, y: 0, type: 'h-align' });
  if (alignRight < threshold) snaps.push({ x: (other.x + other.width) - (dragged.x + dragged.width), y: 0, type: 'h-align' });

  // Vertical snaps
  const topToBottom = other.y + other.height - dragged.y;
  const bottomToTop = other.y - (dragged.y + dragged.height);
  const alignTop = Math.abs(dragged.y - other.y);
  const alignBottom = Math.abs((dragged.y + dragged.height) - (other.y + other.height));

  if (Math.abs(topToBottom) < threshold) snaps.push({ x: 0, y: topToBottom, type: 'v-top-bottom' });
  if (Math.abs(bottomToTop) < threshold) snaps.push({ x: 0, y: bottomToTop, type: 'v-bottom-top' });
  if (alignTop < threshold) snaps.push({ x: 0, y: other.y - dragged.y, type: 'v-align' });
  if (alignBottom < threshold) snaps.push({ x: 0, y: (other.y + other.height) - (dragged.y + dragged.height), type: 'v-align' });

  if (snaps.length === 0) return null;

  // Pick the smallest snap
  return snaps.sort((a, b) => Math.abs(a.x) + Math.abs(a.y) - Math.abs(b.x) - Math.abs(b.y))[0];
}

export function useLayoutEngine(initialMode = 'freeform') {
  const [mode, setMode] = useState(initialMode);
  const [positions, setPositions] = useState({});
  const [activeSnap, setActiveSnap] = useState(null);
  const positionsRef = useRef({});

  const registerWindow = useCallback((id, rect) => {
    positionsRef.current[id] = rect;
    setPositions(prev => ({ ...prev, [id]: rect }));
  }, []);

  const unregisterWindow = useCallback((id) => {
    delete positionsRef.current[id];
    setPositions(prev => {
      const next = { ...prev };
      delete next[id];
      return next;
    });
  }, []);

  // Calculate where a window can be placed without overlapping others
  const resolvePosition = useCallback((id, proposedRect, excludeId = null) => {
    if (mode === 'freeform') {
      return { x: proposedRect.x, y: proposedRect.y, snap: null, pushed: {} };
    }

    let x = proposedRect.x;
    let y = proposedRect.y;
    let snap = null;
    const pushed = {};

    const draggedRect = { ...proposedRect, x, y };

    // Magnetic snapping (both snap and repulsion modes)
    if (mode === 'snap' || mode === 'repulsion') {
      let bestSnap = null;

      Object.entries(positionsRef.current).forEach(([otherId, otherRect]) => {
        if (otherId === id || otherId === excludeId) return;
        const s = getSnapOffset(draggedRect, otherRect);
        if (s) {
          const dist = Math.abs(s.x) + Math.abs(s.y);
          if (!bestSnap || dist < bestSnap.dist) {
            bestSnap = { ...s, dist, targetId: otherId };
          }
        }
      });

      if (bestSnap) {
        x += bestSnap.x;
        y += bestSnap.y;
        snap = bestSnap;
      }
    }

    // Repulsion — push overlapping windows
    if (mode === 'repulsion') {
      const updatedRect = { ...draggedRect, x, y };

      Object.entries(positionsRef.current).forEach(([otherId, otherRect]) => {
        if (otherId === id || otherId === excludeId) return;

        if (rectsOverlap(updatedRect, otherRect)) {
          const push = getOverlapVector(otherRect, updatedRect);
          pushed[otherId] = {
            x: otherRect.x + push.x,
            y: otherRect.y + push.y,
          };
        }
      });
    }

    return { x, y, snap, pushed };
  }, [mode]);

  // Cascade push: if pushing A causes it to overlap B, push B too
  const resolveCascading = useCallback((id, proposedRect) => {
    if (mode !== 'repulsion') {
      return resolvePosition(id, proposedRect);
    }

    const allPushed = {};
    let currentRect = { ...proposedRect };
    let iterations = 0;
    const maxIterations = 10;

    while (iterations < maxIterations) {
      const { x, y, snap, pushed } = resolvePosition(id, currentRect);
      currentRect = { ...currentRect, x, y };

      let newPushes = false;
      Object.entries(pushed).forEach(([pushId, pushPos]) => {
        if (!allPushed[pushId]) {
          allPushed[pushId] = pushPos;
          newPushes = true;
        }
      });

      if (!newPushes) break;

      // Apply pushes to positions ref temporarily for next iteration
      Object.entries(allPushed).forEach(([pid, pos]) => {
        if (positionsRef.current[pid]) {
          positionsRef.current[pid] = { ...positionsRef.current[pid], ...pos };
        }
      });

      iterations++;
    }

    // Restore original positions (except dragged)
    Object.keys(allPushed).forEach(pid => {
      if (positions[pid]) {
        positionsRef.current[pid] = positions[pid];
      }
    });

    return { x: currentRect.x, y: currentRect.y, snap, pushed: allPushed };
  }, [mode, resolvePosition, positions]);

  return {
    mode,
    setMode,
    positions,
    registerWindow,
    unregisterWindow,
    resolvePosition,
    resolveCascading,
    activeSnap,
    setActiveSnap,
  };
}
