const BASE = process.env.API_URL ?? "http://localhost:4000/v1";

export async function apiGet<T>(path: string): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {
    // catalog is DB-driven; keep it fresh in dev. Tune to ISR later.
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`API ${res.status} ${path}`);
  return (await res.json()) as T;
}

/** Returns null instead of throwing when the API is unreachable. */
export async function apiGetSafe<T>(path: string): Promise<T | null> {
  try {
    return await apiGet<T>(path);
  } catch {
    return null;
  }
}
