import React, { createContext, useContext, useState, useCallback, useRef } from 'react';

const LayoutContext = createContext(null);

export function LayoutProvider({ children, initialMode = 'freeform' }) {
  const [mode, setMode] = useState(initialMode);
  const [snapGuides, setSnapGuides] = useState([]);
  const positionsRef = useRef({});

  const register = useCallback((id, rect) => {
    positionsRef.current[id] = rect;
  }, []);

  const unregister = useCallback((id) => {
    delete positionsRef.current[id];
  }, []);

  const updatePosition = useCallback((id, rect) => {
    positionsRef.current[id] = rect;
  }, []);

  const getPositions = useCallback(() => {
    return { ...positionsRef.current };
  }, []);

  const value = {
    mode,
    setMode,
    register,
    unregister,
    updatePosition,
    getPositions,
    snapGuides,
    setSnapGuides,
  };

  return (
    <LayoutContext.Provider value={value}>
      {children}
    </LayoutContext.Provider>
  );
}

export function useLayout() {
  const ctx = useContext(LayoutContext);
  if (!ctx) throw new Error('useLayout must be inside LayoutProvider');
  return ctx;
}
