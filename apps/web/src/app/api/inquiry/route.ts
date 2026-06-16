import { NextResponse } from "next/server";

export const runtime = "nodejs";

type Payload = {
  name?: string;
  email?: string;
  phone?: string;
  occasion?: string;
  eventDate?: string;
  message?: string;
  /** product the enquiry originated from, if any */
  piece?: string;
  /** honeypot — must stay empty */
  company?: string;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: Request) {
  let body: Payload;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  // bot trap
  if (body.company) {
    return NextResponse.json({ ok: true });
  }

  const name = body.name?.trim() ?? "";
  const email = body.email?.trim() ?? "";

  if (name.length < 2) {
    return NextResponse.json({ ok: false, error: "Please enter your name." }, { status: 422 });
  }
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json(
      { ok: false, error: "Please enter a valid email." },
      { status: 422 },
    );
  }

  const inquiry = {
    name,
    email,
    phone: body.phone?.trim() ?? "",
    occasion: body.occasion?.trim() ?? "",
    eventDate: body.eventDate?.trim() ?? "",
    message: body.message?.trim() ?? "",
    piece: body.piece?.trim() ?? "",
    at: new Date().toISOString(),
  };

  // TODO: wire to a delivery channel once provided (Resend / Formspree / CRM).
  // For now we record the inquiry server-side so nothing is lost.
  console.info("[inquiry]", inquiry);

  return NextResponse.json({ ok: true });
}
