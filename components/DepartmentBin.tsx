import Link from "next/link";
import { Rack } from "@/lib/types";
import ReadoutChip from "@/components/ReadoutChip";

export default function DepartmentBin({ rack }: { rack: Rack }) {
  const dim = rack.comingSoon;

  const content = (
    <div
      className={`relative flex h-full flex-col items-center justify-between rounded-xl border-2 p-5 transition-all shadow-sm overflow-hidden ${
        dim
          ? "border-concrete-dark bg-concrete-dark/20 opacity-50"
          : "border-graphite bg-graphite text-white hover:-translate-y-1 hover:shadow-xl hover:border-safety"
      }`}
    >
      {/* Heavy-duty yellow safety stripe across top for live tools */}
      {!dim && (
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-safety" />
      )}

      <div className="flex flex-col items-center justify-center mb-6 mt-2">
        <span
          className={`font-display text-4xl font-extrabold uppercase tracking-tight ${
            dim ? "text-neutral-400" : "text-white"
          }`}
        >
          {rack.code}
        </span>
        <span
          className={`font-display text-[10px] uppercase tracking-widest mt-2 text-center font-bold ${
            dim ? "text-neutral-400" : "text-neutral-300"
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
