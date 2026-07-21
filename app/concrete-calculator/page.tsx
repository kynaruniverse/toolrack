import ConcreteCalculator from "@/components/calculators/ConcreteCalculator";
import ToolHeader from "@/components/ToolHeader";

export const metadata = {
  title: "Concrete Calculator — ToolRack",
  description:
    "Calculate how much concrete you need for your job. Instant results, bags required, and estimated cost — built for tradespeople on-site.",
};

export default function ConcreteCalculatorPage() {
  return (
    <main className="min-h-screen bg-concrete">
      <ToolHeader
        title="Concrete Calculator"
        subtitle="Enter your slab dimensions to get cubic metres, bags, and cost."
      />
      <div className="px-6 -mt-4 pb-14">
        <ConcreteCalculator />
      </div>
    </main>
  );
}
