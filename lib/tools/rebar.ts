export interface RebarInput {
  diameterMm: number; // standard sizes: 6,8,10,12,16,20,25,32,40
  barLengthM: number; // length per bar
  numberOfBars: number;
}

export interface RebarResult {
  weightPerMetreKg: number;
  totalLengthM: number;
  totalWeightKg: number;
}

// Standard site rule of thumb for steel rebar weight: (d^2)/162 kg per metre, d in mm.
export function calculateRebarWeight(input: RebarInput): RebarResult {
  const weightPerMetreKg = (input.diameterMm * input.diameterMm) / 162;
  const totalLengthM = input.barLengthM * input.numberOfBars;
  const totalWeightKg = Math.round(weightPerMetreKg * totalLengthM * 100) / 100;

  return {
    weightPerMetreKg: Math.round(weightPerMetreKg * 1000) / 1000,
    totalLengthM,
    totalWeightKg,
  };
}
