import type { Metadata } from "next";
import { createDocMetadata } from "@/lib/seo";
import { H2 } from "@/components/Heading";
import Callout from "@/components/Callout";
import StarBadgePreview from "@/components/widget-previews/StarBadgePreview";

export const metadata: Metadata = createDocMetadata("/docs/widgets/star-badge", {
  title: "Review Star Badge",
  description:
    "Show a compact star rating and review count near your product title so shoppers see social proof at a glance and can jump straight to the reviews.",
});

export default function StarBadgePage() {
  return (
    <div className="docs-prose">
      <h1>Review Star Badge</h1>
      <p>
        The Review Star Badge shows a product&apos;s average rating and review count in a small,
        one-line summary — perfect just under the product title or price. When a shopper clicks it,
        the page scrolls straight to the reviews. It&apos;s the quickest way to put social proof
        where buyers look first.
      </p>

      <StarBadgePreview />

      <H2>How to add it</H2>
      <p>
        The star badge is a block you place inside a section, so you can position it exactly where it
        belongs on the product page.
      </p>
      <ol>
        <li>
          In your Shopify admin, go to <strong>Online Store &gt; Themes</strong> and click{" "}
          <strong>Customize</strong>.
        </li>
        <li>Open your product template.</li>
        <li>
          Select the section near the product title or price, then click <strong>Add block</strong>.
        </li>
        <li>
          Choose <strong>Review Star Badge</strong>.
        </li>
        <li>
          Drag it into place — typically just below the title — then click <strong>Save</strong>.
        </li>
      </ol>

      <Callout type="tip">
        The badge scrolls to reviews only if the full{" "}
        <a href="/docs/widgets/review-display">Review Display</a> block is also on the product page.
        Add both so the link has somewhere to go.
      </Callout>

      <H2>What shoppers see</H2>
      <p>
        A row of stars showing the average rating, optionally followed by the number of reviews (for
        example, ★★★★☆ (24)). Products with no reviews yet show empty stars. Clicking the badge
        smoothly scrolls the page down to the reviews.
      </p>

      <H2>Settings</H2>
      <p>Select the block in the theme editor to adjust these:</p>
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
            <td>Star color</td>
            <td>The fill color of the stars. Set it to match your brand or accent color.</td>
            <td>
              <code>#f59e0b</code> (amber)
            </td>
          </tr>
          <tr>
            <td>Show review count</td>
            <td>Shows the number of reviews next to the stars.</td>
            <td>On</td>
          </tr>
        </tbody>
      </table>

      <H2>Related</H2>
      <ul>
        <li>
          <a href="/docs/widgets/review-display">Review Display</a>: the full reviews block the badge
          scrolls to
        </li>
        <li>
          <a href="/docs/widgets/collection-stars">Review Collection Stars</a>: show ratings on
          product cards across collection pages
        </li>
        <li>
          <a href="/docs/widgets/review-carousel">Review Carousel</a>: highlight top reviews on your
          homepage
        </li>
        <li>
          <a href="/docs/widgets/overview">Widgets Overview</a>: every storefront block and where it
          goes
        </li>
      </ul>
    </div>
  );
}
