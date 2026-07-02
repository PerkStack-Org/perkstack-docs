import type { Metadata } from "next";
import { createDocMetadata } from "@/lib/seo";
import { H2 } from "@/components/Heading";
import Callout from "@/components/Callout";

export const metadata: Metadata = createDocMetadata("/docs/getting-started/installation", {
  title: "Installing PerkStack",
  description:
    "Install PerkStack: Loyalty & Reviews from the Shopify App Store in a couple of minutes — no separate account, and a short setup wizard opens automatically.",
});

export default function InstallationPage() {
  return (
    <div className="docs-prose">
      <h1>Installing PerkStack</h1>
      <p>
        PerkStack installs straight from the Shopify App Store. There is no separate account to
        create and no code to touch — once you approve the install, the app is ready and opens right
        inside your Shopify admin.
      </p>

      <H2>Install from the Shopify App Store</H2>
      <ol>
        <li>
          Open the{" "}
          <a href="https://apps.shopify.com/perkstack" target="_blank" rel="noopener noreferrer">
            PerkStack: Loyalty &amp; Reviews listing
          </a>{" "}
          on the Shopify App Store.
        </li>
        <li>
          Click <strong>Install</strong> and choose the store you want to add it to.
        </li>
        <li>
          Review the access Shopify asks for (explained below) and click <strong>Install</strong>.
        </li>
        <li>PerkStack opens in your admin with the setup wizard ready to go.</li>
      </ol>

      <H2>What PerkStack asks permission for</H2>
      <p>
        During install, Shopify shows you the access PerkStack needs. Each request maps to a specific
        feature — here is what each one is for, in plain terms:
      </p>
      <table>
        <thead>
          <tr>
            <th>Access</th>
            <th>Why PerkStack needs it</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Your products</td>
            <td>Show the right product on review forms and reward pages</td>
          </tr>
          <tr>
            <td>Your orders</td>
            <td>Award points for purchases and know when to send a review request</td>
          </tr>
          <tr>
            <td>Your customers</td>
            <td>Track each shopper&apos;s points, reviews, and referrals</td>
          </tr>
          <tr>
            <td>Discounts</td>
            <td>Create the discount codes customers get when they redeem a reward</td>
          </tr>
          <tr>
            <td>Your themes</td>
            <td>Detect which PerkStack blocks you have added to your storefront</td>
          </tr>
        </tbody>
      </table>

      <Callout type="info">
        The only thing PerkStack creates in your store is reward discount codes. It reads your
        products, orders, customers, and theme so the program can work — it does not change them.
      </Callout>

      <H2>Install means ready</H2>
      <p>
        There is no extra sign-up step. As soon as you approve the install, PerkStack sets up your
        store with working defaults for loyalty, reviews, and branding, so you could launch with no
        changes at all. Billing is entirely separate — you start on the free plan and nothing is
        charged until you choose to upgrade.
      </p>

      <H2>What to expect on first open</H2>
      <p>
        The first time you open PerkStack, a short <strong>setup wizard</strong> greets you. It walks
        you through choosing your points rate and branding in about two minutes, and every choice can
        be changed later. You can also skip it and explore the app with the defaults in place.
      </p>

      <Callout type="tip">
        For the best results, use an Online Store 2.0 theme (all current Shopify themes qualify). It
        lets you add PerkStack&apos;s storefront blocks from the theme editor with no code.
      </Callout>

      <H2>Related</H2>
      <ul>
        <li>
          <a href="/docs/getting-started/first-time-config">First-Time Setup</a>: walk through the
          setup wizard step by step
        </li>
        <li>
          <a href="/docs/getting-started/shopify-setup">Connecting Your Store</a>: your first look
          inside the app
        </li>
        <li>
          <a href="/docs/getting-started/going-live">Going Live on Your Store</a>: turn PerkStack on
          in your storefront
        </li>
      </ul>
    </div>
  );
}
