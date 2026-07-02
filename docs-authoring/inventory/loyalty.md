# Loyalty Program — Feature Inventory

Source of truth: the PerkStack product codebase (`/Users/alexacea/Documents/Projects/perkstack`). Where this document and the existing published docs disagree, this document wins. File paths are given in parentheses so doc writers can re-verify.

**Scope:** everything in the loyalty program — points earning, earn rules, rewards catalog & redemption, VIP tiers, referrals, birthday rewards, social sharing, points expiry, points delay, campaigns/boosts, and the merchant manual controls.

---

## 0. Plan tiers & how loyalty features are gated

Four plans (`packages/shared/src/constants/plans.ts`):

| Plan | Price/mo | Trial | Monthly order cap |
|------|----------|-------|-------------------|
| Free | $0 | — | 100 |
| Essential | $29 | 14 days | 500 |
| Growth | $99 | 21 days | 2,500 |
| Studio | $299 | 30 days | 10,000 |

Loyalty features unlock progressively. The two ladders that matter most for loyalty:

**Earn-rule level (`EARN_RULE_BY_LEVEL`)** — which earning actions a plan can use:
- `basic` (Free): purchase, signup, text review
- `extended` (Essential): + photo review, birthday, social share
- `full` (Growth, Studio): + referral

**Reward-type level (`REWARD_TYPE_BY_LEVEL`)** — which reward types a plan can create:
- `basic` (Free): percentage off only
- `full` (Essential): + fixed amount, free shipping, free product
- `advanced` (Growth): + spend-X-get-product, BOGO
- `premium` (Studio): + free gift catalog ("choose your gift")

**Loyalty feature flags by plan** (true = available):

| Feature (flag) | Free | Essential | Growth | Studio |
|---|---|---|---|---|
| Points delay (`pointsDelay`) | – | ✅ | ✅ | ✅ |
| Points expiry (`pointsExpiry`) | – | ✅ | ✅ | ✅ |
| Reward redemption limits (`rewardRedemptionLimits`) | – | ✅ | ✅ | ✅ |
| VIP tiers (`vipTiers`) | – | – | ✅ | ✅ |
| Referral program (`referralProgram`) | – | – | ✅ | ✅ |
| Custom points name & icon (`customPointsCurrency`) | – | – | ✅ | ✅ |
| Points campaigns / boosts | ✅ (all plans — no flag gate found) | ✅ | ✅ | ✅ |

Gating helpers: `hasFeature`, `isEarnRuleAllowed`, `isRewardTypeAllowed`, `getMinimumPlanForFeature`, `getMinimumPlanForEarnRule`, `getMinimumPlanForRewardType` (all in `plans.ts`). Server-side enforcement lives in `requireFeature`, `requireEarnRule`, `requireRewardType` (`packages/web/app/lib/billing.server.ts`).

**Docs-worth-noting:**
- On lower plans, gated inputs render **visually AND functionally disabled** with an inline "Upgrade to {plan}" banner naming the unlocking plan — they are not hidden. (Workspace anti-pattern rule; visible throughout `app.settings.tsx` / `app.loyalty.tsx`.)
- The `customRewards` flag exists in code but currently gates nothing (it is a placeholder for a future feature) — do not document it. (`docs/PLAN_FLAGS.md`.)

---

## 1. Points earning & Earn Rules

**What it is:** The set of actions that credit points to a customer. Merchants toggle each action on/off and set how many points it awards. Configured in **Loyalty → Earn Rules** (`app.loyalty.tsx`, section id `earn-rules`).

**The 7 earning actions** (`ACTION_META` in `app.loyalty.tsx`; enum `earnActionEnum` in `packages/shared/src/db/enums.ts`) with their seeded defaults (`DEFAULT_EARN_RULES` in `packages/shared/src/constants/defaults.ts`):

| Action | Admin label | Default points | Default state | Min plan |
|---|---|---|---|---|
| purchase | Purchase | 1 point per $1 spent (`pointsPerCurrencyUnit "1.0000"`) | Active | Free |
| signup | Account signup | 100 | Active | Free |
| review_text | Text review | 100 | Active | Free |
| review_photo | Photo review | 200 | Active | Essential |
| birthday | Birthday | 200 | **Inactive** by default | Essential |
| social_share | Social share | 100 | Active | Essential |
| referral | Referral | 500 to referrer / 200 to referee (`refereePoints`) | **Inactive** by default | Growth |

**Per-rule settings the merchant sees** (Configure modal, `renderConfigFields` in `app.loyalty.tsx`):
- **Active toggle** — "When active, customers will earn points for this action."
- **Purchase rule:** "Dollars spent per point" (how many $ to earn 1 point; default 1) + "Minimum order value" ($, "Leave empty for no minimum").
- **Referral rule:** "Points for referrer" and "Points for referee" (two separate amounts).
- **Text/photo review rules:** "Require verified purchase" checkbox ("Only award points if the reviewer has purchased the product").
- **All non-purchase, non-referral rules:** single "Points earned" fixed amount.
- **Description** — free text, "Shown to customers in the loyalty widget."

**How points are calculated on a purchase** (`packages/worker/src/processors/points-award.ts`):
- Base = floor(order amount × points-per-dollar).
- If VIP tiers are on, base is multiplied by the customer's **tier multiplier** (floor).
- If a **campaign/boost** is live, the result is multiplied again by the boost multiplier.
- **Tier and boost multipliers STACK multiplicatively** — e.g. Gold tier (2x) during a 2x boost weekend = 4x. Rounding happens once at the end.

**Things worth noting for a docs page:**
- Points per dollar is stored to 4 decimals — merchants can set fractional rates.
- Purchase points are the only earn affected by tier/boost multipliers in the worker's main branch; other earns are awarded at their flat amount (still multiplied by an active boost — verify per action if precision needed).
- Birthday and referral ship **off** — merchants must enable them, and referral additionally requires Growth+.
- Adding an earn rule uses an "Add an earning rule" picker; gated actions show a plan badge and can't be added below the required plan.

---

## 2. Rewards Catalog & Redemption

**What it is:** The catalog of rewards customers redeem points for. Configured in **Loyalty → Rewards Catalog** (`app.loyalty.tsx`, section id `rewards`). Add/Edit Reward modal.

**Reward types** (`REWARD_TYPE_META` in `packages/web/app/components/rewards/reward-form.tsx`; enum `rewardTypeEnum`):

| Type | Admin label | Storefront badge | Min plan | Extra config |
|---|---|---|---|---|
| percentage_off | Percentage off | Percentage | Free | discount value (%) |
| fixed_amount | Fixed amount off | Fixed amount | Essential | discount value ($) |
| free_shipping | Free shipping | Shipping | Essential | — |
| free_product | Free product | Free product | Essential | pick 1 product/variant |
| spend_get_product | Spend $X, get a free product | Gift with purchase | Growth | min spend ($) + product |
| bogo | Buy X, get Y | BOGO | Growth | buy qty + buy products, get qty + get products, get-discount % (1–100) |
| free_gift_catalog | Choose your gift | Choose your gift | Studio | 1–20 eligible products; customer picks one |

**Default seeded reward** (`DEFAULT_REWARD`): "$5 Off" / "Get $5 off your next order" / fixed_amount / $5.00 / **100 points** / active.

**Per-reward settings the merchant sees:** Title, Description, reward Type, discount value (for %/fixed), type-specific config (product pickers etc.), **Cost in points**, **Minimum tier** (`minTierId` — restricts a reward to a VIP tier; requires `vipTiers`), Active toggle.

**Config validation limits** (`packages/shared/src/types/reward-config.ts`):
- BOGO: buy/get product lists 1–50 each; get-discount 1–100 (100 = classic "buy X get Y free").
- Free gift catalog: 1–20 products.
- spend_get_product: minSpend must be a positive number.

### Redemption limits (Essential+, `redemption-limits-section.tsx`)

Unlocks a "Redemption limits" section in the Add/Edit Reward modal (flag `rewardRedemptionLimits`):
- **Total redemption limit** — cap across all customers (empty = unlimited).
- **Per-customer limit** — cap per customer (empty = unlimited), with a **reset window**: Lifetime (default) / Monthly / Yearly (`rewardCustomerLimitPeriodEnum`).
- **Per-tier overrides** — different per-customer caps per VIP tier (empty = inherit the per-customer limit). Per-tier overrides additionally require `vipTiers`.
- Edit modal shows a "Used X of Y" status panel and a **"Reset counter"** button.

**What the shopper sees (redemption):** Rewards appear in the launcher ("Redeem points"), the loyalty page ("Redeem Rewards"), the customer-account "Rewards Marketplace", and the checkout "Rewards wallet". Redeeming generates a **discount code** the shopper copies or that **auto-applies at checkout**. Rewards the shopper can't afford show as locked/disabled with an "Earn N more points" hint. (Storefront extensions.)

**Things worth noting:**
- Redemption status lifecycle: pending → completed / voided (`redemptionStatusEnum`).
- A reward code redeemed on the launcher/loyalty page **auto-carries over** and applies at checkout (checkout-ui `activeRedemption`).
- Legacy types (%/fixed/free shipping) store no config object; the four advanced types require a validated config.

---

## 3. VIP Tiers

**What it is:** Lifetime-points tiers that give members a points-earning multiplier and can gate rewards. Configured in **Settings → Tiers** (`app.settings.tsx`, section id `tiers`). Flag `vipTiers` (**Growth+**).

**Structure:** Exactly **3 tiers** (labelled Base Tier / Mid Tier / Top Tier in the UI — `TIER_LABELS`). Not add/remove — merchants edit the three fixed rows.

**Default tiers** (`DEFAULT_TIERS` in `defaults.ts`):

| Tier | Default name | Min lifetime points | Multiplier |
|---|---|---|---|
| Base | Member | 0 (always 0, locked) | 1.00 |
| Mid | Silver | 500 | 1.25 |
| Top | Gold | 1,500 | 1.50 |

**Per-tier settings:** Tier name, Custom icon URL, Minimum lifetime points (base is always 0 and locked), Points multiplier ("e.g. 1.25 means 25% bonus on earned points"). Plus a master **"Enable VIP tiers"** checkbox (`tiersEnabled`, default **off**).

**Validation** (`app.settings.tsx` action): first tier min must be 0; thresholds must be strictly ascending; multipliers must be ≥ 1.00.

**Tier logic** (`packages/shared/src/helpers/tiers.ts`): current tier = highest tier whose min lifetime points the customer has reached; progress bar computed toward the next tier. Merchants can **manually override** a customer's tier on the customer detail page (see §9); an override pins the tier regardless of points.

**What the shopper sees:** tier badge + progress bar ("{points} to reach {next tier}") and tier benefits/multiplier on the launcher, loyalty page, customer account, and checkout wallet. Top-tier members see "You are at the highest tier." (Storefront extensions.)

**Things worth noting:**
- `minLifetimePoints` is based on **lifetime points earned**, not current balance — redeeming/expiring points does not drop a customer's tier.
- Each tier can carry a per-tier launcher accent color (`launcherAccentColor`) for storefront theming.
- Reward `minTierId` + per-tier redemption limits both depend on tiers being configured.

---

## 4. Referrals

**What it is:** Customers share a unique link; when a referred friend makes a purchase, both sides are rewarded. **Loyalty → Referrals** dashboard (`app.loyalty.tsx`, section id `referrals`) shows Total / Completed / Pending stats and a referral table. Reward amounts are set on the **Referral earn rule** (§1). Flag `referralProgram` (**Growth+**); the referral earn rule is also gated at Growth via the earn-rule ladder.

**How it works:**
- Each customer gets a unique **referral code** (8-char uppercase hex) generated on first request (`api.referral.tsx`).
- The friend-facing offer is a **10% off discount code** in the form `REF-{code}` auto-created in Shopify; the referral link routes through `/discount/REF-{code}` so the discount applies at checkout (`packages/web/app/lib/referral-discount.server.ts`). **The 10% friend discount is hard-coded** (not merchant-configurable in the UI reviewed).
- Referrer points (default 500) and referee points (default 200) are set on the referral earn rule.
- Referral status lifecycle: pending → completed / expired / voided (`referralStatusEnum`); completed referrals stamp a `completedAt`.

**What the shopper sees:** a "Refer a friend" drawer on the launcher and a "Refer a Friend" section on the loyalty page — referral link (readonly), copy button, reward text, and referral count. (Not shown in customer account or checkout.) (Storefront extensions.)

**Things worth noting:**
- The friend reward is a **10% discount code**, separate from the points both parties earn — worth explaining so merchants don't double-count.
- Referral rule ships **inactive**; must be enabled and requires Growth+.

---

## 5. Birthday Rewards

**What it is:** Award points to customers on their birthday. Birthday earn rule (§1), default **200 points**, ships **off**. Requires Essential+ (earn-rule `extended` level).

**How it works:**
- Shopper enters their birthday (YYYY-MM-DD) in the **launcher** birthday widget (`api.birthday.tsx`). **Once set, the date is locked** (`locked: true`) — the customer cannot change it afterward (anti-abuse).
- A daily scan matches customers whose birthday is today and enqueues the points award; **awarded at most once per calendar year** (dedup by year — `packages/worker/src/processors/birthday-scan.ts`). Only runs when the birthday earn rule is active.

**What the shopper sees:** an inline date input + Save on the **launcher only** (not on the loyalty page, customer account, or checkout). After saving, shows the stored date with a checkmark. (Storefront extensions.)

**Things worth noting:**
- Birthday input is **launcher-exclusive** — a customer who only ever uses the full loyalty page can't set a birthday.
- The date is validated strictly (real calendar date, YYYY-MM-DD) and permanent once set.

---

## 6. Social Sharing

**What it is:** Award points when a customer shares a product on social media. Social-share earn rule (§1), default **100 points**, ships **on**. Requires Essential+ (earn-rule `extended` level).

**How it works** (`api.social-share.tsx`):
- Supported platforms: **Facebook, X, WhatsApp, Pinterest** (`VALID_PLATFORMS`).
- Points are awarded **once per unique (product, platform) combination** per customer — re-sharing the same product on the same platform yields 0 (`alreadyShared`). A customer can earn multiple times by sharing different products or on different platforms.

**What the shopper sees:** share buttons (FB / X / WhatsApp / Pinterest) on the **launcher only**. On a product page it opens the share popup then records the share; off a product page it shows "Visit a product page to share." (Storefront extensions.)

**Things worth noting:**
- Social share buttons are **launcher-exclusive** (not on the loyalty page/account/checkout).
- Dedup is per product+platform, so total earnable points scale with the catalog and platform count.

---

## 7. Points Delay

**What it is:** Hold purchase points in a pending state for N days after an order is paid, so a refund inside the window cancels the pending points instead of forcing a clawback. **Settings → General → Points Delay** (`app.settings.tsx`). Flag `pointsDelay` (**Essential+**).

**Settings** (`DEFAULT_SETTINGS` in `defaults.ts`):
- **Delay purchase points** toggle (`pointsDelayEnabled`) — default **off** (new installs behave as before: purchase points land immediately).
- **Delay (days)** (`pointsDelayDays`) — default **30**, allowed **1–365**. Help text: "Match your return window. 30 days is a common default for Shopify stores."

**How it works** (`pendingGrantStatusEnum`, `points-delay-promote.ts`): purchase earns are held as pending grants that do **not** count toward balance or VIP tier; after the delay they promote to real ledger points. A refund far enough into the window cancels the grant (no ledger row ever created). **Only purchase points are delayed** — signup, birthday, reviews, referrals are always awarded immediately.

**What the shopper sees:** pending points row on launcher ("X pts pending"), customer account ("N Points pending" banner), and checkout wallet ("Points from this order arrive in N days…"). (Storefront extensions.)

---

## 8. Points Expiry

**What it is:** Reset a customer's balance after a period of inactivity. **Settings → General → Points Expiry** (`app.settings.tsx`). Flag `pointsExpiry` (**Essential+**). Free shops keep points forever.

**Settings** (`DEFAULT_SETTINGS`):
- **Expiry period (months)** (`pointsExpiryMonths`) — default **null / "Never expires"**; min 1 when set. Placeholder text "Never expires."
- **Expiry notification (days before)** (`expiryNotificationDays`) — default **30**; min 1. "How many days before expiry to notify customers."

**How it works:** each earned batch gets an `expiresAt` = award date + (months × 30 days) (`points-award.ts`). A cron sweep expires them; **two warning emails** are sent before expiry so customers can earn/redeem to reset the clock (`points-expiring-soon.ts`, `points-expire.ts`). Transaction type `expire` (`txTypeEnum`).

**What the shopper sees:** "Expiring soon" count on the customer account surface. (Storefront extensions.)

**Things worth noting:**
- A month is treated as 30 days in the expiry math.
- Any qualifying activity (earn/redeem/adjust) is what the "inactivity" reset hinges on conceptually; the concrete driver is the per-batch `expiresAt`.

---

## 9. Points Campaigns / Boosts (multipliers)

**What it is:** Time-boxed points multipliers (2x, 3x…) that make every earn worth more during a window. **Loyalty → Campaigns** (`app.loyalty.tsx`, section id `campaigns`). No plan flag gate found — appears available on all plans (verify before documenting as a Free feature).

**Boost modal settings** (state in `app.loyalty.tsx`):
- **Name** (optional; blank renders as "{multiplier}x boost").
- **Multiplier** — default **2**; allowed **>1 and ≤10** (server rejects otherwise).
- **Duration (hours)** — default **48**.
- **Schedule** — "now" (default) or "later" with a start datetime.

**How it works** (`packages/shared/src/helpers/point-promotions.ts`): the active promotion multiplies every earn; **composes with the tier multiplier** (Gold 2x during a 2x boost = 4x). Starting a new boost auto-stops the previous one (no intentional overlap); if overlaps occur, the largest multiplier wins. Merchants can stop a running boost early.

**Campaigns dashboard** shows Live / Scheduled / Past sections, and per-campaign analytics for past campaigns: points issued, earners, orders, attributed revenue, redemptions, points redeemed, revenue/points uplift % vs the prior 30 days, and revenue per 1,000 points issued.

**What the shopper sees:** a promo/boost countdown banner on the launcher. (Storefront extensions.)

**Things worth noting:**
- Boosts can also be started via Shopify Flow (`start-points-multiplier` action) — those show "Started by Flow."

---

## 10. Custom Points Currency

**What it is:** Rename the points currency and set a custom icon. **Settings → General** (`app.settings.tsx`). Flag `customPointsCurrency` (**Growth+**).

**Settings** (`DEFAULT_SETTINGS`):
- **Points name (plural)** (`pointsName`) — default **"Points"** (e.g. "Stars", "Gems").
- **Points name (singular)** (`pointsNameSingular`) — default **"Point"**.
- **Custom icon URL** (`pointsIconUrl`) — default none; displayed next to the balance.

Free/Essential shops are locked to "Points"/"Point" with an upgrade banner. The plural/singular names propagate to all storefront surfaces via the API.

---

## 11. Merchant manual controls (Customer detail page)

On **Customers → [customer]** (`app.customers.$id.tsx`) the merchant can manually operate on one customer's loyalty:
- **Adjust points** — add or deduct points with a reason (source type `manual`).
- **Grant reward** — hand a specific reward directly to the customer (also available as a Flow action; requires the reward-limits surface at Essential+).
- **Reset balance** — zero out the customer's points.
- **Toggle loyalty freeze** — pause earning for that customer.
- **Set tier override** — pin the customer to a VIP tier regardless of points ("stays at this tier until the override is removed"); shows a "Manual override" badge.
- **Void transaction** — reverse a specific ledger entry (tx type `void`).

These are audited as merchant-initiated and feed the manual-ledger-adjustment Flow trigger.

---

## 12. Transaction / activity model (merchant + shopper facing meaning)

Point transaction types (`txTypeEnum`): **earn, redeem, expire, adjust, void**. Source types (`sourceTypeEnum`): purchase, signup, birthday, review, social, referral, redemption, expiry, manual, void. These surface as the customer's **activity/history** feed (loyalty page "Recent Activity"; customer account "Activity" with Type + Period filters). Doc writers can describe these as the human-readable activity labels; do not expose enum names.

---

## SECRETS — do NOT put these in customer docs

Implementation details encountered while researching. None of these belong in user-facing docs:

- **Tech stack / architecture:** Remix admin app, Shopify App Bridge + Polaris UI, Postgres + Drizzle ORM, Redis/BullMQ background workers, a monorepo of `packages/web`, `packages/worker`, `packages/shared`. Node/pnpm/Bun/Docker toolchain.
- **Database internals:** table names (`earn_rules`, `rewards`, `tiers`, `settings`, `point_transactions`, `point_promotions`, `pending_point_grants`, `referrals`, `social_shares`, `customers`, `shops`), column names (`pointsPerCurrencyUnit`, `minLifetimePoints`, `expiresAt`, `tierOverrideId`, `launcher_accent_color`, `referralCode`, etc.), Postgres enums (`earn_action`, `reward_type`, `tx_type`, etc.), and JSONB `rewards.config` shape.
- **Migrations / schema history:** drizzle migration filenames (e.g. `0028_advanced_reward_types.sql`, `0030_reward_limits_and_grants.sql`, `0034`, `0038_points_delay.sql`), legacy plan enum values `starter`/`pro`, backfill migration `0026`.
- **Workers / crons / queues:** processor names (`points-award`, `points-expire`, `points-expiring-soon`, `points-delay-promote`, `birthday-scan`, `promotion-lifecycle`, `tier-recompute`), queue/job identifiers, HMAC-verified proxy endpoints, index names (`point_promotions_shop_active_idx`).
- **Internal gating identifiers:** the raw feature-flag names (`pointsDelay`, `vipTiers`, `rewardRedemptionLimits`, `customPointsCurrency`, `referralProgram`, `customRewards`, earn/reward "level" strings). Docs should describe the *capability and the plan*, not the flag.
- **Third parties / vendors:** Shopify Billing/Flow/MCP internals, and any integration vendor names beyond what the merchant already sees in the UI. Do not reference `crypto.randomBytes` code-gen, `Math.floor` rounding, or "Smile.io parity" comments.
- **Parity/roadmap notes in code** (e.g. "Smile.io parity", "Sephora/Starbucks pattern", unshipped free-product roadmap) are internal rationale — not for docs.
- **Placeholder flags:** `customRewards` gates nothing today — never document it as a feature.

---

## Surprises / discrepancies for doc writers

1. **Birthday and referral earn rules ship OFF by default**, and **social share ships ON** — docs should tell merchants to enable birthday/referral explicitly.
2. **Birthday date entry and social-share buttons are launcher-exclusive** — they do NOT appear on the full loyalty page, customer account, or checkout. A store relying only on the loyalty-page block can't collect birthdays.
3. **VIP tiers are fixed at exactly 3 tiers** (Base/Mid/Top) — merchants can't add a 4th or remove one; they only edit names, thresholds, multipliers, icons.
4. **The referral friend-side reward is a hard-coded 10% discount code** (`REF-{code}`), separate from the points both parties earn — not configurable in the UI reviewed.
5. **Tier and campaign/boost multipliers stack multiplicatively** (e.g. 2x tier × 2x boost = 4x) — worth stating explicitly.
6. **Points campaigns/boosts appear ungated by plan** while most other loyalty features have plan flags — confirm the intended plan availability before publishing, since the code has no boost feature flag.
7. **Points expiry math uses 30-day months**, and expiry sends **two** warning emails before points are removed.
8. Social-share dedup is **per product + platform**, so the earnable total scales with catalog size — not a one-time award.
9. Custom points name defaults are "Points"/"Point"; renaming requires Growth+.
