import { z } from "zod";
import { db, runtime } from "@/lib/db";
import { payload, sameOrigin, rateLimit, safeError } from "@/lib/security";
const schema = z.object({ name: z.enum(["page_view", "cta_clicked", "form_started", "form_submitted"]), path: z.string().max(150).regex(/^\/[a-z0-9/-]*$/), label: z.string().max(80).regex(/^[a-z0-9-]*$/) });
export async function POST(r: Request) { if (!sameOrigin(r))
    return new Response(null, { status: 403 }); let parsed; try {
    parsed = schema.safeParse(await payload(r, 2000));
}
catch {
    return new Response(null, { status: 400 });
} if (!parsed.success)
    return new Response(null, { status: 400 });
    // Analytics is inactive without storage; do not spend Redis quota on discarded events.
    if (!runtime().DB) return new Response(null, { status: 204 });
    try {
    if (!await rateLimit(r, "events", 120))
        return new Response(null, { status: 429 });
    const p = parsed.data;
    await db().prepare("INSERT INTO analytics_events (id,name,path,label,created_at) VALUES (?,?,?,?,?)").bind(crypto.randomUUID(), p.name, p.path, p.label, new Date().toISOString()).run();
    return new Response(null, { status: 204 });
}
catch {
    return safeError();
} }
