const BASE = process.env.API_URL ?? "http://localhost:4000/v1";

type Json = Record<string, unknown>;

async function req<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {
    cache: "no-store",
    headers: { "Content-Type": "application/json" },
    ...init,
  });
  const json = (await res.json().catch(() => ({}))) as T & { error?: unknown };
  if (!res.ok) {
    throw new Error(
      typeof json.error === "string"
        ? json.error
        : `API ${res.status} ${path}`,
    );
  }
  return json;
}

export const api = {
  get: <T>(path: string) => req<T>(path),
  post: <T>(path: string, body: Json) =>
    req<T>(path, { method: "POST", body: JSON.stringify(body) }),
  patch: <T>(path: string, body: Json) =>
    req<T>(path, { method: "PATCH", body: JSON.stringify(body) }),
  put: <T>(path: string, body: Json) =>
    req<T>(path, { method: "PUT", body: JSON.stringify(body) }),
  del: <T>(path: string) => req<T>(path, { method: "DELETE" }),
};
