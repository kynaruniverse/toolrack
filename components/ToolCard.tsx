import Link from "next/link";
import { ToolMeta } from "@/lib/types";

export default function ToolCard({ tool }: { tool: ToolMeta }) {
  return (
    <Link href={`/${tool.slug}`} className="block group h-full">
      <div className="h-full rounded-lg bg-white p-4 shadow-sm border border-concrete-dark transition-transform group-hover:-translate-y-0.5 group-hover:shadow-md flex flex-col justify-center">
        <h3 className="font-display uppercase tracking-wide text-graphite text-sm leading-tight group-hover:text-steel transition-colors">
          {tool.name}
        </h3>
        <p className="text-xs text-neutral-600 mt-1.5 leading-snug line-clamp-2">
          {tool.cardDescription}
        </p>
      </div>
    </Link>
  );
}
