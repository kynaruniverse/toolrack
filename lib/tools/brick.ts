import { Unit, toMetres, MixRatio, MixResult, calculateMixRatio } from "@/lib/units";

export interface BrickInput {
  wallLength: number;
  wallHeight: number;
  unit: Unit;
  unitType: "brick" | "block";
  brickLengthMm: number;
  brickHeightMm: number;
  mortarJointMm: number; // typically 10mm
  mortarBagSizeKg: 20 | 25;
  mortarRatio: MixRatio;
  wastePercent: number;
}

export interface BrickResult {
  wallAreaM2: number;
  bricksRequired: number;
  mortarVolumeM3: number;
  mortarMix: MixResult;
}

// Rule of thumb: standard brickwork uses ~60 bricks per m² (single-skin,
// standard UK brick size with 10mm joints). We scale that baseline
// against the actual brick + joint dimensions entered. The same formula
// works for blockwork by swapping in block dimensions.
const BASELINE_BRICKS_PER_M2 = 60;
const BASELINE_BRICK_LENGTH_MM = 215;
const BASELINE_BRICK_HEIGHT_MM = 65;
const BASELINE_JOINT_MM = 10;

// Rule of thumb: roughly 0.03 m³ of mortar per brick/block including joints,
// scaled by how the unit's actual joint area compares to the baseline.
const MORTAR_M3_PER_UNIT = 0.03;

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

  const unitAreaScale = actualUnitAreaMm2 / baselineUnitAreaMm2;
  const mortarVolumeM3 =
    Math.round(bricksRequired * MORTAR_M3_PER_UNIT * unitAreaScale * 1000) / 1000;

  const mortarMix = calculateMixRatio({
    dryVolumeM3: mortarVolumeM3,
    ratio: input.mortarRatio,
    cementBagSizeKg: input.mortarBagSizeKg,
  });

  return { wallAreaM2, bricksRequired, mortarVolumeM3, mortarMix };
}
