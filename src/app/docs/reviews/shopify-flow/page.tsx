import type { Metadata } from "next";
import Callout from "@/components/Callout";
import PlanBadge from "@/components/PlanBadge";

export const metadata: Metadata = {
  title: "Shopify Flow Integration",
  description:
    "Use PerkStack's Shopify Flow trigger to build automations when reviews are approved. Available on the Pro plan.",
};

export default function ShopifyFlowPage() {
  return (
    <div className="docs-prose">
      <h1>Shopify Flow Integration</h1>
      <p>
        PerkStack provides a Shopify Flow trigger that fires whenever a review is approved, enabling
        you to build powerful automations without writing code. Use Flow to notify your team about
        negative reviews, send personalised thank-you emails, tag customers, and more.
      </p>

      <Callout type="info">
        The Shopify Flow integration requires the <PlanBadge plan="pro" /> plan.
      </Callout>

      <h2>Trigger: Review Approved</h2>
      <p>
        The <code>review-approved</code> trigger fires every time a review status changes to{" "}
        <code>approved</code>, whether through manual approval, bulk approval, or auto-approve
        rules. PerkStack sends the trigger payload to Shopify using the{" "}
        <code>flowTriggerReceive</code> GraphQL mutation.
      </p>

      <h2>Trigger Fields</h2>
      <p>
        The following data is included in every trigger payload, available for use in Flow
        conditions and actions:
      </p>

      <table>
        <thead>
          <tr>
            <th>Field</th>
            <th>Type</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <code>customer</code>
            </td>
            <td>Customer reference</td>
            <td>
              Shopify customer resource reference, usable in Flow actions that accept a customer
              (e.g. add tag, send email)
            </td>
          </tr>
          <tr>
            <td>
              <code>review_id</code>
            </td>
            <td>String</td>
            <td>PerkStack&apos;s internal review ID</td>
          </tr>
          <tr>
            <td>
              <code>product_id</code>
            </td>
            <td>String</td>
            <td>Shopify product ID associated with the review</td>
          </tr>
          <tr>
            <td>
              <code>rating</code>
            </td>
            <td>Integer (1–5)</td>
            <td>Star rating the customer gave</td>
          </tr>
          <tr>
            <td>
              <code>title</code>
            </td>
            <td>String</td>
            <td>Review title (may be empty if the customer didn&apos;t provide one)</td>
          </tr>
          <tr>
            <td>
              <code>body</code>
            </td>
            <td>String</td>
            <td>Full review text</td>
          </tr>
          <tr>
            <td>
              <code>verified_purchase</code>
            </td>
            <td>Boolean</td>
            <td>Whether the reviewer purchased the product</td>
          </tr>
          <tr>
            <td>
              <code>has_photos</code>
            </td>
            <td>Boolean</td>
            <td>Whether the review includes photo attachments</td>
          </tr>
        </tbody>
      </table>

      <h2>Automation Examples</h2>
      <p>Here are some practical workflows you can build with the review-approved trigger:</p>

      <h3>Notify on Negative Reviews</h3>
      <p>
        Alert your support team immediately when a low-rated review is approved so they can follow
        up with the customer:
      </p>
      <ul>
        <li>
          <strong>Trigger:</strong> Review approved
        </li>
        <li>
          <strong>Condition:</strong> <code>rating</code> is less than or equal to 2
        </li>
        <li>
          <strong>Action:</strong> Send Slack notification / email to your support team with the
          review body and customer reference
        </li>
      </ul>

      <h3>Thank High-Rated Reviewers</h3>
      <p>Send a personalised thank-you email to customers who leave 5-star reviews:</p>
      <ul>
        <li>
          <strong>Trigger:</strong> Review approved
        </li>
        <li>
          <strong>Condition:</strong> <code>rating</code> equals 5
        </li>
        <li>
          <strong>Action:</strong> Send marketing email via Shopify Email or your ESP
        </li>
      </ul>

      <h3>Tag Photo Reviewers</h3>
      <p>Automatically tag customers who submit photo reviews for targeted marketing:</p>
      <ul>
        <li>
          <strong>Trigger:</strong> Review approved
        </li>
        <li>
          <strong>Condition:</strong> <code>has_photos</code> is true
        </li>
        <li>
          <strong>Action:</strong> Add customer tag <code>photo-reviewer</code>
        </li>
      </ul>

      <h3>Flag Unverified Reviews</h3>
      <p>Get notified when an unverified review is approved so you can spot-check it:</p>
      <ul>
        <li>
          <strong>Trigger:</strong> Review approved
        </li>
        <li>
          <strong>Condition:</strong> <code>verified_purchase</code> is false
        </li>
        <li>
          <strong>Action:</strong> Send internal notification with review details
        </li>
      </ul>

      <Callout type="tip">
        Combine multiple conditions in a single Flow workflow. For example, notify on negative
        reviews <em>and</em> tag the customer for follow-up in one automation.
      </Callout>

      <h2>Setting Up a Flow Workflow</h2>
      <ol>
        <li>
          Open <strong>Shopify Admin → Apps → Flow</strong>
        </li>
        <li>
          Click <strong>Create workflow</strong>
        </li>
        <li>
          Select <strong>PerkStack</strong> as the trigger app and choose{" "}
          <strong>Review approved</strong>
        </li>
        <li>Add conditions based on the trigger fields (e.g. rating, has_photos)</li>
        <li>Add actions (send email, add tag, send notification, etc.)</li>
        <li>Activate the workflow</li>
      </ol>

      <h2>Plan Availability</h2>

      <table>
        <thead>
          <tr>
            <th>Plan</th>
            <th>Shopify Flow Trigger</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <PlanBadge plan="free" />
            </td>
            <td>Not available</td>
          </tr>
          <tr>
            <td>
              <PlanBadge plan="growth" />
            </td>
            <td>Not available</td>
          </tr>
          <tr>
            <td>
              <PlanBadge plan="pro" />
            </td>
            <td>Available</td>
          </tr>
        </tbody>
      </table>

      <Callout type="info">
        The Flow trigger fires automatically on every review approval. No additional configuration
        is needed in PerkStack. Just build your workflows in Shopify Flow.
      </Callout>

      <h2>Related</h2>
      <ul>
        <li>
          <a href="/docs/reviews/moderation">Review Moderation</a>: where approvals happen
        </li>
        <li>
          <a href="/docs/reviews/overview">Reviews Overview</a>: review data model and statuses
        </li>
      </ul>
    </div>
  );
}
