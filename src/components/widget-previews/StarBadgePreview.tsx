import { Star } from "lucide-react";
import PhoneFrame from "../PhoneFrame";

export default function StarBadgePreview() {
  return (
    <PhoneFrame>
      <div className="h-[400px] bg-lp-surface overflow-hidden p-4">
        <div className="space-y-4">
          <div className="h-40 bg-lp-bg-alt rounded-lg" />

          <div>
            <div className="text-[13px] font-semibold text-lp-text mb-1">
              Premium Skincare Serum
            </div>

            <div className="inline-flex items-center gap-1.5 px-2 py-1 rounded-full bg-warning/10 border border-warning/20 mb-2">
              <div className="flex gap-0.5">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star
                    key={i}
                    size={11}
                    className={
                      i <= 4 ? "fill-warning text-warning" : "fill-warning/30 text-warning/30"
                    }
                  />
                ))}
              </div>
              <span className="text-[11px] font-semibold text-warning">4.8</span>
              <span className="text-[11px] text-lp-text-muted">(127 reviews)</span>
            </div>

            <div className="text-[14px] font-bold text-lp-text">$49.99</div>
          </div>

          <div className="h-px bg-lp-border-muted" />

          <div className="space-y-2">
            <div className="h-2.5 w-full bg-lp-bg-alt rounded" />
            <div className="h-2.5 w-5/6 bg-lp-bg-alt rounded" />
            <div className="h-2.5 w-4/6 bg-lp-bg-alt rounded" />
          </div>

          <button className="w-full h-10 text-[12px] font-medium bg-lp-text text-lp-bg rounded-lg">
            Add to Cart
          </button>
        </div>
      </div>
    </PhoneFrame>
  );
}
