import Link from "next/link";
import { racks } from "@/lib/racks";

export default function Home() {
  const constructionTools = racks.find((r) => r.slug === "construction")?.tools ?? [];

  return (
    <main className="min-h-screen bg-concrete">
      {/* Hero: the rack itself */}
      <div className="pegboard px-6 pt-14 pb-20">
        <div className="max-w-md mx-auto text-center">
          <p className="font-display uppercase tracking-[0.3em] text-safety text-xs mb-3">
            The Digital Toolbox
          </p>
          <h1 className="font-display uppercase text-5xl tracking-tight text-white mb-4">
            ToolRack
          </h1>
          <p className="text-neutral-300 leading-relaxed">
            Fast, reliable calculators — no sign-up, no clutter, built for the
            job site.
          </p>
        </div>
      </div>

      {/* Tools hanging on the rack */}
      <div className="max-w-md mx-auto px-6 -mt-10 pb-16 space-y-5">
        {constructionTools.map((tool) => (
          <Link key={tool.slug} href={`/${tool.slug}`} className="block group">
            <div className="hook-card rounded-lg bg-white border border-concrete-dark pt-6 px-5 pb-5 shadow-sm transition-transform group-hover:-translate-y-0.5 group-hover:shadow-md">
              <h2 className="font-display uppercase tracking-wide text-graphite text-lg">
                {tool.name}
              </h2>
              <p className="text-sm text-neutral-600 mt-1">{tool.cardDescription}</p>
              <span className="inline-block mt-3 text-xs font-semibold uppercase tracking-wider text-steel">
                Open tool →
              </span>
            </div>
          </Link>
        ))}
      </div>

      <p className="text-center text-sm text-neutral-500 pb-10 px-6">
        More tools and trades coming soon.
      </p>
    </main>
  );
}
