"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { api } from "./api";

function str(fd: FormData, k: string): string {
  return (fd.get(k) as string | null)?.trim() ?? "";
}
function opt(fd: FormData, k: string): string | undefined {
  const v = str(fd, k);
  return v === "" ? undefined : v;
}

// ── products ──────────────────────────────────────────────────────────────
function productPayload(fd: FormData) {
  const priceOnRequest = fd.get("priceOnRequest") === "on";
  const priceStr = str(fd, "basePrice");
  return {
    handle: str(fd, "handle"),
    title: str(fd, "title"),
    subtitle: opt(fd, "subtitle"),
    description: opt(fd, "description"),
    category: str(fd, "category"),
    status: str(fd, "status") || "draft",
    priceOnRequest,
    basePrice: priceOnRequest || priceStr === "" ? null : Number(priceStr),
    currency: str(fd, "currency") || "INR",
  };
}

export async function createProduct(fd: FormData) {
  const { product } = await api.post<{ product: { id: string } }>(
    "/products",
    productPayload(fd),
  );
  revalidatePath("/products");
  redirect(`/products/${product.id}`);
}

export async function updateProduct(id: string, fd: FormData) {
  await api.patch(`/products/${id}`, productPayload(fd));
  revalidatePath("/products");
  revalidatePath(`/products/${id}`);
}

export async function deleteProduct(id: string) {
  await api.del(`/products/${id}`);
  revalidatePath("/products");
  redirect("/products");
}

export async function addImage(productId: string, fd: FormData) {
  await api.post(`/products/${productId}/images`, {
    url: str(fd, "url"),
    alt: str(fd, "alt"),
    position: Number(str(fd, "position") || "0"),
  });
  revalidatePath(`/products/${productId}`);
}

export async function deleteImage(productId: string, imageId: string) {
  await api.del(`/products/images/${imageId}`);
  revalidatePath(`/products/${productId}`);
}

const API_BASE = process.env.API_URL ?? "http://localhost:4000/v1";

export async function uploadImage(productId: string, fd: FormData) {
  const file = fd.get("file");
  if (!(file instanceof File) || file.size === 0) return;

  const out = new FormData();
  out.append("file", file);
  out.append("alt", str(fd, "alt"));

  const res = await fetch(`${API_BASE}/products/${productId}/images/upload`, {
    method: "POST",
    body: out,
  });
  if (!res.ok) throw new Error(`Upload failed (${res.status})`);
  revalidatePath(`/products/${productId}`);
}

// ── variants & inventory ────────────────────────────────────────────────────
export async function createVariant(productId: string, fd: FormData) {
  await api.post("/variants", {
    productId,
    sku: str(fd, "sku"),
    label: str(fd, "label"),
    priceDelta: Number(str(fd, "priceDelta") || "0"),
  });
  revalidatePath(`/products/${productId}`);
}

export async function deleteVariant(productId: string, variantId: string) {
  await api.del(`/variants/${variantId}`);
  revalidatePath(`/products/${productId}`);
}

export async function setInventory(
  productId: string,
  variantId: string,
  fd: FormData,
) {
  await api.put(`/variants/${variantId}/inventory`, {
    quantity: Number(str(fd, "quantity") || "0"),
  });
  revalidatePath(`/products/${productId}`);
}

// ── collections ───────────────────────────────────────────────────────────
function collectionPayload(fd: FormData) {
  return {
    slug: str(fd, "slug"),
    title: str(fd, "title"),
    description: str(fd, "description"),
    heroImage: opt(fd, "heroImage"),
    position: Number(str(fd, "position") || "0"),
    published: fd.get("published") === "on",
  };
}

export async function createCollection(fd: FormData) {
  await api.post("/collections", collectionPayload(fd));
  revalidatePath("/collections");
  redirect("/collections");
}

export async function updateCollection(id: string, fd: FormData) {
  await api.patch(`/collections/${id}`, collectionPayload(fd));
  revalidatePath("/collections");
}

export async function deleteCollection(id: string) {
  await api.del(`/collections/${id}`);
  revalidatePath("/collections");
  redirect("/collections");
}
