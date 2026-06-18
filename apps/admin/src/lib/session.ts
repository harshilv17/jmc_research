import { createHmac, timingSafeEqual } from "node:crypto";

const SECRET = process.env.SESSION_SECRET ?? "dev-insecure-secret-change-me";
const MAX_AGE_S = 60 * 60 * 24 * 7; // 7 days

export type SessionUser = {
  userId: string;
  email: string;
  role: string;
};

type Payload = SessionUser & { exp: number };

function b64url(buf: Buffer): string {
  return buf.toString("base64url");
}

function sign(data: string): string {
  return b64url(createHmac("sha256", SECRET).update(data).digest());
}

/** Create a signed "<payload>.<sig>" token. */
export function createSessionToken(user: SessionUser): string {
  const payload: Payload = {
    ...user,
    exp: Math.floor(Date.now() / 1000) + MAX_AGE_S,
  };
  const data = b64url(Buffer.from(JSON.stringify(payload)));
  return `${data}.${sign(data)}`;
}

/** Verify a token; returns the user or null. */
export function verifySessionToken(token: string | undefined): SessionUser | null {
  if (!token) return null;
  const [data, sig] = token.split(".");
  if (!data || !sig) return null;

  const expected = sign(data);
  const a = Buffer.from(sig);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !timingSafeEqual(a, b)) return null;

  try {
    const payload = JSON.parse(
      Buffer.from(data, "base64url").toString(),
    ) as Payload;
    if (payload.exp * 1000 < Date.now()) return null;
    return { userId: payload.userId, email: payload.email, role: payload.role };
  } catch {
    return null;
  }
}

export const SESSION_COOKIE = "jmc_admin";
export const SESSION_MAX_AGE = MAX_AGE_S;
