import { eq } from "drizzle-orm";
import { Hono } from "hono";
import { z } from "zod";
import { getDb, schema } from "@jmc/db";
import {
  variantInputSchema,
  variantUpdateSchema,
  inventoryUpdateSchema,
} from "@jmc/core";

export const variants = new Hono();

const createSchema = variantInputSchema.extend({
  productId: z.string().uuid(),
});

// Create a variant (with a zeroed inventory row).
variants.post("/", async (c) => {
  const body = await c.req.json().catch(() => null);
  const parsed = createSchema.safeParse(body);
  if (!parsed.success) return c.json({ error: parsed.error.flatten() }, 422);

  const db = getDb();
  const { productId, ...variant } = parsed.data;
  const [created] = await db
    .insert(schema.variants)
    .values({ ...variant, productId })
    .returning();
  await db.insert(schema.inventory).values({ variantId: created.id });
  return c.json({ variant: created }, 201);
});

// Update a variant.
variants.patch("/:id", async (c) => {
  const body = await c.req.json().catch(() => null);
  const parsed = variantUpdateSchema.safeParse(body);
  if (!parsed.success) return c.json({ error: parsed.error.flatten() }, 422);
  const db = getDb();
  const [updated] = await db
    .update(schema.variants)
    .set(parsed.data)
    .where(eq(schema.variants.id, c.req.param("id")))
    .returning();
  if (!updated) return c.json({ error: "Not found" }, 404);
  return c.json({ variant: updated });
});

// Delete a variant.
variants.delete("/:id", async (c) => {
  const db = getDb();
  const [deleted] = await db
    .delete(schema.variants)
    .where(eq(schema.variants.id, c.req.param("id")))
    .returning();
  if (!deleted) return c.json({ error: "Not found" }, 404);
  return c.json({ ok: true });
});

// Set inventory for a variant (upsert the single inventory row).
variants.put("/:id/inventory", async (c) => {
  const body = await c.req.json().catch(() => null);
  const parsed = inventoryUpdateSchema.safeParse(body);
  if (!parsed.success) return c.json({ error: parsed.error.flatten() }, 422);

  const db = getDb();
  const variantId = c.req.param("id");
  const existing = await db.query.inventory.findFirst({
    where: eq(schema.inventory.variantId, variantId),
  });

  if (existing) {
    const [updated] = await db
      .update(schema.inventory)
      .set({ ...parsed.data, updatedAt: new Date() })
      .where(eq(schema.inventory.id, existing.id))
      .returning();
    return c.json({ inventory: updated });
  }
  const [created] = await db
    .insert(schema.inventory)
    .values({ ...parsed.data, variantId })
    .returning();
  return c.json({ inventory: created }, 201);
});
