import type { Metadata } from "next";
import { createDocMetadata } from "@/lib/seo";
import { H2 } from "@/components/Heading";
import Callout from "@/components/Callout";
import PlanBadge from "@/components/PlanBadge";

export const metadata: Metadata = createDocMetadata("/docs/reviews/photo-reviews", {
  title: "Photo Reviews",
  description:
    "Let customers attach photos to their reviews for stronger, higher-converting social proof. Available on Essential and above.",
});

export default function PhotoReviewsPage() {
  return (
    <div className="docs-prose">
      <h1>Photo Reviews</h1>
      <p>
        Photo reviews let customers attach images to their reviews — real photos of your product in
        real hands. They&apos;re some of the most persuasive social proof you can show, and they
        typically convert better than text alone.
      </p>

      <Callout type="info">
        Photo reviews are available on the <PlanBadge plan="essential" /> plan and above. On{" "}
        <PlanBadge plan="free" />, the photo upload option is hidden from the review form.
      </Callout>

      <H2>What customers see</H2>
      <p>
        When photo reviews are on, the review form includes a photo upload control. Customers can
        attach up to five photos by default. Once uploaded photos finish processing, they appear as
        thumbnails alongside the review on your product pages and in the review carousel, and
        shoppers can tap a thumbnail to view it larger.
      </p>
      <p>
        Photos only ever appear on approved reviews. A photo on an auto-approved review starts
        processing right away; a photo on a review that&apos;s waiting in your queue starts
        processing once you approve it.
      </p>

      <H2>Configure photo reviews</H2>
      <p>
        Manage photo settings in <strong>PerkStack → Settings → Reviews</strong>:
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
            <td>Max photos per review</td>
            <td>The most photos a customer can attach to one review (1 to 10)</td>
            <td>5</td>
          </tr>
          <tr>
            <td>Require photos</td>
            <td>When on, a review can&apos;t be submitted without at least one photo</td>
            <td>Off</td>
          </tr>
        </tbody>
      </table>

      <Callout type="warning">
        Turning on <strong>Require photos</strong> will reduce your total review volume, since not
        every customer has a photo to share. Use it only where visual proof really matters — apparel,
        home décor, beauty — and leave it off if you want as many reviews as possible.
      </Callout>

      <H2>Points for photo reviews</H2>
      <p>
        You can reward a photo review more generously than a text-only one to encourage customers to
        include a picture. The bonus for a photo review is set in your loyalty earn rules and is
        available on <PlanBadge plan="essential" /> and above (the same plans that unlock photo
        uploads).
      </p>

      <H2>Related</H2>
      <ul>
        <li>
          <a href="/docs/reviews/overview">Overview</a>: how review collection works end to end
        </li>
        <li>
          <a href="/docs/reviews/moderation">Moderation</a>: approve reviews and their photos
        </li>
        <li>
          <a href="/docs/reviews/review-requests">Review Request Emails</a>: invite customers to
          share a photo
        </li>
        <li>
          <a href="/docs/loyalty/earn-rules">Ways to Earn</a>: set the bonus for a photo review
        </li>
      </ul>
    </div>
  );
}
