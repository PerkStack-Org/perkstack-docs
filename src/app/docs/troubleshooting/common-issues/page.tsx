import type { Metadata } from "next";
import { createDocMetadata } from "@/lib/seo";
import { H2, H3 } from "@/components/Heading";
import Callout from "@/components/Callout";
import PlanBadge from "@/components/PlanBadge";

export const metadata: Metadata = createDocMetadata("/docs/troubleshooting/common-issues", {
  title: "Common Issues",
  description:
    "Troubleshoot common PerkStack issues including widgets not showing, points not awarding, reviews missing, emails failing, and more.",
});

export default function CommonIssuesPage() {
  return (
    <div className="docs-prose">
      <h1>Common Issues</h1>
      <p>
        This page covers the most frequently encountered issues with PerkStack and how to resolve
        them. Each section includes symptoms, likely causes, and step-by-step solutions.
      </p>

      <H2>Widget Not Showing on Storefront</H2>
      <p>
        <strong>Symptom:</strong> The loyalty launcher or other PerkStack blocks are not visible on
        your live storefront.
      </p>
      <H3>Steps to Resolve</H3>
      <ol>
        <li>
          Open your theme editor (<strong>Online Store → Themes → Customize</strong>)
        </li>
        <li>
          Go to <strong>App embeds</strong> (in the left sidebar under Theme settings)
        </li>
        <li>
          Verify that the <strong>PerkStack</strong> app embed is toggled <strong>on</strong>
        </li>
        <li>
          Navigate to the product page template and confirm the relevant PerkStack blocks (review
          display, star rating) are added
        </li>
        <li>Save the theme and check your live storefront</li>
      </ol>

      <Callout type="tip">
        If you recently installed PerkStack, you may need to add the blocks manually to your theme
        templates. The app embed toggle enables the launcher and global scripts, but individual
        blocks (reviews, star ratings) must be placed in the theme editor.
      </Callout>

      <H2>Points Not Awarding</H2>
      <p>
        <strong>Symptom:</strong> Customers are placing orders but not receiving loyalty points.
      </p>
      <H3>Possible Causes</H3>
      <table>
        <thead>
          <tr>
            <th>Cause</th>
            <th>How to Check</th>
            <th>Resolution</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Earn rules are disabled</td>
            <td>
              Check <strong>PerkStack → Loyalty → Earn Rules</strong>
            </td>
            <td>Enable the purchase earn rule and set the points-per-dollar rate</td>
          </tr>
          <tr>
            <td>Customer is frozen</td>
            <td>Check the customer&apos;s status on their detail page</td>
            <td>
              <a href="/docs/customers/freeze">Unfreeze</a> the customer
            </td>
          </tr>
          <tr>
            <td>Order webhooks not firing</td>
            <td>
              Check <strong>Settings → Notifications → Webhooks</strong> in Shopify admin
            </td>
            <td>Verify PerkStack&apos;s webhook subscriptions are registered</td>
          </tr>
          <tr>
            <td>Payment not captured</td>
            <td>
              Points award on <code>ORDERS_PAID</code>, not order creation
            </td>
            <td>Ensure the order payment has been captured in Shopify</td>
          </tr>
          <tr>
            <td>Customer has no account</td>
            <td>Check if the customer is a guest checkout</td>
            <td>Points require a Shopify customer account, and guest orders are not eligible</td>
          </tr>
        </tbody>
      </table>

      <H2>Reviews Not Appearing on Storefront</H2>
      <p>
        <strong>Symptom:</strong> Reviews have been submitted and approved but are not visible on
        product pages.
      </p>
      <H3>Steps to Resolve</H3>
      <ol>
        <li>
          Confirm the review status is <code>approved</code> in <strong>PerkStack → Reviews</strong>
        </li>
        <li>Open the theme editor and navigate to the product page template</li>
        <li>
          Verify that the <strong>Review Display</strong> block from PerkStack has been added to the
          template
        </li>
        <li>
          Check that the <strong>Star Rating</strong> block is added where you want inline ratings
          to appear
        </li>
        <li>Save the theme and refresh the product page</li>
      </ol>

      <Callout type="info">
        Reviews are fetched via the app proxy API. If your theme has aggressive caching, it may take
        a few minutes for newly approved reviews to appear.
      </Callout>

      <H2>Emails Not Sending</H2>
      <p>
        <strong>Symptom:</strong> Review request emails or notification emails are not being
        delivered to customers.
      </p>
      <H3>Possible Causes</H3>
      <table>
        <thead>
          <tr>
            <th>Cause</th>
            <th>Resolution</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Email limit reached on Free plan</td>
            <td>
              The <PlanBadge plan="free" /> plan is limited to 50 emails/month.{" "}
              <a href="/docs/settings/billing">Upgrade</a> for unlimited emails.
            </td>
          </tr>
          <tr>
            <td>Resend API key issue</td>
            <td>Verify the Resend API key is correctly configured in your environment variables</td>
          </tr>
          <tr>
            <td>Review requests disabled</td>
            <td>
              Check <a href="/docs/settings/review-settings">Review Settings</a> and ensure review
              request emails are enabled
            </td>
          </tr>
          <tr>
            <td>Emails in queue</td>
            <td>
              Emails are processed by the background worker. If the worker is backed up, there may
              be a delay
            </td>
          </tr>
        </tbody>
      </table>

      <H2>Checkout Widget Not Showing</H2>
      <p>
        <strong>Symptom:</strong> The loyalty points display does not appear at checkout.
      </p>
      <H3>Steps to Resolve</H3>
      <ol>
        <li>
          Verify you are on the <PlanBadge plan="growth" /> plan or higher. The checkout extension
          is not available on the Free plan
        </li>
        <li>
          Go to <strong>Settings → Checkout → Customize</strong> in your Shopify admin
        </li>
        <li>Add the PerkStack checkout block to the checkout template</li>
        <li>Save and test a checkout</li>
      </ol>

      <H2>Extension Not Loading</H2>
      <p>
        <strong>Symptom:</strong> Admin blocks or storefront extensions show loading spinners or
        errors.
      </p>
      <H3>Possible Causes</H3>
      <ul>
        <li>
          <strong>Network issue</strong>: the extension cannot reach the PerkStack API. Check your
          internet connection and try again.
        </li>
        <li>
          <strong>Local development</strong>: if you are developing locally, verify that the{" "}
          <code>dev_api_base</code> environment variable is set correctly in the extension
          configuration.
        </li>
        <li>
          <strong>Server downtime</strong>: check if PerkStack&apos;s backend is experiencing
          issues. Try refreshing after a few minutes.
        </li>
      </ul>

      <Callout type="warning">
        If issues persist after trying these steps, contact PerkStack support with your shop domain
        and a description of the problem. Include screenshots or screen recordings if possible.
      </Callout>

      <H2>Related</H2>
      <ul>
        <li>
          <a href="/docs/troubleshooting/faq">FAQ</a>: frequently asked questions
        </li>
        <li>
          <a href="/docs/dashboard/extension-status">Extension Status</a>: verify which extensions
          are active
        </li>
        <li>
          <a href="/docs/settings/billing">Billing &amp; Plans</a>: check feature availability for
          your plan
        </li>
      </ul>
    </div>
  );
}
