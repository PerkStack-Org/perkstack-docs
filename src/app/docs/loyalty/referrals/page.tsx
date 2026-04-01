import type { Metadata } from "next";
import Callout from "@/components/Callout";
import PlanBadge from "@/components/PlanBadge";

export const metadata: Metadata = {
  title: "Referrals",
  description:
    "Grow your store with PerkStack's referral program, featuring unique referral codes, dual-sided rewards, and referral tracking.",
};

export default function ReferralsPage() {
  return (
    <div className="docs-prose">
      <h1>
        Referrals <PlanBadge plan="pro" />
      </h1>
      <p>
        The referral program turns your existing customers into advocates by rewarding them for
        bringing in new buyers. Both the referrer and the referred customer (referee) earn points,
        creating a win-win incentive for organic growth.
      </p>

      <Callout type="info">
        The referral program requires the <PlanBadge plan="pro" /> plan. Configure referral settings
        from <strong>PerkStack → Loyalty → Referrals</strong>.
      </Callout>

      <h2>How Referrals Work</h2>
      <ol>
        <li>
          Each customer receives a <strong>unique referral code</strong> that they can share
        </li>
        <li>
          The customer shares their <strong>referral link</strong> (your store URL with their
          referral code appended)
        </li>
        <li>A new customer visits your store through the referral link and places an order</li>
        <li>
          PerkStack records the referral and awards points to both parties once the referral is
          completed
        </li>
      </ol>

      <h2>Point Rewards</h2>
      <p>Referral points are awarded to both sides of the referral. The default values are:</p>

      <table>
        <thead>
          <tr>
            <th>Recipient</th>
            <th>Default Points</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <strong>Referrer</strong>
            </td>
            <td>500 points</td>
            <td>The existing customer who shared their referral code</td>
          </tr>
          <tr>
            <td>
              <strong>Referee</strong>
            </td>
            <td>200 points</td>
            <td>The new customer who used the referral code</td>
          </tr>
        </tbody>
      </table>

      <Callout type="tip">
        Setting a higher reward for the referrer incentivizes active sharing. Setting a meaningful
        reward for the referee gives new customers a reason to use the referral link instead of
        visiting your store directly.
      </Callout>

      <h2>Referral Statuses</h2>
      <p>Each referral passes through a lifecycle tracked by its status:</p>

      <table>
        <thead>
          <tr>
            <th>Status</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <code>pending</code>
            </td>
            <td>
              The referee has visited the store via the referral link but has not yet completed a
              qualifying action
            </td>
          </tr>
          <tr>
            <td>
              <code>completed</code>
            </td>
            <td>
              The referee completed the qualifying action (e.g. placed an order), and points are
              awarded to both parties
            </td>
          </tr>
          <tr>
            <td>
              <code>expired</code>
            </td>
            <td>The referral window closed before the referee completed the qualifying action</td>
          </tr>
          <tr>
            <td>
              <code>voided</code>
            </td>
            <td>
              The referral was manually voided by the merchant (e.g. due to fraud or a refund)
            </td>
          </tr>
        </tbody>
      </table>

      <h2>Referral Tracking</h2>
      <p>PerkStack stores detailed information for each referral in the referrals table:</p>

      <table>
        <thead>
          <tr>
            <th>Field</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <code>referrerCustomerId</code>
            </td>
            <td>The customer who shared the referral code</td>
          </tr>
          <tr>
            <td>
              <code>refereeCustomerId</code>
            </td>
            <td>The new customer who used the code (set after account creation)</td>
          </tr>
          <tr>
            <td>
              <code>refereeEmail</code>
            </td>
            <td>Email of the referred person (tracked before they create an account)</td>
          </tr>
          <tr>
            <td>
              <code>code</code>
            </td>
            <td>The unique referral code used</td>
          </tr>
          <tr>
            <td>
              <code>status</code>
            </td>
            <td>Current referral status (pending, completed, expired, voided)</td>
          </tr>
          <tr>
            <td>
              <code>shopifyOrderId</code>
            </td>
            <td>The Shopify order that completed the referral (if applicable)</td>
          </tr>
        </tbody>
      </table>

      <h2>Referral Statistics</h2>
      <p>
        The Referrals tab in the loyalty dashboard shows aggregate statistics for your referral
        program:
      </p>
      <ul>
        <li>
          <strong>Total</strong>: all referrals created across all statuses
        </li>
        <li>
          <strong>Completed</strong>: referrals where the referee placed an order
        </li>
        <li>
          <strong>Pending</strong>: referrals awaiting completion by the referee
        </li>
      </ul>

      <Callout type="warning">
        Voiding a referral after points have been awarded does not automatically revoke those
        points. If you need to reclaim points from a voided referral, use a manual point adjustment
        on both the referrer and referee.
      </Callout>

      <h2>Related</h2>
      <ul>
        <li>
          <a href="/docs/loyalty/overview">Loyalty Overview</a>: how the loyalty system works
        </li>
        <li>
          <a href="/docs/loyalty/earn-rules">Earn Rules</a>: configure referral point amounts
        </li>
        <li>
          <a href="/docs/loyalty/points-system">Points System</a>: how referral points are tracked
          in the ledger
        </li>
      </ul>
    </div>
  );
}
