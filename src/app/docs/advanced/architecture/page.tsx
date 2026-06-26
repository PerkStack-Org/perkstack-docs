import type { Metadata } from "next";
import { createDocMetadata } from "@/lib/seo";
import { H2, H3 } from "@/components/Heading";
import Callout from "@/components/Callout";

export const metadata: Metadata = createDocMetadata("/docs/advanced/architecture", {
  title: "Architecture",
  description:
    "Understand PerkStack's monorepo structure, technology stack, infrastructure, and how the packages and extensions fit together.",
});

export default function ArchitecturePage() {
  return (
    <div className="docs-prose">
      <h1>Architecture</h1>
      <p>
        PerkStack is built as a monorepo managed with <strong>pnpm workspaces</strong> and{" "}
        <strong>Turborepo</strong>. The codebase is split into three packages plus a set of Shopify
        extensions, all deployed as Docker containers to Railway.
      </p>

      <H2>Monorepo Structure</H2>
      <table>
        <thead>
          <tr>
            <th>Path</th>
            <th>Package</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <code>packages/web</code>
            </td>
            <td>Web App</td>
            <td>
              Remix (Vite) application embedded in Shopify admin via App Bridge. Serves the
              merchant-facing UI and API routes.
            </td>
          </tr>
          <tr>
            <td>
              <code>packages/shared</code>
            </td>
            <td>Shared Library</td>
            <td>
              Drizzle ORM schema and queries, PostgreSQL connection, BullMQ queue definitions,
              GraphQL client, and crypto utilities.
            </td>
          </tr>
          <tr>
            <td>
              <code>packages/worker</code>
            </td>
            <td>Background Worker</td>
            <td>
              BullMQ job processors for emails (via Resend), image processing (via Sharp), points
              calculations, and webhook handling.
            </td>
          </tr>
          <tr>
            <td>
              <code>extensions/</code>
            </td>
            <td>Shopify Extensions</td>
            <td>
              Seven Shopify extensions: theme app extension, checkout UI, admin blocks (×2),
              customer account, app pixel, and Flow trigger.
            </td>
          </tr>
        </tbody>
      </table>

      <H2>Technology Stack</H2>

      <H3>Web Application</H3>
      <ul>
        <li>
          <strong>Remix</strong> (with Vite): server-rendered React framework for the admin UI
        </li>
        <li>
          <strong>Shopify Polaris</strong>: design system for consistent admin-style UI
        </li>
        <li>
          <strong>Shopify App Bridge</strong>: embeds the app inside the Shopify admin
        </li>
      </ul>

      <H3>Database</H3>
      <ul>
        <li>
          <strong>PostgreSQL</strong>: primary relational database
        </li>
        <li>
          <strong>Drizzle ORM</strong>: type-safe ORM for schema definition, migrations, and queries
        </li>
      </ul>

      <H3>Job Queue</H3>
      <ul>
        <li>
          <strong>BullMQ</strong>: Redis-backed job queue for reliable background processing
        </li>
        <li>
          <strong>Redis</strong>: queue backend and caching layer
        </li>
      </ul>

      <H3>Storage</H3>
      <ul>
        <li>
          <strong>Cloudflare R2</strong>: S3-compatible object storage for review photos, custom
          icons, and uploaded images
        </li>
      </ul>

      <H3>Email</H3>
      <ul>
        <li>
          <strong>Resend</strong>: transactional email delivery for review requests, notifications,
          and referral invites
        </li>
      </ul>

      <H3>Image Processing</H3>
      <ul>
        <li>
          <strong>Sharp</strong>: server-side image resizing, format conversion, and thumbnail
          generation
        </li>
      </ul>

      <H2>Infrastructure</H2>
      <table>
        <thead>
          <tr>
            <th>Component</th>
            <th>Deployment</th>
            <th>Dockerfile</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Web App</td>
            <td>Railway (Docker)</td>
            <td>
              <code>Dockerfile.web</code>
            </td>
          </tr>
          <tr>
            <td>Worker</td>
            <td>Railway (Docker)</td>
            <td>
              <code>Dockerfile.worker</code>
            </td>
          </tr>
          <tr>
            <td>PostgreSQL</td>
            <td>Railway (managed)</td>
            <td>-</td>
          </tr>
          <tr>
            <td>Redis</td>
            <td>Railway (managed)</td>
            <td>-</td>
          </tr>
          <tr>
            <td>Object Storage</td>
            <td>Cloudflare R2</td>
            <td>-</td>
          </tr>
        </tbody>
      </table>

      <Callout type="info">
        Both the web app and worker are built as separate Docker images from the same monorepo.
        Turborepo handles build caching and dependency ordering.
      </Callout>

      <H2>Data Flow</H2>
      <ol>
        <li>
          <strong>Shopify → Web App</strong>: Shopify sends webhook events (orders, customers, etc.)
          to the web app&apos;s API routes
        </li>
        <li>
          <strong>Web App → Queue</strong>: the web app enqueues background jobs for processing
          (points calculations, emails, image processing)
        </li>
        <li>
          <strong>Queue → Worker</strong>: BullMQ processors in the worker package pick up jobs and
          execute them
        </li>
        <li>
          <strong>Worker → External Services</strong>: the worker sends emails via Resend, uploads
          images to R2, and updates the database
        </li>
        <li>
          <strong>Extensions → Web App</strong>: storefront and admin extensions communicate with
          the web app via the app proxy and authenticated API routes
        </li>
      </ol>

      <H2>Shopify Extensions</H2>
      <p>PerkStack includes seven Shopify extensions:</p>
      <table>
        <thead>
          <tr>
            <th>Extension</th>
            <th>Type</th>
            <th>Purpose</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Theme App Extension</td>
            <td>
              <code>theme_app_extension</code>
            </td>
            <td>8 storefront blocks (launcher, rewards page, reviews, star ratings, etc.)</td>
          </tr>
          <tr>
            <td>Checkout UI</td>
            <td>
              <code>checkout_ui_extension</code>
            </td>
            <td>Loyalty points display at checkout</td>
          </tr>
          <tr>
            <td>Admin: Customer Reviews</td>
            <td>
              <code>admin_block</code>
            </td>
            <td>Shows customer&apos;s reviews on admin customer detail page</td>
          </tr>
          <tr>
            <td>Admin: Customer Loyalty</td>
            <td>
              <code>admin_block</code>
            </td>
            <td>Shows/edits customer tier on admin customer detail page</td>
          </tr>
          <tr>
            <td>Customer Account</td>
            <td>
              <code>customer_account_extension</code>
            </td>
            <td>Customer-facing account page for points and rewards</td>
          </tr>
          <tr>
            <td>App Pixel</td>
            <td>
              <code>web_pixel</code>
            </td>
            <td>Storefront event tracking for analytics and referral attribution</td>
          </tr>
          <tr>
            <td>Flow Trigger</td>
            <td>
              <code>flow_trigger</code>
            </td>
            <td>Fires Shopify Flow trigger on new review submission</td>
          </tr>
        </tbody>
      </table>

      <H2>Related</H2>
      <ul>
        <li>
          <a href="/docs/advanced/webhooks">Webhooks</a>: all webhook handlers and their processing
          logic
        </li>
        <li>
          <a href="/docs/advanced/admin-extensions">Admin Extensions</a>: details on the admin block
          extensions
        </li>
        <li>
          <a href="/docs/advanced/web-pixel">Web Pixel</a>: storefront event tracking
        </li>
      </ul>
    </div>
  );
}
