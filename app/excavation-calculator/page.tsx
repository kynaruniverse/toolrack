import ExcavationCalculator from "@/components/calculators/ExcavationCalculator";
import ToolHeader from "@/components/ToolHeader";
import { getToolBySlug, getRackForTool } from "@/lib/racks";
import ToolJsonLd from "@/components/ToolJsonLd";

const tool = getToolBySlug("excavation-calculator")!;
const rack = getRackForTool(tool.slug)!;

export const metadata = {
  title: `${tool.name} — ToolRack`,
  description: tool.pageDescription,
  alternates: { canonical: `/${tool.slug}` },
  openGraph: {
    title: `${tool.name} — ToolRack`,
    description: tool.pageDescription,
  },
};

export default function ExcavationCalculatorPage() {
  return (
    <main className="min-h-screen bg-concrete">
      <ToolJsonLd tool={tool} />
      <ToolHeader         title={tool.name}         subtitle={tool.subtitle}         backHref={`/departments/${rack.slug}`}         backLabel={rack.name}       />
      <div className="px-6 -mt-4 pb-14">
        <ExcavationCalculator />
      </div>
    </main>
  );
}
