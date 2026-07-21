import BrickCalculator from "@/components/calculators/BrickCalculator";

export const metadata = {
  title: "Brick Calculator — ToolRack",
  description:
    "Calculate how many bricks and mortar bags you need for a wall. Instant results built for tradespeople on-site.",
};

export default function BrickCalculatorPage() {
  return (
    <main className="min-h-screen px-6 py-10">
      <div className="max-w-md mx-auto mb-8 text-center">
        <h1 className="text-2xl font-bold">Brick Calculator</h1>
        <p className="text-neutral-600 mt-1">
          Enter your wall dimensions and brick size to get bricks and mortar needed.
        </p>
      </div>
      <BrickCalculator />
    </main>
  );
}