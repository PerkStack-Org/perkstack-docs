import type { Metadata } from "next";
import { createDocMetadata } from "@/lib/seo";
import { H2, H3 } from "@/components/Heading";
import Callout from "@/components/Callout";
import PlanBadge from "@/components/PlanBadge";

export const metadata: Metadata = createDocMetadata("/docs/integrations/judgeme", {
  title: "Judge.me Sync",
  description:
    "Keep your reviews in sync with Judge.me in both directions. Connect once and existing reviews import, new PerkStack reviews push to Judge.me, and replies and moderation stay matched on both sides.",
});

export default function JudgeMeSyncPage() {
  return (
    <div className="docs-prose">
      <h1>
        Judge.me Sync <PlanBadge plan="growth" />
      </h1>
      <p>
        Judge.me Sync keeps your reviews aligned between PerkStack and Judge.me in real time, in both
        directions. Connect once and your existing Judge.me reviews come in, every new PerkStack
        review is pushed to Judge.me, and your replies and moderation decisions stay matched on both
        sides. It lets you move to PerkStack without abandoning the review history you&apos;ve already
        built.
      </p>

      <Callout type="info">
        Live Judge.me sync is available on the <PlanBadge plan="growth" /> plan or above. Looking to
        move reviews over just once instead? See{" "}
        <a href="/docs/reviews/importing">Importing Reviews</a> for the one-time CSV import.
      </Callout>

      <H2>Live sync vs. one-time import</H2>
      <p>These are two different tools. Pick the one that matches what you want:</p>
      <ul>
        <li>
          <strong>Judge.me Sync (this page)</strong> is an ongoing, two-way connection. Reviews keep
          flowing both ways for as long as it&apos;s connected.
        </li>
        <li>
          <strong>
            <a href="/docs/reviews/importing">CSV import</a>
          </strong>{" "}
          is a one-time copy of a review export. It brings history in once and does not keep syncing.
        </li>
      </ul>

      <H2>What stays in sync</H2>
      <p>Once connected, changes made on either side keep the two review sets matched:</p>
      <ul>
        <li>
          <strong>Your existing Judge.me reviews are imported</strong> into PerkStack the moment you
          connect.
        </li>
        <li>
          <strong>New PerkStack reviews are published to Judge.me</strong> as they come in.
        </li>
        <li>
          <strong>Merchant replies propagate</strong>, so a reply you write in PerkStack also appears
          on Judge.me.
        </li>
        <li>
          <strong>Moderation propagates</strong>, so approving, rejecting, or marking a review as
          spam in PerkStack is reflected on Judge.me, and Judge.me-side changes flow back to
          PerkStack.
        </li>
      </ul>

      <H2>How to connect</H2>
      <p>
        You&apos;ll set up a connection in Judge.me first, then paste the details into PerkStack.
      </p>

      <H3>In Judge.me</H3>
      <ol>
        <li>
          Generate an <strong>API token</strong> from Judge.me&apos;s custom integration settings.
        </li>
        <li>
          Create a <strong>webhook secret</strong> &mdash; any strong, random string of your own.
        </li>
        <li>
          In Judge.me&apos;s webhook settings, add a webhook pointing at the{" "}
          <strong>webhook URL that PerkStack shows on its Judge.me page</strong>, enter your webhook
          secret, and subscribe it to the <code>review.created</code> and <code>review.updated</code>{" "}
          events.
        </li>
      </ol>

      <H3>In PerkStack</H3>
      <ol>
        <li>
          Go to <strong>PerkStack → Integrations → Judge.me</strong>.
        </li>
        <li>
          Paste in your <strong>API token</strong> and <strong>webhook secret</strong>, then select{" "}
          <strong>Connect</strong>.
        </li>
        <li>
          PerkStack verifies the connection and immediately imports every existing Judge.me review.
          You&apos;re now syncing both ways.
        </li>
      </ol>

      <Callout type="tip">
        The import is safe to re-run. If you ever need to reconnect or resync, PerkStack matches
        reviews it already has instead of creating duplicates.
      </Callout>

      <H2>Choosing which directions sync</H2>
      <p>
        After connecting, you can control the flow of information with three switches on the Judge.me
        page. All three are on by default. Turning one off never deletes reviews that have already
        synced.
      </p>

      <table>
        <thead>
          <tr>
            <th>Switch</th>
            <th>When it&apos;s off</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Pull</td>
            <td>Changes made on the Judge.me side stop reaching PerkStack</td>
          </tr>
          <tr>
            <td>Push</td>
            <td>Changes made in PerkStack stop reaching Judge.me</td>
          </tr>
          <tr>
            <td>Replies</td>
            <td>
              Your merchant replies aren&apos;t sent to Judge.me (new reviews and moderation still
              sync)
            </td>
          </tr>
        </tbody>
      </table>

      <H2>How conflicts are resolved</H2>
      <p>
        If the same review is edited on both sides, <strong>PerkStack is the source of truth</strong>
        . PerkStack&apos;s version wins unless the Judge.me change is strictly newer.
      </p>

      <H2>What happens if you downgrade</H2>
      <p>
        Live sync needs the <PlanBadge plan="growth" /> plan or above. If you drop below Growth, your
        connection isn&apos;t removed &mdash; syncing simply pauses. Re-upgrade and it resumes
        automatically, with no need to reconnect or re-enter your token. You can still disconnect or
        turn off any direction on any plan if you want to clean things up.
      </p>

      <H2>Related</H2>
      <ul>
        <li>
          <a href="/docs/reviews/importing">Importing Reviews</a>: one-time CSV import from Judge.me
          or Loox
        </li>
        <li>
          <a href="/docs/reviews/moderation">Review Moderation</a>: approve, reply, and manage
          reviews
        </li>
        <li>
          <a href="/docs/reviews/overview">Reviews Overview</a>: how PerkStack reviews work
        </li>
        <li>
          <a href="/docs/settings/billing">Plans &amp; Billing</a>: what each plan includes
        </li>
      </ul>
    </div>
  );
}
