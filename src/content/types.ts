/** Content schema for the catalog. All catalog data is dev-managed in-repo. */

export type Category =
  | "sherwani"
  | "bandhgala"
  | "tuxedo"
  | "kurta"
  | "jacket"
  | "footwear"
  | "accessories"
  | "couture-set";

export type Availability = "made-to-order" | "in-stock" | "sold-out";

export type ProductMedia = {
  /** Absolute (remote CDN) or app-relative ("/assets/...") image URL. */
  src: string;
  alt: string;
};

export type Variant = {
  id: string;
  /** e.g. size or colourway label */
  label: string;
  availability: Availability;
};

export type Product = {
  /** URL slug, unique. */
  handle: string;
  title: string;
  category: Category;
  /** Number of images known for the piece (from source manifest). */
  imageCount: number;
  media: ProductMedia[];
  /** Couture is made-to-order; price is on request unless set later. */
  priceOnRequest: boolean;
  availability: Availability;
};

export type Collection = {
  slug: string;
  title: string;
  description: string;
  /** Hero image; falls back to first product image if omitted. */
  hero?: string;
  /** Ordered product handles. Empty = computed (e.g. by category). */
  handles: string[];
  /** When set, the collection is all products of this category. */
  category?: Category;
};
