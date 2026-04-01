import type { Metadata } from "next";
import Callout from "@/components/Callout";
import PlanBadge from "@/components/PlanBadge";

export const metadata: Metadata = {
  title: "Birthday Rewards",
  description:
    "Reward customers with loyalty points on their birthday, including setup, date collection, and how the automated birthday scan works.",
};

export default function BirthdayRewardsPage() {
  return (
    <div className="docs-prose">
      <h1>
        Birthday Rewards <PlanBadge plan="growth" />
      </h1>
      <p>
        Birthday rewards let you surprise customers with bonus loyalty points on their special day.
        This feature creates a personal connection with your customers and gives them a reason to
        return to your store each year.
      </p>

      <Callout type="info">
        Birthday rewards require the Custom Rewards feature available on the{" "}
        <PlanBadge plan="growth" /> plan or above. The birthday earn rule is inactive by default and
        must be enabled from <strong>PerkStack → Loyalty → Earn Rules</strong>.
      </Callout>

      <h2>How It Works</h2>
      <ol>
        <li>
          A customer sets their date of birth through the storefront via the{" "}
          <code>/api/birthday</code> endpoint
        </li>
        <li>
          PerkStack stores the birthday as a one-time setting, so customers cannot change their date
          of birth after it has been set
        </li>
        <li>
          The <strong>birthday-scan</strong> background worker runs daily at{" "}
          <strong>8:00 AM</strong> and checks for customers whose birthday matches the current date
        </li>
        <li>
          If the birthday earn rule is active, matching customers are awarded the configured number
          of points (default: 200 points)
        </li>
      </ol>

      <h2>Configuration</h2>

      <table>
        <thead>
          <tr>
            <th>Setting</th>
            <th>Default</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Points awarded</td>
            <td>200</td>
            <td>Number of points to award on the customer&apos;s birthday</td>
          </tr>
          <tr>
            <td>Rule status</td>
            <td>Inactive</td>
            <td>Must be toggled to active before birthday points are awarded</td>
          </tr>
        </tbody>
      </table>

      <h2>Date of Birth Collection</h2>
      <p>
        Customers provide their date of birth through the <code>/api/birthday</code> API endpoint,
        typically surfaced via the loyalty widget on your storefront. Key behaviors:
      </p>
      <ul>
        <li>
          <strong>One-time set</strong>: once a customer submits their date of birth, it cannot be
          changed. This prevents abuse by repeatedly changing the date to earn multiple birthday
          rewards
        </li>
        <li>
          <strong>Optional</strong>: customers are not required to provide their birthday. Only
          customers who have set a date of birth are eligible for birthday points
        </li>
      </ul>

      <Callout type="warning">
        The date of birth is a one-time, immutable setting. Make sure your storefront UI clearly
        communicates this to customers before they submit, so they enter the correct date.
      </Callout>

      <h2>Birthday Scan Worker</h2>
      <p>The automated birthday scan is handled by a background worker:</p>

      <table>
        <thead>
          <tr>
            <th>Property</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Worker name</td>
            <td>
              <code>birthday-scan</code>
            </td>
          </tr>
          <tr>
            <td>Schedule</td>
            <td>Daily at 8:00 AM</td>
          </tr>
          <tr>
            <td>Behavior</td>
            <td>
              Scans all customers with a stored birthday matching today&apos;s date, then awards
              points if the birthday earn rule is active
            </td>
          </tr>
        </tbody>
      </table>

      <Callout type="tip">
        Birthday rewards are awarded once per year. If the birthday earn rule was inactive on a
        customer&apos;s birthday, they will not receive points retroactively. The award only happens
        when the worker runs and the rule is active.
      </Callout>

      <h2>Related</h2>
      <ul>
        <li>
          <a href="/docs/loyalty/earn-rules">Earn Rules</a>: manage the birthday earn rule alongside
          other rules
        </li>
        <li>
          <a href="/docs/loyalty/points-system">Points System</a>: how birthday points are recorded
          in the ledger
        </li>
        <li>
          <a href="/docs/loyalty/overview">Loyalty Overview</a>: how the loyalty system works
        </li>
      </ul>
    </div>
  );
}
