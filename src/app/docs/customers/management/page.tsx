import type { Metadata } from "next";
import Callout from "@/components/Callout";
import PlanBadge from "@/components/PlanBadge";

export const metadata: Metadata = {
  title: "Customer Management",
  description:
    "Search, browse, and manage loyalty customers. View points balances, tiers, and frozen status from the customer list.",
};

export default function CustomerManagementPage() {
  return (
    <div className="docs-prose">
      <h1>Customer Management</h1>
      <p>
        The customer management page (<strong>PerkStack → Customers</strong>) gives you a
        searchable, paginated list of every customer enrolled in your loyalty program. From here you
        can review balances, check tier status, and take quick actions like freezing or unfreezing a
        customer&apos;s loyalty account.
      </p>

      <h2>Searching Customers</h2>
      <p>
        Use the search bar at the top of the page to find customers by <strong>name</strong> or{" "}
        <strong>email address</strong>. The search is case-insensitive and matches partial strings,
        so typing <code>jane</code> will find &ldquo;Jane Smith&rdquo; and
        &ldquo;janetaylor@example.com&rdquo;.
      </p>

      <h2>Customer Table</h2>
      <p>The customer list displays the following columns:</p>
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
              <strong>Name</strong>
            </td>
            <td>Customer&apos;s full name (links to their detail page)</td>
          </tr>
          <tr>
            <td>
              <strong>Email</strong>
            </td>
            <td>Customer&apos;s email address</td>
          </tr>
          <tr>
            <td>
              <strong>Tier</strong>
            </td>
            <td>
              Current VIP tier (if tiers are enabled on the <PlanBadge plan="growth" /> plan or above)
            </td>
          </tr>
          <tr>
            <td>
              <strong>Points Balance</strong>
            </td>
            <td>Current available points (earned minus redeemed/expired)</td>
          </tr>
          <tr>
            <td>
              <strong>Status</strong>
            </td>
            <td>Active or Frozen, indicating whether the customer can earn/redeem points</td>
          </tr>
        </tbody>
      </table>

      <h2>Pagination</h2>
      <p>
        Results are paginated with navigation controls at the bottom of the table. The default page
        size shows 25 customers per page. Use the previous/next buttons to navigate through your
        customer list.
      </p>

      <h2>Quick Actions</h2>
      <p>From the customer list, you can perform the following actions on any customer row:</p>
      <ul>
        <li>
          <strong>View Details</strong>: click the customer name to open their{" "}
          <a href="/docs/customers/detail">detail page</a>
        </li>
        <li>
          <strong>Freeze / Unfreeze</strong>: toggle the customer&apos;s loyalty status (see{" "}
          <a href="/docs/customers/freeze">Freeze &amp; Unfreeze</a>)
        </li>
      </ul>

      <Callout type="info">
        Customers are automatically created in PerkStack when they place an order, create an
        account, or interact with the loyalty widget. You do not need to import customers manually.
      </Callout>

      <h2>Understanding Customer Status</h2>
      <table>
        <thead>
          <tr>
            <th>Status</th>
            <th>Can Earn Points</th>
            <th>Can Redeem Points</th>
            <th>Reviews</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <strong>Active</strong>
            </td>
            <td>Yes</td>
            <td>Yes</td>
            <td>Can submit reviews</td>
          </tr>
          <tr>
            <td>
              <strong>Frozen</strong>
            </td>
            <td>No</td>
            <td>No</td>
            <td>Can still submit reviews</td>
          </tr>
        </tbody>
      </table>

      <Callout type="warning">
        Freezing a customer&apos;s loyalty account does not affect their ability to place orders or
        submit reviews. It only prevents points from being earned or redeemed.
      </Callout>

      <h2>Related</h2>
      <ul>
        <li>
          <a href="/docs/customers/detail">Customer Detail</a>: full profile, transaction history,
          and manual adjustments
        </li>
        <li>
          <a href="/docs/customers/tier-overrides">Tier Overrides</a>: manually assign a VIP tier
        </li>
        <li>
          <a href="/docs/customers/freeze">Freeze &amp; Unfreeze</a>: suspend a customer&apos;s
          loyalty participation
        </li>
      </ul>
    </div>
  );
}
