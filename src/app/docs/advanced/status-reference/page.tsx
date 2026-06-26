import type { Metadata } from "next";
import { createDocMetadata } from "@/lib/seo";
import { H2 } from "@/components/Heading";
import Callout from "@/components/Callout";

export const metadata: Metadata = createDocMetadata("/docs/advanced/status-reference", {
  title: "Status Reference",
  description:
    "Complete reference for every status enum used across PerkStack covering plans, billing, earn actions, transactions, reviews, and more.",
});

export default function StatusReferencePage() {
  return (
    <div className="docs-prose">
      <h1>Status Reference</h1>
      <p>
        PerkStack uses a set of enums defined in <code>enums.ts</code> to represent statuses, types,
        and categories across the system. This page is a complete reference for every enum value.
      </p>

      <H2>Plan</H2>
      <p>The subscription plan a shop is on.</p>
      <table>
        <thead>
          <tr>
            <th>Value</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <code>free</code>
            </td>
            <td>
              Free plan — core loyalty, unlimited text reviews, 100 monthly orders, ~150 emails/mo
              (bounded by the order cap)
            </td>
          </tr>
          <tr>
            <td>
              <code>essential</code>
            </td>
            <td>
              Essential plan ($29/mo, 14-day trial) — adds photo reviews, custom rewards (fixed
              amount + free shipping), checkout extension, branding removal, CSV import, and the
              Cap-Recovery flow. 500 orders/mo · 5,000 emails/mo
            </td>
          </tr>
          <tr>
            <td>
              <code>growth</code>
            </td>
            <td>
              Growth plan ($99/mo, 21-day trial) — adds referrals, VIP tiers, Shopify Flow
              triggers, live Klaviyo &amp; Judge.me integrations, custom points currency, and
              custom launcher hero. 2,500 orders/mo · 25,000 emails/mo (with overage)
            </td>
          </tr>
          <tr>
            <td>
              <code>studio</code>
            </td>
            <td>
              Studio plan ($299/mo, 30-day trial) — full white-label: custom email sender domain,
              custom CSS, custom review-email templates, bulk operations, activity log export,
              advanced moderation, multi-store (coming soon). 10,000 orders/mo · 50,000 emails/mo
              (with overage)
            </td>
          </tr>
          <tr>
            <td>
              <code>starter</code>
            </td>
            <td>Legacy starter plan (no longer offered for new signups; grandfathered only)</td>
          </tr>
          <tr>
            <td>
              <code>pro</code>
            </td>
            <td>Legacy pro plan (no longer offered for new signups; grandfathered only)</td>
          </tr>
        </tbody>
      </table>

      <H2>Billing Status</H2>
      <p>The state of a shop&apos;s Shopify billing subscription.</p>
      <table>
        <thead>
          <tr>
            <th>Value</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <code>active</code>
            </td>
            <td>Subscription is active and payment is current</td>
          </tr>
          <tr>
            <td>
              <code>pending</code>
            </td>
            <td>Awaiting Shopify billing approval</td>
          </tr>
          <tr>
            <td>
              <code>frozen</code>
            </td>
            <td>Payment failed. Shopify could not charge the merchant</td>
          </tr>
          <tr>
            <td>
              <code>cancelled</code>
            </td>
            <td>Subscription has been cancelled by the merchant</td>
          </tr>
        </tbody>
      </table>

      <H2>Earn Action</H2>
      <p>The type of action that earns a customer points.</p>
      <table>
        <thead>
          <tr>
            <th>Value</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <code>purchase</code>
            </td>
            <td>Points earned from a completed purchase</td>
          </tr>
          <tr>
            <td>
              <code>signup</code>
            </td>
            <td>Points earned for creating an account</td>
          </tr>
          <tr>
            <td>
              <code>birthday</code>
            </td>
            <td>Annual birthday bonus points</td>
          </tr>
          <tr>
            <td>
              <code>review_text</code>
            </td>
            <td>Points earned for submitting a text review</td>
          </tr>
          <tr>
            <td>
              <code>review_photo</code>
            </td>
            <td>Points earned for submitting a review with photos</td>
          </tr>
          <tr>
            <td>
              <code>social_share</code>
            </td>
            <td>Points earned for sharing on social media</td>
          </tr>
          <tr>
            <td>
              <code>referral</code>
            </td>
            <td>Points earned for a successful referral</td>
          </tr>
          <tr>
            <td>
              <code>custom</code>
            </td>
            <td>Points from a custom earn rule</td>
          </tr>
        </tbody>
      </table>

      <H2>Transaction Type</H2>
      <p>The type of points transaction.</p>
      <table>
        <thead>
          <tr>
            <th>Value</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <code>earn</code>
            </td>
            <td>Points added to balance from an earn action</td>
          </tr>
          <tr>
            <td>
              <code>redeem</code>
            </td>
            <td>Points subtracted for a reward redemption</td>
          </tr>
          <tr>
            <td>
              <code>expire</code>
            </td>
            <td>Points removed due to expiry</td>
          </tr>
          <tr>
            <td>
              <code>adjust</code>
            </td>
            <td>Manual adjustment by admin (positive or negative)</td>
          </tr>
          <tr>
            <td>
              <code>void</code>
            </td>
            <td>Points voided (e.g. order refunded or cancelled)</td>
          </tr>
        </tbody>
      </table>

      <H2>Source Type</H2>
      <p>The originating source of a points transaction.</p>
      <table>
        <thead>
          <tr>
            <th>Value</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <code>purchase</code>
            </td>
            <td>From a completed order</td>
          </tr>
          <tr>
            <td>
              <code>signup</code>
            </td>
            <td>From account creation</td>
          </tr>
          <tr>
            <td>
              <code>birthday</code>
            </td>
            <td>From birthday earn rule</td>
          </tr>
          <tr>
            <td>
              <code>review</code>
            </td>
            <td>From submitting a review</td>
          </tr>
          <tr>
            <td>
              <code>social</code>
            </td>
            <td>From social media sharing</td>
          </tr>
          <tr>
            <td>
              <code>referral</code>
            </td>
            <td>From a referral</td>
          </tr>
          <tr>
            <td>
              <code>redemption</code>
            </td>
            <td>From redeeming a reward</td>
          </tr>
          <tr>
            <td>
              <code>expiry</code>
            </td>
            <td>From automatic points expiration</td>
          </tr>
          <tr>
            <td>
              <code>manual</code>
            </td>
            <td>From admin manual adjustment</td>
          </tr>
          <tr>
            <td>
              <code>void</code>
            </td>
            <td>From voiding a previous transaction</td>
          </tr>
        </tbody>
      </table>

      <H2>Reward Type</H2>
      <p>The type of discount reward a customer can redeem.</p>
      <table>
        <thead>
          <tr>
            <th>Value</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <code>percentage_off</code>
            </td>
            <td>Percentage discount (e.g. 10% off)</td>
          </tr>
          <tr>
            <td>
              <code>fixed_amount</code>
            </td>
            <td>Fixed dollar amount off (e.g. $5 off)</td>
          </tr>
          <tr>
            <td>
              <code>free_shipping</code>
            </td>
            <td>Free shipping on the order</td>
          </tr>
        </tbody>
      </table>

      <H2>Redemption Status</H2>
      <table>
        <thead>
          <tr>
            <th>Value</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <code>pending</code>
            </td>
            <td>Reward redeemed, discount code generated, not yet used</td>
          </tr>
          <tr>
            <td>
              <code>completed</code>
            </td>
            <td>Discount code has been applied to an order</td>
          </tr>
          <tr>
            <td>
              <code>voided</code>
            </td>
            <td>Redemption cancelled and points returned</td>
          </tr>
        </tbody>
      </table>

      <H2>Discount Type &amp; Status</H2>
      <table>
        <thead>
          <tr>
            <th>Enum</th>
            <th>Values</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <strong>Discount Type</strong>
            </td>
            <td>
              <code>percentage</code>, <code>fixed_amount</code>, <code>free_shipping</code>
            </td>
          </tr>
          <tr>
            <td>
              <strong>Discount Status</strong>
            </td>
            <td>
              <code>active</code>, <code>used</code>, <code>expired</code>, <code>deleted</code>
            </td>
          </tr>
        </tbody>
      </table>

      <H2>Review Status</H2>
      <table>
        <thead>
          <tr>
            <th>Value</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <code>pending</code>
            </td>
            <td>Awaiting moderation</td>
          </tr>
          <tr>
            <td>
              <code>approved</code>
            </td>
            <td>Published on the storefront</td>
          </tr>
          <tr>
            <td>
              <code>rejected</code>
            </td>
            <td>Declined by the merchant</td>
          </tr>
          <tr>
            <td>
              <code>spam</code>
            </td>
            <td>Flagged as spam</td>
          </tr>
        </tbody>
      </table>

      <H2>Review Source</H2>
      <table>
        <thead>
          <tr>
            <th>Value</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <code>native</code>
            </td>
            <td>Submitted through PerkStack&apos;s review form</td>
          </tr>
          <tr>
            <td>
              <code>import_judgeme</code>
            </td>
            <td>Imported from Judge.me via CSV</td>
          </tr>
          <tr>
            <td>
              <code>import_loox</code>
            </td>
            <td>Imported from Loox via CSV</td>
          </tr>
        </tbody>
      </table>

      <H2>Photo Status</H2>
      <table>
        <thead>
          <tr>
            <th>Value</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <code>pending</code>
            </td>
            <td>Upload received, awaiting processing</td>
          </tr>
          <tr>
            <td>
              <code>processing</code>
            </td>
            <td>Image being resized and optimised</td>
          </tr>
          <tr>
            <td>
              <code>completed</code>
            </td>
            <td>Processing complete, ready for display</td>
          </tr>
          <tr>
            <td>
              <code>failed</code>
            </td>
            <td>Processing failed (corrupt file, scan failure, etc.)</td>
          </tr>
        </tbody>
      </table>

      <H2>Request Status</H2>
      <p>Status of a review request email.</p>
      <table>
        <thead>
          <tr>
            <th>Value</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <code>scheduled</code>
            </td>
            <td>Email is scheduled for future delivery</td>
          </tr>
          <tr>
            <td>
              <code>sent</code>
            </td>
            <td>Email has been sent</td>
          </tr>
          <tr>
            <td>
              <code>opened</code>
            </td>
            <td>Customer opened the email</td>
          </tr>
          <tr>
            <td>
              <code>clicked</code>
            </td>
            <td>Customer clicked the review link</td>
          </tr>
          <tr>
            <td>
              <code>reviewed</code>
            </td>
            <td>Customer submitted a review</td>
          </tr>
          <tr>
            <td>
              <code>cancelled</code>
            </td>
            <td>Request was cancelled before sending</td>
          </tr>
        </tbody>
      </table>

      <H2>Import Status</H2>
      <table>
        <thead>
          <tr>
            <th>Value</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <code>pending</code>
            </td>
            <td>Import queued for processing</td>
          </tr>
          <tr>
            <td>
              <code>processing</code>
            </td>
            <td>Import in progress</td>
          </tr>
          <tr>
            <td>
              <code>completed</code>
            </td>
            <td>Import finished successfully</td>
          </tr>
          <tr>
            <td>
              <code>failed</code>
            </td>
            <td>Import encountered an error</td>
          </tr>
        </tbody>
      </table>

      <H2>Referral Status</H2>
      <table>
        <thead>
          <tr>
            <th>Value</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <code>pending</code>
            </td>
            <td>Referral link used, awaiting qualifying purchase</td>
          </tr>
          <tr>
            <td>
              <code>completed</code>
            </td>
            <td>Referred customer completed a qualifying order</td>
          </tr>
          <tr>
            <td>
              <code>expired</code>
            </td>
            <td>Referral expired without completion</td>
          </tr>
          <tr>
            <td>
              <code>voided</code>
            </td>
            <td>Referral voided (e.g. order refunded)</td>
          </tr>
        </tbody>
      </table>

      <H2>Job Status &amp; Actor Type</H2>
      <table>
        <thead>
          <tr>
            <th>Enum</th>
            <th>Values</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <strong>Job Status</strong>
            </td>
            <td>
              <code>running</code>, <code>completed</code>, <code>failed</code>
            </td>
          </tr>
          <tr>
            <td>
              <strong>Actor Type</strong>
            </td>
            <td>
              <code>merchant</code>, <code>system</code>, <code>support</code>
            </td>
          </tr>
        </tbody>
      </table>

      <Callout type="info">
        These enums are defined in <code>packages/shared/src/enums.ts</code> and are shared across
        the web app, worker, and extensions. Always reference the enum values rather than using raw
        strings.
      </Callout>

      <H2>Related</H2>
      <ul>
        <li>
          <a href="/docs/advanced/webhooks">Webhooks</a>: where many of these statuses are set or
          transitioned
        </li>
        <li>
          <a href="/docs/settings/billing">Billing &amp; Plans</a>: plan and billing status details
        </li>
        <li>
          <a href="/docs/reviews/moderation">Review Moderation</a>: review status lifecycle
        </li>
      </ul>
    </div>
  );
}
