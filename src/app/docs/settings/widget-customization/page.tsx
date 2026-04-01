import type { Metadata } from "next";
import Callout from "@/components/Callout";

export const metadata: Metadata = {
  title: "Widget Customization",
  description:
    "Customise the loyalty launcher widget including header image, overlay opacity, fullscreen mode, and live preview.",
};

export default function WidgetCustomizationPage() {
  return (
    <div className="docs-prose">
      <h1>Widget Customization</h1>
      <p>
        The widget customization page (<strong>PerkStack → Settings → Widget Customize</strong>)
        lets you style the loyalty launcher panel that appears on your storefront. Changes are
        previewed in real time using the built-in LauncherPreview component.
      </p>

      <h2>Launcher Header Image</h2>
      <p>Upload a custom header image that appears at the top of the loyalty launcher panel.</p>
      <ol>
        <li>
          Click <strong>Upload Image</strong> in the header image section
        </li>
        <li>Select an image file from your computer</li>
        <li>The image is uploaded to Cloudflare R2 via a presigned URL</li>
        <li>The preview updates immediately to show the new header</li>
      </ol>
      <p>Recommended specifications:</p>
      <ul>
        <li>Width: 400–800 px (the launcher panel is typically 360–400 px wide)</li>
        <li>Aspect ratio: roughly 2:1 or 3:1 for a banner-style header</li>
        <li>Format: PNG or JPEG</li>
        <li>Keep file size under 1 MB for fast loading</li>
      </ul>

      <Callout type="tip">
        Use your brand colours and a simple call-to-action in the header image. Avoid text
        that&apos;s too small to read on mobile devices.
      </Callout>

      <h2>Overlay Opacity</h2>
      <p>
        The overlay is the semi-transparent backdrop that appears behind the launcher panel when
        it&apos;s open. Use the slider to adjust opacity:
      </p>
      <table>
        <thead>
          <tr>
            <th>Value</th>
            <th>Effect</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <strong>0%</strong>
            </td>
            <td>Fully transparent with no backdrop visible</td>
          </tr>
          <tr>
            <td>
              <strong>50%</strong>
            </td>
            <td>Semi-transparent, so page content is dimmed but visible</td>
          </tr>
          <tr>
            <td>
              <strong>100%</strong>
            </td>
            <td>Fully opaque, meaning page content is completely hidden behind the overlay</td>
          </tr>
        </tbody>
      </table>

      <h2>Image Fullscreen</h2>
      <p>
        Toggle the <strong>Image Fullscreen</strong> option to control whether the header image
        stretches to fill the full width of the launcher panel or maintains its aspect ratio with
        padding.
      </p>
      <ul>
        <li>
          <strong>Enabled</strong>: image fills the full panel width, may crop vertically
        </li>
        <li>
          <strong>Disabled</strong>: image is contained within the panel with proportional sizing
        </li>
      </ul>

      <h2>Live Preview</h2>
      <p>
        The right side of the customization page shows a live preview of the launcher panel via the{" "}
        <code>LauncherPreview</code> component. Every change you make to the settings is reflected
        immediately in the preview, so you can iterate on the design without saving and checking
        your live store.
      </p>

      <Callout type="info">
        The live preview is an approximation. Minor rendering differences may occur between the
        preview and your actual storefront due to theme-specific CSS. Always verify on your live
        store after saving.
      </Callout>

      <h2>Navigation</h2>
      <p>
        Use the <strong>Back</strong> link at the top of the page to return to the main settings
        page. If you have unsaved changes, the Contextual Save Bar prompts you to save or discard
        before navigating away.
      </p>

      <h2>Related</h2>
      <ul>
        <li>
          <a href="/docs/settings/trigger-button">Trigger Button</a> to customise the floating
          button that opens the launcher
        </li>
        <li>
          <a href="/docs/settings/general">General Settings</a> for logo and branding options
        </li>
        <li>
          <a href="/docs/widgets/overview">Widgets Overview</a> covering all storefront extension
          blocks
        </li>
      </ul>
    </div>
  );
}
