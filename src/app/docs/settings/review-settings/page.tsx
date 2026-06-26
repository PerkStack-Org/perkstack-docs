import type { Metadata } from "next";
import { createDocMetadata } from "@/lib/seo";
import { H2, H3 } from "@/components/Heading";
import Callout from "@/components/Callout";
import PlanBadge from "@/components/PlanBadge";

export const metadata: Metadata = createDocMetadata("/docs/settings/review-settings", {
  title: "Review Settings",
  description:
    "Configure review moderation rules, auto-approve thresholds, blacklisted words, review request emails, and display options.",
});

export default function ReviewSettingsPage() {
  return (
    <div className="docs-prose">
      <h1>Review Settings</h1>
      <p>
        The review settings page (<strong>PerkStack → Settings → Reviews</strong>) controls how
        reviews are collected, moderated, and displayed on your storefront.
      </p>

      <H2>Auto-Approve Threshold</H2>
      <p>
        Reviews that meet or exceed the auto-approve threshold are automatically approved without
        manual moderation. Reviews below the threshold remain in <code>pending</code> status for you
        to review manually.
      </p>
      <table>
        <thead>
          <tr>
            <th>Setting</th>
            <th>Range</th>
            <th>Default</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <strong>Auto-Approve Threshold</strong>
            </td>
            <td>1–5 stars</td>
            <td>4 stars</td>
          </tr>
        </tbody>
      </table>
      <p>
        For example, with the default threshold of 4 stars, any review rated 4 or 5 stars is
        auto-approved, while 1–3 star reviews go to pending for manual moderation.
      </p>

      <Callout type="tip">
        Setting the threshold to 1 effectively auto-approves all reviews. Setting it to 5 means only
        5-star reviews are auto-approved and everything else requires manual action.
      </Callout>

      <H2>Blacklisted Words</H2>
      <p>
        Add comma-separated words or phrases that should trigger manual moderation regardless of the
        star rating. If a review contains any blacklisted word, it is held in <code>pending</code>{" "}
        status even if it would otherwise be auto-approved.
      </p>
      <p>
        Common uses: competitor names, profanity, spam phrases, or product names you want to flag
        for closer inspection.
      </p>

      <Callout type="info">
        Blacklist matching is case-insensitive. The word &ldquo;scam&rdquo; will match
        &ldquo;Scam&rdquo;, &ldquo;SCAM&rdquo;, and &ldquo;scam&rdquo;.
      </Callout>

      <H2>Review Request Emails</H2>
      <p>
        PerkStack can automatically email customers after an order is fulfilled to request a product
        review. This section controls the timing and content of those emails.
      </p>

      <H3>Timing Settings</H3>
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
            <td>
              <strong>Enable Review Requests</strong>
            </td>
            <td>Toggle to enable or disable automatic review request emails</td>
            <td>Enabled</td>
          </tr>
          <tr>
            <td>
              <strong>Request Delay (days)</strong>
            </td>
            <td>Days after fulfilment before sending the first request</td>
            <td>7</td>
          </tr>
          <tr>
            <td>
              <strong>Enable Reminder</strong>
            </td>
            <td>Send a follow-up email if the customer hasn&apos;t reviewed</td>
            <td>Enabled</td>
          </tr>
          <tr>
            <td>
              <strong>Reminder Delay (days)</strong>
            </td>
            <td>Days after the first request before sending the reminder</td>
            <td>7</td>
          </tr>
        </tbody>
      </table>

      <H3>Email Content</H3>
      <p>
        Customise the subject line and body of review request emails. Both fields support template
        variables:
      </p>
      <table>
        <thead>
          <tr>
            <th>Variable</th>
            <th>Replaced With</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <code>{"{{product_title}}"}</code>
            </td>
            <td>The name of the product being reviewed</td>
          </tr>
          <tr>
            <td>
              <code>{"{{customer_name}}"}</code>
            </td>
            <td>The customer&apos;s first name</td>
          </tr>
          <tr>
            <td>
              <code>{"{{points_incentive}}"}</code>
            </td>
            <td>The number of points the customer will earn for leaving a review</td>
          </tr>
        </tbody>
      </table>

      <Callout type="tip">
        Mentioning the points incentive in the email subject line can significantly boost review
        submission rates. For example: &ldquo;Review your {"{{product_title}}"} and earn{" "}
        {"{{points_incentive}}"} points!&rdquo;
      </Callout>

      <H2>Display Settings</H2>
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
            <td>
              <strong>Show Reviewer Names</strong>
            </td>
            <td>Display the reviewer&apos;s name on the storefront</td>
            <td>Enabled</td>
          </tr>
          <tr>
            <td>
              <strong>Require Photos</strong>
            </td>
            <td>Make photo upload mandatory for new reviews</td>
            <td>Disabled</td>
          </tr>
          <tr>
            <td>
              <strong>Max Photos</strong>
            </td>
            <td>Maximum number of photos a customer can upload per review (1–10)</td>
            <td>5</td>
          </tr>
        </tbody>
      </table>

      <Callout type="info">
        Photo reviews require the <PlanBadge plan="essential" /> plan or higher. On the Free plan,
        only text reviews are available.
      </Callout>

      <H2>Saving Changes</H2>
      <p>
        All review settings use the Shopify Contextual Save Bar. Modify any field and the save bar
        appears. Click <strong>Save</strong> to apply or <strong>Discard</strong> to revert.
      </p>

      <H2>Related</H2>
      <ul>
        <li>
          <a href="/docs/reviews/moderation">Review Moderation</a> to approve, reject, and manage
          submitted reviews
        </li>
        <li>
          <a href="/docs/settings/email">Email Settings</a> for sender name and reply-to
          configuration
        </li>
        <li>
          <a href="/docs/settings/billing">Billing &amp; Plans</a> for feature availability by plan
        </li>
      </ul>
    </div>
  );
}
