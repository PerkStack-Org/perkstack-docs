import type { Metadata } from "next";
import { createDocMetadata } from "@/lib/seo";
import { H2, H3 } from "@/components/Heading";
import Callout from "@/components/Callout";

export const metadata: Metadata = createDocMetadata("/docs/getting-started/shopify-setup", {
  title: "Shopify Setup",
  description:
    "Configure theme extensions, app proxy, and webhooks to complete your PerkStack integration.",
});

export default function ShopifySetupPage() {
  return (
    <div className="docs-prose">
      <h1>Shopify Setup</h1>
      <p>
        PerkStack is an embedded Shopify app that runs directly inside your Shopify admin and uses
        Shopify&apos;s native extension system to add functionality to your storefront and checkout.
        This page covers the Shopify-side configuration that makes everything work.
      </p>

      <H2>Embedded App Experience</H2>
      <p>
        After installation, PerkStack appears as an app in your Shopify admin sidebar. The entire
        interface, including settings, analytics, reviews management, and loyalty configuration, is
        rendered inside Shopify using <strong>App Bridge</strong>. You never leave the admin.
      </p>
      <ul>
        <li>No external login required. PerkStack uses your Shopify session.</li>
        <li>
          Navigation uses Shopify&apos;s built-in app nav menu, so it feels like a native part of
          your admin.
        </li>
        <li>
          Forms use the Shopify Contextual Save Bar for saving changes, keeping the UX consistent
          with the rest of your admin.
        </li>
      </ul>

      <H2>Enabling Theme App Extensions</H2>
      <p>
        PerkStack&apos;s storefront widgets are delivered through Shopify&apos;s{" "}
        <strong>theme app extensions</strong>, requiring no code editing. To enable them:
      </p>

      <ol>
        <li>
          Go to <strong>Online Store → Themes</strong> in your Shopify admin.
        </li>
        <li>
          Click <strong>Customize</strong> on your active theme.
        </li>
        <li>
          In the theme editor, click <strong>App embeds</strong> (the puzzle-piece icon in the left
          sidebar).
        </li>
        <li>
          Find <strong>PerkStack</strong> in the list and toggle it <strong>on</strong>.
        </li>
        <li>
          Click <strong>Save</strong>.
        </li>
      </ol>

      <Callout type="info">
        Theme app extensions require an <strong>Online Store 2.0</strong> compatible theme. All free
        Shopify themes (Dawn, Craft, Sense, etc.) support app extensions. If you&apos;re using a
        custom or legacy theme, check with your theme developer.
      </Callout>

      <H3>Available Theme Blocks</H3>
      <p>
        Once the app embed is enabled, you can add PerkStack blocks to any section of your theme.
        The theme app extension includes <strong>8 blocks</strong>:
      </p>

      <table>
        <thead>
          <tr>
            <th>Block</th>
            <th>Where to Use</th>
            <th>What It Does</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Loyalty Launcher</td>
            <td>Global (app embed)</td>
            <td>Floating button that opens the loyalty panel on any page</td>
          </tr>
          <tr>
            <td>Rewards Page</td>
            <td>Dedicated page</td>
            <td>Full rewards catalogue where customers browse and redeem rewards</td>
          </tr>
          <tr>
            <td>Points Balance</td>
            <td>Any section</td>
            <td>Shows the logged-in customer&apos;s current points balance</td>
          </tr>
          <tr>
            <td>Reviews List</td>
            <td>Product page</td>
            <td>Displays all approved reviews for the product</td>
          </tr>
          <tr>
            <td>Review Form</td>
            <td>Product page</td>
            <td>Inline form for submitting a new review</td>
          </tr>
          <tr>
            <td>Star Rating</td>
            <td>Product page / Collection</td>
            <td>Shows the average star rating and review count</td>
          </tr>
          <tr>
            <td>Review Carousel</td>
            <td>Homepage / Landing page</td>
            <td>Scrollable carousel of featured reviews</td>
          </tr>
          <tr>
            <td>Referral Widget</td>
            <td>Any section</td>
            <td>Shareable referral link with reward details</td>
          </tr>
        </tbody>
      </table>

      <Callout type="tip">
        You can add blocks to specific pages by navigating to that page in the theme editor and
        inserting the block into a section. For example, go to a product page template to add the
        Reviews List and Star Rating blocks.
      </Callout>

      <H2>App Proxy</H2>
      <p>
        PerkStack uses a Shopify <strong>app proxy</strong> to securely handle storefront API
        requests. The proxy is configured at:
      </p>
      <pre>
        <code>https://your-store.myshopify.com/apps/perkstack/</code>
      </pre>
      <p>
        This proxy forwards requests from your storefront domain to PerkStack&apos;s servers.
        Shopify verifies the request signature automatically, so no API keys are exposed to the
        browser.
      </p>
      <p>The app proxy handles:</p>
      <ul>
        <li>Loading customer loyalty data (points balance, available rewards)</li>
        <li>Submitting and displaying reviews</li>
        <li>Processing reward redemptions</li>
        <li>Referral link tracking and attribution</li>
      </ul>

      <Callout type="info">
        The app proxy is configured automatically during installation. You don&apos;t need to set it
        up manually. If you need to verify it, check your app settings in the Shopify Partners
        dashboard under <strong>App setup → App proxy</strong>.
      </Callout>

      <H2>Webhook Configuration</H2>
      <p>
        PerkStack automatically registers webhooks during installation. These webhooks keep your
        loyalty and reviews data in sync with your Shopify store in real time.
      </p>

      <H3>Registered Webhooks</H3>
      <table>
        <thead>
          <tr>
            <th>Webhook Topic</th>
            <th>Purpose</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <code>orders/create</code>
            </td>
            <td>Records new orders for point calculation</td>
          </tr>
          <tr>
            <td>
              <code>orders/updated</code>
            </td>
            <td>Handles refunds, cancellations, and order edits</td>
          </tr>
          <tr>
            <td>
              <code>orders/paid</code>
            </td>
            <td>Awards purchase points based on the order total</td>
          </tr>
          <tr>
            <td>
              <code>orders/fulfilled</code>
            </td>
            <td>Triggers the review request email delay timer</td>
          </tr>
          <tr>
            <td>
              <code>customers/create</code>
            </td>
            <td>Awards signup bonus points to new customers</td>
          </tr>
          <tr>
            <td>
              <code>customers/update</code>
            </td>
            <td>Keeps customer profile data in sync</td>
          </tr>
          <tr>
            <td>
              <code>app/uninstalled</code>
            </td>
            <td>Marks the shop as inactive and cleans up sessions</td>
          </tr>
          <tr>
            <td>
              <code>app_subscriptions/update</code>
            </td>
            <td>Syncs billing plan changes (upgrade, downgrade, cancellation)</td>
          </tr>
          <tr>
            <td>GDPR webhooks</td>
            <td>
              Handles <code>customers/data_request</code>, <code>customers/redact</code>, and{" "}
              <code>shop/redact</code> for privacy compliance
            </td>
          </tr>
        </tbody>
      </table>

      <Callout type="warning">
        If points are not being awarded for new orders, or review request emails are not being sent,
        verify that PerkStack&apos;s webhooks are registered. Go to{" "}
        <strong>Settings → Notifications → Webhooks</strong> in your Shopify admin and confirm the
        entries above are listed.
      </Callout>

      <H2>Admin Block Extensions</H2>
      <p>PerkStack adds two admin blocks to your Shopify customer detail pages:</p>
      <ul>
        <li>
          <strong>Customer Loyalty Block</strong>: shows the customer&apos;s points balance, tier
          status, points history, and active rewards. Available on the customer detail page in your
          Shopify admin.
        </li>
        <li>
          <strong>Customer Reviews Block</strong>: lists all reviews submitted by that customer,
          with status indicators (approved, pending, rejected).
        </li>
      </ul>
      <p>
        These blocks appear automatically on customer pages with no setup required. They give your
        support team quick access to loyalty and review data without switching to PerkStack.
      </p>

      <H2>Checkout UI Extension</H2>
      <p>
        PerkStack includes a <strong>checkout UI extension</strong> that displays loyalty
        information during checkout:
      </p>
      <ul>
        <li>Shows how many points the customer will earn from this purchase.</li>
        <li>Displays any active reward discount codes the customer has.</li>
        <li>Reminds customers of their current points balance.</li>
      </ul>

      <Callout type="tip">
        The checkout extension is a great way to remind customers about their loyalty benefits right
        when they&apos;re completing a purchase, encouraging repeat visits.
      </Callout>

      <H2>Customer Account Extension</H2>
      <p>
        If your store uses the <strong>new customer accounts</strong> (Shopify&apos;s extensible
        account pages), PerkStack adds a section where customers can:
      </p>
      <ul>
        <li>View their current points balance and points history</li>
        <li>Browse and redeem available rewards</li>
        <li>See their submitted reviews and statuses</li>
        <li>Access their referral link</li>
      </ul>

      <H2>App Pixel</H2>
      <p>
        PerkStack registers an <strong>app pixel</strong> for tracking storefront events. The pixel
        handles:
      </p>
      <ul>
        <li>Referral link click attribution</li>
        <li>Social share tracking for the social share earn rule</li>
        <li>Storefront analytics events for the PerkStack dashboard</li>
      </ul>
      <p>
        The pixel is lightweight and privacy-respecting, only tracking events relevant to
        PerkStack&apos;s functionality and does not collect any personal data beyond what Shopify
        already provides.
      </p>

      <H2>Troubleshooting</H2>

      <H3>App blocks not appearing in the theme editor</H3>
      <ul>
        <li>
          Make sure you&apos;re using an Online Store 2.0 theme. Legacy themes do not support app
          extensions.
        </li>
        <li>
          Check that the PerkStack app embed is toggled on under{" "}
          <strong>Theme editor → App embeds</strong>.
        </li>
        <li>Try refreshing the theme editor or clearing your browser cache.</li>
      </ul>

      <H3>Webhooks not registered</H3>
      <ul>
        <li>
          Uninstall and reinstall PerkStack. Webhooks are registered during the installation flow.
        </li>
        <li>
          Check the Shopify admin under <strong>Settings → Notifications → Webhooks</strong> for
          PerkStack entries.
        </li>
      </ul>

      <H3>App proxy returning errors</H3>
      <ul>
        <li>
          Verify the app proxy URL at <code>https://your-store.myshopify.com/apps/perkstack/</code>.
        </li>
        <li>
          If you&apos;re self-hosting, ensure your server is reachable and the{" "}
          <code>SHOPIFY_API_SECRET</code> matches the one in your Partners dashboard.
        </li>
      </ul>

      <H2>Next Steps</H2>
      <ul>
        <li>
          <a href="/docs/getting-started/first-time-config">First-Time Configuration</a>: configure
          your earn rules, rewards, and branding
        </li>
      </ul>
    </div>
  );
}
