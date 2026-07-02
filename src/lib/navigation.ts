export interface NavItem {
  title: string;
  href?: string;
  children?: NavItem[];
  status?: "new" | "beta" | "deprecated";
}

export const navigation: NavItem[] = [
  {
    title: "Getting Started",
    children: [
      { title: "Introduction", href: "/docs/getting-started/introduction" },
      { title: "How It Works", href: "/docs/getting-started/how-it-works" },
      { title: "Installing PerkStack", href: "/docs/getting-started/installation" },
      { title: "Connecting Your Store", href: "/docs/getting-started/shopify-setup" },
      { title: "First-Time Setup", href: "/docs/getting-started/first-time-config" },
      { title: "Going Live on Your Store", href: "/docs/getting-started/going-live" },
    ],
  },
  {
    title: "Dashboard",
    children: [
      { title: "Overview", href: "/docs/dashboard/overview" },
      { title: "Analytics", href: "/docs/dashboard/analytics" },
      { title: "Theme Setup & Status", href: "/docs/dashboard/extension-status" },
    ],
  },
  {
    title: "Loyalty Program",
    children: [
      { title: "Overview", href: "/docs/loyalty/overview" },
      { title: "Ways to Earn", href: "/docs/loyalty/earn-rules" },
      { title: "Rewards Catalog", href: "/docs/loyalty/rewards" },
      { title: "How Points Work", href: "/docs/loyalty/points-system" },
      { title: "VIP Tiers", href: "/docs/loyalty/vip-tiers" },
      { title: "Referrals", href: "/docs/loyalty/referrals" },
      { title: "Birthday Rewards", href: "/docs/loyalty/birthday-rewards" },
      { title: "Social Sharing", href: "/docs/loyalty/social-sharing" },
      { title: "Points Campaigns & Boosts", href: "/docs/loyalty/campaigns", status: "new" },
    ],
  },
  {
    title: "Product Reviews",
    children: [
      { title: "Overview", href: "/docs/reviews/overview" },
      { title: "Review Request Emails", href: "/docs/reviews/review-requests" },
      { title: "Photo Reviews", href: "/docs/reviews/photo-reviews" },
      { title: "Moderation", href: "/docs/reviews/moderation" },
      { title: "SEO & Rich Snippets", href: "/docs/reviews/seo" },
      { title: "Importing Reviews", href: "/docs/reviews/importing" },
    ],
  },
  {
    title: "Integrations",
    children: [
      { title: "Shopify Flow", href: "/docs/integrations/shopify-flow" },
      { title: "Judge.me Sync", href: "/docs/integrations/judgeme", status: "new" },
      { title: "AI Agent Access", href: "/docs/integrations/agent-access", status: "beta" },
    ],
  },
  {
    title: "Storefront Widgets",
    children: [
      { title: "Overview", href: "/docs/widgets/overview" },
      { title: "Loyalty Launcher", href: "/docs/widgets/loyalty-launcher" },
      { title: "Loyalty Page", href: "/docs/widgets/loyalty-page" },
      { title: "Review Display", href: "/docs/widgets/review-display" },
      { title: "Review Form", href: "/docs/widgets/review-form" },
      { title: "Review Star Badge", href: "/docs/widgets/star-badge" },
      { title: "Review Collection Stars", href: "/docs/widgets/collection-stars" },
      { title: "Review Carousel", href: "/docs/widgets/review-carousel" },
      { title: "Checkout Rewards", href: "/docs/widgets/checkout-widget" },
      { title: "Loyalty Studio", href: "/docs/widgets/customer-account" },
    ],
  },
  {
    title: "Customers",
    children: [
      { title: "Customer Management", href: "/docs/customers/management" },
      { title: "Customer Detail", href: "/docs/customers/detail" },
      { title: "Tier Overrides", href: "/docs/customers/tier-overrides" },
      { title: "Freeze & Unfreeze", href: "/docs/customers/freeze" },
      { title: "Customer Page Blocks", href: "/docs/customers/admin-blocks" },
    ],
  },
  {
    title: "Settings",
    children: [
      { title: "General", href: "/docs/settings/general" },
      { title: "Plans & Billing", href: "/docs/settings/billing" },
      { title: "Email & Notifications", href: "/docs/settings/email" },
      { title: "Review Settings", href: "/docs/settings/review-settings" },
      { title: "Widget Customization", href: "/docs/settings/widget-customization" },
      { title: "Trigger Button", href: "/docs/settings/trigger-button" },
    ],
  },
  {
    title: "Troubleshooting",
    children: [
      { title: "Common Issues", href: "/docs/troubleshooting/common-issues" },
      { title: "FAQ", href: "/docs/troubleshooting/faq" },
      { title: "Status Reference", href: "/docs/troubleshooting/status-reference" },
    ],
  },
];

export interface SearchEntry {
  title: string;
  href: string;
  section: string;
  description?: string;
}

export function buildSearchIndex(): SearchEntry[] {
  const entries: SearchEntry[] = [];
  for (const group of navigation) {
    for (const item of group.children ?? []) {
      if (item.href) {
        entries.push({
          title: item.title,
          href: item.href,
          section: group.title,
        });
      }
    }
  }
  return entries;
}
