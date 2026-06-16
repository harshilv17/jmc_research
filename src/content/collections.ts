import type { Category, Collection, Product } from "./types";
import { products, productsByCategory } from "./products";

/**
 * Curated collections. Category-backed collections list every product of that
 * category; handle-backed collections are hand-ordered. Hand-curate freely.
 */
export const collections: Collection[] = [
  {
    slug: "sherwanis",
    title: "Sherwanis",
    description:
      "The cornerstone of the groom's wardrobe — hand-worked silhouettes for the wedding day.",
    handles: [],
    category: "sherwani",
  },
  {
    slug: "bandhgalas",
    title: "Bandhgalas & Nehru",
    description:
      "Structured, sovereign, endlessly versatile. Tailored closures with a modern line.",
    handles: [],
    category: "bandhgala",
  },
  {
    slug: "tuxedos",
    title: "Tuxedos & Suiting",
    description: "Western black-tie reimagined through the atelier's hand.",
    handles: [],
    category: "tuxedo",
  },
  {
    slug: "kurta-sets",
    title: "Kurta Sets",
    description: "Fluid, fabric-led pieces for the days around the day.",
    handles: [],
    category: "kurta",
  },
  {
    slug: "jackets",
    title: "Jackets & Co-ords",
    description: "Short jackets, shrugs and layered co-ords with quiet drama.",
    handles: [],
    category: "jacket",
  },
  {
    slug: "footwear",
    title: "Footwear",
    description: "Peshawaris and loafers, finished to the same standard as the cloth.",
    handles: [],
    category: "footwear",
  },
  {
    slug: "accessories",
    title: "Accessories",
    description: "Kalgis and finishing details that complete the look.",
    handles: [],
    category: "accessories",
  },
  {
    slug: "couture-sets",
    title: "Signature Sets",
    description: "Complete couture sets from across the collections.",
    handles: [],
    category: "couture-set",
  },
];

const bySlug = new Map(collections.map((c) => [c.slug, c]));

export function getCollection(slug: string): Collection | undefined {
  return bySlug.get(slug);
}

/** Products belonging to a collection (category-backed or hand-ordered). */
export function collectionProducts(collection: Collection): Product[] {
  if (collection.category) return productsByCategory(collection.category);
  const order = new Map(collection.handles.map((h, i) => [h, i]));
  return products
    .filter((p) => order.has(p.handle))
    .sort((a, b) => (order.get(a.handle)! - order.get(b.handle)!));
}

/** Collections that actually contain products, for index/nav. */
export function activeCollections(): Collection[] {
  return collections.filter((c) => collectionProducts(c).length > 0);
}
