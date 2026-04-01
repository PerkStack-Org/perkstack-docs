import type { Metadata } from "next";
import Callout from "@/components/Callout";
import PlanBadge from "@/components/PlanBadge";

export const metadata: Metadata = {
  title: "Billing & Plans",
  description:
    "Understand PerkStack's pricing plans, feature comparison, billing statuses, and how to upgrade, downgrade, or cancel.",
};

export default function BillingPage() {
  return (
    <div className="docs-prose">
      <h1>Billing &amp; Plans</h1>
      <p>
        PerkStack offers three plans managed through the Shopify billing API. You can view your
        current plan and switch plans from <strong>PerkStack → Settings → Billing</strong>.
      </p>

      <h2>Plan Comparison</h2>
      <table>
        <thead>
          <tr>
            <th>Feature</th>
            <th>
              <PlanBadge plan="free" />
            </th>
            <th>
              <PlanBadge plan="growth" />
            </th>
            <th>
              <PlanBadge plan="pro" />
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Price</td>
            <td>$0/mo</td>
            <td>$49/mo</td>
            <td>$149/mo</td>
          </tr>
          <tr>
            <td>Trial</td>
            <td>-</td>
            <td>7-day free trial</td>
            <td>7-day free trial</td>
          </tr>
          <tr>
            <td>Emails per month</td>
            <td>50</td>
            <td>Unlimited</td>
            <td>Unlimited</td>
          </tr>
          <tr>
            <td>Dashboard history</td>
            <td>30 days</td>
            <td>90 days</td>
            <td>Unlimited</td>
          </tr>
          <tr>
            <td>Photo reviews</td>
            <td>-</td>
            <td>Yes</td>
            <td>Yes</td>
          </tr>
          <tr>
            <td>Video reviews</td>
            <td>-</td>
            <td>-</td>
            <td>Yes</td>
          </tr>
          <tr>
            <td>Custom rewards</td>
            <td>-</td>
            <td>Yes</td>
            <td>Yes</td>
          </tr>
          <tr>
            <td>Checkout extension</td>
            <td>-</td>
            <td>Yes</td>
            <td>Yes</td>
          </tr>
          <tr>
            <td>Branding removal</td>
            <td>-</td>
            <td>Yes</td>
            <td>Yes</td>
          </tr>
          <tr>
            <td>Referrals</td>
            <td>-</td>
            <td>-</td>
            <td>Yes</td>
          </tr>
          <tr>
            <td>VIP Tiers</td>
            <td>-</td>
            <td>-</td>
            <td>Yes</td>
          </tr>
          <tr>
            <td>Shopify Flow</td>
            <td>-</td>
            <td>-</td>
            <td>Yes</td>
          </tr>
          <tr>
            <td>Custom CSS</td>
            <td>-</td>
            <td>-</td>
            <td>Yes</td>
          </tr>
          <tr>
            <td>AI review drafts</td>
            <td>-</td>
            <td>-</td>
            <td>Yes</td>
          </tr>
          <tr>
            <td>Data export</td>
            <td>-</td>
            <td>-</td>
            <td>Yes</td>
          </tr>
          <tr>
            <td>Priority support</td>
            <td>-</td>
            <td>-</td>
            <td>Yes</td>
          </tr>
        </tbody>
      </table>

      <h2>Upgrading</h2>
      <ol>
        <li>
          Navigate to <strong>PerkStack → Settings → Billing</strong>
        </li>
        <li>
          Click <strong>Upgrade</strong> on the desired plan card
        </li>
        <li>You are redirected to the Shopify billing approval screen</li>
        <li>Confirm the charge. Shopify handles all payment processing</li>
        <li>Once approved, your plan activates immediately and all features unlock</li>
      </ol>

      <Callout type="info">
        Both the <PlanBadge plan="growth" /> and <PlanBadge plan="pro" /> plans include a{" "}
        <strong>7-day free trial</strong>. You will not be charged until the trial ends.
      </Callout>

      <h2>Downgrading</h2>
      <p>
        To downgrade, click <strong>Downgrade</strong> on a lower plan card. The downgrade takes
        effect at the end of your current billing cycle. Features exclusive to your current plan
        remain available until then.
      </p>

      <Callout type="warning">
        Downgrading may disable features you are currently using. For example, if you downgrade from
        Pro to Growth, VIP tiers, referrals, and Shopify Flow integration will be disabled. Review
        the plan comparison table before downgrading.
      </Callout>

      <h2>Cancelling</h2>
      <p>
        You can cancel your paid subscription at any time. Cancellation reverts your account to the{" "}
        <PlanBadge plan="free" /> plan at the end of the current billing cycle.
      </p>

      <h2>Billing Statuses</h2>
      <table>
        <thead>
          <tr>
            <th>Status</th>
            <th>Meaning</th>
            <th>What You See</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <code>active</code>
            </td>
            <td>Subscription is active and payments are current</td>
            <td>Normal app experience</td>
          </tr>
          <tr>
            <td>
              <code>pending</code>
            </td>
            <td>Waiting for Shopify billing approval</td>
            <td>Approval prompt or redirect</td>
          </tr>
          <tr>
            <td>
              <code>frozen</code>
            </td>
            <td>Payment failed because Shopify could not charge the merchant</td>
            <td>A banner indicating payment failure with a link to update payment method</td>
          </tr>
          <tr>
            <td>
              <code>cancelled</code>
            </td>
            <td>Subscription has been cancelled</td>
            <td>A banner confirming cancellation with option to resubscribe</td>
          </tr>
        </tbody>
      </table>

      <Callout type="danger">
        If your billing status is <code>frozen</code>, update your payment method in Shopify as soon
        as possible. Prolonged frozen status may result in restricted access to paid features.
      </Callout>

      <h2>Related</h2>
      <ul>
        <li>
          <a href="/docs/settings/general">General Settings</a> to configure branding and loyalty
          options
        </li>
        <li>
          <a href="/docs/advanced/status-reference">Status Reference</a> for all billing and plan
          status enums
        </li>
        <li>
          <a href="/docs/advanced/webhooks">Webhooks</a>, including the{" "}
          <code>APP_SUBSCRIPTIONS_UPDATE</code> webhook that syncs billing changes
        </li>
      </ul>
    </div>
  );
}
