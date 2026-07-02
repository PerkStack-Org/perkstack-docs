import type { Metadata } from "next";
import { createDocMetadata } from "@/lib/seo";
import { H2, H3 } from "@/components/Heading";
import Callout from "@/components/Callout";
import PlanBadge from "@/components/PlanBadge";

export const metadata: Metadata = createDocMetadata("/docs/loyalty/earn-rules", {
  title: "Ways to Earn",
  description:
    "The seven actions that award loyalty points in PerkStack, their default point values, which plan unlocks each, and how to configure them.",
});

export default function EarnRulesPage() {
  return (
    <div className="docs-prose">
      <h1>Ways to Earn</h1>
      <p>
        Earn rules are the actions that award points to your customers. PerkStack ships with seven,
        each with a sensible default you can change. Turn rules on or off and set their point values
        in <strong>PerkStack &rarr; Loyalty &rarr; Earn Rules</strong>.
      </p>

      <H2>The seven ways to earn</H2>
      <table>
        <thead>
          <tr>
            <th>Action</th>
            <th>Default points</th>
            <th>Ships</th>
            <th>Plan</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <strong>Purchase</strong>
            </td>
            <td>1 point per $1 spent</td>
            <td>On</td>
            <td>
              <PlanBadge plan="free" />
            </td>
          </tr>
          <tr>
            <td>
              <strong>Account signup</strong>
            </td>
            <td>100</td>
            <td>On</td>
            <td>
              <PlanBadge plan="free" />
            </td>
          </tr>
          <tr>
            <td>
              <strong>Text review</strong>
            </td>
            <td>100</td>
            <td>On</td>
            <td>
              <PlanBadge plan="free" />
            </td>
          </tr>
          <tr>
            <td>
              <strong>Photo review</strong>
            </td>
            <td>200</td>
            <td>On</td>
            <td>
              <PlanBadge plan="essential" />
            </td>
          </tr>
          <tr>
            <td>
              <strong>Birthday</strong>
            </td>
            <td>200</td>
            <td>
              <strong>Off</strong>
            </td>
            <td>
              <PlanBadge plan="essential" />
            </td>
          </tr>
          <tr>
            <td>
              <strong>Social share</strong>
            </td>
            <td>100</td>
            <td>On</td>
            <td>
              <PlanBadge plan="essential" />
            </td>
          </tr>
          <tr>
            <td>
              <strong>Referral</strong>
            </td>
            <td>500 referrer / 200 friend</td>
            <td>
              <strong>Off</strong>
            </td>
            <td>
              <PlanBadge plan="growth" />
            </td>
          </tr>
        </tbody>
      </table>

      <Callout type="warning">
        Two rules ship <strong>off</strong> and must be turned on before they award anything:{" "}
        <strong>Birthday</strong> and <strong>Referral</strong>. Social share ships <strong>on</strong>
        . If you launch expecting birthday or referral points to flow automatically, enable those
        rules first.
      </Callout>

      <Callout type="info">
        Photo review, birthday, and social share require <PlanBadge plan="essential" /> or higher.
        Referral requires <PlanBadge plan="growth" /> or higher. On lower plans these rules appear in
        the list but are disabled, with an inline prompt naming the plan that unlocks them.
      </Callout>

      <H2>Configure a rule</H2>
      <p>
        In <strong>Loyalty &rarr; Earn Rules</strong>, open a rule to configure it. Every rule shares
        these options:
      </p>
      <ul>
        <li>
          <strong>Active toggle</strong> &mdash; when active, customers earn points for this action.
        </li>
        <li>
          <strong>Points earned</strong> &mdash; the point value awarded (a fixed amount for every
          rule except Purchase and Referral).
        </li>
        <li>
          <strong>Description</strong> &mdash; free text shown to customers in the loyalty widget, so
          they know what the action is worth.
        </li>
      </ul>

      <H3>Purchase</H3>
      <p>
        Purchase points scale with order value. Set <strong>dollars spent per point</strong> (how
        many dollars a customer spends to earn one point &mdash; default $1, so a $50 order earns 50
        points). You can also set a <strong>minimum order value</strong>: below it, an order earns
        nothing. Leave the minimum empty for no threshold. You can enter fractional rates for finer
        control.
      </p>

      <H3>Referral</H3>
      <p>
        The referral rule has two separate amounts: <strong>points for the referrer</strong>{" "}
        (default 500) and <strong>points for the friend</strong> (default 200). See{" "}
        <a href="/docs/loyalty/referrals">Referrals</a> for how the referral link and the friend&apos;s
        discount work.
      </p>

      <H3>Text and photo reviews</H3>
      <p>
        Both review rules offer a <strong>Require verified purchase</strong> option &mdash; when on,
        only reviewers who actually bought the product earn points. A review that includes at least
        one photo earns the photo-review amount, not both. Setting photo review higher than text
        review nudges customers toward richer, more persuasive reviews.
      </p>

      <H2>Multipliers: how purchase points can grow</H2>
      <p>
        Base purchase points are just the starting figure. Two multipliers can increase them:
      </p>
      <ul>
        <li>
          <strong>VIP tier multiplier</strong> &mdash; a customer&apos;s tier multiplies their
          purchase points (for example, a 1.5x tier turns 50 points into 75). See{" "}
          <a href="/docs/loyalty/vip-tiers">VIP Tiers</a>.
        </li>
        <li>
          <strong>Campaign boost</strong> &mdash; a live points campaign multiplies earning during a
          scheduled window. See <a href="/docs/loyalty/campaigns">Points Campaigns &amp; Boosts</a>.
        </li>
      </ul>
      <p>
        When both apply, they <strong>stack multiplicatively</strong>. A customer at a 2x tier
        buying during a 2x boost earns <strong>4x</strong> the base points on that order.
      </p>

      <Callout type="tip">
        Start simple: keep the default 1 point per $1 and turn on signup and text reviews to seed
        balances. Add birthday, social, and referral earning as your program matures.
      </Callout>

      <H2>Related</H2>
      <ul>
        <li>
          <a href="/docs/loyalty/rewards">Rewards Catalog</a>: what customers spend earned points on.
        </li>
        <li>
          <a href="/docs/loyalty/points-system">How Points Work</a>: balances, history, expiry, and
          delay.
        </li>
        <li>
          <a href="/docs/loyalty/vip-tiers">VIP Tiers</a>: the tier multiplier applied to purchase
          points.
        </li>
        <li>
          <a href="/docs/loyalty/campaigns">Points Campaigns &amp; Boosts</a>: time-boxed earning
          multipliers.
        </li>
        <li>
          <a href="/docs/loyalty/referrals">Referrals</a>: the referral rule in detail.
        </li>
      </ul>
    </div>
  );
}
