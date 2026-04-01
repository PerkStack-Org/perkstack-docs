"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { getPrevNext } from "@/lib/docs-helpers";
import { ArrowLeft, ArrowRight } from "lucide-react";

export default function PrevNextNav() {
  const pathname = usePathname();
  const { prev, next } = getPrevNext(pathname);

  if (!prev && !next) return null;

  return (
    <nav
      aria-label="Page navigation"
      className="flex gap-3 mt-12 pt-8 border-t border-lp-border-muted"
    >
      {prev ? (
        <Link
          href={prev.href}
          className="group flex-1 flex flex-col gap-1 p-4 rounded-xl border border-lp-border-muted hover:border-ps-accent-lighter hover:bg-sidebar-active transition-all"
        >
          <span className="flex items-center gap-1.5 text-[12px] text-lp-text-muted">
            <ArrowLeft size={12} className="group-hover:-translate-x-0.5 transition-transform" />
            Previous
          </span>
          <span className="text-sm font-medium text-lp-text group-hover:text-ps-accent transition-colors">
            {prev.title}
          </span>
          <span className="text-[11px] text-lp-text-muted">{prev.section}</span>
        </Link>
      ) : (
        <div className="flex-1" />
      )}

      {next ? (
        <Link
          href={next.href}
          className="group flex-1 flex flex-col items-end gap-1 p-4 rounded-xl border border-lp-border-muted hover:border-ps-accent-lighter hover:bg-sidebar-active transition-all text-right"
        >
          <span className="flex items-center gap-1.5 text-[12px] text-lp-text-muted">
            Next
            <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
          </span>
          <span className="text-sm font-medium text-lp-text group-hover:text-ps-accent transition-colors">
            {next.title}
          </span>
          <span className="text-[11px] text-lp-text-muted">{next.section}</span>
        </Link>
      ) : (
        <div className="flex-1" />
      )}
    </nav>
  );
}
