import type { Metadata } from "next";
import { createDocMetadata } from "@/lib/seo";
import { H2 } from "@/components/Heading";
import Callout from "@/components/Callout";
import PlanBadge from "@/components/PlanBadge";

export const metadata: Metadata = createDocMetadata("/docs/loyalty/birthday-rewards", {
  title: "Birthday Rewards",
  description:
    "Surprise customers with bonus loyalty points on their birthday to build a personal connection and bring them back each year.",
});

export default function BirthdayRewardsPage() {
  return (
    <div className="docs-prose">
      <h1>
        Birthday Rewards <PlanBadge plan="essential" />
      </h1>
      <p>
        Birthday rewards surprise customers with bonus loyalty points on their special day. It&apos;s
        a small gesture that builds a personal connection and gives shoppers a reason to visit your
        store each year.
      </p>

      <Callout type="info">
        Birthday rewards are available on the <PlanBadge plan="essential" /> plan and above, and they
        ship <strong>turned off</strong>. To start awarding them, turn on the{" "}
        <strong>Birthday</strong> earn rule in{" "}
        <strong>PerkStack → Loyalty → Ways to Earn</strong>.
      </Callout>

      <H2>How it works</H2>
      <ol>
        <li>A customer enters their birthday on your storefront.</li>
        <li>
          Each year on that date, PerkStack automatically awards them the points you&apos;ve set
          &mdash; <strong>200 points</strong> by default.
        </li>
        <li>
          Points are awarded <strong>at most once per calendar year</strong>, so no one can collect
          twice in the same year.
        </li>
      </ol>
      <p>
        You can change the number of birthday points on the Birthday earn rule in{" "}
        <strong>Loyalty → Ways to Earn</strong>.
      </p>

      <H2>Where customers enter their birthday</H2>
      <p>
        Shoppers set their birthday in the <strong>loyalty launcher</strong> &mdash; the pop-up
        loyalty widget on your storefront. They pick a date and save it, and the launcher then shows
        the saved date with a checkmark.
      </p>

      <Callout type="warning">
        The birthday field appears <strong>only in the loyalty launcher</strong>. It is not on the
        full loyalty page, the customer account page, or checkout. If your store uses only the
        loyalty-page block and not the launcher, customers will have no way to enter a birthday
        &mdash; make sure the launcher is enabled if you want to collect birthdays.
      </Callout>

      <H2>Birthdays are locked once set</H2>
      <p>
        After a customer saves their birthday, they cannot change it. This prevents shoppers from
        editing the date to collect birthday points more than once. Because the date is permanent,
        it&apos;s worth making sure your launcher copy reminds customers to enter the correct date
        before saving.
      </p>

      <Callout type="tip">
        The birthday rule only awards points while it&apos;s turned on. If the rule was off on a
        customer&apos;s birthday, they won&apos;t receive points retroactively &mdash; turn the rule
        on before the birthdays you want to reward come around.
      </Callout>

      <H2>Related</H2>
      <ul>
        <li>
          <a href="/docs/loyalty/earn-rules">Ways to Earn</a>: turn on the Birthday rule and set the
          point amount
        </li>
        <li>
          <a href="/docs/widgets/loyalty-launcher">Loyalty Launcher</a>: the widget where customers
          enter their birthday
        </li>
        <li>
          <a href="/docs/loyalty/points-system">How Points Work</a>: how birthday points are tracked
        </li>
      </ul>
    </div>
  );
}
