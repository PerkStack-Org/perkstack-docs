"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Clock } from "lucide-react";

const WORDS_PER_MINUTE = 225;

export default function ReadingTime() {
  const pathname = usePathname();
  const [minutes, setMinutes] = useState<number | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      const prose = document.querySelector(".docs-prose");
      if (!prose) return;
      const text = prose.textContent ?? "";
      const wordCount = text.split(/\s+/).filter(Boolean).length;
      setMinutes(Math.max(1, Math.ceil(wordCount / WORDS_PER_MINUTE)));
    }, 120);
    return () => clearTimeout(timer);
  }, [pathname]);

  if (minutes === null) return null;

  return (
    <span className="inline-flex items-center gap-1.5 text-[13px] text-lp-text-muted">
      <Clock size={13} />
      <span>{minutes} min read</span>
    </span>
  );
}
