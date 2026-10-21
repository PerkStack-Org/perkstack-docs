// Adds a changelog entry for every card in the Trello "Deployed" column that
// has a "Customer changelog" note and isn't in src/content/changelog.json yet.
// Cards labelled "Internal" or "In changelog" are skipped.
//
// Usage: node scripts/changelog/collect.mjs [--pr-body <file>]
// Env:   TRELLO_KEY, TRELLO_TOKEN, TRELLO_BOARD

import fs from "node:fs";
import { trello, listByName, labelsByName, cardsInList, parseNote, lintNote } from "./trello.mjs";

const FILE = "src/content/changelog.json";
const bodyArg = process.argv.indexOf("--pr-body");
const PR_BODY = bodyArg === -1 ? null : process.argv[bodyArg + 1];

// The Trello account the deploy workflows run as. Only its moves into Deployed
// count; a card someone dragged there by hand is skipped.
const BOT = process.env.TRELLO_BOT_MEMBER;

async function deployMove(cardId, deployedListId) {
  const actions = await trello("GET", `cards/${cardId}/actions`, {
    filter: "updateCard:idList,createCard",
    memberCreator_fields: "username",
  });
  const move = actions.find((a) => (a.data.listAfter ?? a.data.list)?.id === deployedListId);
  return {
    date: (move?.date ?? new Date().toISOString()).slice(0, 10),
    by: move?.memberCreator?.username,
  };
}

async function main() {
  const entries = JSON.parse(fs.readFileSync(FILE, "utf8"));
  const known = new Set(entries.map((e) => e.trelloCard).filter(Boolean));
  const labels = await labelsByName();
  const deployed = await listByName("Deployed");

  if (!BOT) console.warn("TRELLO_BOT_MEMBER not set: cards moved to Deployed by hand are not filtered out");

  const added = [];
  const skipped = [];
  for (const card of await cardsInList(deployed.id)) {
    if (card.idLabels.includes(labels.Internal) || card.idLabels.includes(labels["In changelog"])) continue;
    if (known.has(card.id)) continue;

    const move = await deployMove(card.id, deployed.id);
    if (BOT && move.by !== BOT) {
      skipped.push({ card, reason: `moved to Deployed by hand (${move.by ?? "unknown"}), not by a deploy` });
      continue;
    }
    const note = parseNote(card.desc);
    if (!note || note.invalid) {
      skipped.push({ card, reason: "no complete customer note on the card" });
      continue;
    }
    const problems = lintNote(note);
    if (problems.length) {
      skipped.push({ card, reason: `note needs rewording: ${problems.join("; ")}` });
      continue;
    }
    const entry = {
      date: move.date,
      type: note.type,
      area: note.area,
      title: note.title,
      summary: note.summary,
      ...(note.docsHref ? { docsHref: note.docsHref } : {}),
      trelloCard: card.id,
    };
    entries.push(entry);
    added.push({ entry, card, draft: note.draft });
  }

  entries.sort((a, b) => b.date.localeCompare(a.date));
  fs.writeFileSync(FILE, JSON.stringify(entries, null, 2) + "\n");

  const lines = [`Adds ${added.length} changelog entr${added.length === 1 ? "y" : "ies"} from Trello cards in Deployed.`, ""];
  for (const { entry, card, draft } of added) {
    lines.push(`- **${entry.title}** (${entry.type}, ${entry.area}, ${entry.date}) [card](${card.shortUrl})${draft ? " **still Claude's unedited draft, review the wording**" : ""}`);
  }
  if (skipped.length) {
    lines.push("", "Skipped (fix the card and the next run picks it up):");
    for (const { card, reason } of skipped) lines.push(`- [${card.name}](${card.shortUrl}): ${reason}`);
  }
  lines.push("", "Merging publishes these on the docs changelog; the cards are then labelled \"In changelog\".");
  if (PR_BODY) fs.writeFileSync(PR_BODY, lines.join("\n") + "\n");
  console.log(lines.join("\n"));
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
