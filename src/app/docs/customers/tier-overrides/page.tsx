import type { Metadata } from "next";
import Callout from "@/components/Callout";
import PlanBadge from "@/components/PlanBadge";

export const metadata: Metadata = {
  title: "Tier Overrides",
  description:
    "Manually assign or clear a customer's VIP tier. Learn how tier overrides work and when to use them.",
};

export default function TierOverridesPage() {
  return (
    <div className="docs-prose">
      <h1>Tier Overrides</h1>
      <p>
        VIP tiers are normally calculated automatically based on a customer&apos;s lifetime earned
        points. Tier overrides let an admin manually place a customer into a specific tier,
        bypassing the automatic calculation.
      </p>

      <Callout type="info">
        Tier overrides require the <PlanBadge plan="pro" /> plan. The VIP tiers feature must be
        enabled in your settings before overrides can be applied.
      </Callout>

      <h2>How Tier Overrides Work</h2>
      <ol>
        <li>
          Navigate to a customer&apos;s detail page (
          <strong>PerkStack → Customers → [Customer]</strong>)
        </li>
        <li>
          In the <strong>Tier Information</strong> section, click <strong>Override Tier</strong>
        </li>
        <li>Select the desired tier from the dropdown</li>
        <li>Save the change</li>
      </ol>
      <p>
        When an override is active, the customer&apos;s <code>tierOverrideId</code> field is set to
        the selected tier. This value takes precedence over the automatically calculated tier.
      </p>

      <h2>Override vs. Automatic Tier</h2>
      <table>
        <thead>
          <tr>
            <th>Behaviour</th>
            <th>Automatic Tier</th>
            <th>Override Tier</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Determined by</td>
            <td>Lifetime earned points thresholds</td>
            <td>Admin manual selection</td>
          </tr>
          <tr>
            <td>Updates automatically</td>
            <td>Yes, recalculated as points are earned</td>
            <td>No, stays fixed until cleared or changed by admin</td>
          </tr>
          <tr>
            <td>Displayed to customer</td>
            <td>Yes</td>
            <td>Yes (customer sees the override tier)</td>
          </tr>
          <tr>
            <td>Affects benefits</td>
            <td>Yes, tier benefits apply</td>
            <td>Yes, override tier benefits apply</td>
          </tr>
        </tbody>
      </table>

      <h2>Clearing an Override</h2>
      <p>To revert a customer to their automatically calculated tier:</p>
      <ol>
        <li>Open the customer&apos;s detail page</li>
        <li>
          In the Tier Information section, click <strong>Clear Override</strong>
        </li>
        <li>Confirm the action</li>
      </ol>
      <p>
        The <code>tierOverrideId</code> is set to <code>null</code>, and the customer&apos;s tier
        reverts to whatever their lifetime earned points qualify them for.
      </p>

      <Callout type="tip">
        Use tier overrides for special situations such as VIP partnerships, customer service
        gestures, or migration from another loyalty platform where a customer&apos;s existing status
        should be honoured.
      </Callout>

      <h2>API Reference</h2>
      <p>
        Tier overrides are managed through the <code>api.admin-customer-tier</code> route, which
        accepts:
      </p>
      <table>
        <thead>
          <tr>
            <th>Parameter</th>
            <th>Type</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <code>customerId</code>
            </td>
            <td>string</td>
            <td>The PerkStack customer ID</td>
          </tr>
          <tr>
            <td>
              <code>tierOverrideId</code>
            </td>
            <td>string | null</td>
            <td>
              The tier ID to assign, or <code>null</code> to clear the override
            </td>
          </tr>
        </tbody>
      </table>

      <Callout type="warning">
        When a tier override is active, earning more points will not change the customer&apos;s
        displayed tier. The override must be explicitly cleared for automatic tier calculation to
        resume.
      </Callout>

      <h2>Related</h2>
      <ul>
        <li>
          <a href="/docs/customers/detail">Customer Detail</a>: where tier overrides are managed
        </li>
        <li>
          <a href="/docs/settings/billing">Billing &amp; Plans</a>: VIP tiers require the Pro plan
        </li>
        <li>
          <a href="/docs/advanced/admin-extensions">Admin Extensions</a>: the admin block also shows
          tier information
        </li>
      </ul>
    </div>
  );
}
