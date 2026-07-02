# Feature Inventory — Storefront Widgets & Customer-Facing Extensions

Source of truth: product codebase at `/Users/alexacea/Documents/Projects/perkstack`
(read-only). Verified against extension source, `shopify.extension.toml` configs,
Liquid block `{% schema %}`, locale files, and the admin customization routes in
`packages/web`. Trust this over the current published docs.

---

## 0. The real set (corrected)

The storefront/customer-facing surface is delivered by **four** Shopify extensions:

| Extension (folder) | Merchant-facing surface(s) | Where it appears |
|---|---|---|
| `extensions/theme-app` | **8 theme blocks** (see §1) | Storefront theme (via theme editor) |
| `extensions/checkout-ui` | Checkout rewards widget (§2) | Checkout (via checkout editor) |
| `extensions/customer-account` | "Loyalty Studio" loyalty page (§3) | Shopify customer account area |
| `extensions/app-pixel` | Behind-the-scenes tracking pixel (§4) | Not placeable / invisible |

The current docs list 9 "widgets": Loyalty Launcher, Review Display, Review Form,
Star Badge, Collection Stars, Review Carousel, Loyalty Page, Checkout Widget,
Customer Account. All 9 map to real surfaces, BUT:

- **Missing from docs:** the **Review SEO** theme block (`review-jsonld.liquid`) — a
  real, addable block that outputs review rich-snippet data. Not documented.
- **Naming correction:** the customer-account surface is presented to merchants as
  **"Loyalty Studio"** (not "Customer Account") — that is the extension name shown
  in Shopify's account editor. Docs folder is `customer-account`; the label is
  "Loyalty Studio".
- The current docs names **Star Badge / Collection Stars / Checkout Widget /
  Customer Account** correspond to the real block names **Review Star Badge /
  Review Collection Stars / (checkout-ui) / Loyalty Studio**.
- Nothing currently documented is *absent* from the code.
- **`app-pixel` is not a widget** — it is a tracking pixel, not something a merchant
  places, so it should not get a widget doc page (mention only if explaining
  attribution/analytics).

---

## 1. Theme-app blocks (8)

Block names below are exactly what the merchant sees in the Shopify **theme editor**
(from `extensions/theme-app/shopify.extension.toml`). "Target" indicates how a block
is added:
- **App-embed** blocks (target `body`) → enabled under *Theme editor → App embeds*
  (left sidebar, bottom). They float / auto-inject; no fixed placement.
- **Section/head** blocks (target `section` / `head`) → added via *Add block* inside
  a specific section (usually the product template).

### 1.1 Loyalty Launcher
(`extensions/theme-app/blocks/perkstack-launcher.liquid`)

1. **What it does:** Floating rewards button that opens a modal panel. Signed-in
   shoppers see balance, tier progress, ways to earn, redeemable rewards (with
   discount-code generation + "apply to cart"), referral link, and pending-points
   status. Guests see a join/sign-in hero.
2. **How to add:** Theme editor → **App embeds** → enable **"Loyalty Launcher"**
   (it is a body/app-embed block — floats site-wide, no manual placement).
3. **Theme-editor settings:**

| Setting (id) | Label | Type | Allowed values | Default |
|---|---|---|---|---|
| `header_store_name` | Store name in header | text | free text | blank → uses Shopify store name |
| `button_label` | Button label | text | free text | `Rewards` |
| `position` | Position | select | `bottom-right`, `bottom-left` | `bottom-right` |
| `theme` | Theme | select | `auto` (match storefront), `dark`, `light` | `auto` |

   A `paragraph` note in the schema tells merchants that heading, sub-line, eyebrow,
   colors and fonts live in the app (**Apps → PerkStack → Widget customize**) — see §5.
4. **Gating:** Block itself is available on all plans. Deep brand matching / hero
   image (§5) is Growth+. "Powered by PerkStack" footer removal is Essential+ (§6).
5. **Docs notes:** Most of the launcher's look (heading, subheading, eyebrow, panel
   colors, fonts, card style, button shape, hero image, logo) is controlled from the
   admin **Widget customize** page (§5), NOT the theme editor — the theme block only
   exposes label/position/light-dark. `auto` theme matches the storefront's color
   scheme; fonts always inherit from the theme unless overridden in the app.

### 1.2 Review Display
(`extensions/theme-app/blocks/review-display.liquid`)

1. **What it does:** The main on-page reviews block — rating summary, distribution
   bars, sortable review list/grid, photos, verified badges, helpful votes.
2. **How to add:** *Add block* → **"Review Display"** inside a section (typically the
   product template, below the product info).
3. **Theme-editor settings:**

| Setting (id) | Label | Type | Allowed values | Default |
|---|---|---|---|---|
| `accent_color` | Star & accent color | color | hex | `#f59e0b` |
| `heading_text` | Custom heading | text | free text (placeholder "Customer Reviews") | blank → default |
| `layout` | Layout | select | `list`, `grid` (2 columns) | `list` |
| `reviews_per_page` | Reviews per page | range | 3–25, step 1 | `10` |
| `default_sort` | Default sort order | select | `recent`, `highest`, `helpful`, `lowest` | `recent` |
| `show_summary` | Show rating summary | checkbox | true/false | `true` |
| `show_sort_buttons` | Show sort buttons | checkbox | true/false | `true` |
| `show_photos` | Show review photos | checkbox | true/false | `true` |
| `show_helpful` | Show helpful button | checkbox | true/false | `true` |
| `show_verified_badge` | Show verified purchase badge | checkbox | true/false | `true` |
| `allow_delete_own` | Allow customers to delete own reviews | checkbox | true/false | `true` |

4. **Gating:** All plans (photo *reviews* feature is Essential+, so `show_photos`
   only has effect where photo reviews exist).
5. **Docs notes:** Pair with the Review Form on the same product page. Global review
   appearance (star color, card style, fonts) can also be set in the admin **Reviews
   customize** page (§5).

### 1.3 Review Form
(`extensions/theme-app/blocks/review-form.liquid`)

1. **What it does:** The "Write a review" form — star rating, title, body, photo
   upload, points-incentive badge, verified-buyer hint, confetti on submit.
2. **How to add:** *Add block* → **"Review Form"** in a section (product template).
3. **Theme-editor settings:**

| Setting (id) | Label | Type | Allowed values | Default |
|---|---|---|---|---|
| `accent_color` | Accent color | color | hex | `#f59e0b` |
| `heading_text` | Custom heading | text | free text (placeholder "Write a review") | blank → default |
| `button_text` | Custom submit button text | text | free text | blank → default |
| `success_title` | Custom success heading | text | free text | blank → default |
| `require_login` | Require login to review | checkbox | true/false | `false` |
| `require_title` | Require review title | checkbox | true/false | `false` |
| `min_body_length` | Minimum review length | range | 0–100, step 5 (unit `ch`) | `10` |
| `allow_photos` | Allow photo uploads | checkbox | true/false | `true` |
| `max_photos` | Max photos per review | range | 1–10, step 1 | `5` |
| `show_incentive` | Show points incentive | checkbox | true/false | `true` |
| `show_purchased_note` | Show verified buyer hint | checkbox | true/false | `true` |
| `show_confetti` | Show confetti on submission | checkbox | true/false | `true` |

4. **Gating:** All plans. Photo upload is only meaningful where photo reviews are
   supported (Essential+).
5. **Docs notes:** `show_incentive` only shows a reward badge if a review-reward earn
   rule is configured. Reviews land pending approval by default.

### 1.4 Review SEO  *(NOT currently documented)*
(`extensions/theme-app/blocks/review-jsonld.liquid`)

1. **What it does:** Injects review structured data into the page `<head>` so Google
   can show star rich snippets. No visible UI.
2. **How to add:** *Add block* → **"Review SEO"** (a head-target block).
3. **Settings:** none.
4. **Gating:** All plans.
5. **Docs notes:** Recommend adding it on product pages that show reviews to enable
   star rich results. Purely SEO; invisible to shoppers.

### 1.5 Loyalty Page
(`extensions/theme-app/blocks/loyalty-page.liquid`)

1. **What it does:** A full embedded loyalty dashboard for a dedicated page — balance,
   tier progress, ways to earn, referral, transaction history; guests get a hero +
   sign-in prompt.
2. **How to add:** Create a page/template and *Add block* → **"Loyalty Page"** in a
   section (merchants typically make a "Rewards" page).
3. **Theme-editor settings:**

| Setting (id) | Label | Type | Allowed values | Default |
|---|---|---|---|---|
| `guest_image` | Guest hero image | image_picker | image (≈1200×600+) | none |
| `color_scheme` | Color scheme | select | `dark`, `light`, `auto` (match system) | `auto` |
| `show_tier` | Show tier progress | checkbox | true/false | `true` |
| `show_earn_rules` | Show ways to earn | checkbox | true/false | `true` |
| `show_referral` | Show referral section | checkbox | true/false | `true` |
| `show_history` | Show transaction history | checkbox | true/false | `true` |
| `content_alignment` | Content alignment | select | `center`, `left` | `center` |
| `bg_color` | Background | color | hex | blank → scheme default |
| `card_bg_color` | Card background | color | hex | blank → scheme default |
| `text_color` | Primary text | color | hex | blank → scheme default |
| `text_secondary_color` | Secondary text | color | hex | blank → scheme default |

   Schema `paragraph`: heading, sub-line, accent color, fonts and card radius are
   managed in the app (**Widget customize**, §5).
4. **Gating:** All plans; heading/fonts/brand matching from §5 is Growth+.
5. **Docs notes:** Shares the same admin brand-matching settings as the launcher.

### 1.6 Review Star Badge
(`extensions/theme-app/blocks/review-star-badge.liquid`)  — docs call this "Star Badge"

1. **What it does:** Compact star rating + count for a single product (e.g. under the
   product title). Clicking scrolls to the reviews.
2. **How to add:** *Add block* → **"Review Star Badge"** in a section (near the
   product title/price).
3. **Theme-editor settings:**

| Setting (id) | Label | Type | Allowed values | Default |
|---|---|---|---|---|
| `accent_color` | Star color | color | hex | `#f59e0b` |
| `show_count` | Show review count | checkbox | true/false | `true` |

4. **Gating:** All plans.

### 1.7 Review Collection Stars
(`extensions/theme-app/blocks/review-collection-stars.liquid`)  — docs call this "Collection Stars"

1. **What it does:** Adds star ratings to product cards on collection/listing pages
   (auto-injected across the grid).
2. **How to add:** Theme editor → **App embeds** → enable **"Review Collection
   Stars"** (body/app-embed block — it finds product cards automatically).
3. **Theme-editor settings:**

| Setting (id) | Label | Type | Allowed values | Default |
|---|---|---|---|---|
| `star_color` | Filled star color | color | hex | `#f59e0b` |
| `empty_color` | Empty star color | color | hex | `#d1d5db` |
| `count_color` | Count text color | color | hex | `#666666` |
| `star_size` | Star size | range | 10–24 px, step 1 | `14` |
| `show_count` | Show review count | checkbox | true/false | `true` |
| `show_when_empty` | Show on products with no reviews | checkbox | true/false | `true` |

4. **Gating:** All plans.
5. **Docs notes:** `show_when_empty` keeps the grid visually consistent by rendering
   empty stars + "No reviews" for un-reviewed products.

### 1.8 Review Carousel
(`extensions/theme-app/blocks/review-carousel.liquid`)

1. **What it does:** A rotating carousel of top/recent reviews across the store (good
   for homepage social proof), each linking to its product.
2. **How to add:** *Add block* → **"Review Carousel"** in a section (e.g. homepage).
3. **Theme-editor settings:**

| Setting (id) | Label | Type | Allowed values | Default |
|---|---|---|---|---|
| `accent_color` | Star & accent color | color | hex | `#f59e0b` |
| `heading_text` | Custom heading | text | free text (placeholder "What our customers say") | blank → default |
| `max_reviews` | Max reviews to show | range | 3–20, step 1 | `10` |
| `show_photos` | Show review photos | checkbox | true/false | `true` |

4. **Gating:** All plans.

---

## 2. Checkout widget  (docs: "Checkout Widget")
(`extensions/checkout-ui/src/Checkout.tsx`, merchant-facing extension name **"PerkStack Checkout"**)

1. **What it does:** A rewards block inside checkout. For signed-in shoppers it shows
   available balance (with pending-points note), tier + earn multiplier, progress to
   next tier, and up to **3** affordable rewards they can redeem inline — the
   generated discount code auto-applies to the order. It also auto-carries a reward
   code already redeemed on the launcher/loyalty page. Guests see a "create an
   account to redeem" prompt.
2. **How to add:** Shopify **Checkout editor** (Settings → Checkout → Customize) →
   add the **PerkStack Checkout** app block to a checkout position.
3. **Appearance settings:** These are **not** in the checkout editor — they come from
   the app (server-driven) with these defaults
   (`packages/web/app/routes/api.points.tsx`, `packages/shared/src/constants/defaults.ts`):

| Config | Allowed values | Default |
|---|---|---|
| `title` | free text | `Rewards wallet` |
| `themeMode` | `auto`, `light`, `dark` | `auto` |
| `cardStyle` | `elevated`, `soft`, `outlined` | `elevated` |
| `showTier` | true/false | `true` |
| `showProgress` | true/false | `true` |
| `showRewards` | true/false | `true` |
| `accentColor` | hex | `#6366f1` (shares the shop's `widgetAccentColor`) |

   NOTE FOR DOCS WRITERS: these checkout-widget appearance fields currently exist only
   as DB defaults — there is **no dedicated admin UI** exposing them yet. Treat the
   checkout widget as "appears automatically with sensible defaults; accent color
   follows the loyalty accent color." Do not promise per-field checkout customization.
4. **Gating:** Requires the **checkoutExtension** feature = **Essential plan and up**
   (Free cannot use the checkout widget).
5. **Docs notes:** Only works for logged-in customers with an account; needs the
   loyalty program active with rewards defined. Redeeming here spends points and
   applies a discount code to the current order.

---

## 3. Loyalty Studio  (docs: "Customer Account")
(`extensions/customer-account/src/AccountLoyalty.tsx`, merchant-facing extension name **"Loyalty Studio"**)

1. **What it does:** A full loyalty dashboard rendered inside Shopify's **customer
   account** area — hero with name/balance/tier, redeemed-in-30-days and rewards-
   available stats, tier progress, ways to earn, redeem rewards (generates a code),
   referral, and recent activity/history with pending-points banner.
2. **How to add:** Shopify **customer account editor** (Settings → Customer accounts →
   Customize) → add the **Loyalty Studio** menu/page block.
3. **Settings:** none exposed to the merchant (no theme-editor settings); it inherits
   the customer-account theme.
4. **Gating:** Available broadly; content (rewards/tiers) depends on the loyalty
   program being configured.
5. **Docs notes:** This is the "signed-in members portal" living in the native account
   pages — distinct from the theme **Loyalty Page** block (§1.5), which lives on the
   storefront. If the merchant uses new customer accounts, point them here.

---

## 4. Tracking pixel — NOT a placeable widget
(`extensions/app-pixel/src/index.ts`, extension name **"PerkStack Pixel"**)

- A Shopify web pixel that subscribes to `checkout_completed` for order/attribution
  tracking. It has **no visible UI** and is **not** something a merchant adds to a
  theme. It should not get a "widget" doc page — mention only if documenting
  analytics/attribution. Installed automatically by the app.

---

## 5. Admin appearance settings that flow into the widgets

Two admin pages control widget look beyond the per-block theme settings. Their values
are published to the storefront and read by the launcher/loyalty-page/checkout.

### 5.1 Widget customize  (Apps → PerkStack → **Widget customize**)
Controls the **Loyalty Launcher** and **Loyalty Page** (`packages/web/app/routes/app.widget-customize.tsx`).

| Setting | Options | Default |
|---|---|---|
| Accent color | hex | `#16a34a` |
| Theme | `auto` (match storefront), `light`, `dark`, `custom` | `auto` |
| Panel background (Custom theme) | hex | `#FAF6F0` |
| Panel text (Custom theme) | hex | `#2A2118` |
| Surface radius | number (px) | `12` |
| Button shape | `sharp`, `rounded`, `pill` | `pill` |
| Panel font | Inherit theme font + curated Google fonts (Inter, Manrope, DM Sans, Plus Jakarta Sans, Geist, Space Grotesk, Sora, Playfair Display, Fraunces, Crimson Pro) | Inherit (blank) |
| Heading font | same curated font list / inherit | Inherit (blank) |
| Heading scale | `compact`, `standard`, `large`, `display` | `standard` |
| Card style | `soft` (glassy/shadowed), `bordered` (thin border, no shadow) | `soft` |
| Font weight | `light`, `normal`, `bold` | `normal` |
| Heading / Subheading / Eyebrow / Join label | free text (capped 120/240/60 chars) | blank → uses built-in copy |
| Hero image + overlay opacity (default `50`) + fullscreen + header bg color + logo image | image / number / hex | none / 50 |

- **Gating:** The whole brand-matching surface (hero image, custom panel colors,
  fonts, shape, card style, logo/icon) is gated behind **customLauncherHero** /
  **customLauncherIcon** = **Growth plan and up**. Free/Essential get accent color +
  light/dark/auto only. The UI shows an upgrade prompt (min plan = Growth) when gated.

### 5.2 Reviews customize  (Apps → PerkStack → **Reviews customize**)
Global appearance for the review blocks (`packages/web/app/routes/app.reviews-customize.tsx`).

| Setting | Default |
|---|---|
| Star color | `#f59e0b` |
| Card style | `soft` (default) |
| Font weight | `normal` (default) |
| Theme / card bg color / card text color / card radius / font family / button shape | scheme defaults |

Per-block `accent_color` (§1.2–1.8) can still override at the block level.

---

## 6. Plan gating summary (widget-relevant)

Plans (keys → labels, `packages/shared/src/constants/plans.ts`): `free` → **Free**,
`essential` → **Essential**, `growth` → **Growth**, `studio` → **Studio**.

| Feature (flag) | Free | Essential | Growth | Studio | Affects |
|---|---|---|---|---|---|
| `checkoutExtension` | ✗ | ✓ | ✓ | ✓ | Checkout widget (§2) |
| `brandingRemoval` | ✗ | ✓ | ✓ | ✓ | Hide "Powered by PerkStack" footer on launcher |
| `photoReviews` | ✗ | ✓ | ✓ | ✓ | Photo uploads / photo display in review blocks |
| `customLauncherHero` | ✗ | ✗ | ✓ | ✓ | Launcher/loyalty hero image + full brand matching (§5.1) |
| `customLauncherIcon` | ✗ | ✗ | ✓ | ✓ | Replace/hide launcher trigger icon |

**"Powered by PerkStack" footer:** shown on the launcher unless BOTH the plan supports
`brandingRemoval` (Essential+) AND the merchant turned branding off in settings.

---

## 7. Docs coverage gaps (widgets)

- **Add a page for "Review SEO"** (the `review-jsonld` head block) — real and
  undocumented.
- **Rename / clarify "Customer Account" → "Loyalty Studio"** to match what merchants
  see in the account editor.
- Clarify the two distinct loyalty surfaces: theme **Loyalty Page** block (storefront)
  vs **Loyalty Studio** (native account area).
- Note that most launcher/loyalty-page styling lives in **Widget customize**, not the
  theme editor.
- Do not over-promise checkout-widget customization (no admin UI today; DB defaults).

---

## 8. SECRETS — never put these in customer-facing docs

Merchant-facing **block names** are fine (Loyalty Launcher, Review Display, Review
Form, Review SEO, Loyalty Page, Review Star Badge, Review Collection Stars, Review
Carousel, PerkStack Checkout, Loyalty Studio). The following are engineer-only and
must NOT appear in docs:

- **Extension type strings / targets:** `theme` / theme app extension, `ui_extension`
  / checkout UI extension, `web_pixel`; targets `purchase.checkout.block.render`,
  `customer-account.page.render`, block targets `body` / `section` / `head`;
  `runtime_context = "strict"`, `network_access`.
- **Extension handles / UIDs:** `perkstack-theme`, `perkstack-checkout`,
  `perkstack-customer-account`, `perkstack-pixel`, and the long `uid` GUIDs; API
  versions (`2026-04`, `2025-07`).
- **Internal asset / file names:** `perkstack-launcher.js/.css`,
  `perkstack-loyalty-page.js/.css`, `perkstack-review-display.js/.css`,
  `perkstack-carousel.js/.css`, `perkstack-collection-stars.js`,
  `perkstack-star-badge.js/.css`, `perkstack-review-form.js`, `perkstack-logo.svg`,
  `perkstack-coin.png`, and Liquid template filenames (`perkstack-launcher.liquid`,
  `review-jsonld.liquid`, etc.).
- **App-proxy / API paths:** `/apps/perkstack/api`, `/apps/perkstack/api/points`,
  `/api/points`, `/rewards`, `/redemption/:id`, `/storefront-config`,
  `surface=checkout_ui`.
- **Backend origins / infra:** `https://app.perk-stack.com`, `application_url`,
  Cloudflare R2 image storage.
- **Auth internals:** session-token JWT, `aud` / `dest` / `sub` claims, the dev
  client_id `5b27d2007419e484c4b1bd56a2f31ab7`, the App-Proxy CORS/302 preflight
  workaround.
- **Markup internals:** `data-perkstack-*` attributes, `perkstack-launcher__*` and
  `ps-*` CSS class names, `#perkstack-launcher-modal` IDs.
- **DB / settings column names:** `checkoutWidgetTitle`, `checkoutThemeMode`,
  `checkoutCardStyle`, `checkoutShow*`, `launcherPanelBgColor`, `launcherHeaderImageUrl`,
  `widgetAccentColor`, `brandingEnabled`, `settingsTable`, etc.
- **Plan feature flag keys:** `customLauncherHero`, `customLauncherIcon`,
  `checkoutExtension`, `brandingRemoval`, `photoReviews` (use plain-English feature
  descriptions + plan names instead).
- **Tech stack:** Remix, Drizzle ORM, Shopify Polaris, App Bridge, React
  (`@shopify/ui-extensions-react`).
