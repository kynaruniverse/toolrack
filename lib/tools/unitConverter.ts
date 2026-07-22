export type ConversionCategory = "length" | "area" | "volume" | "weight";

export const CONVERSION_UNITS: Record<ConversionCategory, { key: string; label: string; toBase: number }[]> = {
  length: [
    { key: "mm", label: "Millimetres (mm)", toBase: 0.001 },
    { key: "cm", label: "Centimetres (cm)", toBase: 0.01 },
    { key: "m", label: "Metres (m)", toBase: 1 },
    { key: "in", label: "Inches (in)", toBase: 0.0254 },
    { key: "ft", label: "Feet (ft)", toBase: 0.3048 },
    { key: "yd", label: "Yards (yd)", toBase: 0.9144 },
  ],
  area: [
    { key: "m2", label: "Square metres (m²)", toBase: 1 },
    { key: "ft2", label: "Square feet (ft²)", toBase: 0.09290304 },
    { key: "yd2", label: "Square yards (yd²)", toBase: 0.83612736 },
  ],
  volume: [
    { key: "m3", label: "Cubic metres (m³)", toBase: 1 },
    { key: "ft3", label: "Cubic feet (ft³)", toBase: 0.0283168 },
    { key: "l", label: "Litres (L)", toBase: 0.001 },
  ],
  weight: [
    { key: "kg", label: "Kilograms (kg)", toBase: 1 },
    { key: "lb", label: "Pounds (lb)", toBase: 0.453592 },
    { key: "st", label: "Stone (st)", toBase: 6.35029 },
    { key: "t", label: "Tonnes (t)", toBase: 1000 },
  ],
};

export function convertUnit(
  value: number,
  category: ConversionCategory,
  fromKey: string,
  toKey: string
): number {
  const units = CONVERSION_UNITS[category];
  const from = units.find((u) => u.key === fromKey);
  const to = units.find((u) => u.key === toKey);
  if (!from || !to) return 0;
  const baseValue = value * from.toBase;
  return baseValue / to.toBase;
}
