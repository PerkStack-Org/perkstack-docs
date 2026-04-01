"use client";

import { useTheme } from "./ThemeProvider";
import { Sun, Moon, Monitor } from "lucide-react";

const icons = {
  light: Sun,
  dark: Moon,
  system: Monitor,
};

const labels = {
  light: "Light",
  dark: "Dark",
  system: "System",
};

export default function ThemeToggle() {
  const { theme, cycle } = useTheme();
  const Icon = icons[theme];

  return (
    <button
      onClick={cycle}
      className="flex items-center justify-center w-8 h-8 rounded-md text-lp-text-secondary hover:text-lp-text hover:bg-lp-bg-alt transition-colors"
      aria-label={`Theme: ${labels[theme]}. Click to change.`}
      title={`Theme: ${labels[theme]}`}
    >
      <Icon size={16} />
    </button>
  );
}
