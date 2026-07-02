import type { Metadata } from "next";
import { createDocMetadata } from "@/lib/seo";
import { H2, H3 } from "@/components/Heading";
import Callout from "@/components/Callout";
import PlanBadge from "@/components/PlanBadge";

export const metadata: Metadata = createDocMetadata("/docs/loyalty/rewards", {
  title: "Rewards Catalog",
  description:
    "The seven reward types customers can redeem loyalty points for, which plan unlocks each, point costs, tier restrictions, redemption limits, and what shoppers see.",
});

export default function RewardsPage() {
  return (
    <div className="docs-prose">
      <h1>Rewards Catalog</h1>
      <p>
        The rewards catalog is what customers spend their points on. You set the reward, its point
        cost, and who can redeem it &mdash; PerkStack handles turning a redemption into a working
        discount at checkout. Build your catalog in{" "}
        <strong>PerkStack &rarr; Loyalty &rarr; Rewards Catalog</strong>.
      </p>

      <H2>Reward types</H2>
      <p>
        Seven reward types are available, unlocking as you move up plans. The first is available to
        everyone; the rest layer on as you grow.
      </p>
      <table>
        <thead>
          <tr>
            <th>Reward type</th>
            <th>What the customer gets</th>
            <th>Plan</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <strong>Percentage off</strong>
            </td>
            <td>A percentage discount off the order</td>
            <td>
              <PlanBadge plan="free" />
            </td>
          </tr>
          <tr>
            <td>
              <strong>Fixed amount off</strong>
            </td>
            <td>A flat dollar amount off the order</td>
            <td>
              <PlanBadge plan="essential" />
            </td>
          </tr>
          <tr>
            <td>
              <strong>Free shipping</strong>
            </td>
            <td>Shipping charges waived on the order</td>
            <td>
              <PlanBadge plan="essential" />
            </td>
          </tr>
          <tr>
            <td>
              <strong>Free product</strong>
            </td>
            <td>One specific product you choose, added free</td>
            <td>
              <PlanBadge plan="essential" />
            </td>
          </tr>
          <tr>
            <td>
              <strong>Spend $X, get a free product</strong>
            </td>
            <td>A gift unlocks once the cart passes a spend threshold</td>
            <td>
              <PlanBadge plan="growth" />
            </td>
          </tr>
          <tr>
            <td>
              <strong>Buy X, get Y (BOGO)</strong>
            </td>
            <td>Buy set quantities of one product, get another at a discount</td>
            <td>
              <PlanBadge plan="growth" />
            </td>
          </tr>
          <tr>
            <td>
              <strong>Choose your gift</strong>
            </td>
            <td>The customer picks one free item from a curated set</td>
            <td>
              <PlanBadge plan="studio" />
            </td>
          </tr>
        </tbody>
      </table>

      <Callout type="info">
        On lower plans, locked reward types still appear when you add a reward, but you can&apos;t
        select them &mdash; an inline prompt names the plan that unlocks them.
      </Callout>

      <H2>Settings for each reward</H2>
      <p>When you add or edit a reward, you set:</p>
      <ul>
        <li>
          <strong>Title</strong> and <strong>description</strong> &mdash; what the customer sees on
          the reward card.
        </li>
        <li>
          <strong>Reward type</strong> &mdash; and its type-specific details (discount value for
          percentage and fixed amount; the product picker for free-product, spend-get, BOGO, and
          &ldquo;choose your gift&rdquo;).
        </li>
        <li>
          <strong>Cost in points</strong> &mdash; how many points a customer spends to redeem it.
        </li>
        <li>
          <strong>Minimum tier</strong> <PlanBadge plan="growth" /> &mdash; restrict a reward to
          customers at a chosen VIP tier or above. Requires{" "}
          <a href="/docs/loyalty/vip-tiers">VIP Tiers</a> to be set up.
        </li>
        <li>
          <strong>Active toggle</strong> &mdash; hide a reward from the storefront without deleting
          it.
        </li>
      </ul>
      <p>
        A new store starts with one seeded reward: <strong>$5 Off</strong>, a $5 fixed-amount
        discount costing 100 points.
      </p>

      <H2>Redemption limits</H2>
      <p>
        <PlanBadge plan="essential" /> and higher unlock a <strong>Redemption limits</strong> section
        on each reward, so a campaign can&apos;t be over-redeemed:
      </p>
      <ul>
        <li>
          <strong>Total limit</strong> &mdash; a cap across all customers combined. Leave empty for
          unlimited.
        </li>
        <li>
          <strong>Per-customer limit</strong> &mdash; a cap per individual customer, with a reset
          window of <strong>Lifetime</strong> (default), <strong>Monthly</strong>, or{" "}
          <strong>Yearly</strong>.
        </li>
        <li>
          <strong>Per-tier overrides</strong> <PlanBadge plan="growth" /> &mdash; a different
          per-customer cap for each VIP tier. Empty tiers inherit the per-customer limit above.
        </li>
      </ul>
      <p>
        When editing a reward with limits, you&apos;ll see a &ldquo;Used X of Y&rdquo; status and a{" "}
        <strong>Reset counter</strong> button to reopen a reward that has hit its cap.
      </p>

      <H2>What the shopper sees</H2>
      <p>Rewards appear everywhere customers meet your program:</p>
      <ul>
        <li>
          The <a href="/docs/widgets/loyalty-launcher">loyalty launcher</a> (&ldquo;Redeem
          points&rdquo;).
        </li>
        <li>
          The <a href="/docs/widgets/loyalty-page">loyalty page</a> (&ldquo;Redeem Rewards&rdquo;).
        </li>
        <li>
          The <a href="/docs/widgets/customer-account">Loyalty Studio</a> in the customer account.
        </li>
        <li>
          The <a href="/docs/widgets/checkout-widget">Checkout Rewards</a> wallet.
        </li>
      </ul>

      <H3>Redeeming a reward</H3>
      <p>
        When a customer redeems, PerkStack deducts the points and generates a{" "}
        <strong>discount code</strong> for that reward. The code applies at checkout automatically
        &mdash; if a customer redeems on the launcher or loyalty page, that reward carries over and
        applies when they check out.
      </p>
      <p>
        Rewards a customer can&apos;t yet afford show as locked, with an{" "}
        <strong>&ldquo;Earn N more points&rdquo;</strong> hint so they know how close they are.
      </p>

      <Callout type="tip">
        Pair tier restrictions with your best rewards to make VIP tiers feel worth reaching &mdash;
        for example, reserve a high-value reward for your top tier.
      </Callout>

      <H2>Related</H2>
      <ul>
        <li>
          <a href="/docs/loyalty/earn-rules">Ways to Earn</a>: how customers build up the points they
          spend here.
        </li>
        <li>
          <a href="/docs/loyalty/points-system">How Points Work</a>: balances, history, expiry, and
          delay.
        </li>
        <li>
          <a href="/docs/loyalty/vip-tiers">VIP Tiers</a>: gate rewards and set per-tier limits.
        </li>
        <li>
          <a href="/docs/customers/detail">Customer Detail</a>: grant a reward to a specific customer
          by hand.
        </li>
      </ul>
    </div>
  );
}
