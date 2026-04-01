"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { ThumbsUp, ThumbsDown, Check } from "lucide-react";

type Vote = "up" | "down" | null;

function getStorageKey(pathname: string) {
  return `perkstack-docs-feedback:${pathname}`;
}

export default function FeedbackWidget() {
  const pathname = usePathname();
  const [_vote, setVote] = useState<Vote>(null);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(getStorageKey(pathname));
    if (stored === "up" || stored === "down") {
      setVote(stored);
      setSubmitted(true);
    } else {
      setVote(null);
      setSubmitted(false);
    }
  }, [pathname]);

  const handleVote = (v: Vote) => {
    setVote(v);
    setSubmitted(true);
    if (v) localStorage.setItem(getStorageKey(pathname), v);
  };

  return (
    <div className="mt-10 pt-6 border-t border-lp-border-muted">
      <div className="flex items-center gap-3">
        {submitted ? (
          <div className="flex items-center gap-2 text-sm text-lp-text-secondary animate-in">
            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-success/10 text-success">
              <Check size={14} />
            </span>
            <span>Thanks for your feedback!</span>
          </div>
        ) : (
          <>
            <span className="text-sm text-lp-text-muted">Was this page helpful?</span>
            <div className="flex gap-1.5">
              <button
                onClick={() => handleVote("up")}
                className="flex items-center gap-1.5 px-2.5 py-1 text-[13px] rounded-lg border border-lp-border-muted text-lp-text-secondary hover:text-success hover:border-success/30 hover:bg-success/5 transition-all"
              >
                <ThumbsUp size={13} />
                Yes
              </button>
              <button
                onClick={() => handleVote("down")}
                className="flex items-center gap-1.5 px-2.5 py-1 text-[13px] rounded-lg border border-lp-border-muted text-lp-text-secondary hover:text-error hover:border-error/30 hover:bg-error/5 transition-all"
              >
                <ThumbsDown size={13} />
                No
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
