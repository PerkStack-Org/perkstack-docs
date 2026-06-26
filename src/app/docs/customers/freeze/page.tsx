import type { Metadata } from "next";
import { createDocMetadata } from "@/lib/seo";
import { H2, H3 } from "@/components/Heading";
import Callout from "@/components/Callout";

export const metadata: Metadata = createDocMetadata("/docs/customers/freeze", {
  title: "Freeze & Unfreeze Customers",
  description:
    "Suspend and restore a customer's ability to earn and redeem loyalty points using the freeze/unfreeze feature.",
});

export default function FreezeUnfreezePage() {
  return (
    <div className="docs-prose">
      <h1>Freeze &amp; Unfreeze Customers</h1>
      <p>
        Freezing a customer&apos;s loyalty account temporarily suspends their ability to earn or
        redeem points. The customer&apos;s existing balance and transaction history are preserved,
        and nothing is deleted. This is useful for handling suspected fraud, disputes, or any
        situation where you need to pause loyalty activity for a specific customer.
      </p>

      <H2>How Freezing Works</H2>
      <p>
        Each customer in PerkStack has a <code>loyaltyFrozen</code> flag in the database. When set
        to <code>true</code>:
      </p>
      <ul>
        <li>
          <strong>No points are earned</strong>: purchase, review, referral, birthday, and signup
          earn rules are all skipped
        </li>
        <li>
          <strong>No points can be redeemed</strong>: the customer cannot create new reward
          redemptions
        </li>
        <li>
          <strong>Existing rewards are unaffected</strong>: discount codes already generated remain
          valid
        </li>
        <li>
          <strong>Reviews are unaffected</strong>: the customer can still submit and manage reviews
        </li>
        <li>
          <strong>Points do not expire</strong>: the expiry clock pauses while the account is frozen
        </li>
      </ul>

      <Callout type="info">
        Freezing is a loyalty-only action. It does not affect the customer&apos;s Shopify account,
        their ability to place orders, or their reviews.
      </Callout>

      <H2>Freezing a Customer</H2>
      <p>You can freeze a customer from two places:</p>

      <H3>From the Customer List</H3>
      <ol>
        <li>
          Navigate to <strong>PerkStack → Customers</strong>
        </li>
        <li>Find the customer using search or pagination</li>
        <li>
          Click the <strong>Freeze</strong> action on the customer&apos;s row
        </li>
        <li>Confirm the action in the dialog</li>
      </ol>

      <H3>From the Customer Detail Page</H3>
      <ol>
        <li>
          Navigate to <strong>PerkStack → Customers → [Customer]</strong>
        </li>
        <li>
          Click the <strong>Freeze Account</strong> button in the loyalty section
        </li>
        <li>Confirm the action</li>
      </ol>

      <p>
        Once frozen, the customer&apos;s status changes to <strong>Frozen</strong> in the customer
        list, and a frozen indicator appears on their detail page.
      </p>

      <H2>Unfreezing a Customer</H2>
      <p>
        To restore a customer&apos;s loyalty participation, follow the same steps as above but click{" "}
        <strong>Unfreeze</strong> instead. The <code>loyaltyFrozen</code> flag is set back to{" "}
        <code>false</code>, and:
      </p>
      <ul>
        <li>Earn rules resume applying to new qualifying actions</li>
        <li>The customer can redeem points again</li>
        <li>The points expiry clock resumes</li>
      </ul>

      <Callout type="warning">
        Unfreezing does not retroactively award points for actions that occurred while the account
        was frozen. For example, if a customer placed an order while frozen, they will not receive
        points for that order after unfreezing.
      </Callout>

      <H2>Common Use Cases</H2>
      <table>
        <thead>
          <tr>
            <th>Scenario</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Suspected fraudulent activity</td>
            <td>Freeze while investigating; unfreeze if cleared</td>
          </tr>
          <tr>
            <td>Customer dispute or chargeback</td>
            <td>Freeze until the dispute is resolved</td>
          </tr>
          <tr>
            <td>Customer requests to opt out of loyalty</td>
            <td>Freeze the account to stop all loyalty activity</td>
          </tr>
          <tr>
            <td>Testing or debugging</td>
            <td>Freeze a test customer to verify earn rules skip frozen accounts</td>
          </tr>
        </tbody>
      </table>

      <H2>Related</H2>
      <ul>
        <li>
          <a href="/docs/customers/management">Customer Management</a>: searchable customer list
          with status column
        </li>
        <li>
          <a href="/docs/customers/detail">Customer Detail</a>: full customer profile and point
          adjustments
        </li>
        <li>
          <a href="/docs/advanced/status-reference">Status Reference</a>: all status enums used
          across PerkStack
        </li>
      </ul>
    </div>
  );
}
