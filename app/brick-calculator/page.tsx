import BrickCalculator from "@/components/calculators/BrickCalculator";
import ToolHeader from "@/components/ToolHeader";

export const metadata = {
  title: "Brick Calculator — ToolRack",
  description:
    "Calculate how many bricks and mortar bags you need for a wall. Instant results built for tradespeople on-site.",
};

export default function BrickCalculatorPage() {
  return (
    <main className="min-h-screen bg-concrete">
      <ToolHeader
        title="Brick Calculator"
        subtitle="Enter your wall dimensions and brick size to get bricks and mortar needed."
      />
      <div className="px-6 -mt-4 pb-14">
        <BrickCalculator />
      </div>
    </main>
  );
}
