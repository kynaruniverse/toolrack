export type KitchenUnit =
  | "tsp"
  | "tbsp"
  | "fl_oz"
  | "cup"
  | "ml"
  | "l"
  | "g"
  | "kg"
  | "oz"
  | "lb";

export type UnitCategory = "volume" | "weight";

interface UnitInfo {
  category: UnitCategory;
  toBase: number; // volume: ml per unit. weight: grams per unit.
}

const UNIT_INFO: Record<KitchenUnit, UnitInfo> = {
  tsp: { category: "volume", toBase: 4.92892 },
  tbsp: { category: "volume", toBase: 14.7868 },
  fl_oz: { category: "volume", toBase: 29.5735 },
  cup: { category: "volume", toBase: 236.588 },
  ml: { category: "volume", toBase: 1 },
  l: { category: "volume", toBase: 1000 },
  g: { category: "weight", toBase: 1 },
  kg: { category: "weight", toBase: 1000 },
  oz: { category: "weight", toBase: 28.3495 },
  lb: { category: "weight", toBase: 453.592 },
};

export const UNIT_META: { key: KitchenUnit; label: string; category: UnitCategory }[] = [
  { key: "tsp", label: "Teaspoons (tsp)", category: "volume" },
  { key: "tbsp", label: "Tablespoons (tbsp)", category: "volume" },
  { key: "fl_oz", label: "Fluid ounces (fl oz)", category: "volume" },
  { key: "cup", label: "Cups", category: "volume" },
  { key: "ml", label: "Millilitres (ml)", category: "volume" },
  { key: "l", label: "Litres (l)", category: "volume" },
  { key: "g", label: "Grams (g)", category: "weight" },
  { key: "kg", label: "Kilograms (kg)", category: "weight" },
  { key: "oz", label: "Ounces (oz)", category: "weight" },
  { key: "lb", label: "Pounds (lb)", category: "weight" },
];

export const INGREDIENT_DENSITIES = {
  water: { label: "Water", gramsPerMl: 1.0 },
  milk: { label: "Milk", gramsPerMl: 1.03 },
  "granulated-sugar": { label: "Granulated sugar", gramsPerMl: 0.845 },
  "all-purpose-flour": { label: "All-purpose flour", gramsPerMl: 0.529 },
  butter: { label: "Butter", gramsPerMl: 0.911 },
  honey: { label: "Honey", gramsPerMl: 1.42 },
  salt: { label: "Salt", gramsPerMl: 1.217 },
} as const;

export type IngredientKey = keyof typeof INGREDIENT_DENSITIES;

/**
 * Converts between two kitchen units. If the units are in the same category
 * (volume-to-volume or weight-to-weight), no ingredient is needed. If they
 * cross categories (e.g. cups to grams), an ingredientKey is required to
 * look up a density — returns null if one wasn't given, rather than silently
 * guessing a density.
 */
export function convertKitchenUnit(
  value: number,
  fromUnit: KitchenUnit,
  toUnit: KitchenUnit,
  ingredientKey?: IngredientKey
): number | null {
  const from = UNIT_INFO[fromUnit];
  const to = UNIT_INFO[toUnit];

  if (from.category === to.category) {
    const base = value * from.toBase;
    return roundResult(base / to.toBase);
  }

  if (!ingredientKey) return null;
  const density = INGREDIENT_DENSITIES[ingredientKey].gramsPerMl;

  if (from.category === "volume") {
    // volume -> weight
    const grams = value * from.toBase * density;
    return roundResult(grams / to.toBase);
  }

  // weight -> volume
  const ml = (value * from.toBase) / density;
  return roundResult(ml / to.toBase);
}

function roundResult(n: number): number {
  return Math.round(n * 1000) / 1000;
}
