/** Shared domain contracts (DTOs) used across web, admin and api. */

export type Category =
  | "sherwani"
  | "bandhgala"
  | "tuxedo"
  | "kurta"
  | "jacket"
  | "footwear"
  | "accessories"
  | "couture-set";

export type ProductStatus = "draft" | "active" | "archived";
export type Availability = "made-to-order" | "in-stock" | "sold-out";
export type OrderStatus =
  | "pending"
  | "confirmed"
  | "in-production"
  | "shipped"
  | "delivered"
  | "cancelled";
export type InquiryStatus = "new" | "contacted" | "closed";

export type ProductImage = {
  id: string;
  url: string;
  alt: string;
  position: number;
};

export type Variant = {
  id: string;
  sku: string;
  label: string;
  /** minor currency units added to base price */
  priceDelta: number;
  position: number;
  /** available units (quantity - reserved) */
  available: number;
};

export type Product = {
  id: string;
  handle: string;
  title: string;
  subtitle?: string;
  description?: string;
  category: Category;
  status: ProductStatus;
  priceOnRequest: boolean;
  /** minor currency units (e.g. paise); null when price-on-request */
  basePrice: number | null;
  currency: string;
  images: ProductImage[];
  variants: Variant[];
};

export type Collection = {
  id: string;
  slug: string;
  title: string;
  description: string;
  heroImage?: string;
  position: number;
  published: boolean;
};
