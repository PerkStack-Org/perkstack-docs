import type { Metadata } from "next";
import Callout from "@/components/Callout";
import PlanBadge from "@/components/PlanBadge";

export const metadata: Metadata = {
  title: "Review Request Emails",
  description:
    "Configure automated review request emails sent after order fulfillment, including timing, templates, reminders, and tracking.",
};

export default function ReviewRequestsPage() {
  return (
    <div className="docs-prose">
      <h1>Review Request Emails</h1>
      <p>
        PerkStack automatically sends review request emails to customers after their orders are
        fulfilled. These emails encourage customers to share their experience, boosting your review
        count and enriching your product pages with authentic feedback.
      </p>

      <h2>How It Works</h2>
      <ol>
        <li>
          Shopify fires the <code>orders/fulfilled</code> webhook when an order is fulfilled
        </li>
        <li>
          PerkStack creates a <code>review_requests</code> record with status <code>scheduled</code>{" "}
          and a <code>scheduledFor</code> timestamp based on your configured delay
        </li>
        <li>
          A background worker picks up scheduled requests at the appropriate time and sends the
          email via Resend
        </li>
        <li>
          The email contains the product title, product image, and a &quot;Write a Review&quot;
          call-to-action that links to your storefront review form
        </li>
      </ol>

      <Callout type="info">
        One review request is created per order per product. If an order contains three products,
        the customer receives one email covering those products, not three separate emails.
      </Callout>

      <h2>Timing Configuration</h2>
      <p>Control when review requests are sent with these settings:</p>

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
            <td>
              <code>reviewRequestDelayDays</code>
            </td>
            <td>7 days</td>
            <td>Number of days after fulfillment before the first review request is sent</td>
          </tr>
          <tr>
            <td>
              <code>reviewRequestReminderDelayDays</code>
            </td>
            <td>3 days</td>
            <td>
              Number of days after the first request before a reminder is sent (if enabled and the
              customer has not yet submitted a review)
            </td>
          </tr>
        </tbody>
      </table>

      <Callout type="tip">
        A delay of 7–14 days gives customers enough time to receive and try the product before being
        asked for a review. Adjust this based on your typical shipping times and product type.
      </Callout>

      <h2>Request Status Lifecycle</h2>
      <p>
        Each review request progresses through a series of statuses as the customer interacts with
        the email:
      </p>

      <table>
        <thead>
          <tr>
            <th>Status</th>
            <th>Trigger</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <code>scheduled</code>
            </td>
            <td>Order fulfilled</td>
            <td>Request created and waiting for the scheduled send time</td>
          </tr>
          <tr>
            <td>
              <code>sent</code>
            </td>
            <td>Worker sends email</td>
            <td>Email successfully delivered via Resend</td>
          </tr>
          <tr>
            <td>
              <code>opened</code>
            </td>
            <td>Open tracking pixel loaded</td>
            <td>
              Customer opened the email (sets <code>openedAt</code>)
            </td>
          </tr>
          <tr>
            <td>
              <code>clicked</code>
            </td>
            <td>CTA link clicked</td>
            <td>
              Customer clicked the review link (sets <code>clickedAt</code>, redirects to
              storefront)
            </td>
          </tr>
          <tr>
            <td>
              <code>reviewed</code>
            </td>
            <td>Review submitted</td>
            <td>Customer completed and submitted a review</td>
          </tr>
          <tr>
            <td>
              <code>cancelled</code>
            </td>
            <td>Manual or system action</td>
            <td>Request was cancelled before sending (e.g. order refunded)</td>
          </tr>
        </tbody>
      </table>

      <h2>Tracking</h2>
      <p>PerkStack tracks email engagement through two mechanisms:</p>
      <ul>
        <li>
          <strong>Open tracking</strong>: a 1×1 transparent pixel served at{" "}
          <code>/api/review-request.open</code>. When the email client loads this image, PerkStack
          records the <code>openedAt</code> timestamp.
        </li>
        <li>
          <strong>Click tracking</strong>: the &quot;Write a Review&quot; CTA points to{" "}
          <code>/api/review-request.click</code>, which records the <code>clickedAt</code> timestamp
          and then redirects the customer to the actual review form on your storefront.
        </li>
      </ul>

      <h2>Reminders</h2>
      <p>
        If reminders are enabled, PerkStack sends a follow-up email to customers who received the
        initial request but have not yet submitted a review. The reminder is sent after the
        configured <code>reviewRequestReminderDelayDays</code> (default: 3 days after the first
        request).
      </p>
      <p>
        Reminders are not sent if the customer has already submitted a review for that product or if
        the initial request was cancelled.
      </p>

      <h2>Email Customisation</h2>
      <p>
        Customise the subject line and body of your review request emails using template variables.
        Edit these templates in <strong>PerkStack → Settings → Review Emails</strong>.
      </p>

      <h3>Available Template Variables</h3>
      <table>
        <thead>
          <tr>
            <th>Variable</th>
            <th>Description</th>
            <th>Example Output</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <code>{"{{product_title}}"}</code>
            </td>
            <td>Name of the purchased product</td>
            <td>Classic Leather Tote</td>
          </tr>
          <tr>
            <td>
              <code>{"{{customer_name}}"}</code>
            </td>
            <td>Customer&apos;s first name</td>
            <td>Sarah</td>
          </tr>
          <tr>
            <td>
              <code>{"{{points_incentive}}"}</code>
            </td>
            <td>Points the customer will earn for reviewing</td>
            <td>100 points</td>
          </tr>
        </tbody>
      </table>

      <p>Example subject line:</p>
      <pre>
        <code>{"How are you liking your {{product_title}}, {{customer_name}}?"}</code>
      </pre>

      <p>Example body snippet:</p>
      <pre>
        <code>{"Share your thoughts on the {{product_title}} and earn {{points_incentive}}!"}</code>
      </pre>

      <h2>Rate Limits</h2>

      <table>
        <thead>
          <tr>
            <th>Plan</th>
            <th>Monthly Email Limit</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <PlanBadge plan="free" />
            </td>
            <td>50 emails / month</td>
          </tr>
          <tr>
            <td>
              <PlanBadge plan="growth" />
            </td>
            <td>Unlimited</td>
          </tr>
          <tr>
            <td>
              <PlanBadge plan="pro" />
            </td>
            <td>Unlimited</td>
          </tr>
        </tbody>
      </table>

      <Callout type="warning">
        On the Free plan, once you hit the 50-email monthly limit, new review requests are still
        created but remain in <code>scheduled</code> status until the next billing cycle. Upgrade to{" "}
        <PlanBadge plan="growth" /> or <PlanBadge plan="pro" /> for unlimited sends.
      </Callout>

      <h2>Unique Constraint</h2>
      <p>
        PerkStack enforces one review request per order per product. If a fulfillment webhook fires
        multiple times for the same order (e.g. partial fulfillments), only one request is created
        per product. This prevents customers from receiving duplicate emails.
      </p>

      <h2>Related</h2>
      <ul>
        <li>
          <a href="/docs/reviews/overview">Reviews Overview</a>: data model and review lifecycle
        </li>
        <li>
          <a href="/docs/reviews/photo-reviews">Photo Reviews</a>: encourage photo submissions in
          review requests
        </li>
        <li>
          <a href="/docs/reviews/moderation">Review Moderation</a>: manage reviews as they come in
        </li>
      </ul>
    </div>
  );
}
