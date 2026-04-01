import type { Metadata } from "next";
import Callout from "@/components/Callout";
import PlanBadge from "@/components/PlanBadge";
import LoyaltyLauncherPreview from "@/components/widget-previews/LoyaltyLauncherPreview";

export const metadata: Metadata = {
  title: "Loyalty Launcher",
  description:
    "Configure the PerkStack loyalty launcher, the floating button and panel that shows points, rewards, referrals, and earn rules on every page.",
};

export default function LoyaltyLauncherPage() {
  return (
    <div className="docs-prose">
      <h1>Loyalty Launcher</h1>
      <p>
        The Loyalty Launcher is a floating button that appears on every page of your storefront.
        When a customer clicks it, a panel slides open to display their points balance, earn rules,
        available rewards, and referral link, giving them instant access to your loyalty program
        without navigating away from the current page.
      </p>

      <PlanBadge plan="free" />

      <LoyaltyLauncherPreview />

      <h2>How It Works</h2>
      <p>
        The launcher is a theme app extension block with a <code>body</code> target, which means it
        renders globally on every page once added to your theme. It is powered by the{" "}
        <code>perkstack-launcher.liquid</code> template and loads <code>perkstack-launcher.js</code>{" "}
        and <code>perkstack-launcher.css</code> to handle the interactive panel.
      </p>
      <p>
        When the panel opens, it fetches data from the following API endpoints via the Shopify app
        proxy:
      </p>
      <ul>
        <li>
          <code>/apps/perkstack/api/points</code> fetches the customer&apos;s current points balance
          and lifetime points
        </li>
        <li>
          <code>/api/rewards</code> returns available rewards the customer can redeem
        </li>
        <li>
          <code>/api/referral</code> provides the customer&apos;s unique referral link and referral
          stats
        </li>
        <li>
          <code>/api/earn-rules</code> lists active earn rules (e.g. &quot;Earn 5 points per $1
          spent&quot;)
        </li>
        <li>
          <code>/api/storefront-config</code> delivers branding, accent colour, launcher image, and
          position
        </li>
      </ul>

      <h2>Placement</h2>
      <ol>
        <li>
          Go to <strong>Online Store &gt; Themes &gt; Customize</strong> in your Shopify admin.
        </li>
        <li>
          In the theme editor sidebar, click <strong>Add block</strong> under the global
          (body-level) section.
        </li>
        <li>
          Search for <strong>PerkStack Loyalty Launcher</strong> and add it.
        </li>
        <li>
          Click <strong>Save</strong>. The launcher will now appear on every page.
        </li>
      </ol>

      <Callout type="info">
        Because the launcher uses a <code>body</code> target, you only need to add it once. It
        automatically appears on every page of your storefront, including the homepage, collection
        pages, product pages, and custom pages.
      </Callout>

      <h2>Configuration</h2>
      <p>
        Most launcher settings are managed from the PerkStack admin in Shopify under{" "}
        <strong>Settings &gt; Widgets</strong>. The following options are available:
      </p>

      <h3>Position</h3>
      <table>
        <thead>
          <tr>
            <th>Setting</th>
            <th>Values</th>
            <th>Default</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <code>widgetPosition</code>
            </td>
            <td>
              <code>bottom-right</code>, <code>bottom-left</code>
            </td>
            <td>
              <code>bottom-right</code>
            </td>
          </tr>
        </tbody>
      </table>

      <h3>Branding</h3>
      <ul>
        <li>
          <strong>Launcher image</strong>: upload a custom icon to replace the default PerkStack
          launcher button. Configured via <code>/api/storefront-config</code>.
        </li>
        <li>
          <strong>Accent colour</strong>: the primary colour applied to the launcher button
          background, panel header, and interactive elements.
        </li>
        <li>
          <strong>Overlay</strong>: controls whether a semi-transparent backdrop appears behind the
          panel when it is open.
        </li>
      </ul>

      <h3>Guest Behaviour</h3>
      <table>
        <thead>
          <tr>
            <th>Setting</th>
            <th>Values</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <code>widgetGuestBehavior</code>
            </td>
            <td>
              <code>prompt_signup</code>, <code>hide</code>
            </td>
            <td>
              Controls what guests (not logged in) see when they click the launcher.{" "}
              <code>prompt_signup</code> encourages account creation; <code>hide</code> hides the
              launcher entirely for logged-out visitors.
            </td>
          </tr>
        </tbody>
      </table>

      <h2>Panel Content</h2>
      <p>When the panel is open, it displays the following sections in order:</p>
      <ol>
        <li>
          <strong>Points balance</strong>: current available points and lifetime earned points.
        </li>
        <li>
          <strong>Earn rules</strong>: a list of ways the customer can earn points (e.g. place an
          order, leave a review, refer a friend).
        </li>
        <li>
          <strong>Available rewards</strong>: rewards the customer can redeem with their current
          balance, with a one-click redeem button.
        </li>
        <li>
          <strong>Referral link</strong>: the customer&apos;s unique referral URL with a
          copy-to-clipboard button and social share options.
        </li>
      </ol>

      <Callout type="tip">
        The panel content updates in real time. If a customer earns points while browsing, their
        balance refreshes the next time they open the launcher, with no page reload needed.
      </Callout>

      <h2>Troubleshooting</h2>
      <ul>
        <li>
          <strong>Launcher not appearing</strong>: verify that the block is added in the theme
          editor and that the theme supports Online Store 2.0 app blocks.
        </li>
        <li>
          <strong>Panel is empty</strong>: check that the PerkStack app proxy is configured
          correctly in your Shopify app settings (path: <code>/apps/perkstack</code>).
        </li>
        <li>
          <strong>Overlapping other elements</strong>: adjust the <code>widgetPosition</code>{" "}
          setting or use CSS to increase the <code>z-index</code> of the launcher.
        </li>
      </ul>
    </div>
  );
}
