import Link from "next/link";
import { notFound } from "next/navigation";
import ProductForm from "@/components/ProductForm";
import { Button, Field, inputCls } from "@/components/ui";
import { api } from "@/lib/api";
import {
  addImage,
  deleteImage,
  deleteProduct,
  updateProduct,
  uploadImage,
} from "@/lib/actions";
import type { ProductDetail } from "@/lib/types";

export const dynamic = "force-dynamic";

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  let product: ProductDetail;
  try {
    const res = await api.get<{ product: ProductDetail }>(
      `/products/detail/${id}`,
    );
    product = res.product;
  } catch {
    notFound();
  }

  return (
    <div className="max-w-3xl">
      <Link href="/products" className="text-sm text-neutral-400 hover:text-amber-400">
        ← Products
      </Link>
      <div className="mt-2 flex items-center justify-between">
        <h1 className="text-2xl font-light">{product.title}</h1>
        <form action={deleteProduct.bind(null, product.id)}>
          <Button variant="danger">Delete</Button>
        </form>
      </div>

      <section className="mt-8">
        <ProductForm
          action={updateProduct.bind(null, product.id)}
          product={product}
          submitLabel="Save changes"
        />
      </section>

      {/* images */}
      <section className="mt-12">
        <h2 className="text-lg font-light">Images</h2>
        <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3">
          {product.images.map((img) => (
            <div
              key={img.id}
              className="overflow-hidden rounded-md border border-neutral-800 bg-neutral-900"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={img.url}
                alt={img.alt}
                className="aspect-[3/4] w-full object-cover"
              />
              <form
                action={deleteImage.bind(null, product.id, img.id)}
                className="p-2"
              >
                <Button variant="ghost">Remove</Button>
              </form>
            </div>
          ))}
          {product.images.length === 0 && (
            <p className="text-sm text-neutral-500">No images yet.</p>
          )}
        </div>

        <form
          action={uploadImage.bind(null, product.id)}
          className="mt-6 grid max-w-xl grid-cols-[1fr_auto] items-end gap-3"
        >
          <Field label="Upload image" hint="JPEG / PNG / WebP / AVIF, max 8 MB">
            <input
              name="file"
              type="file"
              accept="image/*"
              required
              className="block w-full text-sm text-neutral-300 file:mr-3 file:rounded-md file:border-0 file:bg-neutral-800 file:px-3 file:py-2 file:text-neutral-200"
            />
          </Field>
          <Button>Upload</Button>
        </form>

        <details className="mt-4 max-w-xl">
          <summary className="cursor-pointer text-xs text-neutral-500">
            …or add by URL
          </summary>
          <form
            action={addImage.bind(null, product.id)}
            className="mt-3 grid grid-cols-[1fr_auto] items-end gap-3"
          >
            <Field label="Image URL">
              <input name="url" type="url" required className={inputCls} />
            </Field>
            <Button>Add</Button>
          </form>
        </details>
      </section>
    </div>
  );
}
