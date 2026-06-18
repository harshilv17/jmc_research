import { serve } from "@hono/node-server";
import { serveStatic } from "@hono/node-server/serve-static";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { products } from "./routes/products";
import { collections } from "./routes/collections";
import { inquiries } from "./routes/inquiries";
import { auth } from "./routes/auth";

const app = new Hono();

app.use("*", logger());
app.use(
  "*",
  cors({
    origin: (process.env.CORS_ORIGINS ?? "http://localhost:3000,http://localhost:3001").split(
      ",",
    ),
    credentials: true,
  }),
);

app.get("/health", (c) => c.json({ ok: true, service: "jmc-api" }));

// Serve uploaded media from ./uploads.
app.use("/uploads/*", serveStatic({ root: "./" }));

const api = app.basePath("/v1");
api.route("/auth", auth);
api.route("/products", products);
api.route("/collections", collections);
api.route("/inquiries", inquiries);

const port = Number(process.env.PORT ?? 4000);
serve({ fetch: app.fetch, port }, (info) => {
  // eslint-disable-next-line no-console
  console.log(`[jmc-api] listening on http://localhost:${info.port}`);
});

export type AppType = typeof app;
