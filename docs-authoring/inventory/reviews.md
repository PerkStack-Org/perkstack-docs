# Feature Inventory — Product Reviews

> Source of truth: the PerkStack product codebase (`/Users/alexacea/Documents/Projects/perkstack`), read-only. Where a claim comes from a specific file it is cited in parentheses. This document is the basis for rewriting merchant-facing docs — see the **"Secrets to never put in docs"** section at the bottom for implementation details that must stay out of published docs.

App name merchants installed: **PerkStack: Loyalty & Reviews** (parent brand: **PerkStack**).

---

## Plan tiers (for gating reference)

Four tiers (`packages/shared/src/constants/plans.ts`):

| Plan | Price/mo | Trial | Order cap/mo |
|---|---|---|---|
| Free | $0 | 0 days | 100 |
| Essential | $29 | 14 days | (see plans.ts) |
| Growth | $99 | 21 days | (see plans.ts) |
| Studio | $299 | 30 days | (see plans.ts) |

Review-relevant plan flags across tiers:

| Flag | Free | Essential | Growth | Studio | What it gates |
|---|---|---|---|---|---|
| `photoReviews` | ✗ | ✓ | ✓ | ✓ | Customers can attach photos to reviews |
| `customReviewDesign` | ✗ | ✗ | ✓ | ✓ | The "Review design" customizer (star color, theme, cards, fonts) |
| `judgeMeIntegration` | ✗ | ✗ | ✓ | ✓ | Live two-way Judge.me sync (publish/reply/import) |
| `csvImport` | ✗ | ✗ | ✗ | **✓ (Studio only)** | One-time CSV import of Judge.me / Loox reviews |
| `bulkOperations` | ✗ | ✗ | ✗ | ✓ | Bulk approve/reject/spam in the moderation queue |
| `earnRulesLevel` | basic | extended | full | full | Which earn actions exist (see below) |

Earn-rule levels (`plans.ts`): `basic` = purchase, signup, **review_text**. `extended` (Essential+) adds **review_photo**, birthday, social_share. So earning points for a **text review** works on every plan; earning **bonus points for adding a photo** requires Essential+ (both because `review_photo` earn action needs `extended` and because uploading photos at all needs `photoReviews`).

> **Important nuance — review count is NEVER capped.** Only outbound *review-request emails* count toward the plan email cap (`maxEmailsPerMonth`). Free is intentionally `Infinity` emails because the 100-order cap naturally bounds it (`plans.ts` comment).

---

## 1. Review collection (submission)

**What it is:** Shoppers leave a star rating (1–5), a written review, an optional title, and optional photos directly on the product page. Reviews build social proof and can award loyalty points, creating a review → points → repeat-purchase flywheel.

**Where the shopper does it:** the **Review Form** theme block on the product page (`extensions/theme-app/blocks/review-form.liquid`). Submissions post to the storefront reviews API (App Proxy).

**Submission rules (`packages/web/app/routes/api.reviews.tsx`):**
- Rating must be an integer 1–5.
- Review body minimum length: **10 characters** (`MIN_BODY_LENGTH`). The theme form also enforces this client-side with a configurable minimum (see block settings).
- Login is required to submit (the API returns "Login required" without a signed-in customer). The form block additionally has a `require_login` toggle (default off) that gates the form UI.
- One review per customer per product — a second attempt returns "You have already reviewed this product."
- Rate limit: 30 submissions per 10 minutes per customer (this is a safety limit, not a merchant setting).
- Customers can delete their own review (controlled by the display block's "Allow customers to delete own reviews" toggle, default on).

**Verified purchase:** A review is marked "verified" if it came from a review-request email, if the customer has a matching review-request row for that product, or if a live purchase check confirms they bought it. If the merchant has "Require verified purchase" on, non-purchasers are blocked from reviewing.

**Auto-approval on submit:** A review is auto-approved if `rating >= auto-approve threshold` AND it contains no blacklisted words. Otherwise it lands as **pending** in the moderation queue. (Default threshold 4 → 4- and 5-star clean reviews publish instantly; 1–3 star or flagged reviews wait for the merchant.)

**Review form block settings** (`review-form.liquid`, merchant sets these in the theme editor):

| Setting | Type | Default |
|---|---|---|
| Accent color | color | `#f59e0b` |
| Custom heading | text | blank (uses translated default) |
| Custom submit button text | text | blank |
| Custom success heading | text | blank |
| Require login to review | checkbox | `false` |
| Require review title | checkbox | `false` |
| Minimum review length | range 0–100 ch | `10` |
| Allow photo uploads | checkbox | `true` |
| Max photos per review | range 1–10 | `5` |
| Show points incentive (earn-points badge above form) | checkbox | `true` |
| Show verified buyer hint | checkbox | `true` |
| Show confetti on submission | checkbox | `true` |

---

## 2. Review request emails (automated)

**What it is:** After an order is fulfilled, PerkStack automatically emails the customer asking them to review the product(s) they bought, with an optional single follow-up reminder. This is the main engine for generating review volume.

**How requests are timed (`packages/web/app/lib/webhooks/orders.server.ts`):**
- When an order is fulfilled, PerkStack schedules **one review request per distinct product** in that order.
- The request is scheduled for **`reviewRequestDelayDays` days after fulfillment** (default 7).
- If review requests are disabled, rows are still recorded but parked far in the future (not sent).
- If enabled, the request email is queued to send after the delay.
- The optional **reminder** is sent `reviewRequestReminderDelayDays` days after the first request (default 3), and ONLY if the customer hasn't reviewed yet (a submitted review flips the request to "reviewed" and cancels the reminder).

**Settings — merchant configures at Settings → Reviews → "Review Request Emails"** (`app.settings.tsx`, `ReviewsSection`; defaults from `packages/shared/src/constants/defaults.ts` and DB schema):

| Setting (label) | Field | Allowed | Default |
|---|---|---|---|
| Enable review request emails | `reviewRequestEnabled` | on/off | **on** |
| Request delay (days after fulfillment) | `reviewRequestDelayDays` | ≥ 0 | **7** |
| Send one reminder if no review is submitted | `reviewRequestReminderEnabled` | on/off | **on** |
| Reminder delay (days after first request) | `reviewRequestReminderDelayDays` | ≥ 1 | **3** |

When requests are disabled the delay/reminder fields are disabled in the UI. The reminder-delay field is also disabled unless the reminder toggle is on.

**Email copy customization — Settings → Email section** (`app.settings.tsx`; the Reviews section shows a banner pointing here):

| Setting | Field | Default | Notes |
|---|---|---|---|
| Request subject line | `reviewEmailSubject` | blank → template default | placeholder `How was your order from {{shop_name}}?` |
| Request body (HTML) | `reviewEmailBody` | blank → template default | HTML supported; replaces default body text. Placeholder shows `{{customer_name}}`, `{{product_title}}` |
| Reminder subject line | `reviewReminderEmailSubject` | blank → template default | placeholder `Reminder: how was your order from {{shop_name}}?` |
| Reminder body (HTML) | `reviewReminderEmailBody` | blank → template default | Leave blank to use default reminder template |

Also in the Email section: **Sender name** (`emailFromName`), **Reply-to address** (`emailReplyTo`), and a live email preview.

**Merchant language / benefit:** "PerkStack automatically asks your customers to review what they bought, a week after it ships — and nudges them once more if they forget. You control the timing, wording, and whether reviews earn loyalty points."

**Things worth noting for a docs page:**
- Requests are per-product, so a 3-item order can generate up to 3 review requests (deduped per product).
- A customer who reviews before the reminder fires won't get the reminder.
- Only one reminder is ever sent.
- Merchants can also trigger/cancel requests via Shopify Flow actions (see §7).

---

## 3. Photo reviews

**What it is:** Customers can attach photos to their review (up to a configurable max). Photo reviews are higher-converting social proof.

**Plan gating:** Uploading photos requires **`photoReviews`** (Essential+). If a Free shop's storefront posts photo keys, the API rejects with "Photo reviews require the Essential plan or higher" (402). Earning *bonus points* for a photo review additionally needs the `review_photo` earn rule (extended level = Essential+).

**Settings — Settings → Reviews → "Display Settings"** (`app.settings.tsx`):

| Setting | Field | Allowed | Default |
|---|---|---|---|
| Require photos | `reviewRequirePhotos` | on/off | **off** |
| Max photos per review | `reviewMaxPhotosPerReview` | 1–10 | **5** |

(The theme review-form block has its own "Allow photo uploads" and "Max photos" range — merchant-facing photo controls exist both server-side and in the theme editor.)

**What the shopper sees:** an upload control in the review form; approved photos render as thumbnails in the review display widget and carousel. Photos are only shown after processing completes.

**Things worth noting:**
- If "Require photos" is on, a review with no photo is rejected at submit ("At least one photo is required").
- Photos on an auto-approved review begin processing immediately; photos on a pending review process when the review is approved.

---

## 4. Review moderation / approval

**What it is:** A moderation queue where merchants review, approve, reject, mark-as-spam, reply to, and feature customer reviews.

**Where:** **Reviews** in the admin nav → `app.reviews.tsx` (queue) and `app.reviews_.$id.tsx` (single-review detail).

**Queue (`app.reviews.tsx`):**
- Filters: **status** (All / Pending / Approved / Rejected / Spam), **rating** (All / 1–5 stars), **search**, and **sort** (Newest / Oldest / Highest rating / Lowest rating).
- Pagination: 20 per page.
- Per-review inline action: **toggle Featured** (star icon) — available on every plan.
- **Bulk approve / reject / mark-as-spam**: gated on **`bulkOperations` (Studio only)**. On lower plans a banner explains the bulk actions require the Studio plan; single-review moderation still works.

**Single-review detail (`app.reviews_.$id.tsx`):** Approve, Reject, Mark as spam, write/edit/delete a **merchant reply** (public response shown under the review), toggle Featured, photo grid with processing badges, and an event timeline.

**Auto-approve settings — Settings → Reviews → "Review Moderation"** (`app.settings.tsx`):

| Setting | Field | Allowed | Default |
|---|---|---|---|
| Require verified purchase | `reviewRequireVerifiedPurchase` | on/off | **off** (DB default) |
| Auto-approve threshold | `reviewAutoApproveThreshold` | 1–5 | **4** |
| Blacklisted words | `reviewBlacklistedWords` | comma-separated list | blank (none) |
| Show reviewer names | `reviewShowReviewerName` | on/off | **on** (when off, all reviews show "Anonymous") |

**Moderation flow / what happens on approve:**
- Approving a review awards loyalty points (a `review_text` point grant, plus a `review_photo` grant if it has photos) — see §6.
- Approve fires the **Review approved** Shopify Flow trigger.
- Approve/reject/spam and replies are mirrored to Judge.me if the integration is connected (see §8).
- Approving refreshes the product's stored review summary (used for star ratings / rich snippets).
- Reviewer name display: shown as `First L.` when names are on; "Anonymous" when off.

**Things worth noting:**
- Default threshold 4 means 4–5 star clean reviews publish automatically; 1–3 star or flagged reviews queue as pending.
- Blacklisted-word match forces manual approval even for high ratings.
- A review with a blacklisted word or below-threshold rating is never auto-published.

---

## 5. Review display on the storefront

Storefront surfaces are **theme app extension blocks** (`extensions/theme-app/blocks/`) the merchant adds in the Shopify theme editor. Only **approved** reviews are ever shown publicly.

### Review Display (`review-display.liquid`) — product page
The main on-PDP reviews widget: rating summary, list/grid of reviews, sort, photos, helpful votes.

| Setting | Type | Default |
|---|---|---|
| Star & accent color | color | `#f59e0b` |
| Custom heading | text | blank (→ "Customer Reviews") |
| Layout | select: List / Grid (2 col) | `list` |
| Reviews per page | range 3–25 | `10` |
| Default sort order | select: Most Recent / Highest / Most Helpful / Lowest | `recent` |
| Show rating summary | checkbox | `true` |
| Show sort buttons | checkbox | `true` |
| Show review photos | checkbox | `true` |
| Show helpful button | checkbox | `true` |
| Show verified purchase badge | checkbox | `true` |
| Allow customers to delete own reviews | checkbox | `true` |

Shoppers can vote a review "Helpful" (idempotent, rate-limited server-side).

### Review Star Badge (`review-star-badge.liquid`) — product page
Compact star + count badge (e.g. near the product title).

| Setting | Type | Default |
|---|---|---|
| Star color | color | `#f59e0b` |
| Show review count | checkbox | `true` |

### Review Collection Stars (`review-collection-stars.liquid`) — collection grids (app embed)
Star ratings on product cards in collection/listing pages.

| Setting | Type | Default |
|---|---|---|
| Filled star color | color | `#f59e0b` |
| Empty star color | color | `#d1d5db` |
| Count text color | color | `#666666` |
| Star size | range | `14` |
| Show review count | checkbox | `true` |
| Show on products with no reviews | checkbox | `true` |

### Review Carousel (`review-carousel.liquid`) — homepage / landing sections
A rotating showcase of reviews (draws on featured/recent reviews).

| Setting | Type | Default |
|---|---|---|
| Star & accent color | color | `#f59e0b` |
| Custom heading | text | blank |
| Max reviews to show | range | `10` |
| Show review photos | checkbox | `true` |

### Featured reviews
Merchants toggle **Featured** on individual reviews in the admin; the carousel and featured-reviews surfaces highlight them.

---

## 6. Review → loyalty points flywheel

**What it is:** Submitting (and getting approved) a review earns the customer loyalty points, encouraging more reviews.

**How it works (`api.reviews.tsx`, `app.reviews.tsx`):**
- On auto-approval (or on manual approval in the queue), PerkStack grants a **`review_text`** point award, plus a **`review_photo`** award if the review has photos.
- Point amounts are governed by the merchant's loyalty **earn rules** (configured under Loyalty), not by review settings.
- **One shot per product:** once a customer has earned *any* review points (text or photo) for a given product, both bonuses are blocked on later reviews of that product — even across delete-and-resubmit cycles.
- The review form can show a "earn points" incentive badge (form block setting, default on) and the request email can mention points earnable.

**Plan note:** `review_text` earning is available on all plans (basic earn level); `review_photo` bonus needs Essential+ (extended earn level + `photoReviews`).

---

## 7. Shopify Flow triggers & actions (reviews)

Shopify Flow is a **Growth+** feature (`shopifyFlow`). Review-related Flow surfaces:

**Triggers** (`extensions/flow-triggers-reviews/` and `flow-review-trigger/`):

| Trigger (handle) | Fires when | Key payload fields |
|---|---|---|
| Review submitted (`review-submitted`) | Any new review at submission time (any rating / status) | customer, review id, product id, rating, title, body, verified purchase, has photos, status |
| Negative review submitted (`negative-review`) | A review with rating **≤ 2** (any moderation status) | same as above |
| Review approved (`review-approved`) | A review is approved | customer, review id, product id, rating, title, body, verified purchase, has photos |
| Merchant reply posted (`merchant-reply-posted`) | Merchant posts a reply to a review | customer, review id, product id, rating, review body, reply body |

**Actions** (`packages/web/app/lib/flow-actions/`, referenced in APP_INVENTORY):

| Action | Effect |
|---|---|
| `send-review-request` | Operates on existing review requests (customer_ref, order_ref, delay_days) |
| `cancel-review-request` | Flips matching scheduled requests → cancelled |
| `approve-review` | Sets status approved |
| `reject-review` | Sets status rejected |
| `feature-review` | Feature / unfeature / toggle a review |
| `post-merchant-reply` | Sets the merchant reply (1–2000 chars) |

**Merchant benefit:** e.g. auto-route negative reviews to support, auto-tag reviewers, auto-reply. The **negative-review** trigger is specifically for rescuing 1–2 star reviews while they sit in moderation.

---

## 8. Judge.me integration — LIVE two-way sync (Growth+)

> There are **two separate Judge.me capabilities** — do not conflate them:
> 1. **Live two-way sync** (`judgeMeIntegration`, **Growth+**) — ongoing publish/reply/import, described here.
> 2. **One-time CSV import** (`csvImport`, **Studio-only**) — described in §9.

**What it is (merchant promise):** The merchant connects their Judge.me account once; from then on reviews stay in sync in both directions — existing Judge.me reviews are imported, new PerkStack reviews are pushed to Judge.me, merchant replies and moderation decisions propagate to Judge.me, and Judge.me-side changes flow back into PerkStack. Lets merchants adopt PerkStack without abandoning their Judge.me review history.

**Where:** Admin → **Integrations → Judge.me** (`app.integrations_.judgeme.tsx`).

**Connecting — merchant-facing steps (`docs/JUDGEME_INTEGRATION.md`):**
1. In Judge.me: generate an **API token** (Settings → Integrations → Custom integration).
2. Generate a **webhook signing secret** (any strong random string).
3. In Judge.me webhook settings: paste the **webhook URL** shown on PerkStack's Judge.me page + the secret, and subscribe to the `review.created` and `review.updated` topics.
4. In PerkStack → Integrations → Judge.me → **Connect**: paste the API token + webhook secret.
5. PerkStack verifies the token and immediately runs a **one-time backfill** importing every existing Judge.me review. Reconnect / "Resync" is safe to run repeatedly (idempotent).

**What data comes over on backfill:** every existing Judge.me review is imported as a PerkStack review, with a mirror link so future edits stay matched. Reconnects don't duplicate.

**Direction toggles (kill switches)** — each defaults **on** after connect; managed on the Judge.me page:

| Toggle | When off |
|---|---|
| Pull | Judge.me-side changes stop reaching PerkStack |
| Push | PerkStack-side changes stop reaching Judge.me |
| Replies | Merchant replies aren't pushed to Judge.me (create + moderate still push) |

Disabling a direction does **not** delete already-synced reviews.

**Conflict rule (merchant-facing):** **PerkStack is canonical.** If the same review is edited on both sides, PerkStack's version wins unless Judge.me's change is strictly newer.

**Plan gate behavior:** Connect / test / resync require **Growth+**. If a merchant downgrades below Growth, the connection is *not* auto-removed — sync silently pauses and resumes automatically on re-upgrade, no re-paste needed. Disconnect and toggle-off remain available on any plan so a downgraded merchant can clean up.

**Things worth noting for a docs page:**
- The webhook subscription is configured inside Judge.me's own UI, not automatically.
- Merchant replies written in PerkStack appear on Judge.me too (unless the Replies toggle is off).
- Approve/reject/spam in PerkStack publishes/unpublishes on Judge.me.

---

## 9. Importing reviews via CSV (Judge.me / Loox) — Studio-only

**What it is:** A one-time bulk import of an existing review history from Judge.me or Loox by uploading their CSV export. Distinct from the live sync in §8.

**Where:** Settings → **Import** section (`app.settings.tsx`, import UI). Merchant picks a **Source** (Judge.me or Loox) and uploads a `.csv` file. Import runs in the background; an **Import history** table shows source, file, status (pending / processing / completed / failed), total rows, success count, and error count.

**Plan gating:** requires **`csvImport`**, which in code is **Studio only** (`plans.ts`: false on Free/Essential/Growth, true on Studio). The upgrade banner names the required plan dynamically.

> ⚠️ **Docs-vs-code discrepancy to resolve before writing docs:** A code comment in `plans.ts` and `docs/JUDGEME_INTEGRATION.md` describe the CSV migration as an **"Essential+"** feature, and the pricing marketing copy string in `app.settings.tsx` lists "Review migration & CSV import (Judge.me, Loox)". But the actual `csvImport` flag is **Studio-only**. The in-app action/UI error strings even say "requires the **Pro** plan" (legacy plan naming). At runtime the app behaves as **Studio-only**. Confirm the intended tier with product before documenting.

**What the import brings over (`packages/worker/src/processors/review-import.ts`):**

Common to both sources: product ID (Shopify `product_id`), rating (1–5), review body, reviewer email (used to link to an existing customer if matched), verified-purchase flag, and the original submission date. **Imported reviews are inserted as `approved`** (they skip the moderation queue).

| Field | Judge.me column(s) | Loox column(s) |
|---|---|---|
| Product | `product_id` | `product_id` |
| Rating | `rating` | `rating` |
| Body | `body` / `review` | `body` |
| Title | `title` | *(none — Loox has no title)* |
| Email | `email` | `email` |
| Verified | `verified` / `curated` | `verified_purchase` |
| Date | `created_at` | `created_at` |
| Merchant reply | *(not imported)* | `reply` + `replied_at` |

**Import behavior / gotchas:**
- Column matching is case-insensitive.
- Rows missing `product_id`, a valid rating, or a body are skipped and counted as errors (with the row number).
- Duplicate reviews (same customer+product) are skipped, counted as an error row labeled "Duplicate review (skipped)".
- Only the first 100 errors are retained in the import log.
- File must be `.csv`. Import is asynchronous — the merchant checks the history table for progress.
- Judge.me imports do **not** bring over the merchant reply; Loox imports do.

---

## 10. Review SEO / rich snippets / star ratings in search

**What it is:** PerkStack outputs Product + AggregateRating structured data (JSON-LD) so star ratings can appear in Google search results and product pages carry review rich snippets.

**Where:** the **Review SEO** theme block (`review-jsonld.liquid`, target: `head`), added on the product page. It emits `schema.org` Product / AggregateRating / Review JSON-LD, sourcing the aggregate from the product's stored review summary (Shopify metafield `metafields.perkstack.review_summary`), which is refreshed whenever a review is approved/deleted.

**Merchant benefit:** "Show star ratings in Google search results and boost click-through — no code needed, just add the Review SEO block."

**Things worth noting:**
- The block has no merchant-facing settings — it's add-and-go.
- The aggregate reflects only approved reviews.
- Collection-page stars (§5) are a visual widget, separate from the JSON-LD.

---

## 11. Review design customizer (Growth+)

**What it is:** A central "Review design" page that brand-matches all storefront review surfaces (star color, theme, card styling, typography, button shape) — a single place instead of per-block theme settings.

**Where:** Admin → Settings → **Review design** (`app.reviews-customize.tsx`), with a live preview. Gated on **`customReviewDesign` (Growth+)**; lower plans see the controls with an upgrade banner and can't save changes.

**Settings & defaults (`app.reviews-customize.tsx`):**

| Setting | Options | Default |
|---|---|---|
| Star color | hex color | `#f59e0b` |
| Theme | Auto (match storefront) / Light / Dark / Custom | `auto` |
| — Custom background (theme=custom) | hex | `#ffffff` |
| — Custom text (theme=custom) | hex | `#1a1a1a` |
| Card style | Soft (subtle background) / Bordered | `soft` |
| Corner radius | 0–32 px | `16` |
| Font family | Inherit theme / Inter / Manrope / DM Sans / Plus Jakarta Sans / Geist / Space Grotesk / Sora / Playfair Display / Fraunces / Crimson Pro | Inherit (blank) |
| Font weight | Light / Normal / Bold | `normal` |
| Button shape | Sharp / Rounded / Pill | `pill` |

**Note:** individual theme blocks (§5) still carry their own color/heading settings; the Review design page is the brand-consistency layer on top and is Growth+.

---

## Analytics (reviews)

Admin → Analytics → Reviews (`app.analytics.reviews.tsx`): review volume + rating trend, request **funnel** (sent → opened → clicked → reviewed), moderation backlog with median approval lag, quality metrics (verified / photos / replies / helpful), rating histogram, and product coverage. Advanced analytics layers (comparison deltas, funnels, cohorts, CSV export) are gated on `analyticsAdvanced` (Growth+); the review analytics tab is visible on all plans but advanced sections render disabled below Growth.

---

## Admin customer block

Each customer's review list is surfaced in a Shopify admin customer block (`admin-customer-reviews` extension) — required for App Store reviews-category compliance.

---

# SECRETS TO NEVER PUT IN DOCS

Flag these to doc writers — none of the following should appear in published merchant docs:

**Tech stack / infra**
- Monorepo layout, package names (`@perkstack/*`, `packages/web`, `packages/worker`, `packages/shared`), Remix, Polaris, Drizzle ORM, BullMQ, Redis, PostgreSQL, Docker, pnpm/Bun/Turbo.
- Node/pnpm/Bun/Shopify CLI versions, build tooling.

**Third-party vendors (internal implementation)**
- **Resend** (email delivery), **React Email** templates.
- **Cloudflare R2** object storage for photos (`downloadObject`, `getPublicR2Url`, `getPresignedUploadUrl`, `imports/…`, `reviews/…` object keys), **Sharp**/image processing pipeline.
- **Cloudflare** (`cf-connecting-ip` header).
- Judge.me *internal* wiring: API base `https://judge.me/api/v1`, `Authorization: Token token=…` header, HMAC header names (`x-judgeme-hmac-sha256` etc.), token-bucket rate limiter (5 req/s), `TOKEN_ENCRYPTION_KEY`, and the internal webhook route shape `/api/webhooks/judgeme?shop=…`. (The merchant-facing "paste token + secret, subscribe to review.created/updated" steps ARE fine to document.)

**Internal identifiers / queues / workers**
- Queue/worker names: `review-request`, `photo-process`, `review-import`, `judgeme-backfill`, `judgeme-pull`, `judgeme-push`, `points-award`, `flow-trigger-dispatch`, etc.
- Internal functions: `enqueueReviewRequest`, `enqueuePointsAward`, `enqueuePhotoProcess`, `emitJudgeMePushEvent`, `fireReviewApprovedTrigger`, `updateProductReviewSummary`, `verifyPurchaseViaShopify`.

**Database tables / columns**
- Table names: `reviews`, `review_photos`, `review_helpful_votes`, `review_requests`, `review_imports`, `judge_me_review_links`, `settings`, `customers`, `shops`, `job_runs`, `audit_logs`.
- Raw column/field names (`reviewAutoApproveThreshold`, `reviewRequestDelayDays`, `processingStatus`, `thumbnailSmallKey`, etc.) — docs should use the merchant-facing UI labels, not the code field names.

**Internal API route shapes / mechanisms**
- App Proxy route names (`api.reviews`, `api.review-status`, `api.featured-reviews`, `proxy.api.*`), the HMAC email-tracking token scheme (`requestId:SHOPIFY_API_SECRET`), rate-limit constants, cache scopes/TTLs.

**Plan-model internals**
- The flag names themselves (`photoReviews`, `csvImport`, `judgeMeIntegration`, `bulkOperations`, `customReviewDesign`, `earnRulesLevel`) — docs should speak in plan names (Free/Essential/Growth/Studio) and feature descriptions, not code flags.
- Legacy plan names `starter` / `pro` (the "requires the Pro plan" strings are stale internal naming — never surface).

---

# Summary (5 lines)

1. **Reviews are fully built end-to-end:** collection form, fulfillment-triggered request+reminder emails (default 7-day delay, 3-day reminder), photo reviews, a moderation queue with auto-approve-threshold (default 4) + blacklist + verified-purchase gating, six storefront theme blocks, JSON-LD rich snippets, a review→points flywheel, four Flow triggers + six Flow actions, and Judge.me live sync + CSV import.
2. **Surprise — CSV import is Studio-only in code**, but a `plans.ts` comment, `JUDGEME_INTEGRATION.md`, and marketing copy call it "Essential+"/"migration", and in-app strings still say "requires the **Pro** plan" (dead legacy naming). Confirm the intended tier before documenting.
3. **Two distinct Judge.me features that docs must not conflate:** live two-way sync (Growth+) vs. one-time CSV import (Studio-only); Loox is CSV-import only.
4. **Undocumented-in-old-docs but real:** the Growth+ **Review design** customizer, the **review-photo one-shot-per-product** points lock (survives delete/resubmit), imported reviews landing as pre-approved, Judge.me CSV import not carrying merchant replies (Loox does), and review *count* never being capped (only request *emails* count toward the plan email cap).
5. **`docs/plans/REVIEWS.md` is a stale stub** ("This spec has not been written yet") — do not use it as a feature source; the shipped behavior lives in `app.settings.tsx`, `app.reviews*.tsx`, `api.reviews.tsx`, `orders.server.ts`, the theme-app blocks, and the worker processors cited above.
