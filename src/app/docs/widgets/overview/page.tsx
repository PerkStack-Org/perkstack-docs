import type { Metadata } from "next";
import { createDocMetadata } from "@/lib/seo";
import { H2 } from "@/components/Heading";
import Callout from "@/components/Callout";
import PlanBadge from "@/components/PlanBadge";

export const metadata: Metadata = createDocMetadata("/docs/widgets/overview", {
  title: "Widgets Overview",
  description:
    "An overview of all PerkStack storefront widgets, including theme app extension blocks, checkout UI, and customer account extensions.",
});

export default function WidgetsOverviewPage() {
  return (
    <div className="docs-prose">
      <h1>Widgets Overview</h1>
      <p>
        PerkStack provides a suite of storefront widgets that integrate directly into your Shopify
        theme, checkout, and customer account portal. Every widget is built as a Shopify extension,
        requiring no manual code edits.
      </p>

      <H2>Architecture</H2>
      <p>
        All storefront widgets are delivered as <strong>theme app extension blocks</strong>,
        compatible with Online Store 2.0 themes. They belong to the{" "}
        <code>extensions/theme-app</code> extension (handle: <code>perkstack-theme</code>) and are
        added to your store through the theme editor at{" "}
        <strong>Online Store &gt; Themes &gt; Customize</strong>.
      </p>
      <p>
        In addition to theme blocks, PerkStack includes a <strong>checkout UI extension</strong> for
        the Shopify checkout and a <strong>customer account extension</strong> for the customer
        account portal.
      </p>

      <Callout type="info">
        Theme app extension blocks are automatically removed when you uninstall PerkStack, so there
        is nothing to clean up manually.
      </Callout>

      <H2>Available Widgets</H2>
      <p>
        PerkStack ships 8 theme app extension blocks, plus a checkout extension and a customer
        account extension, making 10 widgets in total:
      </p>

      <table>
        <thead>
          <tr>
            <th>Widget</th>
            <th>Type</th>
            <th>Target</th>
            <th>Plan</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <a href="/docs/widgets/loyalty-launcher">Loyalty Launcher</a>
            </td>
            <td>Theme block</td>
            <td>
              <code>body</code>
            </td>
            <td>
              <PlanBadge plan="free" />
            </td>
          </tr>
          <tr>
            <td>
              <a href="/docs/widgets/review-display">Review Display</a>
            </td>
            <td>Theme block</td>
            <td>
              <code>section</code>
            </td>
            <td>
              <PlanBadge plan="free" />
            </td>
          </tr>
          <tr>
            <td>
              <a href="/docs/widgets/review-form">Review Form</a>
            </td>
            <td>Theme block</td>
            <td>
              <code>section</code>
            </td>
            <td>
              <PlanBadge plan="free" />
            </td>
          </tr>
          <tr>
            <td>
              <a href="/docs/widgets/star-badge">Star Badge</a>
            </td>
            <td>Theme block</td>
            <td>
              <code>section</code>
            </td>
            <td>
              <PlanBadge plan="free" />
            </td>
          </tr>
          <tr>
            <td>
              <a href="/docs/widgets/collection-stars">Collection Stars</a>
            </td>
            <td>Theme block</td>
            <td>
              <code>body</code>
            </td>
            <td>
              <PlanBadge plan="free" />
            </td>
          </tr>
          <tr>
            <td>
              <a href="/docs/widgets/review-carousel">Review Carousel</a>
            </td>
            <td>Theme block</td>
            <td>
              <code>section</code>
            </td>
            <td>
              <PlanBadge plan="free" />
            </td>
          </tr>
          <tr>
            <td>
              <a href="/docs/widgets/loyalty-page">Loyalty Page</a>
            </td>
            <td>Theme block</td>
            <td>
              <code>section</code>
            </td>
            <td>
              <PlanBadge plan="free" />
            </td>
          </tr>
          <tr>
            <td>
              <a href="/docs/widgets/checkout-widget">Checkout Widget</a>
            </td>
            <td>Checkout UI extension</td>
            <td>Checkout</td>
            <td>
              <PlanBadge plan="growth" />
            </td>
          </tr>
          <tr>
            <td>
              <a href="/docs/widgets/customer-account">Customer Account</a>
            </td>
            <td>Customer account extension</td>
            <td>Account portal</td>
            <td>
              <PlanBadge plan="free" />
            </td>
          </tr>
        </tbody>
      </table>

      <H2>How to Add Widgets</H2>
      <ol>
        <li>
          In your Shopify admin, go to <strong>Online Store &gt; Themes</strong>.
        </li>
        <li>
          Click <strong>Customize</strong> on your active theme.
        </li>
        <li>
          Navigate to the page where you want to place the widget (e.g. product page, homepage, or a
          dedicated page).
        </li>
        <li>
          Click <strong>Add block</strong> or <strong>Add section</strong>, then search for the
          PerkStack block you want to add.
        </li>
        <li>
          Configure the block settings in the sidebar and click <strong>Save</strong>.
        </li>
      </ol>

      <Callout type="tip">
        Blocks with a <code>body</code> target (Loyalty Launcher, Collection Stars) appear on every
        page automatically. Blocks with a <code>section</code> target must be added to each template
        where you want them to appear.
      </Callout>

      <H2>Configuration Delivery</H2>
      <p>
        All widgets fetch their configuration from the <code>/api/storefront-config</code> endpoint
        at runtime. This single endpoint delivers shared settings such as:
      </p>
      <ul>
        <li>
          <strong>Launcher image</strong>: custom icon for the loyalty launcher button
        </li>
        <li>
          <strong>Overlay settings</strong>: panel overlay behaviour and styling
        </li>
        <li>
          <strong>Accent colour</strong>: primary brand colour used across all widgets
        </li>
        <li>
          <strong>Trigger styling</strong>: position, size, and animation of launcher elements
        </li>
      </ul>
      <p>
        Changes you make to these settings in the PerkStack admin are reflected on your storefront
        immediately, with no theme editor changes needed.
      </p>

      <H2>Translations</H2>
      <p>
        All widget text labels and messages are defined in the <code>locales/en.default.json</code>{" "}
        file inside the theme app extension. Shopify uses this file to power the translation system,
        so your widgets automatically respect the store&apos;s language settings.
      </p>

      <H2>Block Targets Explained</H2>
      <table>
        <thead>
          <tr>
            <th>Target</th>
            <th>Behaviour</th>
            <th>Placement</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <code>body</code>
            </td>
            <td>Renders on every page of the storefront</td>
            <td>Added once in the theme editor; appears globally</td>
          </tr>
          <tr>
            <td>
              <code>section</code>
            </td>
            <td>Renders only on pages where it is explicitly added</td>
            <td>Must be added to each template (product, collection, home, etc.)</td>
          </tr>
          <tr>
            <td>
              <code>head</code>
            </td>
            <td>
              Injects assets into the <code>&lt;head&gt;</code> of the page
            </td>
            <td>Used internally for loading scripts and styles</td>
          </tr>
        </tbody>
      </table>

      <H2>Next Steps</H2>
      <p>
        Explore each widget in detail to learn about its specific configuration options, placement
        instructions, and API endpoints:
      </p>
      <ul>
        <li>
          <a href="/docs/widgets/loyalty-launcher">Loyalty Launcher</a>: floating loyalty panel on
          every page
        </li>
        <li>
          <a href="/docs/widgets/review-display">Review Display</a>: full review list on product
          pages
        </li>
        <li>
          <a href="/docs/widgets/review-form">Review Form</a>: customer review submission form
        </li>
        <li>
          <a href="/docs/widgets/star-badge">Star Badge</a>: inline rating summary
        </li>
        <li>
          <a href="/docs/widgets/collection-stars">Collection Stars</a>: ratings on collection grids
        </li>
        <li>
          <a href="/docs/widgets/review-carousel">Review Carousel</a>: horizontal photo review
          carousel
        </li>
        <li>
          <a href="/docs/widgets/loyalty-page">Loyalty Page</a>: full-page loyalty program display
        </li>
        <li>
          <a href="/docs/widgets/checkout-widget">Checkout Widget</a>: redeem rewards at checkout
        </li>
        <li>
          <a href="/docs/widgets/customer-account">Customer Account</a>: loyalty hub in the customer
          portal
        </li>
      </ul>
    </div>
  );
}
