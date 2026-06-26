import type { Metadata } from "next";
import { createDocMetadata } from "@/lib/seo";
import { H2, H3 } from "@/components/Heading";
import Callout from "@/components/Callout";
import PlanBadge from "@/components/PlanBadge";

export const metadata: Metadata = createDocMetadata("/docs/widgets/loyalty-page", {
  title: "Loyalty Page",
  description:
    "Add a full-page loyalty program display to your storefront showing earn rules, rewards, tiers, and referral information.",
});

export default function LoyaltyPagePage() {
  return (
    <div className="docs-prose">
      <h1>Loyalty Page</h1>
      <p>
        The Loyalty Page widget provides a full-page, dedicated display of your entire loyalty
        program. Unlike the compact Loyalty Launcher panel, this page gives you room to showcase all
        earn rules, available rewards, VIP tiers, and your referral program in a spacious, branded
        layout.
      </p>

      <PlanBadge plan="free" />

      <H2>How It Works</H2>
      <p>
        The widget is rendered by <code>loyalty-page.liquid</code> and uses a <code>section</code>{" "}
        target. It loads <code>perkstack-loyalty-page.js</code> to handle dynamic data fetching and
        interactive elements.
      </p>
      <p>
        When the page loads, the script fetches data from the same app proxy APIs used by the
        Loyalty Launcher (points balance, earn rules, rewards, referral info, and tier information)
        and renders them in a full-page layout.
      </p>

      <H2>Placement</H2>
      <ol>
        <li>
          In your Shopify admin, create a new <strong>page</strong> (e.g. titled &quot;Rewards&quot;
          or &quot;Loyalty Program&quot;) under <strong>Online Store &gt; Pages</strong>.
        </li>
        <li>
          Go to <strong>Online Store &gt; Themes &gt; Customize</strong>.
        </li>
        <li>
          In the template dropdown at the top of the theme editor, select or create a template for
          the page you just created.
        </li>
        <li>
          Click <strong>Add section</strong> and search for <strong>PerkStack Loyalty Page</strong>.
        </li>
        <li>
          Remove any default content sections from the template so the loyalty page is the primary
          content.
        </li>
        <li>
          Click <strong>Save</strong>, then assign this template to your Rewards page.
        </li>
      </ol>

      <Callout type="tip">
        Add the loyalty page to your store&apos;s main navigation so customers can easily find it. A
        link like &quot;Rewards&quot; in the header menu works well.
      </Callout>

      <H2>Page Sections</H2>
      <p>
        The loyalty page is divided into several sections, each of which can be toggled on or off:
      </p>

      <H3>Points Balance</H3>
      <p>
        For logged-in customers, a prominent banner shows their current points balance and lifetime
        earned points. Guests see a prompt to log in or create an account.
      </p>

      <H3>Earn Rules</H3>
      <p>A visual list of all the ways customers can earn points, including:</p>
      <ul>
        <li>Placing an order (points per dollar spent)</li>
        <li>Creating an account</li>
        <li>Leaving a product review</li>
        <li>Referring a friend</li>
        <li>Birthday bonus</li>
        <li>Social media follows</li>
      </ul>

      <H3>Available Rewards</H3>
      <p>
        A grid of rewards customers can redeem with their points. Each reward card shows the reward
        name, points cost, and a redeem button (if the customer has enough points).
      </p>

      <H3>VIP Tiers</H3>
      <p>
        If your loyalty program uses VIP tiers, this section displays the tier ladder with
        requirements, benefits, and the customer&apos;s current tier highlighted.
      </p>

      <Callout type="info">
        VIP tiers are available on the <PlanBadge plan="growth" /> plan and above. If tiers are not
        enabled, this section is hidden automatically.
      </Callout>

      <H3>Referral Program</H3>
      <p>
        Shows the customer&apos;s unique referral link, the reward for both referrer and referee,
        and sharing options (copy link, email, social media).
      </p>

      <H2>Configuration</H2>
      <table>
        <thead>
          <tr>
            <th>Setting</th>
            <th>Description</th>
            <th>Default</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Page heading</td>
            <td>Main title at the top of the page</td>
            <td>&quot;Our Rewards Program&quot;</td>
          </tr>
          <tr>
            <td>Show earn rules</td>
            <td>Toggle the earn rules section</td>
            <td>Enabled</td>
          </tr>
          <tr>
            <td>Show rewards</td>
            <td>Toggle the available rewards section</td>
            <td>Enabled</td>
          </tr>
          <tr>
            <td>Show tiers</td>
            <td>Toggle the VIP tiers section (only if tiers are configured)</td>
            <td>Enabled</td>
          </tr>
          <tr>
            <td>Show referral</td>
            <td>Toggle the referral program section</td>
            <td>Enabled</td>
          </tr>
        </tbody>
      </table>

      <H2>Guest Experience</H2>
      <p>
        When a guest (not logged in) visits the loyalty page, they see the full program details
        (earn rules, rewards catalogue, and tier information), but personalised elements like points
        balance and referral link are replaced with a call-to-action prompting them to create an
        account or log in.
      </p>

      <H2>Troubleshooting</H2>
      <ul>
        <li>
          <strong>Page is blank</strong>: ensure the PerkStack Loyalty Page section is added to the
          correct page template and that the template is assigned to the page.
        </li>
        <li>
          <strong>Tiers not showing</strong>: VIP tiers require the <PlanBadge plan="growth" /> plan
          and must be configured in PerkStack admin under <strong>Loyalty &gt; Tiers</strong>.
        </li>
        <li>
          <strong>Points balance not updating</strong>: the page fetches data on load. A manual
          refresh updates the balance.
        </li>
      </ul>
    </div>
  );
}
