# Architecture — Monorepo (client / server / db / cms)

Status: scaffolded 2026-06-16. Self-coded platform, no SaaS commerce.

## Layout (pnpm workspaces + Turborepo)

```
apps/
  web      @jmc/web     Storefront — Next.js (client + SSR). Port 3000.
  admin    @jmc/admin   CMS / OMS admin panel — Next.js. Port 3001.
  api      @jmc/api     Standalone backend — Hono on Node. Port 4000, base /v1.
packages/
  core     @jmc/core    Shared domain types + zod contracts (source-only).
  db       @jmc/db      Postgres schema + client (Drizzle ORM, source-only).
```

`web` and `admin` are clients; they talk to `api` over HTTP (`NEXT_PUBLIC_API_URL`).
`api` is the only thing that touches the database (`@jmc/db`). One server tier,
one DB boundary.

## Tooling
- Package manager: **pnpm** (workspaces). Orchestration: **Turborepo**.
- API: **Hono** + `@hono/node-server`, run via `tsx`.
- DB: **PostgreSQL** + **Drizzle ORM** / drizzle-kit (migrations in `packages/db/drizzle`).
- Validation: **zod** (shared in `@jmc/core`).
- Shared TS packages are source-only; Next transpiles them via `transpilePackages`.

## Database (OMS) — `packages/db/src/schema.ts`
Catalog: `products`, `product_images`, `variants`, `collections`,
`product_collections`. Inventory: `inventory` (quantity/reserved/location).
Commerce: `customers`, `orders`, `order_items`. Leads: `inquiries`.
CMS access: `users` (admin/staff). Money stored as integer minor units (paise),
default currency INR.

## API — `apps/api`
`/health`, and under `/v1`: `products` (list/get-by-handle/create),
`collections` (list/create), `inquiries` (submit/list). CORS limited to the
web + admin origins. DB client is lazy — the server boots without `DATABASE_URL`
(health works; data routes 500 until the DB is provisioned).

## Local dev
1. `cp .env.example .env` (root) and set `DATABASE_URL`.
2. `pnpm install`
3. `pnpm db:push` (apply schema to a running Postgres)
4. `pnpm dev` (turbo runs web :3000, admin :3001, api :4000)

## Content / catalog migration (in progress)
The storefront still ships the in-repo seed catalog (448 products) so it keeps
building during the restructure. **Next step:** stand up Postgres, build the
admin Products/Collections CRUD, point the storefront at the API, and delete the
seed (`apps/web/src/content/products.manifest.json` + `products.ts`). The catalog
becomes fully OMS-managed; no products ship in the repo.
