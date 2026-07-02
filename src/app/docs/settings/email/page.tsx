import type { Metadata } from "next";
import { createDocMetadata } from "@/lib/seo";
import { H2 } from "@/components/Heading";
import Callout from "@/components/Callout";
import PlanBadge from "@/components/PlanBadge";

export const metadata: Metadata = createDocMetadata("/docs/settings/email", {
  title: "Email & Notifications",
  description:
    "Set the sender name and reply-to address on your loyalty and review emails, manage the weekly digest, remove PerkStack branding, and track monthly email usage.",
});

export default function EmailSettingsPage() {
  return (
    <div className="docs-prose">
      <h1>Email &amp; Notifications</h1>
      <p>
        PerkStack emails your customers on your behalf &mdash; points earned, rewards, expiry reminders,
        and review requests. From <strong>PerkStack → Settings → Email</strong> you brand those emails,
        choose which notifications you receive, and keep an eye on your monthly email usage.
      </p>

      <H2>Sender identity</H2>
      <p>
        These two fields brand every email so it looks like it comes from your store, not from an app.
        A live preview updates as you type.
      </p>
      <table>
        <thead>
          <tr>
            <th>Setting</th>
            <th>Default</th>
            <th>What it does</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <strong>Sender name</strong>
            </td>
            <td>Your store name</td>
            <td>
              The &ldquo;from&rdquo; name customers see in their inbox. Set it to your brand so emails
              feel personal.
            </td>
          </tr>
          <tr>
            <td>
              <strong>Reply-to address</strong>
            </td>
            <td>Empty</td>
            <td>
              Where customer replies go. Enter a monitored address (like your support inbox) so replies
              reach a real person.
            </td>
          </tr>
        </tbody>
      </table>

      <H2>Weekly analytics digest</H2>
      <p>
        Once a week, PerkStack emails the store owner a short digest of how your loyalty and reviews
        program is doing. It&apos;s <strong>on by default</strong>. To stop receiving it, turn off the
        weekly digest toggle &mdash; this only affects your own notification and never touches customer
        emails.
      </p>

      <H2>&ldquo;Powered by PerkStack&rdquo; branding</H2>
      <p>
        By default, a small &ldquo;Powered by PerkStack&rdquo; mark appears on your storefront widget
        and email footers. On <PlanBadge plan="essential" /> and above you can turn it off for a fully
        white-labeled look.
      </p>
      <table>
        <thead>
          <tr>
            <th>Plan</th>
            <th>Branding</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <PlanBadge plan="free" />
            </td>
            <td>Always shown</td>
          </tr>
          <tr>
            <td>
              <PlanBadge plan="essential" /> and above
            </td>
            <td>Toggle to show or hide</td>
          </tr>
        </tbody>
      </table>

      <H2>Monthly email usage</H2>
      <p>
        A usage bar shows how many emails you&apos;ve sent this calendar month against your plan&apos;s
        cap (5,000 on Essential, 25,000 on Growth, 50,000 on Studio). Usage resets on the 1st of each
        month in your store&apos;s timezone. On Growth and Studio, going over the cap is billed as
        overage; on Free and Essential, outbound emails pause until the cap resets.
      </p>
      <Callout type="info">
        Only emails PerkStack sends to customers count toward this cap &mdash; review requests, points
        notifications, and reminders. Your own weekly digest doesn&apos;t count.
      </Callout>

      <H2>Custom sender domain and templates <PlanBadge plan="studio" /></H2>
      <p>
        On <PlanBadge plan="studio" />, emails can be sent from your own domain (for example{" "}
        <code>points@yourbrand.com</code>) so they&apos;re fully yours end to end, and you can replace
        the built-in email designs with your own <strong>custom templates</strong>. Both are
        Studio-only; on other plans PerkStack sends from a shared address using the built-in designs,
        still branded with your sender name and logo.
      </p>

      <Callout type="tip">
        Branding removal and the custom domain only require the higher plan when you turn them on. If
        you downgrade, your other email settings keep working and stay saved.
      </Callout>

      <H2>Related</H2>
      <ul>
        <li>
          <a href="/docs/settings/general">General</a>: add the store logo that appears in your emails
        </li>
        <li>
          <a href="/docs/reviews/review-requests">Review Requests</a>: timing and copy for the review
          emails PerkStack sends
        </li>
        <li>
          <a href="/docs/settings/review-settings">Review Settings</a>: customize review request and
          reminder subject lines and bodies
        </li>
        <li>
          <a href="/docs/settings/billing">Plans &amp; Billing</a>: email caps and which plan removes
          branding
        </li>
      </ul>
    </div>
  );
}
