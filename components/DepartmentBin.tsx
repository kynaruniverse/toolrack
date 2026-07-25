import Link from "next/link";
import { Rack } from "@/lib/types";

// Live tags use a kraft-cardstock tan; coming-soon tags use a muted grey
// cardstock. Set as CSS custom properties so app/globals.css only defines
// the tag's shape/shadow once.
const LIVE_COLORS = {
  "--tag-bg": "#E4C89A",
  "--tag-string": "#8A7A5C",
  "--tag-ink": "#5C4A2E",
} as React.CSSProperties;

const DIM_COLORS = {
  "--tag-bg": "#CFCAC0",
  "--tag-string": "#9A958C",
  "--tag-ink": "#8A8580",
} as React.CSSProperties;

export default function DepartmentBin({ rack }: { rack: Rack }) {
  const dim = rack.comingSoon;

  const content = (
    <div className="pt-4">
      <div className="hang-tag" style={dim ? DIM_COLORS : LIVE_COLORS}>
        <div className="hang-tag-string" />
        <div className="hang-tag-hole" />
        <div className="flex flex-col items-center justify-center h-full pt-[18%] px-2">
          <span className="hang-tag-code font-display text-2xl font-bold leading-none">
            {rack.code}
          </span>
          <span className="hang-tag-name font-display uppercase text-[10px] tracking-wide mt-1.5 text-center">
            {rack.name}
          </span>
        </div>
      </div>
      <p className="text-[10px] text-neutral-500 text-center mt-2">
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
