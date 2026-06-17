import type { Category } from "@jmc/core";
import { apiGet, apiGetSafe } from "./api";

// ── view models ──────────────────────────────────────────────────────────────
export type CatalogImage = { src: string; alt: string };

export type CatalogProduct = {
  handle: string;
  title: string;
  subtitle?: string | null;
  description?: string | null;
  category: Category;
  priceOnRequest: boolean;
  basePrice: number | null;
  currency: string;
  images: CatalogImage[];
};

export type CatalogCollection = {
  slug: string;
  title: string;
  description: string;
  products: CatalogProduct[];
};

// ── API row shapes ───────────────────────────────────────────────────────────
type ApiImage = { url: string; alt: string };
type ApiProduct = {
  handle: string;
  title: string;
  subtitle: string | null;
  description: string | null;
  category: Category;
  priceOnRequest: boolean;
  basePrice: number | null;
  currency: string;
  images?: ApiImage[];
};

function toCatalog(p: ApiProduct): CatalogProduct {
  return {
    handle: p.handle,
    title: p.title,
    subtitle: p.subtitle,
    description: p.description,
    category: p.category,
    priceOnRequest: p.priceOnRequest,
    basePrice: p.basePrice,
    currency: p.currency,
    images: (p.images ?? []).map((i) => ({ src: i.url, alt: i.alt || p.title })),
  };
}

/** Presentation metadata for each category-backed collection. */
export const CATEGORY_META: Record<Category, { title: string; description: string }> = {
  sherwani: {
    title: "Sherwanis",
    description:
      "The cornerstone of the groom's wardrobe — hand-worked silhouettes for the wedding day.",
  },
  bandhgala: {
    title: "Bandhgalas & Nehru",
    description: "Structured, sovereign, endlessly versatile.",
  },
  tuxedo: {
    title: "Tuxedos & Suiting",
    description: "Western black-tie reimagined through the atelier's hand.",
  },
  kurta: {
    title: "Kurta Sets",
    description: "Fluid, fabric-led pieces for the days around the day.",
  },
  jacket: {
    title: "Jackets & Co-ords",
    description: "Short jackets, shrugs and layered co-ords with quiet drama.",
  },
  footwear: {
    title: "Footwear",
    description: "Peshawaris and loafers, finished to the same standard as the cloth.",
  },
  accessories: {
    title: "Accessories",
    description: "Kalgis and finishing details that complete the look.",
  },
  "couture-set": {
    title: "Signature Sets",
    description: "Complete couture sets from across the collections.",
  },
};

const CATEGORY_ORDER = Object.keys(CATEGORY_META) as Category[];

export function categoryToSlug(c: Category): string {
  return c;
}

// ── queries ──────────────────────────────────────────────────────────────────
export async function getProducts(): Promise<CatalogProduct[]> {
  const data = await apiGetSafe<{ products: ApiProduct[] }>(
    "/products?status=active",
  );
  return (data?.products ?? []).map(toCatalog);
}

export async function getProduct(handle: string): Promise<CatalogProduct | null> {
  const data = await apiGetSafe<{ product: ApiProduct }>(`/products/${handle}`);
  return data ? toCatalog(data.product) : null;
}

/** Collections derived from active-product categories. */
export async function getCollections(): Promise<CatalogCollection[]> {
  const products = await getProducts();
  return CATEGORY_ORDER.map((cat) => ({
    slug: cat,
    title: CATEGORY_META[cat].title,
    description: CATEGORY_META[cat].description,
    products: products.filter((p) => p.category === cat),
  })).filter((c) => c.products.length > 0);
}

export async function getCollection(
  slug: string,
): Promise<CatalogCollection | null> {
  if (!(slug in CATEGORY_META)) return null;
  const cat = slug as Category;
  const products = (await getProducts()).filter((p) => p.category === cat);
  return {
    slug,
    title: CATEGORY_META[cat].title,
    description: CATEGORY_META[cat].description,
    products,
  };
}

export async function getRelated(
  handle: string,
  category: Category,
  limit = 4,
): Promise<CatalogProduct[]> {
  const products = await getProducts();
  return products
    .filter((p) => p.category === category && p.handle !== handle)
    .slice(0, limit);
}

export { apiGet };
