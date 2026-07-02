import type { Metadata } from "next";
import { createDocMetadata } from "@/lib/seo";
import { H2, H3 } from "@/components/Heading";
import Callout from "@/components/Callout";
import PlanBadge from "@/components/PlanBadge";

export const metadata: Metadata = createDocMetadata("/docs/widgets/overview", {
  title: "Overview",
  description:
    "The storefront widgets and blocks that bring your PerkStack loyalty program and reviews to your Shopify store, checkout, and customer account.",
});

export default function WidgetsOverviewPage() {
  return (
    <div className="docs-prose">
      <h1>Overview</h1>
      <p>
        PerkStack shows up on your storefront through a set of blocks you add in Shopify&apos;s own
        editors. Each one puts a piece of your loyalty program or reviews in front of shoppers &mdash;
        a floating rewards button, an on-page reviews section, points at checkout, and more. This
        page maps out every surface and where it lives.
      </p>

      <H2>The three places PerkStack appears</H2>
      <p>Your PerkStack blocks live in three different Shopify editors:</p>
      <ul>
        <li>
          <strong>Your storefront theme</strong> &mdash; added in the theme editor (
          <strong>Online Store &rarr; Themes &rarr; Customize</strong>). This is where most blocks
          live: the loyalty launcher, the reviews blocks, and the storefront loyalty page.
        </li>
        <li>
          <strong>Checkout</strong> &mdash; added in the checkout editor (
          <strong>Settings &rarr; Checkout &rarr; Customize</strong>).
        </li>
        <li>
          <strong>Customer account</strong> &mdash; added in the customer account editor (
          <strong>Settings &rarr; Customer accounts &rarr; Customize</strong>).
        </li>
      </ul>

      <H3>Two kinds of theme block</H3>
      <p>
        In the theme editor, PerkStack blocks are added in one of two ways, and the difference
        matters for where they end up:
      </p>
      <ul>
        <li>
          <strong>App embeds</strong> float across your whole store. You turn them on in{" "}
          <strong>App embeds</strong> at the bottom of the theme editor&apos;s left sidebar &mdash;
          you don&apos;t place them by hand. The <strong>Loyalty Launcher</strong> and{" "}
          <strong>Review Collection Stars</strong> work this way.
        </li>
        <li>
          <strong>Section blocks</strong> are placed exactly where you want them. You use{" "}
          <strong>Add block</strong> inside a section (usually the product template) to drop them in
          &mdash; for example the <strong>Review Display</strong> and <strong>Review Form</strong>.
        </li>
      </ul>

      <Callout type="info">
        Two surfaces both show a full loyalty dashboard, and it&apos;s easy to mix them up. The{" "}
        <strong>Loyalty Page</strong> is a theme block you place on a storefront page (usually a
        &quot;Rewards&quot; page). <strong>Loyalty Studio</strong> is a separate block that lives
        inside Shopify&apos;s customer account area. You can use either, or both.
      </Callout>

      <H2>Where the styling comes from</H2>
      <p>
        For the loyalty blocks, the theme editor only controls the essentials &mdash; placement, a
        button label, and light / dark / auto to match your store. The deeper look (heading and
        subheading copy, panel colors, fonts, card style, button shape, hero image, and logo) is set
        once in the app under <strong>Settings &rarr; Widget Customization</strong>, and it applies
        everywhere the loyalty blocks appear.
      </p>
      <p>
        Full brand matching &mdash; custom colors, fonts, and a hero image &mdash; is available on the{" "}
        <PlanBadge plan="growth" /> plan and above. Every plan can set an accent color and choose
        light, dark, or auto.
      </p>

      <H2>Loyalty widgets</H2>
      <ul>
        <li>
          <a href="/docs/widgets/loyalty-launcher">Loyalty Launcher</a>: a floating rewards button
          that opens a panel with balance, tier progress, ways to earn, and rewards.
        </li>
        <li>
          <a href="/docs/widgets/loyalty-page">Loyalty Page</a>: a full rewards dashboard you embed
          on a dedicated storefront page.
        </li>
        <li>
          <a href="/docs/widgets/checkout-widget">Checkout Rewards</a>: points balance, tier, and
          redeemable rewards inside the Shopify checkout. <PlanBadge plan="essential" /> and above.
        </li>
        <li>
          <a href="/docs/widgets/customer-account">Loyalty Studio</a>: the members&apos; loyalty
          dashboard inside the Shopify customer account area.
        </li>
      </ul>

      <H2>Review widgets</H2>
      <ul>
        <li>
          <a href="/docs/widgets/review-display">Review Display</a>: the main on-product reviews
          block &mdash; rating summary, review list or grid, photos, and verified badges.
        </li>
        <li>
          <a href="/docs/widgets/review-form">Review Form</a>: the &quot;Write a review&quot; form
          with rating, photos, and an optional points incentive.
        </li>
        <li>
          <a href="/docs/widgets/star-badge">Review Star Badge</a>: a compact star rating and count
          for a single product, usually near the title.
        </li>
        <li>
          <a href="/docs/widgets/collection-stars">Review Collection Stars</a>: star ratings on
          product cards across collection and listing pages.
        </li>
        <li>
          <a href="/docs/widgets/review-carousel">Review Carousel</a>: a rotating carousel of your
          best reviews, great for the homepage.
        </li>
        <li>
          <strong>Review SEO</strong>: an invisible block that adds review rich-snippet data to a
          product page so Google can show star ratings in search results. Add it on product pages
          that show reviews; it has no visible display and no settings.
        </li>
      </ul>

      <Callout type="tip">
        On product pages, add the <strong>Review Display</strong> and <strong>Review Form</strong>{" "}
        together so shoppers can read reviews and write their own in the same place. Add{" "}
        <strong>Review SEO</strong> alongside them to earn star ratings in Google.
      </Callout>

      <H2>Related</H2>
      <ul>
        <li>
          <a href="/docs/dashboard/extension-status">Theme Setup &amp; Status</a>: confirm your
          blocks are installed and active.
        </li>
        <li>
          <a href="/docs/settings/widget-customization">Widget Customization</a>: set the brand look
          for your loyalty blocks in one place.
        </li>
        <li>
          <a href="/docs/settings/review-settings">Review Settings</a>: global appearance for your
          review blocks.
        </li>
        <li>
          <a href="/docs/reviews/overview">Reviews Overview</a>: how review collection and display
          work end to end.
        </li>
      </ul>
    </div>
  );
}
