import type { Metadata } from "next";
import { createDocMetadata } from "@/lib/seo";
import { H2 } from "@/components/Heading";
import Callout from "@/components/Callout";
import PlanBadge from "@/components/PlanBadge";

export const metadata: Metadata = createDocMetadata("/docs/widgets/checkout-widget", {
  title: "Checkout Rewards",
  description:
    "Let signed-in shoppers see their points balance and redeem an affordable reward right inside the Shopify checkout, with the discount applied to their order automatically.",
});

export default function CheckoutRewardsPage() {
  return (
    <div className="docs-prose">
      <h1>
        Checkout Rewards <PlanBadge plan="essential" />
      </h1>
      <p>
        Checkout Rewards puts your loyalty program in front of shoppers at the moment they buy.
        Signed-in customers see their points balance, tier, and a short list of rewards they can
        afford — and redeeming one applies the discount to the order right there in checkout. It
        turns points into a reason to complete the purchase.
      </p>

      <Callout type="info">
        Checkout Rewards is available on the <PlanBadge plan="essential" /> plan and above. It
        isn&apos;t available on the <PlanBadge plan="free" /> plan.
      </Callout>

      <H2>How to add it</H2>
      <p>
        You add Checkout Rewards in Shopify&apos;s own checkout editor, where it appears as the{" "}
        <strong>PerkStack Checkout</strong> block.
      </p>
      <ol>
        <li>
          In your Shopify admin, go to <strong>Settings &gt; Checkout</strong>.
        </li>
        <li>
          Click <strong>Customize</strong> to open the checkout editor.
        </li>
        <li>
          Click <strong>Add app block</strong> and choose <strong>PerkStack Checkout</strong>.
        </li>
        <li>
          Drag it to where you want it — the order summary sidebar is a natural spot — then click{" "}
          <strong>Save</strong>.
        </li>
      </ol>

      <Callout type="info">
        The checkout editor is separate from the theme editor. You reach it from{" "}
        <strong>Settings &gt; Checkout &gt; Customize</strong>, not from Online Store &gt; Themes.
      </Callout>

      <H2>What shoppers see</H2>
      <p>A signed-in customer sees a rewards card in the checkout showing:</p>
      <ul>
        <li>Their available points balance, with a note about any points still pending</li>
        <li>Their current tier and points-earning multiplier, plus progress toward the next tier</li>
        <li>
          Up to <strong>three</strong> rewards they can afford right now, each with a{" "}
          <strong>Redeem</strong> button
        </li>
      </ul>
      <p>
        When they redeem, the discount is applied to the order automatically — no code to copy or
        paste. If a shopper already redeemed a reward on the loyalty launcher or loyalty page before
        reaching checkout, that discount carries over here on its own. Guests are shown a short
        prompt to create an account so they can redeem.
      </p>

      <H2>Appearance</H2>
      <p>
        Checkout Rewards appears automatically with sensible defaults once it&apos;s added — there
        are no per-field styling controls to set up. Its accent color follows your loyalty accent
        color, so it stays consistent with the rest of your PerkStack widgets.
      </p>

      <H2>Requirements</H2>
      <ul>
        <li>
          <strong>The customer must be signed in.</strong> Guests checking out without an account
          see the sign-up prompt instead of their balance.
        </li>
        <li>
          <strong>Your loyalty program must have rewards defined.</strong> There&apos;s nothing to
          redeem until you&apos;ve set up at least one reward customers can afford.
        </li>
        <li>
          <strong>Your store must be on <PlanBadge plan="essential" /> or above.</strong>
        </li>
      </ul>

      <H2>Related</H2>
      <ul>
        <li>
          <a href="/docs/loyalty/rewards">Rewards</a>: create the rewards shoppers can redeem at
          checkout
        </li>
        <li>
          <a href="/docs/widgets/loyalty-launcher">Loyalty Launcher</a>: the floating rewards panel a
          redeemed code can carry over from
        </li>
        <li>
          <a href="/docs/loyalty/vip-tiers">VIP Tiers</a>: the tiers and multipliers shown in the
          checkout card
        </li>
        <li>
          <a href="/docs/settings/billing">Plans &amp; Billing</a>: which plan unlocks Checkout
          Rewards
        </li>
      </ul>
    </div>
  );
}
