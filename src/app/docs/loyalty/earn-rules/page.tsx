import type { Metadata } from "next";
import Callout from "@/components/Callout";
import PlanBadge from "@/components/PlanBadge";

export const metadata: Metadata = {
  title: "Earn Rules",
  description:
    "Configure how customers earn loyalty points in PerkStack, including purchases, reviews, signups, birthdays, social shares, and referrals.",
};

export default function EarnRulesPage() {
  return (
    <div className="docs-prose">
      <h1>Earn Rules</h1>
      <p>
        Earn rules define the actions that award points to your customers. Each rule can be toggled
        active or inactive, edited through a modal, and deleted when no longer needed. Manage your
        earn rules from <strong>PerkStack → Loyalty → Earn Rules</strong>.
      </p>

      <h2>Available Earn Rules</h2>
      <p>
        PerkStack supports the following earn rule types. Each rule has a default configuration that
        you can customize:
      </p>

      <table>
        <thead>
          <tr>
            <th>Rule</th>
            <th>Type</th>
            <th>Default</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <strong>Purchase</strong>
            </td>
            <td>Points per dollar</td>
            <td>Configurable ratio</td>
            <td>
              Customers earn points based on their order total. Set a dollar-per-point ratio (e.g.
              $1 = 1 point) with an optional minimum order value
            </td>
          </tr>
          <tr>
            <td>
              <strong>Account signup</strong>
            </td>
            <td>Fixed points</td>
            <td>100 points</td>
            <td>Awarded once when a customer creates their account for the first time</td>
          </tr>
          <tr>
            <td>
              <strong>Text review</strong>
            </td>
            <td>Fixed points</td>
            <td>100 points</td>
            <td>
              Awarded when a customer submits a text review. Optional verified purchase requirement
            </td>
          </tr>
          <tr>
            <td>
              <strong>Photo review</strong>
            </td>
            <td>Fixed points</td>
            <td>200 points</td>
            <td>
              Awarded when a customer submits a review with at least one photo. Optional verified
              purchase requirement
            </td>
          </tr>
          <tr>
            <td>
              <strong>Birthday</strong> <PlanBadge plan="essential" />
            </td>
            <td>Fixed points</td>
            <td>200 points (inactive)</td>
            <td>
              Awarded once per year on the customer&apos;s birthday. Inactive by default and
              requires the Essential plan or above
            </td>
          </tr>
          <tr>
            <td>
              <strong>Social share</strong> <PlanBadge plan="essential" />
            </td>
            <td>Fixed points</td>
            <td>100 points</td>
            <td>
              Awarded when a customer shares a product on social media. Requires the Essential plan
              or above
            </td>
          </tr>
          <tr>
            <td>
              <strong>Referral</strong> <PlanBadge plan="growth" />
            </td>
            <td>Fixed points (dual)</td>
            <td>500 / 200 points</td>
            <td>
              Separate point amounts for the referrer (500) and referee (200). Requires the Referral
              Program feature on the Growth plan or above
            </td>
          </tr>
        </tbody>
      </table>

      <h2>Purchase Rule Details</h2>
      <p>
        The purchase rule awards points proportionally to order value. You configure a
        dollar-per-point ratio. For example, setting $1 per point means a $50 order earns 50 points.
      </p>

      <Callout type="info">
        Internally, the ratio is stored as <code>pointsPerCurrencyUnit</code> using the inverse
        value. If you set $1 per point, the stored value is <code>1.0000</code>. If you set $2 per
        point, the stored value is <code>0.5000</code>. You don&apos;t need to worry about this
        because the admin UI handles the conversion automatically.
      </Callout>

      <p>
        You can also set an optional <strong>minimum order value</strong>. When configured, only
        orders at or above this threshold will earn points. Orders below the minimum earn nothing.
      </p>

      <h2>Review Rules</h2>
      <p>
        Text review and photo review are separate earn rules with independent point values. When a
        review includes photos, the customer earns the <strong>photo review</strong> amount (not
        both text and photo combined).
      </p>
      <p>
        Both review rules support an optional <strong>verified purchase requirement</strong>. When
        enabled, only reviews from customers who actually purchased the product will earn points.
      </p>

      <Callout type="tip">
        Setting photo review points higher than text review points encourages customers to include
        photos, which provides stronger social proof on your product pages.
      </Callout>

      <h2>Managing Earn Rules</h2>
      <p>Each earn rule supports the following operations:</p>
      <ul>
        <li>
          <strong>Toggle active/inactive</strong>: enable or disable a rule without deleting it.
          Inactive rules do not award points
        </li>
        <li>
          <strong>Edit</strong>: open the edit modal to adjust point values, thresholds, and options
        </li>
        <li>
          <strong>Delete</strong>: permanently remove the rule. Points already earned through this
          rule are not affected
        </li>
      </ul>

      <Callout type="warning">
        Deleting an earn rule is permanent. If you want to temporarily stop awarding points for an
        action, use the active/inactive toggle instead.
      </Callout>

      <h2>Related</h2>
      <ul>
        <li>
          <a href="/docs/loyalty/overview">Loyalty Overview</a>: how the loyalty system works
        </li>
        <li>
          <a href="/docs/loyalty/points-system">Points System</a>: how points are tracked and
          managed
        </li>
        <li>
          <a href="/docs/loyalty/birthday-rewards">Birthday Rewards</a>: detailed birthday rule
          setup
        </li>
        <li>
          <a href="/docs/loyalty/social-sharing">Social Sharing</a>: detailed social share rule
          setup
        </li>
        <li>
          <a href="/docs/loyalty/referrals">Referrals</a>: detailed referral rule setup
        </li>
      </ul>
    </div>
  );
}
