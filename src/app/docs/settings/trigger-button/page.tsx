import type { Metadata } from "next";
import Callout from "@/components/Callout";

export const metadata: Metadata = {
  title: "Trigger Button",
  description:
    "Customise the floating rewards trigger button including text, colours, shape, icon, and border radius with live preview.",
};

export default function TriggerButtonPage() {
  return (
    <div className="docs-prose">
      <h1>Trigger Button</h1>
      <p>
        The trigger button is the floating button that appears on your storefront, typically in the
        bottom-right corner. Customers click it to open the loyalty launcher panel. The trigger
        button customization page (<strong>PerkStack → Settings → Trigger Customize</strong>) lets
        you style this button to match your brand.
      </p>

      <h2>Customization Options</h2>
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
            <td>
              <strong>Trigger Text</strong>
            </td>
            <td>Rewards</td>
            <td>The label displayed on the button</td>
          </tr>
          <tr>
            <td>
              <strong>Background Colour</strong>
            </td>
            <td>
              <code>rgba(0,0,0,0.75)</code>
            </td>
            <td>
              Button background that supports any CSS colour value including rgba for transparency
            </td>
          </tr>
          <tr>
            <td>
              <strong>Text Colour</strong>
            </td>
            <td>
              <code>#ffffff</code>
            </td>
            <td>Colour of the button label text</td>
          </tr>
          <tr>
            <td>
              <strong>Icon Colour</strong>
            </td>
            <td>
              <code>#ffffff</code>
            </td>
            <td>Colour of the icon displayed next to the label</td>
          </tr>
          <tr>
            <td>
              <strong>Custom Icon URL</strong>
            </td>
            <td>Built-in gift icon</td>
            <td>URL to a custom SVG or PNG icon (replaces the default icon)</td>
          </tr>
          <tr>
            <td>
              <strong>Shape</strong>
            </td>
            <td>
              <code>icon-label</code>
            </td>
            <td>
              Button layout where <code>icon-label</code> shows both icon and text
            </td>
          </tr>
          <tr>
            <td>
              <strong>Border Radius</strong>
            </td>
            <td>40 px</td>
            <td>Controls how rounded the button corners are (0 = square, 40+ = pill shape)</td>
          </tr>
        </tbody>
      </table>

      <h2>Styling Guide</h2>

      <h3>Choosing Colours</h3>
      <p>
        Pick colours that stand out against your storefront background while staying on-brand. The
        trigger button should be noticeable but not distracting. Test on both desktop and mobile
        viewports.
      </p>

      <Callout type="tip">
        Use your store&apos;s accent colour for the button background and white for the text. This
        creates a consistent look that draws attention without clashing with your theme.
      </Callout>

      <h3>Custom Icons</h3>
      <p>If you upload a custom icon:</p>
      <ul>
        <li>Use an SVG for the sharpest rendering at any size</li>
        <li>Keep the icon simple, as it renders at roughly 20×20 px</li>
        <li>Use a single colour that matches or contrasts with the button background</li>
        <li>
          The <strong>Icon Colour</strong> setting will not tint custom PNG icons; it only affects
          SVG icons that use <code>currentColor</code>
        </li>
      </ul>

      <h3>Border Radius</h3>
      <table>
        <thead>
          <tr>
            <th>Value</th>
            <th>Result</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <code>0</code>
            </td>
            <td>Sharp square corners</td>
          </tr>
          <tr>
            <td>
              <code>8</code>
            </td>
            <td>Subtly rounded corners</td>
          </tr>
          <tr>
            <td>
              <code>20</code>
            </td>
            <td>Noticeably rounded</td>
          </tr>
          <tr>
            <td>
              <code>40+</code>
            </td>
            <td>Pill / capsule shape (default)</td>
          </tr>
        </tbody>
      </table>

      <h2>Live Preview</h2>
      <p>
        The page includes a live preview that updates as you change settings. The preview shows the
        trigger button as it will appear on your storefront, rendered against a neutral background.
      </p>

      <Callout type="info">
        The trigger button position (bottom-right) is fixed and cannot be changed from this settings
        page. Position is determined by the theme app extension block settings in your theme editor.
      </Callout>

      <h2>Related</h2>
      <ul>
        <li>
          <a href="/docs/settings/widget-customization">Widget Customization</a> for styling the
          launcher panel itself
        </li>
        <li>
          <a href="/docs/settings/general">General Settings</a> for points naming and branding
        </li>
        <li>
          <a href="/docs/widgets/overview">Widgets Overview</a> covering all storefront extension
          blocks
        </li>
      </ul>
    </div>
  );
}
