import type { Metadata } from "next";
import { createDocMetadata } from "@/lib/seo";
import { H2, H3 } from "@/components/Heading";
import Callout from "@/components/Callout";

export const metadata: Metadata = createDocMetadata("/docs/customers/freeze", {
  title: "Freeze & Unfreeze",
  description:
    "Pause a single customer's ability to earn and redeem loyalty points without deleting them or their balance — fully reversible whenever you're ready.",
});

export default function FreezeUnfreezePage() {
  return (
    <div className="docs-prose">
      <h1>Freeze &amp; Unfreeze</h1>
      <p>
        Freezing puts a hard pause on one customer&apos;s loyalty: while frozen, they cannot earn or
        redeem points. Nothing is deleted &mdash; their balance, history, and account all stay
        exactly as they are &mdash; and you can unfreeze at any time to pick up right where they left
        off. It&apos;s the safe way to stop loyalty activity for a single shopper without wiping their
        record.
      </p>

      <H2>When to use it</H2>
      <p>Freeze a customer when you need to hold their loyalty in place, for example:</p>
      <ul>
        <li>
          <strong>Suspected abuse</strong> &mdash; someone appears to be gaming points or referrals
          and you want to stop the bleeding while you look into it.
        </li>
        <li>
          <strong>An open dispute or chargeback</strong> &mdash; pause loyalty until the order or
          payment issue is resolved.
        </li>
        <li>
          <strong>An opt-out request</strong> &mdash; a customer asks to stop taking part in the
          program.
        </li>
      </ul>

      <H2>What freezing does</H2>
      <ul>
        <li>
          <strong>Earning stops.</strong> No new points from purchases, reviews, referrals, or any
          other action.
        </li>
        <li>
          <strong>Redeeming stops.</strong> The customer can&apos;t turn points into rewards while
          frozen.
        </li>
        <li>
          <strong>Their balance is preserved.</strong> Existing points and full history stay intact,
          ready for when you unfreeze.
        </li>
        <li>
          <strong>Shopping is unaffected.</strong> Freezing only pauses loyalty &mdash; the customer
          can still place orders and use your store normally.
        </li>
      </ul>

      <Callout type="info">
        Freezing is completely reversible. Unfreeze whenever you&apos;re ready and the customer can
        earn and redeem again immediately.
      </Callout>

      <H2>How to freeze or unfreeze</H2>
      <p>You can do it from either place a customer appears:</p>
      <H3>From the Customers list</H3>
      <ol>
        <li>
          Open <strong>Customers</strong> and find the shopper using search.
        </li>
        <li>
          Click <strong>Manage</strong> on their row.
        </li>
        <li>
          On the <strong>Overview</strong> tab, choose <strong>Freeze</strong> (or{" "}
          <strong>Unfreeze</strong> if they&apos;re already frozen).
        </li>
      </ol>
      <H3>From the customer detail page</H3>
      <ol>
        <li>Click the customer&apos;s name to open their profile.</li>
        <li>
          Use the <strong>Freeze</strong> / <strong>Unfreeze</strong> control in the loyalty section.
        </li>
      </ol>
      <p>
        A frozen customer shows a <strong>Frozen</strong> badge in the Customers list and on their
        profile, so their status is clear at a glance.
      </p>

      <Callout type="warning">
        Unfreezing does not backfill points for anything the customer did while frozen. If they
        placed an order during the freeze, they won&apos;t receive those points after you unfreeze.
      </Callout>

      <H2>Related</H2>
      <ul>
        <li>
          <a href="/docs/customers/management">Customer Management</a>: find customers and see their
          status
        </li>
        <li>
          <a href="/docs/customers/detail">Customer Detail</a>: the full profile and manual controls
        </li>
        <li>
          <a href="/docs/troubleshooting/status-reference">Status Reference</a>: what Active and
          Frozen mean
        </li>
      </ul>
    </div>
  );
}
