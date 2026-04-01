import type { Metadata } from "next";
import Callout from "@/components/Callout";

export const metadata: Metadata = {
  title: "How It Works",
  description:
    "Understand PerkStack's architecture, data flow, and how loyalty and reviews work end-to-end.",
};

export default function HowItWorksPage() {
  return (
    <div className="docs-prose">
      <h1>How It Works</h1>
      <p>
        PerkStack connects to your Shopify store through OAuth, listens to real-time webhooks, and
        processes everything in the background so your storefront stays fast. This page explains the
        moving parts and how they fit together.
      </p>

      <h2>High-Level Architecture</h2>
      <p>
        The platform is split into three layers, each running independently but sharing the same
        PostgreSQL database:
      </p>

      <ol>
        <li>
          <strong>Web (Remix)</strong>: serves the admin UI inside Shopify and handles API routes.
          This is the app merchants interact with daily. It uses Polaris components for a native
          Shopify look and App Bridge for seamless embedding.
        </li>
        <li>
          <strong>Worker (BullMQ)</strong>: processes background jobs queued by the web layer. Jobs
          include sending review request emails, calculating points from orders, syncing customer
          data, and processing webhook payloads.
        </li>
        <li>
          <strong>Shared (Drizzle ORM)</strong>: contains the database schema, migration files, and
          reusable query functions. Both the web and worker packages import from here.
        </li>
      </ol>

      <pre>
        <code>{`┌────────────────────────────────────────────────┐
│                 Shopify Admin                  │
│  (App Bridge embed + Polaris UI)               │
└──────────┬─────────────────────┬───────────────┘
           │ API routes          │ Webhooks
           ▼                     ▼
┌──────────────────┐   ┌──────────────────┐
│   packages/web   │   │  packages/worker │
│  (Remix server)  │──▶│  (BullMQ jobs)   │
└────────┬─────────┘   └────────┬─────────┘
         │                      │
         ▼                      ▼
┌─────────────────────────────────────────┐
│           packages/shared               │
│  (Drizzle ORM · PostgreSQL · R2)        │
└─────────────────────────────────────────┘`}</code>
      </pre>

      <h2>Data Storage</h2>

      <table>
        <thead>
          <tr>
            <th>Store</th>
            <th>Technology</th>
            <th>What It Holds</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Primary database</td>
            <td>PostgreSQL (via Drizzle ORM)</td>
            <td>Shops, customers, points, reviews, rewards, sessions, settings</td>
          </tr>
          <tr>
            <td>Job queue</td>
            <td>Redis (via BullMQ)</td>
            <td>Background job payloads such as emails, point calculations, and webhooks</td>
          </tr>
          <tr>
            <td>Media storage</td>
            <td>Cloudflare R2</td>
            <td>Review photos, launcher images, branding assets</td>
          </tr>
          <tr>
            <td>Transactional email</td>
            <td>Resend</td>
            <td>Review requests, points notifications, referral invites</td>
          </tr>
        </tbody>
      </table>

      <h2>Loyalty Program Flow</h2>
      <p>Here is how points move through the system from a customer action to a redeemed reward:</p>

      <h3>1. Earning Points</h3>
      <p>
        Points are awarded when a qualifying event occurs. PerkStack listens for Shopify webhooks (
        <code>orders/paid</code>, <code>customers/create</code>) and also detects in-app actions
        (submitting a review, completing a referral).
      </p>
      <ol>
        <li>
          A webhook or API event fires (e.g., <code>orders/paid</code>).
        </li>
        <li>
          The web layer validates the payload and enqueues a <strong>points calculation job</strong>{" "}
          in BullMQ.
        </li>
        <li>
          The worker picks up the job, looks up the shop&apos;s earn rules, calculates the points,
          and credits them to the customer&apos;s balance in PostgreSQL.
        </li>
        <li>If email notifications are enabled, a follow-up email job is queued.</li>
      </ol>

      <h3>2. Redeeming Rewards</h3>
      <p>
        When a customer has enough points, they can redeem a reward from the storefront widget or
        their customer account page:
      </p>
      <ol>
        <li>
          The customer selects a reward and clicks <strong>Redeem</strong>.
        </li>
        <li>
          PerkStack creates a Shopify discount code via the Admin API (<code>write_discounts</code>{" "}
          scope).
        </li>
        <li>
          Points are debited from the customer&apos;s balance, and the discount code is returned for
          immediate use at checkout.
        </li>
      </ol>

      <Callout type="info">
        Discount codes generated by PerkStack are single-use and automatically expire based on the
        reward&apos;s configuration. You can manage active codes from the Rewards section in the
        admin.
      </Callout>

      <h2>Reviews Flow</h2>
      <p>
        PerkStack automates the full review lifecycle, from requesting reviews to displaying them on
        your storefront:
      </p>

      <h3>1. Review Request</h3>
      <ol>
        <li>
          When an order is fulfilled, PerkStack waits for the configured delay (default: 7 days).
        </li>
        <li>
          A review request email is sent to the customer via Resend, linking to a review form on
          your storefront.
        </li>
        <li>
          If the customer hasn&apos;t responded after the reminder delay (default: 3 days), an
          optional reminder email is sent.
        </li>
      </ol>

      <h3>2. Review Submission &amp; Moderation</h3>
      <ol>
        <li>The customer submits a review, either text-only or with photos (uploaded to R2).</li>
        <li>
          If the review&apos;s star rating meets or exceeds the{" "}
          <strong>auto-approve threshold</strong> (default: 4 stars), it&apos;s published
          automatically.
        </li>
        <li>Reviews below the threshold land in the moderation queue for manual approval.</li>
        <li>
          A <strong>Shopify Flow trigger</strong> fires for every new review, enabling merchants to
          build custom automations (e.g., notify on negative reviews, tag customers).
        </li>
      </ol>

      <h3>3. Points for Reviews</h3>
      <p>
        When a review is approved, PerkStack awards loyalty points based on the configured earn
        rules:
      </p>
      <ul>
        <li>
          <strong>Text review</strong>: 100 points (default)
        </li>
        <li>
          <strong>Photo review</strong>: 200 points (default)
        </li>
      </ul>

      <Callout type="tip">
        Offering more points for photo reviews encourages customers to include images, which
        increases trust and conversion rates for future shoppers.
      </Callout>

      <h2>Storefront Integration</h2>
      <p>
        PerkStack uses Shopify&apos;s <strong>theme app extensions</strong> (Online Store 2.0) to
        render widgets on your storefront. This means:
      </p>
      <ul>
        <li>No theme code editing required. Blocks are added via the theme editor.</li>
        <li>Widgets automatically adapt to your theme&apos;s styling.</li>
        <li>All blocks are removed cleanly if you uninstall the app.</li>
      </ul>
      <p>
        The storefront communicates with PerkStack through a Shopify <strong>app proxy</strong>{" "}
        configured at <code>/apps/perkstack/</code>. This proxy securely forwards requests from your
        storefront domain to PerkStack&apos;s server without exposing any API keys.
      </p>

      <h2>Webhook Processing</h2>
      <p>PerkStack automatically registers and listens for the following Shopify webhooks:</p>

      <table>
        <thead>
          <tr>
            <th>Webhook</th>
            <th>What PerkStack Does</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <code>orders/create</code>
            </td>
            <td>Records the order and prepares for point calculation</td>
          </tr>
          <tr>
            <td>
              <code>orders/paid</code>
            </td>
            <td>Awards purchase points based on order total</td>
          </tr>
          <tr>
            <td>
              <code>orders/updated</code>
            </td>
            <td>Handles cancellations, refunds, and amount adjustments</td>
          </tr>
          <tr>
            <td>
              <code>orders/fulfilled</code>
            </td>
            <td>Starts the review request delay timer</td>
          </tr>
          <tr>
            <td>
              <code>customers/create</code>
            </td>
            <td>Awards signup bonus points</td>
          </tr>
          <tr>
            <td>
              <code>customers/update</code>
            </td>
            <td>Syncs customer profile changes</td>
          </tr>
          <tr>
            <td>
              <code>app/uninstalled</code>
            </td>
            <td>Cleans up sessions and marks the shop as inactive</td>
          </tr>
          <tr>
            <td>
              <code>app_subscriptions/update</code>
            </td>
            <td>Syncs plan changes (upgrades, downgrades, cancellations)</td>
          </tr>
          <tr>
            <td>GDPR hooks</td>
            <td>Handles customer data requests, erasure, and shop erasure</td>
          </tr>
        </tbody>
      </table>

      <Callout type="warning">
        Webhooks are registered automatically during installation. If you see missing data (e.g.,
        orders not awarding points), check the <strong>Webhooks</strong> section in your Shopify
        admin under <strong>Settings → Notifications</strong> to confirm PerkStack&apos;s
        subscriptions are active.
      </Callout>

      <h2>Next Steps</h2>
      <ul>
        <li>
          <a href="/docs/getting-started/installation">Installation</a>: install PerkStack and
          connect it to your store
        </li>
        <li>
          <a href="/docs/getting-started/shopify-setup">Shopify Setup</a>: enable theme extensions
          and verify webhooks
        </li>
      </ul>
    </div>
  );
}
