# Rewrite Instructions (shared by all doc-rewrite agents)

You are rewriting PerkStack documentation pages. Read these first, in order:
1. `docs-authoring/GOOD_DOCS_PRINCIPLES.md` — the standard (voice, structure, the NEVER-EXPOSE list).
2. `docs-authoring/INFORMATION_ARCHITECTURE.md` — the new page map.
3. Your assigned inventory file(s) in `docs-authoring/inventory/` — the source-of-truth facts.
4. `docs-authoring/inventory/pricing-plans.md` — whenever you mention a plan, price, cap, or gated feature.

## Hard rules (non-negotiable)

1. **Never expose internals.** No tech stack, frameworks, databases, table/column names, queues/workers, cron times, third-party vendors (Resend, Cloudflare R2, Sharp, BullMQ, Redis, etc.), internal flag names, extension type strings, asset filenames, API/app-proxy paths, or hosting/infra. Each inventory file ends with a "SECRETS — never put in docs" section — obey it. When the inventory gives a fact as a DB field or flag, translate it to the merchant-facing UI label.
2. **Plans are only Free / Essential / Growth / Studio.** Never "Starter" or "Pro." Prices, caps, trials, and which plan unlocks a feature come from `pricing-plans.md` (code wins over old marketing copy). Notable: CSV import is **Studio-only**; referrals/VIP/integrations/Flow/Agent Access are **Growth+**; photo reviews/points expiry/points delay/branding removal are **Essential+**.
3. **Use real defaults and real admin locations** from the inventory (e.g. "default 7-day request delay", "Settings → General → Points Expiry", auto-approve threshold 4, 3 fixed VIP tiers Member/Silver/Gold).
4. **Do not document non-working features.** Klaviyo/Mailchimp/Omnisend/Gorgias integrations and the gift-catalog Shopify Function are stubs — do not write pages or claims implying they work.
5. **Rewrite the `createDocMetadata` description too** — old descriptions leak internals.
6. **Update the "Related" list** at the bottom of every page to point at real pages in the new sitemap below.
7. Benefit-first, second person, active voice. Short. A merchant should be able to skim and act.

## Page component template (match the existing codebase exactly)

Every page file is `src/app/docs/<section>/<page>/page.tsx` and looks like this:

```tsx
import type { Metadata } from "next";
import { createDocMetadata } from "@/lib/seo";
import { H2, H3 } from "@/components/Heading";
import Callout from "@/components/Callout";

export const metadata: Metadata = createDocMetadata("/docs/<section>/<page>", {
  title: "<Page Title>",
  description: "<merchant-facing, benefit-led, no internals>",
});

export default function <PascalCasePageName>() {
  return (
    <div className="docs-prose">
      <h1><Page Title></h1>
      <p>Opening: what it is + the benefit, 1–3 sentences.</p>

      <H2>Section heading</H2>
      <p>…</p>

      <H3>Sub-heading</H3>
      <ul>
        <li>…</li>
      </ul>

      <Callout type="tip">A short, useful note.</Callout>

      <H2>Related</H2>
      <ul>
        <li>
          <a href="/docs/…">Page name</a>: one-line reason to visit
        </li>
      </ul>
    </div>
  );
}
```

Rules for the template:
- Import only what you use. If a page has no callouts, drop the `Callout` import; if no `H3`, import only `H2`.
- `<h1>` is a plain tag; use `H2`/`H3` (never raw `<h2>`) so anchor IDs are generated.
- `Callout` types: `info`, `tip`, `warning`, `danger`. Use 1–3 per page, only when genuinely useful.
- Use `<table>` for settings/options reference (columns describe what the merchant sees in the UI, never DB fields), `<ol>` for step-by-step, `<ul>` for lists.
- Use `<code>` only for things a merchant types or sees (a discount code, an email variable like `{{customer_name}}`, a theme block name they add). Never for internal identifiers.
- Escape apostrophes in JSX text as `&apos;` and `>`/`<` as `&gt;`/`&lt;` where needed (match existing pages).
- End every page with a `Related` section (an `H2` + `ul` of 3–5 links), except very short pages may use fewer.

## Full sitemap (for correct cross-links)

Getting Started: `/docs/getting-started/introduction`, `/how-it-works`, `/installation`, `/shopify-setup`, `/first-time-config`, `/going-live`
Dashboard: `/docs/dashboard/overview`, `/analytics`, `/extension-status`
Loyalty: `/docs/loyalty/overview`, `/earn-rules`, `/rewards`, `/points-system`, `/vip-tiers`, `/referrals`, `/birthday-rewards`, `/social-sharing`, `/campaigns`
Reviews: `/docs/reviews/overview`, `/review-requests`, `/photo-reviews`, `/moderation`, `/seo`, `/importing`
Integrations: `/docs/integrations/shopify-flow`, `/judgeme`, `/agent-access`
Widgets: `/docs/widgets/overview`, `/loyalty-launcher`, `/loyalty-page`, `/review-display`, `/review-form`, `/star-badge`, `/collection-stars`, `/review-carousel`, `/checkout-widget`, `/customer-account`
Customers: `/docs/customers/management`, `/detail`, `/tier-overrides`, `/freeze`, `/admin-blocks`
Settings: `/docs/settings/general`, `/billing`, `/email`, `/review-settings`, `/widget-customization`, `/trigger-button`
Troubleshooting: `/docs/troubleshooting/common-issues`, `/faq`, `/status-reference`

Page display titles (use these exact H1s where they differ from the URL slug):
- `/widgets/star-badge` → "Review Star Badge"
- `/widgets/collection-stars` → "Review Collection Stars"
- `/widgets/checkout-widget` → "Checkout Rewards"
- `/widgets/customer-account` → "Loyalty Studio"
- `/dashboard/extension-status` → "Theme Setup & Status"
- `/loyalty/points-system` → "How Points Work"
- `/loyalty/earn-rules` → "Ways to Earn"
- `/settings/billing` → "Plans & Billing"
- `/settings/email` → "Email & Notifications"

## Deliverable
Write each assigned `page.tsx` file (create the file; the directory already exists). Return a short list of the files you wrote and any facts you deliberately omitted as secrets.
