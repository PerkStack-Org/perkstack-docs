import type { Metadata } from "next";
import { createDocMetadata } from "@/lib/seo";
import { H2 } from "@/components/Heading";
import Callout from "@/components/Callout";

export const metadata: Metadata = createDocMetadata("/docs/loyalty/social-sharing", {
  title: "Social Sharing",
  description:
    "Reward customers with loyalty points for sharing your products on social media, including platforms, limits, and how sharing is tracked.",
});

export default function SocialSharingPage() {
  return (
    <div className="docs-prose">
      <h1>Social Sharing</h1>
      <p>
        Social sharing rewards customers with loyalty points for sharing your products on social
        media. This extends your store&apos;s reach organically by turning every customer into a
        potential brand ambassador.
      </p>

      <H2>How It Works</H2>
      <ol>
        <li>A customer clicks a social share button on a product page in your storefront</li>
        <li>
          The storefront sends a <code>POST</code> request to <code>/api/social-share</code> with
          the <code>platform</code> and <code>productId</code>
        </li>
        <li>
          PerkStack records the share in the <code>social_shares</code> table and awards points if
          the <strong>social_share</strong> earn rule is active
        </li>
      </ol>

      <H2>Configuration</H2>

      <table>
        <thead>
          <tr>
            <th>Setting</th>
            <th>Default</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Points per share</td>
            <td>100</td>
            <td>Number of points awarded for each qualifying social share</td>
          </tr>
          <tr>
            <td>Rule status</td>
            <td>Active</td>
            <td>Toggle the social_share earn rule on or off from Earn Rules</td>
          </tr>
        </tbody>
      </table>

      <H2>One Share Per Product Per Platform</H2>
      <p>
        PerkStack enforces a <strong>unique constraint</strong> on each combination of customer,
        product, and platform. This means a customer can earn points for sharing a product on each
        supported platform once, but cannot earn points for sharing the same product on the same
        platform multiple times.
      </p>

      <Callout type="info">
        A customer can earn points for sharing Product A on Facebook <em>and</em> on Twitter - these
        are two separate shares. But sharing Product A on Facebook twice only awards points once.
      </Callout>

      <H2>Share Tracking</H2>
      <p>
        All social shares are recorded in the <code>social_shares</code> table with the following
        data:
      </p>

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
              <code>customerId</code>
            </td>
            <td>The customer who performed the share</td>
          </tr>
          <tr>
            <td>
              <code>productId</code>
            </td>
            <td>The Shopify product that was shared</td>
          </tr>
          <tr>
            <td>
              <code>platform</code>
            </td>
            <td>The social media platform the product was shared to</td>
          </tr>
        </tbody>
      </table>

      <H2>API Endpoint</H2>
      <p>Social shares are submitted via the storefront API:</p>

      <table>
        <thead>
          <tr>
            <th>Property</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Method</td>
            <td>
              <code>POST</code>
            </td>
          </tr>
          <tr>
            <td>Endpoint</td>
            <td>
              <code>/api/social-share</code>
            </td>
          </tr>
          <tr>
            <td>Required fields</td>
            <td>
              <code>platform</code> (string) and <code>productId</code> (string)
            </td>
          </tr>
          <tr>
            <td>Authentication</td>
            <td>Requires authenticated customer session</td>
          </tr>
        </tbody>
      </table>

      <Callout type="tip">
        The share buttons on your storefront should open the platform&apos;s native sharing dialog
        and then call the <code>/api/social-share</code> endpoint to record the share and award
        points. This ensures points are only awarded when the customer actually initiates a share.
      </Callout>

      <H2>Related</H2>
      <ul>
        <li>
          <a href="/docs/loyalty/earn-rules">Earn Rules</a>: manage the social share earn rule
        </li>
        <li>
          <a href="/docs/loyalty/points-system">Points System</a>: how social share points are
          recorded
        </li>
        <li>
          <a href="/docs/loyalty/overview">Loyalty Overview</a>: how the loyalty system works
        </li>
      </ul>
    </div>
  );
}
