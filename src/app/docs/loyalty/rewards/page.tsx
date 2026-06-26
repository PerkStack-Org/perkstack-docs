import type { Metadata } from "next";
import { createDocMetadata } from "@/lib/seo";
import { H2 } from "@/components/Heading";
import Callout from "@/components/Callout";

export const metadata: Metadata = createDocMetadata("/docs/loyalty/rewards", {
  title: "Rewards Catalog",
  description:
    "Set up the rewards customers can redeem loyalty points for, including fixed and percentage discounts, free shipping, free products, BOGO, spend-X-get-product, gift catalogs, tier-gated rewards, redemption limits, per-tier overrides, manual grants, and the Reward Sold Out Flow trigger.",
});

export default function RewardsPage() {
  return (
    <div className="docs-prose">
      <h1>Rewards Catalog</h1>
      <p>
        The rewards catalog defines what customers can spend their loyalty points on. Configure your
        rewards from <strong>PerkStack → Loyalty → Rewards Catalog</strong>. Each reward can be
        toggled on or off, edited, or removed.
      </p>

      <H2>Reward Types</H2>
      <p>
        PerkStack supports seven reward types. The first three are classic discount-only rewards;
        the last four — added in the Advanced Reward Types release — let you give away specific
        products, build BOGO mechanics, run gift-with-purchase campaigns, and curate a gift catalog
        the customer chooses from.
      </p>

      <table>
        <thead>
          <tr>
            <th>Type</th>
            <th>Code</th>
            <th>Description</th>
            <th>Plan</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <strong>Fixed amount off</strong>
            </td>
            <td>
              <code>fixed_amount</code>
            </td>
            <td>A flat dollar discount off the order total</td>
            <td>Essential+</td>
          </tr>
          <tr>
            <td>
              <strong>Percentage off</strong>
            </td>
            <td>
              <code>percentage_off</code>
            </td>
            <td>A percentage discount off the order total</td>
            <td>Free</td>
          </tr>
          <tr>
            <td>
              <strong>Free shipping</strong>
            </td>
            <td>
              <code>free_shipping</code>
            </td>
            <td>Waives all shipping charges on the order</td>
            <td>Essential+</td>
          </tr>
          <tr>
            <td>
              <strong>Free product</strong>
            </td>
            <td>
              <code>free_product</code>
            </td>
            <td>One specific product or variant given for free at checkout</td>
            <td>Essential+</td>
          </tr>
          <tr>
            <td>
              <strong>Spend $X, get a free product</strong>
            </td>
            <td>
              <code>spend_get_product</code>
            </td>
            <td>
              Gift unlocks once the cart subtotal hits a configurable threshold. Classic
              gift-with-purchase mechanic that lifts AOV.
            </td>
            <td>Growth+</td>
          </tr>
          <tr>
            <td>
              <strong>Buy X, get Y</strong>
            </td>
            <td>
              <code>bogo</code>
            </td>
            <td>
              Customer buys N units of one product set, gets M units of another at a configurable
              percent off (1-100%). Picks &quot;buy 2 get 1 free&quot;, &quot;buy 1 get 1 50%
              off&quot;, etc.
            </td>
            <td>Growth+</td>
          </tr>
          <tr>
            <td>
              <strong>Choose your gift</strong>
            </td>
            <td>
              <code>free_gift_catalog</code>
            </td>
            <td>
              Curate up to 20 products. The customer picks one when they redeem and the chosen item
              is added to their cart at 100% off via a Shopify Discount Function.
            </td>
            <td>Studio</td>
          </tr>
        </tbody>
      </table>

      <H2>Reward Configuration</H2>
      <p>Each reward in your catalog has the following configurable fields:</p>

      <table>
        <thead>
          <tr>
            <th>Field</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <code>title</code>
            </td>
            <td>Display name shown to customers (e.g. &quot;$5 Off Your Order&quot;)</td>
          </tr>
          <tr>
            <td>
              <code>description</code>
            </td>
            <td>Optional description with additional details about the reward</td>
          </tr>
          <tr>
            <td>
              <code>type</code>
            </td>
            <td>
              One of the seven reward types in the table above. The product-targeting types
              (<code>free_product</code>, <code>spend_get_product</code>, <code>bogo</code>,{" "}
              <code>free_gift_catalog</code>) also require a <code>config</code> object.
            </td>
          </tr>
          <tr>
            <td>
              <code>discountValue</code>
            </td>
            <td>
              The discount amount: dollar value for fixed, percentage for percentage off. Not
              applicable for free shipping or any of the product-targeting types — those use{" "}
              <code>config</code> instead.
            </td>
          </tr>
          <tr>
            <td>
              <code>config</code>
            </td>
            <td>
              JSONB blob with the type-specific configuration. For{" "}
              <code>free_product</code>: the product GID and optional variant GID. For{" "}
              <code>spend_get_product</code>: the minimum spend plus the product GID. For{" "}
              <code>bogo</code>: the buy/get product sets, quantities, and discount percent. For{" "}
              <code>free_gift_catalog</code>: the list of eligible product GIDs the customer can
              choose from. The admin form composes this for you when you pick products through the
              built-in resource picker.
            </td>
          </tr>
          <tr>
            <td>
              <code>costInPoints</code>
            </td>
            <td>How many points a customer must spend to redeem this reward</td>
          </tr>
          <tr>
            <td>
              <code>minTierId</code>
            </td>
            <td>Optional VIP tier requirement. Only customers at this tier or above can redeem</td>
          </tr>
          <tr>
            <td>
              <code>active</code>
            </td>
            <td>Whether this reward is currently available for redemption</td>
          </tr>
        </tbody>
      </table>

      <H2>Tier-Gated Rewards</H2>
      <p>
        You can restrict specific rewards to customers who have reached a minimum VIP tier. When a{" "}
        <code>minTierId</code> is set on a reward, only customers at that tier or above will see and
        be able to redeem it. This lets you create exclusive rewards for your most loyal customers.
      </p>

      <Callout type="tip">
        Tier-gated rewards are a powerful way to make VIP tiers feel meaningful. Consider offering
        higher-value rewards exclusively to your Gold tier members.
      </Callout>

      <H2>Redemption Flow — Discount-Code Rewards</H2>
      <p>
        For all reward types <em>except</em> <code>free_gift_catalog</code>, redemption produces a
        single-use discount code locked to the customer who redeemed it:
      </p>
      <ol>
        <li>
          The customer selects a reward from your catalog on the storefront and confirms redemption
        </li>
        <li>
          PerkStack deducts the required points from their balance and creates a{" "}
          <strong>redemption record</strong> with a <code>pending</code> status
        </li>
        <li>
          A <strong>discount-create job</strong> is enqueued to the background worker
        </li>
        <li>
          The worker creates a Shopify discount code via the GraphQL{" "}
          <code>discountCodeBasicCreate</code> mutation, branching the input shape on{" "}
          <code>reward.type</code> (whole-cart vs. <code>customerBuys</code>/<code>customerGets</code>{" "}
          for BOGO, spend-X-get, etc.)
        </li>
        <li>
          The storefront polls <code>/api/redemption/:id</code> until the discount code is ready
        </li>
        <li>Once the code is created, the customer receives it and can apply it at checkout</li>
      </ol>

      <H2>Redemption Flow — Choose Your Gift</H2>
      <p>
        The <code>free_gift_catalog</code> type uses a different mechanic because the customer
        picks their gift at redemption time:
      </p>
      <ol>
        <li>
          The storefront widget shows the curated product set inline in the reward card. The
          customer chooses one product.
        </li>
        <li>
          PerkStack deducts the points and writes a shop metafield (
          <code>perkstack.gift_redemptions</code>) mapping the redemption ID to the eligible
          product set + a 7-day expiry.
        </li>
        <li>
          The widget tags the cart with a <code>_perkstack_gift_redemption_id</code> attribute and
          (best-effort) adds the chosen product to the cart.
        </li>
        <li>
          A Shopify Discount Function (in <code>extensions/discount-gift-catalog</code>) reads the
          cart attribute + the metafield at checkout and applies a 100% discount to one unit of the
          cheapest eligible line.
        </li>
        <li>
          The redemption is marked <code>completed</code> immediately so the customer cannot
          accidentally redeem again, and the gift entry is automatically pruned from the metafield
          when its expiry passes (handled by the daily{" "}
          <code>discount-cleanup</code> worker).
        </li>
      </ol>

      <Callout type="info">
        Discount-code rewards are issued asynchronously via a background worker. The storefront
        automatically polls for the code, and customers typically receive it within a few seconds.
        Gift-catalog redemptions complete instantly because the Discount Function does the
        targeting at checkout time.
      </Callout>

      <H2>Boost Points Campaigns</H2>
      <p>
        Run time-boxed multiplier campaigns (for example, &quot;2x points this weekend&quot;) from
        the same page. PerkStack records the multiplier and an end timestamp; the points-award
        worker then multiplies every earn made during the window. Tier multipliers stack with the
        boost — a Gold customer (2x) earning during a 2x boost legitimately picks up 4x.
      </p>
      <p>
        While a boost is active, the storefront loyalty page renders a live countdown banner above
        the rewards grid so customers feel the urgency. Stopping the campaign early from the admin
        removes the banner immediately.
      </p>

      <H2>Stacking Policy</H2>
      <p>
        All PerkStack-issued discount codes are configured with{" "}
        <code>combinesWith: false</code> for product, order, and shipping discounts so loyalty
        rewards never silently chain with merchant-side promotions. This is the safe default;
        custom stacking rules can be exposed in a future release.
      </p>

      <H2>Redemption Limits</H2>
      <p>
        Each reward can carry three optional limits that work together to keep your campaigns
        safe and predictable. All three are available on Essential and higher.
      </p>
      <ul>
        <li>
          <strong>Total redemption limit</strong>. Caps the number of times the reward can be
          redeemed across every customer combined. Useful for limited drops or budget-capped
          campaigns. Leave empty for unlimited.
        </li>
        <li>
          <strong>Per-customer limit</strong>. Caps how many times an individual customer can
          redeem the reward inside a reset window. Choose a window of{" "}
          <strong>Lifetime</strong>, <strong>Monthly</strong>, or <strong>Yearly</strong>.
          Monthly and yearly windows honour your store&apos;s timezone, so a fresh customer
          quota starts the first second of the new local month or year.
        </li>
        <li>
          <strong>Per-tier overrides</strong> (Growth+). When VIP tiers are enabled you can
          override the per-customer cap separately for each tier. For example: Bronze 1
          redemption, Silver 2, Gold 5. Empty tier rows fall back to the per-customer cap above.
        </li>
      </ul>
      <p>
        When a reward hits its total redemption limit the storefront widget switches to a
        <strong> Sold out</strong> badge and the redeem button disables. Customers who have hit
        their personal limit see <strong>Already redeemed</strong> on the card. Rewards with
        10 or fewer redemptions left show a quiet <em>X left</em> helper under the cost.
      </p>
      <p>
        Counters are denormalised on the reward row and incremented atomically when a redemption
        completes (the customer uses the discount code on a paid order, or instantly for
        gift-catalog rewards). To reopen a sold-out reward, click <strong>Reset counter</strong>
        on the reward in the admin. The counter goes back to zero and historical redemptions
        stay in your analytics.
      </p>

      <Callout type="info">
        Lowering a reward&apos;s total limit below its current count is allowed. The admin asks
        you to confirm — the reward is immediately marked sold out. This is useful for closing a
        campaign early.
      </Callout>

      <H2>Manual Grants</H2>
      <p>
        Sometimes you want to give a specific customer a reward outside the normal catalog flow
        — a goodwill gesture after a support ticket, a launch-week thank-you, a one-off
        promotion. Granted rewards are available on Essential and higher.
      </p>
      <p>
        Open the customer&apos;s detail page, click <strong>Grant reward</strong>, pick any
        reward from your catalog, optionally override its points cost (enter <code>0</code> for
        a free grant), and add a reason. The discount code is generated the same way as a normal
        redemption, but the granted redemption{" "}
        <strong>bypasses both the total and per-customer limits</strong> and does <strong>not
        count toward the sold-out counter</strong>. The reason you enter is recorded in the
        audit log alongside which admin user granted it.
      </p>

      <Callout type="tip">
        Use manual grants for high-touch customer service. A free $20 reward sent within an hour
        of a complaint converts an unhappy customer into a fan faster than any apology email.
      </Callout>

      <H2>Shopify Flow Trigger — Reward Sold Out</H2>
      <p>
        Whenever a reward&apos;s total redemption limit is hit for the first time, PerkStack
        fires the <code>reward-sold-out</code> Shopify Flow trigger. Use it to automate
        merchant-side actions: notify your team in Slack, fire a follow-up campaign in Klaviyo,
        log to Google Sheets, or auto-create a follow-on reward.
      </p>
      <p>
        The trigger fires exactly once per limit-hit event. Resetting the counter from the admin
        re-arms it, so a relaunched campaign produces a fresh trigger when it next sells out.
        Manual grants do not fire the trigger — they are exceptions to the campaign, not
        consumers of it.
      </p>

      <H2>Managing Rewards</H2>
      <p>Each reward in the catalog supports the following operations:</p>
      <ul>
        <li>
          <strong>Toggle active/inactive</strong>: hide a reward from the storefront without
          deleting it
        </li>
        <li>
          <strong>Edit</strong>: update the title, description, discount value, point cost, or tier
          requirement
        </li>
        <li>
          <strong>Delete</strong>: permanently remove the reward. Already-issued discount codes
          remain valid
        </li>
      </ul>

      <Callout type="warning">
        Deleting a reward does not revoke discount codes that have already been issued to customers.
        Those codes remain active in Shopify until they expire or are manually deleted.
      </Callout>

      <H2>Related</H2>
      <ul>
        <li>
          <a href="/docs/loyalty/overview">Loyalty Overview</a>: how the loyalty system works
        </li>
        <li>
          <a href="/docs/loyalty/points-system">Points System</a>: how point balances and
          transactions work
        </li>
        <li>
          <a href="/docs/loyalty/vip-tiers">VIP Tiers</a>: set up tiers to gate exclusive rewards
        </li>
      </ul>
    </div>
  );
}
