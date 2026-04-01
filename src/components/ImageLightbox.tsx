"use client";

import { useEffect, useState, useCallback } from "react";
import { usePathname } from "next/navigation";
import { X } from "lucide-react";

export default function ImageLightbox() {
  const pathname = usePathname();
  const [src, setSrc] = useState<string | null>(null);
  const [alt, setAlt] = useState("");

  const handleClose = useCallback(() => setSrc(null), []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape" && src) handleClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [src, handleClose]);

  useEffect(() => {
    const timer = setTimeout(() => {
      const prose = document.querySelector(".docs-prose");
      if (!prose) return;

      prose.querySelectorAll("img:not([data-lightbox-bound])").forEach((img) => {
        const el = img as HTMLImageElement;
        el.setAttribute("data-lightbox-bound", "true");
        el.style.cursor = "zoom-in";

        const wrapper = document.createElement("div");
        wrapper.className = "lightbox-trigger-wrap";

        const indicator = document.createElement("span");
        indicator.className = "lightbox-zoom-indicator";
        indicator.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/></svg>`;

        el.parentNode?.insertBefore(wrapper, el);
        wrapper.appendChild(el);
        wrapper.appendChild(indicator);

        wrapper.addEventListener("click", () => {
          setSrc(el.src);
          setAlt(el.alt);
        });
      });
    }, 200);

    return () => clearTimeout(timer);
  }, [pathname]);

  if (!src) return null;

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 backdrop-blur-sm animate-in"
      onClick={handleClose}
    >
      <button
        onClick={handleClose}
        className="absolute top-4 right-4 p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
        aria-label="Close lightbox"
      >
        <X size={20} />
      </button>
      <img
        src={src}
        alt={alt}
        className="max-w-[90vw] max-h-[85vh] rounded-lg shadow-2xl object-contain"
        onClick={(e) => e.stopPropagation()}
      />
    </div>
  );
}
