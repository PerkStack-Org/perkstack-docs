import type { Metadata } from "next";
import { createDocMetadata } from "@/lib/seo";
import { H2 } from "@/components/Heading";
import Callout from "@/components/Callout";

export const metadata: Metadata = createDocMetadata("/docs/loyalty/overview", {
  title: "Loyalty Overview",
  description:
    "Learn how PerkStack's loyalty program works, including earn rules, rewards catalog, referrals, and how to enable or disable loyalty for your store.",
});

export default function LoyaltyOverviewPage() {
  return (
    <div className="docs-prose">
      <h1>Loyalty Overview</h1>
      <p>
        PerkStack&apos;s loyalty program lets you reward customers with points for purchases,
        reviews, referrals, and more. Customers redeem points for discounts in your store, driving
        repeat purchases and long-term engagement.
      </p>

      <H2>Enabling and Disabling Loyalty</H2>
      <p>
        Toggle the loyalty program on or off from the <strong>Loyalty</strong> page in your Shopify
        admin under <strong>PerkStack → Loyalty</strong>. This updates the{" "}
        <code>shops.loyaltyEnabled</code> setting for your store.
      </p>

      <Callout type="warning">
        When loyalty is disabled, customers cannot earn or redeem points. All loyalty activity is
        paused, and no points are awarded for purchases, reviews, or any other action. Existing
        point balances are preserved and become active again when you re-enable loyalty.
      </Callout>

      <H2>Loyalty Dashboard</H2>
      <p>
        The loyalty page is organized into three tabs, each managing a different aspect of your
        program:
      </p>

      <table>
        <thead>
          <tr>
            <th>Tab</th>
            <th>Purpose</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <strong>Earn Rules</strong>
            </td>
            <td>
              Configure how customers earn points through purchases, reviews, signups, birthdays,
              social shares, and referrals
            </td>
          </tr>
          <tr>
            <td>
              <strong>Rewards Catalog</strong>
            </td>
            <td>
              Define the rewards customers can redeem points for, including fixed discounts,
              percentage discounts, and free shipping
            </td>
          </tr>
          <tr>
            <td>
              <strong>Referrals</strong>
            </td>
            <td>
              Manage the referral program, view referral activity, and configure referrer and
              referee point amounts
            </td>
          </tr>
        </tbody>
      </table>

      <H2>View Modes</H2>
      <p>
        Both the Earn Rules and Rewards Catalog tabs support two view modes that you can toggle
        between:
      </p>
      <ul>
        <li>
          <strong>Card view</strong>: visual grid layout showing each rule or reward as a card with
          key details at a glance
        </li>
        <li>
          <strong>List view</strong>: compact table layout for quickly scanning and managing many
          items
        </li>
      </ul>

      <H2>How It All Fits Together</H2>
      <p>
        The loyalty system is built around a simple loop: customers perform actions (purchase,
        review, share, refer) to earn points, then spend those points on rewards from your catalog.
        Here&apos;s the high-level flow:
      </p>
      <ol>
        <li>
          A customer completes an action that matches one of your active <strong>earn rules</strong>
        </li>
        <li>
          PerkStack awards the configured number of points, recorded as a transaction in the points
          ledger
        </li>
        <li>The customer&apos;s point balance updates in real time on your storefront</li>
        <li>
          When the customer has enough points, they can redeem a <strong>reward</strong> from your
          catalog
        </li>
        <li>PerkStack creates a Shopify discount code and delivers it to the customer</li>
      </ol>

      <Callout type="tip">
        Combine loyalty with reviews for maximum impact. Customers earn points for leaving reviews,
        which generates social proof and drives more sales.
      </Callout>

      <H2>Next Steps</H2>
      <ul>
        <li>
          <a href="/docs/loyalty/earn-rules">Earn Rules</a>: configure how customers earn points
        </li>
        <li>
          <a href="/docs/loyalty/rewards">Rewards Catalog</a>: set up the rewards customers can
          redeem
        </li>
        <li>
          <a href="/docs/loyalty/points-system">Points System</a>: understand the ledger-based
          points architecture
        </li>
        <li>
          <a href="/docs/loyalty/vip-tiers">VIP Tiers</a>: reward your best customers with tiered
          benefits
        </li>
        <li>
          <a href="/docs/loyalty/referrals">Referrals</a>: grow your store through
          customer-to-customer referrals
        </li>
      </ul>
    </div>
  );
}
