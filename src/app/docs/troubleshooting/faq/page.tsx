import type { Metadata } from "next";
import Callout from "@/components/Callout";
import PlanBadge from "@/components/PlanBadge";

export const metadata: Metadata = {
  title: "Frequently Asked Questions",
  description:
    "Answers to common questions about PerkStack covering customer accounts, data portability, review imports, tier calculations, and more.",
};

export default function FAQPage() {
  return (
    <div className="docs-prose">
      <h1>Frequently Asked Questions</h1>

      <h2>Customer Accounts &amp; Points</h2>

      <h3>Can customers earn points without a Shopify account?</h3>
      <p>
        No. Points are tied to Shopify customer accounts. Guests who check out without creating an
        account do not earn points. If a guest creates an account later using the same email,
        previously placed orders are not retroactively awarded points.
      </p>

      <Callout type="tip">
        Encourage account creation by highlighting the points incentive in your storefront widget
        and at checkout. The checkout extension can display how many points the customer would earn
        for their current order.
      </Callout>

      <h3>Do points transfer between stores?</h3>
      <p>
        No. Points are per-shop. Each Shopify store that installs PerkStack has its own independent
        loyalty program. Customers who shop at multiple stores using PerkStack have separate
        balances at each.
      </p>

      <h3>How are VIP tiers calculated?</h3>
      <p>
        Tiers are based on <strong>lifetime earned points</strong>, not the customer&apos;s current
        balance. This means that redeeming points for rewards or having points expire does not lower
        a customer&apos;s tier. Only the total points ever earned count toward tier qualification.
      </p>
      <p>
        When a customer&apos;s lifetime earned points cross a tier threshold, they are automatically
        promoted to the new tier. Tier demotions are not automatic; once a customer reaches a tier,
        they stay there unless an admin clears a tier override.
      </p>

      <Callout type="info">
        VIP tiers require the <PlanBadge plan="growth" /> plan or above. See{" "}
        <a href="/docs/customers/tier-overrides">Tier Overrides</a> for manual tier management.
      </Callout>

      <h2>Reviews</h2>

      <h3>Can I import reviews from another app?</h3>
      <p>Yes. PerkStack supports CSV imports from:</p>
      <ul>
        <li>
          <strong>Judge.me</strong>: export your reviews as CSV from Judge.me, then import in
          PerkStack
        </li>
        <li>
          <strong>Loox</strong>: export your reviews as CSV from Loox, then import in PerkStack
        </li>
      </ul>
      <p>
        Imported reviews retain their original ratings, text, and photos. They are marked with the
        appropriate import source (<code>import_judgeme</code> or <code>import_loox</code>) so you
        can distinguish them from native PerkStack reviews.
      </p>

      <h3>Can I customize email templates?</h3>
      <p>
        Yes. You can customize the subject line and body of review request emails using template
        variables (<code>{"{{product_title}}"}</code>, <code>{"{{customer_name}}"}</code>,{" "}
        <code>{"{{points_incentive}}"}</code>). See{" "}
        <a href="/docs/settings/review-settings">Review Settings</a> for details.
      </p>

      <h2>Data &amp; Privacy</h2>

      <h3>What happens when I uninstall PerkStack?</h3>
      <p>When you uninstall PerkStack:</p>
      <ul>
        <li>
          <strong>Theme extensions are removed automatically</strong>. Shopify handles this for
          theme app extensions, so no code remains on your storefront
        </li>
        <li>
          <strong>Data is retained</strong>: your settings, customers, reviews, and transaction
          history are preserved in the database for 48 hours
        </li>
        <li>
          <strong>Reinstallation restores data</strong>: if you reinstall within 48 hours, all your
          data is still there
        </li>
        <li>
          <strong>GDPR redaction</strong>: after 48 hours, Shopify sends a <code>shop/redact</code>{" "}
          webhook and all shop data is permanently deleted
        </li>
      </ul>

      <Callout type="warning">
        Uninstalling and reinstalling does not affect your billing. You will need to resubscribe to
        a paid plan if you were on one previously.
      </Callout>

      <h2>API &amp; Integrations</h2>

      <h3>Is there an API?</h3>
      <p>
        Yes. All storefront functionality is available via the app proxy API. The app proxy routes
        requests through <code>/apps/perkstack/api/...</code> and handles authentication
        automatically. This includes:
      </p>
      <ul>
        <li>Fetching customer points balance and tier</li>
        <li>Listing available rewards</li>
        <li>Submitting reviews</li>
        <li>Fetching product reviews and ratings</li>
        <li>Redeeming rewards</li>
        <li>Referral link generation</li>
      </ul>

      <h3>Does PerkStack integrate with Shopify Flow?</h3>
      <p>
        Yes, on the <PlanBadge plan="growth" /> plan or above. PerkStack provides a Flow trigger
        that fires whenever a new review is submitted. This lets you build automations like:
      </p>
      <ul>
        <li>Send a Slack notification when a negative review is submitted</li>
        <li>Tag the customer in Shopify when they leave a 5-star review</li>
        <li>Add the customer to a marketing segment based on review activity</li>
      </ul>

      <h2>Billing</h2>

      <h3>Can I try a paid plan before committing?</h3>
      <p>
        Yes. <PlanBadge plan="essential" /> includes a 14-day free trial,{" "}
        <PlanBadge plan="growth" /> a 21-day trial, and <PlanBadge plan="studio" /> a 30-day trial.
        You get full access to all plan features during the trial. If you downgrade or cancel
        before the trial ends, you are not charged.
      </p>

      <h3>How does billing work?</h3>
      <p>
        PerkStack uses Shopify&apos;s built-in billing API. Charges appear on your Shopify invoice
        alongside your other app charges. Shopify handles all payment processing - PerkStack never
        sees your credit card details.
      </p>

      <h3>What happens if my payment fails?</h3>
      <p>
        Your billing status changes to <code>frozen</code>. A banner appears in PerkStack prompting
        you to update your payment method in Shopify. Paid features remain available for a grace
        period, after which they are restricted until payment is resolved. See{" "}
        <a href="/docs/settings/billing">Billing &amp; Plans</a> for details.
      </p>

      <h2>Related</h2>
      <ul>
        <li>
          <a href="/docs/troubleshooting/common-issues">Common Issues</a>: step-by-step
          troubleshooting guides
        </li>
        <li>
          <a href="/docs/getting-started/introduction">Introduction</a>: overview of PerkStack
          features and plans
        </li>
        <li>
          <a href="/docs/advanced/status-reference">Status Reference</a>: all status enums used
          across PerkStack
        </li>
      </ul>
    </div>
  );
}
