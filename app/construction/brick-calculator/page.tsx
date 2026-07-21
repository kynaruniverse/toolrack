import { CalculatorCard } from "@/components/CalculatorCard";
import { brickCalculator } from "@/lib/tools/brick";

export const metadata = { title: "Brick Calculator — ToolRack" };

export default function Page() {
  return (
    <main className="mx-auto max-w-lg px-6 py-16">
      <CalculatorCard
        tool={brickCalculator}
        fields={[
          { key: "wallLengthM", label: "Wall length", unit: "m", defaultValue: 5 },
          { key: "wallHeightM", label: "Wall height", unit: "m", defaultValue: 2 },
          {
            key: "bricksPerM2",
            label: "Bricks per m²",
            defaultValue: 60,
          },
          {
            key: "wastePercent",
            label: "Waste allowance",
            unit: "%",
            defaultValue: 5,
          },
        ]}
      />
    </main>
  );
}
