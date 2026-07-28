"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getTopTools } from "@/lib/usage";
import { getAllTools } from "@/lib/racks";
import { ToolMeta } from "@/lib/types";
import { hapticTap } from "@/lib/haptics";

export default function TopTools() {
  const [tools, setTools] = useState<ToolMeta[]>([]);

  useEffect(() => {
    const topSlugs = getTopTools(3);
    const allTools = getAllTools();
    const resolved = topSlugs
      .map((slug) => allTools.find((t) => t.slug === slug))
      .filter((t): t is ToolMeta => Boolean(t));
    setTools(resolved);
  }, []);

  if (tools.length === 0) return null;

  return (
    <div className="max-w-md mx-auto px-6 mb-6">
      <p className="text-[10px] uppercase tracking-widest text-neutral-400 font-semibold mb-2">
        Your top tools
      </p>
      <div className="flex flex-col gap-2">
        {tools.map((tool) => (
          <Link
            key={tool.slug}
            href={`/${tool.slug}`}
            onClick={hapticTap}
            className="tactile flex items-center justify-between rounded-lg bg-white border border-concrete-dark px-4 py-3 shadow-sm"
          >
            <span className="text-sm font-semibold text-graphite">{tool.name}</span>
            <span className="text-steel text-sm">→</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
