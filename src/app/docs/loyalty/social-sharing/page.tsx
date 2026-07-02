import type { Metadata } from "next";
import { createDocMetadata } from "@/lib/seo";
import { H2 } from "@/components/Heading";
import Callout from "@/components/Callout";
import PlanBadge from "@/components/PlanBadge";

export const metadata: Metadata = createDocMetadata("/docs/loyalty/social-sharing", {
  title: "Social Sharing",
  description:
    "Reward customers with loyalty points for sharing your products on social media, turning shoppers into brand advocates.",
});

export default function SocialSharingPage() {
  return (
    <div className="docs-prose">
      <h1>
        Social Sharing <PlanBadge plan="essential" />
      </h1>
      <p>
        Social sharing rewards customers with loyalty points for sharing your products on social
        media. Every share puts your products in front of a new audience, turning shoppers into brand
        advocates who bring you free exposure.
      </p>

      <Callout type="info">
        Social sharing is available on the <PlanBadge plan="essential" /> plan and above, and it
        ships <strong>turned on</strong>. You can adjust or turn it off from the{" "}
        <strong>Social share</strong> earn rule in{" "}
        <strong>PerkStack → Loyalty → Ways to Earn</strong>.
      </Callout>

      <H2>How it works</H2>
      <ol>
        <li>
          A customer opens the loyalty launcher while browsing one of your product pages and taps a
          share button.
        </li>
        <li>The product is shared to the platform they chose, opening its native sharing window.</li>
        <li>
          PerkStack awards the share points &mdash; <strong>100 points</strong> by default. You can
          change this amount on the Social share earn rule.
        </li>
      </ol>

      <H2>Supported platforms</H2>
      <p>Customers can share to any of these four platforms:</p>
      <ul>
        <li>Facebook</li>
        <li>X</li>
        <li>WhatsApp</li>
        <li>Pinterest</li>
      </ul>

      <H2>How often customers can earn</H2>
      <p>
        Points are awarded <strong>once per product, per platform</strong>. Sharing the same product
        on the same platform again earns nothing, but a customer can keep earning by sharing a{" "}
        <em>different</em> product or by sharing the same product on a <em>different</em> platform.
      </p>
      <Callout type="tip">
        Sharing Product A on Facebook and Product A on X counts as two separate rewards. Sharing
        Product A on Facebook twice only rewards points once. Because earning scales with your
        catalog and the four platforms, active customers can rack up meaningful points over time.
      </Callout>

      <H2>Where the share buttons appear</H2>
      <p>
        The share buttons live in the <strong>loyalty launcher</strong> &mdash; the pop-up loyalty
        widget on your storefront &mdash; and they only work from a <strong>product page</strong>. If
        a shopper opens the launcher somewhere else, such as your homepage or cart, the buttons prompt
        them to visit a product page first. The share buttons don&apos;t appear on the full loyalty
        page, the customer account page, or checkout.
      </p>
      <Callout type="warning">
        Because sharing is launcher-only and product-page-only, make sure the loyalty launcher is
        enabled across your storefront so customers can share while browsing products.
      </Callout>

      <H2>Related</H2>
      <ul>
        <li>
          <a href="/docs/loyalty/earn-rules">Ways to Earn</a>: adjust the Social share rule and its
          point amount
        </li>
        <li>
          <a href="/docs/widgets/loyalty-launcher">Loyalty Launcher</a>: the widget where the share
          buttons appear
        </li>
        <li>
          <a href="/docs/loyalty/points-system">How Points Work</a>: how social share points are
          tracked
        </li>
      </ul>
    </div>
  );
}
