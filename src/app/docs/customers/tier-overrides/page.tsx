import type { Metadata } from "next";
import { createDocMetadata } from "@/lib/seo";
import { H2, H3 } from "@/components/Heading";
import Callout from "@/components/Callout";
import PlanBadge from "@/components/PlanBadge";

export const metadata: Metadata = createDocMetadata("/docs/customers/tier-overrides", {
  title: "Tier Overrides",
  description:
    "Pin a customer to a chosen VIP tier regardless of their lifetime points, and reset them back to automatic when you're done.",
});

export default function TierOverridesPage() {
  return (
    <div className="docs-prose">
      <h1>
        Tier Overrides <PlanBadge plan="growth" />
      </h1>
      <p>
        Normally a customer&apos;s VIP tier is worked out automatically from their lifetime earned
        points. A tier override lets you place a specific customer in a tier of your choosing and
        keep them there, no matter how many points they have. It&apos;s the tool for honoring a VIP
        partnership, making a goodwill gesture, or matching a customer&apos;s status when you migrate
        from another loyalty app.
      </p>

      <Callout type="info">
        Tier overrides are part of <a href="/docs/loyalty/vip-tiers">VIP tiers</a>, available on the{" "}
        <PlanBadge plan="growth" /> plan and above. Tiers must be turned on in your settings before
        you can set an override.
      </Callout>

      <H2>What an override does</H2>
      <p>
        An override pins the customer to the tier you pick and gives them that tier&apos;s benefits,
        including its points multiplier. The customer keeps that tier until you change or remove the
        override &mdash; earning more points won&apos;t move them, and losing points won&apos;t drop
        them. A <strong>Manual override</strong> badge marks the customer so it&apos;s clear their
        tier was set by hand.
      </p>

      <H2>Setting an override</H2>
      <p>You can set one from two places:</p>
      <H3>From the Customers list</H3>
      <ol>
        <li>
          Open <strong>Customers</strong> and click <strong>Manage</strong> on the customer&apos;s
          row.
        </li>
        <li>
          On the <strong>Overview</strong> tab, choose <strong>Change tier</strong>.
        </li>
        <li>Pick the tier you want and save.</li>
      </ol>
      <H3>From the customer detail page</H3>
      <ol>
        <li>Click the customer&apos;s name to open their profile.</li>
        <li>
          In the tier section, choose <strong>Change tier</strong> and select the tier.
        </li>
      </ol>

      <H2>Returning to automatic</H2>
      <p>
        To hand the customer back to points-based tiers, choose <strong>Reset to auto</strong> in the
        same place you set the override. The Manual override badge is removed and the customer&apos;s
        tier returns to whatever their lifetime earned points qualify them for.
      </p>

      <Callout type="warning">
        While an override is active, earning more points will not change the customer&apos;s tier.
        If a customer is climbing tiers on their own, use <strong>Reset to auto</strong> so their
        progress is reflected again.
      </Callout>

      <H2>Related</H2>
      <ul>
        <li>
          <a href="/docs/loyalty/vip-tiers">VIP Tiers</a>: how tiers, thresholds, and multipliers
          work
        </li>
        <li>
          <a href="/docs/customers/detail">Customer Detail</a>: where tier progress and overrides
          live
        </li>
        <li>
          <a href="/docs/customers/admin-blocks">Customer Page Blocks</a>: change a tier from
          Shopify&apos;s customer page
        </li>
        <li>
          <a href="/docs/settings/billing">Plans &amp; Billing</a>: VIP tiers require Growth or above
        </li>
      </ul>
    </div>
  );
}
