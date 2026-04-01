"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setVisible(window.scrollY > 400);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="fixed bottom-6 right-6 z-40 flex items-center justify-center w-10 h-10 rounded-full border border-lp-border-muted bg-lp-surface/90 backdrop-blur-md text-lp-text-secondary hover:text-ps-accent hover:border-ps-accent-lighter shadow-lg hover:shadow-xl transition-all duration-200 animate-in"
      aria-label="Scroll to top"
    >
      <ArrowUp size={16} />
    </button>
  );
}
