import type { Metadata } from "next";
import Callout from "@/components/Callout";

export const metadata: Metadata = {
  title: "Importing Reviews",
  description:
    "Migrate your existing reviews from Judge.me or Loox into PerkStack using CSV import.",
};

export default function ImportingReviewsPage() {
  return (
    <div className="docs-prose">
      <h1>Importing Reviews</h1>
      <p>
        Switching from another reviews app? PerkStack lets you import your existing reviews from
        Judge.me and Loox so you don&apos;t lose the social proof you&apos;ve built. Imported
        reviews appear on your storefront identically to native reviews.
      </p>

      <h2>Supported Platforms</h2>
      <table>
        <thead>
          <tr>
            <th>Platform</th>
            <th>Format</th>
            <th>Source Tag</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Judge.me</td>
            <td>CSV export</td>
            <td>
              <code>import_judgeme</code>
            </td>
          </tr>
          <tr>
            <td>Loox</td>
            <td>CSV export</td>
            <td>
              <code>import_loox</code>
            </td>
          </tr>
        </tbody>
      </table>

      <Callout type="tip">
        Both Judge.me and Loox provide CSV export options in their respective admin dashboards.
        Export your reviews from the old app before uninstalling it.
      </Callout>

      <h2>Import Process</h2>
      <p>
        Navigate to <strong>PerkStack → Reviews → Import</strong> (accessible from the Reviews page)
        to start an import:
      </p>
      <ol>
        <li>
          <strong>Select platform</strong>: choose Judge.me or Loox from the dropdown
        </li>
        <li>
          <strong>Upload CSV</strong>: select your exported CSV file. The file is uploaded to
          Cloudflare R2 via a presigned URL (the same secure upload mechanism used for photo
          reviews).
        </li>
        <li>
          <strong>Processing begins</strong>: a background worker parses the CSV and creates review
          records. Each row becomes a review with the appropriate <code>source</code> tag.
        </li>
        <li>
          <strong>Review results</strong>: once processing completes, you&apos;ll see a summary of
          the import results
        </li>
      </ol>

      <h2>Import Status Lifecycle</h2>
      <table>
        <thead>
          <tr>
            <th>Status</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <code>pending</code>
            </td>
            <td>CSV uploaded, waiting for the worker to begin processing</td>
          </tr>
          <tr>
            <td>
              <code>processing</code>
            </td>
            <td>Worker is parsing rows and creating review records</td>
          </tr>
          <tr>
            <td>
              <code>completed</code>
            </td>
            <td>All rows processed; see the results summary</td>
          </tr>
          <tr>
            <td>
              <code>failed</code>
            </td>
            <td>Import could not complete (e.g. invalid CSV format)</td>
          </tr>
        </tbody>
      </table>

      <h2>Import Tracking</h2>
      <p>
        Every import is recorded in the <code>reviewImports</code> table with detailed progress
        metrics:
      </p>

      <table>
        <thead>
          <tr>
            <th>Metric</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <code>totalRows</code>
            </td>
            <td>Total number of rows detected in the CSV file</td>
          </tr>
          <tr>
            <td>
              <code>processedRows</code>
            </td>
            <td>Number of rows the worker has processed so far</td>
          </tr>
          <tr>
            <td>
              <code>successRows</code>
            </td>
            <td>Rows successfully imported as review records</td>
          </tr>
          <tr>
            <td>
              <code>errorRows</code>
            </td>
            <td>Rows that failed to import (invalid data, duplicates, etc.)</td>
          </tr>
        </tbody>
      </table>

      <p>
        You can monitor progress in real time on the import page. The progress bar updates as rows
        are processed.
      </p>

      <h2>Import History</h2>
      <p>
        The import page includes a history table showing all past imports with their date, platform,
        row counts, and final status. Use this to verify previous imports or diagnose issues.
      </p>

      <h2>Handling Duplicates</h2>
      <p>
        PerkStack enforces a unique constraint on <code>shopId</code> + <code>customerId</code> +{" "}
        <code>shopifyProductId</code>. If an imported CSV contains a review for a customer–product
        combination that already exists in your store, that row is skipped and counted as an error
        row. This prevents duplicate reviews from appearing on your storefront.
      </p>

      <Callout type="info">
        If you&apos;re importing reviews that overlap with existing native reviews, the native
        reviews take precedence. The duplicate imported rows are skipped without affecting your
        existing data.
      </Callout>

      <h2>What Gets Imported</h2>
      <p>
        The import process maps CSV fields to PerkStack review records. The following data is
        preserved:
      </p>
      <ul>
        <li>Star rating</li>
        <li>Review title and body text</li>
        <li>Customer information (name, email)</li>
        <li>Product association (matched by Shopify product ID or handle)</li>
        <li>Original review date</li>
        <li>Verified purchase status (if available in the export)</li>
      </ul>

      <Callout type="warning">
        Photo attachments from Judge.me and Loox are <strong>not</strong> imported. Only the text
        content and metadata are transferred. Photos from external platforms are hosted on their
        servers and cannot be migrated automatically.
      </Callout>

      <h2>Best Practices</h2>
      <ul>
        <li>
          Export your reviews from the old platform <strong>before</strong> uninstalling it
        </li>
        <li>Run a test import with a small CSV first to verify the mapping works correctly</li>
        <li>
          After importing, spot-check a few reviews on your storefront to confirm they display
          properly
        </li>
        <li>
          Check the error row count. If many rows failed, review the CSV format against the expected
          columns
        </li>
      </ul>

      <h2>Related</h2>
      <ul>
        <li>
          <a href="/docs/reviews/overview">Reviews Overview</a>: data model and sources
        </li>
        <li>
          <a href="/docs/reviews/moderation">Review Moderation</a>: manage imported reviews
        </li>
      </ul>
    </div>
  );
}
