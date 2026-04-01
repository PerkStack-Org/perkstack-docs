type PlanLevel = "free" | "growth" | "pro";

export default function PlanBadge({ plan }: { plan: PlanLevel }) {
  const labels: Record<PlanLevel, string> = {
    free: "Free",
    growth: "Growth",
    pro: "Pro",
  };

  return <span className={`plan-badge plan-${plan}`}>{labels[plan]}</span>;
}
