import Link from "next/link";
import { racks } from "@/lib/racks";

export default function Home() {
  const construction = racks.find((r) => r.slug === "construction")!;

  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <p className="font-mono text-sm uppercase tracking-widest text-rack-accent">
        ToolRack
      </p>
      <h1 className="mt-3 text-4xl font-bold leading-tight text-rack-text sm:text-5xl">
        The digital toolbox for skilled trades.
      </h1>
      <p className="mt-4 max-w-xl text-lg text-rack-muted">
        Fast, reliable calculators for builders. No sign-up. No fuss.
        Get your answer, get back to the job.
      </p>

      <div className="mt-12">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-rack-muted">
          {construction.name} Rack
        </h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          {construction.tools.map((tool) => (
            <Link
              key={tool.slug}
              href={`/construction/${tool.slug}`}
              className="rounded border border-rack-border bg-rack-surface p-4 transition-colors hover:border-rack-accent"
            >
              <div className="font-semibold text-rack-text">{tool.name}</div>
              <div className="mt-1 text-sm text-rack-muted">
                {tool.description}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
