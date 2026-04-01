"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import {
  Search,
  ArrowRight,
  FileText,
  Moon,
  Sun,
  Monitor,
  Copy,
  ArrowUp,
  ExternalLink,
  Keyboard,
  Clock,
  Star,
  Printer,
  Shuffle,
  Hash,
  Link,
  PanelLeftClose,
  Maximize2,
  AArrowUp,
  AArrowDown,
  BarChart3,
  Eye,
  EyeOff,
  MessageSquare,
  Type,
  Bookmark,
} from "lucide-react";
import Fuse from "fuse.js";
import { buildSearchIndex, type SearchEntry } from "@/lib/navigation";
import { searchContent } from "@/lib/search-content";
import { flattenNavigation } from "@/lib/docs-helpers";
import { useTheme } from "./ThemeProvider";
import { useUIPreferences } from "./UIPreferencesProvider";
import { useToast } from "./Toast";
import { showContextMenu, type ContextMenuItem } from "./ContextMenu";
import {
  getFavorites,
  toggleFavorite,
  isFavorite,
  getReadLater,
  toggleReadLater,
  isReadLater,
} from "@/lib/favorites";

const RECENT_KEY = "perkstack-docs-recent-searches";
const MAX_RECENT = 5;

interface ActionEntry {
  id: string;
  title: string;
  icon: React.ReactNode;
  section: "action";
  onSelect: () => void;
}

function getRecentSearches(): string[] {
  try {
    const stored = localStorage.getItem(RECENT_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

function addRecentSearch(query: string) {
  const trimmed = query.trim();
  if (!trimmed) return;
  try {
    const recent = getRecentSearches().filter((r) => r !== trimmed);
    recent.unshift(trimmed);
    localStorage.setItem(RECENT_KEY, JSON.stringify(recent.slice(0, MAX_RECENT)));
  } catch {}
}

const popularPages: SearchEntry[] = [
  { title: "Introduction", href: "/docs/getting-started/introduction", section: "Getting Started" },
  { title: "Earn Rules", href: "/docs/loyalty/earn-rules", section: "Loyalty Program" },
  { title: "Review Display", href: "/docs/widgets/review-display", section: "Storefront Widgets" },
  { title: "Webhooks", href: "/docs/advanced/webhooks", section: "Advanced" },
  { title: "Billing & Plans", href: "/docs/settings/billing", section: "Settings" },
];

export default function SearchDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const router = useRouter();
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const {
    focusMode,
    toggleFocusMode,
    increaseFontSize,
    decreaseFontSize,
    resetFontSize,
    showReadingProgress,
    toggleReadingProgress,
  } = useUIPreferences();
  const toast = useToast();
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);

  useEffect(() => {
    if (open) setRecentSearches(getRecentSearches());
  }, [open]);

  const allEntries = useMemo(() => {
    const navEntries = buildSearchIndex();
    return [...navEntries, ...searchContent];
  }, []);

  const fuse = useMemo(
    () =>
      new Fuse(allEntries, {
        keys: [
          { name: "title", weight: 0.5 },
          { name: "section", weight: 0.2 },
          { name: "description", weight: 0.3 },
        ],
        threshold: 0.4,
        includeScore: true,
      }),
    [allEntries],
  );

  const actions = useMemo<ActionEntry[]>(() => {
    const a: ActionEntry[] = [
      // Theme
      {
        id: "theme-light",
        title: `Switch to Light mode${theme === "light" ? " (active)" : ""}`,
        icon: <Sun size={16} className={theme === "light" ? "text-warning" : ""} />,
        section: "action",
        onSelect: () => setTheme("light"),
      },
      {
        id: "theme-dark",
        title: `Switch to Dark mode${theme === "dark" ? " (active)" : ""}`,
        icon: <Moon size={16} className={theme === "dark" ? "text-ps-accent-light" : ""} />,
        section: "action",
        onSelect: () => setTheme("dark"),
      },
      {
        id: "theme-system",
        title: `Switch to System theme${theme === "system" ? " (active)" : ""}`,
        icon: <Monitor size={16} className={theme === "system" ? "text-info" : ""} />,
        section: "action",
        onSelect: () => setTheme("system"),
      },
      // Navigation
      {
        id: "go-to-section",
        title: "Go to section... (type # to search headings)",
        icon: <Hash size={16} />,
        section: "action",
        onSelect: () => setQuery("#"),
      },
      {
        id: "random-page",
        title: "Random page",
        icon: <Shuffle size={16} />,
        section: "action",
        onSelect: () => {
          const pages = flattenNavigation();
          const random = pages[Math.floor(Math.random() * pages.length)];
          if (random) router.push(random.href);
          onClose();
        },
      },
      {
        id: "scroll-top",
        title: "Jump to top of page",
        icon: <ArrowUp size={16} />,
        section: "action",
        onSelect: () => {
          window.scrollTo({ top: 0, behavior: "smooth" });
          onClose();
        },
      },
      // Clipboard
      {
        id: "copy-url",
        title: "Copy current page URL",
        icon: <Copy size={16} />,
        section: "action",
        onSelect: () => {
          navigator.clipboard.writeText(window.location.href);
          toast.show("Copied!", "Page URL copied to clipboard");
          onClose();
        },
      },
      {
        id: "copy-title",
        title: "Copy page title",
        icon: <Type size={16} />,
        section: "action",
        onSelect: () => {
          const title = document.querySelector(".docs-prose h1")?.textContent ?? document.title;
          navigator.clipboard.writeText(title);
          toast.show("Copied!", `"${title}"`);
          onClose();
        },
      },
      {
        id: "copy-md-link",
        title: "Copy page as Markdown link",
        icon: <Link size={16} />,
        section: "action",
        onSelect: () => {
          const title = document.querySelector(".docs-prose h1")?.textContent ?? document.title;
          const md = `[${title}](${window.location.href})`;
          navigator.clipboard.writeText(md);
          toast.show("Copied!", md);
          onClose();
        },
      },
      // View controls
      {
        id: "focus-mode",
        title: `${focusMode ? "Exit" : "Enter"} focus mode`,
        icon: focusMode ? <Maximize2 size={16} /> : <PanelLeftClose size={16} />,
        section: "action",
        onSelect: () => {
          toggleFocusMode();
          onClose();
        },
      },
      {
        id: "toggle-progress",
        title: `${showReadingProgress ? "Hide" : "Show"} reading progress bar`,
        icon: showReadingProgress ? <EyeOff size={16} /> : <Eye size={16} />,
        section: "action",
        onSelect: () => {
          toggleReadingProgress();
          onClose();
        },
      },
      {
        id: "font-increase",
        title: "Increase font size",
        icon: <AArrowUp size={16} />,
        section: "action",
        onSelect: () => {
          increaseFontSize();
          onClose();
        },
      },
      {
        id: "font-decrease",
        title: "Decrease font size",
        icon: <AArrowDown size={16} />,
        section: "action",
        onSelect: () => {
          decreaseFontSize();
          onClose();
        },
      },
      {
        id: "font-reset",
        title: "Reset font size",
        icon: <Type size={16} />,
        section: "action",
        onSelect: () => {
          resetFontSize();
          onClose();
        },
      },
      // Utility
      {
        id: "print",
        title: "Print this page",
        icon: <Printer size={16} />,
        section: "action",
        onSelect: () => {
          onClose();
          setTimeout(() => window.print(), 200);
        },
      },
      {
        id: "stats",
        title: "Stats for nerds",
        icon: <BarChart3 size={16} />,
        section: "action",
        onSelect: () => {
          const prose = document.querySelector(".docs-prose");
          const text = prose?.textContent ?? "";
          const words = text.split(/\s+/).filter(Boolean).length;
          const headings = prose?.querySelectorAll("h2, h3").length ?? 0;
          const images = prose?.querySelectorAll("img").length ?? 0;
          const codeBlocks = prose?.querySelectorAll("pre").length ?? 0;
          const readMin = Math.max(1, Math.ceil(words / 225));
          toast.show(
            "Page Stats",
            `${words.toLocaleString()} words · ${readMin} min read\n${headings} sections · ${images} images · ${codeBlocks} code blocks`,
          );
          onClose();
        },
      },
      {
        id: "shortcuts",
        title: "Show keyboard shortcuts",
        icon: <Keyboard size={16} />,
        section: "action",
        onSelect: () => {
          onClose();
          setTimeout(() => {
            window.dispatchEvent(new KeyboardEvent("keydown", { key: "?" }));
          }, 100);
        },
      },
      {
        id: "report-issue",
        title: "Report an issue with this page",
        icon: <MessageSquare size={16} />,
        section: "action",
        onSelect: () => {
          const title = document.querySelector(".docs-prose h1")?.textContent ?? "";
          const url = `mailto:hello@perk-stack.com?subject=${encodeURIComponent(`Docs feedback: ${title}`)}&body=${encodeURIComponent(`Page: ${window.location.href}\n\nFeedback:\n`)}`;
          window.open(url);
          onClose();
        },
      },
      // External links
      {
        id: "website",
        title: "Go to PerkStack website",
        icon: <ExternalLink size={16} />,
        section: "action",
        onSelect: () => {
          window.open("https://perk-stack.com", "_blank");
          onClose();
        },
      },
      {
        id: "shopify-admin",
        title: "Open Shopify admin",
        icon: <ExternalLink size={16} />,
        section: "action",
        onSelect: () => {
          window.open("https://admin.shopify.com", "_blank");
          onClose();
        },
      },
      {
        id: "shopify-app",
        title: "Go to Shopify App Store",
        icon: <ExternalLink size={16} />,
        section: "action",
        onSelect: () => {
          window.open("https://apps.shopify.com", "_blank");
          onClose();
        },
      },
      {
        id: "contact-support",
        title: "Contact support",
        icon: <MessageSquare size={16} />,
        section: "action",
        onSelect: () => {
          window.open("mailto:hello@perk-stack.com", "_blank");
          onClose();
        },
      },
    ];
    return a;
  }, [
    theme,
    setTheme,
    onClose,
    router,
    focusMode,
    toggleFocusMode,
    showReadingProgress,
    toggleReadingProgress,
    increaseFontSize,
    decreaseFontSize,
    resetFontSize,
    toast,
  ]);

  type ResultItem =
    | { type: "page"; entry: SearchEntry }
    | { type: "action"; entry: ActionEntry }
    | { type: "recent"; query: string }
    | { type: "favorite"; entry: SearchEntry }
    | { type: "readlater"; entry: SearchEntry };

  const headingSections = useMemo(() => {
    if (typeof document === "undefined") return [];
    const prose = document.querySelector(".docs-prose");
    if (!prose) return [];
    const headings = prose.querySelectorAll("h2, h3");
    return Array.from(headings).map((h) => ({
      id: h.id,
      text: h.textContent?.trim() ?? "",
      level: h.tagName,
    }));
  }, [open, pathname]);

  const results = useMemo<ResultItem[]>(() => {
    const trimmed = query.trim();

    if (trimmed.startsWith("#")) {
      const term = trimmed.slice(1).toLowerCase();
      const filtered = headingSections.filter((h) => h.text.toLowerCase().includes(term));
      return filtered.map((h) => ({
        type: "page" as const,
        entry: {
          title: `${h.level === "H3" ? "  " : ""}${h.text}`,
          href: `#${h.id}`,
          section: "On this page",
        },
      }));
    }

    if (!trimmed) {
      const items: ResultItem[] = [];
      recentSearches.forEach((q) => items.push({ type: "recent", query: q }));

      const favs = getFavorites();
      favs.slice(0, 5).forEach((f) =>
        items.push({
          type: "favorite",
          entry: { title: f.title, href: f.href, section: f.section },
        }),
      );

      const rl = getReadLater();
      rl.slice(0, 5).forEach((r) =>
        items.push({
          type: "readlater",
          entry: { title: r.title, href: r.href, section: r.section },
        }),
      );

      popularPages.forEach((entry) => items.push({ type: "page", entry }));
      actions.forEach((entry) => items.push({ type: "action", entry }));
      return items;
    }

    const q = query.toLowerCase();
    const pageResults = fuse
      .search(query)
      .slice(0, 8)
      .map((r) => r.item);
    const actionResults = actions.filter((a) => a.title.toLowerCase().includes(q));

    const items: ResultItem[] = [];
    pageResults.forEach((entry) => items.push({ type: "page", entry }));
    actionResults.forEach((entry) => items.push({ type: "action", entry }));
    return items;
  }, [query, fuse, actions, recentSearches, headingSections]);

  useEffect(() => {
    setActiveIndex(0);
  }, [query]);

  useEffect(() => {
    if (open) {
      setQuery("");
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [open]);

  const selectItem = useCallback(
    (item: ResultItem) => {
      if (item.type === "page" || item.type === "favorite" || item.type === "readlater") {
        if (item.entry.href.startsWith("#")) {
          const el = document.getElementById(item.entry.href.slice(1));
          if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
          onClose();
        } else {
          addRecentSearch(query || item.entry.title);
          const highlight =
            query.trim() && !query.startsWith("#")
              ? `?highlight=${encodeURIComponent(query.trim())}`
              : "";
          router.push(item.entry.href + highlight);
          onClose();
        }
      } else if (item.type === "action") {
        item.entry.onSelect();
      } else if (item.type === "recent") {
        setQuery(item.query);
      }
    },
    [router, onClose, query],
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setActiveIndex((i) => {
          const next = Math.min(i + 1, results.length - 1);
          scrollToIndex(next);
          return next;
        });
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setActiveIndex((i) => {
          const next = Math.max(i - 1, 0);
          scrollToIndex(next);
          return next;
        });
      } else if (e.key === "Enter" && results[activeIndex]) {
        selectItem(results[activeIndex]);
      } else if (e.key === "Escape") {
        onClose();
      }
    },
    [results, activeIndex, selectItem, onClose],
  );

  const scrollToIndex = (index: number) => {
    const list = listRef.current;
    if (!list) return;
    const items = list.querySelectorAll("[data-result-item]");
    items[index]?.scrollIntoView({ block: "nearest" });
  };

  const handleResultContextMenu = useCallback(
    (e: React.MouseEvent, item: ResultItem) => {
      if (item.type !== "page" || item.entry.href.startsWith("#")) return;
      e.preventDefault();

      const { href, title, section } = item.entry;
      const page = { href, title, section };
      const fav = isFavorite(href);
      const rl = isReadLater(href);

      const ctxItems: ContextMenuItem[] = [
        {
          id: "fav",
          label: fav ? "Remove from favorites" : "Add to favorites",
          icon: <Star size={13} className={fav ? "text-warning fill-warning" : ""} />,
          onSelect: () => {
            const added = toggleFavorite(page);
            toast.show(added ? "Added to favorites" : "Removed from favorites", title);
          },
        },
        {
          id: "read-later",
          label: rl ? "Remove from read later" : "Read later",
          icon: <FileText size={13} className={rl ? "text-ps-accent" : ""} />,
          onSelect: () => {
            const added = toggleReadLater(page);
            toast.show(added ? "Added to read later" : "Removed from read later", title);
          },
        },
        {
          id: "copy-link",
          label: "Copy link",
          icon: <Link size={13} />,
          divider: true,
          onSelect: () => {
            navigator.clipboard.writeText(`${window.location.origin}${href}`);
            toast.show("Copied!", "Link copied to clipboard");
          },
        },
        {
          id: "copy-md",
          label: "Copy as Markdown",
          icon: <Copy size={13} />,
          onSelect: () => {
            navigator.clipboard.writeText(`[${title}](${window.location.origin}${href})`);
            toast.show("Copied!", `[${title}](...)`);
          },
        },
        {
          id: "new-tab",
          label: "Open in new tab",
          icon: <ExternalLink size={13} />,
          divider: true,
          onSelect: () => window.open(href, "_blank"),
        },
      ];

      showContextMenu(e.clientX, e.clientY, ctxItems);
    },
    [toast],
  );

  if (!open) return null;

  const getSectionLabel = (items: ResultItem[], index: number): string | null => {
    const current = items[index];
    const prev = index > 0 ? items[index - 1] : null;

    if (current.type === "recent" && prev?.type !== "recent") return "Recent";
    if (current.type === "favorite" && prev?.type !== "favorite") return "Favorites";
    if (current.type === "readlater" && prev?.type !== "readlater") return "Read Later";
    if (current.type === "page" && prev?.type !== "page") {
      return query.trim() ? "Pages" : "Popular";
    }
    if (current.type === "action" && prev?.type !== "action") return "Actions";
    return null;
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50" onClick={onClose} />
      <div className="fixed top-[12vh] left-1/2 -translate-x-1/2 w-full max-w-lg z-50 px-4">
        <div className="bg-lp-surface border border-lp-border-muted rounded-2xl shadow-2xl overflow-hidden backdrop-blur-md">
          <div className="flex items-center gap-3 px-4 border-b border-lp-border-muted">
            <Search size={18} className="text-lp-text-muted flex-shrink-0" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Search docs, jump to page, run action..."
              className="flex-1 h-12 text-sm bg-transparent outline-none text-lp-text placeholder:text-lp-text-muted"
            />
            <kbd className="text-[11px] text-lp-text-muted border border-lp-border-muted rounded px-1.5 py-0.5 bg-lp-bg-alt">
              ESC
            </kbd>
          </div>

          <div ref={listRef} className="max-h-[360px] overflow-y-auto">
            {results.length === 0 ? (
              <div className="px-4 py-8 text-center text-sm text-lp-text-muted">
                No results for &ldquo;{query}&rdquo;
              </div>
            ) : (
              <div className="py-1">
                {results.map((item, idx) => {
                  const sectionLabel = getSectionLabel(results, idx);

                  return (
                    <div key={`${item.type}-${idx}`}>
                      {sectionLabel && (
                        <div className="px-4 pt-3 pb-1 text-[11px] font-semibold uppercase tracking-wider text-lp-text-muted">
                          {sectionLabel}
                        </div>
                      )}
                      <button
                        data-result-item
                        onClick={() => selectItem(item)}
                        onMouseEnter={() => setActiveIndex(idx)}
                        onContextMenu={(e) => handleResultContextMenu(e, item)}
                        className={`flex items-center gap-3 w-full px-4 py-2.5 text-left transition-colors ${
                          idx === activeIndex ? "bg-sidebar-active" : "hover:bg-lp-bg-alt"
                        }`}
                      >
                        <span className="flex-shrink-0 text-lp-text-muted">
                          {item.type === "page" && <FileText size={16} />}
                          {item.type === "favorite" && <Star size={16} className="text-warning" />}
                          {item.type === "readlater" && (
                            <Bookmark size={16} className="text-ps-accent" />
                          )}
                          {item.type === "action" && item.entry.icon}
                          {item.type === "recent" && <Clock size={16} />}
                        </span>
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-medium text-lp-text truncate">
                            {(item.type === "page" ||
                              item.type === "favorite" ||
                              item.type === "readlater") &&
                              item.entry.title}
                            {item.type === "action" && item.entry.title}
                            {item.type === "recent" && item.query}
                          </div>
                          {(item.type === "page" ||
                            item.type === "favorite" ||
                            item.type === "readlater") && (
                            <div className="text-xs text-lp-text-muted truncate">
                              {item.entry.section}
                              {item.entry.description && ` · ${item.entry.description}`}
                            </div>
                          )}
                        </div>
                        {idx === activeIndex && (
                          <ArrowRight size={14} className="text-ps-accent flex-shrink-0" />
                        )}
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          <div className="flex items-center gap-4 px-4 py-2.5 border-t border-lp-border-muted text-[11px] text-lp-text-muted">
            <span>
              <kbd className="font-mono">↑↓</kbd> navigate
            </span>
            <span>
              <kbd className="font-mono">↵</kbd> select
            </span>
            <span>
              <kbd className="font-mono">esc</kbd> close
            </span>
            <span className="ml-auto">
              <kbd className="font-mono">?</kbd> shortcuts
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
