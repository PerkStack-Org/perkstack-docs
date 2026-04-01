"use client";

import { useState } from "react";
import { Star, Upload } from "lucide-react";
import PhoneFrame from "../PhoneFrame";

export default function ReviewFormPreview() {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  return (
    <PhoneFrame>
      <div className="h-[400px] bg-lp-surface overflow-y-auto p-4">
        <div className="text-[13px] font-semibold text-lp-text mb-3">Write a Review</div>

        <div className="space-y-3">
          <div>
            <label className="text-[11px] font-medium text-lp-text-secondary mb-1 block">
              Rating
            </label>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((i) => (
                <button
                  key={i}
                  onMouseEnter={() => setHover(i)}
                  onMouseLeave={() => setHover(0)}
                  onClick={() => setRating(i)}
                  className="transition-transform hover:scale-110"
                >
                  <Star
                    size={20}
                    className={
                      i <= (hover || rating)
                        ? "fill-warning text-warning"
                        : "text-lp-border hover:text-warning/50"
                    }
                  />
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-[11px] font-medium text-lp-text-secondary mb-1 block">
              Title
            </label>
            <input
              type="text"
              placeholder="Summarise your experience"
              className="w-full h-8 px-2.5 text-[12px] rounded-md border border-lp-border-muted bg-lp-bg-alt text-lp-text placeholder:text-lp-text-muted outline-none focus:border-ps-accent transition-colors"
              readOnly
            />
          </div>

          <div>
            <label className="text-[11px] font-medium text-lp-text-secondary mb-1 block">
              Review
            </label>
            <textarea
              placeholder="Tell others about your experience..."
              rows={3}
              className="w-full px-2.5 py-1.5 text-[12px] rounded-md border border-lp-border-muted bg-lp-bg-alt text-lp-text placeholder:text-lp-text-muted outline-none focus:border-ps-accent transition-colors resize-none"
              readOnly
            />
          </div>

          <div>
            <label className="text-[11px] font-medium text-lp-text-secondary mb-1 block">
              Photos
            </label>
            <div className="flex gap-2">
              <div className="w-16 h-16 rounded-lg border-2 border-dashed border-lp-border-muted flex flex-col items-center justify-center gap-1 text-lp-text-muted hover:border-ps-accent hover:text-ps-accent transition-colors cursor-pointer">
                <Upload size={14} />
                <span className="text-[9px]">Upload</span>
              </div>
            </div>
          </div>

          <button className="w-full h-9 text-[12px] font-medium bg-gradient-to-r from-ps-accent to-ps-accent-light text-white rounded-lg hover:shadow-md transition-shadow">
            Submit Review
          </button>
        </div>
      </div>
    </PhoneFrame>
  );
}
