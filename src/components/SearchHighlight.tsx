"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

export default function SearchHighlight() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const highlight = searchParams.get("highlight");
    if (!highlight) return;

    const timer = setTimeout(() => {
      const prose = document.querySelector(".docs-prose");
      if (!prose) return;

      const walker = document.createTreeWalker(prose, NodeFilter.SHOW_TEXT);
      const term = highlight.toLowerCase();
      const matches: { node: Text; index: number }[] = [];

      let node: Text | null;
      while ((node = walker.nextNode() as Text | null)) {
        const idx = node.textContent?.toLowerCase().indexOf(term) ?? -1;
        if (idx !== -1) matches.push({ node, index: idx });
      }

      if (matches.length === 0) return;

      matches.slice(0, 10).forEach(({ node: textNode, index }) => {
        const range = document.createRange();
        range.setStart(textNode, index);
        range.setEnd(textNode, index + highlight.length);

        const mark = document.createElement("mark");
        mark.className = "search-highlight";
        range.surroundContents(mark);
      });

      matches[0].node.parentElement?.scrollIntoView({ behavior: "smooth", block: "center" });

      setTimeout(() => {
        document.querySelectorAll(".search-highlight").forEach((el) => {
          el.classList.add("search-highlight-fade");
          setTimeout(() => {
            const parent = el.parentNode;
            if (parent) {
              parent.replaceChild(document.createTextNode(el.textContent ?? ""), el);
              parent.normalize();
            }
          }, 2000);
        });
      }, 3000);
    }, 300);

    return () => clearTimeout(timer);
  }, [pathname, searchParams]);

  return null;
}
