import { ToolIconName } from "@/lib/types";

// Small line-art marks, one per tool, drawn to sit on the pegboard/hook-card
// visual language (thin strokes, currentColor so callers set the tint).
// Add a case here whenever a new ToolIconName is added in lib/types.ts.

export default function ToolIcon({
  name,
  className = "w-6 h-6",
}: {
  name: ToolIconName;
  className?: string;
}) {
  const common = {
    className,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.6,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  switch (name) {
    case "concrete":
      // A trowel: blade + handle
      return (
        <svg {...common}>
          <path d="M4 15 L14 5 L19 10 L9 20 Z" />
          <path d="M15 4 L20 9" />
        </svg>
      );
    case "brick":
      // Stacked bricks with offset joint
      return (
        <svg {...common}>
          <rect x="3" y="5" width="8" height="6" />
          <rect x="11" y="5" width="10" height="6" />
          <rect x="3" y="13" width="10" height="6" />
          <rect x="13" y="13" width="8" height="6" />
        </svg>
      );
    case "rebar":
      // A twisted/ridged bar
      return (
        <svg {...common}>
          <path d="M6 20 L18 4" />
          <path d="M8 17 L11 17" />
          <path d="M11.5 13 L14.5 13" />
          <path d="M15 9 L18 9" />
        </svg>
      );
    case "excavation":
      // A shovel
      return (
        <svg {...common}>
          <path d="M17 3 L7 13" />
          <path d="M4 20 c-1.2-1.6-1-4 1-5.3 c1.7-1 3.7-.6 4.9.7 c1.4 1.5 1 3.7-.6 4.9 C7.9 21 5.3 21.6 4 20 Z" />
        </svg>
      );
    case "unit-converter":
      // Two opposing arrows, metric <-> imperial
      return (
        <svg {...common}>
          <path d="M4 8 H18" />
          <path d="M14 4 L18 8 L14 12" />
          <path d="M20 16 H6" />
          <path d="M10 12 L6 16 L10 20" />
        </svg>
      );
    case "material-cost":
      // A coin/tag stack for cost
      return (
        <svg {...common}>
          <circle cx="9" cy="9" r="6" />
          <path d="M7.5 6.7 c0-1 1-1.5 1.9-1.2 c.7.2 1 .8.8 1.4 c-.2.5-.8.7-1.4.9 c-.7.2-1.5.5-1.3 1.3 c.2.7 1.1 1 1.9.8 c.7-.2 1.1-.6 1.1-1.2" />
          <path d="M13 15 h6 M16 12 v6" />
        </svg>
      );
  }
}
