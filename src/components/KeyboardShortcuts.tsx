"use client";

import { useEffect, useState, useCallback } from "react";
import { X } from "lucide-react";
import { useUIPreferences } from "./UIPreferencesProvider";

interface Shortcut {
  keys: string[];
  description: string;
}

const shortcuts: Shortcut[] = [
  { keys: ["⌘", "K"], description: "Open command palette" },
  { keys: ["?"], description: "Show keyboard shortcuts" },
  { keys: ["↑", "↓"], description: "Navigate search results" },
  { keys: ["↵"], description: "Open selected result" },
  { keys: ["Esc"], description: "Close dialog / overlay" },
  { keys: ["F"], description: "Toggle focus mode" },
  { keys: ["+"], description: "Increase font size" },
  { keys: ["-"], description: "Decrease font size" },
  { keys: ["0"], description: "Reset font size" },
  { keys: ["T"], description: "Jump to top of page" },
  { keys: ["←", "→"], description: "Swipe prev / next (mobile)" },
];

export default function KeyboardShortcuts() {
  const [open, setOpen] = useState(false);
  const { toggleFocusMode, increaseFontSize, decreaseFontSize, resetFontSize } = useUIPreferences();

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      const isInput =
        target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable;
      if (isInput) return;

      if (e.key === "?" && !e.metaKey && !e.ctrlKey) {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
      if (e.key === "Escape" && open) {
        setOpen(false);
      }
      if (e.key === "f" && !e.metaKey && !e.ctrlKey && !open) {
        e.preventDefault();
        toggleFocusMode();
      }
      if ((e.key === "=" || e.key === "+") && !e.metaKey && !e.ctrlKey && !open) {
        e.preventDefault();
        increaseFontSize();
      }
      if (e.key === "-" && !e.metaKey && !e.ctrlKey && !open) {
        e.preventDefault();
        decreaseFontSize();
      }
      if (e.key === "0" && !e.metaKey && !e.ctrlKey && !open) {
        e.preventDefault();
        resetFontSize();
      }
      if (e.key === "t" && !e.metaKey && !e.ctrlKey && !open) {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    },
    [open, toggleFocusMode, increaseFontSize, decreaseFontSize, resetFontSize],
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  if (!open) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50"
        onClick={() => setOpen(false)}
      />
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-sm z-50">
        <div className="bg-lp-surface border border-lp-border-muted rounded-2xl shadow-2xl overflow-hidden backdrop-blur-md">
          <div className="flex items-center justify-between px-5 py-3.5 border-b border-lp-border-muted">
            <h3 className="text-sm font-semibold text-lp-text">Keyboard Shortcuts</h3>
            <button
              onClick={() => setOpen(false)}
              className="text-lp-text-muted hover:text-lp-text transition-colors"
            >
              <X size={16} />
            </button>
          </div>
          <div className="p-2">
            {shortcuts.map((shortcut, i) => (
              <div
                key={i}
                className="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-sidebar-hover transition-colors"
              >
                <span className="text-[13px] text-lp-text-secondary">{shortcut.description}</span>
                <div className="flex gap-1">
                  {shortcut.keys.map((key, j) => (
                    <kbd
                      key={j}
                      className="inline-flex items-center justify-center min-w-[24px] h-6 px-1.5 text-[11px] font-medium text-lp-text-muted bg-lp-bg-alt border border-lp-border-muted rounded-md"
                    >
                      {key}
                    </kbd>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="px-5 py-2.5 border-t border-lp-border-muted">
            <p className="text-[11px] text-lp-text-muted">
              Press{" "}
              <kbd className="text-[10px] font-mono bg-lp-bg-alt px-1 py-0.5 rounded border border-lp-border-muted">
                ?
              </kbd>{" "}
              to toggle this overlay
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
