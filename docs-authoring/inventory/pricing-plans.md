# PerkStack — Pricing & Plans (authoritative inventory)

**Source of truth:** the PerkStack codebase, not the published docs.
Canonical plan model: `packages/shared/src/constants/plans.ts`. Shopify billing
line items: `packages/web/app/shopify.server.ts`. Feature gating is enforced at
195 call sites across `packages/web/app` and `packages/worker/src` via
`requireFeature` / `requireEarnRule` / `requireRewardType` / `hasFeature`
(`packages/web/app/lib/billing.server.ts`).

Everything below reflects what the code actually enforces. Where the strategy
doc (`docs/PRICING_STRATEGY.md`) disagrees, it is flagged.

---

## 1. Plans

Four live tiers. Prices, trial length, and order caps are identical between the
canonical `PLANS` constant and the Shopify billing config — they agree.

| Plan | Price / mo | Trial | Order cap / mo | Email cap / mo | Overage | Target merchant |
| --- | --- | --- | --- | --- | --- | --- |
| **Free** | $0 | none | 100 | none (uncapped) | none (hard cap) | Agencies, dev stores, merchants under 100 orders/mo |
| **Essential** | $29 | 14 days | 500 | 5,000 | none (hard cap) | Small stores wanting photo reviews + no branding |
| **Growth** ⭐ | $99 | 21 days | 2,500 | 25,000 | +$25 / 500 orders, capped $99/mo | Scaling stores wanting referrals, VIP, integrations |
| **Studio** | $299 | 30 days | 10,000 | 50,000 | +$30 / 1,000 orders, capped $300/mo | High-volume brands / agencies wanting white-label |

(All from `packages/shared/src/constants/plans.ts` `PLANS`; prices + trial +
overage terms mirrored in `packages/web/app/shopify.server.ts` `billing`.)

### Billing mechanics (merchant-facing)

- **Billed monthly through Shopify.** Every plan is a Shopify app subscription
  charged every 30 days in USD (`BillingInterval.Every30Days`,
  `packages/web/app/shopify.server.ts`). Merchants approve the charge on
  Shopify's own hosted billing page; there is no credit card entry inside
  PerkStack.
- **Free trial** of 14 / 21 / 30 days on Essential / Growth / Studio
  respectively. During trial the merchant gets the **full chosen-plan caps**
  (e.g. a Growth trial gets 2,500 orders, not Free's 100) — trial is not a
  disguised Free tier (`PRICING_STRATEGY.md` §6.6).
- **Upgrade takes effect immediately** once approved on Shopify; the order/email
  cap lifts right away. There is a short window between approval and Shopify's
  webhook where PerkStack lazy-reconciles the true plan from Shopify on the next
  billing page load (`reconcileShopBillingState`,
  `packages/web/app/lib/billing.server.ts`).
- **Downgrade / cancel:** earned points always stay valid; the new (lower) caps
  and feature set apply going forward. Cancelling drops the shop to Free
  (`billing.server.ts` reconcile logic; `PRICING_STRATEGY.md` FAQ §4.6).
- **Overage (Growth & Studio only):** if a merchant exceeds the monthly order
  cap, extra orders are billed as metered usage on the Shopify invoice rather
  than blocked — see the overage column above. Free and Essential are **hard
  caps** (no overage; earning simply pauses until the next month or an upgrade).

### Annual pricing

**There is no annual pricing in the product.** All billing is monthly. Annual is
an unshipped future test (`PRICING_STRATEGY.md` §4.7 — "Coming Q3 2026", 3-arm
discount test still TBD). **Do not document annual billing as available.**

### Founder pricing

`PRICING_STRATEGY.md` §4.5 describes a "Founder Pricing" discount (Essential $19
/ Growth $69 / Studio $199, first 50 installs, 24-month lock-in). This is a
**strategy proposal — no discounted amounts exist in the billing config**
(`shopify.server.ts` only has $29/$99/$299). Treat as not-yet-shipped; do not
document unless product confirms it is live.

---

## 2. Feature-by-plan matrix

Rows are the actual feature flags in `PlanFeatureSet`
(`packages/shared/src/constants/plans.ts`). ✓ = enabled, — = blocked (feature
shown but disabled with an upgrade prompt). Use the **merchant-facing feature
name**, never the flag identifier (see §5).

| Feature (merchant-facing) | Free | Essential | Growth | Studio |
| --- | :---: | :---: | :---: | :---: |
| **Caps** | | | | |
| Monthly order cap | 100 | 500 | 2,500 | 10,000 |
| Monthly email cap | none | 5,000 | 25,000 | 50,000 |
| Usage-based overage above cap | — | — | ✓ | ✓ |
| **Loyalty engine** | | | | |
| Ways to earn points (see §3) | basic (3) | extended (6) | full (7) | full (7) |
| Reward types (see §3) | percentage only | 4 types | 6 types | 7 types |
| Points delay (defer earn to avoid refund clawback) | — | ✓ | ✓ | ✓ |
| Points expiry (reset dormant balances) | — | ✓ | ✓ | ✓ |
| Reward redemption limits (total / per-customer caps + Grant Reward) | — | ✓ | ✓ | ✓ |
| VIP tiers | — | — | ✓ | ✓ |
| Referral program | — | — | ✓ | ✓ |
| **Reviews** | | | | |
| Text review collection + display | ✓ | ✓ | ✓ | ✓ |
| Photo reviews | — | ✓ | ✓ | ✓ |
| Custom review design (star color, card styling, typography) | — | — | ✓ | ✓ |
| **Storefront & branding** | | | | |
| Remove "Powered by PerkStack" branding | — | ✓ | ✓ | ✓ |
| Checkout UI extension (points at checkout) | — | ✓ | ✓ | ✓ |
| Custom points currency (rename Points, custom icon) | — | — | ✓ | ✓ |
| Custom launcher hero / panel customizer | — | — | ✓ | ✓ |
| Custom launcher trigger icon | — | — | ✓ | ✓ |
| Custom CSS | — | — | — | ✓ |
| Custom email sender domain (`points@yourbrand.com`) | — | — | — | ✓ |
| Custom email templates | — | — | — | ✓ |
| **Integrations** | | | | |
| Shopify Flow triggers | — | — | ✓ | ✓ |
| Agent Access (AI/MCP) | — | — | ✓ | ✓ |
| Klaviyo (live two-way sync) | — | — | ✓ | ✓ |
| Judge.me (live two-way sync) | — | — | ✓ | ✓ |
| Mailchimp | — | — | ✓ | ✓ |
| Omnisend | — | — | ✓ | ✓ |
| Gorgias | — | — | ✓ | ✓ |
| **Migration & data** | | | | |
| CSV import (one-time migration from Judge.me/Loox/Yotpo) | — | — | — | ✓ |
| Bulk operations (bulk award/deduct/import) | — | — | — | ✓ |
| Activity log + CSV export | — | — | — | ✓ |
| Multi-store / multi-domain | — | — | — | ✓ |
| **Cap & recovery** | | | | |
| Cap-Recovery flow ("Never lose a point") | — | ✓ | ✓ | ✓ |
| **Analytics** | | | | |
| Dashboard history window | 30 days | 90 days | 180 days | unlimited |
| Advanced analytics (comparisons, funnels, cohorts, CSV export) | — | — | ✓ | ✓ |

(All values read directly from the `PLANS.<tier>.features` objects in
`packages/shared/src/constants/plans.ts`.)

---

## 3. Tiered "levels" — earn rules & reward types

Two features are not simple on/off; they unlock progressively larger sets
(`EARN_RULE_BY_LEVEL` and `REWARD_TYPE_BY_LEVEL` in `plans.ts`).

**Ways to earn points** (`earnRulesLevel`):

| Level | Plans | Earn actions unlocked |
| --- | --- | --- |
| basic | Free | purchase, signup, write a text review |
| extended | Essential | + photo review, birthday, social share |
| full | Growth, Studio | + referral |

**Reward types** (`rewardTypesLevel`):

| Level | Plans | Reward types unlocked |
| --- | --- | --- |
| basic | Free | percentage discount only |
| full | Essential | + fixed amount, free shipping, free product |
| advanced | Growth | + spend-X-get-product, BOGO |
| premium | Studio | + free gift catalog (merchant-curated) |

(`packages/shared/src/constants/plans.ts`.)

---

## 4. Usage limits per plan (summary)

| Limit | Free | Essential | Growth | Studio |
| --- | --- | --- | --- | --- |
| Orders that earn points / month | 100 | 500 | 2,500 (+overage) | 10,000 (+overage) |
| Outbound emails / month | uncapped* | 5,000 | 25,000 | 50,000 |
| Analytics history | 30 days | 90 days | 180 days | unlimited |
| VIP tiers | n/a | n/a | up to 3** | up to 3** |

\* Free has no explicit email cap because the 100-order cap naturally bounds
outbound email to ~150/mo; adding a tighter email cap on Free was rejected as a
1-star-review trap (`plans.ts` comment; `PRICING_STRATEGY.md` §5).

\** "Up to 3 VIP tiers" is stated in `PRICING_STRATEGY.md` §5 as a system
maximum, but there is **no `MAX_TIERS` constant enforcing it in code** — it is a
product claim, not a hard-coded limit. Verify with product before publishing a
specific number.

### How caps behave for the merchant (`PRICING_STRATEGY.md` §6, enforced in `packages/web/app/lib/cap-enforcement.server.ts` + worker)

- **The cap only pauses new point-earning and outbound emails.** Everything
  customer-facing keeps working: the storefront widget, browsing/redeeming
  points already earned, review submission and display, and revenue attribution
  all continue past the cap.
- **Escalating warnings** at 75% / 90% / 100% of the order cap (in-app banners
  + email to the shop owner).
- **Cap-Recovery** (Essential+): after upgrading, a merchant can one-click
  retroactively award points for orders in the last 30 days that missed out due
  to the cap (`packages/web/app/lib/cap-recovery.server.ts`,
  `app.cap-recovery.tsx`). Capped at the new tier's monthly cap to prevent
  abuse.
- **Caps reset on the 1st of the calendar month** in the shop's timezone
  (`PRICING_STRATEGY.md` §6.5).
- Refunded/cancelled orders reverse the points ledger but **do not** refund the
  cap counter (prevents place-then-cancel gaming; `PRICING_STRATEGY.md` §6.6).

---

## 5. Things worth noting for a docs page

- **Free is genuinely useful, not a demo.** Free merchants can run a real
  percentage-discount loyalty program and collect/display unlimited text
  reviews — the wedge against Judge.me. The binding constraint is the
  100-order/mo point-earning cap, not feature lockout.
- **"Powered by PerkStack" branding** appears on Free (widget badge, reward
  cards, email footer) and is removed on all paid tiers. It auto-hides the first
  time a shop crosses into a paid plan, but the merchant's later manual choice
  to keep it visible is respected on renewals (`subscriptions.server.ts`).
- **Downgrade is safe:** earned points never expire on downgrade; only future
  earn rules/caps change. Good FAQ material.
- **Overage is a Growth/Studio-only convenience**, not a penalty — orders keep
  earning past the cap and the extra is billed on the Shopify invoice, capped at
  $99 (Growth) / $300 (Studio). On Free/Essential the program simply pauses
  until reset or upgrade.
- **Integrations (Klaviyo, Judge.me, Mailchimp, Omnisend, Gorgias, Shopify Flow,
  Agent Access) are all Growth+.** Essential does NOT include any live
  integration — only the one-time CSV import... **except CSV import is
  Studio-only in code** (see discrepancy below).
- **Photo reviews start at Essential**, text reviews are on every plan.

---

## 6. Discrepancies: published/strategy docs vs. enforced code

Code wins. Flag these to doc writers.

1. **CSV import tier — MAJOR.** `PRICING_STRATEGY.md` §5 repeatedly markets CSV
   import / migration as an **Essential+** feature ("+ CSV import" under
   Essential; FAQ "CSV import + migration assistance at Essential+"). **Code
   gates `csvImport` to Studio only** (`plans.ts`: false on Free/Essential/
   Growth, true only on Studio). **Document CSV import as Studio-only** unless
   product changes the flag.

2. **Legacy plan names.** The DB enum still contains `starter` and `pro`
   (`packages/shared/src/db/enums.ts`) from a pre-launch v1 pricing model.
   These are grandfathered-only (`starter → essential`, `pro → studio` via
   migration 0026) and never written by current code. **Never mention Starter
   or Pro plans** — the live plans are only Free / Essential / Growth / Studio.

3. **Dashboard history window.** `PRICING_STRATEGY.md` §5 lists Free "30-day",
   Essential "60 days", Growth "90 days". **Code enforces 30 / 90 / 180 /
   unlimited** (`plans.ts` `dashboardDays`). Use the code values.

4. **Annual billing** — strategy doc discusses it as a future test; **not
   shipped, no code.** Do not document.

5. **Founder pricing ($19/$69/$199)** — strategy proposal only; **not in the
   billing config.** Do not document as available.

6. **`customRewards` flag** is set in `plans.ts` (false on Free, true on
   paid) but is **not read by any code** — reward creation is actually gated by
   the reward-types level (`docs/PLAN_FLAGS.md`). The "free product reward" it
   was meant to gate is delivered instead via the `full` reward-types level.
   Don't build docs around a standalone "custom rewards" toggle.

---

## 7. SECRETS — internal identifiers to NEVER put in merchant docs

Use the merchant-facing meaning (left column of §2), never these code/infra
details:

- **Internal flag/constant names:** `maxOrdersPerMonth`, `maxEmailsPerMonth`,
  `earnRulesLevel`, `rewardTypesLevel`, `customRewards`, `photoReviews`,
  `pointsDelay`, `pointsExpiry`, `rewardRedemptionLimits`, `vipTiers`,
  `shopifyFlow`, `mcpAccess`, `referralProgram`, `klaviyoIntegration`,
  `judgeMeIntegration`, `mailchimpIntegration`, `omnisendIntegration`,
  `gorgiasIntegration`, `checkoutExtension`, `brandingRemoval`,
  `customPointsCurrency`, `customLauncherHero`, `customLauncherIcon`,
  `customReviewDesign`, `customSenderDomain`, `customCSS`,
  `customEmailTemplates`, `capRecoveryFlow`, `bulkOperations`,
  `activityLogExport`, `multiStore`, `dashboardDays`, `analyticsAdvanced`,
  `csvImport`, `overage`. Also the level keys `basic`/`extended`/`full`/
  `advanced`/`premium`.
- **Legacy plan enum values** `starter`, `pro` (see discrepancy #2).
- **Feature-gating internals:** the `requireFeature`/`requireEarnRule`/
  `requireRewardType` helpers, the `upgrade_required` error payload, HTTP 402
  responses, `getMinimumPlanForFeature`, `hasFeature`.
- **Tech stack / infra** (all internal — never in merchant docs): Resend
  (email), Cloudflare R2 (photo storage), BullMQ / Upstash Redis (job queues),
  Fly.io / Railway hosting, Postgres/Drizzle, Sentry, the `points-award` /
  `review-request` workers, `audit_logs` / `order_attributions` tables,
  Shopify Billing API `metered usage records`, MCP (Model Context Protocol) —
  surface only as "Agent Access", `BillingInterval.Every30Days`.
- **Internal email/domain defaults:** `notifications@perkstack-mail.com` is an
  internal default; the merchant-facing story is only "custom sender domain on
  Studio."
- **Cost/economics figures** from `PRICING_STRATEGY.md` (Resend tiers, per-order
  costs, margins, MRR projections, tier-mix percentages) — internal only.
- **Unshipped/roadmap items:** annual pricing, founder pricing, "free gift
  catalog" mechanics beyond the plan name, and any "coming Q3 2026" copy.
