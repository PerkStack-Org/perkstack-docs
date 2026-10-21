import entries from "@/content/changelog.json";

/**
 * Customer-facing changelog, read from src/content/changelog.json.
 *
 * Entries are added by scripts/changelog/collect.mjs from Trello cards in the
 * "Deployed" column (each card's "Customer changelog" note), arrive as a PR,
 * and go live when the PR merges. Hand-written entries are fine too: write for
 * merchants, and point `docsHref` at an existing docs page.
 */

export type ChangeType = "new" | "improved" | "fixed";

export type ChangeArea = "Loyalty" | "Reviews" | "Storefront" | "Integrations" | "Admin";

export interface ChangelogEntry {
  /** Release date, YYYY-MM-DD. */
  date: string;
  type: ChangeType;
  area: ChangeArea;
  title: string;
  summary: string;
  docsHref?: string;
  /** Trello card id the entry came from; used to avoid adding it twice. Never shown. */
  trelloCard?: string;
}

export const changeTypeLabel: Record<ChangeType, string> = {
  new: "New",
  improved: "Improved",
  fixed: "Fixed",
};

export const changelog = entries as ChangelogEntry[];
