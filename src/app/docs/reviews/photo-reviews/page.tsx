import type { Metadata } from "next";
import { createDocMetadata } from "@/lib/seo";
import { H2, H3 } from "@/components/Heading";
import Callout from "@/components/Callout";
import PlanBadge from "@/components/PlanBadge";

export const metadata: Metadata = createDocMetadata("/docs/reviews/photo-reviews", {
  title: "Photo Reviews",
  description:
    "Enable photo uploads in product reviews, including configuration, upload flow, processing pipeline, and plan requirements.",
});

export default function PhotoReviewsPage() {
  return (
    <div className="docs-prose">
      <h1>Photo Reviews</h1>
      <p>
        Photo reviews let customers attach images to their product reviews, providing visual proof
        that builds trust with prospective buyers. Photos are uploaded, processed into multiple
        sizes, and displayed alongside the review text on your storefront.
      </p>

      <Callout type="info">
        Photo reviews require the <PlanBadge plan="growth" /> plan or higher. On the{" "}
        <PlanBadge plan="free" /> plan, the photo upload option is not available to customers.
      </Callout>

      <H2>Upload Flow</H2>
      <p>When a customer submits a review with photos, the following sequence occurs:</p>
      <ol>
        <li>
          The storefront review form requests a presigned upload URL from{" "}
          <code>/api/upload-url</code>
        </li>
        <li>
          The customer&apos;s browser uploads the image directly to Cloudflare R2 using the
          presigned URL, so the image never passes through your app server
        </li>
        <li>
          Once the upload completes, the review submission includes references to the uploaded photo
          keys
        </li>
        <li>A background worker picks up the photo for processing</li>
      </ol>

      <H2>Photo Processing Pipeline</H2>
      <p>
        After upload, each photo goes through an automated processing pipeline powered by Sharp:
      </p>

      <table>
        <thead>
          <tr>
            <th>Stage</th>
            <th>Status</th>
            <th>What Happens</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Upload received</td>
            <td>
              <code>pending</code>
            </td>
            <td>Original file stored in R2, processing job enqueued</td>
          </tr>
          <tr>
            <td>Thumbnail generation</td>
            <td>
              <code>processing</code>
            </td>
            <td>Worker creates two additional sizes using Sharp</td>
          </tr>
          <tr>
            <td>Complete</td>
            <td>
              <code>completed</code>
            </td>
            <td>All sizes available; photo displayed on the storefront</td>
          </tr>
          <tr>
            <td>Error</td>
            <td>
              <code>failed</code>
            </td>
            <td>Processing failed (corrupt file, unsupported format, etc.)</td>
          </tr>
        </tbody>
      </table>

      <H3>Generated Sizes</H3>
      <p>The processing worker generates two thumbnail variants alongside the original:</p>

      <table>
        <thead>
          <tr>
            <th>Size</th>
            <th>Use Case</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <code>small</code>
            </td>
            <td>Thumbnail grid in review lists and compact widgets</td>
          </tr>
          <tr>
            <td>
              <code>medium</code>
            </td>
            <td>Expanded view in review detail and lightbox</td>
          </tr>
          <tr>
            <td>Original</td>
            <td>Full-resolution image for zoom / download</td>
          </tr>
        </tbody>
      </table>

      <H2>Configuration</H2>
      <p>
        Configure photo review settings in <strong>PerkStack → Settings → Reviews</strong>:
      </p>

      <table>
        <thead>
          <tr>
            <th>Setting</th>
            <th>Default</th>
            <th>Range</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <code>reviewMaxPhotosPerReview</code>
            </td>
            <td>5</td>
            <td>1–10</td>
            <td>Maximum number of photos a customer can attach to a single review</td>
          </tr>
          <tr>
            <td>
              <code>reviewRequirePhotos</code>
            </td>
            <td>Off</td>
            <td>On / Off</td>
            <td>When enabled, customers must upload at least one photo to submit a review</td>
          </tr>
        </tbody>
      </table>

      <Callout type="warning">
        Enabling <code>reviewRequirePhotos</code> may reduce the total number of reviews you
        receive, as some customers may not have photos to share. Use this setting when visual proof
        is critical for your product category (e.g. apparel, home décor).
      </Callout>

      <H2>Points for Photo Reviews</H2>
      <p>
        Photo reviews earn more loyalty points than text-only reviews to incentivise visual
        feedback:
      </p>

      <table>
        <thead>
          <tr>
            <th>Review Type</th>
            <th>Default Points</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Text-only review</td>
            <td>100 points</td>
          </tr>
          <tr>
            <td>Photo review (includes at least one photo)</td>
            <td>200 points</td>
          </tr>
        </tbody>
      </table>

      <Callout type="info">
        A review with photos earns the <strong>photo review</strong> point amount, not both the text
        and photo amounts combined. Point values are configurable in your loyalty earn rules.
      </Callout>

      <H2>Plan Requirements</H2>

      <table>
        <thead>
          <tr>
            <th>Plan</th>
            <th>Photo Reviews</th>
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
              <PlanBadge plan="essential" />
            </td>
            <td>Available</td>
          </tr>
          <tr>
            <td>
              <PlanBadge plan="growth" />
            </td>
            <td>Available</td>
          </tr>
          <tr>
            <td>
              <PlanBadge plan="studio" />
            </td>
            <td>Available</td>
          </tr>
        </tbody>
      </table>

      <p>
        On the <PlanBadge plan="free" /> plan, the photo upload UI is hidden from the review form.
        Upgrading to <PlanBadge plan="essential" /> or higher immediately enables photo uploads for
        all new reviews.
      </p>

      <H2>Related</H2>
      <ul>
        <li>
          <a href="/docs/reviews/overview">Reviews Overview</a>: data model and review lifecycle
        </li>
        <li>
          <a href="/docs/reviews/moderation">Review Moderation</a>: moderate reviews with photos
        </li>
        <li>
          <a href="/docs/reviews/review-requests">Review Request Emails</a>: encourage photo
          submissions in email templates
        </li>
      </ul>
    </div>
  );
}
