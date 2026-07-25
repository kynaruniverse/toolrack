import Link from "next/link";
import { Rack } from "@/lib/types";
import DepartmentIcon from "@/components/DepartmentIcon";

// Live drawers use the safety-amber palette (dark text/icon for contrast on
// the bright background); coming-soon drawers use a muted gunmetal palette.
const LIVE_COLORS = {
  "--drawer-bg": "#FFC72C",
  "--drawer-handle": "#C98A00",
} as React.CSSProperties;

const DIM_COLORS = {
  "--drawer-bg": "#33383D",
  "--drawer-handle": "#24272B",
} as React.CSSProperties;

export default function DepartmentBin({ rack }: { rack: Rack }) {
  const dim = rack.comingSoon;

  const content = (
    <div>
      <div
        className="drawer h-28 w-full"
        style={dim ? DIM_COLORS : LIVE_COLORS}
      >
        <div className="drawer-handle" />
        <DepartmentIcon
          name={rack.icon}
          className={`absolute left-1/2 top-1/2 w-7 h-7 -translate-x-1/2 -translate-y-1/2 ${
            dim ? "text-neutral-400" : "text-graphite"
          }`}
        />
        <span
          className={`drawer-label ${
            dim ? "text-neutral-300" : "text-graphite"
          }`}
        >
          {rack.name}
        </span>
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
