# ToolRack

The digital toolbox for skilled trades. MVP scope: Construction rack
(Concrete, Brick, Rebar, Excavation, Unit Converter, Material Cost
calculators). See the concept doc for full product strategy.

## Stack

- Next.js 14 (App Router) + TypeScript
- Tailwind CSS
- No backend/database yet — Stage 1 is public, stateless calculators

## Architecture

- `lib/types.ts` — `ToolMeta` and `Rack` interfaces. Metadata-only: name,
  slug, and the text shown on the homepage card / tool header / page meta.
  This is deliberately NOT a generic UI schema — each tool's form is
  different enough (sliders, preset button groups, dynamic lists,
  dropdowns) that forcing them through one shared renderer would cost more
  than it saves.
- `lib/racks.ts` — the registry. One array of `Rack`s, each holding its
  `ToolMeta[]`. The homepage and every tool page pull their name/description
  text from here, so it only needs to be written once per tool.
- `lib/units.ts` — shared helpers used by more than one tool (metric/imperial
  conversion, the cement:sand:aggregate mix-ratio calculation used by both
  Concrete and Brick).
- `lib/tools/<name>.ts` — one file per tool, pure calculation logic only, no
  UI, no imports from React.
- `lib/calculations.ts` — a thin backward-compatible barrel that re-exports
  everything from `lib/units.ts` and `lib/tools/*.ts`. Existing imports of
  `@/lib/calculations` still work; new code can import directly from
  `@/lib/tools/<name>` if you prefer.
- `components/calculators/<Name>.tsx` — one bespoke component per tool. Each
  owns its own form UI and reads its calc function from `lib/tools/<name>.ts`.
- `components/ToolHeader.tsx` — the one shared piece of UI: the pegboard
  header + back link used by every tool page.
- `app/<tool-slug>/page.tsx` — one thin page per tool. Pulls its
  name/subtitle/description from `lib/racks.ts` via `getToolBySlug`, renders
  `<ToolHeader>`, then the tool's own component.

Routes are flat at the root (`/concrete-calculator`, not
`/construction/concrete-calculator`) because the flat URLs were already live
and shared before this registry existed — changing them now would break
already-indexed/shared links. A future non-construction rack (e.g. Catering)
can either stay flat too or get its own prefix; it doesn't have to match
Construction's URL shape.

## Workflow

Edit files in SPCK Editor, commit and push to GitHub. There's no local dev
server in this workflow — Vercel builds and serves the app on push, so you
preview changes on the live deploy rather than `localhost`.

## Deploy (Vercel)

1. Push this repo to GitHub.
2. Import it in Vercel — it auto-detects Next.js, no config needed.
3. Every push to `main` redeploys automatically; other branches get their
   own preview URL, useful for trying changes before merging to `main`.

## Adding a new construction tool

1. Add calculation logic in `lib/tools/<name>.ts` — pure functions, no UI.
2. Add an entry to the `construction` rack in `lib/racks.ts` (name, slug,
   card description, subtitle, page description).
3. Build `components/calculators/<Name>.tsx` for the form + result UI.
4. Add `app/<slug>/page.tsx` that looks up the tool via `getToolBySlug`,
   renders `<ToolHeader>`, then your component.
5. It appears on the homepage automatically — the homepage reads the
   registry, not a hardcoded list.

## Not in MVP scope

No accounts, no Projects, no invoices/CRM/scheduling — see concept doc
§10 (Competitive Positioning) for the guardrail on what not to build yet.
