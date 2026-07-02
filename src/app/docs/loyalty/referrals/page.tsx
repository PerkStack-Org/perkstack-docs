import type { Metadata } from "next";
import { createDocMetadata } from "@/lib/seo";
import { H2 } from "@/components/Heading";
import Callout from "@/components/Callout";
import PlanBadge from "@/components/PlanBadge";

export const metadata: Metadata = createDocMetadata("/docs/loyalty/referrals", {
  title: "Referrals",
  description:
    "Turn happy customers into advocates: give friends a discount on their first order and reward both sides with points.",
});

export default function ReferralsPage() {
  return (
    <div className="docs-prose">
      <h1>
        Referrals <PlanBadge plan="growth" />
      </h1>
      <p>
        Referrals turn your existing customers into advocates. Each customer gets a personal link to
        share; when a friend uses it to make their first purchase, the friend saves money and both
        people earn points &mdash; a win-win that brings you new buyers at a low cost.
      </p>

      <Callout type="info">
        Referrals are available on the <PlanBadge plan="growth" /> plan and above, and they ship{" "}
        <strong>turned off</strong>. To launch the program, turn on the{" "}
        <strong>Referral</strong> earn rule in{" "}
        <strong>PerkStack → Loyalty → Ways to Earn</strong>.
      </Callout>

      <H2>How it works</H2>
      <ol>
        <li>Every customer gets a unique referral link to share with friends.</li>
        <li>A friend clicks the link and lands on your store with a discount ready to apply.</li>
        <li>
          When the friend completes their first purchase, they get a{" "}
          <strong>10% discount</strong> on that order, and both the referrer and the friend earn
          points.
        </li>
        <li>The referral shows up in your dashboard as completed.</li>
      </ol>

      <H2>Two rewards, not one</H2>
      <p>
        A completed referral hands out two separate things, so it&apos;s worth understanding the full
        cost:
      </p>
      <ul>
        <li>
          <strong>The friend&apos;s 10% discount.</strong> The referred friend automatically gets 10%
          off their first order. This comes straight off that sale.
        </li>
        <li>
          <strong>Points for both people.</strong> On top of the discount, the referrer and the
          friend each earn loyalty points (defaults below), which they can later redeem for rewards.
        </li>
      </ul>
      <Callout type="warning">
        The 10% friend discount is <strong>separate from</strong> the points both parties earn. When
        you plan your program&apos;s economics, count both: the one-time discount on the friend&apos;s
        first order and the value of the points on each side.
      </Callout>

      <H2>Points awarded</H2>
      <p>
        Set the point amounts on the Referral earn rule in{" "}
        <strong>Loyalty → Ways to Earn</strong>. The defaults are:
      </p>
      <table>
        <thead>
          <tr>
            <th>Recipient</th>
            <th>Default points</th>
            <th>Who they are</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <strong>Referrer</strong>
            </td>
            <td>500</td>
            <td>Your existing customer who shared their link</td>
          </tr>
          <tr>
            <td>
              <strong>Friend</strong>
            </td>
            <td>200</td>
            <td>The new customer who bought through the link</td>
          </tr>
        </tbody>
      </table>
      <Callout type="tip">
        A higher reward for the referrer encourages active sharing, while a meaningful reward for the
        friend gives new shoppers a reason to use the link instead of buying directly.
      </Callout>

      <H2>Where customers share their link</H2>
      <p>Customers find and share their referral link in two places on your storefront:</p>
      <ul>
        <li>
          The <strong>&ldquo;Refer a friend&rdquo;</strong> drawer inside the loyalty launcher.
        </li>
        <li>
          A <strong>&ldquo;Refer a Friend&rdquo;</strong> section on your full loyalty page.
        </li>
      </ul>
      <p>
        Both show the customer&apos;s link with a copy button, the reward they&apos;ll get, and how
        many friends they&apos;ve referred so far. Referral sharing does not appear at checkout or on
        the customer account page.
      </p>

      <H2>Tracking your program</H2>
      <p>
        Open <strong>Loyalty → Referrals</strong> to see how the program is performing at a glance:
      </p>
      <ul>
        <li>
          <strong>Total</strong> &mdash; every referral that has been started.
        </li>
        <li>
          <strong>Completed</strong> &mdash; referrals where the friend made a qualifying purchase
          and rewards were paid out.
        </li>
        <li>
          <strong>Pending</strong> &mdash; referrals still waiting on the friend to buy.
        </li>
      </ul>

      <H2>Related</H2>
      <ul>
        <li>
          <a href="/docs/loyalty/earn-rules">Ways to Earn</a>: turn on the Referral rule and set the
          point amounts
        </li>
        <li>
          <a href="/docs/widgets/loyalty-launcher">Loyalty Launcher</a>: where the &ldquo;Refer a
          friend&rdquo; drawer lives
        </li>
        <li>
          <a href="/docs/widgets/loyalty-page">Loyalty Page</a>: the full-page referral section
        </li>
        <li>
          <a href="/docs/loyalty/points-system">How Points Work</a>: how referral points are tracked
        </li>
      </ul>
    </div>
  );
}
