"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { usePathname } from "next/navigation";
import { glossary, type GlossaryEntry } from "@/lib/glossary";

const HOVER_DELAY = 300;

function buildTermRegex(): { regex: RegExp; map: Map<string, GlossaryEntry> } {
  const map = new Map<string, GlossaryEntry>();
  const phrases: string[] = [];

  for (const entry of glossary) {
    const allTerms = [entry.term, ...(entry.aliases ?? [])];
    for (const t of allTerms) {
      map.set(t.toLowerCase(), entry);
      phrases.push(t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
    }
  }

  phrases.sort((a, b) => b.length - a.length);
  const regex = new RegExp(`\\b(${phrases.join("|")})\\b`, "gi");
  return { regex, map };
}

const { regex: termRegex, map: termMap } = buildTermRegex();

export default function GlossaryTooltips() {
  const pathname = usePathname();
  const [tooltip, setTooltip] = useState<{
    x: number;
    y: number;
    entry: GlossaryEntry;
  } | null>(null);
  const enterTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const leaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearTimers = useCallback(() => {
    if (enterTimer.current) clearTimeout(enterTimer.current);
    if (leaveTimer.current) clearTimeout(leaveTimer.current);
  }, []);

  const hide = useCallback(() => {
    clearTimers();
    leaveTimer.current = setTimeout(() => setTooltip(null), 150);
  }, [clearTimers]);

  const keepAlive = useCallback(() => {
    if (leaveTimer.current) clearTimeout(leaveTimer.current);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      const prose = document.querySelector(".docs-prose");
      if (!prose) return;

      const walker = document.createTreeWalker(prose, NodeFilter.SHOW_TEXT, {
        acceptNode(node) {
          const parent = node.parentElement;
          if (!parent) return NodeFilter.FILTER_REJECT;
          const tag = parent.tagName;
          if (["PRE", "CODE", "A", "H1", "H2", "H3", "H4", "SCRIPT", "STYLE"].includes(tag))
            return NodeFilter.FILTER_REJECT;
          if (parent.closest("pre, code, a, .glossary-term")) return NodeFilter.FILTER_REJECT;
          return NodeFilter.FILTER_ACCEPT;
        },
      });

      const textNodes: Text[] = [];
      let node: Node | null;
      while ((node = walker.nextNode())) {
        textNodes.push(node as Text);
      }

      const seen = new Set<string>();

      for (const textNode of textNodes) {
        const content = textNode.textContent ?? "";
        termRegex.lastIndex = 0;
        const match = termRegex.exec(content);
        if (!match) continue;

        const matchedTerm = match[0];
        const key = matchedTerm.toLowerCase();
        if (seen.has(key)) continue;

        const entry = termMap.get(key);
        if (!entry) continue;
        seen.add(key);
        for (const alias of [entry.term, ...(entry.aliases ?? [])]) {
          seen.add(alias.toLowerCase());
        }

        const idx = match.index;
        const before = content.slice(0, idx);
        const after = content.slice(idx + matchedTerm.length);

        const span = document.createElement("span");
        span.className = "glossary-term";
        span.textContent = matchedTerm;
        span.setAttribute("data-glossary", entry.term);

        const parent = textNode.parentNode;
        if (!parent) continue;

        if (before) parent.insertBefore(document.createTextNode(before), textNode);
        parent.insertBefore(span, textNode);
        if (after) parent.insertBefore(document.createTextNode(after), textNode);
        parent.removeChild(textNode);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [pathname]);

  useEffect(() => {
    function handleEnter(e: Event) {
      const el = e.target;
      if (!(el instanceof HTMLElement)) return;
      if (!el.classList.contains("glossary-term")) return;

      const key = el.getAttribute("data-glossary")?.toLowerCase();
      if (!key) return;
      const entry = termMap.get(key);
      if (!entry) return;

      clearTimers();
      enterTimer.current = setTimeout(() => {
        const rect = el.getBoundingClientRect();
        setTooltip({
          x: rect.left + rect.width / 2,
          y: rect.top,
          entry,
        });
      }, HOVER_DELAY);
    }

    function handleLeave(e: Event) {
      const el = e.target;
      if (!(el instanceof HTMLElement)) return;
      if (!el.classList.contains("glossary-term")) return;
      hide();
    }

    document.addEventListener("mouseenter", handleEnter, true);
    document.addEventListener("mouseleave", handleLeave, true);
    return () => {
      clearTimers();
      document.removeEventListener("mouseenter", handleEnter, true);
      document.removeEventListener("mouseleave", handleLeave, true);
    };
  }, [clearTimers, hide]);

  if (!tooltip) return null;

  const left = Math.max(16, Math.min(tooltip.x, window.innerWidth - 200));

  return (
    <div
      onMouseEnter={keepAlive}
      onMouseLeave={() => setTooltip(null)}
      className="fixed z-50 w-64 p-3 rounded-xl border border-lp-border-muted bg-lp-surface/95 backdrop-blur-md shadow-lg animate-in"
      style={{
        left: `${left}px`,
        top: `${tooltip.y}px`,
        transform: "translate(-50%, calc(-100% - 8px))",
      }}
    >
      <div className="text-[11px] font-semibold text-ps-accent uppercase tracking-wider mb-1.5">
        {tooltip.entry.term}
      </div>
      <div className="text-[12.5px] leading-relaxed text-lp-text-secondary">
        {tooltip.entry.definition}
      </div>
    </div>
  );
}
