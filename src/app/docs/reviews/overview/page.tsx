import type { Metadata } from "next";
import { createDocMetadata } from "@/lib/seo";
import { H2 } from "@/components/Heading";
import Callout from "@/components/Callout";

export const metadata: Metadata = createDocMetadata("/docs/reviews/overview", {
  title: "Overview",
  description:
    "Collect product reviews on your Shopify store: how the review form works, submission rules, auto-approval, and how reviews earn loyalty points.",
});

export default function ReviewsOverviewPage() {
  return (
    <div className="docs-prose">
      <h1>Overview</h1>
      <p>
        PerkStack collects star-rated product reviews right on your product pages, then turns them
        into social proof and repeat business. Shoppers rate what they bought, other shoppers trust
        those ratings, and reviewers earn loyalty points that bring them back to buy again.
      </p>

      <H2>How customers leave a review</H2>
      <p>
        Reviews are written through the review form you add to your product pages. On it, a customer
        provides:
      </p>
      <ul>
        <li>
          A <strong>star rating</strong> from 1 to 5
        </li>
        <li>
          A short <strong>title</strong> (optional, unless you choose to require it)
        </li>
        <li>
          The <strong>review text</strong> itself
        </li>
        <li>
          One or more <strong>photos</strong> (optional, on paid plans)
        </li>
      </ul>
      <p>
        When they submit, the review either publishes right away or waits for your approval,
        depending on your moderation settings.
      </p>

      <H2>Submission rules</H2>
      <p>A few rules keep reviews genuine and keep spam out. In plain terms:</p>
      <ul>
        <li>
          <strong>Customers must be signed in.</strong> Reviews are tied to a real customer account,
          which is also how PerkStack knows whether the reviewer actually bought the product.
        </li>
        <li>
          <strong>One review per product, per customer.</strong> A shopper can review a product
          once. If they try again, they&apos;re told they&apos;ve already reviewed it.
        </li>
        <li>
          <strong>A minimum review length.</strong> The review text has to be at least a handful of
          characters (10 by default) so one-word entries don&apos;t slip through. You can raise this
          minimum on the review form.
        </li>
      </ul>
      <p>
        Customers can also delete their own review if they change their mind, which you can turn off
        in the review display settings.
      </p>

      <H2>Auto-approval</H2>
      <p>
        You don&apos;t have to approve every review by hand. A review publishes instantly when it
        meets your <strong>auto-approve threshold</strong> (4 stars by default) and contains no
        blacklisted words. That means clean 4- and 5-star reviews go live the moment they&apos;re
        submitted, while lower ratings or flagged reviews wait in your moderation queue for a quick
        look.
      </p>

      <Callout type="tip">
        Only approved reviews are ever shown on your storefront, so nothing appears publicly before
        you&apos;ve had the chance to see it.
      </Callout>

      <H2>Reviews and loyalty points</H2>
      <p>
        This is the flywheel that makes reviews compound. When a review is approved, the reviewer
        earns loyalty points. Those points pull the customer back to your store to redeem them,
        where they buy again, become eligible to review again, and leave more social proof for the
        next shopper. Text reviews earn points on every plan; awarding a bonus for photo reviews is
        available on paid plans.
      </p>
      <p>
        Point amounts come from your loyalty earn rules, not from review settings, so you decide how
        generous the reward is.
      </p>

      <H2>Related</H2>
      <ul>
        <li>
          <a href="/docs/reviews/review-requests">Review Request Emails</a>: automatically ask
          customers to review what they bought
        </li>
        <li>
          <a href="/docs/reviews/photo-reviews">Photo Reviews</a>: let customers add photos for
          stronger social proof
        </li>
        <li>
          <a href="/docs/reviews/moderation">Moderation</a>: approve, reply to, and feature reviews
        </li>
        <li>
          <a href="/docs/reviews/seo">SEO &amp; Rich Snippets</a>: show star ratings in Google
          search results
        </li>
        <li>
          <a href="/docs/loyalty/earn-rules">Ways to Earn</a>: set the points a review is worth
        </li>
      </ul>
    </div>
  );
}
