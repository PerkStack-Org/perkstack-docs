import type { Metadata } from "next";
import { createDocMetadata } from "@/lib/seo";
import { H2, H3 } from "@/components/Heading";
import Callout from "@/components/Callout";
import PlanBadge from "@/components/PlanBadge";

export const metadata: Metadata = createDocMetadata("/docs/widgets/customer-account", {
  title: "Customer Account Extension",
  description:
    "Give customers a full loyalty hub inside their Shopify account portal with points, transactions, tiers, rewards, and referrals.",
});

export default function CustomerAccountPage() {
  return (
    <div className="docs-prose">
      <h1>Customer Account Extension</h1>
      <p>
        The Customer Account extension adds a full loyalty page to the Shopify customer account
        portal. It gives logged-in customers a dedicated hub where they can view their points
        balance, browse transaction history, check their VIP tier, redeem rewards, and share their
        referral link, all within the familiar customer account experience.
      </p>

      <PlanBadge plan="free" />

      <H2>How It Works</H2>
      <p>
        This is a <strong>customer account extension</strong> that targets{" "}
        <code>customer-account.page.render</code>. It adds a new page to the customer account portal
        navigation. When a customer visits this page, the extension:
      </p>
      <ol>
        <li>Decodes the Shopify session JWT to identify the customer and store.</li>
        <li>
          Fetches data from the PerkStack app proxy APIs (points, rewards, referral, tiers,
          transaction history).
        </li>
        <li>Renders a full loyalty dashboard within the customer account portal.</li>
      </ol>

      <Callout type="info">
        The extension uses Shopify&apos;s session JWT for authentication, so no separate login is
        required. Customers are automatically authenticated when they access their account.
      </Callout>

      <H2>Placement</H2>
      <p>
        The Customer Account extension is registered automatically when PerkStack is installed. It
        appears as a new page in the customer account navigation. No manual theme editor
        configuration is needed.
      </p>
      <ol>
        <li>Install PerkStack from the Shopify App Store (if not already installed).</li>
        <li>
          The &quot;Rewards&quot; page will appear in the customer account portal navigation
          automatically.
        </li>
      </ol>

      <Callout type="tip">
        You can customise the page title and menu label from the PerkStack admin under{" "}
        <strong>Settings &gt; Widgets</strong>.
      </Callout>

      <H2>Page Sections</H2>

      <H3>Points Balance</H3>
      <p>
        A summary card showing the customer&apos;s current points balance and lifetime earned
        points. If the customer has enough points to redeem a reward, a call-to-action highlights
        this.
      </p>

      <H3>Transaction History</H3>
      <p>
        A chronological list of all points transactions, both earned and spent. Each entry shows:
      </p>
      <ul>
        <li>Date of the transaction</li>
        <li>Description (e.g. &quot;Order #1234&quot;, &quot;Reward redeemed&quot;)</li>
        <li>Points earned or spent</li>
        <li>Running balance after the transaction</li>
      </ul>

      <H3>VIP Tier</H3>
      <p>
        If VIP tiers are enabled, this section shows the customer&apos;s current tier, tier
        benefits, and a progress bar indicating how close they are to the next tier.
      </p>

      <H3>Available Rewards</H3>
      <p>
        A grid of rewards the customer can redeem. Each card shows the reward name, points cost, and
        a redeem button. When redeemed, the customer receives a discount code they can apply at
        checkout.
      </p>

      <H3>Referral Link</H3>
      <p>
        The customer&apos;s unique referral URL with a copy button and social sharing options. This
        section also shows how many successful referrals the customer has made and the points earned
        from referrals.
      </p>

      <H2>API Endpoints</H2>
      <p>The extension calls the same app proxy APIs used by the storefront widgets:</p>
      <table>
        <thead>
          <tr>
            <th>Endpoint</th>
            <th>Data</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <code>/apps/perkstack/api/points</code>
            </td>
            <td>Points balance, lifetime points, tier info</td>
          </tr>
          <tr>
            <td>
              <code>/api/rewards</code>
            </td>
            <td>Available rewards catalogue</td>
          </tr>
          <tr>
            <td>
              <code>/api/referral</code>
            </td>
            <td>Referral link, referral stats</td>
          </tr>
          <tr>
            <td>
              <code>/api/earn-rules</code>
            </td>
            <td>Active earn rules</td>
          </tr>
        </tbody>
      </table>

      <H2>Authentication</H2>
      <p>
        The extension decodes the Shopify session JWT provided by the customer account portal. This
        JWT contains the customer ID and shop domain, which are used to authenticate API requests.
        No additional authentication flow is required from the customer.
      </p>

      <Callout type="warning">
        The customer account extension only works for logged-in customers. It does not appear for
        guest checkouts or unauthenticated visitors.
      </Callout>

      <H2>Differences from the Loyalty Page Widget</H2>
      <table>
        <thead>
          <tr>
            <th>Feature</th>
            <th>Customer Account Extension</th>
            <th>Loyalty Page Widget</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Location</td>
            <td>Customer account portal</td>
            <td>Storefront page (Online Store)</td>
          </tr>
          <tr>
            <td>Authentication</td>
            <td>Automatic via session JWT</td>
            <td>Requires customer to be logged in to the store</td>
          </tr>
          <tr>
            <td>Transaction history</td>
            <td>Included</td>
            <td>Not included</td>
          </tr>
          <tr>
            <td>Guest access</td>
            <td>Not available (account-only)</td>
            <td>Available with limited view</td>
          </tr>
          <tr>
            <td>Setup</td>
            <td>Automatic, no theme editor needed</td>
            <td>Requires theme editor setup</td>
          </tr>
        </tbody>
      </table>

      <H2>Troubleshooting</H2>
      <ul>
        <li>
          <strong>Page not appearing in customer account</strong>: ensure PerkStack is installed and
          the app is approved. The extension registers automatically.
        </li>
        <li>
          <strong>Data not loading</strong>: check that the app proxy is configured correctly in
          your Shopify app settings.
        </li>
        <li>
          <strong>Customer sees zero points</strong>: the customer may not have earned any points
          yet, or there may be a mismatch between the customer ID in the JWT and the loyalty
          records. Check the customer profile in PerkStack admin.
        </li>
        <li>
          <strong>Extension not rendering</strong>: verify your store has the new customer account
          experience enabled (not the legacy account page).
        </li>
      </ul>
    </div>
  );
}
