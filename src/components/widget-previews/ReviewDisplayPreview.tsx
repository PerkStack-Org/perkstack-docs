import { Star, ThumbsUp, CheckCircle2, Camera } from "lucide-react";
import PhoneFrame from "../PhoneFrame";

const reviews = [
  {
    name: "Sarah M.",
    rating: 5,
    date: "2 days ago",
    verified: true,
    text: "Absolutely love this product! The quality exceeded my expectations.",
    helpful: 12,
    photo: true,
  },
  {
    name: "James K.",
    rating: 4,
    date: "1 week ago",
    verified: true,
    text: "Great value for the price. Shipping was fast and packaging was perfect.",
    helpful: 8,
    photo: false,
  },
  {
    name: "Emily R.",
    rating: 5,
    date: "2 weeks ago",
    verified: false,
    text: "This is exactly what I was looking for. Will definitely order again!",
    helpful: 5,
    photo: true,
  },
];

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          size={11}
          className={i <= rating ? "fill-warning text-warning" : "text-lp-border"}
        />
      ))}
    </div>
  );
}

export default function ReviewDisplayPreview() {
  return (
    <PhoneFrame>
      <div className="h-[400px] bg-lp-surface overflow-y-auto p-3">
        <div className="flex items-center justify-between mb-3">
          <div className="text-[13px] font-semibold text-lp-text">Customer Reviews</div>
          <div className="flex items-center gap-1">
            <Stars rating={5} />
            <span className="text-[11px] text-lp-text-muted">(47)</span>
          </div>
        </div>
        <div className="space-y-3">
          {reviews.map((review) => (
            <div
              key={review.name}
              className="p-2.5 rounded-lg border border-lp-border-muted bg-lp-bg-alt"
            >
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-1.5">
                  <div className="w-5 h-5 rounded-full bg-ps-accent/10 flex items-center justify-center text-[9px] font-bold text-ps-accent">
                    {review.name[0]}
                  </div>
                  <span className="text-[11px] font-medium text-lp-text">{review.name}</span>
                  {review.verified && <CheckCircle2 size={10} className="text-success" />}
                </div>
                <span className="text-[10px] text-lp-text-muted">{review.date}</span>
              </div>
              <Stars rating={review.rating} />
              <p className="text-[11px] text-lp-text-secondary mt-1.5 leading-relaxed">
                {review.text}
              </p>
              {review.photo && (
                <div className="mt-2 w-12 h-12 rounded-md bg-lp-border-muted flex items-center justify-center">
                  <Camera size={14} className="text-lp-text-muted" />
                </div>
              )}
              <div className="flex items-center gap-1 mt-2">
                <ThumbsUp size={10} className="text-lp-text-muted" />
                <span className="text-[10px] text-lp-text-muted">Helpful ({review.helpful})</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </PhoneFrame>
  );
}
