// Metadata-only registry types. This is deliberately NOT a generic UI
// renderer — each tool's form is different enough (sliders, preset button
// groups, dynamic lists, dropdowns) that forcing them through one shared
// component would mean fighting the framework more than it saves. Instead,
// this registry is the single source of truth for the text and routing that
// every tool needs, so adding a tool means adding one entry here rather than
// hunting through the homepage, page metadata, and header separately.

// Matches a case in components/ToolIcon.tsx. Add a new icon there before
// referencing a new value here.
export type ToolIconName =
  | "concrete"
  | "brick"
  | "rebar"
  | "excavation"
  | "unit-converter"
  | "material-cost";

export interface ToolMeta {
  slug: string; // matches the route folder under app/, e.g. "concrete-calculator"
  name: string; // display name, e.g. "Concrete Calculator"
  cardDescription: string; // short line shown on the homepage tool card
  subtitle: string; // one-liner shown under the title on the tool's own page
  pageDescription: string; // meta description for the tool's page
  icon: ToolIconName; // homepage card mark, see components/ToolIcon.tsx
}

// Matches a case in components/DepartmentIcon.tsx. Add a new icon there
// before referencing a new value here.
export type DepartmentIconName =
  | "construction"
  | "plumbing"
  | "catering"
  | "business"
  | "electrician";

export interface Rack {
  slug: string;
  name: string;
  tagline: string; // short label shown on the homepage bin, e.g. "6 calculators"
  icon: DepartmentIconName;
  tools: ToolMeta[];
  comingSoon?: boolean; // renders as a muted, unclickable bin instead of a linked one
}
