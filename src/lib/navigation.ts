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
      { title: "Installation", href: "/docs/getting-started/installation" },
      { title: "Shopify Setup", href: "/docs/getting-started/shopify-setup" },
      { title: "First-Time Configuration", href: "/docs/getting-started/first-time-config" },
    ],
  },
  {
    title: "Dashboard",
    children: [
      { title: "Overview", href: "/docs/dashboard/overview" },
      { title: "Analytics", href: "/docs/dashboard/analytics" },
      { title: "Extension Status", href: "/docs/dashboard/extension-status" },
    ],
  },
  {
    title: "Loyalty Program",
    children: [
      { title: "Overview", href: "/docs/loyalty/overview" },
      { title: "Earn Rules", href: "/docs/loyalty/earn-rules" },
      { title: "Rewards Catalog", href: "/docs/loyalty/rewards" },
      { title: "Points System", href: "/docs/loyalty/points-system" },
      { title: "VIP Tiers", href: "/docs/loyalty/vip-tiers" },
      { title: "Referrals", href: "/docs/loyalty/referrals", status: "new" },
      { title: "Birthday Rewards", href: "/docs/loyalty/birthday-rewards" },
      { title: "Social Sharing", href: "/docs/loyalty/social-sharing", status: "beta" },
    ],
  },
  {
    title: "Product Reviews",
    children: [
      { title: "Overview", href: "/docs/reviews/overview" },
      { title: "Moderation", href: "/docs/reviews/moderation" },
      { title: "Review Requests", href: "/docs/reviews/review-requests" },
      { title: "Photo Reviews", href: "/docs/reviews/photo-reviews" },
      { title: "Importing Reviews", href: "/docs/reviews/importing" },
      { title: "Shopify Flow", href: "/docs/reviews/shopify-flow", status: "new" },
      { title: "SEO & Rich Snippets", href: "/docs/reviews/seo" },
    ],
  },
  {
    title: "Storefront Widgets",
    children: [
      { title: "Overview", href: "/docs/widgets/overview" },
      { title: "Loyalty Launcher", href: "/docs/widgets/loyalty-launcher" },
      { title: "Review Display", href: "/docs/widgets/review-display" },
      { title: "Review Form", href: "/docs/widgets/review-form" },
      { title: "Star Badge", href: "/docs/widgets/star-badge" },
      { title: "Collection Stars", href: "/docs/widgets/collection-stars" },
      { title: "Review Carousel", href: "/docs/widgets/review-carousel" },
      { title: "Loyalty Page", href: "/docs/widgets/loyalty-page" },
      { title: "Checkout Widget", href: "/docs/widgets/checkout-widget" },
      { title: "Customer Account", href: "/docs/widgets/customer-account" },
    ],
  },
  {
    title: "Customers",
    children: [
      { title: "Customer Management", href: "/docs/customers/management" },
      { title: "Customer Detail", href: "/docs/customers/detail" },
      { title: "Tier Overrides", href: "/docs/customers/tier-overrides" },
      { title: "Freeze & Unfreeze", href: "/docs/customers/freeze" },
    ],
  },
  {
    title: "Settings",
    children: [
      { title: "General", href: "/docs/settings/general" },
      { title: "Billing & Plans", href: "/docs/settings/billing" },
      { title: "Email Configuration", href: "/docs/settings/email" },
      { title: "Review Settings", href: "/docs/settings/review-settings" },
      { title: "Widget Customization", href: "/docs/settings/widget-customization" },
      { title: "Trigger Button", href: "/docs/settings/trigger-button" },
    ],
  },
  {
    title: "Advanced",
    children: [
      { title: "Architecture", href: "/docs/advanced/architecture" },
      { title: "Webhooks", href: "/docs/advanced/webhooks" },
      { title: "Status Reference", href: "/docs/advanced/status-reference" },
      { title: "Admin Extensions", href: "/docs/advanced/admin-extensions" },
      { title: "Web Pixel", href: "/docs/advanced/web-pixel", status: "beta" },
    ],
  },
  {
    title: "Troubleshooting",
    children: [
      { title: "Common Issues", href: "/docs/troubleshooting/common-issues" },
      { title: "FAQ", href: "/docs/troubleshooting/faq" },
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
