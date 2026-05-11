import type { Metadata } from "next";
import Callout from "@/components/Callout";
import PlanBadge from "@/components/PlanBadge";

export const metadata: Metadata = {
  title: "Billing & Plans",
  description:
    "PerkStack pricing — Free, Essential ($29/mo), Growth ($99/mo), and Studio ($299/mo). Feature comparison, billing statuses, and how to upgrade, downgrade, or cancel.",
};

export default function BillingPage() {
  return (
    <div className="docs-prose">
      <h1>Billing &amp; Plans</h1>
      <p>
        PerkStack offers four plans, managed through the Shopify Billing API. You can view your
        current plan and switch plans from <strong>PerkStack → Settings → Billing</strong>.
      </p>

      <Callout type="info">
        Free has no trial — it&apos;s free forever. <PlanBadge plan="essential" /> includes a 14-day
        trial, <PlanBadge plan="growth" /> a 21-day trial, and <PlanBadge plan="studio" /> a 30-day
        trial. You won&apos;t be charged until the trial ends.
      </Callout>

      <h2>Plan Comparison</h2>
      <table>
        <thead>
          <tr>
            <th>Feature</th>
            <th>
              <PlanBadge plan="free" />
            </th>
            <th>
              <PlanBadge plan="essential" />
            </th>
            <th>
              <PlanBadge plan="growth" />
            </th>
            <th>
              <PlanBadge plan="studio" />
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Price</td>
            <td>$0/mo</td>
            <td>$29/mo</td>
            <td>$99/mo</td>
            <td>$299/mo</td>
          </tr>
          <tr>
            <td>Trial</td>
            <td>-</td>
            <td>14-day free trial</td>
            <td>21-day free trial</td>
            <td>30-day free trial</td>
          </tr>
          <tr>
            <td>Monthly order cap</td>
            <td>100</td>
            <td>500</td>
            <td>2,500</td>
            <td>10,000</td>
          </tr>
          <tr>
            <td>Monthly email cap</td>
            <td>~150 (bounded by orders)</td>
            <td>5,000</td>
            <td>25,000</td>
            <td>50,000</td>
          </tr>
          <tr>
            <td>Order overage</td>
            <td>-</td>
            <td>-</td>
            <td>+$25 / 500 orders (capped at $99)</td>
            <td>+$30 / 1,000 orders (capped at $300)</td>
          </tr>
          <tr>
            <td>Dashboard history</td>
            <td>30 days</td>
            <td>90 days</td>
            <td>180 days</td>
            <td>Unlimited</td>
          </tr>
          <tr>
            <td>Text reviews &amp; on-storefront display</td>
            <td>Unlimited</td>
            <td>Unlimited</td>
            <td>Unlimited</td>
            <td>Unlimited</td>
          </tr>
          <tr>
            <td>Photo reviews</td>
            <td>-</td>
            <td>Yes</td>
            <td>Yes</td>
            <td>Yes</td>
          </tr>
          <tr>
            <td>Custom rewards (fixed amount, free shipping)</td>
            <td>-</td>
            <td>Yes</td>
            <td>Yes (+ free product)</td>
            <td>Yes (+ free product)</td>
          </tr>
          <tr>
            <td>Checkout UI extension</td>
            <td>-</td>
            <td>Yes</td>
            <td>Yes</td>
            <td>Yes</td>
          </tr>
          <tr>
            <td>Branding removal</td>
            <td>-</td>
            <td>Yes</td>
            <td>Yes</td>
            <td>Yes</td>
          </tr>
          <tr>
            <td>CSV import (Judge.me / Loox / Yotpo)</td>
            <td>-</td>
            <td>Yes</td>
            <td>Yes</td>
            <td>Yes</td>
          </tr>
          <tr>
            <td>Cap-Recovery flow</td>
            <td>-</td>
            <td>Yes</td>
            <td>Yes</td>
            <td>Yes</td>
          </tr>
          <tr>
            <td>Referral program</td>
            <td>-</td>
            <td>-</td>
            <td>Yes</td>
            <td>Yes</td>
          </tr>
          <tr>
            <td>VIP tiers (up to 3)</td>
            <td>-</td>
            <td>-</td>
            <td>Yes</td>
            <td>Yes</td>
          </tr>
          <tr>
            <td>Shopify Flow triggers</td>
            <td>-</td>
            <td>-</td>
            <td>Yes</td>
            <td>Yes</td>
          </tr>
          <tr>
            <td>Klaviyo integration (live two-way sync)</td>
            <td>-</td>
            <td>-</td>
            <td>Yes</td>
            <td>Yes</td>
          </tr>
          <tr>
            <td>Judge.me integration (live two-way review sync)</td>
            <td>-</td>
            <td>-</td>
            <td>Yes</td>
            <td>Yes</td>
          </tr>
          <tr>
            <td>Custom points currency &amp; icon</td>
            <td>-</td>
            <td>-</td>
            <td>Yes</td>
            <td>Yes</td>
          </tr>
          <tr>
            <td>Custom launcher hero image</td>
            <td>-</td>
            <td>-</td>
            <td>Yes</td>
            <td>Yes</td>
          </tr>
          <tr>
            <td>Custom email sender domain</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>Yes</td>
          </tr>
          <tr>
            <td>Custom CSS for storefront widget</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>Yes</td>
          </tr>
          <tr>
            <td>Custom review-email templates</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>Yes</td>
          </tr>
          <tr>
            <td>Bulk operations</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>Yes</td>
          </tr>
          <tr>
            <td>Activity log + CSV export</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>Yes</td>
          </tr>
          <tr>
            <td>Multi-store support</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>Coming soon</td>
          </tr>
          <tr>
            <td>Support</td>
            <td>Community + docs</td>
            <td>Email, 24h response</td>
            <td>Email, 12h response</td>
            <td>Priority email + chat, 2h response</td>
          </tr>
        </tbody>
      </table>

      <Callout type="info">
        <strong>Klaviyo and Judge.me already in your stack?</strong> On{" "}
        <PlanBadge plan="growth" /> and above, PerkStack syncs bidirectionally with both — points
        balance, VIP tier, and referral URLs flow into Klaviyo profiles, and reviews stay in sync
        with Judge.me so you don&apos;t have to choose between platforms.
      </Callout>

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

      <h2>Downgrading</h2>
      <p>
        To downgrade, click <strong>Downgrade</strong> on a lower plan card. The downgrade takes
        effect at the end of your current billing cycle. Features exclusive to your current plan
        remain available until then.
      </p>

      <Callout type="warning">
        Downgrading may disable features you are currently using. For example, if you downgrade from{" "}
        <PlanBadge plan="growth" /> to <PlanBadge plan="essential" />, VIP tiers, referrals, the
        Klaviyo and Judge.me integrations, and Shopify Flow triggers will be disabled. Review the
        plan comparison table before downgrading.
      </Callout>

      <h2>Cancelling</h2>
      <p>
        You can cancel your paid subscription at any time. Cancellation reverts your account to the{" "}
        <PlanBadge plan="free" /> plan at the end of the current billing cycle.
      </p>

      <h2>Order &amp; Email Caps</h2>
      <p>
        Each plan includes a monthly order cap and (on paid plans) a unified outbound-email cap.
        Caps reset on the 1st of each calendar month in your store&apos;s timezone.
      </p>
      <ul>
        <li>
          <PlanBadge plan="free" /> and <PlanBadge plan="essential" /> are <strong>hard caps</strong>
          : once you exceed your monthly order limit, no new points are awarded until the cap resets
          (or you upgrade). Use the Cap-Recovery flow on Essential+ to retroactively award skipped
          points after upgrading.
        </li>
        <li>
          <PlanBadge plan="growth" /> and <PlanBadge plan="studio" /> support{" "}
          <strong>usage-based overage</strong> via Shopify metered billing. Overage charges itemize
          on your Shopify subscription invoice and are capped per the table above.
        </li>
      </ul>

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
