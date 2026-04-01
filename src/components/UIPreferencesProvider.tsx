"use client";

import { createContext, useContext, useState, useEffect, useCallback } from "react";

const STORAGE_KEY = "perkstack-docs-ui-prefs";

interface UIPreferences {
  focusMode: boolean;
  toggleFocusMode: () => void;
  fontSize: number;
  increaseFontSize: () => void;
  decreaseFontSize: () => void;
  resetFontSize: () => void;
  showReadingProgress: boolean;
  toggleReadingProgress: () => void;
}

const UIPreferencesContext = createContext<UIPreferences>({
  focusMode: false,
  toggleFocusMode: () => {},
  fontSize: 0,
  increaseFontSize: () => {},
  decreaseFontSize: () => {},
  resetFontSize: () => {},
  showReadingProgress: true,
  toggleReadingProgress: () => {},
});

export function useUIPreferences() {
  return useContext(UIPreferencesContext);
}

const BASE_FONT_SIZE = 15;
const FONT_STEP = 1;
const MIN_STEP = -3;
const MAX_STEP = 4;

function loadPrefs(): { focusMode: boolean; fontSize: number; showReadingProgress: boolean } {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return { focusMode: false, fontSize: 0, showReadingProgress: true };
}

function savePrefs(prefs: { focusMode: boolean; fontSize: number; showReadingProgress: boolean }) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
  } catch {}
}

export function UIPreferencesProvider({ children }: { children: React.ReactNode }) {
  const [focusMode, setFocusMode] = useState(false);
  const [fontSize, setFontSize] = useState(0);
  const [showReadingProgress, setShowReadingProgress] = useState(true);

  useEffect(() => {
    const prefs = loadPrefs();
    setFocusMode(prefs.focusMode);
    setFontSize(prefs.fontSize);
    setShowReadingProgress(prefs.showReadingProgress);
    document.documentElement.style.fontSize = `${BASE_FONT_SIZE + prefs.fontSize * FONT_STEP}px`;
    if (prefs.focusMode) document.documentElement.setAttribute("data-focus", "true");
  }, []);

  const persist = useCallback(
    (updates: Partial<{ focusMode: boolean; fontSize: number; showReadingProgress: boolean }>) => {
      const next = {
        focusMode: updates.focusMode ?? focusMode,
        fontSize: updates.fontSize ?? fontSize,
        showReadingProgress: updates.showReadingProgress ?? showReadingProgress,
      };
      savePrefs(next);
    },
    [focusMode, fontSize, showReadingProgress],
  );

  const toggleFocusMode = useCallback(() => {
    setFocusMode((prev) => {
      const next = !prev;
      if (next) {
        document.documentElement.setAttribute("data-focus", "true");
      } else {
        document.documentElement.removeAttribute("data-focus");
      }
      persist({ focusMode: next });
      return next;
    });
  }, [persist]);

  const increaseFontSize = useCallback(() => {
    setFontSize((prev) => {
      const next = Math.min(prev + 1, MAX_STEP);
      document.documentElement.style.fontSize = `${BASE_FONT_SIZE + next * FONT_STEP}px`;
      persist({ fontSize: next });
      return next;
    });
  }, [persist]);

  const decreaseFontSize = useCallback(() => {
    setFontSize((prev) => {
      const next = Math.max(prev - 1, MIN_STEP);
      document.documentElement.style.fontSize = `${BASE_FONT_SIZE + next * FONT_STEP}px`;
      persist({ fontSize: next });
      return next;
    });
  }, [persist]);

  const resetFontSize = useCallback(() => {
    setFontSize(0);
    document.documentElement.style.fontSize = `${BASE_FONT_SIZE}px`;
    persist({ fontSize: 0 });
  }, [persist]);

  const toggleReadingProgress = useCallback(() => {
    setShowReadingProgress((prev) => {
      const next = !prev;
      persist({ showReadingProgress: next });
      return next;
    });
  }, [persist]);

  return (
    <UIPreferencesContext.Provider
      value={{
        focusMode,
        toggleFocusMode,
        fontSize,
        increaseFontSize,
        decreaseFontSize,
        resetFontSize,
        showReadingProgress,
        toggleReadingProgress,
      }}
    >
      {children}
    </UIPreferencesContext.Provider>
  );
}
