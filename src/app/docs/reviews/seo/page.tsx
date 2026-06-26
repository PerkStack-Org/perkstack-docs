import type { Metadata } from "next";
import { createDocMetadata } from "@/lib/seo";
import { H2, H3 } from "@/components/Heading";
import Callout from "@/components/Callout";

export const metadata: Metadata = createDocMetadata("/docs/reviews/seo", {
  title: "SEO & Rich Snippets",
  description:
    "Add structured review data to your product pages for Google rich snippets, including star ratings in search results.",
});

export default function SeoPage() {
  return (
    <div className="docs-prose">
      <h1>SEO &amp; Rich Snippets</h1>
      <p>
        PerkStack automatically generates structured data for your product reviews, enabling Google
        to display star ratings directly in search results. This rich snippet markup can
        significantly improve click-through rates from organic search.
      </p>

      <H2>How It Works</H2>
      <p>
        PerkStack ships a theme app extension block called <code>review-jsonld.liquid</code> that
        targets the <code>&lt;head&gt;</code> section of your product pages. When a customer (or
        search engine crawler) loads a product page, this block:
      </p>
      <ol>
        <li>
          Fetches approved reviews for the product from <code>/apps/perkstack/api/reviews</code>
        </li>
        <li>
          Generates a JSON-LD script tag containing structured data in the{" "}
          <a href="https://schema.org/Product" target="_blank" rel="noopener noreferrer">
            Schema.org Product
          </a>{" "}
          format
        </li>
        <li>Injects the script into the page head so search engines can parse it</li>
      </ol>

      <H2>JSON-LD Structure</H2>
      <p>
        The generated structured data follows Google&apos;s recommended format for product reviews.
        Here is an example of the output:
      </p>

      <pre>
        <code>{`{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "Classic Leather Tote",
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.6",
    "reviewCount": "38"
  },
  "review": [
    {
      "@type": "Review",
      "author": {
        "@type": "Person",
        "name": "Sarah M."
      },
      "datePublished": "2025-11-15",
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": "5"
      },
      "reviewBody": "Beautiful bag, great quality leather..."
    }
  ]
}`}</code>
      </pre>

      <H3>Schema Components</H3>
      <table>
        <thead>
          <tr>
            <th>Component</th>
            <th>Schema Type</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Product wrapper</td>
            <td>
              <code>Product</code>
            </td>
            <td>Top-level product entity with the product name</td>
          </tr>
          <tr>
            <td>Aggregate rating</td>
            <td>
              <code>AggregateRating</code>
            </td>
            <td>Average rating across all approved reviews and total review count</td>
          </tr>
          <tr>
            <td>Individual reviews</td>
            <td>
              <code>Review</code>
            </td>
            <td>Each approved review with author name, date, rating, and body text</td>
          </tr>
        </tbody>
      </table>

      <H2>Enabling Rich Snippets</H2>
      <p>The JSON-LD block is part of PerkStack&apos;s theme app extension. To enable it:</p>
      <ol>
        <li>
          Open your Shopify theme editor (<strong>Online Store → Themes → Customize</strong>)
        </li>
        <li>Navigate to a product page template</li>
        <li>
          In the app embeds or app blocks section, enable the{" "}
          <strong>PerkStack Review JSON-LD</strong> block
        </li>
        <li>
          Save the theme. The structured data is now injected into every product page that has
          approved reviews
        </li>
      </ol>

      <Callout type="tip">
        The JSON-LD block renders in the <code>&lt;head&gt;</code> section and produces no visible
        output. It only adds the invisible structured data script tag for search engines.
      </Callout>

      <H2>Google Search Console Validation</H2>
      <p>After enabling the JSON-LD block, verify that Google can read your structured data:</p>
      <ol>
        <li>
          Open{" "}
          <a
            href="https://search.google.com/test/rich-results"
            target="_blank"
            rel="noopener noreferrer"
          >
            Google&apos;s Rich Results Test
          </a>
        </li>
        <li>Enter a product page URL that has approved reviews</li>
        <li>
          Confirm that the tool detects <strong>Product</strong> structured data with an aggregate
          rating
        </li>
      </ol>

      <Callout type="info">
        It can take days to weeks for Google to re-crawl your pages and display rich snippets in
        search results after adding structured data. The Rich Results Test confirms the markup is
        valid immediately, but the actual search appearance depends on Google&apos;s crawl schedule.
      </Callout>

      <H2>Requirements for Rich Snippets</H2>
      <p>
        For Google to display star ratings in search results, the following conditions must be met:
      </p>
      <ul>
        <li>The product page must have at least one approved review</li>
        <li>The JSON-LD block must be enabled in your theme (it is not active by default)</li>
        <li>
          The structured data must pass Google&apos;s validation (PerkStack generates valid markup
          automatically)
        </li>
        <li>Google must crawl and index the page, which is not instant</li>
      </ul>

      <Callout type="warning">
        Google does not guarantee that rich snippets will appear for every page, even with valid
        structured data. Display depends on Google&apos;s algorithms and the page&apos;s overall
        quality signals.
      </Callout>

      <H2>Data Source</H2>
      <p>
        The JSON-LD block fetches review data from the <code>/apps/perkstack/api/reviews</code>{" "}
        endpoint via the Shopify app proxy. Only <code>approved</code> reviews are included in the
        structured data; pending, rejected, and spam reviews are excluded.
      </p>
      <p>
        The aggregate rating is calculated from all approved reviews for the product. Individual
        review entries include the reviewer&apos;s display name, publication date, star rating, and
        review body.
      </p>

      <H2>All Plans</H2>
      <p>
        SEO rich snippets are available on all plans, including the Free plan. Every store benefits
        from structured review data in search results.
      </p>

      <H2>Related</H2>
      <ul>
        <li>
          <a href="/docs/reviews/overview">Reviews Overview</a>: review data model and statuses
        </li>
        <li>
          <a href="/docs/reviews/moderation">Review Moderation</a>: only approved reviews appear in
          structured data
        </li>
      </ul>
    </div>
  );
}
