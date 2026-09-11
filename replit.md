# PERFI-SITE

PERFI-SITE is the website creation and publishing platform for PERFI TECH GLOBAL VENTURE LIMITED.

## Run & Operate

- `pnpm --filter @workspace/api-server run dev` — run the API server (port 5000)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- Required env: `DATABASE_URL` — Postgres connection string

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- API: Express 5
- DB: PostgreSQL + Drizzle ORM
- Validation: Zod (`zod/v4`), `drizzle-zod`
- API codegen: Orval (from OpenAPI spec)
- Build: esbuild (CJS bundle)

## Where things live

- `.conversation/app` — the imported Next.js application and route tree.
- `.conversation/components` — branded marketing, dashboard, and builder UI.
- `.conversation/lib/builder` — source of truth for website, page, section, and theme models.
- `.conversation/lib/builder/sections.ts` — editable section registry and default props.
- `artifacts/api-server` — shared API service scaffold for future server contracts.
- `lib/db` and `lib/api-spec` — workspace database and API contract packages reserved for future persistence.

## Architecture decisions

- The imported Next.js application is preserved under `.conversation`; new PERFI-SITE work builds on its routes and components.
- Website content is modeled as `Site -> Page -> Section`, with section defaults and editor fields defined in one registry.
- The first builder pass uses browser-local persistence until Supabase is connected; it does not pretend to provide live hosting, domains, payments, or AI.
- PERFI-SITE is the only product scope; PERFI COIN and PERFIPAY are intentionally excluded.

## Product

Customers can create branded websites with AI or manually, edit responsive pages, preview and publish sites, and later manage domains, hosting, commerce, analytics, services, invoices, support, and settings from one dashboard.

## User preferences

- Preserve the existing PERFI-SITE visual design, branding, routes, components, and functionality when extending the imported project.

## Gotchas

- Do not add PERFI COIN or PERFIPAY.
- Do not create fake payment, domain registration, hosting, or AI integrations; use explicit integration interfaces until configured.

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
