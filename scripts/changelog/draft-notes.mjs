// Drafts a "Customer changelog" note on every card that reached Testing, Done
// or Deployed without one. The draft is appended to the card description and
// the card owner is asked (in a comment) to edit it before it ships.
//
// Usage: node scripts/changelog/draft-notes.mjs [--dry-run]
// Env:   TRELLO_KEY, TRELLO_TOKEN, TRELLO_BOARD, ANTHROPIC_API_KEY

import fs from "node:fs";
import path from "node:path";
import Anthropic from "@anthropic-ai/sdk";
import { zodOutputFormat } from "@anthropic-ai/sdk/helpers/zod";
import { z } from "zod";
import {
  trello,
  listByName,
  labelsByName,
  cardsInList,
  parseNote,
  formatNote,
  lintNote,
} from "./trello.mjs";

const DRY_RUN = process.argv.includes("--dry-run");
const LISTS = ["Testing", "Done", "Deployed"];
const AREAS = ["Loyalty", "Reviews", "Storefront", "Integrations", "Admin"];

function docsRoutes() {
  const appDir = path.join("src", "app");
  const routes = [];
  const walk = (dir) => {
    for (const name of fs.readdirSync(dir)) {
      const full = path.join(dir, name);
      if (fs.statSync(full).isDirectory()) walk(full);
      else if (name === "page.tsx") routes.push("/" + path.relative(appDir, dir).split(path.sep).join("/"));
    }
  };
  walk(path.join(appDir, "docs"));
  return routes.sort();
}

const routes = docsRoutes();

const NoteSchema = z.object({
  type: z.enum(["new", "improved", "fixed"]),
  area: z.enum(AREAS),
  title: z.string(),
  summary: z.string(),
  docsHref: z.enum(routes).nullable(),
});

const SYSTEM = `You write PerkStack's customer changelog. PerkStack is a Shopify app for loyalty, referrals and product reviews; readers are Shopify merchants.

From a Trello card, write one changelog entry:
- title: what changed for the merchant, in sentence case, under 60 characters, no period.
- summary: one or two plain sentences. Say exactly what changed and what the merchant or their customers can do now, where they find it, and anything they need to switch on. Name real screens and settings ("Settings > Emails", "the rewards launcher"), never internal names (files, tables, ticket ids, code).
- type: "new" for a new capability, "improved" for a better existing one, "fixed" for a bug fix.
- area: the part of PerkStack it belongs to.
- docsHref: the docs page that best explains it, or null if none fits.

Write it the way a support person would explain the change to a merchant on a call: plain words, specific, calm. Rules:
- No em dashes or en dashes. Use commas, periods or "and".
- No exclamation marks, emoji, hype or marketing words (seamless, effortless, unlock, elevate, empower, boost, supercharge, game-changer, robust, streamline, excited, thrilled).
- No promises about results ("increase sales"). Describe the change, not its benefits.
- Prefer "you" and "your customers". Short sentences.

Good: "Customers now see what their points are worth" / "The rewards launcher shows the balance in money next to the points, for example 1,240 points = $12.40. Nothing to set up."
Bad: "Unlock the true value of points" / "We're excited to supercharge your loyalty program with a seamless new experience!"`;

async function draft(client, card) {
  const messages = [
    { role: "user", content: `Card title: ${card.name}\n\nCard description:\n${card.desc}` },
  ];
  // One rewrite if the first draft breaks the wording rules.
  for (let attempt = 0; attempt < 2; attempt++) {
    const response = await client.messages.parse({
      model: "claude-opus-5-5",
      max_tokens: 16000,
      system: SYSTEM,
      messages,
      output_config: { format: zodOutputFormat(NoteSchema) },
    });
    if (response.stop_reason === "refusal" || !response.parsed_output) return null;
    const note = { ...response.parsed_output, docsHref: response.parsed_output.docsHref ?? undefined };
    const problems = lintNote(note);
    if (problems.length === 0) return note;
    messages.push(
      { role: "assistant", content: response.content },
      { role: "user", content: `That entry breaks the rules: ${problems.join("; ")}. Rewrite it.` },
    );
  }
  return null;
}

async function main() {
  const client = new Anthropic();
  const labels = await labelsByName();
  let drafted = 0;

  for (const listName of LISTS) {
    const list = await listByName(listName);
    for (const card of await cardsInList(list.id)) {
      if (card.idLabels.includes(labels.Internal)) continue;
      if (parseNote(card.desc)) continue;

      const note = await draft(client, card);
      if (!note) {
        console.warn(`No draft for "${card.name}" (model declined or returned nothing)`);
        continue;
      }
      console.log(`Drafted for "${card.name}": ${note.title}`);
      drafted++;
      if (DRY_RUN) continue;

      const desc = `${card.desc.trimEnd()}\n\n${formatNote(note, { draft: true })}\n`;
      await trello("PUT", `cards/${card.id}`, { desc });
      await trello("POST", `cards/${card.id}/actions/comments`, {
        text: "Claude drafted the customer changelog note at the bottom of this card. Please edit it and remove \"(draft by Claude, edit before deploy)\" from its first line before this card is deployed.",
      });
    }
  }
  console.log(`${drafted} note(s) drafted${DRY_RUN ? " (dry run, nothing written)" : ""}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
