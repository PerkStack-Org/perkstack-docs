import type { Metadata } from "next";
import Callout from "@/components/Callout";

export const metadata: Metadata = {
  title: "Web Pixel",
  description:
    "How the PerkStack app pixel tracks storefront events, processes checkout data, and feeds analytics.",
};

export default function WebPixelPage() {
  return (
    <div className="docs-prose">
      <h1>Web Pixel</h1>
      <p>
        The PerkStack app pixel is a Shopify <code>web_pixel</code> extension that runs in a strict
        sandbox on your storefront. It tracks key customer events and sends them to PerkStack&apos;s
        backend for processing.
      </p>

      <h2>How It Works</h2>
      <ol>
        <li>The pixel extension is automatically registered when PerkStack is installed</li>
        <li>
          It runs in Shopify&apos;s strict pixel sandbox, isolated from the main page with no DOM
          access
        </li>
        <li>
          The pixel subscribes to the <code>checkout_completed</code> event
        </li>
        <li>When a checkout completes, the pixel sends data to PerkStack via a POST request</li>
        <li>PerkStack processes the data to update customer records and analytics</li>
      </ol>

      <h2>Event: Checkout Completed</h2>
      <p>
        When the <code>checkout_completed</code> event fires, the pixel posts the following data to{" "}
        <code>/apps/perkstack/api/pixel/checkout</code>:
      </p>
      <table>
        <thead>
          <tr>
            <th>Field</th>
            <th>Type</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <code>customerId</code>
            </td>
            <td>string</td>
            <td>The Shopify customer ID (if logged in)</td>
          </tr>
          <tr>
            <td>
              <code>total</code>
            </td>
            <td>number</td>
            <td>Order total amount</td>
          </tr>
          <tr>
            <td>
              <code>currency</code>
            </td>
            <td>string</td>
            <td>Currency code (e.g. USD, EUR)</td>
          </tr>
          <tr>
            <td>
              <code>discountCodes</code>
            </td>
            <td>string[]</td>
            <td>Array of discount codes applied at checkout</td>
          </tr>
        </tbody>
      </table>

      <h2>Server-Side Processing</h2>
      <p>When the pixel endpoint receives checkout data, it performs the following:</p>
      <ol>
        <li>
          <strong>Update customer stats</strong>: increments <code>ordersCount</code> and adds the
          order total to <code>totalSpent</code> on the customer record
        </li>
        <li>
          <strong>Enqueue stats recompute</strong>: queues a background job to recalculate derived
          metrics (tier qualification, lifetime value, etc.)
        </li>
        <li>
          <strong>Referral attribution</strong>: checks if any discount codes match active referral
          campaigns for attribution
        </li>
      </ol>

      <Callout type="info">
        The pixel complements the <code>ORDERS_PAID</code> webhook. The webhook handles points
        awarding, while the pixel provides faster real-time stats updates and referral attribution
        via discount codes.
      </Callout>

      <h2>Strict Runtime</h2>
      <p>Shopify&apos;s web pixel strict runtime imposes the following constraints:</p>
      <ul>
        <li>No DOM access. The pixel cannot read or modify the page</li>
        <li>No cookies. The pixel cannot set or read browser cookies</li>
        <li>Limited APIs. Only Shopify-approved browser APIs are available</li>
        <li>Sandboxed execution. Runs in an isolated worker context</li>
      </ul>
      <p>
        These constraints ensure customer privacy and security while still allowing the pixel to
        capture checkout events.
      </p>

      <h2>Privacy</h2>
      <p>
        The PerkStack pixel only collects data that Shopify exposes through the{" "}
        <code>checkout_completed</code> event. It does not:
      </p>
      <ul>
        <li>Track browsing behaviour or page views</li>
        <li>Set or read cookies</li>
        <li>Collect personal information beyond what Shopify provides in the event</li>
        <li>Share data with third parties</li>
      </ul>

      <Callout type="tip">
        The pixel runs automatically and requires no configuration. If you need to verify it is
        active, check the extension status on the{" "}
        <a href="/docs/dashboard/extension-status">dashboard</a>.
      </Callout>

      <h2>Troubleshooting</h2>
      <table>
        <thead>
          <tr>
            <th>Issue</th>
            <th>Possible Cause</th>
            <th>Resolution</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Stats not updating after checkout</td>
            <td>Pixel blocked by customer&apos;s cookie consent preferences</td>
            <td>
              Stats will still be updated when the <code>ORDERS_PAID</code> webhook fires
            </td>
          </tr>
          <tr>
            <td>Discount code attribution not working</td>
            <td>Discount code format doesn&apos;t match referral campaign</td>
            <td>Verify the referral campaign&apos;s discount code prefix matches</td>
          </tr>
          <tr>
            <td>Pixel appears inactive on dashboard</td>
            <td>Extension not registered</td>
            <td>Reinstall PerkStack or contact support</td>
          </tr>
        </tbody>
      </table>

      <h2>Related</h2>
      <ul>
        <li>
          <a href="/docs/advanced/webhooks">Webhooks</a>: order webhooks that complement pixel data
        </li>
        <li>
          <a href="/docs/dashboard/analytics">Dashboard Analytics</a>: where pixel data surfaces in
          charts
        </li>
        <li>
          <a href="/docs/dashboard/extension-status">Extension Status</a>: verify pixel is active
        </li>
      </ul>
    </div>
  );
}
