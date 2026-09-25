import { leadSchema } from "@/lib/validation";
import { db } from "@/lib/db";
import { payload, sameOrigin, rateLimit, safeError } from "@/lib/security";
export async function POST(request: Request) { if (!sameOrigin(request))
    return Response.json({ error: "Origine non autorisée." }, { status: 403 }); let raw; try {
    raw = await payload(request);
}
catch {
    return Response.json({ error: "Demande invalide." }, { status: 400 });
} const result = leadSchema.safeParse(raw); if (!result.success)
    return Response.json({ error: result.error.issues[0].message }, { status: 400 }); const p = result.data; if (Date.now() - p.started < 1500 || Date.now() - p.started > 86400000)
    return Response.json({ error: "Rechargez le formulaire puis réessayez." }, { status: 400 }); try {
    if (!await rateLimit(request, "leads"))
        return Response.json({ error: "Trop de demandes. Réessayez dans une heure." }, { status: 429 });
    await db().prepare("INSERT INTO leads (id,name,company,email,website,industry,location,objective,message,source,landing_page,utm_source,utm_medium,utm_campaign,status,created_at) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?) ON CONFLICT(id) DO NOTHING").bind(p.id, p.name, p.company, p.email, p.website, p.industry, p.location, p.objective, p.message, p.source, p.landing_page, p.utm_source, p.utm_medium, p.utm_campaign, "new", new Date().toISOString()).run();
    return Response.json({ ok: true, reference: p.id.slice(0, 8) }, { status: 201 });
}
catch {
    return safeError();
} }
