# What Good PerkStack Docs Look Like

This is the standard every PerkStack documentation page is written to. Read it before writing or editing any doc page. It defines who we write for, the voice we use, how a page is structured, and — critically — what we must never expose.

---

## 1. Who we write for

Our reader is a **Shopify merchant or their staff** — a store owner, marketing manager, or support agent. Assume:

- They know Shopify (admin, themes, checkout, customers, discounts).
- They do **not** know how PerkStack is built, and they don't care.
- They are busy. They arrived at a page because they want to do one thing or understand one concept. They will skim first, read second.
- Some are non-technical. Nobody reading these docs is our engineer.

We write for the person trying to **run a loyalty and reviews program for their store**, not the person trying to rebuild PerkStack.

---

## 2. The golden rule: docs describe the product, never the plumbing

The docs explain **what the feature does for the merchant and how to use it** — never how it is implemented.

### Never appears in the docs

These are trade secrets, attack surface, or simply irrelevant to a merchant. Strip every one of them:

- **Tech stack & frameworks** — Remix, Vite, React, Polaris, App Bridge, Next.js, Node, etc.
- **Databases & data layer** — PostgreSQL, Redis, Drizzle ORM, "the `point_transactions` table," column names like `balanceAfter`, `pointsExpiryMonths`, SQL, schema, migrations.
- **Infrastructure & hosting** — Docker, Railway, Cloudflare R2, S3, monorepo, pnpm workspaces, Turborepo, containers, Dockerfiles.
- **Background processing internals** — BullMQ, queues, "the worker," job processors, cron times ("runs daily at 2:00 AM"), idempotency keys, retries.
- **Third-party services we build on** — Resend, Sharp, specific vendor names for email/image/storage. (Say "PerkStack sends the email," not "Resend sends the email.")
- **Internal identifiers** — extension type strings (`theme_app_extension`, `web_pixel`), package names (`packages/web`), file names (`Dockerfile.worker`), internal API route shapes, webhook topic wiring.
- **Anything that reads like an engineering design doc** — data-flow diagrams of services, "the web app enqueues a job," package tables, deployment tables.

### Always appears instead

- What the feature is, in plain language.
- What problem it solves for the store and its shoppers.
- Exactly where to find it in the PerkStack admin and how to set it up (steps, screenshots-worthy moments).
- What the shopper sees on the storefront.
- Sensible defaults, limits, and gotchas the merchant actually needs.

**Translation examples:**

| Don't write (leaks internals) | Do write (merchant value) |
|---|---|
| "Points are stored as immutable rows in the `point_transactions` ledger with a `balanceAfter` column." | "Every points change is recorded, so a customer's balance and full history are always accurate and auditable." |
| "A BullMQ worker runs daily at 2:00 AM to expire points." | "Expired points are removed automatically each day. Customers are notified before they lose them." |
| "Idempotency keys prevent duplicate awards on webhook retries." | "Customers never receive double points for the same action, even if something is retried." |
| "The app is a Remix monorepo deployed to Railway with a Postgres database." | *(delete entirely — a merchant never needs this)* |

If a sentence would only make sense to an engineer, it doesn't belong.

---

## 3. Voice & tone

- **Direct and warm.** Second person ("you"), active voice. "Turn on birthday rewards," not "Birthday rewards can be enabled."
- **Confident, not hedgy.** State how it works. Avoid "should," "basically," "simply" (nothing is simple to a first-timer).
- **Benefit-first.** Lead a feature with why a merchant would use it, then how.
- **Concrete over abstract.** Real numbers and examples ("earn 1 point per $1 spent") beat vague description.
- **No hype, no fear.** Skip marketing adjectives and scare warnings. Warnings are for real consequences only.

---

## 4. Page structure

Every feature page follows roughly this shape:

1. **H1 = the feature name.** One clear opening paragraph: what it is + the benefit, in 1–3 sentences. No jargon.
2. **"What it does" / how it works** — the concept explained for a merchant, with a concrete example.
3. **How to set it up** — numbered steps referencing real admin locations ("Loyalty → Earn Rules → Add rule"). This is the part merchants come for.
4. **What customers see** — the storefront/shopper experience.
5. **Settings & options** — a clean table of the choices they can make, with plain-language descriptions and defaults. (Table columns describe *settings the merchant sees in the UI*, never database fields.)
6. **Tips / limits / notes** — Callouts for the handful of things worth flagging.
7. **Related** — 3–5 links to adjacent pages.

Not every page needs every section — short is fine. A page a merchant can read in two minutes and then go do the thing is the goal.

---

## 5. Formatting conventions (this codebase)

Pages are React/TSX under `src/app/docs/<section>/<page>/page.tsx`. Keep to the existing primitives:

- `import { H2, H3 } from "@/components/Heading";` for headings (they auto-generate anchor IDs). Use a plain `<h1>` for the title.
- `import Callout from "@/components/Callout";` — types: `info`, `tip`, `warning`, `danger`. Use sparingly; 1–3 per page.
- `createDocMetadata("/docs/...", { title, description })` for the page metadata. **Rewrite the `description`** too — old descriptions also leak internals (e.g. "ledger-based points system").
- Wrap everything in `<div className="docs-prose">`.
- Use `<table>` for option/setting reference, `<ol>` for step-by-step, `<ul>` for lists.
- Use `<code>` only for things a **merchant** would type or see (a discount code, a Liquid block name they add in the theme editor, an email variable) — never for internal identifiers.
- Keep the `Related` links list at the bottom of each page and update it when pages move.

---

## 6. When in doubt

Ask: *"Would a store owner need this to use the feature — and would I be comfortable with a competitor reading it?"* If the answer to the first is no, cut it. If the answer to the second is no, it's a secret — cut it.
