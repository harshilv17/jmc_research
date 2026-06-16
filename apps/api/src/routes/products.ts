import { eq } from "drizzle-orm";
import { Hono } from "hono";
import { getDb, schema } from "@jmc/db";
import { productInputSchema } from "@jmc/core";

export const products = new Hono();

// List products (optionally by status).
products.get("/", async (c) => {
  const db = getDb();
  const rows = await db.select().from(schema.products);
  return c.json({ products: rows });
});

// Single product by handle, with images + variants.
products.get("/:handle", async (c) => {
  const db = getDb();
  const handle = c.req.param("handle");
  const product = await db.query.products.findFirst({
    where: eq(schema.products.handle, handle),
    with: { images: true, variants: true },
  });
  if (!product) return c.json({ error: "Not found" }, 404);
  return c.json({ product });
});

// Create a product.
products.post("/", async (c) => {
  const body = await c.req.json().catch(() => null);
  const parsed = productInputSchema.safeParse(body);
  if (!parsed.success) {
    return c.json({ error: parsed.error.flatten() }, 422);
  }
  const db = getDb();
  const [created] = await db
    .insert(schema.products)
    .values(parsed.data)
    .returning();
  return c.json({ product: created }, 201);
});
