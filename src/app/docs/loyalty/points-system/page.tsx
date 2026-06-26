import type { Metadata } from "next";
import { createDocMetadata } from "@/lib/seo";
import { H2, H3 } from "@/components/Heading";
import Callout from "@/components/Callout";

export const metadata: Metadata = createDocMetadata("/docs/loyalty/points-system", {
  title: "Points System",
  description:
    "Understand PerkStack's ledger-based points system, including transaction types, balances, idempotency, expiry, and how points flow through the system.",
});

export default function PointsSystemPage() {
  return (
    <div className="docs-prose">
      <h1>Points System</h1>
      <p>
        PerkStack uses a <strong>ledger-based points system</strong> where every point movement is
        recorded as an immutable transaction. This ensures complete auditability and accurate
        balance tracking across your entire loyalty program.
      </p>

      <H2>The Points Ledger</H2>
      <p>
        All point movements are stored in the <code>point_transactions</code> table. Each
        transaction records what happened, why it happened, and the resulting balance. The ledger is
        append-only, meaning transactions are never modified or deleted.
      </p>

      <H2>Transaction Types</H2>
      <p>
        Every transaction has a <code>type</code> that describes the nature of the point movement:
      </p>

      <table>
        <thead>
          <tr>
            <th>Type</th>
            <th>Direction</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <code>earn</code>
            </td>
            <td>+ (credit)</td>
            <td>Points awarded for completing an action (purchase, review, etc.)</td>
          </tr>
          <tr>
            <td>
              <code>redeem</code>
            </td>
            <td>- (debit)</td>
            <td>Points spent on a reward from the catalog</td>
          </tr>
          <tr>
            <td>
              <code>expire</code>
            </td>
            <td>- (debit)</td>
            <td>Points removed due to expiration policy</td>
          </tr>
          <tr>
            <td>
              <code>adjust</code>
            </td>
            <td>+/- (either)</td>
            <td>Manual adjustment by the merchant (add or remove points)</td>
          </tr>
          <tr>
            <td>
              <code>void</code>
            </td>
            <td>- (debit)</td>
            <td>Points revoked (e.g. due to a refunded order)</td>
          </tr>
        </tbody>
      </table>

      <H2>Source Types</H2>
      <p>
        Each transaction also has a <code>source</code> that identifies what triggered it:
      </p>

      <table>
        <thead>
          <tr>
            <th>Source</th>
            <th>Triggered By</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <code>purchase</code>
            </td>
            <td>Order placed by the customer</td>
          </tr>
          <tr>
            <td>
              <code>signup</code>
            </td>
            <td>Customer account creation</td>
          </tr>
          <tr>
            <td>
              <code>birthday</code>
            </td>
            <td>Customer&apos;s birthday (annual)</td>
          </tr>
          <tr>
            <td>
              <code>review</code>
            </td>
            <td>Approved product review (text or photo)</td>
          </tr>
          <tr>
            <td>
              <code>social</code>
            </td>
            <td>Social media share of a product</td>
          </tr>
          <tr>
            <td>
              <code>referral</code>
            </td>
            <td>Completed referral (awarded to both referrer and referee)</td>
          </tr>
          <tr>
            <td>
              <code>redemption</code>
            </td>
            <td>Points spent on a reward</td>
          </tr>
          <tr>
            <td>
              <code>expiry</code>
            </td>
            <td>Automated expiration of unused points</td>
          </tr>
          <tr>
            <td>
              <code>manual</code>
            </td>
            <td>Manual adjustment by the merchant from the admin</td>
          </tr>
          <tr>
            <td>
              <code>void</code>
            </td>
            <td>Points revoked after a refund or cancellation</td>
          </tr>
        </tbody>
      </table>

      <H2>Balance Tracking</H2>
      <p>
        Every transaction record includes a <code>balanceAfter</code> field that stores the
        customer&apos;s running point balance after that transaction. This makes it possible to
        reconstruct the full balance history for any customer without re-summing all transactions.
      </p>

      <Callout type="info">
        The <code>balanceAfter</code> field is the source of truth for a customer&apos;s current
        point balance. It is always equal to the <code>balanceAfter</code> value of their most
        recent transaction.
      </Callout>

      <H2>Idempotency</H2>
      <p>
        Each transaction carries an <strong>idempotency key</strong> that prevents duplicate awards.
        If the same action is processed twice (e.g. due to a webhook retry or network issue), the
        second attempt is silently ignored because the idempotency key already exists.
      </p>
      <p>
        This ensures customers never receive double points for a single action, even under adverse
        network conditions.
      </p>

      <H2>Points Expiry</H2>
      <p>
        You can optionally configure points to expire after a set number of months. This encourages
        customers to use their points and keeps engagement high.
      </p>

      <table>
        <thead>
          <tr>
            <th>Setting</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <code>pointsExpiryMonths</code>
            </td>
            <td>
              Number of months after which unused points expire. Set to <code>null</code> for points
              that never expire
            </td>
          </tr>
          <tr>
            <td>
              <code>expiryNotificationDays</code>
            </td>
            <td>
              How many days before expiry to notify the customer. Defaults to{" "}
              <strong>30 days</strong>
            </td>
          </tr>
        </tbody>
      </table>

      <H3>Expiry Process</H3>
      <p>Points expiry is handled by an automated background worker:</p>
      <ol>
        <li>
          The <strong>points-expire</strong> worker runs daily at <strong>2:00 AM</strong>
        </li>
        <li>It identifies all point transactions that have passed their expiry date</li>
        <li>
          For each expired batch, it creates an <code>expire</code> transaction that debits the
          expired points from the customer&apos;s balance
        </li>
      </ol>

      <Callout type="tip">
        Before points expire, customers receive a notification based on your{" "}
        <code>expiryNotificationDays</code> setting. This gives them time to redeem their points
        before they&apos;re lost.
      </Callout>

      <Callout type="warning">
        Once points expire, they cannot be recovered automatically. If you need to restore expired
        points for a customer, use a manual adjustment from the admin.
      </Callout>

      <H2>Related</H2>
      <ul>
        <li>
          <a href="/docs/loyalty/overview">Loyalty Overview</a>: how the loyalty system works
        </li>
        <li>
          <a href="/docs/loyalty/earn-rules">Earn Rules</a>: configure how customers earn points
        </li>
        <li>
          <a href="/docs/loyalty/rewards">Rewards Catalog</a>: set up what customers can redeem
        </li>
        <li>
          <a href="/docs/loyalty/vip-tiers">VIP Tiers</a>: how lifetime points determine tier status
        </li>
      </ul>
    </div>
  );
}
