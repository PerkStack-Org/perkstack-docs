import type { Metadata } from "next";
import { createDocMetadata } from "@/lib/seo";
import { H2, H3 } from "@/components/Heading";
import Callout from "@/components/Callout";
import PlanBadge from "@/components/PlanBadge";

export const metadata: Metadata = createDocMetadata("/docs/reviews/moderation", {
  title: "Review Moderation",
  description:
    "Manage product reviews from your Shopify admin. Approve, reject, reply, feature, and use bulk actions.",
});

export default function ReviewModerationPage() {
  return (
    <div className="docs-prose">
      <h1>Review Moderation</h1>
      <p>
        The review moderation dashboard lives at <strong>PerkStack → Reviews</strong> in your
        Shopify admin. From here you can view all submitted reviews, filter by status, take
        individual or bulk actions, and reply to customers publicly.
      </p>

      <H2>Reviews List</H2>
      <p>
        The main reviews page displays a paginated table of all reviews for your store. Each row
        shows the product name, customer, rating, review excerpt, status badge, and submission date.
      </p>

      <H3>Filters</H3>
      <p>Use the status tabs at the top of the page to filter reviews:</p>
      <table>
        <thead>
          <tr>
            <th>Tab</th>
            <th>Shows</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <strong>All</strong>
            </td>
            <td>Every review regardless of status</td>
          </tr>
          <tr>
            <td>
              <strong>Pending</strong>
            </td>
            <td>Reviews awaiting your decision</td>
          </tr>
          <tr>
            <td>
              <strong>Approved</strong>
            </td>
            <td>Published reviews visible on the storefront</td>
          </tr>
          <tr>
            <td>
              <strong>Rejected</strong>
            </td>
            <td>Reviews you&apos;ve declined</td>
          </tr>
          <tr>
            <td>
              <strong>Spam</strong>
            </td>
            <td>Reviews flagged as spam</td>
          </tr>
        </tbody>
      </table>

      <p>
        Results are paginated. Use the pagination controls at the bottom of the table to navigate
        through large review sets.
      </p>

      <H2>Review Actions</H2>
      <p>
        Each review supports the following actions, available from the actions menu on the review
        row or from the individual review detail page:
      </p>

      <H3>Approve</H3>
      <p>Approving a review triggers the following sequence:</p>
      <ol>
        <li>
          The review status changes to <code>approved</code> and the <code>approvedAt</code>{" "}
          timestamp is recorded
        </li>
        <li>The review becomes visible on the storefront immediately</li>
        <li>
          A points award job is enqueued, and the customer earns points for the review (text or
          photo amount depending on whether the review includes photos)
        </li>
        <li>
          If your store is on the <PlanBadge plan="growth" /> plan or above, a Shopify Flow trigger fires with
          the review data, enabling custom automations
        </li>
      </ol>

      <Callout type="info">
        Points are only awarded once per review. If you reject and later re-approve a review, points
        are not awarded a second time.
      </Callout>

      <H3>Reject</H3>
      <p>
        Rejecting a review sets the status to <code>rejected</code> and records the{" "}
        <code>rejectedAt</code> timestamp. The review is hidden from the storefront. You can
        re-approve a rejected review at any time.
      </p>

      <H3>Feature / Unfeature</H3>
      <p>
        Toggle the <code>featured</code> flag on any approved review. Featured reviews appear in the{" "}
        <code>/api/featured-reviews</code> endpoint and can be displayed in dedicated storefront
        blocks (e.g. homepage testimonials carousel).
      </p>

      <H2>Admin Reply</H2>
      <p>
        You can write a public reply to any review using the <code>adminResponse</code> field. This
        response is displayed below the customer&apos;s review on the storefront. Use admin replies
        to thank customers for positive feedback or address concerns raised in negative reviews.
      </p>

      <Callout type="tip">
        Responding to reviews, especially negative ones, shows potential buyers that you care about
        customer satisfaction. Keep replies professional, empathetic, and solution-oriented.
      </Callout>

      <H2>Bulk Actions</H2>
      <p>
        Select multiple reviews using the checkboxes in the list view to perform bulk operations:
      </p>
      <ul>
        <li>
          <strong>Bulk Approve</strong>: approve all selected reviews at once
        </li>
        <li>
          <strong>Bulk Reject</strong>: reject all selected reviews at once
        </li>
      </ul>
      <p>
        Bulk approve follows the same approval sequence as individual approvals. Each review
        triggers its own points award and Flow trigger (if applicable).
      </p>

      <H2>Individual Review Detail</H2>
      <p>
        Click any review in the list to open its detail page at <code>/app/reviews/:id</code>. The
        detail page shows:
      </p>
      <ul>
        <li>Full review text and rating</li>
        <li>Any uploaded photos</li>
        <li>Customer name and link to the customer&apos;s Shopify admin profile</li>
        <li>Product name and link to the product in Shopify admin</li>
        <li>Verified purchase badge (if applicable)</li>
        <li>Submission date and current status</li>
        <li>Helpful vote count</li>
        <li>Admin response field for writing or editing your reply</li>
        <li>Action buttons: Approve, Reject, Feature/Unfeature</li>
      </ul>

      <H2>Moderation Workflow Example</H2>
      <p>A typical daily moderation workflow looks like this:</p>
      <ol>
        <li>
          Open the <strong>Pending</strong> tab to see new reviews
        </li>
        <li>Scan ratings and review text, then click into any review that needs a closer look</li>
        <li>Approve genuine reviews individually or select multiple and use bulk approve</li>
        <li>Reject or mark as spam any reviews that violate your guidelines</li>
        <li>
          Reply to reviews where a merchant response adds value (thank you notes, issue resolution)
        </li>
        <li>Feature your best reviews so they appear in storefront highlight blocks</li>
      </ol>

      <Callout type="warning">
        Rejecting a review does not notify the customer. If you want to explain why a review was
        removed, consider reaching out to the customer directly through Shopify.
      </Callout>

      <H2>Related</H2>
      <ul>
        <li>
          <a href="/docs/reviews/overview">Reviews Overview</a>: data model and status lifecycle
        </li>
        <li>
          <a href="/docs/reviews/shopify-flow">Shopify Flow Integration</a>: automate actions on
          review approval
        </li>
        <li>
          <a href="/docs/reviews/photo-reviews">Photo Reviews</a>: manage reviews with uploaded
          images
        </li>
      </ul>
    </div>
  );
}
