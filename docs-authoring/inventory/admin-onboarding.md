# Feature Inventory — Merchant Admin Experience (Onboarding, Dashboard, Customers, Settings)

Source of truth: the product codebase at `/Users/alexacea/Documents/Projects/perkstack` (read-only scan).
Scope of this file: the embedded admin app the merchant uses inside Shopify admin — **excluding** the loyalty / reviews / widget *feature specifics* (covered by other agents). Where those overlap, this file only documents the settings pages, onboarding flow, dashboard, and customer management screens themselves.

App canonical name (install screens / App Store): **PerkStack: Loyalty & Reviews**. In-admin brand mark: **PerkStack**. (`README.md`; `shopify.app.toml`)

---

## 0. App shell & navigation

- The whole admin lives under `/app` (`packages/web/app/routes/app.tsx`). It wraps every page in App Bridge + Polaris, shows the top nav menu, an order-cap banner, and — if onboarding isn't finished — the full-screen Onboarding Wizard instead of any page.
- **Left nav menu** (only appears *after onboarding is completed*): `PerkStack` (home) · **Analytics** · **Loyalty** · **Reviews** · **Customers** · **Integrations** · **Shopify Flow** · **Settings** (`app.tsx` lines 145–159).
  - Before onboarding completes, only the "PerkStack" home link shows; the rest are hidden. Docs "getting started" flow should reflect that the nav unlocks after the wizard.
- A global **order-cap banner** (`CapBanner`) renders on every page when a cap snapshot is available: shows orders used vs the plan's monthly order limit, links to Settings → Billing and to Cap Recovery.
- The app auto-creates the shop record on first load if missing (`install.server.ts`) — merchants never "set up an account", install = ready.

---

## 1. Onboarding

**Where it lives:** Full-screen wizard shown automatically on first load until finished; not in the nav. Backed by `components/OnboardingWizard.tsx` + completion endpoint `routes/app.onboarding.tsx`. Gate = `shops.onboardingCompletedAt` is null (`app.tsx` line 111, 161).

### What the merchant sees / does
A 4-step wizard (`OnboardingWizard.tsx`, `STEPS = ["welcome","points","branding","launch"]`). A thin progress bar shows on steps 2–4. Every step says "You can change this later."

| Step | Screen name / heading | What it does | Fields & defaults |
|---|---|---|---|
| 1 | **Welcome** — "Loyalty, reviews & referrals" / "All the perks your customers want" | Value-prop intro (5 benefit rows: points on purchase, reviews, referrals, storefront panel, automated emails). Links to Terms & Privacy at perk-stack.com. | Button: **Get started**. No inputs. |
| 2 | **Points** — "Reward every order with points" | Picks the purchase earn rate (% back). | Preset cards **3% / 5% / 10%** + a **Custom** field (0.1–100, step 0.1). **Default selected: 5%** ("Recommended for most businesses"). Live example: "$100 spend → N points" where N = rate×100. |
| 3 | **Branding** — "Style your program to match your store" | Styles the storefront launcher panel with a live preview. | **Accent color** (default `#C49A3C`); **Launcher header image** (paste image URL — no upload here); when an image is set: **Overlay opacity** slider (0–100, step 5, default **50%**) and **Fullscreen background** checkbox (default off). |
| 4 | **Launch** — "You're ready to roll out!" | Summarizes what happens next (earn points, auto review requests, launcher added, email notifications). Writes settings and completes onboarding. | Primary: **Launch your program**. Secondary: **Explore PerkStack** (= skip; completes onboarding without applying step 2/3 values). |

### What "Launch" actually writes (`app.onboarding.tsx`)
- Updates the **purchase** earn rule: `pointsPerCurrencyUnit = <rate>.0000`, description "`<rate>` points per $1 spent".
- Sets settings: `widgetAccentColor` (default fallback `#16a34a` if blank — note this differs from the wizard's `#C49A3C` default color shown), `launcherHeaderImageUrl`, `launcherOverlayOpacity` (clamped 0–100), `launcherImageFullscreen`.
- Stamps `shops.onboardingCompletedAt = now` → unlocks the nav and normal dashboard.
- **Skip / "Explore PerkStack"** posts `skip=true`: it *only* stamps `onboardingCompletedAt` and does **not** apply the points rate or branding — those stay at defaults.

### Things worth noting for a docs page
- Onboarding is unavoidable on first install but fully skippable; nothing is charged and no plan is chosen here (billing is separate, in Settings).
- The "how it works" high-level story is exactly the Welcome + Launch step copy: earn points on purchases, auto review requests after purchase, a floating launcher button on the storefront, and automated point/review emails.
- **Enabling the app in the theme is NOT part of the wizard.** After onboarding, the *Dashboard's Theme Setup checklist* (below) is where the merchant actually turns on storefront blocks. Docs onboarding order should be: install → wizard → Dashboard Theme Setup → add theme/checkout/account/admin blocks.
- Dev-only: Settings has a hidden `reset-onboarding` intent (blocked in production) to replay the wizard.

---

## 2. Dashboard / Home (`app._index.tsx`)

**Where it lives:** the `PerkStack` home nav link (`/app`). Heading: **"Welcome to PerkStack"**, subtitle "Showing activity from the past 30 days."

### What the merchant sees / does
- **KPI stat cards** with mini-sparklines: total points issued and total points redeemed (all-time totals from the ledger), plus a 30-day points-earned series driving the sparkline. (Loader computes `totalPointsIssued`, `totalPointsRedeemed`, and `pointsEarnedByDay` for the last 30 days.)
- **Header controls:** a **"Get more from PerkStack"** primary button (links Settings → Billing; hidden on the top plan) and a **loyalty on/off status pill** ("Loyalty program on/off", links to Loyalty page; reflects `shops.loyaltyEnabled`).
- **Top banner (one at a time):** if theme blocks aren't detected → an amber **"Add PerkStack blocks to your theme"** hero banner with an **Enable PerkStack** button (opens the launcher tutorial). Otherwise, on the Free plan → an info banner prompting upgrade. The theme banner is dismissible (persisted in localStorage).
- **Theme Setup checklist card** (the "extension status" screen) — the core setup-health surface. See below.
- A lightweight **feedback prompt** (good/bad + star rating) shown once (localStorage-gated).

### Theme Setup checklist — what it actually checks
Card titled **"Theme Setup"** with an "X of Y active" counter and an "All set up!" success badge. Three grouped sections: **Loyalty**, **Reviews**, **Admin pages**. Each row shows a green/grey status dot, an **Active** / **Not added** badge, and a **Manage / Set up / Learn more** button that opens a short looping **video tutorial modal** then hands off to the relevant editor.

Two different detection mechanisms:
1. **Theme blocks (8)** — detected by live-probing the store's *main* theme via Shopify GraphQL (reads `config/settings_data.json`, `templates/*.json`, `sections/*.json` and matches block handles). Blocks:
   - Loyalty group: **Loyalty Launcher** (app embed, all pages), **Loyalty Page** (app block).
   - Reviews group: **Review Display**, **Review Form**, **Review SEO** (JSON-LD head), **Review Star Badge**, **Review Collection Stars**, **Review Carousel**.
2. **Checkout / Account / Admin extensions** — detected *truthfully via heartbeats* (an extension only shows **Active** if it actually rendered for a customer within a **30-day** window), NOT by theme probing:
   - **Checkout Widget** and **Account Dashboard** rows — only shown if the store is **Shopify Plus** (checkout extensibility). Deep-links into the checkout/customer-account editor (resolves the published checkout profile id).
   - **Loyalty program block** and **Customer reviews block** — admin blocks on Shopify's native customer page. These have **no auto-detected status** ("Learn more" opens a walkthrough modal because Shopify offers no deep-link to add a customer-page block).
- If detection fails, a warning banner appears ("We couldn't check your extension status right now…").
- The tutorial modals ship real MP4 walkthroughs (e.g. `/loyalty-launcher-tutorial.mp4`, `/checkout-block.mp4`). Each explains that **colors/copy/fonts live in the app** (Widget customize) while the theme editor only controls placement + on/off.

### Analytics (dashboard metrics — brief; full detail is another agent's area)
Analytics is its own nav item (`/app/analytics`), a six-tab hub (**Overview, Customers, Points, Rewards, Reviews, Referrals & engagement**). History depth is capped by plan (`dashboardDays`: Free 30d, Essential 90d, Growth 180d, Studio unlimited). Advanced analytics (deltas, funnels, cohort retention, insights strip, CSV export) are gated to **Growth+** (`analyticsAdvanced`). Locked period presets name the plan that unlocks them. There is also a **weekly digest email** (opt-out toggle in Settings → Email). Metrics themselves = attributed revenue/orders/AOV/active members, points economy, reward funnels, review funnels, referrals.

### Things worth noting for a docs page
- The dashboard is read-only reporting + setup health; the merchant does not configure the program here.
- "Active" for checkout/account/admin blocks is behaviour-based (heartbeat), so a freshly-added block can read "Not added" until a customer loads it — worth explaining to reduce confusion.

---

## 3. Customers

**Where it lives:** **Customers** nav item. List page `app.customers.tsx`; per-customer detail page `app.customers.$id.tsx`. Plus native admin blocks on Shopify's own customer page (section 5).

### Customer list (`app.customers.tsx`)
- **Search** by name or email; **20 per page** with pagination; shows total count.
- Table columns: Customer (name + email), **Points Balance**, **Tier** (only if VIP tiers enabled), Orders, Total Spent, Joined (relative), **Status** (Active / **Frozen** badge), Manage.
- **Tier column only appears** when the shop has the `vipTiers` feature (Growth+) AND tiers are enabled in settings AND tiers exist.
- Empty state: "No customers yet — Customers will appear here once they interact with your loyalty program or leave a review."

### Per-row "Manage" modal (list page) — actions
A 3-tab modal (**Overview / Adjust Points / History & Actions**):
- **Freeze / Unfreeze Loyalty** — flips `loyaltyFrozen`. A frozen customer **cannot earn or redeem points** (banner states this).
- **Change Tier** (tiers only) — set a manual **tier override** (assign a specific tier) or **Reset to auto** (clear override, revert to points-based tier).
- **Reset Balance to 0** — writes an `adjust` ledger row bringing balance to 0.
- **Expire Active Points** — writes an `expire` ledger row (disabled when balance ≤ 0).
- **Delete Customer** — confirm modal; permanently deletes all loyalty records (points, redemptions, reviews, referrals). Cannot be undone.
- **Adjust Points tab** — Direction (**Add / Subtract**), Amount (pts), Reason (free text, "Visible in the customer's points history"). Writes an `adjust` ledger row.
- **History & Actions tab** — loads the latest **15** ledger rows (lazily; also syncs Shopify orders/spend on open — see below), each with a **Void** action (reverses that transaction). Voided rows show struck-through with a "voided" badge.

### Customer detail page (`app.customers.$id.tsx`)
- Full profile. On load it **auto-syncs the customer's Shopify orders + total spent** (counters only ever move up — Shopify excludes test orders, so it won't wipe webhook-counted orders on dev stores).
- Shows: live points balance, orders, total spent, tier progress (with a progress bar toward next tier), last transactions, recent reviews, and **pending point grants** (from the Points-Delay holding queue — amount, source order, when they'll land).
- **Adjust points** here also fires the `manual-ledger-adjustment` Shopify Flow trigger (admin-initiated). Same Add/Subtract/Reason contract as the list modal.
- **Grant reward** — gated on `rewardRedemptionLimits` (**Essential+**). Requires a **reason of ≥10 characters**. Optional **cost override** (empty = reward's normal cost, "0" = free grant, otherwise a non-negative integer). **Refuses** if the customer already has a pending redemption ("Ask them to use or void it before granting another"). Enqueues discount-code creation.

### What freeze / tier-override actually do (for docs)
- **Freeze**: a hard pause on loyalty participation — no earning, no redeeming — without deleting the customer or their balance. Reversible.
- **Tier override**: pins the customer to a chosen tier regardless of their lifetime points; shows a "Manual override" badge. "Reset to auto" returns them to the normal points-threshold tier. (Only meaningful when VIP tiers are on.)

---

## 4. Settings (`app.settings.tsx`)

**Where it lives:** **Settings** nav item. Single page with a **left-side section nav** (dropdown on mobile). Uses the App Bridge **Save Bar** (Save/Discard) that appears when a section is dirty (hidden on Billing & Import). URL param `?section=<id>` deep-links each section.

**Section list (`SIDEBAR_ITEMS`):** General · Billing · Tiers · Widget · Email · Reviews · **Agent Access** · Custom CSS · Import.
(`app.billing.tsx` and `app.import.tsx` are thin redirects into `?section=billing` / `?section=import`.)

### 4.1 General
- **Points / loyalty currency** (LoyaltySection): plural name (default **"Points"**), singular name (default **"Point"**), points icon URL. Points **expiry months** (default **null = never expires**; min 1). **Expiry notification days** (default **30**, min 1). **Points delay** toggle (default **off**) + delay days (default **30**, range 1–365).
- **Logo**: Logo URL (shown in widget + emails), default empty.
- Gating: changing points name/singular/icon requires **`customPointsCurrency`** (Growth+); Points Expiry requires **`pointsExpiry`** (Essential+); Points Delay requires **`pointsDelay`** (Essential+). Gates only fire when the value actually *changes* — a downgraded shop can still save unrelated fields.

### 4.2 Billing
- Reconciles DB plan against Shopify on view (prod only). Renders four plan cards (**Free / Essential / Growth / Studio**) with marketing copy + highlights, current-plan badge, and upgrade/downgrade/cancel actions (`billing.request` / `billing.check` / `billing.cancel`).
- Downgrade shows a **"features you'll lose"** list computed from plan feature diffs (`DOWNGRADE_FEATURE_LABELS`).
- Test billing is auto-detected for dev/partner stores; a dev bypass writes `shops.plan` directly.
- Plan facts (`packages/shared/src/constants/plans.ts`): Free $0 (100 orders/mo, 30d analytics), Essential $29 (500 orders, 5,000 emails, 90d, 14-day trial), Growth $99 (2,500 orders, 25,000 emails, 180d, 21-day trial, overage $25/500 max $99), Studio $299 (10,000 orders, 50,000 emails, unlimited analytics, 30-day trial, overage $30/1,000 max $300).

### 4.3 Tiers (VIP)
- Gated on **`vipTiers`** (Growth+); below that the section shows an upgrade state.
- **Enable tiers** toggle (`tiersEnabled`, default **off**). Exactly **3 tiers** required. Per tier: name, icon URL, **min lifetime points** (base tier must be 0; thresholds strictly ascending), **points multiplier** (≥1.00), and optional per-tier launcher overrides (hero image, overlay opacity 0–100, accent hex).
- Defaults (`DEFAULT_TIERS`): **Member** (0 pts, 1.00×) · **Silver** (500 pts, 1.25×) · **Gold** (1,500 pts, 1.50×).
- Per-tier launcher hero/accent overrides are additionally gated on **`customLauncherHero`** (Growth+) and only enforced when a value is actually set.
- **Reset to defaults** button restores the 3 default tiers and clears all overrides.

### 4.4 Widget (appearance)
The Widget section is the settings entry point; the deep launcher/loyalty-page designer lives at **`app.widget-customize.tsx`** and the floating button designer at **`app.trigger-customize.tsx`**. Defaults from those loaders:
- **Launcher panel designer** (`widget-customize`): accent color (default `#16a34a`), header image + overlay opacity (default 50) + fullscreen toggle, header bg color (null = match accent), **panel theme** (`auto` / light / dark / custom, default **auto**), panel bg color (default `#FAF6F0`), panel text color (default `#2A2118`), **surface radius** (default 12), **button shape** (sharp/rounded/**pill**), **panel font** (curated Google Fonts list, default "Inherit theme font"), **heading font**, **heading scale** (compact/**standard**/large/display), **card style** (**soft**/bordered), **font weight** (light/**normal**/bold), logo image, and editable copy (heading/subheading/eyebrow/join label). Image upload is R2-backed, 5 MB max, jpeg/png/webp. A **Resync theme** action re-pushes config to the storefront.
  - Gates: custom hero/logo image + brand-matching color controls require **`customLauncherHero`** (Growth+); the resync action is likewise gated.
- **Floating trigger button designer** (`trigger-customize`) defaults (`DEFAULTS`): text **"Rewards"**, bg `rgba(0,0,0,0.75)`, text/icon color `#ffffff`, icon URL empty, **shape** `icon-label` (options: Icon and label / Icon only / **Label only**), border radius **40** (0–40), match-theme **off**.
  - Gates: **"Label only"** (hides the PerkStack mark) and a **custom icon URL** require **`customLauncherIcon`** (Growth+); enforced only when the value changes.
- Storefront-config defaults live in `DEFAULT_SETTINGS`: `widgetPrimaryColor` `#6366f1`, `widgetPosition` `bottom-right`, `widgetShowPages` `all`, `widgetGuestBehavior` `prompt_signup`. Checkout widget defaults: title **"Rewards wallet"**, theme `auto`, card style `elevated`, show tier/progress/rewards all **true**.

### 4.5 Email
- **From name** (`emailFromName`, default empty), **Reply-to** (`emailReplyTo`, validated as an email, default empty). These control the sender identity + branding of transactional emails.
- **Merchant notifications** — weekly analytics digest toggle (`analyticsDigestEnabled`, default **on**), opt-out for the Monday digest email.
- **Branding** — **`brandingEnabled`** toggle ("Powered by PerkStack" mark). Default in `DEFAULT_SETTINGS` is **false** (paid plans hide the mark by default); removing branding is gated on **`brandingRemoval`** (Essential+) — Free shops always show the mark regardless of the stored flag.
- **Monthly email usage** progress bar (sent vs plan cap, calendar-month in shop timezone) and, on Growth/Studio, overage line-item status.
- Custom sender **domain** is a Studio-only feature (`customSenderDomain`); custom email **templates** Studio-only (`customEmailTemplates`).

### 4.6 Reviews (settings)
Review *settings* fields (defaults from `DEFAULT_SETTINGS` / `settingsToForm`):
- **Auto-approve threshold** (star rating at/above which reviews auto-publish; default **4**, range 1–5).
- **Blacklisted words** (free text, default empty) — reviews containing them get held.
- **Review request enabled** (default **on**), **request delay days** (default **7**, ≥0).
- **Reminder enabled** (default **on**), **reminder delay days** (default **3**, ≥1).
- **Show reviewer name** (default **on**).
- **Require photos** (default **off**); **Require verified purchase** (default **off**).
- **Max photos per review** (default **5**, range 1–10).
- Customizable **request** + **reminder** email subject/body (defaults empty = use built-in templates).
- (Photo reviews as a capability are gated on `photoReviews`, Essential+; deeper review feature detail is another agent's area.)

### 4.7 Agent Access (MCP)
- Generates **Personal Access Tokens** so AI assistants (Claude, ChatGPT, Cursor, Rovo) can operate the loyalty program via MCP. Gated on **`mcpAccess`** (Growth+) — lower plans see an upgrade card. Tokens table + **Generate** / **Revoke** modals + a copy-paste `mcp.json` snippet. Max 10 tokens/shop. Revoke stays available on any plan.

### 4.8 Custom CSS
- Studio-only (`customCSS`). A CodeMirror editor to fine-tune the storefront launcher + loyalty page. Sanitized server-side.

### 4.9 Import
- Studio-only (`csvImport`). CSV review import from **Judge.me** or **Loox** (≤50 MB upload). Shows recent import jobs.

### Settings gating pattern (worth a docs note)
Plan-gated fields (Points Delay, Points Expiry, Custom Currency, Custom Launcher Hero, Custom CSS, Branding Removal, CSV Import) only enforce the plan requirement **when the value changes**. A downgraded merchant keeps their stored values (storefront serves defaults) and can still edit unrelated settings without being forced to clear premium ones; re-upgrading reactivates them.

---

## 5. Native Shopify customer-page admin blocks (extensions)

These render on Shopify's **own** customer detail page (Admin → Customers → a customer → Blocks → + Block), not inside the PerkStack app. Merchant adds them manually (tutorial in the Dashboard checklist).

- **Loyalty program** block (`admin-customer-loyalty`, handle `customer-loyalty-tier-block`, target `admin.customer-details.block.render`): shows/edits points balance (**Adjust balance** with Action/Amount/Reason), referrals summary (Referrals gated to **Growth** — shows an upsell line otherwise), VIP tier (**Change tier** with "Manual override" badge), and reward **redemption**.
- **Customer Reviews** block (`admin-customer-reviews`, handle `customer-reviews-block`): lists all reviews submitted by that customer (also satisfies App Store reviews-category compliance).
- Both ping a heartbeat endpoint on render (drives the Dashboard "Active" status, 30-day window).

---

## 6. Plan / tier gating summary (admin surfaces in this area)

| Feature (flag) | Min plan | Admin surface affected |
|---|---|---|
| `brandingRemoval` | Essential | Settings → Email (branding toggle) |
| `pointsExpiry`, `pointsDelay` | Essential | Settings → General |
| `rewardRedemptionLimits` | Essential | Customer detail → Grant reward |
| `vipTiers` | Growth | Settings → Tiers; Customers tier column & Change Tier |
| `customPointsCurrency` | Growth | Settings → General (points name/icon) |
| `customLauncherHero` | Growth | Widget customize (hero/logo/brand colors + resync) |
| `customLauncherIcon` | Growth | Trigger customize ("Label only" + custom icon) |
| `analyticsAdvanced` | Growth | Analytics advanced tabs/export |
| `mcpAccess` | Growth | Settings → Agent Access |
| `customCSS`, `csvImport`, `customSenderDomain`, `customEmailTemplates`, `bulkOperations` | Studio | Settings → Custom CSS / Import / Email |

Legacy plan ids `starter`→essential and `pro`→studio exist for grandfathered rows only.

---

## 7. SECRETS — DO NOT put these in customer-facing docs

Implementation details discovered while researching this area. Doc writers should describe *what the merchant sees and does*, never these:

- **Tech stack:** Remix + Polaris + App Bridge front end; Drizzle ORM; PostgreSQL; Redis; BullMQ workers; Bun/tsx worker runtime. Never name these.
- **Storage / vendors:** **Cloudflare R2** (image uploads, presigned PUT URLs), **Resend/Sharp** (emails/photo processing per broader inventory), **Intercom** (support messenger, currently code-commented), **Lottie/DotLottie** (onboarding animation), Google Fonts injection. Don't name vendors; say "uploads", "emails", "support chat".
- **DB tables/columns:** `shops.onboardingCompletedAt`, `settings.*`, `point_transactions` (ledger, `type` earn/redeem/expire/adjust/void), `customers.loyaltyFrozen` / `tierOverrideId` / `lifetimePointsEarned`, `pending_point_grants`, `tiers`, `analytics_daily_rollups`, `email_sends`, `cap_misses`, `agent_tokens`, `mcp_tool_calls`, `shop_order_stats_daily`. Describe features, not schema.
- **Detection internals:** Theme-block presence is read by scanning the theme's `settings_data.json`/`templates/*.json`/`sections/*.json` via Shopify GraphQL; extension "Active" status comes from **Redis heartbeats with a 30-day TTL** written by `/api/admin-extension-pinged` and the storefront extensions. Present this to merchants only as "we detect whether the block is added / has loaded recently."
- **Heartbeat / probe endpoints, GraphQL queries, checkout-profile-id resolution** — internal wiring.
- **Cron/queue names & cadences:** `stats-compute`, `points-expire`, `birthday-scan`, `tier-recompute`, `points-delay-promote`, `analytics-digest`, `overage-meter`, etc. Merchants should just hear "runs automatically / daily".
- **Billing internals:** Shopify subscription plan names (`Essential`/`Growth`/`Studio`), `BILLING_TEST`, partnerDevelopment test-mode detection, dev bypass that writes `shops.plan` directly, `SHOPIFY_API_KEY`, return-URL construction.
- **Scopes / config:** OAuth scopes (`read_products`, `write_discounts`, `read_themes`…), App API version `2026-01`, app-proxy subpath `perkstack`, extension UIDs/handles (e.g. `c72d1e43-…`, `…74c11ccd`), `TOKEN_ENCRYPTION_KEY`, MCP `pk_…` token format + SHA-256 hashing.
- **Env vars, R2 keys, file-path/key structures** (e.g. `imports/<shopId>/…`), rate-limit numbers, worker idempotency keys.
- **Internal/unshipped state:** `discount-gift-catalog` Shopify Function is checked in but **disabled** (javy toolchain not wired); Klaviyo OAuth callback is a **501 stub** (connect uses API-key paste); Gorgias/Mailchimp/Omnisend are **catalog stubs** only. Don't document these as working features.
- **Naming collision (internal caution):** "Loyalty Studio" is both the customer-account extension display name and the top plan tier — keep them disambiguated in docs.
