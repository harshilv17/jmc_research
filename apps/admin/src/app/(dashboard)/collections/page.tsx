import { Button, Field, inputCls } from "@/components/ui";
import { api } from "@/lib/api";
import { createCollection, deleteCollection } from "@/lib/actions";
import type { CollectionRow } from "@/lib/types";

export const dynamic = "force-dynamic";

export default async function CollectionsPage() {
  const { collections } = await api.get<{ collections: CollectionRow[] }>(
    "/collections",
  );

  return (
    <div className="max-w-3xl">
      <h1 className="text-2xl font-light">Collections</h1>

      {collections.length === 0 ? (
        <p className="mt-6 text-sm text-neutral-400">No collections yet.</p>
      ) : (
        <ul className="mt-6 divide-y divide-neutral-900">
          {collections.map((c) => (
            <li key={c.id} className="flex items-center justify-between py-3">
              <div>
                <p className="text-sm text-neutral-100">
                  {c.title}
                  <span className="ml-2 text-xs text-neutral-600">/{c.slug}</span>
                </p>
                <p className="text-xs text-neutral-500">
                  {c.published ? "Published" : "Draft"} · position {c.position}
                </p>
              </div>
              <form action={deleteCollection.bind(null, c.id)}>
                <Button variant="danger">Delete</Button>
              </form>
            </li>
          ))}
        </ul>
      )}

      <section className="mt-12">
        <h2 className="text-lg font-light">New collection</h2>
        <form action={createCollection} className="mt-4 grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <Field label="Title">
              <input name="title" required className={inputCls} />
            </Field>
            <Field label="Slug" hint="lowercase-with-hyphens">
              <input name="slug" required pattern="[a-z0-9-]+" className={inputCls} />
            </Field>
          </div>
          <Field label="Description">
            <textarea name="description" rows={2} className={inputCls} />
          </Field>
          <div className="grid grid-cols-2 items-end gap-4">
            <Field label="Position">
              <input name="position" type="number" defaultValue={0} className={inputCls} />
            </Field>
            <label className="flex items-center gap-2 pb-2 text-sm text-neutral-200">
              <input type="checkbox" name="published" className="h-4 w-4" />
              Published
            </label>
          </div>
          <div>
            <Button>Create collection</Button>
          </div>
        </form>
      </section>
    </div>
  );
}
