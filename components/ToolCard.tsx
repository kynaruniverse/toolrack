import Link from "next/link";
import { ToolMeta } from "@/lib/types";
import ToolIcon from "@/components/ToolIcon";
import ReadoutChip from "@/components/ReadoutChip";

export default function ToolCard({ tool }: { tool: ToolMeta }) {
  return (
    <Link href={`/${tool.slug}`} className="block group">
      <div className="h-full rounded-lg bg-white p-4 shadow-sm border border-concrete-dark transition-transform group-hover:-translate-y-0.5 group-hover:shadow-md">
        <div className="flex items-start justify-between mb-2">
          <div className="w-9 h-9 rounded-full bg-steel/10 text-steel flex items-center justify-center">
            <ToolIcon name={tool.icon} className="w-5 h-5" />
          </div>
          {/* Defaulting to CALC to give every tool that unlit LCD hardware look */}
          <ReadoutChip label="CALC" />
        </div>
        <h3 className="font-display uppercase tracking-wide text-graphite text-sm leading-tight group-hover:text-steel transition-colors">
          {tool.name}
        </h3>
        <p className="text-xs text-neutral-600 mt-1 leading-snug line-clamp-2">
          {tool.cardDescription}
        </p>
      </div>
    </Link>
  );
}
