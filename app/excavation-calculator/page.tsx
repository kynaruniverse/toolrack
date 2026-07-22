import ExcavationCalculator from "@/components/calculators/ExcavationCalculator";
import ToolHeader from "@/components/ToolHeader";
import { getToolBySlug } from "@/lib/racks";

const tool = getToolBySlug("excavation-calculator")!;

export const metadata = {
  title: `${tool.name} — ToolRack`,
  description: tool.pageDescription,
};

export default function ExcavationCalculatorPage() {
  return (
    <main className="min-h-screen bg-concrete">
      <ToolHeader title={tool.name} subtitle={tool.subtitle} />
      <div className="px-6 -mt-4 pb-14">
        <ExcavationCalculator />
      </div>
    </main>
  );
}
