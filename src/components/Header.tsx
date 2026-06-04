"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, Menu, ExternalLink } from "lucide-react";
import { useSearch } from "./SearchProvider";
import { MobileSidebar } from "./Sidebar";
import ThemeToggle from "./ThemeToggle";
import ReadingProgress from "./ReadingProgress";

export default function Header() {
  const { open: openSearch } = useSearch();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 h-14 z-40 border-b border-lp-border-muted bg-lp-bg/80 backdrop-blur-md transition-colors duration-300">
        <div className="flex items-center justify-between h-full px-3 sm:px-4 lg:px-6">
          {/* Left group: hamburger + logo */}
          <div className="flex items-center gap-2 min-w-0">
            <button
              onClick={() => setMobileNavOpen(true)}
              className="lg:hidden flex items-center justify-center w-8 h-8 rounded-md text-lp-text-secondary hover:text-lp-text hover:bg-lp-bg-alt transition-colors flex-shrink-0"
              aria-label="Open navigation"
            >
              <Menu size={18} />
            </button>

            <Link
              href="/docs/getting-started/introduction"
              className="flex items-center gap-2 flex-shrink-0"
            >
              <img src="/perkstack.svg" alt="PerkStack" className="h-6 w-auto dark-invert" />
              <span className="text-[14px] font-semibold text-lp-text tracking-tight hidden sm:inline">
                PerkStack <span className="text-lp-text-muted font-normal">Docs</span>
              </span>
            </Link>
          </div>

          {/* Center: desktop search bar */}
          <button
            onClick={openSearch}
            className="hidden sm:flex items-center gap-2.5 flex-1 max-w-md h-8 px-3 mx-4 rounded-lg border border-lp-border-muted bg-lp-surface text-lp-text-muted text-sm hover:border-lp-border transition-all cursor-text"
          >
            <Search size={14} />
            <span className="flex-1 text-left text-[13px]">Search docs...</span>
            <kbd className="hidden md:inline-flex h-5 items-center gap-0.5 rounded border border-lp-border-muted bg-lp-bg-alt px-1.5 text-[10px] font-medium text-lp-text-muted">
              <span className="text-xs">⌘</span>K
            </kbd>
          </button>

          {/* Right group: actions */}
          <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
            <button
              onClick={openSearch}
              className="sm:hidden flex items-center justify-center w-8 h-8 rounded-md text-lp-text-secondary hover:text-lp-text hover:bg-lp-bg-alt transition-colors"
              aria-label="Search"
            >
              <Search size={16} />
            </button>
            <ThemeToggle />
            <a
              href="https://perk-stack.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden lg:flex items-center gap-1.5 text-[13px] text-lp-text-secondary hover:text-ps-accent transition-colors"
            >
              Website
              <ExternalLink size={11} />
            </a>
            <a
              href="https://blog.perk-stack.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden lg:flex items-center gap-1.5 text-[13px] text-lp-text-secondary hover:text-ps-accent transition-colors"
            >
              Blog
              <ExternalLink size={11} />
            </a>
            <a
              href="https://apps.shopify.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 text-[13px] font-medium text-white bg-gradient-to-r from-ps-accent to-ps-accent-light rounded-lg hover:shadow-md hover:shadow-ps-accent/20 transition-all"
            >
              Install App
            </a>
          </div>
        </div>

        <ReadingProgress />
      </header>

      <MobileSidebar open={mobileNavOpen} onClose={() => setMobileNavOpen(false)} />
    </>
  );
}
