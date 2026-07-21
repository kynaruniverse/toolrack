import { CalculatorCard } from "@/components/CalculatorCard";
import { materialCostCalculator } from "@/lib/tools/material-cost";

export const metadata = { title: "Material Cost Calculator — ToolRack" };

export default function Page() {
  return (
    <main className="mx-auto max-w-lg px-6 py-16">
      <CalculatorCard
        tool={materialCostCalculator}
        fields={[
          { key: "quantity", label: "Quantity", defaultValue: 10 },
          { key: "unitPrice", label: "Unit price", unit: "£", defaultValue: 5 },
          { key: "labourHours", label: "Labour hours", defaultValue: 0 },
          { key: "labourRate", label: "Labour rate", unit: "£/hr", defaultValue: 0 },
          { key: "marginPercent", label: "Margin", unit: "%", defaultValue: 0 },
        ]}
      />
    </main>
  );
}
