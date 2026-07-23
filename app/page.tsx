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
            Fast, reliable calculators — no sign-up, no clutter, built for the
            job site.
          </p>
        </div>
      </div>

      {/* Shelf rail: the lip the bins hang from */}
      <div className="h-3 bg-gradient-to-b from-safety to-safety-dark shadow-md" />

      {/* Departments: one bin per trade */}
      <div className="max-w-md mx-auto px-6 pt-8 pb-16">
        <p className="font-display uppercase tracking-[0.2em] text-graphite text-xs mb-5 text-center">
          Pick a department
        </p>
        <div className="grid grid-cols-3 gap-x-4 gap-y-7">
          {racks.map((rack) => (
            <DepartmentBin key={rack.slug} rack={rack} />
          ))}
        </div>
      </div>
    </main>
  );
}
