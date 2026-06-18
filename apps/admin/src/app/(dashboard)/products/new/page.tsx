import Link from "next/link";
import ProductForm from "@/components/ProductForm";
import { createProduct } from "@/lib/actions";

export default function NewProductPage() {
  return (
    <div>
      <Link href="/products" className="text-sm text-neutral-400 hover:text-amber-400">
        ← Products
      </Link>
      <h1 className="mt-2 text-2xl font-light">New product</h1>
      <div className="mt-8">
        <ProductForm action={createProduct} submitLabel="Create product" />
      </div>
    </div>
  );
}
