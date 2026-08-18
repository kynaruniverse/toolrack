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
    <div className="mb-6">
      <p className="font-mono uppercase tracking-[0.2em] text-ink/50 text-[11px] mb-2">
        Your top tickets
      </p>
      <div className="flex flex-col gap-1.5">
        {tools.map((tool, i) => (
          <Link
            key={tool.slug}
            href={`/${tool.slug}`}
            onClick={hapticTap}
            className="tactile flex items-center justify-between rounded-sm bg-kraft border border-kraft-line px-3 py-2"
          >
            <span className="font-body text-sm text-ink flex items-center gap-2">
              <span className="font-mono text-[10px] text-ink/40">{String(i + 1).padStart(2, "0")}</span>
              {tool.name}
            </span>
            <span className="text-ink/40 text-sm">&rarr;</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
