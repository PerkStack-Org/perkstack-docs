"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { slugify } from "@/lib/docs-helpers";

export default function HeadingAnchors() {
  const pathname = usePathname();

  useEffect(() => {
    const timer = setTimeout(() => {
      const prose = document.querySelector(".docs-prose");
      if (!prose) return;

      prose.querySelectorAll("h2, h3").forEach((heading) => {
        if (heading.querySelector(".heading-anchor")) return;

        let id = heading.id;
        if (!id) {
          id = slugify(heading.textContent?.trim() ?? "");
          heading.id = id;
        }

        heading.classList.add("heading-with-anchor");

        const anchor = document.createElement("a");
        anchor.href = `#${id}`;
        anchor.className = "heading-anchor";
        anchor.setAttribute("aria-label", `Link to "${heading.textContent?.trim()}"`);
        anchor.textContent = "#";
        anchor.addEventListener("click", (e) => {
          e.preventDefault();
          const url = `${window.location.origin}${window.location.pathname}#${id}`;
          navigator.clipboard.writeText(url);
          anchor.classList.add("copied");
          setTimeout(() => anchor.classList.remove("copied"), 1500);
          document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
          window.history.replaceState(null, "", `#${id}`);
        });

        heading.appendChild(anchor);
      });
    }, 150);

    return () => clearTimeout(timer);
  }, [pathname]);

  return null;
}
