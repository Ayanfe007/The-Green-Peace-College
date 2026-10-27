import { NextResponse } from "next/server";

import { deliverContact } from "@/lib/email";
import { contactSchema } from "@/lib/validation";

/**
 * POST /api/contact
 * ------------------------------------------------------------------
 * Same pattern as /api/inquiry, for the short contact form on the
 * Contact page: zod validation (shared schema), honeypot check,
 * logging, then email delivery (lib/email.ts).
 */
export async function POST(request: Request) {
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid request body." },
      { status: 400 }
    );
  }

  const parsed = contactSchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json(
      {
        ok: false,
        error: "Please review the highlighted fields.",
        fields: parsed.error.flatten().fieldErrors,
      },
      { status: 400 }
    );
  }

  const data = parsed.data;

  if (data.website) {
    console.info("[contact] Honeypot triggered — submission discarded (spam).");
    return NextResponse.json({ ok: true });
  }

  // TODO: persist the message (database / CRM). For now we log it.
  console.info(
    "[contact] New contact message:\n" + JSON.stringify(data, null, 2)
  );

  try {
    await deliverContact(data);
  } catch (err) {
    // Best-effort email — the message is already logged above.
    console.error("[contact] Email delivery error:", err);
  }

  return NextResponse.json({ ok: true });
}
