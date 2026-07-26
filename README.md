# ToolRack

The digital toolbox for skilled trades. Currently live: **Construction**
(Concrete, Brick, Rebar Weight, Excavation Volume, Unit Converter, Material
Cost) and **Catering** (Recipe Cost, Food Cost %, Menu Price & Markup,
Kitchen Unit Converter). Plumbing, Electrician, and Business are shown as
"coming soon" on the homepage but have no tools yet. See the concept doc for
full product strategy — note that Catering was added ahead of the concept
doc's original "one drawer" MVP sequencing, as a deliberate call rather than
evidence-gated expansion.

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
  text from here, so it only needs to be written once per tool. Currently
  holds two live racks (Construction, Catering) and three `comingSoon`
  placeholder racks (Plumbing, Electrician, Business) with empty `tools`
  arrays.
- `lib/units.ts` — shared helpers used by more than one tool (metric/imperial
  conversion, the cement:sand:aggregate mix-ratio calculation used by both
  Concrete and Brick).
- `lib/tools/<n>.ts` — one file per tool, pure calculation logic only, no
  UI, no imports from React.
- `lib/calculations.ts` — a thin backward-compatible barrel that re-exports
  everything from `lib/units.ts` and `lib/tools/*.ts`. Existing imports of
  `@/lib/calculations` still work; new code can import directly from
  `@/lib/tools/<n>` if you prefer.
- `components/calculators/<n>.tsx` — one bespoke component per tool. Each
  owns its own form UI and reads its calc function from `lib/tools/<n>.ts`.
- `components/ToolHeader.tsx` — the shared header used by every tool page
  (pegboard background + "back" link). Currently always links to `/`
  rather than back to the tool's own department — see "Known gaps" below.
- `components/DepartmentBin.tsx` — the homepage hang-tag "bin" for each
  rack; renders as a linked tag for live racks and a dimmed, unclickable
  tag for `comingSoon` racks.
- `app/<tool-slug>/page.tsx` — one thin page per tool. Pulls its
  name/subtitle/description from `lib/racks.ts` via `getToolBySlug`, renders
  `<ToolHeader>`, then the tool's own component.
- `app/departments/[slug]/page.tsx` — one hub page per rack, listing its
  tools as cards. Returns a 404 for unknown slugs and for `comingSoon`
  racks (they're not routable — the homepage bin for them isn't a link).

Routes are flat at the root (`/concrete-calculator`, not
`/construction/concrete-calculator`) because the flat URLs were already live
and shared before this registry existed — changing them now would break
already-indexed/shared links. Catering tools followed the same flat
convention rather than getting a `/catering/` prefix, to keep all tool URLs
consistent regardless of rack.

## Known gaps (tracked, not yet fixed)

- **Navigation**: every tool page's "← Back to the rack" link goes to `/`,
  not to `/departments/<rack-slug>`. The department hub exists but isn't
  reachable from a tool page — only from the homepage.
- **SEO metadata**: root `layout.tsx`'s title/description still only
  mention concrete/bricks/material costs — doesn't reflect the Catering
  rack.
- **Duplicate test files**: `menuPrice.test.ts`, `kitchenConverter.test.ts`,
  `foodCostPercent.test.ts`, and `recipeCost.test.ts` exist identically in
  both `tests/lib/tools/` and `components/calculators/`. The copies under
  `components/calculators/` are stray and should be deleted.
- **Department pages have no `opengraph-image.tsx`**, unlike every tool
  page and the homepage.

## Workflow

Edit files in SPCK Editor, commit and push to GitHub. There's no local dev
server in this workflow — Vercel builds and serves the app on push, so you
preview changes on the live deploy rather than `localhost`.

## Deploy (Vercel)

1. Push this repo to GitHub.
2. Import it in Vercel — it auto-detects Next.js, no config needed.
3. Every push to `main` redeploys automatically; other branches get their
   own preview URL, useful for trying changes before merging to `main`.
4. Live at toolrack.co.uk.

## Adding a new tool to an existing rack

1. Add calculation logic in `lib/tools/<n>.ts` — pure functions, no UI.
2. Add an entry to the relevant rack in `lib/racks.ts` (name, slug, card
   description, subtitle, page description, icon).
3. Add the icon case to `components/ToolIcon.tsx` and the value to the
   `ToolIconName` union in `lib/types.ts` if it's a new icon.
4. Build `components/calculators/<n>.tsx` for the form + result UI.
5. Add `app/<slug>/page.tsx` that looks up the tool via `getToolBySlug`,
   renders `<ToolHeader>` and `<ToolJsonLd>`, then your component.
6. It appears on the homepage and its department page automatically, and
   is picked up by `sitemap.ts` — nothing else needs to be touched.

## Adding a new rack (trade)

1. Add a new `Rack` entry to `lib/racks.ts` with its own `slug`, `name`,
   `tagline`, `code`, and `tools: []` (or `comingSoon: true` if it's a
   placeholder with no tools yet).
2. Once it has at least one tool, remove `comingSoon` — the department page
   and sitemap both filter on that flag automatically.
3. Decide on a URL convention for its tools before the first one ships and
   gets shared/indexed — flat (matching Construction/Catering) is simpler
   and is the current site-wide convention.

## Testing & CI

- `npm run typecheck`, `npm run lint`, and `npm run test` (Vitest) all run
  on every push/PR via `.github/workflows/ci.yml`.
- Every `lib/tools/<n>.ts` module has a matching test file under
  `tests/lib/tools/`.

## Not in current scope

No accounts, no Projects, no invoices/CRM/scheduling — see concept doc §10
(Competitive Positioning) for the guardrail on what not to build yet, and
§8 for the staged plan (free tools → free accounts/Projects → premium) that
Projects/accounts are part of when they do get built.
