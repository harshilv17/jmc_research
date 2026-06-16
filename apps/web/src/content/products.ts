import type { Category, Product, ProductMedia } from "./types";
import rawManifest from "./products.manifest.json";

/** Shape of one entry in products.manifest.json (seeded from the live store). */
type RawProduct = {
  title: string;
  handle: string;
  n: number;
  img1?: string;
  img2?: string;
};

/** Keyword → category. Order matters: first match wins. */
const CATEGORY_RULES: Array<[RegExp, Category]> = [
  [/sherwani/i, "sherwani"],
  [/bandhgala|bandi|nehru/i, "bandhgala"],
  [/tux|tuxedo|blazer|overcoat|suit/i, "tuxedo"],
  [/kurta|angrakha|cowl/i, "kurta"],
  [/jacket|shrug|overshirt|co-?ord/i, "jacket"],
  [/loafer|peshawari|caligae|shoe|footwear/i, "footwear"],
  [/kalgi|brooch|pocket\s?square|stole|accessor/i, "accessories"],
];

function categorize(title: string): Category {
  for (const [re, cat] of CATEGORY_RULES) {
    if (re.test(title)) return cat;
  }
  // Generic "... Set" and everything else → couture set.
  return "couture-set";
}

function toMedia(raw: RawProduct): ProductMedia[] {
  const media: ProductMedia[] = [];
  if (raw.img1) media.push({ src: raw.img1, alt: raw.title });
  if (raw.img2) media.push({ src: raw.img2, alt: `${raw.title} — detail` });
  return media;
}

function normalize(raw: RawProduct): Product {
  return {
    handle: raw.handle,
    title: raw.title,
    category: categorize(raw.title),
    imageCount: raw.n ?? 0,
    media: toMedia(raw),
    priceOnRequest: true,
    availability: "made-to-order",
  };
}

/** All catalog products, normalized + deduped by handle. */
export const products: Product[] = (() => {
  const seen = new Set<string>();
  const out: Product[] = [];
  for (const raw of rawManifest as RawProduct[]) {
    if (!raw.handle || seen.has(raw.handle)) continue;
    // Skip entries with no imagery — nothing to show.
    if (!raw.img1) continue;
    seen.add(raw.handle);
    out.push(normalize(raw));
  }
  return out;
})();

const byHandle = new Map(products.map((p) => [p.handle, p]));

export function getProduct(handle: string): Product | undefined {
  return byHandle.get(handle);
}

export function productsByCategory(category: Category): Product[] {
  return products.filter((p) => p.category === category);
}

export function relatedProducts(handle: string, limit = 4): Product[] {
  const p = byHandle.get(handle);
  if (!p) return [];
  return products
    .filter((x) => x.category === p.category && x.handle !== handle)
    .slice(0, limit);
}
