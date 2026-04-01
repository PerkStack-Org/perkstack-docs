import { Info, AlertTriangle, Lightbulb, AlertCircle } from "lucide-react";

type CalloutType = "info" | "warning" | "tip" | "danger";

const icons: Record<CalloutType, React.ReactNode> = {
  info: <Info size={18} className="text-info flex-shrink-0 mt-0.5" />,
  warning: <AlertTriangle size={18} className="text-warning flex-shrink-0 mt-0.5" />,
  tip: <Lightbulb size={18} className="text-success flex-shrink-0 mt-0.5" />,
  danger: <AlertCircle size={18} className="text-error flex-shrink-0 mt-0.5" />,
};

export default function Callout({
  type = "info",
  children,
}: {
  type?: CalloutType;
  children: React.ReactNode;
}) {
  return (
    <div className={`callout callout-${type}`}>
      {icons[type]}
      <div>{children}</div>
    </div>
  );
}
