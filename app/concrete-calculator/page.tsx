import ConcreteCalculator from "@/components/calculators/ConcreteCalculator";

export const metadata = {
  title: "Concrete Calculator — ToolRack",
  description:
    "Calculate how much concrete you need for your job. Instant results, bags required, and estimated cost — built for tradespeople on-site.",
};

export default function ConcreteCalculatorPage() {
  return (
    <main className="min-h-screen px-6 py-10">
      <div className="max-w-md mx-auto mb-8 text-center">
        <h1 className="text-2xl font-bold">Concrete Calculator</h1>
        <p className="text-neutral-600 mt-1">
          Enter your slab dimensions to get cubic metres, bags, and cost.
        </p>
      </div>
      <ConcreteCalculator />
    </main>
  );
}