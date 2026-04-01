import type { Metadata } from "next";
import Callout from "@/components/Callout";
import PlanBadge from "@/components/PlanBadge";
import ReviewCarouselPreview from "@/components/widget-previews/ReviewCarouselPreview";

export const metadata: Metadata = {
  title: "Review Carousel",
  description:
    "Display a horizontal carousel of photo reviews on any page of your storefront with the PerkStack Review Carousel.",
};

export default function ReviewCarouselPage() {
  return (
    <div className="docs-prose">
      <h1>Review Carousel</h1>
      <p>
        The Review Carousel is a horizontal, scrollable carousel that showcases your best photo
        reviews. It is ideal for homepages, landing pages, or any section where you want to
        highlight visual customer feedback, adding social proof with an eye-catching, interactive
        component.
      </p>

      <PlanBadge plan="free" />

      <ReviewCarouselPreview />

      <h2>How It Works</h2>
      <p>
        The widget is rendered by <code>review-carousel.liquid</code> and uses a{" "}
        <code>section</code> target. It loads <code>perkstack-carousel.js</code> to handle the
        carousel interaction, including smooth scrolling, swipe gestures on mobile, and
        auto-advancement.
      </p>
      <p>
        Review photos are served from Cloudflare R2 using the public URL stored in the shop
        metafield <code>shop.metafields.perkstack.r2_public_url</code>.
      </p>

      <h2>Placement</h2>
      <ol>
        <li>
          Go to <strong>Online Store &gt; Themes &gt; Customize</strong>.
        </li>
        <li>
          Navigate to the page template where you want the carousel (e.g. homepage, product page, or
          a custom landing page).
        </li>
        <li>
          Click <strong>Add section</strong> and search for{" "}
          <strong>PerkStack Review Carousel</strong>.
        </li>
        <li>
          Position the section. Popular placements include below the hero banner on the homepage or
          above the footer.
        </li>
        <li>
          Click <strong>Save</strong>.
        </li>
      </ol>

      <Callout type="tip">
        The carousel works especially well on the homepage where it can showcase reviews from across
        your entire product catalogue, not just a single product.
      </Callout>

      <h2>What Each Slide Shows</h2>
      <p>Each carousel slide displays:</p>
      <ul>
        <li>
          <strong>Review photo</strong>: the primary image uploaded by the customer, displayed as a
          square thumbnail
        </li>
        <li>
          <strong>Star rating</strong>: the reviewer&apos;s rating
        </li>
        <li>
          <strong>Review snippet</strong>: a truncated version of the review body text
        </li>
        <li>
          <strong>Reviewer name</strong>: the customer&apos;s display name
        </li>
        <li>
          <strong>Product name</strong>: the product the review is for, linked to the product page
        </li>
      </ul>

      <h2>Configuration</h2>
      <p>
        The following settings are available in the theme editor when the Review Carousel section is
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
            <td>Section heading</td>
            <td>Title displayed above the carousel (e.g. &quot;What Our Customers Say&quot;)</td>
            <td>&quot;Customer Reviews&quot;</td>
          </tr>
          <tr>
            <td>Max reviews</td>
            <td>Maximum number of reviews to load into the carousel</td>
            <td>12</td>
          </tr>
          <tr>
            <td>Auto-scroll</td>
            <td>Automatically advance slides at a set interval</td>
            <td>Enabled (5 seconds)</td>
          </tr>
          <tr>
            <td>Minimum rating</td>
            <td>
              Only show reviews with this rating or higher (e.g. set to 4 to show only 4- and 5-star
              reviews)
            </td>
            <td>4</td>
          </tr>
          <tr>
            <td>Photos only</td>
            <td>Only include reviews that have at least one photo</td>
            <td>Enabled</td>
          </tr>
        </tbody>
      </table>

      <h2>Interaction</h2>
      <ul>
        <li>
          <strong>Desktop</strong>: left/right arrow buttons on either side of the carousel, plus
          click-and-drag scrolling
        </li>
        <li>
          <strong>Mobile</strong>: native swipe gestures with momentum scrolling
        </li>
        <li>
          <strong>Clicking a slide</strong>: opens the full review in a lightbox overlay with the
          complete review text and all photos
        </li>
      </ul>

      <Callout type="info">
        Auto-scroll pauses automatically when a customer hovers over the carousel (desktop) or
        touches it (mobile), so it never interrupts active browsing.
      </Callout>

      <h2>Troubleshooting</h2>
      <ul>
        <li>
          <strong>Carousel is empty</strong>: make sure you have approved photo reviews. If
          &quot;Photos only&quot; is enabled, text-only reviews are excluded.
        </li>
        <li>
          <strong>Images not loading</strong>: verify the <code>perkstack.r2_public_url</code> shop
          metafield is set correctly.
        </li>
        <li>
          <strong>Carousel only shows reviews for one product</strong>: by default, the carousel
          pulls reviews from all products. If placed on a product page, it may filter to that
          product; check your configuration.
        </li>
      </ul>
    </div>
  );
}
