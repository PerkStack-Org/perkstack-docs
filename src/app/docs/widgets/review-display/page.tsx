import type { Metadata } from "next";
import { createDocMetadata } from "@/lib/seo";
import { H2, H3 } from "@/components/Heading";
import Callout from "@/components/Callout";
import PlanBadge from "@/components/PlanBadge";
import ReviewDisplayPreview from "@/components/widget-previews/ReviewDisplayPreview";

export const metadata: Metadata = createDocMetadata("/docs/widgets/review-display", {
  title: "Review Display",
  description:
    "Display approved product reviews on your storefront with ratings, photos, verified badges, and helpful votes.",
});

export default function ReviewDisplayPage() {
  return (
    <div className="docs-prose">
      <h1>Review Display</h1>
      <p>
        The Review Display widget renders a full list of approved reviews on any product page. It
        shows star ratings, reviewer names, review body text, uploaded photos, verified purchase
        badges, and helpful vote counts, giving shoppers the social proof they need to buy with
        confidence.
      </p>

      <PlanBadge plan="free" />

      <ReviewDisplayPreview />

      <H2>How It Works</H2>
      <p>
        The widget is powered by <code>review-display.liquid</code> and uses a <code>section</code>{" "}
        target, so it must be added to each template where you want reviews to appear (typically the
        product page template).
      </p>
      <p>When the section loads, it calls the app proxy endpoint:</p>
      <pre>
        <code>/apps/perkstack/api/reviews?product_id=&#123;product.id&#125;</code>
      </pre>
      <p>
        This returns all approved reviews for the current product, including ratings, review text,
        photos, and metadata.
      </p>

      <H2>Placement</H2>
      <ol>
        <li>
          Go to <strong>Online Store &gt; Themes &gt; Customize</strong>.
        </li>
        <li>
          Navigate to a <strong>product page</strong> template in the theme editor.
        </li>
        <li>
          Click <strong>Add section</strong> and search for{" "}
          <strong>PerkStack Review Display</strong>.
        </li>
        <li>
          Drag the section to your preferred position (typically below the product description or
          below the &quot;Add to Cart&quot; section).
        </li>
        <li>
          Click <strong>Save</strong>.
        </li>
      </ol>

      <Callout type="tip">
        Place the Review Display section below the main product content so customers see the product
        details first and reviews second, which follows established e-commerce patterns.
      </Callout>

      <H2>What Each Review Shows</H2>
      <table>
        <thead>
          <tr>
            <th>Element</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Star rating</td>
            <td>1–5 star visual rating for the review</td>
          </tr>
          <tr>
            <td>Reviewer name</td>
            <td>Display name of the customer who left the review</td>
          </tr>
          <tr>
            <td>Review body</td>
            <td>The full text of the review</td>
          </tr>
          <tr>
            <td>Photos</td>
            <td>
              Customer-uploaded images displayed as thumbnails that expand on click. Photos are
              served from Cloudflare R2 via the URL stored in{" "}
              <code>shop.metafields.perkstack.r2_public_url</code>.
            </td>
          </tr>
          <tr>
            <td>Verified badge</td>
            <td>Shown when the reviewer has a confirmed purchase of the product</td>
          </tr>
          <tr>
            <td>Helpful votes</td>
            <td>Count of &quot;helpful&quot; votes from other customers, with a button to vote</td>
          </tr>
        </tbody>
      </table>

      <H2>Features</H2>
      <H3>Pagination</H3>
      <p>
        Reviews are paginated automatically. The widget loads a configurable number of reviews per
        page and displays navigation controls to browse through additional pages. This keeps the
        product page fast even for products with hundreds of reviews.
      </p>

      <H3>Sorting</H3>
      <p>Customers can sort reviews by:</p>
      <ul>
        <li>
          <strong>Most recent</strong>: newest reviews first
        </li>
        <li>
          <strong>Highest rated</strong>: 5-star reviews first
        </li>
        <li>
          <strong>Lowest rated</strong>: 1-star reviews first
        </li>
        <li>
          <strong>Most helpful</strong>: reviews with the most helpful votes first
        </li>
      </ul>

      <H3>Photo Gallery</H3>
      <p>
        When a review includes photos, they are displayed as thumbnails below the review text.
        Clicking a thumbnail opens a lightbox gallery. All images are served from Cloudflare R2 for
        fast global delivery.
      </p>

      <H2>Configuration</H2>
      <p>The Review Display block exposes the following settings in the theme editor sidebar:</p>
      <ul>
        <li>
          <strong>Reviews per page</strong>: number of reviews to show before pagination kicks in
          (default: 10)
        </li>
        <li>
          <strong>Default sort order</strong>: the initial sort applied when the page loads
        </li>
        <li>
          <strong>Show photos</strong>: toggle photo thumbnails on or off
        </li>
        <li>
          <strong>Show verified badge</strong>: toggle the verified purchase indicator
        </li>
      </ul>

      <H2>Structured Data</H2>
      <p>
        The Review Display widget automatically outputs JSON-LD structured data for each
        product&apos;s reviews. This enables search engines to display{" "}
        <strong>rich snippets</strong> (star ratings and review counts) in Google search results,
        which can improve click-through rates.
      </p>

      <Callout type="info">
        Rich snippets may take a few days to appear in search results after reviews are published.
        Google re-crawls pages on its own schedule.
      </Callout>

      <H2>Troubleshooting</H2>
      <ul>
        <li>
          <strong>No reviews showing</strong>: confirm you have at least one approved review for the
          product. Draft or pending reviews are not displayed.
        </li>
        <li>
          <strong>Photos not loading</strong>: verify that the <code>perkstack.r2_public_url</code>{" "}
          metafield is set on the shop. This is configured automatically during installation.
        </li>
        <li>
          <strong>Section not available</strong>: ensure your theme supports Online Store 2.0
          sections on product pages.
        </li>
      </ul>
    </div>
  );
}
