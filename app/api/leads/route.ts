import { leadSchema } from "../../../lib/validation";
import { sendLeadEmail } from "../../../lib/lead-email";
import { payload, sameOrigin, rateLimit, safeError } from "../../../lib/security";

export const runtime = "nodejs";
export const maxDuration = 60;

export async function POST(request: Request) {
  if (!sameOrigin(request)) return Response.json({ error: "Origine non autorisée." }, { status: 403 });
  let raw;
  try { raw = await payload(request); }
  catch { return Response.json({ error: "Demande invalide." }, { status: 400 }); }
  const result = leadSchema.safeParse(raw);
  if (!result.success) return Response.json({ error: result.error.issues[0].message }, { status: 400 });
  const lead = result.data;
  const age = Date.now() - lead.started;
  if (age < 1500 || age > 86400000) {
    return Response.json({ error: "Rechargez le formulaire puis réessayez." }, { status: 400 });
  }
  try {
    if (!await rateLimit(request, "leads")) {
      return Response.json({ error: "Trop de demandes. Réessayez dans une heure." }, {
        status: 429, headers: { "Retry-After": "3600" },
      });
    }
    await sendLeadEmail(lead);
    return Response.json({ ok: true, reference: lead.id.slice(0, 8) }, { status: 201 });
  } catch {
    // Never log form data, provider responses or credentials.
    console.error("lead_delivery_failed");
    return safeError();
  }
}
