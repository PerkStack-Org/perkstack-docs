// Generates public/llms.txt from the real doc pages on disk (same enumeration
// strategy as src/app/sitemap.ts) so the file can never drift from the routes
// that actually exist. Runs automatically via the "prebuild" npm script.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const DOCS_DIR = path.join(ROOT, "src", "app", "docs");
const OUT = path.join(ROOT, "public", "llms.txt");
const BASE_URL = "https://docs.perk-stack.com";

// Section folder -> human label + ordering, mirroring src/lib/navigation.ts.
const SECTIONS = [
  ["getting-started", "Getting Started"],
  ["dashboard", "Dashboard"],
  ["loyalty", "Loyalty Program"],
  ["reviews", "Product Reviews"],
  ["integrations", "Integrations"],
  ["widgets", "Storefront Widgets"],
  ["customers", "Customers"],
  ["settings", "Settings"],
  ["troubleshooting", "Troubleshooting"],
];

function extractString(src, key) {
  // Matches: key: "value"  (value may start on the next line, single literal)
  const re = new RegExp(`${key}\\s*:\\s*"((?:[^"\\\\]|\\\\.)*)"`);
  const m = src.match(re);
  return m ? m[1].replace(/\\"/g, '"') : "";
}

function collect(dir, out) {
  for (const name of fs.readdirSync(dir)) {
    const full = path.join(dir, name);
    if (fs.statSync(full).isDirectory()) collect(full, out);
    else if (name === "page.tsx") {
      const src = fs.readFileSync(full, "utf8");
      const route = "/docs/" + path.relative(DOCS_DIR, path.dirname(full)).split(path.sep).join("/");
      out.push({
        route,
        section: route.split("/")[2],
        title: extractString(src, "title"),
        description: extractString(src, "description"),
      });
    }
  }
}

const pages = [];
collect(DOCS_DIR, pages);

let body = "# PerkStack Documentation\n\n";
body +=
  "> Complete documentation for PerkStack, the loyalty points and product reviews platform for Shopify merchants. These docs cover setup, loyalty programs, reviews, storefront widgets, integrations, billing, and troubleshooting.\n";

// Any section folder present on disk but not in the ordered map above is
// appended (alphabetically) so a newly added section can never silently vanish
// from llms.txt. Deleted sections simply produce no items and are skipped.
const known = new Set(SECTIONS.map(([folder]) => folder));
const extras = [...new Set(pages.map((p) => p.section))]
  .filter((folder) => folder && !known.has(folder))
  .sort()
  .map((folder) => [folder, folder.replace(/(^|-)(\w)/g, (_, sep, c) => (sep ? " " : "") + c.toUpperCase())]);

for (const [folder, label] of [...SECTIONS, ...extras]) {
  const items = pages.filter((p) => p.section === folder).sort((a, b) => a.route.localeCompare(b.route));
  if (items.length === 0) continue;
  body += `\n## ${label}\n\n`;
  for (const p of items) {
    const desc = p.description ? `: ${p.description}` : "";
    body += `- [${p.title}](${BASE_URL}${p.route})${desc}\n`;
  }
}

body += "\n## More\n\n";
body += "- [PerkStack Website](https://perk-stack.com): Product site and Shopify app listing.\n";
body += "- [PerkStack Blog](https://blog.perk-stack.com): Guides, updates, and merchant tips.\n";

fs.writeFileSync(OUT, body);
console.log(`Wrote ${OUT} with ${pages.length} doc routes.`);
