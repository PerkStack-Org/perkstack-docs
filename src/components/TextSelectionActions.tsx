"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { Copy, Link } from "lucide-react";

interface Position {
  x: number;
  y: number;
}

export default function TextSelectionActions() {
  const [position, setPosition] = useState<Position | null>(null);
  const [selectedText, setSelectedText] = useState("");
  const [copied, setCopied] = useState(false);
  const toolbarRef = useRef<HTMLDivElement>(null);

  const handleMouseUp = useCallback(() => {
    setTimeout(() => {
      const selection = window.getSelection();
      const text = selection?.toString().trim();

      if (!text || text.length < 3) {
        setPosition(null);
        return;
      }

      const prose = document.querySelector(".docs-prose");
      if (!prose) return;

      const anchorNode = selection?.anchorNode;
      if (!anchorNode || !prose.contains(anchorNode)) {
        setPosition(null);
        return;
      }

      const range = selection?.getRangeAt(0);
      if (!range) return;

      const rect = range.getBoundingClientRect();
      setPosition({
        x: rect.left + rect.width / 2,
        y: rect.top - 8,
      });
      setSelectedText(text);
      setCopied(false);
    }, 10);
  }, []);

  const handleMouseDown = useCallback((e: MouseEvent) => {
    if (toolbarRef.current?.contains(e.target as Node)) return;
    setPosition(null);
  }, []);

  useEffect(() => {
    document.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mousedown", handleMouseDown);
    return () => {
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mousedown", handleMouseDown);
    };
  }, [handleMouseUp, handleMouseDown]);

  const copyText = useCallback(() => {
    navigator.clipboard.writeText(selectedText);
    setCopied(true);
    setTimeout(() => setPosition(null), 1000);
  }, [selectedText]);

  const copyLink = useCallback(() => {
    const heading = findNearestHeading();
    const hash = heading ? `#${heading}` : "";
    const url = `${window.location.origin}${window.location.pathname}${hash}`;
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setPosition(null), 1000);
  }, []);

  if (!position) return null;

  return (
    <div
      ref={toolbarRef}
      className="fixed z-50 flex items-center gap-0.5 px-1 py-0.5 rounded-lg border border-lp-border-muted bg-lp-surface shadow-lg backdrop-blur-md animate-in"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: "translate(-50%, -100%)",
      }}
    >
      {copied ? (
        <span className="px-2 py-1 text-[12px] text-success font-medium">Copied!</span>
      ) : (
        <>
          <button
            onClick={copyText}
            className="flex items-center gap-1.5 px-2 py-1.5 text-[12px] text-lp-text-secondary hover:text-lp-text hover:bg-lp-bg-alt rounded-md transition-colors"
            title="Copy text"
          >
            <Copy size={12} />
            Copy
          </button>
          <div className="w-px h-4 bg-lp-border-muted" />
          <button
            onClick={copyLink}
            className="flex items-center gap-1.5 px-2 py-1.5 text-[12px] text-lp-text-secondary hover:text-lp-text hover:bg-lp-bg-alt rounded-md transition-colors"
            title="Copy link to section"
          >
            <Link size={12} />
            Link
          </button>
        </>
      )}
    </div>
  );
}

function findNearestHeading(): string | null {
  const selection = window.getSelection();
  if (!selection?.anchorNode) return null;

  let node: Node | null = selection.anchorNode;
  while (node && node !== document.body) {
    if (node instanceof HTMLElement) {
      const prev = findPreviousHeading(node);
      if (prev) return prev;
    }
    node = node.parentNode;
  }
  return null;
}

function findPreviousHeading(el: HTMLElement): string | null {
  let current: Element | null = el;
  while (current) {
    if (/^H[23]$/i.test(current.tagName) && current.id) return current.id;
    const sibling: Element | null = current.previousElementSibling;
    if (sibling) {
      if (/^H[23]$/i.test(sibling.tagName) && sibling.id) return sibling.id;
      const nested = sibling.querySelector("h2[id], h3[id]");
      if (nested) return nested.id;
      current = sibling;
    } else {
      current = current.parentElement;
    }
  }
  return null;
}
