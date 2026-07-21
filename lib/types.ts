// A Tool is generic on purpose: it takes structured input and produces a
// result that can later be saved to a Project. Not hardcoded as
// calculator-only — future tools may be checklists, reference guides, or
// lookups rather than pure number-in/number-out calculators.

export interface ToolResult {
  summary: string;        // e.g. "4.2 m³ of concrete"
  explanation?: string;   // practical rule-of-thumb context, not authoritative advice
  values: Record<string, number | string>;
}

export interface Tool<TInput = Record<string, number>> {
  id: string;
  slug: string;
  name: string;
  description: string;
  rackId: string;
  compute: (input: TInput) => ToolResult;
}

export interface Rack {
  id: string;
  slug: string;
  name: string;
  description: string;
  tools: Tool<any>[];
}
