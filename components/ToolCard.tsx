import Link from "next/link";
import { ToolMeta } from "@/lib/types";
import ToolIcon from "@/components/ToolIcon";

export default function ToolCard({ tool }: { tool: ToolMeta }) {
  return (
    <Link href={`/${tool.slug}`} className="block group">
      <div className="h-full rounded-lg bg-white p-4 shadow-sm border border-concrete-dark transition-transform group-hover:-translate-y-0.5 group-hover:shadow-md">
        <div className="w-9 h-9 rounded-full bg-steel/10 text-steel flex items-center justify-center mb-2">
          <ToolIcon name={tool.icon} className="w-5 h-5" />
        </div>
        <h3 className="font-display uppercase tracking-wide text-graphite text-sm leading-tight">
          {tool.name}
          <span className="text-steel ml-1">→</span>
        </h3>
        <p className="text-xs text-neutral-600 mt-1 leading-snug line-clamp-2">
          {tool.cardDescription}
        </p>
      </div>
    </Link>
  );
}
