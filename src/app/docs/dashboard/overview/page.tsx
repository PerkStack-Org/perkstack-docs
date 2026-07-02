import type { Metadata } from "next";
import { createDocMetadata } from "@/lib/seo";
import { H2 } from "@/components/Heading";
import Callout from "@/components/Callout";

export const metadata: Metadata = createDocMetadata("/docs/dashboard/overview", {
  title: "Overview",
  description:
    "The PerkStack Dashboard is your at-a-glance home: points issued and redeemed, a 30-day trend, your loyalty on/off status, and the Theme Setup checklist.",
});

export default function DashboardOverviewPage() {
  return (
    <div className="docs-prose">
      <h1>Overview</h1>
      <p>
        The Dashboard is the first screen you see when you open PerkStack. It gives you a quick read
        on how your loyalty program is doing and a checklist for getting PerkStack onto your
        storefront. It is a reporting and setup screen — you don&apos;t configure the program itself
        here.
      </p>

      <H2>Points at a glance</H2>
      <p>
        Two cards at the top show your program&apos;s all-time <strong>points issued</strong> and{" "}
        <strong>points redeemed</strong>, each with a small trend line. The trend uses the last 30
        days of points activity, so you can see momentum without opening a report. A healthy program
        shows steady issuing with redemptions rising over time.
      </p>

      <Callout type="tip">
        For deeper breakdowns — by customer, reward, review, or referral — open{" "}
        <a href="/docs/dashboard/analytics">Analytics</a>. The Dashboard is the summary; Analytics is
        the detail.
      </Callout>

      <H2>Loyalty on/off status</H2>
      <p>
        A status pill shows whether your loyalty program is currently <strong>on</strong> or{" "}
        <strong>off</strong>. Click it to jump to the Loyalty area if you need to turn the program on
        or off. When it is off, customers stop earning and redeeming — a useful pause without losing
        any balances.
      </p>

      <H2>Upgrade banner</H2>
      <p>
        Depending on your plan, you may see a banner inviting you to unlock more — for example, a
        prompt to move up from the free plan. It links straight to{" "}
        <a href="/docs/settings/billing">Plans &amp; Billing</a>. On the top plan, the prompt
        doesn&apos;t appear. You may also see an order-usage banner as you approach your monthly cap.
      </p>

      <H2>Theme Setup checklist</H2>
      <p>
        The <strong>Theme Setup</strong> card is your go-live checklist. It lists the storefront and
        admin blocks PerkStack can add — grouped into Loyalty, Reviews, and Admin pages — and shows
        which are already active. Each row has a button that opens a short walkthrough and takes you
        to the right editor.
      </p>
      <p>
        This is where you actually turn PerkStack on for shoppers. See{" "}
        <a href="/docs/getting-started/going-live">Going Live on Your Store</a> to work through it,
        and <a href="/docs/dashboard/extension-status">Theme Setup &amp; Status</a> for how each row&apos;s
        status is determined.
      </p>

      <Callout type="info">
        The Dashboard is read-only reporting plus setup health. To change earn rates, rewards, tiers,
        or review settings, use the <strong>Loyalty</strong>, <strong>Reviews</strong>, and{" "}
        <strong>Settings</strong> areas.
      </Callout>

      <H2>Related</H2>
      <ul>
        <li>
          <a href="/docs/dashboard/analytics">Analytics</a>: detailed reporting across your program
        </li>
        <li>
          <a href="/docs/dashboard/extension-status">Theme Setup &amp; Status</a>: what &ldquo;Active&rdquo;
          means for each block
        </li>
        <li>
          <a href="/docs/getting-started/going-live">Going Live on Your Store</a>: add PerkStack to
          your storefront
        </li>
        <li>
          <a href="/docs/settings/billing">Plans &amp; Billing</a>: plans, caps, and upgrades
        </li>
      </ul>
    </div>
  );
}
