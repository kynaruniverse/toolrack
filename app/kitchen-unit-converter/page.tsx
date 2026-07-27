import KitchenUnitConverter from "@/components/calculators/KitchenUnitConverter";
import ToolHeader from "@/components/ToolHeader";
import { getToolBySlug, getRackForTool } from "@/lib/racks";
import ToolJsonLd from "@/components/ToolJsonLd";
import ToolRunner from "@/components/ToolRunner";

const tool = getToolBySlug("kitchen-unit-converter")!;
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

export default function KitchenUnitConverterPage() {
  return (
    <main className="min-h-screen bg-concrete">
      <ToolJsonLd tool={tool} />
      <ToolHeader         title={tool.name}         subtitle={tool.subtitle}         backHref={`/departments/${rack.slug}`}         backLabel={rack.name}       />
      <div className="px-6 -mt-4 pb-14">
        <ToolRunner tool={tool}>
          <KitchenUnitConverter />
        </ToolRunner>
      </div>
    </main>
  );
}
