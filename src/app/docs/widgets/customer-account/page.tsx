import type { Metadata } from "next";
import { createDocMetadata } from "@/lib/seo";
import { H2 } from "@/components/Heading";
import Callout from "@/components/Callout";

export const metadata: Metadata = createDocMetadata("/docs/widgets/customer-account", {
  title: "Loyalty Studio",
  description:
    "Give members a full loyalty dashboard inside their Shopify account — balance, tier progress, rewards, ways to earn, referrals, and activity, all in one place.",
});

export default function LoyaltyStudioPage() {
  return (
    <div className="docs-prose">
      <h1>Loyalty Studio</h1>
      <p>
        Loyalty Studio is a complete loyalty dashboard that lives inside Shopify&apos;s customer
        account area. Signed-in members get one place to see their balance and tier, browse and
        redeem rewards, track progress, grab their referral link, and review their activity — right
        where they already manage their orders and details.
      </p>

      <H2>How to add it</H2>
      <p>You add Loyalty Studio from Shopify&apos;s customer account editor.</p>
      <ol>
        <li>
          In your Shopify admin, go to <strong>Settings &gt; Customer accounts</strong>.
        </li>
        <li>
          Click <strong>Customize</strong> to open the customer account editor.
        </li>
        <li>
          Add the <strong>Loyalty Studio</strong> block to a menu item or page.
        </li>
        <li>Click <strong>Save</strong>.</li>
      </ol>

      <Callout type="info">
        Loyalty Studio inherits your customer account theme, so it matches the look of the rest of
        the account area automatically. There are no separate appearance settings to configure.
      </Callout>

      <H2>What members see</H2>
      <p>The dashboard brings the whole loyalty program together in one view:</p>
      <ul>
        <li>
          <strong>Hero summary</strong>: the member&apos;s name, points balance, and current tier
        </li>
        <li>
          <strong>Rewards marketplace</strong>: the rewards they can redeem, each generating a
          discount code to use at checkout
        </li>
        <li>
          <strong>Tier progress</strong>: how close they are to the next VIP tier
        </li>
        <li>
          <strong>Ways to earn</strong>: the actions that earn points, so they know how to climb
        </li>
        <li>
          <strong>Referral</strong>: their personal referral link to share with friends
        </li>
        <li>
          <strong>Activity</strong>: recent points history, including any points still pending
        </li>
      </ul>

      <Callout type="warning">
        Loyalty Studio appears only for signed-in customers using Shopify&apos;s customer account
        area. What it shows — rewards, tiers, referrals — depends on how you&apos;ve set up your
        loyalty program.
      </Callout>

      <H2>Loyalty Studio vs. the Loyalty Page block</H2>
      <p>
        Both surfaces show a loyalty dashboard, but they live in different places. Loyalty Studio is
        built into Shopify&apos;s native customer account area — best if your store uses the new
        customer accounts. The{" "}
        <a href="/docs/widgets/loyalty-page">Loyalty Page</a> block is a theme block you place on a
        storefront page (merchants often make a &quot;Rewards&quot; page for it). Use Loyalty Studio
        for the account portal and the Loyalty Page block for a public-facing storefront page — or
        both.
      </p>

      <H2>Related</H2>
      <ul>
        <li>
          <a href="/docs/widgets/loyalty-page">Loyalty Page</a>: the storefront theme block version
          of the loyalty dashboard
        </li>
        <li>
          <a href="/docs/widgets/loyalty-launcher">Loyalty Launcher</a>: the floating rewards panel
          for every page
        </li>
        <li>
          <a href="/docs/loyalty/rewards">Rewards</a>: the rewards members redeem in the marketplace
        </li>
        <li>
          <a href="/docs/widgets/overview">Widgets Overview</a>: every storefront block and where it
          goes
        </li>
      </ul>
    </div>
  );
}
