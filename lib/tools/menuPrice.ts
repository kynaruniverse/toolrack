export type PricingMethod = "markup" | "margin";

export interface MenuPriceInput {
  cost: number;
  method: PricingMethod;
  percent: number;
}

export interface MenuPriceResult {
  price: number;
  profit: number;
  equivalentMarkupPercent: number;
  equivalentMarginPercent: number;
}

export function calculateMenuPrice(input: MenuPriceInput): MenuPriceResult {
  const { cost, method, percent } = input;

  const price =
    method === "markup"
      ? cost * (1 + percent / 100)
      : cost / (1 - Math.min(percent, 99.9) / 100);

  const profit = price - cost;
  const equivalentMarkupPercent = cost > 0 ? (profit / cost) * 100 : 0;
  const equivalentMarginPercent = price > 0 ? (profit / price) * 100 : 0;

  return {
    price: Math.round(price * 100) / 100,
    profit: Math.round(profit * 100) / 100,
    equivalentMarkupPercent: Math.round(equivalentMarkupPercent * 10) / 10,
    equivalentMarginPercent: Math.round(equivalentMarginPercent * 10) / 10,
  };
}
