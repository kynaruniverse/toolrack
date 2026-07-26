export type ToolIconName =
  | "concrete"
  | "brick"
  | "rebar"
  | "excavation"
  | "unit-converter"
  | "material-cost"
  | "recipe-cost"
  | "food-cost-percent"
  | "menu-price"
  | "kitchen-converter";

export type ToolType =
  | "calculator"
  | "converter"
  | "estimator"
  | "tracker"
  | "timer"
  | "checklist"
  | "scheduler"
  | "generator"
  | "comparator"
  | "scanner"
  | "analyser"
  | "formatter"
  | "predictor";

export interface ToolMeta {
  slug: string; // matches the route folder under app/, e.g. "concrete-calculator"
  name: string; // display name, e.g. "Concrete Calculator"
  cardDescription: string; // short line shown on the homepage tool card
  subtitle: string; // one-liner shown under the title on the tool's own page
  pageDescription: string; // meta description for the tool's page
  icon: ToolIconName; // homepage card mark, see components/ToolIcon.tsx
  toolType: ToolType; // what kind of tool this is, e.g. "calculator", "converter"
}

export interface Rack {
  slug: string;
  name: string;
  tagline: string; // short label shown on the homepage bin, e.g. "6 tools"
  code: string; // 2-3 letter code shown large on the hang-tag, e.g. "CON"
  tools: ToolMeta[];
  comingSoon?: boolean; // renders as a muted, unclickable bin instead of a linked one
}
