import Link from "next/link";
import { Rack } from "@/lib/types";
import ReadoutChip from "@/components/ReadoutChip";

export default function DepartmentBin({ rack }: { rack: Rack }) {
  const dim = rack.comingSoon;

  const content = (
    <div
      className={`relative flex h-full flex-col items-center justify-between rounded-xl border-2 p-5 transition-all ${
        dim
          ? "border-concrete-dark bg-concrete/40 opacity-70"
          : "border-concrete-dark bg-white group-hover:-translate-y-0.5 group-hover:border-graphite group-hover:shadow-md"
      }`}
    >
      <div className="flex flex-col items-center justify-center mb-5 mt-1">
        <span
          className={`font-display text-4xl font-bold uppercase tracking-tight ${
            dim ? "text-neutral-400" : "text-graphite"
          }`}
        >
          {rack.code}
        </span>
        <span
          className={`font-display text-[10px] uppercase tracking-widest mt-2 text-center ${
            dim ? "text-neutral-400" : "text-neutral-500"
          }`}
        >
          {rack.name}
        </span>
      </div>

      <div className="mt-auto">
        {dim ? (
          <ReadoutChip label="Coming soon" />
        ) : (
          <ReadoutChip
            value={rack.tools.length}
            label={rack.tools.length === 1 ? "tool" : "tools"}
          />
        )}
      </div>
    </div>
  );

  if (dim) {
    return <div className="h-full cursor-not-allowed">{content}</div>;
  }

  return (
    <Link href={`/departments/${rack.slug}`} className="block group h-full">
      {content}
    </Link>
  );
}
