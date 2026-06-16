import { drizzle, type PostgresJsDatabase } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

export type DB = PostgresJsDatabase<typeof schema>;

const globalForDb = globalThis as unknown as {
  __jmcSql?: ReturnType<typeof postgres>;
  __jmcDb?: DB;
};

/** Lazily connect, so importing the package doesn't require DATABASE_URL. */
export function getDb(): DB {
  if (globalForDb.__jmcDb) return globalForDb.__jmcDb;

  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error("DATABASE_URL is not set");
  }

  const sql = globalForDb.__jmcSql ?? postgres(connectionString, { max: 10 });
  const db = drizzle(sql, { schema });

  if (process.env.NODE_ENV !== "production") {
    globalForDb.__jmcSql = sql;
    globalForDb.__jmcDb = db;
  }
  return db;
}
