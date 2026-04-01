"use client";

import { useEffect, useRef } from "react";
import { useUIPreferences } from "./UIPreferencesProvider";

export default function ReadingProgress() {
  const barRef = useRef<HTMLDivElement>(null);
  const { showReadingProgress } = useUIPreferences();

  useEffect(() => {
    let ticking = false;

    const update = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight <= 0 ? 0 : Math.min(1, scrollTop / docHeight);
      if (barRef.current) {
        barRef.current.style.transform = `scaleX(${progress})`;
      }
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(update);
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    update();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!showReadingProgress) return null;

  return (
    <div
      ref={barRef}
      className="absolute bottom-0 left-0 right-0 h-[2px] bg-ps-accent origin-left will-change-transform"
      style={{ transform: "scaleX(0)", transition: "transform 120ms cubic-bezier(0.4, 0, 0.2, 1)" }}
      role="progressbar"
      aria-label="Reading progress"
    />
  );
}
