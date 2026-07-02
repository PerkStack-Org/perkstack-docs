import type { Metadata } from "next";
import { createDocMetadata } from "@/lib/seo";
import { H2 } from "@/components/Heading";
import Callout from "@/components/Callout";

export const metadata: Metadata = createDocMetadata("/docs/widgets/collection-stars", {
  title: "Review Collection Stars",
  description:
    "Add star ratings to product cards on your collection and listing pages so shoppers can compare products by rating before they click through.",
});

export default function CollectionStarsPage() {
  return (
    <div className="docs-prose">
      <h1>Review Collection Stars</h1>
      <p>
        Review Collection Stars adds a compact star rating to every product card on your collection
        and listing pages. Shoppers can compare products by rating at a glance while they browse,
        which surfaces your best-reviewed items and helps them decide faster.
      </p>

      <H2>How to add it</H2>
      <p>
        This is an app embed that finds product cards automatically, so you turn it on once and it
        applies across your grids — no manual placement needed.
      </p>
      <ol>
        <li>
          In your Shopify admin, go to <strong>Online Store &gt; Themes</strong> and click{" "}
          <strong>Customize</strong>.
        </li>
        <li>
          In the theme editor, open <strong>App embeds</strong> from the bottom of the left sidebar.
        </li>
        <li>
          Turn on <strong>Review Collection Stars</strong>.
        </li>
        <li>Click <strong>Save</strong>.</li>
      </ol>

      <Callout type="tip">
        Because it&apos;s an app embed, you enable it just once and it works everywhere product cards
        appear — collection pages, search results, and featured product grids on the homepage.
      </Callout>

      <H2>What shoppers see</H2>
      <p>
        A small row of stars and, optionally, a review count added to each product card in the grid.
        By default, products without reviews still show empty stars and a &quot;No reviews&quot;
        label so the grid stays visually consistent.
      </p>

      <H2>Settings</H2>
      <p>Expand the app embed in the theme editor to adjust these:</p>
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
            <td>Filled star color</td>
            <td>Color of the filled portion of each star.</td>
            <td>
              <code>#f59e0b</code> (amber)
            </td>
          </tr>
          <tr>
            <td>Empty star color</td>
            <td>Color of the unfilled portion of each star.</td>
            <td>
              <code>#d1d5db</code> (light gray)
            </td>
          </tr>
          <tr>
            <td>Count text color</td>
            <td>Color of the review-count text next to the stars.</td>
            <td>
              <code>#666666</code> (gray)
            </td>
          </tr>
          <tr>
            <td>Star size</td>
            <td>Size of the stars, from 10 to 24 pixels.</td>
            <td>14 px</td>
          </tr>
          <tr>
            <td>Show review count</td>
            <td>Shows the number of reviews next to the stars.</td>
            <td>On</td>
          </tr>
          <tr>
            <td>Show on products with no reviews</td>
            <td>
              Renders empty stars and a &quot;No reviews&quot; label on un-reviewed products so every
              card looks consistent. Turn this off to hide the rating entirely on those products.
            </td>
            <td>On</td>
          </tr>
        </tbody>
      </table>

      <H2>Related</H2>
      <ul>
        <li>
          <a href="/docs/widgets/star-badge">Review Star Badge</a>: the single-product rating badge
          for product pages
        </li>
        <li>
          <a href="/docs/widgets/review-display">Review Display</a>: the full reviews block for
          product pages
        </li>
        <li>
          <a href="/docs/widgets/review-carousel">Review Carousel</a>: rotate your best reviews on
          the homepage
        </li>
        <li>
          <a href="/docs/widgets/overview">Widgets Overview</a>: every storefront block and where it
          goes
        </li>
      </ul>
    </div>
  );
}
