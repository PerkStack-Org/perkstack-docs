import type { Metadata } from "next";
import { createDocMetadata } from "@/lib/seo";
import { H2 } from "@/components/Heading";
import Callout from "@/components/Callout";

export const metadata: Metadata = createDocMetadata("/docs/getting-started/how-it-works", {
  title: "How It Works",
  description:
    "The PerkStack loyalty and reviews flywheel: customers earn points on purchases, reviews, and referrals, redeem them for rewards, and come back to buy again.",
});

export default function HowItWorksPage() {
  return (
    <div className="docs-prose">
      <h1>How It Works</h1>
      <p>
        PerkStack turns one-time shoppers into repeat customers with a simple loop: customers earn
        points, spend them on rewards, and come back to earn more. Reviews and referrals feed the
        same loop by building trust and bringing in new shoppers. Here is the whole story, start to
        finish.
      </p>

      <H2>The loyalty flywheel</H2>
      <p>Each turn of the loop makes the next one easier:</p>
      <ol>
        <li>
          <strong>A customer earns points.</strong> Points are awarded automatically for buying, and
          you can also reward signing up, writing a review, sharing on social, and celebrating a
          birthday.
        </li>
        <li>
          <strong>They redeem points for a reward.</strong> When a customer has enough points, they
          claim a reward — a discount, free shipping, a free product — and get a code to use at
          checkout.
        </li>
        <li>
          <strong>They come back to buy again.</strong> A points balance and a reward waiting for
          them is a standing reason to return, which earns more points, and the loop repeats.
        </li>
      </ol>

      <Callout type="tip">
        The magic is in the return visit. A customer who has points sitting in their account is far
        more likely to choose you over a competitor next time.
      </Callout>

      <H2>Reviews build trust and feed points</H2>
      <p>
        After someone buys, PerkStack automatically emails them to ask for a review. Their star
        rating and photos appear on your product pages, where they become social proof that helps the
        next shopper decide to buy. Because writing a review can also earn points, reviews plug
        straight into the loyalty loop — the customer helps future buyers and gets rewarded for it.
      </p>

      <H2>Referrals bring in new shoppers</H2>
      <p>
        Happy customers can share a personal referral link with friends. The friend gets a welcome
        discount on their first order, and once they buy, both the friend and the customer who
        referred them earn points. It is word-of-mouth that pays off for everyone and grows your
        customer base.
      </p>

      <H2>Where customers see it on your store</H2>
      <p>Shoppers interact with your program through a few storefront surfaces:</p>
      <ul>
        <li>
          <strong>The loyalty launcher</strong>: a floating button on every page that opens a panel
          where customers see their points balance, available rewards, and referral link.
        </li>
        <li>
          <strong>The loyalty page</strong>: an optional full-page version of the rewards panel for
          customers who want the complete view.
        </li>
        <li>
          <strong>Reviews on product pages</strong>: star ratings and customer photos shown right
          where people are deciding whether to buy.
        </li>
      </ul>
      <p>
        You control where these appear from your theme, and their colors and copy from inside
        PerkStack. See <a href="/docs/getting-started/going-live">Going Live on Your Store</a> to add
        them.
      </p>

      <H2>Emails that run themselves</H2>
      <p>
        PerkStack sends the right message at the right moment without you lifting a finger: a review
        request after a purchase (and a gentle reminder if there is no response), a note when points
        are earned or a reward is ready, and referral invitations. These automated emails keep
        customers engaged and coming back between purchases.
      </p>

      <Callout type="info">
        Everything here works with sensible defaults out of the box. You can fine-tune earn rates,
        rewards, review timing, and branding whenever you like — nothing has to be perfect on day
        one.
      </Callout>

      <H2>Related</H2>
      <ul>
        <li>
          <a href="/docs/getting-started/first-time-config">First-Time Setup</a>: the quick wizard
          that gets your program live
        </li>
        <li>
          <a href="/docs/loyalty/overview">Loyalty Program Overview</a>: how points, rewards, and
          tiers fit together
        </li>
        <li>
          <a href="/docs/reviews/overview">Reviews Overview</a>: collecting and displaying customer
          reviews
        </li>
        <li>
          <a href="/docs/loyalty/referrals">Referrals</a>: turn customers into advocates
        </li>
      </ul>
    </div>
  );
}
