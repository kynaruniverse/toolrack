# ToolRack

The digital toolbox for skilled trades. MVP scope: Construction rack only
(Concrete, Brick, Material Cost calculators). See the concept doc for full
product strategy.

## Stack

- Next.js 14 (App Router) + TypeScript
- Tailwind CSS
- No backend/database yet — Stage 1 is public, stateless calculators

## Architecture

- `lib/types.ts` — generic `Tool` and `Rack` interfaces. A tool takes
  structured input and returns a `ToolResult`; not hardcoded as
  calculator-only, so future tools (checklists, lookups) fit the same shape.
- `lib/tools/*.ts` — one file per tool, pure calculation logic, no UI.
- `lib/racks.ts` — registry. Adding a trade later means adding a rack here,
  not restructuring the app.
- `components/CalculatorCard.tsx` — generic form + result UI, driven by a
  field config, reused across every calculator page.
- `app/construction/<tool-slug>/page.tsx` — one thin page per tool that
  wires the tool + its field config into `CalculatorCard`.

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

1. Add calculation logic in `lib/tools/<name>.ts` following the `Tool`
   shape in `lib/types.ts`.
2. Register it in `lib/racks.ts`.
3. Add a page at `app/construction/<slug>/page.tsx` that passes the tool
   and its field config to `CalculatorCard`.

## Not in MVP scope

No accounts, no Projects, no invoices/CRM/scheduling — see concept doc
§10 (Competitive Positioning) for the guardrail on what not to build yet.
