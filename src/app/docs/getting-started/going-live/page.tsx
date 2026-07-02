import type { Metadata } from "next";
import { createDocMetadata } from "@/lib/seo";
import { H2, H3 } from "@/components/Heading";
import Callout from "@/components/Callout";
import PlanBadge from "@/components/PlanBadge";

export const metadata: Metadata = createDocMetadata("/docs/getting-started/going-live", {
  title: "Going Live on Your Store",
  description:
    "Turn PerkStack on in your storefront: use the Dashboard Theme Setup checklist to enable the loyalty launcher, add review blocks, and add customer-page blocks.",
});

export default function GoingLivePage() {
  return (
    <div className="docs-prose">
      <h1>Going Live on Your Store</h1>
      <p>
        Finishing the setup wizard prepares your program behind the scenes, but shoppers won&apos;t
        see anything until you add PerkStack&apos;s blocks to your storefront. This is the one manual
        step to go live, and your Dashboard walks you through it.
      </p>

      <H2>Start from the Theme Setup checklist</H2>
      <p>
        On your Dashboard you&apos;ll find a <strong>Theme Setup</strong> card that lists every place
        PerkStack can appear, grouped into <strong>Loyalty</strong>, <strong>Reviews</strong>, and{" "}
        <strong>Admin pages</strong>. Each row shows whether that block is active and gives you a
        button that opens a short video walkthrough and then takes you to the right editor. Work down
        the list and the counter fills in as each block goes live.
      </p>

      <Callout type="info">
        A row flips to <strong>Active</strong> once PerkStack detects the block on your published
        theme. If you just added one and it still shows as not added, give it a moment and refresh —
        detection runs each time the Dashboard loads. See{" "}
        <a href="/docs/dashboard/extension-status">Theme Setup &amp; Status</a> for details.
      </Callout>

      <H2>Turn on the loyalty launcher</H2>
      <p>
        The <strong>Loyalty Launcher</strong> is the floating button that opens your rewards panel on
        every page. It is an app embed, so you enable it once for the whole store:
      </p>
      <ol>
        <li>
          From the Theme Setup checklist, click the launcher&apos;s <strong>Set up</strong> button
          (or go to <strong>Online Store → Themes → Customize</strong>).
        </li>
        <li>
          Open <strong>App embeds</strong> in the theme editor and toggle{" "}
          <strong>Loyalty Launcher</strong> on.
        </li>
        <li>
          Click <strong>Save</strong>.
        </li>
      </ol>
      <p>
        You can also add the full-page <strong>Loyalty Page</strong> block to a dedicated page if you
        want a complete rewards view alongside the floating launcher.
      </p>

      <H2>Add review blocks to product pages</H2>
      <p>
        Reviews do their job on your product pages. In the theme editor, open a product template and
        add the blocks you want where you want them:
      </p>
      <ul>
        <li>
          <strong>Review Display</strong>: the list of customer reviews for that product.
        </li>
        <li>
          <strong>Review Form</strong>: lets customers write a review inline.
        </li>
        <li>
          <strong>Review Star Badge</strong>: the average rating and review count near the title.
        </li>
      </ul>
      <p>
        You can also place <strong>Review Collection Stars</strong> on collection pages and a{" "}
        <strong>Review Carousel</strong> on your homepage for social proof, plus a{" "}
        <strong>Review SEO</strong> block so star ratings can show in search results.
      </p>

      <H2>Checkout and account blocks <PlanBadge plan="essential" /></H2>
      <p>
        If your store is on <strong>Shopify Plus</strong>, you can extend PerkStack into two more
        places:
      </p>
      <ul>
        <li>
          <strong>Checkout Rewards</strong>: shows points and rewards during checkout. Add it from
          the checkout editor. (Requires the <PlanBadge plan="essential" /> plan or higher.)
        </li>
        <li>
          <strong>Loyalty Studio</strong>: a loyalty page inside your customers&apos; Shopify
          accounts. Add it from the customer-account editor.
        </li>
      </ul>

      <Callout type="info">
        The checkout and customer-account blocks are available on Shopify Plus stores only, because
        they rely on Shopify&apos;s checkout and account extensibility.
      </Callout>

      <H3>Customer-page blocks in your admin</H3>
      <p>
        Two more blocks live on Shopify&apos;s own customer detail pages, giving your team loyalty
        and review context without leaving the admin. Open <strong>Customers</strong> in your Shopify
        admin, choose a customer, click <strong>Add block</strong>, and add:
      </p>
      <ul>
        <li>
          <strong>Loyalty program</strong>: view and adjust the customer&apos;s points, tier, and
          rewards.
        </li>
        <li>
          <strong>Customer reviews</strong>: every review that customer has submitted.
        </li>
      </ul>
      <p>
        Because Shopify has no direct link to add these, the checklist opens a short walkthrough to
        show you where. See <a href="/docs/customers/admin-blocks">Customer Page Blocks</a>.
      </p>

      <H2>Where placement ends and design begins</H2>
      <p>
        Your theme editor controls <strong>where</strong> each block appears and whether it is on or
        off. The <strong>colors, copy, and fonts</strong> live inside PerkStack, so you style
        everything in one place and it stays consistent across your store.
      </p>

      <Callout type="tip">
        Add blocks in the theme editor first, then fine-tune their look in{" "}
        <a href="/docs/settings/widget-customization">Widget Customization</a>. There is no styling to
        do in the theme editor itself.
      </Callout>

      <H2>Related</H2>
      <ul>
        <li>
          <a href="/docs/dashboard/extension-status">Theme Setup &amp; Status</a>: how each block&apos;s
          status is detected
        </li>
        <li>
          <a href="/docs/widgets/overview">Widgets Overview</a>: every storefront block explained
        </li>
        <li>
          <a href="/docs/settings/widget-customization">Widget Customization</a>: style the launcher
          and rewards panel
        </li>
        <li>
          <a href="/docs/customers/admin-blocks">Customer Page Blocks</a>: the loyalty and reviews
          blocks in your admin
        </li>
      </ul>
    </div>
  );
}
