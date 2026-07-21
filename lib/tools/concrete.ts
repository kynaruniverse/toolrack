import { Tool } from "../types";

export interface ConcreteInput {
  lengthM: number;
  widthM: number;
  depthMm: number;
  wastePercent?: number;
}

// A standard 25kg bag of concrete mix yields roughly 0.0125 m³.
const M3_PER_25KG_BAG = 0.0125;

export const concreteCalculator: Tool<ConcreteInput> = {
  id: "concrete-calculator",
  slug: "concrete-calculator",
  name: "Concrete Calculator",
  description: "Work out how much concrete you need from length, width and depth.",
  rackId: "construction",
  compute: ({ lengthM, widthM, depthMm, wastePercent = 10 }) => {
    const depthM = depthMm / 1000;
    const rawVolume = lengthM * widthM * depthM;
    const volumeWithWaste = rawVolume * (1 + wastePercent / 100);
    const bags = Math.ceil(volumeWithWaste / M3_PER_25KG_BAG);

    return {
      summary: `${volumeWithWaste.toFixed(2)} m³ of concrete`,
      explanation: `You'll need approximately ${volumeWithWaste.toFixed(
        2
      )} cubic metres of concrete, including a ${wastePercent}% allowance for uneven ground and spillage. That's roughly ${bags} bags of 25kg mix if you're not ordering ready-mix.`,
      values: {
        rawVolumeM3: Number(rawVolume.toFixed(3)),
        volumeWithWasteM3: Number(volumeWithWaste.toFixed(3)),
        bags25kg: bags,
      },
    };
  },
};
