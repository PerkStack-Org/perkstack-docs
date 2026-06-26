import type { Metadata } from "next";
import { createDocMetadata } from "@/lib/seo";
import { H2 } from "@/components/Heading";
import Callout from "@/components/Callout";

export const metadata: Metadata = createDocMetadata("/docs/advanced/webhooks", {
  title: "Webhooks",
  description:
    "Complete reference for all Shopify webhooks PerkStack handles, covering orders, customers, app lifecycle, and GDPR compliance.",
});

export default function WebhooksPage() {
  return (
    <div className="docs-prose">
      <h1>Webhooks</h1>
      <p>
        PerkStack subscribes to Shopify webhooks to keep data synchronised and trigger background
        processing. Webhooks are received by the web app and, where needed, enqueue jobs for the
        background worker.
      </p>

      <H2>Order Webhooks</H2>
      <table>
        <thead>
          <tr>
            <th>Webhook</th>
            <th>Trigger</th>
            <th>Processing</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <code>ORDERS_CREATE</code>
            </td>
            <td>New order placed</td>
            <td>
              Creates the customer record in PerkStack if they are new. Checks if the order was
              placed via a referral link and records the referral if applicable.
            </td>
          </tr>
          <tr>
            <td>
              <code>ORDERS_UPDATED</code>
            </td>
            <td>Order data changes</td>
            <td>
              Updates stored order metadata (totals, line items, fulfilment status). Used to keep
              local order data in sync with Shopify.
            </td>
          </tr>
          <tr>
            <td>
              <code>ORDERS_PAID</code>
            </td>
            <td>Payment captured</td>
            <td>
              Enqueues a points award job for the purchase earn rule. The worker calculates points
              based on order total and the configured earn rate.
            </td>
          </tr>
          <tr>
            <td>
              <code>ORDERS_FULFILLED</code>
            </td>
            <td>Order marked as fulfilled</td>
            <td>
              Schedules review request emails for each product in the order. The emails are delayed
              by the configured number of days (default 7).
            </td>
          </tr>
        </tbody>
      </table>

      <Callout type="info">
        Points are awarded on <code>ORDERS_PAID</code>, not on order creation. This ensures points
        are only given for orders where payment has been successfully captured.
      </Callout>

      <H2>Customer Webhooks</H2>
      <table>
        <thead>
          <tr>
            <th>Webhook</th>
            <th>Trigger</th>
            <th>Processing</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <code>CUSTOMERS_CREATE</code>
            </td>
            <td>New customer account created</td>
            <td>
              Creates a corresponding customer record in PerkStack&apos;s database with initial
              points balance of zero.
            </td>
          </tr>
          <tr>
            <td>
              <code>CUSTOMERS_UPDATE</code>
            </td>
            <td>Customer data changes in Shopify</td>
            <td>
              Syncs updated fields: name, email address, and marketing opt-in status. Keeps
              PerkStack&apos;s local customer data consistent with Shopify.
            </td>
          </tr>
        </tbody>
      </table>

      <H2>App Lifecycle Webhooks</H2>
      <table>
        <thead>
          <tr>
            <th>Webhook</th>
            <th>Trigger</th>
            <th>Processing</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <code>APP_UNINSTALLED</code>
            </td>
            <td>Merchant uninstalls PerkStack</td>
            <td>
              Marks the shop as uninstalled in the database. Enqueues a recovery email to the
              merchant (sent after a configurable delay). Theme app extension blocks are
              automatically removed by Shopify.
            </td>
          </tr>
          <tr>
            <td>
              <code>APP_SUBSCRIPTIONS_UPDATE</code>
            </td>
            <td>Billing subscription status changes</td>
            <td>
              Updates the shop&apos;s billing status and plan in the database. Handles transitions
              between <code>active</code>, <code>pending</code>, <code>frozen</code>, and{" "}
              <code>cancelled</code> states.
            </td>
          </tr>
        </tbody>
      </table>

      <Callout type="warning">
        When a shop uninstalls, data is retained in the database to support reinstallation. The
        merchant&apos;s data is not deleted unless explicitly requested via the GDPR
        <code>shop/redact</code> webhook.
      </Callout>

      <H2>GDPR Webhooks</H2>
      <p>
        Shopify requires all apps to handle three mandatory GDPR webhooks for privacy compliance:
      </p>
      <table>
        <thead>
          <tr>
            <th>Webhook</th>
            <th>Purpose</th>
            <th>Processing</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <code>customers/data_request</code>
            </td>
            <td>Customer requests their data</td>
            <td>
              Returns all PerkStack data associated with the customer: points balance, transaction
              history, reviews, referrals, and redemptions.
            </td>
          </tr>
          <tr>
            <td>
              <code>customers/redact</code>
            </td>
            <td>Customer requests data deletion</td>
            <td>
              Anonymises the customer&apos;s personal data in PerkStack. Name and email are
              scrubbed. Transaction records are retained in anonymised form for accounting.
            </td>
          </tr>
          <tr>
            <td>
              <code>shop/redact</code>
            </td>
            <td>Shop data deletion (48 hours after uninstall)</td>
            <td>
              Deletes all shop data from PerkStack&apos;s database, including settings, customers,
              reviews, transactions, and rewards.
            </td>
          </tr>
        </tbody>
      </table>

      <H2>Webhook Processing Flow</H2>
      <ol>
        <li>Shopify sends a POST request to the web app&apos;s webhook endpoint</li>
        <li>The web app verifies the HMAC signature to ensure authenticity</li>
        <li>The webhook payload is parsed and the relevant handler is invoked</li>
        <li>
          For async processing, the handler enqueues a BullMQ job and returns a 200 response
          immediately
        </li>
        <li>The background worker picks up the job and performs the actual processing</li>
      </ol>

      <Callout type="tip">
        Webhook handlers always return a <code>200</code> response quickly to avoid Shopify retries.
        Heavy processing is offloaded to the background worker queue.
      </Callout>

      <H2>Related</H2>
      <ul>
        <li>
          <a href="/docs/advanced/architecture">Architecture</a>: how the web app and worker
          interact
        </li>
        <li>
          <a href="/docs/advanced/status-reference">Status Reference</a>: all status enums
          referenced in webhook processing
        </li>
        <li>
          <a href="/docs/settings/billing">Billing &amp; Plans</a>: billing status transitions
          triggered by <code>APP_SUBSCRIPTIONS_UPDATE</code>
        </li>
      </ul>
    </div>
  );
}
