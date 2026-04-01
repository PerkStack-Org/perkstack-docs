import { Star, Camera, ChevronLeft, ChevronRight } from "lucide-react";
import PhoneFrame from "../PhoneFrame";

const carouselReviews = [
  { name: "Alex P.", rating: 5, text: "Amazing quality!", color: "bg-ps-accent/10" },
  { name: "Nina S.", rating: 5, text: "My favourite purchase", color: "bg-success/10" },
  { name: "Tom D.", rating: 4, text: "Great product overall", color: "bg-info/10" },
];

export default function ReviewCarouselPreview() {
  return (
    <PhoneFrame>
      <div className="h-[400px] bg-lp-surface overflow-hidden">
        <div className="p-4 space-y-3">
          <div className="h-3 w-40 bg-lp-bg-alt rounded" />
          <div className="h-24 bg-lp-bg-alt rounded-lg" />
          <div className="h-3 w-48 bg-lp-bg-alt rounded" />
        </div>

        <div className="px-4 py-2">
          <div className="flex items-center justify-between mb-2">
            <div className="text-[12px] font-semibold text-lp-text">What customers say</div>
            <div className="flex gap-1">
              <button className="w-5 h-5 rounded-full border border-lp-border-muted flex items-center justify-center text-lp-text-muted">
                <ChevronLeft size={10} />
              </button>
              <button className="w-5 h-5 rounded-full border border-lp-border-muted flex items-center justify-center text-lp-text-muted">
                <ChevronRight size={10} />
              </button>
            </div>
          </div>

          <div className="flex gap-2 overflow-hidden">
            {carouselReviews.map((review) => (
              <div
                key={review.name}
                className="flex-shrink-0 w-[140px] p-2.5 rounded-xl border border-lp-border-muted bg-lp-bg-alt"
              >
                <div
                  className={`w-full h-16 ${review.color} rounded-lg mb-2 flex items-center justify-center`}
                >
                  <Camera size={16} className="text-lp-text-muted" />
                </div>
                <div className="flex gap-0.5 mb-1">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star
                      key={i}
                      size={9}
                      className={
                        i <= review.rating ? "fill-warning text-warning" : "text-lp-border"
                      }
                    />
                  ))}
                </div>
                <p className="text-[10px] text-lp-text-secondary leading-relaxed">
                  &ldquo;{review.text}&rdquo;
                </p>
                <div className="text-[9px] text-lp-text-muted mt-1">&mdash; {review.name}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="px-4 pt-3">
          <div className="flex justify-center gap-1">
            <div className="w-4 h-1 rounded-full bg-ps-accent" />
            <div className="w-1 h-1 rounded-full bg-lp-border" />
            <div className="w-1 h-1 rounded-full bg-lp-border" />
          </div>
        </div>
      </div>
    </PhoneFrame>
  );
}
