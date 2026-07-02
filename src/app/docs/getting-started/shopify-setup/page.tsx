import type { Metadata } from "next";
import { createDocMetadata } from "@/lib/seo";
import { H2 } from "@/components/Heading";
import Callout from "@/components/Callout";

export const metadata: Metadata = createDocMetadata("/docs/getting-started/shopify-setup", {
  title: "Connecting Your Store",
  description:
    "Your first look inside PerkStack: how the app sits in your Shopify admin, the left-nav map, and what to have ready before you set up your program.",
});

export default function ShopifySetupPage() {
  return (
    <div className="docs-prose">
      <h1>Connecting Your Store</h1>
      <p>
        PerkStack runs entirely inside your Shopify admin — there is nothing to connect by hand and
        no separate dashboard to log into. This page shows you around the app so you know where
        everything lives before you start setting up your program.
      </p>

      <H2>Your first look inside the app</H2>
      <p>
        Open PerkStack from the <strong>Apps</strong> section of your Shopify admin. The first time
        you do, the setup wizard appears automatically; once you have finished (or skipped) it, you
        land on the <strong>Dashboard</strong> — your home base for a quick read on how the program
        is doing and a checklist for adding PerkStack to your storefront.
      </p>

      <Callout type="info">
        Until you complete the setup wizard, only the home screen is shown. The full navigation menu
        appears once the wizard is done — see <a href="/docs/getting-started/first-time-config">
        First-Time Setup</a>.
      </Callout>

      <H2>The navigation map</H2>
      <p>
        After setup, a menu on the left gives you everything PerkStack does. Here is what each area
        is for:
      </p>
      <table>
        <thead>
          <tr>
            <th>Menu item</th>
            <th>What you do there</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <strong>PerkStack</strong> (home)
            </td>
            <td>The Dashboard: key numbers and your Theme Setup checklist</td>
          </tr>
          <tr>
            <td>
              <strong>Analytics</strong>
            </td>
            <td>Deeper reporting on points, rewards, reviews, and referrals</td>
          </tr>
          <tr>
            <td>
              <strong>Loyalty</strong>
            </td>
            <td>Your points program: ways to earn, rewards, VIP tiers, referrals, campaigns</td>
          </tr>
          <tr>
            <td>
              <strong>Reviews</strong>
            </td>
            <td>Collect, moderate, reply to, and feature customer reviews</td>
          </tr>
          <tr>
            <td>
              <strong>Customers</strong>
            </td>
            <td>Search customers and manage each one&apos;s points, tier, and status</td>
          </tr>
          <tr>
            <td>
              <strong>Integrations</strong>
            </td>
            <td>Connect PerkStack to other tools you use</td>
          </tr>
          <tr>
            <td>
              <strong>Shopify Flow</strong>
            </td>
            <td>Automate actions using PerkStack triggers in Shopify Flow</td>
          </tr>
          <tr>
            <td>
              <strong>Settings</strong>
            </td>
            <td>Points rules, branding, email, plan and billing, and more</td>
          </tr>
        </tbody>
      </table>

      <Callout type="tip">
        The navigation only appears after you finish the setup wizard. If you only see the home
        screen, complete the wizard first and the rest of the menu unlocks.
      </Callout>

      <H2>What to have ready</H2>
      <p>Setup goes faster if you have a few things on hand:</p>
      <ul>
        <li>
          <strong>Your brand accent color</strong> (a hex code) so the storefront launcher matches
          your store.
        </li>
        <li>
          <strong>An optional header image</strong> for the top of the launcher panel — a hosted
          image URL works well.
        </li>
        <li>
          <strong>A rough idea of your points rate</strong> — how generous you want to be, for
          example points worth roughly 5% back on each order.
        </li>
        <li>
          <strong>Access to your theme editor</strong>, since that is where you turn on PerkStack&apos;s
          storefront blocks after setup.
        </li>
      </ul>

      <H2>Related</H2>
      <ul>
        <li>
          <a href="/docs/getting-started/first-time-config">First-Time Setup</a>: the setup wizard,
          step by step
        </li>
        <li>
          <a href="/docs/getting-started/going-live">Going Live on Your Store</a>: add PerkStack to
          your storefront
        </li>
        <li>
          <a href="/docs/dashboard/overview">Dashboard Overview</a>: what the home screen shows you
        </li>
      </ul>
    </div>
  );
}
