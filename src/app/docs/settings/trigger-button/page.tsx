import type { Metadata } from "next";
import { createDocMetadata } from "@/lib/seo";
import { H2 } from "@/components/Heading";
import Callout from "@/components/Callout";
import PlanBadge from "@/components/PlanBadge";

export const metadata: Metadata = createDocMetadata("/docs/settings/trigger-button", {
  title: "Trigger Button",
  description:
    "Style the floating rewards button shoppers tap to open your loyalty launcher — its text, colors, icon, shape, and corner rounding, with a live preview.",
});

export default function TriggerButtonPage() {
  return (
    <div className="docs-prose">
      <h1>Trigger Button</h1>
      <p>
        The trigger button is the floating button on your storefront that shoppers tap to open the
        loyalty launcher. Design it to match your brand from{" "}
        <strong>Apps → PerkStack → Trigger customize</strong>, with a live preview that updates as you
        change each setting.
      </p>

      <H2>Options</H2>
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
              <strong>Button text</strong>
            </td>
            <td>The label on the button</td>
            <td>Rewards</td>
          </tr>
          <tr>
            <td>
              <strong>Background color</strong>
            </td>
            <td>Any color, including semi-transparent</td>
            <td>Translucent black</td>
          </tr>
          <tr>
            <td>
              <strong>Text color</strong>
            </td>
            <td>Color of the label</td>
            <td>White</td>
          </tr>
          <tr>
            <td>
              <strong>Icon color</strong>
            </td>
            <td>Color of the icon next to the label</td>
            <td>White</td>
          </tr>
          <tr>
            <td>
              <strong>Icon</strong>
            </td>
            <td>Built-in rewards icon, or your own custom icon</td>
            <td>Built-in icon</td>
          </tr>
          <tr>
            <td>
              <strong>Shape</strong>
            </td>
            <td>Icon and label, Icon only, Label only</td>
            <td>Icon and label</td>
          </tr>
          <tr>
            <td>
              <strong>Corner radius</strong>
            </td>
            <td>0 (square) to 40 (pill), in pixels</td>
            <td>40</td>
          </tr>
          <tr>
            <td>
              <strong>Match theme</strong>
            </td>
            <td>Follow your storefront colors instead of the colors above</td>
            <td>Off</td>
          </tr>
        </tbody>
      </table>

      <Callout type="info">
        <strong>Label only</strong> (which hides the small PerkStack mark) and using a{" "}
        <strong>custom icon</strong> are available on <PlanBadge plan="growth" /> and above. On lower
        plans, use the <strong>Icon and label</strong> or <strong>Icon only</strong> shapes with the
        built-in icon.
      </Callout>

      <H2>Tips</H2>
      <ul>
        <li>
          Pick a background that stands out against your storefront but stays on-brand &mdash; the
          button should be easy to spot without clashing.
        </li>
        <li>
          A high corner radius (near 40) gives a pill shape; drop it toward 0 for square corners.
        </li>
        <li>
          Turn on <strong>Match theme</strong> if you&apos;d rather the button automatically follow your
          store&apos;s colors.
        </li>
        <li>Check the preview on both desktop and mobile widths before saving.</li>
      </ul>

      <Callout type="tip">
        The gated options (Label only, custom icon) only require the higher plan when you change them.
        A downgrade keeps your saved button design intact.
      </Callout>

      <H2>Related</H2>
      <ul>
        <li>
          <a href="/docs/settings/widget-customization">Widget Customization</a>: design the launcher
          panel the button opens
        </li>
        <li>
          <a href="/docs/widgets/loyalty-launcher">Loyalty Launcher</a>: how the floating launcher works
          and where it&apos;s placed
        </li>
        <li>
          <a href="/docs/settings/general">General</a>: points naming and your store logo
        </li>
        <li>
          <a href="/docs/settings/billing">Plans &amp; Billing</a>: which plan unlocks Label only and
          custom icons
        </li>
      </ul>
    </div>
  );
}
