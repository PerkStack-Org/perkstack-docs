import type { Metadata } from "next";
import Callout from "@/components/Callout";

export const metadata: Metadata = {
  title: "Reviews Overview",
  description:
    "Understand how product reviews work in PerkStack, including the data model, statuses, helpful votes, and featured reviews.",
};

export default function ReviewsOverviewPage() {
  return (
    <div className="docs-prose">
      <h1>Reviews Overview</h1>
      <p>
        PerkStack&apos;s product reviews system lets your customers leave ratings and written
        feedback on products they&apos;ve purchased. Reviews integrate tightly with the loyalty
        program, so customers earn points for submitting text and photo reviews, incentivising
        genuine feedback that drives conversions.
      </p>

      <Callout type="tip">
        Reviews and loyalty work together: when a review is approved, the customer automatically
        earns points based on your configured earn rules (text review and photo review amounts).
      </Callout>

      <h2>Review Data Model</h2>
      <p>Each review record contains the following fields:</p>

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
              <code>rating</code>
            </td>
            <td>Integer (1–5)</td>
            <td>Star rating selected by the customer</td>
          </tr>
          <tr>
            <td>
              <code>title</code>
            </td>
            <td>String (optional)</td>
            <td>Short headline for the review</td>
          </tr>
          <tr>
            <td>
              <code>body</code>
            </td>
            <td>String (required)</td>
            <td>Full review text</td>
          </tr>
          <tr>
            <td>
              <code>status</code>
            </td>
            <td>Enum</td>
            <td>
              One of <code>pending</code>, <code>approved</code>, <code>rejected</code>, or{" "}
              <code>spam</code>
            </td>
          </tr>
          <tr>
            <td>
              <code>verifiedPurchase</code>
            </td>
            <td>Boolean</td>
            <td>Whether the reviewer actually purchased the product</td>
          </tr>
          <tr>
            <td>
              <code>featured</code>
            </td>
            <td>Boolean</td>
            <td>Merchant-flagged reviews displayed prominently on the storefront</td>
          </tr>
          <tr>
            <td>
              <code>adminResponse</code>
            </td>
            <td>String (optional)</td>
            <td>Public reply from the merchant</td>
          </tr>
          <tr>
            <td>
              <code>helpfulCount</code>
            </td>
            <td>Integer</td>
            <td>Number of times other customers marked this review as helpful</td>
          </tr>
          <tr>
            <td>
              <code>source</code>
            </td>
            <td>Enum</td>
            <td>
              Origin of the review: <code>native</code>, <code>import_judgeme</code>, or{" "}
              <code>import_loox</code>
            </td>
          </tr>
          <tr>
            <td>
              <code>ipAddress</code>
            </td>
            <td>String</td>
            <td>IP address of the reviewer, used for spam detection and vote deduplication</td>
          </tr>
        </tbody>
      </table>

      <h2>One Review Per Customer Per Product</h2>
      <p>
        PerkStack enforces a unique constraint on <code>shopId</code> + <code>customerId</code> +{" "}
        <code>shopifyProductId</code>. This means each customer can only leave one review per
        product per store. If a customer attempts to submit a second review for the same product,
        the submission is rejected with a descriptive error message.
      </p>

      <Callout type="info">
        This constraint applies to both native reviews and imported reviews. If an imported CSV
        contains a duplicate customer–product pair, the duplicate row is skipped during import.
      </Callout>

      <h2>Review Statuses</h2>
      <p>
        Every review passes through a status lifecycle. The initial status depends on your
        moderation settings. Reviews can start as <code>pending</code> (manual approval) or be
        auto-approved.
      </p>

      <table>
        <thead>
          <tr>
            <th>Status</th>
            <th>Visible on Storefront</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <code>pending</code>
            </td>
            <td>No</td>
            <td>Awaiting merchant review, which is the default for new submissions</td>
          </tr>
          <tr>
            <td>
              <code>approved</code>
            </td>
            <td>Yes</td>
            <td>Published on the storefront; triggers points award and optional Flow trigger</td>
          </tr>
          <tr>
            <td>
              <code>rejected</code>
            </td>
            <td>No</td>
            <td>Declined by the merchant and not shown to customers</td>
          </tr>
          <tr>
            <td>
              <code>spam</code>
            </td>
            <td>No</td>
            <td>Flagged as spam, hidden from all views except the Spam filter in admin</td>
          </tr>
        </tbody>
      </table>

      <h2>Helpful Votes</h2>
      <p>
        Customers can mark reviews as helpful. Each customer (or unique IP address for anonymous
        visitors) can only vote once per review. The <code>helpfulCount</code> is incremented on
        each unique vote and displayed alongside the review on the storefront.
      </p>
      <p>
        Helpful votes help surface the most useful reviews and can be used for sorting reviews by
        relevance on the product page.
      </p>

      <h2>Featured Reviews</h2>
      <p>
        Merchants can mark any approved review as <strong>featured</strong>. Featured reviews are
        served through the <code>/api/featured-reviews</code> endpoint and can be displayed in
        prominent positions on the storefront, such as in a carousel on the homepage or a dedicated
        testimonials section.
      </p>

      <Callout type="tip">
        Use featured reviews to highlight your best customer feedback. Featured reviews are
        available to theme app extension blocks and can be positioned anywhere in your theme via the
        Shopify theme editor.
      </Callout>

      <h2>Review Sources</h2>
      <p>
        The <code>source</code> field tracks where each review originated:
      </p>
      <ul>
        <li>
          <strong>
            <code>native</code>
          </strong>
          : submitted directly through PerkStack&apos;s review form on your storefront
        </li>
        <li>
          <strong>
            <code>import_judgeme</code>
          </strong>
          : imported from a Judge.me CSV export
        </li>
        <li>
          <strong>
            <code>import_loox</code>
          </strong>
          : imported from a Loox CSV export
        </li>
      </ul>
      <p>
        Imported reviews retain their original ratings, text, and dates. They appear identically to
        native reviews on the storefront.
      </p>

      <h2>Points Integration</h2>
      <p>
        When a review is approved, PerkStack automatically enqueues a points award for the reviewer:
      </p>
      <table>
        <thead>
          <tr>
            <th>Review Type</th>
            <th>Default Points</th>
            <th>Notes</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Text review</td>
            <td>100 points</td>
            <td>Awarded for any approved review with a body</td>
          </tr>
          <tr>
            <td>Photo review</td>
            <td>200 points</td>
            <td>Awarded when an approved review includes at least one photo</td>
          </tr>
        </tbody>
      </table>

      <Callout type="info">
        Point amounts are configurable in your loyalty settings. Photo reviews always earn the photo
        review amount (not both text and photo).
      </Callout>

      <h2>Next Steps</h2>
      <ul>
        <li>
          <a href="/docs/reviews/moderation">Review Moderation</a>: approve, reject, and manage
          reviews from your admin
        </li>
        <li>
          <a href="/docs/reviews/review-requests">Review Request Emails</a>: automatically ask
          customers for reviews after purchase
        </li>
        <li>
          <a href="/docs/reviews/photo-reviews">Photo Reviews</a>: enable and configure photo
          uploads
        </li>
        <li>
          <a href="/docs/reviews/importing">Importing Reviews</a>: migrate reviews from Judge.me or
          Loox
        </li>
        <li>
          <a href="/docs/reviews/seo">SEO &amp; Rich Snippets</a>: add structured data for Google
          star ratings
        </li>
      </ul>
    </div>
  );
}
