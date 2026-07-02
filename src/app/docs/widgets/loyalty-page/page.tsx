import type { Metadata } from "next";
import { createDocMetadata } from "@/lib/seo";
import { H2, H3 } from "@/components/Heading";
import Callout from "@/components/Callout";
import PlanBadge from "@/components/PlanBadge";

export const metadata: Metadata = createDocMetadata("/docs/widgets/loyalty-page", {
  title: "Loyalty Page",
  description:
    "Embed a full rewards dashboard on a dedicated storefront page so customers can see their points, tier, ways to earn, and history in one place.",
});

export default function LoyaltyPagePage() {
  return (
    <div className="docs-prose">
      <h1>Loyalty Page</h1>
      <p>
        The Loyalty Page is a full rewards dashboard you embed on a page of your store &mdash; most
        merchants create a dedicated &quot;Rewards&quot; page for it. It gives customers a roomy home
        base for your program, with their balance, tier, ways to earn, referral link, and full
        history all on one page.
      </p>

      <H2>What shoppers see</H2>
      <p>Signed-in shoppers see the full dashboard:</p>
      <ul>
        <li>Their points balance and pending points</li>
        <li>Their VIP tier and progress to the next one</li>
        <li>Ways to earn more points</li>
        <li>Their referral section</li>
        <li>A history of their points activity</li>
      </ul>
      <p>
        Shoppers who aren&apos;t signed in see a welcome hero with a sign-in prompt, so the page
        still works as a landing spot for your program.
      </p>

      <Callout type="info">
        The Loyalty Page is a <strong>storefront</strong> page. It&apos;s different from{" "}
        <a href="/docs/widgets/customer-account">Loyalty Studio</a>, which shows a similar dashboard
        inside Shopify&apos;s customer account area. Use the Loyalty Page for a public
        &quot;Rewards&quot; page; use Loyalty Studio for the signed-in account portal. You can run
        both.
      </Callout>

      <H2>How to add it</H2>
      <ol>
        <li>
          In Shopify admin, create the page you want to use &mdash; for example a page called
          &quot;Rewards&quot; &mdash; under <strong>Online Store &rarr; Pages</strong>.
        </li>
        <li>
          Go to <strong>Online Store &rarr; Themes</strong> and click <strong>Customize</strong>.
        </li>
        <li>
          Navigate to that page in the theme editor, then use <strong>Add block</strong> in a section
          and choose <strong>Loyalty Page</strong>.
        </li>
        <li>
          Adjust the settings below, then click <strong>Save</strong>.
        </li>
      </ol>

      <H2>Theme editor settings</H2>
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
            <td>Guest hero image</td>
            <td>Background image shown to shoppers who aren&apos;t signed in (use roughly 1200&times;600 or larger)</td>
            <td>None</td>
          </tr>
          <tr>
            <td>Color scheme</td>
            <td>Light or dark, or auto to match the shopper&apos;s system setting</td>
            <td>Auto</td>
          </tr>
          <tr>
            <td>Show tier progress</td>
            <td>Show the VIP tier section and progress bar</td>
            <td>On</td>
          </tr>
          <tr>
            <td>Show ways to earn</td>
            <td>Show the list of earning actions</td>
            <td>On</td>
          </tr>
          <tr>
            <td>Show referral section</td>
            <td>Show the customer&apos;s referral link</td>
            <td>On</td>
          </tr>
          <tr>
            <td>Show transaction history</td>
            <td>Show the customer&apos;s points activity history</td>
            <td>On</td>
          </tr>
          <tr>
            <td>Content alignment</td>
            <td>Center or left-align the page content</td>
            <td>Center</td>
          </tr>
          <tr>
            <td>Background / Card background / Primary text / Secondary text</td>
            <td>Optional color overrides for each part of the page</td>
            <td>Follows the color scheme</td>
          </tr>
        </tbody>
      </table>

      <H3>Heading, fonts, and brand come from the app</H3>
      <p>
        Like the launcher, the heading and subheading copy, accent color, fonts, and card radius are
        managed in the app under{" "}
        <a href="/docs/settings/widget-customization">Settings &rarr; Widget Customization</a>, not
        the theme editor. The Loyalty Page and the launcher share those brand settings, so they stay
        consistent. Full brand matching &mdash; custom colors, fonts, and hero &mdash; is available on
        the <PlanBadge plan="growth" /> plan and above.
      </p>

      <Callout type="tip">
        Add your &quot;Rewards&quot; page to your store&apos;s main navigation or footer so customers
        can always find it.
      </Callout>

      <H2>Related</H2>
      <ul>
        <li>
          <a href="/docs/widgets/loyalty-launcher">Loyalty Launcher</a>: the floating rewards button
          that shares the same brand settings.
        </li>
        <li>
          <a href="/docs/widgets/customer-account">Loyalty Studio</a>: the same style of dashboard
          inside the customer account area.
        </li>
        <li>
          <a href="/docs/settings/widget-customization">Widget Customization</a>: set the page&apos;s
          heading, colors, and fonts.
        </li>
        <li>
          <a href="/docs/loyalty/overview">Loyalty Overview</a>: how points, tiers, and rewards work.
        </li>
      </ul>
    </div>
  );
}
