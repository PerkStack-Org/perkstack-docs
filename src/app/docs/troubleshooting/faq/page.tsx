import type { Metadata } from "next";
import { createDocMetadata } from "@/lib/seo";
import { H2, H3 } from "@/components/Heading";
import Callout from "@/components/Callout";
import PlanBadge from "@/components/PlanBadge";

export const metadata: Metadata = createDocMetadata("/docs/troubleshooting/faq", {
  title: "FAQ",
  description:
    "Answers to the questions merchants ask most about PerkStack — plans and pricing, trials, order caps, downgrades, branding, and how points and reviews behave.",
});

export default function FAQPage() {
  return (
    <div className="docs-prose">
      <h1>FAQ</h1>
      <p>
        Quick answers to the questions merchants ask most. For step-by-step fixes, see{" "}
        <a href="/docs/troubleshooting/common-issues">Common Issues</a>.
      </p>

      <H2>Plans &amp; pricing</H2>

      <H3>What plans does PerkStack offer, and how much do they cost?</H3>
      <p>There are four plans, billed monthly:</p>
      <table>
        <thead>
          <tr>
            <th>Plan</th>
            <th>Price / month</th>
            <th>Free trial</th>
            <th>Monthly order cap</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <PlanBadge plan="free" />
            </td>
            <td>$0</td>
            <td>&mdash;</td>
            <td>100</td>
          </tr>
          <tr>
            <td>
              <PlanBadge plan="essential" />
            </td>
            <td>$29</td>
            <td>14 days</td>
            <td>500</td>
          </tr>
          <tr>
            <td>
              <PlanBadge plan="growth" />
            </td>
            <td>$99</td>
            <td>21 days</td>
            <td>2,500</td>
          </tr>
          <tr>
            <td>
              <PlanBadge plan="studio" />
            </td>
            <td>$299</td>
            <td>30 days</td>
            <td>10,000</td>
          </tr>
        </tbody>
      </table>

      <H3>Is there annual billing?</H3>
      <p>
        No. Every plan is billed monthly through Shopify. Charges appear on your regular Shopify
        invoice, and you approve them on Shopify&apos;s own billing page &mdash; you never enter card
        details inside PerkStack.
      </p>

      <H3>Can I try a paid plan first?</H3>
      <p>
        Yes. Essential includes a 14-day trial, Growth a 21-day trial, and Studio a 30-day trial. You
        get that plan&apos;s full features and caps during the trial, and you&apos;re not charged if
        you cancel or downgrade before it ends.
      </p>

      <H3>What happens if I hit my monthly order cap?</H3>
      <p>
        On <PlanBadge plan="free" /> and <PlanBadge plan="essential" />, point-earning simply pauses
        once you reach the cap and resumes at the start of the next month. On{" "}
        <PlanBadge plan="growth" /> and <PlanBadge plan="studio" />, orders keep earning past the cap
        and the extra is billed as usage on your Shopify invoice (capped so it can&apos;t run away).
      </p>

      <Callout type="info">
        Reaching the cap only pauses new point-earning and outbound emails. Your storefront widget,
        redeeming already-earned points, and collecting and displaying reviews all keep working.
      </Callout>

      <H3>If I downgrade, do my customers lose their points?</H3>
      <p>
        No. Earned points always stay valid. Downgrading only changes your caps and which features
        are active going forward &mdash; your settings and customer balances are kept, and premium
        features reactivate if you upgrade again.
      </p>

      <H3>How do I remove the &quot;Powered by PerkStack&quot; branding?</H3>
      <p>
        Removing the branding is available on <PlanBadge plan="essential" /> and above. Turn it off in{" "}
        <a href="/docs/settings/email">Email &amp; Notifications</a>. On the Free plan the mark always
        shows.
      </p>

      <H3>Which features need a higher plan?</H3>
      <ul>
        <li>
          <strong>Photo reviews, points expiry, points delay, and branding removal</strong> &mdash;{" "}
          <PlanBadge plan="essential" /> and above.
        </li>
        <li>
          <strong>VIP tiers, referrals, custom points currency, Shopify Flow, and Agent Access</strong>{" "}
          &mdash; <PlanBadge plan="growth" /> and above.
        </li>
        <li>
          <strong>CSV review import, Custom CSS, and custom email sender domain</strong> &mdash;{" "}
          <PlanBadge plan="studio" /> only.
        </li>
      </ul>

      <H3>Can I import my existing reviews?</H3>
      <p>
        Yes, by uploading a CSV export from Judge.me or Loox. CSV import is a{" "}
        <PlanBadge plan="studio" /> feature. See <a href="/docs/reviews/importing">Importing</a> for
        the steps.
      </p>

      <H2>Points &amp; loyalty</H2>

      <H3>Do points expire?</H3>
      <p>
        Only if you turn expiry on. By default points never expire. Points expiry is available on{" "}
        <PlanBadge plan="essential" /> and above, where you set an expiry period and how far ahead to
        warn customers &mdash; and PerkStack notifies them before any points are removed, so they have
        a chance to earn or redeem and reset the clock.
      </p>

      <H3>How are VIP tiers decided?</H3>
      <p>
        By a customer&apos;s <strong>lifetime earned points</strong>, not their current balance.
        Redeeming rewards or having points expire never lowers a customer&apos;s tier. You can also{" "}
        <a href="/docs/customers/tier-overrides">manually pin</a> a customer to a tier. VIP tiers need{" "}
        <PlanBadge plan="growth" /> and above.
      </p>

      <H3>Can a customer change their birthday after entering it?</H3>
      <p>
        No. Once a shopper saves their birthday it&apos;s locked, which prevents anyone from editing
        the date to collect birthday points more than once. If a customer entered the wrong date,
        they&apos;ll need to reach out to you.
      </p>

      <H2>Reviews</H2>

      <H3>Do imported reviews need approval?</H3>
      <p>
        No. Reviews brought in through a CSV import come in already approved, so they display right
        away without going through the moderation queue.
      </p>

      <H3>Do new reviews publish automatically?</H3>
      <p>
        Clean reviews at or above your auto-approve rating (4 stars by default) publish
        automatically. Lower-rated reviews, or any that contain a blacklisted word, wait in the
        moderation queue for your approval. You can adjust the threshold in{" "}
        <a href="/docs/settings/review-settings">Review Settings</a>.
      </p>

      <H2>Related</H2>
      <ul>
        <li>
          <a href="/docs/troubleshooting/common-issues">Common Issues</a>: step-by-step fixes
        </li>
        <li>
          <a href="/docs/troubleshooting/status-reference">Status Reference</a>: what each status
          means
        </li>
        <li>
          <a href="/docs/settings/billing">Plans &amp; Billing</a>: full feature comparison
        </li>
      </ul>
    </div>
  );
}
