type PlanLevel = "free" | "essential" | "growth" | "studio";

export default function PlanBadge({ plan }: { plan: PlanLevel }) {
  const labels: Record<PlanLevel, string> = {
    free: "Free",
    essential: "Essential",
    growth: "Growth",
    studio: "Studio",
  };

  return <span className={`plan-badge plan-${plan}`}>{labels[plan]}</span>;
}
