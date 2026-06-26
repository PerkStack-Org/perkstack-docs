import type { Metadata } from "next";
import { createDocMetadata } from "@/lib/seo";
import { H2, H3 } from "@/components/Heading";
import Callout from "@/components/Callout";
import PlanBadge from "@/components/PlanBadge";

export const metadata: Metadata = createDocMetadata("/docs/loyalty/vip-tiers", {
  title: "VIP Tiers",
  description:
    "Set up VIP tiers in PerkStack to reward your best customers with points multipliers and exclusive rewards.",
});

export default function VipTiersPage() {
  return (
    <div className="docs-prose">
      <h1>
        VIP Tiers <PlanBadge plan="growth" />
      </h1>
      <p>
        VIP tiers let you recognize and reward your most loyal customers. As customers earn lifetime
        points, they progress through tiers that unlock points multipliers and access to exclusive
        rewards.
      </p>

      <Callout type="info">
        VIP tiers require the <PlanBadge plan="growth" /> plan or above. Enable tiers from your
        loyalty settings by toggling <code>settings.tiersEnabled</code>.
      </Callout>

      <H2>Tier Structure</H2>
      <p>
        PerkStack uses a fixed 3-tier structure. You can customize the name, icon, threshold, and
        multiplier for each tier, but the total number of tiers is always three.
      </p>

      <H3>Default Tiers</H3>
      <table>
        <thead>
          <tr>
            <th>Tier</th>
            <th>Lifetime Points Threshold</th>
            <th>Points Multiplier</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <strong>Member</strong>
            </td>
            <td>0 points</td>
            <td>1.00x</td>
          </tr>
          <tr>
            <td>
              <strong>Silver</strong>
            </td>
            <td>500 points</td>
            <td>1.25x</td>
          </tr>
          <tr>
            <td>
              <strong>Gold</strong>
            </td>
            <td>1,500 points</td>
            <td>1.50x</td>
          </tr>
        </tbody>
      </table>

      <H2>Tier Configuration</H2>
      <p>Each tier has the following configurable fields:</p>

      <table>
        <thead>
          <tr>
            <th>Field</th>
            <th>Description</th>
            <th>Constraints</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <code>name</code>
            </td>
            <td>Display name shown to customers</td>
            <td>Required, must be unique</td>
          </tr>
          <tr>
            <td>
              <code>iconUrl</code>
            </td>
            <td>Custom icon displayed alongside the tier name</td>
            <td>Optional URL</td>
          </tr>
          <tr>
            <td>
              <code>minLifetimePoints</code>
            </td>
            <td>Minimum lifetime earned points to qualify for this tier</td>
            <td>
              Base tier must be <code>0</code>; thresholds must be ascending across tiers
            </td>
          </tr>
          <tr>
            <td>
              <code>pointsMultiplier</code>
            </td>
            <td>Multiplier applied to all points earned while at this tier</td>
            <td>
              Must be &gt;= <code>1.00</code>
            </td>
          </tr>
        </tbody>
      </table>

      <Callout type="warning">
        The base tier threshold must always be <code>0</code>. Tier thresholds must be in ascending
        order. For example, 0 → 500 → 1500 is valid, but 0 → 1500 → 500 is not. Multipliers must be
        at least <code>1.00</code> (no penalty multipliers).
      </Callout>

      <H2>How Tier Placement Works</H2>
      <p>
        A customer&apos;s tier is determined by their <strong>lifetime earned points</strong>, the
        total number of points they have ever earned (not their current redeemable balance). This
        means spending points on rewards does not lower a customer&apos;s tier.
      </p>
      <ol>
        <li>PerkStack calculates the customer&apos;s total lifetime earned points</li>
        <li>
          The customer is placed in the highest tier whose <code>minLifetimePoints</code> threshold
          they meet or exceed
        </li>
        <li>
          All future point earnings are multiplied by the tier&apos;s <code>pointsMultiplier</code>
        </li>
      </ol>

      <Callout type="tip">
        Since tier placement is based on lifetime points, customers never lose their tier status by
        redeeming rewards. This encourages spending without fear of demotion.
      </Callout>

      <H2>Manual Tier Override</H2>
      <p>
        Merchants can manually override a customer&apos;s tier using the <code>tierOverrideId</code>{" "}
        field on the customer record. When set, the customer is placed in the specified tier
        regardless of their lifetime points. This is useful for:
      </p>
      <ul>
        <li>VIP customers you want to fast-track to a higher tier</li>
        <li>Special promotions or partner arrangements</li>
        <li>Correcting tier placement after data migration</li>
      </ul>

      <Callout type="info">
        To remove a manual override and return the customer to automatic tier calculation, clear the{" "}
        <code>tierOverrideId</code> field.
      </Callout>

      <H2>Tier-Gated Rewards</H2>
      <p>
        Rewards in your catalog can be restricted to specific tiers using the <code>minTierId</code>{" "}
        field. Customers below the required tier will not see or be able to redeem those rewards.
        See <a href="/docs/loyalty/rewards">Rewards Catalog</a> for details.
      </p>

      <H2>Related</H2>
      <ul>
        <li>
          <a href="/docs/loyalty/overview">Loyalty Overview</a>: how the loyalty system works
        </li>
        <li>
          <a href="/docs/loyalty/points-system">Points System</a>: how lifetime points are tracked
        </li>
        <li>
          <a href="/docs/loyalty/rewards">Rewards Catalog</a>: create tier-exclusive rewards
        </li>
      </ul>
    </div>
  );
}
