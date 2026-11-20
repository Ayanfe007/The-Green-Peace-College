import { NextResponse } from "next/server";

import { deliverQuickEnquiry } from "@/lib/email";
import { quickEnquirySchema } from "@/lib/validation";

/**
 * POST /api/enquiry
 * ------------------------------------------------------------------
 * Receives the home page quick enquiry form (name, phone, class,
 * message). Same pattern as /api/inquiry: one shared zod schema, a
 * honeypot for bots, a server-side log so nothing is lost, then
 * delivery to the school inbox (lib/email.ts).
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

  const parsed = quickEnquirySchema.safeParse(payload);
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

  // Honeypot filled in → almost certainly a bot. Pretend success so it
  // doesn't keep trying, and quietly drop the payload.
  if (data.website) {
    console.info("[enquiry] Honeypot triggered - submission discarded (spam).");
    return NextResponse.json({ ok: true });
  }

  // TODO: persist the enquiry (database / CRM). For now we log it so
  // nothing is ever lost.
  console.info("[enquiry] New quick enquiry:\n" + JSON.stringify(data, null, 2));

  try {
    await deliverQuickEnquiry(data);
  } catch (err) {
    // Email delivery is best-effort: the submission is already logged,
    // so the parent still gets a success message.
    console.error("[enquiry] Email delivery error:", err);
  }

  return NextResponse.json({ ok: true });
}
