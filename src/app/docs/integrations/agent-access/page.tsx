import type { Metadata } from "next";
import { createDocMetadata } from "@/lib/seo";
import { H2 } from "@/components/Heading";
import Callout from "@/components/Callout";
import PlanBadge from "@/components/PlanBadge";

export const metadata: Metadata = createDocMetadata("/docs/integrations/agent-access", {
  title: "AI Agent Access",
  description:
    "Let an AI assistant like Claude, ChatGPT, or Cursor run your loyalty and reviews program for you. Generate a secure access token and connect your assistant in a few clicks.",
});

export default function AgentAccessPage() {
  return (
    <div className="docs-prose">
      <h1>
        AI Agent Access <PlanBadge plan="growth" />
      </h1>
      <p>
        AI Agent Access lets you connect an AI assistant &mdash; such as Claude, ChatGPT, or Cursor
        &mdash; so it can operate your loyalty and reviews program on your behalf. Instead of clicking
        through the admin yourself, you can simply ask your assistant to do things like check a
        customer&apos;s balance, adjust points, or pull the latest review activity.
      </p>

      <Callout type="info">
        AI Agent Access is available on the <PlanBadge plan="growth" /> plan or above and is currently
        in <strong>beta</strong>. Features and behavior may change as it develops.
      </Callout>

      <H2>How it works</H2>
      <p>
        You generate a <strong>personal access token</strong> in PerkStack, then give it to your AI
        assistant. The token is what lets the assistant act on your store&apos;s behalf, so treat it
        like a password. Anyone with the token can operate your program, so only share it with tools
        you trust.
      </p>

      <H2>Connecting an AI assistant</H2>
      <ol>
        <li>
          Go to <strong>PerkStack → Settings → Agent Access</strong>.
        </li>
        <li>
          Select <strong>Generate</strong> to create a new access token.
        </li>
        <li>
          Copy the <strong>setup snippet</strong> PerkStack shows you and paste it into your AI
          assistant&apos;s configuration. That&apos;s all your assistant needs to connect.
        </li>
        <li>Ask your assistant to work with your loyalty program, and it will use the connection.</li>
      </ol>

      <Callout type="warning">
        The full token is shown only once, when you generate it. Copy it right away and store it
        somewhere safe. If you lose it or think it may have been exposed, revoke it and generate a new
        one.
      </Callout>

      <H2>Managing your tokens</H2>
      <ul>
        <li>
          <strong>Generate</strong> a token any time you connect a new assistant, up to a maximum of{" "}
          <strong>10 tokens</strong> per store. Using a separate token per tool makes it easy to see
          what&apos;s connected and to turn off one without affecting the others.
        </li>
        <li>
          <strong>Revoke</strong> a token to instantly cut off that assistant&apos;s access. Revoking
          is always available, even if your plan changes.
        </li>
      </ul>

      <Callout type="tip">
        Give each assistant its own token and a name you&apos;ll recognize. If you ever stop using a
        tool, revoke just that token and your other connections keep working.
      </Callout>

      <H2>Related</H2>
      <ul>
        <li>
          <a href="/docs/settings/general">General Settings</a>: configure your loyalty program
        </li>
        <li>
          <a href="/docs/customers/management">Customer Management</a>: what an assistant can help you
          manage
        </li>
        <li>
          <a href="/docs/settings/billing">Plans &amp; Billing</a>: what each plan includes
        </li>
      </ul>
    </div>
  );
}
