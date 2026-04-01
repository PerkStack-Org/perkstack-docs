"use client";

import { useState } from "react";
import { Gift, Star, Users, ShoppingBag, X, ChevronRight } from "lucide-react";
import PhoneFrame from "../PhoneFrame";

function MockStorePage({ onOpen }: { onOpen: () => void }) {
  return (
    <div className="relative h-[400px] bg-lp-surface overflow-hidden">
      <div className="p-4 space-y-3">
        <div className="h-3 w-32 bg-lp-bg-alt rounded" />
        <div className="h-32 bg-lp-bg-alt rounded-lg" />
        <div className="h-3 w-48 bg-lp-bg-alt rounded" />
        <div className="h-3 w-40 bg-lp-bg-alt rounded" />
        <div className="h-3 w-44 bg-lp-bg-alt rounded" />
        <div className="h-8 w-full bg-lp-bg-alt rounded-lg" />
      </div>
      <button
        onClick={onOpen}
        className="absolute bottom-4 right-4 w-12 h-12 rounded-full bg-gradient-to-br from-ps-accent to-ps-accent-light text-white shadow-lg flex items-center justify-center hover:scale-105 transition-transform"
      >
        <Gift size={20} />
      </button>
    </div>
  );
}

function MockPanel({ onClose }: { onClose: () => void }) {
  return (
    <div className="h-[400px] bg-lp-surface overflow-hidden flex flex-col animate-in">
      <div className="bg-gradient-to-br from-ps-accent to-ps-accent-light p-4 text-white">
        <div className="flex items-center justify-between mb-3">
          <span className="text-[13px] font-semibold">PerkStack Rewards</span>
          <button onClick={onClose} className="text-white/70 hover:text-white">
            <X size={16} />
          </button>
        </div>
        <div className="text-center py-2">
          <div className="text-3xl font-bold">1,250</div>
          <div className="text-[12px] text-white/80">Available Points</div>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-3 space-y-2">
        <div className="text-[11px] font-semibold text-lp-text-muted uppercase tracking-wider mb-1">
          Ways to Earn
        </div>
        {[
          { icon: ShoppingBag, label: "Place an order", points: "5pts / $1" },
          { icon: Star, label: "Write a review", points: "+100 pts" },
          { icon: Users, label: "Refer a friend", points: "+500 pts" },
        ].map(({ icon: Icon, label, points }) => (
          <div key={label} className="flex items-center gap-2.5 p-2 rounded-lg bg-lp-bg-alt">
            <div className="w-7 h-7 rounded-full bg-ps-accent/10 flex items-center justify-center">
              <Icon size={13} className="text-ps-accent" />
            </div>
            <div className="flex-1">
              <div className="text-[12px] font-medium text-lp-text">{label}</div>
              <div className="text-[11px] text-lp-text-muted">{points}</div>
            </div>
            <ChevronRight size={12} className="text-lp-text-muted" />
          </div>
        ))}
        <div className="text-[11px] font-semibold text-lp-text-muted uppercase tracking-wider mt-3 mb-1">
          Rewards
        </div>
        {[
          { label: "$5 Off", cost: "500 pts" },
          { label: "Free Shipping", cost: "750 pts" },
          { label: "$15 Off", cost: "1,500 pts" },
        ].map(({ label, cost }) => (
          <div
            key={label}
            className="flex items-center justify-between p-2 rounded-lg bg-lp-bg-alt"
          >
            <div>
              <div className="text-[12px] font-medium text-lp-text">{label}</div>
              <div className="text-[11px] text-lp-text-muted">{cost}</div>
            </div>
            <button className="px-2 py-0.5 text-[11px] font-medium bg-ps-accent text-white rounded-md">
              Redeem
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function LoyaltyLauncherPreview() {
  const [open, setOpen] = useState(false);

  return (
    <PhoneFrame>
      {open ? (
        <MockPanel onClose={() => setOpen(false)} />
      ) : (
        <MockStorePage onOpen={() => setOpen(true)} />
      )}
    </PhoneFrame>
  );
}
