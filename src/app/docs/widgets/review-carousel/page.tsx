import type { Metadata } from "next";
import { createDocMetadata } from "@/lib/seo";
import { H2 } from "@/components/Heading";
import Callout from "@/components/Callout";
import ReviewCarouselPreview from "@/components/widget-previews/ReviewCarouselPreview";

export const metadata: Metadata = createDocMetadata("/docs/widgets/review-carousel", {
  title: "Review Carousel",
  description:
    "Add a rotating carousel of your top and most recent reviews to the homepage for social proof, with each review linking to its product.",
});

export default function ReviewCarouselPage() {
  return (
    <div className="docs-prose">
      <h1>Review Carousel</h1>
      <p>
        The Review Carousel rotates through your top and most recent reviews from across the store —
        ideal for the homepage, where it builds trust before shoppers reach a product page. Each
        review links to the product it&apos;s about, turning social proof into a path to purchase.
      </p>

      <ReviewCarouselPreview />

      <H2>How to add it</H2>
      <p>The carousel is a block you place inside a section, so you can position it wherever it fits.</p>
      <ol>
        <li>
          In your Shopify admin, go to <strong>Online Store &gt; Themes</strong> and click{" "}
          <strong>Customize</strong>.
        </li>
        <li>
          Open the template where you want it — the homepage is the most common choice.
        </li>
        <li>
          Select a section, click <strong>Add block</strong>, and choose <strong>Review
          Carousel</strong>.
        </li>
        <li>
          Position it — below the hero banner or above the footer both work well — then click{" "}
          <strong>Save</strong>.
        </li>
      </ol>

      <Callout type="tip">
        The carousel works especially well on the homepage, where it can showcase reviews from your
        whole catalog rather than a single product.
      </Callout>

      <H2>What shoppers see</H2>
      <p>
        A rotating set of review cards, each showing the star rating, a snippet of the review, the
        reviewer&apos;s name, and — when photos are enabled — a review photo. Clicking a card takes
        the shopper to that review&apos;s product page.
      </p>

      <H2>Featuring your best reviews</H2>
      <p>
        You control which reviews get the spotlight. In{" "}
        <strong>PerkStack &gt; Reviews &gt; Moderation</strong>, mark strong reviews as{" "}
        <strong>Featured</strong> and the carousel will prioritize them, so your best feedback leads.
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
            <td>Star &amp; accent color</td>
            <td>Color of the stars and accent details in the carousel.</td>
            <td>
              <code>#f59e0b</code> (amber)
            </td>
          </tr>
          <tr>
            <td>Custom heading</td>
            <td>Heading shown above the carousel.</td>
            <td>&quot;What our customers say&quot;</td>
          </tr>
          <tr>
            <td>Max reviews to show</td>
            <td>How many reviews to load into the carousel, from 3 to 20.</td>
            <td>10</td>
          </tr>
          <tr>
            <td>Show review photos</td>
            <td>Includes customer photos on review cards that have them.</td>
            <td>On</td>
          </tr>
        </tbody>
      </table>

      <H2>Related</H2>
      <ul>
        <li>
          <a href="/docs/reviews/moderation">Moderation</a>: approve reviews and mark the best ones
          Featured
        </li>
        <li>
          <a href="/docs/widgets/review-display">Review Display</a>: the full reviews block for
          product pages
        </li>
        <li>
          <a href="/docs/widgets/star-badge">Review Star Badge</a>: a compact rating summary for
          product pages
        </li>
        <li>
          <a href="/docs/widgets/overview">Widgets Overview</a>: every storefront block and where it
          goes
        </li>
      </ul>
    </div>
  );
}
