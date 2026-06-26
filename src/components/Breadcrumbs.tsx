"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { getBreadcrumbs } from "@/lib/docs-helpers";
import { SITE_URL } from "@/lib/seo";
import { ChevronRight } from "lucide-react";

export default function Breadcrumbs() {
  const pathname = usePathname();
  const crumbs = getBreadcrumbs(pathname);

  if (crumbs.length <= 1) return null;

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((crumb, i) => {
      const url = crumb.href ?? (i === crumbs.length - 1 ? pathname : undefined);
      return {
        "@type": "ListItem",
        position: i + 1,
        name: crumb.label,
        ...(url ? { item: `${SITE_URL}${url}` } : {}),
      };
    }),
  };

  return (
    <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1 mb-6 text-[13px]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {crumbs.map((crumb, i) => {
        const isLast = i === crumbs.length - 1;
        return (
          <span key={i} className="flex items-center gap-1">
            {i > 0 && <ChevronRight size={12} className="text-lp-text-muted/50" />}
            {crumb.href && !isLast ? (
              <Link
                href={crumb.href}
                className="text-lp-text-muted hover:text-ps-accent transition-colors"
              >
                {crumb.label}
              </Link>
            ) : (
              <span className={isLast ? "text-lp-text font-medium" : "text-lp-text-muted"}>
                {crumb.label}
              </span>
            )}
          </span>
        );
      })}
    </nav>
  );
}
