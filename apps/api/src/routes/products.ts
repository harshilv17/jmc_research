import { eq } from "drizzle-orm";
import { Hono } from "hono";
import { getDb, schema } from "@jmc/db";
import {
  productInputSchema,
  productUpdateSchema,
  productImageInputSchema,
  productStatusSchema,
} from "@jmc/core";

export const products = new Hono();

// List products (with images), optionally filtered by status.
products.get("/", async (c) => {
  const db = getDb();
  const status = productStatusSchema.safeParse(c.req.query("status"));
  const rows = await db.query.products.findMany({
    where: status.success
      ? eq(schema.products.status, status.data)
      : undefined,
    with: { images: { orderBy: (i, { asc: a }) => a(i.position) } },
    orderBy: (p, { asc: a }) => a(p.title),
  });
  return c.json({ products: rows });
});

// Admin: single product by id (with images + variants).
products.get("/detail/:id", async (c) => {
  const db = getDb();
  const product = await db.query.products.findFirst({
    where: eq(schema.products.id, c.req.param("id")),
    with: {
      images: { orderBy: (i, { asc: a }) => a(i.position) },
      variants: { orderBy: (v, { asc: a }) => a(v.position) },
    },
  });
  if (!product) return c.json({ error: "Not found" }, 404);
  return c.json({ product });
});

// Storefront: single product by handle (with images + variants).
products.get("/:handle", async (c) => {
  const db = getDb();
  const product = await db.query.products.findFirst({
    where: eq(schema.products.handle, c.req.param("handle")),
    with: {
      images: { orderBy: (i, { asc: a }) => a(i.position) },
      variants: { orderBy: (v, { asc: a }) => a(v.position) },
    },
  });
  if (!product) return c.json({ error: "Not found" }, 404);
  return c.json({ product });
});

// Create.
products.post("/", async (c) => {
  const body = await c.req.json().catch(() => null);
  const parsed = productInputSchema.safeParse(body);
  if (!parsed.success) return c.json({ error: parsed.error.flatten() }, 422);
  const db = getDb();
  const [created] = await db
    .insert(schema.products)
    .values(parsed.data)
    .returning();
  return c.json({ product: created }, 201);
});

// Update.
products.patch("/:id", async (c) => {
  const body = await c.req.json().catch(() => null);
  const parsed = productUpdateSchema.safeParse(body);
  if (!parsed.success) return c.json({ error: parsed.error.flatten() }, 422);
  const db = getDb();
  const [updated] = await db
    .update(schema.products)
    .set({ ...parsed.data, updatedAt: new Date() })
    .where(eq(schema.products.id, c.req.param("id")))
    .returning();
  if (!updated) return c.json({ error: "Not found" }, 404);
  return c.json({ product: updated });
});

// Delete.
products.delete("/:id", async (c) => {
  const db = getDb();
  const [deleted] = await db
    .delete(schema.products)
    .where(eq(schema.products.id, c.req.param("id")))
    .returning();
  if (!deleted) return c.json({ error: "Not found" }, 404);
  return c.json({ ok: true });
});

// Add an image to a product.
products.post("/:id/images", async (c) => {
  const body = await c.req.json().catch(() => null);
  const parsed = productImageInputSchema.safeParse(body);
  if (!parsed.success) return c.json({ error: parsed.error.flatten() }, 422);
  const db = getDb();
  const [image] = await db
    .insert(schema.productImages)
    .values({ ...parsed.data, productId: c.req.param("id") })
    .returning();
  return c.json({ image }, 201);
});

// Remove an image.
products.delete("/images/:imageId", async (c) => {
  const db = getDb();
  await db
    .delete(schema.productImages)
    .where(eq(schema.productImages.id, c.req.param("imageId")));
  return c.json({ ok: true });
});
