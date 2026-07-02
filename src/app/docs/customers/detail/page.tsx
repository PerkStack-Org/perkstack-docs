import type { Metadata } from "next";
import { createDocMetadata } from "@/lib/seo";
import { H2 } from "@/components/Heading";
import Callout from "@/components/Callout";
import PlanBadge from "@/components/PlanBadge";

export const metadata: Metadata = createDocMetadata("/docs/customers/detail", {
  title: "Customer Detail",
  description:
    "See a customer's full loyalty profile — balance, spend, tier progress, recent activity, reviews, and pending points — and use manual controls to adjust points or grant a reward.",
});

export default function CustomerDetailPage() {
  return (
    <div className="docs-prose">
      <h1>Customer Detail</h1>
      <p>
        The customer detail page is the complete loyalty profile for one shopper. It brings their
        points, spend, tier progress, activity, and reviews together in one place, and gives you the
        manual controls to adjust points or grant a reward. Open it by clicking a customer&apos;s
        name in the <a href="/docs/customers/management">Customers list</a>.
      </p>
      <p>
        Opening the page refreshes the customer&apos;s Shopify order count and total spend, so the
        numbers you see are always current.
      </p>

      <H2>What the profile shows</H2>
      <ul>
        <li>
          <strong>Points balance</strong> &mdash; points the customer can redeem right now.
        </li>
        <li>
          <strong>Orders</strong> and <strong>total spent</strong> &mdash; their purchase history
          with your store.
        </li>
        <li>
          <strong>Tier progress</strong> &mdash; their current VIP tier and a progress bar toward
          the next one (shown when <a href="/docs/loyalty/vip-tiers">VIP tiers</a> are on).
        </li>
        <li>
          <strong>Recent activity</strong> &mdash; the latest points transactions: what changed,
          when, and why.
        </li>
        <li>
          <strong>Recent reviews</strong> &mdash; reviews this customer has left, with their status.
        </li>
        <li>
          <strong>Pending points</strong> &mdash; points that are on hold and haven&apos;t landed
          yet, along with the order they came from and when they&apos;ll arrive.
        </li>
      </ul>

      <Callout type="info">
        Pending points come from <a href="/docs/loyalty/points-system">points delay</a>, which holds
        purchase points for a set period (for example, to match your return window) before they
        count toward a customer&apos;s balance. They appear here so you can see what&apos;s on the
        way.
      </Callout>

      <H2>Adjusting points</H2>
      <p>Use the adjustment control to add or subtract points by hand:</p>
      <ol>
        <li>
          Choose a direction &mdash; <strong>Add</strong> or <strong>Subtract</strong>.
        </li>
        <li>Enter the number of points.</li>
        <li>
          Enter a <strong>reason</strong>. It is saved to the customer&apos;s activity history, so
          anyone reviewing the account later can see why the balance changed.
        </li>
        <li>Submit. The balance updates immediately and the adjustment appears in recent activity.</li>
      </ol>

      <Callout type="tip">
        Manual adjustments made here can start a <a href="/docs/integrations/shopify-flow">Shopify
        Flow</a> automation (<PlanBadge plan="growth" />), so you can, for example, notify your team
        or tag the customer whenever their points are changed by hand.
      </Callout>

      <Callout type="warning">
        Adding points increases the customer&apos;s <strong>lifetime earned</strong> total, which can
        move them up a VIP tier. Keep that in mind when correcting balances.
      </Callout>

      <H2>
        Granting a reward <PlanBadge plan="essential" />
      </H2>
      <p>
        <strong>Grant reward</strong> hands a customer a reward directly, without them spending
        points. It&apos;s ideal for service recoveries, surprise-and-delight, or an anniversary gift.
      </p>
      <ol>
        <li>
          Click <strong>Grant reward</strong>.
        </li>
        <li>Pick a reward from your active catalog. Its normal points cost is shown next to it.</li>
        <li>
          Optionally set a <strong>cost override</strong>. Leave it blank to charge the reward&apos;s
          normal cost, or enter <code>0</code> to grant it free.
        </li>
        <li>
          Enter a <strong>reason</strong> of at least 10 characters, so the grant is easy to account
          for later.
        </li>
        <li>Confirm. The customer receives their discount code within seconds.</li>
      </ol>

      <Callout type="warning">
        If the customer already has a reward waiting to be used, granting another is blocked. Ask
        them to use or void the pending reward first, so they don&apos;t pile up unused discount
        codes.
      </Callout>

      <H2>Other manual controls</H2>
      <ul>
        <li>
          <strong>Reset balance</strong> &mdash; zero out the customer&apos;s points in one step.
        </li>
        <li>
          <strong>Void a transaction</strong> &mdash; reverse a single entry in the activity history
          (for example, points from a fraudulent order). The original entry stays visible, marked as
          voided, so the record is always complete.
        </li>
        <li>
          <strong>Freeze / unfreeze</strong> &mdash; pause or resume the customer&apos;s ability to
          earn and redeem. See <a href="/docs/customers/freeze">Freeze &amp; Unfreeze</a>.
        </li>
        <li>
          <strong>Change tier</strong> &mdash; pin the customer to a VIP tier or reset to automatic.
          See <a href="/docs/customers/tier-overrides">Tier Overrides</a>.
        </li>
      </ul>

      <H2>Related</H2>
      <ul>
        <li>
          <a href="/docs/customers/management">Customer Management</a>: the searchable customer list
        </li>
        <li>
          <a href="/docs/customers/tier-overrides">Tier Overrides</a>: manually set a
          customer&apos;s tier
        </li>
        <li>
          <a href="/docs/customers/freeze">Freeze &amp; Unfreeze</a>: pause loyalty for one customer
        </li>
        <li>
          <a href="/docs/loyalty/rewards">Rewards</a>: the catalog of rewards you can grant
        </li>
      </ul>
    </div>
  );
}
