import type { Metadata } from "next";
import { createDocMetadata } from "@/lib/seo";
import { H2 } from "@/components/Heading";
import Callout from "@/components/Callout";
import PlanBadge from "@/components/PlanBadge";

export const metadata: Metadata = createDocMetadata("/docs/settings/billing", {
  title: "Plans & Billing",
  description:
    "PerkStack pricing — Free, Essential ($29/mo), Growth ($99/mo), and Studio ($299/mo). Order and email caps, free trials, and how to upgrade, downgrade, or cancel through Shopify.",
});

export default function BillingPage() {
  return (
    <div className="docs-prose">
      <h1>Plans &amp; Billing</h1>
      <p>
        PerkStack has four plans &mdash; <PlanBadge plan="free" />, <PlanBadge plan="essential" />,{" "}
        <PlanBadge plan="growth" />, and <PlanBadge plan="studio" />. You view your plan and switch at
        any time from <strong>PerkStack → Settings → Billing</strong>. Every plan is billed monthly
        through Shopify, so there&apos;s no card to enter inside PerkStack.
      </p>

      <H2>Plans at a glance</H2>
      <table>
        <thead>
          <tr>
            <th>Plan</th>
            <th>Price / mo</th>
            <th>Free trial</th>
            <th>Orders / mo</th>
            <th>Emails / mo</th>
            <th>Analytics history</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <PlanBadge plan="free" />
            </td>
            <td>$0</td>
            <td>&mdash;</td>
            <td>100</td>
            <td>Uncapped*</td>
            <td>30 days</td>
          </tr>
          <tr>
            <td>
              <PlanBadge plan="essential" />
            </td>
            <td>$29</td>
            <td>14 days</td>
            <td>500</td>
            <td>5,000</td>
            <td>90 days</td>
          </tr>
          <tr>
            <td>
              <PlanBadge plan="growth" />
            </td>
            <td>$99</td>
            <td>21 days</td>
            <td>2,500</td>
            <td>25,000</td>
            <td>180 days</td>
          </tr>
          <tr>
            <td>
              <PlanBadge plan="studio" />
            </td>
            <td>$299</td>
            <td>30 days</td>
            <td>10,000</td>
            <td>50,000</td>
            <td>Unlimited</td>
          </tr>
        </tbody>
      </table>
      <p>
        <small>
          * Free has no separate email cap &mdash; the 100-order limit naturally keeps email volume
          low.
        </small>
      </p>

      <Callout type="info">
        <PlanBadge plan="free" /> is genuinely useful, not a demo: you can run a real
        percentage-discount loyalty program and collect and display unlimited text reviews. The only
        hard limit is the 100 orders per month that can earn points.
      </Callout>

      <H2>How billing works</H2>
      <ul>
        <li>
          <strong>Monthly through Shopify.</strong> Each plan is a Shopify app subscription charged
          every 30 days in USD. You approve the charge on Shopify&apos;s own billing page &mdash;
          there&apos;s no credit card entry in PerkStack.
        </li>
        <li>
          <strong>Free trials.</strong> Essential, Growth, and Studio start with a 14-, 21-, or 30-day
          free trial. During the trial you get the <strong>full caps of the plan you chose</strong>{" "}
          (a Growth trial gives you 2,500 orders, not Free&apos;s 100). You&apos;re not charged until
          the trial ends.
        </li>
        <li>
          <strong>Upgrades are immediate.</strong> Once you approve the charge on Shopify, the higher
          order and email caps and features unlock right away.
        </li>
        <li>
          <strong>Downgrades and cancellations are safe.</strong> Your customers&apos; earned points
          always stay valid. You simply move to the lower plan&apos;s caps and feature set going
          forward. Cancelling returns you to Free.
        </li>
      </ul>

      <H2>Order and email caps</H2>
      <p>
        Each plan includes a monthly order cap (the number of orders that can earn points) and, on paid
        plans, an outbound email cap. Both <strong>reset on the 1st of each calendar month</strong> in
        your store&apos;s timezone. Reaching a cap only pauses new point-earning and outbound emails
        &mdash; your storefront widget, redemptions, review collection, and reporting all keep working.
      </p>
      <table>
        <thead>
          <tr>
            <th>When you hit the order cap</th>
            <th>What happens</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <PlanBadge plan="free" /> / <PlanBadge plan="essential" />
            </td>
            <td>
              A hard cap: new points and emails pause until the cap resets on the 1st, or until you
              upgrade. Nothing customer-facing breaks.
            </td>
          </tr>
          <tr>
            <td>
              <PlanBadge plan="growth" /> / <PlanBadge plan="studio" />
            </td>
            <td>
              Orders keep earning past the cap. The extra is billed as overage on your Shopify invoice
              &mdash; +$25 per 500 orders (capped at $99/mo) on Growth, +$30 per 1,000 orders (capped
              at $300/mo) on Studio.
            </td>
          </tr>
        </tbody>
      </table>
      <Callout type="tip">
        You&apos;ll get in-app and email warnings as you approach the cap (at 75%, 90%, and 100%). On
        Essential and above, after you upgrade you can use Cap Recovery to retroactively award points
        for orders in the last 30 days that missed out.
      </Callout>

      <H2>What each plan unlocks</H2>
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
            <td>Text reviews &amp; storefront display</td>
            <td>Yes</td>
            <td>Yes</td>
            <td>Yes</td>
            <td>Yes</td>
          </tr>
          <tr>
            <td>Reward types</td>
            <td>Percentage off</td>
            <td>+ Fixed, free shipping, free product</td>
            <td>+ Spend-X-get-product, BOGO</td>
            <td>+ Free-gift catalog</td>
          </tr>
          <tr>
            <td>Photo reviews</td>
            <td>&mdash;</td>
            <td>Yes</td>
            <td>Yes</td>
            <td>Yes</td>
          </tr>
          <tr>
            <td>Points expiry &amp; points delay</td>
            <td>&mdash;</td>
            <td>Yes</td>
            <td>Yes</td>
            <td>Yes</td>
          </tr>
          <tr>
            <td>Remove &ldquo;Powered by PerkStack&rdquo;</td>
            <td>&mdash;</td>
            <td>Yes</td>
            <td>Yes</td>
            <td>Yes</td>
          </tr>
          <tr>
            <td>Points at checkout</td>
            <td>&mdash;</td>
            <td>Yes</td>
            <td>Yes</td>
            <td>Yes</td>
          </tr>
          <tr>
            <td>VIP tiers &amp; referrals</td>
            <td>&mdash;</td>
            <td>&mdash;</td>
            <td>Yes</td>
            <td>Yes</td>
          </tr>
          <tr>
            <td>Rename points &amp; full brand matching</td>
            <td>&mdash;</td>
            <td>&mdash;</td>
            <td>Yes</td>
            <td>Yes</td>
          </tr>
          <tr>
            <td>Integrations, Shopify Flow &amp; Agent Access</td>
            <td>&mdash;</td>
            <td>&mdash;</td>
            <td>Yes</td>
            <td>Yes</td>
          </tr>
          <tr>
            <td>Advanced analytics (funnels, cohorts, export)</td>
            <td>&mdash;</td>
            <td>&mdash;</td>
            <td>Yes</td>
            <td>Yes</td>
          </tr>
          <tr>
            <td>Custom CSS, custom email domain &amp; templates</td>
            <td>&mdash;</td>
            <td>&mdash;</td>
            <td>&mdash;</td>
            <td>Yes</td>
          </tr>
          <tr>
            <td>CSV review import (Judge.me / Loox)</td>
            <td>&mdash;</td>
            <td>&mdash;</td>
            <td>&mdash;</td>
            <td>Yes</td>
          </tr>
        </tbody>
      </table>

      <H2>Upgrading</H2>
      <ol>
        <li>
          Go to <strong>PerkStack → Settings → Billing</strong>.
        </li>
        <li>
          Click <strong>Upgrade</strong> on the plan you want.
        </li>
        <li>Shopify shows its billing approval page. Confirm the charge there.</li>
        <li>Once approved, your new caps and features unlock immediately.</li>
      </ol>

      <H2>Downgrading or cancelling</H2>
      <p>
        Use <strong>Downgrade</strong> on a lower plan card, or <strong>Cancel</strong> to return to
        Free. Your customers keep every point they&apos;ve earned. Going forward you get the lower
        plan&apos;s caps, and features exclusive to your old plan (such as VIP tiers, referrals, or
        integrations) turn off. Before you downgrade, PerkStack shows you exactly which features
        you&apos;ll lose.
      </p>

      <H2>Related</H2>
      <ul>
        <li>
          <a href="/docs/settings/general">General</a>: points naming, expiry, and delay that these
          plans unlock
        </li>
        <li>
          <a href="/docs/settings/email">Email &amp; Notifications</a>: branding removal and monthly
          email usage
        </li>
        <li>
          <a href="/docs/dashboard/analytics">Analytics</a>: how far back your history goes on each plan
        </li>
        <li>
          <a href="/docs/loyalty/overview">Loyalty Overview</a>: the earn rules and reward types each
          plan includes
        </li>
      </ul>
    </div>
  );
}
