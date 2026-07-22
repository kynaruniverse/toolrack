import { Rack } from "@/lib/types";

// Adding a new tool: write its calc logic in lib/tools/<name>.ts, add its
// entry here, then add app/<slug>/page.tsx + components/calculators/<Name>.tsx.
// The homepage and every page's <ToolHeader>/metadata pull from this file,
// so nothing else needs to be touched to keep them in sync.

export const racks: Rack[] = [
  {
    slug: "construction",
    name: "Construction",
    tools: [
      {
        slug: "concrete-calculator",
        name: "Concrete Calculator",
        cardDescription: "Volume, pre-mix bags, or a full cement/sand/aggregate mix breakdown.",
        subtitle: "Enter your slab dimensions to get cubic metres, bags, and cost.",
        pageDescription:
          "Calculate how much concrete you need for your job. Instant results, bags required, and estimated cost — built for tradespeople on-site.",
        icon: "concrete",
        flagship: true,
      },
      {
        slug: "brick-calculator",
        name: "Brick Calculator",
        cardDescription: "Bricks or blocks needed, plus a full mortar mix breakdown.",
        subtitle: "Enter your wall dimensions and brick size to get bricks and mortar needed.",
        pageDescription:
          "Calculate how many bricks or blocks and how much mortar you need for a wall. Instant results built for tradespeople on-site.",
        icon: "brick",
      },
      {
        slug: "rebar-calculator",
        name: "Rebar Weight Calculator",
        cardDescription: "Total steel weight from bar diameter, length, and quantity.",
        subtitle: "Select bar diameter and enter length and quantity to get total weight.",
        pageDescription:
          "Calculate steel rebar weight by diameter, length, and bar count. Built for tradespeople on-site.",
        icon: "rebar",
      },
      {
        slug: "excavation-calculator",
        name: "Excavation Volume Calculator",
        cardDescription: "Dig volume, bulked spoil, and skips required for your trench or hole.",
        subtitle: "Enter your trench or hole dimensions to get volume and spoil removal estimates.",
        pageDescription:
          "Calculate excavation volume, bulked spoil, and skips required for your dig. Built for tradespeople on-site.",
        icon: "excavation",
      },
      {
        slug: "unit-converter",
        name: "Unit Converter",
        cardDescription: "Quick length, area, volume, and weight conversions.",
        subtitle: "Convert between metric and imperial units — length, area, volume, and weight.",
        pageDescription: "Quick length, area, volume, and weight conversions for the job site.",
        icon: "unit-converter",
      },
      {
        slug: "material-cost-calculator",
        name: "Material Cost Calculator",
        cardDescription: "Add up materials, labour, and margin to build a quick job quote.",
        subtitle: "Add your materials, labour, and margin to get a quick job total.",
        pageDescription:
          "Add up materials, labour, and margin to build a quick job quote. Built for tradespeople on-site.",
        icon: "material-cost",
      },
    ],
  },
  {
    slug: "catering",
    name: "Catering",
    comingSoon: true,
    tools: [],
  },
];

export function getAllTools() {
  return racks.flatMap((rack) => rack.tools);
}

export function getToolBySlug(slug: string) {
  return getAllTools().find((tool) => tool.slug === slug);
}
