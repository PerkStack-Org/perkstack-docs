import type { Metadata } from "next";
import Callout from "@/components/Callout";
import PlanBadge from "@/components/PlanBadge";

export const metadata: Metadata = {
  title: "Dashboard Overview",
  description:
    "Understand the PerkStack dashboard: key metrics, extension status cards, theme block detection, and quick links.",
};

export default function DashboardOverviewPage() {
  return (
    <div className="docs-prose">
      <h1>Dashboard Overview</h1>
      <p>
        When you open PerkStack from your Shopify admin, the first screen you see is the dashboard.
        It gives you an at-a-glance summary of your loyalty program and review performance, shows
        which storefront extensions are active, and provides quick links to the areas you use most.
      </p>

      <h2>Key Metrics</h2>
      <p>
        The top of the dashboard displays summary cards for the most important metrics across your
        loyalty program and reviews:
      </p>
      <table>
        <thead>
          <tr>
            <th>Metric</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <strong>Total Points Earned</strong>
            </td>
            <td>Cumulative points earned across all customers</td>
          </tr>
          <tr>
            <td>
              <strong>Total Points Redeemed</strong>
            </td>
            <td>Cumulative points redeemed for rewards</td>
          </tr>
          <tr>
            <td>
              <strong>Active Customers</strong>
            </td>
            <td>Customers who have earned or redeemed points recently</td>
          </tr>
          <tr>
            <td>
              <strong>Total Reviews</strong>
            </td>
            <td>All reviews submitted to your store</td>
          </tr>
          <tr>
            <td>
              <strong>Pending Reviews</strong>
            </td>
            <td>Reviews awaiting moderation</td>
          </tr>
          <tr>
            <td>
              <strong>Average Rating</strong>
            </td>
            <td>Mean star rating across all approved reviews</td>
          </tr>
        </tbody>
      </table>

      <Callout type="tip">
        Dashboard metrics update in real time. If you&apos;ve just approved a batch of reviews or a
        large order came through, refresh the page to see the latest numbers.
      </Callout>

      <h2>Theme Block Detection</h2>
      <p>
        PerkStack automatically inspects your store&apos;s main published theme to determine which
        app blocks are installed. It reads the theme&apos;s JSON templates and checks for the
        presence of PerkStack blocks such as:
      </p>
      <ul>
        <li>
          <strong>Loyalty Launcher</strong>: the floating widget that opens the rewards panel
        </li>
        <li>
          <strong>Review Display</strong>: the review list on product pages
        </li>
        <li>
          <strong>Star Rating</strong>: inline star ratings on product cards and pages
        </li>
        <li>
          <strong>Rewards Page</strong>: a dedicated page listing available rewards
        </li>
        <li>
          <strong>Checkout Extension</strong>: points display at checkout
        </li>
      </ul>
      <p>
        For each block, the dashboard shows a green checkmark if it is present in the theme or a
        warning indicator if it is missing. This helps you verify that your storefront is fully
        configured without having to open the theme editor.
      </p>

      <Callout type="info">
        Block detection reads the <strong>main published theme</strong> only. If you have blocks
        installed on a draft or unpublished theme, they will not appear as active on the dashboard
        until that theme is published.
      </Callout>

      <h2>Extension Status Cards</h2>
      <p>
        Below the theme block detection section, extension status cards show the state of each
        Shopify extension bundled with PerkStack:
      </p>
      <table>
        <thead>
          <tr>
            <th>Extension</th>
            <th>Type</th>
            <th>Status Indicator</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Theme App Extension</td>
            <td>Storefront blocks</td>
            <td>Active / Not installed</td>
          </tr>
          <tr>
            <td>Checkout UI Extension</td>
            <td>Checkout block</td>
            <td>Active / Not installed</td>
          </tr>
          <tr>
            <td>Admin Block: Loyalty</td>
            <td>Admin extension</td>
            <td>Active</td>
          </tr>
          <tr>
            <td>Admin Block: Reviews</td>
            <td>Admin extension</td>
            <td>Active</td>
          </tr>
          <tr>
            <td>Customer Account</td>
            <td>Account extension</td>
            <td>Active / Not installed</td>
          </tr>
          <tr>
            <td>App Pixel</td>
            <td>Web pixel</td>
            <td>Active</td>
          </tr>
          <tr>
            <td>Flow Trigger</td>
            <td>Shopify Flow</td>
            <td>Active</td>
          </tr>
        </tbody>
      </table>

      <Callout type="warning">
        The Checkout UI Extension requires the <PlanBadge plan="growth" /> plan or higher. If you
        are on the Free plan, it will appear as unavailable until you upgrade.
      </Callout>

      <h2>Quick Links</h2>
      <p>The dashboard provides shortcut links to the most commonly used areas of PerkStack:</p>
      <ul>
        <li>
          <a href="/docs/customers/management">Customer Management</a>: view and manage your loyalty
          customers
        </li>
        <li>
          <a href="/docs/reviews/moderation">Review Moderation</a>: approve, reject, and reply to
          reviews
        </li>
        <li>
          <a href="/docs/settings/general">Settings</a>: configure your loyalty program and review
          settings
        </li>
        <li>
          <a href="/docs/settings/widget-customization">Widget Customization</a>: style the
          storefront launcher
        </li>
        <li>
          <a href="/docs/dashboard/analytics">Analytics</a>: dive deeper into loyalty and review
          metrics
        </li>
      </ul>

      <h2>Related</h2>
      <ul>
        <li>
          <a href="/docs/dashboard/analytics">Dashboard Analytics</a>: detailed charts and metric
          breakdowns
        </li>
        <li>
          <a href="/docs/dashboard/extension-status">Extension Status</a>: full reference for each
          extension&apos;s status detection
        </li>
        <li>
          <a href="/docs/getting-started/first-time-config">First-Time Configuration</a>: initial
          setup walkthrough
        </li>
      </ul>
    </div>
  );
}
