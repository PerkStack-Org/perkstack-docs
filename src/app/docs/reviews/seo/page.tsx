import type { Metadata } from "next";
import { createDocMetadata } from "@/lib/seo";
import { H2 } from "@/components/Heading";
import Callout from "@/components/Callout";

export const metadata: Metadata = createDocMetadata("/docs/reviews/seo", {
  title: "SEO & Rich Snippets",
  description:
    "Show your product star ratings in Google search results. Add the Review SEO block to your product pages — no settings, no code.",
});

export default function SeoPage() {
  return (
    <div className="docs-prose">
      <h1>SEO &amp; Rich Snippets</h1>
      <p>
        Star ratings in Google search results catch the eye and lift click-through. PerkStack&apos;s{" "}
        <strong>Review SEO</strong> block adds the structured data search engines need to show those
        ratings, so your hard-earned reviews work for you in search, not just on your product page.
      </p>

      <H2>How it works</H2>
      <p>
        The Review SEO block adds review rich snippets to your product pages — behind-the-scenes
        information that tells search engines your product&apos;s average rating and review count.
        Google can then display star ratings beneath your product link in search results. There are
        no settings to configure: you add the block, and it does its job.
      </p>

      <Callout type="info">
        Only approved reviews count toward the rating shown in search. Pending, rejected, and spam
        reviews are never included.
      </Callout>

      <H2>Add the block</H2>
      <p>To turn on review rich snippets:</p>
      <ol>
        <li>
          In your Shopify admin, open <strong>Online Store → Themes → Customize</strong>
        </li>
        <li>Navigate to a product page template</li>
        <li>
          Add the <strong>Review SEO</strong> block to the page
        </li>
        <li>Save the theme</li>
      </ol>
      <p>
        That&apos;s it. Every product page that has approved reviews now carries the structured data
        for search engines. The block produces no visible content on the page — it works invisibly
        in the background.
      </p>

      <Callout type="tip">
        Rich snippets don&apos;t appear the instant you add the block — Google has to re-crawl your
        pages first, which can take days to weeks. Google also decides when to show star ratings, so
        they aren&apos;t guaranteed on every page.
      </Callout>

      <H2>Related</H2>
      <ul>
        <li>
          <a href="/docs/reviews/overview">Overview</a>: how reviews are collected and approved
        </li>
        <li>
          <a href="/docs/reviews/moderation">Moderation</a>: only approved reviews count toward your
          rating
        </li>
        <li>
          <a href="/docs/widgets/star-badge">Review Star Badge</a>: show stars on the product page
          itself
        </li>
        <li>
          <a href="/docs/widgets/collection-stars">Review Collection Stars</a>: show stars on
          collection and listing pages
        </li>
      </ul>
    </div>
  );
}
