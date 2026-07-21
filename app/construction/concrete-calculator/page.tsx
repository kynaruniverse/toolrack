import { CalculatorCard } from "@/components/CalculatorCard";
import { concreteCalculator } from "@/lib/tools/concrete";

export const metadata = { title: "Concrete Calculator — ToolRack" };

export default function Page() {
  return (
    <main className="mx-auto max-w-lg px-6 py-16">
      <CalculatorCard
        tool={concreteCalculator}
        fields={[
          { key: "lengthM", label: "Length", unit: "m", defaultValue: 3 },
          { key: "widthM", label: "Width", unit: "m", defaultValue: 3 },
          { key: "depthMm", label: "Depth", unit: "mm", defaultValue: 100 },
          {
            key: "wastePercent",
            label: "Waste allowance",
            unit: "%",
            defaultValue: 10,
          },
        ]}
      />
    </main>
  );
}
