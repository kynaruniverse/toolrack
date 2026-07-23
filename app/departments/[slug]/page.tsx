import { notFound } from "next/navigation";
import Link from "next/link";
import { racks, getRackBySlug } from "@/lib/racks";
import ToolCard from "@/components/ToolCard";

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

  return (
    <main className="min-h-screen bg-concrete">
      <div className="pegboard px-6 pt-10 pb-8">
        <div className="max-w-md mx-auto">
          <Link
            href="/"
            className="text-safety text-xs uppercase tracking-widest"
          >
            ← All departments
          </Link>
          <h1 className="font-display uppercase text-3xl tracking-tight text-white mt-3">
            {rack.name}
          </h1>
        </div>
      </div>

      <div className="max-w-md mx-auto px-6 pt-8 pb-16">
        <div className="grid grid-cols-2 gap-3">
          {rack.tools.map((tool) => (
            <ToolCard key={tool.slug} tool={tool} />
          ))}
        </div>
      </div>
    </main>
  );
}
