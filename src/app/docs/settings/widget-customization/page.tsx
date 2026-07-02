import type { Metadata } from "next";
import { createDocMetadata } from "@/lib/seo";
import { H2 } from "@/components/Heading";
import Callout from "@/components/Callout";
import PlanBadge from "@/components/PlanBadge";

export const metadata: Metadata = createDocMetadata("/docs/settings/widget-customization", {
  title: "Widget Customization",
  description:
    "Design your loyalty launcher and loyalty page to match your brand — accent color, theme, fonts, shape, card style, copy, hero image, and logo, with a live preview.",
});

export default function WidgetCustomizationPage() {
  return (
    <div className="docs-prose">
      <h1>Widget Customization</h1>
      <p>
        Widget Customization (<strong>Apps → PerkStack → Widget customize</strong>) is where you design
        the look of your loyalty launcher panel and loyalty page so they match your store. A live
        preview shows every change as you make it, so you can dial in the design before customers see
        it.
      </p>

      <Callout type="info">
        The accent color and light/dark/auto theme are available on every plan. Full brand matching
        &mdash; hero image, custom panel colors, fonts, and logo &mdash; is available on{" "}
        <PlanBadge plan="growth" /> and above.
      </Callout>

      <H2>Colors and theme</H2>
      <table>
        <thead>
          <tr>
            <th>Setting</th>
            <th>Options</th>
            <th>Default</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <strong>Accent color</strong>
            </td>
            <td>Any color &mdash; used for buttons and highlights</td>
            <td>
              <code>#16a34a</code>
            </td>
          </tr>
          <tr>
            <td>
              <strong>Panel theme</strong>
            </td>
            <td>Auto (match storefront), Light, Dark, Custom</td>
            <td>Auto</td>
          </tr>
          <tr>
            <td>
              <strong>Panel background</strong> <span className="text-sm">(Custom theme)</span>
            </td>
            <td>Any color</td>
            <td>
              <code>#FAF6F0</code>
            </td>
          </tr>
          <tr>
            <td>
              <strong>Panel text</strong> <span className="text-sm">(Custom theme)</span>
            </td>
            <td>Any color</td>
            <td>
              <code>#2A2118</code>
            </td>
          </tr>
        </tbody>
      </table>
      <p>
        Choose <strong>Auto</strong> to follow your storefront&apos;s color scheme, <strong>Light</strong>{" "}
        or <strong>Dark</strong> to lock one look, or <strong>Custom</strong> to set your own panel
        background and text colors.
      </p>

      <H2>Shape and layout</H2>
      <table>
        <thead>
          <tr>
            <th>Setting</th>
            <th>Options</th>
            <th>Default</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <strong>Surface radius</strong>
            </td>
            <td>Corner rounding of panels and cards, in pixels</td>
            <td>12</td>
          </tr>
          <tr>
            <td>
              <strong>Button shape</strong>
            </td>
            <td>Sharp, Rounded, Pill</td>
            <td>Pill</td>
          </tr>
          <tr>
            <td>
              <strong>Card style</strong>
            </td>
            <td>Soft (subtle shadow), Bordered (thin border)</td>
            <td>Soft</td>
          </tr>
          <tr>
            <td>
              <strong>Heading scale</strong>
            </td>
            <td>Compact, Standard, Large, Display</td>
            <td>Standard</td>
          </tr>
        </tbody>
      </table>

      <H2>Typography</H2>
      <table>
        <thead>
          <tr>
            <th>Setting</th>
            <th>Options</th>
            <th>Default</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <strong>Panel font</strong>
            </td>
            <td>Inherit theme font, or a curated font list (Inter, Manrope, DM Sans, and more)</td>
            <td>Inherit theme font</td>
          </tr>
          <tr>
            <td>
              <strong>Heading font</strong>
            </td>
            <td>Same list, set independently from body text</td>
            <td>Inherit theme font</td>
          </tr>
          <tr>
            <td>
              <strong>Font weight</strong>
            </td>
            <td>Light, Normal, Bold</td>
            <td>Normal</td>
          </tr>
        </tbody>
      </table>

      <H2>Copy</H2>
      <p>
        Rewrite the words shoppers see in the panel, or leave any field blank to use PerkStack&apos;s
        built-in wording. You can edit the:
      </p>
      <ul>
        <li>
          <strong>Heading</strong> and <strong>subheading</strong> at the top of the panel
        </li>
        <li>
          <strong>Eyebrow</strong> &mdash; the small label above the heading
        </li>
        <li>
          <strong>Join label</strong> &mdash; the button that invites guests to sign up
        </li>
      </ul>

      <H2>Hero image and logo <PlanBadge plan="growth" /></H2>
      <p>
        On <PlanBadge plan="growth" /> and above you can add a <strong>hero image</strong> across the
        top of the panel and your <strong>logo</strong> inside it for a fully branded look. These, along
        with custom colors and fonts, are part of full brand matching; on Free and Essential the panel
        uses your accent color and chosen light/dark/auto theme.
      </p>

      <Callout type="tip">
        Fine-tuning with <strong>Custom CSS</strong> to tweak the launcher and loyalty page beyond
        these controls is available on <PlanBadge plan="studio" />. Brand-matching fields only require
        the higher plan when you change them, so a downgrade never wipes your saved design.
      </Callout>

      <H2>Related</H2>
      <ul>
        <li>
          <a href="/docs/widgets/loyalty-launcher">Loyalty Launcher</a>: the floating panel these
          settings style
        </li>
        <li>
          <a href="/docs/widgets/loyalty-page">Loyalty Page</a>: the full-page loyalty dashboard that
          shares this design
        </li>
        <li>
          <a href="/docs/settings/trigger-button">Trigger Button</a>: style the floating button that
          opens the launcher
        </li>
        <li>
          <a href="/docs/settings/general">General</a>: your store logo and points naming
        </li>
      </ul>
    </div>
  );
}
