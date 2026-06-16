import { Hono } from "hono";
import { getDb, schema } from "@jmc/db";
import { collectionInputSchema } from "@jmc/core";

export const collections = new Hono();

collections.get("/", async (c) => {
  const db = getDb();
  const rows = await db.select().from(schema.collections);
  return c.json({ collections: rows });
});

collections.post("/", async (c) => {
  const body = await c.req.json().catch(() => null);
  const parsed = collectionInputSchema.safeParse(body);
  if (!parsed.success) {
    return c.json({ error: parsed.error.flatten() }, 422);
  }
  const db = getDb();
  const [created] = await db
    .insert(schema.collections)
    .values(parsed.data)
    .returning();
  return c.json({ collection: created }, 201);
});
