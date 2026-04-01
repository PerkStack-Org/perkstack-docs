"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function CodeBlockCopy() {
  const pathname = usePathname();

  useEffect(() => {
    const timer = setTimeout(() => {
      const prose = document.querySelector(".docs-prose");
      if (!prose) return;

      prose.querySelectorAll("pre:not([data-copy-bound])").forEach((pre) => {
        pre.setAttribute("data-copy-bound", "true");

        const wrapper = document.createElement("div");
        wrapper.className = "code-block-wrapper";

        pre.parentNode?.insertBefore(wrapper, pre);
        wrapper.appendChild(pre);

        const btn = document.createElement("button");
        btn.className = "code-copy-btn";
        btn.setAttribute("aria-label", "Copy code");
        btn.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>`;

        btn.addEventListener("click", () => {
          const code = pre.querySelector("code")?.textContent ?? pre.textContent ?? "";
          navigator.clipboard.writeText(code).then(() => {
            btn.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>`;
            btn.classList.add("copied");
            setTimeout(() => {
              btn.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>`;
              btn.classList.remove("copied");
            }, 2000);
          });
        });

        wrapper.appendChild(btn);
      });
    }, 200);

    return () => clearTimeout(timer);
  }, [pathname]);

  return null;
}
