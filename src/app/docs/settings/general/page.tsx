import type { Metadata } from "next";
import { createDocMetadata } from "@/lib/seo";
import { H2 } from "@/components/Heading";
import Callout from "@/components/Callout";
import PlanBadge from "@/components/PlanBadge";

export const metadata: Metadata = createDocMetadata("/docs/settings/general", {
  title: "General Settings",
  description:
    "Configure your loyalty program's core settings including points naming, icons, expiry rules, branding, and logo.",
});

export default function GeneralSettingsPage() {
  return (
    <div className="docs-prose">
      <h1>General Settings</h1>
      <p>
        The general settings page (<strong>PerkStack → Settings → General</strong>) lets you
        configure the core behaviour and branding of your loyalty program.
      </p>

      <H2>Points Naming</H2>
      <p>
        Customise the name of your loyalty currency to match your brand. PerkStack uses two fields:
      </p>
      <table>
        <thead>
          <tr>
            <th>Field</th>
            <th>Default</th>
            <th>Example</th>
            <th>Usage</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <strong>Plural Name</strong>
            </td>
            <td>Points</td>
            <td>Stars</td>
            <td>&ldquo;You have 500 Stars&rdquo;</td>
          </tr>
          <tr>
            <td>
              <strong>Singular Name</strong>
            </td>
            <td>Point</td>
            <td>Star</td>
            <td>&ldquo;Earn 1 Star per dollar&rdquo;</td>
          </tr>
        </tbody>
      </table>

      <Callout type="tip">
        Choose a name that fits your brand identity. Common choices include Stars, Coins, Gems,
        Pearls, or simply Points.
      </Callout>

      <H2>Custom Points Icon</H2>
      <p>
        Upload a custom icon that appears alongside point values in the storefront widget and
        emails. The icon should be:
      </p>
      <ul>
        <li>A square image (recommended 64×64 px or larger)</li>
        <li>PNG or SVG format with a transparent background</li>
        <li>Uploaded via the icon URL field. Paste a direct URL to your hosted image</li>
      </ul>

      <H2>Points Expiry</H2>
      <p>Control whether points expire and how customers are notified before expiry.</p>
      <table>
        <thead>
          <tr>
            <th>Setting</th>
            <th>Default</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <strong>Expiry Period</strong>
            </td>
            <td>Never (null)</td>
            <td>
              Number of months after which unused points expire. Set to <code>null</code> or leave
              blank to disable expiry entirely.
            </td>
          </tr>
          <tr>
            <td>
              <strong>Notification Days</strong>
            </td>
            <td>14</td>
            <td>
              How many days before expiry to send the customer an email notification. Only active
              when expiry is enabled.
            </td>
          </tr>
        </tbody>
      </table>

      <Callout type="warning">
        Enabling expiry affects all existing points retroactively. Points that are already older
        than the expiry period will be expired on the next scheduled check. Consider communicating
        this change to your customers before enabling.
      </Callout>

      <H2>Logo</H2>
      <p>
        Set a logo URL that appears in the storefront loyalty widget and in transactional emails.
        This should be your store&apos;s logo or a custom loyalty program logo.
      </p>
      <ul>
        <li>Recommended size: 200×200 px or larger</li>
        <li>PNG, SVG, or JPEG format</li>
        <li>Paste a direct URL to the hosted image</li>
      </ul>

      <H2>PerkStack Branding</H2>
      <p>
        By default, the storefront widget shows a &ldquo;Powered by PerkStack&rdquo; badge. You can
        remove this branding on the <PlanBadge plan="growth" /> plan or higher.
      </p>
      <table>
        <thead>
          <tr>
            <th>Plan</th>
            <th>Branding Behaviour</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <PlanBadge plan="free" />
            </td>
            <td>&ldquo;Powered by PerkStack&rdquo; always visible</td>
          </tr>
          <tr>
            <td>
              <PlanBadge plan="essential" />
            </td>
            <td>Toggle to show or hide branding</td>
          </tr>
          <tr>
            <td>
              <PlanBadge plan="growth" />
            </td>
            <td>Toggle to show or hide branding</td>
          </tr>
          <tr>
            <td>
              <PlanBadge plan="studio" />
            </td>
            <td>Toggle to show or hide branding (custom sender domain available)</td>
          </tr>
        </tbody>
      </table>

      <H2>Saving Changes</H2>
      <p>
        All settings on this page use the Shopify Contextual Save Bar. When you modify any field,
        the save bar appears at the top of the page. Click <strong>Save</strong> to persist your
        changes or <strong>Discard</strong> to revert.
      </p>

      <Callout type="info">
        Changes to points naming and icon take effect immediately across the storefront widget and
        all future emails. Previously sent emails are not affected.
      </Callout>

      <H2>Related</H2>
      <ul>
        <li>
          <a href="/docs/settings/widget-customization">Widget Customization</a> for styling the
          storefront launcher
        </li>
        <li>
          <a href="/docs/settings/trigger-button">Trigger Button</a> to customise the floating
          rewards button
        </li>
        <li>
          <a href="/docs/settings/billing">Billing &amp; Plans</a> to upgrade and remove branding
        </li>
      </ul>
    </div>
  );
}
