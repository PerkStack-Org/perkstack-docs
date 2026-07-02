import type { Metadata } from "next";
import { createDocMetadata } from "@/lib/seo";
import { H2 } from "@/components/Heading";
import Callout from "@/components/Callout";

export const metadata: Metadata = createDocMetadata("/docs/reviews/review-requests", {
  title: "Review Request Emails",
  description:
    "Automatically email customers to review what they bought after an order ships, with an optional reminder. Control the timing and wording.",
});

export default function ReviewRequestsPage() {
  return (
    <div className="docs-prose">
      <h1>Review Request Emails</h1>
      <p>
        Most reviews come from customers you ask. After an order is fulfilled, PerkStack
        automatically emails the customer to review what they bought, and nudges them once more if
        they forget. It runs on its own, so your review count keeps growing without you lifting a
        finger. You control the timing, the wording, and whether to remind at all.
      </p>

      <H2>How it works</H2>
      <p>
        When an order is fulfilled, PerkStack schedules a review request for each distinct product
        in that order. By default:
      </p>
      <ul>
        <li>
          The first request is sent <strong>7 days after fulfillment</strong>, giving the customer
          time to receive and try the product.
        </li>
        <li>
          A single <strong>reminder</strong> follows <strong>3 days later</strong> — but only if the
          customer hasn&apos;t reviewed yet. The moment they leave a review, the reminder is
          cancelled.
        </li>
      </ul>
      <p>
        Requests are one per product, so a three-item order can generate up to three requests. Only
        ever one reminder is sent, and a customer who reviews before it fires won&apos;t receive it.
      </p>

      <Callout type="info">
        Review request emails count toward your plan&apos;s monthly email cap (paid plans). If you
        reach the cap for the month, new requests pause until the cap resets — your storefront and
        review collection keep working normally.
      </Callout>

      <H2>Turn requests on and set the timing</H2>
      <p>
        Review requests are on by default. To review or change them, go to{" "}
        <strong>PerkStack → Settings → Reviews</strong> and find the{" "}
        <strong>Review Request Emails</strong> section:
      </p>

      <table>
        <thead>
          <tr>
            <th>Setting</th>
            <th>What it does</th>
            <th>Default</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Enable review request emails</td>
            <td>Turns automated requests on or off</td>
            <td>On</td>
          </tr>
          <tr>
            <td>Request delay</td>
            <td>Days after fulfillment before the first request is sent</td>
            <td>7 days</td>
          </tr>
          <tr>
            <td>Send one reminder</td>
            <td>Sends a single follow-up if no review has been submitted</td>
            <td>On</td>
          </tr>
          <tr>
            <td>Reminder delay</td>
            <td>Days after the first request before the reminder is sent</td>
            <td>3 days</td>
          </tr>
        </tbody>
      </table>

      <Callout type="tip">
        A delay of 7 to 14 days works well for most stores — long enough for delivery and a first
        impression. Slow-shipping or considered-purchase products may want a longer delay.
      </Callout>

      <H2>Customize the email copy</H2>
      <p>
        The subject line and body of both the request and the reminder are edited under{" "}
        <strong>PerkStack → Settings → Email</strong>. Leave a field blank to use PerkStack&apos;s
        default wording, or write your own to match your brand voice.
      </p>
      <p>
        You can drop in variables that fill themselves in for each customer and product:
      </p>
      <table>
        <thead>
          <tr>
            <th>Variable</th>
            <th>Fills in</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <code>{"{{customer_name}}"}</code>
            </td>
            <td>The customer&apos;s name</td>
          </tr>
          <tr>
            <td>
              <code>{"{{product_title}}"}</code>
            </td>
            <td>The name of the product they bought</td>
          </tr>
          <tr>
            <td>
              <code>{"{{shop_name}}"}</code>
            </td>
            <td>Your store name</td>
          </tr>
        </tbody>
      </table>
      <p>
        For example, a subject line of{" "}
        <code>{"How was your {{product_title}}, {{customer_name}}?"}</code> greets each customer by
        name with the exact product they ordered. The Email settings page also lets you set your
        sender name and reply-to address and shows a live preview.
      </p>

      <H2>Related</H2>
      <ul>
        <li>
          <a href="/docs/reviews/overview">Overview</a>: how review collection works end to end
        </li>
        <li>
          <a href="/docs/settings/email">Email &amp; Notifications</a>: edit subject lines, body
          copy, and sender details
        </li>
        <li>
          <a href="/docs/settings/review-settings">Review Settings</a>: enable requests and set the
          timing
        </li>
        <li>
          <a href="/docs/reviews/moderation">Moderation</a>: manage reviews as they come in
        </li>
      </ul>
    </div>
  );
}
