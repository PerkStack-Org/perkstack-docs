import type { Metadata } from "next";
import { createDocMetadata } from "@/lib/seo";
import { H2 } from "@/components/Heading";
import Callout from "@/components/Callout";
import PlanBadge from "@/components/PlanBadge";

export const metadata: Metadata = createDocMetadata("/docs/loyalty/overview", {
  title: "Overview",
  description:
    "How the PerkStack loyalty program fits together: ways to earn points, rewards to redeem, VIP tiers, referrals, and points campaigns.",
});

export default function LoyaltyOverviewPage() {
  return (
    <div className="docs-prose">
      <h1>Overview</h1>
      <p>
        Your loyalty program gives shoppers a reason to come back: they earn points for actions you
        choose, then spend those points on rewards you set. Around that core loop, PerkStack adds VIP
        tiers, referrals, and time-boxed points campaigns to drive repeat revenue. This page shows
        how the pieces fit together and links to the detail for each.
      </p>

      <H2>The loyalty loop</H2>
      <p>
        Everything revolves around a simple cycle: a shopper <strong>earns points</strong> for
        buying, signing up, writing a review, and other actions &mdash; then{" "}
        <strong>redeems points</strong> for a discount or perk at checkout. The more reasons a
        shopper has to earn, and the more appealing your rewards, the more often they return.
      </p>

      <H2>Ways to earn</H2>
      <p>
        Earn rules are the actions that credit points to a customer. PerkStack ships with seven:
        purchases, account signup, text reviews, photo reviews, birthdays, social shares, and
        referrals. You decide which are on and how many points each awards, in{" "}
        <strong>PerkStack &rarr; Loyalty &rarr; Earn Rules</strong>.
      </p>
      <ul>
        <li>
          <a href="/docs/loyalty/earn-rules">Ways to Earn</a> &mdash; the full list, default point
          values, and how to configure each rule.
        </li>
      </ul>

      <H2>Rewards to redeem</H2>
      <p>
        The rewards catalog is what shoppers spend points on &mdash; percentage discounts, fixed
        amounts, free shipping, free products, and more. Redeeming a reward generates a discount code
        that applies at checkout.
      </p>
      <ul>
        <li>
          <a href="/docs/loyalty/rewards">Rewards Catalog</a> &mdash; the reward types, point costs,
          and redemption limits.
        </li>
        <li>
          <a href="/docs/loyalty/points-system">How Points Work</a> &mdash; balances, activity
          history, points expiry, and points delay.
        </li>
      </ul>

      <H2>Grow with tiers, referrals, and campaigns</H2>
      <p>Once the basics are running, three features drive more repeat purchases:</p>
      <ul>
        <li>
          <a href="/docs/loyalty/vip-tiers">VIP Tiers</a> <PlanBadge plan="growth" /> &mdash; reward
          your best customers with a points multiplier as they climb.
        </li>
        <li>
          <a href="/docs/loyalty/referrals">Referrals</a> <PlanBadge plan="growth" /> &mdash;
          customers share a link, and both sides get rewarded when a friend buys.
        </li>
        <li>
          <a href="/docs/loyalty/campaigns">Points Campaigns &amp; Boosts</a> &mdash; run a limited
          window where every earn is worth 2x or more.
        </li>
      </ul>
      <p>
        These stack: a VIP tier multiplier and an active campaign boost combine, so a top-tier
        shopper buying during a boost earns even more.
      </p>

      <H2>What each plan includes</H2>
      <p>
        The loyalty engine works on every plan, but the more advanced pieces unlock as you grow:
      </p>
      <ul>
        <li>
          <PlanBadge plan="free" /> &mdash; earn points on purchases, signup, and text reviews;
          offer percentage-off rewards.
        </li>
        <li>
          <PlanBadge plan="essential" /> &mdash; adds photo review, birthday, and social-share
          earning; more reward types; redemption limits; points expiry and points delay.
        </li>
        <li>
          <PlanBadge plan="growth" /> &mdash; adds VIP tiers, referrals, a custom points name, and
          advanced reward types.
        </li>
        <li>
          <PlanBadge plan="studio" /> &mdash; adds the &ldquo;choose your gift&rdquo; reward.
        </li>
      </ul>

      <Callout type="tip">
        New to PerkStack? Turn on a couple of earn rules and publish one or two rewards first. You
        can layer in tiers, referrals, and campaigns once the core loop is live.
      </Callout>

      <H2>Related</H2>
      <ul>
        <li>
          <a href="/docs/loyalty/earn-rules">Ways to Earn</a>: the seven earning actions and their
          defaults.
        </li>
        <li>
          <a href="/docs/loyalty/rewards">Rewards Catalog</a>: what customers can redeem points for.
        </li>
        <li>
          <a href="/docs/loyalty/points-system">How Points Work</a>: balances, history, expiry, and
          delay.
        </li>
        <li>
          <a href="/docs/settings/billing">Plans &amp; Billing</a>: compare what each plan unlocks.
        </li>
      </ul>
    </div>
  );
}
