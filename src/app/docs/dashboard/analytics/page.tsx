import type { Metadata } from "next";
import { createDocMetadata } from "@/lib/seo";
import { H2 } from "@/components/Heading";
import Callout from "@/components/Callout";
import PlanBadge from "@/components/PlanBadge";

export const metadata: Metadata = createDocMetadata("/docs/dashboard/analytics", {
  title: "Analytics",
  description:
    "PerkStack Analytics: six tabs covering members, points, rewards, reviews, and referrals, with revenue attribution, plan-based history windows, and a weekly digest.",
});

export default function DashboardAnalyticsPage() {
  return (
    <div className="docs-prose">
      <h1>Analytics</h1>
      <p>
        Analytics (<strong>PerkStack → Analytics</strong>) is where you measure whether your loyalty
        and reviews program is paying off. It brings together attributed revenue, program engagement,
        and review activity so you can see what&apos;s working and double down.
      </p>

      <H2>The six tabs</H2>
      <p>Analytics is organized into six tabs, each answering a different question:</p>
      <table>
        <thead>
          <tr>
            <th>Tab</th>
            <th>What it shows</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <strong>Overview</strong>
            </td>
            <td>The headline numbers: attributed revenue, orders, average order value, and active members</td>
          </tr>
          <tr>
            <td>
              <strong>Customers</strong>
            </td>
            <td>How your member base is growing and who is most engaged</td>
          </tr>
          <tr>
            <td>
              <strong>Points</strong>
            </td>
            <td>Your points economy: how many are issued, redeemed, and outstanding</td>
          </tr>
          <tr>
            <td>
              <strong>Rewards</strong>
            </td>
            <td>Which rewards customers redeem most and how the redemption funnel performs</td>
          </tr>
          <tr>
            <td>
              <strong>Reviews</strong>
            </td>
            <td>Review volume, ratings, and how requests turn into published reviews</td>
          </tr>
          <tr>
            <td>
              <strong>Referrals &amp; engagement</strong>
            </td>
            <td>How referrals and other engagement actions are performing</td>
          </tr>
        </tbody>
      </table>

      <H2>Revenue attribution</H2>
      <p>
        PerkStack tracks which orders came from your loyalty program and referrals, so you can see
        the revenue your program actually drives — not just points and reviews in isolation. That
        attributed revenue, along with the orders and average order value behind it, appears on the
        Overview tab.
      </p>

      <Callout type="tip">
        Attribution is what turns loyalty from a cost into a measurable investment. Watch attributed
        revenue and repeat-order rate over time to judge whether your rewards are generous enough.
      </Callout>

      <H2>How far back you can look</H2>
      <p>The history window available in Analytics depends on your plan:</p>
      <table>
        <thead>
          <tr>
            <th>Plan</th>
            <th>History window</th>
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
      <p>
        Date presets beyond your plan&apos;s window are shown but locked, labeled with the plan that
        unlocks them. Your data is never lost — upgrading immediately opens up the fuller history.
      </p>

      <H2>Advanced analytics <PlanBadge plan="growth" /></H2>
      <p>
        On the <PlanBadge plan="growth" /> plan and above, Analytics adds deeper tools for
        understanding trends and behavior:
      </p>
      <ul>
        <li>
          <strong>Period comparisons</strong>: measure this period against the last to spot changes.
        </li>
        <li>
          <strong>Funnels</strong>: see where customers drop off between earning and redeeming.
        </li>
        <li>
          <strong>Cohort retention</strong>: track how groups of customers keep coming back over
          time.
        </li>
        <li>
          <strong>CSV export</strong>: download the data behind any report for your own analysis.
        </li>
      </ul>

      <H2>Weekly digest email</H2>
      <p>
        PerkStack emails you a weekly digest summarizing your program&apos;s recent performance, so
        the key numbers reach you without opening the app. It is on by default. To turn it off, use
        the digest toggle in <a href="/docs/settings/email">Email &amp; Notifications</a>.
      </p>

      <Callout type="info">
        Everything customer-facing keeps working regardless of plan — the plan only changes how much
        history and how many advanced views you can access here.
      </Callout>

      <H2>Related</H2>
      <ul>
        <li>
          <a href="/docs/dashboard/overview">Dashboard Overview</a>: the at-a-glance summary
        </li>
        <li>
          <a href="/docs/settings/billing">Plans &amp; Billing</a>: unlock longer history and advanced
          analytics
        </li>
        <li>
          <a href="/docs/settings/email">Email &amp; Notifications</a>: manage the weekly digest
        </li>
        <li>
          <a href="/docs/loyalty/referrals">Referrals</a>: the program behind the referrals metrics
        </li>
      </ul>
    </div>
  );
}
