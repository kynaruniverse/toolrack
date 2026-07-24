import RebarCalculator from "@/components/calculators/RebarCalculator";
import ToolHeader from "@/components/ToolHeader";
import { getToolBySlug } from "@/lib/racks";
import ToolJsonLd from "@/components/ToolJsonLd";

const tool = getToolBySlug("rebar-calculator")!;

export const metadata = {
  title: `${tool.name} — ToolRack`,
  description: tool.pageDescription,
  alternates: { canonical: `/${tool.slug}` },
  openGraph: {
    title: `${tool.name} — ToolRack`,
    description: tool.pageDescription,
  },
};

export default function RebarCalculatorPage() {
  return (
    <main className="min-h-screen bg-concrete">
      <ToolJsonLd tool={tool} />
      <ToolHeader title={tool.name} subtitle={tool.subtitle} />
      <div className="px-6 -mt-4 pb-14">
        <RebarCalculator />
      </div>
    </main>
  );
}
