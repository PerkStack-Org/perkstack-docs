import type { Metadata } from "next";
import { createDocMetadata } from "@/lib/seo";
import { H2, H3 } from "@/components/Heading";
import Callout from "@/components/Callout";
import PlanBadge from "@/components/PlanBadge";

export const metadata: Metadata = createDocMetadata("/docs/widgets/review-form", {
  title: "Review Form",
  description:
    "Add a 'Write a review' form to your product pages so customers can rate, review, and upload photos, with an optional points incentive.",
});

export default function ReviewFormPage() {
  return (
    <div className="docs-prose">
      <h1>Review Form</h1>
      <p>
        Review Form is the &quot;Write a review&quot; block. It gives customers a simple way to rate
        a product, add a title and comments, and upload photos &mdash; right on the product page.
        Pair it with an earn rule and it can also reward customers with points for leaving a review.
      </p>

      <H2>What shoppers see</H2>
      <ul>
        <li>A star rating selector, a title field, and a comments box</li>
        <li>Photo upload, so customers can show the product in real life</li>
        <li>A points-incentive badge when leaving a review earns points</li>
        <li>A hint that verified buyers get recognized</li>
        <li>A celebratory confetti animation when their review is submitted</li>
      </ul>
      <p>
        Reviews land pending approval by default, so you can moderate before they appear on your
        store.
      </p>

      <H2>How to add it</H2>
      <ol>
        <li>
          In Shopify admin, go to <strong>Online Store &rarr; Themes</strong> and click{" "}
          <strong>Customize</strong>.
        </li>
        <li>Open your product template.</li>
        <li>
          In the section where you want the form (usually with your reviews), click{" "}
          <strong>Add block</strong> and choose <strong>Review Form</strong>.
        </li>
        <li>
          Adjust the settings below, then click <strong>Save</strong>.
        </li>
      </ol>

      <Callout type="tip">
        Add the <a href="/docs/widgets/review-display">Review Display</a> block on the same page so
        customers can read existing reviews and write their own in one place.
      </Callout>

      <H2>Theme editor settings</H2>
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
            <td>Accent color</td>
            <td>Color of the stars and buttons</td>
            <td>
              <code>#f59e0b</code> (amber)
            </td>
          </tr>
          <tr>
            <td>Custom heading</td>
            <td>Replaces the default &quot;Write a review&quot; heading</td>
            <td>Default heading</td>
          </tr>
          <tr>
            <td>Custom submit button text</td>
            <td>Replaces the default submit button label</td>
            <td>Default label</td>
          </tr>
          <tr>
            <td>Custom success heading</td>
            <td>The message shown after a review is submitted</td>
            <td>Default message</td>
          </tr>
          <tr>
            <td>Require login to review</td>
            <td>Only signed-in customers can submit</td>
            <td>Off</td>
          </tr>
          <tr>
            <td>Require review title</td>
            <td>Make the title field mandatory</td>
            <td>Off</td>
          </tr>
          <tr>
            <td>Minimum review length</td>
            <td>Smallest number of characters a review can be (0&ndash;100)</td>
            <td>10</td>
          </tr>
          <tr>
            <td>Allow photo uploads</td>
            <td>Let customers attach photos to their review</td>
            <td>On</td>
          </tr>
          <tr>
            <td>Max photos per review</td>
            <td>How many photos a customer can attach (1&ndash;10)</td>
            <td>5</td>
          </tr>
          <tr>
            <td>Show points incentive</td>
            <td>Show a badge advertising the points a review earns</td>
            <td>On</td>
          </tr>
          <tr>
            <td>Show verified buyer hint</td>
            <td>Note that verified buyers are recognized</td>
            <td>On</td>
          </tr>
          <tr>
            <td>Show confetti on submission</td>
            <td>Play a confetti animation after a review is sent</td>
            <td>On</td>
          </tr>
        </tbody>
      </table>

      <H3>Points incentive and photos</H3>
      <ul>
        <li>
          The points-incentive badge only appears if you&apos;ve set up an earn rule that rewards
          reviews. Turning on <strong>Show points incentive</strong> without a review earn rule shows
          nothing. See <a href="/docs/loyalty/earn-rules">Ways to Earn</a> to add one.
        </li>
        <li>
          Photo uploads are only meaningful on the <PlanBadge plan="essential" /> plan and above,
          where photo reviews are supported. On the <PlanBadge plan="free" /> plan reviews are text
          only.
        </li>
      </ul>

      <H2>Related</H2>
      <ul>
        <li>
          <a href="/docs/widgets/review-display">Review Display</a>: show the reviews customers
          submit.
        </li>
        <li>
          <a href="/docs/reviews/moderation">Moderation</a>: approve or reject reviews before they go
          live.
        </li>
        <li>
          <a href="/docs/loyalty/earn-rules">Ways to Earn</a>: reward customers with points for
          leaving a review.
        </li>
        <li>
          <a href="/docs/reviews/photo-reviews">Photo Reviews</a>: how photo reviews work and which
          plans include them.
        </li>
      </ul>
    </div>
  );
}
