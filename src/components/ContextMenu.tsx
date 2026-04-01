"use client";

import { useEffect, useRef, useState } from "react";

export interface ContextMenuItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  danger?: boolean;
  divider?: boolean;
  onSelect: () => void;
}

interface ContextMenuState {
  x: number;
  y: number;
  items: ContextMenuItem[];
}

let globalShow: ((state: ContextMenuState) => void) | null = null;
let globalHide: (() => void) | null = null;

export function showContextMenu(x: number, y: number, items: ContextMenuItem[]) {
  globalShow?.({ x, y, items });
}

export function hideContextMenu() {
  globalHide?.();
}

export default function ContextMenuProvider() {
  const [state, setState] = useState<ContextMenuState | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    globalShow = (s) => setState(s);
    globalHide = () => setState(null);
    return () => {
      globalShow = null;
      globalHide = null;
    };
  }, []);

  useEffect(() => {
    if (!state) return;

    const handleClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setState(null);
      }
    };
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setState(null);
    };
    const handleScroll = () => setState(null);

    document.addEventListener("mousedown", handleClick);
    document.addEventListener("keydown", handleKey);
    window.addEventListener("scroll", handleScroll, true);
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleKey);
      window.removeEventListener("scroll", handleScroll, true);
    };
  }, [state]);

  useEffect(() => {
    if (!state || !menuRef.current) return;
    const menu = menuRef.current;
    const rect = menu.getBoundingClientRect();
    const vw = window.innerWidth;
    const vh = window.innerHeight;

    let x = state.x;
    let y = state.y;
    if (x + rect.width > vw - 8) x = vw - rect.width - 8;
    if (y + rect.height > vh - 8) y = vh - rect.height - 8;
    if (x < 8) x = 8;
    if (y < 8) y = 8;

    if (x !== state.x || y !== state.y) {
      setState({ ...state, x, y });
    }
  }, [state]);

  if (!state) return null;

  return (
    <div
      ref={menuRef}
      className="fixed z-[80] min-w-[180px] py-1 rounded-xl border border-lp-border-muted bg-lp-surface/95 backdrop-blur-md shadow-xl animate-in"
      style={{ left: state.x, top: state.y }}
      role="menu"
    >
      {state.items.map((item) => (
        <div key={item.id}>
          {item.divider && <div className="my-1 border-t border-lp-border-muted" />}
          <button
            role="menuitem"
            onClick={() => {
              item.onSelect();
              setState(null);
            }}
            className={`flex items-center gap-2.5 w-full px-3 py-1.5 text-[13px] text-left transition-colors ${
              item.danger
                ? "text-error hover:bg-error/8"
                : "text-lp-text-secondary hover:text-lp-text hover:bg-lp-bg-alt"
            }`}
          >
            {item.icon && <span className="flex-shrink-0 w-4 text-center">{item.icon}</span>}
            <span>{item.label}</span>
          </button>
        </div>
      ))}
    </div>
  );
}
