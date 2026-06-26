import type { Metadata } from "next";

export const SITE_URL = "https://docs.perk-stack.com";
export const SITE_NAME = "PerkStack Docs";
export const OG_IMAGE = "/opengraph-image.png";

/**
 * Organization that publishes the docs (apex marketing site, not the docs host).
 */
export const ORGANIZATION = {
  name: "PerkStack",
  url: "https://perk-stack.com",
  logo: "https://perk-stack.com/perkstack-logo.svg",
} as const;

interface DocMetaInput {
  title: string;
  description?: string;
}

/**
 * Build a Metadata object for a single doc page.
 *
 * Adds a self-referencing canonical URL (resolved against `metadataBase`) and a
 * per-page OpenGraph/Twitter block so every exported page ships with complete
 * sharing + canonical signals without editing 50 files by hand.
 *
 * @param path  The page's own route, e.g. "/docs/getting-started/introduction".
 * @param meta  The page title and description.
 */
export function createDocMetadata(path: string, meta: DocMetaInput): Metadata {
  const { title, description } = meta;
  return {
    title,
    description,
    alternates: {
      canonical: path,
    },
    openGraph: {
      type: "article",
      siteName: SITE_NAME,
      url: path,
      title,
      description,
      images: [OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [OG_IMAGE],
    },
  };
}
