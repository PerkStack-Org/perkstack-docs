// After a changelog PR merges: labels every Trello card that now has an entry
// in src/content/changelog.json with "In changelog", so it's never added twice.
//
// Usage: node scripts/changelog/mark-published.mjs
// Env:   TRELLO_KEY, TRELLO_TOKEN, TRELLO_BOARD

import fs from "node:fs";
import { trello, labelsByName } from "./trello.mjs";

async function main() {
  const entries = JSON.parse(fs.readFileSync("src/content/changelog.json", "utf8"));
  const label = (await labelsByName())["In changelog"];
  if (!label) throw new Error('No "In changelog" label on the board');

  let marked = 0;
  for (const id of new Set(entries.map((e) => e.trelloCard).filter(Boolean))) {
    const card = await trello("GET", `cards/${id}`, { fields: "name,idLabels" });
    if (card.idLabels.includes(label)) continue;
    await trello("POST", `cards/${id}/idLabels`, { value: label });
    console.log(`Labelled "${card.name}"`);
    marked++;
  }
  console.log(`${marked} card(s) labelled In changelog`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
