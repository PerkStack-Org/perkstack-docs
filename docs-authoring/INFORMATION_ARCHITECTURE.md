# PerkStack Docs — New Information Architecture

The reorganized, merchant-centric structure. Built from the feature inventory (`docs-authoring/inventory/`) and written to the standard in `GOOD_DOCS_PRINCIPLES.md`. Every page is a user guide; internal engineering pages are removed.

Legend: **REWRITE** = keep URL, rewrite content · **NEW** = new page · **MOVE** = relocated + rewritten · **DELETE** = removed (internal-only).

---

## 1. Getting Started — `/docs/getting-started`
| Page | URL | Action | Source |
|---|---|---|---|
| Introduction | `introduction` | REWRITE | What PerkStack is: loyalty + reviews + referrals in one Shopify app; benefits; plans at a glance |
| How It Works | `how-it-works` | REWRITE | Non-technical flywheel: earn → redeem → repeat, reviews → points, storefront surfaces, automated emails. **No architecture/stack.** |
| Installing PerkStack | `installation` | REWRITE | Install from Shopify App Store; permissions in plain terms; install = ready |
| Connecting Your Store | `shopify-setup` | REWRITE | First look, what to prepare |
| First-Time Setup | `first-time-config` | REWRITE | The 4-step onboarding wizard (Welcome → Points rate 5% default → Branding → Launch); fully skippable |
| Going Live on Your Store | `going-live` | NEW | Adding PerkStack to the theme: enabling app embeds & blocks, checkout/account blocks, using the Theme Setup checklist |

## 2. Dashboard — `/docs/dashboard`
| Page | URL | Action | Source |
|---|---|---|---|
| Overview | `overview` | REWRITE | KPI cards, banners, loyalty on/off pill (read-only reporting) |
| Analytics | `analytics` | REWRITE | 6 tabs; history windows by plan (30/90/180/unlimited); weekly digest; revenue attribution described plainly |
| Theme Setup & Status | `extension-status` | REWRITE | The Theme Setup checklist; what "Active" means ("loaded recently"), not heartbeat internals |

## 3. Loyalty Program — `/docs/loyalty`
| Page | URL | Action | Source |
|---|---|---|---|
| Overview | `overview` | REWRITE | The loyalty program at a glance |
| Ways to Earn | `earn-rules` | REWRITE | 7 earn actions + defaults; birthday/referral ship OFF, social ON; plan gating; multipliers |
| Rewards Catalog | `rewards` | REWRITE | 7 reward types by plan; cost in points; redemption limits (Essential+); min tier |
| How Points Work | `points-system` | REWRITE | Balances & activity in plain terms; **points expiry** and **points delay** folded in (Essential+). No ledger/DB internals. |
| VIP Tiers | `vip-tiers` | REWRITE | Exactly 3 tiers; lifetime points; multipliers stack with boosts (Growth+) |
| Referrals | `referrals` | REWRITE | Link sharing; friend gets 10% code + both sides get points; ships OFF; Growth+ |
| Birthday Rewards | `birthday-rewards` | REWRITE | Set on launcher only; ships OFF; Essential+ |
| Social Sharing | `social-sharing` | REWRITE | FB/X/WhatsApp/Pinterest; per product+platform; ships ON; Essential+ |
| Points Campaigns & Boosts | `campaigns` | NEW | Time-boxed multipliers; scheduling; stack multiplicatively with tiers (currently undocumented) |

## 4. Product Reviews — `/docs/reviews`
| Page | URL | Action | Source |
|---|---|---|---|
| Overview | `overview` | REWRITE | Collecting reviews, the review form, review → points flywheel |
| Review Request Emails | `review-requests` | REWRITE | 7-day request + 3-day reminder defaults; email copy customization |
| Photo Reviews | `photo-reviews` | REWRITE | Essential+; require/max photos |
| Moderation | `moderation` | REWRITE | Queue; auto-approve threshold 4; blacklist; verified purchase; replies; featured; bulk actions = Studio |
| SEO & Rich Snippets | `seo` | REWRITE | Review SEO block; star rich results |
| Importing Reviews | `importing` | REWRITE | One-time CSV import (Judge.me/Loox), **Studio-only in code**; distinct from live Judge.me sync |

## 5. Integrations — `/docs/integrations` — **NEW SECTION**
| Page | URL | Action | Source |
|---|---|---|---|
| Shopify Flow | `shopify-flow` | MOVE (from `reviews/shopify-flow`) | Flow triggers & actions across loyalty **and** reviews; Growth+ |
| Judge.me Sync | `judgeme` | NEW | Live two-way Judge.me sync (Growth+); connect steps; vs CSV import |
| AI Agent Access | `agent-access` | NEW | Personal access tokens for AI assistants (MCP); Growth+ |

> Do NOT create pages for Klaviyo/Mailchimp/Omnisend/Gorgias — those are non-functional stubs in code.

## 6. Storefront Widgets — `/docs/widgets`
| Page | URL | Action | Source / naming fix |
|---|---|---|---|
| Overview | `overview` | REWRITE | Real set; two distinct loyalty surfaces; app embeds vs section blocks |
| Loyalty Launcher | `loyalty-launcher` | REWRITE | Floating rewards button; styling lives in Widget customize |
| Loyalty Page | `loyalty-page` | REWRITE | Full storefront rewards page block |
| Review Display | `review-display` | REWRITE | On-PDP reviews block |
| Review Form | `review-form` | REWRITE | Write-a-review block |
| Review Star Badge | `star-badge` | REWRITE | **Title → "Review Star Badge"** (URL unchanged) |
| Review Collection Stars | `collection-stars` | REWRITE | **Title → "Review Collection Stars"** |
| Review Carousel | `review-carousel` | REWRITE | Homepage social proof |
| Checkout Rewards | `checkout-widget` | REWRITE | **Title → "Checkout Rewards (PerkStack Checkout)"**; Essential+; no per-field customization UI |
| Loyalty Studio | `customer-account` | REWRITE | **Title → "Loyalty Studio"**; loyalty page inside Shopify customer accounts |

## 7. Customers — `/docs/customers`
| Page | URL | Action | Source |
|---|---|---|---|
| Customer Management | `management` | REWRITE | List, search, columns |
| Customer Detail | `detail` | REWRITE | Profile + manual controls (adjust/grant reward/reset/void), pending grants |
| Tier Overrides | `tier-overrides` | REWRITE | Pin a customer's tier |
| Freeze & Unfreeze | `freeze` | REWRITE | Hard pause on earn/redeem |
| Customer Page Blocks | `admin-blocks` | MOVE (from `advanced/admin-extensions`) | The Loyalty + Reviews blocks on Shopify's native customer page |

## 8. Settings — `/docs/settings`
| Page | URL | Action | Source |
|---|---|---|---|
| General | `general` | REWRITE | Points currency (Growth+), expiry & delay, logo |
| Plans & Billing | `billing` | REWRITE | **SOURCE OF TRUTH**: Free/Essential/Growth/Studio, real prices, caps, overage, trials, downgrade behavior + feature comparison matrix |
| Email & Notifications | `email` | REWRITE | Sender name, reply-to, weekly digest, branding removal, usage; Studio custom domain/templates |
| Review Settings | `review-settings` | REWRITE | Moderation + request defaults in settings |
| Widget Customization | `widget-customization` | REWRITE | Launcher/loyalty-page designer; Custom CSS (Studio) mention |
| Trigger Button | `trigger-button` | REWRITE | Floating button designer |

## 9. Troubleshooting — `/docs/troubleshooting`
| Page | URL | Action | Source |
|---|---|---|---|
| Common Issues | `common-issues` | REWRITE | Merchant-facing symptoms & fixes |
| FAQ | `faq` | REWRITE | Incl. pricing/plan FAQ from source of truth |
| Status Reference | `status-reference` | MOVE (from `advanced/status-reference`) | Plain-language glossary: review / redemption / referral / points-activity statuses |

---

## Deleted (internal-only — removed entirely)
- `advanced/architecture` — monorepo/stack/infra engineering doc. **Delete.**
- `advanced/webhooks` — internal event wiring. **Delete.**
- `advanced/web-pixel` — invisible tracking pixel; folded into Analytics as plain "revenue attribution." **Delete.**
- The whole `advanced/` section is dissolved (its two user-relevant pages moved to Customers and Troubleshooting).

## Cross-cutting rules for every page
1. Follow `GOOD_DOCS_PRINCIPLES.md` — merchant voice, benefit-first, **never** name the stack, DB, queues, vendors, or internal flags.
2. Plans are **Free / Essential / Growth / Studio** only. Never "Starter" or "Pro." Prices/caps/gating come from `inventory/pricing-plans.md` (code wins over old marketing copy).
3. Rewrite each page's `createDocMetadata` **description** too (old ones leak internals).
4. Update every "Related" list to the new IA above.
5. Use real admin locations and real default values from the inventory files.
