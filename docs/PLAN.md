# Jatin Malik Couture — Full Website Build Plan

Status: **Draft for approval** · Last updated: 2026-06-16

This document is the architecture + roadmap for taking the current single-page
landing into a full, self-coded, large-scale couture e-commerce website.

---

## 1. Goals & Principles

- **Own the whole stack.** No SaaS commerce platform (no Shopify, no
  BigCommerce). Catalog, cart, checkout flow, search, accounts, content — all
  built in-house in this repo.
- **Dev-managed content.** Collections, products, journal, and page copy live in
  the repo as typed data (JSON/MDX). No external CMS. A code change + deploy is
  the publishing mechanism.
- **Editorial-grade design.** Couture brand: slow, considered, image-led. The
  current visual language (Bricolage Grotesque + Sinistre, char/teal/gold/ivory
  palette) carries through every page.
- **Performance first.** Static where possible, server components by default,
  client JS only where interaction demands it. Keep the Lighthouse 100s.

### What "no third party" means here

| Concern | Decision |
|---|---|
| Commerce platform | **Self-coded.** No Shopify. |
| Content / CMS | **In-repo** (JSON + MDX). No headless CMS. |
| Search | **Self-coded** (Postgres FTS or in-memory index). |
| Auth / accounts | **Self-coded** (sessions + hashed passwords / email magic-link). |
| Database | **Postgres** — infra, self-hostable or managed. Not a platform lock-in. |
| Payments | **Gateway required** (PCI law) — Razorpay / Stripe / PayU. Only unavoidable exception. |
| Transactional email | **Sender advised** (Resend / SES). Self-SMTP possible but poor deliverability. |
| Hosting | Vercel now; portable to any Node host (no platform lock-in). |

---

## 2. Tech Stack

- **Framework:** Next.js 16 (App Router) + React 19 — already in place.
- **Styling:** Tailwind CSS v4 — already in place. Design tokens in `globals.css`.
- **Language:** TypeScript, strict.
- **Data (catalog/content):** typed modules in `src/content/**` (JSON + MDX), read
  at build time → static generation.
- **Data (transactional):** Postgres via **Drizzle ORM** (lightweight, SQL-first,
  no codegen daemon). Schema in `src/db/schema.ts`.
- **Cart state:** server-authoritative cart keyed by signed cookie session;
  client mirror via React context for instant UI.
- **Auth:** session cookies (httpOnly, signed). Passwordless email magic-link to
  start; add password later if wanted.
- **Validation:** `zod` for every API boundary and form.
- **Payments:** adapter interface (`src/payments/`) with one concrete gateway
  impl, so the gateway is swappable and isolated.
- **Email:** adapter interface (`src/email/`) — console driver in dev, real
  sender in prod.

> Only **two** new external runtime dependencies enter the trust boundary: the
> payment gateway and the email sender, both behind swappable adapters.

---

## 3. Information Architecture (routes)

```
/                         Home (evolve current landing into a storefront home)
/collections              All collections index
/collections/[slug]       Collection — filterable product grid
/products/[handle]        Product detail (gallery, details, made-to-order CTA)
/search                   Search results
/cart                     Cart
/checkout                 Checkout (multi-step) [Phase 4]
/account                  Account dashboard [Phase 5]
/account/orders           Order history
/atelier                  The atelier / craft / process
/about                    Brand story / heritage
/journal                  Editorial index
/journal/[slug]           Editorial article (MDX)
/appointments             Book a consultation (calendar + form)
/stores                   Locations
/contact                  Contact + FAQ
/legal/[slug]             Privacy, terms, shipping, returns
/api/*                    Route handlers (cart, checkout, inquiry, auth, search)
```

---

## 4. Data Model (first pass)

**In-repo (content):**
- `Product` — handle, title, story/description (MDX), collection refs, price (or
  "made to order"), media[], details (fabric, fit, care), variants[].
- `Variant` — id, label (size/colour), priceDelta, availability.
- `Collection` — slug, title, hero media, description, ordered product handles.
- `JournalPost` — slug, title, cover, date, body (MDX), tags.
- `Page` — slug, MDX (atelier/about/legal).

The existing `public/assets/product_manifest.json` (~ hundreds of products with
images) is the seed source — we normalise it into the typed `Product` shape and
download/optimise the imagery locally.

**In Postgres (transactional):**
- `users`, `sessions`
- `carts`, `cart_items`
- `orders`, `order_items`, `payments`
- `appointments`
- `inquiries` (replaces current console-only handler)

---

## 5. Feature Breakdown

- **Catalog:** collections, product grid w/ filters (collection, colour,
  category, price), sort, pagination.
- **Product detail:** image gallery w/ zoom, variant selection, size guide,
  fabric/craft notes, "made to order" vs buy-now, related products.
- **Search:** typeahead + results page, Postgres full-text over title/details.
- **Cart:** add/update/remove, persistent across sessions, mini-cart drawer.
- **Checkout:** address, shipping, gateway payment, order confirmation + email.
- **Accounts:** magic-link sign-in, order history, saved addresses, appointments.
- **Appointments:** consultation booking with availability + confirmation email.
- **Editorial:** journal/lookbooks in MDX, campaign pages.
- **Content pages:** atelier, about, stores, contact, FAQ, legal.
- **SEO/infra:** sitemap, robots, structured data (Product/Article), OG images.

---

## 6. Phased Roadmap

Each phase is independently shippable and reviewable.

### Phase 0 — Foundations (no visible change)
- Folder structure: `src/content`, `src/components/ui`, `src/lib`, `src/db`.
- Design system pass: extract reusable primitives from current landing
  (Section, Reveal, Button, Eyebrow, Heading, Rule).
- Content schema types + a typed loader for `src/content`.
- Normalise `product_manifest.json` → typed products; localise images.

### Phase 1 — Catalog (static, no cart)
- Global nav/header + footer upgraded for multi-page site.
- `/collections`, `/collections/[slug]`, `/products/[handle]` — fully static.
- Product grid + filters + product detail galleries.
- **Ship: browsable lookbook-grade catalog.**

### Phase 2 — Editorial & brand pages
- `/atelier`, `/about`, `/journal`, `/journal/[slug]`, `/stores`, `/contact`,
  `/legal/*`. MDX pipeline.
- **Ship: complete content site.**

### Phase 3 — Search + cart (DB enters)
- Postgres + Drizzle setup, migrations.
- Search route + typeahead.
- Server cart + mini-cart drawer.
- Replace inquiry handler with DB-backed `inquiries` + email adapter.
- **Ship: interactive storefront, cart works.**

### Phase 4 — Checkout & payments
- Checkout flow, payment gateway adapter, order creation, confirmation emails.
- **Ship: transactable store.** (Requires gateway + email decisions.)

### Phase 5 — Accounts & appointments
- Magic-link auth, account dashboard, order history.
- Appointment booking with availability.
- **Ship: full account experience.**

### Phase 6 — Polish & scale
- Structured data, sitemap, performance/a11y audits, analytics (self-hostable),
  error monitoring, rate limiting, admin view for orders/inquiries.

---

## 7. Open Decisions (need your input before the phases they gate)

1. **Payment gateway** (gates Phase 4): Razorpay (India-first), Stripe, or PayU?
2. **Pricing display** (gates Phase 1): show prices + buy, or "made to order /
   price on request" with inquiry, or hybrid per product?
3. **Database host** (gates Phase 3): managed (Neon/Supabase-Postgres) vs
   self-hosted Postgres.
4. **Email sender** (gates Phase 3/4): Resend, SES, or self-SMTP.
5. **Currency / regions:** INR only, or multi-currency?

---

## 8. Immediate Next Step

On approval: execute **Phase 0 + Phase 1** (foundations + static catalog) — the
biggest visible leap with zero infra dependencies, fully reviewable before any
database or payment work begins.
