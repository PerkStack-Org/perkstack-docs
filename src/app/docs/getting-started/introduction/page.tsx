import type { Metadata } from "next";
import { createDocMetadata } from "@/lib/seo";
import { H2 } from "@/components/Heading";
import Callout from "@/components/Callout";
import PlanBadge from "@/components/PlanBadge";

export const metadata: Metadata = createDocMetadata("/docs/getting-started/introduction", {
  title: "Introduction",
  description:
    "Learn what PerkStack is, what it can do for your store, and how the platform is structured.",
});

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

      <H2>What You Get</H2>

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

      <H2>Platform Overview</H2>
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

      <H2>Shopify Extensions</H2>
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

      <H2>Plans &amp; Pricing</H2>
      <p>PerkStack offers four plans to fit stores of every size:</p>

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
            <td>Core loyalty + unlimited text reviews, up to 100 monthly orders</td>
          </tr>
          <tr>
            <td>
              <PlanBadge plan="essential" />
            </td>
            <td>$29 / month</td>
            <td>14-day free trial</td>
            <td>Photo reviews, checkout extension, branding removal, 500 orders/mo</td>
          </tr>
          <tr>
            <td>
              <PlanBadge plan="growth" />
            </td>
            <td>$99 / month</td>
            <td>21-day free trial</td>
            <td>
              Referrals, VIP tiers, Shopify Flow, Klaviyo &amp; Judge.me integrations, 2,500
              orders/mo
            </td>
          </tr>
          <tr>
            <td>
              <PlanBadge plan="studio" />
            </td>
            <td>$299 / month</td>
            <td>30-day free trial</td>
            <td>Full white-label, custom domain &amp; CSS, bulk ops, 10,000 orders/mo</td>
          </tr>
        </tbody>
      </table>

      <Callout type="info">
        All paid plans include a free trial (14 / 21 / 30 days). You can upgrade or downgrade at any
        time from the PerkStack settings page in your Shopify admin. See{" "}
        <a href="/docs/settings/billing">Billing &amp; Plans</a> for the full feature comparison.
      </Callout>

      <H2>Next Steps</H2>
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
