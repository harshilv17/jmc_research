import { NextResponse } from "next/server";

export const runtime = "nodejs";

const API_URL = process.env.API_URL ?? "http://localhost:4000/v1";

/** Thin proxy: forwards storefront inquiries to the standalone API. */
export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  try {
    const res = await fetch(`${API_URL}/inquiries`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      cache: "no-store",
    });
    const json = await res.json().catch(() => ({}));
    if (!res.ok) {
      return NextResponse.json(
        { ok: false, error: "Could not send your enquiry. Please try again." },
        { status: 502 },
      );
    }
    return NextResponse.json({ ok: true, ...json });
  } catch {
    return NextResponse.json(
      { ok: false, error: "Could not reach the atelier. Please try again." },
      { status: 502 },
    );
  }
}
