import type { Metadata } from "next";
import { createDocMetadata } from "@/lib/seo";
import { H2, H3 } from "@/components/Heading";
import Callout from "@/components/Callout";
import PlanBadge from "@/components/PlanBadge";

export const metadata: Metadata = createDocMetadata("/docs/widgets/loyalty-launcher", {
  title: "Loyalty Launcher",
  description:
    "Add a floating rewards button to your storefront so shoppers can check their points, tier, and rewards from any page.",
});

export default function LoyaltyLauncherPage() {
  return (
    <div className="docs-prose">
      <h1>Loyalty Launcher</h1>
      <p>
        The Loyalty Launcher is a floating button that sits in the corner of every page of your
        store. When a shopper clicks it, a panel slides open with everything about their rewards
        &mdash; a one-tap way to keep your loyalty program visible without taking up space on the
        page.
      </p>

      <H2>What shoppers see</H2>
      <p>Signed-in shoppers open the panel to find:</p>
      <ul>
        <li>Their current points balance, plus any points still pending</li>
        <li>Their VIP tier and progress toward the next one</li>
        <li>Ways to earn more points</li>
        <li>
          Rewards they can redeem &mdash; each generates a discount code they can apply to their cart
        </li>
        <li>Their referral link, and birthday and social-sharing prompts</li>
      </ul>
      <p>
        Shoppers who aren&apos;t signed in see a welcome hero that invites them to join or sign in.
      </p>

      <H2>How to add it</H2>
      <p>The launcher is an app embed, so you turn it on rather than placing it by hand.</p>
      <ol>
        <li>
          In Shopify admin, go to <strong>Online Store &rarr; Themes</strong> and click{" "}
          <strong>Customize</strong> on your live theme.
        </li>
        <li>
          Open <strong>App embeds</strong> at the bottom of the left sidebar.
        </li>
        <li>
          Toggle on <strong>Loyalty Launcher</strong>.
        </li>
        <li>
          Adjust the settings below, then click <strong>Save</strong>.
        </li>
      </ol>
      <p>Once on, the button appears on every page of your store automatically.</p>

      <H2>Theme editor settings</H2>
      <p>These are the settings you control right in the theme editor:</p>
      <table>
        <thead>
          <tr>
            <th>Setting</th>
            <th>What it does</th>
            <th>Default</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Store name in header</td>
            <td>Name shown at the top of the panel</td>
            <td>Your Shopify store name</td>
          </tr>
          <tr>
            <td>Button label</td>
            <td>The text on the floating button</td>
            <td>
              <code>Rewards</code>
            </td>
          </tr>
          <tr>
            <td>Position</td>
            <td>Which corner the button sits in: bottom-right or bottom-left</td>
            <td>Bottom-right</td>
          </tr>
          <tr>
            <td>Theme</td>
            <td>
              Light or dark appearance, or <strong>auto</strong> to match your storefront&apos;s
              color scheme
            </td>
            <td>Auto</td>
          </tr>
        </tbody>
      </table>

      <H2>Deeper styling lives in the app</H2>
      <p>
        The theme editor keeps things to the essentials. Everything else about the launcher&apos;s
        look &mdash; the heading and subheading copy, panel colors, fonts, card style, button shape,
        hero image, and logo &mdash; is set once in the app under{" "}
        <a href="/docs/settings/widget-customization">Settings &rarr; Widget Customization</a>. Those
        choices apply to both the launcher and the storefront Loyalty Page.
      </p>

      <H3>What each plan can style</H3>
      <ul>
        <li>
          <strong>Every plan</strong>: accent color, and light / dark / auto appearance.
        </li>
        <li>
          <strong>
            <PlanBadge plan="growth" /> and above
          </strong>
          : full brand matching &mdash; custom panel colors, fonts, card style, button shape, hero
          image, and logo.
        </li>
      </ul>

      <Callout type="info">
        Fonts inherit from your theme unless you pick a different one in Widget Customization, so the
        launcher looks at home in your store out of the box.
      </Callout>

      <H2>Removing &quot;Powered by PerkStack&quot;</H2>
      <p>
        On the <PlanBadge plan="free" /> plan, a small &quot;Powered by PerkStack&quot; line shows at
        the bottom of the panel. You can hide it on the <PlanBadge plan="essential" /> plan and above
        &mdash; upgrade, then turn branding off in settings.
      </p>

      <H2>Related</H2>
      <ul>
        <li>
          <a href="/docs/settings/widget-customization">Widget Customization</a>: set the
          launcher&apos;s colors, fonts, and hero.
        </li>
        <li>
          <a href="/docs/widgets/loyalty-page">Loyalty Page</a>: a full rewards dashboard for a
          dedicated storefront page.
        </li>
        <li>
          <a href="/docs/loyalty/overview">Loyalty Overview</a>: how points, tiers, and rewards work.
        </li>
        <li>
          <a href="/docs/dashboard/extension-status">Theme Setup &amp; Status</a>: confirm the
          launcher is active on your store.
        </li>
      </ul>
    </div>
  );
}
