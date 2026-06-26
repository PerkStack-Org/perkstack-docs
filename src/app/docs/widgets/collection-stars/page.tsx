import type { Metadata } from "next";
import { createDocMetadata } from "@/lib/seo";
import { H2 } from "@/components/Heading";
import Callout from "@/components/Callout";
import PlanBadge from "@/components/PlanBadge";

export const metadata: Metadata = createDocMetadata("/docs/widgets/collection-stars", {
  title: "Collection Stars",
  description:
    "Show star ratings on product cards in collection and search result grids with the PerkStack Collection Stars widget.",
});

export default function CollectionStarsPage() {
  return (
    <div className="docs-prose">
      <h1>Collection Stars</h1>
      <p>
        The Collection Stars widget injects star ratings and review counts into product cards across
        your collection pages, search results, and any other product grid. This lets shoppers
        compare products by rating at a glance, before clicking through to a product page.
      </p>

      <PlanBadge plan="free" />

      <H2>How It Works</H2>
      <p>
        The widget is rendered by <code>review-collection-stars.liquid</code> and uses a{" "}
        <code>body</code> target, so it appears on every page automatically once added to the theme.
        It loads <code>perkstack-collection-stars.js</code>, which:
      </p>
      <ol>
        <li>Scans the page for product cards and collects all visible product IDs.</li>
        <li>
          Makes a single batch API call to fetch ratings for all products at once:
          <pre>
            <code>/apps/perkstack/api/review-ratings?product_ids=123,456,789</code>
          </pre>
        </li>
        <li>Injects a star rating badge into each product card in the DOM.</li>
      </ol>

      <Callout type="info">
        The batch API approach means only one network request is made per page, regardless of how
        many products are shown. This keeps collection pages fast.
      </Callout>

      <H2>Placement</H2>
      <ol>
        <li>
          Go to <strong>Online Store &gt; Themes &gt; Customize</strong>.
        </li>
        <li>
          In the theme editor sidebar, click <strong>Add block</strong> under the global
          (body-level) section.
        </li>
        <li>
          Search for <strong>PerkStack Collection Stars</strong> and add it.
        </li>
        <li>
          Click <strong>Save</strong>.
        </li>
      </ol>

      <Callout type="tip">
        Because this is a <code>body</code>-level block, you only add it once and it works
        everywhere: collection pages, search results, featured product grids on the homepage, and
        any other template that renders product cards.
      </Callout>

      <H2>Theme Compatibility</H2>
      <p>
        The Collection Stars script looks for standard Shopify product card markup to inject the
        rating badges. It works out of the box with most Online Store 2.0 themes, including Dawn. If
        your theme uses non-standard product card markup, the script may need a CSS selector
        override.
      </p>
      <p>Supported card structures:</p>
      <ul>
        <li>
          Cards with a <code>data-product-id</code> attribute
        </li>
        <li>
          Cards using Shopify&apos;s standard <code>product-card</code> component
        </li>
        <li>
          Cards inside elements with the <code>.card</code> or <code>.product-card</code> CSS class
        </li>
      </ul>

      <H2>Configuration</H2>
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
            <td>Fill colour for the rating stars</td>
            <td>Accent colour from PerkStack settings</td>
          </tr>
          <tr>
            <td>Show count</td>
            <td>Display the review count alongside the stars</td>
            <td>Enabled</td>
          </tr>
          <tr>
            <td>Hide if no reviews</td>
            <td>If enabled, products with zero reviews do not show a rating badge</td>
            <td>Enabled</td>
          </tr>
          <tr>
            <td>Star size</td>
            <td>Size of the star icons (small, medium, large)</td>
            <td>Small</td>
          </tr>
        </tbody>
      </table>

      <H2>Performance</H2>
      <p>The widget is designed to have minimal impact on page performance:</p>
      <ul>
        <li>A single batch API request fetches all ratings in one call.</li>
        <li>The script runs after the page has finished loading (deferred execution).</li>
        <li>
          Ratings are cached in the browser session to avoid redundant requests when navigating
          between pages.
        </li>
      </ul>

      <H2>Troubleshooting</H2>
      <ul>
        <li>
          <strong>Stars not appearing on cards</strong>: your theme may use non-standard product
          card markup. Check the browser console for errors from the Collection Stars script.
        </li>
        <li>
          <strong>Wrong ratings</strong>: ensure the product IDs in the DOM match the products in
          your PerkStack dashboard. Rating data comes from approved reviews only.
        </li>
        <li>
          <strong>Stars appear on the wrong element</strong>: this can happen if the theme uses
          nested cards. Contact support for a CSS selector adjustment.
        </li>
      </ul>
    </div>
  );
}
