import Link from "next/link";
import { racks } from "@/lib/racks";
import ToolIcon from "@/components/ToolIcon";

export default function Home() {
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

      {/* Racks: one section per trade */}
      <div className="max-w-md mx-auto px-6 -mt-10 pb-16 space-y-10">
        {racks.map((rack) =>
          rack.comingSoon ? (
            <section key={rack.slug}>
              <div className="rounded-lg border border-dashed border-neutral-400 px-5 py-6 text-center">
                <p className="font-display uppercase tracking-widest text-neutral-500 text-sm">
                  {rack.name}
                </p>
                <p className="text-xs text-neutral-500 mt-1">Coming soon</p>
              </div>
            </section>
          ) : (
            <section key={rack.slug}>
              <h2 className="font-display uppercase tracking-[0.2em] text-graphite text-sm mb-3 pb-2 border-b border-concrete-dark">
                {rack.name}
              </h2>
              <div className="grid grid-cols-2 gap-3">
                {rack.tools.map((tool) => (
                  <Link
                    key={tool.slug}
                    href={`/${tool.slug}`}
                    className="block group"
                  >
                    <div
                      className={`relative h-full rounded-lg bg-white p-4 shadow-sm transition-transform group-hover:-translate-y-0.5 group-hover:shadow-md ${
                        tool.flagship
                          ? "border-2 border-safety"
                          : "border border-concrete-dark"
                      }`}
                    >
                      {tool.flagship && (
                        <span className="absolute -top-2 right-3 bg-safety text-graphite text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full">
                          Start here
                        </span>
                      )}
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
                ))}
              </div>
            </section>
          )
        )}
      </div>
    </main>
  );
}
