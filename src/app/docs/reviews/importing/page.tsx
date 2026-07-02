import type { Metadata } from "next";
import { createDocMetadata } from "@/lib/seo";
import { H2 } from "@/components/Heading";
import Callout from "@/components/Callout";
import PlanBadge from "@/components/PlanBadge";

export const metadata: Metadata = createDocMetadata("/docs/reviews/importing", {
  title: "Importing Reviews",
  description:
    "Bring your existing reviews from Judge.me or Loox into PerkStack with a one-time CSV import, so you keep the social proof you've built.",
});

export default function ImportingReviewsPage() {
  return (
    <div className="docs-prose">
      <h1>Importing Reviews</h1>
      <p>
        Switching from another reviews app? Don&apos;t leave your reviews behind. PerkStack can
        import your existing review history from Judge.me or Loox in one go, so the social proof you
        spent years collecting shows up on your storefront from day one.
      </p>

      <Callout type="info">
        CSV import is available on the <PlanBadge plan="studio" /> plan.
      </Callout>

      <Callout type="warning">
        This is a <strong>one-time</strong> import from a CSV file — a way to move your history over
        once. It is different from the live, ongoing Judge.me sync. If you want new reviews to keep
        flowing between Judge.me and PerkStack automatically, set up{" "}
        <a href="/docs/integrations/judgeme">Judge.me Sync</a> instead.
      </Callout>

      <H2>Before you start</H2>
      <p>
        Export your reviews from your current app first. Both Judge.me and Loox offer a CSV export in
        their admin — download that file <strong>before</strong> you uninstall the old app, then
        import it here.
      </p>

      <H2>Run the import</H2>
      <p>
        Go to <strong>PerkStack → Settings → Import</strong>:
      </p>
      <ol>
        <li>
          Choose your <strong>source</strong> — Judge.me or Loox
        </li>
        <li>
          Upload the <code>.csv</code> file you exported
        </li>
        <li>
          The import runs in the background. Watch the <strong>import history</strong> table for
          progress, then a summary of how many reviews imported successfully and how many rows had
          errors.
        </li>
      </ol>
      <p>
        The import history keeps a record of every import — its source, file, status, and row counts
        — so you can confirm a run finished or check what went wrong. Rows missing a product, a valid
        rating, or review text are skipped and counted as errors, and duplicate reviews (same
        customer and product) are skipped too.
      </p>

      <H2>What comes over</H2>
      <p>Imported reviews arrive <strong>already approved</strong>, so they skip the moderation queue and publish right away. Each imported review brings over:</p>
      <ul>
        <li>The product it was written for</li>
        <li>The star rating</li>
        <li>The review text</li>
        <li>The reviewer&apos;s email (used to match an existing customer where possible)</li>
        <li>Whether it was a verified purchase</li>
        <li>The original review date</li>
      </ul>

      <Callout type="info">
        Merchant replies come over from <strong>Loox</strong> imports but not from{" "}
        <strong>Judge.me</strong> imports. If you rely on your Judge.me replies, keep them in mind
        before switching.
      </Callout>

      <H2>Related</H2>
      <ul>
        <li>
          <a href="/docs/integrations/judgeme">Judge.me Sync</a>: keep reviews syncing live between
          Judge.me and PerkStack (ongoing, not a one-time import)
        </li>
        <li>
          <a href="/docs/reviews/overview">Overview</a>: how reviews work once they&apos;re in
          PerkStack
        </li>
        <li>
          <a href="/docs/reviews/moderation">Moderation</a>: manage imported reviews alongside new
          ones
        </li>
      </ul>
    </div>
  );
}
