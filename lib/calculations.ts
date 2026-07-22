// Backward-compatible barrel. The actual logic now lives split by tool in
// lib/tools/*.ts (plus shared unit/mix logic in lib/units.ts) — see the
// README for the registry pattern. This file just re-exports everything
// from its old single-file location, so existing imports of
// "@/lib/calculations" keep working without touching every component.

export * from "@/lib/units";
export * from "@/lib/tools/concrete";
export * from "@/lib/tools/brick";
export * from "@/lib/tools/materialCost";
export * from "@/lib/tools/rebar";
export * from "@/lib/tools/excavation";
export * from "@/lib/tools/unitConverter";
