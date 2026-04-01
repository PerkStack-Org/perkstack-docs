import type { Metadata } from "next";
import Callout from "@/components/Callout";

export const metadata: Metadata = {
  title: "Email Settings",
  description:
    "Configure your email sender name, reply-to address, and understand the email delivery infrastructure.",
};

export default function EmailSettingsPage() {
  return (
    <div className="docs-prose">
      <h1>Email Settings</h1>
      <p>
        PerkStack sends transactional emails on your behalf, including review requests, points
        notifications, reward confirmations, and referral invites. The email settings page (
        <strong>PerkStack → Settings → Email</strong>) lets you control how these emails appear to
        your customers.
      </p>

      <h2>Configuration</h2>
      <table>
        <thead>
          <tr>
            <th>Setting</th>
            <th>Field</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <strong>Sender Name</strong>
            </td>
            <td>
              <code>emailFromName</code>
            </td>
            <td>
              The display name customers see in their inbox. Typically your store name (e.g.
              &ldquo;Acme Store&rdquo;).
            </td>
          </tr>
          <tr>
            <td>
              <strong>Reply-To Address</strong>
            </td>
            <td>
              <code>emailReplyTo</code>
            </td>
            <td>
              The email address used when a customer replies to a PerkStack email. Must be a valid
              email address you monitor.
            </td>
          </tr>
        </tbody>
      </table>

      <h2>Validation</h2>
      <p>
        The reply-to address is validated on save to ensure it is a properly formatted email
        address. Invalid addresses will be rejected with a validation error.
      </p>

      <Callout type="tip">
        Use an email address that your support team actively monitors (e.g.{" "}
        <code>support@yourstore.com</code>). Customers may reply to review requests or reward emails
        with questions.
      </Callout>

      <h2>Email Delivery</h2>
      <p>
        All emails are sent via <strong>Resend</strong>, a transactional email provider. The
        integration is handled entirely server-side, so you do not need to configure Resend
        directly. PerkStack manages:
      </p>
      <ul>
        <li>Email rendering and templating</li>
        <li>Delivery via the Resend API</li>
        <li>Bounce and complaint handling</li>
        <li>Rate limiting within your plan&apos;s email quota</li>
      </ul>

      <h2>Email Limits</h2>
      <p>
        The number of emails you can send per month depends on your plan. See the{" "}
        <a href="/docs/settings/billing">Billing &amp; Plans</a> page for details.
      </p>

      <Callout type="warning">
        On the Free plan, you are limited to <strong>50 emails per month</strong>. Once the limit is
        reached, review request emails and non-critical notifications are queued until the next
        billing cycle. Critical emails (e.g. reward confirmations) are always delivered.
      </Callout>

      <h2>Email Types</h2>
      <p>PerkStack sends the following email types:</p>
      <table>
        <thead>
          <tr>
            <th>Email Type</th>
            <th>Trigger</th>
            <th>Configurable</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Review Request</td>
            <td>Order fulfilled (after configured delay)</td>
            <td>Yes (subject, body, delay, enable/disable)</td>
          </tr>
          <tr>
            <td>Review Reminder</td>
            <td>Follow-up after initial request</td>
            <td>Yes (delay, enable/disable)</td>
          </tr>
          <tr>
            <td>Points Earned</td>
            <td>Customer earns points from any source</td>
            <td>Enable/disable</td>
          </tr>
          <tr>
            <td>Reward Confirmation</td>
            <td>Customer redeems a reward</td>
            <td>Always sent</td>
          </tr>
          <tr>
            <td>Points Expiry Warning</td>
            <td>Points nearing expiration</td>
            <td>Notification days setting</td>
          </tr>
          <tr>
            <td>Referral Invite</td>
            <td>Customer shares referral link</td>
            <td>Enable/disable</td>
          </tr>
        </tbody>
      </table>

      <h2>Related</h2>
      <ul>
        <li>
          <a href="/docs/settings/review-settings">Review Settings</a> to configure review request
          email content and timing
        </li>
        <li>
          <a href="/docs/settings/general">General Settings</a> to set your logo for email headers
        </li>
        <li>
          <a href="/docs/settings/billing">Billing &amp; Plans</a> for email quotas per plan
        </li>
      </ul>
    </div>
  );
}
