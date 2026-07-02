import type { Metadata } from "next";
import { createDocMetadata } from "@/lib/seo";
import { H2, H3 } from "@/components/Heading";
import Callout from "@/components/Callout";
import PlanBadge from "@/components/PlanBadge";

export const metadata: Metadata = createDocMetadata("/docs/loyalty/points-system", {
  title: "How Points Work",
  description:
    "How a customer's points balance and activity history work in PerkStack, plus optional points expiry and points delay.",
});

export default function PointsSystemPage() {
  return (
    <div className="docs-prose">
      <h1>How Points Work</h1>
      <p>
        Every customer has a points balance and a running history of how they got there. Points go{" "}
        <strong>up</strong> when a customer earns, <strong>down</strong> when they redeem a reward,
        and you can adjust a balance by hand at any time. Every change is recorded, so a balance and
        its full history are always accurate.
      </p>

      <H2>Balances and activity</H2>
      <p>
        A customer&apos;s balance is simply the points they have available to spend right now. Behind
        it is an <strong>activity history</strong> &mdash; a dated list of every change, each with a
        plain-language label:
      </p>
      <ul>
        <li>
          <strong>Earned</strong> &mdash; from a purchase, signup, review, social share, birthday, or
          referral.
        </li>
        <li>
          <strong>Redeemed</strong> &mdash; points spent on a reward from your catalog.
        </li>
        <li>
          <strong>Adjusted</strong> &mdash; points you added or removed by hand from the customer&apos;s
          page.
        </li>
        <li>
          <strong>Expired</strong> &mdash; points removed by your expiry policy, if you use one.
        </li>
      </ul>
      <p>
        Customers see their own recent activity on the loyalty page and in their account, filtered by
        type and time period. You see the same history, plus manual controls, on each customer&apos;s
        detail page.
      </p>

      <H3>Refunds reverse points</H3>
      <p>
        If an order is refunded or cancelled, the points earned on it are reversed automatically, so
        a customer can&apos;t keep points for a purchase they returned. You never have to chase this
        down by hand.
      </p>

      <Callout type="tip">
        Need to correct a balance &mdash; a goodwill gesture, a fix after a support ticket? Use{" "}
        <strong>Adjust points</strong> on the customer&apos;s detail page. The change and your reason
        are recorded in their history.
      </Callout>

      <H2>Points expiry</H2>
      <p>
        <PlanBadge plan="essential" /> By default, points never expire. If you&apos;d rather keep
        balances active, you can set an <strong>expiry period</strong> so unused points clear after a
        while &mdash; a gentle nudge for customers to come back and spend. Configure it in{" "}
        <strong>PerkStack &rarr; Settings &rarr; General</strong>.
      </p>
      <ul>
        <li>
          <strong>Expiry period (months)</strong> &mdash; how long points last after they&apos;re
          earned. Default: <strong>never</strong>. Expiry is based on when each batch of points was
          earned.
        </li>
        <li>
          <strong>Notification (days before)</strong> &mdash; how far ahead to warn customers.
          Default: <strong>30 days</strong>.
        </li>
      </ul>
      <p>
        Before points expire, PerkStack sends two reminder emails so customers have time to earn or
        redeem and reset the clock. Expired points are removed automatically &mdash; there&apos;s
        nothing for you to run.
      </p>

      <Callout type="warning">
        Turning on expiry applies to points customers have already earned. Consider giving customers
        a heads-up before you enable it.
      </Callout>

      <H2>Points delay</H2>
      <p>
        <PlanBadge plan="essential" /> Points delay holds a customer&apos;s <strong>purchase</strong>{" "}
        points as <em>pending</em> for a set number of days after an order, then releases them. If
        the order is refunded within that window, the pending points are simply cancelled &mdash; no
        awkward clawback from a balance the customer thought they had. Configure it in{" "}
        <strong>Settings &rarr; General</strong>.
      </p>
      <ul>
        <li>
          <strong>Delay purchase points</strong> &mdash; off by default (purchase points land right
          away).
        </li>
        <li>
          <strong>Delay (days)</strong> &mdash; how long to hold points. Default: <strong>30</strong>
          , allowed range 1&ndash;365. Matching your return window is a good rule of thumb.
        </li>
      </ul>
      <p>
        Only purchase points are delayed &mdash; signup, review, birthday, social, and referral
        points are awarded immediately. Pending points don&apos;t count toward a customer&apos;s
        balance or VIP tier until they&apos;re released. Customers see their pending total on the
        launcher, in their account, and at checkout, so there&apos;s no confusion about when points
        arrive.
      </p>

      <H2>Related</H2>
      <ul>
        <li>
          <a href="/docs/loyalty/earn-rules">Ways to Earn</a>: the actions that add points.
        </li>
        <li>
          <a href="/docs/loyalty/rewards">Rewards Catalog</a>: what customers spend points on.
        </li>
        <li>
          <a href="/docs/settings/general">General Settings</a>: where you set expiry and delay.
        </li>
        <li>
          <a href="/docs/customers/detail">Customer Detail</a>: adjust a balance and view a
          customer&apos;s full history.
        </li>
      </ul>
    </div>
  );
}
