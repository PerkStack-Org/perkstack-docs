export interface GlossaryEntry {
  term: string;
  aliases?: string[];
  definition: string;
}

export const glossary: GlossaryEntry[] = [
  {
    term: "earn rule",
    aliases: ["earn rules"],
    definition:
      "A configurable rule that defines how customers earn points — e.g. making a purchase, creating an account, leaving a review, or sharing on social media.",
  },
  {
    term: "VIP tier",
    aliases: ["VIP tiers", "tier", "tiers"],
    definition:
      "A loyalty level that customers unlock by accumulating lifetime points. Higher tiers can grant perks like bonus point multipliers or exclusive rewards.",
  },
  {
    term: "app proxy",
    definition:
      "A Shopify feature that routes requests from your storefront domain to an external app server, allowing PerkStack to serve dynamic content (like a rewards page) under your store's URL.",
  },
  {
    term: "theme app extension",
    aliases: ["theme app extensions", "app block", "app blocks"],
    definition:
      "A Shopify mechanism that lets apps inject UI blocks into Online Store 2.0 themes without editing theme code. PerkStack uses these for all storefront widgets.",
  },
  {
    term: "referral",
    aliases: ["referrals", "referral program"],
    definition:
      "A program where existing customers earn points by inviting friends to your store. The referred friend typically gets a discount, and the referrer gets rewarded when a qualifying purchase is made.",
  },
  {
    term: "App Bridge",
    definition:
      "Shopify's JavaScript library that enables embedded apps to communicate with the Shopify admin — handling authentication, navigation, modals, and resource pickers.",
  },
  {
    term: "Polaris",
    definition:
      "Shopify's design system and React component library. PerkStack uses Polaris components to ensure the admin UI feels native to the Shopify experience.",
  },
  {
    term: "checkout UI extension",
    aliases: ["checkout extension", "checkout widget"],
    definition:
      "A Shopify extension that renders custom UI in the checkout flow. PerkStack uses this to display points balance and available rewards during checkout.",
  },
  {
    term: "admin block",
    aliases: ["admin blocks", "admin block extension"],
    definition:
      "A Shopify extension that adds custom cards to admin resource pages (like customer detail). PerkStack provides blocks for viewing a customer's loyalty data and reviews.",
  },
  {
    term: "rich snippet",
    aliases: ["rich snippets", "structured data"],
    definition:
      "JSON-LD markup embedded in your storefront pages that tells search engines about your product reviews, enabling star ratings to appear in Google search results.",
  },
  {
    term: "Flow trigger",
    aliases: ["Shopify Flow", "Flow triggers"],
    definition:
      "A Shopify Flow event fired by PerkStack (e.g. when a new review is submitted) that lets merchants build custom automations — like notifying staff on negative reviews.",
  },
  {
    term: "BullMQ",
    definition:
      "A Node.js job queue library backed by Redis. PerkStack uses BullMQ to process background tasks like sending emails, calculating points, and syncing webhooks.",
  },
  {
    term: "Drizzle ORM",
    aliases: ["Drizzle"],
    definition:
      "A lightweight TypeScript ORM used by PerkStack's shared package to define the database schema and run type-safe queries against PostgreSQL.",
  },
  {
    term: "web pixel",
    aliases: ["app pixel"],
    definition:
      "A Shopify extension that runs a sandboxed script on your storefront to track analytics events (page views, add-to-cart, purchases) for attribution and reporting.",
  },
  {
    term: "points multiplier",
    aliases: ["bonus multiplier", "multiplier"],
    definition:
      "A factor applied to earned points — e.g. a 2x multiplier means customers earn double points. Can be tied to VIP tiers, promotional periods, or specific earn rules.",
  },
  {
    term: "reward",
    aliases: ["rewards", "rewards catalog"],
    definition:
      "Something a customer can redeem their points for — typically a discount code (percentage off, fixed amount, or free shipping) generated automatically by PerkStack.",
  },
  {
    term: "moderation",
    aliases: ["review moderation", "auto-approve"],
    definition:
      "The process of approving or rejecting submitted reviews before they appear on your storefront. PerkStack supports manual review and configurable auto-approve rules.",
  },
  {
    term: "loyalty launcher",
    definition:
      "A floating widget on your storefront that opens the loyalty panel — showing a customer's points balance, available rewards, and earn opportunities.",
  },
];
