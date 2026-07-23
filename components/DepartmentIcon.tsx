import { DepartmentIconName } from "@/lib/types";

// One mark per department bin on the homepage. Kept visually simpler/bolder
// than ToolIcon's marks since these render small, on a solid bin colour.

export default function DepartmentIcon({
  name,
  className = "w-6 h-6",
}: {
  name: DepartmentIconName;
  className?: string;
}) {
  const common = {
    className,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  switch (name) {
    case "construction":
      // Hard hat
      return (
        <svg {...common}>
          <path d="M3 17 a9 6 0 0 1 18 0 Z" />
          <path d="M12 8 V5" />
          <path d="M2.5 17 H21.5" />
        </svg>
      );
    case "plumbing":
      // Pipe wrench
      return (
        <svg {...common}>
          <path d="M8 16 L17 7" />
          <path d="M5 19 a3 3 0 1 0 3-3" />
          <path d="M14 4 h5 v5 h-3 v-2 h-2 Z" />
        </svg>
      );
    case "catering":
      // Chef's hat
      return (
        <svg {...common}>
          <path d="M6 21 h12" />
          <path d="M7 21 V13.5" />
          <path d="M17 21 V13.5" />
          <path d="M6 12 c-2-1-2.5-4 .3-5 c.2-2 2.4-3 3.7-1.5 c1-2 3.3-2 4.3 0 c1.3-.3 3.3.5 3.5 2.5 c2.5.7 2.3 4 .2 5 Z" />
        </svg>
      );
    case "business":
      // Briefcase
      return (
        <svg {...common}>
          <rect x="3" y="8" width="18" height="12" rx="1.5" />
          <path d="M9 8 V6 a2 2 0 0 1 2-2 h2 a2 2 0 0 1 2 2 v2" />
          <path d="M3 13 h18" />
        </svg>
      );
    case "electrician":
      // Bolt
      return (
        <svg {...common}>
          <path d="M13 3 L5 14 h5 l-1 7 l8-11 h-5 Z" />
        </svg>
      );
  }
}
