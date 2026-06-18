import { z } from "zod";

export const categorySchema = z.enum([
  "sherwani",
  "bandhgala",
  "tuxedo",
  "kurta",
  "jacket",
  "footwear",
  "accessories",
  "couture-set",
]);

export const productStatusSchema = z.enum(["draft", "active", "archived"]);

/** Payload for creating/updating a product via the admin/API. */
export const productInputSchema = z.object({
  handle: z
    .string()
    .min(1)
    .regex(/^[a-z0-9-]+$/, "lowercase, digits and hyphens only"),
  title: z.string().min(1),
  subtitle: z.string().optional(),
  description: z.string().optional(),
  category: categorySchema,
  status: productStatusSchema.default("draft"),
  priceOnRequest: z.boolean().default(true),
  basePrice: z.number().int().nonnegative().nullable().default(null),
  currency: z.string().length(3).default("INR"),
});
export type ProductInput = z.infer<typeof productInputSchema>;

export const productUpdateSchema = productInputSchema.partial();
export type ProductUpdate = z.infer<typeof productUpdateSchema>;

export const productImageInputSchema = z.object({
  url: z.string().url(),
  alt: z.string().default(""),
  position: z.number().int().default(0),
});
export type ProductImageInput = z.infer<typeof productImageInputSchema>;

export const variantInputSchema = z.object({
  sku: z.string().min(1),
  label: z.string().min(1),
  priceDelta: z.number().int().default(0),
  position: z.number().int().default(0),
});
export type VariantInput = z.infer<typeof variantInputSchema>;

export const variantUpdateSchema = variantInputSchema.partial();
export type VariantUpdate = z.infer<typeof variantUpdateSchema>;

export const inventoryUpdateSchema = z.object({
  quantity: z.number().int().nonnegative(),
  reserved: z.number().int().nonnegative().default(0),
  location: z.string().default("atelier"),
});
export type InventoryUpdate = z.infer<typeof inventoryUpdateSchema>;

export const collectionInputSchema = z.object({
  slug: z
    .string()
    .min(1)
    .regex(/^[a-z0-9-]+$/),
  title: z.string().min(1),
  description: z.string().default(""),
  heroImage: z.string().url().optional(),
  position: z.number().int().default(0),
  published: z.boolean().default(false),
});
export type CollectionInput = z.infer<typeof collectionInputSchema>;

export const collectionUpdateSchema = collectionInputSchema.partial();
export type CollectionUpdate = z.infer<typeof collectionUpdateSchema>;

export const inquiryInputSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional().default(""),
  occasion: z.string().optional().default(""),
  eventDate: z.string().optional().default(""),
  message: z.string().optional().default(""),
  piece: z.string().optional().default(""),
  /** honeypot — must be empty */
  company: z.string().optional().default(""),
});
export type InquiryInput = z.infer<typeof inquiryInputSchema>;
