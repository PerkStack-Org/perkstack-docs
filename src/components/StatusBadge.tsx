interface StatusBadgeProps {
  status: "new" | "beta" | "deprecated";
}

const config = {
  new: { label: "NEW", className: "status-badge-new" },
  beta: { label: "BETA", className: "status-badge-beta" },
  deprecated: { label: "DEPRECATED", className: "status-badge-deprecated" },
};

export default function StatusBadge({ status }: StatusBadgeProps) {
  const { label, className } = config[status];
  return <span className={`status-badge ${className}`}>{label}</span>;
}
