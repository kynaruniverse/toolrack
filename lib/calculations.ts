export type Unit = "metric" | "imperial";

const FT_TO_M = 0.3048;

export function toMetres(value: number, unit: Unit): number {
  return unit === "metric" ? value : value * FT_TO_M;
}

export interface ConcreteInput {
  length: number;
  width: number;
  depth: number; // depth entered in mm for precision, converted inside
  unit: Unit;
  wastePercent: number; // e.g. 10
  bagSizeKg: 20 | 25;
  pricePerBag?: number;
}

export interface ConcreteResult {
  volumeM3: number;
  volumeWithWasteM3: number;
  bagsRequired: number;
  estimatedCost: number | null;
}

// Rule of thumb: a 25kg bag of pre-mixed concrete yields ~0.0125 m³.
// A 20kg bag yields proportionally less (~0.01 m³).
const YIELD_PER_KG_M3 = 0.0125 / 25;

export function calculateConcrete(input: ConcreteInput): ConcreteResult {
  const lengthM = toMetres(input.length, input.unit);
  const widthM = toMetres(input.width, input.unit);
  const depthM = input.depth / 1000; // depth always entered in mm

  const volumeM3 = lengthM * widthM * depthM;
  const volumeWithWasteM3 = volumeM3 * (1 + input.wastePercent / 100);

  const yieldPerBagM3 = YIELD_PER_KG_M3 * input.bagSizeKg;
  const bagsRequired = Math.ceil(volumeWithWasteM3 / yieldPerBagM3);

  const estimatedCost = input.pricePerBag
    ? Math.round(bagsRequired * input.pricePerBag * 100) / 100
    : null;

  return { volumeM3, volumeWithWasteM3, bagsRequired, estimatedCost };
}

export interface BrickInput {
  wallLength: number;
  wallHeight: number;
  unit: Unit;
  brickLengthMm: number;
  brickHeightMm: number;
  mortarJointMm: number; // typically 10mm
  wastePercent: number;
}

export interface BrickResult {
  wallAreaM2: number;
  bricksRequired: number;
  mortarBagsEstimate: number;
}

// Rule of thumb: standard brickwork uses ~60 bricks per m² (single-skin,
// standard UK brick size with 10mm joints). We scale that baseline
// against the actual brick + joint dimensions entered.
const BASELINE_BRICKS_PER_M2 = 60;
const BASELINE_BRICK_LENGTH_MM = 215;
const BASELINE_BRICK_HEIGHT_MM = 65;
const BASELINE_JOINT_MM = 10;

// Rule of thumb: 1 bag of mortar (25kg) lays roughly 100 bricks.
const BRICKS_PER_MORTAR_BAG = 100;

export function calculateBrick(input: BrickInput): BrickResult {
  const lengthM = toMetres(input.wallLength, input.unit);
  const heightM = toMetres(input.wallHeight, input.unit);
  const wallAreaM2 = lengthM * heightM;

  const baselineUnitAreaMm2 =
    (BASELINE_BRICK_LENGTH_MM + BASELINE_JOINT_MM) *
    (BASELINE_BRICK_HEIGHT_MM + BASELINE_JOINT_MM);
  const actualUnitAreaMm2 =
    (input.brickLengthMm + input.mortarJointMm) *
    (input.brickHeightMm + input.mortarJointMm);

  const bricksPerM2 =
    BASELINE_BRICKS_PER_M2 * (baselineUnitAreaMm2 / actualUnitAreaMm2);

  const rawBricks = wallAreaM2 * bricksPerM2;
  const bricksRequired = Math.ceil(rawBricks * (1 + input.wastePercent / 100));
  const mortarBagsEstimate = Math.ceil(bricksRequired / BRICKS_PER_MORTAR_BAG);

  return { wallAreaM2, bricksRequired, mortarBagsEstimate };
}

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