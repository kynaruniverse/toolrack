import Link from "next/link";
import { Rack } from "@/lib/types";
import ReadoutChip from "@/components/ReadoutChip";

export default function DepartmentBin({ rack }: { rack: Rack }) {
  const dim = rack.comingSoon;
  // Grab up to 2 tools to display as "cards" inside the pocket slot
  const previewTools = rack.tools ? rack.tools.slice(0, 2) : [];

  const content = (
    <div
      className={`group relative flex flex-col justify-between overflow-hidden rounded-xl border-2 transition-all duration-200 ${
        dim
          ? "border-concrete-dark bg-concrete/40 opacity-60 cursor-not-allowed"
          : "border-graphite bg-graphite shadow-sm hover:-translate-y-1 hover:shadow-md hover:border-safety"
      }`}
      style={{ minHeight: "180px" }}
    >
      {/* Top Section: "Back Wall" with Tool Cards Peeking Out */}
      <div className="relative w-full bg-neutral-800 p-2.5 pt-3 flex flex-col gap-1.5 min-h-[90px] justify-end">
        {!dim && previewTools.length > 0 ? (
          previewTools.map((tool, idx) => (
            <div
              key={tool.slug || idx}
              className={`w-full rounded bg-white px-2 py-1 shadow-sm transition-transform duration-200 ${
                idx === 0
                  ? "z-10 group-hover:-translate-y-1"
                  : "z-0 opacity-80 scale-95 group-hover:-translate-y-0.5"
              }`}
            >
              <p className="font-display uppercase text-[10px] tracking-wide text-graphite truncate font-bold">
                {tool.name}
              </p>
            </div>
          ))
        ) : (
          <div className="w-full rounded bg-neutral-700/50 px-2 py-1 text-center">
            <span className="text-[10px] uppercase tracking-widest text-neutral-400 font-semibold">
              {dim ? "Off Duty" : "Empty Slot"}
            </span>
          </div>
        )}
      </div>

      {/* Front Pocket Lip (Overlaps the top section) */}
      <div className="relative z-20 flex-1 border-t-2 border-concrete-dark bg-graphite p-2.5 flex flex-col items-center justify-between text-center">
        {/* Department Name */}
        <div>
          <span className="block font-display text-lg font-bold uppercase tracking-wide text-white leading-tight">
            {rack.code}
          </span>
          <span className="block text-[9px] uppercase tracking-wider text-neutral-400 font-semibold mt-0.5">
            {rack.name}
          </span>
        </div>

        {/* Readout Chip at bottom */}
        <div className="mt-2">
          {dim ? (
            <ReadoutChip label="Soon" />
          ) : (
            <ReadoutChip
              value={rack.tools.length}
              label={rack.tools.length === 1 ? "tool" : "tools"}
            />
          )}
        </div>
      </div>
    </div>
  );

  if (dim) {
    return <div className="h-full">{content}</div>;
  }

  return (
    <Link href={`/departments/${rack.slug}`} className="block h-full">
      {content}
    </Link>
  );
}
