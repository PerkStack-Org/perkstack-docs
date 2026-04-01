"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function ScrollReveal() {
  const pathname = usePathname();

  useEffect(() => {
    const prose = document.querySelector(".docs-prose");
    if (!prose) return;

    const targets = prose.querySelectorAll(
      ":scope > h2, :scope > h3, :scope > table, :scope > .callout, :scope > .feature-grid, :scope > pre, :scope > .code-block-wrapper",
    );

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -40px 0px" },
    );

    targets.forEach((el) => {
      el.classList.add("reveal-target");
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, [pathname]);

  return null;
}
