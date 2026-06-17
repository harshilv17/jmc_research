import { api } from "@/lib/api";
import type { InquiryRow } from "@/lib/types";

export const dynamic = "force-dynamic";

export default async function InquiriesPage() {
  const { inquiries } = await api.get<{ inquiries: InquiryRow[] }>("/inquiries");

  return (
    <div>
      <h1 className="text-2xl font-light">Inquiries</h1>

      {inquiries.length === 0 ? (
        <p className="mt-6 text-sm text-neutral-400">No inquiries yet.</p>
      ) : (
        <table className="mt-8 w-full text-left text-sm">
          <thead className="border-b border-neutral-800 text-xs uppercase tracking-wider text-neutral-500">
            <tr>
              <th className="py-2">Name</th>
              <th className="py-2">Email</th>
              <th className="py-2">Piece</th>
              <th className="py-2">Occasion</th>
              <th className="py-2">Status</th>
              <th className="py-2">When</th>
            </tr>
          </thead>
          <tbody>
            {inquiries.map((i) => (
              <tr key={i.id} className="border-b border-neutral-900">
                <td className="py-3 text-neutral-100">{i.name}</td>
                <td className="py-3 text-neutral-400">{i.email}</td>
                <td className="py-3 text-neutral-400">{i.piece || "—"}</td>
                <td className="py-3 text-neutral-400">{i.occasion || "—"}</td>
                <td className="py-3 text-amber-400">{i.status}</td>
                <td className="py-3 text-neutral-500">
                  {new Date(i.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
