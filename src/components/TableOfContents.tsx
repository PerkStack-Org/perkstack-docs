"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { usePathname } from "next/navigation";
import { slugify } from "@/lib/docs-helpers";
import { List, ChevronDown } from "lucide-react";

interface TocItem {
  id: string;
  text: string;
  level: 2 | 3;
}

function useTocItems() {
  const pathname = usePathname();
  const [items, setItems] = useState<TocItem[]>([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      const prose = document.querySelector(".docs-prose");
      if (!prose) return;

      const headings = prose.querySelectorAll("h2, h3");
      const collected: TocItem[] = [];

      headings.forEach((heading) => {
        const text = heading.textContent?.trim() ?? "";
        if (!text) return;

        let id = heading.id;
        if (!id) {
          id = slugify(text);
          heading.id = id;
        }

        collected.push({
          id,
          text,
          level: heading.tagName === "H2" ? 2 : 3,
        });
      });

      setItems(collected);
    }, 100);

    return () => clearTimeout(timer);
  }, [pathname]);

  return items;
}

function useActiveId(ids: string[]) {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    if (ids.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: "-80px 0px -60% 0px", threshold: 0 },
    );

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [ids]);

  return activeId;
}

export function DesktopTableOfContents() {
  const items = useTocItems();
  const activeId = useActiveId(items.map((i) => i.id));

  if (items.length < 2) return null;

  return (
    <nav aria-label="Table of contents" className="w-56">
      <h4 className="text-[11px] font-semibold uppercase tracking-wider text-lp-text-muted mb-3">
        On this page
      </h4>
      <ul className="space-y-0.5 border-l border-lp-border-muted">
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className={`block text-[13px] leading-snug py-1 transition-colors border-l-2 -ml-px ${
                item.level === 3 ? "pl-5" : "pl-3"
              } ${
                activeId === item.id
                  ? "border-ps-accent text-ps-accent font-medium"
                  : "border-transparent text-lp-text-muted hover:text-lp-text hover:border-lp-border"
              }`}
            >
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export function MobileTableOfContents() {
  const items = useTocItems();
  const activeId = useActiveId(items.map((i) => i.id));
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const handleClick = useCallback((id: string) => {
    setOpen(false);
    const el = document.getElementById(id);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 88;
      window.scrollTo({ top, behavior: "smooth" });
    }
  }, []);

  useEffect(() => {
    if (!open) return;
    const onClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, [open]);

  if (items.length < 2) return null;

  const activeItem = items.find((i) => i.id === activeId);

  return (
    <div ref={ref} className="relative xl:hidden mb-4">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 w-full px-3 py-2 text-[13px] rounded-lg border border-lp-border-muted bg-lp-bg-alt hover:bg-sidebar-hover transition-colors text-lp-text-secondary"
      >
        <List size={14} />
        <span className="flex-1 text-left truncate">
          {activeItem ? activeItem.text : "On this page"}
        </span>
        <ChevronDown size={14} className={`transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-lp-surface border border-lp-border-muted rounded-lg shadow-lg z-20 max-h-64 overflow-y-auto backdrop-blur-md">
          <ul className="py-1">
            {items.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => handleClick(item.id)}
                  className={`block w-full text-left text-[13px] py-1.5 transition-colors ${
                    item.level === 3 ? "pl-7" : "pl-3"
                  } ${
                    activeId === item.id
                      ? "text-ps-accent font-medium bg-sidebar-active"
                      : "text-lp-text-secondary hover:text-lp-text hover:bg-sidebar-hover"
                  }`}
                >
                  {item.text}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
