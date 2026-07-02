import type { Metadata } from "next";
import { createDocMetadata } from "@/lib/seo";
import { H2 } from "@/components/Heading";
import Callout from "@/components/Callout";
import PlanBadge from "@/components/PlanBadge";

export const metadata: Metadata = createDocMetadata("/docs/getting-started/introduction", {
  title: "Introduction",
  description:
    "PerkStack: Loyalty & Reviews brings a points program, product reviews, and referrals together in one Shopify app — turning one-time buyers into repeat customers.",
});

export default function IntroductionPage() {
  return (
    <div className="docs-prose">
      <h1>Introduction</h1>
      <p>
        <strong>PerkStack: Loyalty &amp; Reviews</strong> is a single Shopify app that runs three of
        the most effective retention tools for your store — a loyalty points program, product
        reviews, and a referral program — from one place. Customers earn points when they shop,
        review, and refer friends, then spend those points on rewards that bring them back.
      </p>

      <H2>What PerkStack does</H2>
      <ul>
        <li>
          <strong>Loyalty points</strong>: reward shoppers for buying, signing up, writing reviews,
          sharing on social, celebrating birthdays, and more. They redeem points for discounts, free
          shipping, free products, and other rewards.
        </li>
        <li>
          <strong>Product reviews</strong>: automatically ask customers for a review after they buy,
          collect star ratings and photos, and display that social proof on your product pages.
        </li>
        <li>
          <strong>Referrals</strong>: let happy customers share a personal link. Their friend gets a
          welcome discount, and both sides earn points when the friend buys.
        </li>
      </ul>
      <p>
        Everything is managed inside your Shopify admin. Shoppers interact with it through a floating
        rewards launcher and blocks you add to your storefront.
      </p>

      <H2>Who it&apos;s for</H2>
      <p>
        PerkStack is built for Shopify merchants and their teams — store owners, marketing managers,
        and support staff who want more repeat purchases and stronger trust without stitching
        together separate loyalty and reviews apps. You already know Shopify; PerkStack fits on top
        of it.
      </p>

      <H2>Why it helps</H2>
      <p>
        Winning a new customer costs far more than keeping an existing one. A loyalty program gives
        shoppers a reason to come back, reviews turn browsers into buyers, and referrals bring in new
        customers who already trust a friend&apos;s recommendation. Running all three together means
        each one feeds the others — a review earns points, points bring the customer back, and their
        next purchase can spark a referral.
      </p>

      <H2>The plans at a glance</H2>
      <p>PerkStack has four plans, so you can start free and grow into more features:</p>
      <table>
        <thead>
          <tr>
            <th>Plan</th>
            <th>Price</th>
            <th>Best for</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <PlanBadge plan="free" />
            </td>
            <td>$0/mo</td>
            <td>Newer stores running a percentage-off points program and collecting reviews</td>
          </tr>
          <tr>
            <td>
              <PlanBadge plan="essential" />
            </td>
            <td>$29/mo</td>
            <td>Stores wanting photo reviews, more reward types, and branding removal</td>
          </tr>
          <tr>
            <td>
              <PlanBadge plan="growth" />
            </td>
            <td>$99/mo</td>
            <td>Scaling stores that want VIP tiers, referrals, and integrations</td>
          </tr>
          <tr>
            <td>
              <PlanBadge plan="studio" />
            </td>
            <td>$299/mo</td>
            <td>High-volume brands wanting white-label branding and data import</td>
          </tr>
        </tbody>
      </table>

      <Callout type="tip">
        You can run a real loyalty program and collect unlimited text reviews on the free plan — it
        is a full product, not a trial. See <a href="/docs/settings/billing">Plans &amp; Billing</a>{" "}
        for the full feature comparison, caps, and trial lengths.
      </Callout>

      <H2>Related</H2>
      <ul>
        <li>
          <a href="/docs/getting-started/how-it-works">How It Works</a>: the loyalty and reviews
          flywheel explained in plain terms
        </li>
        <li>
          <a href="/docs/getting-started/installation">Installing PerkStack</a>: add the app from the
          Shopify App Store
        </li>
        <li>
          <a href="/docs/settings/billing">Plans &amp; Billing</a>: full plan comparison, prices, and
          caps
        </li>
      </ul>
    </div>
  );
}
