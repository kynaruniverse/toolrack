export interface MaterialLineItem {
  id: string;
  name: string;
  quantity: number;
  unitPrice: number;
}

export interface MaterialCostInput {
  items: MaterialLineItem[];
  labourHours: number;
  labourRate: number;
  marginPercent: number;
}

export interface MaterialCostResult {
  materialTotal: number;
  labourTotal: number;
  subtotal: number;
  marginAmount: number;
  finalQuote: number;
}

export function calculateMaterialCost(input: MaterialCostInput): MaterialCostResult {
  const materialTotal = input.items.reduce(
    (sum, item) => sum + item.quantity * item.unitPrice,
    0
  );
  const labourTotal = input.labourHours * input.labourRate;
  const subtotal = materialTotal + labourTotal;
  const marginAmount = subtotal * (input.marginPercent / 100);
  const finalQuote = subtotal + marginAmount;

  return {
    materialTotal: round2(materialTotal),
    labourTotal: round2(labourTotal),
    subtotal: round2(subtotal),
    marginAmount: round2(marginAmount),
    finalQuote: round2(finalQuote),
  };
}

function round2(n: number): number {
  return Math.round(n * 100) / 100;
}
