import { relations } from "drizzle-orm";
import {
  boolean,
  integer,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
  uuid,
} from "drizzle-orm/pg-core";

// ── enums ───────────────────────────────────────────────────────────────────
export const categoryEnum = pgEnum("category", [
  "sherwani",
  "bandhgala",
  "tuxedo",
  "kurta",
  "jacket",
  "footwear",
  "accessories",
  "couture-set",
]);

export const productStatusEnum = pgEnum("product_status", [
  "draft",
  "active",
  "archived",
]);

export const orderStatusEnum = pgEnum("order_status", [
  "pending",
  "confirmed",
  "in-production",
  "shipped",
  "delivered",
  "cancelled",
]);

export const inquiryStatusEnum = pgEnum("inquiry_status", [
  "new",
  "contacted",
  "closed",
]);

export const userRoleEnum = pgEnum("user_role", ["admin", "staff"]);

const timestamps = {
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
};

// ── catalog ──────────────────────────────────────────────────────────────────
export const products = pgTable(
  "products",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    handle: text("handle").notNull(),
    title: text("title").notNull(),
    subtitle: text("subtitle"),
    description: text("description"),
    category: categoryEnum("category").notNull(),
    status: productStatusEnum("status").notNull().default("draft"),
    priceOnRequest: boolean("price_on_request").notNull().default(true),
    /** minor currency units (paise); null when price on request */
    basePrice: integer("base_price"),
    currency: text("currency").notNull().default("INR"),
    ...timestamps,
  },
  (t) => [uniqueIndex("products_handle_idx").on(t.handle)],
);

export const productImages = pgTable("product_images", {
  id: uuid("id").primaryKey().defaultRandom(),
  productId: uuid("product_id")
    .notNull()
    .references(() => products.id, { onDelete: "cascade" }),
  url: text("url").notNull(),
  alt: text("alt").notNull().default(""),
  position: integer("position").notNull().default(0),
});

export const variants = pgTable(
  "variants",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    productId: uuid("product_id")
      .notNull()
      .references(() => products.id, { onDelete: "cascade" }),
    sku: text("sku").notNull(),
    label: text("label").notNull(),
    priceDelta: integer("price_delta").notNull().default(0),
    position: integer("position").notNull().default(0),
  },
  (t) => [uniqueIndex("variants_sku_idx").on(t.sku)],
);

// ── inventory (OMS core) ─────────────────────────────────────────────────────
export const inventory = pgTable("inventory", {
  id: uuid("id").primaryKey().defaultRandom(),
  variantId: uuid("variant_id")
    .notNull()
    .references(() => variants.id, { onDelete: "cascade" }),
  quantity: integer("quantity").notNull().default(0),
  reserved: integer("reserved").notNull().default(0),
  location: text("location").notNull().default("atelier"),
  ...timestamps,
});

// ── collections ──────────────────────────────────────────────────────────────
export const collections = pgTable(
  "collections",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    slug: text("slug").notNull(),
    title: text("title").notNull(),
    description: text("description").notNull().default(""),
    heroImage: text("hero_image"),
    position: integer("position").notNull().default(0),
    published: boolean("published").notNull().default(false),
    ...timestamps,
  },
  (t) => [uniqueIndex("collections_slug_idx").on(t.slug)],
);

export const productCollections = pgTable("product_collections", {
  productId: uuid("product_id")
    .notNull()
    .references(() => products.id, { onDelete: "cascade" }),
  collectionId: uuid("collection_id")
    .notNull()
    .references(() => collections.id, { onDelete: "cascade" }),
  position: integer("position").notNull().default(0),
});

// ── customers & orders ───────────────────────────────────────────────────────
export const customers = pgTable(
  "customers",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    email: text("email").notNull(),
    name: text("name"),
    phone: text("phone"),
    ...timestamps,
  },
  (t) => [uniqueIndex("customers_email_idx").on(t.email)],
);

export const orders = pgTable(
  "orders",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    number: text("number").notNull(),
    customerId: uuid("customer_id").references(() => customers.id),
    status: orderStatusEnum("status").notNull().default("pending"),
    subtotal: integer("subtotal").notNull().default(0),
    total: integer("total").notNull().default(0),
    currency: text("currency").notNull().default("INR"),
    notes: text("notes"),
    ...timestamps,
  },
  (t) => [uniqueIndex("orders_number_idx").on(t.number)],
);

export const orderItems = pgTable("order_items", {
  id: uuid("id").primaryKey().defaultRandom(),
  orderId: uuid("order_id")
    .notNull()
    .references(() => orders.id, { onDelete: "cascade" }),
  variantId: uuid("variant_id").references(() => variants.id),
  productTitle: text("product_title").notNull(),
  unitPrice: integer("unit_price").notNull().default(0),
  quantity: integer("quantity").notNull().default(1),
});

// ── leads ────────────────────────────────────────────────────────────────────
export const inquiries = pgTable("inquiries", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull().default(""),
  occasion: text("occasion").notNull().default(""),
  eventDate: text("event_date").notNull().default(""),
  message: text("message").notNull().default(""),
  piece: text("piece").notNull().default(""),
  status: inquiryStatusEnum("status").notNull().default("new"),
  ...timestamps,
});

// ── admin / CMS users ────────────────────────────────────────────────────────
export const users = pgTable(
  "users",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    email: text("email").notNull(),
    passwordHash: text("password_hash").notNull(),
    name: text("name"),
    role: userRoleEnum("role").notNull().default("staff"),
    ...timestamps,
  },
  (t) => [uniqueIndex("users_email_idx").on(t.email)],
);

// ── relations ────────────────────────────────────────────────────────────────
export const productsRelations = relations(products, ({ many }) => ({
  images: many(productImages),
  variants: many(variants),
  collections: many(productCollections),
}));

export const productImagesRelations = relations(productImages, ({ one }) => ({
  product: one(products, {
    fields: [productImages.productId],
    references: [products.id],
  }),
}));

export const variantsRelations = relations(variants, ({ one, many }) => ({
  product: one(products, {
    fields: [variants.productId],
    references: [products.id],
  }),
  inventory: many(inventory),
}));

export const collectionsRelations = relations(collections, ({ many }) => ({
  products: many(productCollections),
}));

export const productCollectionsRelations = relations(
  productCollections,
  ({ one }) => ({
    product: one(products, {
      fields: [productCollections.productId],
      references: [products.id],
    }),
    collection: one(collections, {
      fields: [productCollections.collectionId],
      references: [collections.id],
    }),
  }),
);

export const ordersRelations = relations(orders, ({ one, many }) => ({
  customer: one(customers, {
    fields: [orders.customerId],
    references: [customers.id],
  }),
  items: many(orderItems),
}));

export const orderItemsRelations = relations(orderItems, ({ one }) => ({
  order: one(orders, {
    fields: [orderItems.orderId],
    references: [orders.id],
  }),
}));
