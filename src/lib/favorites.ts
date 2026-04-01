const FAVORITES_KEY = "perkstack-docs-favorites";
const READ_LATER_KEY = "perkstack-docs-read-later";

export interface SavedPage {
  href: string;
  title: string;
  section: string;
  savedAt: number;
}

function load(key: string): SavedPage[] {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function save(key: string, pages: SavedPage[]) {
  try {
    localStorage.setItem(key, JSON.stringify(pages));
  } catch {}
}

export function getFavorites(): SavedPage[] {
  return load(FAVORITES_KEY);
}

export function addFavorite(page: Omit<SavedPage, "savedAt">) {
  const list = load(FAVORITES_KEY).filter((p) => p.href !== page.href);
  list.unshift({ ...page, savedAt: Date.now() });
  save(FAVORITES_KEY, list);
}

export function removeFavorite(href: string) {
  save(
    FAVORITES_KEY,
    load(FAVORITES_KEY).filter((p) => p.href !== href),
  );
}

export function isFavorite(href: string): boolean {
  return load(FAVORITES_KEY).some((p) => p.href === href);
}

export function toggleFavorite(page: Omit<SavedPage, "savedAt">): boolean {
  if (isFavorite(page.href)) {
    removeFavorite(page.href);
    return false;
  }
  addFavorite(page);
  return true;
}

export function getReadLater(): SavedPage[] {
  return load(READ_LATER_KEY);
}

export function addReadLater(page: Omit<SavedPage, "savedAt">) {
  const list = load(READ_LATER_KEY).filter((p) => p.href !== page.href);
  list.unshift({ ...page, savedAt: Date.now() });
  save(READ_LATER_KEY, list);
}

export function removeReadLater(href: string) {
  save(
    READ_LATER_KEY,
    load(READ_LATER_KEY).filter((p) => p.href !== href),
  );
}

export function isReadLater(href: string): boolean {
  return load(READ_LATER_KEY).some((p) => p.href === href);
}

export function toggleReadLater(page: Omit<SavedPage, "savedAt">): boolean {
  if (isReadLater(page.href)) {
    removeReadLater(page.href);
    return false;
  }
  addReadLater(page);
  return true;
}
