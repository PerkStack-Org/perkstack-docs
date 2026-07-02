import type { Metadata } from "next";
import { createDocMetadata } from "@/lib/seo";
import { H2, H3 } from "@/components/Heading";
import Callout from "@/components/Callout";
import PlanBadge from "@/components/PlanBadge";

export const metadata: Metadata = createDocMetadata("/docs/dashboard/extension-status", {
  title: "Theme Setup & Status",
  description:
    "The Theme Setup checklist shows which PerkStack blocks are live on your store, grouped into Loyalty, Reviews, and Admin pages, so you can confirm you are fully set up.",
});

export default function ThemeSetupStatusPage() {
  return (
    <div className="docs-prose">
      <h1>Theme Setup &amp; Status</h1>
      <p>
        The <strong>Theme Setup</strong> checklist on your Dashboard is a live map of where PerkStack
        appears on your store. Each row tells you whether a block is in place, so you can confirm your
        storefront is fully set up at a glance and fix anything that&apos;s missing.
      </p>

      <H2>The three groups</H2>
      <p>The checklist is organized into three sections:</p>

      <H3>Loyalty</H3>
      <ul>
        <li>
          <strong>Loyalty Launcher</strong>: the floating rewards button, enabled as an app embed for
          every page.
        </li>
        <li>
          <strong>Loyalty Page</strong>: an optional full-page rewards view you add to a page.
        </li>
      </ul>

      <H3>Reviews</H3>
      <ul>
        <li>
          <strong>Review Display</strong>, <strong>Review Form</strong>, and{" "}
          <strong>Review Star Badge</strong> for product pages.
        </li>
        <li>
          <strong>Review Collection Stars</strong> for collection pages, <strong>Review Carousel</strong>{" "}
          for your homepage, and <strong>Review SEO</strong> so star ratings can show in search
          results.
        </li>
      </ul>

      <H3>Admin pages</H3>
      <ul>
        <li>
          <strong>Loyalty program</strong> and <strong>Customer reviews</strong> blocks that appear
          on Shopify&apos;s own customer detail pages in your admin, giving your team loyalty and
          review context in place.
        </li>
      </ul>

      <p>
        Each row has a button that opens a short video walkthrough, then sends you to the right editor
        to add or manage that block.
      </p>

      <H2>What &ldquo;Active&rdquo; and &ldquo;Not added&rdquo; mean</H2>
      <p>
        Every row shows one of two states with a status dot:
      </p>
      <ul>
        <li>
          <strong>Active</strong>: the block is added and in place on your store.
        </li>
        <li>
          <strong>Not added</strong>: PerkStack doesn&apos;t see the block yet — add it to go live.
        </li>
      </ul>
      <p>
        For the storefront blocks, PerkStack checks your published theme for the block. For the
        checkout, customer-account, and admin-page blocks, a row shows <strong>Active</strong> once
        the block has been added and has loaded recently for a customer or in your admin.
      </p>

      <Callout type="info">
        Because those checkout, account, and admin rows are confirmed by real loads, a block you just
        added can still read <strong>Not added</strong> until it is loaded once. Open the page it
        lives on, then refresh your Dashboard and it will turn Active.
      </Callout>

      <Callout type="warning">
        Storefront blocks are detected on your <strong>published</strong> theme. If a block shows as
        not added but you know you placed it, check that you added it to the live theme rather than a
        draft, and that it is saved.
      </Callout>

      <H2>Checkout and account rows</H2>
      <p>
        The <strong>Checkout Rewards</strong> and <strong>Loyalty Studio</strong> (customer account)
        rows appear only for <strong>Shopify Plus</strong> stores, since those surfaces rely on
        Shopify&apos;s checkout and account extensibility. Checkout Rewards also requires the{" "}
        <PlanBadge plan="essential" /> plan or higher. If your store isn&apos;t on Shopify Plus, these
        rows simply won&apos;t show.
      </p>

      <Callout type="info">
        If PerkStack can&apos;t check your theme at that moment, a notice appears on the card. It
        clears on its own — refresh the Dashboard to check again.
      </Callout>

      <H2>Related</H2>
      <ul>
        <li>
          <a href="/docs/getting-started/going-live">Going Live on Your Store</a>: step-by-step,
          working through the checklist
        </li>
        <li>
          <a href="/docs/dashboard/overview">Dashboard Overview</a>: where the Theme Setup card lives
        </li>
        <li>
          <a href="/docs/widgets/overview">Widgets Overview</a>: every storefront block explained
        </li>
        <li>
          <a href="/docs/customers/admin-blocks">Customer Page Blocks</a>: the admin-page loyalty and
          reviews blocks
        </li>
      </ul>
    </div>
  );
}
