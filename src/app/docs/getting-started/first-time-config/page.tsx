import type { Metadata } from "next";
import { createDocMetadata } from "@/lib/seo";
import { H2, H3 } from "@/components/Heading";
import Callout from "@/components/Callout";
import PlanBadge from "@/components/PlanBadge";

export const metadata: Metadata = createDocMetadata("/docs/getting-started/first-time-config", {
  title: "First-Time Configuration",
  description:
    "Walk through PerkStack's onboarding wizard and understand the default settings for loyalty and reviews.",
});

export default function FirstTimeConfigPage() {
  return (
    <div className="docs-prose">
      <h1>First-Time Configuration</h1>
      <p>
        After installation, PerkStack opens an onboarding wizard that walks you through the
        essential settings. The wizard has four steps and takes about two minutes to complete. You
        can always change these settings later from the app&apos;s settings pages.
      </p>

      <H2>Onboarding Wizard</H2>

      <H3>Step 1: Welcome</H3>
      <p>
        The first screen introduces PerkStack and gives you a quick overview of what the app does.
        No configuration is needed here; just click <strong>Get Started</strong> to continue.
      </p>

      <H3>Step 2: Points Configuration</H3>
      <p>
        This step lets you configure how customers earn points. The main setting is the{" "}
        <strong>points-per-dollar</strong> rate for purchases:
      </p>
      <ul>
        <li>
          <strong>Default:</strong> 1 point per $1 spent.
        </li>
        <li>You can adjust this to any value (e.g., 2 points per $1, or 1 point per $2).</li>
        <li>Points are calculated based on the order subtotal (before taxes and shipping).</li>
      </ul>

      <Callout type="tip">
        A 1:1 ratio (1 point per $1) is the simplest for customers to understand. If you want points
        to feel more generous, use a higher multiplier (e.g., 5 points per $1) and adjust reward
        costs accordingly.
      </Callout>

      <H3>Step 3: Branding</H3>
      <p>Customize the look and feel of your loyalty widgets on the storefront:</p>
      <ul>
        <li>
          <strong>Launcher image</strong>: the icon displayed on the floating loyalty launcher
          button. Upload your own or use the default.
        </li>
        <li>
          <strong>Overlay style</strong>: controls how the loyalty panel appears when opened
          (slide-in panel or modal overlay).
        </li>
        <li>
          <strong>Accent colour</strong>: the primary colour used across all PerkStack widgets.
          Defaults to your theme&apos;s accent if not set.
        </li>
      </ul>

      <H3>Step 4: Launch</H3>
      <p>
        The final step confirms your configuration and activates PerkStack on your store. Once you
        click <strong>Launch</strong>, the loyalty program and review system are live on your
        storefront (provided you&apos;ve enabled the theme app extension; see{" "}
        <a href="/docs/getting-started/shopify-setup">Shopify Setup</a>).
      </p>

      <Callout type="info">
        You can skip the onboarding wizard and configure everything manually later. However,
        completing it ensures your storefront widgets are properly branded and your earn rules are
        active from day one.
      </Callout>

      <H2>Default Earn Rules</H2>
      <p>
        PerkStack creates the following earn rules automatically during installation. Active rules
        start working immediately; inactive rules are pre-configured but disabled until you turn
        them on.
      </p>

      <table>
        <thead>
          <tr>
            <th>Action</th>
            <th>Points Awarded</th>
            <th>Status</th>
            <th>Notes</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Purchase</td>
            <td>1 point per $1 spent</td>
            <td>Active</td>
            <td>Based on order subtotal</td>
          </tr>
          <tr>
            <td>Account signup</td>
            <td>100 points</td>
            <td>Active</td>
            <td>One-time bonus for creating an account</td>
          </tr>
          <tr>
            <td>Text review</td>
            <td>100 points</td>
            <td>Active</td>
            <td>Awarded when a text-only review is approved</td>
          </tr>
          <tr>
            <td>Photo review</td>
            <td>200 points</td>
            <td>Active</td>
            <td>Awarded when a review with photos is approved</td>
          </tr>
          <tr>
            <td>Birthday</td>
            <td>200 points</td>
            <td>Inactive</td>
            <td>Requires birthday collection to be enabled</td>
          </tr>
          <tr>
            <td>Social share</td>
            <td>100 points</td>
            <td>Active</td>
            <td>Awarded when a customer shares a product via the share widget</td>
          </tr>
          <tr>
            <td>Referral (referrer)</td>
            <td>500 points</td>
            <td>Inactive</td>
            <td>
              Awarded to the person who sends the referral <PlanBadge plan="growth" />
            </td>
          </tr>
          <tr>
            <td>Referral (referee)</td>
            <td>200 points</td>
            <td>Inactive</td>
            <td>
              Awarded to the referred friend who makes a purchase <PlanBadge plan="growth" />
            </td>
          </tr>
        </tbody>
      </table>

      <Callout type="info">
        The Birthday and Referral earn rules are created but <strong>inactive</strong> by default.
        Enable them from <strong>Loyalty → Earn Rules</strong> when you&apos;re ready. Referrals
        require the <PlanBadge plan="growth" /> plan or higher.
      </Callout>

      <H2>Default Reward</H2>
      <p>PerkStack creates one starter reward during installation:</p>

      <table>
        <thead>
          <tr>
            <th>Reward</th>
            <th>Discount</th>
            <th>Cost</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>$5 Off</td>
            <td>$5 fixed discount on any order</td>
            <td>100 points</td>
          </tr>
        </tbody>
      </table>

      <p>
        This gives customers a clear goal right away: earn 100 points, get $5 off. You can add more
        rewards, adjust the cost, or create percentage-based discounts and free-shipping rewards
        from the <strong>Loyalty → Rewards</strong> page.
      </p>

      <Callout type="tip">
        A good starting setup is to have 3–4 rewards at different point levels (e.g., $5 at 100 pts,
        $10 at 200 pts, $25 at 500 pts). This gives customers multiple milestones to work toward.
      </Callout>

      <H2>Default Review Settings</H2>
      <p>PerkStack&apos;s review system is pre-configured with sensible defaults:</p>

      <table>
        <thead>
          <tr>
            <th>Setting</th>
            <th>Default Value</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Auto-approve threshold</td>
            <td>4 stars</td>
            <td>
              Reviews with 4 or 5 stars are published automatically. Reviews with 1–3 stars go to
              the moderation queue.
            </td>
          </tr>
          <tr>
            <td>Review request delay</td>
            <td>7 days</td>
            <td>
              How long to wait after an order is fulfilled before sending a review request email.
            </td>
          </tr>
          <tr>
            <td>Reminder email</td>
            <td>Enabled, 3-day delay</td>
            <td>
              If the customer hasn&apos;t submitted a review after the initial request, a reminder
              is sent 3 days later.
            </td>
          </tr>
        </tbody>
      </table>

      <Callout type="warning">
        Setting the auto-approve threshold to 1 star means <strong>all</strong> reviews will be
        published without moderation. If you want to review every submission before it goes live,
        set the threshold to 6 (effectively disabling auto-approve since the maximum rating is 5
        stars).
      </Callout>

      <H2>Recommended First Steps After Onboarding</H2>
      <p>
        Once you&apos;ve completed the wizard, here are the recommended next steps to get the most
        out of PerkStack:
      </p>

      <ol>
        <li>
          <strong>Enable the theme app extension</strong>: go to{" "}
          <strong>Online Store → Themes → Customize</strong> and toggle PerkStack on under App
          Embeds. Then add review blocks to your product pages (see{" "}
          <a href="/docs/getting-started/shopify-setup">Shopify Setup</a>).
        </li>
        <li>
          <strong>Add review blocks to product pages</strong>: in the theme editor, navigate to a
          product page template and add the <strong>Reviews List</strong>,{" "}
          <strong>Review Form</strong>, and <strong>Star Rating</strong> blocks.
        </li>
        <li>
          <strong>Create additional rewards</strong>: go to <strong>Loyalty → Rewards</strong> and
          add 2–3 more reward tiers to give customers more goals.
        </li>
        <li>
          <strong>Customise earn rule values</strong>: review the default point values under{" "}
          <strong>Loyalty → Earn Rules</strong> and adjust them to match your store&apos;s
          economics.
        </li>
        <li>
          <strong>Review your email templates</strong>: check the review request and points
          notification email templates under <strong>Settings → Emails</strong> to make sure the
          copy matches your brand voice.
        </li>
        <li>
          <strong>Consider enabling referrals</strong> <PlanBadge plan="growth" />: if you&apos;re
          on the Growth plan or higher, activate the referral earn rules to let customers invite
          friends for bonus points.
        </li>
      </ol>

      <H2>Resetting to Defaults</H2>
      <p>
        If you&apos;ve changed settings and want to start over, you can reset individual sections
        from their respective settings pages. There is no global &quot;reset all&quot; button. Each
        section (earn rules, rewards, review settings, branding) has its own reset option.
      </p>

      <Callout type="info">
        Resetting earn rules or rewards does not affect points that have already been awarded to
        customers. Only future point calculations will use the new configuration.
      </Callout>

      <H2>Summary of Defaults</H2>
      <p>Here&apos;s a quick reference of everything PerkStack creates during installation:</p>
      <ul>
        <li>
          <strong>7 earn rules</strong>: Purchase (1 pt/$1), Signup (100 pts), Text review (100
          pts), Photo review (200 pts), Birthday (200 pts, inactive), Social share (100 pts),
          Referral (500/200 pts, inactive)
        </li>
        <li>
          <strong>1 reward</strong>: $5 Off (100 points)
        </li>
        <li>
          <strong>Auto-approve threshold</strong>: 4 stars
        </li>
        <li>
          <strong>Review request delay</strong>: 7 days after fulfilment
        </li>
        <li>
          <strong>Reminder email</strong>: 3 days after initial request
        </li>
      </ul>
    </div>
  );
}
