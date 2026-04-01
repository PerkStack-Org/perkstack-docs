import type { Metadata } from "next";
import Callout from "@/components/Callout";
import PlanBadge from "@/components/PlanBadge";
import ReviewFormPreview from "@/components/widget-previews/ReviewFormPreview";

export const metadata: Metadata = {
  title: "Review Form",
  description:
    "Let customers submit product reviews with ratings, text, and photo uploads directly on your product pages.",
};

export default function ReviewFormPage() {
  return (
    <div className="docs-prose">
      <h1>Review Form</h1>
      <p>
        The Review Form widget lets customers submit reviews directly on your product pages. It
        supports star ratings, a title, body text, and photo uploads, providing everything needed to
        collect rich, authentic customer feedback without redirecting to an external page.
      </p>

      <PlanBadge plan="free" />

      <ReviewFormPreview />

      <h2>How It Works</h2>
      <p>
        The widget is rendered by <code>review-form.liquid</code> and uses a <code>section</code>{" "}
        target. When a customer submits a review, the form sends a <code>POST</code> request to:
      </p>
      <pre>
        <code>/apps/perkstack/api/reviews</code>
      </pre>
      <p>
        The review is saved with a status determined by your moderation settings. If auto-approve is
        enabled and the review meets the criteria, it goes live immediately. Otherwise, it enters a
        pending state for manual moderation.
      </p>

      <h2>Placement</h2>
      <ol>
        <li>
          Go to <strong>Online Store &gt; Themes &gt; Customize</strong>.
        </li>
        <li>
          Navigate to a <strong>product page</strong> template.
        </li>
        <li>
          Click <strong>Add section</strong> and search for <strong>PerkStack Review Form</strong>.
        </li>
        <li>Position the section, typically directly above or below the Review Display section.</li>
        <li>
          Click <strong>Save</strong>.
        </li>
      </ol>

      <Callout type="tip">
        Place the Review Form above the Review Display section so customers see the invitation to
        write a review before scrolling through existing ones.
      </Callout>

      <h2>Form Fields</h2>
      <table>
        <thead>
          <tr>
            <th>Field</th>
            <th>Required</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Rating</td>
            <td>Yes</td>
            <td>1–5 star selector. Customers click or tap to choose a rating.</td>
          </tr>
          <tr>
            <td>Title</td>
            <td>No</td>
            <td>Optional headline for the review (e.g. &quot;Great product!&quot;).</td>
          </tr>
          <tr>
            <td>Body</td>
            <td>Yes</td>
            <td>The main review text. Minimum length is enforced based on your settings.</td>
          </tr>
          <tr>
            <td>Photos</td>
            <td>No</td>
            <td>
              Up to 5 images per review. Accepted formats: JPEG, PNG, WebP. Max file size: 10 MB
              each.
            </td>
          </tr>
        </tbody>
      </table>

      <h2>Validation</h2>
      <p>
        The form validates inputs on the client side before submission and displays contextual error
        messages inline next to the relevant field:
      </p>
      <ul>
        <li>
          <strong>Rating</strong>: must select at least 1 star
        </li>
        <li>
          <strong>Body</strong>: must meet the minimum character length (configurable in PerkStack
          admin)
        </li>
        <li>
          <strong>Photos</strong>: file type and size are validated before upload begins
        </li>
      </ul>

      <Callout type="warning">
        If a customer is not logged in, the form will prompt them to log in or create an account
        before they can submit a review. Anonymous reviews are not supported.
      </Callout>

      <h2>Submission Flow</h2>
      <ol>
        <li>
          Customer fills in the form and clicks <strong>Submit Review</strong>.
        </li>
        <li>Client-side validation runs. If errors exist, they are shown inline.</li>
        <li>Photos (if any) are uploaded to Cloudflare R2 via a presigned URL.</li>
        <li>
          The review payload is sent to <code>POST /apps/perkstack/api/reviews</code>.
        </li>
        <li>
          A success message confirms the submission and explains the moderation status (e.g.
          &quot;Your review has been submitted and is awaiting approval&quot; or &quot;Your review
          is now live&quot;).
        </li>
      </ol>

      <h2>Internationalisation</h2>
      <p>
        All form labels, placeholder text, validation messages, and success/error messages use
        translations defined in <code>locales/en.default.json</code>. If your store operates in
        multiple languages, Shopify&apos;s translation system handles the localisation
        automatically.
      </p>

      <h2>Configuration</h2>
      <p>
        Review form behaviour is configured in the PerkStack admin under{" "}
        <strong>Reviews &gt; Settings</strong>:
      </p>
      <ul>
        <li>
          <strong>Auto-approve</strong>: automatically approve reviews that meet your criteria (e.g.
          4+ stars, no profanity)
        </li>
        <li>
          <strong>Minimum body length</strong>: minimum number of characters required in the review
          body
        </li>
        <li>
          <strong>Allow photos</strong>: enable or disable photo uploads on the form
        </li>
        <li>
          <strong>Max photos per review</strong>: limit the number of photos a customer can attach
        </li>
      </ul>

      <h2>Troubleshooting</h2>
      <ul>
        <li>
          <strong>Form not appearing</strong>: make sure the section is added to your product page
          template in the theme editor.
        </li>
        <li>
          <strong>Upload errors</strong>: check that file sizes are within the 10 MB limit and the
          format is JPEG, PNG, or WebP.
        </li>
        <li>
          <strong>Review not visible after submission</strong>: the review is likely awaiting
          moderation. Check the <strong>Reviews</strong> page in PerkStack admin.
        </li>
      </ul>
    </div>
  );
}
