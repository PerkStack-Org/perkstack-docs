import type { Metadata } from "next";
import { createDocMetadata } from "@/lib/seo";
import { H2, H3 } from "@/components/Heading";
import Callout from "@/components/Callout";

export const metadata: Metadata = createDocMetadata("/docs/loyalty/campaigns", {
  title: "Points Campaigns & Boosts",
  description:
    "Run time-boxed points multipliers in PerkStack so customers earn 2x or more during a scheduled window. Set up, schedule, and track boosts.",
});

export default function CampaignsPage() {
  return (
    <div className="docs-prose">
      <h1>Points Campaigns &amp; Boosts</h1>
      <p>
        A points campaign temporarily multiplies what customers earn &mdash; a &ldquo;2x points
        weekend,&rdquo; a double-points launch day, a holiday boost. It&apos;s a fast way to drive a
        burst of orders and reward activity around a moment that matters. Run campaigns from{" "}
        <strong>PerkStack &rarr; Loyalty &rarr; Campaigns</strong>.
      </p>

      <H2>How a boost works</H2>
      <p>
        A boost applies a multiplier to points earned during a scheduled window. During a 2x boost,
        an action worth 100 points is worth 200; a $50 order earning 50 points earns 100. When the
        window ends, earning returns to normal automatically.
      </p>
      <p>
        Boosts <strong>stack multiplicatively</strong> with VIP tier multipliers. A customer at a 2x
        tier shopping during a 2x boost earns <strong>4x</strong> the base points. See{" "}
        <a href="/docs/loyalty/vip-tiers">VIP Tiers</a> for how tier multipliers work.
      </p>

      <H2>Create a campaign</H2>
      <p>
        In <strong>Loyalty &rarr; Campaigns</strong>, start a new boost and set:
      </p>
      <table>
        <thead>
          <tr>
            <th>Setting</th>
            <th>Default</th>
            <th>Notes</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <strong>Name</strong>
            </td>
            <td>Optional</td>
            <td>
              Leave blank and the campaign shows as &ldquo;2x boost&rdquo; (its multiplier) to you.
            </td>
          </tr>
          <tr>
            <td>
              <strong>Multiplier</strong>
            </td>
            <td>2</td>
            <td>How much to multiply earning. Up to 10x.</td>
          </tr>
          <tr>
            <td>
              <strong>Duration (hours)</strong>
            </td>
            <td>48</td>
            <td>How long the boost runs once it starts.</td>
          </tr>
          <tr>
            <td>
              <strong>Schedule</strong>
            </td>
            <td>Start now</td>
            <td>Start immediately, or pick a future date and time to start later.</td>
          </tr>
        </tbody>
      </table>

      <Callout type="info">
        Only one boost runs at a time. Starting a new campaign automatically stops the one currently
        running &mdash; there&apos;s no accidental overlap. You can also stop a running boost early at
        any time.
      </Callout>

      <H2>Track your campaigns</H2>
      <p>The Campaigns page organizes boosts into three groups:</p>
      <ul>
        <li>
          <strong>Live</strong> &mdash; the boost running right now.
        </li>
        <li>
          <strong>Scheduled</strong> &mdash; boosts set to start later.
        </li>
        <li>
          <strong>Past</strong> &mdash; finished boosts, each with its own results.
        </li>
      </ul>
      <p>
        For a finished campaign you can see how it performed &mdash; points issued, how many
        customers earned, orders and revenue during the window, redemptions, and how those compare to
        the period before it &mdash; so you know whether to run it again.
      </p>

      <H2>What the shopper sees</H2>
      <p>
        While a boost is live, the loyalty launcher shows a countdown banner so customers feel the
        urgency to shop before it ends.
      </p>

      <H3>Start a boost from Shopify Flow</H3>
      <p>
        You can also kick off a boost automatically as part of a Shopify Flow &mdash; for example,
        tied to a sale or a scheduled trigger. Campaigns started this way are labelled{" "}
        &ldquo;Started by Flow.&rdquo; See{" "}
        <a href="/docs/integrations/shopify-flow">Shopify Flow</a> to set it up.
      </p>

      <Callout type="tip">
        Announce a boost ahead of time by scheduling it and promoting the start on email and social.
        A countdown people know is coming drives more traffic than a surprise.
      </Callout>

      <H2>Related</H2>
      <ul>
        <li>
          <a href="/docs/loyalty/vip-tiers">VIP Tiers</a>: tier multipliers that stack with boosts.
        </li>
        <li>
          <a href="/docs/loyalty/earn-rules">Ways to Earn</a>: the base points a boost multiplies.
        </li>
        <li>
          <a href="/docs/integrations/shopify-flow">Shopify Flow</a>: start a boost automatically.
        </li>
        <li>
          <a href="/docs/dashboard/analytics">Analytics</a>: see the impact across your whole program.
        </li>
      </ul>
    </div>
  );
}
