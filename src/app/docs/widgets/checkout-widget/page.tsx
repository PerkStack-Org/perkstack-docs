import type { Metadata } from "next";
import Callout from "@/components/Callout";
import PlanBadge from "@/components/PlanBadge";

export const metadata: Metadata = {
  title: "Checkout Widget",
  description:
    "Let customers view their loyalty points, tier status, and redeem rewards directly in the Shopify checkout.",
};

export default function CheckoutWidgetPage() {
  return (
    <div className="docs-prose">
      <h1>Checkout Widget</h1>
      <p>
        The Checkout Widget brings your loyalty program into the Shopify checkout flow. Customers
        can see their points balance, current tier, and available rewards, then redeem a reward
        right at checkout without leaving the page. This is a{" "}
        <strong>Shopify checkout UI extension</strong>, separate from the theme app extension
        blocks.
      </p>

      <PlanBadge plan="growth" />

      <Callout type="warning">
        The Checkout Widget requires the <PlanBadge plan="growth" /> plan or higher. It is not
        available on the Free plan.
      </Callout>

      <h2>How It Works</h2>
      <p>
        The extension targets <code>purchase.checkout.block.render</code> and renders a card inside
        the Shopify checkout. It authenticates the customer using a session token, then fetches data
        from two endpoints:
      </p>
      <ul>
        <li>
          <code>/apps/perkstack/api/points</code> fetches the customer&apos;s current points balance
          and tier information
        </li>
        <li>
          <code>/api/rewards</code> returns available rewards the customer can redeem
        </li>
      </ul>
      <p>
        The extension has <code>network_access = true</code> enabled, which allows it to make API
        calls from within the checkout sandbox.
      </p>

      <h2>Placement</h2>
      <p>
        Checkout UI extensions are managed differently from theme app extension blocks. The Checkout
        Widget is automatically available once PerkStack is installed and your store is on a
        qualifying plan.
      </p>
      <ol>
        <li>
          In your Shopify admin, go to <strong>Settings &gt; Checkout</strong>.
        </li>
        <li>
          Click <strong>Customize</strong> to open the checkout editor.
        </li>
        <li>
          Click <strong>Add block</strong> and search for <strong>PerkStack Loyalty</strong>.
        </li>
        <li>
          Position the block where you want it (e.g. in the order summary sidebar or below the
          payment section).
        </li>
        <li>
          Configure the settings in the sidebar and click <strong>Save</strong>.
        </li>
      </ol>

      <Callout type="info">
        The checkout editor is separate from the theme editor. You access it through{" "}
        <strong>Settings &gt; Checkout &gt; Customize</strong>, not through Online Store &gt;
        Themes.
      </Callout>

      <h2>What the Widget Shows</h2>

      <h3>Points Balance</h3>
      <p>
        The customer&apos;s current available points balance, displayed prominently at the top of
        the widget card.
      </p>

      <h3>Current Tier</h3>
      <p>
        If VIP tiers are enabled, the widget shows the customer&apos;s current tier name and
        progress toward the next tier.
      </p>

      <h3>Available Rewards</h3>
      <p>
        A list of rewards the customer can redeem with their current balance. Each reward shows the
        name, value, and points cost. Clicking <strong>Redeem</strong> applies the corresponding
        discount code to the checkout automatically.
      </p>

      <h3>Logged-Out State</h3>
      <p>
        If the customer is not logged in at checkout, the widget displays a banner encouraging them
        to log in to view and use their loyalty points.
      </p>

      <h2>Configuration</h2>
      <table>
        <thead>
          <tr>
            <th>Setting</th>
            <th>Key</th>
            <th>Description</th>
            <th>Default</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Title</td>
            <td>
              <code>checkoutWidgetTitle</code>
            </td>
            <td>Heading displayed on the widget card</td>
            <td>&quot;Your Rewards&quot;</td>
          </tr>
          <tr>
            <td>Theme mode</td>
            <td>
              <code>themeMode</code>
            </td>
            <td>
              Appearance mode: <code>auto</code> (matches checkout), <code>light</code>, or{" "}
              <code>dark</code>
            </td>
            <td>
              <code>auto</code>
            </td>
          </tr>
          <tr>
            <td>Card style</td>
            <td>
              <code>cardStyle</code>
            </td>
            <td>
              Visual style of the widget card: <code>elevated</code> (shadow) or <code>flat</code>{" "}
              (no shadow)
            </td>
            <td>
              <code>elevated</code>
            </td>
          </tr>
          <tr>
            <td>Show tier</td>
            <td>
              <code>showTier</code>
            </td>
            <td>Display the customer&apos;s current VIP tier</td>
            <td>Enabled</td>
          </tr>
          <tr>
            <td>Show progress</td>
            <td>
              <code>showProgress</code>
            </td>
            <td>Display a progress bar toward the next tier</td>
            <td>Enabled</td>
          </tr>
          <tr>
            <td>Show rewards</td>
            <td>
              <code>showRewards</code>
            </td>
            <td>Display redeemable rewards in the widget</td>
            <td>Enabled</td>
          </tr>
        </tbody>
      </table>

      <h2>Reward Redemption Flow</h2>
      <ol>
        <li>The customer sees their available rewards listed in the widget.</li>
        <li>
          They click <strong>Redeem</strong> on the reward they want.
        </li>
        <li>
          PerkStack generates a unique discount code for the reward and applies it to the checkout.
        </li>
        <li>
          The discount appears in the checkout order summary and the points are deducted from the
          customer&apos;s balance.
        </li>
      </ol>

      <Callout type="tip">
        If the customer removes the discount code or abandons checkout, the points are automatically
        refunded to their balance.
      </Callout>

      <h2>Plan Requirement</h2>
      <p>
        The checkout extension is gated behind the <code>checkoutExtension</code> feature flag,
        which is available on the <PlanBadge plan="growth" /> plan and the <PlanBadge plan="pro" />{" "}
        plan. On the <PlanBadge plan="free" /> plan, the extension does not render in the checkout.
      </p>

      <h2>Troubleshooting</h2>
      <ul>
        <li>
          <strong>Widget not visible at checkout</strong>: confirm your store is on the{" "}
          <PlanBadge plan="growth" /> plan or higher. Also verify the block is added in the checkout
          editor (<strong>Settings &gt; Checkout &gt; Customize</strong>).
        </li>
        <li>
          <strong>Customer sees &quot;Log in&quot; banner</strong>: the customer is checking out as
          a guest. They must be logged in for the widget to show their points.
        </li>
        <li>
          <strong>Discount code not applying</strong>: ensure the reward is configured correctly in
          PerkStack admin and that the customer has enough points.
        </li>
        <li>
          <strong>Widget looks different from the rest of checkout</strong>: adjust the{" "}
          <code>themeMode</code> and <code>cardStyle</code> settings to match your checkout
          branding.
        </li>
      </ul>
    </div>
  );
}
