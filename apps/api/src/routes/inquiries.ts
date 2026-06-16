import { desc } from "drizzle-orm";
import { Hono } from "hono";
import { getDb, schema } from "@jmc/db";
import { inquiryInputSchema } from "@jmc/core";

export const inquiries = new Hono();

// Submit an inquiry (from the storefront form).
inquiries.post("/", async (c) => {
  const body = await c.req.json().catch(() => null);
  const parsed = inquiryInputSchema.safeParse(body);
  if (!parsed.success) {
    return c.json({ error: parsed.error.flatten() }, 422);
  }
  // Honeypot: silently accept bots.
  if (parsed.data.company) return c.json({ ok: true });

  const { company: _company, ...data } = parsed.data;
  const db = getDb();
  await db.insert(schema.inquiries).values(data);
  return c.json({ ok: true }, 201);
});

// List inquiries (admin).
inquiries.get("/", async (c) => {
  const db = getDb();
  const rows = await db
    .select()
    .from(schema.inquiries)
    .orderBy(desc(schema.inquiries.createdAt));
  return c.json({ inquiries: rows });
});
