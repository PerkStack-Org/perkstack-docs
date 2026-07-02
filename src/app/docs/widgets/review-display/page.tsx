import type { Metadata } from "next";
import { createDocMetadata } from "@/lib/seo";
import { H2, H3 } from "@/components/Heading";
import Callout from "@/components/Callout";
import PlanBadge from "@/components/PlanBadge";

export const metadata: Metadata = createDocMetadata("/docs/widgets/review-display", {
  title: "Review Display",
  description:
    "Show customer reviews on your product pages with a rating summary, photos, verified badges, and sortable review list or grid.",
});

export default function ReviewDisplayPage() {
  return (
    <div className="docs-prose">
      <h1>Review Display</h1>
      <p>
        Review Display is the main reviews block for your product pages. It shows an overall rating
        summary with a breakdown by star, then a sortable list or grid of individual reviews
        complete with photos, verified-purchase badges, and helpful votes &mdash; the social proof
        shoppers look for before they buy.
      </p>

      <H2>What shoppers see</H2>
      <ul>
        <li>A rating summary with the average score and a distribution of stars</li>
        <li>Each review with its rating, title, text, and any photos</li>
        <li>A verified-purchase badge on reviews from real buyers</li>
        <li>A helpful button so shoppers can upvote useful reviews</li>
        <li>Sorting controls to reorder reviews by most recent, highest, lowest, or most helpful</li>
      </ul>

      <H2>How to add it</H2>
      <ol>
        <li>
          In Shopify admin, go to <strong>Online Store &rarr; Themes</strong> and click{" "}
          <strong>Customize</strong>.
        </li>
        <li>Open your product template.</li>
        <li>
          In the section where you want reviews (usually below the product info), click{" "}
          <strong>Add block</strong> and choose <strong>Review Display</strong>.
        </li>
        <li>
          Adjust the settings below, then click <strong>Save</strong>.
        </li>
      </ol>

      <Callout type="tip">
        Add the <a href="/docs/widgets/review-form">Review Form</a> to the same product page so
        shoppers can write a review right where they read them. Add{" "}
        <strong>Review SEO</strong> as well to earn star ratings in Google search results.
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
            <td>Star &amp; accent color</td>
            <td>Color of the stars and accents</td>
            <td>
              <code>#f59e0b</code> (amber)
            </td>
          </tr>
          <tr>
            <td>Custom heading</td>
            <td>Replaces the default &quot;Customer Reviews&quot; heading</td>
            <td>Default heading</td>
          </tr>
          <tr>
            <td>Layout</td>
            <td>Show reviews as a single-column list or a two-column grid</td>
            <td>List</td>
          </tr>
          <tr>
            <td>Reviews per page</td>
            <td>How many reviews to show before paging (3&ndash;25)</td>
            <td>10</td>
          </tr>
          <tr>
            <td>Default sort order</td>
            <td>Starting sort: most recent, highest, most helpful, or lowest</td>
            <td>Most recent</td>
          </tr>
          <tr>
            <td>Show rating summary</td>
            <td>Show the average score and star breakdown at the top</td>
            <td>On</td>
          </tr>
          <tr>
            <td>Show sort buttons</td>
            <td>Let shoppers reorder the reviews themselves</td>
            <td>On</td>
          </tr>
          <tr>
            <td>Show review photos</td>
            <td>Display photos that customers attached to their reviews</td>
            <td>On</td>
          </tr>
          <tr>
            <td>Show helpful button</td>
            <td>Let shoppers upvote reviews they find useful</td>
            <td>On</td>
          </tr>
          <tr>
            <td>Show verified purchase badge</td>
            <td>Mark reviews written by verified buyers</td>
            <td>On</td>
          </tr>
          <tr>
            <td>Allow customers to delete own reviews</td>
            <td>Let a customer remove a review they wrote</td>
            <td>On</td>
          </tr>
        </tbody>
      </table>

      <H3>Photos and plans</H3>
      <p>
        Photo reviews are available on the <PlanBadge plan="essential" /> plan and above. The{" "}
        <strong>Show review photos</strong> setting only has an effect where photo reviews exist, so
        on the <PlanBadge plan="free" /> plan reviews display as text only.
      </p>

      <H2>Global review look</H2>
      <p>
        The color above sets this block on its own. To style all of your review blocks together
        &mdash; star color, card style, and typography &mdash; set them in{" "}
        <a href="/docs/settings/review-settings">Review Settings</a>. Custom review design (colors,
        card styling, and fonts) is available on the <PlanBadge plan="growth" /> plan and above; a
        per-block color still overrides the global setting.
      </p>

      <H2>Related</H2>
      <ul>
        <li>
          <a href="/docs/widgets/review-form">Review Form</a>: the &quot;Write a review&quot; block
          to pair on the same page.
        </li>
        <li>
          <a href="/docs/widgets/star-badge">Review Star Badge</a>: a compact rating near the product
          title.
        </li>
        <li>
          <a href="/docs/reviews/photo-reviews">Photo Reviews</a>: let customers add photos to their
          reviews.
        </li>
        <li>
          <a href="/docs/settings/review-settings">Review Settings</a>: set the global look for all
          review blocks.
        </li>
      </ul>
    </div>
  );
}
