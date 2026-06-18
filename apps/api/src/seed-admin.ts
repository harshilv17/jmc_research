import { eq } from "drizzle-orm";
import { getDb, schema } from "@jmc/db";
import { hashPassword } from "./lib/password";

/** Create or update the first admin user from env. */
async function main() {
  const email = (process.env.ADMIN_EMAIL ?? "").toLowerCase().trim();
  const password = process.env.ADMIN_PASSWORD ?? "";
  const name = process.env.ADMIN_NAME ?? "Admin";

  if (!email || !password) {
    throw new Error("Set ADMIN_EMAIL and ADMIN_PASSWORD");
  }

  const db = getDb();
  const passwordHash = await hashPassword(password);

  const existing = await db.query.users.findFirst({
    where: eq(schema.users.email, email),
  });

  if (existing) {
    await db
      .update(schema.users)
      .set({ passwordHash, name, role: "admin", updatedAt: new Date() })
      .where(eq(schema.users.id, existing.id));
    console.log(`Updated admin: ${email}`);
  } else {
    await db
      .insert(schema.users)
      .values({ email, passwordHash, name, role: "admin" });
    console.log(`Created admin: ${email}`);
  }
  process.exit(0);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
