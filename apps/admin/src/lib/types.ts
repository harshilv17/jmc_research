import type { Category, ProductStatus } from "@jmc/core";

export type ProductRow = {
  id: string;
  handle: string;
  title: string;
  subtitle: string | null;
  description: string | null;
  category: Category;
  status: ProductStatus;
  priceOnRequest: boolean;
  basePrice: number | null;
  currency: string;
};

export type ProductImageRow = {
  id: string;
  url: string;
  alt: string;
  position: number;
};

export type ProductDetail = ProductRow & {
  images: ProductImageRow[];
  variants: { id: string; sku: string; label: string }[];
};

export type CollectionRow = {
  id: string;
  slug: string;
  title: string;
  description: string;
  heroImage: string | null;
  position: number;
  published: boolean;
};

export type InquiryRow = {
  id: string;
  name: string;
  email: string;
  phone: string;
  occasion: string;
  message: string;
  piece: string;
  status: string;
  createdAt: string;
};

export const CATEGORIES: Category[] = [
  "sherwani",
  "bandhgala",
  "tuxedo",
  "kurta",
  "jacket",
  "footwear",
  "accessories",
  "couture-set",
];

export const STATUSES: ProductStatus[] = ["draft", "active", "archived"];
