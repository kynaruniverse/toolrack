import Link from "next/link";
import { Rack } from "@/lib/types";
import DepartmentIcon from "@/components/DepartmentIcon";

// Live bins use the safety-amber palette; coming-soon bins use a muted
// gunmetal/graphite palette. Set as CSS custom properties so app/globals.css
// only has to define the bin's shape and shadows once.
const LIVE_COLORS = {
  "--bin-back-top": "#3A2A05",
  "--bin-back-bot": "#1C1F22",
  "--bin-front-top": "#FFDE85",
  "--bin-front-mid": "#FFC72C",
  "--bin-front-bot": "#C98A00",
} as React.CSSProperties;

const DIM_COLORS = {
  "--bin-back-top": "#33383D",
  "--bin-back-bot": "#1C1F22",
  "--bin-front-top": "#6B7076",
  "--bin-front-mid": "#53585D",
  "--bin-front-bot": "#3A3E42",
} as React.CSSProperties;

export default function DepartmentBin({ rack }: { rack: Rack }) {
  const dim = rack.comingSoon;

  const content = (
    <div>
      <div
        className="storage-bin h-32 w-full"
        style={dim ? DIM_COLORS : LIVE_COLORS}
      >
        <div className="bin-back" />
        <DepartmentIcon
          name={rack.icon}
          className={`absolute left-1/2 top-[30%] w-7 h-7 -translate-x-1/2 -translate-y-1/2 ${
            dim ? "text-neutral-400" : "text-white"
          }`}
        />
        <div className="bin-front" />
        <span className="bin-badge">{rack.name}</span>
      </div>
      <p className="text-[10px] text-neutral-500 text-center mt-1.5">
        {rack.tagline}
      </p>
    </div>
  );

  if (dim) {
    return <div className="opacity-90">{content}</div>;
  }

  return (
    <Link href={`/departments/${rack.slug}`} className="block group">
      <div className="transition-transform group-active:scale-95">
        {content}
      </div>
    </Link>
  );
}
