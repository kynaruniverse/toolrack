import { Tool } from "../types";

export interface MaterialCostInput {
  quantity: number;
  unitPrice: number;
  labourHours?: number;
  labourRate?: number;
  marginPercent?: number;
}

export const materialCostCalculator: Tool<MaterialCostInput> = {
  id: "material-cost-calculator",
  slug: "material-cost-calculator",
  name: "Material Cost Calculator",
  description: "Work out total material cost, labour, and margin for a job.",
  rackId: "construction",
  compute: ({
    quantity,
    unitPrice,
    labourHours = 0,
    labourRate = 0,
    marginPercent = 0,
  }) => {
    const materialCost = quantity * unitPrice;
    const labourCost = labourHours * labourRate;
    const subtotal = materialCost + labourCost;
    const total = subtotal * (1 + marginPercent / 100);

    return {
      summary: `£${total.toFixed(2)} total`,
      explanation: `Materials come to £${materialCost.toFixed(
        2
      )} and labour to £${labourCost.toFixed(
        2
      )}. With a ${marginPercent}% margin, the job total is £${total.toFixed(2)}.`,
      values: {
        materialCost: Number(materialCost.toFixed(2)),
        labourCost: Number(labourCost.toFixed(2)),
        total: Number(total.toFixed(2)),
      },
    };
  },
};
