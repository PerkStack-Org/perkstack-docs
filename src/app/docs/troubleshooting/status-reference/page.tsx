import type { Metadata } from "next";
import { createDocMetadata } from "@/lib/seo";
import { H2 } from "@/components/Heading";
import Callout from "@/components/Callout";

export const metadata: Metadata = createDocMetadata("/docs/troubleshooting/status-reference", {
  title: "Status Reference",
  description:
    "A plain-language glossary of the statuses you see across PerkStack — for reviews, redemptions, referrals, customers, and points activity — and what each one means for you.",
});

export default function StatusReferencePage() {
  return (
    <div className="docs-prose">
      <h1>Status Reference</h1>
      <p>
        As you use PerkStack you&apos;ll see status labels on reviews, rewards, referrals, and
        customers. This page explains what each one means in plain language and what you can do about
        it, so nothing on your screens is a mystery.
      </p>

      <H2>Review statuses</H2>
      <p>Every review carries a status that controls whether it&apos;s public.</p>
      <table>
        <thead>
          <tr>
            <th>Status</th>
            <th>What it means</th>
            <th>What you can do</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <strong>Pending</strong>
            </td>
            <td>Submitted but not yet public. It&apos;s waiting for your decision in moderation.</td>
            <td>Read it, then approve, reject, or mark it as spam.</td>
          </tr>
          <tr>
            <td>
              <strong>Approved</strong>
            </td>
            <td>Live on your storefront and counted in the product&apos;s star rating.</td>
            <td>Reply to it, feature it, or reject it later if needed.</td>
          </tr>
          <tr>
            <td>
              <strong>Rejected</strong>
            </td>
            <td>Not shown publicly. Kept on record but hidden from shoppers.</td>
            <td>Approve it later if you change your mind.</td>
          </tr>
          <tr>
            <td>
              <strong>Spam</strong>
            </td>
            <td>Flagged as junk or abusive and hidden from your store.</td>
            <td>Leave it as spam, or approve it if it was flagged in error.</td>
          </tr>
          <tr>
            <td>
              <strong>Featured</strong>
            </td>
            <td>
              An approved review you&apos;ve highlighted so it appears in showcase spots like the
              review carousel.
            </td>
            <td>Un-feature it any time to return it to a regular approved review.</td>
          </tr>
        </tbody>
      </table>

      <Callout type="info">
        Featured is a highlight on top of an approved review, not a separate stage &mdash; a review
        is always approved before it can be featured.
      </Callout>

      <H2>Redemption statuses</H2>
      <p>
        When a customer turns points into a reward &mdash; or you grant one &mdash; the redemption
        moves through these states.
      </p>
      <table>
        <thead>
          <tr>
            <th>Status</th>
            <th>What it means</th>
            <th>What you can do</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <strong>Pending</strong>
            </td>
            <td>
              The reward has been claimed and a discount code issued, but the customer hasn&apos;t
              used it yet.
            </td>
            <td>
              Wait for the customer to use it, or void it if it was a mistake. A customer can only
              have one pending redemption at a time.
            </td>
          </tr>
          <tr>
            <td>
              <strong>Completed</strong>
            </td>
            <td>The reward was used &mdash; the discount was applied to an order.</td>
            <td>Nothing needed; it&apos;s part of the customer&apos;s history.</td>
          </tr>
          <tr>
            <td>
              <strong>Voided</strong>
            </td>
            <td>The redemption was cancelled and the discount code is no longer usable.</td>
            <td>Grant a new reward if you want to replace it.</td>
          </tr>
        </tbody>
      </table>

      <H2>Referral statuses</H2>
      <p>Each referral tracks where a referred friend is in the journey.</p>
      <table>
        <thead>
          <tr>
            <th>Status</th>
            <th>What it means</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <strong>Pending</strong>
            </td>
            <td>A friend was referred but hasn&apos;t completed a qualifying purchase yet.</td>
          </tr>
          <tr>
            <td>
              <strong>Completed</strong>
            </td>
            <td>
              The friend made their purchase, and both the referrer and the friend have been
              rewarded.
            </td>
          </tr>
          <tr>
            <td>
              <strong>Expired</strong>
            </td>
            <td>
              The referral wasn&apos;t completed in time and no longer qualifies for a reward.
            </td>
          </tr>
          <tr>
            <td>
              <strong>Voided</strong>
            </td>
            <td>The referral was cancelled &mdash; for example, if the qualifying order was refunded.</td>
          </tr>
        </tbody>
      </table>

      <H2>Customer status</H2>
      <table>
        <thead>
          <tr>
            <th>Status</th>
            <th>What it means</th>
            <th>What you can do</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <strong>Active</strong>
            </td>
            <td>The customer takes part in your program normally &mdash; earning and redeeming.</td>
            <td>No action needed.</td>
          </tr>
          <tr>
            <td>
              <strong>Frozen</strong>
            </td>
            <td>
              The customer&apos;s loyalty is paused: they can&apos;t earn or redeem. Their balance
              and history are preserved.
            </td>
            <td>
              <a href="/docs/customers/freeze">Unfreeze</a> them to resume. They can still shop while
              frozen.
            </td>
          </tr>
        </tbody>
      </table>

      <H2>Points activity</H2>
      <p>
        A customer&apos;s activity history records every change to their balance. Each entry is one
        of these:
      </p>
      <table>
        <thead>
          <tr>
            <th>Activity</th>
            <th>What it means</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <strong>Earned</strong>
            </td>
            <td>
              Points added for an action &mdash; a purchase, review, referral, signup, birthday, and
              so on.
            </td>
          </tr>
          <tr>
            <td>
              <strong>Redeemed</strong>
            </td>
            <td>Points spent on a reward.</td>
          </tr>
          <tr>
            <td>
              <strong>Expired</strong>
            </td>
            <td>Points removed because they aged out (only when points expiry is turned on).</td>
          </tr>
          <tr>
            <td>
              <strong>Adjusted</strong>
            </td>
            <td>
              Points you added or subtracted by hand. The reason you entered is shown alongside the
              entry.
            </td>
          </tr>
          <tr>
            <td>
              <strong>Voided</strong>
            </td>
            <td>
              A previous entry reversed &mdash; for example, points from an order that was later
              refunded. The original stays visible, marked as voided.
            </td>
          </tr>
        </tbody>
      </table>

      <Callout type="tip">
        Every points change is kept on the record, including voided ones, so a customer&apos;s balance
        and full history are always accurate and easy to account for.
      </Callout>

      <H2>Related</H2>
      <ul>
        <li>
          <a href="/docs/customers/detail">Customer Detail</a>: where points activity and statuses
          appear
        </li>
        <li>
          <a href="/docs/reviews/moderation">Moderation</a>: manage review statuses
        </li>
        <li>
          <a href="/docs/troubleshooting/common-issues">Common Issues</a>: fixes for the most common
          symptoms
        </li>
        <li>
          <a href="/docs/troubleshooting/faq">FAQ</a>: plans, pricing, and product questions
        </li>
      </ul>
    </div>
  );
}
