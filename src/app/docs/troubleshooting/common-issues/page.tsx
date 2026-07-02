import type { Metadata } from "next";
import { createDocMetadata } from "@/lib/seo";
import { H2 } from "@/components/Heading";
import Callout from "@/components/Callout";
import PlanBadge from "@/components/PlanBadge";

export const metadata: Metadata = createDocMetadata("/docs/troubleshooting/common-issues", {
  title: "Common Issues",
  description:
    "Quick fixes for the things merchants hit most: storefront blocks not showing, points not awarding, reviews or emails missing, and features that appear locked.",
});

export default function CommonIssuesPage() {
  return (
    <div className="docs-prose">
      <h1>Common Issues</h1>
      <p>
        Most PerkStack questions come down to a handful of settings. This page lists the symptoms
        merchants run into most, with a clear fix for each. If something here doesn&apos;t resolve
        it, the <a href="/docs/troubleshooting/faq">FAQ</a> and{" "}
        <a href="/docs/troubleshooting/status-reference">Status Reference</a> cover more.
      </p>

      <H2>A storefront block isn&apos;t showing</H2>
      <p>
        <strong>Symptom:</strong> the loyalty launcher, review display, star badge, or another
        PerkStack block isn&apos;t visible on your live store.
      </p>
      <p>
        Storefront blocks have to be added and turned on in your theme &mdash; installing PerkStack
        alone doesn&apos;t place them. Work through the{" "}
        <a href="/docs/dashboard/extension-status">Theme Setup</a> checklist on your dashboard: it
        shows every block, whether it&apos;s active, and a <strong>Set up</strong> button that takes
        you straight to the theme editor to add it.
      </p>
      <ol>
        <li>
          Open <strong>PerkStack → Dashboard</strong> and find the <strong>Theme Setup</strong> card.
        </li>
        <li>
          Find the block that isn&apos;t showing and click <strong>Set up</strong>.
        </li>
        <li>In the theme editor, add or enable the block, then save.</li>
        <li>Refresh your storefront to confirm it appears.</li>
      </ol>

      <Callout type="tip">
        Colors, copy, and fonts for your storefront blocks live inside PerkStack (Widget
        customization), not in the theme editor. The theme editor only controls where a block sits
        and whether it&apos;s on.
      </Callout>

      <H2>A block shows &quot;Not added&quot; even though I added it</H2>
      <p>
        <strong>Symptom:</strong> you added the checkout, customer-account, or customer-page block,
        but Theme Setup still shows it as <strong>Not added</strong>.
      </p>
      <p>
        These blocks report <strong>Active</strong> only after a real shopper has actually loaded
        them recently. A block you just added will keep reading <strong>Not added</strong> until a
        customer opens the page it&apos;s on. To confirm it&apos;s working, view the page yourself as
        a signed-in customer (or wait for normal traffic) and re-check the checklist afterward.
      </p>

      <H2>Points aren&apos;t being awarded</H2>
      <p>
        <strong>Symptom:</strong> customers place orders or take an action but don&apos;t receive
        points.
      </p>
      <table>
        <thead>
          <tr>
            <th>Likely cause</th>
            <th>How to fix it</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>The earn rule is turned off</td>
            <td>
              Open <strong>Loyalty → Ways to Earn</strong> and confirm the rule (Purchase, Review,
              etc.) is active with a points amount set.
            </td>
          </tr>
          <tr>
            <td>Birthday or referral rewards were never switched on</td>
            <td>
              These two ship <strong>turned off</strong>. Enable them in{" "}
              <strong>Loyalty → Ways to Earn</strong> (referrals require <PlanBadge plan="growth" />).
            </td>
          </tr>
          <tr>
            <td>You&apos;ve hit your monthly order cap</td>
            <td>
              On <PlanBadge plan="free" /> and <PlanBadge plan="essential" />, earning pauses once
              you reach the monthly order cap and resumes next month.{" "}
              <a href="/docs/settings/billing">Upgrade</a> for a higher cap, or use Cap Recovery after
              upgrading to award missed points.
            </td>
          </tr>
          <tr>
            <td>The customer is frozen</td>
            <td>
              A <a href="/docs/customers/freeze">frozen</a> customer can&apos;t earn. Unfreeze them
              from the Customers list.
            </td>
          </tr>
          <tr>
            <td>Purchase points are on a delay</td>
            <td>
              If <a href="/docs/loyalty/points-system">points delay</a> is on, purchase points sit as
              pending for the delay period before landing. Check the customer&apos;s detail page for
              pending points.
            </td>
          </tr>
        </tbody>
      </table>

      <H2>Reviews aren&apos;t appearing on the storefront</H2>
      <p>
        <strong>Symptom:</strong> a customer submitted a review but it isn&apos;t on the product page.
      </p>
      <p>
        Only <strong>approved</strong> reviews show publicly. A review below your auto-approve rating
        &mdash; or one that contains a blacklisted word &mdash; waits in the moderation queue as{" "}
        <strong>Pending</strong> until you approve it.
      </p>
      <ol>
        <li>
          Open <strong>Reviews</strong> and filter by <strong>Pending</strong>.
        </li>
        <li>Approve the review.</li>
        <li>
          Confirm the <a href="/docs/reviews/overview">Review Display</a> block is added to your
          product template (see the first issue above).
        </li>
      </ol>

      <Callout type="info">
        By default, clean reviews rated 4 stars or higher publish automatically; 1&ndash;3 star or
        flagged reviews wait for your approval. You can change the auto-approve rating in{" "}
        <a href="/docs/settings/review-settings">Review Settings</a>.
      </Callout>

      <H2>Review request emails aren&apos;t sending</H2>
      <p>
        <strong>Symptom:</strong> customers aren&apos;t getting the emails asking them to review what
        they bought.
      </p>
      <table>
        <thead>
          <tr>
            <th>Likely cause</th>
            <th>How to fix it</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Review requests are turned off</td>
            <td>
              Turn on <strong>review request emails</strong> in{" "}
              <a href="/docs/settings/review-settings">Review Settings</a>.
            </td>
          </tr>
          <tr>
            <td>It hasn&apos;t been long enough yet</td>
            <td>
              Requests send a set number of days after an order ships (7 by default). Recent orders
              may still be waiting out the delay.
            </td>
          </tr>
          <tr>
            <td>You&apos;ve reached your monthly email cap</td>
            <td>
              On paid plans, outbound emails pause once you hit your monthly email cap and resume next
              month. Check usage in <a href="/docs/settings/email">Email &amp; Notifications</a> or{" "}
              <a href="/docs/settings/billing">upgrade</a> for a higher cap.
            </td>
          </tr>
        </tbody>
      </table>

      <H2>The checkout or account block is missing</H2>
      <p>
        <strong>Symptom:</strong> the points display at checkout or the loyalty section in the
        customer account area isn&apos;t there.
      </p>
      <ul>
        <li>
          These blocks need the <PlanBadge plan="essential" /> plan or above and are only available on{" "}
          <strong>Shopify Plus</strong> stores (Shopify&apos;s checkout and account extensibility).
        </li>
        <li>
          If you qualify, add them from the <a href="/docs/dashboard/extension-status">Theme Setup</a>{" "}
          checklist, which deep-links you into the right editor.
        </li>
        <li>
          Remember they only read <strong>Active</strong> after a shopper has loaded them &mdash; see
          the &quot;Not added&quot; issue above.
        </li>
      </ul>

      <H2>A feature looks locked or greyed out</H2>
      <p>
        <strong>Symptom:</strong> a setting is visible but disabled, with a message naming a plan.
      </p>
      <p>
        Plan-gated features stay visible so you can see what they do, but they&apos;re disabled until
        you&apos;re on the required plan. The message names the plan that unlocks the feature. For
        example, VIP tiers and referrals need <PlanBadge plan="growth" />, while CSV review import
        needs <PlanBadge plan="studio" />. Check the{" "}
        <a href="/docs/settings/billing">Plans &amp; Billing</a> page to see what each plan includes,
        or the <a href="/docs/troubleshooting/faq">FAQ</a> for a plan-by-plan breakdown.
      </p>

      <Callout type="tip">
        Downgrading never deletes what you&apos;ve set up. Your saved settings and every customer&apos;s
        earned points are kept &mdash; premium features simply pause until you upgrade again.
      </Callout>

      <H2>Related</H2>
      <ul>
        <li>
          <a href="/docs/troubleshooting/faq">FAQ</a>: plans, pricing, and common product questions
        </li>
        <li>
          <a href="/docs/troubleshooting/status-reference">Status Reference</a>: what each status
          means
        </li>
        <li>
          <a href="/docs/dashboard/extension-status">Theme Setup &amp; Status</a>: add blocks and
          check what&apos;s active
        </li>
        <li>
          <a href="/docs/settings/billing">Plans &amp; Billing</a>: what your plan includes
        </li>
      </ul>
    </div>
  );
}
