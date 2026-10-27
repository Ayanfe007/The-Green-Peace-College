import { NextResponse } from "next/server";

import { deliverInquiry } from "@/lib/email";
import { inquirySchema } from "@/lib/validation";

/**
 * POST /api/inquiry
 * ------------------------------------------------------------------
 * Receives the admission inquiry / registration form.
 *  1. Validates the payload with the SAME zod schema the browser uses
 *     (lib/validation.ts).
 *  2. Discards honeypot-filled (bot) submissions silently.
 *  3. Logs the submission (TODO: persist to a database / CRM).
 *  4. Emails the school inbox + an auto-reply to the parent
 *     (lib/email.ts — logs to console while no API key is set).
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

  const parsed = inquirySchema.safeParse(payload);
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
    console.info("[inquiry] Honeypot triggered — submission discarded (spam).");
    return NextResponse.json({ ok: true });
  }

  // TODO: persist the inquiry (database / CRM). For now we log it so
  // nothing is ever lost.
  console.info(
    "[inquiry] New admission inquiry:\n" + JSON.stringify(data, null, 2)
  );

  try {
    await deliverInquiry(data);
  } catch (err) {
    // Email delivery is best-effort: the submission is already logged,
    // so the parent still gets a success message.
    console.error("[inquiry] Email delivery error:", err);
  }

  return NextResponse.json({ ok: true });
}
