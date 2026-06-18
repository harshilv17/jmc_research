import { eq } from "drizzle-orm";
import { Hono } from "hono";
import { z } from "zod";
import { getDb, schema } from "@jmc/db";
import { verifyPassword } from "../lib/password";

export const auth = new Hono();

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

// Verify credentials. The admin app owns the session cookie; this only
// authenticates and returns the user.
auth.post("/login", async (c) => {
  const body = await c.req.json().catch(() => null);
  const parsed = loginSchema.safeParse(body);
  if (!parsed.success) return c.json({ error: "Invalid request" }, 422);

  const db = getDb();
  const user = await db.query.users.findFirst({
    where: eq(schema.users.email, parsed.data.email.toLowerCase()),
  });
  if (!user || !(await verifyPassword(parsed.data.password, user.passwordHash))) {
    return c.json({ error: "Invalid email or password" }, 401);
  }

  return c.json({
    user: { id: user.id, email: user.email, name: user.name, role: user.role },
  });
});
