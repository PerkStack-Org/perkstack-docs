import type { Metadata } from "next";
import { createDocMetadata } from "@/lib/seo";
import { H2, H3 } from "@/components/Heading";
import Callout from "@/components/Callout";
import PlanBadge from "@/components/PlanBadge";

export const metadata: Metadata = createDocMetadata("/docs/reviews/moderation", {
  title: "Moderation",
  description:
    "Approve, reply to, and feature customer reviews from your Shopify admin, and set auto-approval rules so clean reviews publish instantly.",
});

export default function ReviewModerationPage() {
  return (
    <div className="docs-prose">
      <h1>Moderation</h1>
      <p>
        Moderation is where you decide what appears on your storefront. Most clean, positive reviews
        publish on their own; the moderation queue is for the rest — the lower ratings and flagged
        submissions that deserve a quick look before they go live.
      </p>

      <H2>The moderation queue</H2>
      <p>
        Open <strong>PerkStack → Reviews</strong> to see every review for your store. To find what
        you need, you can:
      </p>
      <ul>
        <li>
          <strong>Filter by status</strong> — All, Pending, Approved, Rejected, or Spam
        </li>
        <li>
          <strong>Filter by rating</strong> — All, or 1 through 5 stars
        </li>
        <li>
          <strong>Search</strong> the review text and reviewer
        </li>
        <li>
          <strong>Sort</strong> by newest, oldest, highest rating, or lowest rating
        </li>
      </ul>
      <p>
        A typical routine is to open the <strong>Pending</strong> filter, scan what&apos;s waiting,
        and approve or reject each one.
      </p>

      <H2>Auto-approval rules</H2>
      <p>
        Auto-approval keeps the queue small. A review publishes instantly when its rating is at or
        above your threshold and it contains no blacklisted words. Everything else waits as pending.
        Set these under <strong>PerkStack → Settings → Reviews</strong> in the{" "}
        <strong>Review Moderation</strong> section:
      </p>

      <table>
        <thead>
          <tr>
            <th>Setting</th>
            <th>What it does</th>
            <th>Default</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Auto-approve threshold</td>
            <td>
              The lowest rating that publishes automatically. At 4, clean 4- and 5-star reviews go
              live instantly; 1- to 3-star reviews wait for you.
            </td>
            <td>4 stars</td>
          </tr>
          <tr>
            <td>Blacklisted words</td>
            <td>
              A comma-separated list. Any review containing one of these words is held for manual
              approval, even a 5-star one.
            </td>
            <td>None</td>
          </tr>
          <tr>
            <td>Require verified purchase</td>
            <td>
              When on, only customers PerkStack can confirm bought the product may leave a review.
            </td>
            <td>Off</td>
          </tr>
          <tr>
            <td>Show reviewer names</td>
            <td>
              When on, reviews display the reviewer&apos;s name (as first name and last initial).
              When off, every review shows as &quot;Anonymous.&quot;
            </td>
            <td>On</td>
          </tr>
        </tbody>
      </table>

      <Callout type="tip">
        A blacklisted-word match or a below-threshold rating always sends a review to the queue
        instead of publishing it — so nothing flagged reaches your storefront unseen.
      </Callout>

      <H2>Acting on a review</H2>
      <p>
        Open any review to see its full text, rating, photos, and history. From there you can:
      </p>
      <ul>
        <li>
          <strong>Approve</strong> — publish it on your storefront
        </li>
        <li>
          <strong>Reject</strong> — keep it off your storefront
        </li>
        <li>
          <strong>Mark as spam</strong> — hide it and file it under the Spam filter
        </li>
        <li>
          <strong>Reply</strong> — write a public response shown beneath the review
        </li>
        <li>
          <strong>Feature</strong> — highlight it in featured-review surfaces like your homepage
          carousel
        </li>
      </ul>

      <Callout type="tip">
        Replying to reviews — especially critical ones — shows future buyers you&apos;re engaged and
        responsive. Keep replies calm, professional, and focused on a resolution.
      </Callout>

      <H3>What happens when you approve</H3>
      <p>Approving a review does more than publish it. It also:</p>
      <ul>
        <li>Awards the reviewer their loyalty points (a text-review reward, plus a photo bonus if the review has photos)</li>
        <li>
          Refreshes the product&apos;s star rating used for badges and search rich snippets
        </li>
        <li>
          On <PlanBadge plan="growth" /> and above, can kick off a Shopify Flow automation via the
          &quot;review approved&quot; trigger
        </li>
      </ul>
      <p>Points are only ever awarded once per review, so re-approving a review never double-pays.</p>

      <H2>Moderating in bulk</H2>
      <p>
        On the <PlanBadge plan="studio" /> plan, you can select multiple reviews and approve, reject,
        or mark them as spam all at once — handy for high review volumes. Moderating reviews one at a
        time is available on every plan.
      </p>

      <H2>Related</H2>
      <ul>
        <li>
          <a href="/docs/reviews/overview">Overview</a>: how review collection and auto-approval fit
          together
        </li>
        <li>
          <a href="/docs/reviews/photo-reviews">Photo Reviews</a>: approving a review starts its
          photos processing
        </li>
        <li>
          <a href="/docs/integrations/shopify-flow">Shopify Flow</a>: automate actions when a review
          is approved
        </li>
        <li>
          <a href="/docs/settings/review-settings">Review Settings</a>: set your auto-approve
          threshold and blacklist
        </li>
      </ul>
    </div>
  );
}
