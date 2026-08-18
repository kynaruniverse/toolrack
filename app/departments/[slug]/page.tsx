import { notFound } from "next/navigation";
import Link from "next/link";
import { racks, getRackBySlug } from "@/lib/racks";
import JobTicket from "@/components/JobTicket";

const rackAccent: Record<string, "site" | "chit"> = {
  construction: "site",
  catering: "chit",
};

export function generateStaticParams() {
  return racks.filter((rack) => !rack.comingSoon).map((rack) => ({ slug: rack.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const rack = getRackBySlug(params.slug);
  if (!rack || rack.comingSoon) return {};

  return {
    title: `${rack.name} Tools — ToolRack`,
    description: `${rack.name} calculators and tools for tradespeople — fast, no sign-up, built for the job site.`,
  };
}

export default function DepartmentPage({
  params,
}: {
  params: { slug: string };
}) {
  const rack = getRackBySlug(params.slug);

  if (!rack || rack.comingSoon) {
    notFound();
  }

  const accent = rackAccent[rack.slug] ?? "site";

  return (
    <main className="min-h-screen bg-kraft-dark">
      <div className="bg-ink px-6 pt-10 pb-8">
        <div className="max-w-md mx-auto">
          <Link
            href="/"
            className="font-mono text-safety text-[11px] uppercase tracking-widest"
          >
            &larr; All departments
          </Link>
          <div className="flex items-end justify-between mt-3">
            <h1 className="font-display uppercase text-4xl tracking-tight text-kraft">
              {rack.name}
            </h1>
            <span className={`stamp px-2 py-0.5 text-xs uppercase ${accent === "site" ? "text-safety border-safety" : "text-chit border-chit"}`}>
              {rack.code}
            </span>
          </div>
          <p className="font-mono text-neutral-400 text-xs uppercase tracking-wide mt-1">
            {rack.tools.length} {rack.tools.length === 1 ? "ticket" : "tickets"} in this pad
          </p>
        </div>
      </div>

      <div className="corkboard px-6 pt-8 pb-16">
        <div className="max-w-md mx-auto grid grid-cols-2 gap-x-3 gap-y-5">
          {rack.tools.map((tool, i) => (
            <JobTicket
              key={tool.slug}
              title={tool.name}
              meta={tool.cardDescription}
              number={`No. ${rack.code}-${String(i + 1).padStart(2, "0")}`}
              accent={accent}
              href={`/${tool.slug}`}
              rotate={i % 2 === 0 ? "left" : "right"}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
