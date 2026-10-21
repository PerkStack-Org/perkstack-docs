import type { Metadata } from "next";
import Link from "next/link";
import { changelog, changeTypeLabel, type ChangeType, type ChangelogEntry } from "@/lib/changelog";

export const metadata: Metadata = {
  title: "Changelog",
  description: "What's new and what changed in PerkStack, newest first.",
};

const typeClass: Record<ChangeType, string> = {
  new: "text-ps-accent",
  improved: "text-lp-text-secondary",
  fixed: "text-lp-text-secondary",
};

function formatDate(date: string, opts: Intl.DateTimeFormatOptions): string {
  return new Date(`${date}T00:00:00Z`).toLocaleDateString("en-US", { timeZone: "UTC", ...opts });
}

function groupByMonth(entries: ChangelogEntry[]): [string, ChangelogEntry[]][] {
  const groups = new Map<string, ChangelogEntry[]>();
  for (const entry of entries) {
    const month = formatDate(entry.date, { month: "long", year: "numeric" });
    groups.set(month, [...(groups.get(month) ?? []), entry]);
  }
  return [...groups.entries()];
}

export default function ChangelogPage() {
  const sorted = [...changelog].sort((a, b) => b.date.localeCompare(a.date));

  return (
    <div className="docs-prose">
      <h1>Changelog</h1>
      <p>
        Everything new and changed in PerkStack, newest first. Each change is live for every shop on
        the date shown.
      </p>

      {groupByMonth(sorted).map(([month, entries]) => (
        <section key={month}>
          <h2>{month}</h2>
          {entries.map((entry) => (
            <article
              key={`${entry.date}-${entry.title}`}
              className="py-4 border-b border-lp-border-muted"
            >
              <p className="!mb-1 text-[13px] text-lp-text-muted">
                <span className={`font-semibold ${typeClass[entry.type]}`}>
                  {changeTypeLabel[entry.type]}
                </span>
                {" · "}
                {entry.area}
                {" · "}
                <time dateTime={entry.date}>
                  {formatDate(entry.date, { month: "short", day: "numeric" })}
                </time>
              </p>
              <h3 className="!mt-0">{entry.title}</h3>
              <p className="!mb-0">
                {entry.summary}
                {entry.docsHref && (
                  <>
                    {" "}
                    <Link href={entry.docsHref}>Read the docs</Link>
                  </>
                )}
              </p>
            </article>
          ))}
        </section>
      ))}
    </div>
  );
}
