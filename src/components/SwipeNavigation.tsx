"use client";

import { useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import { getPrevNext } from "@/lib/docs-helpers";

const SWIPE_THRESHOLD = 80;
const SWIPE_VELOCITY = 0.3;

export default function SwipeNavigation() {
  const pathname = usePathname();
  const router = useRouter();
  const touchStart = useRef<{ x: number; y: number; t: number } | null>(null);

  useEffect(() => {
    const { prev, next } = getPrevNext(pathname);
    if (!prev && !next) return;

    function handleTouchStart(e: TouchEvent) {
      if (e.touches.length !== 1) return;
      const target = e.target as HTMLElement;
      if (target.closest("pre, code, input, textarea, .overflow-x-auto")) return;

      touchStart.current = {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY,
        t: Date.now(),
      };
    }

    function handleTouchEnd(e: TouchEvent) {
      if (!touchStart.current || e.changedTouches.length !== 1) return;

      const dx = e.changedTouches[0].clientX - touchStart.current.x;
      const dy = e.changedTouches[0].clientY - touchStart.current.y;
      const dt = Date.now() - touchStart.current.t;
      const velocity = Math.abs(dx) / dt;

      touchStart.current = null;

      if (Math.abs(dy) > Math.abs(dx) * 0.6) return;
      if (Math.abs(dx) < SWIPE_THRESHOLD) return;
      if (velocity < SWIPE_VELOCITY) return;

      if (dx > 0 && prev) {
        router.push(prev.href);
      } else if (dx < 0 && next) {
        router.push(next.href);
      }
    }

    document.addEventListener("touchstart", handleTouchStart, { passive: true });
    document.addEventListener("touchend", handleTouchEnd, { passive: true });
    return () => {
      document.removeEventListener("touchstart", handleTouchStart);
      document.removeEventListener("touchend", handleTouchEnd);
    };
  }, [pathname, router]);

  return null;
}
