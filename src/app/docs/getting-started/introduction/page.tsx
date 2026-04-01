import type { Metadata } from "next";
import Callout from "@/components/Callout";
import PlanBadge from "@/components/PlanBadge";

export const metadata: Metadata = {
  title: "Introduction",
  description:
    "Learn what PerkStack is, what it can do for your store, and how the platform is structured.",
};

export default function IntroductionPage() {
  return (
    <div className="docs-prose">
      <h1>Introduction to PerkStack</h1>
      <p>
        PerkStack is a Shopify embedded app that combines a{" "}
        <strong>loyalty &amp; rewards program</strong> with <strong>product reviews</strong> in a
        single, unified platform. It lives inside your Shopify admin with no external dashboards or
        extra logins, and gives your customers a branded storefront experience powered by theme app
        extensions.
      </p>

      <Callout type="tip">
        PerkStack is built as an embedded Shopify app. Every feature is accessible directly from
        your Shopify admin panel, so you never have to leave your store&apos;s dashboard.
      </Callout>

      <h2>What You Get</h2>

      <div className="feature-grid">
        <div className="feature-card">
          <h4>Loyalty &amp; Rewards</h4>
          <p>
            Points-based loyalty program with configurable earn rules, tiered rewards, VIP tiers,
            and referral campaigns, all managed from Shopify.
          </p>
        </div>
        <div className="feature-card">
          <h4>Product Reviews</h4>
          <p>
            Collect text and photo reviews, moderate them with auto-approve rules, and display them
            on your storefront with rich snippet support.
          </p>
        </div>
        <div className="feature-card">
          <h4>Storefront Widgets</h4>
          <p>
            Eight theme app extension blocks including loyalty launcher, rewards page, reviews
            display, star ratings, and more, all customisable from the theme editor.
          </p>
        </div>
        <div className="feature-card">
          <h4>Automated Emails</h4>
          <p>
            Review request emails, points-earned notifications, reward reminders, and referral
            invites sent automatically on your behalf.
          </p>
        </div>
      </div>

      <h2>Platform Overview</h2>
      <p>
        Under the hood, PerkStack is a monorepo with three packages and a set of Shopify extensions:
      </p>

      <table>
        <thead>
          <tr>
            <th>Component</th>
            <th>Technology</th>
            <th>Purpose</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <code>packages/web</code>
            </td>
            <td>Remix, Polaris, App Bridge</td>
            <td>Admin UI and API routes embedded in Shopify</td>
          </tr>
          <tr>
            <td>
              <code>packages/shared</code>
            </td>
            <td>Drizzle ORM, PostgreSQL</td>
            <td>Database schema, queries, and shared utilities</td>
          </tr>
          <tr>
            <td>
              <code>packages/worker</code>
            </td>
            <td>BullMQ, Redis</td>
            <td>Background jobs such as emails, point calculations, and webhooks</td>
          </tr>
          <tr>
            <td>Extensions</td>
            <td>Shopify CLI extensions</td>
            <td>Theme blocks, checkout UI, admin blocks, pixel, Flow trigger</td>
          </tr>
        </tbody>
      </table>

      <h2>Shopify Extensions</h2>
      <p>
        PerkStack ships with the following Shopify extensions that integrate directly into your
        store:
      </p>
      <ul>
        <li>
          <strong>Theme App Extension</strong>: 8 blocks for your Online Store (loyalty launcher,
          rewards page, review widgets, star ratings, and more)
        </li>
        <li>
          <strong>Checkout UI Extension</strong>: displays loyalty points and rewards at checkout
        </li>
        <li>
          <strong>Admin Block: Customer Loyalty</strong>: view and manage a customer&apos;s points
          balance and history from their admin profile
        </li>
        <li>
          <strong>Admin Block: Customer Reviews</strong>: see all reviews submitted by a customer
          directly on their admin profile
        </li>
        <li>
          <strong>Customer Account Extension</strong>: lets customers view their points, rewards,
          and review history in their account page
        </li>
        <li>
          <strong>App Pixel</strong>: tracks storefront events for analytics and referral
          attribution
        </li>
        <li>
          <strong>Flow Trigger: New Review</strong>: fires a Shopify Flow trigger whenever a new
          review is submitted, enabling custom automations
        </li>
      </ul>

      <h2>Plans &amp; Pricing</h2>
      <p>PerkStack offers three plans to fit stores of every size:</p>

      <table>
        <thead>
          <tr>
            <th>Plan</th>
            <th>Price</th>
            <th>Trial</th>
            <th>Highlights</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <PlanBadge plan="free" />
            </td>
            <td>$0 / month</td>
            <td>-</td>
            <td>Core loyalty &amp; reviews, up to 100 monthly orders</td>
          </tr>
          <tr>
            <td>
              <PlanBadge plan="growth" />
            </td>
            <td>$49 / month</td>
            <td>7-day free trial</td>
            <td>VIP tiers, referrals, advanced review features, priority support</td>
          </tr>
          <tr>
            <td>
              <PlanBadge plan="pro" />
            </td>
            <td>$149 / month</td>
            <td>7-day free trial</td>
            <td>Unlimited orders, API access, custom branding, dedicated support</td>
          </tr>
        </tbody>
      </table>

      <Callout type="info">
        Both the Growth and Pro plans include a <strong>7-day free trial</strong> so you can explore
        every feature before you&apos;re charged. You can upgrade or downgrade at any time from the
        PerkStack settings page in your Shopify admin.
      </Callout>

      <h2>Next Steps</h2>
      <p>Ready to get started? Here&apos;s what to read next:</p>
      <ul>
        <li>
          <a href="/docs/getting-started/how-it-works">How It Works</a>: understand the architecture
          and data flow
        </li>
        <li>
          <a href="/docs/getting-started/installation">Installation</a>: install PerkStack from the
          Shopify App Store
        </li>
        <li>
          <a href="/docs/getting-started/shopify-setup">Shopify Setup</a>: configure webhooks, app
          proxy, and theme extensions
        </li>
        <li>
          <a href="/docs/getting-started/first-time-config">First-Time Configuration</a>: walk
          through the onboarding wizard and default settings
        </li>
      </ul>
    </div>
  );
}
