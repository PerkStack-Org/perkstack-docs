import fs from "node:fs";
import path from "node:path";
import type { MetadataRoute } from "next";

export const dynamic = "force-static";

const BASE_URL = "https://docs.perk-stack.com";
const APP_DIR = path.join(process.cwd(), "src", "app");
const PAGE_FILES = new Set(["page.tsx", "page.mdx", "page.md"]);

type PageEntry = { route: string; lastModified: Date };

function collectPages(dir: string, entries: PageEntry[]): void {
  for (const name of fs.readdirSync(dir)) {
    const fullPath = path.join(dir, name);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      collectPages(fullPath, entries);
      continue;
    }

    if (!PAGE_FILES.has(name)) continue;

    // Strip the src/app prefix and the trailing /page.* segment.
    const relativeDir = path.relative(APP_DIR, dir);
    const route = relativeDir
      .split(path.sep)
      .filter((segment) => segment && !/^\(.*\)$/.test(segment)) // drop route groups
      .join("/");

    entries.push({ route, lastModified: stat.mtime });
  }
}

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: PageEntry[] = [];
  collectPages(APP_DIR, entries);

  return entries
    .filter(({ route }) => route !== "") // drop the redirect-only root "/"
    .map(({ route, lastModified }) => {
      // Section landing pages (depth 2, e.g. docs/getting-started/introduction)
      // get the highest priority; anything deeper is weighted slightly lower.
      const depth = route.split("/").length;
      return {
        url: `${BASE_URL}/${route}`,
        lastModified,
        changeFrequency: "weekly" as const,
        priority: depth > 3 ? 0.6 : 0.8,
      };
    })
    .sort((a, b) => a.url.localeCompare(b.url));
}
