// Checks every entry in src/content/changelog.json against the wording rules
// (no em/en dashes, no hype or AI filler, short and plain). Exits 1 on problems.
//
// Usage: node scripts/changelog/lint.mjs

import fs from "node:fs";
import { lintNote } from "./trello.mjs";

const entries = JSON.parse(fs.readFileSync("src/content/changelog.json", "utf8"));
let failed = 0;
for (const entry of entries) {
  const problems = lintNote(entry);
  if (problems.length) {
    failed++;
    console.error(`${entry.date} "${entry.title}": ${problems.join("; ")}`);
  }
}
console.log(failed ? `${failed} entr${failed === 1 ? "y needs" : "ies need"} rewording` : `${entries.length} entries pass`);
process.exit(failed ? 1 : 0);
