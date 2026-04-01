"use client";

import { useEffect, useState, useCallback } from "react";
import { usePathname, useRouter } from "next/navigation";
import { BookOpen, X } from "lucide-react";
import { flattenNavigation } from "@/lib/docs-helpers";

const STORAGE_KEY = "perkstack-docs-last-visited";

interface LastVisited {
  href: string;
  title: string;
  section: string;
  scrollY: number;
  timestamp: number;
}

function saveVisit(visit: LastVisited) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(visit));
  } catch {}
}

function loadVisit(): LastVisited | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function ContinueReadingTracker() {
  const pathname = usePathname();

  useEffect(() => {
    const flat = flattenNavigation();
    const match = flat.find((item) => item.href === pathname);
    if (!match) return;

    const timer = setInterval(() => {
      saveVisit({
        href: match.href,
        title: match.title,
        section: match.section,
        scrollY: window.scrollY,
        timestamp: Date.now(),
      });
    }, 5000);

    saveVisit({
      href: match.href,
      title: match.title,
      section: match.section,
      scrollY: 0,
      timestamp: Date.now(),
    });

    return () => clearInterval(timer);
  }, [pathname]);

  return null;
}

export function ContinueReadingBanner() {
  const pathname = usePathname();
  const router = useRouter();
  const [visit, setVisit] = useState<LastVisited | null>(null);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const last = loadVisit();
    if (last && last.href !== pathname && Date.now() - last.timestamp < 7 * 24 * 60 * 60 * 1000) {
      setVisit(last);
      setDismissed(false);
    }
  }, [pathname]);

  const handleGo = useCallback(() => {
    if (!visit) return;
    router.push(visit.href);
    setTimeout(() => {
      if (visit.scrollY > 0) window.scrollTo({ top: visit.scrollY, behavior: "smooth" });
    }, 300);
    setDismissed(true);
  }, [visit, router]);

  if (!visit || dismissed || visit.href === pathname) return null;

  return (
    <div className="mb-6 flex items-center gap-3 px-4 py-3 rounded-lg border border-lp-border-muted bg-lp-surface text-sm animate-in">
      <BookOpen size={16} className="text-ps-accent flex-shrink-0" />
      <div className="flex-1 min-w-0">
        <span className="text-lp-text-muted">Continue reading </span>
        <button onClick={handleGo} className="text-ps-accent hover:underline font-medium">
          {visit.title}
        </button>
        <span className="text-lp-text-muted"> in {visit.section}</span>
      </div>
      <button
        onClick={() => setDismissed(true)}
        className="text-lp-text-muted hover:text-lp-text transition-colors flex-shrink-0"
        aria-label="Dismiss"
      >
        <X size={14} />
      </button>
    </div>
  );
}
