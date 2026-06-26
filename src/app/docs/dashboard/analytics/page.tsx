import type { Metadata } from "next";
import { createDocMetadata } from "@/lib/seo";
import { H2, H3 } from "@/components/Heading";
import Callout from "@/components/Callout";
import PlanBadge from "@/components/PlanBadge";

export const metadata: Metadata = createDocMetadata("/docs/dashboard/analytics", {
  title: "Dashboard Analytics",
  description:
    "Explore loyalty and review analytics including points trends, top spenders, top products, review approval rates, and chart visualizations.",
});

export default function DashboardAnalyticsPage() {
  return (
    <div className="docs-prose">
      <h1>Dashboard Analytics</h1>
      <p>
        The analytics page (<strong>PerkStack → Analytics</strong>) gives you a deeper view into
        your loyalty program and review performance over time. All charts are rendered using Polaris
        Viz and adapt to your selected date range.
      </p>

      <H2>Data Retention by Plan</H2>
      <p>The amount of historical data available depends on your plan:</p>
      <table>
        <thead>
          <tr>
            <th>Plan</th>
            <th>Dashboard History</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <PlanBadge plan="free" />
            </td>
            <td>30 days</td>
          </tr>
          <tr>
            <td>
              <PlanBadge plan="essential" />
            </td>
            <td>90 days</td>
          </tr>
          <tr>
            <td>
              <PlanBadge plan="growth" />
            </td>
            <td>180 days</td>
          </tr>
          <tr>
            <td>
              <PlanBadge plan="studio" />
            </td>
            <td>Unlimited</td>
          </tr>
        </tbody>
      </table>

      <Callout type="info">
        All data is still stored regardless of your plan. Upgrading immediately unlocks the full
        history without any gaps.
      </Callout>

      <H2>Loyalty Metrics</H2>
      <p>
        The loyalty section of the analytics page tracks the health and engagement of your rewards
        program:
      </p>

      <H3>Points Earned &amp; Redeemed</H3>
      <p>
        A line chart showing daily points earned and points redeemed over the selected period. Use
        this to spot trends. A healthy program shows consistent earning activity with growing
        redemption rates.
      </p>

      <H3>Active Customers</H3>
      <p>
        Tracks the number of unique customers who earned or redeemed points each day. A rising
        active customer count indicates that your loyalty program is reaching more of your customer
        base.
      </p>

      <H3>Top Spenders</H3>
      <p>
        A ranked list of customers with the highest lifetime points earned. This helps you identify
        your most valuable customers and consider VIP tier placement or manual rewards.
      </p>

      <H3>Top Rewards</H3>
      <p>
        Shows which rewards are redeemed most frequently. Use this data to optimise your reward
        catalogue. Double down on popular rewards and reconsider underperforming ones.
      </p>

      <H2>Reviews Metrics</H2>
      <p>
        The reviews section provides insight into your review collection and moderation pipeline:
      </p>

      <H3>Total Reviews</H3>
      <p>
        A cumulative count of all reviews submitted to your store, broken down by status (approved,
        pending, rejected, spam).
      </p>

      <H3>Monthly Trends</H3>
      <p>
        A bar chart showing the number of reviews submitted per month. Look for seasonal patterns or
        the impact of review request email campaigns.
      </p>

      <H3>Approval Rate</H3>
      <p>
        The percentage of reviews that are approved versus total submissions. A high approval rate
        (above 80%) is typical for stores with genuine customer traffic. A low rate may indicate
        spam or a need to adjust your auto-approve threshold.
      </p>

      <H3>Top Reviewed Products</H3>
      <p>
        A ranked list of products with the most reviews. This helps you identify which products
        generate the most customer feedback and which may benefit from more review request emails.
      </p>

      <H2>Using the Charts</H2>
      <p>All charts support the following interactions:</p>
      <ul>
        <li>
          <strong>Hover</strong>: shows exact values for a specific data point
        </li>
        <li>
          <strong>Date range selector</strong>: filter data to a specific period within your
          plan&apos;s retention window
        </li>
        <li>
          <strong>Responsive layout</strong>: charts adapt to your screen size
        </li>
      </ul>

      <Callout type="tip">
        Export your analytics data on the <PlanBadge plan="studio" /> plan. Use the export button
        to download a CSV of the raw data behind any chart.
      </Callout>

      <H2>Related</H2>
      <ul>
        <li>
          <a href="/docs/dashboard/overview">Dashboard Overview</a>: summary metrics and quick links
        </li>
        <li>
          <a href="/docs/settings/billing">Billing &amp; Plans</a>: upgrade for extended data
          retention
        </li>
        <li>
          <a href="/docs/advanced/web-pixel">Web Pixel</a>: how storefront events feed into
          analytics
        </li>
      </ul>
    </div>
  );
}
