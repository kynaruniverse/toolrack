import MaterialCostCalculator from "@/components/calculators/MaterialCostCalculator";
import ToolHeader from "@/components/ToolHeader";

export const metadata = {
  title: "Material Cost Calculator — ToolRack",
  description:
    "Add up materials, labour, and margin to build a quick job quote. Built for tradespeople on-site.",
};

export default function MaterialCostCalculatorPage() {
  return (
    <main className="min-h-screen bg-concrete">
      <ToolHeader
        title="Material Cost Calculator"
        subtitle="Add your materials, labour, and margin to get a quick job total."
      />
      <div className="px-6 -mt-4 pb-14">
        <MaterialCostCalculator />
      </div>
    </main>
  );
}
