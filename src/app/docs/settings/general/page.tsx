import type { Metadata } from "next";
import { createDocMetadata } from "@/lib/seo";
import { H2 } from "@/components/Heading";
import Callout from "@/components/Callout";
import PlanBadge from "@/components/PlanBadge";

export const metadata: Metadata = createDocMetadata("/docs/settings/general", {
  title: "General",
  description:
    "Name your points, set an optional expiry, delay earned points to cover refunds, and add your store logo — the core settings for your loyalty program.",
});

export default function GeneralSettingsPage() {
  return (
    <div className="docs-prose">
      <h1>General</h1>
      <p>
        General settings (<strong>PerkStack → Settings → General</strong>) control the basics of your
        loyalty program: what you call your points, whether they expire, when they land, and the logo
        shoppers see. Sensible defaults are already in place, so you only change what you need.
      </p>

      <H2>Points name</H2>
      <p>
        Points are the currency of your program. By default they&apos;re called{" "}
        <strong>Points</strong> (plural) and <strong>Point</strong> (singular) &mdash; as in
        &ldquo;You have 500 Points&rdquo; and &ldquo;Earn 1 Point per dollar.&rdquo; On{" "}
        <PlanBadge plan="growth" /> and above you can rename them to fit your brand (Stars, Coins,
        Gems, Pearls) and add a custom points icon that appears next to point values in the widget and
        emails.
      </p>
      <table>
        <thead>
          <tr>
            <th>Setting</th>
            <th>Default</th>
            <th>What it controls</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <strong>Plural name</strong>
            </td>
            <td>Points</td>
            <td>Shown wherever a balance or amount appears &mdash; &ldquo;You have 500 Stars.&rdquo;</td>
          </tr>
          <tr>
            <td>
              <strong>Singular name</strong>
            </td>
            <td>Point</td>
            <td>Used for a value of one &mdash; &ldquo;Earn 1 Star per dollar.&rdquo;</td>
          </tr>
          <tr>
            <td>
              <strong>Points icon</strong>
            </td>
            <td>None</td>
            <td>A small square image shown beside point values. Paste a link to your hosted image.</td>
          </tr>
        </tbody>
      </table>
      <Callout type="info">
        Renaming your points and adding a custom icon are available on <PlanBadge plan="growth" /> and
        above. On lower plans your points stay named &ldquo;Points.&rdquo;
      </Callout>

      <H2>Points expiry <PlanBadge plan="essential" /></H2>
      <p>
        By default, points <strong>never expire</strong> &mdash; a customer keeps everything they earn.
        On <PlanBadge plan="essential" /> and above you can set an expiry so dormant balances reset,
        which encourages customers to come back and redeem before they lose points.
      </p>
      <table>
        <thead>
          <tr>
            <th>Setting</th>
            <th>Default</th>
            <th>What it does</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <strong>Expiry period</strong>
            </td>
            <td>Never</td>
            <td>
              The number of months of inactivity after which unused points expire. Leave it blank to
              keep points forever.
            </td>
          </tr>
          <tr>
            <td>
              <strong>Expiry reminder</strong>
            </td>
            <td>30 days before</td>
            <td>
              How many days ahead of expiry PerkStack emails the customer a heads-up so they have time
              to redeem. Only used when expiry is turned on.
            </td>
          </tr>
        </tbody>
      </table>
      <Callout type="warning">
        Turning on expiry applies to points customers already hold. Balances that are already older
        than the expiry window will be removed on the next daily check. Let your customers know before
        you switch it on.
      </Callout>

      <H2>Points delay <PlanBadge plan="essential" /></H2>
      <p>
        Points delay (<PlanBadge plan="essential" /> and above) holds points earned on an order for a
        set number of days before they become spendable. That waiting period covers your return
        window, so points from an order that gets refunded never get spent first. It ships{" "}
        <strong>turned off</strong>; the default delay is <strong>30 days</strong> (you can set 1&ndash;365).
      </p>
      <p>
        While points are held, the customer sees them as <strong>pending</strong> in the loyalty
        widget, with the date they&apos;ll become available. Once the delay passes, the points land
        automatically and are ready to redeem.
      </p>

      <H2>Store logo</H2>
      <p>
        Add your store logo so it appears at the top of the storefront loyalty widget and in the emails
        PerkStack sends your customers. Paste a link to your hosted logo image; a square or wide logo
        of at least 200&nbsp;px works well. There&apos;s no logo by default.
      </p>

      <Callout type="tip">
        Plan-gated fields (renaming points, expiry, delay) only require the higher plan when you{" "}
        <em>change</em> them. If you downgrade, your saved values are kept and you can still edit other
        General settings freely &mdash; upgrading again brings the gated fields back.
      </Callout>

      <H2>Related</H2>
      <ul>
        <li>
          <a href="/docs/loyalty/points-system">How Points Work</a>: how balances, pending points, and
          expiry are tracked
        </li>
        <li>
          <a href="/docs/settings/widget-customization">Widget Customization</a>: style the storefront
          launcher and loyalty page
        </li>
        <li>
          <a href="/docs/settings/email">Email &amp; Notifications</a>: sender name, branding, and email
          usage
        </li>
        <li>
          <a href="/docs/settings/billing">Plans &amp; Billing</a>: which plan unlocks renaming, expiry,
          and delay
        </li>
      </ul>
    </div>
  );
}
