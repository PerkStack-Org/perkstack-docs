import { navigation } from "./navigation";

export interface FlatNavItem {
  title: string;
  href: string;
  section: string;
}

export function flattenNavigation(): FlatNavItem[] {
  const items: FlatNavItem[] = [];
  for (const group of navigation) {
    for (const item of group.children ?? []) {
      if (item.href) {
        items.push({ title: item.title, href: item.href, section: group.title });
      }
    }
  }
  return items;
}

export function getPrevNext(pathname: string): {
  prev: FlatNavItem | null;
  next: FlatNavItem | null;
} {
  const flat = flattenNavigation();
  const idx = flat.findIndex((item) => item.href === pathname);
  if (idx === -1) return { prev: null, next: null };
  return {
    prev: idx > 0 ? flat[idx - 1] : null,
    next: idx < flat.length - 1 ? flat[idx + 1] : null,
  };
}

export function getBreadcrumbs(pathname: string): { label: string; href?: string }[] {
  for (const group of navigation) {
    for (const item of group.children ?? []) {
      if (item.href === pathname) {
        return [
          { label: "Docs", href: "/docs/getting-started/introduction" },
          { label: group.title },
          { label: item.title },
        ];
      }
    }
  }
  return [{ label: "Docs", href: "/docs/getting-started/introduction" }];
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}
