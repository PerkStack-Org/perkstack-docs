import type { Metadata } from "next";
import { createDocMetadata } from "@/lib/seo";
import { H2 } from "@/components/Heading";
import Callout from "@/components/Callout";
import PlanBadge from "@/components/PlanBadge";

export const metadata: Metadata = createDocMetadata("/docs/settings/review-settings", {
  title: "Review Settings",
  description:
    "One place for your review rules — auto-approve threshold, blacklisted words, verified-purchase, reviewer names, request and reminder timing, photos, and email copy.",
});

export default function ReviewSettingsPage() {
  return (
    <div className="docs-prose">
      <h1>Review Settings</h1>
      <p>
        Review settings (<strong>PerkStack → Settings → Reviews</strong>) gather all your review rules
        in one place: which reviews publish automatically, when request emails go out, what shoppers
        can submit, and what those emails say. Every option has a sensible default, so you only tune
        what matters to you.
      </p>

      <H2>Moderation rules</H2>
      <p>
        These control which reviews go live on their own and which wait for you in the moderation
        queue.
      </p>
      <table>
        <thead>
          <tr>
            <th>Setting</th>
            <th>Default</th>
            <th>What it does</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <strong>Auto-approve threshold</strong>
            </td>
            <td>4 stars</td>
            <td>
              Reviews at or above this rating publish automatically; anything lower waits for you to
              approve. At 4, clean 4- and 5-star reviews go live instantly while 1&ndash;3 star reviews
              are held.
            </td>
          </tr>
          <tr>
            <td>
              <strong>Blacklisted words</strong>
            </td>
            <td>None</td>
            <td>
              A comma-separated list of words or phrases. Any review containing one is always held for
              manual review, even a 5-star one. Matching is case-insensitive.
            </td>
          </tr>
          <tr>
            <td>
              <strong>Require verified purchase</strong>
            </td>
            <td>Off</td>
            <td>
              When on, only customers who actually bought the product can leave a review. Keeps out
              reviews from non-buyers.
            </td>
          </tr>
          <tr>
            <td>
              <strong>Show reviewer name</strong>
            </td>
            <td>On</td>
            <td>
              Displays the reviewer&apos;s name (as &ldquo;First&nbsp;L.&rdquo;) on the storefront. Turn
              it off to show every review as &ldquo;Anonymous.&rdquo;
            </td>
          </tr>
        </tbody>
      </table>

      <H2>Request and reminder timing</H2>
      <p>
        After an order is fulfilled, PerkStack can automatically email the customer to ask for a review,
        with one optional follow-up. This is the main engine for collecting review volume.
      </p>
      <table>
        <thead>
          <tr>
            <th>Setting</th>
            <th>Default</th>
            <th>What it does</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <strong>Enable review requests</strong>
            </td>
            <td>On</td>
            <td>Turns the automatic post-purchase review email on or off.</td>
          </tr>
          <tr>
            <td>
              <strong>Request delay</strong>
            </td>
            <td>7 days</td>
            <td>How long after fulfillment to send the first request &mdash; enough time to receive and try the product.</td>
          </tr>
          <tr>
            <td>
              <strong>Send a reminder</strong>
            </td>
            <td>On</td>
            <td>Sends one follow-up if the customer hasn&apos;t reviewed yet. A submitted review cancels it.</td>
          </tr>
          <tr>
            <td>
              <strong>Reminder delay</strong>
            </td>
            <td>3 days</td>
            <td>How long after the first request to send that single reminder.</td>
          </tr>
        </tbody>
      </table>
      <Callout type="info">
        Requests are per product, so a three-item order can generate up to three review requests. Only
        one reminder is ever sent, and only to customers who haven&apos;t reviewed.
      </Callout>

      <H2>Photos</H2>
      <p>
        Photo reviews are higher-converting social proof. Uploading photos is available on{" "}
        <PlanBadge plan="essential" /> and above.
      </p>
      <table>
        <thead>
          <tr>
            <th>Setting</th>
            <th>Default</th>
            <th>What it does</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <strong>Require photos</strong>
            </td>
            <td>Off</td>
            <td>When on, a review must include at least one photo to be submitted.</td>
          </tr>
          <tr>
            <td>
              <strong>Max photos per review</strong>
            </td>
            <td>5</td>
            <td>The most photos a customer can attach to one review (1&ndash;10).</td>
          </tr>
        </tbody>
      </table>

      <H2>Request and reminder email copy</H2>
      <p>
        Leave these blank to use PerkStack&apos;s built-in templates, or write your own subject line
        and body for the request and the reminder. The body accepts HTML and these placeholders, which
        are filled in for each customer:
      </p>
      <table>
        <thead>
          <tr>
            <th>Placeholder</th>
            <th>Replaced with</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <code>{"{{customer_name}}"}</code>
            </td>
            <td>The customer&apos;s first name</td>
          </tr>
          <tr>
            <td>
              <code>{"{{product_title}}"}</code>
            </td>
            <td>The product they&apos;re being asked to review</td>
          </tr>
          <tr>
            <td>
              <code>{"{{shop_name}}"}</code>
            </td>
            <td>Your store name</td>
          </tr>
        </tbody>
      </table>
      <Callout type="tip">
        If you award points for reviews, mentioning that in the subject line lifts submission rates
        &mdash; for example &ldquo;How was your {"{{product_title}}"}? Leave a review and earn
        points.&rdquo;
      </Callout>

      <H2>Related</H2>
      <ul>
        <li>
          <a href="/docs/reviews/moderation">Review Moderation</a>: approve, reject, feature, and reply
          to reviews
        </li>
        <li>
          <a href="/docs/reviews/review-requests">Review Requests</a>: how post-purchase review emails
          work end to end
        </li>
        <li>
          <a href="/docs/reviews/photo-reviews">Photo Reviews</a>: collecting and displaying customer
          photos
        </li>
        <li>
          <a href="/docs/settings/email">Email &amp; Notifications</a>: sender name, reply-to, and email
          usage
        </li>
      </ul>
    </div>
  );
}
