"use client";

import { useEffect, useRef, useCallback, useState } from "react";
import { usePathname } from "next/navigation";
import { flattenNavigation, type FlatNavItem } from "@/lib/docs-helpers";

const HOVER_DELAY = 400;
const LEAVE_DELAY = 200;

export default function LinkPreview() {
  const pathname = usePathname();
  const cardRef = useRef<HTMLDivElement | null>(null);
  const enterTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const leaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [preview, setPreview] = useState<{
    x: number;
    y: number;
    title: string;
    section: string;
    href: string;
  } | null>(null);

  const navItems = useRef<FlatNavItem[]>([]);

  useEffect(() => {
    navItems.current = flattenNavigation();
  }, []);

  const clearTimers = useCallback(() => {
    if (enterTimer.current) clearTimeout(enterTimer.current);
    if (leaveTimer.current) clearTimeout(leaveTimer.current);
  }, []);

  const hide = useCallback(() => {
    clearTimers();
    leaveTimer.current = setTimeout(() => setPreview(null), LEAVE_DELAY);
  }, [clearTimers]);

  const keepAlive = useCallback(() => {
    if (leaveTimer.current) clearTimeout(leaveTimer.current);
  }, []);

  useEffect(() => {
    const prose = document.querySelector(".docs-prose");
    if (!prose) return;

    function handleEnter(e: Event) {
      const target = e.target as HTMLAnchorElement;
      const href = target.getAttribute("href");
      if (!href || !href.startsWith("/docs/")) return;

      const match = navItems.current.find((item) => item.href === href);
      if (!match) return;

      clearTimers();
      enterTimer.current = setTimeout(() => {
        const rect = target.getBoundingClientRect();
        setPreview({
          x: rect.left + rect.width / 2,
          y: rect.top,
          title: match.title,
          section: match.section,
          href: match.href,
        });
      }, HOVER_DELAY);
    }

    function handleLeave(e: Event) {
      const target = e.target as HTMLAnchorElement;
      const href = target.getAttribute("href");
      if (!href || !href.startsWith("/docs/")) return;
      hide();
    }

    const links = prose.querySelectorAll('a[href^="/docs/"]');
    links.forEach((link) => {
      link.addEventListener("mouseenter", handleEnter);
      link.addEventListener("mouseleave", handleLeave);
    });

    return () => {
      clearTimers();
      links.forEach((link) => {
        link.removeEventListener("mouseenter", handleEnter);
        link.removeEventListener("mouseleave", handleLeave);
      });
    };
  }, [pathname, clearTimers, hide]);

  if (!preview) return null;

  const left = Math.max(16, Math.min(preview.x, window.innerWidth - 230));

  return (
    <div
      ref={cardRef}
      onMouseEnter={keepAlive}
      onMouseLeave={() => setPreview(null)}
      className="fixed z-50 w-56 p-3 rounded-xl border border-lp-border-muted bg-lp-surface/95 backdrop-blur-md shadow-lg animate-in pointer-events-auto"
      style={{
        left: `${left}px`,
        top: `${preview.y}px`,
        transform: "translate(-50%, calc(-100% - 8px))",
      }}
    >
      <div className="text-[11px] font-medium text-ps-accent uppercase tracking-wider mb-1">
        {preview.section}
      </div>
      <div className="text-[13px] font-semibold text-lp-text leading-snug">{preview.title}</div>
      <div className="mt-2 flex items-center gap-1 text-[11px] text-lp-text-muted">
        <svg
          width="10"
          height="10"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M5 12h14" />
          <path d="m12 5 7 7-7 7" />
        </svg>
        Click to navigate
      </div>
    </div>
  );
}
