import MaterialCostCalculator from "@/components/calculators/MaterialCostCalculator";

export const metadata = {
  title: "Material Cost Calculator — ToolRack",
  description:
    "Add up materials, labour, and margin to build a quick job quote. Built for tradespeople on-site.",
};

export default function MaterialCostCalculatorPage() {
  return (
    <main className="min-h-screen px-6 py-10">
      <div className="max-w-md mx-auto mb-8 text-center">
        <h1 className="text-2xl font-bold">Material Cost Calculator</h1>
        <p className="text-neutral-600 mt-1">
          Add your materials, labour, and margin to get a quick job total.
        </p>
      </div>
      <MaterialCostCalculator />
    </main>
  );
}