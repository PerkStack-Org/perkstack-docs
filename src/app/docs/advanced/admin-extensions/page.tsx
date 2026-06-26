import type { Metadata } from "next";
import { createDocMetadata } from "@/lib/seo";
import { H2, H3 } from "@/components/Heading";
import Callout from "@/components/Callout";
import PlanBadge from "@/components/PlanBadge";

export const metadata: Metadata = createDocMetadata("/docs/advanced/admin-extensions", {
  title: "Admin Extensions",
  description:
    "Details on the admin block extensions: customer reviews and customer loyalty blocks that appear on customer detail pages in Shopify admin.",
});

export default function AdminExtensionsPage() {
  return (
    <div className="docs-prose">
      <h1>Admin Extensions</h1>
      <p>
        PerkStack includes two admin block extensions that embed directly into the Shopify admin
        customer detail pages. These extensions give you quick access to loyalty and review data
        without leaving the customer profile.
      </p>

      <H2>Admin Block: Customer Reviews</H2>
      <p>
        The <code>admin-customer-reviews</code> extension appears on the customer detail page in the
        Shopify admin. It displays:
      </p>
      <ul>
        <li>A list of all reviews submitted by the customer</li>
        <li>Each review&apos;s product name, rating, and status</li>
        <li>Quick links to the review moderation page in PerkStack</li>
      </ul>
      <p>
        This extension is available on all plans and is automatically installed when PerkStack is
        added to your store.
      </p>

      <H2>Admin Block: Customer Loyalty</H2>
      <p>
        The <code>admin-customer-loyalty</code> extension also appears on the customer detail page.
        It shows:
      </p>
      <ul>
        <li>Current points balance</li>
        <li>
          Current VIP tier (if tiers are enabled on the <PlanBadge plan="growth" /> plan or above)
        </li>
        <li>Tier override status</li>
        <li>A quick action to edit the customer&apos;s tier directly from the admin</li>
      </ul>

      <Callout type="info">
        Both admin blocks are read-only on the <PlanBadge plan="free" /> plan. Editing tier
        information requires the <PlanBadge plan="growth" /> plan or above with VIP tiers enabled.
      </Callout>

      <H2>Technical Details</H2>

      <H3>Authentication</H3>
      <p>
        Admin extensions authenticate using the Shopify admin session. When the extension loads, it:
      </p>
      <ol>
        <li>Obtains the session token from the Shopify admin context</li>
        <li>Sends API requests to PerkStack&apos;s backend with the session token</li>
        <li>The backend validates the token and retrieves the customer data</li>
      </ol>

      <H3>Network Access</H3>
      <p>
        Both extensions declare <code>network_access</code> in their configuration, allowing them to
        make HTTP requests to the PerkStack API. CORS headers are configured on the server to accept
        requests from the Shopify admin domain.
      </p>

      <H3>Data Flow</H3>
      <table>
        <thead>
          <tr>
            <th>Step</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Merchant navigates to a customer in Shopify admin</td>
          </tr>
          <tr>
            <td>2</td>
            <td>Shopify loads the admin block extension in an iframe</td>
          </tr>
          <tr>
            <td>3</td>
            <td>The extension extracts the Shopify customer ID from the admin context</td>
          </tr>
          <tr>
            <td>4</td>
            <td>Authenticated API call to PerkStack fetches loyalty/review data</td>
          </tr>
          <tr>
            <td>5</td>
            <td>Data is rendered in the extension UI</td>
          </tr>
        </tbody>
      </table>

      <H2>Visibility</H2>
      <p>
        Admin blocks appear automatically on customer detail pages once PerkStack is installed.
        Merchants do not need to manually enable them. The blocks appear in the{" "}
        <strong>Apps</strong> section of the customer detail page.
      </p>

      <Callout type="warning">
        If the admin blocks are not visible, ensure PerkStack is properly installed and that you are
        viewing a customer who exists in PerkStack&apos;s database. Customers who have never
        interacted with the loyalty program may not have a PerkStack record yet.
      </Callout>

      <H2>Related</H2>
      <ul>
        <li>
          <a href="/docs/customers/detail">Customer Detail</a>: the PerkStack customer detail page
          (within the app)
        </li>
        <li>
          <a href="/docs/customers/tier-overrides">Tier Overrides</a>: manually set tiers via the
          admin block
        </li>
        <li>
          <a href="/docs/advanced/architecture">Architecture</a>: how extensions communicate with
          the backend
        </li>
      </ul>
    </div>
  );
}
