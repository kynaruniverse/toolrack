import UnitConverter from "@/components/calculators/UnitConverter";
import ToolHeader from "@/components/ToolHeader";
import { getToolBySlug } from "@/lib/racks";
import ToolJsonLd from "@/components/ToolJsonLd";

const tool = getToolBySlug("unit-converter")!;

export const metadata = {
  title: `${tool.name} — ToolRack`,
  description: tool.pageDescription,
  alternates: { canonical: `/${tool.slug}` },
  openGraph: {
    title: `${tool.name} — ToolRack`,
    description: tool.pageDescription,
  },
};

export default function UnitConverterPage() {
  return (
    <main className="min-h-screen bg-concrete">
      <ToolJsonLd tool={tool} />
      <ToolHeader title={tool.name} subtitle={tool.subtitle} />
      <div className="px-6 -mt-4 pb-14">
        <UnitConverter />
      </div>
    </main>
  );
}
