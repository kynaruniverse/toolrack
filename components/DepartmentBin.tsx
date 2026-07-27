import Link from "next/link";
import { Rack } from "@/lib/types";

export default function DepartmentBin({ rack }: { rack: Rack }) {
  const dim = rack.comingSoon;
  // Grab up to 2 tools to show on the physical cards, just like your mockup
  const previewTools = rack.tools ? rack.tools.slice(0, 2) : [];
  const remainingCount = rack.tools ? rack.tools.length - 2 : 0;

  // ToolRack Palettes
  const binBack = dim
    ? "bg-gradient-to-b from-neutral-400 to-neutral-500" // Muted for Coming Soon
    : "bg-gradient-to-b from-neutral-800 to-black";      // Deep shadow for Live

  const binFront = dim
    ? "bg-gradient-to-b from-concrete-dark to-neutral-400"
    : "bg-gradient-to-b from-[#3A3F45] to-graphite";       // Molded Graphite for Live

  const content = (
    <div
      // aspect-[4/3] keeps them perfectly proportioned and smaller within your 3-column grid
      className={`relative w-full aspect-[4/3] perspective-[800px] group select-none transition-transform duration-300 ${
        !dim && "hover:-translate-y-1.5 hover:scale-[1.03] active:-translate-y-0.5 active:scale-[0.99]"
      }`}
    >
      {/* LAYER 1: Interior Back Wall */}
      <div
        className={`absolute inset-0 rounded-[12px_12px_8px_8px] shadow-[inset_0_4px_12px_rgba(0,0,0,0.6)] z-0 ${binBack}`}
      />

      {/* LAYER 2: Middle Content Sandwich Layer (The Cards) */}
      <div className="absolute top-[15%] left-[8%] right-[8%] bottom-[20%] z-10 flex flex-col justify-end gap-1 pointer-events-none perspective-[400px]">
        {!dim && previewTools.length > 0 ? (
          previewTools.map((tool, idx) => (
            <div
              key={tool.slug || idx}
              // Translating your rotateX(12deg) into arbitrary Tailwind values
              className="pointer-events-auto bg-white text-graphite px-1.5 py-0.5 sm:py-1 sm:px-2 rounded shadow-md transform rotate-x-[12deg] transition-all duration-200 group-hover:rotate-x-0 group-hover:scale-[1.04] group-hover:shadow-lg"
            >
              <span className="block font-display uppercase text-[7px] sm:text-[9px] tracking-wide truncate font-bold">
                {tool.name}
              </span>
            </div>
          ))
        ) : !dim ? (
          <div className="w-full rounded bg-black/40 px-2 py-1 text-center backdrop-blur-sm">
            <span className="text-[7px] uppercase tracking-widest text-neutral-400 font-bold">
              Empty
            </span>
          </div>
        ) : null}

        {/* The Overflow Badge from your HTML mockup */}
        {!dim && remainingCount > 0 && (
          <div className="text-center text-[7px] font-bold text-white/90 bg-black/40 py-0.5 rounded backdrop-blur-sm mt-0.5">
            +{remainingCount} MORE
          </div>
        )}
      </div>

      {/* LAYER 3: Front Plastic Lip (With your exact Cutout Scoop) */}
      <div
        className={`absolute left-0 right-0 bottom-0 h-[62%] z-20 rounded-[0_0_12px_12px] shadow-[inset_0_1px_0_rgba(255,255,255,0.1),_0_10px_20px_rgba(0,0,0,0.4)] pointer-events-none ${binFront}`}
        style={{
          clipPath: "polygon(0 0, 20% 0, 25% 35%, 75% 35%, 80% 0, 100% 0, 100% 100%, 0 100%)",
        }}
      />

      {/* LAYER 4: Brand Badge Label (Anchored to bottom center) */}
      <div
        className={`absolute bottom-1.5 sm:bottom-2 left-1/2 -translate-x-1/2 z-30 px-2 sm:px-3 py-0.5 rounded-full text-[6px] sm:text-[7px] font-display font-extrabold uppercase tracking-widest whitespace-nowrap shadow-md pointer-events-none backdrop-blur-md ${
          dim
            ? "bg-neutral-500/40 text-neutral-600 border border-neutral-400/30"
            : "bg-black/60 text-white border border-white/10"
        }`}
      >
        {rack.name}
      </div>
    </div>
  );

  if (dim) {
    return <div className="h-full opacity-60 cursor-not-allowed">{content}</div>;
  }

  return (
    <Link href={`/departments/${rack.slug}`} className="block h-full outline-none focus-visible:ring-2 focus-visible:ring-safety rounded-xl">
      {content}
    </Link>
  );
}
