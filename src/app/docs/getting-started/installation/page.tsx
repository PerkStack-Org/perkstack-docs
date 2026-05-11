import type { Metadata } from "next";
import Callout from "@/components/Callout";
import PlanBadge from "@/components/PlanBadge";

export const metadata: Metadata = {
  title: "Installation",
  description:
    "Install PerkStack from the Shopify App Store and complete the initial setup process.",
};

export default function InstallationPage() {
  return (
    <div className="docs-prose">
      <h1>Installation</h1>
      <p>
        PerkStack installs directly from the Shopify App Store. The entire process takes under two
        minutes and requires no code changes to your theme.
      </p>

      <h2>Install from the Shopify App Store</h2>
      <ol>
        <li>
          Visit the{" "}
          <a href="https://apps.shopify.com/perkstack" target="_blank" rel="noopener noreferrer">
            PerkStack listing on the Shopify App Store
          </a>
          .
        </li>
        <li>
          Click <strong>Install</strong> and select the store you want to add PerkStack to.
        </li>
        <li>
          Shopify will present the permissions screen. Review the requested scopes and click{" "}
          <strong>Install app</strong>.
        </li>
        <li>
          You&apos;ll be redirected into your Shopify admin with PerkStack&apos;s onboarding wizard
          ready to go.
        </li>
      </ol>

      <h2>Required Permissions</h2>
      <p>
        During installation, Shopify asks you to approve the following access scopes. PerkStack uses
        the minimum permissions necessary for its features:
      </p>

      <table>
        <thead>
          <tr>
            <th>Scope</th>
            <th>Why It&apos;s Needed</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <code>read_products</code>
            </td>
            <td>Display product info on review forms and loyalty widgets</td>
          </tr>
          <tr>
            <td>
              <code>read_orders</code>
            </td>
            <td>Calculate purchase points and trigger review requests after fulfillment</td>
          </tr>
          <tr>
            <td>
              <code>read_customers</code>
            </td>
            <td>Identify customers for points balances, reviews, and referrals</td>
          </tr>
          <tr>
            <td>
              <code>write_discounts</code>
            </td>
            <td>Create single-use discount codes when customers redeem rewards</td>
          </tr>
          <tr>
            <td>
              <code>read_themes</code>
            </td>
            <td>Check theme compatibility and app block activation status</td>
          </tr>
        </tbody>
      </table>

      <Callout type="info">
        PerkStack only requests <strong>read</strong> access for products, orders, customers, and
        themes. The only write scope is <code>write_discounts</code>, which is used exclusively to
        generate reward discount codes on behalf of your customers.
      </Callout>

      <h2>What Happens Behind the Scenes</h2>
      <p>
        When you approve the installation, PerkStack performs the following steps automatically:
      </p>
      <ol>
        <li>
          <strong>OAuth handshake</strong>: Shopify issues an access token that PerkStack stores
          securely in the database (encrypted at rest).
        </li>
        <li>
          <strong>Session creation</strong>: an authenticated session is established so the app can
          make Shopify Admin API calls on your behalf.
        </li>
        <li>
          <strong>Shop record initialisation</strong>: PerkStack creates a record for your store
          with sensible defaults for all loyalty, review, and branding settings.
        </li>
        <li>
          <strong>Webhook registration</strong>: webhooks for orders, customers, app events, and
          GDPR compliance are registered automatically.
        </li>
        <li>
          <strong>Default earn rules &amp; rewards</strong>: a starter set of point-earning rules
          and a default reward are created so you can launch immediately (see{" "}
          <a href="/docs/getting-started/first-time-config">First-Time Configuration</a>).
        </li>
      </ol>

      <Callout type="tip">
        No manual configuration is required after installation. PerkStack ships with working
        defaults so you can launch a loyalty program with zero changes if you want.
      </Callout>

      <h2>Choosing a Plan</h2>
      <p>
        After installation, PerkStack starts on the <PlanBadge plan="free" /> plan. You can upgrade
        at any time from the <strong>Settings → Plan</strong> page inside the app.
      </p>

      <table>
        <thead>
          <tr>
            <th>Plan</th>
            <th>Price</th>
            <th>Trial</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <PlanBadge plan="free" />
            </td>
            <td>$0 / month</td>
            <td>-</td>
          </tr>
          <tr>
            <td>
              <PlanBadge plan="essential" />
            </td>
            <td>$29 / month</td>
            <td>14-day free trial</td>
          </tr>
          <tr>
            <td>
              <PlanBadge plan="growth" />
            </td>
            <td>$99 / month</td>
            <td>21-day free trial</td>
          </tr>
          <tr>
            <td>
              <PlanBadge plan="studio" />
            </td>
            <td>$299 / month</td>
            <td>30-day free trial</td>
          </tr>
        </tbody>
      </table>

      <p>
        Every paid plan includes a free trial — 14 days on <PlanBadge plan="essential" />, 21 days
        on <PlanBadge plan="growth" />, and 30 days on <PlanBadge plan="studio" />. You won&apos;t
        be charged until the trial ends, and you can cancel any time before then.
      </p>

      <h2>Self-Hosting (Advanced)</h2>
      <p>
        If you&apos;re a developer running PerkStack from source, you&apos;ll need to configure the
        following environment variables before starting the app:
      </p>

      <table>
        <thead>
          <tr>
            <th>Variable</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <code>DATABASE_URL</code>
            </td>
            <td>PostgreSQL connection string</td>
          </tr>
          <tr>
            <td>
              <code>REDIS_URL</code>
            </td>
            <td>Redis connection string for BullMQ job queue</td>
          </tr>
          <tr>
            <td>
              <code>SHOPIFY_API_KEY</code>
            </td>
            <td>Your Shopify app&apos;s API key (from Partners dashboard)</td>
          </tr>
          <tr>
            <td>
              <code>SHOPIFY_API_SECRET</code>
            </td>
            <td>Your Shopify app&apos;s API secret</td>
          </tr>
          <tr>
            <td>
              <code>R2_ACCOUNT_ID</code>
            </td>
            <td>Cloudflare account ID for R2 storage</td>
          </tr>
          <tr>
            <td>
              <code>R2_ACCESS_KEY_ID</code>
            </td>
            <td>R2 access key</td>
          </tr>
          <tr>
            <td>
              <code>R2_SECRET_ACCESS_KEY</code>
            </td>
            <td>R2 secret key</td>
          </tr>
          <tr>
            <td>
              <code>R2_BUCKET_NAME</code>
            </td>
            <td>R2 bucket name for media uploads</td>
          </tr>
          <tr>
            <td>
              <code>RESEND_API_KEY</code>
            </td>
            <td>API key for transactional emails via Resend</td>
          </tr>
          <tr>
            <td>
              <code>TOKEN_ENCRYPTION_KEY</code>
            </td>
            <td>256-bit key used to encrypt Shopify access tokens at rest</td>
          </tr>
        </tbody>
      </table>

      <Callout type="danger">
        Never commit your <code>.env</code> file or share your <code>TOKEN_ENCRYPTION_KEY</code>{" "}
        publicly. If the encryption key is compromised, rotate it immediately and re-encrypt all
        stored access tokens.
      </Callout>

      <pre>
        <code>{`# .env example
DATABASE_URL=postgresql://user:password@localhost:5432/perkstack
REDIS_URL=redis://localhost:6379
SHOPIFY_API_KEY=your_api_key
SHOPIFY_API_SECRET=your_api_secret
R2_ACCOUNT_ID=your_account_id
R2_ACCESS_KEY_ID=your_access_key
R2_SECRET_ACCESS_KEY=your_secret_key
R2_BUCKET_NAME=perkstack-media
RESEND_API_KEY=re_xxxxxxxxxx
TOKEN_ENCRYPTION_KEY=your_256_bit_key`}</code>
      </pre>

      <h2>Verifying the Installation</h2>
      <p>After installing, confirm everything is working:</p>
      <ol>
        <li>
          Open PerkStack from your Shopify admin sidebar. You should see the onboarding wizard.
        </li>
        <li>
          Navigate to <strong>Settings → Notifications</strong> in your Shopify admin and confirm
          PerkStack&apos;s webhooks are listed.
        </li>
        <li>
          Go to <strong>Online Store → Themes → Customize</strong> and verify the PerkStack app
          blocks are available in the block picker.
        </li>
      </ol>

      <Callout type="warning">
        If PerkStack doesn&apos;t appear in your theme editor&apos;s block list, make sure
        you&apos;re using an Online Store 2.0 compatible theme. Legacy themes do not support app
        blocks.
      </Callout>

      <h2>Next Steps</h2>
      <ul>
        <li>
          <a href="/docs/getting-started/shopify-setup">Shopify Setup</a>: enable app blocks and
          configure your app proxy
        </li>
        <li>
          <a href="/docs/getting-started/first-time-config">First-Time Configuration</a>: walk
          through the onboarding wizard
        </li>
      </ul>
    </div>
  );
}
