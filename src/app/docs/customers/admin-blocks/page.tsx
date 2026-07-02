import type { Metadata } from "next";
import { createDocMetadata } from "@/lib/seo";
import { H2 } from "@/components/Heading";
import Callout from "@/components/Callout";
import PlanBadge from "@/components/PlanBadge";

export const metadata: Metadata = createDocMetadata("/docs/customers/admin-blocks", {
  title: "Customer Page Blocks",
  description:
    "Add PerkStack blocks to Shopify's own customer page so your team can view balances, adjust points, change tiers, redeem rewards, and read reviews without leaving Shopify.",
});

export default function AdminBlocksPage() {
  return (
    <div className="docs-prose">
      <h1>Customer Page Blocks</h1>
      <p>
        PerkStack adds two optional blocks to Shopify&apos;s <strong>own</strong> customer detail
        page. Once added, your staff can manage a shopper&apos;s loyalty and see their reviews right
        where they already work &mdash; in Shopify Admin under Customers &mdash; without opening the
        PerkStack app.
      </p>
      <p>
        You&apos;ll find both blocks in Shopify at <strong>Admin → Customers → </strong> any customer.
      </p>

      <H2>The Loyalty block</H2>
      <p>
        This block puts the essentials of a customer&apos;s loyalty account on their Shopify page:
      </p>
      <ul>
        <li>
          <strong>Points balance</strong>, with an <strong>Adjust balance</strong> control &mdash;
          choose to add or subtract, enter an amount, and give a reason.
        </li>
        <li>
          <strong>VIP tier</strong>, with a <strong>Change tier</strong> control. A manual choice
          shows a &quot;Manual override&quot; badge (see{" "}
          <a href="/docs/customers/tier-overrides">Tier Overrides</a>).
        </li>
        <li>
          <strong>Reward redemption</strong> &mdash; redeem a reward on the customer&apos;s behalf.
        </li>
        <li>
          <strong>Referrals summary</strong> &mdash; a quick view of the customer&apos;s referral
          activity (referrals are available on <PlanBadge plan="growth" /> and above; on lower plans
          this area shows an upgrade prompt).
        </li>
      </ul>

      <H2>The Customer Reviews block</H2>
      <p>
        This block lists every review the customer has submitted, so support staff can see a
        shopper&apos;s review history at a glance while handling their case &mdash; again, without
        leaving Shopify.
      </p>

      <H2>How to add the blocks</H2>
      <p>
        Shopify doesn&apos;t let apps place these blocks for you, so you add them once, by hand, using
        Shopify&apos;s block picker:
      </p>
      <ol>
        <li>
          In Shopify Admin, go to <strong>Customers</strong> and open any customer.
        </li>
        <li>
          Find the <strong>Add block</strong> option on the customer page (in the right-hand column).
        </li>
        <li>
          Choose the <strong>Loyalty program</strong> block and, if you want it, the{" "}
          <strong>Customer Reviews</strong> block.
        </li>
        <li>Save. The blocks now appear on every customer&apos;s page.</li>
      </ol>

      <Callout type="tip">
        PerkStack&apos;s <a href="/docs/dashboard/extension-status">Theme Setup</a> checklist includes
        a short walkthrough video for adding these blocks. Because Shopify offers no direct link to
        the block picker, the checklist points you to the right place rather than adding them
        automatically.
      </Callout>

      <Callout type="info">
        These blocks are a convenience layer over the same controls in the PerkStack app. Anything
        you can do here &mdash; adjust points, change tier, redeem a reward &mdash; you can also do on
        the full <a href="/docs/customers/detail">customer detail page</a>.
      </Callout>

      <H2>Related</H2>
      <ul>
        <li>
          <a href="/docs/customers/detail">Customer Detail</a>: the full loyalty profile inside
          PerkStack
        </li>
        <li>
          <a href="/docs/customers/tier-overrides">Tier Overrides</a>: how the Change tier badge
          works
        </li>
        <li>
          <a href="/docs/dashboard/extension-status">Theme Setup &amp; Status</a>: add blocks and
          check what&apos;s active
        </li>
        <li>
          <a href="/docs/reviews/moderation">Moderation</a>: manage the reviews these blocks surface
        </li>
      </ul>
    </div>
  );
}
