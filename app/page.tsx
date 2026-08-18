import Link from "next/link";
import { racks } from "@/lib/racks";
import JobTicket from "@/components/JobTicket";
import TopTools from "@/components/TopTools";

const rackAccent: Record<string, "site" | "chit"> = {
  construction: "site",
  catering: "chit",
};

export default function Home() {
  return (
    <main className="min-h-screen bg-kraft-dark">
      {/* Header band — the front cover of the ticket book */}
      <div className="bg-ink px-6 pt-14 pb-12">
        <div className="max-w-md mx-auto text-center">
          <p className="font-mono uppercase tracking-[0.3em] text-safety text-[11px] mb-3">
            Trade &amp; kitchen tickets
          </p>
          <h1 className="font-display uppercase text-6xl tracking-tight text-kraft mb-4">
            ToolRack
          </h1>
          <p className="font-body text-neutral-400 text-sm leading-relaxed">
            Fast, reliable tools — no sign-up, no clutter, built for the job.
          </p>

          <Link
            href="/projects"
            className="inline-flex items-center gap-2 mt-8 rounded-sm border border-kraft/25 px-5 py-2.5 font-mono text-xs uppercase tracking-widest text-kraft transition hover:border-safety hover:text-safety"
          >
            Your projects
            <span aria-hidden>&rarr;</span>
          </Link>
        </div>
      </div>

      {/* Corkboard — where the tickets live */}
      <div className="corkboard px-6 pt-10 pb-16">
        <div className="max-w-md mx-auto">
          <TopTools />

          <p className="font-mono uppercase tracking-[0.2em] text-ink/50 text-[11px] mb-4">
            Pick a department
          </p>

          <div className="grid grid-cols-2 gap-x-3 gap-y-5">
            {racks.map((rack, i) => (
              <JobTicket
                key={rack.slug}
                title={rack.name}
                meta={rack.tagline}
                number={`No. ${String(i + 1).padStart(2, "0")}`}
                code={rack.code}
                accent={rackAccent[rack.slug] ?? "site"}
                href={rack.comingSoon ? undefined : `/departments/${rack.slug}`}
                comingSoon={rack.comingSoon}
                rotate={i % 2 === 0 ? "left" : "right"}
              />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
