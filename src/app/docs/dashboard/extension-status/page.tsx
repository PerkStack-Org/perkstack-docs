import type { Metadata } from "next";
import Callout from "@/components/Callout";
import PlanBadge from "@/components/PlanBadge";

export const metadata: Metadata = {
  title: "Extension Status",
  description:
    "Understand how PerkStack detects and displays the status of each Shopify extension on the dashboard.",
};

export default function ExtensionStatusPage() {
  return (
    <div className="docs-prose">
      <h1>Extension Status</h1>
      <p>
        PerkStack ships with seven Shopify extensions. The dashboard displays a status card for each
        one so you can verify your store is fully configured at a glance.
      </p>

      <h2>How Detection Works</h2>
      <p>When the dashboard loads, PerkStack performs two checks:</p>
      <ol>
        <li>
          <strong>Theme JSON inspection</strong>: reads the main published theme&apos;s JSON
          templates to look for PerkStack app blocks (launcher, review-display, star-rating,
          rewards-page, etc.)
        </li>
        <li>
          <strong>Extension API query</strong>: calls <code>app.extensions()</code> via App Bridge
          to determine which extensions are registered and active for the store
        </li>
      </ol>
      <p>The results are combined to produce the status indicators you see on the dashboard.</p>

      <h2>Extension Reference</h2>
      <table>
        <thead>
          <tr>
            <th>Extension</th>
            <th>Type</th>
            <th>Detection Method</th>
            <th>Plan Required</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Theme App Extension</td>
            <td>Storefront blocks</td>
            <td>Theme JSON inspection</td>
            <td>
              <PlanBadge plan="free" />
            </td>
          </tr>
          <tr>
            <td>Checkout UI Extension</td>
            <td>Checkout block</td>
            <td>Theme JSON + Extension API</td>
            <td>
              <PlanBadge plan="growth" />
            </td>
          </tr>
          <tr>
            <td>Admin Block: Customer Loyalty</td>
            <td>Admin extension</td>
            <td>Extension API</td>
            <td>
              <PlanBadge plan="free" />
            </td>
          </tr>
          <tr>
            <td>Admin Block: Customer Reviews</td>
            <td>Admin extension</td>
            <td>Extension API</td>
            <td>
              <PlanBadge plan="free" />
            </td>
          </tr>
          <tr>
            <td>Customer Account Extension</td>
            <td>Account page</td>
            <td>Extension API</td>
            <td>
              <PlanBadge plan="free" />
            </td>
          </tr>
          <tr>
            <td>App Pixel</td>
            <td>Web pixel</td>
            <td>Extension API</td>
            <td>
              <PlanBadge plan="free" />
            </td>
          </tr>
          <tr>
            <td>Flow Trigger: New Review</td>
            <td>Shopify Flow</td>
            <td>Extension API</td>
            <td>
              <PlanBadge plan="pro" />
            </td>
          </tr>
        </tbody>
      </table>

      <h2>Status Indicators</h2>
      <table>
        <thead>
          <tr>
            <th>Status</th>
            <th>Meaning</th>
            <th>Action Required</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <strong>Active</strong>
            </td>
            <td>Extension is installed and functioning</td>
            <td>None</td>
          </tr>
          <tr>
            <td>
              <strong>Not Installed</strong>
            </td>
            <td>Block is missing from the theme or extension is not active</td>
            <td>Add the block via the theme editor or enable the extension</td>
          </tr>
          <tr>
            <td>
              <strong>Unavailable</strong>
            </td>
            <td>Extension requires a higher plan</td>
            <td>Upgrade your plan to enable</td>
          </tr>
        </tbody>
      </table>

      <Callout type="warning">
        If a block appears as &ldquo;Not Installed&rdquo; but you know you added it, make sure you
        added it to the <strong>main published theme</strong>. Blocks in draft or unpublished themes
        are not detected.
      </Callout>

      <h2>Troubleshooting</h2>
      <ol>
        <li>
          <strong>All blocks show &ldquo;Not Installed&rdquo;</strong>: ensure the PerkStack theme
          app extension is enabled in your theme editor under <strong>App embeds</strong>
        </li>
        <li>
          <strong>Checkout extension is unavailable</strong>: verify you are on the{" "}
          <PlanBadge plan="growth" /> plan or higher, then add the block in{" "}
          <strong>Settings → Checkout → Customize</strong>
        </li>
        <li>
          <strong>Status does not update</strong>: refresh the dashboard page; detection runs on
          each page load
        </li>
      </ol>

      <h2>Related</h2>
      <ul>
        <li>
          <a href="/docs/dashboard/overview">Dashboard Overview</a>: summary metrics and quick links
        </li>
        <li>
          <a href="/docs/advanced/admin-extensions">Admin Extensions</a>: details on the customer
          loyalty and reviews admin blocks
        </li>
        <li>
          <a href="/docs/widgets/overview">Widgets Overview</a>: storefront theme app extension
          blocks
        </li>
      </ul>
    </div>
  );
}
