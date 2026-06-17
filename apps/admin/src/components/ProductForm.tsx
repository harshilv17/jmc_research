import { Button, Field, inputCls } from "./ui";
import { CATEGORIES, STATUSES, type ProductRow } from "@/lib/types";

export default function ProductForm({
  action,
  product,
  submitLabel,
}: {
  action: (fd: FormData) => void | Promise<void>;
  product?: ProductRow;
  submitLabel: string;
}) {
  return (
    <form action={action} className="grid max-w-2xl gap-5">
      <div className="grid grid-cols-2 gap-5">
        <Field label="Title">
          <input
            name="title"
            required
            defaultValue={product?.title}
            className={inputCls}
          />
        </Field>
        <Field label="Handle" hint="lowercase-with-hyphens">
          <input
            name="handle"
            required
            pattern="[a-z0-9-]+"
            defaultValue={product?.handle}
            className={inputCls}
          />
        </Field>
      </div>

      <Field label="Subtitle">
        <input
          name="subtitle"
          defaultValue={product?.subtitle ?? ""}
          className={inputCls}
        />
      </Field>

      <Field label="Description">
        <textarea
          name="description"
          rows={4}
          defaultValue={product?.description ?? ""}
          className={inputCls}
        />
      </Field>

      <div className="grid grid-cols-2 gap-5">
        <Field label="Category">
          <select
            name="category"
            defaultValue={product?.category ?? "couture-set"}
            className={inputCls}
          >
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Status">
          <select
            name="status"
            defaultValue={product?.status ?? "draft"}
            className={inputCls}
          >
            {STATUSES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <div className="grid grid-cols-3 items-end gap-5">
        <Field label="Base price (paise)" hint="leave blank if on request">
          <input
            name="basePrice"
            type="number"
            min="0"
            defaultValue={product?.basePrice ?? ""}
            className={inputCls}
          />
        </Field>
        <Field label="Currency">
          <input
            name="currency"
            defaultValue={product?.currency ?? "INR"}
            maxLength={3}
            className={inputCls}
          />
        </Field>
        <label className="flex items-center gap-2 pb-2 text-sm text-neutral-200">
          <input
            type="checkbox"
            name="priceOnRequest"
            defaultChecked={product?.priceOnRequest ?? true}
            className="h-4 w-4"
          />
          Price on request
        </label>
      </div>

      <div>
        <Button>{submitLabel}</Button>
      </div>
    </form>
  );
}
