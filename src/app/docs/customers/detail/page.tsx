import type { Metadata } from "next";
import Callout from "@/components/Callout";
import PlanBadge from "@/components/PlanBadge";

export const metadata: Metadata = {
  title: "Customer Detail",
  description:
    "View a customer's full profile including points balance, transaction history, reviews, tier information, and manual point adjustments.",
};

export default function CustomerDetailPage() {
  return (
    <div className="docs-prose">
      <h1>Customer Detail</h1>
      <p>
        The customer detail page (<strong>PerkStack → Customers → [Customer]</strong>) shows
        everything PerkStack knows about a specific customer, pulling data from both the local
        database and the Shopify Admin GraphQL API.
      </p>

      <h2>Customer Profile</h2>
      <p>
        The top section displays the customer&apos;s profile information fetched via the Shopify{" "}
        <code>CUSTOMER_QUERY</code> GraphQL query:
      </p>
      <ul>
        <li>Full name and email address</li>
        <li>Shopify customer ID (with link to the Shopify admin customer page)</li>
        <li>Account creation date</li>
        <li>Total orders count and lifetime spend</li>
        <li>Marketing opt-in status</li>
        <li>Tags applied in Shopify</li>
      </ul>

      <h2>Points Balance</h2>
      <p>A summary card shows the customer&apos;s current points status:</p>
      <table>
        <thead>
          <tr>
            <th>Field</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <strong>Current Balance</strong>
            </td>
            <td>Points available to redeem right now</td>
          </tr>
          <tr>
            <td>
              <strong>Lifetime Earned</strong>
            </td>
            <td>Total points earned since the customer joined (used for tier calculation)</td>
          </tr>
          <tr>
            <td>
              <strong>Lifetime Redeemed</strong>
            </td>
            <td>Total points redeemed for rewards</td>
          </tr>
          <tr>
            <td>
              <strong>Points Expired</strong>
            </td>
            <td>Total points lost to expiry (if expiry is enabled)</td>
          </tr>
        </tbody>
      </table>

      <h2>Transaction History</h2>
      <p>
        A chronological table lists every points transaction for the customer. Each row includes:
      </p>
      <table>
        <thead>
          <tr>
            <th>Column</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <strong>Date</strong>
            </td>
            <td>When the transaction occurred</td>
          </tr>
          <tr>
            <td>
              <strong>Type</strong>
            </td>
            <td>
              One of: <code>earn</code>, <code>redeem</code>, <code>expire</code>,{" "}
              <code>adjust</code>, <code>void</code>
            </td>
          </tr>
          <tr>
            <td>
              <strong>Points</strong>
            </td>
            <td>Amount of points (positive for earn/adjust, negative for redeem/expire/void)</td>
          </tr>
          <tr>
            <td>
              <strong>Source</strong>
            </td>
            <td>What triggered the transaction (purchase, review, referral, manual, etc.)</td>
          </tr>
          <tr>
            <td>
              <strong>Description</strong>
            </td>
            <td>Additional context such as order number or reward name</td>
          </tr>
        </tbody>
      </table>

      <h2>Reviews</h2>
      <p>
        The reviews section lists all reviews submitted by this customer, along with their status
        (pending, approved, rejected, spam), rating, and submission date. Click any review to jump
        to the review detail/moderation page.
      </p>

      <h2>Tier Information</h2>
      <p>
        If VIP tiers are enabled (<PlanBadge plan="growth" /> plan or above required), the detail page shows:
      </p>
      <ul>
        <li>
          <strong>Current Tier</strong>: the tier the customer qualifies for based on lifetime
          earned points
        </li>
        <li>
          <strong>Next Tier</strong>: the next tier and how many more points are needed to reach it
        </li>
        <li>
          <strong>Tier Override</strong>: whether an admin has manually set this customer&apos;s
          tier (see <a href="/docs/customers/tier-overrides">Tier Overrides</a>)
        </li>
      </ul>

      <Callout type="info">
        Tiers are calculated from <strong>lifetime earned points</strong>, not from the
        customer&apos;s current balance. Redeeming or expiring points does not lower a
        customer&apos;s tier.
      </Callout>

      <h2>Manual Point Adjustments</h2>
      <p>
        You can manually add or subtract points from a customer&apos;s balance using the adjustment
        form on the detail page:
      </p>
      <ol>
        <li>Enter a positive number to add points or a negative number to subtract</li>
        <li>
          Provide a reason for the adjustment (required; this appears in the transaction history)
        </li>
        <li>
          Click <strong>Submit Adjustment</strong>
        </li>
      </ol>
      <p>
        Manual adjustments create a transaction with type <code>adjust</code> and source{" "}
        <code>manual</code>. They are visible in the transaction history and affect the
        customer&apos;s current balance.
      </p>

      <Callout type="warning">
        Manual adjustments to add points <strong>do</strong> increase lifetime earned points and may
        affect tier placement. Use them carefully.
      </Callout>

      <h2>Related</h2>
      <ul>
        <li>
          <a href="/docs/customers/management">Customer Management</a>: searchable customer list
        </li>
        <li>
          <a href="/docs/customers/tier-overrides">Tier Overrides</a>: manually set a
          customer&apos;s tier
        </li>
        <li>
          <a href="/docs/customers/freeze">Freeze &amp; Unfreeze</a>: suspend loyalty participation
        </li>
      </ul>
    </div>
  );
}
