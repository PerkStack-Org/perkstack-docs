import type { Metadata } from "next";
import Callout from "@/components/Callout";

export const metadata: Metadata = {
  title: "Rewards Catalog",
  description:
    "Set up the rewards customers can redeem loyalty points for, including fixed discounts, percentage discounts, free shipping, and tier-gated rewards.",
};

export default function RewardsPage() {
  return (
    <div className="docs-prose">
      <h1>Rewards Catalog</h1>
      <p>
        The rewards catalog defines what customers can spend their loyalty points on. Configure your
        rewards from <strong>PerkStack → Loyalty → Rewards Catalog</strong>. Each reward can be
        toggled on or off, edited, or removed.
      </p>

      <h2>Reward Types</h2>
      <p>PerkStack supports three reward types:</p>

      <table>
        <thead>
          <tr>
            <th>Type</th>
            <th>Code</th>
            <th>Description</th>
            <th>Example</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <strong>Fixed amount</strong>
            </td>
            <td>
              <code>fixed_amount</code>
            </td>
            <td>A flat dollar discount off the order total</td>
            <td>$5 off for 500 points</td>
          </tr>
          <tr>
            <td>
              <strong>Percentage off</strong>
            </td>
            <td>
              <code>percentage_off</code>
            </td>
            <td>A percentage discount off the order total</td>
            <td>10% off for 1,000 points</td>
          </tr>
          <tr>
            <td>
              <strong>Free shipping</strong>
            </td>
            <td>
              <code>free_shipping</code>
            </td>
            <td>Waives all shipping charges on the order</td>
            <td>Free shipping for 300 points</td>
          </tr>
        </tbody>
      </table>

      <h2>Reward Configuration</h2>
      <p>Each reward in your catalog has the following configurable fields:</p>

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
              <code>title</code>
            </td>
            <td>Display name shown to customers (e.g. &quot;$5 Off Your Order&quot;)</td>
          </tr>
          <tr>
            <td>
              <code>description</code>
            </td>
            <td>Optional description with additional details about the reward</td>
          </tr>
          <tr>
            <td>
              <code>type</code>
            </td>
            <td>
              One of <code>fixed_amount</code>, <code>percentage_off</code>, or{" "}
              <code>free_shipping</code>
            </td>
          </tr>
          <tr>
            <td>
              <code>discountValue</code>
            </td>
            <td>
              The discount amount: dollar value for fixed, percentage for percentage off, not
              applicable for free shipping
            </td>
          </tr>
          <tr>
            <td>
              <code>costInPoints</code>
            </td>
            <td>How many points a customer must spend to redeem this reward</td>
          </tr>
          <tr>
            <td>
              <code>minTierId</code>
            </td>
            <td>Optional VIP tier requirement. Only customers at this tier or above can redeem</td>
          </tr>
          <tr>
            <td>
              <code>active</code>
            </td>
            <td>Whether this reward is currently available for redemption</td>
          </tr>
        </tbody>
      </table>

      <h2>Tier-Gated Rewards</h2>
      <p>
        You can restrict specific rewards to customers who have reached a minimum VIP tier. When a{" "}
        <code>minTierId</code> is set on a reward, only customers at that tier or above will see and
        be able to redeem it. This lets you create exclusive rewards for your most loyal customers.
      </p>

      <Callout type="tip">
        Tier-gated rewards are a powerful way to make VIP tiers feel meaningful. Consider offering
        higher-value rewards exclusively to your Gold tier members.
      </Callout>

      <h2>Redemption Flow</h2>
      <p>When a customer redeems a reward, the following process occurs:</p>
      <ol>
        <li>
          The customer selects a reward from your catalog on the storefront and confirms redemption
        </li>
        <li>
          PerkStack deducts the required points from their balance and creates a{" "}
          <strong>redemption record</strong> with a <code>pending</code> status
        </li>
        <li>
          A <strong>discount-create job</strong> is enqueued to the background worker
        </li>
        <li>
          The worker creates a Shopify discount code via the GraphQL{" "}
          <code>discountCodeBasicCreate</code> mutation
        </li>
        <li>
          The storefront polls <code>/api/redemption/:id</code> until the discount code is ready
        </li>
        <li>Once the code is created, the customer receives it and can apply it at checkout</li>
      </ol>

      <Callout type="info">
        The discount code is created asynchronously via a background worker. The storefront
        automatically polls for the code, and customers typically receive it within a few seconds of
        redemption.
      </Callout>

      <h2>Managing Rewards</h2>
      <p>Each reward in the catalog supports the following operations:</p>
      <ul>
        <li>
          <strong>Toggle active/inactive</strong>: hide a reward from the storefront without
          deleting it
        </li>
        <li>
          <strong>Edit</strong>: update the title, description, discount value, point cost, or tier
          requirement
        </li>
        <li>
          <strong>Delete</strong>: permanently remove the reward. Already-issued discount codes
          remain valid
        </li>
      </ul>

      <Callout type="warning">
        Deleting a reward does not revoke discount codes that have already been issued to customers.
        Those codes remain active in Shopify until they expire or are manually deleted.
      </Callout>

      <h2>Related</h2>
      <ul>
        <li>
          <a href="/docs/loyalty/overview">Loyalty Overview</a>: how the loyalty system works
        </li>
        <li>
          <a href="/docs/loyalty/points-system">Points System</a>: how point balances and
          transactions work
        </li>
        <li>
          <a href="/docs/loyalty/vip-tiers">VIP Tiers</a>: set up tiers to gate exclusive rewards
        </li>
      </ul>
    </div>
  );
}
