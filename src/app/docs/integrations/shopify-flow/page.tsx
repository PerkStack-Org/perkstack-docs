import type { Metadata } from "next";
import { createDocMetadata } from "@/lib/seo";
import { H2, H3 } from "@/components/Heading";
import Callout from "@/components/Callout";
import PlanBadge from "@/components/PlanBadge";

export const metadata: Metadata = createDocMetadata("/docs/integrations/shopify-flow", {
  title: "Shopify Flow",
  description:
    "Automate your loyalty and reviews program with Shopify Flow. Trigger workflows when reviews come in, and let Flow run PerkStack actions like approving reviews or launching a points boost.",
});

export default function ShopifyFlowPage() {
  return (
    <div className="docs-prose">
      <h1>
        Shopify Flow <PlanBadge plan="growth" />
      </h1>
      <p>
        PerkStack connects to Shopify Flow so you can automate your loyalty and reviews program
        without writing any code. Flow reacts to things that happen in PerkStack (like a new review
        landing) and can also run PerkStack actions as part of any workflow you build. Chain these
        with Shopify&apos;s other Flow steps to route work, tag customers, send messages, and launch
        promotions automatically.
      </p>

      <Callout type="info">
        Shopify Flow integration is available on the <PlanBadge plan="growth" /> plan or above. You
        build workflows in Shopify&apos;s own Flow app, where PerkStack appears as a source of
        triggers and actions.
      </Callout>

      <H2>Triggers: when PerkStack starts a workflow</H2>
      <p>
        A trigger is the event that kicks off a Flow. PerkStack provides these triggers. Each one
        passes along useful details about what happened so later steps in your workflow can use them.
      </p>

      <table>
        <thead>
          <tr>
            <th>Trigger</th>
            <th>Fires when</th>
            <th>Details available</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Review submitted</td>
            <td>Any customer submits a new review</td>
            <td>
              Customer, product, star rating, review title and text, whether it&apos;s a verified
              purchase, and whether it includes photos
            </td>
          </tr>
          <tr>
            <td>Negative review submitted</td>
            <td>A review comes in rated 2 stars or lower</td>
            <td>Same details as a review submission</td>
          </tr>
          <tr>
            <td>Review approved</td>
            <td>A review is approved and goes live on your storefront</td>
            <td>
              Customer, product, star rating, review title and text, verified-purchase status, and
              whether it has photos
            </td>
          </tr>
          <tr>
            <td>Merchant reply posted</td>
            <td>You publish a reply to a customer review</td>
            <td>Customer, product, star rating, the review text, and your reply</td>
          </tr>
          <tr>
            <td>Points adjusted manually</td>
            <td>You add or deduct points on a customer&apos;s profile by hand</td>
            <td>Customer and the adjustment made</td>
          </tr>
        </tbody>
      </table>

      <H2>Actions: what PerkStack can do inside a workflow</H2>
      <p>
        An action is a step Flow runs for you. Drop these PerkStack actions into any Flow, no matter
        what triggered it.
      </p>

      <table>
        <thead>
          <tr>
            <th>Action</th>
            <th>What it does</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Send a review request</td>
            <td>Ask a customer to review a product they bought</td>
          </tr>
          <tr>
            <td>Cancel a review request</td>
            <td>Stop a scheduled review-request email from going out</td>
          </tr>
          <tr>
            <td>Approve a review</td>
            <td>Publish a review to your storefront</td>
          </tr>
          <tr>
            <td>Reject a review</td>
            <td>Keep a review off your storefront</td>
          </tr>
          <tr>
            <td>Feature a review</td>
            <td>Highlight a review in featured surfaces like the review carousel</td>
          </tr>
          <tr>
            <td>Post a merchant reply</td>
            <td>Publish a public reply under a review</td>
          </tr>
          <tr>
            <td>Start a points multiplier boost</td>
            <td>Launch a limited-time points boost (for example, a double-points weekend)</td>
          </tr>
        </tbody>
      </table>

      <H2>Ways to use it</H2>

      <H3>Rescue unhappy customers</H3>
      <p>
        Use the <strong>Negative review submitted</strong> trigger to catch 1 and 2 star reviews the
        moment they arrive. Route them straight to your support team, open a help-desk ticket, or
        notify a manager, so you can make things right while the review still sits in moderation.
      </p>

      <H3>Tag and segment your reviewers</H3>
      <p>
        Start from <strong>Review submitted</strong> or <strong>Review approved</strong> and add a
        Shopify tag to the customer, like <code>reviewer</code> or <code>photo-reviewer</code>. Use
        those tags later for targeted marketing, discounts, or VIP outreach.
      </p>

      <H3>Launch a boost on a schedule</H3>
      <p>
        Combine Shopify&apos;s scheduled triggers with the <strong>Start a points multiplier boost</strong>{" "}
        action to run recurring promotions automatically, such as a double-points boost every Friday.
        Boosts started this way are labelled &quot;Started by Flow&quot; in your Campaigns dashboard.
      </p>

      <H3>Auto-thank your best reviews</H3>
      <p>
        When a <strong>Review approved</strong> trigger fires for a 5-star review, use the{" "}
        <strong>Post a merchant reply</strong> action to publish a thank-you automatically, so every
        happy customer hears back from you.
      </p>

      <Callout type="tip">
        You can mix PerkStack triggers and actions with any other Flow steps, including sending
        internal emails, updating Shopify tags and metafields, and connecting to other apps you use.
      </Callout>

      <H2>Related</H2>
      <ul>
        <li>
          <a href="/docs/reviews/moderation">Review Moderation</a>: approve, reply, and feature
          reviews by hand
        </li>
        <li>
          <a href="/docs/reviews/review-requests">Review Requests</a>: how automated review-request
          emails work
        </li>
        <li>
          <a href="/docs/loyalty/campaigns">Points Campaigns &amp; Boosts</a>: run limited-time
          points multipliers
        </li>
        <li>
          <a href="/docs/integrations/judgeme">Judge.me Sync</a>: keep reviews in sync with Judge.me
        </li>
      </ul>
    </div>
  );
}
