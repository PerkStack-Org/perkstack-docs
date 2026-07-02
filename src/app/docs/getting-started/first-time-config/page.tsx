import type { Metadata } from "next";
import { createDocMetadata } from "@/lib/seo";
import { H2, H3 } from "@/components/Heading";
import Callout from "@/components/Callout";

export const metadata: Metadata = createDocMetadata("/docs/getting-started/first-time-config", {
  title: "First-Time Setup",
  description:
    "The four-step PerkStack setup wizard — Welcome, Points, Branding, and Launch — gets your loyalty program live in about two minutes. Everything is changeable later.",
});

export default function FirstTimeConfigPage() {
  return (
    <div className="docs-prose">
      <h1>First-Time Setup</h1>
      <p>
        The first time you open PerkStack, a four-step wizard helps you launch your loyalty program
        in about two minutes. It sets your points rate and branding, then turns everything on. Every
        choice here can be changed later, and the wizard is entirely optional.
      </p>

      <Callout type="info">
        Nothing is charged during setup and no plan is chosen here. You start on the free plan;
        billing lives separately in <a href="/docs/settings/billing">Plans &amp; Billing</a>.
      </Callout>

      <H2>The four steps</H2>

      <H3>1. Welcome</H3>
      <p>
        A quick introduction to what PerkStack does for your store — points on purchases, review
        collection, referrals, a storefront rewards panel, and automated emails. There is nothing to
        fill in; click <strong>Get started</strong> to continue.
      </p>

      <H3>2. Points</H3>
      <p>
        Choose how much customers earn on each order, as a percentage of what they spend. Pick one of
        the preset cards — <strong>3%</strong>, <strong>5%</strong>, or <strong>10%</strong> — or
        enter your own <strong>custom</strong> rate. The default is <strong>5%</strong>, recommended
        for most stores. A live example shows what a shopper would earn: at 5%, a $100 order earns
        500 points.
      </p>

      <Callout type="tip">
        Start around 5% back. It feels generous to customers while keeping your reward costs
        predictable. You can adjust the rate any time from <strong>Loyalty → Ways to Earn</strong>.
      </Callout>

      <H3>3. Branding</H3>
      <p>
        Style the storefront rewards launcher to match your store, with a live preview as you go:
      </p>
      <ul>
        <li>
          <strong>Accent color</strong>: the main color used across the launcher and panel.
        </li>
        <li>
          <strong>Launcher header image</strong>: paste an image URL to show a banner at the top of
          the panel.
        </li>
        <li>
          <strong>Overlay opacity</strong>: when a header image is set, this controls how much a tint
          darkens it so your text stays readable (default 50%).
        </li>
        <li>
          <strong>Fullscreen background</strong>: optionally let the header image fill the whole
          panel background.
        </li>
      </ul>

      <H3>4. Launch</H3>
      <p>
        A summary of what happens next — customers start earning points, review requests go out
        automatically after purchases, the rewards launcher is ready to add to your storefront, and
        automated emails are enabled. Click <strong>Launch your program</strong> to save your
        choices and finish setup. Your full navigation menu unlocks at this point.
      </p>

      <H2>Skipping the wizard</H2>
      <p>
        Prefer to look around first? Choose <strong>Explore PerkStack</strong> on the final step.
        This finishes onboarding and unlocks the app while leaving the points rate and branding at
        their defaults — you can set them up later whenever you are ready.
      </p>

      <Callout type="tip">
        Whether you launch or skip, nothing here is permanent. Your points rate lives in{" "}
        <strong>Loyalty → Ways to Earn</strong> and your branding in{" "}
        <a href="/docs/settings/widget-customization">Widget Customization</a>, both editable at any
        time.
      </Callout>

      <H2>After setup: turn it on in your storefront</H2>
      <p>
        Finishing the wizard prepares your program, but customers won&apos;t see it until you add
        PerkStack&apos;s blocks to your theme. Your Dashboard has a{" "}
        <strong>Theme Setup</strong> checklist that walks you through it — see{" "}
        <a href="/docs/getting-started/going-live">Going Live on Your Store</a>.
      </p>

      <H2>Related</H2>
      <ul>
        <li>
          <a href="/docs/getting-started/going-live">Going Live on Your Store</a>: add PerkStack to
          your storefront
        </li>
        <li>
          <a href="/docs/loyalty/earn-rules">Ways to Earn</a>: adjust your points rate and add more
          earn actions
        </li>
        <li>
          <a href="/docs/settings/widget-customization">Widget Customization</a>: restyle the
          launcher and rewards panel
        </li>
        <li>
          <a href="/docs/dashboard/overview">Dashboard Overview</a>: your program home base
        </li>
      </ul>
    </div>
  );
}
