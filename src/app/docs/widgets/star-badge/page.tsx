import type { Metadata } from "next";
import Callout from "@/components/Callout";
import PlanBadge from "@/components/PlanBadge";
import StarBadgePreview from "@/components/widget-previews/StarBadgePreview";

export const metadata: Metadata = {
  title: "Star Badge",
  description:
    "Show average star ratings and review counts inline on product pages with the PerkStack Star Badge widget.",
};

export default function StarBadgePage() {
  return (
    <div className="docs-prose">
      <h1>Star Badge</h1>
      <p>
        The Star Badge is a compact, inline widget that displays the average star rating and total
        review count for a product. It is designed to sit near the product title or price, providing
        a quick trust signal before customers scroll down to the full review list.
      </p>

      <PlanBadge plan="free" />

      <StarBadgePreview />

      <h2>How It Works</h2>
      <p>
        The widget is rendered by <code>review-star-badge.liquid</code> and uses a{" "}
        <code>section</code> target. It loads <code>perkstack-star-badge.js</code> to fetch and
        render the rating data.
      </p>
      <p>
        The script reads the current product ID from the page context and fetches the aggregated
        rating from the PerkStack API. If the product has no reviews, the badge can either be hidden
        entirely or show &quot;No reviews yet&quot; depending on your configuration.
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
          Click <strong>Add block</strong> inside the product information section (or add it as a
          standalone section).
        </li>
        <li>
          Search for <strong>PerkStack Star Badge</strong> and add it.
        </li>
        <li>
          Drag it to the desired position, ideally just below the product title or next to the
          price.
        </li>
        <li>
          Click <strong>Save</strong>.
        </li>
      </ol>

      <Callout type="tip">
        For the best conversion impact, place the Star Badge directly below the product title so it
        is visible immediately without scrolling.
      </Callout>

      <h2>Display</h2>
      <p>The Star Badge shows two pieces of information:</p>
      <ul>
        <li>
          <strong>Average rating</strong>: displayed as filled, half-filled, and empty stars (e.g.
          ★★★★☆ for 4.0)
        </li>
        <li>
          <strong>Review count</strong>: the total number of approved reviews (e.g. &quot;(42
          reviews)&quot;)
        </li>
      </ul>
      <p>
        Clicking the badge scrolls the page to the Review Display section (if present), giving
        customers a quick way to jump to the full reviews.
      </p>

      <h2>Configuration</h2>
      <p>
        The following settings are available in the theme editor when the Star Badge block is
        selected:
      </p>
      <table>
        <thead>
          <tr>
            <th>Setting</th>
            <th>Description</th>
            <th>Default</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Star colour</td>
            <td>The fill colour for active stars</td>
            <td>Accent colour from PerkStack settings</td>
          </tr>
          <tr>
            <td>Show count</td>
            <td>Whether to display the review count next to the stars</td>
            <td>Enabled</td>
          </tr>
          <tr>
            <td>Empty state</td>
            <td>
              What to show when a product has no reviews: <code>hide</code> (hide the badge
              entirely) or <code>show</code> (display &quot;No reviews yet&quot;)
            </td>
            <td>
              <code>hide</code>
            </td>
          </tr>
          <tr>
            <td>Link to reviews</td>
            <td>When enabled, clicking the badge scrolls to the Review Display section</td>
            <td>Enabled</td>
          </tr>
        </tbody>
      </table>

      <h2>Troubleshooting</h2>
      <ul>
        <li>
          <strong>Badge not showing</strong>: the product may have no approved reviews and the empty
          state is set to <code>hide</code>. Change the setting to <code>show</code> to verify.
        </li>
        <li>
          <strong>Rating seems wrong</strong>: the average is calculated from approved reviews only.
          Pending or rejected reviews are excluded.
        </li>
        <li>
          <strong>Click does not scroll to reviews</strong>: ensure the Review Display section is
          present on the same product page template.
        </li>
      </ul>
    </div>
  );
}
