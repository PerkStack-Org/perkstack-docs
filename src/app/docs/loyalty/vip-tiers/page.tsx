import type { Metadata } from "next";
import { createDocMetadata } from "@/lib/seo";
import { H2, H3 } from "@/components/Heading";
import Callout from "@/components/Callout";
import PlanBadge from "@/components/PlanBadge";

export const metadata: Metadata = createDocMetadata("/docs/loyalty/vip-tiers", {
  title: "VIP Tiers",
  description:
    "Reward your best customers with a points multiplier and tier-exclusive rewards as they earn more over time.",
});

export default function VipTiersPage() {
  return (
    <div className="docs-prose">
      <h1>
        VIP Tiers <PlanBadge plan="growth" />
      </h1>
      <p>
        VIP tiers reward your most loyal customers with a bigger points multiplier and access to
        exclusive rewards. As shoppers earn more over time, they climb tiers and every purchase
        starts earning them more points, giving them a reason to keep coming back.
      </p>

      <Callout type="info">
        VIP tiers are available on the <PlanBadge plan="growth" /> plan and above. They are turned
        off by default. Turn them on from <strong>PerkStack → Settings → Tiers</strong> using the{" "}
        <strong>Enable VIP tiers</strong> toggle.
      </Callout>

      <H2>Three fixed tiers</H2>
      <p>
        PerkStack gives you exactly three tiers. You can rename them, change the points threshold to
        reach each one, set the points multiplier, and add a custom icon &mdash; but you cannot add a
        fourth tier or remove one. This keeps the ladder simple and easy for shoppers to understand.
      </p>

      <H3>Default tiers</H3>
      <table>
        <thead>
          <tr>
            <th>Tier</th>
            <th>Points to reach it</th>
            <th>Points multiplier</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <strong>Member</strong>
            </td>
            <td>0</td>
            <td>1.00&times; (no bonus)</td>
          </tr>
          <tr>
            <td>
              <strong>Silver</strong>
            </td>
            <td>500</td>
            <td>1.25&times; (25% bonus)</td>
          </tr>
          <tr>
            <td>
              <strong>Gold</strong>
            </td>
            <td>1,500</td>
            <td>1.50&times; (50% bonus)</td>
          </tr>
        </tbody>
      </table>

      <H2>How customers reach a tier</H2>
      <p>
        A customer&apos;s tier is based on their <strong>lifetime points earned</strong> &mdash; the
        total they have ever earned, not their current spendable balance. They land in the highest
        tier whose threshold they have passed.
      </p>
      <Callout type="tip">
        Because tiers use lifetime points, redeeming rewards or letting points expire never drops a
        customer down a tier. Once someone reaches Gold, they stay Gold. This encourages shoppers to
        spend their points freely without fear of losing status.
      </Callout>

      <H2>What the multiplier does</H2>
      <p>
        Each tier&apos;s multiplier boosts the points a customer earns on purchases. A Silver member
        earning 1 point per $1 effectively earns 1.25 points per $1. The multiplier also{" "}
        <strong>stacks with a points campaign boost</strong>: a Gold member (1.50&times;) shopping
        during a 2&times; boost weekend earns 3&times; the base points. See{" "}
        <a href="/docs/loyalty/campaigns">Campaigns</a> for how boosts work.
      </p>

      <H2>Settings you control</H2>
      <p>
        In <strong>Settings → Tiers</strong>, each of the three tiers has these options:
      </p>
      <table>
        <thead>
          <tr>
            <th>Setting</th>
            <th>What it does</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Tier name</td>
            <td>The name shoppers see, such as Member, Silver, or Gold.</td>
          </tr>
          <tr>
            <td>Icon</td>
            <td>An optional custom icon shown next to the tier name on your storefront.</td>
          </tr>
          <tr>
            <td>Points to reach it</td>
            <td>
              The lifetime points needed to enter this tier. The first tier is always 0, and each
              tier above must be a higher number than the one before it.
            </td>
          </tr>
          <tr>
            <td>Points multiplier</td>
            <td>
              How much to boost earning at this tier. For example, 1.25 means a 25% bonus on points
              earned. Multipliers must be at least 1.00 &mdash; there are no penalty tiers.
            </td>
          </tr>
        </tbody>
      </table>

      <H2>Tier-exclusive rewards</H2>
      <p>
        Any reward in your catalog can be restricted to a minimum tier. Customers below that tier
        won&apos;t see or be able to redeem it, making higher tiers feel genuinely valuable. Set a
        reward&apos;s minimum tier when you create or edit it &mdash; see{" "}
        <a href="/docs/loyalty/rewards">Rewards Catalog</a>.
      </p>

      <H2>Manually overriding a customer&apos;s tier</H2>
      <p>
        You can pin any customer to a specific tier regardless of their points &mdash; useful for
        fast-tracking a VIP, honoring a partner arrangement, or fixing placement after a migration.
        The customer keeps that tier until you remove the override. See{" "}
        <a href="/docs/customers/tier-overrides">Tier Overrides</a> for how to set one.
      </p>

      <H2>What customers see</H2>
      <p>
        On the loyalty launcher, loyalty page, account page, and checkout, shoppers see their current
        tier badge and a progress bar showing how many more points they need to reach the next tier.
        Once they hit the top tier, the progress bar is replaced with a message letting them know
        they&apos;re at the highest tier.
      </p>

      <H2>Related</H2>
      <ul>
        <li>
          <a href="/docs/loyalty/rewards">Rewards Catalog</a>: create tier-exclusive rewards
        </li>
        <li>
          <a href="/docs/loyalty/campaigns">Campaigns</a>: run boosts that stack with tier
          multipliers
        </li>
        <li>
          <a href="/docs/customers/tier-overrides">Tier Overrides</a>: manually pin a customer to a
          tier
        </li>
        <li>
          <a href="/docs/loyalty/points-system">How Points Work</a>: how lifetime points are tracked
        </li>
      </ul>
    </div>
  );
}
