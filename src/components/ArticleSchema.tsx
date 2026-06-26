"use client";

import { usePathname } from "next/navigation";
import { flattenNavigation } from "@/lib/docs-helpers";
import { ORGANIZATION, SITE_NAME, SITE_URL } from "@/lib/seo";

/**
 * Emits TechArticle structured data for the current doc page. Title/section are
 * resolved from the navigation source of truth via the current route, so the
 * schema stays in sync without wiring per-page metadata into the layout.
 */
export default function ArticleSchema() {
  const pathname = usePathname();
  const item = flattenNavigation().find((entry) => entry.href === pathname);
  if (!item) return null;

  const canonical = `${SITE_URL}${pathname}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: item.title,
    articleSection: item.section,
    inLanguage: "en",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": canonical,
    },
    isPartOf: {
      "@type": "WebSite",
      name: SITE_NAME,
      url: SITE_URL,
    },
    author: {
      "@type": "Organization",
      name: ORGANIZATION.name,
      url: ORGANIZATION.url,
    },
    publisher: {
      "@type": "Organization",
      name: ORGANIZATION.name,
      url: ORGANIZATION.url,
      logo: {
        "@type": "ImageObject",
        url: ORGANIZATION.logo,
      },
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
