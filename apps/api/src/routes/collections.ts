import { asc, eq } from "drizzle-orm";
import { Hono } from "hono";
import { getDb, schema } from "@jmc/db";
import { collectionInputSchema, collectionUpdateSchema } from "@jmc/core";

export const collections = new Hono();

collections.get("/", async (c) => {
  const db = getDb();
  const rows = await db
    .select()
    .from(schema.collections)
    .orderBy(asc(schema.collections.position));
  return c.json({ collections: rows });
});

collections.post("/", async (c) => {
  const body = await c.req.json().catch(() => null);
  const parsed = collectionInputSchema.safeParse(body);
  if (!parsed.success) return c.json({ error: parsed.error.flatten() }, 422);
  const db = getDb();
  const [created] = await db
    .insert(schema.collections)
    .values(parsed.data)
    .returning();
  return c.json({ collection: created }, 201);
});

collections.patch("/:id", async (c) => {
  const body = await c.req.json().catch(() => null);
  const parsed = collectionUpdateSchema.safeParse(body);
  if (!parsed.success) return c.json({ error: parsed.error.flatten() }, 422);
  const db = getDb();
  const [updated] = await db
    .update(schema.collections)
    .set({ ...parsed.data, updatedAt: new Date() })
    .where(eq(schema.collections.id, c.req.param("id")))
    .returning();
  if (!updated) return c.json({ error: "Not found" }, 404);
  return c.json({ collection: updated });
});

collections.delete("/:id", async (c) => {
  const db = getDb();
  const [deleted] = await db
    .delete(schema.collections)
    .where(eq(schema.collections.id, c.req.param("id")))
    .returning();
  if (!deleted) return c.json({ error: "Not found" }, 404);
  return c.json({ ok: true });
});
