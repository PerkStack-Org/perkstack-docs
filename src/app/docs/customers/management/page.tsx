import type { Metadata } from "next";
import { createDocMetadata } from "@/lib/seo";
import { H2, H3 } from "@/components/Heading";
import Callout from "@/components/Callout";
import PlanBadge from "@/components/PlanBadge";

export const metadata: Metadata = createDocMetadata("/docs/customers/management", {
  title: "Customer Management",
  description:
    "Search, browse, and manage every member of your loyalty program from one list, with quick actions to adjust points, freeze accounts, and review history.",
});

export default function CustomerManagementPage() {
  return (
    <div className="docs-prose">
      <h1>Customer Management</h1>
      <p>
        The Customers list is where you find and manage everyone in your loyalty program. Search for
        a shopper, see their points and spend at a glance, and open quick actions without leaving the
        page. Open it from the <strong>Customers</strong> tab in the PerkStack menu.
      </p>

      <Callout type="info">
        Customers appear here automatically once they interact with your program &mdash; earning
        points, redeeming a reward, or leaving a review. You never add them by hand. Until then the
        list shows an empty state: &quot;No customers yet.&quot;
      </Callout>

      <H2>Finding a customer</H2>
      <p>
        Use the search box to filter the list by <strong>name</strong> or <strong>email</strong>.
        The list shows <strong>20 customers per page</strong> with pagination and a running total
        count, so you can page through your whole membership or jump straight to one shopper.
      </p>

      <H2>What the list shows</H2>
      <p>Each row summarizes one customer:</p>
      <table>
        <thead>
          <tr>
            <th>Column</th>
            <th>What it shows</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <strong>Customer</strong>
            </td>
            <td>Name and email address</td>
          </tr>
          <tr>
            <td>
              <strong>Points balance</strong>
            </td>
            <td>Points the customer can redeem right now</td>
          </tr>
          <tr>
            <td>
              <strong>Tier</strong>
            </td>
            <td>
              The customer&apos;s VIP tier. This column only appears when{" "}
              <a href="/docs/loyalty/vip-tiers">VIP tiers</a> are turned on (<PlanBadge plan="growth" />)
            </td>
          </tr>
          <tr>
            <td>
              <strong>Orders</strong>
            </td>
            <td>Number of orders the customer has placed</td>
          </tr>
          <tr>
            <td>
              <strong>Total spent</strong>
            </td>
            <td>Lifetime amount the customer has spent with your store</td>
          </tr>
          <tr>
            <td>
              <strong>Joined</strong>
            </td>
            <td>How long ago the customer joined your program</td>
          </tr>
          <tr>
            <td>
              <strong>Status</strong>
            </td>
            <td>
              <strong>Active</strong>, or a <strong>Frozen</strong> badge if the customer&apos;s
              loyalty is paused (see <a href="/docs/customers/freeze">Freeze &amp; Unfreeze</a>)
            </td>
          </tr>
        </tbody>
      </table>

      <H2>The Manage quick actions</H2>
      <p>
        Every row has a <strong>Manage</strong> button that opens a pop-up with three tabs, so you
        can handle most day-to-day requests without opening the full profile:
      </p>
      <H3>Overview</H3>
      <ul>
        <li>A snapshot of the customer&apos;s balance, tier, and status.</li>
        <li>
          <strong>Freeze</strong> or <strong>unfreeze</strong> the customer&apos;s loyalty.
        </li>
        <li>
          <strong>Change tier</strong> &mdash; pin them to a VIP tier or reset to automatic (VIP
          tiers only).
        </li>
        <li>
          <strong>Reset balance to 0</strong>, or <strong>expire</strong> their active points.
        </li>
      </ul>
      <H3>Adjust points</H3>
      <ul>
        <li>
          Choose a direction &mdash; <strong>Add</strong> or <strong>Subtract</strong> &mdash; and
          enter an amount.
        </li>
        <li>
          Add a <strong>reason</strong>. It is saved to the customer&apos;s points history so you (or
          a teammate) can see why the balance changed later.
        </li>
      </ul>
      <H3>History &amp; actions</H3>
      <ul>
        <li>Shows the customer&apos;s most recent points activity.</li>
        <li>
          Each entry has a <strong>Void</strong> action that reverses that single transaction.
          Voided entries stay visible, struck through and badged, so the record is always complete.
        </li>
      </ul>

      <Callout type="tip">
        For a fuller picture &mdash; tier progress, recent reviews, pending point grants, and the{" "}
        <strong>Grant reward</strong> control &mdash; open the customer&apos;s{" "}
        <a href="/docs/customers/detail">detail page</a> by clicking their name.
      </Callout>

      <H2>Related</H2>
      <ul>
        <li>
          <a href="/docs/customers/detail">Customer Detail</a>: the full per-customer profile and
          manual controls
        </li>
        <li>
          <a href="/docs/customers/freeze">Freeze &amp; Unfreeze</a>: pause a single customer&apos;s
          loyalty
        </li>
        <li>
          <a href="/docs/customers/tier-overrides">Tier Overrides</a>: manually set a
          customer&apos;s VIP tier
        </li>
        <li>
          <a href="/docs/customers/admin-blocks">Customer Page Blocks</a>: manage loyalty from
          Shopify&apos;s own customer page
        </li>
      </ul>
    </div>
  );
}
