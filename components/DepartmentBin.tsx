"use client";

import Link from "next/link";
import { Rack } from "@/lib/types";
import { hapticTap } from "@/lib/haptics";

export default function DepartmentBin({ rack }: { rack: Rack }) {
  const dim = rack.comingSoon;
  // Grab up to 2 tools to show through the frosted lid, just like your mockup
  const previewTools = rack.tools ? rack.tools.slice(0, 2) : [];
  const remainingCount = rack.tools ? rack.tools.length - 2 : 0;

  const content = (
    <div
      className={`relative w-full aspect-[4/3] perspective-[800px] group select-none transition-transform duration-300 ${
        !dim ? "hover:-translate-y-1.5 hover:scale-[1.03] active:-translate-y-0.5 active:scale-[0.99]" : ""
      }`}
    >
      {/* Ambient shelf glow behind the glass, suggesting light from above */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-white/50 to-transparent" />

      {/* Preview tools — seen through the frosted lid, sharpening on tap */}
      <div className="absolute top-[16%] left-[10%] right-[10%] bottom-[30%] z-0 flex flex-col justify-end gap-1 pointer-events-none perspective-[400px]">
        {!dim && previewTools.length > 0 ? (
          previewTools.map((tool, idx) => (
            <div
              key={tool.slug || idx}
              className="bg-white/90 text-graphite px-1.5 py-0.5 sm:py-1 sm:px-2 rounded shadow-sm transform rotate-x-[10deg] transition-all duration-200 group-hover:rotate-x-0 group-active:rotate-x-0"
            >
              <span className="block font-display uppercase text-[8px] sm:text-[10px] tracking-wide truncate font-bold">
                {tool.name}
              </span>
            </div>
          ))
        ) : !dim ? (
          <div className="w-full rounded bg-black/30 px-2 py-1 text-center">
            <span className="text-[8px] uppercase tracking-widest text-neutral-300 font-bold">
              Empty
            </span>
          </div>
        ) : null}

        {!dim && remainingCount > 0 && (
          <div className="text-center text-[8px] font-bold text-white/90 bg-black/30 py-0.5 rounded mt-0.5">
            +{remainingCount} MORE
          </div>
        )}
      </div>

      {/* Frosted acrylic lid — the signature element */}
      <div
        className={`absolute inset-0 rounded-2xl z-10 ${dim ? "frosted-bin-dim" : "frosted-bin"}`}
      />

      {/* Department label, etched into the glass */}
      <div
        className={`absolute bottom-2.5 left-1/2 -translate-x-1/2 z-20 px-3 py-1 rounded-full text-[8px] sm:text-[9px] font-display font-extrabold uppercase tracking-widest whitespace-nowrap backdrop-blur-sm border pointer-events-none ${
          dim
            ? "bg-white/25 border-white/40 text-neutral-700"
            : "bg-white/10 border-white/25 text-white"
        }`}
      >
        {rack.name}
      </div>
    </div>
  );

  if (dim) {
    return <div className="h-full opacity-75 cursor-not-allowed">{content}</div>;
  }

  return (
    <Link href={`/departments/${rack.slug}`} className="block group" onClick={hapticTap}>
      <div className="tactile transition-transform group-active:scale-95">
        {content}
      </div>
    </Link>
  );
}
