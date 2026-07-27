import Link from "next/link";
import { racks } from "@/lib/racks";
import DepartmentBin from "@/components/DepartmentBin";

export default function Home() {
  return (
    <main className="min-h-screen bg-concrete">
      {/* Hero: the pegboard wall */}
      <div className="pegboard px-6 pt-14 pb-16">
        <div className="max-w-md mx-auto text-center">
          <p className="font-display uppercase tracking-[0.3em] text-safety text-xs mb-3">
            The Digital Toolbox
          </p>
          <h1 className="font-display uppercase text-5xl tracking-tight text-white mb-4">
            ToolRack
          </h1>
          <p className="text-neutral-300 leading-relaxed">
            Fast, reliable tools — no sign-up, no clutter, built for the job.
          </p>

          <Link href="/projects" className="group inline-flex flex-col items-center mt-8">
            <div className="docket-clip docket-clip-sm" />
            <div className="docket rounded-md px-5 py-2.5 border border-concrete-dark shadow-sm">
              <span className="block text-xs font-semibold uppercase tracking-widest text-graphite">
                Your Projects
              </span>
              <span className="block text-[10px] text-neutral-500 mt-0.5 group-hover:text-steel transition">
                Saved job dockets →
              </span>
            </div>
          </Link>
        </div>
      </div>

      {/* Shelf rail: the lip the bins hang from */}
      <div className="h-3 bg-gradient-to-b from-safety to-safety-dark shadow-md" />

      {/* Departments: one bin per trade */}
      <div className="max-w-md mx-auto px-6 pt-12 pb-16">
        <p className="font-display uppercase tracking-[0.2em] text-graphite text-xs mb-6 text-center">
          Pick a department
        </p>
        <div className="grid grid-cols-3 gap-x-4 gap-y-9">
          {racks.map((rack) => (
            <DepartmentBin key={rack.slug} rack={rack} />
          ))}
        </div>
      </div>
    </main>
  );
}
